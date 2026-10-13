import { wrap, Remote } from 'comlink';
import localforage from 'localforage';
import { OPFSBinaryEngine } from './opfsStorageEngine';
import { getRxDBProxy } from '../utils/rxdbManager';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import type { 
  SilentCalorieEngineWorker, 
  CalorieAuditSummary, 
  DailyCalorieLedgerRecord,
  RawDayMealRecord,
  RawWorkoutItem
} from '../workers/silentCalorieEngine.worker';

export type { CalorieAuditSummary, DailyCalorieLedgerRecord };

const CALORIE_STORAGE_KEY = 'pulsefit_hidden_daily_calorie_ledger';

class SilentCalorieEngineService {
  private workerPool: WorkStealingWorkerPool<SilentCalorieEngineWorker> | null = null;
  private opfs = OPFSBinaryEngine.getInstance();
  private cachedSummary: CalorieAuditSummary | null = null;
  private isProcessing: boolean = false;

  constructor() {
    this.initPool();
  }

  private initPool() {
    if (typeof window === 'undefined' || typeof Worker === 'undefined') return;

    try {
      this.workerPool = new WorkStealingWorkerPool<SilentCalorieEngineWorker>(
        () => new Worker(new URL('../workers/silentCalorieEngine.worker.ts', import.meta.url), { type: 'module' }),
        2
      );
    } catch (err) {
      console.warn('[SilentCalorieEngine] Worker pool init notice:', err);
    }
  }

  /**
   * Silently scans meal logs, profile biometrics, and workouts,
   * calculating the day-by-day caloric ledger in background worker pool.
   * Runs completely in background without any UI triggers or interruptions.
   */
  public async silentlyRecalculate(): Promise<CalorieAuditSummary> {
    if (this.isProcessing && this.cachedSummary) {
      return this.cachedSummary;
    }
    this.isProcessing = true;

    try {
      // 1. Gather all logged meal days
      const calorieLogStore = localforage.createInstance({
        name: 'PulseFit_CalorieTracker',
        storeName: 'pulsefit_calorie_logs'
      });

      const dayKeys = await calorieLogStore.keys();
      const rawDays: RawDayMealRecord[] = [];

      for (const key of dayKeys) {
        if (/^\d{4}-\d{2}-\d{2}$/.test(key)) {
          const dayRecord = await calorieLogStore.getItem<RawDayMealRecord>(key);
          if (dayRecord) {
            rawDays.push(dayRecord);
          }
        }
      }

      // 2. Fetch app workouts & user profile from OPFS or localforage
      const appState = (await this.opfs.readAtomic('pulsefit_state')) || 
                        (await localforage.getItem<any>('app_state'));
      const stateWorkouts: RawWorkoutItem[] = appState?.workouts || [];
      const profile = appState?.profile || null;

      // Also check RxDB for any synchronized state updates
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

      // 3. Fetch active step burns
      const sessionVaultStore = localforage.createInstance({
        name: 'PulseFit_CalorieTracker',
        storeName: 'pulsefit_session_vault'
      });
      const activeBurnMap: Record<string, number> = {};
      const vaultKeys = await sessionVaultStore.keys();
      for (const vk of vaultKeys) {
        if (vk.startsWith('active_burn_') || vk.startsWith('burn_')) {
          const dateStr = vk.replace(/^(active_burn_|burn_)/, '');
          const rec = await sessionVaultStore.getItem<any>(vk);
          if (rec && typeof rec.caloriesBurned === 'number') {
            activeBurnMap[dateStr] = Math.max(activeBurnMap[dateStr] || 0, rec.caloriesBurned);
          }
        }
      }

      // 4. Delegate to Web Worker Pool via Comlink RPC
      if (!this.workerPool) {
        this.initPool();
      }

      let summary: CalorieAuditSummary;
      if (this.workerPool) {
        summary = await this.workerPool.executeTask(worker =>
          worker.computeDailyCaloricAudit(
            rawDays,
            stateWorkouts,
            profile,
            activeBurnMap
          )
        );
      } else {
        summary = this.fallbackEmptySummary();
      }

      this.cachedSummary = summary;

      // 5. Persist silently in localforage & OPFS
      await localforage.setItem(CALORIE_STORAGE_KEY, summary);
      await this.opfs.writeAtomic(CALORIE_STORAGE_KEY, summary);

      return summary;
    } catch (err) {
      console.warn('[SilentCalorieEngine] Quiet recalculation error:', err);
      return this.fallbackEmptySummary();
    } finally {
      this.isProcessing = false;
    }
  }

  public async getDailyCalorieSummary(): Promise<CalorieAuditSummary> {
    if (this.cachedSummary) return this.cachedSummary;

    try {
      const stored = await localforage.getItem<CalorieAuditSummary>(CALORIE_STORAGE_KEY);
      if (stored) {
        this.cachedSummary = stored;
        return stored;
      }
    } catch {}

    return await this.silentlyRecalculate();
  }

  private fallbackEmptySummary(): CalorieAuditSummary {
    return {
      lifetimeCaloriesTracked: 0,
      activeLoggedDays: 0,
      averageDailyIntakeKcal: 0,
      averageDailyExpenditureKcal: 0,
      averageDailyNetBalanceKcal: 0,
      rolling7DayNetDeficitKcal: 0,
      rolling30DayNetDeficitKcal: 0,
      cumulativeNetAdiposeDeltaGrams: 0,
      averageMacroSplit: { proteinPercent: 0, carbsPercent: 0, fatsPercent: 0 },
      dailyLedger: [],
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

export const silentCalorieEngine = new SilentCalorieEngineService();
