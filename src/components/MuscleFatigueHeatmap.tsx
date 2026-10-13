import React, { useState, useEffect, memo } from 'react';
import { 
  Activity, 
  RotateCw, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Clock, 
  Zap,
  Info,
  Layers
} from 'lucide-react';
import { fatigueHeatmapService, SystemicRecoverySummary, MuscleId, MuscleFatigueState } from '../services/fatigueHeatmapService';
import { continuousPhysiologyEngine, ContinuousPhysiologySnapshot } from '../services/continuousPhysiologyEngine';
import { triggerHapticFeedback } from '../utils/haptics';

export const MuscleFatigueHeatmap = memo(function MuscleFatigueHeatmap() {
  const [data, setData] = useState<SystemicRecoverySummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleFatigueState | null>(null);
  const [viewAngle, setViewAngle] = useState<'anterior' | 'posterior'>('anterior');
  const [livePhysio, setLivePhysio] = useState<ContinuousPhysiologySnapshot>(() => continuousPhysiologyEngine.getSnapshot());

  const refreshHeatmap = async () => {
    setLoading(true);
    try {
      const summary = await fatigueHeatmapService.compute48HourFatigue();
      setData(summary);
      if (!selectedMuscle && summary.muscles.chest) {
        setSelectedMuscle(summary.muscles.chest);
      } else if (selectedMuscle && summary.muscles[selectedMuscle.id]) {
        setSelectedMuscle(summary.muscles[selectedMuscle.id]);
      }
    } catch (e) {
      console.warn('[MuscleHeatmap] Refresh notice:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshHeatmap();
    const unsubPhysio = continuousPhysiologyEngine.subscribe((snap) => {
      setLivePhysio(snap);
    });

    let decayInterval: number | null = null;
    let unsubBattery: (() => void) | null = null;

    import('../services/batterySaverService').then(({ batterySaverService }) => {
      unsubBattery = batterySaverService.subscribe((isBatterySaverOn) => {
        if (isBatterySaverOn) {
          if (decayInterval !== null) {
            window.clearInterval(decayInterval);
            decayInterval = null;
          }
        } else {
          if (decayInterval === null) {
            decayInterval = window.setInterval(() => {
              refreshHeatmap();
            }, 15000);
          }
        }
      });
    }).catch(() => {
      decayInterval = window.setInterval(() => {
        refreshHeatmap();
      }, 15000);
    });

    const handleLiveUpdate = () => {
      refreshHeatmap();
    };
    window.addEventListener('pulsefit_exercise_logged', handleLiveUpdate);
    window.addEventListener('pulsefit_workout_logged', handleLiveUpdate);
    window.addEventListener('pulsefit_rep_session_saved', handleLiveUpdate);
    window.addEventListener('pulsefit_telemetry_updated', handleLiveUpdate);
    return () => {
      unsubPhysio();
      if (unsubBattery) unsubBattery();
      if (decayInterval !== null) window.clearInterval(decayInterval);
      window.removeEventListener('pulsefit_exercise_logged', handleLiveUpdate);
      window.removeEventListener('pulsefit_workout_logged', handleLiveUpdate);
      window.removeEventListener('pulsefit_rep_session_saved', handleLiveUpdate);
      window.removeEventListener('pulsefit_telemetry_updated', handleLiveUpdate);
    };
  }, []);

  const handleMuscleClick = (mId: MuscleId) => {
    triggerHapticFeedback('light');
    if (data?.muscles[mId]) {
      setSelectedMuscle(data.muscles[mId]);
    }
  };

  const getMuscleFillColor = (mId: MuscleId) => {
    const m = data?.muscles[mId];
    if (!m || m.fatiguePercent === 0) return '#27272a'; // Clean neutral charcoal when 0%
    if (m.fatiguePercent <= 20) return '#10b981';      // Fresh active
    if (m.fatiguePercent <= 60) return '#f59e0b';      // Moderate fatigue
    return '#ef4444';                                   // High fatigue
  };

  const isZeroFatigue = !data?.hasActiveFatigue || data?.completedWorkoutsCount === 0;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Real-Time Muscle Fatigue & Recovery Heatmap</h2>
            <p className="text-xs text-white/60">
              {isZeroFatigue 
                ? 'Zero workouts in past 48h — 0% systemic fatigue across all muscle groups' 
                : `${data?.completedWorkoutsCount} active sessions recorded • ${data?.totalVolumeLast48h} kg total 48h volume`}
            </p>
          </div>
        </div>

        {/* View Switcher & Refresh */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => { setViewAngle('anterior'); triggerHapticFeedback('light'); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewAngle === 'anterior' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Anterior (Front)
            </button>
            <button
              onClick={() => { setViewAngle('posterior'); triggerHapticFeedback('light'); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewAngle === 'posterior' 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Posterior (Back)
            </button>
          </div>

          <button
            onClick={refreshHeatmap}
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            title="Recalculate Real-Time 48-Hour Recovery"
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Heatmap Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Anatomical 2D Vector Body Map */}
        <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-between shadow-xl relative min-h-[440px]">
          {/* Legend */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <span className="text-xs font-mono font-bold uppercase text-white/50">
              {viewAngle === 'anterior' ? 'Front Anatomical Plane' : 'Rear Anatomical Plane'}
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-500" />
                <span className="text-[10px] text-white/60">0% (Rested)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-white/60">1-20% (Fresh)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-[10px] text-white/60">21-60% (Moderate)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-[10px] text-white/60">61%+ (Overreached)</span>
              </div>
            </div>
          </div>

          {/* SVG Body Vector */}
          <div className="w-full max-w-[340px] h-[360px] relative flex items-center justify-center">
            <svg viewBox="0 0 200 320" className="w-full h-full filter drop-shadow-md select-none">
              {/* Head / Neck Base */}
              <circle cx="100" cy="28" r="16" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
              <rect x="94" y="44" width="12" height="10" rx="3" fill="#3f3f46" />

              {viewAngle === 'anterior' ? (
                // ANTERIOR (FRONT) VIEW
                <g>
                  {/* Shoulders Left & Right */}
                  <path
                    d="M 66 54 Q 75 50 86 52 L 82 72 Q 68 70 66 54 Z"
                    fill={getMuscleFillColor('shoulders')}
                    stroke={data?.muscles.shoulders?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('shoulders')}
                  />
                  <path
                    d="M 134 54 Q 125 50 114 52 L 118 72 Q 132 70 134 54 Z"
                    fill={getMuscleFillColor('shoulders')}
                    stroke={data?.muscles.shoulders?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('shoulders')}
                  />

                  {/* Chest (Pectorals) */}
                  <path
                    d="M 82 56 Q 100 58 118 56 L 117 84 Q 100 90 83 84 Z"
                    fill={getMuscleFillColor('chest')}
                    stroke={data?.muscles.chest?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('chest')}
                  />

                  {/* Biceps Left & Right */}
                  <rect
                    x="58" y="74" width="14" height="26" rx="5"
                    fill={getMuscleFillColor('biceps')}
                    stroke={data?.muscles.biceps?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('biceps')}
                  />
                  <rect
                    x="128" y="74" width="14" height="26" rx="5"
                    fill={getMuscleFillColor('biceps')}
                    stroke={data?.muscles.biceps?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('biceps')}
                  />

                  {/* Forearms Left & Right */}
                  <rect x="54" y="103" width="12" height="30" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
                  <rect x="134" y="103" width="12" height="30" rx="4" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />

                  {/* Core / Abdominals */}
                  <path
                    d="M 85 86 Q 100 90 115 86 L 113 135 Q 100 138 87 135 Z"
                    fill={getMuscleFillColor('core')}
                    stroke={data?.muscles.core?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('core')}
                  />

                  {/* Quadriceps Left & Right */}
                  <path
                    d="M 84 140 Q 98 142 98 175 L 96 215 Q 82 215 82 175 Z"
                    fill={getMuscleFillColor('quads')}
                    stroke={data?.muscles.quads?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('quads')}
                  />
                  <path
                    d="M 116 140 Q 102 142 102 175 L 104 215 Q 118 215 118 175 Z"
                    fill={getMuscleFillColor('quads')}
                    stroke={data?.muscles.quads?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('quads')}
                  />

                  {/* Knees */}
                  <circle cx="89" cy="222" r="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />
                  <circle cx="111" cy="222" r="6" fill="#27272a" stroke="#3f3f46" strokeWidth="1.5" />

                  {/* Calves (Front Shins / Gastrocnemius edges) */}
                  <rect
                    x="83" y="230" width="13" height="50" rx="5"
                    fill={getMuscleFillColor('calves')}
                    stroke={data?.muscles.calves?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('calves')}
                  />
                  <rect
                    x="104" y="230" width="13" height="50" rx="5"
                    fill={getMuscleFillColor('calves')}
                    stroke={data?.muscles.calves?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('calves')}
                  />
                </g>
              ) : (
                // POSTERIOR (BACK) VIEW
                <g>
                  {/* Traps & Upper Back */}
                  <path
                    d="M 80 50 Q 100 45 120 50 L 126 80 Q 100 86 74 80 Z"
                    fill={getMuscleFillColor('upper_back')}
                    stroke={data?.muscles.upper_back?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('upper_back')}
                  />

                  {/* Lats (Latissimus Dorsi) */}
                  <path
                    d="M 74 81 Q 88 84 94 92 L 88 126 Q 72 108 72 88 Z"
                    fill={getMuscleFillColor('lats')}
                    stroke={data?.muscles.lats?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('lats')}
                  />
                  <path
                    d="M 126 81 Q 112 84 106 92 L 112 126 Q 128 108 128 88 Z"
                    fill={getMuscleFillColor('lats')}
                    stroke={data?.muscles.lats?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('lats')}
                  />

                  {/* Triceps Left & Right */}
                  <rect
                    x="58" y="74" width="14" height="26" rx="5"
                    fill={getMuscleFillColor('triceps')}
                    stroke={data?.muscles.triceps?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('triceps')}
                  />
                  <rect
                    x="128" y="74" width="14" height="26" rx="5"
                    fill={getMuscleFillColor('triceps')}
                    stroke={data?.muscles.triceps?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('triceps')}
                  />

                  {/* Lower Back */}
                  <path
                    d="M 92 94 Q 100 93 108 94 L 109 128 Q 100 130 91 128 Z"
                    fill={getMuscleFillColor('lower_back')}
                    stroke={data?.muscles.lower_back?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('lower_back')}
                  />

                  {/* Glutes */}
                  <path
                    d="M 83 132 Q 100 134 117 132 L 118 160 Q 100 166 82 160 Z"
                    fill={getMuscleFillColor('glutes')}
                    stroke={data?.muscles.glutes?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('glutes')}
                  />

                  {/* Hamstrings */}
                  <path
                    d="M 83 164 Q 97 166 97 195 L 96 215 Q 82 215 82 190 Z"
                    fill={getMuscleFillColor('hamstrings')}
                    stroke={data?.muscles.hamstrings?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('hamstrings')}
                  />
                  <path
                    d="M 117 164 Q 103 166 103 195 L 104 215 Q 118 215 118 190 Z"
                    fill={getMuscleFillColor('hamstrings')}
                    stroke={data?.muscles.hamstrings?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('hamstrings')}
                  />

                  {/* Calves (Rear Gastrocnemius) */}
                  <rect
                    x="83" y="228" width="14" height="52" rx="5"
                    fill={getMuscleFillColor('calves')}
                    stroke={data?.muscles.calves?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('calves')}
                  />
                  <rect
                    x="103" y="228" width="14" height="52" rx="5"
                    fill={getMuscleFillColor('calves')}
                    stroke={data?.muscles.calves?.fatiguePercent ? '#10b981' : '#3f3f46'}
                    strokeWidth="1.5"
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleMuscleClick('calves')}
                  />
                </g>
              )}
            </svg>
          </div>

          <div className="text-[11px] text-white/50 text-center mt-2 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-white/40" />
            {isZeroFatigue ? 'No workouts logged yet. All muscle groups are at 0% fatigue.' : 'Click any muscle to inspect localized volume and fatigue breakdown.'}
          </div>
        </div>

        {/* Right Details Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Systemic Fatigue & Readiness Score Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col shadow-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-1">
              Systemic Fatigue & CNS Readiness
            </span>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black text-white tracking-tight">
                {data?.systemicFatigueScore ?? 0}%
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {isZeroFatigue ? '0% Fatigue (Fully Rested)' : `${data?.systemicReadinessScore}% CNS Readiness`}
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {isZeroFatigue 
                ? 'User has not completed any workouts in the last 48 hours. Zero fatigue accumulated across all 12 anatomical groups.' 
                : `Accumulated across ${data?.totalSetsLast48h} sets and ${data?.totalVolumeLast48h} kg total load over rolling 48-hour window.`}
            </p>
          </div>

          {/* Selected Muscle Deep Dive */}
          {selectedMuscle && (
            <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3.5 h-3.5 rounded-full shadow border border-white/20"
                    style={{ backgroundColor: selectedMuscle.fatiguePercent === 0 ? '#3f3f46' : selectedMuscle.statusColor }}
                  />
                  <h3 className="text-sm font-black text-white">
                    {selectedMuscle.name}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-white/50 uppercase">
                  {selectedMuscle.category}
                </span>
              </div>

              {/* Metric stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                  <span className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" />
                    Fatigue Load
                  </span>
                  <span className="text-xl font-black text-white mt-0.5">
                    {selectedMuscle.fatiguePercent}%
                  </span>
                  <span className="text-[10px] text-white/40">{selectedMuscle.fatiguePercent === 0 ? '0% Fatigue (Fresh)' : selectedMuscle.recoveryStatus}</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
                  <span className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-indigo-400" />
                    Elapsed Rest
                  </span>
                  <span className="text-xl font-black text-white mt-0.5">
                    {selectedMuscle.hoursSinceTrained !== null ? `${selectedMuscle.hoursSinceTrained}h` : '0h (No workout)'}
                  </span>
                  <span className="text-[10px] text-white/40">{selectedMuscle.hoursSinceTrained !== null ? 'Since stimulus' : 'No recent load'}</span>
                </div>
              </div>

              {/* Sets & Volume in 48h */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-black/40 border border-white/10 mb-4 text-xs font-mono">
                <span className="text-white/60">48h Volume: <strong className="text-white">{selectedMuscle.totalVolumeLast48h} kg</strong></span>
                <span className="text-white/60">Sets: <strong className="text-white">{selectedMuscle.totalSetsLast48h}</strong></span>
              </div>

              {/* Recommendation */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  Biomechanical Guidance
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {selectedMuscle.readinessRecommendation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MuscleFatigueHeatmap;
