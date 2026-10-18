import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX, Vibrate, Sparkles, Plus, Zap } from 'lucide-react';
import { polyglotStorageMesh } from '../services/polyglotStorageMesh';

type PresetDuration = 30 | 60 | 90;

interface TimerPersistedConfig {
  preset: PresetDuration;
  soundEnabled: boolean;
  hapticEnabled: boolean;
}

const STORAGE_KEY = 'pulsefit_haptic_rest_timer_config';

/**
 * Web Audio Synthesizer for Zero-Asset Low-Latency Workout Cues
 */
class RhythmicAudioSynthesizer {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playTick(frequency: number = 880, durationMs: number = 75) {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + durationMs / 1000);
    } catch {}
  }

  public playFinishChord() {
    try {
      this.init();
      if (!this.ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major Triad
      freqs.forEach((f, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime + idx * 0.05);
        gain.gain.setValueAtTime(0.2, this.ctx!.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + 0.6 + idx * 0.05);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(this.ctx!.currentTime + idx * 0.05);
        osc.stop(this.ctx!.currentTime + 0.65 + idx * 0.05);
      });
    } catch {}
  }
}

const audioSynth = new RhythmicAudioSynthesizer();

export const SupremeHapticRestTimer: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<PresetDuration>(30);
  const [remainingMs, setRemainingMs] = useState<number>(30 * 1000);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [hapticEnabled, setHapticEnabled] = useState<boolean>(true);
  const [supportsHaptics, setSupportsHaptics] = useState<boolean>(false);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  // High-precision clock references
  const targetTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastSecondRef = useRef<number>(-1);
  const halfwaySignaledRef = useRef<boolean>(false);
  const totalTargetMsRef = useRef<number>(30 * 1000);

  // Check hardware haptics capability
  useEffect(() => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      setSupportsHaptics(true);
    }
  }, []);

  // Restore configuration from 7-Tier Polyglot Storage Mesh
  useEffect(() => {
    polyglotStorageMesh.readQuorum<TimerPersistedConfig>(STORAGE_KEY)
      .then((saved) => {
        if (saved) {
          if ([30, 60, 90].includes(saved.preset)) {
            setSelectedDuration(saved.preset);
            setRemainingMs(saved.preset * 1000);
            totalTargetMsRef.current = saved.preset * 1000;
          }
          if (typeof saved.soundEnabled === 'boolean') setSoundEnabled(saved.soundEnabled);
          if (typeof saved.hapticEnabled === 'boolean') setHapticEnabled(saved.hapticEnabled);
        }
      })
      .catch(() => {});
  }, []);

  // Persist preferences
  const persistConfig = useCallback((preset: PresetDuration, snd: boolean, hpt: boolean) => {
    polyglotStorageMesh.writeQuorum(STORAGE_KEY, {
      preset,
      soundEnabled: snd,
      hapticEnabled: hpt
    }).catch(() => {});
  }, []);

  /**
   * Peak Physical Tactile Sensation Choreographer
   * Implements neuromuscular vibration feedback patterns
   */
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if (!hapticEnabled) return;
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {}
  }, [hapticEnabled]);

  // Handle Preset Change
  const handleSelectPreset = (sec: PresetDuration) => {
    if (isRunning) {
      stopTimer();
    }
    setSelectedDuration(sec);
    const ms = sec * 1000;
    setRemainingMs(ms);
    totalTargetMsRef.current = ms;
    setJustCompleted(false);
    halfwaySignaledRef.current = false;
    lastSecondRef.current = -1;
    triggerHaptic([25]);
    persistConfig(sec, soundEnabled, hapticEnabled);
  };

  // Add 15 Seconds Quick Bump
  const handleAdd15Seconds = () => {
    const newRemaining = remainingMs + 15 * 1000;
    setRemainingMs(newRemaining);
    totalTargetMsRef.current = Math.max(totalTargetMsRef.current, newRemaining);
    if (isRunning) {
      targetTimeRef.current = performance.now() + newRemaining;
    }
    triggerHaptic([30]);
  };

  // Stop Timer
  const stopTimer = () => {
    setIsRunning(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  // Reset Timer
  const handleReset = () => {
    stopTimer();
    const ms = selectedDuration * 1000;
    setRemainingMs(ms);
    totalTargetMsRef.current = ms;
    setJustCompleted(false);
    halfwaySignaledRef.current = false;
    lastSecondRef.current = -1;
    triggerHaptic([20, 30, 20]);
  };

  // Toggle Start / Pause
  const togglePlayPause = () => {
    if (isRunning) {
      stopTimer();
      triggerHaptic([35]);
    } else {
      if (remainingMs <= 0) {
        const ms = selectedDuration * 1000;
        setRemainingMs(ms);
        totalTargetMsRef.current = ms;
        targetTimeRef.current = performance.now() + ms;
      } else {
        targetTimeRef.current = performance.now() + remainingMs;
      }
      setJustCompleted(false);
      halfwaySignaledRef.current = false;
      lastSecondRef.current = -1;
      setIsRunning(true);
      // High-precision physical tactile start sensation: affirmative double pulse
      triggerHaptic([35, 50, 45]);
      if (soundEnabled) {
        audioSynth.playTick(600, 60);
      }
    }
  };

  // Monotonic Zero-Drift Animation Loop
  useEffect(() => {
    if (!isRunning) return;

    const tick = () => {
      const now = performance.now();
      const diff = Math.max(0, targetTimeRef.current - now);
      setRemainingMs(diff);

      const currentSec = Math.ceil(diff / 1000);
      const totalSec = Math.round(totalTargetMsRef.current / 1000);

      // Halfway tactile milestone notification
      if (!halfwaySignaledRef.current && diff <= (totalTargetMsRef.current / 2) && diff > 3000) {
        halfwaySignaledRef.current = true;
        triggerHaptic([40, 50, 40]);
      }

      // Final 3-2-1 countdown signals
      if (currentSec !== lastSecondRef.current) {
        lastSecondRef.current = currentSec;

        if (currentSec === 3) {
          triggerHaptic([50]);
          if (soundEnabled) audioSynth.playTick(740, 70);
        } else if (currentSec === 2) {
          triggerHaptic([60, 40, 60]);
          if (soundEnabled) audioSynth.playTick(880, 80);
        } else if (currentSec === 1) {
          triggerHaptic([90, 40, 90]);
          if (soundEnabled) audioSynth.playTick(1040, 90);
        }
      }

      // Completion Event (0.00s)
      if (diff <= 0) {
        setIsRunning(false);
        setJustCompleted(true);
        // Peak Triumphal Crescendo Tactile Burst
        triggerHaptic([120, 50, 160, 60, 220, 80, 400]);
        if (soundEnabled) {
          audioSynth.playFinishChord();
        }
        return;
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, soundEnabled, triggerHaptic]);

  // Page Visibility Resync: Recalculates time if browser throttled background tab
  useEffect(() => {
    const handleVisibility = () => {
      if (isRunning && document.visibilityState === 'visible') {
        const now = performance.now();
        const diff = Math.max(0, targetTimeRef.current - now);
        setRemainingMs(diff);
        if (diff <= 0) {
          setIsRunning(false);
          setJustCompleted(true);
          triggerHaptic([120, 50, 160, 60, 220, 80, 400]);
          if (soundEnabled) audioSynth.playFinishChord();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning, soundEnabled, triggerHaptic]);

  // Calculations for UI render
  const totalSeconds = remainingMs / 1000;
  const wholeSeconds = Math.floor(totalSeconds);
  const deciseconds = Math.floor((remainingMs % 1000) / 100);
  const minutes = Math.floor(wholeSeconds / 60);
  const formattedSeconds = wholeSeconds % 60;

  const progressFraction = totalTargetMsRef.current > 0 
    ? Math.min(1, Math.max(0, remainingMs / totalTargetMsRef.current)) 
    : 0;

  // Sports Science ATP-CP Resynthesis estimation
  const getAtpRecoveryText = (sec: number) => {
    if (sec <= 30) return { percent: '50-65%', focus: 'Metabolic Stress & Hypertrophy' };
    if (sec <= 60) return { percent: '80-88%', focus: 'Myofibrillar Hypertrophy & Work Capacity' };
    return { percent: '95-98%', focus: 'Maximal Neuromuscular CNS Restoration' };
  };

  const recoveryInfo = getAtpRecoveryText(selectedDuration);

  return (
    <section className="w-full bg-zinc-900 border border-zinc-800 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden transition-all duration-300">
      {/* Background Ambience Glow */}
      <div 
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-700"
        style={{
          background: isRunning 
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(6, 182, 212, 0.1) 70%)'
            : justCompleted
              ? 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)'
        }}
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-5 z-10 relative">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isRunning ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 animate-pulse' : 'bg-zinc-800 text-zinc-300'}`}>
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              Tactile Rest & Interval Timer
              {isRunning && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-semibold uppercase tracking-wider animate-pulse">
                  Live
                </span>
              )}
            </h3>
            <p className="text-[11px] text-zinc-400">
              Drift-free countdown with physical neuromuscular haptics
            </p>
          </div>
        </div>

        {/* Sensory Controls (Sound & Tactile Vibration Toggles) */}
        <div className="flex items-center gap-1.5 bg-zinc-800/80 p-1 rounded-xl border border-zinc-700/60">
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              persistConfig(selectedDuration, next, hapticEnabled);
              if (next) audioSynth.playTick(700, 50);
            }}
            title={soundEnabled ? 'Audio Cues: ON' : 'Audio Cues: OFF'}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${soundEnabled ? 'bg-zinc-700 text-purple-300 shadow-xs' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              const next = !hapticEnabled;
              setHapticEnabled(next);
              persistConfig(selectedDuration, soundEnabled, next);
              if (next) triggerHaptic([40]);
            }}
            title={hapticEnabled ? (supportsHaptics ? 'Physical Haptics: ACTIVE' : 'Haptics Emulated') : 'Haptics: MUTED'}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${hapticEnabled ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-xs' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            <Vibrate className="w-3.5 h-3.5" />
            {supportsHaptics && <span className="text-[9px] font-mono font-bold">HAPTIC</span>}
          </button>
        </div>
      </div>

      {/* Main Digital Clock & Radial Progress Ring */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2 px-2 z-10 relative">
        <div className="flex items-center gap-5">
          {/* Circular Countdown Progress Ring */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-zinc-800"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="url(#timerGradient)"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={(1 - progressFraction) * 2 * Math.PI * 40}
                strokeLinecap="round"
                className="transition-all duration-75 ease-linear"
              />
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black font-mono tracking-tighter">
                {String(formattedSeconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 font-bold -mt-0.5">
                .{deciseconds}s
              </span>
            </div>
          </div>

          {/* Large Digital Readout */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 font-mono">
              <span className={`text-4xl sm:text-5xl font-black tracking-tight ${isRunning ? 'text-white' : justCompleted ? 'text-emerald-400' : 'text-zinc-200'}`}>
                {String(minutes).padStart(2, '0')}:{String(formattedSeconds).padStart(2, '0')}
              </span>
              <span className="text-lg font-bold text-zinc-400 font-mono">
                .{deciseconds}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                ATP Recovery: <strong className="text-zinc-200 font-mono">{recoveryInfo.percent}</strong>
              </span>
              <span className="text-[10px] text-zinc-500">•</span>
              <span className="text-[10px] text-zinc-400 truncate max-w-[170px]">
                {recoveryInfo.focus}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls: Play / Pause, Reset & Quick +15s */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <button
            onClick={handleAdd15Seconds}
            title="Add 15 Seconds"
            className="px-3 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer border border-zinc-700/60"
          >
            <Plus className="w-3.5 h-3.5" />
            15s
          </button>

          <button
            onClick={handleReset}
            title="Reset Countdown"
            className="p-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold transition-all active:scale-95 cursor-pointer border border-zinc-700/60"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlayPause}
            className={`flex-1 sm:flex-none px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-lg ${
              isRunning 
                ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20' 
                : 'bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white shadow-purple-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Start Rest
              </>
            )}
          </button>
        </div>
      </div>

      {/* Preset Duration Selector: 30s, 60s, 90s (As requested by User) */}
      <div className="mt-5 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 z-10 relative">
        <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-center">
          <Sparkles className="w-3 h-3 text-purple-400" /> Rest Presets
        </span>

        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto">
          {([30, 60, 90] as PresetDuration[]).map((sec) => {
            const isSelected = selectedDuration === sec;
            return (
              <button
                key={sec}
                onClick={() => handleSelectPreset(sec)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-white text-black shadow-md border border-white/90 scale-102'
                    : 'bg-zinc-800/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 border border-zinc-700/50'
                }`}
              >
                <span>{sec}s</span>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-zinc-600 font-semibold' : 'text-zinc-500'}`}>
                  {sec === 30 ? 'Sprint' : sec === 60 ? 'Standard' : 'Power'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Linear Micro Progress Bar */}
      <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 transition-all duration-75 ease-linear"
          style={{ width: `${progressFraction * 100}%` }}
        />
      </div>
    </section>
  );
};
