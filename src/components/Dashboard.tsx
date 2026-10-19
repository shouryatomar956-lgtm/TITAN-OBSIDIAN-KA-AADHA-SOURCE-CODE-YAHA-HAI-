import { useEffect, useState, useMemo, useCallback, startTransition, memo, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import localforage from 'localforage';
import { Flame, CheckCircle2, Trophy, Dumbbell, Zap, BatteryLow, BrainCircuit, Shield, ShieldCheck, LayoutDashboard, Database, Search, Activity, Crosshair, Settings, Palette, User, Soup, Vault, ChevronLeft, ChevronRight, HeartPulse, Droplets, MoreHorizontal, X, Loader2, Cpu } from 'lucide-react';
import { storage, AppState } from '../services/storage';
import { storageQueueManager } from '../services/StorageService';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';
import {  ExerciseEntity } from '../services/exerciseFactory';

import { BiometricSettings } from './BiometricSettings';
import { UserProfileForm } from './UserProfileForm';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { SupremeHapticRestTimer } from './SupremeHapticRestTimer';
import { ExerciseCatalog } from './ExerciseCatalog';
import { useSearchRegistration } from '../hooks/useSearchRegistration';
import { ExokernelSupervisorTelemetryModal } from './ExokernelSupervisorTelemetryModal';


type Mood = 'Energetic' | 'Tired' | 'Stressed';
export type ThemeType = 'midnight' | 'charcoal' | 'deep-forest';

import { suggestionWorkerPool } from '../utils/suggestionWorkerPool';
import { globalWorkerFactory } from '../utils/workerFactory';
import { getMasterExerciseDatabaseAsync } from '../services/exerciseFactory';
import { Play } from 'lucide-react';

import { ProfileView } from './ProfileView';
import { CalorieTrackerTab } from './CalorieTrackerTab';
import { BadgeUnlockOverlay } from './BadgeUnlockOverlay';
import { vaultService } from '../services/vaultService';
import { executeOptimisticUpdate } from '../utils/optimizationEngine';
import { DashboardSkeleton } from './DashboardSkeleton';

const VaultView = lazy(() => import('./VaultView').then(m => ({ default: m.VaultView })));
const RepCounterVolumeSuite = lazy(() => import('./RepCounterVolumeSuite').then(m => ({ default: m.RepCounterVolumeSuite })));
const VitalsBiometricSuite = lazy(() => import('./VitalsBiometricSuite').then(m => ({ default: m.VitalsBiometricSuite })));
const AdvancedHydrationCenter = lazy(() => import('./AdvancedHydrationCenter').then(m => ({ default: m.AdvancedHydrationCenter })));
const DietSuite = lazy(() => import('./DietSuite').then(m => ({ default: m.DietSuite })));

const FoodBowlIcon = memo(function FoodBowlIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Food heaped in bowl */}
      <path d="M4 11c1.5-2.5 4-4 8-4s6.5 1.5 8 4" />
      <path d="M8.5 7c.5-1.5 1.5-2 3.5-2s3 1 3.5 2" />
      <path d="M12 3v2" />
      {/* Bowl curve and base foot */}
      <path d="M3 11c0 5 4 9 9 9s9-4 9-9H3z" />
      <path d="M8 20h8" />
    </svg>
  );
});

export const Dashboard = memo(function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'exercises' | 'calories' | 'diet' | 'vault' | 'profile' | 'rep-counter-volume' | 'vitals' | 'water'>('overview');
  const [currentTheme, setCurrentTheme] = useState<string>('obsidian-violet');
  useEffect(() => {
    const unsub = vaultService.subscribeToActiveTheme((theme) => {
      if (theme) setCurrentTheme(theme);
    });
    return () => unsub();
  }, []);
  const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);

  useSearchRegistration({
    id: 'route_overview',
    title: 'Dashboard Overview',
    category: 'Navigation',
    keywords: ['home', 'dashboard', 'stats', 'streak', 'overview'],
    aliases: ['main menu'],
    priority: 100,
    route: 'overview'
  });

  useSearchRegistration({
    id: 'route_exercises',
    title: 'Exercise Catalog',
    category: 'Navigation',
    keywords: ['exercises', 'catalog', 'database', 'workouts', 'movements'],
    aliases: ['list of exercises'],
    priority: 95,
    route: 'exercises'
  });

  useSearchRegistration({
    id: 'route_calories',
    title: 'Calorie Tracker',
    category: 'Navigation',
    keywords: ['calories', 'food', 'nutrition', 'diet', 'meal', 'tracker'],
    aliases: ['food log', 'diet tracker'],
    priority: 90,
    route: 'calories'
  });

  useSearchRegistration({
    id: 'route_diet',
    title: 'Diet',
    category: 'Navigation',
    keywords: ['diet', 'food', 'meal', 'nutrition', 'macros', 'bowl', 'khana'],
    aliases: ['diet tab', 'food plan'],
    priority: 88,
    route: 'diet'
  });

  useSearchRegistration({
    id: 'route_vault',
    title: 'Vault',
    category: 'Navigation',
    keywords: ['vault', 'storage', 'data', 'security'],
    aliases: ['vault'],
    priority: 85,
    route: 'vault'
  });

  useSearchRegistration({
    id: 'route_rep_counter_volume',
    title: 'Rep Counter & Volume Calculator',
    category: 'Navigation',
    keywords: ['rep', 'counter', 'camera', 'pose', 'volume', 'calculator', 'plates', 'barbell', 'fatigue', 'heatmap', 'overload'],
    aliases: ['rep counter', 'volume calculator', 'ai coach'],
    priority: 82,
    route: 'rep-counter-volume'
  });

  useSearchRegistration({
    id: 'route_vitals',
    title: 'Vitals & Pulse',
    category: 'Navigation',
    keywords: ['vitals', 'pulse', 'heart', 'rate', 'ecg', 'cardio'],
    aliases: ['pulse monitor', 'vitals'],
    priority: 80,
    route: 'vitals'
  });

  useSearchRegistration({
    id: 'route_water',
    title: 'Water & Hydration',
    category: 'Navigation',
    keywords: ['water', 'hydration', 'drink', 'fluid', 'aqua', 'pani'],
    aliases: ['water tracker', 'hydration'],
    priority: 78,
    route: 'water'
  });

  const [exercisesPage, setExercisesPage] = useState(1);
  const [state, setState] = useState<AppState | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState<Mood>('Energetic');
  const [moodDifficulty, setMoodDifficulty] = useState<Record<Mood, string>>({
    Energetic: 'Intermediate',
    Tired: 'Beginner',
    Stressed: 'Intermediate'
  });
  const [toastMessage, setToastMessage] = useState('');
  const [debugDbCount, setDebugDbCount] = useState<number | null>(null);
  const [smartSuggestion, setSmartSuggestion] = useState<ExerciseEntity[] | null>(null);

  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);

  const checkTabsScroll = useCallback(() => {
    const el = tabsContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const nextLeft = scrollLeft > 6;
    const nextRight = scrollLeft + clientWidth < scrollWidth - 6;
    setCanScrollLeft(prev => (prev !== nextLeft ? nextLeft : prev));
    setCanScrollRight(prev => (prev !== nextRight ? nextRight : prev));
  }, []);

  const scrollTabs = useCallback((direction: 'left' | 'right') => {
    const el = tabsContainerRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction === 'left' ? -140 : 140,
      behavior: 'smooth'
    });
  }, []);

  useEffect(() => {
    const el = tabsContainerRef.current;
    if (!el) return;

    // Check on mount & window resize
    checkTabsScroll();
    const handleResize = () => checkTabsScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkTabsScroll]);

  useEffect(() => {
    // When activeTab changes, auto scroll active tab into view and update arrow indicators
    const el = tabsContainerRef.current;
    if (el) {
      const activeBtn = el.querySelector<HTMLElement>('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    }
    const timer = setTimeout(() => {
      checkTabsScroll();
    }, 150);
    return () => clearTimeout(timer);
  }, [activeTab, checkTabsScroll]);

  useEffect(() => {
    const unsubToast = vaultService.subscribeToToast((toast) => {
      setToastMessage(toast.message);
      setTimeout(() => {
        setToastMessage('');
      }, 4500);
    });

    const handleWindowToast = (e: any) => {
      if (e.detail?.message) {
        setToastMessage(e.detail.message);
        setTimeout(() => {
          setToastMessage('');
        }, 4500);
      }
    };

    const handleNavigateTab = (e: any) => {
      if (e.detail) {
        startTransition(() => {
          setActiveTab(e.detail);
        });
      }
    };

    window.addEventListener('pulsefit_toast', handleWindowToast);
    window.addEventListener('pulsefit_navigate_tab', handleNavigateTab);
    return () => {
      unsubToast();
      window.removeEventListener('pulsefit_toast', handleWindowToast);
      window.removeEventListener('pulsefit_navigate_tab', handleNavigateTab);
    };
  }, []);

  const checkDebugDbCount = async () => {
    try {
      const data: any = await localforage.getItem('exercise_tab_v27_mathematical_allocation');
      setDebugDbCount(data ? data.length : 0);
    } catch(e) {
      setDebugDbCount(-1);
    }
  };

  // Load and initialize data strictly serialized through Centralized StorageService Queue Manager
  useEffect(() => {
    vaultService.applyCssVariablesToDom(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    async function init() {
      await storage.ensureCurrentWeekWorkouts();
      const data = await storage.getState();
      const p = await storage.getUserProfile();
      setProfile(p);
      setState(data);
      setLoading(false);
      // Execute serialized startup sequence (Migration -> Streak Validator -> 40-Day Pruning -> Hydration -> Vault)
      storageQueueManager.runStartupSequence().then(async () => {
        const syncedState = await storage.getState();
        const syncedProfile = await storage.getUserProfile();
        setState(syncedState);
        if (syncedProfile) setProfile(syncedProfile);
      }).catch(() => {});
    }
    init();
  }, []);

  const handleToggleInjury = useCallback((dateStr: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const isCurrentlyInjured = prev.injuryDate === dateStr;
      return { ...prev, injuryDate: isCurrentlyInjured ? null : dateStr };
    });
    
    // Fire and forget
    storage.toggleInjuryStatus(dateStr).then((newState) => {
      setState(newState); // Ensure it's in sync
    }).catch(console.error);
  }, []);

  const handleToggleShield = useCallback(async (dateStr: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const shielded = prev.protectedRestDates || [];
      const isShielded = shielded.includes(dateStr);
      return {
        ...prev,
        protectedRestDates: isShielded ? shielded.filter(d => d !== dateStr) : [...shielded, dateStr]
      };
    });
    const newState = await storage.toggleRestDayShield(dateStr);
    setState(newState);
  }, []);

  useEffect(() => {
    const handleExerciseLogged = (e: any) => {
      if (e.detail?.state) setState(e.detail.state);
    };
    const handleProfileUpdated = async () => {
      const updatedProfile = await storage.getUserProfile();
      if (updatedProfile) setProfile(updatedProfile);
    };
    const handleRemoteSync = async () => {
      const latestState = await storage.getState();
      const latestProfile = await storage.getUserProfile();
      setState(latestState);
      if (latestProfile) setProfile(latestProfile);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('pulsefit_exercise_logged', handleExerciseLogged);
      window.addEventListener('pulsefit_profile_updated', handleProfileUpdated);
      window.addEventListener('pulsefit_workout_logged', handleRemoteSync);
      window.addEventListener('pulsefit_rep_session_saved', handleRemoteSync);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('pulsefit_exercise_logged', handleExerciseLogged);
        window.removeEventListener('pulsefit_profile_updated', handleProfileUpdated);
        window.removeEventListener('pulsefit_workout_logged', handleRemoteSync);
        window.removeEventListener('pulsefit_rep_session_saved', handleRemoteSync);
      }
    };
  }, []);

  const [recommendedExercises, setRecommendedExercises] = useState<ExerciseEntity[]>([]);
  
  useEffect(() => {
    if (!profile) return;
    let isMounted = true;
    
    const isInjured = state?.injuryDate === format(new Date(), 'yyyy-MM-dd');
    suggestionWorkerPool.execute('GENERATE_WORKOUT', {
      profile,
      mood,
      isInjured,
      workouts: state?.workouts || []
    }).then(res => {
      if (isMounted) {
        setRecommendedExercises(res);
        setSmartSuggestion(res);
      }
    }).catch(console.error);

    return () => { isMounted = false; };
  }, [profile, mood, state?.workouts, state?.injuryDate, state?.currentStreak]);

  const completedWorkoutsThisMonth = useMemo(() => {
    if (!state?.workouts || state.workouts.length === 0) return 0;
    const currentMonth = format(new Date(), 'yyyy-MM');
    return state.workouts.filter(w => (w.isCompleted || (w as any).completed) && w.date && w.date.startsWith(currentMonth)).length;
  }, [state?.workouts]);

  const handleCompleteSession = () => {
      executeOptimisticUpdate(
        () => {
          setToastMessage(`Absolute Beast Mode! You're crushing it, ${profile?.username || 'Athlete'}!`);
        },
        async () => {
          const newState = await storage.completeDailySession();
          setState(newState);
          // Evaluate vault milestones to trigger Rare / Mythic unlocks immediately
          vaultService.evaluateVaultMilestones().catch(() => {});
          setTimeout(() => setToastMessage(''), 4000);
          return newState;
        }
      );
  };

    if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-zinc-900 font-sans selection:bg-purple-200 flex flex-col">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md pt-safe px-4 pb-2">
        <div className="w-full flex items-center justify-between h-14 gap-2">
          <div className="flex items-center gap-2.5 shrink-0">
             <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-sm transition-all duration-500"
                style={{
                  background: 'var(--accent-gradient, linear-gradient(135deg, #06b6d4 0%, #2563eb 100%))',
                  boxShadow: '0 4px 12px var(--border-glow, rgba(139, 92, 246, 0.35))'
                }}
             >
                P
             </div>
             <div className="flex flex-col hidden sm:flex">
                <span className="text-sm font-black tracking-wider text-zinc-900 uppercase font-mono">PULSEFIT</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest -mt-1">Performance Protocol</span>
             </div>
          </div>
          
          {/* Slideable / Scrollable toggles container with indicator arrows */}
          <div className="relative flex items-center min-w-0 max-w-full flex-1 justify-end">
             {/* Left scroll arrow indicator */}
             {canScrollLeft && (
               <button 
                  onClick={() => scrollTabs('left')}
                  title="Scroll left"
                  aria-label="Scroll left"
                  className="absolute -left-2 z-20 w-6 h-6 rounded-full bg-white/95 shadow-md border border-zinc-200/90 text-zinc-700 hover:text-black hover:bg-zinc-100 flex items-center justify-center transition-all cursor-pointer"
               >
                  <ChevronLeft className="w-3.5 h-3.5" />
               </button>
             )}

             {/* Slideable toggles strip (Icon-Only) */}
             <div 
                ref={tabsContainerRef}
                onScroll={checkTabsScroll}
                className="flex items-center gap-1.5 p-1 bg-zinc-100 rounded-xl overflow-x-auto scroll-smooth max-w-full touch-pan-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
             >
                <button 
                   onClick={() => setActiveTab('overview')}
                   data-active={activeTab === 'overview'}
                   title="Overview"
                   aria-label="Overview"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'overview' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <LayoutDashboard className="w-4 h-4" />
                </button>
                <button 
                   onClick={() => setActiveTab('exercises')}
                   data-active={activeTab === 'exercises'}
                   title="Exercise Database"
                   aria-label="Exercise Database"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'exercises' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <Dumbbell className="w-4 h-4" />
                </button>
                <button 
                   onClick={() => setActiveTab('calories')}
                   data-active={activeTab === 'calories'}
                   title="Calorie Tracker"
                   aria-label="Calorie Tracker"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'calories' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <Flame className="w-4 h-4 text-amber-500" />
                </button>
                <button 
                   onClick={() => setActiveTab('diet')}
                   data-active={activeTab === 'diet'}
                   title="Diet"
                   aria-label="Diet"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'diet' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <FoodBowlIcon className="w-4 h-4 text-emerald-500" />
                </button>
                <button 
                   onClick={() => setActiveTab('vault')}
                   data-active={activeTab === 'vault'}
                   title="Vault"
                   aria-label="Vault"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'vault' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <Vault className="w-4 h-4 text-purple-600" />
                </button>
                <button 
                   onClick={() => setActiveTab('rep-counter-volume')}
                   data-active={activeTab === 'rep-counter-volume'}
                   title="Rep Counter & Volume Calculator"
                   aria-label="Rep Counter & Volume Calculator"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'rep-counter-volume' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <Activity className="w-4 h-4 text-cyan-500" />
                </button>
                <button 
                   onClick={() => setActiveTab('vitals')}
                   data-active={activeTab === 'vitals'}
                   title="Pulse & Vitals"
                   aria-label="Pulse & Vitals"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'vitals' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <HeartPulse className="w-4 h-4 text-rose-500" />
                </button>
                <button 
                   onClick={() => setActiveTab('water')}
                   data-active={activeTab === 'water'}
                   title="Hydration"
                   aria-label="Hydration"
                   className={cn("shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center", activeTab === 'water' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700")}
                >
                   <Droplets className="w-4 h-4 text-sky-400" />
                </button>
                <button 
                   onClick={() => setActiveTab('profile')}
                   data-active={activeTab === 'profile'}
                   title="User Profile"
                   aria-label="User Profile"
                   className={cn(
                     "shrink-0 px-3 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center",
                     activeTab === 'profile' ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-zinc-700"
                   )}
                >
                   <User className="w-4 h-4 text-indigo-600" />
                </button>
                <button
                   onClick={() => setIsMoreDrawerOpen(prev => !prev)}
                   title="More Modules (...)"
                   aria-label="More Modules"
                   className={cn(
                     "shrink-0 px-2.5 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center",
                     isMoreDrawerOpen ? "bg-zinc-900 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-900"
                   )}
                >
                   <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

             {/* Right scroll arrow indicator */}
             {canScrollRight && (
               <button 
                  onClick={() => scrollTabs('right')}
                  title="More toggles ahead"
                  aria-label="Scroll right"
                  className="absolute -right-2 z-20 w-6 h-6 rounded-full bg-white/95 shadow-md border border-zinc-200/90 text-zinc-700 hover:text-black hover:bg-zinc-100 flex items-center justify-center transition-all cursor-pointer animate-pulse"
               >
                  <ChevronRight className="w-3.5 h-3.5" />
               </button>
             )}
          </div>
        </div>
      </header>

      {/* Expandable Slide-Over "More (...)" Navigation Drawer for Secondary Modules (Point 5 Safeguard) */}
      <AnimatePresence>
        {isMoreDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 max-w-[85vw] bg-zinc-950 text-white border-l border-zinc-800 shadow-2xl p-5 pb-safe flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center font-black text-xs">
                      P
                    </div>
                    <span className="text-sm font-black tracking-wide uppercase font-mono">Quick Modules</span>
                  </div>
                  <button
                    onClick={() => setIsMoreDrawerOpen(false)}
                    className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'overview', label: 'Dashboard & Stats', icon: LayoutDashboard, color: 'text-zinc-200' },
                    { id: 'exercises', label: '5,050+ Exercise Catalog', icon: Dumbbell, color: 'text-emerald-400' },
                    { id: 'calories', label: 'Calorie & Step Tracker', icon: Flame, color: 'text-amber-400' },
                    { id: 'diet', label: '3,900+ Diet & Nutrition', icon: Soup, color: 'text-emerald-400' },
                    { id: 'vault', label: 'Reward Vault & Themes', icon: Vault, color: 'text-purple-400' },
                    { id: 'rep-counter-volume', label: 'AI Rep Counter & Volume', icon: Activity, color: 'text-cyan-400' },
                    { id: 'vitals', label: 'Heart Rate & Body Scan', icon: HeartPulse, color: 'text-rose-400' },
                    { id: 'water', label: 'Hydration & Acoustic Sip', icon: Droplets, color: 'text-sky-400' },
                    { id: 'profile', label: 'Athlete Profile & Security', icon: User, color: 'text-indigo-400' },
                  ].map((item) => {
                    const IconComp = item.icon;
                    const isSelected = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as any);
                          setIsMoreDrawerOpen(false);
                        }}
                        className={cn(
                          "w-full px-3.5 py-3 rounded-xl text-left text-xs font-bold flex items-center gap-3 transition-all",
                          isSelected
                            ? "bg-white/15 text-white border border-white/20 shadow-md"
                            : "text-zinc-400 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <IconComp className={cn("w-4 h-4 shrink-0", item.color)} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                <span>100% OFFLINE PWA</span>
                <span className="text-emerald-400">LOCALFORAGE SYNC</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className={cn("w-full flex-1 flex flex-col pb-safe min-h-0 overflow-x-hidden", (activeTab === 'overview' || activeTab === 'vault' || activeTab === 'rep-counter-volume' || activeTab === 'vitals' || activeTab === 'water' || activeTab === 'diet') ? 'overflow-y-auto' : 'overflow-hidden')}>
        {activeTab === 'overview' && (
          <div className="w-full flex flex-col px-4 sm:px-6 md:px-8 pb-8 space-y-6">
            
            {/* The Big Gradient Card — Dynamically styled by the active Vault Theme */}
            <div
              className="w-full mt-2 h-[220px] rounded-[32px] p-8 flex flex-col justify-between text-white relative overflow-hidden transition-all duration-500"
              style={{
                background: 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%))',
                boxShadow: '0 15px 40px -15px var(--border-glow, rgba(139, 92, 246, 0.5))'
              }}
            >
                <div className="flex justify-between items-start z-10">
                   <div className="flex flex-col">
                      <span className="text-sm font-medium opacity-90">{profile?.username || 'Athlete'}</span>
                      <span className="text-[32px] font-bold mt-1 tracking-tight flex items-baseline gap-2">
                        {state?.currentStreak || 0} 
                        <span className="text-xl font-normal opacity-90">Day Streak</span>
                      </span>
                   </div>
                   <span className="text-xl font-bold italic tracking-wider opacity-95">PRO</span>
                </div>
                <div className="flex items-center justify-between z-10 opacity-90 mt-4">
                   <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                   </div>
                   <span className="font-semibold tracking-[0.1em] uppercase text-sm">
                      {profile?.workoutLocation?.toLowerCase().includes('gym') ? 'GYM WORKOUTS' : 'HOME WORKOUTS'}
                   </span>
                </div>
            </div>

            {/* Workouts Summary Block (100% Real-Time) */}
            <div className="w-full bg-zinc-50 rounded-[32px] p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                    <span className="text-zinc-500 font-semibold mb-1 text-sm">{format(new Date(), 'MMMM')} Completed Workouts</span>
                    <span className="text-2xl font-bold text-zinc-900 tracking-tight flex items-baseline gap-1">
                      {completedWorkoutsThisMonth}
                      <span className="text-sm text-zinc-400 font-medium ml-1">workouts completed</span>
                    </span>
                    <span className="text-[11px] text-zinc-400 mt-0.5">
                      {completedWorkoutsThisMonth === 0 ? '0% — No workouts logged yet' : `${completedWorkoutsThisMonth} active session${completedWorkoutsThisMonth > 1 ? 's' : ''} recorded`}
                    </span>
                </div>
                <button 
                  onClick={handleCompleteSession}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3.5 rounded-[20px] font-bold text-sm transition-colors flex items-center gap-2 shadow-lg cursor-pointer active:scale-95"
                >
                   <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                   Log Today
                </button>
            </div>

            {smartSuggestion && smartSuggestion.length > 0 && (
               <div
                  className="w-full rounded-[24px] p-5 flex flex-col gap-3 border transition-all duration-500 bg-zinc-50/90"
                  style={{ borderColor: 'var(--border-glow, rgba(139, 92, 246, 0.35))' }}
               >
                  <div className="flex items-center justify-between">
                      <div className="flex flex-col mr-4">
                         <span
                            className="font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1"
                            style={{ color: 'var(--primary-accent, #8b5cf6)' }}
                         >
                            <BrainCircuit className="w-3.5 h-3.5" /> Smart Suggestions • {mood} Mode
                         </span>
                         <span className="text-zinc-900 font-bold text-sm">
                            {smartSuggestion[0].id === 'rest_day_override'
                              ? 'Recovery & Healing'
                              : `${profile?.experienceLevel && profile.experienceLevel !== 'Skipped' ? profile.experienceLevel : 'Intermediate'} • ${profile?.primaryGoal && profile.primaryGoal !== 'Skipped' ? profile.primaryGoal : 'Full Body'} • ${completedWorkoutsThisMonth >= 2 || (state?.currentStreak || 0) >= 3 ? 'Progressive Overload Active' : 'Onboarding Calibrated'}`}
                         </span>
                      </div>
                      {smartSuggestion[0].id !== 'rest_day_override' && (
                          <button 
                             onClick={() => {
                                startTransition(() => setActiveTab('exercises'));
                                window.dispatchEvent(new CustomEvent('search_select_exercise', { detail: smartSuggestion[0]?.id }));
                             }}
                             className="text-white rounded-[16px] px-4 py-2 font-bold text-sm shrink-0 shadow-sm cursor-pointer active:scale-95 transition-transform"
                             style={{
                               background: 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%))'
                             }}
                          >
                             Start
                          </button>
                      )}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                      {smartSuggestion.map((ex, i) => (
                          <div
                            key={ex.id || i}
                            onClick={() => {
                              if (ex.id !== 'rest_day_override') {
                                startTransition(() => setActiveTab('exercises'));
                                window.dispatchEvent(new CustomEvent('search_select_exercise', { detail: ex.id }));
                              }
                            }}
                            className={cn(
                              "shrink-0 bg-white border border-zinc-200/80 rounded-[12px] p-2.5 flex flex-col cursor-pointer hover:border-zinc-400 transition-all",
                              ex.id === 'rest_day_override' ? "w-full" : "w-[138px]"
                            )}
                          >
                              <span
                                className="text-[10px] font-bold truncate"
                                style={{ color: 'var(--primary-accent, #8b5cf6)' }}
                              >
                                {ex.muscleGroup} • {ex.difficulty}
                              </span>
                              <span className="text-[11px] font-semibold text-zinc-800 truncate" title={ex.name}>{ex.name}</span>
                              {ex.id === 'rest_day_override' && (
                                  <span className="text-[11px] text-zinc-500 mt-1 whitespace-normal">{ex.instructions}</span>
                              )}
                          </div>
                      ))}
                  </div>
               </div>
            )}

            <div className="space-y-6">
                <section>
                    <div className="flex items-center justify-between mb-3">
                       <h2 className="text-base font-bold text-zinc-900">Today's Recommendations</h2>
                       <span
                         className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700"
                       >
                         {mood} • {profile?.experienceLevel && profile.experienceLevel !== 'Skipped' ? profile.experienceLevel : 'Adaptive'}
                       </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <AnimatePresence mode="popLayout">
                          {state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full text-center group relative overflow-hidden rounded-[24px] p-8 transition-all duration-300 bg-rose-50 border border-rose-100 flex flex-col gap-3 items-center"
                            >
                              <Crosshair className="w-8 h-8 text-rose-500" />
                              <h3 className="font-bold text-rose-900 text-lg">Recovery Mode Active</h3>
                              <p className="text-sm text-rose-600/70 font-medium">You've marked today as an injury day. Rest up, hydrate, and focus on recovery.</p>
                            </motion.div>
                          ) : recommendedExercises.length === 0 ? (
                            <div className="flex flex-col gap-2 animate-pulse">
                              {Array.from({ length: 4 }).map((_, idx) => (
                                <div key={idx} className="flex items-center justify-between w-full py-2 px-1">
                                  <div className="flex items-center gap-4">
                                    <div className="w-[52px] h-[52px] rounded-[18px] bg-zinc-100 flex items-center justify-center shrink-0">
                                      <div className="w-6 h-6 rounded-md bg-zinc-200" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                      <div className="h-4 w-36 bg-zinc-200 rounded" />
                                      <div className="h-3 w-48 bg-zinc-100 rounded" />
                                    </div>
                                  </div>
                                  <div className="h-4 w-8 bg-zinc-200 rounded ml-4 shrink-0" />
                                </div>
                              ))}
                            </div>
                          ) : recommendedExercises.map((workout, index) => {
                              const prescriptionMatch = workout.instructions?.match(/^\[(.*?)\]/);
                              const prescriptionSummary = prescriptionMatch ? prescriptionMatch[1] : `${workout.difficulty} • ${workout.environment}`;
                              return (
                                <motion.div
                                  layout
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.3, delay: index * 0.05 }}
                                  key={workout.id}
                                  onClick={() => {
                                    if (workout.id !== 'rest_day_override') {
                                      startTransition(() => setActiveTab('exercises'));
                                      window.dispatchEvent(new CustomEvent('search_select_exercise', { detail: workout.id }));
                                    }
                                  }}
                                  className="cursor-pointer hover:bg-zinc-50 rounded-2xl transition-colors"
                                >
                                  <div className="flex items-center justify-between w-full py-2 px-1">
                                      <div className="flex items-center gap-4 min-w-0">
                                          <div
                                            className="w-[52px] h-[52px] rounded-[18px] bg-zinc-100 flex items-center justify-center shrink-0"
                                          >
                                              <Dumbbell className="w-6 h-6" style={{ color: 'var(--primary-accent, #18181b)' }} />
                                          </div>
                                          <div className="flex flex-col min-w-0">
                                              <span className="font-bold text-[15px] text-zinc-900 truncate">{workout.name}</span>
                                              <span className="font-medium text-[12px] text-zinc-500 truncate">
                                                {workout.muscleGroup} &bull; {workout.equipmentNeeded} &bull; {workout.difficulty}
                                              </span>
                                              <span
                                                className="font-semibold text-[11px] truncate mt-0.5"
                                                style={{ color: 'var(--primary-accent, #8b5cf6)' }}
                                              >
                                                {prescriptionSummary}
                                              </span>
                                          </div>
                                      </div>
                                      <span className="font-bold text-[15px] text-zinc-900 ml-4 shrink-0">{workout.scientificEffectivenessScore}</span>
                                  </div>
                                </motion.div>
                              );
                          })}
                        </AnimatePresence>
                    </div>
                </section>

                <section>
                    <h2 className="text-base font-bold text-zinc-900 mb-3">Condition & Settings</h2>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button 
                            onClick={() => handleToggleInjury(format(new Date(), 'yyyy-MM-dd'))}
                            className={cn("p-4 rounded-[24px] text-left font-bold transition-all flex flex-col", state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? "bg-rose-500 text-white shadow-lg" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100")}
                        >
                            <div className="flex justify-between items-start w-full mb-2">
                                <Crosshair className="w-5 h-5" />
                                {state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? (
                                    <div className="w-5 h-5 rounded-[6px] bg-white flex items-center justify-center shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-[6px] border-2 border-zinc-200 bg-white" />
                                )}
                            </div>
                            <span className="text-sm">Injured Day</span>
                        </button>
                        <button 
                            onClick={() => handleToggleShield(format(new Date(), 'yyyy-MM-dd'))}
                            className={cn("p-4 rounded-[24px] text-left font-bold transition-all flex flex-col", state?.protectedRestDates?.includes(format(new Date(), 'yyyy-MM-dd')) ? "bg-indigo-500 text-white shadow-lg" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100")}
                        >
                            <div className="flex justify-between items-start w-full mb-2">
                                <Shield className="w-5 h-5" />
                                {state?.protectedRestDates?.includes(format(new Date(), 'yyyy-MM-dd')) ? (
                                    <div className="w-5 h-5 rounded-[6px] bg-white flex items-center justify-center shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-[6px] border-2 border-zinc-200 bg-white" />
                                )}
                            </div>
                            <span className="text-sm">Shield Today</span>
                        </button>
                    </div>

                    <div className="bg-zinc-50 rounded-[24px] p-4 flex flex-col gap-3">
                        <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Physiological State</h3>
                        <div className="flex gap-2">
                            {[
                              { id: 'Energetic', icon: Zap, activeClass: 'bg-emerald-500 text-white shadow-md', hover: 'hover:bg-zinc-200' },
                              { id: 'Tired', icon: BatteryLow, activeClass: 'bg-amber-500 text-white shadow-md', hover: 'hover:bg-zinc-200' },
                              { id: 'Stressed', icon: BrainCircuit, activeClass: 'bg-indigo-500 text-white shadow-md', hover: 'hover:bg-zinc-200' }
                            ].map((m) => (
                                <button
                                   key={m.id}
                                   onClick={() => setMood(m.id as Mood)}
                                   className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl text-[11px] font-bold transition-all", mood === m.id ? m.activeClass : `bg-white text-zinc-500 shadow-sm ${m.hover}`)}
                                >
                                   <m.icon className="w-5 h-5" />
                                   {m.id}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section>
                    <BiometricSettings />
                </section>

                <AnalyticsDashboard currentStreak={state?.currentStreak || 0} username={profile?.username || 'Athlete'} />

                {/* Supreme Haptic Rest & Interval Timer with 30s, 60s, 90s Presets and Tactile Sensations */}
                <SupremeHapticRestTimer />
            </div>
          </div>
        )}
        
        {activeTab === 'exercises' && (
          <div className="flex-1 w-full flex flex-col bg-white text-zinc-900 min-h-0">
             <ExerciseCatalog onNotify={(msg) => {
                setToastMessage(msg);
                setTimeout(() => setToastMessage(''), 4000);
             }} />
          </div>
        )}
        
        {activeTab === 'calories' && (
          <CalorieTrackerTab profile={profile} />
        )}

        {activeTab === 'diet' && (
          <Suspense fallback={<DashboardSkeleton />}>
            <DietSuite />
          </Suspense>
        )}
        
        {activeTab === 'vault' && (
          <div className="flex-1 w-full flex flex-col bg-zinc-950 text-zinc-100 min-h-0 overflow-y-auto pb-safe">
            <Suspense fallback={<DashboardSkeleton />}>
              <VaultView />
            </Suspense>
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="flex-1 w-full flex flex-col bg-white text-zinc-900 min-h-0 overflow-y-auto pb-safe">
            <ProfileView />
          </div>
        )}

        {activeTab === 'rep-counter-volume' && (
          <div className="flex-1 w-full flex flex-col bg-zinc-950 text-zinc-100 min-h-0 overflow-y-auto pt-4 pb-safe">
            <Suspense fallback={<DashboardSkeleton />}>
              <RepCounterVolumeSuite />
            </Suspense>
          </div>
        )}

        {activeTab === 'vitals' && (
          <div className="flex-1 w-full flex flex-col bg-zinc-950 text-zinc-100 min-h-0 overflow-y-auto pt-4 pb-safe">
            <Suspense fallback={<DashboardSkeleton />}>
              <VitalsBiometricSuite />
            </Suspense>
          </div>
        )}

        {activeTab === 'water' && (
          <div className="flex-1 w-full flex flex-col bg-zinc-950 text-zinc-100 min-h-0 overflow-y-auto pt-6 px-4 sm:px-6 md:px-8 pb-safe">
            <Suspense fallback={<DashboardSkeleton />}>
              <AdvancedHydrationCenter />
            </Suspense>
          </div>
        )}
      </main>

      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="hardware-accelerated fixed bottom-[max(1.5rem,calc(env(safe-area-inset-bottom,0px)+1rem))] left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-zinc-900 text-white rounded-[20px] shadow-2xl font-bold text-sm whitespace-nowrap flex items-center gap-3 border border-zinc-700/50"
          >
            <Trophy className="w-5 h-5 text-purple-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* High-performance, GPU-accelerated Badge and Theme unlock notification overlay */}
      <BadgeUnlockOverlay onNavigateVault={() => setActiveTab('vault')} />
    </div>
  );
});
