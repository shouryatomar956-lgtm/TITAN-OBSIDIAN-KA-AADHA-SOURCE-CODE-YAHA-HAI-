import { useEffect, useRef } from 'react';
import localforage from 'localforage';
import { vaultService } from './vaultService';
import { stepBurnEstimator } from './StepBurnEstimator';
import { getRxDBProxy } from '../utils/rxdbManager';
import { VaultTelemetry, TELEMETRY_MILESTONES, MilestoneAchievementDefinition } from '../types/vault';
import { runIdleTask } from '../utils/optimizationEngine';

export interface TelemetryDelta {
  calories: number;
  volume: number;
  steps: number;
  changed: boolean;
}

export class MilestoneMonitor {
  private static instance: MilestoneMonitor | null = null;
  private isRunning = false;
  private pollTimer: any = null;
  private stepUnsubscribe: (() => void) | null = null;
  private rxdbUnsubscribe: (() => void) | null = null;
  private broadcastChannel: BroadcastChannel | null = null;

  // Track latest verified values to prevent redundant evaluations
  private lastObserved = {
    calories: -1,
    volume: -1,
    steps: -1,
    lastChecked: 0
  };

  private registeredMilestoneIds = new Set<string>();

  public static getInstance(): MilestoneMonitor {
    if (!this.instance) {
      this.instance = new MilestoneMonitor();
    }
    return this.instance;
  }

  private constructor() {
    this.initBroadcastChannel();
  }

  private initBroadcastChannel() {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('pulsefit_telemetry_stream');
        this.broadcastChannel.onmessage = (e) => {
          if (e.data?.type === 'TELEMETRY_UPDATED') {
            this.handleTelemetryChanged(e.data.payload);
          }
        };
      } catch (err) {
        console.warn('[MilestoneMonitor] BroadcastChannel init notice:', err);
      }
    }
  }

  /**
   * Starts headless monitoring across RxDB, localforage, worker pool, and live biometrics.
   */
  public start(): () => void {
    if (this.isRunning || typeof window === 'undefined') {
      return () => this.stop();
    }

    this.isRunning = true;

    // 1. Preload unlocked badges from vault state to prevent re-evaluating completed milestones
    vaultService.loadVaultState().then((state) => {
      if (state?.unlockedBadges) {
        state.unlockedBadges.forEach(id => this.registeredMilestoneIds.add(id));
      }
      this.checkTelemetryNow();
    }).catch(() => {
      this.checkTelemetryNow();
    });

    // 2. Subscribe to real-time step and active calorie changes from StepBurnEstimator
    try {
      this.stepUnsubscribe = stepBurnEstimator.subscribe((state) => {
        const liveSteps = state.steps || 0;
        const liveCalories = Math.round(state.caloriesBurned || 0);
        if (liveSteps !== this.lastObserved.steps || liveCalories !== this.lastObserved.calories) {
          this.scheduleHeadlessEvaluation();
        }
      });
    } catch (e) {
      console.warn('[MilestoneMonitor] Step estimator subscription notice:', e);
    }

    // 3. Subscribe to RxDB updates via Worker Proxy and Comlink
    getRxDBProxy().then((rxdb) => {
      if (rxdb && typeof rxdb.subscribeToState === 'function') {
        rxdb.subscribeToState((appState: any) => {
          if (appState?.workouts) {
            this.scheduleHeadlessEvaluation();
          }
        }).then((unsub: any) => {
          if (typeof unsub === 'function') {
            this.rxdbUnsubscribe = unsub;
          }
        }).catch(() => {});
      }
    }).catch(() => {});

    // 4. Window Event Listeners for local mutation triggers
    const onStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'pulsefit_workout_history' ||
        e.key === 'pulsefit_daily_calories' ||
        e.key === 'pulsefit_step_odometer' ||
        e.key === 'pulsefit_telemetry_state'
      ) {
        this.scheduleHeadlessEvaluation();
      }
    };

    const onCustomEvent = () => {
      this.scheduleHeadlessEvaluation();
    };

    window.addEventListener('storage', onStorageChange);
    window.addEventListener('pulsefit_workout_logged', onCustomEvent);
    window.addEventListener('pulsefit_calorie_logged', onCustomEvent);
    window.addEventListener('pulsefit_step_update', onCustomEvent);
    window.addEventListener('pulsefit_telemetry_updated', onCustomEvent);

    // 5. Periodic idle background observer
    const pollIntervalMs = 3000;
    this.pollTimer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        runIdleTask(() => {
          this.checkTelemetryNow();
        });
      }
    }, pollIntervalMs);

    return () => this.stop();
  }

  /**
   * Stops headless monitoring and disposes listeners.
   */
  public stop(): void {
    this.isRunning = false;
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
    if (this.stepUnsubscribe) {
      this.stepUnsubscribe();
      this.stepUnsubscribe = null;
    }
    if (this.rxdbUnsubscribe) {
      this.rxdbUnsubscribe();
      this.rxdbUnsubscribe = null;
    }
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.close();
      } catch {}
      this.broadcastChannel = null;
    }
  }

  private isEvaluating = false;
  private debounceTimer: any = null;

  /**
   * Non-blocking headless evaluation scheduled with debouncing
   */
  public scheduleHeadlessEvaluation(): void {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      runIdleTask(() => {
        this.checkTelemetryNow();
      });
    }, 400);
  }

  /**
   * Collects current telemetry and triggers VaultService milestone registration
   * whenever thresholds for calories, volume, or steps are met.
   */
  public async checkTelemetryNow(): Promise<void> {
    if (this.isEvaluating) return;
    this.isEvaluating = true;

    try {
      const telemetry = await vaultService.collectLocalTelemetry();

      const currentCalories = Math.max(0, Math.round(telemetry.calories || 0));
      const currentVolume = Math.max(0, Math.round(telemetry.volume || 0));
      const currentSteps = Math.max(0, Math.round(telemetry.steps || 0));

      const hasChanged = 
        this.lastObserved.calories !== currentCalories ||
        this.lastObserved.volume !== currentVolume ||
        this.lastObserved.steps !== currentSteps;

      if (!hasChanged) {
        return;
      }

      this.lastObserved = {
        calories: currentCalories,
        volume: currentVolume,
        steps: currentSteps,
        lastChecked: Date.now()
      };

      // Check if any defined milestone threshold is newly satisfied
      const thresholdsToTrigger: MilestoneAchievementDefinition[] = [];

      for (const milestone of TELEMETRY_MILESTONES) {
        if (this.registeredMilestoneIds.has(milestone.id)) {
          continue;
        }

        let metricVal = 0;
        if (milestone.metric === 'calories') metricVal = currentCalories;
        else if (milestone.metric === 'volume') metricVal = currentVolume;
        else if (milestone.metric === 'steps') metricVal = currentSteps;

        if (metricVal >= milestone.threshold) {
          thresholdsToTrigger.push(milestone);
        }
      }

      // If any thresholds are met, trigger VaultService to register achievements
      if (thresholdsToTrigger.length > 0) {
        for (const milestone of thresholdsToTrigger) {
          try {
            await vaultService.registerAchievement(milestone);
            this.registeredMilestoneIds.add(milestone.id);
          } catch (e) {
            console.warn(`[MilestoneMonitor] Failed to register milestone ${milestone.id}:`, e);
          }
        }
      } else {
        // Also run standard worker check to sync progress % on in-progress badges
        await vaultService.evaluateVaultMilestones(telemetry);
      }

      // Broadcast telemetry delta across tabs
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage({
          type: 'TELEMETRY_UPDATED',
          payload: {
            calories: currentCalories,
            volume: currentVolume,
            steps: currentSteps
          }
        });
      }
    } catch (err) {
      console.warn('[MilestoneMonitor] Telemetry evaluation error:', err);
    } finally {
      this.isEvaluating = false;
    }
  }

  private handleTelemetryChanged(payload: { calories: number; volume: number; steps: number }) {
    if (
      payload.calories !== this.lastObserved.calories ||
      payload.volume !== this.lastObserved.volume ||
      payload.steps !== this.lastObserved.steps
    ) {
      this.scheduleHeadlessEvaluation();
    }
  }
}

export const milestoneMonitor = MilestoneMonitor.getInstance();

/**
 * Headless React Hook for App.tsx to activate the Milestone Monitor.
 * Keeps all computation strictly off the visual thread with zero UI overhead.
 */
export function useMilestoneMonitor(): void {
  useEffect(() => {
    const cleanup = milestoneMonitor.start();
    return () => {
      cleanup();
    };
  }, []);
}
