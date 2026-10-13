import { expose } from 'comlink';

export interface ExerciseLogItem {
  id?: string;
  name: string;
  date?: string;
  timestamp?: number | string;
  weight?: number;
  load?: number;
  baseSets?: number | string;
  sets?: number | string;
  baseReps?: number | string;
  reps?: number | string;
  isCompleted?: boolean;
  completed?: boolean;
}

export interface DailyExerciseDetail {
  name: string;
  sets: number;
  reps: number;
  weightKg: number;
  volumeKg: number;
  workJoules: number;
  primaryMuscle: string;
}

export interface DailyVolumeRecord {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  totalTonnageKg: number;
  totalReps: number;
  totalSets: number;
  totalMechanicalWorkKJ: number; // Mechanical work in Kilojoules: W = F * d
  averageIntensityKg: number;    // Tonnage / total reps
  volumeDensityKgPerSet: number; // Tonnage / total sets
  hypertrophicDensityRating: 'Rest / Deload' | 'Maintenance Stimulus' | 'Hypertrophic Hyper-Drive' | 'Maximum Adaptive Volume' | 'Peak Overreaching';
  muscleVolumeBreakdown: Record<string, number>;
  exercises: DailyExerciseDetail[];
}

export interface VolumeAuditSummary {
  lifetimeTonnageKg: number;
  lifetimeMechanicalWorkKJ: number;
  lifetimeTotalReps: number;
  lifetimeTotalSets: number;
  activeTrainingDays: number;
  averageDailyTonnageKg: number;
  acuteToChronicWorkloadRatio: number; // ACWR: 7-day rolling / (28-day rolling / 4)
  peakVolumeDay: { date: string; tonnageKg: number; exercisesCount: number } | null;
  rolling7DayTonnageKg: number;
  rolling30DayTonnageKg: number;
  dailyLedger: DailyVolumeRecord[];
  topMusclesByVolume: Array<{ muscle: string; volumeKg: number; percent: number }>;
  lastCalculatedTimestamp: string;
}

/**
 * Standard displacement estimates per exercise category (meters)
 * Based on biomechanical average barbell and limb travel
 */
function estimateDisplacementMeters(name: string): number {
  const n = name.toLowerCase();
  if (n.includes('deadlift') || n.includes('rdl') || n.includes('sumo') || n.includes('rack pull')) return 0.55;
  if (n.includes('squat') || n.includes('leg press') || n.includes('hack')) return 0.68;
  if (n.includes('bench') || n.includes('press') && !n.includes('overhead') || n.includes('pushup') || n.includes('dip')) return 0.42;
  if (n.includes('overhead') || n.includes('military') || n.includes('shoulder press')) return 0.60;
  if (n.includes('pull') || n.includes('chin') || n.includes('lat') || n.includes('row')) return 0.52;
  if (n.includes('curl') || n.includes('extension') || n.includes('skull')) return 0.36;
  if (n.includes('calf') || n.includes('shrug')) return 0.18;
  return 0.48; // Universal biomechanical displacement baseline
}

/**
 * Synergistic muscle distribution model for compound and isolation movements
 */
interface MuscleLoadSplit {
  primary: string;
  splits: Array<{ muscle: string; ratio: number }>;
}

function getBiomechanicalMuscleSplits(name: string): MuscleLoadSplit {
  const n = name.toLowerCase();
  
  // Chest Compound
  if (n.includes('bench') || (n.includes('press') && n.includes('chest')) || n.includes('pushup') || n.includes('dip')) {
    return {
      primary: 'Chest',
      splits: [
        { muscle: 'Chest', ratio: 0.70 },
        { muscle: 'Triceps', ratio: 0.20 },
        { muscle: 'Shoulders', ratio: 0.10 }
      ]
    };
  }

  // Squats & Quad Compounds
  if (n.includes('squat') || n.includes('leg press') || n.includes('hack squat') || n.includes('lunge')) {
    return {
      primary: 'Quadriceps',
      splits: [
        { muscle: 'Quadriceps', ratio: 0.65 },
        { muscle: 'Hamstrings & Glutes', ratio: 0.25 },
        { muscle: 'Core & Abs', ratio: 0.10 }
      ]
    };
  }

  // Posterior Chain & Deadlifts
  if (n.includes('deadlift') || n.includes('rdl') || n.includes('good morning') || n.includes('hip thrust')) {
    return {
      primary: 'Hamstrings & Glutes',
      splits: [
        { muscle: 'Hamstrings & Glutes', ratio: 0.60 },
        { muscle: 'Back & Lats', ratio: 0.25 },
        { muscle: 'Core & Abs', ratio: 0.15 }
      ]
    };
  }

  // Back & Pull Compounds
  if (n.includes('row') || n.includes('pull') || n.includes('chin') || n.includes('lat') || n.includes('pulldown')) {
    return {
      primary: 'Back & Lats',
      splits: [
        { muscle: 'Back & Lats', ratio: 0.70 },
        { muscle: 'Biceps', ratio: 0.20 },
        { muscle: 'Shoulders', ratio: 0.10 }
      ]
    };
  }

  // Shoulder Compounds
  if (n.includes('shoulder') || n.includes('overhead') || n.includes('military') || n.includes('arnold')) {
    return {
      primary: 'Shoulders',
      splits: [
        { muscle: 'Shoulders', ratio: 0.70 },
        { muscle: 'Triceps', ratio: 0.20 },
        { muscle: 'Chest', ratio: 0.10 }
      ]
    };
  }

  // Arm Isolations
  if (n.includes('bicep') || (n.includes('curl') && !n.includes('leg'))) {
    return { primary: 'Biceps', splits: [{ muscle: 'Biceps', ratio: 1.0 }] };
  }
  if (n.includes('tricep') || n.includes('pushdown') || n.includes('skull crusher') || n.includes('kickback')) {
    return { primary: 'Triceps', splits: [{ muscle: 'Triceps', ratio: 1.0 }] };
  }

  // Leg Isolations
  if (n.includes('leg extension')) {
    return { primary: 'Quadriceps', splits: [{ muscle: 'Quadriceps', ratio: 1.0 }] };
  }
  if (n.includes('leg curl') || n.includes('hamstring curl')) {
    return { primary: 'Hamstrings & Glutes', splits: [{ muscle: 'Hamstrings & Glutes', ratio: 1.0 }] };
  }
  if (n.includes('calf') || n.includes('calves')) {
    return { primary: 'Calves', splits: [{ muscle: 'Calves', ratio: 1.0 }] };
  }

  // Core & Abs
  if (n.includes('core') || n.includes('ab') || n.includes('plank') || n.includes('crunch') || n.includes('leg raise')) {
    return { primary: 'Core & Abs', splits: [{ muscle: 'Core & Abs', ratio: 1.0 }] };
  }

  // Neck
  if (n.includes('neck') || n.includes('shrug')) {
    return { primary: 'Neck & Traps', splits: [{ muscle: 'Neck & Traps', ratio: 1.0 }] };
  }

  // Fallback
  return {
    primary: 'Full Body & Core',
    splits: [{ muscle: 'Full Body & Core', ratio: 1.0 }]
  };
}

/**
 * Calculates effective biomechanical weight factoring in bodyweight for calisthenics
 */
function resolveBiomechanicalWeight(item: ExerciseLogItem, bodyweightKg: number = 72): number {
  const explicitWeight = Number(item.weight || item.load);
  if (explicitWeight > 0) return explicitWeight;

  const n = (item.name || '').toLowerCase();
  if (n.includes('pushup')) return Math.round(bodyweightKg * 0.64);
  if (n.includes('pullup') || n.includes('chinup')) return Math.round(bodyweightKg * 0.95);
  if (n.includes('dip')) return Math.round(bodyweightKg * 0.88);
  if (n.includes('inverted row')) return Math.round(bodyweightKg * 0.60);
  if (n.includes('bodyweight squat') || (n.includes('squat') && !explicitWeight)) return Math.round(bodyweightKg * 0.70);

  return 25; // Universal default working load (kg)
}

/**
 * Parses reps from strings like "8-12", "10", "12 reps", "8-10 reps"
 */
function parseReps(val: any): number {
  if (typeof val === 'number') return val > 0 ? val : 10;
  if (typeof val === 'string') {
    // If range like "8-12", average it: (8 + 12) / 2 = 10
    const rangeMatch = val.match(/(\d+)\s*[-–]\s*(\d+)/);
    if (rangeMatch) {
      const low = parseInt(rangeMatch[1], 10);
      const high = parseInt(rangeMatch[2], 10);
      if (!isNaN(low) && !isNaN(high) && high >= low) {
        return Math.round((low + high) / 2);
      }
    }
    const match = val.match(/\d+/);
    if (match) return parseInt(match[0], 10);
  }
  return 10;
}

export class SilentVolumeEngineWorker {
  /**
   * Evaluates all completed historical sessions and calculates day-by-day tonnage,
   * mechanical work, and kinetic distribution in high precision.
   */
  public computeDailyVolumetricAudit(
    rawWorkouts: ExerciseLogItem[],
    historyLogs: ExerciseLogItem[],
    repSessions: ExerciseLogItem[],
    userWeightKg: number = 72
  ): VolumeAuditSummary {
    const allCompleted: ExerciseLogItem[] = [];
    const seenIds = new Set<string>();

    const appendValid = (item: ExerciseLogItem, prefix: string) => {
      if (!item) return;
      const isComp = item.isCompleted === true || item.completed === true;
      if (!isComp) return;

      const id = item.id || `${prefix}_${item.date || item.timestamp || (seenIds.size + 1)}`;
      if (!seenIds.has(id)) {
        seenIds.add(id);
        allCompleted.push(item);
      }
    };

    if (Array.isArray(rawWorkouts)) rawWorkouts.forEach(w => appendValid(w, 'app'));
    if (Array.isArray(historyLogs)) historyLogs.forEach(h => appendValid(h, 'hist'));
    if (Array.isArray(repSessions)) repSessions.forEach(r => appendValid(r, 'rep'));

    // Group logs by YYYY-MM-DD
    const dayMap = new Map<string, DailyExerciseDetail[]>();

    allCompleted.forEach(entry => {
      const rawDate = entry.date || entry.timestamp;
      let dateKey = '';
      try {
        if (typeof rawDate === 'number') {
          dateKey = new Date(rawDate).toISOString().split('T')[0];
        } else if (typeof rawDate === 'string') {
          dateKey = new Date(rawDate).toISOString().split('T')[0];
        } else {
          dateKey = new Date().toISOString().split('T')[0];
        }
      } catch {
        dateKey = new Date().toISOString().split('T')[0];
      }

      const sets = Math.max(1, Number(entry.baseSets || entry.sets || 1));
      const reps = parseReps(entry.baseReps || entry.reps);
      const weight = resolveBiomechanicalWeight(entry, userWeightKg);
      const volumeKg = sets * reps * weight;

      // Mechanical Work in Joules: W = F * d = (mass * 9.80665) * (sets * reps * displacement)
      const displacement = estimateDisplacementMeters(entry.name || '');
      const totalDisplacement = sets * reps * displacement;
      const forceNewtons = weight * 9.80665;
      const workJoules = forceNewtons * totalDisplacement;

      const muscleInfo = getBiomechanicalMuscleSplits(entry.name || '');

      const detail: DailyExerciseDetail = {
        name: entry.name || 'Universal Rep Session',
        sets,
        reps,
        weightKg: weight,
        volumeKg: Math.round(volumeKg * 10) / 10,
        workJoules: Math.round(workJoules),
        primaryMuscle: muscleInfo.primary
      };

      if (!dayMap.has(dateKey)) {
        dayMap.set(dateKey, []);
      }
      dayMap.get(dateKey)!.push(detail);
    });

    // Build Chronological Ledger
    const sortedDates = Array.from(dayMap.keys()).sort();
    const dailyLedger: DailyVolumeRecord[] = [];

    let lifetimeTonnage = 0;
    let lifetimeWorkJoules = 0;
    let lifetimeReps = 0;
    let lifetimeSets = 0;
    let peakDay: { date: string; tonnageKg: number; exercisesCount: number } | null = null;
    const globalMuscleTonnage: Record<string, number> = {};

    sortedDates.forEach(dateStr => {
      const exercises = dayMap.get(dateStr)!;
      let dayTonnage = 0;
      let dayWorkJoules = 0;
      let dayReps = 0;
      let daySets = 0;
      const muscleBreakdown: Record<string, number> = {};

      exercises.forEach(ex => {
        dayTonnage += ex.volumeKg;
        dayWorkJoules += ex.workJoules;
        dayReps += (ex.sets * ex.reps);
        daySets += ex.sets;

        // Apply synergistic biomechanical muscle distribution
        const splits = getBiomechanicalMuscleSplits(ex.name);
        splits.splits.forEach(split => {
          const splitVol = ex.volumeKg * split.ratio;
          muscleBreakdown[split.muscle] = (muscleBreakdown[split.muscle] || 0) + splitVol;
          globalMuscleTonnage[split.muscle] = (globalMuscleTonnage[split.muscle] || 0) + splitVol;
        });
      });

      lifetimeTonnage += dayTonnage;
      lifetimeWorkJoules += dayWorkJoules;
      lifetimeReps += dayReps;
      lifetimeSets += daySets;

      if (!peakDay || dayTonnage > peakDay.tonnageKg) {
        peakDay = {
          date: dateStr,
          tonnageKg: Math.round(dayTonnage * 10) / 10,
          exercisesCount: exercises.length
        };
      }

      // Round muscle breakdowns
      Object.keys(muscleBreakdown).forEach(m => {
        muscleBreakdown[m] = Math.round(muscleBreakdown[m] * 10) / 10;
      });

      // Scientific Hypertrophic classification
      let rating: DailyVolumeRecord['hypertrophicDensityRating'] = 'Maintenance Stimulus';
      if (dayTonnage >= 10000) {
        rating = 'Peak Overreaching';
      } else if (dayTonnage >= 6500) {
        rating = 'Maximum Adaptive Volume';
      } else if (dayTonnage >= 3500) {
        rating = 'Hypertrophic Hyper-Drive';
      } else if (dayTonnage < 1200) {
        rating = 'Rest / Deload';
      }

      let dayLabel = dateStr;
      try {
        const d = new Date(dateStr + 'T12:00:00Z');
        dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      } catch {}

      dailyLedger.push({
        date: dateStr,
        dayLabel,
        totalTonnageKg: Math.round(dayTonnage * 10) / 10,
        totalReps: dayReps,
        totalSets: daySets,
        totalMechanicalWorkKJ: Math.round((dayWorkJoules / 1000) * 10) / 10,
        averageIntensityKg: dayReps > 0 ? Math.round((dayTonnage / dayReps) * 10) / 10 : 0,
        volumeDensityKgPerSet: daySets > 0 ? Math.round((dayTonnage / daySets) * 10) / 10 : 0,
        hypertrophicDensityRating: rating,
        muscleVolumeBreakdown: muscleBreakdown,
        exercises
      });
    });

    // Compute rolling 7-day and 28/30-day windows
    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    const twentyEightDaysAgo = now - (28 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    let rolling7DayTonnage = 0;
    let rolling28DayTonnage = 0;
    let rolling30DayTonnage = 0;

    dailyLedger.forEach(record => {
      const recTime = new Date(record.date + 'T12:00:00Z').getTime();
      if (recTime >= sevenDaysAgo && recTime <= now + 86400000) {
        rolling7DayTonnage += record.totalTonnageKg;
      }
      if (recTime >= twentyEightDaysAgo && recTime <= now + 86400000) {
        rolling28DayTonnage += record.totalTonnageKg;
      }
      if (recTime >= thirtyDaysAgo && recTime <= now + 86400000) {
        rolling30DayTonnage += record.totalTonnageKg;
      }
    });

    // Acute:Chronic Workload Ratio (ACWR) = Acute (7d) / (Chronic (28d) / 4)
    const chronicAvgWeekly = rolling28DayTonnage > 0 ? (rolling28DayTonnage / 4) : 0;
    const acwr = chronicAvgWeekly > 0 ? Math.round((rolling7DayTonnage / chronicAvgWeekly) * 100) / 100 : 1.0;

    // Top muscles by volume
    const topMusclesByVolume = Object.entries(globalMuscleTonnage)
      .map(([muscle, vol]) => ({
        muscle,
        volumeKg: Math.round(vol * 10) / 10,
        percent: lifetimeTonnage > 0 ? Math.round((vol / lifetimeTonnage) * 1000) / 10 : 0
      }))
      .sort((a, b) => b.volumeKg - a.volumeKg);

    return {
      lifetimeTonnageKg: Math.round(lifetimeTonnage * 10) / 10,
      lifetimeMechanicalWorkKJ: Math.round((lifetimeWorkJoules / 1000) * 10) / 10,
      lifetimeTotalReps: lifetimeReps,
      lifetimeTotalSets: lifetimeSets,
      activeTrainingDays: dailyLedger.length,
      averageDailyTonnageKg: dailyLedger.length > 0 ? Math.round((lifetimeTonnage / dailyLedger.length) * 10) / 10 : 0,
      acuteToChronicWorkloadRatio: acwr,
      peakVolumeDay: peakDay,
      rolling7DayTonnageKg: Math.round(rolling7DayTonnage * 10) / 10,
      rolling30DayTonnageKg: Math.round(rolling30DayTonnage * 10) / 10,
      dailyLedger: dailyLedger.reverse(), // newest first
      topMusclesByVolume,
      lastCalculatedTimestamp: new Date().toISOString()
    };
  }
}

expose(new SilentVolumeEngineWorker());
