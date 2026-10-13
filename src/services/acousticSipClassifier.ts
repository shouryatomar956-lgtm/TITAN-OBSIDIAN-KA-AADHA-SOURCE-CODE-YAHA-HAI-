/**
 * In-Browser Acoustic Sip Counter Engine (Web Audio API)
 * 
 * Uses client-side audio DSP to classify swallowing / gulping sound signatures
 * in real time without transmitting any audio outside the browser sandbox.
 * Detects resonant gulp transients (250 Hz - 750 Hz) and acoustic clicks.
 */

import localforage from 'localforage';

export interface SipEvent {
  timestamp: number;
  estimatedVolumeMl: number;
  confidence: number;
}

export interface AcousticSipSessionStats {
  totalSips: number;
  totalVolumeMl: number;
  averageGulpSizeMl: number;
  lastSipTimestamp: number | null;
}

const STORAGE_SIP_SESSION = 'pulsefit_acoustic_sip_session';

export class AcousticSipClassifier {
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private micStream: MediaStream | null = null;
  private animFrameId: number | null = null;

  private isRunning: boolean = false;
  private lastSipTime: number = 0;
  private minIntervalBetweenSipsMs: number = 1100; // Refractory period
  private energyThreshold: number = 32;           // Dynamic acoustic threshold
  private ambientNoiseFloor: number = 12;
  private prevSpectrum: Float32Array = new Float32Array(256);
  private energyHistory: [number, number] = [0, 0];

  private totalSips: number = 0;
  private totalVolumeMl: number = 0;
  private listeners: Set<(stats: AcousticSipSessionStats, isNewSip: boolean) => void> = new Set();
  private audioLevelListeners: Set<(energy: number) => void> = new Set();

  constructor() {
    this.restoreSession();
  }

  private async restoreSession() {
    try {
      const stored = await localforage.getItem<AcousticSipSessionStats>(STORAGE_SIP_SESSION);
      if (stored) {
        this.totalSips = stored.totalSips || 0;
        this.totalVolumeMl = stored.totalVolumeMl || 0;
        this.lastSipTime = stored.lastSipTimestamp || 0;
        this.notifyListeners(false);
      }
    } catch {}
  }

  private async persistSession() {
    try {
      const stats: AcousticSipSessionStats = {
        totalSips: this.totalSips,
        totalVolumeMl: this.totalVolumeMl,
        averageGulpSizeMl: this.totalSips > 0 ? Math.round(this.totalVolumeMl / this.totalSips) : 28,
        lastSipTimestamp: this.lastSipTime
      };
      await localforage.setItem(STORAGE_SIP_SESSION, stats);

      // Sync into main water intake log in localforage
      const currentIntake = (await localforage.getItem<number>('pulsefit_water_intake')) || 0;
      await localforage.setItem('pulsefit_water_intake', currentIntake + 28);
    } catch {}
  }

  public async startListening(): Promise<boolean> {
    if (this.isRunning) return true;
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      return false;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false, // Keep swallowing audio profile intact
          autoGainControl: true
        },
        video: false
      });

      this.micStream = stream;
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioContextClass();

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      const source = this.audioCtx.createMediaStreamSource(stream);

      // 1. Bandpass filter isolating resonant gulping frequencies (300 Hz - 900 Hz)
      const bandpass = this.audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(550, this.audioCtx.currentTime);
      bandpass.Q.setValueAtTime(1.8, this.audioCtx.currentTime);

      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.65;

      source.connect(bandpass);
      bandpass.connect(this.analyser);

      this.isRunning = true;
      this.pollAudioFrames();
      return true;
    } catch (err) {
      console.warn('[AcousticSipClassifier] Mic access notice:', err);
      return false;
    }
  }

  private pollAudioFrames = () => {
    if (!this.isRunning || !this.analyser) return;

    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);

    // 1. Multi-Band Spectral Partitioning:
    // Pharyngeal swallow / bolus transit band: 300 Hz - 950 Hz (bins 4 to 12 at 44.1kHz / 512 FFT)
    // Vocal / sibilant speech artifact band: 1600 Hz - 4200 Hz (bins 18 to 48)
    let gulpBandSum = 0;
    let weightedFreqSum = 0;
    let spectralFlux = 0;
    const startBin = 4;
    const endBin = 38;

    for (let i = startBin; i <= endBin; i++) {
      const mag = buffer[i];
      gulpBandSum += mag;
      weightedFreqSum += i * mag;
      const diff = mag - (this.prevSpectrum[i] || 0);
      if (diff > 0) spectralFlux += diff;
      this.prevSpectrum[i] = mag;
    }

    let highFreqSpeechSum = 0;
    for (let i = 42; i < Math.min(96, buffer.length); i++) {
      highFreqSpeechSum += buffer[i];
    }
    const highFreqAvg = highFreqSpeechSum / 54;

    const avgEnergy = gulpBandSum / (endBin - startBin + 1);
    const spectralCentroidBin = gulpBandSum > 0 ? weightedFreqSum / gulpBandSum : 16;

    // 2. Discrete Teager-Kaiser Energy Operator (TKEO) on frame envelope: Psi[E(n)] = E(n-1)^2 - E(n)*E(n-2)
    const ePrev1 = this.energyHistory[1];
    const ePrev2 = this.energyHistory[0];
    const tkeoImpulse = Math.max(0, (ePrev1 * ePrev1) - (avgEnergy * ePrev2));
    this.energyHistory[0] = ePrev1;
    this.energyHistory[1] = avgEnergy;

    // Adaptive ambient noise floor tracker
    if (avgEnergy < this.energyThreshold * 0.85) {
      this.ambientNoiseFloor = this.ambientNoiseFloor * 0.96 + avgEnergy * 0.04;
    }
    const dynamicThreshold = Math.max(this.energyThreshold, this.ambientNoiseFloor * 1.85);

    // Broadcast live energy level for UI visualizer
    this.audioLevelListeners.forEach(fn => fn(Math.min(100, Math.round(avgEnergy * 1.25))));

    // 3. Pharyngeal Deglutition Signature Classification:
    // - Strong transient in 300-950Hz band (avgEnergy > dynamicThreshold)
    // - Positive spectral flux burst or TKEO impulse
    // - Spectral centroid localized in pharyngeal cavity (bins 6..28), rejecting high-pitched speech/clicks
    const isPharyngealSignature =
      avgEnergy > dynamicThreshold &&
      (spectralFlux > 45 || tkeoImpulse > 120 || avgEnergy > dynamicThreshold * 1.15) &&
      spectralCentroidBin >= 5 &&
      spectralCentroidBin <= 32 &&
      highFreqAvg < avgEnergy * 1.35;

    const now = Date.now();
    if (isPharyngealSignature && (now - this.lastSipTime) >= this.minIntervalBetweenSipsMs) {
      this.lastSipTime = now;
      this.totalSips += 1;
      // Dynamic acoustic bolus volume estimation (24 mL to 34 mL based on acoustic energy integral, centered at 28 mL)
      const intensityRatio = Math.min(1.2, Math.max(0.85, avgEnergy / Math.max(1, dynamicThreshold)));
      const gulpVolume = Math.round(28 * intensityRatio);
      this.totalVolumeMl += gulpVolume;

      this.persistSession();
      this.notifyListeners(true);
    }

    this.animFrameId = requestAnimationFrame(this.pollAudioFrames);
  };

  public stopListening() {
    this.isRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach(t => t.stop());
      this.micStream = null;
    }
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
  }

  public manualAddSip(volumeMl: number = 30) {
    this.totalSips += 1;
    this.totalVolumeMl += volumeMl;
    this.lastSipTime = Date.now();
    this.persistSession();
    this.notifyListeners(true);
  }

  public resetSession() {
    this.totalSips = 0;
    this.totalVolumeMl = 0;
    this.lastSipTime = null;
    localforage.removeItem(STORAGE_SIP_SESSION).catch(() => {});
    this.notifyListeners(false);
  }

  public getStats(): AcousticSipSessionStats {
    return {
      totalSips: this.totalSips,
      totalVolumeMl: this.totalVolumeMl,
      averageGulpSizeMl: this.totalSips > 0 ? Math.round(this.totalVolumeMl / this.totalSips) : 28,
      lastSipTimestamp: this.lastSipTime
    };
  }

  public getIsActive(): boolean {
    return this.isRunning;
  }

  public subscribe(fn: (stats: AcousticSipSessionStats, isNewSip: boolean) => void): () => void {
    this.listeners.add(fn);
    fn(this.getStats(), false);
    return () => this.listeners.delete(fn);
  }

  public subscribeAudioLevel(fn: (energy: number) => void): () => void {
    this.audioLevelListeners.add(fn);
    return () => this.audioLevelListeners.delete(fn);
  }

  private notifyListeners(isNewSip: boolean) {
    const stats = this.getStats();
    this.listeners.forEach(fn => fn(stats, isNewSip));
  }
}

export const acousticSipClassifier = new AcousticSipClassifier();
