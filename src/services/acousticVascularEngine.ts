/**
 * Acoustic & Vascular Biometric Engine
 * Powered by Web Workers Pool + Comlink + RxDB + localforage
 */

import localforage from 'localforage';
import * as Comlink from 'comlink';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import { getRxDBProxy } from '../utils/rxdbManager';
import {
  AcousticAnalysisOutput,
  VascularBmrInput,
  VascularBmrOutput
} from '../workers/acousticVascular.worker';

export type { AcousticAnalysisOutput, VascularBmrInput, VascularBmrOutput };

export interface AcousticScanRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  bpm: number;
  lubDubPhase: string;
  pulseWaveVelocityMps: number;
  arterialElasticityScore: number;
  arterialFlexibilityCategory: string;
  stressModePercent: number;
  relaxationModePercent: number;
  autonomicState: string;
}

export interface VascularBmrScanRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  systolicPressureMmHg: number;
  diastolicPressureMmHg: number;
  bloodPressureCategory: string;
  dynamicBmrKcalDay: number;
  hourlyRestBurnKcal: number;
  circulatoryFatiguePercent: number;
  workoutReadinessScore: number;
  readinessFeedback: string;
}

const STORAGE_ACOUSTIC_HISTORY = 'pulsefit_acoustic_records';
const STORAGE_VASCULAR_BMR_HISTORY = 'pulsefit_vascular_bmr_records';

class AcousticVascularEngine {
  private pool: WorkStealingWorkerPool<any> | null = null;
  private workerProxy: any = null;

  constructor() {
    this.initWorker();
  }

  private initWorker() {
    if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
      try {
        this.pool = new WorkStealingWorkerPool(
          () => new Worker(new URL('../workers/acousticVascular.worker.ts', import.meta.url), { type: 'module' }),
          2
        );
        this.workerProxy = this.pool.getWorker();
      } catch (err) {
        console.warn('[AcousticVascularEngine] Worker pool notice:', err);
      }
    }
  }

  public async analyzeAcousticWindow(
    timeDomainSamples: Float32Array,
    frequencySpectrum: Uint8Array,
    sampleRate: number,
    currentTimeMs: number
  ): Promise<AcousticAnalysisOutput> {
    if (this.workerProxy && this.workerProxy.analyzeAcousticWindow) {
      try {
        return await this.workerProxy.analyzeAcousticWindow(
          timeDomainSamples,
          frequencySpectrum,
          sampleRate,
          currentTimeMs
        );
      } catch (e) {
        console.warn('[AcousticVascularEngine] RPC acoustic window warning:', e);
      }
    }

    return {
      bpm: 0,
      s1Detected: false,
      s2Detected: false,
      lubDubPhase: 'Silence',
      valveStatus: 'Awaiting Audio Signal',
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

  public async analyzeVascularBmrProfile(input: VascularBmrInput): Promise<VascularBmrOutput> {
    if (this.workerProxy && this.workerProxy.analyzeVascularBmrProfile) {
      try {
        return await this.workerProxy.analyzeVascularBmrProfile(input);
      } catch (e) {
        console.warn('[AcousticVascularEngine] RPC vascular BMR warning:', e);
      }
    }

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
      readinessFeedback: 'Kripya camera start karein',
      perfusionStatus: 'No Perfusion Detected'
    };
  }

  // LocalForage & RxDB synchronization
  public async saveAcousticScan(record: AcousticScanRecord): Promise<void> {
    try {
      const history = (await localforage.getItem<AcousticScanRecord[]>(STORAGE_ACOUSTIC_HISTORY)) || [];
      const updated = [record, ...history.slice(0, 24)];
      await localforage.setItem(STORAGE_ACOUSTIC_HISTORY, updated);

      const rxdb = await getRxDBProxy();
      if (rxdb && rxdb.saveUserProfile) {
        try {
          const profile = await rxdb.getUserProfile();
          if (profile) {
            profile.latestAcousticBpm = record.bpm;
            profile.latestPulseWaveVelocity = record.pulseWaveVelocityMps;
            await rxdb.saveUserProfile(profile);
          }
        } catch (rxErr) {}
      }
    } catch (e) {
      console.warn('[AcousticVascularEngine] Save acoustic record warning:', e);
    }
  }

  public async getAcousticHistory(): Promise<AcousticScanRecord[]> {
    try {
      const history = await localforage.getItem<AcousticScanRecord[]>(STORAGE_ACOUSTIC_HISTORY);
      return history || [];
    } catch {
      return [];
    }
  }

  public async saveVascularBmrScan(record: VascularBmrScanRecord): Promise<void> {
    try {
      const history = (await localforage.getItem<VascularBmrScanRecord[]>(STORAGE_VASCULAR_BMR_HISTORY)) || [];
      const updated = [record, ...history.slice(0, 24)];
      await localforage.setItem(STORAGE_VASCULAR_BMR_HISTORY, updated);

      const rxdb = await getRxDBProxy();
      if (rxdb && rxdb.saveUserProfile) {
        try {
          const profile = await rxdb.getUserProfile();
          if (profile) {
            profile.latestSystolicBp = record.systolicPressureMmHg;
            profile.latestDynamicBmr = record.dynamicBmrKcalDay;
            await rxdb.saveUserProfile(profile);
          }
        } catch (rxErr) {}
      }
    } catch (e) {
      console.warn('[AcousticVascularEngine] Save vascular BMR record warning:', e);
    }
  }

  public async getVascularBmrHistory(): Promise<VascularBmrScanRecord[]> {
    try {
      const history = await localforage.getItem<VascularBmrScanRecord[]>(STORAGE_VASCULAR_BMR_HISTORY);
      return history || [];
    } catch {
      return [];
    }
  }
}

export const acousticVascularEngine = new AcousticVascularEngine();
