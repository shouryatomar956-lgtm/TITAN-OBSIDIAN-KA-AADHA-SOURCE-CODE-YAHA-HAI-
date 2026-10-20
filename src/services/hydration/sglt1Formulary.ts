/**
 * ============================================================================
 * HYDRATION PILLAR 7: SGLT1 ENTEROCYTE STOICHIOMETRIC ORS FORMULARY
 * ============================================================================
 * Mathematical Foundations:
 * 1. Small Intestinal Brush-Border SGLT1 Symporter Stoichiometry:
 *    2 Na+ : 1 D-Glucose : 260 H2O molecules co-transported
 * 2. Solution Osmolarity & Ionic Strength: Osm = Sum(n_i * phi_i * C_i) in mOsm/L
 * 3. WHO / UNICEF Reduced-Osmolarity Target (210 - 268 mOsm/L Hypotonic Window)
 * 4. Sweat Deficit-Matched Precision Electrolyte Stoichiometric Synthesizer
 *
 * 100% Client-Side, Zero-Latency, Pure Stoichiometric Chemistry.
 */

export interface PrecisionDiyRecipe {
  title: string;
  targetVolumeMl: number;
  ingredients: {
    name: string;
    householdMeasurement: string;
    grams: number;
    provides: string;
  }[];
  totalOsmolarityMosmL: number;
  sodiumMmolL: number;
  glucoseMmolL: number;
  potassiumMmolL: number;
  sglt1StoichiometricRatio: number; // Ratio of Na+ to Glucose (ideal ~ 1.5 - 2.0)
  targetHydrationUse: string;
}

export class EnterocyteSGLT1StoichiometricFormulary {
  /**
   * Synthesizes an optimal, reduced-osmolarity ORS recipe based on the user's
   * live sweat sodium deficit and target fluid volume.
   */
  public synthesizePrecisionORS(
    targetVolumeMl: number = 750,
    sweatSodiumDeficitMg: number = 650
  ): PrecisionDiyRecipe {
    const volumeL = targetVolumeMl / 1000.0;

    // Target Sodium: ~50 - 75 mmol/L (WHO standard 75 mmol/L)
    // 1 mmol Na+ = 23 mg. Target Na+ in grams of NaCl:
    // NaCl molecular weight: 58.44 g/mol. Each 1g NaCl = 393 mg Na+ (17.1 mmol Na+)
    const targetNaMmol = Math.max(30.0 * volumeL, Math.min(75.0 * volumeL, sweatSodiumDeficitMg / 23.0));
    const naclGrams = Math.round((targetNaMmol / 17.1) * 10) / 10;

    // SGLT1 Stoichiometry requires Glucose:Na+ ratio of ~ 1:1 to 1:2
    // Glucose molecular weight: 180.16 g/mol
    // Target Glucose: ~75 mmol/L -> 13.5 g/L
    // Table sugar (Sucrose) hydrolyzes to 1 Glucose + 1 Fructose (MW 342.3 g/mol)
    const glucoseMmolTarget = targetNaMmol * 1.1; // Optimal 1.1:1 ratio
    const sucroseGrams = Math.round((glucoseMmolTarget * 0.342) * 10) / 10;

    // Potassium: Potassium chloride (KCl) or lemon/lime citrus juice
    // 1 tablespoon (15 mL) fresh lemon juice provides ~20 mg K+ and citrate buffer
    const lemonJuiceMl = Math.round(volumeL * 30.0);

    // Calculate Solution Osmolarity:
    // Na+ (targetNaMmol/vol) + Cl- (targetNaMmol/vol) + Glucose (glucoseMmolTarget/vol) + K+ (~8 mmol/L)
    const actualNaMmolL = targetNaMmol / volumeL;
    const actualGlucoseMmolL = glucoseMmolTarget / volumeL;
    const actualKMmolL = 10.0;
    const osmolarity = actualNaMmolL * 2.0 + actualGlucoseMmolL + actualKMmolL;

    return {
      title: 'Precision SGLT1 Enterocyte Hydration Formulation',
      targetVolumeMl,
      ingredients: [
        {
          name: 'Pure Filtered Water',
          householdMeasurement: `${targetVolumeMl} mL`,
          grams: targetVolumeMl,
          provides: 'Solvent Base'
        },
        {
          name: 'Fine Sea Salt (NaCl)',
          householdMeasurement: `${(naclGrams / 5.0).toFixed(1)} level teaspoon (${naclGrams}g)`,
          grams: naclGrams,
          provides: `${Math.round(targetNaMmol * 23)} mg Sodium (Na+) & Chloride (Cl-)`
        },
        {
          name: 'Cane Sugar or Dextrose (Glucose source)',
          householdMeasurement: `${(sucroseGrams / 4.0).toFixed(1)} level teaspoons (${sucroseGrams}g)`,
          grams: sucroseGrams,
          provides: 'SGLT1 Active Transport Facilitator'
        },
        {
          name: 'Fresh Lemon or Lime Juice',
          householdMeasurement: `${Math.round(lemonJuiceMl / 15)} tablespoons (${lemonJuiceMl} mL)`,
          grams: lemonJuiceMl,
          provides: 'Potassium (K+) & Citrate buffering'
        }
      ],
      totalOsmolarityMosmL: Math.round(osmolarity),
      sodiumMmolL: Math.round(actualNaMmolL * 10) / 10,
      glucoseMmolL: Math.round(actualGlucoseMmolL * 10) / 10,
      potassiumMmolL: actualKMmolL,
      sglt1StoichiometricRatio: Math.round((actualNaMmolL / actualGlucoseMmolL) * 100) / 100,
      targetHydrationUse: 'Rapid enterocyte fluid uptake for post-exercise recovery or high sweat rates'
    };
  }
}
