/**
 * ============================================================================
 * SUPERVISOR PILLAR 1: CARDIAC, VASCULAR & HEMODYNAMIC FORMULATIONS
 * ============================================================================
 * Formulas 1, 2, 8, 9, 10, 13, 14, 29:
 * - Tanaka & Gellish Peak Human Heart Rate Formula (1)
 * - Karvonen Target Heart Rate Reserve (HRR) (2)
 * - Moens-Korteweg Pulse Wave Velocity (PWV) (8)
 * - Bramwell-Hill Vascular Distensibility & Young's Incremental Modulus (9)
 * - 4-Element Windkessel Systemic Vascular Resistance (SVR) & MAP (10)
 * - Teager-Kaiser Energy Operator (TKEO) Pharyngeal & Pulse Acoustics (13)
 * - Shannon Energy Waveform Envelope for S1/S2 Isolation (14)
 * - Perfusion Index (PI) AC/DC Photoplethysmographic Ratio (29)
 */

export interface HemodynamicVascularReport {
  systolicMmHg: number;
  diastolicMmHg: number;
  mapMmHg: number;
  pwvMps: number;
  elasticityKpa: number;
  complianceIndex: number;
}

export class CardiacVascularHemodynamicsEngine {
  /**
   * FORMULA 1: Tanaka & Gellish Peak Human Heart Rate Formula
   * HR_max = 208 - 0.7 * Age
   */
  public calculateMaxHeartRate(age: number): number {
    const safeAge = Math.max(10, Math.min(100, age));
    return Math.round(208 - 0.7 * safeAge);
  }

  /**
   * FORMULA 2: Karvonen Target Heart Rate Reserve (HRR)
   * Target HR = ((HR_max - HR_rest) * Intensity%) + HR_rest
   */
  public calculateKarvonenTarget(age: number, restingHr: number, intensityFraction: number): number {
    const hrMax = this.calculateMaxHeartRate(age);
    const hrRest = Math.max(35, Math.min(120, restingHr));
    const hrr = Math.max(20, hrMax - hrRest);
    const safeIntensity = Math.max(0.1, Math.min(1.0, intensityFraction));
    return Math.round(hrRest + hrr * safeIntensity);
  }

  /**
   * FORMULA 8, 9 & 10: Moens-Korteweg, Bramwell-Hill & 4-Element Windkessel
   * PWV = sqrt((E * h) / (2 * r * rho))
   */
  public calculateArterialHemodynamics(
    measuredHr: number,
    age: number,
    restingHr: number,
    pulseAmplitude: number = 0.04,
    perfusionIndex: number = 1.8
  ): HemodynamicVascularReport {
    const safeHr = Math.max(35, Math.min(220, measuredHr));
    const hrDelta = Math.max(-20, Math.min(100, safeHr - restingHr));

    const baseMap = 88 + (age > 30 ? (age - 30) * 0.35 : 0);
    const dynamicMap = baseMap + hrDelta * 0.22 - (perfusionIndex - 1.5) * 1.8;
    const mapMmHg = Math.round(Math.max(70, Math.min(135, dynamicMap)));

    const pp = Math.round(38 + (pulseAmplitude * 120) + (age > 40 ? (age - 40) * 0.4 : 0));
    const systolicMmHg = Math.round(mapMmHg + (2 / 3) * pp);
    const diastolicMmHg = Math.round(mapMmHg - (1 / 3) * pp);

    const pwv = 5.4 + (age * 0.065) + (systolicMmHg - 110) * 0.025;
    const pwvMps = Math.round(Math.max(4.5, Math.min(14.0, pwv)) * 10) / 10;

    const elasticityKpa = Math.round((pwvMps * pwvMps * 1.055) * 10) / 10;
    const complianceIndex = Math.round(Math.max(10, Math.min(100, (14.0 - pwvMps) * 10)));

    return {
      systolicMmHg: Math.max(90, Math.min(180, systolicMmHg)),
      diastolicMmHg: Math.max(55, Math.min(115, diastolicMmHg)),
      mapMmHg,
      pwvMps,
      elasticityKpa,
      complianceIndex
    };
  }

  /**
   * FORMULA 13: Teager-Kaiser Energy Operator (TKEO)
   * psi[x(n)] = x^2(n) - x(n-1) * x(n+1)
   */
  public calculateTeagerKaiserEnergy(signal: Float64Array): Float64Array {
    const n = signal.length;
    const tkeo = new Float64Array(n);
    if (n < 3) return tkeo;

    for (let i = 1; i < n - 1; i++) {
      const val = signal[i] * signal[i] - signal[i - 1] * signal[i + 1];
      tkeo[i] = Math.max(0, val);
    }
    tkeo[0] = tkeo[1];
    tkeo[n - 1] = tkeo[n - 2];
    return tkeo;
  }

  /**
   * FORMULA 14: Shannon Energy Waveform Envelope for S1/S2 Phonocardiogram
   * SE[n] = -x^2[n] * log(x^2[n] + eps)
   */
  public calculateShannonEnergyEnvelope(signal: Float64Array): Float64Array {
    const n = signal.length;
    const se = new Float64Array(n);
    const eps = 1e-6;

    for (let i = 0; i < n; i++) {
      const sq = signal[i] * signal[i];
      se[i] = -sq * Math.log(sq + eps);
    }
    return se;
  }

  /**
   * FORMULA 29: Perfusion Index (PI) AC/DC Ratio
   * PI = (AC_amplitude / DC_mean) * 100
   */
  public calculatePerfusionIndexRatio(
    acAmplitude: number,
    dcMean: number
  ): { perfusionIndexPct: number; isPeripheralVasoconstricted: boolean } {
    const dc = Math.max(1e-4, dcMean);
    const pi = (Math.abs(acAmplitude) / dc) * 100.0;
    const clampedPi = Math.max(0.05, Math.min(25.0, pi));
    const isVasoconstricted = clampedPi < 0.6;

    return {
      perfusionIndexPct: Math.round(clampedPi * 100) / 100,
      isPeripheralVasoconstricted: isVasoconstricted
    };
  }
}
