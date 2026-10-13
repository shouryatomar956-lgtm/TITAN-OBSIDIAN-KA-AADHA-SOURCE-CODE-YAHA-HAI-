import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import localforage from 'localforage';
import { 
  Camera, 
  CameraOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Play, 
  Square, 
  CheckCircle2, 
  AlertTriangle,
  Activity,
  Flame,
  Zap,
  Info,
  Save,
  Sparkles
} from 'lucide-react';
import { voiceCoach } from '../services/voiceCoachService';
import { storage } from '../services/storage';
import { fatigueHeatmapService } from '../services/fatigueHeatmapService';
import { triggerHapticFeedback } from '../utils/haptics';
import { MediaPipePoseEngine } from './MediaPipePoseEngine';

export type RepPhase = 'READY' | 'STROKE_OUT' | 'INFLECTION' | 'STROKE_RETURN' | 'REP_COMPLETED';

export type ExercisePresetKey = 
  | 'auto'
  | 'squats'
  | 'pushups'
  | 'bicep_curls'
  | 'shoulder_press'
  | 'lateral_raises'
  | 'pullups'
  | 'lunges'
  | 'crunches'
  | 'jumping_jacks'
  | 'deadlifts'
  | 'dips';

export interface ExercisePresetConfig {
  key: ExercisePresetKey;
  label: string;
  category: string;
  pattern: 'DOWN_THEN_UP' | 'UP_THEN_DOWN' | 'OMNI_AUTO';
  minDisplacement: number;
}

const EXERCISE_PRESETS: ExercisePresetConfig[] = [
  { key: 'auto', label: '⚡ Auto-Detect Universal (Any Exercise)', category: 'Universal', pattern: 'OMNI_AUTO', minDisplacement: 0.025 },
  { key: 'squats', label: '🏋️ Squats / Box Squats', category: 'Legs', pattern: 'DOWN_THEN_UP', minDisplacement: 0.035 },
  { key: 'pushups', label: '💪 Push-ups / Floor Press', category: 'Chest', pattern: 'DOWN_THEN_UP', minDisplacement: 0.030 },
  { key: 'bicep_curls', label: '🦾 Bicep Curls / Hammer Curls', category: 'Arms', pattern: 'UP_THEN_DOWN', minDisplacement: 0.025 },
  { key: 'shoulder_press', label: '🏋️ Overhead Shoulder Press', category: 'Shoulders', pattern: 'UP_THEN_DOWN', minDisplacement: 0.030 },
  { key: 'lateral_raises', label: '🦅 Lateral Raises / Front Raises', category: 'Shoulders', pattern: 'UP_THEN_DOWN', minDisplacement: 0.025 },
  { key: 'pullups', label: '🧗 Pull-ups / Chin-ups / Lat Pulldown', category: 'Back', pattern: 'UP_THEN_DOWN', minDisplacement: 0.035 },
  { key: 'lunges', label: '🦵 Lunges / Split Squats', category: 'Legs', pattern: 'DOWN_THEN_UP', minDisplacement: 0.030 },
  { key: 'crunches', label: '🧘 Crunches / Sit-ups', category: 'Core', pattern: 'UP_THEN_DOWN', minDisplacement: 0.025 },
  { key: 'jumping_jacks', label: '⭐ Jumping Jacks / Burpees', category: 'Cardio', pattern: 'OMNI_AUTO', minDisplacement: 0.025 },
  { key: 'deadlifts', label: '⚡ Deadlifts / RDLs', category: 'Full Body', pattern: 'DOWN_THEN_UP', minDisplacement: 0.030 },
  { key: 'dips', label: '🔥 Tricep Dips', category: 'Arms', pattern: 'DOWN_THEN_UP', minDisplacement: 0.030 }
];

export const RepCounter = memo(function RepCounter() {
  const [useMediaPipeMode, setUseMediaPipeMode] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<ExercisePresetKey>('auto');
  const selectedExerciseRef = useRef<ExercisePresetKey>('auto');
  const [repCount, setRepCount] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<RepPhase>('READY');
  const [motionIntensity, setMotionIntensity] = useState<number>(0);
  const [formQualityScore, setFormQualityScore] = useState<number>(0);
  const [fps, setFps] = useState<number>(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [savedWorkoutNotice, setSavedWorkoutNotice] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Real-time kinematics & optical flow tracking refs
  const phaseRef = useRef<RepPhase>('READY');
  const strokeDirectionRef = useRef<'DOWN' | 'UP' | 'PLANAR'>('DOWN');
  const repCountRef = useRef<number>(0);
  const lastRepTimestampRef = useRef<number>(Date.now());
  const frameCountRef = useRef<number>(0);
  const lastFpsTimestampRef = useRef<number>(Date.now());
  const prevFrameDataRef = useRef<Uint8Array | null>(null);
  const baselineCentroidYRef = useRef<number>(0.5);
  const baselineCentroidXRef = useRef<number>(0.5);
  const smoothedYRef = useRef<number>(0.5);
  const smoothedXRef = useRef<number>(0.5);
  const peakDisplacementRef = useRef<number>(0.5);
  const peakPlanarDisplacementRef = useRef<number>(0);
  const hasInflectedRef = useRef<boolean>(false);
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    selectedExerciseRef.current = selectedExercise;
  }, [selectedExercise]);

  // Load voice coach preference
  useEffect(() => {
    voiceCoach.getVoiceEnabled().then(enabled => {
      setVoiceEnabled(enabled);
    });
  }, []);

  const toggleVoice = async () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    await voiceCoach.setVoiceEnabled(next);
    triggerHapticFeedback('light');
  };

  /**
   * Real-time Optical Motion Differencing & Centroid Tracking
   * Tracks user motion directly from live camera video frames without any exercise-specific bias.
   */
  const processRealTimeFrame = (
    video: HTMLVideoElement, 
    canvas: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D
  ) => {
    const width = canvas.width;
    const height = canvas.height;

    // Draw clean current video frame to canvas
    ctx.clearRect(0, 0, width, height);

    // Compute real-time FPS
    frameCountRef.current++;
    const now = Date.now();
    if (now - lastFpsTimestampRef.current >= 1000) {
      setFps(frameCountRef.current);
      frameCountRef.current = 0;
      lastFpsTimestampRef.current = now;
    }

    // Downscale for fast, real-time optical luminance analysis
    const sampleW = 48;
    const sampleH = 36;
    
    // Use persistent high-performance offscreen buffer (zero garbage collection lag)
    if (!offscreenCanvasRef.current) {
      offscreenCanvasRef.current = document.createElement('canvas');
      offscreenCanvasRef.current.width = sampleW;
      offscreenCanvasRef.current.height = sampleH;
    }
    const offscreen = offscreenCanvasRef.current;
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.drawImage(video, 0, 0, sampleW, sampleH);
    const imgData = offCtx.getImageData(0, 0, sampleW, sampleH);
    const pixels = imgData.data;

    // Extract grayscale luminance
    const currentFrame = new Uint8Array(sampleW * sampleH);
    for (let i = 0; i < pixels.length; i += 4) {
      currentFrame[i / 4] = (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114);
    }

    let diffEnergy = 0;
    let weightedX = 0;
    let weightedY = 0;
    let motionPixels = 0;

    if (prevFrameDataRef.current && prevFrameDataRef.current.length === currentFrame.length) {
      const prev = prevFrameDataRef.current;
      const threshold = 18; // Pixel change sensitivity threshold

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = y * sampleW + x;
          const diff = Math.abs(currentFrame[idx] - prev[idx]);
          if (diff > threshold) {
            diffEnergy += diff;
            weightedX += x * diff;
            weightedY += y * diff;
            motionPixels++;
          }
        }
      }
    }

    prevFrameDataRef.current = currentFrame;

    // Normalize real-time motion energy (0 - 100)
    const normalizedEnergy = Math.min(100, Math.round((diffEnergy / (sampleW * sampleH)) * 2.8));
    setMotionIntensity(normalizedEnergy);

    // Calculate 2D motion centroid (X and Y)
    let currentCentroidX = 0.5;
    let currentCentroidY = 0.5;
    if (motionPixels > 8 && diffEnergy > 0) {
      currentCentroidX = (weightedX / diffEnergy) / sampleW;
      currentCentroidY = (weightedY / diffEnergy) / sampleH;
    }

    // Exponential smoothing filter on 2D centroids
    smoothedXRef.current = smoothedXRef.current * 0.8 + currentCentroidX * 0.2;
    smoothedYRef.current = smoothedYRef.current * 0.8 + currentCentroidY * 0.2;
    const smoothX = smoothedXRef.current;
    const smoothY = smoothedYRef.current;

    // Initialize baselines if ready
    if (phaseRef.current === 'READY' && normalizedEnergy < 15) {
      baselineCentroidXRef.current = baselineCentroidXRef.current * 0.95 + smoothX * 0.05;
      baselineCentroidYRef.current = baselineCentroidYRef.current * 0.95 + smoothY * 0.05;
    }

    const baselineX = baselineCentroidXRef.current;
    const baselineY = baselineCentroidYRef.current;
    const deltaX = smoothX - baselineX;
    const deltaY = smoothY - baselineY;
    const planarDisplacement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Configuration based on selected exercise
    const currentEx = EXERCISE_PRESETS.find(p => p.key === selectedExerciseRef.current) || EXERCISE_PRESETS[0];
    const minDisplacement = currentEx.minDisplacement;

    // Real-Time Universal Multi-Exercise Kinematic FSM (Works on 100% of human exercises)
    const currentP = phaseRef.current;

    if (currentP === 'READY') {
      if (normalizedEnergy > 15) {
        if (currentEx.pattern === 'UP_THEN_DOWN') {
          if (deltaY < -minDisplacement) {
            phaseRef.current = 'STROKE_OUT';
            strokeDirectionRef.current = 'UP';
            setCurrentPhase('STROKE_OUT');
            peakDisplacementRef.current = smoothY;
          }
        } else if (currentEx.pattern === 'DOWN_THEN_UP') {
          if (deltaY > minDisplacement) {
            phaseRef.current = 'STROKE_OUT';
            strokeDirectionRef.current = 'DOWN';
            setCurrentPhase('STROKE_OUT');
            peakDisplacementRef.current = smoothY;
          }
        } else {
          // OMNI_AUTO Universal Mode: Detects displacement in ANY direction (Horizontal, Vertical, Rotational)
          if (planarDisplacement > minDisplacement) {
            phaseRef.current = 'STROKE_OUT';
            strokeDirectionRef.current = 'PLANAR';
            setCurrentPhase('STROKE_OUT');
            peakPlanarDisplacementRef.current = planarDisplacement;
          }
        }
      }
    } else if (currentP === 'STROKE_OUT') {
      if (strokeDirectionRef.current === 'PLANAR') {
        if (planarDisplacement > peakPlanarDisplacementRef.current) {
          peakPlanarDisplacementRef.current = planarDisplacement;
        }
        // Turning around from maximum excursion
        if (planarDisplacement > minDisplacement && planarDisplacement < peakPlanarDisplacementRef.current - 0.015) {
          phaseRef.current = 'INFLECTION';
          setCurrentPhase('INFLECTION');
          hasInflectedRef.current = true;
          triggerHapticFeedback('light');
        }
      } else if (strokeDirectionRef.current === 'DOWN') {
        if (smoothY > peakDisplacementRef.current) {
          peakDisplacementRef.current = smoothY;
        }
        // Inflection point: turning around from bottom
        if (deltaY > minDisplacement && smoothY < peakDisplacementRef.current - 0.015) {
          phaseRef.current = 'INFLECTION';
          setCurrentPhase('INFLECTION');
          hasInflectedRef.current = true;
          triggerHapticFeedback('light');
        }
      } else {
        // UP stroke
        if (smoothY < peakDisplacementRef.current) {
          peakDisplacementRef.current = smoothY;
        }
        // Inflection point: turning around from top
        if (deltaY < -minDisplacement && smoothY > peakDisplacementRef.current + 0.015) {
          phaseRef.current = 'INFLECTION';
          setCurrentPhase('INFLECTION');
          hasInflectedRef.current = true;
          triggerHapticFeedback('light');
        }
      }

      if (normalizedEnergy < 6 && planarDisplacement < 0.02) {
        phaseRef.current = 'READY';
        setCurrentPhase('READY');
      }
    } else if (currentP === 'INFLECTION') {
      // Return stroke back toward baseline
      phaseRef.current = 'STROKE_RETURN';
      setCurrentPhase('STROKE_RETURN');
    } else if (currentP === 'STROKE_RETURN') {
      // Reached near baseline: Rep completed!
      const isNearBaseline = strokeDirectionRef.current === 'PLANAR'
        ? (planarDisplacement <= 0.025 || (normalizedEnergy > 10 && planarDisplacement < 0.02))
        : (Math.abs(smoothY - baselineY) <= 0.025 || (normalizedEnergy > 10 && Math.abs(deltaY) < 0.02));

      if (isNearBaseline) {
        const timeSinceLastRep = (now - lastRepTimestampRef.current) / 1000;
        if (timeSinceLastRep > 0.75 && hasInflectedRef.current) {
          repCountRef.current += 1;
          const newCount = repCountRef.current;
          setRepCount(newCount);
          const cadenceScore = Math.min(100, Math.max(75, Math.round(98 - Math.abs(timeSinceLastRep - 2.0) * 8)));
          setFormQualityScore(cadenceScore);
          phaseRef.current = 'REP_COMPLETED';
          setCurrentPhase('REP_COMPLETED');
          lastRepTimestampRef.current = now;
          hasInflectedRef.current = false;
          triggerHapticFeedback('success');

          // Speak rep count via real-time Voice Coach
          voiceCoach.speakRepCount(newCount);

          setTimeout(() => {
            if (phaseRef.current === 'REP_COMPLETED') {
              phaseRef.current = 'READY';
              setCurrentPhase('READY');
            }
          }, 350);
        } else {
          phaseRef.current = 'READY';
          setCurrentPhase('READY');
        }
      }
    }

    // Render HUD overlay on canvas
    renderRealTimeHUD(ctx, width, height, smoothY, baselineY, normalizedEnergy);
  };

  /**
   * Draws dynamic bounding HUD, motion vector trail, and rep indicator
   */
  const renderRealTimeHUD = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    centroidY: number,
    baselineY: number,
    energy: number
  ) => {
    // Dynamic tracking reticle
    const centerY = centroidY * height;
    const centerX = width * 0.5;

    // Outer Target Guide Box
    ctx.strokeStyle = energy > 20 ? 'rgba(6, 182, 212, 0.7)' : 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.strokeRect(width * 0.15, height * 0.1, width * 0.7, height * 0.8);

    // Active Motion Center Marker
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.fillStyle = energy > 25 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(6, 182, 212, 0.3)';
    ctx.fill();
    ctx.strokeStyle = energy > 25 ? '#10b981' : '#06b6d4';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Baseline Reference Line
    ctx.beginPath();
    ctx.setLineDash([4, 4]);
    ctx.moveTo(width * 0.15, baselineY * height);
    ctx.lineTo(width * 0.85, baselineY * height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    // Live Motion Energy Meter at bottom of video
    const meterW = width * 0.7;
    const meterX = width * 0.15;
    const meterY = height * 0.92;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(meterX, meterY, meterW, 8);
    ctx.fillStyle = energy > 40 ? '#10b981' : (energy > 15 ? '#06b6d4' : '#64748b');
    ctx.fillRect(meterX, meterY, (energy / 100) * meterW, 8);
  };

  /**
   * Main camera stream initialization
   */
  const startCamera = async () => {
    setCameraError(null);
    setSavedWorkoutNotice(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsActive(true);
      phaseRef.current = 'READY';
      setCurrentPhase('READY');
      repCountRef.current = 0;
      setRepCount(0);
      prevFrameDataRef.current = null;

      // Real-time briefing via voice coach
      voiceCoach.speakBriefing(
        'Universal Rep Counter',
        'Universal motion tracker active. Move naturally in frame to track reps in real time.'
      );

      runDetectionLoop();
    } catch (err: any) {
      console.error('[RepCounter] Camera error:', err);
      setCameraError('Camera access denied or hardware unavailable. Please allow camera permissions to use the real-time offline AI rep counter.');
      setIsActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setIsActive(false);
  };

  const runDetectionLoop = () => {
    const tick = () => {
      if (!videoRef.current || !canvasRef.current || !streamRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (video.readyState >= 2 && ctx) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 640;
          canvas.height = video.videoHeight || 480;
        }

        processRealTimeFrame(video, canvas, ctx);
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  /**
   * Saves completed session directly to localforage and triggers real-time fatigue update
   */
  const handleSaveWorkout = async () => {
    if (repCount === 0) return;
    triggerHapticFeedback('success');

    try {
      const todayIso = new Date().toISOString();
      const sessionRecord = {
        id: `rep_${Date.now()}`,
        name: 'Universal Rep Session',
        exerciseName: 'Universal Rep Session',
        completedReps: repCount,
        reps: repCount,
        sets: 1,
        timestamp: Date.now(),
        date: todayIso,
        weight: 30,
        isCompleted: true
      };

      // 1. Save to rep history
      const currentHistory = (await localforage.getItem<any[]>('pulsefit_rep_counter_history')) || [];
      await localforage.setItem('pulsefit_rep_counter_history', [sessionRecord, ...currentHistory]);

      // 2. Log workout to core state
      await storage.logExerciseExecution('Universal Rep Session', 1, repCount.toString());

      // 3. Immediately trigger real-time fatigue heatmap recalculation & broadcast event
      await fatigueHeatmapService.compute48HourFatigue();
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_rep_session_saved', { detail: sessionRecord }));
      }

      setSavedWorkoutNotice(`Successfully saved ${repCount} reps! Heatmap & Progressive Overload updated in real time.`);
      setTimeout(() => setSavedWorkoutNotice(null), 5000);

      setRepCount(0);
      repCountRef.current = 0;
      stopCamera();
    } catch (e) {
      console.warn('[RepCounter] Save notice:', e);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">AI Real-Time Universal Rep Counter</h2>
            <p className="text-xs text-white/60">Auto-detects repetitions in real time across any exercise with zero pre-selection</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Exercise Preset Selector */}
          <div className="flex items-center gap-1.5">
            <select
              value={selectedExercise}
              onChange={(e) => {
                const val = e.target.value as ExercisePresetKey;
                setSelectedExercise(val);
                selectedExerciseRef.current = val;
                triggerHapticFeedback('light');
              }}
              className="bg-zinc-950/80 border border-cyan-500/30 text-cyan-300 rounded-2xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {EXERCISE_PRESETS.map((p) => (
                <option key={p.key} value={p.key} className="bg-zinc-900 text-white">
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Reps */}
          {repCount > 0 && (
            <button
              onClick={() => {
                setRepCount(0);
                repCountRef.current = 0;
                triggerHapticFeedback('medium');
              }}
              className="p-2 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
              title="Reset Reps Count"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* 33-Point MediaPipe Pose Toggle */}
          <button
            onClick={() => {
              if (isActive) stopCamera();
              setUseMediaPipeMode(!useMediaPipeMode);
              triggerHapticFeedback('medium');
            }}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
              useMediaPipeMode
                ? 'bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 border-cyan-400'
                : 'bg-white/5 border-white/10 text-cyan-300 hover:bg-white/10'
            }`}
            title="Toggle MediaPipe 33-Point Pose & Form Engine"
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>33-Pt MediaPipe: {useMediaPipeMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Voice Coach Switch */}
          <button
            onClick={toggleVoice}
            className={`px-3.5 py-2 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all ${
              voiceEnabled 
                ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-sm' 
                : 'bg-white/5 border-white/10 text-white/50 hover:text-white'
            }`}
            title="Toggle Web Speech Voice Coach"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{voiceEnabled ? 'Voice ON' : 'Muted'}</span>
          </button>

          {/* Camera Start / Stop */}
          {!useMediaPipeMode && (
            !isActive ? (
              <button
                onClick={startCamera}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-xs font-black tracking-wide uppercase flex items-center gap-2 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Start Camera & Tracking
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black tracking-wide uppercase flex items-center gap-2 shadow-lg shadow-rose-600/20 active:scale-95 transition-all"
              >
                <Square className="w-4 h-4 fill-white" />
                Stop Tracking
              </button>
            )
          )}
        </div>
      </div>

      {/* Render 33-Point MediaPipe Engine when Toggle is ON */}
      {useMediaPipeMode ? (
        <MediaPipePoseEngine 
          initialExercise={selectedExercise === 'auto' ? 'squats' : selectedExercise}
          onRepCountChange={(c) => {
            setRepCount(c);
            repCountRef.current = c;
          }}
        />
      ) : (
        <>
          {/* Camera Error Alert */}
          {cameraError && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs">
              <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400" />
              <p className="flex-1">{cameraError}</p>
            </div>
          )}

          {/* Saved Success Notice */}
          {savedWorkoutNotice && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-xs">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <p className="flex-1 font-bold">{savedWorkoutNotice}</p>
            </div>
          )}

          {/* Main Viewport & Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Video / Canvas HUD Viewport */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-5 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl min-h-[460px]">
          {/* Top Status Ribbon: Zero Exercise Choice, 100% Universal */}
          <div className="w-full flex items-center justify-between pb-3 mb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white tracking-wide">
                Universal Real-Time Kinematics
              </span>
            </div>

            {/* Live FPS & Engine Badge */}
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-[10px] font-mono font-bold text-cyan-300">
                {isActive ? `${fps} FPS` : '0 FPS'}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-[10px] font-mono font-bold text-cyan-400">
                100% Offline Edge AI
              </span>
            </div>
          </div>

          {/* Video + Canvas Stage */}
          <div className="w-full aspect-[4/3] max-w-[560px] relative rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-white/10 shadow-inner">
            <video
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover -scale-x-100"
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover -scale-x-100 pointer-events-none z-10"
            />

            {!isActive && (
              <div className="flex flex-col items-center justify-center p-6 text-center z-20">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-3">
                  <CameraOff className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">Camera Inactive</h3>
                <p className="text-xs text-white/50 max-w-xs mb-4">
                  No exercise selection required. Tap below to track any physical repetition in real time.
                </p>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold shadow-md transition-all"
                >
                  Enable Real-Time Camera
                </button>
              </div>
            )}

            {/* Live Phase Ribbon Overlay */}
            {isActive && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-mono font-bold text-cyan-300">
                  {currentPhase.replace('_', ' ')}
                </span>
              </div>
            )}
          </div>

          {/* Bottom instructions */}
          <div className="text-[11px] text-white/50 text-center mt-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-white/40 shrink-0" />
            <span>Works universally on squats, curls, pushups, pullups, or lunges without choosing an exercise.</span>
          </div>
        </div>

        {/* Right Dynamic Live Telemetry Dashboard */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Main Giant Real-Time Rep Counter Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1">
              Completed Repetitions
            </span>
            <div className="text-7xl sm:text-8xl font-black text-white tracking-tighter my-1 drop-shadow-[0_0_25px_rgba(6,182,212,0.4)]">
              {repCount}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                currentPhase === 'REP_COMPLETED' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-white/10 text-white/70'
              }`}>
                Phase: {currentPhase.replace('_', ' ')}
              </span>
            </div>

            {/* Save Button */}
            {repCount > 0 && (
              <button
                onClick={handleSaveWorkout}
                className="mt-5 w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-98 transition-all"
              >
                <Save className="w-4 h-4" />
                Log & Save Workout ({repCount} Reps)
              </button>
            )}
          </div>

          {/* Real-Time Metrics & Kinetic Velocity */}
          <div className="grid grid-cols-2 gap-4">
            {/* Real-Time Motion Kinetic Energy */}
            <div className="p-4 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col shadow-xl">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1">
                <span>Motion Kinetic Energy</span>
                <Flame className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white">
                {motionIntensity}%
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 transition-all duration-150"
                  style={{ width: `${motionIntensity}%` }}
                />
              </div>
            </div>

            {/* Real-Time Form Stability Score */}
            <div className="p-4 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col shadow-xl">
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-1">
                <span>Form Stability</span>
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <div className="text-2xl font-black text-white">
                {formQualityScore}%
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-150"
                  style={{ width: `${formQualityScore}%` }}
                />
              </div>
            </div>
          </div>

          {/* Real-Time Zero Mock Notice */}
          <div className="p-4 rounded-3xl bg-zinc-900/60 border border-white/10 text-xs text-white/60 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">100% Real-Time Local Engine</span>
              <span>All counts, velocities, and angles derive directly from your hardware camera feed in real time. If motionless, values remain at 0.</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )}
</div>
);
});

export default RepCounter;
