import { wrap, Remote } from 'comlink';
import localforage from 'localforage';
import { OPFSBinaryEngine } from './opfsStorageEngine';
import { getRxDBProxy } from '../utils/rxdbManager';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import type { 
  SilentHydrationEngineWorker, 
  HydrationAuditSummary, 
  DailyHydrationRecord,
  RawDayWaterInput,
  RawWorkoutHydrationInput,
  RawUserProfileHydration
} from '../workers/silentHydrationEngine.worker';

export type { HydrationAuditSummary, DailyHydrationRecord };

const HYDRATION_STORAGE_KEY = 'pulsefit_hidden_daily_hydration_ledger';

class SilentHydrationEngineService {
  private workerPool: WorkStealingWorkerPool<SilentHydrationEngineWorker> | null = null;
  private opfs = OPFSBinaryEngine.getInstance();
  private cachedSummary: HydrationAuditSummary | null = null;
  private isProcessing: boolean = false;

  constructor() {
    this.initPool();
  }

  private initPool() {
    if (typeof window === 'undefined' || typeof Worker === 'undefined') return;

    try {
      this.workerPool = new WorkStealingWorkerPool<SilentHydrationEngineWorker>(
        () => new Worker(new URL('../workers/silentHydrationEngine.worker.ts', import.meta.url), { type: 'module' }),
        2
      );
    } catch (err) {
      console.warn('[SilentHydrationEngine] Worker pool init notice:', err);
    }
  }

  /**
   * Silently scans meal/water records, workouts, and biometrics across localforage,
   * OPFS, and RxDB, computing high-precision fluid kinetics in a background Web Worker pool.
   */
  public async silentlyRecalculate(): Promise<HydrationAuditSummary> {
    if (this.isProcessing && this.cachedSummary) {
      return this.cachedSummary;
    }
    this.isProcessing = true;

    try {
      // 1. Gather all logged meal days from Calorie Tracker store
      const calorieLogStore = localforage.createInstance({
        name: 'PulseFit_CalorieTracker',
        storeName: 'pulsefit_calorie_logs'
      });

      const dayKeys = await calorieLogStore.keys();
      const rawDays: RawDayWaterInput[] = [];

      for (const key of dayKeys) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
          const dayRecord = await calorieLogStore.getItem<any>(key);
          if (dayRecord) {
            rawDays.push({
              date: dayRecord.date || key,
              waterMl: dayRecord.waterMl || 0,
              totalCalories: dayRecord.totalCalories || 0
            });
          }
        }
      }

      // 2. Direct water tracking entries in localforage root
      const directWaterMap: Record<string, number> = {};
      const waterTotal = await localforage.getItem<number>('pulsefit_water_intake');
      if (typeof waterTotal === 'number' && waterTotal > 0) {
        const todayStr = new Date().toISOString().split('T')[0];
        directWaterMap[todayStr] = waterTotal;
      }

      // 3. Workouts & Profile from OPFS or localforage
      const appState = (await this.opfs.readAtomic('pulsefit_state')) || 
                        (await localforage.getItem<any>('app_state'));
      const stateWorkouts: RawWorkoutHydrationInput[] = appState?.workouts || [];
      const profile: RawUserProfileHydration | null = appState?.profile || null;

      // 4. Check RxDB for synced updates
      try {
        const rxdb = await getRxDBProxy();
        if (rxdb) {
          const rxState = await rxdb.getState();
          if (rxState && Array.isArray(rxState.workouts)) {
            const seenIds = new Set(stateWorkouts.map(w => (w as any).id).filter(Boolean));
            rxState.workouts.forEach((rw: any) => {
              if (rw && rw.id && !seenIds.has(rw.id)) {
                seenIds.add(rw.id);
                stateWorkouts.push(rw);
              }
            });
          }
        }
      } catch {}

      // 5. Gather step locomotion maps for fluid perspiration loss
      const sessionVaultStore = localforage.createInstance({
        name: 'PulseFit_CalorieTracker',
        storeName: 'pulsefit_session_vault'
      });
      const stepMap: Record<string, number> = {};
      const vaultKeys = await sessionVaultStore.keys();
      for (const vk of vaultKeys) {
        if (vk.startsWith('active_burn_') || vk.startsWith('burn_')) {
          const dateStr = vk.replace(/^(active_burn_|burn_)/, '');
          const rec = await sessionVaultStore.getItem<any>(vk);
          if (rec && typeof rec.steps === 'number') {
            stepMap[dateStr] = Math.max(stepMap[dateStr] || 0, rec.steps);
          }
        }
      }

      // 6. Execute through Web Worker Pool via Comlink RPC
      if (!this.workerPool) {
        this.initPool();
      }

      let summary: HydrationAuditSummary;
      if (this.workerPool) {
        summary = await this.workerPool.executeTask(worker =>
          worker.computeDailyHydrationAudit(
            rawDays,
            stateWorkouts,
            profile,
            directWaterMap,
            stepMap
          )
        );
      } else {
        summary = this.fallbackEmptySummary();
      }

      this.cachedSummary = summary;

      // 7. Persist quietly in localforage & OPFS binary driver
      await localforage.setItem(HYDRATION_STORAGE_KEY, summary);
      await this.opfs.writeAtomic(HYDRATION_STORAGE_KEY, summary);

      return summary;
    } catch (err) {
      console.warn('[SilentHydrationEngine] Quiet recalculation notice:', err);
      return this.fallbackEmptySummary();
    } finally {
      this.isProcessing = false;
    }
  }

  public async getDailyHydrationSummary(): Promise<HydrationAuditSummary> {
    if (this.cachedSummary) return this.cachedSummary;

    try {
      const stored = await localforage.getItem<HydrationAuditSummary>(HYDRATION_STORAGE_KEY);
      if (stored) {
        this.cachedSummary = stored;
        return stored;
      }
    } catch {}

    return await this.silentlyRecalculate();
  }

  private fallbackEmptySummary(): HydrationAuditSummary {
    return {
      lifetimeWaterLiters: 0,
      activeHydrationDays: 0,
      averageDailyIntakeMl: 0,
      averageNetBalanceMl: 0,
      peakHydrationDay: null,
      rolling7DayAvgMl: 0,
      rolling30DayAvgMl: 0,
      hydrationStreakDays: 0,
      dailyLedger: [],
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

export const silentHydrationEngine = new SilentHydrationEngineService();
