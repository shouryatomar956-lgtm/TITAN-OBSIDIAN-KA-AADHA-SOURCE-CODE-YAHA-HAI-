import localforage from 'localforage';
import { VaultTier } from '../types/vault';

export interface UnlockAudioOptions {
  type: 'badge' | 'theme';
  tier: VaultTier;
  volumeMultiplier?: number;
}

/**
 * VaultAudioEngine
 * Ultra low-latency, Web Audio API procedural synthesis engine.
 * Generates distinct acoustic signatures for Badge unlocks (metallic chime/snap) 
 * and Theme unlocks (atmospheric dimensional resonance/sweep) with tier-scaled harmonics.
 */
class VaultAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private isEnabled: boolean = true;
  private masterVolume: number = 0.85;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadSettings();
      this.attachGestureListeners();
      this.attachAppEventListeners();
    }
  }

  private async loadSettings() {
    try {
      const storedEnabled = await localforage.getItem<boolean>('pulsefit_vault_audio_enabled');
      if (storedEnabled !== null && storedEnabled !== undefined) {
        this.isEnabled = storedEnabled;
      }
      const storedVol = await localforage.getItem<number>('pulsefit_vault_audio_volume');
      if (typeof storedVol === 'number' && storedVol >= 0 && storedVol <= 1) {
        this.masterVolume = storedVol;
      }
    } catch {
      this.isEnabled = true;
      this.masterVolume = 0.85;
    }
  }

  /**
   * Pre-warms the AudioContext on user interaction to eliminate autoplay latency
   */
  private attachGestureListeners() {
    const unlockAudio = () => {
      this.getAudioContext();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio, { passive: true, once: true });
    window.addEventListener('keydown', unlockAudio, { passive: true, once: true });
    window.addEventListener('touchstart', unlockAudio, { passive: true, once: true });
  }

  private attachAppEventListeners() {
    // Listen for custom trigger events
    window.addEventListener('pulsefit_play_unlock_sound', ((e: CustomEvent<UnlockAudioOptions>) => {
      if (e.detail) {
        this.playUnlockSound(e.detail);
      }
    }) as EventListener);

    // Auto-listen to vault reward unlock broadcasts
    window.addEventListener('pulsefit_vault_reward_unlocked', ((e: CustomEvent<{ badges?: any[]; themes?: any[] }>) => {
      if (e.detail?.themes && e.detail.themes.length > 0) {
        const theme = e.detail.themes[0];
        this.playUnlockSound({ type: 'theme', tier: theme.tier || 'legendary' });
      } else if (e.detail?.badges && e.detail.badges.length > 0) {
        const badge = e.detail.badges[0];
        this.playUnlockSound({ type: 'badge', tier: badge.tier || 'common' });
      }
    }) as EventListener);
  }

  /**
   * Lazily initializes and caches the AudioContext and Master Compressor chain
   */
  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return null;

      try {
        this.ctx = new AudioCtxClass({ latencyHint: 'interactive' });

        // Master dynamics compressor to ensure crisp output with zero harsh digital clipping
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(8, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(6, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.12, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isEnabled ? this.masterVolume : 0, this.ctx.currentTime);

        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);

        this.isInitialized = true;
      } catch (e) {
        console.warn('[VaultAudio] Failed to initialize AudioContext:', e);
        return null;
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Main entry point to play sound effects
   */
  public playUnlockSound(options: UnlockAudioOptions) {
    if (!this.isEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;
      const vol = (options.volumeMultiplier ?? 1.0) * this.masterVolume;

      if (options.type === 'badge') {
        this.synthesizeBadgeUnlock(ctx, this.compressor, now, options.tier, vol);
      } else {
        this.synthesizeThemeUnlock(ctx, this.compressor, now, options.tier, vol);
      }
    } catch (err) {
      console.warn('[VaultAudio] Playback failed:', err);
    }
  }

  /**
   * SYNTHESIZER 1: BADGE UNLOCK
   * Sonic Character: Struck metallic trophy chime, physical snap transient, rising harmonic sparkle.
   */
  private synthesizeBadgeUnlock(
    ctx: AudioContext,
    destination: AudioNode,
    now: number,
    tier: VaultTier,
    volume: number
  ) {
    // 1. Tactile Snap Transient (micro metallic click)
    const snapOsc = ctx.createOscillator();
    const snapGain = ctx.createGain();
    const snapFilter = ctx.createBiquadFilter();

    snapOsc.type = 'triangle';
    snapOsc.frequency.setValueAtTime(480, now);
    snapOsc.frequency.exponentialRampToValueAtTime(70, now + 0.04);

    snapFilter.type = 'bandpass';
    snapFilter.frequency.setValueAtTime(1400, now);
    snapFilter.Q.setValueAtTime(2.5, now);

    snapGain.gain.setValueAtTime(0.28 * volume, now);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    snapOsc.connect(snapFilter);
    snapFilter.connect(snapGain);
    snapGain.connect(destination);

    snapOsc.start(now);
    snapOsc.stop(now + 0.05);

    // 2. Tier-specific ascending metallic bell frequencies
    let notes: number[];
    let decayTime: number;
    let bellRatio = 2.756; // Characteristic bell chime inharmonic ratio

    switch (tier) {
      case 'mythic':
        notes = [587.33, 739.99, 880.00, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6 (Brilliant Aurora Glissando)
        decayTime = 0.95;
        break;
      case 'legendary':
        notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Golden Fanfare)
        decayTime = 0.78;
        break;
      case 'rare':
        notes = [493.88, 587.33, 739.99, 987.77]; // B4, D5, F#5, B5 (Crystal Chime)
        decayTime = 0.58;
        break;
      case 'common':
      default:
        notes = [523.25, 659.25, 783.99]; // C5, E5, G5 (Clean Bright Triad)
        decayTime = 0.45;
        break;
    }

    notes.forEach((freq, idx) => {
      const noteStart = now + idx * 0.065;

      // Fundamental Bell Tone (Pure Sine)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, noteStart);

      gain1.gain.setValueAtTime(0, noteStart);
      gain1.gain.linearRampToValueAtTime(0.18 * volume, noteStart + 0.012);
      gain1.gain.exponentialRampToValueAtTime(0.0001, noteStart + decayTime);

      osc1.connect(gain1);
      gain1.connect(destination);

      osc1.start(noteStart);
      osc1.stop(noteStart + decayTime + 0.05);

      // Inharmonic Metallic Overtone (gives metallic sheen)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * bellRatio, noteStart);

      gain2.gain.setValueAtTime(0, noteStart);
      gain2.gain.linearRampToValueAtTime(0.07 * volume, noteStart + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.0001, noteStart + (decayTime * 0.4));

      osc2.connect(gain2);
      gain2.connect(destination);

      osc2.start(noteStart);
      osc2.stop(noteStart + (decayTime * 0.4) + 0.02);
    });

    // 3. Shimmering High-Register Sparkle for Rare, Legendary, Mythic
    if (tier !== 'common') {
      const sparkleOsc = ctx.createOscillator();
      const sparkleGain = ctx.createGain();
      sparkleOsc.type = 'sine';

      const topFreq = notes[notes.length - 1] * 1.5;
      sparkleOsc.frequency.setValueAtTime(topFreq, now + notes.length * 0.065);
      sparkleOsc.frequency.exponentialRampToValueAtTime(topFreq * 1.25, now + notes.length * 0.065 + 0.3);

      sparkleGain.gain.setValueAtTime(0, now + notes.length * 0.065);
      sparkleGain.gain.linearRampToValueAtTime(0.1 * volume, now + notes.length * 0.065 + 0.02);
      sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + notes.length * 0.065 + 0.45);

      sparkleOsc.connect(sparkleGain);
      sparkleGain.connect(destination);

      sparkleOsc.start(now + notes.length * 0.065);
      sparkleOsc.stop(now + notes.length * 0.065 + 0.5);
    }
  }

  /**
   * SYNTHESIZER 2: THEME UNLOCK
   * Sonic Character: Expansive cinematic dimensional shift, warm sub-bass bloom, 
   * resonant filter sweep, and ethereal chord pad.
   */
  private synthesizeThemeUnlock(
    ctx: AudioContext,
    destination: AudioNode,
    now: number,
    tier: VaultTier,
    volume: number
  ) {
    // 1. Resonant Sub-Bass Swell (dimensional weight)
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    const subFreq = tier === 'mythic' ? 55 : tier === 'legendary' ? 65 : 75; // A1, C2, D2

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(subFreq, now);
    subOsc.frequency.linearRampToValueAtTime(subFreq * 1.05, now + 0.4);

    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.24 * volume, now + 0.08);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

    subOsc.connect(subGain);
    subGain.connect(destination);

    subOsc.start(now);
    subOsc.stop(now + 0.9);

    // 2. Harmonic Pad Chord (Dimensional Ambience)
    let chordFreqs: number[];
    let padDuration: number;

    switch (tier) {
      case 'mythic':
        // Celestial Lydian Chord: C4, E4, F#4, B4, D5
        chordFreqs = [261.63, 329.63, 369.99, 493.88, 587.33];
        padDuration = 1.25;
        break;
      case 'legendary':
        // Golden Major 9th: A3, C#4, E4, G#4, B4
        chordFreqs = [220.00, 277.18, 329.63, 415.30, 493.88];
        padDuration = 1.05;
        break;
      case 'rare':
        // Neo-Cyan Add9: D4, F#4, A4, E5
        chordFreqs = [293.66, 369.99, 440.00, 659.25];
        padDuration = 0.85;
        break;
      case 'common':
      default:
        // Pristine Major Triad: F4, A4, C5
        chordFreqs = [349.23, 440.00, 523.25];
        padDuration = 0.65;
        break;
    }

    // Filter Sweep to open the sound space
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.frequency.exponentialRampToValueAtTime(4800, now + 0.35);
    filter.Q.setValueAtTime(3.2, now);

    chordFreqs.forEach((freq, i) => {
      // Voice 1: Warm Triangle
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Slight pitch detune for lush analog chorus effect
      const detune = (i % 2 === 0 ? 1 : -1) * (3 + i * 2);
      osc.frequency.setValueAtTime(freq, now + i * 0.04);
      osc.detune.setValueAtTime(detune, now);

      gain.gain.setValueAtTime(0, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.09 * volume, now + i * 0.04 + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + padDuration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(destination);

      osc.start(now + i * 0.04);
      osc.stop(now + padDuration + 0.05);
    });

    // 3. Celestial Aurora Glissando (High Sparkle Arpeggio for Mythic/Legendary)
    if (tier === 'mythic' || tier === 'legendary') {
      const glissNotes = tier === 'mythic' 
        ? [1046.50, 1318.51, 1567.98, 2093.00] // C6, E6, G6, C7
        : [880.00, 1108.73, 1318.51, 1760.00];  // A5, C#6, E6, A6

      glissNotes.forEach((f, idx) => {
        const start = now + 0.18 + idx * 0.05;
        const gOsc = ctx.createOscillator();
        const gGain = ctx.createGain();

        gOsc.type = 'sine';
        gOsc.frequency.setValueAtTime(f, start);

        gGain.gain.setValueAtTime(0, start);
        gGain.gain.linearRampToValueAtTime(0.07 * volume, start + 0.015);
        gGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);

        gOsc.connect(gGain);
        gGain.connect(destination);

        gOsc.start(start);
        gOsc.stop(start + 0.42);
      });
    }
  }

  /**
   * Toggle audio on/off
   */
  public async setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(enabled ? this.masterVolume : 0, this.ctx.currentTime);
    }
    try {
      await localforage.setItem('pulsefit_vault_audio_enabled', enabled);
    } catch {}
  }

  public getIsEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  public async setVolume(volume: number) {
    const clamped = Math.max(0, Math.min(1, volume));
    this.masterVolume = clamped;
    if (this.masterGain && this.ctx && this.isEnabled) {
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
    try {
      await localforage.setItem('pulsefit_vault_audio_volume', clamped);
    } catch {}
  }

  public getVolume(): number {
    return this.masterVolume;
  }
}

// Global Singleton
let audioEngineInstance: VaultAudioEngine | null = null;

export function getVaultAudioEngine(): VaultAudioEngine {
  if (!audioEngineInstance) {
    audioEngineInstance = new VaultAudioEngine();
  }
  return audioEngineInstance;
}

/**
 * High-performance low-latency trigger for unlock sound effects.
 */
export function playUnlockSound(options: UnlockAudioOptions): void {
  try {
    getVaultAudioEngine().playUnlockSound(options);
  } catch (err) {
    console.warn('[PulseFit Audio] Failed to play unlock sound:', err);
  }
}

/**
 * Convenience helper for badge unlocks
 */
export function playBadgeUnlockSound(tier: VaultTier, volumeMultiplier?: number): void {
  playUnlockSound({ type: 'badge', tier, volumeMultiplier });
}

/**
 * Convenience helper for theme unlocks
 */
export function playThemeUnlockSound(tier: VaultTier, volumeMultiplier?: number): void {
  playUnlockSound({ type: 'theme', tier, volumeMultiplier });
}
