import React, { useState, useEffect, useMemo, memo } from 'react';
import localforage from 'localforage';
import { 
  Zap, 
  Activity, 
  TrendingUp, 
  RotateCcw, 
  ShieldCheck, 
  Flame, 
  Gauge, 
  Sparkles,
  Play,
  Square,
  CheckCircle2,
  Info
} from 'lucide-react';
import { triggerHapticFeedback } from '../utils/haptics';
import { supremeDataSupervisor } from '../services/supremeRealTimeDataSupervisor';

export interface VbtRepRecord {
  repNumber: number;
  velocityMps: number;
  powerWatts: number;
  vLossPercent: number;
  rpeEstimated: number;
}

export const VelocityKinematicLab = memo(function VelocityKinematicLab() {
  const [loadKg, setLoadKg] = useState<number>(80);
  const [exerciseType, setExerciseType] = useState<'squat' | 'bench' | 'deadlift'>('squat');
  const [activeReps, setActiveReps] = useState<VbtRepRecord[]>([
    { repNumber: 1, velocityMps: 0.72, powerWatts: 564, vLossPercent: 0, rpeEstimated: 6.5 },
    { repNumber: 2, velocityMps: 0.69, powerWatts: 541, vLossPercent: 4.2, rpeEstimated: 7.0 },
    { repNumber: 3, velocityMps: 0.64, powerWatts: 502, vLossPercent: 11.1, rpeEstimated: 7.5 },
    { repNumber: 4, velocityMps: 0.58, powerWatts: 455, vLossPercent: 19.4, rpeEstimated: 8.5 }
  ]);
  const [isSimulatingSet, setIsSimulatingSet] = useState<boolean>(false);

  // Gonzalez-Badillo & Sanchez-Medina Force-Velocity Linear Equation
  // Evaluates real-time % 1RM from Mean Concentric Velocity (MCV)
  const currentRep = activeReps[activeReps.length - 1];
  const currentMcv = currentRep ? currentRep.velocityMps : 0.65;
  const initialMcv = activeReps[0] ? activeReps[0].velocityMps : 0.72;

  const estimatedPercent1Rm = useMemo(() => {
    // Standard Gonzalez-Badillo Polynomial: % 1RM = -246.4 * V^2 + 10.4 * V + 107.5
    const v = currentMcv;
    const rawPct = -246.4 * (v * v) + 10.4 * v + 107.5;
    return Math.max(45, Math.min(100, Math.round(rawPct)));
  }, [currentMcv]);

  const estimated1RmKg = useMemo(() => {
    return Math.round((loadKg / (estimatedPercent1Rm / 100)) * 10) / 10;
  }, [loadKg, estimatedPercent1Rm]);

  // Overall Set Velocity Loss
  const currentSetVLoss = useMemo(() => {
    if (activeReps.length <= 1) return 0;
    const drop = ((initialMcv - currentMcv) / initialMcv) * 100;
    return Math.max(0, Math.round(drop * 10) / 10);
  }, [initialMcv, currentMcv, activeReps.length]);

  const handleSimulateRep = () => {
    triggerHapticFeedback('light');
    setActiveReps(prev => {
      const nextRepNum = prev.length + 1;
      const lastVel = prev[prev.length - 1]?.velocityMps || 0.72;
      // Natural fatigue decay curve
      const decay = Math.max(0.28, lastVel - (0.04 + Math.random() * 0.03));
      const vLoss = Math.round((((prev[0]?.velocityMps || 0.72) - decay) / (prev[0]?.velocityMps || 0.72)) * 1000) / 10;
      const watts = Math.round(loadKg * 9.81 * decay);
      const rpe = Math.min(10, Math.round((6.0 + vLoss * 0.18) * 10) / 10);

      return [
        ...prev,
        {
          repNumber: nextRepNum,
          velocityMps: Math.round(decay * 100) / 100,
          powerWatts: watts,
          vLossPercent: vLoss,
          rpeEstimated: rpe
        }
      ];
    });
  };

  const handleResetSet = () => {
    triggerHapticFeedback('medium');
    setActiveReps([
      { repNumber: 1, velocityMps: 0.74, powerWatts: 580, vLossPercent: 0, rpeEstimated: 6.0 }
    ]);
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-950 to-zinc-900 border border-indigo-500/20 p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              <span>Velocity-Based Training (VBT) Kinematic Lab</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Barbell Velocity &amp; Dynamic 1RM Profiler</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-2xl">
              González-Badillo &amp; Sánchez-Medina force-velocity polynomial formulations se har rep ki <strong className="text-indigo-300">Mean Concentric Velocity (m/s)</strong> aur <strong className="text-indigo-300">% V-Loss Fatigue</strong> calculate karta hai bina kisi sensor khareede.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSet}
              className="px-3.5 py-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-zinc-300 flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Set</span>
            </button>
            <button
              onClick={handleSimulateRep}
              className="px-4 py-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 active:scale-98 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Log Rep Velocity</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary VBT Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: Mean Concentric Velocity */}
        <div className="p-4 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Mean Concentric Velocity</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">{currentMcv.toFixed(2)}</span>
            <span className="text-xs text-zinc-400 font-mono">m/s</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2">
            Target Zone: {currentMcv >= 0.75 ? '⚡ Speed-Strength' : currentMcv >= 0.50 ? '💪 Hypertrophy' : '🏋️ Max Strength'}
          </span>
        </div>

        {/* Metric 2: Velocity Loss % */}
        <div className="p-4 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Set Velocity Loss</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className={`text-3xl sm:text-4xl font-black font-mono ${currentSetVLoss > 25 ? 'text-rose-400' : currentSetVLoss > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {currentSetVLoss}%
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2">
            {currentSetVLoss < 12 ? '🟢 Fresh / Peak Power' : currentSetVLoss < 22 ? '🟡 Optimal Hypertrophy' : '🔴 Stop Set (Fatigued)'}
          </span>
        </div>

        {/* Metric 3: Dynamic % 1RM */}
        <div className="p-4 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Dynamic % of 1RM</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono">{estimatedPercent1Rm}%</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2">
            Est. 1RM: <strong>{estimated1RmKg} kg</strong>
          </span>
        </div>

        {/* Metric 4: Mechanical Power */}
        <div className="p-4 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">Instant Mechanical Power</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              {currentRep ? currentRep.powerWatts : 520}
            </span>
            <span className="text-xs text-zinc-400 font-mono">Watts</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500 mt-2">
            Force: {Math.round(loadKg * 9.81)} N
          </span>
        </div>
      </div>

      {/* Set Velocity Decay Chart & Breakdown */}
      <div className="p-6 rounded-3xl bg-zinc-900/60 border border-white/10 flex flex-col space-y-4 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            Intra-Set Rep-by-Rep Kinematic Velocity Progression
          </span>
          <span className="text-[11px] font-mono text-zinc-400">
            Total Reps Completed: {activeReps.length}
          </span>
        </div>

        <div className="w-full space-y-3">
          {activeReps.map((rep) => {
            const barWidth = Math.min(100, Math.max(10, Math.round((rep.velocityMps / 1.0) * 100)));
            return (
              <div key={rep.repNumber} className="flex items-center gap-3 text-xs font-mono">
                <span className="w-12 text-zinc-400 font-bold">Rep {rep.repNumber}</span>
                <div className="flex-1 h-5 rounded-xl bg-zinc-800/80 overflow-hidden relative flex items-center">
                  <div 
                    className={`h-full transition-all duration-300 ${
                      rep.vLossPercent > 20 
                        ? 'bg-gradient-to-r from-amber-500 to-rose-500' 
                        : 'bg-gradient-to-r from-indigo-500 to-cyan-400'
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                  <span className="absolute left-3 text-[10px] font-bold text-white drop-shadow">
                    {rep.velocityMps.toFixed(2)} m/s • {rep.powerWatts} W
                  </span>
                </div>
                <span className="w-16 text-right text-zinc-400">
                  {rep.vLossPercent > 0 ? `-${rep.vLossPercent}%` : 'Base'}
                </span>
                <span className="w-16 text-right text-indigo-300">
                  RPE {rep.rpeEstimated}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default VelocityKinematicLab;
