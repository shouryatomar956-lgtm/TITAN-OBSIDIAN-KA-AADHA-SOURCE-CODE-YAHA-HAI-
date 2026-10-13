import localforage from 'localforage';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import { 
  VaultState, 
  INITIAL_VAULT_STATE, 
  INITIAL_VAULT_CATEGORIES,
  MASTER_VAULT_THEMES, 
  MASTER_VAULT_BADGES,
  VaultTheme, 
  VaultBadge,
  VaultTier,
  VaultTelemetry,
  ThemeCssVars,
  MilestoneAchievementDefinition,
  TELEMETRY_MILESTONES
} from '../types/vault';
import { getRxDBProxy } from '../utils/rxdbManager';
import { stepBurnEstimator } from './StepBurnEstimator';

export const KEY_VAULT_STATE = 'pulsefit_vault_state';
export const KEY_ACTIVE_THEME = 'pulsefit_active_theme';
export const KEY_TELEMETRY = 'pulsefit_telemetry_state';

// Developer hardcoded default Theme #01
export const DEFAULT_THEME_ID = 'obsidian-violet';

export const DEFAULT_THEME_CSS: ThemeCssVars = {
  primaryAccent: '#8b5cf6',
  borderGlow: 'rgba(139, 92, 246, 0.45)',
  bgCard: 'rgba(18, 18, 24, 0.85)',
  bgPage: '#09090b',
  accentGradient: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)'
};

export interface ToastEventDetail {
  message: string;
  type?: 'reward' | 'info' | 'success';
  timestamp: number;
}

class VaultService {
  private workerPool: WorkStealingWorkerPool<any> | null = null;
  private syncChannel: BroadcastChannel | null = null;
  private stateListeners: Set<(state: VaultState) => void> = new Set();
  private themeListeners: Set<(theme: string) => void> = new Set();
  private toastListeners: Set<(toast: ToastEventDetail) => void> = new Set();
  private cachedState: VaultState | null = null;
  private cachedTheme: string | null = null;
  private isEvaluating: boolean = false;

  constructor() {
    this.initWorkersAndChannels();
    this.ensureDefaultThemeApplied();
  }

  private initWorkersAndChannels() {
    if (typeof window === 'undefined') return;

    try {
      this.workerPool = new WorkStealingWorkerPool(
        () => new Worker(new URL('../workers/vault.worker.ts', import.meta.url), { type: 'module' }),
        2
      );
    } catch (e) {
      console.warn('[VaultService] Worker pool init warning:', e);
    }

    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.syncChannel = new BroadcastChannel('pulsefit_vault_sync');
        this.syncChannel.onmessage = (event) => {
          if (event.data?.type === 'VAULT_STATE_UPDATED') {
            this.cachedState = event.data.payload;
            this.notifyStateListeners(event.data.payload);
          } else if (event.data?.type === 'ACTIVE_THEME_UPDATED') {
            this.cachedTheme = event.data.payload;
            this.applyCssVariablesToDom(event.data.payload);
            this.notifyThemeListeners(event.data.payload);
          } else if (event.data?.type === 'TOAST_FIRED') {
            this.notifyToastListeners(event.data.payload);
          }
        };
      } catch (e) {
        console.warn('[VaultService] BroadcastChannel unavailable:', e);
      }
    }

    // Window storage listener for localforage fallback events
    window.addEventListener('storage', (e) => {
      if (e.key === KEY_VAULT_STATE) {
        this.loadVaultState().then((state) => this.notifyStateListeners(state));
      } else if (e.key === KEY_ACTIVE_THEME) {
        this.getActiveTheme().then((theme) => {
          this.applyCssVariablesToDom(theme);
          this.notifyThemeListeners(theme);
        });
      }
    });

    // Custom window events
    window.addEventListener('pulsefit_vault_state_changed', ((e: CustomEvent) => {
      if (e.detail) {
        this.cachedState = e.detail;
        this.notifyStateListeners(e.detail);
      }
    }) as EventListener);

    window.addEventListener('pulsefit_active_theme_changed', ((e: CustomEvent) => {
      if (e.detail) {
        this.cachedTheme = e.detail;
        this.applyCssVariablesToDom(e.detail);
        this.notifyThemeListeners(e.detail);
      }
    }) as EventListener);

    window.addEventListener('pulsefit_trigger_vault_eval', (() => {
      this.evaluateVaultMilestones().catch(() => {});
    }) as EventListener);
  }

  /**
   * Applies root CSS variables (--primary-accent, --border-glow, --bg-card) to document.documentElement
   */
  public applyCssVariablesToDom(themeId?: string): void {
    if (typeof document === 'undefined') return;

    const availableThemes = (this.cachedState?.themes && this.cachedState.themes.length > 0)
      ? this.cachedState.themes
      : MASTER_VAULT_THEMES;

    const theme = availableThemes.find(t => t.id === themeId);
    const cssVars = theme?.cssVars || DEFAULT_THEME_CSS;
    const root = document.documentElement;

    root.style.setProperty('--primary-accent', cssVars.primaryAccent);
    root.style.setProperty('--border-glow', cssVars.borderGlow);
    root.style.setProperty('--bg-card', cssVars.bgCard);
    if (cssVars.bgPage) {
      root.style.setProperty('--bg-page', cssVars.bgPage);
    }
    if (cssVars.accentGradient) {
      root.style.setProperty('--accent-gradient', cssVars.accentGradient);
    }

    // Set data-theme attribute on root
    root.setAttribute('data-theme', theme?.id || themeId || DEFAULT_THEME_ID);
  }

  /**
   * Ensures Theme #01 developer default is applied immediately out-of-the-box
   */
  private async ensureDefaultThemeApplied(): Promise<void> {
    try {
      const active = await this.getActiveTheme();
      this.applyCssVariablesToDom(active);
    } catch {
      this.applyCssVariablesToDom(DEFAULT_THEME_ID);
    }
  }

  /**
   * Retrieves Vault State from localforage, verified through local Web Worker Pool
   */
  public async loadVaultState(): Promise<VaultState> {
    try {
      const stored = await localforage.getItem<VaultState>(KEY_VAULT_STATE);
      if (stored) {
        if (MASTER_VAULT_THEMES.length > 0) {
          const storedThemeMap = new Map((stored.themes || []).map(t => [t.id, t]));
          stored.themes = MASTER_VAULT_THEMES.map(masterTheme => {
            const existing = storedThemeMap.get(masterTheme.id);
            return existing ? { ...masterTheme, isUnlocked: existing.isUnlocked || masterTheme.isUnlocked } : masterTheme;
          });
        } else {
          stored.themes = [];
        }
        if (MASTER_VAULT_BADGES.length > 0) {
          const storedBadgeMap = new Map((stored.badges || []).map(b => [b.id, b]));
          stored.badges = MASTER_VAULT_BADGES.map(masterBadge => {
            const existing = storedBadgeMap.get(masterBadge.id);
            return existing ? { 
              ...masterBadge, 
              isUnlocked: existing.isUnlocked || masterBadge.isUnlocked,
              progress: existing.progress || masterBadge.progress,
              currentValue: existing.currentValue || masterBadge.currentValue 
            } : masterBadge;
          });
        } else {
          stored.badges = [];
        }
        // Ensure categories match latest master configuration
        if (stored.categories) {
          stored.categories = INITIAL_VAULT_CATEGORIES.map(initCat => {
            const existingCat = stored.categories.find(c => c.id === initCat.id);
            const catThemes = stored.themes.filter(t => t.tier === initCat.tier);
            const catBadges = (stored.badges || []).filter(b => b.tier === initCat.tier);
            return {
              ...initCat,
              badges: catBadges.length > 0 ? catBadges : (existingCat?.badges || []),
              themes: catThemes.length > 0 ? catThemes : (existingCat?.themes || initCat.themes || []),
              isLocked: catBadges.length === 0 && catThemes.length === 0
            };
          });
        }
      }
      const telemetry = await this.collectLocalTelemetry();

      let validatedState: VaultState;
      if (this.workerPool) {
        const worker = this.workerPool.getWorker();
        const result = await worker.evaluateVaultMilestones(stored, telemetry);
        validatedState = result.state;
      } else {
        validatedState = stored || { ...INITIAL_VAULT_STATE };
      }

      await localforage.setItem(KEY_VAULT_STATE, validatedState);

      this.cachedState = validatedState;
      return validatedState;
    } catch (err) {
      console.warn('[VaultService] Fallback to initial vault state:', err);
      this.cachedState = { ...INITIAL_VAULT_STATE };
      return this.cachedState;
    }
  }

  /**
   * Collects current telemetry across localforage stores (streaks, water, calories, volume, steps, velocity)
   */
  public async collectLocalTelemetry(): Promise<VaultTelemetry> {
    try {
      // 1 & 2. Parallelize primary state & workout history reads
      const [
        appState,
        rawWorkouts,
        waterDaily,
        waterTotalStored,
        storedWaterDays,
        dailyCaloriesLogged,
        stepsOdometer,
        stepsDaily,
        storedStepDays,
        dietEntries,
        storedDietLogged,
        storedProgressIncrease,
        storedCalStreak,
        storedTargetHitStreak,
        dayRecords,
        storedTripleStreak,
        storedActiveTrainingDays,
        storedActiveDaysFallback,
        storedWaterLoggedDays,
        waterDaysList,
        storedSurge,
        storedConsistentDays,
        storedHydrationStreak,
        storedWaterStreak,
        storedBeastMode,
        storedVelocityBoost,
        storedLegacyAnchor,
        storedVelocity14d,
        storedRecoveryNotes,
        storedMacroStreak,
        storedConsistentActivity,
        storedImmortalStreak,
        storedApexSynthesis,
        storedTelemetry
      ] = await Promise.all([
        localforage.getItem<any>('app_state'),
        localforage.getItem<any[]>('pulsefit_workout_history'),
        localforage.getItem<number>('pulsefit_water_intake'),
        localforage.getItem<number>('pulsefit_total_water_logged'),
        localforage.getItem<number>('pulsefit_water_days_count'),
        localforage.getItem<number>('pulsefit_daily_calories'),
        localforage.getItem<number>('pulsefit_step_odometer'),
        localforage.getItem<number>('pulsefit_daily_steps'),
        localforage.getItem<number>('pulsefit_step_days_count'),
        localforage.getItem<any>('pulsefit_calorie_logs'),
        localforage.getItem<number>('pulsefit_diet_logged_count'),
        localforage.getItem<number>('pulsefit_progress_increase'),
        localforage.getItem<number>('pulsefit_calorie_streak'),
        localforage.getItem<number>('pulsefit_target_hit_streak'),
        localforage.getItem<any>('pulsefit_calorie_days').catch(() => []),
        localforage.getItem<number>('pulsefit_triple_goal_streak'),
        localforage.getItem<number>('pulsefit_active_training_days'),
        localforage.getItem<number>('pulsefit_active_days'),
        localforage.getItem<number>('pulsefit_water_logged_days'),
        localforage.getItem<string[]>('pulsefit_water_days_list'),
        localforage.getItem<number>('pulsefit_velocity_surge'),
        localforage.getItem<number>('pulsefit_consistent_training_days'),
        localforage.getItem<number>('pulsefit_hydration_streak_days'),
        localforage.getItem<number>('pulsefit_water_streak'),
        localforage.getItem<number>('pulsefit_beast_mode_workouts'),
        localforage.getItem<number>('pulsefit_velocity_boost_days'),
        localforage.getItem<number>('pulsefit_legacy_anchor_progress'),
        localforage.getItem<number>('pulsefit_velocity_boost_14d'),
        localforage.getItem<number>('pulsefit_recovery_notes_days'),
        localforage.getItem<number>('pulsefit_macro_balance_streak'),
        localforage.getItem<number>('pulsefit_consistent_activity_days'),
        localforage.getItem<number>('pulsefit_immortal_streak_200'),
        localforage.getItem<number>('pulsefit_apex_synthesis_progress'),
        localforage.getItem<VaultTelemetry>(KEY_TELEMETRY)
      ]);

      const streaks = Math.max(0, Number(appState?.currentStreak || 0));
      const workouts = rawWorkouts || [];
      const velocity = workouts.length;
      const workoutsCount = workouts.length;

      let volume = 0;
      let workoutCalories = 0;
      let totalSets = 0;
      let earlyBirdCount = 0;
      let nightOwlCount = 0;
      let exercisesWithNotesCount = 0;
      const weekendsMap = new Map<string, { sat: boolean; sun: boolean }>();

      workouts.forEach((w: any) => {
        if (w.totalVolume) volume += Number(w.totalVolume);
        if (w.caloriesBurned) workoutCalories += Number(w.caloriesBurned);
        
        // Workout timestamp & hour checks (Early Bird < 6 AM, Night Owl >= 10 PM)
        const workoutDate = w.timestamp ? new Date(w.timestamp) : (w.date ? new Date(w.date) : null);
        if (workoutDate && !isNaN(workoutDate.getTime())) {
          const hour = workoutDate.getHours();
          if (hour < 6) earlyBirdCount++;
          if (hour >= 22) nightOwlCount++;

          // Weekend tracking (Saturday = 6, Sunday = 0)
          const day = workoutDate.getDay();
          if (day === 0 || day === 6) {
            const d = new Date(workoutDate);
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            const mondayDate = new Date(d.setDate(diff)).toISOString().slice(0, 10);
            const wk = weekendsMap.get(mondayDate) || { sat: false, sun: false };
            if (day === 6) wk.sat = true;
            if (day === 0) wk.sun = true;
            weekendsMap.set(mondayDate, wk);
          }
        }

        if (Array.isArray(w.exercises)) {
          w.exercises.forEach((ex: any) => {
            totalSets += Number(ex.sets?.length || ex.setsCompleted || 3);
            if (ex.notes || ex.note || ex.notesLogged || (Array.isArray(ex.sets) && ex.sets.some((s: any) => s.notes || s.comment))) {
              exercisesWithNotesCount++;
            }
          });
        } else {
          totalSets += Number(w.sets || 3);
        }
      });

      let weekendWorkoutsCompleted = 0;
      weekendsMap.forEach(wk => {
        if (wk.sat && wk.sun) weekendWorkoutsCompleted++;
      });

      // 3. Water Intake
      const wDaily = waterDaily || 0;
      const waterTotal = waterTotalStored || wDaily;
      const sWaterDays = storedWaterDays || 0;
      const waterDays = Math.max(sWaterDays, waterTotal >= 2000 ? 1 : 0);

      // 4. Calories (from daily calorie store if present + active burn)
      const dCalLogged = dailyCaloriesLogged || 0;
      
      // Live motion & active burn estimator telemetry
      let liveSteps = 0;
      let liveBurnCalories = 0;
      try {
        const stepState = stepBurnEstimator.getState();
        liveSteps = stepState.steps || 0;
        liveBurnCalories = Math.round(stepState.caloriesBurned || 0);
      } catch {}

      const totalCalories = Math.max(workoutCalories, dCalLogged, liveBurnCalories);

      // 5. Steps telemetry
      const stepsFromStore = stepsOdometer || stepsDaily || 0;
      const totalSteps = Math.max(stepsFromStore, liveSteps);
      const sStepDays = storedStepDays || 0;
      const stepDays = Math.max(sStepDays, totalSteps >= 5000 ? 1 : 0);

      // 6. Checkin days
      const checkinDays = Math.max(streaks, Number(appState?.daysActive || 1));

      // 7. Dietary logging entries
      let dietLogged = dCalLogged > 0 ? 1 : 0;
      if (!dietLogged && dietEntries) {
        dietLogged = (Array.isArray(dietEntries) ? dietEntries.length : Object.keys(dietEntries).length) > 0 ? 1 : 0;
      }
      dietLogged = Math.max(dietLogged, storedDietLogged || 0);

      // 8. Progress increase calculation (% progression across workouts or logged improvements)
      let computedProgressIncrease = 0;
      if (workouts.length >= 2) {
        const sorted = [...workouts].sort((a: any, b: any) => (a.timestamp || 0) - (b.timestamp || 0));
        const firstVol = Number(sorted[0]?.totalVolume || sorted[0]?.volume || 0);
        const latestVol = Number(sorted[sorted.length - 1]?.totalVolume || sorted[sorted.length - 1]?.volume || 0);
        if (firstVol > 0 && latestVol >= firstVol) {
          computedProgressIncrease = Math.round(((latestVol - firstVol) / firstVol) * 100);
        }
      }
      const appProgressIncrease = Number(appState?.progressIncrease || 0);
      const progressIncrease = Math.max(computedProgressIncrease, storedProgressIncrease || 0, appProgressIncrease);

      // 9. Calorie deficit or target hit streak
      let computedCalorieStreak = Math.max(storedCalStreak || 0, storedTargetHitStreak || 0, Number(appState?.calorieStreak || 0));

      try {
        if (Array.isArray(dayRecords) && dayRecords.length > 0) {
          let consecutive = 0;
          for (const day of dayRecords) {
            if (day.targetHit || (day.deficit && day.deficit >= 0)) consecutive++;
            else consecutive = 0;
          }
          computedCalorieStreak = Math.max(computedCalorieStreak, consecutive);
        }
      } catch {}

      // 10. Water + step + workout simultaneous goal streak
      const appTripleStreak = Number(appState?.tripleGoalStreak || 0);
      let computedTripleStreak = Math.max(storedTripleStreak || 0, appTripleStreak);
      if (streaks > 0 && waterTotal >= 2000 && totalSteps >= 5000 && workoutsCount > 0) {
        computedTripleStreak = Math.max(computedTripleStreak, streaks);
      }

      // 11. Cumulative active training days
      const storedActiveDays = storedActiveTrainingDays || storedActiveDaysFallback || 0;
      let computedActiveDays = Math.max(storedActiveDays, checkinDays, streaks);
      if (workouts.length > 0) {
        const uniqueWorkoutDates = new Set(
          workouts.map((w: any) => {
            if (w.date) return w.date;
            if (w.timestamp) return new Date(w.timestamp).toISOString().split('T')[0];
            return null;
          }).filter(Boolean)
        );
        computedActiveDays = Math.max(computedActiveDays, uniqueWorkoutDates.size);
      }

      // 12. Water logged distinct days
      const waterLoggedDays = Math.max(storedWaterLoggedDays || 0, (waterDaysList || []).length, sWaterDays, waterDays);

      // 13. Progression Dad velocity surge (rapid early progress)
      const computedSurge = (workoutsCount > 0 && (workoutsCount <= 15 || progressIncrease >= 15 || velocity >= 3)) ? 1 : 0;
      const velocitySurge = Math.max(storedSurge || 0, computedSurge);

      // 14. Legendary: Consistent Training Days
      const consistentTrainingDays = Math.max(storedConsistentDays || 0, computedActiveDays, streaks, workoutsCount);

      // 15. Legendary: Hydration Archon consecutive days
      const hydrationStreakDays = Math.max(storedHydrationStreak || 0, storedWaterStreak || 0, waterDays, waterLoggedDays);

      // 16. Legendary: Beast Mode Rest Intervals Workouts
      let beastModeCount = 0;
      workouts.forEach((w: any) => {
        if (w.restTimerUsed || w.beastMode || w.isBeastMode || w.restIntervals || (w.notes && typeof w.notes === 'string' && w.notes.toLowerCase().includes('rest'))) {
          beastModeCount++;
        }
      });
      const beastModeWorkouts = Math.max(storedBeastMode || 0, beastModeCount);

      // 17. Legendary: Velocity Master boost days
      const computedVelocityBoost = progressIncrease >= 25 ? Math.min(Math.max(streaks, workoutsCount), 45) : 0;
      const velocityBoostDays = Math.max(storedVelocityBoost || 0, computedVelocityBoost);

      // 18. Legendary: THE LEGACY ANCHOR progress
      const legacyAnchorProgress = Math.max(storedLegacyAnchor || 0, computedActiveDays, streaks);

      // 19. Rare: Velocity Tracker 14-day completion speed / density boost
      const computedVelocity14d = progressIncrease > 0 ? progressIncrease : (workoutsCount >= 5 ? 15 : 0);
      const velocityBoost14d = Math.max(storedVelocity14d || 0, computedVelocity14d);

      // 20. Rare: Recovery Disciplinarian mobility notes logged
      let recoveryDaysLogged = 0;
      workouts.forEach((w: any) => {
        if (w.isRestDay || w.mobilityNotes || (w.notes && typeof w.notes === 'string' && (w.notes.toLowerCase().includes('rest') || w.notes.toLowerCase().includes('mobility') || w.notes.toLowerCase().includes('recovery')))) {
          recoveryDaysLogged++;
        }
      });
      const recoveryNotesDays = Math.max(storedRecoveryNotes || 0, recoveryDaysLogged);

      // 21. Rare: Macro Balance calorie/macro tolerance streak
      const macroBalanceStreak = Math.max(storedMacroStreak || 0, computedCalorieStreak);

      // 22. Mythic: Consistency Monster
      const consistentActivityDays = Math.max(storedConsistentActivity || 0, computedActiveDays, streaks, checkinDays);

      // 23. Mythic: The Immortal 200
      const immortalStreak200 = Math.max(storedImmortalStreak || 0, streaks);

      // 24. Mythic: Apex Physiology Synthesis
      const streakRatio = Math.min(1, streaks / 365);
      const kcalRatio = Math.min(1, totalCalories / 500000);
      const stepsRatio = Math.min(1, totalSteps / 2000000);
      const computedApexSynthesis = Math.min(100, Math.round(((streakRatio + kcalRatio + stepsRatio + (streaks >= 50 ? 1 : 0)) / 4) * 100));
      const apexSynthesisProgress = Math.max(storedApexSynthesis || 0, computedApexSynthesis);

      return {
        streaks: Math.max(streaks, storedTelemetry?.streaks || 0),
        water: Math.max(waterTotal, storedTelemetry?.water || 0),
        calories: Math.max(totalCalories, storedTelemetry?.calories || 0),
        volume: Math.max(volume, storedTelemetry?.volume || 0),
        steps: Math.max(totalSteps, storedTelemetry?.steps || 0),
        velocity: Math.max(velocity, storedTelemetry?.velocity || 0),
        workoutsCount: Math.max(workoutsCount, storedTelemetry?.workoutsCount || 0),
        stepDays: Math.max(stepDays, storedTelemetry?.stepDays || 0),
        waterDays: Math.max(waterDays, storedTelemetry?.waterDays || 0),
        totalSets: Math.max(totalSets, storedTelemetry?.totalSets || 0),
        checkinDays: Math.max(checkinDays, storedTelemetry?.checkinDays || 0),
        dietLogged: Math.max(dietLogged, storedTelemetry?.dietLogged || 0),
        progressIncrease: Math.max(progressIncrease, storedTelemetry?.progressIncrease || 0),
        calorieStreak: Math.max(computedCalorieStreak, storedTelemetry?.calorieStreak || 0),
        tripleGoalStreak: Math.max(computedTripleStreak, storedTelemetry?.tripleGoalStreak || 0),
        activeTrainingDays: Math.max(computedActiveDays, storedTelemetry?.activeTrainingDays || 0),
        earlyBirdWorkouts: Math.max(earlyBirdCount, storedTelemetry?.earlyBirdWorkouts || 0),
        nightOwlWorkouts: Math.max(nightOwlCount, storedTelemetry?.nightOwlWorkouts || 0),
        waterLoggedDays: Math.max(waterLoggedDays, storedTelemetry?.waterLoggedDays || 0),
        exercisesWithNotes: Math.max(exercisesWithNotesCount, storedTelemetry?.exercisesWithNotes || 0),
        weekendWorkoutsCompleted: Math.max(weekendWorkoutsCompleted, storedTelemetry?.weekendWorkoutsCompleted || 0),
        velocitySurge: Math.max(velocitySurge, storedTelemetry?.velocitySurge || 0),
        consistentTrainingDays: Math.max(consistentTrainingDays, storedTelemetry?.consistentTrainingDays || 0),
        hydrationStreakDays: Math.max(hydrationStreakDays, storedTelemetry?.hydrationStreakDays || 0),
        beastModeWorkouts: Math.max(beastModeWorkouts, storedTelemetry?.beastModeWorkouts || 0),
        velocityBoostDays: Math.max(velocityBoostDays, storedTelemetry?.velocityBoostDays || 0),
        legacyAnchorProgress: Math.max(legacyAnchorProgress, storedTelemetry?.legacyAnchorProgress || 0),
        velocityBoost14d: Math.max(velocityBoost14d, storedTelemetry?.velocityBoost14d || 0),
        recoveryNotesDays: Math.max(recoveryNotesDays, storedTelemetry?.recoveryNotesDays || 0),
        macroBalanceStreak: Math.max(macroBalanceStreak, storedTelemetry?.macroBalanceStreak || 0),
        consistentActivityDays: Math.max(consistentActivityDays, storedTelemetry?.consistentActivityDays || 0),
        immortalStreak200: Math.max(immortalStreak200, storedTelemetry?.immortalStreak200 || 0),
        apexSynthesisProgress: Math.max(apexSynthesisProgress, storedTelemetry?.apexSynthesisProgress || 0),
        lastUpdated: new Date().toISOString()
      };
    } catch (e) {
      return {
        streaks: 0,
        water: 0,
        calories: 0,
        volume: 0,
        steps: 0,
        velocity: 0,
        progressIncrease: 0,
        calorieStreak: 0,
        tripleGoalStreak: 0,
        activeTrainingDays: 0,
        earlyBirdWorkouts: 0,
        nightOwlWorkouts: 0,
        waterLoggedDays: 0,
        exercisesWithNotes: 0,
        weekendWorkoutsCompleted: 0,
        velocitySurge: 0,
        lastUpdated: new Date().toISOString()
      };
    }
  }

  /**
   * Directly registers a new milestone achievement into VaultState.
   * Offloads state generation and category assignments to the Web Worker pool via Comlink.
   * Persists to localforage + RxDB, notifies listeners, and dispatches toasts.
   */
  public async registerAchievement(
    achievement: MilestoneAchievementDefinition | VaultBadge
  ): Promise<{ registered: boolean; badge: VaultBadge; isNew: boolean }> {
    try {
      const telemetry = await this.collectLocalTelemetry();
      const currentState = await localforage.getItem<VaultState>(KEY_VAULT_STATE) || INITIAL_VAULT_STATE;

      let resultState = currentState;
      let badge: VaultBadge;
      let isNew = false;

      if (this.workerPool) {
        const worker = this.workerPool.getWorker();
        const res = await worker.registerSingleAchievement(currentState, achievement, telemetry);
        resultState = res.state;
        badge = res.badge;
        isNew = res.isNew;
      } else {
        // Fallback
        isNew = !currentState.unlockedBadges.includes(achievement.id);
        const threshold = 'threshold' in achievement ? achievement.threshold : achievement.targetValue;
        const metricUnit = 'metricUnit' in achievement ? achievement.metricUnit : '';
        const metricType = ('metric' in achievement ? achievement.metric : achievement.unlockCondition?.type) || 'steps';
        let currentVal = 0;
        if (metricType === 'calories') currentVal = telemetry.calories;
        else if (metricType === 'volume') currentVal = telemetry.volume;
        else if (metricType === 'steps') currentVal = telemetry.steps;

        badge = {
          id: achievement.id,
          number: (currentState.badges?.length || 0) + (isNew ? 1 : 0),
          title: achievement.title,
          description: achievement.description,
          tier: achievement.tier,
          iconName: achievement.iconName || 'Award',
          isUnlocked: true,
          criteriaText: `${threshold.toLocaleString()} ${metricUnit}`,
          progress: 100,
          targetValue: threshold,
          currentValue: Math.max(currentVal, threshold),
          metricUnit,
          unlockCondition: {
            type: metricType as any,
            threshold
          }
        };

        const existingBadges = [...(currentState.badges || [])];
        const idx = existingBadges.findIndex(b => b.id === achievement.id);
        if (idx >= 0) existingBadges[idx] = badge;
        else existingBadges.push(badge);

        const unlockedBadges = Array.from(new Set([...(currentState.unlockedBadges || []), achievement.id]));

        resultState = {
          ...currentState,
          badges: existingBadges,
          unlockedBadges,
          totalExpectedBadges: existingBadges.length,
          lastSyncedAt: new Date().toISOString()
        };
      }

      await localforage.setItem(KEY_VAULT_STATE, resultState);
      this.cachedState = resultState;

      this.notifyStateListeners(resultState);
      this.syncChannel?.postMessage({
        type: 'VAULT_STATE_UPDATED',
        payload: resultState
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_vault_state_changed', { detail: resultState }));
        window.dispatchEvent(new CustomEvent('pulsefit_achievement_registered', { detail: { badge, isNew } }));
      }

      if (isNew) {
        this.fireRewardToast(`🎉 New Reward Unlocked: ${badge.title} added to your Vault!`);
      }

      // Background snapshot sync to RxDB
      getRxDBProxy().then(async (rxdb) => {
        if (rxdb && typeof rxdb.saveVaultSnapshot === 'function') {
          await rxdb.saveVaultSnapshot(resultState);
        }
      }).catch(() => {});

      return { registered: true, badge, isNew };
    } catch (err) {
      console.warn('[VaultService] registerAchievement error:', err);
      throw err;
    }
  }

  /**
   * Observes changes in user telemetry and checks all milestone thresholds.
   * Triggers registration of new achievements when thresholds are met.
   */
  public async checkAndRegisterMilestones(
    telemetryOverrides?: Partial<VaultTelemetry>
  ): Promise<{ state: VaultState; newAchievements: VaultBadge[] }> {
    const resState = await this.evaluateVaultMilestones(telemetryOverrides);
    return {
      state: resState,
      newAchievements: (resState.badges || []).filter(b => b.isUnlocked)
    };
  }

  /**
   * Background async helper evaluateVaultMilestones()
   * Checks localforage telemetry on every log / biometric update.
   * If a new badge or theme is unlocked, fires toast:
   * "🎉 New Reward Unlocked: [Reward Name] added to your Vault!"
   */
  public async evaluateVaultMilestones(telemetryOverrides?: Partial<VaultTelemetry>): Promise<VaultState> {
    if (this.isEvaluating) {
      return this.cachedState || INITIAL_VAULT_STATE;
    }

    this.isEvaluating = true;
    try {
      let telemetry = await this.collectLocalTelemetry();
      if (telemetryOverrides) {
        telemetry = {
          ...telemetry,
          ...telemetryOverrides,
          lastUpdated: new Date().toISOString()
        };
        await localforage.setItem(KEY_TELEMETRY, telemetry);
      }

      const currentState = await localforage.getItem<VaultState>(KEY_VAULT_STATE) || INITIAL_VAULT_STATE;

      let resultState = currentState;
      let newlyUnlockedBadges: any[] = [];
      let newlyUnlockedThemes: any[] = [];

      if (this.workerPool) {
        const worker = this.workerPool.getWorker();
        const evalResult = await worker.evaluateVaultMilestones(currentState, telemetry);
        resultState = evalResult.state;
        newlyUnlockedBadges = evalResult.newlyUnlockedBadges || [];
        newlyUnlockedThemes = evalResult.newlyUnlockedThemes || [];
      }

      // Always ensure Theme #01 is unlocked
      if (!resultState.unlockedThemes.includes(DEFAULT_THEME_ID)) {
        resultState.unlockedThemes.push(DEFAULT_THEME_ID);
      }

      resultState.lastSyncedAt = new Date().toISOString();
      await localforage.setItem(KEY_VAULT_STATE, resultState);
      this.cachedState = resultState;

      // Broadcast state update
      this.notifyStateListeners(resultState);
      this.syncChannel?.postMessage({
        type: 'VAULT_STATE_UPDATED',
        payload: resultState
      });

      // Dispatch celebratory unlock event for 144fps animation celebration
      if (newlyUnlockedBadges.length > 0 || newlyUnlockedThemes.length > 0) {
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('pulsefit_vault_reward_unlocked', {
            detail: {
              badges: newlyUnlockedBadges,
              themes: newlyUnlockedThemes
            }
          }));
        }
      }

      // Fire individual toasts for newly unlocked rewards
      newlyUnlockedBadges.forEach((b) => {
        const toastMsg = `🎉 New Reward Unlocked: ${b.title} added to your Vault!`;
        this.fireRewardToast(toastMsg);
      });

      newlyUnlockedThemes.forEach((t) => {
        const toastMsg = `🎉 New Reward Unlocked: ${t.name} added to your Vault!`;
        this.fireRewardToast(toastMsg);
      });

      // Background sync to RxDB
      getRxDBProxy().then(async (rxdb) => {
        if (rxdb && typeof rxdb.saveVaultSnapshot === 'function') {
          await rxdb.saveVaultSnapshot(resultState);
        }
      }).catch(() => {});

      return resultState;
    } catch (err) {
      console.warn('[VaultService] evaluateVaultMilestones error:', err);
      return this.cachedState || INITIAL_VAULT_STATE;
    } finally {
      this.isEvaluating = false;
    }
  }

  /**
   * Fires a reward toast notification across the app
   */
  public fireRewardToast(message: string): void {
    const detail: ToastEventDetail = {
      message,
      type: 'reward',
      timestamp: Date.now()
    };

    this.notifyToastListeners(detail);

    // Broadcast across windows & tabs
    this.syncChannel?.postMessage({
      type: 'TOAST_FIRED',
      payload: detail
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pulsefit_toast', { detail }));
    }
  }

  /**
   * Gets active theme from localforage (key: pulsefit_active_theme)
   * Hardcoded developer default: Theme #01 (PulseFit Obsidian/Electric Violet)
   */
  public async getActiveTheme(): Promise<string> {
    try {
      const stored = await localforage.getItem<string>(KEY_ACTIVE_THEME);
      const active = stored || DEFAULT_THEME_ID;
      this.cachedTheme = active;
      return active;
    } catch {
      return DEFAULT_THEME_ID;
    }
  }

  /**
   * Applies an active theme.
   * Mutates root CSS variables (--primary-accent, --border-glow, --bg-card)
   * and stores in pulsefit_active_theme via localforage.
   */
  public async setActiveTheme(themeId: string): Promise<{ success: boolean; reason?: string }> {
    try {
      const currentState = await this.loadVaultState();
      const targetTheme = MASTER_VAULT_THEMES.find((t) => t.id === themeId);

      // Ensure the selected theme is marked unlocked when selected by the athlete
      if (!currentState.unlockedThemes.includes(themeId)) {
        currentState.unlockedThemes.push(themeId);
      }
      if (Array.isArray(currentState.themes)) {
        currentState.themes = currentState.themes.map((t) =>
          t.id === themeId ? { ...t, isUnlocked: true } : t
        );
      }

      await localforage.setItem(KEY_ACTIVE_THEME, themeId);
      this.cachedTheme = themeId;

      // Mutate root CSS variables on document immediately
      this.applyCssVariablesToDom(themeId);

      // Update cached vault state active theme
      currentState.activeTheme = themeId;
      await localforage.setItem(KEY_VAULT_STATE, currentState);
      this.cachedState = currentState;

      this.notifyThemeListeners(themeId);
      this.notifyStateListeners(currentState);

      this.syncChannel?.postMessage({
        type: 'ACTIVE_THEME_UPDATED',
        payload: themeId
      });
      this.syncChannel?.postMessage({
        type: 'VAULT_STATE_UPDATED',
        payload: currentState
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_active_theme_changed', { detail: themeId }));
        window.dispatchEvent(new CustomEvent('pulsefit_vault_state_changed', { detail: currentState }));
      }

      if (targetTheme) {
        this.fireRewardToast(`🎨 Theme Applied: ${targetTheme.name} is now active across PulseFit!`);
      }

      return { success: true };
    } catch (err: any) {
      return { success: false, reason: err?.message || 'Failed to apply theme' };
    }
  }

  /**
   * Real-time subscription to Vault state changes
   */
  public subscribeToVaultState(callback: (state: VaultState) => void): () => void {
    this.stateListeners.add(callback);
    if (this.cachedState) {
      callback(this.cachedState);
    } else {
      this.loadVaultState().then(callback);
    }

    return () => {
      this.stateListeners.delete(callback);
    };
  }

  /**
   * Real-time subscription to Active Theme changes
   */
  public subscribeToActiveTheme(callback: (theme: string) => void): () => void {
    this.themeListeners.add(callback);
    if (this.cachedTheme) {
      callback(this.cachedTheme);
    } else {
      this.getActiveTheme().then(callback);
    }

    return () => {
      this.themeListeners.delete(callback);
    };
  }

  /**
   * Real-time subscription to toast notifications
   */
  public subscribeToToast(callback: (toast: ToastEventDetail) => void): () => void {
    this.toastListeners.add(callback);
    return () => {
      this.toastListeners.delete(callback);
    };
  }

  private notifyStateListeners(state: VaultState) {
    for (const listener of this.stateListeners) {
      try {
        listener(state);
      } catch (e) {
        console.error('[VaultService] State listener error:', e);
      }
    }
  }

  private notifyThemeListeners(theme: string) {
    for (const listener of this.themeListeners) {
      try {
        listener(theme);
      } catch (e) {
        console.error('[VaultService] Theme listener error:', e);
      }
    }
  }

  private notifyToastListeners(toast: ToastEventDetail) {
    for (const listener of this.toastListeners) {
      try {
        listener(toast);
      } catch (e) {
        console.error('[VaultService] Toast listener error:', e);
      }
    }
  }

  /**
   * Offloads reward overlay data generation to the Web Worker Pool with Comlink RPC.
   * Guarantees zero-jank resolution of Rare and Mythic badges and themes.
   */
  public async prepareUnlockOverlayData(type: 'badge' | 'theme', id: string) {
    if (this.workerPool) {
      try {
        const worker = this.workerPool.getWorker();
        const res = await worker.prepareUnlockOverlayData(type, id);
        if (res) return res;
      } catch (e) {
        console.warn('[VaultService] Worker prepareUnlockOverlayData fallback:', e);
      }
    }
    // Main thread fallback
    if (type === 'badge') {
      const b = MASTER_VAULT_BADGES.find(item => item.id === id);
      if (!b) return null;
      const isMythic = b.tier === 'mythic';
      return {
        id: b.id,
        type: 'badge' as const,
        tier: b.tier,
        title: b.title,
        description: b.description,
        criteriaText: b.criteriaText,
        iconName: b.iconName,
        badgeData: b,
        particleCount: isMythic ? 220 : 120,
        staggerBursts: true,
        audioCue: { type: 'badge' as const, tier: b.tier },
        prestigeColor: isMythic ? '#c084fc' : '#38bdf8'
      };
    } else {
      const t = MASTER_VAULT_THEMES.find(item => item.id === id);
      if (!t) return null;
      const isMythic = t.tier === 'mythic';
      return {
        id: t.id,
        type: 'theme' as const,
        tier: t.tier,
        title: t.name,
        description: t.tagline,
        criteriaText: t.criteriaText,
        themeData: t,
        particleCount: isMythic ? 240 : 130,
        staggerBursts: true,
        audioCue: { type: 'theme' as const, tier: t.tier },
        prestigeColor: isMythic ? '#f43f5e' : '#06b6d4'
      };
    }
  }

  /**
   * Dispatches a workout reward unlock event specifically targeting BadgeUnlockOverlay
   */
  public triggerUnlockOverlay(reward: { type: 'badge' | 'theme'; id: string; tier?: VaultTier }) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pulsefit_trigger_unlock_overlay', { detail: reward }));
    }
  }
}

export const vaultService = new VaultService();

// Export convenient helper for background async evaluation
export const evaluateVaultMilestones = (telemetry?: Partial<VaultTelemetry>) => 
  vaultService.evaluateVaultMilestones(telemetry);

export const registerAchievement = (achievement: MilestoneAchievementDefinition | VaultBadge) =>
  vaultService.registerAchievement(achievement);

export const checkAndRegisterMilestones = (telemetry?: Partial<VaultTelemetry>) =>
  vaultService.checkAndRegisterMilestones(telemetry);

