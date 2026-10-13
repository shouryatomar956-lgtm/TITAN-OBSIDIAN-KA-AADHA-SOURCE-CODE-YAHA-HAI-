import React, { useState, memo, Suspense, lazy } from 'react';
import { 
  Camera, 
  Scale, 
  Activity, 
  TrendingUp, 
  Code2, 
  PlusCircle,
  Sparkles,
  Loader2
} from 'lucide-react';
import { triggerHapticFeedback } from '../utils/haptics';

const RepCounter = lazy(() => import('./RepCounter').then(m => ({ default: m.RepCounter })));
const MediaPipePoseEngine = lazy(() => import('./MediaPipePoseEngine').then(m => ({ default: m.MediaPipePoseEngine })));
const PlateCalculator = lazy(() => import('./PlateCalculator').then(m => ({ default: m.PlateCalculator })));
const MuscleFatigueHeatmap = lazy(() => import('./MuscleFatigueHeatmap').then(m => ({ default: m.MuscleFatigueHeatmap })));
const ProgressiveOverloadWidget = lazy(() => import('./ProgressiveOverloadWidget').then(m => ({ default: m.ProgressiveOverloadWidget })));

export type SuiteSubTab = 'mediapipe_pose' | 'rep_counter' | 'plate_calculator' | 'fatigue_heatmap' | 'progressive_overload' | 'custom_workspace';

export const RepCounterVolumeSuite = memo(function RepCounterVolumeSuite() {
  const [activeSubTab, setActiveSubTab] = useState<SuiteSubTab>('mediapipe_pose');

  const handleSubTabChange = (tab: SuiteSubTab) => {
    triggerHapticFeedback('light');
    setActiveSubTab(tab);
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-6 md:px-8 pb-12 space-y-6">
      {/* Top Segmented Sub-Navigation */}
      <div className="w-full flex items-center justify-between overflow-x-auto py-1 px-1 bg-zinc-950/40 p-1.5 rounded-3xl border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-1.5 min-w-max">
          <button
            onClick={() => handleSubTabChange('mediapipe_pose')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'mediapipe_pose'
                ? 'bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
            <span>MediaPipe 33-Pt Form & Rep AI</span>
          </button>

          <button
            onClick={() => handleSubTabChange('rep_counter')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'rep_counter'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>AI Kinematic Reps</span>
          </button>

          <button
            onClick={() => handleSubTabChange('plate_calculator')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'plate_calculator'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Plate Calculator</span>
          </button>

          <button
            onClick={() => handleSubTabChange('fatigue_heatmap')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'fatigue_heatmap'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Fatigue Heatmap</span>
          </button>

          <button
            onClick={() => handleSubTabChange('progressive_overload')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'progressive_overload'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Progressive Overload</span>
          </button>

          <button
            onClick={() => handleSubTabChange('custom_workspace')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'custom_workspace'
                ? 'bg-zinc-800 text-white shadow-md border border-white/20'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Custom Extension</span>
          </button>
        </div>
      </div>

      {/* Content Rendering based on SubTab */}
      <div className="w-full">
        <Suspense
          fallback={
            <div className="w-full min-h-[360px] rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col items-center justify-center gap-3 text-cyan-300">
              <Loader2 className="w-7 h-7 animate-spin" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Loading On-Demand Biomechanical Engine...</span>
            </div>
          }
        >
          {activeSubTab === 'mediapipe_pose' && <MediaPipePoseEngine />}
          {activeSubTab === 'rep_counter' && <RepCounter />}
          {activeSubTab === 'plate_calculator' && <PlateCalculator />}
          {activeSubTab === 'fatigue_heatmap' && <MuscleFatigueHeatmap />}
          {activeSubTab === 'progressive_overload' && <ProgressiveOverloadWidget />}
        </Suspense>
        
        {/* The clean reserved sandbox workspace */}
        {activeSubTab === 'custom_workspace' && (
          <div className="w-full min-h-[460px] bg-zinc-900/60 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden backdrop-blur-xl">
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 mb-4 shadow-inner">
              <PlusCircle className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mb-2">
              Rep Counter & Volume Calculator Sandbox
            </h3>
            <p className="text-sm text-white/60 max-w-md mb-6 leading-relaxed">
              This dedicated workspace is reserved for your custom extensions, barbell density formulas, or future custom volume metrics.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                100% Client-Side
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                Async localforage
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70">
                Offline Edge Ready
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default RepCounterVolumeSuite;
