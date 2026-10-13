import { expose } from 'comlink';

export interface RawMealItem {
  id?: string;
  name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
  quantity?: number;
  timestamp?: number;
  mealType?: string;
}

export interface RawDayMealRecord {
  date: string; // YYYY-MM-DD
  meals?: RawMealItem[];
  totalCalories?: number;
  totalProtein?: number;
  totalCarbs?: number;
  totalFats?: number;
  waterMl?: number;
  updatedAt?: number;
}

export interface RawUserProfile {
  weight?: string | number;
  height?: string | number;
  ageBracket?: string | number;
  gender?: string;
  primaryGoal?: string;
  experienceLevel?: string;
}

export interface RawWorkoutItem {
  date?: string;
  timestamp?: number | string;
  baseSets?: number | string;
  sets?: number | string;
  baseReps?: number | string;
  reps?: number | string;
  weight?: number;
  load?: number;
  isCompleted?: boolean;
}

export interface DailyCalorieLedgerRecord {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  caloriesIn: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  proteinCalories: number;
  carbsCalories: number;
  fatsCalories: number;
  proteinRatioPercent: number;
  carbsRatioPercent: number;
  fatsRatioPercent: number;
  estimatedFiberGrams: number;
  thermicEffectOfFoodKcal: number; // TEF
  bmrKcal: number;                 // Basal Metabolic Rate
  workoutBurnKcal: number;         // Energy expended in training
  stepsBurnKcal: number;           // Energy expended in locomotion
  totalDailyEnergyExpenditureKcal: number; // TDEE = BMR + TEF + Active
  netEnergyBalanceKcal: number;    // In - TDEE (+ is surplus, - is deficit)
  predictedTissueFluxGrams: number;// Mass delta: balance / 7.7
  waterMl: number;
  mealCount: number;
  metabolicStatus: 'Severe Deficit' | 'Target Deficit' | 'Maintenance Equilibrium' | 'Lean Surplus' | 'High Hyper-Caloric';
}

export interface CalorieAuditSummary {
  lifetimeCaloriesTracked: number;
  activeLoggedDays: number;
  averageDailyIntakeKcal: number;
  averageDailyExpenditureKcal: number;
  averageDailyNetBalanceKcal: number;
  rolling7DayNetDeficitKcal: number;
  rolling30DayNetDeficitKcal: number;
  cumulativeNetAdiposeDeltaGrams: number;
  averageMacroSplit: {
    proteinPercent: number;
    carbsPercent: number;
    fatsPercent: number;
  };
  dailyLedger: DailyCalorieLedgerRecord[];
  lastCalculatedTimestamp: string;
}

/**
 * Calculates high-precision BMR via Mifflin-St Jeor
 */
function calculateBMR(profile?: RawUserProfile | null): number {
  let weightKg = 70;
  let heightCm = 175;
  let age = 25;
  let isFemale = false;

  if (profile) {
    if (profile.weight) {
      const parsedW = parseFloat(String(profile.weight));
      if (!isNaN(parsedW) && parsedW > 30) weightKg = parsedW;
    }
    if (profile.height) {
      const parsedH = parseFloat(String(profile.height));
      if (!isNaN(parsedH) && parsedH > 100) heightCm = parsedH;
    }
    if (profile.ageBracket) {
      const match = String(profile.ageBracket).match(/\d+/);
      if (match) age = parseInt(match[0], 10);
    }
    if (profile.gender && profile.gender.toLowerCase().includes('female')) {
      isFemale = true;
    }
  }

  // Mifflin-St Jeor equation:
  // Male: 10 * weight + 6.25 * height - 5 * age + 5
  // Female: 10 * weight + 6.25 * height - 5 * age - 161
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  bmr = isFemale ? (bmr - 161) : (bmr + 5);

  return Math.round(Math.max(1200, bmr));
}

export class SilentCalorieEngineWorker {
  public computeDailyCaloricAudit(
    rawDays: RawDayMealRecord[],
    rawWorkouts: RawWorkoutItem[],
    profile?: RawUserProfile | null,
    activeBurnMap?: Record<string, number>
  ): CalorieAuditSummary {
    const bmr = calculateBMR(profile);

    // Group workouts by date to calculate active workout burn per day
    const workoutBurnByDate: Record<string, number> = {};
    if (Array.isArray(rawWorkouts)) {
      rawWorkouts.forEach(w => {
        if (!w || !w.isCompleted) return;
        const dStr = typeof w.date === 'string' ? w.date.split('T')[0] : '';
        if (!dStr) return;

        const sets = Math.max(1, Number(w.baseSets || w.sets || 3));
        const reps = Math.max(1, Number(w.baseReps || w.reps || 10));
        const load = Math.max(0, Number(w.weight || w.load || 20));

        // Resistance training energy burn: ~6 kcal per working set including EPOC (excess post-exercise oxygen consumption)
        const setBurn = sets * 6.5 + (load * 0.015);
        workoutBurnByDate[dStr] = (workoutBurnByDate[dStr] || 0) + setBurn;
      });
    }

    // Process each logged day
    const ledgerMap = new Map<string, DailyCalorieLedgerRecord>();

    let lifetimeCalories = 0;
    let totalProteinGrams = 0;
    let totalCarbsGrams = 0;
    let totalFatsGrams = 0;

    const validDays = Array.isArray(rawDays) ? rawDays.filter(d => d && d.date) : [];

    validDays.forEach(day => {
      const dateStr = day.date.split('T')[0];
      const meals = Array.isArray(day.meals) ? day.meals : [];

      let dayCalories = 0;
      let dayProtein = 0;
      let dayCarbs = 0;
      let dayFats = 0;

      meals.forEach(m => {
        dayCalories += Number(m.calories || 0);
        dayProtein += Number(m.protein || 0);
        dayCarbs += Number(m.carbs || 0);
        dayFats += Number(m.fats || 0);
      });

      // Fallback to day record totals if meals array was compressed or empty
      if (dayCalories === 0 && day.totalCalories && day.totalCalories > 0) {
        dayCalories = day.totalCalories;
        dayProtein = day.totalProtein || 0;
        dayCarbs = day.totalCarbs || 0;
        dayFats = day.totalFats || 0;
      }

      // Energy breakdown
      const proteinKcal = dayProtein * 4;
      const carbsKcal = dayCarbs * 4;
      const fatsKcal = dayFats * 9;
      const calculatedSum = proteinKcal + carbsKcal + fatsKcal;
      const baseTotal = calculatedSum > 0 ? calculatedSum : (dayCalories > 0 ? dayCalories : 1);

      const proteinRatio = Math.round((proteinKcal / baseTotal) * 100);
      const carbsRatio = Math.round((carbsKcal / baseTotal) * 100);
      const fatsRatio = Math.round((fatsKcal / baseTotal) * 100);

      // Thermic Effect of Food (TEF): Protein ~25%, Carbs ~8%, Fats ~2%
      const tef = Math.round((proteinKcal * 0.25) + (carbsKcal * 0.08) + (fatsKcal * 0.02));

      // Active burn from workouts & steps
      const workoutBurn = Math.round(workoutBurnByDate[dateStr] || 0);
      const stepsBurn = Math.round(activeBurnMap?.[dateStr] || 0);

      // Total Daily Energy Expenditure (TDEE)
      // Non-Exercise Activity Thermogenesis (NEAT) baseline: ~250 kcal
      const neat = 250;
      const tdee = bmr + tef + workoutBurn + stepsBurn + neat;

      // Net energy balance (In - TDEE)
      const netBalance = dayCalories - tdee;

      // Predicted adipose/tissue flux (7700 kcal per 1kg adipose mass = 7.7 kcal per gram)
      const predictedTissueFlux = Math.round((netBalance / 7.7) * 10) / 10;

      // Status classification
      let status: DailyCalorieLedgerRecord['metabolicStatus'] = 'Maintenance Equilibrium';
      if (netBalance <= -600) {
        status = 'Severe Deficit';
      } else if (netBalance <= -150) {
        status = 'Target Deficit';
      } else if (netBalance >= 500) {
        status = 'High Hyper-Caloric';
      } else if (netBalance >= 150) {
        status = 'Lean Surplus';
      }

      let dayLabel = dateStr;
      try {
        const d = new Date(dateStr + 'T12:00:00Z');
        dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      } catch {}

      const record: DailyCalorieLedgerRecord = {
        date: dateStr,
        dayLabel,
        caloriesIn: Math.round(dayCalories),
        proteinGrams: Math.round(dayProtein * 10) / 10,
        carbsGrams: Math.round(dayCarbs * 10) / 10,
        fatsGrams: Math.round(dayFats * 10) / 10,
        proteinCalories: Math.round(proteinKcal),
        carbsCalories: Math.round(carbsKcal),
        fatsCalories: Math.round(fatsKcal),
        proteinRatioPercent: proteinRatio,
        carbsRatioPercent: carbsRatio,
        fatsRatioPercent: fatsRatio,
        estimatedFiberGrams: Math.round((dayCalories / 1000) * 14 * 10) / 10,
        thermicEffectOfFoodKcal: tef,
        bmrKcal: bmr,
        workoutBurnKcal: workoutBurn,
        stepsBurnKcal: stepsBurn,
        totalDailyEnergyExpenditureKcal: tdee,
        netEnergyBalanceKcal: netBalance,
        predictedTissueFluxGrams: predictedTissueFlux,
        waterMl: day.waterMl || 0,
        mealCount: meals.length,
        metabolicStatus: status
      };

      ledgerMap.set(dateStr, record);

      lifetimeCalories += dayCalories;
      totalProteinGrams += dayProtein;
      totalCarbsGrams += dayCarbs;
      totalFatsGrams += dayFats;
    });

    // Build sorted ledger (latest first)
    const sortedDates = Array.from(ledgerMap.keys()).sort().reverse();
    const dailyLedger = sortedDates.map(d => ledgerMap.get(d)!);

    const activeDays = dailyLedger.length;
    const avgIntake = activeDays > 0 ? Math.round(lifetimeCalories / activeDays) : 0;
    
    let totalExpenditure = 0;
    let totalNet = 0;
    dailyLedger.forEach(d => {
      totalExpenditure += d.totalDailyEnergyExpenditureKcal;
      totalNet += d.netEnergyBalanceKcal;
    });

    const avgExpenditure = activeDays > 0 ? Math.round(totalExpenditure / activeDays) : 0;
    const avgNet = activeDays > 0 ? Math.round(totalNet / activeDays) : 0;

    // Rolling 7-day and 30-day net deficit
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    let rolling7Net = 0;
    let rolling30Net = 0;

    dailyLedger.forEach(record => {
      const recTime = new Date(record.date + 'T12:00:00Z').getTime();
      if (recTime >= sevenDaysAgo && recTime <= now + 86400000) {
        rolling7Net += record.netEnergyBalanceKcal;
      }
      if (recTime >= thirtyDaysAgo && recTime <= now + 86400000) {
        rolling30Net += record.netEnergyBalanceKcal;
      }
    });

    const macroCaloriesTotal = (totalProteinGrams * 4) + (totalCarbsGrams * 4) + (totalFatsGrams * 9) || 1;

    return {
      lifetimeCaloriesTracked: Math.round(lifetimeCalories),
      activeLoggedDays: activeDays,
      averageDailyIntakeKcal: avgIntake,
      averageDailyExpenditureKcal: avgExpenditure,
      averageDailyNetBalanceKcal: avgNet,
      rolling7DayNetDeficitKcal: rolling7Net,
      rolling30DayNetDeficitKcal: rolling30Net,
      cumulativeNetAdiposeDeltaGrams: Math.round((totalNet / 7.7) * 10) / 10,
      averageMacroSplit: {
        proteinPercent: Math.round(((totalProteinGrams * 4) / macroCaloriesTotal) * 100),
        carbsPercent: Math.round(((totalCarbsGrams * 4) / macroCaloriesTotal) * 100),
        fatsPercent: Math.round(((totalFatsGrams * 9) / macroCaloriesTotal) * 100)
      },
      dailyLedger,
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

expose(new SilentCalorieEngineWorker());
