import { expose } from 'comlink';

export interface RawDayWaterInput {
  date: string; // YYYY-MM-DD
  waterMl?: number;
  totalCalories?: number;
}

export interface RawWorkoutHydrationInput {
  date?: string;
  baseSets?: number | string;
  sets?: number | string;
  isCompleted?: boolean;
}

export interface RawUserProfileHydration {
  weight?: string | number;
  gender?: string;
  height?: string | number;
}

export interface DailyHydrationRecord {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  waterIntakeMl: number;
  dietaryMoistureMl: number;
  totalFluidInMl: number;
  sweatLossMl: number;
  insensibleLossMl: number;
  basalRenalOutputMl: number;
  totalFluidOutMl: number;
  targetNeedMl: number;
  netFluidBalanceMl: number;
  hydrationRatioPercent: number;
  hydrationStatus: 'Optimal Hyper-Hydrated' | 'Euhydrated (Target Balanced)' | 'Mild Hypohydration' | 'Significant Dehydration Risk';
}

export interface HydrationAuditSummary {
  lifetimeWaterLiters: number;
  activeHydrationDays: number;
  averageDailyIntakeMl: number;
  averageNetBalanceMl: number;
  peakHydrationDay: { date: string; waterMl: number } | null;
  rolling7DayAvgMl: number;
  rolling30DayAvgMl: number;
  hydrationStreakDays: number;
  dailyLedger: DailyHydrationRecord[];
  lastCalculatedTimestamp: string;
}

/**
 * Calculates baseline physiological water requirement based on weight & gender
 * Standard ACSM & EFSA guidelines: ~35 mL per kg for males, ~31 mL per kg for females
 */
function calculateBaselineWaterNeed(weightKg: number, isFemale: boolean): number {
  const multiplier = isFemale ? 31 : 35;
  return Math.round(weightKg * multiplier);
}

export class SilentHydrationEngineWorker {
  public computeDailyHydrationAudit(
    rawDays: RawDayWaterInput[],
    rawWorkouts: RawWorkoutHydrationInput[],
    profile?: RawUserProfileHydration | null,
    directWaterMap?: Record<string, number>,
    stepMap?: Record<string, number>
  ): HydrationAuditSummary {
    let weightKg = 72;
    let isFemale = false;

    if (profile) {
      if (profile.weight) {
        const parsed = parseFloat(String(profile.weight));
        if (!isNaN(parsed) && parsed > 30) weightKg = parsed;
      }
      if (profile.gender && profile.gender.toLowerCase().includes('female')) {
        isFemale = true;
      }
    }

    const baselineNeed = calculateBaselineWaterNeed(weightKg, isFemale);

    // Compute workout sweat loss per date
    const workoutSweatLossMap: Record<string, number> = {};
    if (Array.isArray(rawWorkouts)) {
      rawWorkouts.forEach(w => {
        if (!w || !w.isCompleted) return;
        const dStr = typeof w.date === 'string' ? w.date.split('T')[0] : '';
        if (!dStr) return;

        const sets = Math.max(1, Number(w.baseSets || w.sets || 3));
        // Estimated fluid loss: ~20 mL sweat/water loss per strenuous working set
        const fluidLoss = sets * 22;
        workoutSweatLossMap[dStr] = (workoutSweatLossMap[dStr] || 0) + fluidLoss;
      });
    }

    // Merge all unique dates
    const dateSet = new Set<string>();
    rawDays.forEach(d => { if (d.date) dateSet.add(d.date); });
    if (directWaterMap) {
      Object.keys(directWaterMap).forEach(k => { if (/^\d{4}-\d{2}-\d{2}$/.test(k)) dateSet.add(k); });
    }
    if (stepMap) {
      Object.keys(stepMap).forEach(k => { if (/^\d{4}-\d{2}-\d{2}$/.test(k)) dateSet.add(k); });
    }

    const dayRecordMap = new Map<string, RawDayWaterInput>();
    rawDays.forEach(d => { if (d.date) dayRecordMap.set(d.date, d); });

    const sortedDates = Array.from(dateSet).sort();
    const dailyLedger: DailyHydrationRecord[] = [];

    let lifetimeWaterMl = 0;
    let totalNetBalanceMl = 0;
    let peakDay: { date: string; waterMl: number } | null = null;

    sortedDates.forEach(dateStr => {
      const dayRec = dayRecordMap.get(dateStr);
      let directWater = 0;

      if (dayRec && typeof dayRec.waterMl === 'number') {
        directWater = dayRec.waterMl;
      } else if (directWaterMap && typeof directWaterMap[dateStr] === 'number') {
        directWater = directWaterMap[dateStr];
      }

      // Dietary moisture estimation (~20% of food volume / 100 mL per 500 kcal)
      const calories = dayRec?.totalCalories || 0;
      const dietaryMoisture = Math.round((calories / 500) * 85);
      const totalFluidIn = directWater + dietaryMoisture;

      // Locomotion sweat loss (~0.035 mL per step)
      const steps = (stepMap && stepMap[dateStr]) ? stepMap[dateStr] : 0;
      const stepSweatLoss = Math.round(steps * 0.035);

      const workoutSweat = workoutSweatLossMap[dateStr] || 0;
      const totalSweatLoss = workoutSweat + stepSweatLoss;

      // Basal fluid outputs
      const basalRenal = 1200; // mL average urine volume
      const insensible = 750;  // mL respiration and dermal perspiration
      const totalFluidOut = basalRenal + insensible + totalSweatLoss;

      const netBalance = totalFluidIn - totalFluidOut;
      const hydrationPercent = Math.round((directWater / Math.max(1, baselineNeed)) * 100);

      let status: DailyHydrationRecord['hydrationStatus'] = 'Euhydrated (Target Balanced)';
      if (hydrationPercent >= 120) {
        status = 'Optimal Hyper-Hydrated';
      } else if (hydrationPercent >= 85) {
        status = 'Euhydrated (Target Balanced)';
      } else if (hydrationPercent >= 60) {
        status = 'Mild Hypohydration';
      } else {
        status = 'Significant Dehydration Risk';
      }

      let dayLabel = dateStr;
      try {
        const d = new Date(dateStr + 'T12:00:00Z');
        dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      } catch {}

      if (directWater > 0 || totalFluidIn > 0) {
        lifetimeWaterMl += directWater;
        totalNetBalanceMl += netBalance;

        if (!peakDay || directWater > peakDay.waterMl) {
          peakDay = { date: dateStr, waterMl: directWater };
        }
      }

      dailyLedger.push({
        date: dateStr,
        dayLabel,
        waterIntakeMl: directWater,
        dietaryMoistureMl: dietaryMoisture,
        totalFluidInMl: totalFluidIn,
        sweatLossMl: totalSweatLoss,
        insensibleLossMl: insensible,
        basalRenalOutputMl: basalRenal,
        totalFluidOutMl: totalFluidOut,
        targetNeedMl: baselineNeed,
        netFluidBalanceMl: netBalance,
        hydrationRatioPercent: hydrationPercent,
        hydrationStatus: status
      });
    });

    // Compute rolling 7-day and 30-day averages
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    let rolling7Sum = 0;
    let rolling7Count = 0;
    let rolling30Sum = 0;
    let rolling30Count = 0;

    dailyLedger.forEach(record => {
      const recTime = new Date(record.date + 'T12:00:00Z').getTime();
      if (recTime >= sevenDaysAgo && recTime <= now + 86400000) {
        rolling7Sum += record.waterIntakeMl;
        rolling7Count++;
      }
      if (recTime >= thirtyDaysAgo && recTime <= now + 86400000) {
        rolling30Sum += record.waterIntakeMl;
        rolling30Count++;
      }
    });

    // Compute consecutive hydration streak
    let streak = 0;
    for (let i = dailyLedger.length - 1; i >= 0; i--) {
      if (dailyLedger[i].waterIntakeMl >= baselineNeed * 0.85) {
        streak++;
      } else {
        break;
      }
    }

    const activeDays = dailyLedger.filter(d => d.waterIntakeMl > 0).length;

    return {
      lifetimeWaterLiters: Math.round((lifetimeWaterMl / 1000) * 10) / 10,
      activeHydrationDays: activeDays,
      averageDailyIntakeMl: activeDays > 0 ? Math.round(lifetimeWaterMl / activeDays) : 0,
      averageNetBalanceMl: activeDays > 0 ? Math.round(totalNetBalanceMl / activeDays) : 0,
      peakHydrationDay: peakDay,
      rolling7DayAvgMl: rolling7Count > 0 ? Math.round(rolling7Sum / rolling7Count) : 0,
      rolling30DayAvgMl: rolling30Count > 0 ? Math.round(rolling30Sum / rolling30Count) : 0,
      hydrationStreakDays: streak,
      dailyLedger: dailyLedger.reverse(), // newest first
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

expose(new SilentHydrationEngineWorker());
