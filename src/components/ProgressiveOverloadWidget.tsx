import React, { useState, useEffect, memo } from 'react';
import { 
  TrendingUp, 
  Dumbbell, 
  ArrowUpRight, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Zap, 
  Target,
  RotateCw,
  Info
} from 'lucide-react';
import { progressiveOverloadEngine, OverloadSuggestion } from '../services/progressiveOverloadEngine';
import { triggerHapticFeedback } from '../utils/haptics';

export const ProgressiveOverloadWidget = memo(function ProgressiveOverloadWidget() {
  const [suggestion, setSuggestion] = useState<OverloadSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const evaluateRealTimeOverload = async () => {
    setLoading(true);
    setAccepted(false);
    try {
      const res = await progressiveOverloadEngine.computeOverloadTarget('');
      setSuggestion(res);
    } catch (e) {
      console.warn('[ProgressiveOverload] Evaluation notice:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    evaluateRealTimeOverload();
    const handleLiveUpdate = () => {
      evaluateRealTimeOverload();
    };
    window.addEventListener('pulsefit_exercise_logged', handleLiveUpdate);
    window.addEventListener('pulsefit_workout_logged', handleLiveUpdate);
    window.addEventListener('pulsefit_rep_session_saved', handleLiveUpdate);
    window.addEventListener('pulsefit_telemetry_updated', handleLiveUpdate);
    return () => {
      window.removeEventListener('pulsefit_exercise_logged', handleLiveUpdate);
      window.removeEventListener('pulsefit_workout_logged', handleLiveUpdate);
      window.removeEventListener('pulsefit_rep_session_saved', handleLiveUpdate);
      window.removeEventListener('pulsefit_telemetry_updated', handleLiveUpdate);
    };
  }, []);

  const handleApply = () => {
    triggerHapticFeedback('success');
    setAccepted(true);
  };

  const hasHistory = suggestion?.hasHistory ?? false;

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Real-Time Progressive Overload Engine</h2>
            <p className="text-xs text-white/60">
              {hasHistory 
                ? `Active real-time adaptation calculated from ${suggestion?.previousSessionsCount} completed sessions` 
                : 'Zero historical workout logs found — 0 baseline metrics active'}
            </p>
          </div>
        </div>

        <button
          onClick={evaluateRealTimeOverload}
          className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
          title="Refresh Real-Time Overload Analysis"
        >
          <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin text-amber-400' : ''}`} />
        </button>
      </div>

      {/* Suggestion & Analytics Card */}
      {suggestion && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Target Recommendation */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-5">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {hasHistory ? 'Prescribed Session Target' : 'Real-Time Baseline (Awaiting Activity)'}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/10 text-white">
                  {suggestion.previousSessionsCount} Historical Logs Analyzed
                </span>
              </div>

              {/* Target Stat Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
                    {hasHistory ? suggestion.exerciseName : 'Universal Session'}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-[10px] font-mono font-bold text-amber-300">
                    {hasHistory ? suggestion.recommendedAction.replace('_', ' ') : '0 Workouts Completed'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 my-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Target Load</span>
                    <span className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {suggestion.targetWeight} <span className="text-xs font-normal text-white/60">kg</span>
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Target Reps</span>
                    <span className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {suggestion.targetReps}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-white/50 uppercase">Target Sets</span>
                    <span className="text-2xl sm:text-3xl font-black text-white mt-1">
                      {suggestion.targetSets}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/70 leading-relaxed mt-2 pt-2 border-t border-white/10">
                  {suggestion.rationale}
                </p>
              </div>

              {/* Scientific Protocol Spec */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <Target className="w-4 h-4 text-amber-400 shrink-0" />
                  Adaptation Logic
                </div>
                <p className="text-xs text-white/60">
                  {suggestion.scientificProtocol}
                </p>
              </div>
            </div>

            {hasHistory && (
              <div className="pt-2">
                <button
                  onClick={handleApply}
                  disabled={accepted}
                  className={`w-full py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                    accepted
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg shadow-amber-500/20 active:scale-98'
                  }`}
                >
                  {accepted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Protocol Applied to Current Session
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="w-4 h-4" />
                      Apply Overload Target to Session
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Historical Baseline Panel */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col shadow-xl">
              <span className="text-xs font-mono font-bold tracking-widest text-white/50 uppercase mb-4">
                Historical Peak Benchmarks
              </span>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                      <Dumbbell className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Peak Load Logged</div>
                      <div className="text-[10px] text-white/40">From past sessions</div>
                    </div>
                  </div>
                  <span className="text-base font-black text-white font-mono">
                    {suggestion.recentMaxWeight} kg
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Max Reps Achieved</div>
                      <div className="text-[10px] text-white/40">In single working set</div>
                    </div>
                  </div>
                  <span className="text-base font-black text-white font-mono">
                    {suggestion.recentMaxReps} reps
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Max Session Volume</div>
                      <div className="text-[10px] text-white/40">Sets × Reps × Load</div>
                    </div>
                  </div>
                  <span className="text-base font-black text-white font-mono">
                    {suggestion.recentMaxVolume} kg
                  </span>
                </div>
              </div>

              {!hasHistory && (
                <div className="mt-4 p-3 rounded-2xl bg-black/40 border border-white/10 text-[11px] text-white/50 flex items-center gap-2">
                  <Info className="w-4 h-4 text-white/40 shrink-0" />
                  <span>No completed sessions recorded yet. All benchmark values start at 0.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProgressiveOverloadWidget;
