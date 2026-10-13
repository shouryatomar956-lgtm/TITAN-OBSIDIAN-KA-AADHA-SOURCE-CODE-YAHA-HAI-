import { wrap, Remote } from 'comlink';
import localforage from 'localforage';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';
import { AcousticAnalysisOutput, VascularBmrInput, VascularBmrOutput } from '../workers/acousticVascular.worker';
import { getRxDBProxy } from '../utils/rxdbManager';

export interface AcousticSessionRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  bpm: number;
  pwvMps: number;
  elasticityScore: number;
  stressModePercent: number;
  relaxationModePercent: number;
  autonomicState: string;
  flexibilityCategory: string;
}

export interface VascularBmrSessionRecord {
  id: string;
  timestamp: number;
  dateStr: string;
  systolic: number;
  diastolic: number;
  map: number;
  bpCategory: string;
  dynamicBmrKcal: number;
  hourlyBurnKcal: number;
  readinessScore: number;
  fatiguePercent: number;
  readinessFeedback: string;
}

const STORAGE_ACOUSTIC_HISTORY = 'pulsefit_acoustic_history';
const STORAGE_VASCULAR_BMR_HISTORY = 'pulsefit_vascular_bmr_history';

class AcousticVascularService {
  private pool: WorkStealingWorkerPool<any> | null = null;

  private getPool() {
    if (typeof window === 'undefined') return null;
    if (!this.pool) {
      this.pool = new WorkStealingWorkerPool(
        () => new Worker(new URL('../workers/acousticVascular.worker.ts', import.meta.url), { type: 'module' }),
        2
      );
    }
    return this.pool;
  }

  public async analyzeAcousticWindow(
    timeDomain: Float32Array,
    spectrum: Uint8Array,
    sampleRate: number,
    currentTimeMs: number
  ): Promise<AcousticAnalysisOutput | null> {
    const pool = this.getPool();
    if (!pool) return null;
    try {
      const worker = pool.getWorker();
      return await worker.analyzeAcousticWindow(timeDomain, spectrum, sampleRate, currentTimeMs);
    } catch (e) {
      console.error('[AcousticVascularService] Error analyzing acoustic window:', e);
      return null;
    }
  }

  public async analyzeVascularBmrProfile(
    input: VascularBmrInput
  ): Promise<VascularBmrOutput | null> {
    const pool = this.getPool();
    if (!pool) return null;
    try {
      const worker = pool.getWorker();
      return await worker.analyzeVascularBmrProfile(input);
    } catch (e) {
      console.error('[AcousticVascularService] Error analyzing vascular BMR:', e);
      return null;
    }
  }

  // --- LocalForage + RxDB Storage Integration ---

  public async saveAcousticRecord(record: AcousticSessionRecord): Promise<void> {
    try {
      const history = (await localforage.getItem<AcousticSessionRecord[]>(STORAGE_ACOUSTIC_HISTORY)) || [];
      const updated = [record, ...history].slice(0, 50);
      await localforage.setItem(STORAGE_ACOUSTIC_HISTORY, updated);

      // Notify RxDB
      try {
        const rxProxy = await getRxDBProxy();
        if (rxProxy && typeof rxProxy.mutateState === 'function') {
          await rxProxy.mutateState((state: any) => {
            if (!state.acousticRecords) state.acousticRecords = [];
            state.acousticRecords = [record, ...state.acousticRecords].slice(0, 50);
          });
        }
      } catch {}
    } catch (err) {
      console.warn('[AcousticVascularService] Failed to save acoustic record:', err);
    }
  }

  public async getAcousticHistory(): Promise<AcousticSessionRecord[]> {
    try {
      return (await localforage.getItem<AcousticSessionRecord[]>(STORAGE_ACOUSTIC_HISTORY)) || [];
    } catch {
      return [];
    }
  }

  public async saveVascularBmrRecord(record: VascularBmrSessionRecord): Promise<void> {
    try {
      const history = (await localforage.getItem<VascularBmrSessionRecord[]>(STORAGE_VASCULAR_BMR_HISTORY)) || [];
      const updated = [record, ...history].slice(0, 50);
      await localforage.setItem(STORAGE_VASCULAR_BMR_HISTORY, updated);

      // Notify RxDB
      try {
        const rxProxy = await getRxDBProxy();
        if (rxProxy && typeof rxProxy.mutateState === 'function') {
          await rxProxy.mutateState((state: any) => {
            if (!state.vascularBmrRecords) state.vascularBmrRecords = [];
            state.vascularBmrRecords = [record, ...state.vascularBmrRecords].slice(0, 50);
          });
        }
      } catch {}
    } catch (err) {
      console.warn('[AcousticVascularService] Failed to save vascular BMR record:', err);
    }
  }

  public async getVascularBmrHistory(): Promise<VascularBmrSessionRecord[]> {
    try {
      return (await localforage.getItem<VascularBmrSessionRecord[]>(STORAGE_VASCULAR_BMR_HISTORY)) || [];
    } catch {
      return [];
    }
  }
}

export const acousticVascularService = new AcousticVascularService();
