import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addDays, subDays } from 'date-fns';
import { 
  Mic, 
  MicOff, 
  Clipboard, 
  Plus, 
  Trash2, 
  Flame, 
  Footprints, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Settings2, 
  Check, 
  AlertCircle,
  Clock,
  Zap,
  Soup,
  Coffee,
  Sun,
  Moon,
  Apple,
  Edit3,
  Target,
  Share2,
  X,
  Volume2,
  Sliders,
  CheckCircle2,
  Undo2,
  MapPin
} from 'lucide-react';
import { 
  calorieStorage, 
  CalorieLogItem, 
  MealDayRecord, 
  MealType, 
  MacroTargets 
} from '../services/CalorieStorageService';
import { voiceParser, VoiceParseResult } from '../services/VoiceParser';
import { ClipboardParser, ClipboardParseResult } from '../services/ClipboardParser';
import { stepBurnEstimator, StepBurnState } from '../services/StepBurnEstimator';
import { useMealTimingEngine } from '../hooks/useMealTimingEngine';
import { UserProfile } from '../services/storage';
import { ObsidianCalorieWidget } from './ObsidianCalorieWidget';
import { useSessionPersistence } from '../hooks/useSessionPersistence';
import { haptics } from '../utils/haptics';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

interface CalorieTrackerProps {
  profile?: UserProfile | null;
}

const MEAL_CONFIG: Record<MealType, { label: string; icon: any; color: string; bg: string }> = {
  breakfast: { label: 'Breakfast / Nashta', icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200/60' },
  lunch: { label: 'Lunch / Dopehar', icon: Sun, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200/60' },
  snack: { label: 'Snacks / Pre-Workout', icon: Apple, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200/60' },
  dinner: { label: 'Dinner / Raat', icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-200/60' },
};

export const CalorieTracker: React.FC<CalorieTrackerProps> = ({ profile }) => {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [dayLog, setDayLog] = useState<MealDayRecord | null>(null);
  const [targets, setTargets] = useState<MacroTargets | null>(null);
  const [stepState, setStepState] = useState<StepBurnState>(stepBurnEstimator.getState());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & UI Controls
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [activeMealType, setActiveMealType] = useState<MealType>('lunch');

  // Voice recognition states
  const [isListening, setIsListening] = useState(false);
  const [voiceResult, setVoiceResult] = useState<VoiceParseResult | null>(null);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);
  const [liveSpeechText, setLiveSpeechText] = useState<string>('');
  const [voiceLang, setVoiceLang] = useState<'en-IN' | 'hi-IN' | 'en-US'>('en-IN');

  // Clipboard Scrape state
  const [clipboardPreview, setClipboardPreview] = useState<ClipboardParseResult | null>(null);

  // Manual Item Form
  const [manualForm, setManualForm] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    quantity: '1',
    unit: 'serving',
    mealType: 'lunch' as MealType
  });

  // Direct Calorie Entry & Target Controls
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [customTargetInput, setCustomTargetInput] = useState('');
  const [quickCalorieInput, setQuickCalorieInput] = useState('');
  const [quickProtein, setQuickProtein] = useState('');
  const [quickCarbs, setQuickCarbs] = useState('');
  const [quickFats, setQuickFats] = useState('');
  const [showQuickMacros, setShowQuickMacros] = useState(false);
  const [quickMealType, setQuickMealType] = useState<MealType>('lunch');
  const [quickFoodName, setQuickFoodName] = useState('');
  const [showVisualAnalytics, setShowVisualAnalytics] = useState(true);
  const [lastAppliedVoiceItem, setLastAppliedVoiceItem] = useState<{
    id: string;
    name: string;
    calories: number;
    mealType: MealType;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);

  // Module 8: Unkillable Memory Core - Session & Lifecycle Persistence
  useSessionPersistence({
    key: 'calorie_quick_entry_draft',
    state: { quickCalorieInput, quickFoodName, quickMealType },
    onRestore: (restored) => {
      if (restored) {
        if (restored.quickCalorieInput) setQuickCalorieInput(restored.quickCalorieInput);
        if (restored.quickFoodName) setQuickFoodName(restored.quickFoodName);
        if (restored.quickMealType) setQuickMealType(restored.quickMealType);
      }
    }
  });

  useSessionPersistence({
    key: 'calorie_manual_form_draft',
    state: manualForm,
    onRestore: (restored) => {
      if (restored && restored.name) {
        setManualForm(restored);
      }
    }
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load Day Log & Targets
  const refreshData = useCallback(async () => {
    const log = await calorieStorage.getDayLog(selectedDate);
    setDayLog(log);
    const userTargets = await calorieStorage.getTargets(profile);
    setTargets(userTargets);

    // Module 9: Check Haptic Calorie Budget Alert
    if (log && userTargets) {
      const activeBurned = Math.round(stepState.caloriesBurned || 0);
      const net = (log.totalCalories || 0) - activeBurned;
      haptics.checkCalorieBudgetAlert(net, userTargets.dailyCalories);
    }
  }, [selectedDate, profile, stepState.caloriesBurned]);

  useEffect(() => {
    refreshData();
    const handleExternalSync = () => {
      refreshData();
    };
    window.addEventListener('pulsefit_calorie_logged', handleExternalSync);
    window.addEventListener('pulsefit_exercise_logged', handleExternalSync);
    window.addEventListener('pulsefit_workout_logged', handleExternalSync);
    window.addEventListener('pulsefit_profile_updated', handleExternalSync);
    return () => {
      window.removeEventListener('pulsefit_calorie_logged', handleExternalSync);
      window.removeEventListener('pulsefit_exercise_logged', handleExternalSync);
      window.removeEventListener('pulsefit_workout_logged', handleExternalSync);
      window.removeEventListener('pulsefit_profile_updated', handleExternalSync);
    };
  }, [refreshData]);

  // Module 6: Web Share Target Handler (Cross-app shared link or text)
  useEffect(() => {
    const handleShareTarget = (e: any) => {
      const { title, text, url } = e.detail || {};
      const fullText = [title, text, url].filter(Boolean).join(' ');
      if (!fullText) return;

      // Extract calories or name
      const calMatch = fullText.match(/(\d+)\s*(?:calories|kcal|cal)/i);
      if (calMatch) {
        setQuickCalorieInput(calMatch[1]);
      }
      const cleanedTitle = (title || text || 'Shared Meal').split('\n')[0].slice(0, 40);
      setQuickFoodName(cleanedTitle);
      showToast(`Shared content pre-filled: "${cleanedTitle}"`);
      haptics.vibrate('mediumTap');
    };

    window.addEventListener('pulsefit_share_target_received', handleShareTarget);
    return () => window.removeEventListener('pulsefit_share_target_received', handleShareTarget);
  }, []);

  // Accelerometer / Step Estimator subscription
  useEffect(() => {
    let weightKg = 70;
    if (profile?.weightKg) weightKg = profile.weightKg;
    else if (profile?.weight) {
      const p = parseFloat(profile.weight);
      if (!isNaN(p)) weightKg = p;
    }
    stepBurnEstimator.setUserWeight(weightKg);
    stepBurnEstimator.initializeForDate(selectedDate);

    const unsubscribe = stepBurnEstimator.subscribe(state => {
      setStepState(state);
    });

    return () => {
      unsubscribe();
    };
  }, [selectedDate, profile]);

  // Contextual Meal Timing Engine (Browser Real-Time Clock & Circadian Suggester)
  const { 
    activePrompt, 
    currentTimeStr, 
    timeZoneStr, 
    locationName,
    verifyingMeal,
    setVerifyingMeal,
    openMealVerification,
    commitVerifiedMeal,
    cancelVerification,
    dismissPrompt,
    syncGeolocationAndLocation
  } = useMealTimingEngine(
    profile?.username || 'Athlete',
    () => {
      refreshData();
      showToast('Meal verified & logged successfully in real time!');
      haptics.vibrate('success');
      confetti({ particleCount: 35, spread: 65, origin: { y: 0.6 } });
    }
  );

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [newComponentInput, setNewComponentInput] = useState<string>('');

  // Reset selected suggestion when active meal window shifts
  useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [activePrompt?.mealType]);

  // Date Navigation
  const handlePrevDay = () => {
    haptics.vibrate('lightTap');
    const prev = subDays(new Date(selectedDate), 1);
    setSelectedDate(format(prev, 'yyyy-MM-dd'));
  };

  const handleNextDay = () => {
    haptics.vibrate('lightTap');
    const next = addDays(new Date(selectedDate), 1);
    setSelectedDate(format(next, 'yyyy-MM-dd'));
  };

  const handleToday = () => {
    haptics.vibrate('lightTap');
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
  };

  // Voice Logging Handlers & Direct Auto-Apply
  const handleApplyVoiceLog = async (resultToApply: VoiceParseResult) => {
    if (!resultToApply || !resultToApply.hasCalories || resultToApply.totalCalories <= 0) return;
    
    // Prevent duplicate submission of identical item
    if (
      lastAppliedVoiceItem && 
      lastAppliedVoiceItem.name === (resultToApply.items[0]?.name || '') && 
      lastAppliedVoiceItem.calories === resultToApply.totalCalories
    ) {
      return;
    }

    let createdId = '';
    for (const item of resultToApply.items) {
      const added = await calorieStorage.addMealItem(selectedDate, {
        name: item.name,
        mealType: resultToApply.suggestedMealType,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fats: item.fats,
        quantity: item.quantity,
        unit: item.unit,
        source: 'voice'
      });
      createdId = added.id;
    }

    setLastAppliedVoiceItem({
      id: createdId,
      name: resultToApply.items[0]?.name || 'Voice Meal',
      calories: resultToApply.totalCalories,
      mealType: resultToApply.suggestedMealType,
      protein: resultToApply.totalProtein,
      carbs: resultToApply.totalCarbs,
      fats: resultToApply.totalFats
    });

    refreshData();
    haptics.vibrate('success');
    showToast(`Voice Log Applied: ${resultToApply.totalCalories} kcal added to ${resultToApply.suggestedMealType}!`);
    confetti({ particleCount: 35, spread: 65, origin: { y: 0.8 } });
  };

  const handleUndoVoiceLog = async () => {
    if (!lastAppliedVoiceItem) return;
    await calorieStorage.deleteMealItem(selectedDate, lastAppliedVoiceItem.id);
    showToast(`Removed voice entry: ${lastAppliedVoiceItem.calories} kcal from ${lastAppliedVoiceItem.mealType}`);
    setLastAppliedVoiceItem(null);
    setVoiceResult(null);
    refreshData();
    haptics.vibrate('delete');
  };

  const handleStartVoice = () => {
    if (!voiceParser.getIsSupported()) {
      showToast('Speech Recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    haptics.vibrate('mediumTap');
    setVoiceError(null);
    setVoiceResult(null);
    setLiveSpeechText('');

    const stop = voiceParser.startListening(
      (result, isFinal, liveTranscript) => {
        setLiveSpeechText(liveTranscript);
        setVoiceResult(result);
        if (isFinal) {
          setIsListening(false);
          if (result.hasCalories && result.totalCalories > 0) {
            handleApplyVoiceLog(result);
          } else if (result.transcript.trim()) {
            setVoiceError(result.errorMessage || 'Total calories batana zaroori hai (Jaise: "450 calories for lunch"). PulseFit calories guess nahi karta.');
            haptics.vibrate('warning');
          }
        }
      },
      err => {
        setVoiceError(err);
        setIsListening(false);
        haptics.vibrate('warning');
      },
      () => {
        setIsListening(false);
      },
      { language: voiceLang }
    );

    setStopListeningFn(() => stop);
    setIsListening(true);
  };

  const handleStopVoice = () => {
    haptics.vibrate('lightTap');
    voiceParser.stopListening();
    if (stopListeningFn) {
      stopListeningFn();
      setStopListeningFn(null);
    }
    setIsListening(false);

    // If voiceResult is already ready with calories when user manually stops
    if (voiceResult && voiceResult.hasCalories && voiceResult.totalCalories > 0) {
      handleApplyVoiceLog(voiceResult);
    } else if (voiceResult && !voiceResult.hasCalories && voiceResult.transcript.trim()) {
      setVoiceError(voiceResult.errorMessage || 'Total calories batana zaroori hai (Jaise: "450 calories for lunch"). PulseFit calories guess nahi karta.');
      haptics.vibrate('warning');
    }
  };

  const handleConfirmVoiceLog = async () => {
    if (!voiceResult || !voiceResult.hasCalories || voiceResult.items.length === 0) return;
    await handleApplyVoiceLog(voiceResult);
  };

  // Clipboard Scrape Handlers
  const handleScrapeClipboard = async () => {
    haptics.vibrate('lightTap');
    try {
      const parsed = await ClipboardParser.scrapeFromClipboard(activeMealType);
      setClipboardPreview(parsed);
      haptics.vibrate('success');
    } catch (err: any) {
      showToast(err?.message || 'Failed to read clipboard');
      haptics.vibrate('warning');
    }
  };

  const handleConfirmClipboardLog = async () => {
    if (!clipboardPreview || clipboardPreview.items.length === 0) return;

    for (const item of clipboardPreview.items) {
      await calorieStorage.addMealItem(selectedDate, item);
    }

    setClipboardPreview(null);
    refreshData();
    haptics.vibrate('success');
    showToast(`Scraped & logged ${clipboardPreview.items.length} items!`);
    confetti({ particleCount: 35, spread: 70, origin: { y: 0.8 } });
  };

  // Manual Add Handlers
  const handleAddManualItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name.trim()) return;

    let calories = parseFloat(manualForm.calories) || 0;
    const protein = parseFloat(manualForm.protein) || 0;
    const carbs = parseFloat(manualForm.carbs) || 0;
    const fats = parseFloat(manualForm.fats) || 0;
    const quantity = parseFloat(manualForm.quantity) || 1;

    // If user filled macros but left calories blank/zero, calculate exact scientific calories: (P*4) + (C*4) + (F*9)
    if (calories <= 0 && (protein > 0 || carbs > 0 || fats > 0)) {
      calories = Math.round((protein * 4) + (carbs * 4) + (fats * 9));
    }

    if (calories <= 0) {
      showToast('Kripya calories ya macros enter karein. App calories guess nahi karta.');
      return;
    }

    // STRICT: Only use user-filled numbers. Never guess macros!
    await calorieStorage.addMealItem(selectedDate, {
      name: manualForm.name.trim(),
      mealType: manualForm.mealType,
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      quantity,
      unit: manualForm.unit || 'serving',
      source: 'manual'
    });

    setManualForm({
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      quantity: '1',
      unit: 'serving',
      mealType: 'lunch'
    });

    setIsManualModalOpen(false);
    refreshData();
    haptics.vibrate('success');
    showToast('Food logged successfully!');
  };

  // Delete Handlers
  const handleDeleteItem = async (id: string) => {
    haptics.vibrate('delete');
    await calorieStorage.deleteMealItem(selectedDate, id);
    refreshData();
  };

  // Step Tracker Toggle
  const handleToggleStepTracker = async () => {
    haptics.vibrate('lightTap');
    await stepBurnEstimator.toggleTracking();
  };

  const handleAddStepsSim = () => {
    haptics.vibrate('lightTap');
    stepBurnEstimator.addManualSteps(250);
  };

  // Direct Target Setting Handler
  const handleSaveCustomTarget = async (newTarget: number) => {
    if (!newTarget || isNaN(newTarget) || newTarget < 500) {
      showToast('Kripya valid calorie target dalein (min 500 kcal)');
      return;
    }
    const updatedTargets: MacroTargets = {
      dailyCalories: newTarget,
      protein: Math.round((newTarget * 0.30) / 4),
      carbs: Math.round((newTarget * 0.45) / 4),
      fats: Math.round((newTarget * 0.25) / 9),
      waterMl: targets?.waterMl || 2500,
    };
    setTargets(updatedTargets);
    await calorieStorage.saveTargets(updatedTargets);
    setIsEditingTarget(false);
    refreshData();
    haptics.vibrate('success');
    showToast(`Daily target: ${newTarget} kcal set ho gaya!`);
  };

  // Direct Quick Calorie Entry Handler
  const handleQuickAddCalories = async (customCals?: number) => {
    const p = parseFloat(quickProtein) || 0;
    const c = parseFloat(quickCarbs) || 0;
    const f = parseFloat(quickFats) || 0;

    let caloriesToAdd = customCals !== undefined ? customCals : parseInt(quickCalorieInput, 10);
    
    // If user filled macros but calories is empty or 0, compute exact calories from macros
    if ((!caloriesToAdd || isNaN(caloriesToAdd) || caloriesToAdd <= 0) && (p > 0 || c > 0 || f > 0)) {
      caloriesToAdd = Math.round((p * 4) + (c * 4) + (f * 9));
    }

    if (!caloriesToAdd || isNaN(caloriesToAdd) || caloriesToAdd <= 0) {
      showToast('Kripya valid calories ya macros amount dalein. App calories guess nahi karta.');
      return;
    }

    const defaultNames: Record<MealType, string> = {
      breakfast: 'Breakfast Meal',
      lunch: 'Lunch Meal',
      snack: 'Snack Meal',
      dinner: 'Dinner Meal'
    };

    const name = quickFoodName.trim() || defaultNames[quickMealType] || 'Quick Calorie Entry';
    
    // STRICT RULE: Only use what the user filled! If user did not provide protein/carbs/fats, they are 0.
    const protein = Math.round(p);
    const carbs = Math.round(c);
    const fats = Math.round(f);

    await calorieStorage.addMealItem(selectedDate, {
      name,
      mealType: quickMealType,
      calories: Math.round(caloriesToAdd),
      protein,
      carbs,
      fats,
      quantity: 1,
      unit: 'serving',
      source: 'manual'
    });

    setQuickCalorieInput('');
    setQuickFoodName('');
    setQuickProtein('');
    setQuickCarbs('');
    setQuickFats('');
    refreshData();
    haptics.vibrate('success');
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.8 } });
    showToast(`+${caloriesToAdd} kcal add ho gayi!`);
  };

  // Derived Calculations
  const totalConsumed = dayLog?.totalCalories || 0;
  const activeBurned = Math.round(stepState.caloriesBurned || 0);
  const netCalories = totalConsumed - activeBurned;
  const targetCalories = targets?.dailyCalories || 2200;
  const caloriesRemaining = targetCalories - netCalories;

  const targetProtein = targets?.protein || 150;
  const targetCarbs = targets?.carbs || 240;
  const targetFats = targets?.fats || 65;

  const currentProtein = dayLog?.totalProtein || 0;
  const currentCarbs = dayLog?.totalCarbs || 0;
  const currentFats = dayLog?.totalFats || 0;

  const proteinPct = Math.min(100, Math.round((currentProtein / targetProtein) * 100));
  const carbsPct = Math.min(100, Math.round((currentCarbs / targetCarbs) * 100));
  const fatsPct = Math.min(100, Math.round((currentFats / targetFats) * 100));

  const isToday = selectedDate === format(new Date(), 'yyyy-MM-dd');

  return (
    <div className="flex-1 w-full flex flex-col bg-white text-zinc-900 font-sans pb-24">
      
      {/* Top Header with Date Navigation (PulseFit Glass/Light style) */}
      <div className="sticky top-0 z-20 backdrop-blur-md bg-white/90 border-b border-zinc-100 px-4 py-3 sm:px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shadow-xs">
              <Soup className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-zinc-900 flex items-center gap-2">
                Calorie Tracker
              </h1>
              <p className="text-xs text-zinc-400 font-medium">Daily food logging & nutrition balance</p>
            </div>
          </div>

          {/* Date Picker Controls */}
          <div className="flex items-center gap-1.5 bg-zinc-100/90 border border-zinc-200/80 rounded-2xl p-1 shadow-xs">
            <button
              type="button"
              onClick={handlePrevDay}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-white transition-colors"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleToday}
              className={cn(
                "px-3 py-1 text-xs font-bold rounded-xl transition-all font-mono",
                isToday ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-500 hover:text-zinc-900 hover:bg-white/60"
              )}
            >
              {isToday ? 'Today' : selectedDate}
            </button>
            <button
              type="button"
              onClick={handleNextDay}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-white transition-colors"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-1.5 ml-0.5 text-zinc-500 hover:text-zinc-900 rounded-xl hover:bg-white transition-colors"
              title="Customize Macro Targets"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        
        {/* Contextual Smart Meal Timing Prompt Banner (Browser Real-Time Clock & Circadian Suggester) */}
        <AnimatePresence>
          {activePrompt && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className={cn(
                "p-4 sm:p-5 rounded-[26px] border shadow-xs relative overflow-hidden transition-all",
                activePrompt.isAlreadyLoggedToday
                  ? "bg-gradient-to-r from-emerald-500/10 via-white to-emerald-500/5 border-emerald-300/80"
                  : "bg-gradient-to-r from-amber-500/10 via-white to-orange-500/5 border-amber-300/90"
              )}
            >
              {/* Top Meta Bar: Real-Time Live Clock + Window + Geolocation */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200/70 pb-2.5 mb-3.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 text-white text-[11px] font-mono font-bold tracking-tight shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    <Clock className="w-3 h-3 text-emerald-400 ml-0.5" />
                    <span>{currentTimeStr || activePrompt.realTimeClockStr}</span>
                  </div>

                  <button
                    type="button"
                    onClick={syncGeolocationAndLocation}
                    title="Click to re-sync browser GPS geolocation"
                    className="flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/80 px-2 py-0.5 rounded-lg border border-zinc-200/80 transition-all cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-sky-500 shrink-0" />
                    <span className="truncate max-w-[160px] sm:max-w-[260px]">
                      {locationName || activePrompt.locationName}
                    </span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-lg border border-amber-200">
                    {activePrompt.hindiLabel} ({activePrompt.timeRangeDisplay})
                  </span>
                  {activePrompt.windowTimeRemainingText && !activePrompt.isAlreadyLoggedToday && (
                    <span className="text-[11px] font-mono text-zinc-500">
                      ⏳ {activePrompt.windowTimeRemainingText}
                    </span>
                  )}
                </div>
              </div>

              {activePrompt.isAlreadyLoggedToday ? (
                /* Already Logged State */
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-0.5">
                      Circadian Meal Tracker • Logged
                    </div>
                    <p className="text-sm font-semibold text-zinc-800">
                      {activePrompt.message}
                    </p>
                    {activePrompt.loggedItemSummary && (
                      <p className="text-xs text-zinc-500 mt-1 font-mono">
                        Items: {activePrompt.loggedItemSummary}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={dismissPrompt}
                    className="px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-600 font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              ) : (
                /* Active Suggestion State */
                <div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                          Real-Time Meal Suggestion
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                          {activePrompt.englishLabel}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-zinc-900">
                        {activePrompt.message}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={dismissPrompt}
                      className="px-2 py-1 text-xs text-zinc-400 hover:text-zinc-600 font-medium cursor-pointer"
                      title="Dismiss suggestion"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Suggestion Selector & Macro Card */}
                  {(() => {
                    const currentOption = activePrompt.suggestedItems[activeSuggestionIndex] || activePrompt.selectedSuggestion;
                    return (
                      <div className="mt-3.5 pl-0 sm:pl-[52px]">
                        {/* Option switcher pills */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
                          <span className="text-[11px] font-bold text-zinc-400 uppercase font-mono mr-1 shrink-0">
                            Options:
                          </span>
                          {activePrompt.suggestedItems.map((item, idx) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setActiveSuggestionIndex(idx)}
                              className={cn(
                                "px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                                activeSuggestionIndex === idx
                                  ? "bg-amber-500 text-white shadow-xs font-bold"
                                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-600"
                              )}
                            >
                              {item.hindiName || item.name.split(',')[0]}
                            </button>
                          ))}
                        </div>

                        {/* Selected Meal Detailed Card */}
                        <div className="mt-2 p-3.5 rounded-2xl bg-white border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-black text-zinc-900 flex items-center gap-1.5">
                              <span>{currentOption.name}</span>
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 text-xs font-mono">
                              <span className="text-amber-600 font-bold flex items-center gap-0.5">
                                <Flame className="w-3.5 h-3.5" />
                                {currentOption.calories} kcal
                              </span>
                              <span className="text-zinc-500 flex items-center gap-0.5">
                                <Zap className="w-3 h-3 text-indigo-500" />
                                {currentOption.protein}g P
                              </span>
                              <span className="text-zinc-500">
                                {currentOption.carbs}g C
                              </span>
                              <span className="text-zinc-500">
                                {currentOption.fats}g F
                              </span>
                            </div>
                          </div>

                          {/* Quick 1-Tap Action Buttons */}
                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              onClick={() => openMealVerification(currentOption)}
                              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs active:scale-95 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                            >
                              <Check className="w-4 h-4" />
                              <span>Haan, Verify & Log Karo (+{currentOption.calories} kcal)</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setManualForm(prev => ({
                                  ...prev,
                                  mealType: activePrompt.mealType,
                                  name: currentOption.name,
                                  calories: currentOption.calories.toString(),
                                  protein: currentOption.protein.toString(),
                                  carbs: currentOption.carbs.toString(),
                                  fats: currentOption.fats.toString()
                                }));
                                setIsManualModalOpen(true);
                              }}
                              className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold text-xs transition-all cursor-pointer"
                              title="Customize before logging"
                            >
                              Edit / Custom
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Calorie Status Hero Card (PulseFit signature rounded-[28px] card) */}
        <div className="bg-zinc-50/90 rounded-[28px] border border-zinc-200/80 p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono block">
                Daily Net Energy Balance
              </span>

              {isEditingTarget ? (
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    value={customTargetInput}
                    onChange={(e) => setCustomTargetInput(e.target.value)}
                    placeholder="e.g. 2100"
                    className="w-32 px-3 py-1.5 text-base font-mono font-bold bg-white border border-amber-500 rounded-xl text-zinc-900 focus:outline-none shadow-xs"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveCustomTarget(parseInt(customTargetInput, 10))}
                    className="px-3 py-1.5 text-xs font-bold bg-amber-500 text-white rounded-xl hover:bg-amber-600 shadow-xs"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingTarget(false)}
                    className="px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-600"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 font-mono">
                    {netCalories}
                  </span>
                  <span className="text-sm text-zinc-400 font-medium">/ {targetCalories} kcal goal</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomTargetInput(targetCalories.toString());
                      setIsEditingTarget(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white text-zinc-400 hover:text-amber-600 transition-colors ml-1"
                    title="Set / Change Daily Calorie Goal"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Quick Target Setter Presets */}
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="text-[11px] text-zinc-400 font-medium">Goal:</span>
                {[1600, 1800, 2000, 2200, 2500].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => handleSaveCustomTarget(goal)}
                    className={cn(
                      "px-2.5 py-0.5 text-[11px] font-mono rounded-lg transition-all",
                      targetCalories === goal
                        ? "bg-amber-500 text-white font-bold shadow-xs"
                        : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200/80 shadow-2xs"
                    )}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-zinc-400 block font-mono">
                {caloriesRemaining >= 0 ? 'Remaining' : 'Exceeded'}
              </span>
              <span className={cn(
                "text-lg font-bold font-mono",
                caloriesRemaining >= 0 ? "text-emerald-600" : "text-rose-600"
              )}>
                {caloriesRemaining >= 0 ? `${caloriesRemaining} kcal left` : `+${Math.abs(caloriesRemaining)} kcal`}
              </span>
            </div>
          </div>

          {/* Visual Calorie Bar */}
          <div className="w-full bg-zinc-200/70 h-3 rounded-full overflow-hidden p-0.5 my-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.round((netCalories / targetCalories) * 100))}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className={cn(
                "h-full rounded-full transition-colors",
                netCalories > targetCalories ? "bg-rose-500" : "bg-gradient-to-r from-amber-500 to-emerald-500"
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-zinc-200/70 text-center">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono block">Intake</span>
              <span className="text-sm font-bold text-zinc-800 font-mono">{totalConsumed} kcal</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono block">Active Burn</span>
              <span className="text-sm font-bold text-amber-600 font-mono">-{activeBurned} kcal</span>
            </div>
            <div>
              <span className="text-[10px] text-zinc-400 uppercase font-mono block">Net Balance</span>
              <span className="text-sm font-bold text-zinc-900 font-mono">{netCalories} kcal</span>
            </div>
          </div>
        </div>

        {/* Macronutrient Split (PulseFit 3-Col Card) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Protein */}
          <div className="p-4 rounded-2xl bg-zinc-50/90 border border-zinc-200/80 shadow-xs">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider font-mono">
                Protein
              </span>
              <span className="text-xs font-mono font-bold text-zinc-800">
                {currentProtein}g <span className="text-zinc-400">/ {targetProtein}g</span>
              </span>
            </div>
            <div className="w-full bg-zinc-200/70 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-purple-600 h-full rounded-full transition-all" 
                style={{ width: `${proteinPct}%` }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div className="p-4 rounded-2xl bg-zinc-50/90 border border-zinc-200/80 shadow-xs">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
                Carbs
              </span>
              <span className="text-xs font-mono font-bold text-zinc-800">
                {currentCarbs}g <span className="text-zinc-400">/ {targetCarbs}g</span>
              </span>
            </div>
            <div className="w-full bg-zinc-200/70 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all" 
                style={{ width: `${carbsPct}%` }}
              />
            </div>
          </div>

          {/* Fats */}
          <div className="p-4 rounded-2xl bg-zinc-50/90 border border-zinc-200/80 shadow-xs">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                Fats
              </span>
              <span className="text-xs font-mono font-bold text-zinc-800">
                {currentFats}g <span className="text-zinc-400">/ {targetFats}g</span>
              </span>
            </div>
            <div className="w-full bg-zinc-200/70 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all" 
                style={{ width: `${fatsPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Calorie Entry (PulseFit Clean Form Card) */}
        <div className="bg-zinc-50/90 rounded-[28px] border border-zinc-200/80 p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Quick Calorie Entry
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                Calories enter karein aur meal select karein — sab kuch turant hisab se update hoga
              </p>
            </div>
            
            {/* Meal Selector Pills */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-zinc-200/80 shadow-2xs">
              {(['breakfast', 'lunch', 'snack', 'dinner'] as MealType[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    haptics.vibrate('lightTap');
                    setQuickMealType(m);
                  }}
                  className={cn(
                    "px-2.5 py-1 text-xs font-bold rounded-lg capitalize transition-all",
                    quickMealType === m 
                      ? "bg-amber-500 text-white shadow-xs" 
                      : "text-zinc-500 hover:text-zinc-800"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-4">
              <input
                type="number"
                placeholder="Calories (e.g. 350 kcal)"
                value={quickCalorieInput}
                onChange={(e) => setQuickCalorieInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleQuickAddCalories();
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm font-mono focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none shadow-2xs"
              />
            </div>

            <div className="sm:col-span-5">
              <input
                type="text"
                placeholder="Food name (optional)"
                value={quickFoodName}
                onChange={(e) => setQuickFoodName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleQuickAddCalories();
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none shadow-2xs"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="button"
                onClick={() => handleQuickAddCalories()}
                className="w-full h-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-all shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add to Log
              </button>
            </div>
          </div>

          {/* User Exact Macros Toggle (Strictly User Input, No Guessing) */}
          <div className="mt-3 pt-3 border-t border-zinc-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowQuickMacros(prev => !prev)}
              className="text-xs font-bold text-zinc-600 hover:text-zinc-900 flex items-center gap-1.5 transition-colors"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-500" />
              <span>{showQuickMacros ? 'Hide Exact Macros' : '+ Enter Exact Protein, Carbs, Fats (User Only)'}</span>
            </button>
          </div>

          {showQuickMacros && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="grid grid-cols-3 gap-2.5 mt-2.5 p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs"
            >
              <div>
                <label className="text-[10px] font-bold text-purple-700 uppercase font-mono block">
                  Protein (g)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={quickProtein}
                  onChange={(e) => {
                    setQuickProtein(e.target.value);
                    const p = parseFloat(e.target.value) || 0;
                    const c = parseFloat(quickCarbs) || 0;
                    const f = parseFloat(quickFats) || 0;
                    if (p > 0 || c > 0 || f > 0) {
                      setQuickCalorieInput(String(Math.round((p * 4) + (c * 4) + (f * 9))));
                    }
                  }}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-amber-700 uppercase font-mono block">
                  Carbs (g)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={quickCarbs}
                  onChange={(e) => {
                    setQuickCarbs(e.target.value);
                    const p = parseFloat(quickProtein) || 0;
                    const c = parseFloat(e.target.value) || 0;
                    const f = parseFloat(quickFats) || 0;
                    if (p > 0 || c > 0 || f > 0) {
                      setQuickCalorieInput(String(Math.round((p * 4) + (c * 4) + (f * 9))));
                    }
                  }}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-emerald-700 uppercase font-mono block">
                  Fats (g)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={quickFats}
                  onChange={(e) => {
                    setQuickFats(e.target.value);
                    const p = parseFloat(quickProtein) || 0;
                    const c = parseFloat(quickCarbs) || 0;
                    const f = parseFloat(e.target.value) || 0;
                    if (p > 0 || c > 0 || f > 0) {
                      setQuickCalorieInput(String(Math.round((p * 4) + (c * 4) + (f * 9))));
                    }
                  }}
                  className="w-full mt-1 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                />
              </div>
            </motion.div>
          )}

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-zinc-200/70">
            <span className="text-[11px] text-zinc-400 font-medium">Quick Add:</span>
            {[100, 200, 300, 450, 600].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleQuickAddCalories(c)}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 border border-zinc-200 text-xs font-mono font-bold transition-all active:scale-95 shadow-2xs"
              >
                +{c} kcal
              </button>
            ))}
          </div>
        </div>

        {/* Input Methods & Accelerometer Bar */}
        <div className="flex flex-col gap-3">
          {/* Language Selector for Voice */}
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Voice Engine & Fast Actions
            </span>
            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl border border-zinc-200/80 text-[10px] font-bold">
              <span className="text-zinc-400 px-1">Lang:</span>
              <button
                type="button"
                onClick={() => setVoiceLang('en-IN')}
                className={cn(
                  "px-2 py-0.5 rounded-lg transition-colors",
                  voiceLang === 'en-IN' ? "bg-white text-zinc-900 shadow-2xs font-black" : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                EN (India)
              </button>
              <button
                type="button"
                onClick={() => setVoiceLang('hi-IN')}
                className={cn(
                  "px-2 py-0.5 rounded-lg transition-colors",
                  voiceLang === 'hi-IN' ? "bg-white text-zinc-900 shadow-2xs font-black" : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                Hindi / Hinglish
              </button>
              <button
                type="button"
                onClick={() => setVoiceLang('en-US')}
                className={cn(
                  "px-2 py-0.5 rounded-lg transition-colors",
                  voiceLang === 'en-US' ? "bg-white text-zinc-900 shadow-2xs font-black" : "text-zinc-500 hover:text-zinc-800"
                )}
              >
                EN (US)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 1. Voice Logger Button */}
            <button
              type="button"
              onClick={isListening ? handleStopVoice : handleStartVoice}
              className={cn(
                "p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-xs active:scale-95",
                isListening 
                  ? "bg-rose-500 text-white animate-pulse" 
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              )}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span>{isListening ? 'Stop Listening' : 'Voice Log (Live Mic)'}</span>
            </button>

            {/* 2. Clipboard Scrape */}
            <button
              type="button"
              onClick={handleScrapeClipboard}
              className="p-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-xs active:scale-95"
            >
              <Clipboard className="w-5 h-5" />
              <span>Copy / Paste Nutrition</span>
            </button>

            {/* 3. Step Burn Tracker (Accelerometer) */}
            <button
              type="button"
              onClick={handleToggleStepTracker}
              className={cn(
                "p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1 font-bold text-xs transition-all shadow-xs active:scale-95 border",
                stepState.isListening
                  ? "bg-amber-500 text-white border-amber-600"
                  : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
              )}
              title="Toggle active motion step detection"
            >
              <Footprints className="w-5 h-5" />
              <span>{stepState.isListening ? `${stepState.steps} Steps (${stepState.caloriesBurned} kcal)` : 'Enable Step Burn'}</span>
            </button>

            {/* 4. Manual Add Modal Opener */}
            <button
              type="button"
              onClick={() => {
                haptics.vibrate('lightTap');
                setIsManualModalOpen(true);
              }}
              className="p-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white flex flex-col items-center justify-center gap-2 font-bold text-xs transition-all shadow-xs active:scale-95"
            >
              <Plus className="w-5 h-5" />
              <span>Custom Food Item</span>
            </button>
          </div>
        </div>

        {/* Voice Recognition Active Box with Real-Time Transcription */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -6 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 shadow-sm"
            >
              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-950">
                    Live Web Speech API — Sun raha hoon...
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleStopVoice}
                    className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Done / Finish</span>
                  </button>
                </div>
              </div>

              {/* Real-time streaming transcription box */}
              <div className="my-2 p-3 bg-white rounded-xl border border-purple-200 text-zinc-900 min-h-[52px] flex items-center shadow-2xs">
                {liveSpeechText ? (
                  <p className="text-sm font-semibold text-zinc-900 leading-snug">
                    "{liveSpeechText}"
                  </p>
                ) : (
                  <p className="text-xs text-zinc-400 italic flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
                    Microphone active hai. Kripya bolein jaise food name, meal type, ya calories...
                  </p>
                )}
              </div>

              <p className="text-[11px] text-purple-700 font-medium">
                Example: Bol sakte hain "400 calories for lunch" ya "Breakfast 350 calories" ya koi bhi meal item.
              </p>
            </motion.div>
          )}

          {voiceError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{voiceError}</span>
              </div>
              <button
                type="button"
                onClick={() => setVoiceError(null)}
                className="p-1 text-rose-500 hover:text-rose-700"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {voiceResult && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-white border border-purple-200 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-zinc-900">
                    Voice Recognition: "{voiceResult.transcript}"
                  </span>
                </div>
                {voiceResult.hasCalories ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-600 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Auto-Applied: {voiceResult.totalCalories} kcal
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 uppercase font-bold">
                      {voiceResult.suggestedMealType}
                    </span>
                  </div>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase font-bold">
                    Calories Missing
                  </span>
                )}
              </div>

              {voiceResult.hasCalories ? (
                <>
                  <div className="mt-2 mb-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Check className="w-4 h-4 text-emerald-600" />
                      Log successfully applied into Calorie Tracker without guessing!
                    </span>
                    {lastAppliedVoiceItem && (
                      <button
                        type="button"
                        onClick={handleUndoVoiceLog}
                        className="px-2.5 py-1 rounded-lg bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                      >
                        <Undo2 className="w-3.5 h-3.5" />
                        Undo
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-zinc-100 my-3">
                    {voiceResult.items.map((it, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-zinc-900 capitalize">{it.name}</span>
                          <span className="text-zinc-500 font-mono ml-2">
                            P:{it.protein}g • C:{it.carbs}g • F:{it.fats}g
                          </span>
                        </div>
                        <span className="font-bold text-amber-600 font-mono">{it.calories} kcal</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setVoiceResult(null)}
                      className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Done
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-3">
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Total calories batana zaroori hai!</p>
                      <p className="text-[11px] mt-0.5 text-rose-700">
                        {voiceResult.errorMessage || 'App calories guess nahi karta. Kripya bolein jaise: "450 calories for lunch" ya "Lunch 350 kcal".'}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setVoiceResult(null)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-700"
                    >
                      Dismiss
                    </button>
                    <button
                      type="button"
                      onClick={handleStartVoice}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Mic className="w-3.5 h-3.5" />
                      Try Speaking Again
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {clipboardPreview && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 rounded-2xl bg-white border border-indigo-200 shadow-sm"
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Clipboard className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-zinc-900">
                    Clipboard Scraped ({clipboardPreview.sourceDetected})
                  </span>
                </div>
              </div>

              <div className="divide-y divide-zinc-100 my-3">
                {clipboardPreview.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-zinc-900 capitalize">{it.name}</span>
                      <span className="text-zinc-500 font-mono ml-2">
                        P:{it.protein}g C:{it.carbs}g F:{it.fats}g
                      </span>
                    </div>
                    <span className="font-bold text-amber-600 font-mono">{it.calories} kcal</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setClipboardPreview(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-zinc-500 hover:text-zinc-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClipboardLog}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  Confirm & Log
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meal Categories & Food Logs List */}
        <div className="space-y-4">
          {(['breakfast', 'lunch', 'snack', 'dinner'] as MealType[]).map((mType) => {
            const config = MEAL_CONFIG[mType];
            const Icon = config.icon;
            const items = (dayLog?.meals || []).filter(m => m.mealType === mType);
            const subtotal = items.reduce((sum, item) => sum + item.calories, 0);

            return (
              <div key={mType} className="rounded-[24px] bg-zinc-50/90 border border-zinc-200/80 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center border", config.bg, config.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">{config.label}</h3>
                      <span className="text-xs text-zinc-400 font-mono">{items.length} logged item(s)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black text-zinc-900 font-mono">
                      {subtotal} kcal
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        haptics.vibrate('lightTap');
                        setManualForm(prev => ({ ...prev, mealType: mType }));
                        setIsManualModalOpen(true);
                      }}
                      className="p-1.5 rounded-xl bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200 transition-colors shadow-2xs"
                      title={`Add item to ${mType}`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Items in this meal group */}
                {items.length > 0 && (
                  <div className="mt-3 divide-y divide-zinc-100 border-t border-zinc-200/60 pt-2">
                    {items.map((item) => (
                      <div key={item.id} className="py-2.5 flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-zinc-900 capitalize">
                            {item.name}
                          </div>
                          <div className="text-xs text-zinc-400 font-mono mt-0.5">
                            P: {item.protein}g • C: {item.carbs}g • F: {item.fats}g
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-zinc-900 font-mono">
                            {item.calories} kcal
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-zinc-400 hover:text-rose-500 transition-colors p-1"
                            title="Delete food entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Visual Calorie Progress Toggle & Visualization (Ekdum Last Mein) */}
        <div className="w-full flex flex-col gap-4 pt-2">
          <div className="w-full bg-zinc-50/90 rounded-[28px] p-4 sm:p-5 flex items-center justify-between border border-zinc-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-zinc-900 flex items-center gap-2">
                  Daily Calorie Progress
                  <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                    Recharts
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">Smooth animated progress ring, meals bar graph & macro pie charts</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  haptics.vibrate('lightTap');
                  setShowVisualAnalytics(prev => !prev);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-xs active:scale-95",
                  showVisualAnalytics 
                    ? "bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/20" 
                    : "bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-200"
                )}
              >
                <span>{showVisualAnalytics ? 'Hide Charts' : 'Show Charts'}</span>
                <div className={cn("w-2 h-2 rounded-full", showVisualAnalytics ? "bg-white animate-pulse" : "bg-zinc-400")} />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showVisualAnalytics && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ObsidianCalorieWidget 
                  profile={profile}
                  selectedDate={selectedDate}
                  dayLog={dayLog}
                  targets={targets}
                  activeBurn={stepState.caloriesBurned}
                  onRefresh={refreshData}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Real-Time Meal Verification & Macro Breakdown Modal ("Meal mein kya kya khaya aur kitna macros") */}
      <AnimatePresence>
        {verifyingMeal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] border border-zinc-200 shadow-2xl p-5 sm:p-7 w-full max-w-lg text-zinc-900 max-h-[92vh] flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 font-bold border border-amber-300">
                      Smart Verification
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 capitalize">
                      {verifyingMeal.mealType}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-zinc-900 mt-1">
                    Tune is meal mein kya-kya khaya?
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-500 font-mono">
                    <span className="flex items-center gap-1 text-zinc-700 font-bold">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {currentTimeStr}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-sky-700">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      {locationName}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={cancelVerification}
                  className="p-1.5 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content Body */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {/* 1. Kya-Kya Khaya (Food Items Breakdown) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                      <Soup className="w-3.5 h-3.5 text-amber-500" />
                      <span>Items Eaten / Kya Khaya (List)</span>
                    </label>
                    <span className="text-[11px] text-zinc-400 font-mono">
                      {verifyingMeal.components.length} items
                    </span>
                  </div>

                  <div className="space-y-2">
                    {verifyingMeal.components.map((comp, idx) => (
                      <div
                        key={comp.id || idx}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs"
                      >
                        <div className="flex-1 min-w-0">
                          <input
                            type="text"
                            value={comp.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setVerifyingMeal(prev => {
                                if (!prev) return null;
                                const updated = [...prev.components];
                                updated[idx] = { ...updated[idx], name: val };
                                return { ...prev, components: updated };
                              });
                            }}
                            className="w-full bg-transparent font-bold text-zinc-800 focus:outline-none focus:border-b border-amber-500"
                            placeholder="Item name"
                          />
                          {comp.quantity && (
                            <span className="text-[11px] text-zinc-400 font-mono block mt-0.5">
                              Quantity: {comp.quantity}
                            </span>
                          )}
                        </div>
                        {comp.approxCalories && (
                          <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold shrink-0">
                            ~{comp.approxCalories} kcal
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setVerifyingMeal(prev => {
                              if (!prev) return null;
                              const updated = prev.components.filter((_, i) => i !== idx);
                              return { ...prev, components: updated };
                            });
                          }}
                          className="p-1 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all shrink-0 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add Extra Item Input */}
                  <div className="flex items-center gap-2 mt-2.5">
                    <input
                      type="text"
                      value={newComponentInput}
                      onChange={(e) => setNewComponentInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          if (!newComponentInput.trim()) return;
                          setVerifyingMeal(prev => {
                            if (!prev) return null;
                            return {
                              ...prev,
                              components: [
                                ...prev.components,
                                {
                                  id: `custom_${Date.now()}`,
                                  name: newComponentInput.trim(),
                                  quantity: '1 serving',
                                  approxCalories: 60
                                }
                              ],
                              calories: prev.calories + 60
                            };
                          });
                          setNewComponentInput('');
                        }
                      }}
                      placeholder="+ Kuch aur khaya? (e.g. 1 Katori Dahi, 1 Extra Roti)"
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 border border-dashed border-zinc-300 text-xs focus:outline-none focus:border-amber-500 text-zinc-800"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newComponentInput.trim()) return;
                        setVerifyingMeal(prev => {
                          if (!prev) return null;
                          return {
                            ...prev,
                            components: [
                              ...prev.components,
                              {
                                id: `custom_${Date.now()}`,
                                name: newComponentInput.trim(),
                                quantity: '1 serving',
                                approxCalories: 60
                              }
                            ],
                            calories: prev.calories + 60
                          };
                        });
                        setNewComponentInput('');
                      }}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shrink-0 cursor-pointer"
                    >
                      + Add Item
                    </button>
                  </div>
                </div>

                {/* 2. Macro & Calorie Verification ("Kitna Calories, Fats, Protein hai vo punchega") */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-50 to-amber-50/40 border border-amber-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Macros & Calorie Verification</span>
                    </span>
                    <span className="text-[11px] font-mono text-amber-800 font-bold">
                      Aap adjust kar sakte hain
                    </span>
                  </div>

                  {/* Total Calories */}
                  <div>
                    <label className="text-[11px] font-bold text-zinc-600 block mb-1">
                      Total Calories (kcal)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={verifyingMeal.calories}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setVerifyingMeal(prev => prev ? { ...prev, calories: val } : null);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-base font-black font-mono text-zinc-900 focus:border-amber-500 focus:outline-none"
                      />
                      <span className="absolute right-3.5 top-3 text-xs font-mono text-zinc-400 font-bold">
                        kcal
                      </span>
                    </div>
                  </div>

                  {/* Protein, Fats, Carbs Grid */}
                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="text-[10px] font-bold uppercase font-mono text-indigo-700 block mb-1">
                        Protein (g)
                      </label>
                      <input
                        type="number"
                        value={verifyingMeal.protein}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setVerifyingMeal(prev => prev ? { ...prev, protein: val } : null);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-mono font-bold text-indigo-900 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase font-mono text-rose-700 block mb-1">
                        Fats (g)
                      </label>
                      <input
                        type="number"
                        value={verifyingMeal.fats}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setVerifyingMeal(prev => prev ? { ...prev, fats: val } : null);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-white border border-rose-200 text-xs font-mono font-bold text-rose-900 focus:border-rose-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase font-mono text-amber-700 block mb-1">
                        Carbs (g)
                      </label>
                      <input
                        type="number"
                        value={verifyingMeal.carbs}
                        onChange={(e) => {
                          const val = Number(e.target.value) || 0;
                          setVerifyingMeal(prev => prev ? { ...prev, carbs: val } : null);
                        }}
                        className="w-full px-2.5 py-2 rounded-xl bg-white border border-amber-200 text-xs font-mono font-bold text-amber-900 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Macro Energy Distribution Bar */}
                  {(() => {
                    const pCals = (verifyingMeal.protein || 0) * 4;
                    const cCals = (verifyingMeal.carbs || 0) * 4;
                    const fCals = (verifyingMeal.fats || 0) * 9;
                    const totalMacCals = Math.max(1, pCals + cCals + fCals);
                    const pPct = Math.round((pCals / totalMacCals) * 100);
                    const cPct = Math.round((cCals / totalMacCals) * 100);
                    const fPct = Math.round((fCals / totalMacCals) * 100);

                    return (
                      <div className="pt-1">
                        <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden flex">
                          <div style={{ width: `${pPct}%` }} className="bg-indigo-500 h-full" title={`Protein: ${pPct}%`} />
                          <div style={{ width: `${cPct}%` }} className="bg-amber-500 h-full" title={`Carbs: ${cPct}%`} />
                          <div style={{ width: `${fPct}%` }} className="bg-rose-500 h-full" title={`Fats: ${fPct}%`} />
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mt-1">
                          <span className="text-indigo-600 font-bold">Protein: {pPct}%</span>
                          <span className="text-amber-600 font-bold">Carbs: {cPct}%</span>
                          <span className="text-rose-600 font-bold">Fats: {fPct}%</span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Modal Footer / Final Confirmation CTA */}
              <div className="pt-3 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={cancelVerification}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 font-bold text-xs hover:bg-zinc-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => commitVerifiedMeal(verifyingMeal)}
                  className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm active:scale-98 transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Haan, Verify Karke Log Kar Do (+{verifyingMeal.calories} kcal)</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manual Add Food Modal */}
      <AnimatePresence>
        {isManualModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] border border-zinc-200 shadow-2xl p-6 w-full max-w-md text-zinc-900"
            >
              <h3 className="text-lg font-black text-zinc-900 mb-1">Add Custom Food Item</h3>
              <p className="text-xs text-zinc-400 mb-4">Enter exact food details & macronutrients</p>

              <form onSubmit={handleAddManualItem} className="space-y-3.5">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Food Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Food or meal name"
                    value={manualForm.name}
                    onChange={e => setManualForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 placeholder-zinc-400 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase">Calories (kcal)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g., 320"
                      value={manualForm.calories}
                      onChange={e => setManualForm(prev => ({ ...prev, calories: e.target.value }))}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-zinc-500 uppercase">Meal Type</label>
                    <select
                      value={manualForm.mealType}
                      onChange={e => setManualForm(prev => ({ ...prev, mealType: e.target.value as MealType }))}
                      className="w-full mt-1 px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm capitalize focus:border-amber-500 focus:outline-none"
                    >
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="snack">Snack</option>
                      <option value="dinner">Dinner</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] font-bold text-purple-700 uppercase font-mono">Protein (g)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.protein}
                      onChange={e => {
                        const val = e.target.value;
                        setManualForm(prev => {
                          const p = parseFloat(val) || 0;
                          const c = parseFloat(prev.carbs) || 0;
                          const f = parseFloat(prev.fats) || 0;
                          const autoCals = (p > 0 || c > 0 || f > 0) && (!prev.calories || prev.calories === '0')
                            ? String(Math.round((p * 4) + (c * 4) + (f * 9)))
                            : prev.calories;
                          return { ...prev, protein: val, calories: autoCals };
                        });
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-amber-700 uppercase font-mono">Carbs (g)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.carbs}
                      onChange={e => {
                        const val = e.target.value;
                        setManualForm(prev => {
                          const p = parseFloat(prev.protein) || 0;
                          const c = parseFloat(val) || 0;
                          const f = parseFloat(prev.fats) || 0;
                          const autoCals = (p > 0 || c > 0 || f > 0) && (!prev.calories || prev.calories === '0')
                            ? String(Math.round((p * 4) + (c * 4) + (f * 9)))
                            : prev.calories;
                          return { ...prev, carbs: val, calories: autoCals };
                        });
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-700 uppercase font-mono">Fats (g)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={manualForm.fats}
                      onChange={e => {
                        const val = e.target.value;
                        setManualForm(prev => {
                          const p = parseFloat(prev.protein) || 0;
                          const c = parseFloat(prev.carbs) || 0;
                          const f = parseFloat(val) || 0;
                          const autoCals = (p > 0 || c > 0 || f > 0) && (!prev.calories || prev.calories === '0')
                            ? String(Math.round((p * 4) + (c * 4) + (f * 9)))
                            : prev.calories;
                          return { ...prev, fats: val, calories: autoCals };
                        });
                      }}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono">
                  * App calories guess nahi karega. Hamesha aapke dale huye values ke hisab se exact calculation hoga.
                </p>

                <div className="flex justify-end gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsManualModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs"
                  >
                    Add Food Item
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Target Settings Modal */}
      <AnimatePresence>
        {isSettingsModalOpen && targets && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[32px] border border-zinc-200 shadow-2xl p-6 w-full max-w-md text-zinc-900"
            >
              <h3 className="text-lg font-black text-zinc-900 mb-1">Daily Macro Targets</h3>
              <p className="text-xs text-zinc-400 mb-4">Set your personal nutrition budget</p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-zinc-500 uppercase">Daily Calorie Target (kcal)</label>
                  <input
                    type="number"
                    value={targets.dailyCalories}
                    onChange={e => setTargets(prev => prev ? ({ ...prev, dailyCalories: parseInt(e.target.value, 10) || 0 }) : null)}
                    className="w-full mt-1 px-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-sm font-mono"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-purple-700 uppercase font-mono">Protein (g)</label>
                    <input
                      type="number"
                      value={targets.protein}
                      onChange={e => setTargets(prev => prev ? ({ ...prev, protein: parseInt(e.target.value, 10) || 0 }) : null)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-amber-700 uppercase font-mono">Carbs (g)</label>
                    <input
                      type="number"
                      value={targets.carbs}
                      onChange={e => setTargets(prev => prev ? ({ ...prev, carbs: parseInt(e.target.value, 10) || 0 }) : null)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-emerald-700 uppercase font-mono">Fats (g)</label>
                    <input
                      type="number"
                      value={targets.fats}
                      onChange={e => setTargets(prev => prev ? ({ ...prev, fats: parseInt(e.target.value, 10) || 0 }) : null)}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-900 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => setIsSettingsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await calorieStorage.saveTargets(targets);
                    setIsSettingsModalOpen(false);
                    refreshData();
                    haptics.vibrate('success');
                    showToast('Target updated!');
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs"
                >
                  Save Targets
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-zinc-900 text-white font-bold text-xs shadow-2xl flex items-center gap-2.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
