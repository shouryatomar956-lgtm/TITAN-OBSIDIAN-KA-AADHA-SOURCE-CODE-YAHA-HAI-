import { wrap, Remote } from 'comlink';
import localforage from 'localforage';
import { OPFSBinaryEngine } from './opfsStorageEngine';
import { getRxDBProxy } from '../utils/rxdbManager';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import type { 
  SilentVolumeEngineWorker, 
  VolumeAuditSummary, 
  DailyVolumeRecord, 
  DailyExerciseDetail 
} from '../workers/silentVolumeEngine.worker';

export type { VolumeAuditSummary, DailyVolumeRecord, DailyExerciseDetail };

const STORAGE_KEY = 'pulsefit_hidden_daily_volume_ledger';

class SilentVolumeEngineService {
  private workerPool: WorkStealingWorkerPool<SilentVolumeEngineWorker> | null = null;
  private opfs = OPFSBinaryEngine.getInstance();
  private cachedSummary: VolumeAuditSummary | null = null;
  private isProcessing: boolean = false;

  constructor() {
    this.initPool();
  }

  private initPool() {
    if (typeof window === 'undefined' || typeof Worker === 'undefined') return;

    try {
      this.workerPool = new WorkStealingWorkerPool<SilentVolumeEngineWorker>(
        () => new Worker(new URL('../workers/silentVolumeEngine.worker.ts', import.meta.url), { type: 'module' }),
        2
      );
    } catch (err) {
      console.warn('[SilentVolumeEngine] Worker pool initialization notice:', err);
    }
  }

  /**
   * Silently scans RxDB, localforage, and OPFS storage sources and calculates
   * the user's complete volume ledger day-by-day in background worker threads.
   * Completely invisible to the user with zero UI lag.
   */
  public async silentlyRecalculate(): Promise<VolumeAuditSummary> {
    if (this.isProcessing && this.cachedSummary) {
      return this.cachedSummary;
    }
    this.isProcessing = true;

    try {
      // 1. Gather all historical completed workouts from localforage
      const history = (await localforage.getItem<any[]>('pulsefit_workout_history')) || [];
      
      // 2. Fetch app workouts & user profile from OPFS or localforage
      const appState = (await this.opfs.readAtomic('pulsefit_state')) || 
                        (await localforage.getItem<any>('app_state'));
      const stateWorkouts = appState?.workouts || [];

      // 3. Query RxDB for any synchronized workout documents
      let rxdbWorkouts: any[] = [];
      try {
        const rxdb = await getRxDBProxy();
        if (rxdb) {
          const rxState = await rxdb.getState();
          if (rxState && Array.isArray(rxState.workouts)) {
            rxdbWorkouts = rxState.workouts;
          }
        }
      } catch {}

      // Combine app workouts with any RxDB workouts
      const combinedWorkouts = [...stateWorkouts];
      const seenWorkoutIds = new Set(combinedWorkouts.map(w => w.id).filter(Boolean));
      rxdbWorkouts.forEach(rw => {
        if (rw && rw.id && !seenWorkoutIds.has(rw.id)) {
          seenWorkoutIds.add(rw.id);
          combinedWorkouts.push(rw);
        }
      });

      // 4. Fetch real-time rep counter sessions
      const repSessions = (await localforage.getItem<any[]>('pulsefit_rep_counter_history')) || [];

      // 5. User weight for accurate biomechanical kinetic modeling
      let userWeightKg = 72;
      const profile = appState?.profile;
      if (profile) {
        if (profile.weightKg && typeof profile.weightKg === 'number') {
          userWeightKg = profile.weightKg;
        } else if (profile.weight) {
          const parsed = parseFloat(String(profile.weight));
          if (!isNaN(parsed) && parsed > 30) userWeightKg = parsed;
        }
      }

      // 6. Delegate heavy volumetric calculations to Web Worker Pool via Comlink RPC
      if (!this.workerPool) {
        this.initPool();
      }

      let summary: VolumeAuditSummary;
      if (this.workerPool) {
        summary = await this.workerPool.executeTask(worker =>
          worker.computeDailyVolumetricAudit(
            combinedWorkouts,
            history,
            repSessions,
            userWeightKg
          )
        );
      } else {
        summary = this.fallbackCompute();
      }

      this.cachedSummary = summary;

      // 7. Persist silently in localforage & OPFS binary engine
      await localforage.setItem(STORAGE_KEY, summary);
      await this.opfs.writeAtomic(STORAGE_KEY, summary);

      return summary;
    } catch (err) {
      console.warn('[SilentVolumeEngine] Background recalculation notice:', err);
      return this.getCachedOrEmptySummary();
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Retrieves the latest daily volume ledger summary quietly
   */
  public async getDailyLedgerSummary(): Promise<VolumeAuditSummary> {
    if (this.cachedSummary) {
      return this.cachedSummary;
    }

    try {
      const stored = await localforage.getItem<VolumeAuditSummary>(STORAGE_KEY);
      if (stored) {
        this.cachedSummary = stored;
        return stored;
      }
    } catch {}

    return await this.silentlyRecalculate();
  }

  private getCachedOrEmptySummary(): VolumeAuditSummary {
    return this.cachedSummary || this.fallbackCompute();
  }

  private fallbackCompute(): VolumeAuditSummary {
    return {
      lifetimeTonnageKg: 0,
      lifetimeMechanicalWorkKJ: 0,
      lifetimeTotalReps: 0,
      lifetimeTotalSets: 0,
      activeTrainingDays: 0,
      averageDailyTonnageKg: 0,
      acuteToChronicWorkloadRatio: 1.0,
      peakVolumeDay: null,
      rolling7DayTonnageKg: 0,
      rolling30DayTonnageKg: 0,
      dailyLedger: [],
      topMusclesByVolume: [],
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

export const silentVolumeEngine = new SilentVolumeEngineService();
