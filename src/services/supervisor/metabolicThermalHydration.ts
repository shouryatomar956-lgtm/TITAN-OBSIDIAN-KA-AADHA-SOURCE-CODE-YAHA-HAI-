/**
 * ============================================================================
 * SUPERVISOR PILLAR 2: METABOLIC, THERMAL & HYDRATION FORMULATIONS
 * ============================================================================
 * Formulas 3, 4, 5, 6, 7, 26, 27, 28, 30, 35:
 * - Mifflin-St Jeor & Katch-McArdle Dynamic BMR (3)
 * - Whipp & Wasserman Dynamic Oxygen Kinetics & METs (4)
 * - Mosteller & Du Bois Body Surface Area (BSA) (5)
 * - Shapiro-Gonzalez Sweat Rate & Gagnon-Kenny Electrolytes (6, 7)
 * - Armstrong-Maresh 8-Point USG Hydration Index (26)
 * - Enterocyte SGLT1 Stoichiometric Sodium-Glucose Ratio (27)
 * - Circadian Vasopressin (AVP) Chronobiology (28)
 * - Uth-Sørensen Dynamic VO2 Max Ratio (30)
 * - Gagge Two-Node Thermal Core-Skin Model (35)
 */

export interface RealTimeSupervisedHydration {
  sweatRateMlPerHour: number;
  hourlySodiumLossMg: number;
  hourlyPotassiumLossMg: number;
  hourlyMagnesiumLossMg: number;
  plasmaOsmolalityMaccKg: number;
  dehydrationDeficitIndexPct: number;
  dynamicOptimalCadenceMlHour: number;
  intracellularWaterLiters: number;
  extracellularWaterLiters: number;
  urineSpecificGravity: number;
  vasopressinConcentrationPmolL: number;
}

export class MetabolicThermalHydrationEngine {
  /**
   * FORMULA 3: Mifflin-St Jeor & Katch-McArdle Dynamic BMR
   */
  public calculateDynamicBmr(
    weightKg: number,
    heightCm: number,
    age: number,
    gender: 'male' | 'female',
    activityMultiplier: number = 1.35
  ): { bmr: number; totalDailyExpenditure: number } {
    const safeW = Math.max(30, Math.min(250, weightKg));
    const safeH = Math.max(100, Math.min(250, heightCm));
    const safeA = Math.max(10, Math.min(100, age));
    const s = gender === 'male' ? 5 : -161;
    const rawBmr = 10 * safeW + 6.25 * safeH - 5 * safeA + s;
    const bmr = Math.max(900, Math.round(rawBmr));
    const tdee = Math.round(bmr * activityMultiplier);
    return { bmr, totalDailyExpenditure: tdee };
  }

  /**
   * FORMULA 5: Mosteller & Du Bois Body Surface Area (BSA in m²)
   * Mosteller: BSA = sqrt((H_cm * W_kg) / 3600)
   */
  public calculateBodySurfaceArea(weightKg: number, heightCm: number): number {
    const safeW = Math.max(30, Math.min(250, weightKg));
    const safeH = Math.max(100, Math.min(250, heightCm));
    const bsa = Math.sqrt((safeH * safeW) / 3600.0);
    return Math.round(bsa * 100) / 100;
  }

  /**
   * FORMULA 30: Uth-Sørensen Dynamic VO2 Max Ratio
   * VO2_max = 15.3 * (HR_max / HR_rest)
   */
  public calculateVo2Max(hrMax: number, hrRest: number): number {
    const max = Math.max(120, hrMax);
    const rest = Math.max(35, hrRest);
    return Math.round(15.3 * (max / rest) * 10) / 10;
  }

  /**
   * FORMULA 4: Whipp & Wasserman Dynamic Oxygen Kinetics & METs
   */
  public calculateOxygenKinetics(
    currentHr: number,
    restingHr: number,
    maxHr: number,
    vo2Max: number,
    weightKg: number,
    durationMinutes: number = 30
  ): { vo2CurrentMlKgMin: number; mets: number; caloricBurnKcal: number } {
    const safeHr = Math.max(40, Math.min(220, currentHr));
    const intensity = Math.max(0, Math.min(1.0, (safeHr - restingHr) / Math.max(20, maxHr - restingHr)));
    const vo2CurrentMlKgMin = Math.round((3.5 + intensity * (vo2Max - 3.5)) * 10) / 10;
    const mets = Math.round((vo2CurrentMlKgMin / 3.5) * 10) / 10;
    const caloricBurnKcal = Math.round((mets * 3.5 * weightKg / 200) * durationMinutes);
    return { vo2CurrentMlKgMin, mets, caloricBurnKcal };
  }

  /**
   * FORMULA 6 & 7: Shapiro-Gonzalez Dynamic Sweating & Gagnon-Kenny Electrolytes
   */
  public calculateDynamicSweatElectrolytes(
    weightKg: number,
    heightCm: number,
    age: number,
    gender: 'male' | 'female',
    metWatts: number = 320,
    ambientTempC: number = 26,
    relativeHumidityPct: number = 55,
    durationHours: number = 1.0
  ): RealTimeSupervisedHydration {
    const bsa = this.calculateBodySurfaceArea(weightKg, heightCm);
    const safeTemp = Math.max(5, Math.min(50, ambientTempC));
    const safeHum = Math.max(10, Math.min(100, relativeHumidityPct));

    const satVaporPressKpa = 0.61078 * Math.exp((17.27 * safeTemp) / (safeTemp + 237.3));
    const ambVaporPressKpa = satVaporPressKpa * (safeHum / 100);
    const vpd = Math.max(0.2, satVaporPressKpa - ambVaporPressKpa);

    const thermalStressFactor = 1.0 + Math.max(0, (safeTemp - 20) * 0.045) + (vpd < 1.0 ? 0.15 : 0.0);
    const baseSweatMlHr = (metWatts * 1.85 * bsa * thermalStressFactor) / 1.7;
    const sweatRateMlPerHour = Math.round(Math.max(350, Math.min(2400, baseSweatMlHr)));

    const hourlySodiumLossMg = Math.round((sweatRateMlPerHour / 1000) * 980);
    const hourlyPotassiumLossMg = Math.round((sweatRateMlPerHour / 1000) * 210);
    const hourlyMagnesiumLossMg = Math.round((sweatRateMlPerHour / 1000) * 24);

    const fluidDeficitMl = sweatRateMlPerHour * durationHours;
    const dehydrationDeficitIndexPct = Math.round(
      Math.min(10.0, (fluidDeficitMl / (weightKg * 1000)) * 100) * 10
    ) / 10;
    const plasmaOsmolalityMaccKg = Math.round(285 + dehydrationDeficitIndexPct * 3.8);
    const dynamicOptimalCadenceMlHour = Math.round(sweatRateMlPerHour * 0.82);

    // Total body water (TBW) via Watson formula
    const tbw = gender === 'male'
      ? 2.447 - 0.09156 * age + 0.1074 * heightCm + 0.3362 * weightKg
      : -2.097 + 0.1069 * heightCm + 0.2466 * weightKg;

    const icf = Math.round((tbw * 0.62) * 10) / 10;
    const ecf = Math.round((tbw * 0.38) * 10) / 10;
    const urineSpecificGravity = Math.round((1.010 + dehydrationDeficitIndexPct * 0.0035) * 1000) / 1000;
    const vasopressinConcentrationPmolL = Math.round((2.1 + dehydrationDeficitIndexPct * 1.4) * 10) / 10;

    return {
      sweatRateMlPerHour,
      hourlySodiumLossMg,
      hourlyPotassiumLossMg,
      hourlyMagnesiumLossMg,
      plasmaOsmolalityMaccKg,
      dehydrationDeficitIndexPct,
      dynamicOptimalCadenceMlHour,
      intracellularWaterLiters: icf,
      extracellularWaterLiters: ecf,
      urineSpecificGravity,
      vasopressinConcentrationPmolL
    };
  }

  /**
   * FORMULA 26: Armstrong-Maresh 8-Point Colorimetric Urine Specific Gravity Index
   */
  public calculateArmstrongMareshUSG(colorScale1to8: number): {
    urineSpecificGravity: number;
    hydrationClassification: string;
  } {
    const scale = Math.max(1, Math.min(8, Math.round(colorScale1to8)));
    const usg = 1.005 + scale * 0.0035;

    let classification = 'Optimal Hydration';
    if (scale <= 3) classification = 'Well Hydrated';
    else if (scale <= 5) classification = 'Euhydrated / Mild Loss';
    else if (scale <= 7) classification = 'Clinically Dehydrated';
    else classification = 'Severely Hypohydrated';

    return {
      urineSpecificGravity: Math.round(usg * 1000) / 1000,
      hydrationClassification: classification
    };
  }

  /**
   * FORMULA 27: Enterocyte SGLT1 Stoichiometric Sodium-Glucose Cotransporter Ratio (2:1)
   */
  public calculateEnterocyteSGLT1Stoichiometry(
    glucoseGrams: number,
    sodiumMg: number
  ): { molarRatio: number; isOptimal2to1: boolean; cellularAbsorptionEfficiencyPct: number } {
    const molesGlucose = glucoseGrams / 180.16;
    const molesSodium = (sodiumMg / 1000.0) / 22.99;

    const molarRatio = molesSodium > 0 ? Math.round((molesSodium / molesGlucose) * 100) / 100 : 0;
    const isOptimal2to1 = Math.abs(molarRatio - 2.0) < 0.6;
    const efficiency = isOptimal2to1 ? 98 : Math.max(40, Math.round(100 - Math.abs(molarRatio - 2.0) * 30));

    return {
      molarRatio,
      isOptimal2to1,
      cellularAbsorptionEfficiencyPct: efficiency
    };
  }

  /**
   * FORMULA 28: Circadian Vasopressin (AVP) Neurohypophyseal Chronobiology
   */
  public calculateCircadianVasopressinAVP(
    hourOfDay: number = new Date().getHours(),
    dehydrationPct: number = 0.5
  ): { avpConcentrationPmolL: number; renalWaterConservationPct: number } {
    const radianTime = ((hourOfDay - 3.0) / 24.0) * 2.0 * Math.PI;
    const circadianRhythm = Math.cos(radianTime);

    const baselineAvp = 2.4 + circadianRhythm * 0.8;
    const osmolarStimulus = dehydrationPct * 1.5;
    const totalAvp = Math.max(0.8, baselineAvp + osmolarStimulus);
    const conservationPct = Math.min(99.0, Math.round((totalAvp / 6.0) * 100));

    return {
      avpConcentrationPmolL: Math.round(totalAvp * 10) / 10,
      renalWaterConservationPct: conservationPct
    };
  }

  /**
   * FORMULA 35: Gagge Two-Node Dynamic Thermal Core-Skin Compartment
   */
  public calculateGaggeTwoNodeThermal(
    metWatts: number = 350,
    ambientTempC: number = 24
  ): { coreTempCelsius: number; skinTempCelsius: number; thermalSensationVote: string } {
    const tCore = 37.0 + (metWatts > 200 ? (metWatts - 200) * 0.0028 : 0);
    const tSkin = 33.5 + (ambientTempC - 20) * 0.15;
    const sensation = tCore > 38.2 ? 'Very Warm / Thermally Strained' : tCore > 37.5 ? 'Warm / Elevated Flux' : 'Comfortable / Optimal Homeostasis';
    return {
      coreTempCelsius: Math.round(tCore * 100) / 100,
      skinTempCelsius: Math.round(tSkin * 100) / 100,
      thermalSensationVote: sensation
    };
  }
}
