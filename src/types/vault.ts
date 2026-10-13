export type VaultTier = 'common' | 'rare' | 'legendary' | 'mythic';

export interface ThemeCssVars {
  primaryAccent: string;
  borderGlow: string;
  bgCard: string;
  bgPage?: string;
  accentGradient?: string;
}

export interface VaultTheme {
  id: string;
  number: number;
  name: string;
  tagline: string;
  tier: VaultTier;
  isUnlocked: boolean;
  isDefault?: boolean;
  criteriaText: string;
  cssVars: ThemeCssVars;
  unlockCondition?: {
    type: 'streak' | 'water' | 'calories' | 'volume' | 'steps' | 'velocity' | 'default' | 'workouts' | 'step_days' | 'water_days' | 'total_sets' | 'checkin_days' | 'diet_logged' | 'streak_and_progress' | 'calorie_streak' | 'triple_goal_streak' | 'active_training_days';
    threshold: number;
    secondaryThreshold?: number;
  };
}

export interface VaultBadge {
  id: string;
  number: number;
  title: string;
  description: string;
  tier: VaultTier;
  iconName: string;
  isUnlocked: boolean;
  criteriaText: string;
  progress: number; // 0 to 100
  targetValue: number;
  currentValue: number;
  metricUnit: string;
  unlockCondition: {
    type: 'streak' | 'water' | 'calories' | 'volume' | 'steps' | 'velocity' | 'default' | 'workouts' | 'step_days' | 'water_days' | 'total_sets' | 'checkin_days' | 'diet_logged' | 'early_bird' | 'night_owl' | 'water_logged_days' | 'exercises_with_notes' | 'weekend_warrior' | 'velocity_surge' | 'consistent_training_days' | 'hydration_consecutive_days' | 'beast_mode_rest_workouts' | 'velocity_boost_days' | 'legacy_anchor' | 'velocity_boost_14d' | 'recovery_notes_days' | 'macro_balance_streak' | 'consistent_activity_days' | 'immortal_streak_200' | 'apex_synthesis';
    threshold: number;
  };
}

export interface VaultCategory {
  id: string;
  tier: VaultTier;
  tierNumber: 1 | 2 | 3 | 4;
  title: string;
  tagline: string;
  isLocked: boolean;
  expectedBadgeSlots: number;
  expectedThemeSlots: number;
  badges: VaultBadge[]; // Badges sub-section
  themes: VaultTheme[]; // Themes sub-section
}

export interface VaultTelemetry {
  streaks: number;
  water: number;       // ml
  calories: number;    // kcal
  volume: number;      // kg lifted
  steps: number;       // step count
  velocity: number;    // workouts logged or speed index
  progressIncrease?: number; // % progress increase
  calorieStreak?: number;    // consecutive calorie target / deficit hit streak
  tripleGoalStreak?: number; // consecutive days hitting water + step + workout goals simultaneously
  activeTrainingDays?: number; // cumulative active training days
  earlyBirdWorkouts?: number; // workouts logged before 6:00 AM
  nightOwlWorkouts?: number;  // workouts logged after 10:00 PM
  waterLoggedDays?: number;   // non-consecutive days with water logged
  exercisesWithNotes?: number;// exercises logged with set/rep notes
  weekendWorkoutsCompleted?: number; // weekends with both Sat & Sun logged
  velocitySurge?: number;     // rapid high-velocity early progress surge
  consistentTrainingDays?: number; // workouts logged consistently for 50 days (excluding rest days)
  hydrationStreakDays?: number;    // daily water goal consecutive days
  beastModeWorkouts?: number;      // workouts with Beast Mode rest intervals without skipping
  velocityBoostDays?: number;      // days maintaining >= 25% velocity/volume boost
  legacyAnchorProgress?: number;   // 365 cumulative logged training days with >= 15% baseline
  velocityBoost14d?: number;       // 14-day average workout completion speed / density % boost
  recoveryNotesDays?: number;      // designated rest/recovery days with mobility notes logged
  macroBalanceStreak?: number;     // consecutive days matching calorie/macro targets within 5% tolerance
  consistentActivityDays?: number; // 100 days of consistent activity tracking
  immortalStreak200?: number;      // 200-day uninterrupted workout streak
  apexSynthesisProgress?: number;  // composite percentage progress towards apex physiology synthesis
  lastUpdated?: string;
  workoutsCount?: number;
  stepDays?: number;
  waterDays?: number;
  totalSets?: number;
  checkinDays?: number;
  dietLogged?: number;
}

export interface MilestoneAchievementDefinition {
  id: string;
  title: string;
  description: string;
  tier: VaultTier;
  iconName: string;
  metric: 'calories' | 'volume' | 'steps';
  threshold: number;
  metricUnit: string;
}

export const TELEMETRY_MILESTONES: MilestoneAchievementDefinition[] = [
  // Calories Milestones
  {
    id: 'cal_500',
    title: 'First Spark',
    description: 'Burned 500 active calories across training sessions.',
    tier: 'common',
    iconName: 'Flame',
    metric: 'calories',
    threshold: 500,
    metricUnit: 'kcal'
  },
  {
    id: 'cal_1000',
    title: 'Kilocalorie Pioneer',
    description: 'Surpassed 1,000 total calories burned.',
    tier: 'common',
    iconName: 'Zap',
    metric: 'calories',
    threshold: 1000,
    metricUnit: 'kcal'
  },
  {
    id: 'cal_2500',
    title: 'Calorie Crusher',
    description: 'Destroyed 2,500 total calories through consistent output.',
    tier: 'rare',
    iconName: 'Flame',
    metric: 'calories',
    threshold: 2500,
    metricUnit: 'kcal'
  },
  {
    id: 'cal_5000',
    title: 'Metabolic Furnace',
    description: 'Incinerated 5,000 calories with high metabolic intensity.',
    tier: 'rare',
    iconName: 'Activity',
    metric: 'calories',
    threshold: 5000,
    metricUnit: 'kcal'
  },
  {
    id: 'cal_10000',
    title: 'Inferno Athlete',
    description: 'Exceeded 10,000 total calories burned.',
    tier: 'legendary',
    iconName: 'Award',
    metric: 'calories',
    threshold: 10000,
    metricUnit: 'kcal'
  },
  {
    id: 'cal_25000',
    title: 'Endurance Dynamo',
    description: 'Pushed through 25,000 total calories.',
    tier: 'legendary',
    iconName: 'Shield',
    metric: 'calories',
    threshold: 25000,
    metricUnit: 'kcal'
  },
  {
    id: 'cal_50000',
    title: 'Apex Sun',
    description: 'Ascended to 50,000 calories burned. Apex metabolic mastery.',
    tier: 'mythic',
    iconName: 'Crown',
    metric: 'calories',
    threshold: 50000,
    metricUnit: 'kcal'
  },

  // Volume Milestones (kg lifted)
  {
    id: 'vol_1000',
    title: 'First Iron',
    description: 'Lifted 1,000 kg total volume across workout sets.',
    tier: 'common',
    iconName: 'Dumbbell',
    metric: 'volume',
    threshold: 1000,
    metricUnit: 'kg'
  },
  {
    id: 'vol_2500',
    title: 'Iron Stride',
    description: 'Moved 2,500 kg total volume.',
    tier: 'common',
    iconName: 'Dumbbell',
    metric: 'volume',
    threshold: 2500,
    metricUnit: 'kg'
  },
  {
    id: 'vol_5000',
    title: 'Steel Lifter',
    description: 'Accumulated 5,000 kg in total training volume.',
    tier: 'rare',
    iconName: 'Award',
    metric: 'volume',
    threshold: 5000,
    metricUnit: 'kg'
  },
  {
    id: 'vol_10000',
    title: 'Heavy Metal',
    description: 'Conquered 10,000 kg in total weight moved.',
    tier: 'rare',
    iconName: 'Shield',
    metric: 'volume',
    threshold: 10000,
    metricUnit: 'kg'
  },
  {
    id: 'vol_25000',
    title: 'Titanium Mover',
    description: 'Lifted 25,000 kg total volume.',
    tier: 'legendary',
    iconName: 'Trophy',
    metric: 'volume',
    threshold: 25000,
    metricUnit: 'kg'
  },
  {
    id: 'vol_50000',
    title: 'Colossus of Iron',
    description: 'Surpassed 50,000 kg total training volume.',
    tier: 'legendary',
    iconName: 'Target',
    metric: 'volume',
    threshold: 50000,
    metricUnit: 'kg'
  },
  {
    id: 'vol_100000',
    title: 'Mythic Atlas',
    description: 'Moved 100,000 kg total volume. Mythic physical strength.',
    tier: 'mythic',
    iconName: 'Crown',
    metric: 'volume',
    threshold: 100000,
    metricUnit: 'kg'
  },

  // Step Milestones
  {
    id: 'steps_1000',
    title: 'First Steps',
    description: 'Logged 1,000 verified steps.',
    tier: 'common',
    iconName: 'Footprints',
    metric: 'steps',
    threshold: 1000,
    metricUnit: 'steps'
  },
  {
    id: 'steps_5000',
    title: 'Pacesetter',
    description: 'Covered 5,000 steps with disciplined daily movement.',
    tier: 'common',
    iconName: 'TrendingUp',
    metric: 'steps',
    threshold: 5000,
    metricUnit: 'steps'
  },
  {
    id: 'steps_10000',
    title: 'Daily Stride Master',
    description: 'Achieved 10,000 steps in a single stride milestone.',
    tier: 'rare',
    iconName: 'Footprints',
    metric: 'steps',
    threshold: 10000,
    metricUnit: 'steps'
  },
  {
    id: 'steps_20000',
    title: 'Pathfinder',
    description: 'Crossed 20,000 steps.',
    tier: 'rare',
    iconName: 'Activity',
    metric: 'steps',
    threshold: 20000,
    metricUnit: 'steps'
  },
  {
    id: 'steps_50000',
    title: 'Ultra Trekker',
    description: 'Logged 50,000 total steps across your journeys.',
    tier: 'legendary',
    iconName: 'Award',
    metric: 'steps',
    threshold: 50000,
    metricUnit: 'steps'
  },
  {
    id: 'steps_75000',
    title: 'Marathon Voyager',
    description: 'Reached 75,000 steps.',
    tier: 'legendary',
    iconName: 'Trophy',
    metric: 'steps',
    threshold: 75000,
    metricUnit: 'steps'
  },
  {
    id: 'steps_100000',
    title: 'Centurion Walker',
    description: 'Logged 100,000 steps. Centurion endurance achievement.',
    tier: 'mythic',
    iconName: 'Crown',
    metric: 'steps',
    threshold: 100000,
    metricUnit: 'steps'
  }
];

export interface VaultState {
  id: string;
  activeTheme: string;
  unlockedThemes: string[];
  unlockedBadges: string[];
  categories: VaultCategory[];
  themes: VaultTheme[];
  badges: VaultBadge[];
  telemetry: VaultTelemetry;
  totalExpectedBadges: number;
  totalExpectedThemes: number;
  lastSyncedAt: string;
}

// 8 Common Themes for Category 1
export const COMMON_VAULT_THEMES: VaultTheme[] = [
  {
    id: 'obsidian-violet',
    number: 1,
    name: 'Developer Default (PulseFit Baseline)',
    tagline: 'Deep slate background, electric violet accents.',
    tier: 'common',
    isUnlocked: true,
    isDefault: true,
    criteriaText: 'Status: Unlocked by default.',
    cssVars: {
      primaryAccent: '#8b5cf6',
      borderGlow: 'rgba(139, 92, 246, 0.45)',
      bgCard: 'rgba(18, 18, 24, 0.85)',
      bgPage: '#09090b',
      accentGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)'
    },
    unlockCondition: {
      type: 'default',
      threshold: 0
    }
  },
  {
    id: 'slate-minimal',
    number: 2,
    name: 'Slate Minimal',
    tagline: 'Charcoal gray UI, neutral white borders.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Complete 1 total workout.',
    cssVars: {
      primaryAccent: '#f4f4f5',
      borderGlow: 'rgba(244, 244, 245, 0.35)',
      bgCard: 'rgba(24, 24, 27, 0.85)',
      bgPage: '#09090b',
      accentGradient: 'linear-gradient(135deg, #f4f4f5 0%, #a1a1aa 100%)'
    },
    unlockCondition: {
      type: 'workouts',
      threshold: 1
    }
  },
  {
    id: 'graphite-pulse',
    number: 3,
    name: 'Graphite Pulse',
    tagline: 'Matte grey base, subtle blue-grey highlights.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Log 3 total step-count days (≥ 5,000 steps).',
    cssVars: {
      primaryAccent: '#94a3b8',
      borderGlow: 'rgba(148, 163, 184, 0.35)',
      bgCard: 'rgba(30, 32, 36, 0.85)',
      bgPage: '#0c0d10',
      accentGradient: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)'
    },
    unlockCondition: {
      type: 'step_days',
      threshold: 3
    }
  },
  {
    id: 'foggy-morning',
    number: 4,
    name: 'Foggy Morning',
    tagline: 'Muted grey-blue frost palette.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Log hydration goal for 3 cumulative days.',
    cssVars: {
      primaryAccent: '#7dd3fc',
      borderGlow: 'rgba(125, 211, 252, 0.35)',
      bgCard: 'rgba(19, 27, 36, 0.85)',
      bgPage: '#090d12',
      accentGradient: 'linear-gradient(135deg, #7dd3fc 0%, #38bdf8 100%)'
    },
    unlockCondition: {
      type: 'water_days',
      threshold: 3
    }
  },
  {
    id: 'charcoal-ember',
    number: 5,
    name: 'Charcoal Ember',
    tagline: 'Deep charcoal with faint warm orange pulse borders.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Burn cumulative 5,000 active calories.',
    cssVars: {
      primaryAccent: '#f97316',
      borderGlow: 'rgba(249, 115, 22, 0.4)',
      bgCard: 'rgba(26, 23, 21, 0.85)',
      bgPage: '#0c0a09',
      accentGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    },
    unlockCondition: {
      type: 'calories',
      threshold: 5000
    }
  },
  {
    id: 'ash-steel',
    number: 6,
    name: 'Ash & Steel',
    tagline: 'Industrial pale steel gray accents.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Complete 10 total sets across any exercise.',
    cssVars: {
      primaryAccent: '#cbd5e1',
      borderGlow: 'rgba(203, 213, 225, 0.35)',
      bgCard: 'rgba(24, 25, 28, 0.85)',
      bgPage: '#0c0d0e',
      accentGradient: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)'
    },
    unlockCondition: {
      type: 'total_sets',
      threshold: 10
    }
  },
  {
    id: 'midnight-concrete',
    number: 7,
    name: 'Midnight Concrete',
    tagline: 'Flat matte dark grey theme.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Open app and check-in 5 separate days.',
    cssVars: {
      primaryAccent: '#71717a',
      borderGlow: 'rgba(113, 113, 122, 0.35)',
      bgCard: 'rgba(24, 24, 27, 0.85)',
      bgPage: '#09090b',
      accentGradient: 'linear-gradient(135deg, #a1a1aa 0%, #71717a 100%)'
    },
    unlockCondition: {
      type: 'checkin_days',
      threshold: 5
    }
  },
  {
    id: 'steel-dawn',
    number: 8,
    name: 'Steel Dawn',
    tagline: 'Bright metallic silver border accents on dark slate.',
    tier: 'common',
    isUnlocked: false,
    criteriaText: 'Unlock: Log first dietary/calorie tracking entry.',
    cssVars: {
      primaryAccent: '#e2e8f0',
      borderGlow: 'rgba(226, 232, 240, 0.45)',
      bgCard: 'rgba(17, 19, 24, 0.85)',
      bgPage: '#08090c',
      accentGradient: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 100%)'
    },
    unlockCondition: {
      type: 'diet_logged',
      threshold: 1
    }
  }
];

// 5 Rare Themes for Category 2
export const RARE_VAULT_THEMES: VaultTheme[] = [
  {
    id: 'cyberpunk-neon',
    number: 9,
    name: 'Cyberpunk Neon',
    tagline: 'Electric pink and neon cyan primary accents and borders.',
    tier: 'rare',
    isUnlocked: false,
    criteriaText: 'Unlock: ≥ 10-day streak AND ≥ 10% progress increase.',
    cssVars: {
      primaryAccent: '#ff007f',
      borderGlow: 'rgba(0, 240, 255, 0.55)',
      bgCard: 'rgba(18, 16, 28, 0.88)',
      bgPage: '#0a0612',
      accentGradient: 'linear-gradient(135deg, #ff007f 0%, #00f0ff 100%)'
    },
    unlockCondition: {
      type: 'streak_and_progress',
      threshold: 10,
      secondaryThreshold: 10
    }
  },
  {
    id: 'emerald-mint',
    number: 10,
    name: 'Emerald Mint',
    tagline: 'Fresh mint green and deep obsidian slate environment.',
    tier: 'rare',
    isUnlocked: false,
    criteriaText: 'Unlock: ≥ 30-day streak AND ≥ 20% progress increase.',
    cssVars: {
      primaryAccent: '#10b981',
      borderGlow: 'rgba(16, 185, 129, 0.5)',
      bgCard: 'rgba(10, 22, 18, 0.88)',
      bgPage: '#040d09',
      accentGradient: 'linear-gradient(135deg, #10b981 0%, #047857 100%)'
    },
    unlockCondition: {
      type: 'streak_and_progress',
      threshold: 30,
      secondaryThreshold: 20
    }
  },
  {
    id: 'electric-cobalt',
    number: 11,
    name: 'Electric Cobalt',
    tagline: 'Deep royal blue glow with high-contrast cyan edges.',
    tier: 'rare',
    isUnlocked: false,
    criteriaText: 'Unlock: Log 50,000 cumulative steps.',
    cssVars: {
      primaryAccent: '#2563eb',
      borderGlow: 'rgba(6, 182, 212, 0.6)',
      bgCard: 'rgba(15, 23, 42, 0.88)',
      bgPage: '#060b17',
      accentGradient: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)'
    },
    unlockCondition: {
      type: 'steps',
      threshold: 50000
    }
  },
  {
    id: 'sunset-amber',
    number: 12,
    name: 'Sunset Amber',
    tagline: 'Warm amber-orange highlights on dark bronze slate.',
    tier: 'rare',
    isUnlocked: false,
    criteriaText: 'Unlock: Maintain a 7-day calorie-deficit or target hit streak.',
    cssVars: {
      primaryAccent: '#f59e0b',
      borderGlow: 'rgba(245, 158, 11, 0.55)',
      bgCard: 'rgba(28, 20, 14, 0.88)',
      bgPage: '#110b06',
      accentGradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
    },
    unlockCondition: {
      type: 'calorie_streak',
      threshold: 7
    }
  },
  {
    id: 'toxic-lime',
    number: 13,
    name: 'Toxic Lime',
    tagline: 'Acid lime green high-visibility grid lines.',
    tier: 'rare',
    isUnlocked: false,
    criteriaText: 'Unlock: Cumulative lifting volume hits 25,000 kg.',
    cssVars: {
      primaryAccent: '#84cc16',
      borderGlow: 'rgba(132, 204, 22, 0.6)',
      bgCard: 'rgba(18, 26, 12, 0.88)',
      bgPage: '#070e03',
      accentGradient: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)'
    },
    unlockCondition: {
      type: 'volume',
      threshold: 25000
    }
  }
];

// 4 Legendary Themes for Category 3
export const LEGENDARY_VAULT_THEMES: VaultTheme[] = [
  {
    id: 'golden-obsidian',
    number: 14,
    name: 'Golden Obsidian',
    tagline: 'Royal luxury gold and deep black metallic aesthetic.',
    tier: 'legendary',
    isUnlocked: false,
    criteriaText: 'Unlock: ≥ 50-day streak with ≥ 30% progress increase.',
    cssVars: {
      primaryAccent: '#fbbf24',
      borderGlow: 'rgba(251, 191, 36, 0.65)',
      bgCard: 'rgba(20, 18, 12, 0.90)',
      bgPage: '#090804',
      accentGradient: 'linear-gradient(135deg, #fbbf24 0%, #b45309 100%)'
    },
    unlockCondition: {
      type: 'streak_and_progress',
      threshold: 50,
      secondaryThreshold: 30
    }
  },
  {
    id: 'plasma-violet',
    number: 15,
    name: 'Plasma Violet',
    tagline: 'Deep ultraviolet core glow with shifting magenta trim.',
    tier: 'legendary',
    isUnlocked: false,
    criteriaText: 'Unlock: Complete 100 total logged workouts.',
    cssVars: {
      primaryAccent: '#c026d3',
      borderGlow: 'rgba(192, 38, 211, 0.65)',
      bgCard: 'rgba(22, 12, 28, 0.90)',
      bgPage: '#0d0416',
      accentGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
    },
    unlockCondition: {
      type: 'workouts',
      threshold: 100
    }
  },
  {
    id: 'solar-flare',
    number: 16,
    name: 'Solar Flare',
    tagline: 'Bright red-gold hyper-contrast tactical HUD theme.',
    tier: 'legendary',
    isUnlocked: false,
    criteriaText: 'Unlock: Cumulative volume hits 250,000 kg.',
    cssVars: {
      primaryAccent: '#ef4444',
      borderGlow: 'rgba(239, 68, 68, 0.65)',
      bgCard: 'rgba(28, 12, 10, 0.90)',
      bgPage: '#120403',
      accentGradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)'
    },
    unlockCondition: {
      type: 'volume',
      threshold: 250000
    }
  },
  {
    id: 'abyssal-teal',
    number: 17,
    name: 'Abyssal Teal',
    tagline: 'Deep sea dark cyan bioluminescent glow.',
    tier: 'legendary',
    isUnlocked: false,
    criteriaText: 'Unlock: Hit water + step + workout goals simultaneously for 21 consecutive days.',
    cssVars: {
      primaryAccent: '#14b8a6',
      borderGlow: 'rgba(20, 184, 166, 0.65)',
      bgCard: 'rgba(8, 24, 28, 0.90)',
      bgPage: '#020d10',
      accentGradient: 'linear-gradient(135deg, #06b6d4 0%, #0d9488 100%)'
    },
    unlockCondition: {
      type: 'triple_goal_streak',
      threshold: 21
    }
  }
];

// 2 Mythic Themes for Category 4
export const MYTHIC_VAULT_THEMES: VaultTheme[] = [
  {
    id: 'celestial-aurora',
    number: 18,
    name: 'Celestial Aurora',
    tagline: 'Multi-spectral shifting cyan-purple-emerald edge illumination with glass frost backing.',
    tier: 'mythic',
    isUnlocked: false,
    criteriaText: 'Unlock: 120-day streak with ≥ 40% metric surge.',
    cssVars: {
      primaryAccent: '#38bdf8',
      borderGlow: 'rgba(56, 189, 248, 0.7)',
      bgCard: 'rgba(10, 16, 26, 0.88)',
      bgPage: '#030712',
      accentGradient: 'linear-gradient(135deg, #38bdf8 0%, #a855f7 50%, #10b981 100%)'
    },
    unlockCondition: {
      type: 'streak_and_progress',
      threshold: 120,
      secondaryThreshold: 40
    }
  },
  {
    id: 'void-singularity',
    number: 19,
    name: 'Void Singularity',
    tagline: 'Pure vantablack background with event-horizon thin white-hot ring borders.',
    tier: 'mythic',
    isUnlocked: false,
    criteriaText: 'Unlock: Complete 365 cumulative active training days.',
    cssVars: {
      primaryAccent: '#ffffff',
      borderGlow: 'rgba(255, 255, 255, 0.85)',
      bgCard: 'rgba(0, 0, 0, 0.98)',
      bgPage: '#000000',
      accentGradient: 'linear-gradient(135deg, #ffffff 0%, #71717a 50%, #000000 100%)'
    },
    unlockCondition: {
      type: 'active_training_days',
      threshold: 365
    }
  }
];

export const MASTER_VAULT_THEMES: VaultTheme[] = [
  ...COMMON_VAULT_THEMES,
  ...RARE_VAULT_THEMES,
  ...LEGENDARY_VAULT_THEMES,
  ...MYTHIC_VAULT_THEMES
];

// 14 Common Badges for Category 1
export const COMMON_VAULT_BADGES: VaultBadge[] = [
  {
    id: 'first-spark',
    number: 1,
    title: 'First Spark',
    description: 'Log your very first workout session.',
    tier: 'common',
    iconName: 'Zap',
    isUnlocked: false,
    criteriaText: 'Log 1 workout session',
    progress: 0,
    targetValue: 1,
    currentValue: 0,
    metricUnit: 'workout',
    unlockCondition: {
      type: 'workouts',
      threshold: 1
    }
  },
  {
    id: 'iron-will',
    number: 2,
    title: 'Iron Will',
    description: 'Unlocks automatically upon completing 5 consecutive logged workouts.',
    tier: 'common',
    iconName: 'Trophy',
    isUnlocked: false,
    criteriaText: 'Complete 5 consecutive logged workouts',
    progress: 0,
    targetValue: 5,
    currentValue: 0,
    metricUnit: 'workouts',
    unlockCondition: {
      type: 'streak',
      threshold: 5
    }
  },
  {
    id: 'hydration-novice',
    number: 3,
    title: 'Hydration Novice',
    description: 'Hit daily water goal for 3 straight days.',
    tier: 'common',
    iconName: 'Droplets',
    isUnlocked: false,
    criteriaText: 'Hit daily water goal 3 days in a row',
    progress: 0,
    targetValue: 3,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'water_days',
      threshold: 3
    }
  },
  {
    id: 'step-counter-1',
    number: 4,
    title: 'Step Counter I',
    description: 'Reach 10,000 single-day steps.',
    tier: 'common',
    iconName: 'Footprints',
    isUnlocked: false,
    criteriaText: 'Reach 10,000 single-day steps',
    progress: 0,
    targetValue: 10000,
    currentValue: 0,
    metricUnit: 'steps',
    unlockCondition: {
      type: 'steps',
      threshold: 10000
    }
  },
  {
    id: 'calorie-spark',
    number: 5,
    title: 'Calorie Spark',
    description: 'Burn 2,000 total active calories tracked.',
    tier: 'common',
    iconName: 'Flame',
    isUnlocked: false,
    criteriaText: 'Burn 2,000 total active calories',
    progress: 0,
    targetValue: 2000,
    currentValue: 0,
    metricUnit: 'kcal',
    unlockCondition: {
      type: 'calories',
      threshold: 2000
    }
  },
  {
    id: 'volume-starter',
    number: 6,
    title: 'Volume Starter',
    description: 'Lift a cumulative 1,000 kg total volume.',
    tier: 'common',
    iconName: 'Dumbbell',
    isUnlocked: false,
    criteriaText: 'Lift 1,000 kg cumulative volume',
    progress: 0,
    targetValue: 1000,
    currentValue: 0,
    metricUnit: 'kg',
    unlockCondition: {
      type: 'volume',
      threshold: 1000
    }
  },
  {
    id: 'early-bird',
    number: 7,
    title: 'Early Bird',
    description: 'Log a workout before 6:00 AM.',
    tier: 'common',
    iconName: 'Sun',
    isUnlocked: false,
    criteriaText: 'Log a workout before 6:00 AM',
    progress: 0,
    targetValue: 1,
    currentValue: 0,
    metricUnit: 'workout',
    unlockCondition: {
      type: 'early_bird',
      threshold: 1
    }
  },
  {
    id: 'night-owl',
    number: 8,
    title: 'Night Owl',
    description: 'Log a workout after 10:00 PM.',
    tier: 'common',
    iconName: 'Moon',
    isUnlocked: false,
    criteriaText: 'Log a workout after 10:00 PM',
    progress: 0,
    targetValue: 1,
    currentValue: 0,
    metricUnit: 'workout',
    unlockCondition: {
      type: 'night_owl',
      threshold: 1
    }
  },
  {
    id: 'set-grinder',
    number: 9,
    title: 'Set Grinder',
    description: 'Complete 50 total working sets across history.',
    tier: 'common',
    iconName: 'Layers',
    isUnlocked: false,
    criteriaText: 'Complete 50 working sets',
    progress: 0,
    targetValue: 50,
    currentValue: 0,
    metricUnit: 'sets',
    unlockCondition: {
      type: 'total_sets',
      threshold: 50
    }
  },
  {
    id: 'consistency-seed',
    number: 10,
    title: 'Consistency Seed',
    description: 'Achieve a 3-day workout streak.',
    tier: 'common',
    iconName: 'Sprout',
    isUnlocked: false,
    criteriaText: 'Achieve a 3-day workout streak',
    progress: 0,
    targetValue: 3,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'streak',
      threshold: 3
    }
  },
  {
    id: 'hydration-tracker',
    number: 11,
    title: 'Hydration Tracker',
    description: 'Log water 7 non-consecutive days.',
    tier: 'common',
    iconName: 'GlassWater',
    isUnlocked: false,
    criteriaText: 'Log water on 7 distinct days',
    progress: 0,
    targetValue: 7,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'water_logged_days',
      threshold: 7
    }
  },
  {
    id: 'form-checker',
    number: 12,
    title: 'Form Checker',
    description: 'Complete 10 exercises with full set/rep notes logged.',
    tier: 'common',
    iconName: 'ClipboardCheck',
    isUnlocked: false,
    criteriaText: 'Log 10 exercises with notes',
    progress: 0,
    targetValue: 10,
    currentValue: 0,
    metricUnit: 'exercises',
    unlockCondition: {
      type: 'exercises_with_notes',
      threshold: 10
    }
  },
  {
    id: 'weekend-warrior',
    number: 13,
    title: 'Weekend Warrior',
    description: 'Complete workouts on both Saturday and Sunday in one weekend.',
    tier: 'common',
    iconName: 'Shield',
    isUnlocked: false,
    criteriaText: 'Work out on Saturday & Sunday',
    progress: 0,
    targetValue: 1,
    currentValue: 0,
    metricUnit: 'weekend',
    unlockCondition: {
      type: 'weekend_warrior',
      threshold: 1
    }
  },
  {
    id: 'progression-dad',
    number: 14,
    title: 'Progression Dad',
    description: 'Unlocks automatically when a user makes rapid, high-velocity progress early in their fitness journey, displaying a fast-track achievement insignia.',
    tier: 'common',
    iconName: 'Gauge',
    isUnlocked: false,
    criteriaText: 'Rapid early progress surge',
    progress: 0,
    targetValue: 1,
    currentValue: 0,
    metricUnit: 'surge',
    unlockCondition: {
      type: 'velocity_surge',
      threshold: 1
    }
  }
];

export const RARE_VAULT_BADGES: VaultBadge[] = [
  {
    id: 'hydration-master',
    number: 15,
    title: 'Hydration Master',
    description: 'Unlocks when daily water intake goal is successfully met for 7 consecutive days.',
    tier: 'rare',
    iconName: 'GlowingWaterDroplet',
    isUnlocked: false,
    criteriaText: 'Hit daily water intake goal for 7 consecutive days',
    progress: 0,
    targetValue: 7,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'hydration_consecutive_days',
      threshold: 7
    }
  },
  {
    id: 'beast-mode',
    number: 16,
    title: 'Beast Mode (Perk/Badgehybrid)',
    description: 'Unlocks at a 14-day streak. Unlocks specialized high-intensity or extended configuration options directly on the workout rest timer interface.',
    tier: 'rare',
    iconName: 'RoaringBeast',
    isUnlocked: false,
    criteriaText: 'Reach a 14-day streak (Perk: Rest timer interface options)',
    progress: 0,
    targetValue: 14,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'streak',
      threshold: 14
    }
  },
  {
    id: 'step-centurion',
    number: 17,
    title: 'Step Centurion',
    description: 'Hit 100,000 cumulative steps tracked.',
    tier: 'rare',
    iconName: 'WingedBoot',
    isUnlocked: false,
    criteriaText: 'Hit 100,000 cumulative steps tracked',
    progress: 0,
    targetValue: 100000,
    currentValue: 0,
    metricUnit: 'steps',
    unlockCondition: {
      type: 'steps',
      threshold: 100000
    }
  },
  {
    id: 'calorie-furnace',
    number: 18,
    title: 'Calorie Furnace',
    description: 'Burn 25,000 cumulative active calories.',
    tier: 'rare',
    iconName: 'RoaringBlueFlame',
    isUnlocked: false,
    criteriaText: 'Burn 25,000 cumulative active calories',
    progress: 0,
    targetValue: 25000,
    currentValue: 0,
    metricUnit: 'kcal',
    unlockCondition: {
      type: 'calories',
      threshold: 25000
    }
  },
  {
    id: 'volume-heavy',
    number: 19,
    title: 'Volume Heavy',
    description: 'Cumulative lifting volume hits 50,000 kg.',
    tier: 'rare',
    iconName: 'HeavyBronzePlate',
    isUnlocked: false,
    criteriaText: 'Hit 50,000 kg cumulative lifting volume',
    progress: 0,
    targetValue: 50000,
    currentValue: 0,
    metricUnit: 'kg',
    unlockCondition: {
      type: 'volume',
      threshold: 50000
    }
  },
  {
    id: 'streak-fortified',
    number: 20,
    title: 'Streak Fortified',
    description: 'Reach a 21-day continuous workout streak.',
    tier: 'rare',
    iconName: 'StoneFortress',
    isUnlocked: false,
    criteriaText: 'Reach a 21-day continuous workout streak',
    progress: 0,
    targetValue: 21,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'streak',
      threshold: 21
    }
  },
  {
    id: 'water-guardian',
    number: 21,
    title: 'Water Guardian',
    description: 'Hit daily water target 30 total days.',
    tier: 'rare',
    iconName: 'CrystalChalice',
    isUnlocked: false,
    criteriaText: 'Hit daily water target on 30 total days',
    progress: 0,
    targetValue: 30,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'water_days',
      threshold: 30
    }
  },
  {
    id: 'set-machine',
    number: 22,
    title: 'Set Machine',
    description: 'Complete 500 total working sets.',
    tier: 'rare',
    iconName: 'GearCluster',
    isUnlocked: false,
    criteriaText: 'Complete 500 total working sets',
    progress: 0,
    targetValue: 500,
    currentValue: 0,
    metricUnit: 'sets',
    unlockCondition: {
      type: 'total_sets',
      threshold: 500
    }
  },
  {
    id: 'velocity-tracker',
    number: 23,
    title: 'Velocity Tracker',
    description: 'Increase average workout completion speed/density by 15% over 14 days.',
    tier: 'rare',
    iconName: 'SpeedometerNeedle',
    isUnlocked: false,
    criteriaText: 'Increase workout completion speed/density by 15% over 14 days',
    progress: 0,
    targetValue: 15,
    currentValue: 0,
    metricUnit: '%',
    unlockCondition: {
      type: 'velocity_boost_14d',
      threshold: 15
    }
  },
  {
    id: 'recovery-disciplinarian',
    number: 24,
    title: 'Recovery Disciplinarian',
    description: 'Log designated rest/recovery days with mobility notes 10 times.',
    tier: 'rare',
    iconName: 'LeafPulse',
    isUnlocked: false,
    criteriaText: 'Log rest/recovery days with mobility notes 10 times',
    progress: 0,
    targetValue: 10,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'recovery_notes_days',
      threshold: 10
    }
  },
  {
    id: 'macro-balance',
    number: 25,
    title: 'Macro Balance',
    description: 'Match calorie/macro targets within 5% tolerance for 7 straight days.',
    tier: 'rare',
    iconName: 'ScaleEquilibrium',
    isUnlocked: false,
    criteriaText: 'Match calorie/macro targets within 5% tolerance for 7 straight days',
    progress: 0,
    targetValue: 7,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'macro_balance_streak',
      threshold: 7
    }
  },
  {
    id: 'iron-novice-apex',
    number: 26,
    title: 'Iron Novice Apex',
    description: 'Complete 25 total logged workouts.',
    tier: 'rare',
    iconName: 'SilverPlatedShield',
    isUnlocked: false,
    criteriaText: 'Complete 25 total logged workouts',
    progress: 0,
    targetValue: 25,
    currentValue: 0,
    metricUnit: 'workouts',
    unlockCondition: {
      type: 'workouts',
      threshold: 25
    }
  }
];

export const LEGENDARY_VAULT_BADGES: VaultBadge[] = [
  {
    id: 'consistency-king',
    number: 27,
    title: 'Consistency King',
    description: 'Unlocks when user logs workouts consistently for 50 days (excluding designated recovery/rest days).',
    tier: 'legendary',
    iconName: 'CrownConsistency',
    isUnlocked: false,
    criteriaText: 'Log workouts consistently for 50 days',
    progress: 0,
    targetValue: 50,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'consistent_training_days',
      threshold: 50
    }
  },
  {
    id: 'volume-titan',
    number: 28,
    title: 'Volume Titan',
    description: 'Cumulative lifting volume crosses 250,000 kg.',
    tier: 'legendary',
    iconName: 'MonolithBarbell',
    isUnlocked: false,
    criteriaText: 'Cross 250,000 kg cumulative lifting volume',
    progress: 0,
    targetValue: 250000,
    currentValue: 0,
    metricUnit: 'kg',
    unlockCondition: {
      type: 'volume',
      threshold: 250000
    }
  },
  {
    id: 'hydration-archon',
    number: 29,
    title: 'Hydration Archon',
    description: 'Hit daily water goal for 90 consecutive days.',
    tier: 'legendary',
    iconName: 'OceanVortexOrb',
    isUnlocked: false,
    criteriaText: 'Hit daily water goal for 90 consecutive days',
    progress: 0,
    targetValue: 90,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'hydration_consecutive_days',
      threshold: 90
    }
  },
  {
    id: 'calorie-inferno',
    number: 30,
    title: 'Calorie Inferno',
    description: 'Burn 150,000 cumulative active calories.',
    tier: 'legendary',
    iconName: 'PlasmaHyperFlame',
    isUnlocked: false,
    criteriaText: 'Burn 150,000 cumulative active calories',
    progress: 0,
    targetValue: 150000,
    currentValue: 0,
    metricUnit: 'kcal',
    unlockCondition: {
      type: 'calories',
      threshold: 150000
    }
  },
  {
    id: 'step-marathoner',
    number: 31,
    title: 'Step Marathoner',
    description: 'Hit 1,000,000 cumulative steps tracked.',
    tier: 'legendary',
    iconName: 'GlobalStrideInsignia',
    isUnlocked: false,
    criteriaText: 'Hit 1,000,000 cumulative steps tracked',
    progress: 0,
    targetValue: 1000000,
    currentValue: 0,
    metricUnit: 'steps',
    unlockCondition: {
      type: 'steps',
      threshold: 1000000
    }
  },
  {
    id: 'iron-veteran',
    number: 32,
    title: 'Iron Veteran',
    description: 'Complete 150 total logged workouts.',
    tier: 'legendary',
    iconName: 'GoldCrustedTactical',
    isUnlocked: false,
    criteriaText: 'Complete 150 total logged workouts',
    progress: 0,
    targetValue: 150,
    currentValue: 0,
    metricUnit: 'workouts',
    unlockCondition: {
      type: 'workouts',
      threshold: 150
    }
  },
  {
    id: 'rest-timer-tactician',
    number: 33,
    title: 'Rest-Timer Tactician',
    description: 'Complete 100 workouts using customized Beast Mode rest intervals without skipping.',
    tier: 'legendary',
    iconName: 'ChronoGearHeart',
    isUnlocked: false,
    criteriaText: 'Complete 100 workouts with Beast Mode rest intervals',
    progress: 0,
    targetValue: 100,
    currentValue: 0,
    metricUnit: 'workouts',
    unlockCondition: {
      type: 'beast_mode_rest_workouts',
      threshold: 100
    }
  },
  {
    id: 'velocity-master',
    number: 34,
    title: 'Velocity Master',
    description: 'Maintain ≥ 25% metric/volume velocity boost over 45 days.',
    tier: 'legendary',
    iconName: 'MachDeltaWing',
    isUnlocked: false,
    criteriaText: 'Maintain ≥ 25% velocity boost over 45 days',
    progress: 0,
    targetValue: 45,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'velocity_boost_days',
      threshold: 45
    }
  },
  {
    id: 'unbreakable-60',
    number: 35,
    title: 'Unbreakable 60',
    description: 'Achieve a 60-day unbroken workout streak.',
    tier: 'legendary',
    iconName: 'DiamondShield',
    isUnlocked: false,
    criteriaText: 'Achieve a 60-day unbroken workout streak',
    progress: 0,
    targetValue: 60,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'streak',
      threshold: 60
    }
  },
  {
    id: 'the-legacy-anchor',
    number: 36,
    title: 'THE LEGACY ANCHOR',
    description: 'Complete 365 cumulative logged training days and maintain all monthly baseline metrics ≥ +15% for 12 consecutive months.',
    tier: 'legendary',
    iconName: 'SingularityAnchor',
    isUnlocked: false,
    criteriaText: 'Complete 365 logged days & maintain +15% baseline for 12 months',
    progress: 0,
    targetValue: 365,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'legacy_anchor',
      threshold: 365
    }
  }
];

export const MYTHIC_VAULT_BADGES: VaultBadge[] = [
  {
    id: 'consistency-monster',
    number: 37,
    title: 'Consistency Monster',
    description: 'Unlocks at 100 days of consistent activity tracking.',
    tier: 'mythic',
    iconName: 'ConsistencyMonster',
    isUnlocked: false,
    criteriaText: 'Log 100 days of consistent activity tracking',
    progress: 0,
    targetValue: 100,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'consistent_activity_days',
      threshold: 100
    }
  },
  {
    id: 'the-immortal-200',
    number: 38,
    title: 'The Immortal 200',
    description: 'Achieve a 200-day uninterrupted workout streak with zero missed recovery checks.',
    tier: 'mythic',
    iconName: 'TheImmortal200',
    isUnlocked: false,
    criteriaText: 'Achieve a 200-day uninterrupted workout streak',
    progress: 0,
    targetValue: 200,
    currentValue: 0,
    metricUnit: 'days',
    unlockCondition: {
      type: 'immortal_streak_200',
      threshold: 200
    }
  },
  {
    id: 'volume-sovereign',
    number: 39,
    title: 'Volume Sovereign',
    description: 'Cumulative lifting volume hits 1,000,000 kg (1 Megagram of iron moved).',
    tier: 'mythic',
    iconName: 'VolumeSovereign',
    isUnlocked: false,
    criteriaText: 'Hit 1,000,000 kg cumulative lifting volume (1 Megagram)',
    progress: 0,
    targetValue: 1000000,
    currentValue: 0,
    metricUnit: 'kg',
    unlockCondition: {
      type: 'volume',
      threshold: 1000000
    }
  },
  {
    id: 'apex-physiology-synthesis',
    number: 40,
    title: 'Apex Physiology Synthesis',
    description: 'Achieve 365-day streak, 500,000 kcal burned, 2,000,000 steps, and unlock Midas Platinum Crown theme.',
    tier: 'mythic',
    iconName: 'ApexPhysiologySynthesis',
    isUnlocked: false,
    criteriaText: '365-day streak, 500k kcal, 2M steps & Midas Platinum Crown',
    progress: 0,
    targetValue: 100,
    currentValue: 0,
    metricUnit: '%',
    unlockCondition: {
      type: 'apex_synthesis',
      threshold: 100
    }
  }
];

export const MASTER_VAULT_BADGES: VaultBadge[] = [
  ...COMMON_VAULT_BADGES,
  ...RARE_VAULT_BADGES,
  ...LEGENDARY_VAULT_BADGES,
  ...MYTHIC_VAULT_BADGES
];

export const INITIAL_VAULT_CATEGORIES: VaultCategory[] = [
  {
    id: 'tier-1-common',
    tier: 'common',
    tierNumber: 1,
    title: 'Category 1 (Common)',
    tagline: 'Default/basic milestones, easy daily tracking.',
    isLocked: false,
    expectedBadgeSlots: 14,
    expectedThemeSlots: 8,
    badges: COMMON_VAULT_BADGES,
    themes: COMMON_VAULT_THEMES
  },
  {
    id: 'tier-2-rare',
    tier: 'rare',
    tierNumber: 2,
    title: 'Category 2 (Rare)',
    tagline: 'Multi-day consistency, moderate volume/calorie targets.',
    isLocked: false,
    expectedBadgeSlots: 12,
    expectedThemeSlots: 5,
    badges: RARE_VAULT_BADGES,
    themes: RARE_VAULT_THEMES
  },
  {
    id: 'tier-3-legendary',
    tier: 'legendary',
    tierNumber: 3,
    title: 'Category 3 (Legendary)',
    tagline: 'Deep discipline, massive aggregate numbers.',
    isLocked: false,
    expectedBadgeSlots: 10,
    expectedThemeSlots: 4,
    badges: LEGENDARY_VAULT_BADGES,
    themes: LEGENDARY_VAULT_THEMES
  },
  {
    id: 'tier-4-mythic',
    tier: 'mythic',
    tierNumber: 4,
    title: 'Category 4 (Mythic)',
    tagline: 'Apex achievements, extreme endurance, long-term multi-month grind.',
    isLocked: false,
    expectedBadgeSlots: 4,
    expectedThemeSlots: 2,
    badges: MYTHIC_VAULT_BADGES,
    themes: MYTHIC_VAULT_THEMES
  }
];

export const INITIAL_VAULT_STATE: VaultState = {
  id: 'pulsefit_vault_state',
  activeTheme: 'obsidian-violet',
  unlockedThemes: ['obsidian-violet'],
  unlockedBadges: [],
  categories: INITIAL_VAULT_CATEGORIES,
  themes: [...COMMON_VAULT_THEMES, ...RARE_VAULT_THEMES, ...LEGENDARY_VAULT_THEMES, ...MYTHIC_VAULT_THEMES],
  badges: [...COMMON_VAULT_BADGES, ...RARE_VAULT_BADGES, ...LEGENDARY_VAULT_BADGES, ...MYTHIC_VAULT_BADGES],
  telemetry: {
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
    consistentTrainingDays: 0,
    hydrationStreakDays: 0,
    beastModeWorkouts: 0,
    velocityBoostDays: 0,
    legacyAnchorProgress: 0,
    velocityBoost14d: 0,
    recoveryNotesDays: 0,
    macroBalanceStreak: 0,
    consistentActivityDays: 0,
    immortalStreak200: 0,
    apexSynthesisProgress: 0,
    lastUpdated: new Date().toISOString()
  },
  totalExpectedBadges: COMMON_VAULT_BADGES.length + RARE_VAULT_BADGES.length + LEGENDARY_VAULT_BADGES.length + MYTHIC_VAULT_BADGES.length,
  totalExpectedThemes: COMMON_VAULT_THEMES.length + RARE_VAULT_THEMES.length + LEGENDARY_VAULT_THEMES.length + MYTHIC_VAULT_THEMES.length,
  lastSyncedAt: new Date().toISOString()
};
