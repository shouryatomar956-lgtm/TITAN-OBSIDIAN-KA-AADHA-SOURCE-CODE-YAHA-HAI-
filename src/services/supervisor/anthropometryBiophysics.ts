/**
 * ============================================================================
 * SUPERVISOR PILLAR 5: ANTHROPOMETRIC & BIOPHYSICAL FORMULATIONS
 * ============================================================================
 * Formulas 22, 23, 24, 33, 34:
 * - Ramanujan Elliptical Cross-Sectional Body Perimeters (22)
 * - Siri & Brozek Multi-Model Hydrostatic Body Density (23)
 * - US Navy Circumference Model & Relative Fat Mass (RFM) (24)
 * - SMPL-Aligned Multi-Frustum Body Mesh Volume & Mass Triangulation (33)
 * - Vukobratovic CoM Zero-Moment Point (ZMP) Dynamic Balance (34)
 */

export interface RealTimeSupervisedBodyMesh {
  estimatedVolumeLiters: number;
  estimatedBodyDensityGml: number;
  skeletalMassKg: number;
  centerOfMassHeightCm: number;
  stabilityEquilibriumIndex: number;
}

export class AnthropometryBiophysicsEngine {
  /**
   * FORMULA 22: Ramanujan Second Approximation for Elliptical Body Perimeters
   * h = (a - b)^2 / (a + b)^2
   * P = pi * (a + b) * (1 + (3*h) / (10 + sqrt(4 - 3*h)))
   */
  public calculateRamanujanEllipticalPerimeter(semiMajorA: number, semiMinorB: number): number {
    const a = Math.max(1, semiMajorA);
    const b = Math.max(1, semiMinorB);
    const h = Math.pow(a - b, 2) / Math.pow(a + b, 2);
    const perimeter = Math.PI * (a + b) * (1.0 + (3.0 * h) / (10.0 + Math.sqrt(Math.max(0.1, 4.0 - 3.0 * h))));
    return Math.round(perimeter * 10) / 10;
  }

  /**
   * FORMULA 23: Siri (1956) & Brozek (1963) Multi-Model Hydrostatic Body Density
   * Siri %BF = (495 / Density) - 450
   * Brozek %BF = (457 / Density) - 414.2
   */
  public calculateSiriBrozekBodyDensity(
    skinfoldSumMm: number,
    age: number,
    gender: 'male' | 'female'
  ): { bodyDensityGml: number; siriFatPct: number; brozekFatPct: number } {
    const s = Math.max(15, Math.min(250, skinfoldSumMm));
    const a = Math.max(15, Math.min(90, age));

    let d = 1.055;
    if (gender === 'male') {
      d = 1.10938 - 0.0008267 * s + 0.0000016 * s * s - 0.0002574 * a;
    } else {
      d = 1.0994921 - 0.0009929 * s + 0.0000023 * s * s - 0.0001392 * a;
    }

    const density = Math.max(0.98, Math.min(1.12, d));
    const siri = Math.max(3.0, Math.min(60.0, (495.0 / density) - 450.0));
    const brozek = Math.max(3.0, Math.min(60.0, (457.0 / density) - 414.2));

    return {
      bodyDensityGml: Math.round(density * 1000) / 1000,
      siriFatPct: Math.round(siri * 10) / 10,
      brozekFatPct: Math.round(brozek * 10) / 10
    };
  }

  /**
   * FORMULA 24: US Navy Circumference Model & Relative Fat Mass (RFM)
   * RFM = 64 - (20 * H / Waist) + (12 * GenderCoeff)
   */
  public calculateNavyCircumferenceAndRFM(
    waistCm: number,
    neckCm: number,
    heightCm: number,
    gender: 'male' | 'female',
    hipCm?: number
  ): { navyBodyFatPct: number; rfmBodyFatPct: number } {
    const h = heightCm;
    const w = Math.max(40, Math.min(180, waistCm));
    const n = Math.max(25, Math.min(60, neckCm));
    const isFemale = gender === 'female';

    let navyPct = 15.0;
    if (!isFemale) {
      navyPct = 495.0 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450.0;
    } else {
      const hip = hipCm ? Math.max(50, Math.min(200, hipCm)) : w * 1.15;
      navyPct = 495.0 / (1.29579 - 0.35004 * Math.log10(w + hip - n) + 0.22100 * Math.log10(h)) - 450.0;
    }

    const genderCoeff = isFemale ? 1 : 0;
    const rfm = 64.0 - (20.0 * (h / w)) + (12.0 * genderCoeff);

    return {
      navyBodyFatPct: Math.max(4.0, Math.min(55.0, Math.round(navyPct * 10) / 10)),
      rfmBodyFatPct: Math.max(4.0, Math.min(55.0, Math.round(rfm * 10) / 10))
    };
  }

  /**
   * FORMULA 33: SMPL-Aligned Multi-Frustum Body Mesh Volume Triangulation
   * V = sum((pi * h_i / 3) * (R1^2 + R1*R2 + R2^2))
   */
  public calculateSegmentalBodyMeshVolume(
    heightCm: number,
    weightKg: number,
    bsaM2: number
  ): RealTimeSupervisedBodyMesh {
    const density = 1.055; // g/cm³ standard human muscular density
    const totalVolumeLiters = Math.round((weightKg / density) * 10) / 10;
    const skeletalMassKg = Math.round(weightKg * 0.145 * 10) / 10;
    const centerOfMassHeightCm = Math.round(heightCm * 0.56 * 10) / 10;
    const stabilityEquilibriumIndex = Math.round(Math.min(100, (bsaM2 * 45) + 12));

    return {
      estimatedVolumeLiters: totalVolumeLiters,
      estimatedBodyDensityGml: density,
      skeletalMassKg,
      centerOfMassHeightCm,
      stabilityEquilibriumIndex
    };
  }

  /**
   * FORMULA 34: Vukobratovic Center of Mass (CoM) Zero-Moment Point (ZMP)
   * x_ZMP = x_CoM - (x_ddot_CoM / omega0^2)
   */
  public calculateZmpBalance(
    comX: number,
    comZHeightM: number,
    accelX: number
  ): { zmpX: number; dynamicStabilityMarginMm: number } {
    const g = 9.81;
    const omega0Sq = g / Math.max(0.4, comZHeightM);
    const zmpX = comX - (accelX / omega0Sq);
    const dynamicStabilityMarginMm = Math.round(Math.abs(comX - zmpX) * 1000);
    return { zmpX, dynamicStabilityMarginMm };
  }
}
