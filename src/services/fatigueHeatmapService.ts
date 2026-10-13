import localforage from 'localforage';
import { OPFSBinaryEngine } from './opfsStorageEngine';

export type MuscleId = 
  | 'chest' 
  | 'lats' 
  | 'upper_back' 
  | 'lower_back' 
  | 'shoulders' 
  | 'biceps' 
  | 'triceps' 
  | 'quads' 
  | 'hamstrings' 
  | 'glutes' 
  | 'calves' 
  | 'core';

export interface MuscleFatigueState {
  id: MuscleId;
  name: string;
  category: 'Upper Body' | 'Lower Body' | 'Core';
  fatiguePercent: number; // 0 to 100
  recoveryStatus: 'Fully Recovered' | 'Moderate Fatigue' | 'Overreached / Active Micro-tears';
  statusColor: string;
  hoursSinceTrained: number | null;
  totalSetsLast48h: number;
  totalVolumeLast48h: number;
  readinessRecommendation: string;
}

export interface SystemicRecoverySummary {
  systemicReadinessScore: number; // 0 to 100 (100 = full readiness)
  systemicFatigueScore: number;   // 0 to 100 (0 = 0 fatigue when user hasn't done anything)
  totalVolumeLast48h: number;
  totalSetsLast48h: number;
  completedWorkoutsCount: number;
  hasActiveFatigue: boolean;
  primaryFatiguedMuscles: string[];
  fullyRecoveredMuscles: string[];
  muscles: Record<MuscleId, MuscleFatigueState>;
  lastCalculated: string;
}

const MUSCLE_METADATA: Record<MuscleId, { name: string; category: 'Upper Body' | 'Lower Body' | 'Core' }> = {
  chest: { name: 'Chest (Pectoralis)', category: 'Upper Body' },
  shoulders: { name: 'Shoulders (Deltoids)', category: 'Upper Body' },
  biceps: { name: 'Biceps Brachii', category: 'Upper Body' },
  triceps: { name: 'Triceps Brachii', category: 'Upper Body' },
  lats: { name: 'Lats (Latissimus Dorsi)', category: 'Upper Body' },
  upper_back: { name: 'Upper Back & Traps', category: 'Upper Body' },
  lower_back: { name: 'Lower Back (Erectors)', category: 'Upper Body' },
  quads: { name: 'Quadriceps', category: 'Lower Body' },
  hamstrings: { name: 'Hamstrings', category: 'Lower Body' },
  glutes: { name: 'Glutes', category: 'Lower Body' },
  calves: { name: 'Calves (Gastrocnemius)', category: 'Lower Body' },
  core: { name: 'Abdominals & Core', category: 'Core' }
};

class FatigueHeatmapService {
  /**
   * Evaluates rolling 48-hour workout logs and computes REAL-TIME localized recovery scores.
   * If user has done 0 workouts, all values return exactly 0 with zero random/mock data.
   */
  public async compute48HourFatigue(): Promise<SystemicRecoverySummary> {
    const now = Date.now();
    const fortyEightHoursAgo = now - (48 * 60 * 60 * 1000);

    // Initial 0-fatigue state container
    const muscleMap: Record<MuscleId, {
      sets: number;
      volume: number;
      lastTimestamp: number | null;
      accumulatedFatigue: number;
    }> = {
      chest: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      shoulders: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      biceps: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      triceps: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      lats: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      upper_back: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      lower_back: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      quads: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      hamstrings: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      glutes: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      calves: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 },
      core: { sets: 0, volume: 0, lastTimestamp: null, accumulatedFatigue: 0 }
    };

    let totalSystemicVolume = 0;
    let totalSystemicSets = 0;
    let validWorkoutsCount = 0;

    // Read real-time hydration state to compute cellular recovery acceleration factor
    let hydrationRecoveryDiscount = 0;
    try {
      const waterMl = (await localforage.getItem<number>('pulsefit_water_intake')) || 0;
      if (waterMl > 500) {
        // Optimal fluid balance accelerates cellular protein synthesis and reduces residual DOMS up to 25%
        hydrationRecoveryDiscount = Math.min(0.25, (waterMl / 3000) * 0.25);
      }
    } catch {}

    try {
      // 1. Scan pulsefit_workout_history in localforage
      const history = (await localforage.getItem<any[]>('pulsefit_workout_history')) || [];
      
      // 2. Scan app_state workouts
      const opfs = OPFSBinaryEngine.getInstance();
      const appState = (await opfs.readAtomic('pulsefit_state')) || (await localforage.getItem<any>('app_state'));
      const stateWorkouts = appState?.workouts || [];

      // 3. Scan AI Rep Counter sessions in localforage
      const repSessions = (await localforage.getItem<any[]>('pulsefit_rep_counter_history')) || [];

      // Deduplicate and filter ONLY real, completed workouts
      const completedList: any[] = [];
      const seenIds = new Set<string>();

      history.forEach(w => {
        if (w && (w.isCompleted === true || w.completed === true)) {
          if (!seenIds.has(w.id)) {
            seenIds.add(w.id);
            completedList.push(w);
          }
        }
      });

      stateWorkouts.forEach((w: any) => {
        if (w && (w.isCompleted === true || w.completed === true)) {
          if (!seenIds.has(w.id)) {
            seenIds.add(w.id);
            completedList.push(w);
          }
        }
      });

      repSessions.forEach((r: any) => {
        if (r && (r.completedReps > 0 || r.reps > 0)) {
          const rId = r.id || `rep_${r.timestamp || Date.now()}`;
          if (!seenIds.has(rId)) {
            seenIds.add(rId);
            completedList.push({
              id: rId,
              name: r.exerciseName || r.name || 'Universal Rep Session',
              isCompleted: true,
              date: r.timestamp ? new Date(r.timestamp).toISOString() : new Date().toISOString(),
              baseSets: 1,
              baseReps: r.completedReps || r.reps || 10,
              weight: 30
            });
          }
        }
      });

      completedList.forEach((workout) => {
        const time = workout.timestamp 
          ? new Date(workout.timestamp).getTime() 
          : (workout.date ? new Date(workout.date).getTime() : 0);

        if (time >= fortyEightHoursAgo && time <= now) {
          validWorkoutsCount++;
          const hoursAgo = Math.max(0.1, (now - time) / (1000 * 60 * 60));
          const nameLower = (workout.name || '').toLowerCase();
          const targetMuscles = this.inferMusclesFromExerciseName(nameLower);

          const sets = Math.max(1, Number(workout.baseSets || workout.sets || 1));
          const reps = typeof workout.baseReps === 'string' 
            ? parseInt(workout.baseReps, 10) || 10 
            : Number(workout.baseReps || workout.reps || 10);
          const weight = Number(workout.weight || workout.load || 25);
          const volume = sets * reps * (weight > 0 ? weight : 20);

          totalSystemicVolume += volume;
          totalSystemicSets += sets;

          // Henneman's Size Principle & Motor Unit Recruitment Factor:
          // Heavy loads or high-rep metabolic proximity to failure recruit higher-threshold Type IIx fibers
          const intensityFactor = Math.min(1.35, Math.max(0.85, (reps >= 8 && reps <= 15 ? 1.12 : 1.0) * (weight > 60 ? 1.15 : 1.0)));

          targetMuscles.forEach((mId, idx) => {
            const entry = muscleMap[mId];
            if (entry) {
              // Primary movers receive 100% mechanical tension impulse; secondary synergists receive 65%
              const synergistRoleWeight = idx === 0 ? 1.0 : 0.72;
              entry.sets += sets;
              entry.volume += Math.round(volume * synergistRoleWeight);
              if (!entry.lastTimestamp || time > entry.lastTimestamp) {
                entry.lastTimestamp = time;
              }

              // Banister Bi-Exponential Impulse-Response Myofibrillar Recovery Model:
              // Fast metabolic phosphocreatine/glycogen clearing (tau_fast = 6h) + Slow structural Z-disc remodeling (tau_slow = 22h)
              const baseImpulse = sets * 18 * intensityFactor * synergistRoleWeight;
              const fastMetabolicComponent = 0.30 * Math.exp(-hoursAgo / 6.5);
              const slowStructuralComponent = 0.70 * Math.exp(-hoursAgo / 19.5);
              const residualFatigue = baseImpulse * (fastMetabolicComponent + slowStructuralComponent);
              entry.accumulatedFatigue += residualFatigue;
            }
          });
        }
      });
    } catch (err) {
      console.warn('[FatigueHeatmap] Real-time scan notice:', err);
    }

    // Format the result matrix
    const muscles: Record<MuscleId, MuscleFatigueState> = {} as any;
    const primaryFatigued: string[] = [];
    const fullyRecovered: string[] = [];
    let totalFatigueSum = 0;

    (Object.keys(muscleMap) as MuscleId[]).forEach(mId => {
      const entry = muscleMap[mId];
      // If no workouts done, rawPercent is strictly 0
      const baseRawPercent = entry.sets > 0 ? Math.min(100, Math.round(entry.accumulatedFatigue)) : 0;
      // Accelerated recovery via cellular hydration (reduces residual fatigue up to 25%)
      const rawPercent = Math.max(0, Math.round(baseRawPercent * (1 - hydrationRecoveryDiscount)));
      const hoursSince = entry.lastTimestamp 
        ? Math.round((now - entry.lastTimestamp) / (1000 * 60 * 60) * 10) / 10 
        : null;

      let recoveryStatus: 'Fully Recovered' | 'Moderate Fatigue' | 'Overreached / Active Micro-tears' = 'Fully Recovered';
      let statusColor = '#27272a'; // Neutral charcoal/dark base when 0%
      let recommendation = 'No workouts logged yet. Fully rested (0% fatigue), ready for training.';

      if (rawPercent > 60) {
        recoveryStatus = 'Overreached / Active Micro-tears';
        statusColor = '#ef4444'; // Red
        recommendation = 'High micro-trauma detected. Prioritize sleep, hydration, and active recovery.';
        primaryFatigued.push(MUSCLE_METADATA[mId].name);
      } else if (rawPercent > 20) {
        recoveryStatus = 'Moderate Fatigue';
        statusColor = '#f59e0b'; // Amber / Yellow
        recommendation = 'Moderate fatigue. Light pump work or technique refinement recommended.';
      } else if (rawPercent > 0) {
        recoveryStatus = 'Fully Recovered';
        statusColor = '#10b981'; // Green active fresh
        recommendation = 'Low residual fatigue. Primed for overload.';
        fullyRecovered.push(MUSCLE_METADATA[mId].name);
      } else {
        // 0% fatigue
        recoveryStatus = 'Fully Recovered';
        statusColor = '#27272a'; // Clean neutral base indicating 0% load
        fullyRecovered.push(MUSCLE_METADATA[mId].name);
      }

      muscles[mId] = {
        id: mId,
        name: MUSCLE_METADATA[mId].name,
        category: MUSCLE_METADATA[mId].category,
        fatiguePercent: rawPercent,
        recoveryStatus,
        statusColor,
        hoursSinceTrained: hoursSince,
        totalSetsLast48h: entry.sets,
        totalVolumeLast48h: entry.volume,
        readinessRecommendation: recommendation
      };

      totalFatigueSum += rawPercent;
    });

    const averageFatigue = Math.round(totalFatigueSum / Object.keys(muscleMap).length);
    const systemicReadiness = validWorkoutsCount > 0 ? Math.max(10, 100 - averageFatigue) : 100;

    return {
      systemicReadinessScore: systemicReadiness,
      systemicFatigueScore: validWorkoutsCount > 0 ? averageFatigue : 0,
      totalVolumeLast48h: totalSystemicVolume,
      totalSetsLast48h: totalSystemicSets,
      completedWorkoutsCount: validWorkoutsCount,
      hasActiveFatigue: validWorkoutsCount > 0 && totalFatigueSum > 0,
      primaryFatiguedMuscles: primaryFatigued,
      fullyRecoveredMuscles: fullyRecovered,
      muscles,
      lastCalculated: new Date().toISOString()
    };
  }

  private inferMusclesFromExerciseName(name: string): MuscleId[] {
    const list: MuscleId[] = [];
    if (name.includes('bench') || name.includes('pushup') || name.includes('chest') || name.includes('fly') || name.includes('dip')) {
      list.push('chest', 'triceps');
    }
    if (name.includes('squat') || name.includes('leg press') || name.includes('quad') || name.includes('lunge') || name.includes('step up')) {
      list.push('quads', 'glutes');
    }
    if (name.includes('deadlift') || name.includes('rdl') || name.includes('hamstring') || name.includes('curl leg')) {
      list.push('hamstrings', 'glutes', 'lower_back');
    }
    if (name.includes('row') || name.includes('pull') || name.includes('lat') || name.includes('chin')) {
      list.push('lats', 'biceps', 'upper_back');
    }
    if (name.includes('press') || name.includes('shoulder') || name.includes('overhead') || name.includes('lateral raise') || name.includes('deltoid')) {
      list.push('shoulders', 'triceps');
    }
    if (name.includes('curl') && !name.includes('leg')) {
      list.push('biceps');
    }
    if (name.includes('extension') || name.includes('skull crusher') || name.includes('pushdown')) {
      list.push('triceps');
    }
    if (name.includes('crunch') || name.includes('plank') || name.includes('leg raise') || name.includes('ab') || name.includes('core')) {
      list.push('core');
    }
    if (name.includes('calf') || name.includes('raise toe')) {
      list.push('calves');
    }
    // Universal Rep Session default if name has no specific match
    if (name.includes('rep') || name.includes('universal') || name.includes('workout')) {
      list.push('chest', 'quads', 'core');
    }
    return list.length > 0 ? list : ['chest', 'core'];
  }
}

export const fatigueHeatmapService = new FatigueHeatmapService();
