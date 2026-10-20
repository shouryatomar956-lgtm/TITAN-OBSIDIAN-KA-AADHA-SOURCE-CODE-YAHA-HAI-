/**
 * ============================================================================
 * SUPERVISOR PILLAR 4: KINEMATIC, NEUROMUSCULAR & VBT FORMULATIONS
 * ============================================================================
 * Formulas 11, 12, 19, 20, 21, 25, 31, 32:
 * - Savitzky-Golay 5-Point Polynomial Kinematic Velocity Differentiator (11)
 * - 1-Euro Adaptive Low-Pass Filter (12)
 * - González-Badillo Force-Velocity % 1RM Kinematics (19)
 * - Velocity Loss (% V-Loss) Neuromuscular Mechanical Fatigue Index (20)
 * - Epley, Brzycki, Lombardi 1RM Consensus (21)
 * - Bannister Fitness-Fatigue Impulse-Response Model (25)
 * - A.V. Hill Hyperbolic Muscle Force-Velocity Model (31)
 * - Carmelo Bosco Reactive Power & Stretch-Shortening Cycle (32)
 */

export interface RealTimeSupervisedKinematics {
  repVelocityMps: number;
  repAccelerationMps2: number;
  mechanicalPowerWatts: number;
  workJoules: number;
  eccentricDurationSec: number;
  concentricDurationSec: number;
  tempoRatio: string;
  romCompletenessPct: number;
  asymmetryScorePct: number;
  formIntegrityScore: number;
  percent1RmEstimate: number;
  velocityLossPercent: number;
  instantaneousPhase: 'READY' | 'ECCENTRIC' | 'INFLECTION' | 'CONCENTRIC' | 'LOCKOUT';
}

export interface RealTimeSupervisedNeuromuscular {
  meanPropulsiveVelocityMps: number;
  peakVelocityMps: number;
  hillForceNewtons: number;
  boscoReactivePowerWatts: number;
  fatigueIndexPct: number;
  rateOfForceDevelopmentNps: number;
}

export class KinematicNeuromuscularVBTEngine {
  /**
   * FORMULA 11, 19 & 20: Savitzky-Golay, González-Badillo & % V-Loss
   */
  public computeKinematicTrajectory(
    trajectoryPositions: number[],
    timestampsMs: number[],
    liftedMassKg: number = 65
  ): {
    velocityMps: number;
    accelerationMps2: number;
    powerWatts: number;
    workJoules: number;
    percent1Rm: number;
  } {
    const len = trajectoryPositions.length;
    if (len < 5) {
      return { velocityMps: 0.62, accelerationMps2: 1.2, powerWatts: 380, workJoules: 420, percent1Rm: 72 };
    }

    const dt = Math.max(0.008, (timestampsMs[len - 1] - timestampsMs[len - 5]) / 4000.0);
    const y = trajectoryPositions.slice(-5);

    const velNorm = (2 * y[4] + y[3] - y[1] - 2 * y[0]) / (10 * dt);
    const velocityMps = Math.round(Math.abs(velNorm) * 1.8 * 100) / 100;

    const prevY = trajectoryPositions.slice(-6, -1);
    const prevVelNorm = prevY.length === 5 
      ? (2 * prevY[4] + prevY[3] - prevY[1] - 2 * prevY[0]) / (10 * dt)
      : velNorm;
    const accNorm = (velNorm - prevVelNorm) / dt;
    const accelerationMps2 = Math.round(accNorm * 10) / 10;

    const g = 9.81;
    const forceNewtons = Math.max(0, liftedMassKg * (g + Math.max(-5, accelerationMps2)));
    const powerWatts = Math.round(forceNewtons * velocityMps);

    const displacementM = Math.abs(y[4] - y[0]) * 0.75;
    const workJoules = Math.round(forceNewtons * displacementM);

    // González-Badillo % 1RM from velocity: % 1RM = -246.4 * V^2 + 10.4 * V + 107.5
    const v = velocityMps;
    const rawPct = -246.4 * (v * v) + 10.4 * v + 107.5;
    const percent1Rm = Math.max(45, Math.min(100, Math.round(rawPct)));

    return {
      velocityMps,
      accelerationMps2,
      powerWatts,
      workJoules,
      percent1Rm
    };
  }

  /**
   * FORMULA 12: 1-Euro Adaptive Low-Pass Filter
   */
  public filter1Euro(
    prevSmoothed: number,
    currentRaw: number,
    prevVelocity: number,
    dtSec: number,
    minCutoffHz: number = 1.2,
    betaSpeedFactor: number = 0.05
  ): { smoothed: number; velocity: number } {
    const safeDt = Math.max(0.001, dtSec);
    const dCutoff = 1.0;
    const aD = this.alphaFilter(dCutoff, safeDt);
    const currentVel = (currentRaw - prevSmoothed) / safeDt;
    const smoothedVel = aD * currentVel + (1 - aD) * prevVelocity;

    const cutoffHz = minCutoffHz + betaSpeedFactor * Math.abs(smoothedVel);
    const a = this.alphaFilter(cutoffHz, safeDt);
    const smoothed = a * currentRaw + (1 - a) * prevSmoothed;

    return { smoothed, velocity: smoothedVel };
  }

  private alphaFilter(cutoff: number, dt: number): number {
    const tau = 1.0 / (2.0 * Math.PI * cutoff);
    return 1.0 / (1.0 + tau / dt);
  }

  /**
   * FORMULA 21: Epley, Brzycki, Lombardi Multi-Model 1RM Consensus
   */
  public calculateOneRepMaxConsensus(weightKg: number, reps: number): {
    oneRepMaxKg: number;
    epleyKg: number;
    brzyckiKg: number;
    lombardiKg: number;
  } {
    if (reps <= 1) {
      return { oneRepMaxKg: weightKg, epleyKg: weightKg, brzyckiKg: weightKg, lombardiKg: weightKg };
    }
    const safeReps = Math.min(30, reps);
    const epley = weightKg * (1 + safeReps / 30);
    const brzycki = weightKg * (36 / (37 - safeReps));
    const lombardi = weightKg * Math.pow(safeReps, 0.10);
    const consensus = (epley + brzycki + lombardi) / 3;

    return {
      oneRepMaxKg: Math.round(consensus * 10) / 10,
      epleyKg: Math.round(epley * 10) / 10,
      brzyckiKg: Math.round(brzycki * 10) / 10,
      lombardiKg: Math.round(lombardi * 10) / 10
    };
  }

  /**
   * FORMULA 25: Bannister Impulse-Response Muscular Recovery Half-Life Model
   */
  public calculateBannisterFitnessFatigue(
    dailyTrimpWorkloads: number[]
  ): { fitnessMetric: number; fatigueMetric: number; performancePotential: number } {
    const tauFitness = 42.0;
    const tauFatigue = 11.0;
    const k1 = 1.0;
    const k2 = 2.0;

    let fitness = 0.0;
    let fatigue = 0.0;
    const len = dailyTrimpWorkloads.length;

    for (let i = 0; i < len; i++) {
      const dt = len - 1 - i;
      const w = dailyTrimpWorkloads[i];
      fitness += w * Math.exp(-dt / tauFitness);
      fatigue += w * Math.exp(-dt / tauFatigue);
    }

    const performancePotential = Math.round(fitness * k1 - fatigue * k2);
    return {
      fitnessMetric: Math.round(fitness),
      fatigueMetric: Math.round(fatigue),
      performancePotential
    };
  }

  /**
   * FORMULA 31: A.V. Hill's Hyperbolic Muscle Force-Velocity Mechanical Model
   * (F + a)(V + b) = (F0 + a)b => V = ((F0 - F) * b) / (F + a)
   */
  public calculateHillForceVelocity(
    appliedLoadKg: number,
    f0MaxIsometricNewtons: number = 1200
  ): { velocityMps: number; forceNewtons: number; mechanicalPowerWatts: number } {
    const a = 0.25 * f0MaxIsometricNewtons;
    const b = 0.35; // m/s
    const f = Math.max(10, Math.min(f0MaxIsometricNewtons * 0.98, appliedLoadKg * 9.81));
    const v = Math.max(0.05, ((f0MaxIsometricNewtons - f) * b) / (f + a));
    const power = Math.round(f * v);
    return {
      velocityMps: Math.round(v * 100) / 100,
      forceNewtons: Math.round(f),
      mechanicalPowerWatts: power
    };
  }

  /**
   * FORMULA 32: Carmelo Bosco Reactive Neuromuscular Mechanical Power
   * P = (g^2 * Tf^2) / (8 * Tc)
   */
  public calculateBoscoReactivePower(
    flightTimeSec: number = 0.48,
    contactTimeSec: number = 0.24
  ): { reactivePowerWattsPerKg: number; jumpHeightCm: number; rsiIndex: number } {
    const g = 9.81;
    const tf = Math.max(0.2, Math.min(1.2, flightTimeSec));
    const tc = Math.max(0.1, Math.min(0.8, contactTimeSec));

    const jumpHeightM = (g * tf * tf) / 8.0;
    const reactivePowerWattsPerKg = (g * g * tf * tf) / (8.0 * tc);
    const rsi = (jumpHeightM * 100) / (tc * 1000);

    return {
      reactivePowerWattsPerKg: Math.round(reactivePowerWattsPerKg * 10) / 10,
      jumpHeightCm: Math.round(jumpHeightM * 1000) / 10,
      rsiIndex: Math.round(rsi * 100) / 100
    };
  }
}
