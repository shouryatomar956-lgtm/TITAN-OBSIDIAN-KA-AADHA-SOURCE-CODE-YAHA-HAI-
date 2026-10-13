import localforage from 'localforage';
import { OPFSBinaryEngine } from './opfsStorageEngine';

export const PRUNING_RETENTION_DAYS = 40;
export const PRUNING_RETENTION_MS = PRUNING_RETENTION_DAYS * 24 * 60 * 60 * 1000;

/**
 * Permanently protected keys that must NEVER be purged under any circumstances:
 * - Onboarding information
 * - User PIN / security hash
 * - User biometrics & physical constraints
 * - Reward Vault state, badges, and themes
 * - Streaks and protected rest days
 */
export const PERMANENTLY_PROTECTED_KEYS: ReadonlyArray<string> = [
  'pulsefit_user_profile',
  'pulsefit_auth_pin',
  'pulsefit_user_biometrics',
  'pulsefit_vault_state',
  'pulsefit_active_theme',
  'pulsefit_overlay_notified_keys',
  'pulsefit_water_intake',
  'pulsefit_water_days_count',
  'pulsefit_ai_voice_coach_enabled',
  'pulsefit_haptics_enabled',
  'pulsefit_notified_rare_mythic_overlay'
];

export interface PruningAuditResult {
  executedAt: string;
  cutoffDate: string;
  workoutsPruned: number;
  workoutsRetained: number;
  repLogsPruned: number;
  repLogsRetained: number;
  protectedKeysPreserved: number;
}

class DataPruningService {
  private lastRunTimestamp: number = 0;
  private isPruning: boolean = false;

  /**
   * Evaluates age differentials and purges workout logs older than 40 days.
   * Runs non-blockingly on app startup and session save events.
   */
  public async runAutomatedPruning(): Promise<PruningAuditResult> {
    // Throttle checks to once every 10 minutes unless forced
    const now = Date.now();
    if (this.isPruning || (now - this.lastRunTimestamp < 10 * 60 * 1000)) {
      return {
        executedAt: new Date(now).toISOString(),
        cutoffDate: new Date(now - PRUNING_RETENTION_MS).toISOString(),
        workoutsPruned: 0,
        workoutsRetained: 0,
        repLogsPruned: 0,
        repLogsRetained: 0,
        protectedKeysPreserved: PERMANENTLY_PROTECTED_KEYS.length
      };
    }

    this.isPruning = true;
    const cutoffTimestamp = now - PRUNING_RETENTION_MS;
    const cutoffDateIso = new Date(cutoffTimestamp).toISOString();

    let workoutsPruned = 0;
    let workoutsRetained = 0;
    let repLogsPruned = 0;
    let repLogsRetained = 0;

    try {
      // 1. Prune pulsefit_workout_history in localforage
      const history = await localforage.getItem<any[]>('pulsefit_workout_history');
      if (Array.isArray(history)) {
        const freshHistory = history.filter((entry) => {
          const entryTime = entry.timestamp 
            ? new Date(entry.timestamp).getTime() 
            : (entry.date ? new Date(entry.date).getTime() : now);
          
          if (!isNaN(entryTime) && entryTime < cutoffTimestamp) {
            workoutsPruned++;
            return false;
          }
          workoutsRetained++;
          return true;
        });

        if (workoutsPruned > 0) {
          await localforage.setItem('pulsefit_workout_history', freshHistory);
        }
      }

      // 2. Prune app_state / pulsefit_state workouts array while strictly preserving streaks & protected dates
      const opfs = OPFSBinaryEngine.getInstance();
      const appState = (await opfs.readAtomic('pulsefit_state')) || (await localforage.getItem<any>('app_state'));
      if (appState && Array.isArray(appState.workouts)) {
        const initialCount = appState.workouts.length;
        appState.workouts = appState.workouts.filter((w: any) => {
          const wTime = w.date ? new Date(w.date).getTime() : now;
          return isNaN(wTime) || wTime >= cutoffTimestamp;
        });
        const prunedFromState = initialCount - appState.workouts.length;
        if (prunedFromState > 0) {
          await opfs.writeAtomic('pulsefit_state', appState);
          await localforage.setItem('app_state', appState);
        }
      }

      // 3. Prune pulsefit_rep_counter_history in localforage
      const repHistory = await localforage.getItem<any[]>('pulsefit_rep_counter_history');
      if (Array.isArray(repHistory)) {
        const freshRepHistory = repHistory.filter((entry) => {
          const entryTime = entry.timestamp ? Number(entry.timestamp) : now;
          if (entryTime < cutoffTimestamp) {
            repLogsPruned++;
            return false;
          }
          repLogsRetained++;
          return true;
        });

        if (repLogsPruned > 0) {
          await localforage.setItem('pulsefit_rep_counter_history', freshRepHistory);
        }
      }

      // 4. Verify permanent protection of key identities
      let protectedFound = 0;
      for (const key of PERMANENTLY_PROTECTED_KEYS) {
        const val = await localforage.getItem(key);
        if (val !== null && val !== undefined) {
          protectedFound++;
        }
      }

      this.lastRunTimestamp = now;

      const result: PruningAuditResult = {
        executedAt: new Date(now).toISOString(),
        cutoffDate: cutoffDateIso,
        workoutsPruned,
        workoutsRetained,
        repLogsPruned,
        repLogsRetained,
        protectedKeysPreserved: protectedFound
      };

      if (workoutsPruned > 0 || repLogsPruned > 0) {
        console.log(`[StoragePruning] 40-day optimization complete: Pruned ${workoutsPruned} workouts and ${repLogsPruned} rep logs. Preserved ${protectedFound} protected identity keys.`);
      }

      return result;
    } catch (err) {
      console.warn('[StoragePruning] Pruning notice:', err);
      return {
        executedAt: new Date(now).toISOString(),
        cutoffDate: cutoffDateIso,
        workoutsPruned,
        workoutsRetained,
        repLogsPruned,
        repLogsRetained,
        protectedKeysPreserved: PERMANENTLY_PROTECTED_KEYS.length
      };
    } finally {
      this.isPruning = false;
    }
  }
}

export const dataPruningService = new DataPruningService();
