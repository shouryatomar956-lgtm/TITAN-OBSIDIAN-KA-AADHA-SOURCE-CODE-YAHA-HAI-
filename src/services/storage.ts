import localforage from 'localforage';
import { format } from 'date-fns';
import { getRxDBProxy } from '../utils/rxdbManager';
import { hashData } from '../utils/crypto';
import { zkBiometricEnclave, PASSWORD_ENCLAVE_STORAGE_KEY } from './zeroKnowledgeBiometricEnclave';
import { registerOPFSDriver, OPFSBinaryEngine } from './opfsStorageEngine';
import { appRegistry } from './appRegistry';
import { DataMigrationEngine, SchemaValidator } from './appSubsystems';
import { evaluateVaultMilestones } from './vaultService';
import { dataPruningService } from './dataPruningService';
import { silentVolumeEngine } from './silentVolumeEngine';
import { silentCalorieEngine } from './silentCalorieEngine';
import { silentHydrationEngine } from './silentHydrationEngine';
import { silentStepEngine } from './silentStepEngine';
import { polyglotStorageMesh } from './polyglotStorageMesh';

// Auto-register and prioritize the Synchronous OPFS Memory-Mapped Binary Driver
registerOPFSDriver();

localforage.config({
  name: 'PulseFitTracker',
  storeName: 'gym_data_opfs',
  description: 'Stores workout plans, logs, and streak metrics via 7-Tier Polyglot Quorum & OPFS Binary Engine.',
  driver: [
    'opfsBinaryDriver',
    localforage.INDEXEDDB,
    localforage.WEBSQL
  ]
});

// Kick off zero-downtime legacy data migration, 7-tier polyglot mesh boot, 40-day data pruning, and silent daily telemetry calculations in background task
if (typeof window !== 'undefined') {
  setTimeout(() => {
    polyglotStorageMesh.initializeMesh().catch(() => {});
    DataMigrationEngine.migrateLegacyData().catch(() => {});
    dataPruningService.runAutomatedPruning().catch(() => {});
    silentVolumeEngine.silentlyRecalculate().catch(() => {});
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
    silentStepEngine.silentlyRecalculate().catch(() => {});
  }, 100);
}

export interface UserProfile {
  username: string;
  pin: string;
  previousPin?: string;
  pinUpdatedAt?: string;
  experienceLevel: string;
  primaryGoal: string;
  workoutLocation: string;
  bodyType: string;
  height: string;
  weight: string;
  gender: string;
  ageBracket: string;
  physicalConstraints: string[];
  equipmentInventory: string[];
  
  // Biometric & Location Profile fields
  age?: number;
  heightCm?: number;
  weightKg?: number;
  fitnessGoals?: string[];
  locationName?: string;
  locationLat?: number;
  locationLng?: number;
  locationAccuracy?: number;
  city?: string;
  state?: string;
  country?: string;
  merkleRoot?: string;
  streak?: number;
  createdAt?: string;
  targetMuscleGroups?: string[];
}

export interface Workout {
  id: string;
  name: string;
  isCompleted: boolean;
  date: string; 
  baseSets: number;
  baseReps: string;
  baseRest: number; 
}

export interface AppState {
  rewards?: string[];
  totalExercisesLogged?: number;
  workouts: Workout[];
  currentStreak: number;
  lastWorkoutDate: string | null;
  protectedRestDates: string[];
  injuryDate?: string | null;
}

const DEFAULT_STATE: AppState = {
  rewards: [],
  totalExercisesLogged: 0,
  workouts: [],
  currentStreak: 0,
  lastWorkoutDate: null,
  protectedRestDates: [],
  injuryDate: null,
};

class StorageService {
  private inMemoryProfile: UserProfile | null = null;
  private inMemoryState: AppState | null = null;
  private opfs = OPFSBinaryEngine.getInstance();

  private async getDb() {
    return await getRxDBProxy();
  }

  async getUserProfile(): Promise<UserProfile | null> {
    if (this.inMemoryProfile) {
      return { ...this.inMemoryProfile };
    }

    // 1. 7-Tier Polyglot Quorum Read (L1 ART -> Comlink RxDB -> OPFS WAL -> Dexie IDB -> LocalForage -> CacheStorage -> Emergency Boot Journal)
    try {
      const quorumProfile = await polyglotStorageMesh.readQuorum<UserProfile>('pulsefit_user_profile');
      if (quorumProfile && quorumProfile.username) {
        this.inMemoryProfile = quorumProfile;
        appRegistry.registerEntity('pulsefit_user_profile', quorumProfile);
        return quorumProfile;
      }
    } catch {}

    try {
      const rxdb = await this.getDb();
      if (rxdb) {
        const profile = await rxdb.getUserProfile();
        if (profile) {
          this.inMemoryProfile = profile;
          appRegistry.registerEntity('pulsefit_user_profile', profile);
          return profile;
        }
      }
    } catch (err) {
      console.warn('[Storage] Worker profile fetch notice, trying direct OPFS:', err);
    }

    // Direct OPFS read fallback
    try {
      const opfsProfile = await this.opfs.readAtomic('pulsefit_user_profile');
      if (opfsProfile) {
        this.inMemoryProfile = opfsProfile;
        return opfsProfile;
      }
    } catch (e) {}

    // Legacy localForage fallback
    try {
      const legacy = await localforage.getItem<UserProfile>('pulsefit_user_profile');
      if (legacy) {
        this.inMemoryProfile = legacy;
        return legacy;
      }
    } catch (e) {}

    return null;
  }

  async saveUserProfile(profile: UserProfile): Promise<void> {
    // Automatically seal plaintext PIN with PBKDF2-HMAC-SHA512 (210,000 iterations) + AES-256-GCM if not already sealed
    if (profile.pin && !profile.pin.startsWith('zk_pbkdf2_v2$') && profile.pin.length < 60) {
      try {
        const { legacyCompatibleVerifier } = await zkBiometricEnclave.createPasswordEnclaveRecord(profile.pin);
        profile.pin = legacyCompatibleVerifier;
      } catch (e) {
        profile.pin = await hashData(profile.pin);
      }
    }

    this.inMemoryProfile = { ...profile };
    appRegistry.registerEntity('pulsefit_user_profile', profile);

    // Commit across all 7 Polyglot Storage Tiers (ART, Comlink RxDB, OPFS WAL, Dexie B-Tree, LocalForage, CacheStorage, Storage Buckets / Boot Journal)
    try {
      await polyglotStorageMesh.writeQuorum('pulsefit_user_profile', profile);
    } catch (err) {
      console.warn('[Storage] Polyglot profile save fallback:', err);
      try {
        await this.opfs.writeAtomic('pulsefit_user_profile', profile);
        await localforage.setItem('pulsefit_user_profile', profile);
      } catch (e) {}
    }

    // Evaluate vault milestones on profile / biometric update
    evaluateVaultMilestones().catch(() => {});

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pulsefit_profile_updated', { detail: profile }));
    }
  }

  async updatePin(newPin: string): Promise<void> {
    const profile = await this.getUserProfile();
    if (profile) {
      profile.previousPin = profile.pin;
      profile.pinUpdatedAt = new Date().toISOString();
      try {
        const prevRecord = await localforage.getItem<any>(PASSWORD_ENCLAVE_STORAGE_KEY);
        const { legacyCompatibleVerifier } = await zkBiometricEnclave.createPasswordEnclaveRecord(
          newPin,
          prevRecord
        );
        profile.pin = legacyCompatibleVerifier;
      } catch {
        profile.pin = await hashData(newPin);
      }
      await this.saveUserProfile(profile);
    }
  }

  async factoryReset(): Promise<void> {
    this.inMemoryProfile = null;
    this.inMemoryState = null;

    try {
      const rxdb = await this.getDb();
      if (rxdb && rxdb.factoryReset) {
        await rxdb.factoryReset();
      }
    } catch (e) {}

    try {
      await polyglotStorageMesh.clearAllTiers();
    } catch (e) {}

    try {
      await this.opfs.clearAll();
    } catch (e) {}

    try {
      await localforage.clear();
    } catch (e) {
      console.error('[Storage] Factory reset warning:', e);
    }
  }

  async getState(): Promise<AppState> {
    if (this.inMemoryState) {
      return { ...this.inMemoryState };
    }

    // 1. 7-Tier Polyglot Quorum Read
    try {
      const quorumState = await polyglotStorageMesh.readQuorum<AppState>('pulsefit_state');
      if (quorumState && Array.isArray(quorumState.workouts)) {
        const sanitized = SchemaValidator.sanitizeAppState(quorumState);
        this.inMemoryState = sanitized;
        appRegistry.handleStateMutation(sanitized);
        return sanitized;
      }
    } catch {}

    try {
      const rxdb = await this.getDb();
      if (rxdb) {
        const s = await rxdb.getState();
        if (s) {
          const sanitized = SchemaValidator.sanitizeAppState(s);
          this.inMemoryState = sanitized;
          appRegistry.handleStateMutation(sanitized);
          return sanitized;
        }
      }
    } catch (err) {
      console.warn('[Storage] Worker state fetch notice, trying direct OPFS:', err);
    }

    // Direct OPFS read fallback
    try {
      const opfsState = await this.opfs.readAtomic('pulsefit_state');
      if (opfsState) {
        const sanitized = SchemaValidator.sanitizeAppState(opfsState);
        this.inMemoryState = sanitized;
        return sanitized;
      }
    } catch (e) {}

    // Legacy localForage fallback
    try {
      const legacy = await localforage.getItem<AppState>('app_state');
      if (legacy) {
        const sanitized = SchemaValidator.sanitizeAppState(legacy);
        this.inMemoryState = sanitized;
        return sanitized;
      }
    } catch (e) {}

    return DEFAULT_STATE;
  }

  async saveState(state: AppState): Promise<void> {
    const sanitized = SchemaValidator.sanitizeAppState(state);
    this.inMemoryState = sanitized;
    appRegistry.handleStateMutation(sanitized);

    try {
      await Promise.all([
        polyglotStorageMesh.writeQuorum('pulsefit_state', sanitized),
        polyglotStorageMesh.writeQuorum('app_state', sanitized)
      ]);
    } catch (err) {
      console.warn('[Storage] Polyglot state save fallback:', err);
      try {
        await this.opfs.writeAtomic('pulsefit_state', sanitized);
        await localforage.setItem('app_state', sanitized);
      } catch (e) {}
    }

    // Evaluate vault milestones on log / state update
    evaluateVaultMilestones().catch(() => {});
    silentVolumeEngine.silentlyRecalculate().catch(() => {});
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
    silentStepEngine.silentlyRecalculate().catch(() => {});
  }

  async logExerciseExecution(exerciseName: string, sets: number, reps: string): Promise<{state: AppState, newReward: string | null}> {
    const state = await this.getState();
    const todayStr = new Date().toISOString();
    
    // Add to workouts
    const newWorkout: Workout = {
      id: "log_" + Date.now().toString(),
      name: exerciseName,
      isCompleted: true,
      date: todayStr,
      baseSets: sets,
      baseReps: reps,
      baseRest: 60
    };
    state.workouts.push(newWorkout);
    state.totalExercisesLogged = (state.totalExercisesLogged || 0) + 1;
    
    // Streak increment
    if (!state.lastWorkoutDate) {
       state.currentStreak = 1;
       state.lastWorkoutDate = todayStr;
    } else {
       const today = new Date().toISOString().split('T')[0];
       const last = new Date(state.lastWorkoutDate).toISOString().split('T')[0];
       if (today !== last) {
          state.currentStreak += 1;
          state.lastWorkoutDate = todayStr;
       }
    }
    
    // Evaluate Reward Vault
    if (!state.rewards) state.rewards = [];
    let newReward = null;
    if (state.totalExercisesLogged === 1 && !state.rewards.includes('First Blood')) {
       newReward = 'First Blood';
       state.rewards.push(newReward);
    } else if (state.totalExercisesLogged === 10 && !state.rewards.includes('Consistency Master')) {
       newReward = 'Consistency Master';
       state.rewards.push(newReward);
    } else if (state.currentStreak === 3 && !state.rewards.includes('3-Day Streak')) {
       newReward = '3-Day Streak';
       state.rewards.push(newReward);
    } else if (state.currentStreak === 7 && !state.rewards.includes('7-Day Streak')) {
       newReward = '7-Day Streak';
       state.rewards.push(newReward);
    }
    
    await this.saveState(state);
    
    // Sync into pulsefit_workout_history across all 7 Polyglot tiers
    try {
      const existingHistory = (await polyglotStorageMesh.readQuorum<any[]>('pulsefit_workout_history')) ||
        (await localforage.getItem<any[]>('pulsefit_workout_history')) || [];
      existingHistory.unshift({
        id: newWorkout.id,
        name: newWorkout.name,
        date: newWorkout.date,
        baseSets: newWorkout.baseSets,
        baseReps: newWorkout.baseReps,
        baseRest: newWorkout.baseRest,
        isCompleted: true
      });
      await polyglotStorageMesh.writeQuorum('pulsefit_workout_history', existingHistory);
    } catch (e) {
      console.warn('[Storage] Could not sync pulsefit_workout_history:', e);
    }

    // Dispatch cross-module event for PDF / UI refresh
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_exercise_logged', { detail: { state } }));
    }

    // Run background 40-day data pruning and silent telemetry recalculation
    dataPruningService.runAutomatedPruning().catch(() => {});
    silentVolumeEngine.silentlyRecalculate().catch(() => {});
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
    silentStepEngine.silentlyRecalculate().catch(() => {});
    
    return { state, newReward };
  }

  async checkStreakContinuity(): Promise<AppState> {
    const state = await this.getState();
    if (!state.lastWorkoutDate) return state;
    const lastWorkout = new Date(state.lastWorkoutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastWorkout.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 1) {
      let broken = false;
      for (let i = 1; i < diffDays; i++) {
        const checkDate = new Date(lastWorkout.getTime() + i * (1000 * 60 * 60 * 24));
        const dateStr = format(checkDate, 'yyyy-MM-dd');
        if (!state.protectedRestDates?.includes(dateStr)) {
          broken = true;
          break;
        }
      }
      
      if (broken) {
        state.currentStreak = 0;
        state.lastWorkoutDate = null;
        await this.saveState(state);
      }
    }
    return state;
  }
  
  async toggleInjuryStatus(dateStr: string): Promise<AppState> {
    const state = await this.getState();
    const isCurrentlyInjured = state.injuryDate === dateStr;
    const newState = {
      ...state,
      injuryDate: isCurrentlyInjured ? null : dateStr
    };
    await this.saveState(newState);
    return newState;
  }
  
  async toggleRestDayShield(dateStr: string): Promise<AppState> {
    const state = await this.getState();
    if (!state.protectedRestDates) state.protectedRestDates = [];
    
    if (state.protectedRestDates.includes(dateStr)) {
      state.protectedRestDates = state.protectedRestDates.filter(d => d !== dateStr);
    } else {
      state.protectedRestDates.push(dateStr);
    }
    
    await this.saveState(state);
    return state;
  }

  async toggleWorkoutCompletion(workoutId: string): Promise<AppState> {
    const state = await this.getState();
    const workoutIndex = state.workouts.findIndex((w) => w.id === workoutId);
    
    if (workoutIndex > -1) {
      const workout = state.workouts[workoutIndex];
      workout.isCompleted = !workout.isCompleted;
      if (workout.isCompleted) {
         if (!state.lastWorkoutDate) {
            state.currentStreak = 1;
            state.lastWorkoutDate = workout.date;
         } else {
            const today = format(new Date(), 'yyyy-MM-dd');
            const last = format(new Date(state.lastWorkoutDate), 'yyyy-MM-dd');
            if (today !== last) {
               state.currentStreak += 1;
               state.lastWorkoutDate = workout.date;
            }
         }
      }
      
      await this.saveState(state);
    }
    
    return state;
  }

  async completeDailySession(): Promise<AppState> {
    const state = await this.getState();
    const todayStr = new Date().toISOString();
    
    // Add workout entry to workouts history
    const sessionWorkout: Workout = {
      id: "session_" + Date.now().toString(),
      name: "Daily Training Protocol",
      isCompleted: true,
      date: todayStr,
      baseSets: 4,
      baseReps: "12-15",
      baseRest: 60
    };
    if (!state.workouts) state.workouts = [];
    state.workouts.push(sessionWorkout);
    state.totalExercisesLogged = (state.totalExercisesLogged || 0) + 1;

    if (!state.lastWorkoutDate) {
       state.currentStreak = 1;
       state.lastWorkoutDate = todayStr;
    } else {
       const today = new Date().toISOString().split('T')[0];
       const last = new Date(state.lastWorkoutDate).toISOString().split('T')[0];
       if (today !== last) {
          state.currentStreak += 1;
          state.lastWorkoutDate = todayStr;
       }
    }
    
    await this.saveState(state);

    // Sync into pulsefit_workout_history across all 7 Polyglot tiers
    try {
      const existingHistory = (await polyglotStorageMesh.readQuorum<any[]>('pulsefit_workout_history')) ||
        (await localforage.getItem<any[]>('pulsefit_workout_history')) || [];
      existingHistory.unshift({
        id: sessionWorkout.id,
        name: sessionWorkout.name,
        date: sessionWorkout.date,
        baseSets: sessionWorkout.baseSets,
        baseReps: sessionWorkout.baseReps,
        baseRest: sessionWorkout.baseRest,
        isCompleted: true
      });
      await polyglotStorageMesh.writeQuorum('pulsefit_workout_history', existingHistory);
    } catch {}

    // Run background 40-day data pruning and silent telemetry recalculation
    dataPruningService.runAutomatedPruning().catch(() => {});
    silentVolumeEngine.silentlyRecalculate().catch(() => {});
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
    silentStepEngine.silentlyRecalculate().catch(() => {});

    return state;
  }

  async ensureCurrentWeekWorkouts(): Promise<AppState> {
    return this.getState();
  }
}

export const storage = new StorageService();
