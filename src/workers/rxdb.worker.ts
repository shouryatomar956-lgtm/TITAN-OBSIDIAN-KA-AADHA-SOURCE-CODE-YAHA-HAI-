import { expose } from 'comlink';
import { createRxDatabase, addRxPlugin } from 'rxdb';
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';
import { RxDBUpdatePlugin } from 'rxdb/plugins/update';
import localforage from 'localforage';
import { OPFSBinaryEngine, registerOPFSDriver } from '../services/opfsStorageEngine';
import { CRDTEngine, VectorClock } from '../services/crdtSync';

addRxPlugin(RxDBUpdatePlugin);
addRxPlugin(RxDBJsonDumpPlugin);

// Register and configure OPFS Binary Driver on localForage
registerOPFSDriver();

localforage.config({
  name: 'PulseFitTracker',
  storeName: 'gym_data_opfs',
  driver: ['opfsBinaryDriver', localforage.INDEXEDDB, localforage.LOCALSTORAGE]
});

const profileSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    username: { type: 'string' },
    pin: { type: 'string' },
    previousPin: { type: 'string' },
    pinUpdatedAt: { type: 'string' },
    experienceLevel: { type: 'string' },
    primaryGoal: { type: 'string' },
    workoutLocation: { type: 'string' },
    bodyType: { type: 'string' },
    height: { type: 'string' },
    weight: { type: 'string' },
    gender: { type: 'string' },
    ageBracket: { type: 'string' },
    physicalConstraints: { type: 'array', items: { type: 'string' } },
    equipmentInventory: { type: 'array', items: { type: 'string' } },
    age: { type: 'number' },
    heightCm: { type: 'number' },
    weightKg: { type: 'number' },
    fitnessGoals: { type: 'array', items: { type: 'string' } },
    locationName: { type: 'string' },
    locationLat: { type: 'number' },
    locationLng: { type: 'number' },
    locationAccuracy: { type: 'number' },
    merkleRoot: { type: 'string' }
  },
  required: ['id']
};

const stateSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    rewards: { type: 'array', items: { type: 'string' } },
    totalExercisesLogged: { type: 'number' },
    workouts: { 
      type: 'array', 
      items: { 
        type: 'object',
        properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            isCompleted: { type: 'boolean' },
            date: { type: 'string' },
            baseSets: { type: 'number' },
            baseReps: { type: 'string' },
            baseRest: { type: 'number' }
        }
      } 
    },
    currentStreak: { type: 'number' },
    lastWorkoutDate: { type: 'string' },
    protectedRestDates: { type: 'array', items: { type: 'string' } },
    injuryDate: { type: 'string' }
  },
  required: ['id']
};

const quorumKvSchema = {
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 128 },
    payloadJson: { type: 'string' },
    updatedAt: { type: 'number' }
  },
  required: ['id', 'payloadJson']
};

const PROFILE_ID = 'pulsefit_user_profile';
const STATE_ID = 'pulsefit_state';

const DEFAULT_STATE = {
  id: STATE_ID,
  rewards: [],
  totalExercisesLogged: 0,
  workouts: [],
  currentStreak: 0,
  lastWorkoutDate: null,
  protectedRestDates: [],
  injuryDate: null,
};

class RxDBStorageWorker {
  private dbPromise: Promise<any> | null = null;
  private crdt: CRDTEngine;
  private currentClock: VectorClock;
  private opfs: OPFSBinaryEngine;
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.crdt = new CRDTEngine();
    this.currentClock = this.crdt.nextClock();
    this.opfs = OPFSBinaryEngine.getInstance();
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('rxdb_mutations');
      } catch (e) {}
    }
  }

  private async getDb() {
    if (!this.dbPromise) {
      this.dbPromise = (async () => {
        await this.opfs.init();

        const db = await createRxDatabase({
          name: 'pulsefit_rxdb_opfs',
          storage: getRxStorageMemory()
        });

        await db.addCollections({
          profile: { schema: profileSchema },
          appstate: { schema: stateSchema },
          quorumkv: { schema: quorumKvSchema }
        });

        // 1. Restore Profile from OPFS Binary Storage
        try {
          const profileBinary = await this.opfs.readAtomic('pulsefit_user_profile');
          if (profileBinary) {
            await db.profile.upsert(profileBinary);
          } else {
            // Fallback check on localforage
            const legacyProfile = await localforage.getItem('pulsefit_user_profile');
            if (legacyProfile) {
              await db.profile.upsert(legacyProfile as any);
              await this.opfs.writeAtomic('pulsefit_user_profile', legacyProfile);
            }
          }
        } catch (e) {
          console.warn('[RxDB Worker] Profile cold restoration warning:', e);
        }

        // 2. Restore AppState from OPFS Binary Storage
        try {
          const stateBinary = await this.opfs.readAtomic('pulsefit_state');
          if (stateBinary) {
            await db.appstate.upsert(stateBinary);
          } else {
            const legacyState = await localforage.getItem('app_state');
            if (legacyState) {
              await db.appstate.upsert(legacyState as any);
              await this.opfs.writeAtomic('pulsefit_state', legacyState);
            }
          }
        } catch (e) {
          console.warn('[RxDB Worker] AppState cold restoration warning:', e);
        }

        // 3. Differential Live Query Subscriptions: persist to OPFS and broadcast deltas
        db.profile.$.subscribe(async () => {
          try {
            const doc = await db.profile.findOne({ selector: { id: PROFILE_ID } }).exec();
            if (doc) {
              const data = doc.toJSON();
              await this.opfs.writeAtomic('pulsefit_user_profile', data);
            }
          } catch (e) {}
        });

        db.appstate.$.subscribe(async () => {
          try {
            const doc = await db.appstate.findOne({ selector: { id: STATE_ID } }).exec();
            if (doc) {
              const data = doc.toJSON();
              await this.opfs.writeAtomic('pulsefit_state', data);
              // Transmit differential delta to UI via BroadcastChannel
              if (this.broadcastChannel) {
                this.broadcastChannel.postMessage({
                  type: 'APP_STATE_UPDATE',
                  payload: data,
                  clock: this.currentClock
                });
              }
            }
          } catch (e) {}
        });

        return db;
      })();
    }
    return this.dbPromise;
  }

  async initDb(): Promise<boolean> {
    await this.getDb();
    return true;
  }

  async getUserProfile(): Promise<any> {
    const db = await this.getDb();
    const doc = await db.profile.findOne({ selector: { id: PROFILE_ID } }).exec();
    return doc ? doc.toJSON() : null;
  }

  async saveUserProfile(profile: any): Promise<void> {
    const db = await this.getDb();
    const cleanProfile = { ...profile, id: PROFILE_ID };
    await db.profile.upsert(cleanProfile);
    await this.opfs.writeAtomic('pulsefit_user_profile', cleanProfile);
  }

  async getState(): Promise<any> {
    const db = await this.getDb();
    const doc = await db.appstate.findOne({ selector: { id: STATE_ID } }).exec();
    return doc ? doc.toJSON() : DEFAULT_STATE;
  }

  async saveState(state: any): Promise<void> {
    const db = await this.getDb();
    const cleanState = JSON.parse(JSON.stringify(state));
    cleanState.id = STATE_ID;
    if (!cleanState.rewards) cleanState.rewards = [];
    if (!cleanState.protectedRestDates) cleanState.protectedRestDates = [];
    if (!cleanState.workouts) cleanState.workouts = [];
    if (!cleanState.lastWorkoutDate) cleanState.lastWorkoutDate = null;
    if (!cleanState.injuryDate) cleanState.injuryDate = null;

    // CRDT Merge with current state in database
    const currentDoc = await db.appstate.findOne({ selector: { id: STATE_ID } }).exec();
    const currentState = currentDoc ? currentDoc.toJSON() : DEFAULT_STATE;

    const nextClock = this.crdt.nextClock();
    const mergedState = this.crdt.mergeStates(currentState, cleanState, this.currentClock, nextClock);
    this.currentClock = nextClock;

    await db.appstate.upsert(mergedState);
    await this.opfs.writeAtomic('pulsefit_state', mergedState);
  }

  async saveGenericQuorumKey(key: string, payload: any): Promise<void> {
    try {
      const db = await this.getDb();
      await db.quorumkv.upsert({
        id: key.slice(0, 128),
        payloadJson: JSON.stringify(payload ?? null),
        updatedAt: Date.now()
      });
      await this.opfs.writeAtomic(key, payload);
    } catch {}
  }

  async getGenericQuorumKey(key: string): Promise<any> {
    try {
      const db = await this.getDb();
      const doc = await db.quorumkv.findOne({ selector: { id: key.slice(0, 128) } }).exec();
      if (doc) {
        return JSON.parse(doc.toJSON().payloadJson);
      }
      return await this.opfs.readAtomic(key);
    } catch {
      return null;
    }
  }

  async factoryReset(): Promise<void> {
    try {
      const db = await this.getDb();
      if (db) {
        await db.remove();
      }
    } catch (e) {}

    try {
      await this.opfs.clearAll();
    } catch (e) {}

    try {
      await localforage.clear();
    } catch (e) {}

    this.dbPromise = null;
  }

  async saveVaultSnapshot(vaultState: any): Promise<void> {
    try {
      await this.opfs.writeAtomic('pulsefit_vault_state', vaultState);
    } catch (e) {
      console.warn('[RxDB Worker] Error writing vault snapshot to OPFS:', e);
    }
  }

  async getVaultSnapshot(): Promise<any> {
    try {
      return await this.opfs.readAtomic('pulsefit_vault_state');
    } catch (e) {
      return null;
    }
  }

  async saveRepCounterSession(session: any): Promise<void> {
    try {
      const history = (await this.opfs.readAtomic('pulsefit_rep_counter_history')) || [];
      const updated = [session, ...(Array.isArray(history) ? history : [])].slice(0, 100);
      await this.opfs.writeAtomic('pulsefit_rep_counter_history', updated);
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({
          type: 'REP_SESSION_LOGGED',
          payload: session
        });
      }
    } catch (e) {
      console.warn('[RxDB Worker] Error saving rep session:', e);
    }
  }

  async getRepCounterHistory(): Promise<any[]> {
    try {
      const history = await this.opfs.readAtomic('pulsefit_rep_counter_history');
      return Array.isArray(history) ? history : [];
    } catch (e) {
      return [];
    }
  }

  async saveCalorieEntry(entry: any): Promise<void> {
    try {
      const logs = (await this.opfs.readAtomic('pulsefit_calories')) || [];
      const updated = [entry, ...(Array.isArray(logs) ? logs : [])].slice(0, 500);
      await this.opfs.writeAtomic('pulsefit_calories', updated);
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({
          type: 'CALORIE_ENTRY_LOGGED',
          payload: entry
        });
      }
    } catch (e) {
      console.warn('[RxDB Worker] Error saving calorie entry:', e);
    }
  }

  async getCalorieEntries(): Promise<any[]> {
    try {
      const logs = await this.opfs.readAtomic('pulsefit_calories');
      return Array.isArray(logs) ? logs : [];
    } catch (e) {
      return [];
    }
  }

  async subscribeToState(callback: (state: any) => void) {
    const db = await this.getDb();
    const sub = db.appstate.findOne({ selector: { id: STATE_ID } }).$.subscribe((doc: any) => {
      if (doc) callback(doc.toJSON());
    });
    return () => sub.unsubscribe();
  }
}

expose(new RxDBStorageWorker());
