import { wrap, Remote } from 'comlink';
import localforage from 'localforage';
import { OPFSBinaryEngine } from './opfsStorageEngine';
import { getRxDBProxy } from '../utils/rxdbManager';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import { stepBurnEstimator } from './StepBurnEstimator';
import type { 
  SilentStepEngineWorker, 
  StepAuditSummary, 
  DailyStepRecord,
  RawDayStepInput,
  RawUserProfileStep
} from '../workers/silentStepEngine.worker';

export type { StepAuditSummary, DailyStepRecord };

const STEP_STORAGE_KEY = 'pulsefit_hidden_daily_step_ledger';

class SilentStepEngineService {
  private workerPool: WorkStealingWorkerPool<SilentStepEngineWorker> | null = null;
  private opfs = OPFSBinaryEngine.getInstance();
  private cachedSummary: StepAuditSummary | null = null;
  private isProcessing: boolean = false;

  constructor() {
    this.initPool();
  }

  private initPool() {
    if (typeof window === 'undefined' || typeof Worker === 'undefined') return;

    try {
      this.workerPool = new WorkStealingWorkerPool<SilentStepEngineWorker>(
        () => new Worker(new URL('../workers/silentStepEngine.worker.ts', import.meta.url), { type: 'module' }),
        2
      );
    } catch (err) {
      console.warn('[SilentStepEngine] Worker pool init notice:', err);
    }
  }

  /**
   * Silently scans step odometers, active burns, and locomotion sessions across localforage,
   * OPFS, and RxDB, computing high-precision locomotion metrics in a background Web Worker pool.
   */
  public async silentlyRecalculate(): Promise<StepAuditSummary> {
    if (this.isProcessing && this.cachedSummary) {
      return this.cachedSummary;
    }
    this.isProcessing = true;

    try {
      // 1. Gather all active step burn logs from session vault
      const sessionVaultStore = localforage.createInstance({
        name: 'PulseFit_CalorieTracker',
        storeName: 'pulsefit_session_vault'
      });

      const vaultKeys = await sessionVaultStore.keys();
      const rawRecords: RawDayStepInput[] = [];

      for (const vk of vaultKeys) {
        if (vk.startsWith('active_burn_') || vk.startsWith('burn_')) {
          const dateStr = vk.replace(/^(active_burn_|burn_)/, '');
          const rec = await sessionVaultStore.getItem<any>(vk);
          if (rec && typeof rec.steps === 'number') {
            rawRecords.push({
              date: dateStr,
              steps: rec.steps,
              caloriesBurned: rec.caloriesBurned,
              activeMinutes: rec.activeMinutes
            });
          }
        }
      }

      // 2. Incorporate live accelerometer step state for today
      try {
        const liveState = stepBurnEstimator.getState();
        const todayStr = new Date().toISOString().split('T')[0];
        const existingIdx = rawRecords.findIndex(r => r.date === todayStr);

        if (liveState && liveState.steps > 0) {
          if (existingIdx >= 0) {
            rawRecords[existingIdx].steps = Math.max(rawRecords[existingIdx].steps, liveState.steps);
            rawRecords[existingIdx].caloriesBurned = Math.max(rawRecords[existingIdx].caloriesBurned || 0, liveState.caloriesBurned);
          } else {
            rawRecords.push({
              date: todayStr,
              steps: liveState.steps,
              caloriesBurned: liveState.caloriesBurned
            });
          }
        }
      } catch {}

      // 3. Odometer baseline from localforage
      const odometerTotal = await localforage.getItem<number>('pulsefit_step_odometer') || 
                            await localforage.getItem<number>('pulsefit_daily_steps') || 0;

      // 4. Fetch profile from OPFS or localforage
      const appState = (await this.opfs.readAtomic('pulsefit_state')) || 
                        (await localforage.getItem<any>('app_state'));
      const profile: RawUserProfileStep | null = appState?.profile || null;

      // 5. Query RxDB for any synced user biometric changes
      try {
        const rxdb = await getRxDBProxy();
        if (rxdb) {
          const rxProfile = await rxdb.getUserProfile();
          if (rxProfile && profile) {
            if (rxProfile.weight) profile.weight = rxProfile.weight;
            if (rxProfile.height) profile.height = rxProfile.height;
          }
        }
      } catch {}

      // 6. Execute through Web Worker Pool via Comlink RPC
      if (!this.workerPool) {
        this.initPool();
      }

      let summary: StepAuditSummary;
      if (this.workerPool) {
        summary = await this.workerPool.executeTask(worker =>
          worker.computeDailyStepAudit(
            rawRecords,
            profile,
            odometerTotal
          )
        );
      } else {
        summary = this.fallbackEmptySummary();
      }

      this.cachedSummary = summary;

      // 7. Persist silently in localforage & OPFS
      await localforage.setItem(STEP_STORAGE_KEY, summary);
      await this.opfs.writeAtomic(STEP_STORAGE_KEY, summary);

      return summary;
    } catch (err) {
      console.warn('[SilentStepEngine] Quiet recalculation notice:', err);
      return this.fallbackEmptySummary();
    } finally {
      this.isProcessing = false;
    }
  }

  public async getDailyStepSummary(): Promise<StepAuditSummary> {
    if (this.cachedSummary) return this.cachedSummary;

    try {
      const stored = await localforage.getItem<StepAuditSummary>(STEP_STORAGE_KEY);
      if (stored) {
        this.cachedSummary = stored;
        return stored;
      }
    } catch {}

    return await this.silentlyRecalculate();
  }

  private fallbackEmptySummary(): StepAuditSummary {
    return {
      lifetimeSteps: 0,
      lifetimeDistanceKm: 0,
      lifetimeDistanceMiles: 0,
      lifetimeCaloriesBurned: 0,
      activeWalkingDays: 0,
      averageDailySteps: 0,
      averageDailyDistanceKm: 0,
      peakStepDay: null,
      rolling7DayAvgSteps: 0,
      rolling30DayAvgSteps: 0,
      stepGoalStreakDays: 0,
      dailyLedger: [],
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

export const silentStepEngine = new SilentStepEngineService();
