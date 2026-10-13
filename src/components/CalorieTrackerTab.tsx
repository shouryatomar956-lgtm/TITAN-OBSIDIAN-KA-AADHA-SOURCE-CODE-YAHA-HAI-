import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Vibrate, 
  Share2, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { CalorieTracker } from './CalorieTracker';
import { haptics } from '../utils/haptics';
import { cn } from '../lib/utils';
import { UserProfile } from '../services/storage';

interface CalorieTrackerTabProps {
  profile?: UserProfile | null;
}

export const CalorieTrackerTab: React.FC<CalorieTrackerTabProps> = ({ profile }) => {
  const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(haptics.isEnabled());
  const [sharedDataNotice, setSharedDataNotice] = useState<string | null>(null);
  const [hapticTestActive, setHapticTestActive] = useState(false);

  // 2. Web Share Target Detection from URL search params
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const sharedTitle = params.get('title');
    const sharedText = params.get('text');
    const sharedUrl = params.get('url');

    if (sharedTitle || sharedText || sharedUrl) {
      const incoming = sharedText || sharedTitle || sharedUrl || '';
      setSharedDataNotice(`Shared meal received: "${incoming.slice(0, 40)}${incoming.length > 40 ? '...' : ''}"`);
      // Notify components via event
      window.dispatchEvent(new CustomEvent('pulsefit_share_target_received', {
        detail: { title: sharedTitle, text: sharedText, url: sharedUrl }
      }));
      // Clean query params without reload
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  const toggleHaptics = async () => {
    const next = !hapticsEnabled;
    setHapticsEnabled(next);
    await haptics.setEnabled(next);
    if (next) {
      setHapticTestActive(true);
      haptics.vibrate('heartbeat');
      setTimeout(() => setHapticTestActive(false), 1200);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-white text-zinc-900 min-h-0 overflow-y-auto smooth-scroll-container">
      {/* Top Native Integrations Ribbon (Clean PulseFit style) */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-3 pb-1">
        <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80 shadow-xs">
          
          {/* Left: Integration Indicators */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Memory Core / Auto-Save Guard */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-purple-50 text-purple-700 border border-purple-200/60 text-xs font-bold font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden sm:inline">Memory Guard</span>
              <span className="sm:hidden">Saved</span>
            </div>

            {/* Web Share Target status */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/60 text-xs font-bold font-mono">
              <Share2 className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Share Target</span>
            </div>
          </div>

          {/* Right: Haptic Alert Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleHaptics}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all shadow-xs active:scale-95",
                hapticsEnabled 
                  ? "bg-amber-50 text-amber-800 border border-amber-300/80 hover:bg-amber-100" 
                  : "bg-zinc-100 text-zinc-500 hover:text-zinc-700 border border-zinc-200"
              )}
              title="Toggle tactile haptic feedback on calorie budget alerts"
            >
              <Vibrate className={cn("w-3.5 h-3.5", hapticTestActive ? "text-rose-600 animate-bounce" : "text-amber-600")} />
              <span>{hapticsEnabled ? 'Haptics: On' : 'Haptics: Off'}</span>
            </button>
          </div>
        </div>

        {/* Web Share Alert Banner */}
        <AnimatePresence>
          {sharedDataNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-2.5 p-3 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center justify-between text-xs font-medium shadow-xs"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{sharedDataNotice}</span>
              </div>
              <button
                type="button"
                onClick={() => setSharedDataNotice(null)}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[11px] hover:bg-indigo-700"
              >
                Dismiss
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Unified Calorie Tracker Core */}
      <div className="flex-1 w-full">
        <CalorieTracker profile={profile} />
      </div>
    </div>
  );
};
