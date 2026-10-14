import { expose } from 'comlink';

export interface CardiacVitalsInput {
  age?: number;
  weightKg?: number;
  heightCm?: number;
  gender?: string;
  restingHeartRate?: number;
  recentWorkoutsCount?: number;
  rawRrIntervals?: number[]; // Exact millisecond RR intervals from camera PPG or stethoscope
}

export interface CardiacAnalysisResult {
  estimatedMaxHeartRate: number;      // 220 - age or Tanaka: 208 - (0.7 * age)
  targetZones: {
    zone1: { min: number; max: number; label: string };
    zone2: { min: number; max: number; label: string };
    zone3: { min: number; max: number; label: string };
    zone4: { min: number; max: number; label: string };
    zone5: { min: number; max: number; label: string };
  };
  estimatedStrokeVolumeMl: number;    // Stroke volume in mL per beat
  estimatedCardiacOutputLpm: number;  // Liters per minute
  estimatedVO2Max: number;            // mL/kg/min (Uth-Sørensen-Overgaard-Pedersen formula)
  heartRateVariabilityMs: number;     // RMSSD in ms
  sdnnMs?: number;                    // Standard deviation of NN intervals
  pnn50Percent?: number;              // Percentage of consecutive differences > 50ms
  poincareSd1?: number;               // Fast parasympathetic dynamic
  poincareSd2?: number;               // Long-term autonomic tone
  baevskyStressIndex?: number;        // Autonomic balance index
  cardiacAutonomicTone: 'High Parasympathetic (Superb Recovery)' | 'Balanced Autonomic Equilibrium' | 'Elevated Sympathetic (Mild Fatigue)' | 'High Sympathetic Stress';
  cardiovascularRiskScore: 'Low / Optimal' | 'Moderate' | 'Elevated';
  meanArterialPressureMmHg: number;   // MAP = DBP + (SBP - DBP) / 3
}

export class CardiacTelemetryWorker {
  public analyzeCardiacProfile(
    input: CardiacVitalsInput,
    currentBpm: number
  ): CardiacAnalysisResult {
    const age = input.age || 26;
    const weightKg = input.weightKg || 72;
    const heightCm = input.heightCm || 175;
    const restingHr = input.restingHeartRate || 64;
    const workouts = input.recentWorkoutsCount || 3;

    // Tanaka formula for maximal heart rate: HRmax = 208 - (0.7 * age)
    const maxHr = Math.round(208 - (0.7 * age));

    // Karvonen Heart Rate Reserve (HRR) = HRmax - HRrest
    const hrr = maxHr - restingHr;

    const targetZones = {
      zone1: { 
        min: Math.round(restingHr + hrr * 0.50), 
        max: Math.round(restingHr + hrr * 0.60), 
        label: 'Active Recovery / Aerobic Warmup' 
      },
      zone2: { 
        min: Math.round(restingHr + hrr * 0.60), 
        max: Math.round(restingHr + hrr * 0.70), 
        label: 'Aerobic Base & Mitochondrial Biogenesis' 
      },
      zone3: { 
        min: Math.round(restingHr + hrr * 0.70), 
        max: Math.round(restingHr + hrr * 0.80), 
        label: 'Tempo & Aerobic Endurance' 
      },
      zone4: { 
        min: Math.round(restingHr + hrr * 0.80), 
        max: Math.round(restingHr + hrr * 0.90), 
        label: 'Anaerobic Lactate Threshold' 
      },
      zone5: { 
        min: Math.round(restingHr + hrr * 0.90), 
        max: maxHr, 
        label: 'Neuromuscular Peak & VO2 Max' 
      }
    };

    // Stroke Volume estimation: ~60-100 mL resting, trained athletes up to 110 mL
    const athleteMultiplier = Math.min(1.25, 0.95 + (workouts * 0.04));
    const strokeVolumeMl = Math.round((weightKg * 1.05) * athleteMultiplier);

    // Cardiac Output: Q = HR * SV / 1000 (L/min)
    const effectiveBpm = currentBpm > 30 ? currentBpm : restingHr;
    const cardiacOutput = Math.round(((effectiveBpm * strokeVolumeMl) / 1000) * 10) / 10;

    // Uth-Sørensen-Overgaard-Pedersen VO2 Max estimation:
    // VO2max = 15.3 * (HRmax / HRrest)
    const vo2MaxRaw = 15.3 * (maxHr / restingHr);
    const vo2Max = Math.round(vo2MaxRaw * 10) / 10;

    // 100% Real-Time Mathematical HRV Analysis when RR intervals are present
    let hrvRmssd = 0;
    let sdnn = 0;
    let pnn50 = 0;
    let sd1 = 0;
    let sd2 = 0;
    let stressIndex = 0;

    const rrs = input.rawRrIntervals || [];
    if (rrs.length >= 2) {
      let sumSqDiff = 0;
      let count50 = 0;
      let meanRr = 0;
      for (let i = 0; i < rrs.length; i++) {
        meanRr += rrs[i];
      }
      meanRr /= rrs.length;

      let varRr = 0;
      for (let i = 0; i < rrs.length; i++) {
        const d = rrs[i] - meanRr;
        varRr += d * d;
      }
      sdnn = Math.round(Math.sqrt(varRr / rrs.length));

      for (let i = 0; i < rrs.length - 1; i++) {
        const diff = rrs[i + 1] - rrs[i];
        sumSqDiff += diff * diff;
        if (Math.abs(diff) > 50) {
          count50++;
        }
      }
      hrvRmssd = Math.round(Math.sqrt(sumSqDiff / (rrs.length - 1)));
      pnn50 = Math.round((count50 / (rrs.length - 1)) * 100);

      // Poincaré geometry
      sd1 = Math.round(Math.sqrt(0.5 * (sumSqDiff / (rrs.length - 1))));
      const varTotal = varRr / rrs.length;
      sd2 = Math.round(Math.sqrt(Math.max(1, 2 * varTotal - 0.5 * (sumSqDiff / (rrs.length - 1)))));

      // Baevsky Stress Index approximation
      const minRr = Math.min(...rrs) / 1000;
      const maxRr = Math.max(...rrs) / 1000;
      const mxDmn = Math.max(0.06, maxRr - minRr);
      const mo = Math.max(0.1, meanRr / 1000);
      const amo = (count50 / (rrs.length - 1)) * 100;
      const calculatedSi = (amo / (2 * mo * mxDmn));
      stressIndex = Number.isFinite(calculatedSi) ? Math.round(calculatedSi * 10) / 10 : 0;
    } else {
      // Baseline prior estimation if no real-time RR intervals are streamed yet
      let hrvBase = Math.round(85 - (age * 0.7) - (restingHr - 60) * 0.8 + (workouts * 3));
      hrvRmssd = Math.max(22, Math.min(115, hrvBase));
      sdnn = Math.round(hrvRmssd * 1.15);
      pnn50 = Math.round(Math.max(5, Math.min(60, (hrvRmssd - 20) * 0.8)));
      sd1 = Math.round(hrvRmssd / Math.SQRT2);
      sd2 = Math.round(sdnn * 1.3);
      stressIndex = Math.round(80 + (restingHr - 60) * 3);
    }

    // Autonomic tone assessment based on mathematical RMSSD and Resting HR
    let tone: CardiacAnalysisResult['cardiacAutonomicTone'] = 'Balanced Autonomic Equilibrium';
    if (hrvRmssd >= 65 && restingHr <= 62) {
      tone = 'High Parasympathetic (Superb Recovery)';
    } else if (hrvRmssd < 35 || restingHr > 78) {
      tone = 'Elevated Sympathetic (Mild Fatigue)';
    }

    // Mean Arterial Pressure (MAP) estimation based on age & BMI
    const bmi = weightKg / Math.pow(heightCm / 100, 2);
    const sbp = Math.round(112 + (age * 0.25) + (bmi > 25 ? (bmi - 25) * 1.2 : 0));
    const dbp = Math.round(72 + (age * 0.15) + (bmi > 25 ? (bmi - 25) * 0.8 : 0));
    const map = Math.round(dbp + (sbp - dbp) / 3);

    return {
      estimatedMaxHeartRate: maxHr,
      targetZones,
      estimatedStrokeVolumeMl: strokeVolumeMl,
      estimatedCardiacOutputLpm: cardiacOutput,
      estimatedVO2Max: vo2Max,
      heartRateVariabilityMs: hrvRmssd,
      sdnnMs: sdnn,
      pnn50Percent: pnn50,
      poincareSd1: sd1,
      poincareSd2: sd2,
      baevskyStressIndex: stressIndex,
      cardiacAutonomicTone: tone,
      cardiovascularRiskScore: (restingHr < 75 && bmi < 28) ? 'Low / Optimal' : 'Moderate',
      meanArterialPressureMmHg: map
    };
  }
}

expose(new CardiacTelemetryWorker());
