import React, { useState, useEffect, useRef, memo, useCallback } from 'react';
import localforage from 'localforage';
import { 
  Camera, 
  Flame, 
  Activity, 
  Flashlight, 
  CheckCircle2, 
  AlertCircle, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  Gauge, 
  Sparkles,
  Info,
  Clock,
  HeartPulse
} from 'lucide-react';
import { acousticVascularService, VascularBmrSessionRecord } from '../services/acousticVascularService';
import { VascularBmrOutput } from '../workers/acousticVascular.worker';
import {
  windkesselSdppgHemodynamicEngine,
  WindkesselSdppgHemodynamics
} from '../services/windkesselSdppgHemodynamicEngine';
import { triggerHapticFeedback } from '../utils/haptics';

export const VascularStressBmrAnalyzer = memo(function VascularStressBmrAnalyzer() {
  const [isScanning, setIsScanning] = useState(false);
  const [torchOn, setTorchOn] = useState(false);
  const [hasTorch, setHasTorch] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // User Profile loaded from local storage / RxDB
  const [profile, setProfile] = useState<{
    age: number;
    weightKg: number;
    heightCm: number;
    gender: string;
    restingHr: number;
  }>({
    age: 26,
    weightKg: 70,
    heightCm: 175,
    gender: 'male',
    restingHr: 65
  });

  // Real-time analysis output (Strictly zero when idle/inactive)
  const [liveVitals, setLiveVitals] = useState<VascularBmrOutput>({
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
    readinessFeedback: 'Kripya scanner shuru karein aur camera par ungli rakhein',
    perfusionStatus: 'No Perfusion Detected'
  });

  const [currentPulseBpm, setCurrentPulseBpm] = useState<number>(0);
  const [wk4Hemodynamics, setWk4Hemodynamics] = useState<WindkesselSdppgHemodynamics | null>(null);
  const [history, setHistory] = useState<VascularBmrSessionRecord[]>([]);

  // Video & Canvas references
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isScanningRef = useRef(false);

  // Micro-color signal window buffer
  const greenBufferRef = useRef<number[]>([]);
  const redBufferRef = useRef<number[]>([]);
  const lastPeakTimesRef = useRef<number[]>([]);
  const lastScanPersistRef = useRef<number>(0);

  // Load user profile & past history
  useEffect(() => {
    (async () => {
      try {
        const storedProfile = await localforage.getItem<any>('pulsefit_user_profile');
        if (storedProfile) {
          setProfile({
            age: Number(storedProfile.age) || 26,
            weightKg: Number(storedProfile.weightKg) || Number(storedProfile.weight) || 70,
            heightCm: Number(storedProfile.heightCm) || Number(storedProfile.height) || 175,
            gender: storedProfile.gender || 'male',
            restingHr: 65
          });
        }
        const hist = await acousticVascularService.getVascularBmrHistory();
        setHistory(hist);
      } catch (e) {
        console.warn('Error loading profile:', e);
      }
    })();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = useCallback(() => {
    isScanningRef.current = false;
    setIsScanning(false);
    setTorchOn(false);

    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // Reset strictly to zero as required
    setCurrentPulseBpm(0);
    setLiveVitals({
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
      readinessFeedback: 'Kripya scanner shuru karein aur camera par ungli rakhein',
      perfusionStatus: 'No Perfusion Detected'
    });
  }, []);

  const startScanner = async () => {
    stopScanner();
    setCameraError(null);
    triggerHapticFeedback('light');

    try {
      let stream: MediaStream;
      // Try environment camera with torch capability first
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 },
            // @ts-ignore
            advanced: [{ torch: true }]
          }
        });
      } catch {
        // Fallback to any camera
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 }
          }
        });
      }

      streamRef.current = stream;

      // Check torch support
      const track = stream.getVideoTracks()[0];
      if (track) {
        // @ts-ignore
        const capabilities = track.getCapabilities ? track.getCapabilities() : {};
        // @ts-ignore
        if (capabilities.torch) {
          setHasTorch(true);
          try {
            // @ts-ignore
            await track.applyConstraints({ advanced: [{ torch: true }] });
            setTorchOn(true);
          } catch {}
        }
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsScanning(true);
      isScanningRef.current = true;
      greenBufferRef.current = [];
      redBufferRef.current = [];
      lastPeakTimesRef.current = [];

      processFrameLoop();
    } catch (err: any) {
      console.error('Camera initialization error:', err);
      setCameraError(err.message || 'Camera permission denied. Please allow camera access.');
      stopScanner();
    }
  };

  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (!track) return;
    try {
      const next = !torchOn;
      // @ts-ignore
      await track.applyConstraints({ advanced: [{ torch: next }] });
      setTorchOn(next);
      triggerHapticFeedback('light');
    } catch {}
  };

  /**
   * Real-time camera frame processing loop:
   * Extracts Micro-Color Green & Red channel absorption variations (PPG micro-perfusion)
   */
  const processFrameLoop = () => {
    if (!isScanningRef.current || !videoRef.current) return;

    const video = videoRef.current;
    if (video.readyState >= 2) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          const width = 64;
          const height = 64;
          canvas.width = width;
          canvas.height = height;

          // Draw center region of camera
          ctx.drawImage(
            video,
            (video.videoWidth - width) / 2,
            (video.videoHeight - height) / 2,
            width,
            height,
            0,
            0,
            width,
            height
          );

          const frame = ctx.getImageData(0, 0, width, height);
          const data = frame.data;
          let sumGreen = 0;
          let sumRed = 0;
          const pixelCount = data.length / 4;

          for (let i = 0; i < data.length; i += 4) {
            sumRed += data[i];
            sumGreen += data[i + 1];
          }

          const avgGreen = sumGreen / pixelCount;
          const avgRed = sumRed / pixelCount;

          greenBufferRef.current.push(avgGreen);
          redBufferRef.current.push(avgRed);

          if (greenBufferRef.current.length > 90) greenBufferRef.current.shift();
          if (redBufferRef.current.length > 90) redBufferRef.current.shift();

          // Calculate pulse wave features
          if (greenBufferRef.current.length >= 30) {
            const greens = greenBufferRef.current;
            const minG = Math.min(...greens);
            const maxG = Math.max(...greens);
            const amplitude = (maxG - minG) / (maxG + 0.001);

            // Perfusion index = AC amplitude / DC average
            const meanG = greens.reduce((a, b) => a + b, 0) / greens.length;
            const perfusionIndex = Math.max(0, (maxG - minG) / (meanG + 0.001) * 100);

            // Simple peak detection on inverted green channel (absorption is highest at pulse peak)
            const now = Date.now();
            const lastVal = greens[greens.length - 1];
            const prevVal = greens[greens.length - 2];
            const prevPrevVal = greens[greens.length - 3];

            if (prevVal > lastVal && prevVal > prevPrevVal && (maxG - prevVal) < (prevVal - minG) * 0.4) {
              const lastPeak = lastPeakTimesRef.current[lastPeakTimesRef.current.length - 1] || 0;
              if (now - lastPeak > 420 && now - lastPeak < 1400) {
                lastPeakTimesRef.current.push(now);
                if (lastPeakTimesRef.current.length > 6) lastPeakTimesRef.current.shift();
              }
            }

            // Deduce live BPM
            let bpm = 0;
            if (lastPeakTimesRef.current.length >= 2) {
              let sumDiff = 0;
              for (let i = 1; i < lastPeakTimesRef.current.length; i++) {
                sumDiff += lastPeakTimesRef.current[i] - lastPeakTimesRef.current[i - 1];
              }
              const avgInterval = sumDiff / (lastPeakTimesRef.current.length - 1);
              bpm = Math.round(60000 / avgInterval);
              bpm = Math.max(50, Math.min(180, bpm));
            } else {
              bpm = 0;
            }

            setCurrentPulseBpm(bpm);

            // Offload full physiological vascular and dynamic BMR calculation to Comlink Web Worker
            acousticVascularService.analyzeVascularBmrProfile({
              age: profile.age,
              weightKg: profile.weightKg,
              heightCm: profile.heightCm,
              gender: profile.gender,
              restingHr: profile.restingHr,
              instantaneousHr: bpm,
              pulseAmplitude: amplitude,
              perfusionIndex: perfusionIndex,
              systolicUpstrokeRatio: 0.28
            }).then((result) => {
              if (!isScanningRef.current || !result) return;
              setLiveVitals(result);

              const wk4 = windkesselSdppgHemodynamicEngine.computeHemodynamicsAndBmr({
                age: profile.age,
                weightKg: profile.weightKg,
                heightCm: profile.heightCm,
                gender: profile.gender === 'female' ? 'female' : 'male',
                restingBpm: bpm > 0 ? bpm : profile.restingHr,
                hrvRmssdMs: Math.max(22, 65 - result.circulatoryFatiguePercent * 0.45),
                vascularReflectionIndex: Math.max(18, 22 + result.circulatoryFatiguePercent * 0.5)
              });
              setWk4Hemodynamics(wk4);

              // Periodic save to localforage + RxDB
              if (result.systolicPressureMmHg > 0 && now - lastScanPersistRef.current > 7000) {
                lastScanPersistRef.current = now;
                const rec: VascularBmrSessionRecord = {
                  id: 'vasc_' + Date.now(),
                  timestamp: Date.now(),
                  dateStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  systolic: result.systolicPressureMmHg,
                  diastolic: result.diastolicPressureMmHg,
                  map: result.meanArterialPressureMmHg,
                  bpCategory: result.bloodPressureCategory,
                  dynamicBmrKcal: result.dynamicBmrKcalDay,
                  hourlyBurnKcal: result.hourlyRestBurnKcal,
                  readinessScore: result.workoutReadinessScore,
                  fatiguePercent: result.circulatoryFatiguePercent,
                  readinessFeedback: result.readinessFeedback
                };
                acousticVascularService.saveVascularBmrRecord(rec).then(() => {
                  acousticVascularService.getVascularBmrHistory().then(setHistory);
                });
              }
            });
          }
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(processFrameLoop);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Title & Hinglish Explanatory Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-zinc-950 to-zinc-900 border border-amber-500/20 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Resting Calories &amp; Blood Pressure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Blood Flow Pressure &amp; Resting Calories</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              Yeh phone camera se skin ke <strong className="text-amber-300">micro-color changes</strong> ko trace karke bina kisi machine ke <strong className="text-amber-300">Blood Flow Pressure</strong> aur <strong className="text-amber-300">Daily Resting Calories</strong> calculate karta hai.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {hasTorch && (
              <button
                onClick={toggleTorch}
                disabled={!isScanning}
                className={`p-2.5 rounded-2xl border transition-all text-xs font-semibold flex items-center gap-2 ${
                  torchOn 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                    : 'bg-white/5 border-white/10 text-zinc-400'
                } ${!isScanning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                title="Toggle Torch / Flashlight"
              >
                <Flashlight className={`w-4 h-4 ${torchOn ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span className="hidden sm:inline">Torch: {torchOn ? 'ON' : 'OFF'}</span>
              </button>
            )}

            {!isScanning ? (
              <button
                onClick={startScanner}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-amber-600/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Start Micro-Color Scan</span>
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="px-5 py-3 rounded-2xl bg-orange-950/80 hover:bg-orange-900 border border-orange-500/40 text-orange-200 font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Stop Scanner</span>
              </button>
            )}
          </div>
        </div>

        {/* Instructions / Kaise Kaam Karega Guide */}
        <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-zinc-400">
          <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-2xl border border-white/5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
            <p><strong className="text-zinc-200">Camera Par Ungli Rakhein:</strong> Camera lens par halke se ungli rakhein (ya face focus karein).</p>
          </div>
          <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-2xl border border-white/5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
            <p><strong className="text-zinc-200">Micro-Color Pressure:</strong> Khoon ke har uchhal se vascular resistance aur BP status trace hota hai.</p>
          </div>
          <div className="flex items-start gap-2 bg-white/5 p-2.5 rounded-2xl border border-white/5">
            <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
            <p><strong className="text-zinc-200">Resting Calories &amp; Readiness:</strong> Rest mode calorie burn aur workout readiness instant milti hai.</p>
          </div>
        </div>

        {cameraError && (
          <div className="mt-4 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{cameraError}</span>
          </div>
        )}
      </div>

      {/* Hidden processing video & canvas */}
      <video ref={videoRef} playsInline muted className="hidden" />
      <canvas ref={canvasRef} className="hidden" />

      {/* Main Real-Time 3-Module Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Feature 1: Camera Micro-Color Pulse Pressure (Rakt Chaap Pressure Monitor) */}
        <div className="rounded-3xl bg-zinc-950/80 border border-white/10 p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Micro-Color Pulse Pressure</h3>
                  <p className="text-[11px] text-zinc-400">Rakt Chaap Pressure Monitor</p>
                </div>
              </div>
            </div>

            {/* Live Pressure Numbers */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Est. Blood Pressure</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {liveVitals.systolicPressureMmHg > 0 
                        ? `${liveVitals.systolicPressureMmHg} / ${liveVitals.diastolicPressureMmHg}`
                        : '0 / 0'}
                    </span>
                    <span className="text-xs text-rose-400 font-semibold">mmHg</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">MAP</span>
                  <div className="text-lg font-bold text-zinc-200 mt-1">
                    {liveVitals.meanArterialPressureMmHg > 0 ? `${liveVitals.meanArterialPressureMmHg}` : '0'} <span className="text-xs text-zinc-500">mmHg</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Pressure Status:</span>
                <span className={`font-bold px-2.5 py-0.5 rounded-full text-[11px] ${
                  liveVitals.bloodPressureCategory.includes('Normal')
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : liveVitals.bloodPressureCategory.includes('Elevated')
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : liveVitals.bloodPressureCategory.includes('Stress')
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {liveVitals.systolicPressureMmHg > 0 ? liveVitals.bloodPressureCategory : 'Not Measuring'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed">
              Phone camera se skin ke micro-color green/red attenuation changes ko trace karke bina BP belt ke blood flow pressure status ka instant estimation deta hai.
            </p>
          </div>
        </div>

        {/* Feature 2: Dynamic Metabolic Burn Rate (Jeev-Rasaayan BMR Gauge) */}
        <div className="rounded-3xl bg-zinc-950/80 border border-white/10 p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Dynamic Metabolic Burn</h3>
                  <p className="text-[11px] text-zinc-400">Daily Resting Calorie Gauge</p>
                </div>
              </div>
            </div>

            {/* Live BMR Numbers */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Resting Daily Calories</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-amber-300">
                      {liveVitals.dynamicBmrKcalDay > 0 ? liveVitals.dynamicBmrKcalDay : '0'}
                    </span>
                    <span className="text-xs text-amber-400 font-semibold">kcal/day</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Per Hour</span>
                  <div className="text-lg font-bold text-zinc-200 mt-1">
                    {liveVitals.hourlyRestBurnKcal > 0 ? `${liveVitals.hourlyRestBurnKcal}` : '0'} <span className="text-xs text-zinc-500">kcal/hr</span>
                  </div>
                </div>
              </div>

              {/* Metabolic Equivalent METs */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-zinc-400">Basal METs:</span>
                <span className="font-semibold text-amber-200">
                  {liveVitals.metabolicEquivalentMets > 0 ? `${liveVitals.metabolicEquivalentMets} MET` : '0 MET'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed">
              Biometric history, resting heart rate, aur instant skin micro-perfusion ko combine karke batata hai ki sharir bina kisi movement ke (Rest Mode mein) ek din mein kitni minimum calories burn karta hai.
            </p>
          </div>
        </div>

        {/* Feature 3: Vascular Fatigue & Workout Readiness (Nasa-Thakaan Indicator) */}
        <div className="rounded-3xl bg-zinc-950/80 border border-white/10 p-5 sm:p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Gauge className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Vascular Fatigue & Readiness</h3>
                  <p className="text-[11px] text-zinc-400">Nasa-Thakaan & Vyayam Indicator</p>
                </div>
              </div>
            </div>

            {/* Readiness Gauge & Circulatory Fatigue */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Workout Readiness</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl sm:text-3xl font-black text-emerald-300">
                      {liveVitals.workoutReadinessScore > 0 ? `${liveVitals.workoutReadinessScore}%` : '0%'}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Nasa-Thakaan</span>
                  <div className="text-lg font-bold text-rose-300 mt-1">
                    {liveVitals.circulatoryFatiguePercent > 0 ? `${liveVitals.circulatoryFatiguePercent}%` : '0%'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${liveVitals.workoutReadinessScore}%` }}
                />
              </div>

              {/* Dynamic Feedback Banner */}
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[11px] font-bold text-zinc-200 leading-snug block">
                  {liveVitals.workoutReadinessScore > 0 
                    ? liveVitals.readinessFeedback 
                    : 'Scanner chalu karke instant readiness check karein.'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 mt-3 leading-relaxed">
              BP Estimate, Pulse, aur Dynamic BMR ko aapas mein merge karke internal circulatory fatigue calculate karta hai aur clear recommendation deta hai.
            </p>
          </div>
        </div>

      </div>

      {/* Vascular Health & Daily Metabolism Consensus */}
      <div className="rounded-3xl bg-zinc-950/80 border border-white/10 p-5 sm:p-6 backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Vascular Health &amp; Daily Metabolism Breakdown
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            Cardiovascular Flexibility &amp; Resting Calorie Burn
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Vessel Resistance</span>
            <span className="text-lg font-black text-amber-400 font-mono mt-0.5">
              {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? wk4Hemodynamics.systemicVascularResistanceDyn : 0}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Elasticity: {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? wk4Hemodynamics.totalArterialComplianceMlMmHg : 0} mL/mmHg
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Vascular Age Score</span>
            <span className="text-lg font-black text-rose-400 font-mono mt-0.5">
              {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? wk4Hemodynamics.takazawaAgingIndex : '0.00'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Vascular Age: {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? wk4Hemodynamics.estimatedVascularAge : 0} yrs
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Heart Pump Flow</span>
            <span className="text-lg font-black text-emerald-400 font-mono mt-0.5">
              {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? `${wk4Hemodynamics.cardiacOutputLmin} L/m` : '0 L/m'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Beat Vol: {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? wk4Hemodynamics.strokeVolumeMl : 0} mL
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Heart Workload</span>
            <span className="text-lg font-black text-purple-400 font-mono mt-0.5">
              {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? wk4Hemodynamics.ratePressureProduct : 0}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Pumping Load Index
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Athletic Rest Burn</span>
            <span className="text-lg font-black text-cyan-400 font-mono mt-0.5">
              {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? `${wk4Hemodynamics.bmrCunningham} kcal` : '0 kcal'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Active Lean Target
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col">
            <span className="text-[10px] font-mono text-zinc-400 uppercase">Daily Baseline Burn</span>
            <span className="text-lg font-black text-white font-mono mt-0.5">
              {wk4Hemodynamics && liveVitals.systolicPressureMmHg > 0 ? `${wk4Hemodynamics.bmrBayesianConsensus} kcal` : '0 kcal'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              Precision Consensus
            </span>
          </div>
        </div>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <div className="rounded-3xl bg-zinc-950/60 border border-white/10 p-5 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Past Blood Pressure &amp; Dynamic Calorie Logs</span>
            </h4>
            <span className="text-[11px] text-zinc-400">{history.length} records saved (Private Vault)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {history.slice(0, 6).map((item) => (
              <div key={item.id} className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-medium">{item.dateStr}</span>
                  <span className="font-bold text-amber-300">{item.systolic}/{item.diastolic} mmHg</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Daily Resting Calories:</span>
                  <span className="font-semibold text-white">{item.dynamicBmrKcal} kcal/day</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-zinc-400">Readiness:</span>
                  <span className="font-semibold text-emerald-300">{item.readinessScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default VascularStressBmrAnalyzer;
