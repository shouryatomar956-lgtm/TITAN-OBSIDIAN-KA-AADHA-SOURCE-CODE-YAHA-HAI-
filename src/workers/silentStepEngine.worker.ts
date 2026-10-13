import { expose } from 'comlink';

export interface RawDayStepInput {
  date: string; // YYYY-MM-DD
  steps: number;
  caloriesBurned?: number;
  activeMinutes?: number;
}

export interface RawUserProfileStep {
  weight?: string | number;
  height?: string | number;
  gender?: string;
}

export interface DailyStepRecord {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  steps: number;
  distanceKm: number;
  distanceMiles: number;
  caloriesBurned: number;
  activeMinutes: number;
  strideLengthMeters: number;
  cadenceStepsPerMin: number;
  aerobicTier: 'Sedentary Baseline' | 'Light Locomotion' | 'Moderate Active' | 'High Cardiovascular Target' | 'Peak Endurance Locomotion';
}

export interface StepAuditSummary {
  lifetimeSteps: number;
  lifetimeDistanceKm: number;
  lifetimeDistanceMiles: number;
  lifetimeCaloriesBurned: number;
  activeWalkingDays: number;
  averageDailySteps: number;
  averageDailyDistanceKm: number;
  peakStepDay: { date: string; steps: number; distanceKm: number } | null;
  rolling7DayAvgSteps: number;
  rolling30DayAvgSteps: number;
  stepGoalStreakDays: number;
  dailyLedger: DailyStepRecord[];
  lastCalculatedTimestamp: string;
}

/**
 * Calculates biomechanical stride length (meters) from anthropometric height
 */
function calculateStrideLength(heightCm: number, isFemale: boolean): number {
  if (heightCm > 120 && heightCm < 230) {
    const ratio = isFemale ? 0.413 : 0.415;
    return Math.round((heightCm * ratio) / 100 * 100) / 100;
  }
  return 0.74; // Universal human locomotion baseline (meters)
}

export class SilentStepEngineWorker {
  public computeDailyStepAudit(
    rawDayRecords: RawDayStepInput[],
    profile?: RawUserProfileStep | null,
    odometerTotal?: number
  ): StepAuditSummary {
    let weightKg = 72;
    let heightCm = 175;
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
      if (profile.gender && profile.gender.toLowerCase().includes('female')) {
        isFemale = true;
      }
    }

    const strideLength = calculateStrideLength(heightCm, isFemale);
    const kcalPerStep = 0.0006 * weightKg;

    // Deduplicate and group by date
    const dayMap = new Map<string, RawDayStepInput>();
    rawDayRecords.forEach(r => {
      if (r && r.date) {
        const existing = dayMap.get(r.date);
        if (!existing || (r.steps > existing.steps)) {
          dayMap.set(r.date, r);
        }
      }
    });

    const sortedDates = Array.from(dayMap.keys()).sort();
    const dailyLedger: DailyStepRecord[] = [];

    let lifetimeSteps = 0;
    let lifetimeDistanceMeters = 0;
    let lifetimeKcal = 0;
    let peakDay: { date: string; steps: number; distanceKm: number } | null = null;

    sortedDates.forEach(dateStr => {
      const rec = dayMap.get(dateStr)!;
      const steps = Math.max(0, rec.steps || 0);

      const distanceMeters = steps * strideLength;
      const distanceKm = Math.round((distanceMeters / 1000) * 100) / 100;
      const distanceMiles = Math.round((distanceKm * 0.621371) * 100) / 100;

      const caloriesBurned = rec.caloriesBurned && rec.caloriesBurned > 0
        ? Math.round(rec.caloriesBurned * 10) / 10
        : Math.round((steps * kcalPerStep) * 10) / 10;

      // Estimate active locomotive minutes at average brisk cadence 105 steps/min
      const activeMinutes = rec.activeMinutes && rec.activeMinutes > 0
        ? rec.activeMinutes
        : Math.round(steps / 105);

      let aerobicTier: DailyStepRecord['aerobicTier'] = 'Sedentary Baseline';
      if (steps >= 15000) {
        aerobicTier = 'Peak Endurance Locomotion';
      } else if (steps >= 10000) {
        aerobicTier = 'High Cardiovascular Target';
      } else if (steps >= 7000) {
        aerobicTier = 'Moderate Active';
      } else if (steps >= 3000) {
        aerobicTier = 'Light Locomotion';
      }

      let dayLabel = dateStr;
      try {
        const d = new Date(dateStr + 'T12:00:00Z');
        dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      } catch {}

      if (steps > 0) {
        lifetimeSteps += steps;
        lifetimeDistanceMeters += distanceMeters;
        lifetimeKcal += caloriesBurned;

        if (!peakDay || steps > peakDay.steps) {
          peakDay = {
            date: dateStr,
            steps,
            distanceKm
          };
        }
      }

      dailyLedger.push({
        date: dateStr,
        dayLabel,
        steps,
        distanceKm,
        distanceMiles,
        caloriesBurned,
        activeMinutes,
        strideLengthMeters: strideLength,
        cadenceStepsPerMin: steps > 0 && activeMinutes > 0 ? Math.round(steps / activeMinutes) : 105,
        aerobicTier
      });
    });

    // If odometerTotal has higher cumulative steps, incorporate baseline
    if (typeof odometerTotal === 'number' && odometerTotal > lifetimeSteps) {
      const delta = odometerTotal - lifetimeSteps;
      lifetimeSteps = odometerTotal;
      lifetimeDistanceMeters += (delta * strideLength);
      lifetimeKcal += (delta * kcalPerStep);
    }

    // Rolling 7 and 30 day windows
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
        rolling7Sum += record.steps;
        rolling7Count++;
      }
      if (recTime >= thirtyDaysAgo && recTime <= now + 86400000) {
        rolling30Sum += record.steps;
        rolling30Count++;
      }
    });

    // Consecutive streak hitting 8,000 steps
    let streak = 0;
    for (let i = dailyLedger.length - 1; i >= 0; i--) {
      if (dailyLedger[i].steps >= 8000) {
        streak++;
      } else {
        break;
      }
    }

    const activeDays = dailyLedger.filter(d => d.steps > 0).length;
    const finalDistanceKm = Math.round((lifetimeDistanceMeters / 1000) * 10) / 10;
    const finalDistanceMiles = Math.round((finalDistanceKm * 0.621371) * 10) / 10;

    return {
      lifetimeSteps,
      lifetimeDistanceKm: finalDistanceKm,
      lifetimeDistanceMiles: finalDistanceMiles,
      lifetimeCaloriesBurned: Math.round(lifetimeKcal),
      activeWalkingDays: activeDays,
      averageDailySteps: activeDays > 0 ? Math.round(lifetimeSteps / activeDays) : 0,
      averageDailyDistanceKm: activeDays > 0 ? Math.round((finalDistanceKm / activeDays) * 10) / 10 : 0,
      peakStepDay: peakDay,
      rolling7DayAvgSteps: rolling7Count > 0 ? Math.round(rolling7Sum / rolling7Count) : 0,
      rolling30DayAvgSteps: rolling30Count > 0 ? Math.round(rolling30Sum / rolling30Count) : 0,
      stepGoalStreakDays: streak,
      dailyLedger: dailyLedger.reverse(), // newest first
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

expose(new SilentStepEngineWorker());
