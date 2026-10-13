import { expose } from 'comlink';
import { 
  VaultState, 
  INITIAL_VAULT_STATE, 
  MASTER_VAULT_THEMES, 
  MASTER_VAULT_BADGES, 
  VaultTelemetry, 
  VaultBadge, 
  VaultTheme, 
  VaultCategory,
  VaultTier,
  MilestoneAchievementDefinition,
  TELEMETRY_MILESTONES
} from '../types/vault';

export class VaultComputeWorker {
  /**
   * Evaluates telemetry milestones, lock/unlock states, and registers achievements when thresholds are met.
   */
  public async evaluateVaultMilestones(
    currentState: Partial<VaultState> | null,
    telemetry: VaultTelemetry
  ): Promise<{
    state: VaultState;
    newlyUnlockedBadges: VaultBadge[];
    newlyUnlockedThemes: VaultTheme[];
  }> {
    const baseState = currentState && currentState.id ? currentState : INITIAL_VAULT_STATE;
    const previouslyUnlockedBadges = new Set<string>(baseState.unlockedBadges || []);
    const previouslyUnlockedThemes = new Set<string>(baseState.unlockedThemes || []);

    const newlyUnlockedBadges: VaultBadge[] = [];
    const newlyUnlockedThemes: VaultTheme[] = [];

    const baseBadgesMap = new Map((baseState.badges || []).map(b => [b.id, b]));
    const rawBadges = MASTER_VAULT_BADGES.length > 0
      ? MASTER_VAULT_BADGES.map(masterBadge => {
          const existing = baseBadgesMap.get(masterBadge.id);
          return existing ? { 
            ...masterBadge, 
            isUnlocked: existing.isUnlocked || masterBadge.isUnlocked,
            progress: existing.progress || masterBadge.progress,
            currentValue: existing.currentValue || masterBadge.currentValue 
          } : masterBadge;
        })
      : (baseState.badges || []);

    const existingBadgesMap = new Map<string, VaultBadge>();
    rawBadges.forEach(b => existingBadgesMap.set(b.id, b));

    // 1. Evaluate Badges: check rawBadges + check telemetry milestones
    const updatedBadges: VaultBadge[] = [];

    // Evaluate badges
    for (const template of rawBadges) {
      const cond = template.unlockCondition;
      let currentVal = 0;

      switch (cond?.type) {
        case 'streak':
          currentVal = telemetry.streaks || 0;
          break;
        case 'water':
          currentVal = telemetry.water || 0;
          break;
        case 'calories':
          currentVal = telemetry.calories || 0;
          break;
        case 'volume':
          currentVal = telemetry.volume || 0;
          break;
        case 'steps':
          currentVal = telemetry.steps || 0;
          break;
        case 'velocity':
          currentVal = telemetry.velocity || 0;
          break;
        case 'workouts':
          currentVal = telemetry.workoutsCount ?? telemetry.velocity ?? 0;
          break;
        case 'water_days':
          currentVal = telemetry.waterDays || (telemetry.waterLoggedDays || 0);
          break;
        case 'step_days':
          currentVal = telemetry.stepDays || 0;
          break;
        case 'total_sets':
          currentVal = telemetry.totalSets || 0;
          break;
        case 'checkin_days':
          currentVal = Math.max(telemetry.checkinDays || 0, telemetry.streaks || 0);
          break;
        case 'diet_logged':
          currentVal = telemetry.dietLogged || 0;
          break;
        case 'early_bird':
          currentVal = telemetry.earlyBirdWorkouts || 0;
          break;
        case 'night_owl':
          currentVal = telemetry.nightOwlWorkouts || 0;
          break;
        case 'water_logged_days':
          currentVal = telemetry.waterLoggedDays || telemetry.waterDays || 0;
          break;
        case 'exercises_with_notes':
          currentVal = telemetry.exercisesWithNotes || 0;
          break;
        case 'weekend_warrior':
          currentVal = telemetry.weekendWorkoutsCompleted || 0;
          break;
        case 'velocity_surge':
          currentVal = telemetry.velocitySurge || (telemetry.progressIncrease && telemetry.progressIncrease >= 10 ? 1 : 0) || 0;
          break;
        case 'consistent_training_days':
          currentVal = telemetry.consistentTrainingDays || Math.max(telemetry.activeTrainingDays || 0, telemetry.streaks || 0);
          break;
        case 'hydration_consecutive_days':
          currentVal = telemetry.hydrationStreakDays || telemetry.waterDays || 0;
          break;
        case 'beast_mode_rest_workouts':
          currentVal = telemetry.beastModeWorkouts || 0;
          break;
        case 'velocity_boost_days':
          currentVal = telemetry.velocityBoostDays || ((telemetry.progressIncrease || 0) >= 25 ? Math.min(telemetry.streaks || 0, 45) : 0);
          break;
        case 'legacy_anchor':
          currentVal = telemetry.legacyAnchorProgress || telemetry.activeTrainingDays || 0;
          break;
        case 'velocity_boost_14d':
          currentVal = telemetry.velocityBoost14d || telemetry.progressIncrease || 0;
          break;
        case 'recovery_notes_days':
          currentVal = telemetry.recoveryNotesDays || 0;
          break;
        case 'macro_balance_streak':
          currentVal = telemetry.macroBalanceStreak || telemetry.calorieStreak || 0;
          break;
        case 'consistent_activity_days':
          currentVal = telemetry.consistentActivityDays || Math.max(telemetry.activeTrainingDays || 0, telemetry.streaks || 0, telemetry.checkinDays || 0);
          break;
        case 'immortal_streak_200':
          currentVal = telemetry.immortalStreak200 || telemetry.streaks || 0;
          break;
        case 'apex_synthesis':
          currentVal = telemetry.apexSynthesisProgress || 0;
          break;
        default:
          currentVal = 0;
      }

      const isCriteriaMet = currentVal >= template.targetValue;
      const wasUnlocked = previouslyUnlockedBadges.has(template.id) || template.isUnlocked;
      const isNowUnlocked = wasUnlocked || isCriteriaMet;

      const progress = Math.min(100, Math.round((currentVal / (template.targetValue || 1)) * 100));

      const updatedBadge: VaultBadge = {
        ...template,
        currentValue: currentVal,
        progress: isNowUnlocked ? 100 : progress,
        isUnlocked: isNowUnlocked
      };

      if (!wasUnlocked && isCriteriaMet) {
        previouslyUnlockedBadges.add(template.id);
        newlyUnlockedBadges.push(updatedBadge);
      }

      updatedBadges.push(updatedBadge);
      existingBadgesMap.set(updatedBadge.id, updatedBadge);
    }

    // Evaluate TELEMETRY_MILESTONES: trigger registration when thresholds are met
    for (const milestone of TELEMETRY_MILESTONES) {
      let currentVal = 0;
      if (milestone.metric === 'calories') {
        currentVal = telemetry.calories || 0;
      } else if (milestone.metric === 'volume') {
        currentVal = telemetry.volume || 0;
      } else if (milestone.metric === 'steps') {
        currentVal = telemetry.steps || 0;
      }

      const isThresholdMet = currentVal >= milestone.threshold;
      const wasUnlocked = previouslyUnlockedBadges.has(milestone.id);

      // If threshold is met, register or update the achievement
      if (isThresholdMet) {
        const existing = existingBadgesMap.get(milestone.id);
        const achievementBadge: VaultBadge = existing ? {
          ...existing,
          currentValue: currentVal,
          progress: 100,
          isUnlocked: true
        } : {
          id: milestone.id,
          number: updatedBadges.length + 1,
          title: milestone.title,
          description: milestone.description,
          tier: milestone.tier,
          iconName: milestone.iconName,
          isUnlocked: true,
          criteriaText: `${milestone.threshold.toLocaleString()} ${milestone.metricUnit}`,
          progress: 100,
          targetValue: milestone.threshold,
          currentValue: currentVal,
          metricUnit: milestone.metricUnit,
          unlockCondition: {
            type: milestone.metric,
            threshold: milestone.threshold
          }
        };

        if (!wasUnlocked) {
          previouslyUnlockedBadges.add(milestone.id);
          newlyUnlockedBadges.push(achievementBadge);
        }

        if (!existing) {
          updatedBadges.push(achievementBadge);
          existingBadgesMap.set(milestone.id, achievementBadge);
        } else {
          const idx = updatedBadges.findIndex(b => b.id === milestone.id);
          if (idx >= 0) updatedBadges[idx] = achievementBadge;
        }
      }
    }

    // 2. Evaluate Themes
    const baseThemesMap = new Map((baseState.themes || []).map(t => [t.id, t]));
    const rawThemes = MASTER_VAULT_THEMES.map(masterTheme => {
      const existing = baseThemesMap.get(masterTheme.id);
      return existing ? { ...masterTheme, isUnlocked: existing.isUnlocked || masterTheme.isUnlocked } : masterTheme;
    });
    const updatedThemes: VaultTheme[] = rawThemes.map((template) => {
      if (template.id === 'obsidian-violet' || template.isDefault) {
        return { ...template, isUnlocked: true };
      }

      const cond = template.unlockCondition;
      let isCriteriaMet = false;

      if (cond) {
        switch (cond.type) {
          case 'streak':
            isCriteriaMet = (telemetry.streaks || 0) >= cond.threshold;
            break;
          case 'water':
            isCriteriaMet = (telemetry.water || 0) >= cond.threshold;
            break;
          case 'calories':
            isCriteriaMet = (telemetry.calories || 0) >= cond.threshold;
            break;
          case 'volume':
            isCriteriaMet = (telemetry.volume || 0) >= cond.threshold;
            break;
          case 'steps':
            isCriteriaMet = (telemetry.steps || 0) >= cond.threshold;
            break;
          case 'velocity':
            isCriteriaMet = (telemetry.velocity || 0) >= cond.threshold;
            break;
          case 'workouts':
            isCriteriaMet = (telemetry.workoutsCount ?? telemetry.velocity ?? 0) >= cond.threshold;
            break;
          case 'step_days':
            isCriteriaMet = (telemetry.stepDays || 0) >= cond.threshold;
            break;
          case 'water_days':
            isCriteriaMet = (telemetry.waterDays || 0) >= cond.threshold;
            break;
          case 'total_sets':
            isCriteriaMet = (telemetry.totalSets || 0) >= cond.threshold;
            break;
          case 'checkin_days':
            isCriteriaMet = Math.max(telemetry.checkinDays || 0, telemetry.streaks || 0) >= cond.threshold;
            break;
          case 'diet_logged':
            isCriteriaMet = (telemetry.dietLogged || 0) >= cond.threshold;
            break;
          case 'streak_and_progress': {
            const streakMet = (telemetry.streaks || 0) >= cond.threshold;
            const progressMet = (telemetry.progressIncrease || 0) >= (cond.secondaryThreshold || 0);
            isCriteriaMet = streakMet && progressMet;
            break;
          }
          case 'calorie_streak':
            isCriteriaMet = (telemetry.calorieStreak || 0) >= cond.threshold;
            break;
          case 'triple_goal_streak':
            isCriteriaMet = (telemetry.tripleGoalStreak || 0) >= cond.threshold;
            break;
          case 'active_training_days':
            isCriteriaMet = Math.max(telemetry.activeTrainingDays || 0, telemetry.checkinDays || 0, telemetry.streaks || 0) >= cond.threshold;
            break;
          case 'default':
            isCriteriaMet = true;
            break;
        }
      }

      const wasUnlocked = previouslyUnlockedThemes.has(template.id);
      const isNowUnlocked = wasUnlocked || isCriteriaMet;

      const updatedTheme: VaultTheme = {
        ...template,
        isUnlocked: isNowUnlocked
      };

      if (!wasUnlocked && isCriteriaMet) {
        previouslyUnlockedThemes.add(template.id);
        newlyUnlockedThemes.push(updatedTheme);
      }

      return updatedTheme;
    });

    // 3. Update Categories with registered badges and themes
    const updatedCategories: VaultCategory[] = INITIAL_VAULT_STATE.categories.map((initialCat) => {
      const existingCat = baseState.categories?.find(c => c.id === initialCat.id);
      const catBadges = updatedBadges.filter(b => b.tier === initialCat.tier);
      const catThemes = updatedThemes.filter(t => t.tier === initialCat.tier);
      return {
        ...initialCat,
        badges: catBadges.length > 0 ? catBadges : (existingCat?.badges || []),
        themes: catThemes.length > 0 ? catThemes : (existingCat?.themes || initialCat.themes || []),
        isLocked: catBadges.length === 0 && catThemes.length === 0
      };
    });

    const activeTheme = baseState.activeTheme || 'obsidian-violet';

    const finalState: VaultState = {
      id: 'pulsefit_vault_state',
      activeTheme,
      unlockedThemes: Array.from(previouslyUnlockedThemes),
      unlockedBadges: Array.from(previouslyUnlockedBadges),
      categories: updatedCategories,
      themes: updatedThemes,
      badges: updatedBadges,
      telemetry: {
        ...telemetry,
        lastUpdated: new Date().toISOString()
      },
      totalExpectedBadges: updatedBadges.length,
      totalExpectedThemes: rawThemes.length,
      lastSyncedAt: new Date().toISOString()
    };

    return {
      state: finalState,
      newlyUnlockedBadges,
      newlyUnlockedThemes
    };
  }

  /**
   * Registers a specific milestone achievement explicitly
   */
  public async registerSingleAchievement(
    currentState: Partial<VaultState> | null,
    achievement: MilestoneAchievementDefinition | VaultBadge,
    telemetry: VaultTelemetry
  ): Promise<{
    state: VaultState;
    badge: VaultBadge;
    isNew: boolean;
  }> {
    const baseState = currentState && currentState.id ? currentState : INITIAL_VAULT_STATE;
    const previouslyUnlocked = new Set<string>(baseState.unlockedBadges || []);
    const isNew = !previouslyUnlocked.has(achievement.id);

    previouslyUnlocked.add(achievement.id);

    let metricVal = 0;
    const metricType = ('metric' in achievement ? achievement.metric : achievement.unlockCondition?.type) || 'steps';
    if (metricType === 'calories') metricVal = telemetry.calories || 0;
    else if (metricType === 'volume') metricVal = telemetry.volume || 0;
    else if (metricType === 'steps') metricVal = telemetry.steps || 0;

    const threshold = 'threshold' in achievement ? achievement.threshold : achievement.targetValue;
    const metricUnit = 'metricUnit' in achievement ? achievement.metricUnit : '';

    const badge: VaultBadge = {
      id: achievement.id,
      number: (baseState.badges?.length || 0) + (isNew ? 1 : 0),
      title: achievement.title,
      description: achievement.description,
      tier: achievement.tier,
      iconName: achievement.iconName || 'Award',
      isUnlocked: true,
      criteriaText: `${threshold.toLocaleString()} ${metricUnit}`,
      progress: 100,
      targetValue: threshold,
      currentValue: Math.max(metricVal, threshold),
      metricUnit,
      unlockCondition: {
        type: metricType as any,
        threshold
      }
    };

    const existingBadges = [...(baseState.badges || [])];
    const existingIndex = existingBadges.findIndex(b => b.id === achievement.id);
    if (existingIndex >= 0) {
      existingBadges[existingIndex] = badge;
    } else {
      existingBadges.push(badge);
    }

    const updatedCategories: VaultCategory[] = INITIAL_VAULT_STATE.categories.map((initialCat) => {
      const existingCat = baseState.categories?.find(c => c.id === initialCat.id);
      const catBadges = existingBadges.filter(b => b.tier === initialCat.tier);
      const catThemes = (baseState.themes || []).filter(t => t.tier === initialCat.tier);
      return {
        ...initialCat,
        badges: catBadges.length > 0 ? catBadges : (existingCat?.badges || []),
        themes: catThemes.length > 0 ? catThemes : (existingCat?.themes || initialCat.themes || []),
        isLocked: catBadges.length === 0 && catThemes.length === 0
      };
    });

    const finalState: VaultState = {
      id: 'pulsefit_vault_state',
      activeTheme: baseState.activeTheme || 'obsidian-violet',
      unlockedThemes: baseState.unlockedThemes || [],
      unlockedBadges: Array.from(previouslyUnlocked),
      categories: updatedCategories,
      themes: baseState.themes || [],
      badges: existingBadges,
      telemetry: {
        ...telemetry,
        lastUpdated: new Date().toISOString()
      },
      totalExpectedBadges: existingBadges.length,
      totalExpectedThemes: (baseState.themes || []).length,
      lastSyncedAt: new Date().toISOString()
    };

    return {
      state: finalState,
      badge,
      isNew
    };
  }

  /**
   * Validates if a theme can be applied
   */
  public canApplyTheme(themeId: string, unlockedThemes: string[]): boolean {
    if (!themeId) return false;
    if (themeId === 'obsidian-violet') return true; // Default is always valid
    return unlockedThemes.includes(themeId);
  }

  /**
   * High-performance worker-offloaded calculation for Rare & Mythic unlock overlays
   */
  public prepareUnlockOverlayData(
    type: 'badge' | 'theme',
    id: string
  ): {
    id: string;
    type: 'badge' | 'theme';
    tier: VaultTier;
    title: string;
    description: string;
    criteriaText: string;
    iconName?: string;
    themeData?: VaultTheme;
    badgeData?: VaultBadge;
    particleCount: number;
    staggerBursts: boolean;
    audioCue: { type: 'badge' | 'theme'; tier: VaultTier };
    prestigeColor: string;
  } | null {
    if (type === 'badge') {
      const badge = MASTER_VAULT_BADGES.find(b => b.id === id);
      if (!badge) return null;
      const isMythic = badge.tier === 'mythic';
      return {
        id: badge.id,
        type: 'badge',
        tier: badge.tier,
        title: badge.title,
        description: badge.description,
        criteriaText: badge.criteriaText,
        iconName: badge.iconName,
        badgeData: badge,
        particleCount: isMythic ? 220 : 120,
        staggerBursts: true,
        audioCue: { type: 'badge', tier: badge.tier },
        prestigeColor: isMythic ? '#c084fc' : '#38bdf8'
      };
    } else {
      const theme = MASTER_VAULT_THEMES.find(t => t.id === id);
      if (!theme) return null;
      const isMythic = theme.tier === 'mythic';
      return {
        id: theme.id,
        type: 'theme',
        tier: theme.tier,
        title: theme.name,
        description: theme.tagline,
        criteriaText: theme.criteriaText,
        themeData: theme,
        particleCount: isMythic ? 240 : 130,
        staggerBursts: true,
        audioCue: { type: 'theme', tier: theme.tier },
        prestigeColor: isMythic ? '#f43f5e' : '#06b6d4'
      };
    }
  }
}

expose(new VaultComputeWorker());

