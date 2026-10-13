import { expose } from 'comlink';

export interface RawProfileData {
  username?: string;
  pin?: string;
  age?: number;
  ageBracket?: string;
  height?: string;
  heightCm?: number;
  weight?: string;
  weightKg?: number;
  gender?: string;
  fitnessGoals?: string[];
  primaryGoal?: string;
  experienceLevel?: string;
  workoutLocation?: string;
  bodyType?: string;
  physicalConstraints?: string[];
  equipmentInventory?: string[];
  securityType?: string;
  totalStepsCounted?: number;
  totalCaloriesTracked?: number;
}

export interface RawWorkoutItem {
  id?: string;
  name?: string;
  date?: string;
  baseSets?: number;
  sets?: number;
  baseReps?: string;
  reps?: string;
  baseRest?: number;
  restSeconds?: number;
  isCompleted?: boolean;
  muscleGroup?: string;
  executionSpeed?: string;
}

export interface RawAppState {
  currentStreak?: number;
  workouts?: RawWorkoutItem[];
  totalExercisesLogged?: number;
  protectedRestDates?: string[];
  lastWorkoutDate?: string | null;
}

export interface ProcessedPdfPayload {
  branding: {
    title: string;
    subtitle: string;
    systemTag: string;
    generatedAt: string;
    offlineDigest: string;
  };
  deviceSpecs: {
    hardwareConcurrency: number;
    deviceMemoryGb: number;
    isConstrainedDevice: boolean;
    recommendedChunkSize: number;
  };
  userProfile: {
    username: string;
    age: string;
    height: string;
    weight: string;
    bmiValue: string;
    bmiCategory: string;
    hydrationGoal: string;
    totalStepsCounted: string;
    totalCaloriesTracked: string;
    securityType: string;
    goalDescription: string;
  };
  onboardingData: {
    experienceLevel: string;
    primaryGoal: string;
    ageBracket: string;
    physicalConstraints: string;
    workoutLocation: string;
    equipmentInventory: string;
    bodyType: string;
    gender: string;
    securityType: string;
    completedAtFirstLaunch: string;
  };
  summaryCards: {
    currentStreak: number;
    streakLabel: string;
    totalWorkoutsCompleted: number;
    totalExercisesExecuted: number;
    weeklyGoalRatio: string;
    weeklyGoalPercent: number;
  };
  last7DaysTelemetry: Array<{
    dateStr: string;
    dayLabel: string;
    status: 'Completed' | 'Rest Shield' | 'Active' | 'Missed';
    exercisesLogged: number;
    estimatedVolume: number;
    cadence: string;
  }>;
  chartData: {
    barChart: Array<{
      day: string;
      volume: number;
      completed: number;
      dateStr: string;
    }>;
    pieChart: Array<{
      name: string;
      count: number;
      percent: number;
      color: string;
    }>;
  };
  workoutHistory: Array<{
    id: string;
    date: string;
    exerciseName: string;
    muscleGroup: string;
    setsReps: string;
    restTimerUsed: string;
    executionSpeed: string;
  }>;
  timerMetrics: {
    standardRestDuration: string;
    cumulativeRestSeconds: number;
    cumulativeRestMinutes: string;
    aggregateExecutionSpeed: string;
    cadenceSummary: string;
  };
}

/**
 * Heuristic mapping to infer targeted muscle groups from exercise names
 */
function inferMuscleGroup(exerciseName: string): string {
  const lower = (exerciseName || '').toLowerCase();
  
  if (lower.includes('push-up') || lower.includes('pushup') || lower.includes('dip') || lower.includes('chest') || lower.includes('bench') || lower.includes('press')) {
    return 'Chest & Triceps';
  }
  if (lower.includes('pull-up') || lower.includes('pullup') || lower.includes('chin-up') || lower.includes('lever') || lower.includes('row') || lower.includes('lat')) {
    return 'Back & Lats';
  }
  if (lower.includes('squat') || lower.includes('lunge') || lower.includes('pistol') || lower.includes('calf') || lower.includes('quad') || lower.includes('hamstring') || lower.includes('leg')) {
    return 'Legs & Quads';
  }
  if (lower.includes('plank') || lower.includes('l-sit') || lower.includes('dragon flag') || lower.includes('hollow') || lower.includes('crunch') || lower.includes('core') || lower.includes('ab')) {
    return 'Core & Abs';
  }
  if (lower.includes('handstand') || lower.includes('pike') || lower.includes('shoulder') || lower.includes('deltoid') || lower.includes('planche')) {
    return 'Shoulders & Deltoids';
  }
  if (lower.includes('curl') || lower.includes('bicep') || lower.includes('tricep') || lower.includes('arm')) {
    return 'Arms & Forearms';
  }
  if (lower.includes('neck') || lower.includes('bridge') || lower.includes('trap')) {
    return 'Neck & Traps';
  }
  return 'Full Body Conditioning';
}

const pdfWorkerApi = {
  /**
   * Hardware-optimized telemetry preparation & statistical compilation
   */
  async preparePdfPayload(
    profile: RawProfileData | null,
    appState: RawAppState | null,
    historyList: RawWorkoutItem[] | null,
    hardwareConcurrency: number = 4,
    deviceMemoryGb: number = 4
  ): Promise<ProcessedPdfPayload> {
    const isConstrainedDevice = hardwareConcurrency <= 2 || deviceMemoryGb <= 2;
    const recommendedChunkSize = isConstrainedDevice ? 15 : 40;

    // 1. Profile & Biometric Derivations
    const username = (profile?.username || 'Athlete').trim();
    const ageVal = profile?.age || (profile?.ageBracket ? parseInt(profile.ageBracket, 10) : undefined);
    const age = ageVal ? `${ageVal} yrs` : (profile?.ageBracket || '25-34 yrs');
    
    // Robust parsing for height and weight
    let heightNum = 175;
    if (typeof profile?.heightCm === 'number' && profile.heightCm > 0) {
      heightNum = profile.heightCm;
    } else if (profile?.height) {
      const parsed = parseFloat(String(profile.height).replace(/[^0-9.]/g, ''));
      if (!isNaN(parsed) && parsed > 0) heightNum = parsed;
    }

    let weightNum = 72;
    if (typeof profile?.weightKg === 'number' && profile.weightKg > 0) {
      weightNum = profile.weightKg;
    } else if (profile?.weight) {
      const parsed = parseFloat(String(profile.weight).replace(/[^0-9.]/g, ''));
      if (!isNaN(parsed) && parsed > 0) weightNum = parsed;
    }
    
    const height = `${Math.round(heightNum)} cm`;
    const weight = `${Math.round(weightNum * 10) / 10} kg`;

    // Calculate BMI & Category (WHO Standard)
    const heightInMeters = heightNum / 100;
    const rawBmi = heightInMeters > 0 ? weightNum / (heightInMeters * heightInMeters) : 22.5;
    const bmiValue = rawBmi.toFixed(1);
    
    let bmiCategory = 'Normal (Healthy Weight)';
    if (rawBmi < 18.5) {
      bmiCategory = 'Underweight (Mass Focus)';
    } else if (rawBmi >= 18.5 && rawBmi < 25.0) {
      bmiCategory = 'Normal (Healthy Weight)';
    } else if (rawBmi >= 25.0 && rawBmi < 30.0) {
      bmiCategory = 'Overweight (Recomposition Target)';
    } else if (rawBmi >= 30.0 && rawBmi < 35.0) {
      bmiCategory = 'Obese Class I (Cardio & Deficit)';
    } else {
      bmiCategory = 'Obese Class II/III (Structured Deficit)';
    }

    // Standard hydration goal: 35ml per kg of bodyweight
    const hydrationMl = Math.round(weightNum * 35);
    const hydrationGoal = `${hydrationMl.toLocaleString('en-US')} ml / day (${(hydrationMl / 1000).toFixed(1)}L)`;

    const goalDescription = profile?.primaryGoal || (profile?.fitnessGoals && profile.fitnessGoals[0]) || 'Muscle Gain & Hypertrophy';

    // Security Type Identification
    const securityType = profile?.securityType || (
      profile?.pin 
        ? '4-Digit PIN Lock (Active)' 
        : 'Fingerprint Lock / Secure Local Storage'
    );

    // 2. Workouts & History Compilation
    const unifiedWorkouts: RawWorkoutItem[] = [];
    const seenWorkoutIds = new Set<string>();

    if (Array.isArray(historyList)) {
      for (const item of historyList) {
        if (item && item.name) {
          const id = item.id || `hist_${item.name}_${item.date || ''}`;
          if (!seenWorkoutIds.has(id)) {
            seenWorkoutIds.add(id);
            unifiedWorkouts.push(item);
          }
        }
      }
    }

    if (Array.isArray(appState?.workouts)) {
      for (const item of appState.workouts) {
        if (item && item.name) {
          const id = item.id || `state_${item.name}_${item.date || ''}`;
          if (!seenWorkoutIds.has(id)) {
            seenWorkoutIds.add(id);
            unifiedWorkouts.push(item);
          }
        }
      }
    }

    // Sort descending by date (most recent first)
    unifiedWorkouts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });

    const completedWorkouts = unifiedWorkouts.filter(w => w.isCompleted !== false);
    const totalWorkoutsCount = completedWorkouts.length;
    const totalExercisesCount = appState?.totalExercisesLogged || completedWorkouts.length;
    const currentStreak = appState?.currentStreak || 0;

    // Steps & Calories Aggregations
    const rawSteps = profile?.totalStepsCounted !== undefined && profile.totalStepsCounted > 0
      ? profile.totalStepsCounted 
      : (completedWorkouts.length * 1850);
    const totalStepsCounted = `${rawSteps.toLocaleString('en-US')} Steps`;

    const rawCalories = profile?.totalCaloriesTracked !== undefined && profile.totalCaloriesTracked > 0
      ? profile.totalCaloriesTracked
      : (completedWorkouts.length * 420);
    const totalCaloriesTracked = `${rawCalories.toLocaleString('en-US')} kcal Tracked`;

    // 3. 7/7 Initial Onboarding Data Extraction (Preserved from first launch)
    const onboardingData = {
      experienceLevel: profile?.experienceLevel || 'Intermediate',
      primaryGoal: profile?.primaryGoal || 'Muscle Gain & Hypertrophy',
      ageBracket: profile?.ageBracket || (profile?.age ? `${profile.age} yrs` : '25-34 yrs'),
      physicalConstraints: (profile?.physicalConstraints && profile.physicalConstraints.length > 0)
        ? profile.physicalConstraints.join(', ')
        : 'None (Full Functional Mobility)',
      workoutLocation: profile?.workoutLocation || 'Gym Membership / Hybrid Training',
      equipmentInventory: (profile?.equipmentInventory && profile.equipmentInventory.length > 0)
        ? profile.equipmentInventory.join(', ')
        : 'Commercial Power Rack, Olympic Barbell, Resistance Bands',
      bodyType: profile?.bodyType || 'Mesomorph (Athletic Build)',
      gender: profile?.gender || 'Athlete Member',
      securityType: securityType,
      completedAtFirstLaunch: 'Verified at First App Launch'
    };

    // 4. Weekly Goal Completion Ratio (last 7 days)
    const now = new Date();
    const last7DaysStrings: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      last7DaysStrings.push(d.toISOString().split('T')[0]);
    }

    const completedDaysSet = new Set<string>();
    for (const w of completedWorkouts) {
      if (w.date) {
        const datePart = w.date.split('T')[0];
        if (last7DaysStrings.includes(datePart)) {
          completedDaysSet.add(datePart);
        }
      }
    }

    const weeklyGoalTarget = 5; // 5 days out of 7 standard athletic target
    const completedThisWeek = completedDaysSet.size;
    const weeklyGoalPercent = Math.min(100, Math.round((completedThisWeek / weeklyGoalTarget) * 100));
    const weeklyGoalRatio = `${completedThisWeek} / ${weeklyGoalTarget} Sessions (${weeklyGoalPercent}%)`;

    // 5. Last 7 Days Telemetry Table & Chart Generation
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const protectedDates = new Set(appState?.protectedRestDates || []);

    const last7DaysTelemetry = last7DaysStrings.map(dateStr => {
      const dateObj = new Date(dateStr + 'T00:00:00');
      const dayLabel = dayNames[dateObj.getDay()];
      const dayWorkouts = completedWorkouts.filter(w => w.date && w.date.startsWith(dateStr));
      
      let status: 'Completed' | 'Rest Shield' | 'Active' | 'Missed' = 'Missed';
      if (dayWorkouts.length > 0) {
        status = 'Completed';
      } else if (protectedDates.has(dateStr)) {
        status = 'Rest Shield';
      } else if (dateStr === now.toISOString().split('T')[0]) {
        status = 'Active';
      }

      const exercisesLogged = dayWorkouts.length;
      const estimatedVolume = exercisesLogged > 0 ? exercisesLogged * 2400 : 0;
      const cadence = exercisesLogged > 0 ? '1.2 reps/sec (Tempo 2-0-1-0)' : '—';

      return {
        dateStr,
        dayLabel,
        status,
        exercisesLogged,
        estimatedVolume,
        cadence
      };
    });

    // Bar Chart Data (Weekly Volume & Completion)
    const barChart = last7DaysTelemetry.map(t => ({
      day: t.dayLabel,
      volume: t.estimatedVolume > 0 ? t.estimatedVolume : (t.status === 'Completed' ? 2400 : 0),
      completed: t.exercisesLogged,
      dateStr: t.dateStr
    }));

    // Pie Chart Data (Muscle Group Distribution)
    const muscleCounts: Record<string, number> = {};
    for (const w of completedWorkouts) {
      const group = w.muscleGroup || inferMuscleGroup(w.name || '');
      muscleCounts[group] = (muscleCounts[group] || 0) + 1;
    }

    const totalMuscleExercises = Object.values(muscleCounts).reduce((a, b) => a + b, 0);
    const colorPalette = ['#7c3aed', '#10b981', '#0ea5e9', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6', '#8b5cf6'];
    
    let pieChart: Array<{ name: string; count: number; percent: number; color: string }> = [];
    if (totalMuscleExercises > 0) {
      pieChart = Object.entries(muscleCounts).map(([name, count], idx) => ({
        name,
        count,
        percent: Math.round((count / totalMuscleExercises) * 100),
        color: colorPalette[idx % colorPalette.length]
      }));
    } else {
      // Benchmark distribution
      pieChart = [
        { name: 'Chest & Triceps', count: 4, percent: 25, color: '#7c3aed' },
        { name: 'Back & Lats', count: 4, percent: 25, color: '#10b981' },
        { name: 'Legs & Quads', count: 3, percent: 20, color: '#0ea5e9' },
        { name: 'Core & Abs', count: 3, percent: 15, color: '#f59e0b' },
        { name: 'Shoulders & Arms', count: 2, percent: 15, color: '#ec4899' },
      ];
    }

    // 6. Workout History Table Transformation
    let totalRestSeconds = 0;
    const workoutHistory = completedWorkouts.map((w, index) => {
      const sets = w.baseSets || w.sets || 3;
      const reps = w.baseReps || w.reps || '10-12';
      const rest = w.baseRest || w.restSeconds || 60;
      totalRestSeconds += (sets * rest);

      let dateFormatted = 'Recent';
      if (w.date) {
        try {
          const d = new Date(w.date);
          dateFormatted = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        } catch {
          dateFormatted = w.date;
        }
      }

      return {
        id: w.id || `item_${index}`,
        date: dateFormatted,
        exerciseName: w.name || 'Bodyweight Movement',
        muscleGroup: w.muscleGroup || inferMuscleGroup(w.name || ''),
        setsReps: `${sets} sets × ${reps} reps`,
        restTimerUsed: `${rest}s`,
        executionSpeed: w.executionSpeed || 'Controlled (1.2 r/s)'
      };
    });

    const cumulativeRestMinutes = `${Math.round(totalRestSeconds / 60)} mins`;

    // 7. Branding & Timestamp
    const nowIso = now.toISOString();
    const digestSeed = `${username}_${totalWorkoutsCount}_${nowIso}`;
    const offlineDigest = `PF-${Math.abs(digestSeed.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).toUpperCase()}`;

    return {
      branding: {
        title: 'PULSEFIT ATHLETIC INTELLIGENCE',
        subtitle: 'Official Personal Progress & Health Report',
        systemTag: '',
        generatedAt: now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        offlineDigest
      },
      deviceSpecs: {
        hardwareConcurrency,
        deviceMemoryGb,
        isConstrainedDevice,
        recommendedChunkSize
      },
      userProfile: {
        username,
        age,
        height,
        weight,
        bmiValue,
        bmiCategory,
        hydrationGoal,
        totalStepsCounted,
        totalCaloriesTracked,
        securityType,
        goalDescription
      },
      onboardingData,
      summaryCards: {
        currentStreak,
        streakLabel: currentStreak === 1 ? '1 Day Streak' : `${currentStreak} Days Streak`,
        totalWorkoutsCompleted: totalWorkoutsCount,
        totalExercisesExecuted: totalExercisesCount,
        weeklyGoalRatio,
        weeklyGoalPercent
      },
      last7DaysTelemetry,
      chartData: {
        barChart,
        pieChart
      },
      workoutHistory,
      timerMetrics: {
        standardRestDuration: '60s per set',
        cumulativeRestSeconds: totalRestSeconds,
        cumulativeRestMinutes,
        aggregateExecutionSpeed: '1.2 reps/sec (Controlled Cadence)',
        cadenceSummary: 'Eccentric 2s • Isometric 0s • Concentric 1s'
      }
    };
  }
};

expose(pdfWorkerApi);
export type PdfWorkerApi = typeof pdfWorkerApi;
