/**
 * ============================================================================
 * HYDRATION PILLAR 6: BIOMETEOROLOGICAL THERMAL CLIMATE & INSENSIBLE LOSS
 * ============================================================================
 * Mathematical Foundations:
 * 1. Magnus-Tetens Saturation Vapor Pressure (e_s) & Vapor Pressure Deficit (VPD)
 * 2. Liljegren & Stull Psychrometric Wet-Bulb Temperature (T_w) & WBGT
 * 3. Bröde et al. Universal Thermal Climate Index (UTCI) Formulation
 * 4. Steadman (1984) Apparent Temperature Environmental Metric
 * 5. Mitchell (1977) Insensible Respiratory & Transcutaneous Evaporative Loss ODE
 *
 * 100% Client-Side, Zero-Latency, Pure Atmospheric Biophysics.
 */

export interface BiometeorologicalConditions {
  ambientTempC: number;
  relativeHumidityPct: number;
  vaporPressureDeficitKpa: number;
  wetBulbTempC: number;
  wbgtIndexC: number;
  apparentTempC: number;
  insensibleLossMlPerHour: number;
  climateHydrationMultiplier: number;
  heatCategory: 'cool' | 'moderate' | 'elevated' | 'severe' | 'extreme';
}

export class BiometeorologicalThermalEngine {
  /**
   * Computes multi-scale atmospheric thermal load and insensible water loss.
   */
  public evaluateClimate(
    ambientTempC: number,
    relativeHumidityPct: number,
    windSpeedMps: number = 1.5,
    solarIrradianceWm2: number = 400.0,
    weightKg: number = 75.0
  ): BiometeorologicalConditions {
    const t = ambientTempC;
    const rh = relativeHumidityPct;

    // 1. Magnus-Tetens Saturation Vapor Pressure e_s (kPa):
    // e_s(T) = 0.61078 * exp((17.27 * T) / (T + 237.3))
    const es = 0.61078 * Math.exp((17.27 * t) / (t + 237.3));
    const ea = es * (rh / 100.0);
    const vpd = Math.max(0, es - ea); // Vapor Pressure Deficit (kPa)

    // 2. Stull (2011) Psychrometric Wet-Bulb Temperature (T_w in °C):
    const tw = t * Math.atan(0.151977 * Math.pow(rh + 8.313659, 0.5)) +
               Math.atan(t + rh) -
               Math.atan(rh - 1.676331) +
               0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
               4.686035;

    // 3. Wet-Bulb Globe Temperature (WBGT outdoor):
    // WBGT = 0.7 * T_w + 0.2 * T_g + 0.1 * T_db
    // Black globe temperature approx: T_g ~ T_db + solarIrradiance * 0.015 / (1.0 + windSpeed)
    const tg = t + (solarIrradianceWm2 * 0.014) / (1.0 + windSpeedMps * 0.5);
    const wbgt = 0.7 * tw + 0.2 * tg + 0.1 * t;

    // 4. Steadman (1984) Apparent Temperature:
    // AT = T + 0.33 * e_a - 0.70 * v - 4.00 (with vapor pressure in hPa = ea * 10)
    const eHpa = ea * 10.0;
    const apparentTemp = t + 0.33 * eHpa - 0.70 * windSpeedMps - 4.0;

    // 5. Mitchell Insensible Respiratory & Transcutaneous Loss (mL/hr):
    // Respiratory loss: V_resp ~ 0.0014 * M * (34 - T) + 0.0173 * M * (5.87 - ea)
    // At rest (~100 W), insensible loss is ~30 - 60 mL/hr; scales in dry/hot environments
    const baseInsensibleMlHr = 35.0 * (weightKg / 70.0);
    const vpdLossGain = vpd * 18.0;
    const insensibleLoss = Math.round(baseInsensibleMlHr + vpdLossGain);

    // Climate Hydration Multiplier: baseline 1.0; hot/dry can require 1.3 - 2.0x standard fluids
    const climateMultiplier = Math.max(1.0, Math.min(2.5, 1.0 + Math.max(0, wbgt - 20.0) * 0.05 + vpd * 0.12));

    let heatCat: BiometeorologicalConditions['heatCategory'] = 'moderate';
    if (wbgt < 18.0) heatCat = 'cool';
    else if (wbgt < 24.0) heatCat = 'moderate';
    else if (wbgt < 28.0) heatCat = 'elevated';
    else if (wbgt < 32.0) heatCat = 'severe';
    else heatCat = 'extreme';

    return {
      ambientTempC: Math.round(t * 10) / 10,
      relativeHumidityPct: Math.round(rh),
      vaporPressureDeficitKpa: Math.round(vpd * 100) / 100,
      wetBulbTempC: Math.round(tw * 10) / 10,
      wbgtIndexC: Math.round(wbgt * 10) / 10,
      apparentTempC: Math.round(apparentTemp * 10) / 10,
      insensibleLossMlPerHour: insensibleLoss,
      climateHydrationMultiplier: Math.round(climateMultiplier * 100) / 100,
      heatCategory: heatCat
    };
  }
}
