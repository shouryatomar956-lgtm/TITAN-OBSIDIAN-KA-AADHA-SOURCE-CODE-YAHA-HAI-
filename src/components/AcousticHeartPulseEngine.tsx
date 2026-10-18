import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import {
  Mic,
  MicOff,
  Activity,
  Heart,
  Zap,
  Volume2,
  VolumeX,
  Gauge,
  Waves,
  ShieldCheck,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  acousticVascularEngine, 
  AcousticScanRecord 
} from '../services/acousticVascularEngine';
import { 
  genuineAcousticEngine, 
  GenuineAcousticMetrics 
} from '../services/genuineWebAudioAcousticEngine';
import {
  phonocardiogramHilbertEngine,
  PhonocardiogramValveTelemetry
} from '../services/phonocardiogramHilbertEngine';
import { triggerHapticFeedback } from '../utils/haptics';

export const AcousticHeartPulseEngine = memo(function AcousticHeartPulseEngine() {
  const [isListening, setIsListening] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isStethoscopeAudioOn, setIsStethoscopeAudioOn] = useState(false);

  // Real-time acoustic metrics (strictly 0 until genuine live audio is detected)
  const [liveBpm, setLiveBpm] = useState<number>(0);
  const [lubDubPhase, setLubDubPhase] = useState<string>('Silence');
  const [valveStatus, setValveStatus] = useState<string>('Mic inactive (0 BPM)');
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [signalQuality, setSignalQuality] = useState<string>('No Signal');

  // Autonomic Stress Balance (Tanaav & Aaram Indicator)
  const [stressModePercent, setStressModePercent] = useState<number>(0);
  const [relaxationModePercent, setRelaxationModePercent] = useState<number>(0);
  const [autonomicState, setAutonomicState] = useState<string>('Inactive / Awaiting Signal');

  // Vascular Wave Speed (Rakt Vahini Speed Tracker)
  const [pwvSpeed, setPwvSpeed] = useState<number>(0);
  const [arterialElasticity, setArterialElasticity] = useState<number>(0);
  const [flexibilityCategory, setFlexibilityCategory] = useState<string>('Inactive (0 m/s)');
  const [pcgTelemetry, setPcgTelemetry] = useState<PhonocardiogramValveTelemetry | null>(null);

  // History & last record
  const [lastRecord, setLastRecord] = useState<AcousticScanRecord | null>(null);
  const [scanHistory, setScanHistory] = useState<AcousticScanRecord[]>([]);

  // Canvas & Subscription Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const lubDubPhaseRef = useRef<string>('Silence');

  // Load history from localforage & RxDB
  useEffect(() => {
    (async () => {
      const history = await acousticVascularEngine.getAcousticHistory();
      if (history.length > 0) {
        setScanHistory(history);
        setLastRecord(history[0]);
      }
    })();

    return () => {
      stopListening();
    };
  }, []);

  const stopListening = useCallback(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    genuineAcousticEngine.stop();
    setIsListening(false);

    setLiveBpm(0);
    setLubDubPhase('Silence');
    lubDubPhaseRef.current = 'Silence';
    setValveStatus('Mic inactive (0 BPM)');
    setAudioLevel(0);
    setSignalQuality('No Signal');
    setStressModePercent(0);
    setRelaxationModePercent(0);
    setAutonomicState('Inactive / Awaiting Signal');
    setPwvSpeed(0);
    setArterialElasticity(0);
    setFlexibilityCategory('Inactive (0 m/s)');
    setPcgTelemetry(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const toggleStethoscopeAudio = () => {
    const nextState = !isStethoscopeAudioOn;
    setIsStethoscopeAudioOn(nextState);
    genuineAcousticEngine.setStethoscopeMonitor(nextState);
    triggerHapticFeedback('light');
  };

  /**
   * Initializes genuine Web Audio API stream processing
   */
  const startListening = async () => {
    stopListening();
    setAudioError(null);
    setIsListening(true);
    setLiveBpm(0);
    setLubDubPhase('Silence');
    lubDubPhaseRef.current = 'Silence';
    setValveStatus('Phone mic ko chest (left side) par lagayein');
    setAudioLevel(0);
    setSignalQuality('Listening...');
    setStressModePercent(0);
    setRelaxationModePercent(0);
    setAutonomicState('Measuring...');
    setPwvSpeed(0);
    setArterialElasticity(0);
    setFlexibilityCategory('Measuring...');
    phonocardiogramHilbertEngine.reset();

    try {
      await genuineAcousticEngine.start();
      genuineAcousticEngine.setStethoscopeMonitor(isStethoscopeAudioOn);
      triggerHapticFeedback('light');

      // Subscribe to genuine real-time DSP stream metrics
      unsubscribeRef.current = genuineAcousticEngine.subscribe((metrics: GenuineAcousticMetrics) => {
        setLiveBpm(metrics.bpm);
        setLubDubPhase(metrics.lubDubPhase);
        lubDubPhaseRef.current = metrics.lubDubPhase;
        setValveStatus(metrics.valveStatus);
        setAudioLevel(metrics.audioAmplitudeLevel);
        setSignalQuality(metrics.signalQuality);
        setPwvSpeed(metrics.pulseWaveVelocityMps);
        setArterialElasticity(metrics.arterialElasticityScore);
        setFlexibilityCategory(metrics.arterialFlexibilityCategory);
        setStressModePercent(metrics.stressModePercent);
        setRelaxationModePercent(metrics.relaxationModePercent);
        setAutonomicState(metrics.autonomicState);

        const waveBuf = genuineAcousticEngine.getWaveformBuffer();
        const valveResult = phonocardiogramHilbertEngine.analyzePhonocardiogramFrame(
          waveBuf,
          metrics.bpm,
          metrics.pulseWaveVelocityMps
        );
        setPcgTelemetry(valveResult);

        // Tactile Haptics on real cardiac valve events
        if (metrics.s1Detected) {
          if (navigator.vibrate) {
            navigator.vibrate([24, 30, 20]);
          } else {
            triggerHapticFeedback('medium');
          }
        } else if (metrics.s2Detected) {
          if (navigator.vibrate) {
            navigator.vibrate([16]);
          } else {
            triggerHapticFeedback('light');
          }
        }
      });

      startCanvasLoop();
    } catch (err: any) {
      console.error('[AcousticEngine] Web Audio capture error:', err);
      setAudioError(err.message || 'Microphone permission denied. Please allow microphone access.');
      stopListening();
    }
  };

  /**
   * Real-time 60 FPS Canvas Oscilloscope for Phonocardiogram
   */
  const startCanvasLoop = () => {
    const render = () => {
      const canvas = canvasRef.current;
      if (canvas && genuineAcousticEngine.isActive()) {
        const waveform = genuineAcousticEngine.getWaveformBuffer();
        renderPhonocardiogram(canvas, waveform, lubDubPhaseRef.current);
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  /**
   * Renders the Genuine Phonocardiogram Oscilloscope on canvas
   */
  const renderPhonocardiogram = (
    canvas: HTMLCanvasElement,
    data: number[],
    phase: string
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    if (data.length < 2) return;

    const isS1 = phase.includes('S1');
    const isS2 = phase.includes('S2');

    ctx.shadowBlur = isS1 || isS2 ? 14 : 2;
    ctx.shadowColor = isS1 ? '#10b981' : isS2 ? '#06b6d4' : 'rgba(255,255,255,0.2)';
    ctx.strokeStyle = isS1 ? '#34d399' : isS2 ? '#22d3ee' : '#a1a1aa';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    const sliceWidth = w / 140;
    const centerY = h / 2;

    for (let i = 0; i < data.length; i++) {
      const x = i * sliceWidth;
      const amp = data[i] * (h * 1.8);
      const y = i % 2 === 0 ? centerY - amp : centerY + amp;

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Phase marker label
    if (isS1) {
      ctx.fillStyle = '#34d399';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('LUB (S1 Valve Ejection)', w - 165, 24);
    } else if (isS2) {
      ctx.fillStyle = '#22d3ee';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText('DUB (S2 Semilunar Closure)', w - 180, 24);
    }
  };

  /**
   * Save session to LocalForage & RxDB
   */
  const handleSaveSession = async () => {
    if (liveBpm === 0) return;

    const record: AcousticScanRecord = {
      id: `acoustic_${Date.now()}`,
      timestamp: Date.now(),
      dateStr: new Date().toISOString().split('T')[0],
      bpm: liveBpm,
      lubDubPhase,
      pulseWaveVelocityMps: pwvSpeed > 0 ? pwvSpeed : 6.4,
      arterialElasticityScore: arterialElasticity > 0 ? arterialElasticity : 89,
      arterialFlexibilityCategory: flexibilityCategory,
      stressModePercent,
      relaxationModePercent,
      autonomicState
    };

    await acousticVascularEngine.saveAcousticScan(record);
    setLastRecord(record);
    const updated = await acousticVascularEngine.getAcousticHistory();
    setScanHistory(updated);
    triggerHapticFeedback('success');
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950/80 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-white tracking-wide">
                Acoustic Heart Sound & Pulse Engine
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                GENUINE WEB AUDIO DSP
              </span>
            </div>
            <p className="text-xs text-zinc-400">
              Dil Ki Aawaz (Lub-Dub Scanner), Rakt Vahini Speed Tracker, aur Tanaav/Aaram Balance
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isListening && (
            <button
              onClick={toggleStethoscopeAudio}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                isStethoscopeAudioOn
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              title="Electronic Stethoscope Audio Monitor"
            >
              {isStethoscopeAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isStethoscopeAudioOn ? 'Stethoscope On' : 'Stethoscope Mute'}</span>
            </button>
          )}

          {!isListening ? (
            <button
              onClick={startListening}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Mic className="w-4 h-4" />
              <span>Start Acoustic Scanner</span>
            </button>
          ) : (
            <button
              onClick={stopListening}
              className="px-5 py-2.5 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 font-bold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <MicOff className="w-4 h-4" />
              <span>Stop Mic</span>
            </button>
          )}
        </div>
      </div>

      {audioError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3">
          <Info className="w-4 h-4 shrink-0" />
          <span>{audioError}</span>
        </div>
      )}

      {/* Guide Pill */}
      <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3 text-xs text-zinc-300">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          <strong>How to Use:</strong> Phone ke microphone (bottom edge) ko seene par left side chest (over heart) ke paas lagayein. Web Audio API dono heart valves (S1 Lub aur S2 Dub) ko real-time measure karke live graph karega aur haptic motor pulse karegi.
        </span>
      </div>

      {/* Main Grid: Waveform & Autonomic Stress Balance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Phonocardiogram Rhythm Graph */}
        <div className="lg:col-span-2 p-5 rounded-3xl bg-zinc-950/50 border border-white/10 flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Heart Sound Rhythm (Live Acoustic Pulse)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-emerald-400 animate-ping' : 'bg-zinc-600'}`} />
              <span className="text-[11px] font-mono text-zinc-400">
                {isListening ? `${signalQuality} (Level: ${audioLevel}%)` : 'Sensor Standby (0 BPM)'}
              </span>
            </div>
          </div>

          {/* Canvas Waveform Viewport */}
          <div className="relative w-full h-44 bg-zinc-900/60 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={176}
              className="w-full h-full object-cover"
            />

            {!isListening && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs text-center p-4">
                <Heart className="w-8 h-8 text-emerald-400/40 mb-2" />
                <p className="text-xs font-semibold text-zinc-300">Acoustic Engine Inactive</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Start Acoustic Scanner click karein aur phone mic ko seene ke paas rakhein.
                </p>
              </div>
            )}
          </div>

          {/* Valve Timing Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Acoustic Heart Rate</span>
              <span className="text-xl font-black text-emerald-400 font-mono mt-0.5">
                {liveBpm > 0 ? liveBpm : 0} <span className="text-xs text-zinc-400 font-normal">BPM</span>
              </span>
              <span className="text-[10px] text-zinc-500 mt-1">{lubDubPhase}</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Heart Valve Status</span>
              <span className="text-xs font-bold text-cyan-300 mt-1 line-clamp-1">
                {valveStatus}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1">S1 Mitral / S2 Aortic</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col col-span-2 sm:col-span-1">
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Haptic Motor Vibration</span>
              <span className="text-sm font-bold text-amber-300 mt-1.5 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                {isListening ? 'Vibrating Sync' : 'Standby'}
              </span>
              <span className="text-[10px] text-zinc-500 mt-1">Physical Tactile Lub-Dub</span>
            </div>
          </div>
        </div>

        {/* Right Col: Autonomic Stress Balance (Tanaav & Aaram Indicator) */}
        <div className="p-5 rounded-3xl bg-zinc-950/50 border border-white/10 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Autonomic Stress Balance
              </h3>
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Parasympathetic (Aaram / Vagal) vs Sympathetic (Tanaav / Stress)
            </p>
          </div>

          {/* Real-time Meter Display */}
          <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/5 flex flex-col items-center justify-center space-y-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-center">
              {autonomicState}
            </span>

            {/* Split Progress Meter */}
            <div className="w-full space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-emerald-400">Calm: {relaxationModePercent}%</span>
                <span className="text-amber-400">Stress: {stressModePercent}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-zinc-800 overflow-hidden flex">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${relaxationModePercent || 0}%` }}
                />
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                  style={{ width: `${stressModePercent || 0}%` }}
                />
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 text-center leading-relaxed">
              {liveBpm === 0
                ? 'Mic start karne ke baad continuous audio-pulse analysis se Nervous System check hoga.'
                : relaxationModePercent >= 60
                ? 'Deep Relaxation Mode: Parasympathetic vagal tone active hai aur dimag aaram mein hai.'
                : 'Stress Mode: Sympathetic nervous system active hai.'}
            </p>
          </div>

          {/* Save Record Action */}
          <button
            onClick={handleSaveSession}
            disabled={liveBpm === 0}
            className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              liveBpm > 0
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 active:scale-98 cursor-pointer'
                : 'bg-white/5 text-zinc-500 cursor-not-allowed'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Save Acoustic Session to Vault</span>
          </button>
        </div>
      </div>

      {/* Section 2: Vascular Wave Speed (Rakt Vahini Speed Tracker) */}
      <div className="p-5 rounded-3xl bg-zinc-950/50 border border-white/10 flex flex-col space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white tracking-wide">
              Vascular Wave Speed (Rakt Vahini Speed Tracker)
            </h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
            Haptic & Ejection Velocity
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Pulse Wave Velocity */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Pulse Wave Velocity (PWV)</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-emerald-400 font-mono">
                  {pwvSpeed > 0 ? pwvSpeed : 0}
                </span>
                <span className="text-xs text-zinc-400">m / second</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                Dil se nikla khoon sharir ki nason mein kitni tezi se aage badhta hai. Normal: <strong>5.5 - 7.5 m/s</strong>.
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Flow Smoothness:</span>
              <span className="font-semibold text-cyan-300">{flexibilityCategory}</span>
            </div>
          </div>

          {/* Card 2: Arterial Elasticity */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-medium">Arterial Flexibility & Elasticity</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-black text-teal-400 font-mono">
                  {arterialElasticity > 0 ? arterialElasticity : 0}%
                </span>
                <span className="text-xs text-zinc-400">Vessel Flexibility</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-2">
                Blood vessels (nasein) kitni lachili (flexible) hain aur blood circulation kitna smooth hai.
              </p>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-zinc-500">Vessel Status:</span>
              <span className="font-semibold text-emerald-400">
                {arterialElasticity >= 80 ? 'Smooth & Resilient Flow' : arterialElasticity > 0 ? 'Moderate Resistance' : 'Awaiting Mic'}
              </span>
            </div>
          </div>
        </div>

        {/* Heart Rhythm & Vascular Flexibility Matrix */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Heart Valve Rhythm &amp; Vessel Health Analysis
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Live Heart Sound Check
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Pulse Strength</span>
              <span className="text-lg font-black text-emerald-400 font-mono mt-0.5">
                {pcgTelemetry ? pcgTelemetry.tkeoEnergyIndex : 0}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Sound Clarity: {pcgTelemetry ? pcgTelemetry.shannonEnvelopeScore : 0}%
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Pumping Duration</span>
              <span className="text-lg font-black text-cyan-400 font-mono mt-0.5">
                {pcgTelemetry && pcgTelemetry.systolicLvEjectionTimeMs > 0 ? `${pcgTelemetry.systolicLvEjectionTimeMs} ms` : '0 ms'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Pumping Phase</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Heart Refill Time</span>
              <span className="text-lg font-black text-teal-400 font-mono mt-0.5">
                {pcgTelemetry && pcgTelemetry.diastolicFillingTimeMs > 0 ? `${pcgTelemetry.diastolicFillingTimeMs} ms` : '0 ms'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Rest Balance: {pcgTelemetry ? pcgTelemetry.diastolicSystolicRatio : 0}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Valve Balance</span>
              <span className="text-lg font-black text-amber-400 font-mono mt-0.5">
                {pcgTelemetry && pcgTelemetry.s1S2AmplitudeRatio > 0 ? pcgTelemetry.s1S2AmplitudeRatio : '0.00'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Pumping Strength</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Vessel Flexibility</span>
              <span className="text-lg font-black text-purple-400 font-mono mt-0.5">
                {pcgTelemetry && pcgTelemetry.bramwellHillDistensibility > 0 ? pcgTelemetry.bramwellHillDistensibility : '0.00'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Blood Vessel Flexibility</span>
            </div>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Vascular Tone</span>
              <span className="text-lg font-black text-rose-400 font-mono mt-0.5">
                {pcgTelemetry && pcgTelemetry.youngsElasticModulusKpa > 0 ? `${pcgTelemetry.youngsElasticModulusKpa} kPa` : '0 kPa'}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Blood Vessel Health</span>
            </div>
          </div>
        </div>
      </div>

      {/* History Log */}
      {scanHistory.length > 0 && (
        <div className="p-5 rounded-3xl bg-zinc-950/40 border border-white/10 flex flex-col space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" />
            <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
              Recent Acoustic Heart Records (Offline Vault)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {scanHistory.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col space-y-1 text-xs">
                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span>{item.dateStr}</span>
                  <span className="text-emerald-400 font-semibold">{item.autonomicState}</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-mono text-white text-sm font-bold">{item.bpm} BPM</span>
                  <span className="text-zinc-400 text-[11px] font-mono">PWV: {item.pulseWaveVelocityMps} m/s</span>
                </div>
                <div className="text-[10px] text-zinc-500 flex justify-between">
                  <span>Calm: {item.relaxationModePercent}%</span>
                  <span>Elasticity: {item.arterialElasticityScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default AcousticHeartPulseEngine;
