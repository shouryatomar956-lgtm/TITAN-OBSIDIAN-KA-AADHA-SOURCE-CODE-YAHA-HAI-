import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Activity,
  HeartPulse,
  Droplets,
  ShieldCheck,
  Zap,
  Sparkles,
  Database,
  Crosshair,
  Volume2,
  CheckCircle2,
  Flame,
  ArrowRight,
  Eye,
  Lock
} from 'lucide-react';
import { polyglotStorageMesh } from '../services/polyglotStorageMesh';

interface InteractiveProductManualProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface ManualPageData {
  id: number;
  badge: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  gradient: string;
  borderGlow: string;
  steps: {
    number: string;
    headline: string;
    detail: string;
  }[];
  proTip: {
    label: string;
    text: string;
  };
}

const MANUAL_PAGES: ManualPageData[] = [
  {
    id: 1,
    badge: 'GUIDE 01 • WORKOUT & EXERCISES',
    title: '5,050+ Exercise Explorer & Workout Builder',
    tagline: 'Search any exercise, view proper form & build your personal strength routine',
    icon: Dumbbell,
    gradient: 'from-emerald-600 via-teal-600 to-cyan-500',
    borderGlow: 'rgba(16, 185, 129, 0.4)',
    steps: [
      {
        number: '01',
        headline: 'Instant Offline Exercise Search',
        detail: 'Tap the Exercises tab to find over 5,050 exercises by muscle group (Chest, Legs, Back, Arms) or available equipment (Dumbbells, Barbells, Bodyweight) in under a second with zero internet.'
      },
      {
        number: '02',
        headline: 'Visual Form Guides & Muscle Map',
        detail: 'Tap any exercise to see which muscles work hardest, along with clear step-by-step form cues to lift safely and protect your joints from strain.'
      },
      {
        number: '03',
        headline: 'Smart Strength Progression & 1-Rep Max',
        detail: 'Log your sets, reps, and weights. The app automatically calculates your strength level and suggests when you are ready to safely increase weights for steady muscle growth.'
      },
      {
        number: '04',
        headline: 'Personalized Workout Routine Builder',
        detail: 'Create your own custom workout splits or choose pre-built routines designed for muscle building, fat loss, or athletic stamina.'
      }
    ],
    proTip: {
      label: 'Tip for Better Results',
      text: 'Focus on smooth, controlled movements rather than rushing through reps. Steady control builds more strength and keeps your joints safe.'
    }
  },
  {
    id: 2,
    badge: 'GUIDE 02 • CAMERA REP TRACKER',
    title: 'Hands-Free Camera Rep Counter & Speed Coach',
    tagline: 'Automatic rep counting, lifting speed & fatigue detection without touching your phone',
    icon: Activity,
    gradient: 'from-cyan-600 via-blue-600 to-indigo-500',
    borderGlow: 'rgba(6, 182, 212, 0.4)',
    steps: [
      {
        number: '01',
        headline: 'Easy Camera Placement',
        detail: 'Prop your phone upright against a water bottle or wall 2 to 3 meters away so your entire body from head to shoes is visible in the frame.'
      },
      {
        number: '02',
        headline: 'Automatic Hands-Free Rep Counting',
        detail: 'Start your exercise. The camera tracks your body joints and counts each completed repetition out loud so you can stay fully focused on lifting.'
      },
      {
        number: '03',
        headline: 'Live Lift Speed & Movement Power',
        detail: 'Watch how quickly and powerfully you move each rep in meters per second (m/s). Moving the weight with maximum intent recruits more muscle fibers for faster gains.'
      },
      {
        number: '04',
        headline: 'Smart Fatigue Warning & Safe Racking',
        detail: 'When your reps slow down significantly due to tiredness, the app sounds a gentle alert so you can safely rack the weight before bad form causes injury.'
      },
      {
        number: '05',
        headline: '100% Private On Your Device',
        detail: 'All camera tracking runs entirely inside your phone. No videos, photos, or camera feeds are ever recorded, saved, or uploaded anywhere.'
      }
    ],
    proTip: {
      label: 'Camera Tip',
      text: 'Set up in a reasonably well-lit room. Good lighting ensures the camera tracks your movement smoothly without missing any reps.'
    }
  },
  {
    id: 3,
    badge: 'GUIDE 03 • HEART & BODY VITALS',
    title: 'Heart Rate, Recovery Score & 3D Body Avatar',
    tagline: 'Check your pulse, daily workout readiness, heart stethoscope & 3D physique',
    icon: HeartPulse,
    gradient: 'from-rose-600 via-pink-600 to-purple-500',
    borderGlow: 'rgba(244, 63, 94, 0.4)',
    steps: [
      {
        number: '01',
        headline: 'Fingertip Camera Heart Rate Check',
        detail: 'Gently rest your fingertip over the rear camera lens. In just 20 seconds, the camera measures your exact heart beats per minute (BPM) accurately.'
      },
      {
        number: '02',
        headline: 'Daily Recovery & Readiness Score',
        detail: 'Check your morning recovery score from 1 to 100. A high score means your body is fully recovered for a tough workout; a lower score tells you to take a lighter day.'
      },
      {
        number: '03',
        headline: 'Acoustic Heart Stethoscope',
        detail: 'Hold your phone microphone against your chest over your shirt to listen to your natural heart sound rhythm and track your heart calmness trends.'
      },
      {
        number: '04',
        headline: 'Interactive 3D Body Transformation',
        detail: 'Rotate the 3D body avatar to inspect individual muscle groups, view body fat estimates, lean muscle mass, and track your visual physique progress.'
      },
      {
        number: '05',
        headline: 'Arterial Vitality & Heart Age Check',
        detail: 'Review your cardiovascular flow score to see how youthful and healthy your blood flow and heart elasticity are compared to your calendar age.'
      }
    ],
    proTip: {
      label: 'Best Time to Measure',
      text: 'Check your resting heart rate and recovery score right after waking up for the most consistent daily wellness insights.'
    }
  },
  {
    id: 4,
    badge: 'GUIDE 04 • HYDRATION & NUTRITION',
    title: 'Automatic Sip Hydration & Food Nutrition Ledger',
    tagline: 'Automatic sip listening, sweat loss recovery & 3,900+ verified food tracker',
    icon: Droplets,
    gradient: 'from-amber-500 via-orange-600 to-sky-500',
    borderGlow: 'rgba(245, 158, 11, 0.4)',
    steps: [
      {
        number: '01',
        headline: 'Automatic Sip Listening',
        detail: 'Place your phone nearby while exercising. The app automatically hears when you take a drink of water and logs 240 mL without you typing anything.'
      },
      {
        number: '02',
        headline: 'Workout Sweat Loss & Fluid Need',
        detail: 'Based on workout duration and room temperature, the app calculates how much water and essential minerals you sweat out so you know how much to drink.'
      },
      {
        number: '03',
        headline: 'Natural Electrolyte Recovery Drinks',
        detail: 'Get simple, healthy recipes using water, a pinch of salt, lemon, and honey or fruit juice for rapid natural hydration without sugary store-bought drinks.'
      },
      {
        number: '04',
        headline: '3,900+ Verified Food Nutrition Database',
        detail: 'Search thousands of foods to instantly see total calories, protein, carbs, and healthy fats for every meal you eat.'
      },
      {
        number: '05',
        headline: 'Daily Calorie & Protein Targets',
        detail: 'Set your fitness target (build muscle, lose fat, or stay active) and track your daily calorie and protein progress with a clean visual progress ring.'
      }
    ],
    proTip: {
      label: 'Hydration Advice',
      text: 'Take small, regular sips throughout your workout rather than waiting until you feel thirsty. This keeps your energy and muscles performing at their peak.'
    }
  },
  {
    id: 5,
    badge: 'GUIDE 05 • TIMER, PRIVACY & BACKUP',
    title: 'Tactile Rest Timer, Biometric Lock & Private Vault',
    tagline: 'Physical vibration countdown, fingerprint security & 100% offline data backup',
    icon: ShieldCheck,
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    borderGlow: 'rgba(139, 92, 246, 0.4)',
    steps: [
      {
        number: '01',
        headline: 'Tactile Rest Timer with Physical Vibrations',
        detail: 'Select 30s, 60s, or 90s at the bottom of your overview screen. Tap Play to start a reverse countdown with real vibration pulses and audio beeps so you never miss your next set.'
      },
      {
        number: '02',
        headline: 'Biometric Fingerprint & Passkey Lock',
        detail: 'Keep your private body measurements, weight, and workout logs completely secure using your phone built-in fingerprint sensor or a private 4-digit PIN.'
      },
      {
        number: '03',
        headline: '100% Offline with Zero Cloud Tracking',
        detail: 'PulseFit runs entirely offline on your phone with zero internet required. Your personal health data is never uploaded to external servers or shared with advertisers.'
      },
      {
        number: '04',
        headline: '1-Click Encrypted Backup & Restore',
        detail: 'Download a secure backup file to your phone with one tap. You can restore your complete history anytime if you switch phones or want a saved copy.'
      },
      {
        number: '05',
        headline: 'Always-On Local Data Protection',
        detail: 'Your workout and nutrition logs are continuously protected on your phone so you never lose your progress even if your phone battery dies mid-session.'
      }
    ],
    proTip: {
      label: 'Your Data, Your Control',
      text: 'Export a backup file once a month to keep an offline copy of your entire lifetime fitness journey safe forever.'
    }
  }
];

export const InteractiveProductManual: React.FC<InteractiveProductManualProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);

  // Trigger subtle tactile haptic vibration
  const triggerHaptic = useCallback((pattern: number | number[]) => {
    try {
      if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch {}
  }, []);

  const handleNext = () => {
    if (currentPage < MANUAL_PAGES.length - 1) {
      setDirection(1);
      setCurrentPage((prev) => prev + 1);
      triggerHaptic([20]);
    } else {
      triggerHaptic([35, 50]);
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage((prev) => prev - 1);
      triggerHaptic([20]);
    }
  };

  const handleJumpToPage = (index: number) => {
    setDirection(index > currentPage ? 1 : -1);
    setCurrentPage(index);
    triggerHaptic([18]);
  };

  const handleSkipAll = () => {
    triggerHaptic([30, 40]);
    onSkip();
  };

  const page = MANUAL_PAGES[currentPage];
  const IconComponent = page.icon;
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === MANUAL_PAGES.length - 1;

  // Keyboard navigation support (Arrow keys + Escape to skip)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') handleSkipAll();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950 text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Top Header & Fast Skip Button */}
      <header className="w-full max-w-2xl mx-auto px-5 pt-safe pt-4 pb-2 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-black text-xs shadow-md shadow-purple-600/30">
            P
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wider uppercase font-mono text-zinc-300">
              PULSEFIT MANUAL
            </span>
            <span className="text-[10px] text-zinc-500 font-medium">
              Interactive Master Guide
            </span>
          </div>
        </div>

        {/* 1-Click Skip Button */}
        <button
          onClick={handleSkipAll}
          className="px-3.5 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition-all border border-zinc-800 flex items-center gap-1.5 cursor-pointer active:scale-95"
        >
          <span>Skip Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Slide Carousel Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-2 flex flex-col justify-center min-h-0 relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="w-full flex flex-col h-full max-h-[82vh] overflow-y-auto scrollbar-none pb-2"
          >
            {/* Hero Badge & Card */}
            <div
              className="w-full rounded-[28px] p-5 sm:p-6 text-white relative overflow-hidden transition-all duration-500 bg-zinc-900 border"
              style={{
                borderColor: page.borderGlow,
                boxShadow: `0 15px 40px -15px ${page.borderGlow}`
              }}
            >
              {/* Background Ambient Glow */}
              <div
                className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 bg-gradient-to-br ${page.gradient} pointer-events-none`}
              />

              {/* Module Tag & Page Counter */}
              <div className="flex items-center justify-between mb-3 z-10 relative">
                <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/10 text-zinc-200 border border-white/10">
                  {page.badge}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-800/80 px-2.5 py-0.5 rounded-lg border border-zinc-700/60">
                  {page.id} / {MANUAL_PAGES.length}
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="flex items-start gap-3.5 mb-2 z-10 relative">
                <div
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${page.gradient} flex items-center justify-center shrink-0 shadow-lg`}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-white leading-tight">
                    {page.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1 font-medium leading-relaxed">
                    {page.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Step-by-Step Practical Feature Instructions */}
            <div className="mt-4 space-y-2.5">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
                How to Use This Engine:
              </span>
              {page.steps.map((st) => (
                <div
                  key={st.number}
                  className="bg-zinc-900/90 border border-zinc-800/80 rounded-2xl p-3.5 flex items-start gap-3 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-7 h-7 rounded-xl bg-zinc-800 text-zinc-300 font-mono text-xs font-black flex items-center justify-center shrink-0 border border-zinc-700/50">
                    {st.number}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-200">
                      {st.headline}
                    </span>
                    <span className="text-[11px] text-zinc-400 leading-relaxed mt-0.5">
                      {st.detail}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Rigor & Pro Tip Box */}
            <div className="mt-3 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-3 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                <strong className="text-purple-300 font-semibold">{page.proTip.label}: </strong>
                {page.proTip.text}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Sticky Navigation Bar: Arrows + Interactive Dots + Skip */}
      <footer className="w-full max-w-2xl mx-auto px-5 pb-safe pb-5 pt-3 flex flex-col gap-3 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent">
        {/* Navigation Action Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Left Arrow Button (Reverse Page) */}
          <button
            onClick={handlePrev}
            disabled={isFirstPage}
            aria-label="Previous Page"
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer border ${
              isFirstPage
                ? 'bg-zinc-900/40 text-zinc-700 border-zinc-850 opacity-40 cursor-not-allowed'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white border-zinc-700 active:scale-95 shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Interactive Pagination Dots / Indicator */}
          <div className="flex items-center gap-2 bg-zinc-900/90 px-4 py-2.5 rounded-full border border-zinc-800">
            {MANUAL_PAGES.map((p, idx) => {
              const isActive = idx === currentPage;
              return (
                <button
                  key={p.id}
                  onClick={() => handleJumpToPage(idx)}
                  aria-label={`Jump to page ${p.id}`}
                  className={`transition-all rounded-full cursor-pointer ${
                    isActive
                      ? 'w-6 h-2 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-xs'
                      : 'w-2 h-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                />
              );
            })}
          </div>

          {/* Right Arrow / Finish Button (Palatne ke liye / Get Started) */}
          <button
            onClick={handleNext}
            aria-label={isLastPage ? 'Finish Manual and Create Profile' : 'Next Page'}
            className={`h-12 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-lg ${
              isLastPage
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black shadow-emerald-500/20 px-6 font-black'
                : 'bg-white hover:bg-zinc-200 text-black shadow-white/10'
            }`}
          >
            {isLastPage ? (
              <>
                <span>Create Profile</span>
                <CheckCircle2 className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Bottom Secondary Skip Indicator */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleSkipAll}
            className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors font-medium py-1 cursor-pointer"
          >
            Skip all 5 manual pages & setup profile directly →
          </button>
        </div>
      </footer>
    </div>
  );
};
