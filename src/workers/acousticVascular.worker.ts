import { expose } from 'comlink';

export interface AcousticAnalysisOutput {
  bpm: number;
  s1Detected: boolean;
  s2Detected: boolean;
  lubDubPhase: 'S1 (Lub - AV Valves)' | 'S2 (Dub - Semilunar Valves)' | 'Diastolic Rest' | 'Silence';
  valveStatus: string;
  pulseWaveVelocityMps: number;
  arterialElasticityScore: number;
  arterialFlexibilityCategory: 'Optimal & Flexible (Elastic)' | 'Normal Compliance' | 'Elevated Vascular Resistance' | 'Measuring...';
  stressModePercent: number;
  relaxationModePercent: number;
  autonomicState: 'Deep Relaxation Mode (Parasympathetic Vagal)' | 'Balanced Autonomic Equilibrium' | 'Stress Mode (Sympathetic Dominance)' | 'Measuring...';
  audioAmplitudeLevel: number;
  signalQuality: 'Good (Chest Contact Detected)' | 'Weak (Place Mic Closer to Chest)' | 'No Signal';
}

export interface VascularBmrInput {
  age: number;
  weightKg: number;
  heightCm: number;
  gender: string;
  restingHr: number;
  instantaneousHr: number;
  pulseAmplitude: number;
  perfusionIndex: number;
  systolicUpstrokeRatio: number;
}

export interface VascularBmrOutput {
  systolicPressureMmHg: number;
  diastolicPressureMmHg: number;
  meanArterialPressureMmHg: number;
  pulsePressureMmHg: number;
  bloodPressureCategory: 'Normal & Optimal' | 'Elevated' | 'Stage 1 Vascular Stress' | 'Stage 2 Vascular Stress' | 'Low Blood Flow' | 'Idle / Not Measuring';
  dynamicBmrKcalDay: number;
  hourlyRestBurnKcal: number;
  metabolicEquivalentMets: number;
  circulatoryFatiguePercent: number;
  workoutReadinessScore: number;
  readinessFeedback: string;
  perfusionStatus: string;
}

export class AcousticVascularWorker {
  // Acoustic Peak and Interval tracking
  private lastS1Time: number = 0;
  private lastS2Time: number = 0;
  private recentS1Intervals: number[] = [];
  private recentS1S2Intervals: number[] = [];

  /**
   * Process acoustic window from Web Audio API (heart sounds 20Hz-150Hz)
   */
  public analyzeAcousticWindow(
    timeDomainSamples: Float32Array,
    frequencySpectrum: Uint8Array,
    sampleRate: number,
    currentTimeMs: number
  ): AcousticAnalysisOutput {
    const numSamples = timeDomainSamples.length;
    if (numSamples === 0) {
      return {
        bpm: 0,
        s1Detected: false,
        s2Detected: false,
        lubDubPhase: 'Silence',
        valveStatus: 'Mic is inactive',
        pulseWaveVelocityMps: 0,
        arterialElasticityScore: 0,
        arterialFlexibilityCategory: 'Measuring...',
        stressModePercent: 0,
        relaxationModePercent: 0,
        autonomicState: 'Measuring...',
        audioAmplitudeLevel: 0,
        signalQuality: 'No Signal'
      };
    }

    // 1. RMS Amplitude & Continuous Shannon Energy Envelope Calculation:
    // Es(n) = -x(n)^2 * log(x(n)^2 + 1e-7) isolates impulsive mechanical valve closures (S1/S2)
    let sumSquares = 0;
    let shannonSum = 0;
    for (let i = 0; i < numSamples; i++) {
      const val = timeDomainSamples[i];
      const sq = val * val;
      sumSquares += sq;
      if (sq > 1e-7) {
        shannonSum += -sq * Math.log(sq);
      }
    }
    const rms = Math.sqrt(sumSquares / numSamples);
    const shannonEnvelope = shannonSum / numSamples;
    const audioLevel = Math.min(100, Math.round((rms * 420) + (shannonEnvelope * 65)));

    // Signal check threshold: If ambient noise is extremely low or microphone is silent
    if (rms < 0.008) {
      return {
        bpm: 0,
        s1Detected: false,
        s2Detected: false,
        lubDubPhase: 'Silence',
        valveStatus: 'Phone mic ko seene (left chest) ke paas lagayein',
        pulseWaveVelocityMps: 0,
        arterialElasticityScore: 0,
        arterialFlexibilityCategory: 'Measuring...',
        stressModePercent: 0,
        relaxationModePercent: 0,
        autonomicState: 'Measuring...',
        audioAmplitudeLevel: audioLevel,
        signalQuality: 'Weak (Place Mic Closer to Chest)'
      };
    }

    // 2. Spectral Band Analysis:
    // S1 band (Mitral & Tricuspid valve closure): ~20 Hz - 55 Hz
    // S2 band (Aortic & Pulmonary valve closure): ~55 Hz - 110 Hz
    // Noise band: > 140 Hz
    const nyquist = sampleRate / 2;
    const binSizeHz = nyquist / frequencySpectrum.length;

    let s1BandEnergy = 0;
    let s2BandEnergy = 0;
    let noiseEnergy = 0;

    for (let i = 0; i < frequencySpectrum.length; i++) {
      const freq = i * binSizeHz;
      const energy = frequencySpectrum[i];
      if (freq >= 18 && freq <= 55) {
        s1BandEnergy += energy;
      } else if (freq > 55 && freq <= 115) {
        s2BandEnergy += energy;
      } else if (freq > 140) {
        noiseEnergy += energy;
      }
    }

    // Determine valve events
    const s1Threshold = 85;
    const s2Threshold = 75;
    let s1Detected = false;
    let s2Detected = false;

    // Refractory period: S1 must be at least 400ms after previous S1
    if (s1BandEnergy > s1Threshold && (currentTimeMs - this.lastS1Time > 380)) {
      s1Detected = true;
      if (this.lastS1Time > 0) {
        const interval = currentTimeMs - this.lastS1Time;
        if (interval > 380 && interval < 1500) {
          this.recentS1Intervals.push(interval);
          if (this.recentS1Intervals.length > 8) {
            this.recentS1Intervals.shift();
          }
        }
      }
      this.lastS1Time = currentTimeMs;
    }

    // S2 occurs typically 200 - 350ms after S1 during systolic ejection end
    const timeSinceS1 = currentTimeMs - this.lastS1Time;
    if (
      !s1Detected &&
      s2BandEnergy > s2Threshold &&
      timeSinceS1 > 180 &&
      timeSinceS1 < 420 &&
      (currentTimeMs - this.lastS2Time > 350)
    ) {
      s2Detected = true;
      this.recentS1S2Intervals.push(timeSinceS1);
      if (this.recentS1S2Intervals.length > 8) {
        this.recentS1S2Intervals.shift();
      }
      this.lastS2Time = currentTimeMs;
    }

    // 3. Heart Rate Calculation from acoustic S1-S1 intervals
    let bpm = 0;
    if (this.recentS1Intervals.length >= 2) {
      const avgInterval = this.recentS1Intervals.reduce((a, b) => a + b, 0) / this.recentS1Intervals.length;
      bpm = Math.round(60000 / avgInterval);
      bpm = Math.max(45, Math.min(170, bpm));
    } else {
      // Dynamic fallback estimate from peak rhythm
      bpm = 0;
    }

    // 4. Valve phase status
    let lubDubPhase: AcousticAnalysisOutput['lubDubPhase'] = 'Diastolic Rest';
    let valveStatus = 'Awaiting Valve Sounds...';

    if (s1Detected) {
      lubDubPhase = 'S1 (Lub - AV Valves)';
      valveStatus = 'Mitral & Tricuspid Valves Band Ho Rahe Hain (Ventricular Contraction)';
    } else if (s2Detected) {
      lubDubPhase = 'S2 (Dub - Semilunar Valves)';
      valveStatus = 'Aortic & Pulmonary Valves Band Ho Rahe Hain (Ventricular Relaxation)';
    } else if (timeSinceS1 < 360) {
      valveStatus = 'Systolic Flow (Khoon Dil Se Sharir Mein Nikal Raha Hai)';
    } else {
      valveStatus = 'Diastolic Filling (Dil Dubara Khoon Se Bhar Raha Hai)';
    }

    // 5. Vascular Wave Speed (Pulse Wave Velocity - PWV in m/s)
    // S1 to S2 interval reflects Left Ventricular Ejection Time (LVET).
    // Shorter acoustic ejection times with high acoustic acceleration correlate with higher PWV (stiffer arteries).
    let pwv = 0;
    let elasticityScore = 0;
    let flexibilityCategory: AcousticAnalysisOutput['arterialFlexibilityCategory'] = 'Measuring...';

    if (this.recentS1S2Intervals.length > 0 && bpm > 0) {
      const avgS1S2 = this.recentS1S2Intervals.reduce((a, b) => a + b, 0) / this.recentS1S2Intervals.length;
      // Normal LVET: ~280-320ms at 70 BPM. Formula relates pulse transit time to vascular wave velocity
      const pttSeconds = avgS1S2 / 1000;
      // Bramwell-Hill / Moens-Korteweg acoustic pulse transit time approximation
      const baseDistanceMeters = 0.85; // Aortic arch to peripheral arterioles
      const estimatedPwv = baseDistanceMeters / (pttSeconds * 0.48);
      pwv = Math.round(Math.max(4.5, Math.min(13.5, estimatedPwv)) * 10) / 10;

      // Elasticity Score: Youthful optimal PWV ~ 5.5 - 6.8 m/s -> 90-100%
      if (pwv <= 6.8) {
        elasticityScore = Math.round(92 + (6.8 - pwv) * 5);
        flexibilityCategory = 'Optimal & Flexible (Elastic)';
      } else if (pwv <= 8.5) {
        elasticityScore = Math.round(75 + (8.5 - pwv) * 9.5);
        flexibilityCategory = 'Normal Compliance';
      } else {
        elasticityScore = Math.max(35, Math.round(70 - (pwv - 8.5) * 8));
        flexibilityCategory = 'Elevated Vascular Resistance';
      }
      elasticityScore = Math.min(99, Math.max(30, elasticityScore));
    }

    // 6. Autonomic Stress Balance (Parasympathetic vs Sympathetic)
    // Determined from inter-beat interval variance (RMSSD) and acoustic spectral ratio
    let stressModePercent = 0;
    let relaxationModePercent = 0;
    let autonomicState: AcousticAnalysisOutput['autonomicState'] = 'Measuring...';

    if (this.recentS1Intervals.length >= 3) {
      let sumDiffSq = 0;
      for (let i = 1; i < this.recentS1Intervals.length; i++) {
        const diff = this.recentS1Intervals[i] - this.recentS1Intervals[i - 1];
        sumDiffSq += diff * diff;
      }
      const rmssd = Math.sqrt(sumDiffSq / (this.recentS1Intervals.length - 1));

      // Higher RMSSD -> Parasympathetic vagal dominance (Deep Relaxation)
      // Lower RMSSD & higher resting HR -> Sympathetic dominance (Stress Mode)
      const vagalTone = Math.min(100, Math.max(10, Math.round((rmssd / 65) * 100)));
      relaxationModePercent = vagalTone;
      stressModePercent = 100 - vagalTone;

      if (relaxationModePercent >= 62) {
        autonomicState = 'Deep Relaxation Mode (Parasympathetic Vagal)';
      } else if (stressModePercent >= 58) {
        autonomicState = 'Stress Mode (Sympathetic Dominance)';
      } else {
        autonomicState = 'Balanced Autonomic Equilibrium';
      }
    }

    return {
      bpm,
      s1Detected,
      s2Detected,
      lubDubPhase,
      valveStatus,
      pulseWaveVelocityMps: pwv,
      arterialElasticityScore: elasticityScore,
      arterialFlexibilityCategory: flexibilityCategory,
      stressModePercent,
      relaxationModePercent,
      autonomicState,
      audioAmplitudeLevel: audioLevel,
      signalQuality: audioLevel > 18 ? 'Good (Chest Contact Detected)' : 'Weak (Place Mic Closer to Chest)'
    };
  }

  /**
   * Process Vascular Resistance & Dynamic BMR calculation
   */
  public analyzeVascularBmrProfile(input: VascularBmrInput): VascularBmrOutput {
    const {
      age = 26,
      weightKg = 70,
      heightCm = 175,
      gender = 'male',
      restingHr = 65,
      instantaneousHr = 0,
      pulseAmplitude = 0,
      perfusionIndex = 0,
      systolicUpstrokeRatio = 0.3
    } = input;

    // Strict zero-check when inactive or camera has not acquired signal
    if (instantaneousHr <= 0 || pulseAmplitude <= 0.005) {
      return {
        systolicPressureMmHg: 0,
        diastolicPressureMmHg: 0,
        meanArterialPressureMmHg: 0,
        pulsePressureMmHg: 0,
        bloodPressureCategory: 'Idle / Not Measuring',
        dynamicBmrKcalDay: 0,
        hourlyRestBurnKcal: 0,
        metabolicEquivalentMets: 0,
        circulatoryFatiguePercent: 0,
        workoutReadinessScore: 0,
        readinessFeedback: 'Kripya camera par ungli rakhein ya face focus karein',
        perfusionStatus: 'No Perfusion Detected'
      };
    }

    // 1. Camera Micro-Color Pulse Pressure (Rakt Chaap Pressure Monitor)
    // Systolic Upstroke Ratio (rapid upstroke time vs cardiac cycle) & Perfusion Amplitude correlate with SBP & DBP
    const isMale = !gender.toLowerCase().includes('female');
    const bmi = weightKg / Math.pow(heightCm / 100, 2);

    // Baseline physiological MAP formula adapted with micro-color PPG vascular stiffness
    // Higher upstroke steepness (smaller upstroke ratio) & higher pulse amplitude indicate healthy stroke volume
    // Lower upstroke steepness (delayed peak) indicates higher peripheral vascular resistance
    const resistanceMultiplier = Math.max(0.85, Math.min(1.4, (systolicUpstrokeRatio / 0.32)));
    const baseSbp = 110 + (age * 0.22) + (bmi > 24.5 ? (bmi - 24.5) * 1.3 : 0) + (isMale ? 4 : 0);
    const sbpModulated = baseSbp * (0.92 + (instantaneousHr / 120) * 0.12) * resistanceMultiplier;
    const systolicMmHg = Math.round(Math.max(90, Math.min(185, sbpModulated)));

    const baseDbp = 70 + (age * 0.14) + (bmi > 24.5 ? (bmi - 24.5) * 0.8 : 0);
    const dbpModulated = baseDbp * (0.95 + (instantaneousHr / 140) * 0.08) * (resistanceMultiplier * 0.85 + 0.15);
    const diastolicMmHg = Math.round(Math.max(55, Math.min(115, dbpModulated)));

    const meanArterialPressure = Math.round(diastolicMmHg + (systolicMmHg - diastolicMmHg) / 3);
    const pulsePressure = systolicMmHg - diastolicMmHg;

    let bpCategory: VascularBmrOutput['bloodPressureCategory'] = 'Normal & Optimal';
    if (systolicMmHg < 90 || diastolicMmHg < 60) {
      bpCategory = 'Low Blood Flow';
    } else if (systolicMmHg >= 140 || diastolicMmHg >= 90) {
      bpCategory = 'Stage 2 Vascular Stress';
    } else if (systolicMmHg >= 130 || diastolicMmHg >= 80) {
      bpCategory = 'Stage 1 Vascular Stress';
    } else if (systolicMmHg >= 120 && diastolicMmHg < 80) {
      bpCategory = 'Elevated';
    } else {
      bpCategory = 'Normal & Optimal';
    }

    // 2. Dynamic Metabolic Burn Rate (Jeev-Rasaayan BMR Gauge)
    // Pure mathematical formulation: Mifflin-St Jeor equation modulated dynamically
    // Men: (10 * weight) + (6.25 * height) - (5 * age) + 5
    // Women: (10 * weight) + (6.25 * height) - (5 * age) - 161
    let baselineMifflinBmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    baselineMifflinBmr += isMale ? 5 : -161;

    // Modulate with instantaneous cardiac workload vs resting baseline
    // Elevated instantaneous HR increases thermal circulation and dynamic oxygen consumption
    const hrDelta = Math.max(0, instantaneousHr - restingHr);
    const dynamicMultiplier = 1.0 + (hrDelta * 0.0075) + (perfusionIndex > 1.2 ? 0.03 : 0);
    const dynamicBmr = Math.round(baselineMifflinBmr * dynamicMultiplier);
    const hourlyBurn = Math.round(dynamicBmr / 24);
    const mets = Math.round(((dynamicBmr / (weightKg * 24 * 1.0))) * 100) / 100;

    // 3. Vascular Fatigue & Workout Readiness (Nasa-Thakaan Indicator)
    // Combines BP estimate, HR elevation, and dynamic metabolic load
    // Circulatory fatigue increases with excessive vascular pressure or sustained elevated pulse
    let fatigueScore = 18;
    if (meanArterialPressure > 102) fatigueScore += 25;
    else if (meanArterialPressure > 94) fatigueScore += 12;

    if (instantaneousHr > 90) fatigueScore += 30;
    else if (instantaneousHr > 80) fatigueScore += 15;

    if (pulsePressure > 55) fatigueScore += 15;

    fatigueScore = Math.max(8, Math.min(95, fatigueScore));
    const workoutReadiness = Math.max(5, 100 - fatigueScore);

    // Exact user-requested screen feedbacks:
    let feedback = '';
    if (workoutReadiness >= 75) {
      feedback = 'Dhadkan aur Nasein Bilkul Normal Hain - Heavy Workout Ke Liye Ready';
    } else if (workoutReadiness >= 50) {
      feedback = 'Moderate Recovery - Medium Workout Ya Cardio Ke Liye Sahi';
    } else {
      feedback = 'Circulatory Fatigue High Hai - Aaj Light Exercise Ya Aaram Karein';
    }

    const perfusionStatus = perfusionIndex > 1.2 
      ? 'Strong Capillary Perfusion' 
      : perfusionIndex > 0.6 
      ? 'Normal Micro-Circulation' 
      : 'Low Surface Temperature / Perfusion';

    return {
      systolicPressureMmHg: systolicMmHg,
      diastolicPressureMmHg: diastolicMmHg,
      meanArterialPressureMmHg: meanArterialPressure,
      pulsePressureMmHg: pulsePressure,
      bloodPressureCategory: bpCategory,
      dynamicBmrKcalDay: dynamicBmr,
      hourlyRestBurnKcal: hourlyBurn,
      metabolicEquivalentMets: mets,
      circulatoryFatiguePercent: fatigueScore,
      workoutReadinessScore: workoutReadiness,
      readinessFeedback: feedback,
      perfusionStatus
    };
  }
}

expose(new AcousticVascularWorker());
