import React, { useState, memo, Suspense, lazy } from 'react';
import { 
  HeartPulse, 
  Box,
  Activity,
  Gauge,
  Loader2
} from 'lucide-react';
import { triggerHapticFeedback } from '../utils/haptics';

const HeartRateMonitor = lazy(() => import('./HeartRateMonitor').then(m => ({ default: m.HeartRateMonitor })));
const SmartBodyMesh3D = lazy(() => import('./SmartBodyMesh3D').then(m => ({ default: m.SmartBodyMesh3D })));
const AcousticHeartPulseEngine = lazy(() => import('./AcousticHeartPulseEngine').then(m => ({ default: m.AcousticHeartPulseEngine })));
const BmrVascularAnalyzer = lazy(() => import('./BmrVascularAnalyzer').then(m => ({ default: m.BmrVascularAnalyzer })));

export type VitalsSubTab = 'heart_rate' | 'body_mesh' | 'acoustic_pulse' | 'bmr_vascular';

export const VitalsBiometricSuite = memo(function VitalsBiometricSuite() {
  const [activeSubTab, setActiveSubTab] = useState<VitalsSubTab>('heart_rate');

  const handleSubTabChange = (tab: VitalsSubTab) => {
    triggerHapticFeedback('light');
    setActiveSubTab(tab);
  };

  return (
    <div className="w-full flex flex-col px-4 sm:px-6 md:px-8 pb-14 space-y-6">
      {/* Top Segmented Sub-Navigation for all 4 Vitals Toggles */}
      <div className="w-full flex items-center justify-between overflow-x-auto py-1 px-1 bg-zinc-950/40 p-1.5 rounded-3xl border border-white/10 backdrop-blur-xl scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {/* Toggle 1: Heart Rate & HRV */}
          <button
            onClick={() => handleSubTabChange('heart_rate')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'heart_rate'
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <HeartPulse className="w-4 h-4 text-rose-300" />
            <span>Heart Rate &amp; Recovery</span>
          </button>

          {/* Toggle 2: Smart 3D Body Scan */}
          <button
            onClick={() => handleSubTabChange('body_mesh')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'body_mesh'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Box className="w-4 h-4 text-cyan-300" />
            <span>Smart 3D Body Scan</span>
          </button>

          {/* Toggle 3: Heart Sound & Pulse Engine */}
          <button
            onClick={() => handleSubTabChange('acoustic_pulse')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'acoustic_pulse'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Activity className="w-4 h-4 text-emerald-300" />
            <span>Heart Sound & Pulse (Mic)</span>
          </button>

          {/* Toggle 4: BMR & Vascular Stress Analyzer */}
          <button
            onClick={() => handleSubTabChange('bmr_vascular')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSubTab === 'bmr_vascular'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/25'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Gauge className="w-4 h-4 text-amber-300" />
            <span>Resting Calories & Blood Pressure</span>
          </button>
        </div>
      </div>

      {/* SubTab Content Viewports */}
      <div className="w-full">
        <Suspense
          fallback={
            <div className="w-full min-h-[360px] rounded-3xl bg-zinc-900/50 border border-white/10 flex flex-col items-center justify-center gap-3 text-rose-300">
              <Loader2 className="w-7 h-7 animate-spin" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Connecting sensors...</span>
            </div>
          }
        >
          {activeSubTab === 'heart_rate' && <HeartRateMonitor />}
          {activeSubTab === 'body_mesh' && <SmartBodyMesh3D />}
          {activeSubTab === 'acoustic_pulse' && <AcousticHeartPulseEngine />}
          {activeSubTab === 'bmr_vascular' && <BmrVascularAnalyzer />}
        </Suspense>
      </div>
    </div>
  );
});

export default VitalsBiometricSuite;
