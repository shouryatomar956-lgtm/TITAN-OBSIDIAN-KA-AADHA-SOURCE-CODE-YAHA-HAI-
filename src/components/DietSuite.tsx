import React, { useState, useMemo, memo, useCallback } from 'react';
import { 
  Database, 
  Sparkles, 
  Search, 
  Clock, 
  Filter, 
  Check, 
  CheckCircle2, 
  X, 
  Plus, 
  FilterX, 
  Utensils, 
  Zap,
  Info,
  Flame,
  Activity,
  Shield,
  Target,
  Scale,
  RotateCw,
  RotateCcw
} from 'lucide-react';
import { cn } from '../lib/utils';
import { triggerHapticFeedback } from '../utils/haptics';
import { 
  MASTER_PRE_WORKOUT_DATABASE, 
  MASTER_POST_WORKOUT_DATABASE,
  MASTER_BULKING_DATABASE,
  MASTER_MUSCLE_GAIN_DATABASE,
  MASTER_STAMINA_DATABASE,
  MASTER_MUSCLE_ENDURANCE_DATABASE,
  MASTER_FAT_LOSS_DATABASE,
  MASTER_WEIGHT_LOSS_DATABASE,
  DietItem, 
  DietCategory,
  PrecisionMicros,
  PRE_WORKOUT_TOTAL_COUNT,
  POST_WORKOUT_TOTAL_COUNT,
  BULKING_TOTAL_COUNT,
  MUSCLE_GAIN_TOTAL_COUNT,
  STAMINA_TOTAL_COUNT,
  MUSCLE_ENDURANCE_TOTAL_COUNT,
  FAT_LOSS_TOTAL_COUNT,
  WEIGHT_LOSS_TOTAL_COUNT,
  TOTAL_DIET_ITEMS_COUNT
} from '../services/preWorkoutDatabase';
import { calorieStorage } from '../services/CalorieStorageService';
import { format } from 'date-fns';
import confetti from 'canvas-confetti';
import { VirtualizedList } from './VirtualizedList';

export type DietSubSection = 'database' | 'features';

const VegNonVegMarker = memo(({ dietType }: { dietType: 'Veg' | 'Non-Veg' | 'Supplement' }) => {
  if (dietType === 'Veg') {
    return (
      <span className="inline-flex items-center gap-1 bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
        <span className="w-2.5 h-2.5 rounded-[2px] border border-emerald-400 flex items-center justify-center p-[1px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </span>
        <span className="tracking-wide">VEG</span>
      </span>
    );
  }
  if (dietType === 'Non-Veg') {
    return (
      <span className="inline-flex items-center gap-1 bg-rose-950/70 border border-rose-500/50 text-rose-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
        <span className="w-2.5 h-2.5 rounded-[2px] border border-rose-400 flex items-center justify-center p-[1px]">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
        </span>
        <span className="tracking-wide">NON-VEG</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 bg-sky-950/70 border border-sky-500/50 text-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-2xs">
      <Sparkles className="w-2.5 h-2.5 text-sky-400" />
      <span className="tracking-wide">SUPPLEMENT</span>
    </span>
  );
});
VegNonVegMarker.displayName = 'VegNonVegMarker';

// The Strict 19-Point Precision Nutrient Specifications
const PRECISION_19_NUTRIENTS: { key: keyof PrecisionMicros; label: string; unit: string; color: string }[] = [
  { key: 'calories', label: 'Calories', unit: 'kcal', color: 'text-amber-400' },
  { key: 'protein', label: 'Protein', unit: 'g', color: 'text-emerald-400' },
  { key: 'totalCarbohydrates', label: 'Total Carbs', unit: 'g', color: 'text-cyan-400' },
  { key: 'dietaryFiber', label: 'Dietary Fiber', unit: 'g', color: 'text-teal-400' },
  { key: 'saturatedFat', label: 'Saturated Fat', unit: 'g', color: 'text-rose-400' },
  { key: 'monounsaturatedFat', label: 'Mono Fat', unit: 'g', color: 'text-orange-400' },
  { key: 'polyunsaturatedFat', label: 'Poly Fat', unit: 'g', color: 'text-amber-300' },
  { key: 'calcium', label: 'Calcium', unit: 'mg', color: 'text-blue-300' },
  { key: 'magnesium', label: 'Magnesium', unit: 'mg', color: 'text-indigo-300' },
  { key: 'phosphorus', label: 'Phosphorus', unit: 'mg', color: 'text-purple-300' },
  { key: 'potassium', label: 'Potassium', unit: 'mg', color: 'text-emerald-300' },
  { key: 'sodium', label: 'Sodium', unit: 'mg', color: 'text-red-300' },
  { key: 'zinc', label: 'Zinc', unit: 'mg', color: 'text-zinc-300' },
  { key: 'copper', label: 'Copper', unit: 'mg', color: 'text-amber-200' },
  { key: 'manganese', label: 'Manganese', unit: 'mg', color: 'text-sky-300' },
  { key: 'vitaminA', label: 'Vitamin A', unit: 'mcg', color: 'text-yellow-400' },
  { key: 'vitaminBComplex', label: 'B-Complex', unit: 'mg', color: 'text-pink-400' },
  { key: 'vitaminC', label: 'Vitamin C', unit: 'mg', color: 'text-lime-400' },
  { key: 'waterMoisture', label: 'Water Moisture', unit: 'g', color: 'text-cyan-300' },
];

const getCategoryBadgeClass = (category: DietCategory) => {
  switch (category) {
    case 'Pre-Workout':
      return 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60';
    case 'Post-Workout':
      return 'bg-purple-950/80 text-purple-300 border-purple-700/60';
    case 'Bulking / Mass Gaining':
      return 'bg-amber-950/80 text-amber-300 border-amber-700/60';
    case 'Muscle Gain':
      return 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60';
    case 'Stamina Building':
      return 'bg-rose-950/80 text-rose-300 border-rose-700/60';
    case 'Muscle Endurance':
      return 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60';
    case 'Fat Loss':
      return 'bg-teal-950/80 text-teal-300 border-teal-700/60';
    case 'Weight Loss':
      return 'bg-sky-950/80 text-sky-300 border-sky-700/60';
    default:
      return 'bg-zinc-900 text-zinc-300 border-zinc-700';
  }
};

// Interactive 3D Card-Flip Precision Nutrient Breakdown Architecture
const FoodItemCard = memo(({ 
  item, 
  onInspect, 
  onLog 
}: { 
  item: DietItem; 
  onInspect: (item: DietItem) => void;
  onLog: (item: DietItem, e: React.MouseEvent) => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const touchStartX = React.useRef<number | null>(null);
  const touchStartY = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        // Swiped Left -> Flip to back
        setIsFlipped(true);
        triggerHapticFeedback('light');
      } else {
        // Swiped Right -> Flip to front
        setIsFlipped(false);
        triggerHapticFeedback('light');
      }
    }
  };

  const handleToggleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(prev => !prev);
    triggerHapticFeedback('light');
  };

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[data-no-flip]')) {
      return;
    }
    setIsFlipped(prev => !prev);
    triggerHapticFeedback('light');
  };

  const totalLipidsPer100g = Math.round(
    (item.precisionMicros.saturatedFat + item.precisionMicros.monounsaturatedFat + item.precisionMicros.polyunsaturatedFat) * 10
  ) / 10;

  return (
    <div 
      className="h-[435px] p-1 select-none"
      style={{ perspective: '1000px' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleCardClick}
    >
      <div
        className="relative w-full h-full cursor-pointer will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* CARD FRONT: High-End Dark Glassmorphism */}
        <div
          className="absolute inset-0 w-full h-full bg-slate-950 border border-slate-800 text-white rounded-2xl p-5 shadow-xl flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className="space-y-3">
            {/* Top row: Category badge, Veg/Non-Veg marker, Household/Gym classification */}
            <div className="flex items-center justify-between gap-1.5 flex-wrap">
              <span className={cn(
                "text-[10px] font-bold px-2 py-0.5 border rounded-full whitespace-nowrap",
                getCategoryBadgeClass(item.category)
              )}>
                {item.category}
              </span>
              <div className="flex items-center gap-1.5">
                <VegNonVegMarker dietType={item.dietType} />
                <span className={cn(
                  "text-[10px] font-bold px-2 py-0.5 border rounded-full whitespace-nowrap",
                  item.type === 'Indian Home Food'
                    ? "bg-amber-950/60 text-amber-300 border-amber-800/60"
                    : "bg-blue-950/60 text-blue-300 border-blue-800/60"
                )}>
                  {item.type}
                </span>
              </div>
            </div>

            {/* Food Item Name & Hindi Name */}
            <div className="space-y-0.5">
              <h3 className="font-bold text-white hover:text-emerald-400 transition-colors text-sm sm:text-base leading-snug line-clamp-2">
                {item.name}
              </h3>
              <span className="text-xs text-slate-400 font-medium block truncate">
                {item.hindiName}
              </span>
            </div>

            {/* Simple Benefit & Timing */}
            <div className="text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
              <div className="flex items-start gap-1.5 font-semibold text-slate-200 mb-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug line-clamp-2">{item.benefit}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                <span>{item.timing} • {item.servingSize}</span>
              </div>
            </div>

            {/* Primary Macronutrients clearly labeled per 100g */}
            <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                <span>Serving Base</span>
                <span className="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-700/50 px-1.5 py-0.5 rounded">
                  per 100g Base
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                <div className="bg-slate-950 rounded-lg py-1.5 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-sans">Calories</span>
                  <span className="text-xs font-bold text-amber-400">{item.precisionMicros.calories}</span>
                  <span className="text-[9px] text-slate-500 block">kcal/100g</span>
                </div>
                <div className="bg-slate-950 rounded-lg py-1.5 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-sans">Protein</span>
                  <span className="text-xs font-bold text-emerald-400">{item.precisionMicros.protein}g</span>
                  <span className="text-[9px] text-slate-500 block">/100g</span>
                </div>
                <div className="bg-slate-950 rounded-lg py-1.5 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-sans">Carbs</span>
                  <span className="text-xs font-bold text-cyan-400">{item.precisionMicros.totalCarbohydrates}g</span>
                  <span className="text-[9px] text-slate-500 block">/100g</span>
                </div>
                <div className="bg-slate-950 rounded-lg py-1.5 border border-slate-800/80">
                  <span className="text-[10px] text-slate-400 block font-sans">Fats</span>
                  <span className="text-xs font-bold text-rose-400">{totalLipidsPer100g}g</span>
                  <span className="text-[9px] text-slate-500 block">/100g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleToggleFlip}
                className="flex items-center gap-1.5 text-[11px] text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>19 Nutrients (Swipe/Tap)</span>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onInspect(item);
                }}
                className="text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded transition-colors cursor-pointer"
              >
                Details ℹ️
              </button>
            </div>

            <button
              type="button"
              onClick={(e) => onLog(item, e)}
              className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl border border-emerald-500 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log to Calorie Tracker</span>
            </button>
          </div>
        </div>

        {/* CARD BACK: 19 PRECISION NUTRIENTS (STRICT 19 PARAMETERS PER 100G) */}
        <div
          className="absolute inset-0 w-full h-full bg-slate-950 border border-slate-800 text-white rounded-2xl p-4 shadow-xl flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  19 Precision Nutrients
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">100g Base</span>
              </div>
              <h4 className="text-xs font-bold text-white truncate mt-1">
                {item.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={handleToggleFlip}
              className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-cyan-400" />
              <span>Flip Front</span>
            </button>
          </div>

          {/* 19 Precision Nutrients Breakdown (2-Column Dense Grid) */}
          <div className="flex-1 overflow-y-auto py-2 pr-1 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
            <div className="grid grid-cols-2 gap-1 text-[11px]">
              {PRECISION_19_NUTRIENTS.map(nut => {
                const val = item.precisionMicros[nut.key];
                return (
                  <div 
                    key={String(nut.key)}
                    className="bg-slate-900/90 border border-slate-800/90 rounded-lg px-2 py-1 flex items-center justify-between"
                  >
                    <span className="text-[10px] text-slate-400 font-medium truncate pr-1">
                      {nut.label}
                    </span>
                    <span className={cn("font-mono font-bold text-[11px] shrink-0", nut.color)}>
                      {val} {nut.unit}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <button
              type="button"
              onClick={(e) => onLog(item, e)}
              className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2 rounded-xl border border-emerald-500 transition-colors shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log to Calorie Tracker</span>
            </button>
            <div className="text-center text-[10px] text-slate-500 font-mono">
              Swipe right or tap to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
FoodItemCard.displayName = 'FoodItemCard';

export const DietSuite = memo(function DietSuite() {
  const [activeSubSection, setActiveSubSection] = useState<DietSubSection>('database');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<DietCategory>('Pre-Workout');
  const [selectedType, setSelectedType] = useState<'All' | 'Indian Home Food' | 'Gym Supplement'>('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [inspectedItem, setInspectedItem] = useState<DietItem | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSwitchTab = (tab: DietSubSection) => {
    triggerHapticFeedback('light');
    setActiveSubSection(tab);
  };

  // Instant dataset selection by category
  const currentCategoryDataset = useMemo(() => {
    if (selectedCategory === 'Pre-Workout') return MASTER_PRE_WORKOUT_DATABASE;
    if (selectedCategory === 'Post-Workout') return MASTER_POST_WORKOUT_DATABASE;
    if (selectedCategory === 'Bulking / Mass Gaining') return MASTER_BULKING_DATABASE;
    if (selectedCategory === 'Muscle Gain') return MASTER_MUSCLE_GAIN_DATABASE;
    if (selectedCategory === 'Stamina Building') return MASTER_STAMINA_DATABASE;
    if (selectedCategory === 'Muscle Endurance') return MASTER_MUSCLE_ENDURANCE_DATABASE;
    if (selectedCategory === 'Fat Loss') return MASTER_FAT_LOSS_DATABASE;
    return MASTER_WEIGHT_LOSS_DATABASE;
  }, [selectedCategory]);

  const homeFoodCount = useMemo(() => {
    return currentCategoryDataset.filter(i => i.type === 'Indian Home Food').length;
  }, [currentCategoryDataset]);

  const gymSuppCount = useMemo(() => {
    return currentCategoryDataset.filter(i => i.type === 'Gym Supplement').length;
  }, [currentCategoryDataset]);

  // Instant filter computation (Silky smooth 60fps)
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return currentCategoryDataset.filter(item => {
      // Filter by Food Type (Home vs Gym)
      if (selectedType !== 'All' && item.type !== selectedType) {
        return false;
      }

      // Search Query filter
      if (q) {
        const matchName = item.name.toLowerCase().includes(q);
        const matchHindi = item.hindiName.toLowerCase().includes(q);
        const matchBenefit = item.benefit.toLowerCase().includes(q);
        const matchPrep = item.howToPrepare.toLowerCase().includes(q);
        if (!matchName && !matchHindi && !matchBenefit && !matchPrep) {
          return false;
        }
      }

      return true;
    });
  }, [currentCategoryDataset, searchQuery, selectedType]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedType('All');
    setIsDrawerOpen(false);
  }, []);

  // 1-Tap Log Item directly into Daily Calorie Ledger
  const handleLogToCalorieTracker = async (item: DietItem, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    triggerHapticFeedback('success');
    const today = format(new Date(), 'yyyy-MM-dd');

    try {
      const mealType = item.category === 'Pre-Workout' 
        ? 'snack' 
        : item.category === 'Post-Workout' 
        ? 'dinner' 
        : item.category === 'Bulking / Mass Gaining'
        ? 'lunch'
        : item.category === 'Muscle Gain'
        ? 'breakfast'
        : item.category === 'Stamina Building'
        ? 'snack'
        : item.category === 'Muscle Endurance'
        ? 'lunch'
        : item.category === 'Fat Loss'
        ? 'dinner'
        : 'lunch';
      await calorieStorage.addMealItem(today, {
        name: `[${item.category}] ${item.name}`,
        mealType,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fats: item.fats,
        quantity: 1,
        unit: 'serving',
        source: 'routine'
      });

      confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
      showToast(`Logged "${item.name.slice(0, 30)}..." to today's ${item.category} Ledger!`);
      setInspectedItem(null);
    } catch (err) {
      console.error('Error logging diet meal:', err);
      showToast('Error logging meal item.');
    }
  };

  const isFiltered = searchQuery !== '' || selectedType !== 'All';

  return (
    <div className="flex-1 w-full flex flex-col bg-white text-zinc-900 min-h-0 overflow-hidden relative">
      {/* Top Control Bar (~10% Screen Area) */}
      <div className="h-14 sm:h-16 px-3 sm:px-5 bg-white border-b border-zinc-200 flex items-center justify-between gap-2 sm:gap-3 shrink-0 shadow-xs z-30 relative">
        {/* Left: Tab Switcher & Quick Category Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Sub-Section Switcher (Diet Database & Features) */}
          <div className="flex items-center p-0.5 sm:p-1 bg-zinc-100 rounded-xl border border-zinc-200">
            <button
              onClick={() => handleSwitchTab('database')}
              className={cn(
                "px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                activeSubSection === 'database'
                  ? "bg-white text-emerald-700 shadow-xs border border-zinc-200/80 font-bold"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Diet</span> <span>Database</span>
            </button>

            <button
              onClick={() => handleSwitchTab('features')}
              className={cn(
                "px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                activeSubSection === 'features'
                  ? "bg-white text-emerald-700 shadow-xs border border-zinc-200/80 font-bold"
                  : "text-zinc-600 hover:text-zinc-900"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Features</span>
            </button>
          </div>

          {/* Quick Category Toggle Pills (Pre-Workout / Post-Workout / Bulking) */}
          {activeSubSection === 'database' && (
            <div className="hidden lg:flex items-center p-0.5 bg-zinc-100 rounded-xl border border-zinc-200">
              <button
                onClick={() => {
                  setSelectedCategory('Pre-Workout');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Pre-Workout'
                    ? "bg-white text-emerald-700 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Zap className="w-3 h-3 text-amber-500" />
                <span>Pre-Workout ({PRE_WORKOUT_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Post-Workout');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Post-Workout'
                    ? "bg-white text-purple-700 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Flame className="w-3 h-3 text-purple-500" />
                <span>Post-Workout ({POST_WORKOUT_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Bulking / Mass Gaining');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Bulking / Mass Gaining'
                    ? "bg-white text-amber-800 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Utensils className="w-3 h-3 text-amber-600" />
                <span>Bulking ({BULKING_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Muscle Gain');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Muscle Gain'
                    ? "bg-white text-cyan-800 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Zap className="w-3 h-3 text-cyan-600" />
                <span>Muscle Gain ({MUSCLE_GAIN_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Stamina Building');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Stamina Building'
                    ? "bg-white text-rose-800 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Activity className="w-3 h-3 text-rose-600" />
                <span>Stamina ({STAMINA_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Muscle Endurance');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Muscle Endurance'
                    ? "bg-white text-indigo-800 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Shield className="w-3 h-3 text-indigo-600" />
                <span>Endurance ({MUSCLE_ENDURANCE_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Fat Loss');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Fat Loss'
                    ? "bg-white text-teal-800 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Target className="w-3 h-3 text-teal-600" />
                <span>Fat Loss ({FAT_LOSS_TOTAL_COUNT})</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Weight Loss');
                  triggerHapticFeedback('light');
                }}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  selectedCategory === 'Weight Loss'
                    ? "bg-white text-sky-800 shadow-xs border border-zinc-200/80 font-bold"
                    : "text-zinc-600 hover:text-zinc-900"
                )}
              >
                <Scale className="w-3 h-3 text-sky-600" />
                <span>Weight Loss ({WEIGHT_LOSS_TOTAL_COUNT})</span>
              </button>
            </div>
          )}
        </div>

        {/* Center: Search Bar */}
        {activeSubSection === 'database' && (
          <div className="relative flex-1 max-w-sm sm:max-w-md mx-1 sm:mx-2">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-2.5 sm:top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${selectedCategory} foods & supplements...`}
              className="w-full pl-8 sm:pl-9 pr-7 py-1.5 rounded-xl bg-zinc-50 hover:bg-white focus:bg-white border border-zinc-200 text-xs sm:text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-emerald-500 transition-colors shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Right: Items counter + Scientific Info (i) + Filters button */}
        {activeSubSection === 'database' && (
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Count Badge */}
            <span className="hidden xl:inline-block text-[11px] font-mono font-bold px-2 py-1 rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200">
              {filteredItems.length} items
            </span>

            {isFiltered && (
              <button
                onClick={clearFilters}
                className="hidden sm:flex text-xs font-bold text-zinc-500 hover:text-zinc-800 items-center gap-1 bg-zinc-50 border border-zinc-200 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <FilterX className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}

            {/* Scientific Formulation Info Button */}
            <button
              onClick={() => setShowInfoModal(true)}
              title="View Scientific Formulation Info"
              className="p-1.5 sm:p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-600 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-emerald-600" />
            </button>

            {/* Filters Button */}
            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className={cn(
                "px-3 py-1.5 sm:py-2 rounded-xl border flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-2xs",
                isDrawerOpen || isFiltered
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-xs"
                  : "bg-white border-zinc-200 text-zinc-700 hover:text-zinc-900"
              )}
            >
              <Filter className="w-3.5 h-3.5 text-emerald-600" />
              <span>Filters</span>
              {isFiltered && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </button>
          </div>
        )}
      </div>

      {/* Floating Filter Popover Overlay (Positioned Absolutely - NEVER Shrinks the 90% Food Grid) */}
      {isDrawerOpen && activeSubSection === 'database' && (
        <>
          {/* Backdrop to dismiss on click */}
          <div 
            onClick={() => setIsDrawerOpen(false)} 
            className="fixed inset-0 z-40 bg-black/15 backdrop-blur-2xs"
          />

          <div className="absolute top-15 right-3 sm:right-6 z-50 w-80 sm:w-96 bg-white border border-zinc-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xl animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-2 uppercase tracking-wider font-mono">
                <Filter className="w-3.5 h-3.5 text-emerald-600" />
                Filter Matrix
              </h3>
              <button 
                onClick={() => setIsDrawerOpen(false)} 
                className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Section 1: Categories (Pre-Workout & Post-Workout & Bulking & Muscle Gain) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">
                Category (Instant Switch)
              </span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setSelectedCategory('Pre-Workout');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Pre-Workout'
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pre-Workout ({PRE_WORKOUT_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Pre-Workout' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Post-Workout');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Post-Workout'
                      ? "bg-purple-50 border-purple-200 text-purple-700 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-purple-500" />
                    <span>Post-Workout ({POST_WORKOUT_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Post-Workout' && <Check className="w-3.5 h-3.5 text-purple-600" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Bulking / Mass Gaining');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Bulking / Mass Gaining'
                      ? "bg-amber-50 border-amber-200 text-amber-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-amber-600" />
                    <span>Bulking / Mass Gaining ({BULKING_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Bulking / Mass Gaining' && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Muscle Gain');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Muscle Gain'
                      ? "bg-cyan-50 border-cyan-200 text-cyan-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Muscle Gain ({MUSCLE_GAIN_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Muscle Gain' && <Check className="w-3.5 h-3.5 text-cyan-700" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Stamina Building');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Stamina Building'
                      ? "bg-rose-50 border-rose-200 text-rose-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-rose-600" />
                    <span>Stamina Building ({STAMINA_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Stamina Building' && <Check className="w-3.5 h-3.5 text-rose-700" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Muscle Endurance');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Muscle Endurance'
                      ? "bg-indigo-50 border-indigo-200 text-indigo-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Muscle Endurance ({MUSCLE_ENDURANCE_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Muscle Endurance' && <Check className="w-3.5 h-3.5 text-indigo-700" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Fat Loss');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Fat Loss'
                      ? "bg-teal-50 border-teal-200 text-teal-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-teal-600" />
                    <span>Fat Loss ({FAT_LOSS_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Fat Loss' && <Check className="w-3.5 h-3.5 text-teal-700" />}
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('Weight Loss');
                    triggerHapticFeedback('light');
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs font-bold border transition-all duration-200 flex items-center justify-between cursor-pointer",
                    selectedCategory === 'Weight Loss'
                      ? "bg-sky-50 border-sky-200 text-sky-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span className="flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-sky-600" />
                    <span>Weight Loss ({WEIGHT_LOSS_TOTAL_COUNT} food items)</span>
                  </span>
                  {selectedCategory === 'Weight Loss' && <Check className="w-3.5 h-3.5 text-sky-700" />}
                </button>
              </div>
            </div>

            {/* Section 2: Real-World Distribution (70% Indian Home Foods / 30% Gym Supplements) */}
            <div className="space-y-2 pt-2 border-t border-zinc-100">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider font-mono block">
                Food Type (Instant Filter)
              </span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => { setSelectedType('All'); triggerHapticFeedback('light'); }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-between",
                    selectedType === 'All'
                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span>All Items ({currentCategoryDataset.length})</span>
                  {selectedType === 'All' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
                <button
                  onClick={() => { setSelectedType('Indian Home Food'); triggerHapticFeedback('light'); }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-between",
                    selectedType === 'Indian Home Food'
                      ? "bg-amber-50 border-amber-200 text-amber-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span>70% Indian Home Foods ({homeFoodCount})</span>
                  {selectedType === 'Indian Home Food' && <Check className="w-3.5 h-3.5 text-amber-700" />}
                </button>
                <button
                  onClick={() => { setSelectedType('Gym Supplement'); triggerHapticFeedback('light'); }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer flex items-center justify-between",
                    selectedType === 'Gym Supplement'
                      ? "bg-blue-50 border-blue-200 text-blue-800 shadow-xs"
                      : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <span>30% Gym Supplements ({gymSuppCount})</span>
                  {selectedType === 'Gym Supplement' && <Check className="w-3.5 h-3.5 text-blue-700" />}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
              <button
                onClick={() => setShowInfoModal(true)}
                className="text-emerald-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Category Info</span>
              </button>
              <button
                onClick={clearFilters}
                className="font-bold text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </>
      )}

      {/* Scientific Formulation Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 w-full max-w-md text-zinc-900 shadow-2xl relative space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-md",
                  selectedCategory === 'Pre-Workout'
                    ? "bg-emerald-100 text-emerald-800"
                    : selectedCategory === 'Post-Workout'
                    ? "bg-purple-100 text-purple-800"
                    : selectedCategory === 'Bulking / Mass Gaining'
                    ? "bg-amber-100 text-amber-800"
                    : selectedCategory === 'Muscle Gain'
                    ? "bg-cyan-100 text-cyan-800"
                    : selectedCategory === 'Stamina Building'
                    ? "bg-rose-100 text-rose-800"
                    : selectedCategory === 'Muscle Endurance'
                    ? "bg-indigo-100 text-indigo-800"
                    : selectedCategory === 'Fat Loss'
                    ? "bg-teal-100 text-teal-800"
                    : "bg-sky-100 text-sky-800"
                )}>
                  {selectedCategory}
                </span>
                <h3 className="font-bold text-zinc-900 text-sm sm:text-base">
                  Scientific Calibration
                </h3>
              </div>
              <button
                onClick={() => setShowInfoModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs sm:text-sm text-zinc-700 leading-relaxed font-medium">
              {selectedCategory === 'Pre-Workout' &&
                "Engineered for immediate ATP replenishment and vascular dilation. Formulated around rapid-acting simple sugars, low-glycemic sustained-release energy polymers, and nitric-oxide precursors."}
              {selectedCategory === 'Post-Workout' &&
                "Calibrated for muscle protein synthesis and rapid glycogen supercompensation. Features high biological value (HBV) protein isolates, rapid-spike carbohydrate ratios, and cellular hydration facilitators."}
              {selectedCategory === 'Bulking / Mass Gaining' &&
                "Structured for net positive caloric surplus maintenance. Comprises calorically dense lipid formulations, complex starches, and hyper-caloric macronutrient matricies."}
              {selectedCategory === 'Muscle Gain' &&
                "Focused on myofibrillar hypertrophy. Built upon high-nitrogen lean protein sources paired with balanced micronutrient profiles to support sustained nitrogen balance."}
              {selectedCategory === 'Stamina Building' &&
                "Optimized for mitochondrial oxidative capacity and cellular oxygen efficiency. Features endurance-focused, micronutrient-dense substrates."}
              {selectedCategory === 'Muscle Endurance' &&
                "Formulated to buffer hydrogen ion accumulation and lactic acid fatigue during high-volume training sessions. Comprises electrolyte-balanced, sustained-release energy complexes."}
              {selectedCategory === 'Fat Loss' &&
                "Calibrated for aggressive caloric restriction without lean mass catabolism. Emphasizes high thermic effect of food (TEF), volumetric low-calorie density items, and high dietary fiber profiles to maximize satiety."}
              {selectedCategory === 'Weight Loss' &&
                "Designed for sustainable, long-term weekly mass reduction. Utilizes satiety-driven, nutrient-dense macronutrient ratios."}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sub-Section 1: Diet Database View (90% SCREEN COVERAGE FOR EFFORTLESS SCROLLING) */}
      {activeSubSection === 'database' && (
        <div className="flex-1 min-h-0 w-full relative bg-zinc-50/40 overflow-hidden">
          {filteredItems.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 text-sm gap-2">
              <FilterX className="w-8 h-8 text-zinc-400" />
              <p className="font-medium">No food items found matching criteria.</p>
              <button 
                onClick={clearFilters} 
                className="text-emerald-600 font-bold hover:underline cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <VirtualizedList
              items={filteredItems}
              estimatedItemHeight={435}
              keyExtractor={(item) => item.id}
              listClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3 pb-8"
              className="h-full w-full scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent"
              renderItem={(item) => (
                <FoodItemCard
                  item={item}
                  onInspect={setInspectedItem}
                  onLog={handleLogToCalorieTracker}
                />
              )}
            />
          )}
        </div>
      )}

      {/* Sub-Section 2: Features (Kept clean and empty as requested: "aur dusre ka fetaures abhi un dono ko empty chod do mei usme baad mei add karunga") */}
      {activeSubSection === 'features' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-50/50 text-zinc-400 min-h-[350px]">
          {/* Kept clean and empty for future additions as requested */}
        </div>
      )}

      {/* Inspection Modal for Easy Food Details & 1-Tap Calorie Logging */}
      {inspectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-7 w-full max-w-lg text-zinc-900 shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded-full border",
                    inspectedItem.category === 'Pre-Workout'
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : inspectedItem.category === 'Post-Workout'
                      ? "bg-purple-50 text-purple-700 border-purple-200"
                      : inspectedItem.category === 'Bulking / Mass Gaining'
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : inspectedItem.category === 'Muscle Gain'
                      ? "bg-cyan-50 text-cyan-800 border-cyan-200"
                      : inspectedItem.category === 'Stamina Building'
                      ? "bg-rose-50 text-rose-800 border-rose-200"
                      : inspectedItem.category === 'Muscle Endurance'
                      ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                      : inspectedItem.category === 'Fat Loss'
                      ? "bg-teal-50 text-teal-800 border-teal-200"
                      : "bg-sky-50 text-sky-800 border-sky-200"
                  )}>
                    {inspectedItem.category}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {inspectedItem.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 mt-1.5 leading-snug">
                  {inspectedItem.name}
                </h3>
                <span className="text-xs text-zinc-500 font-medium block">
                  {inspectedItem.hindiName}
                </span>
              </div>
              <button
                onClick={() => setInspectedItem(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {/* Timing & Serving */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-zinc-500 block text-[11px] font-medium">Kab Khana Hai:</span>
                  <span className="text-emerald-700 font-bold block mt-0.5">{inspectedItem.timing}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80">
                  <span className="text-zinc-500 block text-[11px] font-medium">Quantity (Serving):</span>
                  <span className="text-zinc-800 font-bold block mt-0.5 truncate">{inspectedItem.servingSize}</span>
                </div>
              </div>

              {/* Benefit in Simple Words */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-xs font-bold text-amber-900 block mb-1 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Khaane ka Fayda (Benefit):
                </span>
                <p className="text-xs text-zinc-700 font-medium leading-relaxed">
                  {inspectedItem.benefit}
                </p>
              </div>

              {/* Nutrition Breakdown */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-800 block">Serving Nutrition:</span>
                  <span className="text-[11px] text-zinc-500 font-mono">{inspectedItem.servingSize}</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center font-mono">
                  <div className="bg-white p-2 rounded-lg border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-400 block font-sans">Calories</span>
                    <span className="text-sm font-bold text-amber-600">{inspectedItem.calories} kcal</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-400 block font-sans">Carbs</span>
                    <span className="text-sm font-bold text-zinc-800">{inspectedItem.carbs}g</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-400 block font-sans">Protein</span>
                    <span className="text-sm font-bold text-emerald-600">{inspectedItem.protein}g</span>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-zinc-200 shadow-2xs">
                    <span className="text-[10px] text-zinc-400 block font-sans">Fats</span>
                    <span className="text-sm font-bold text-zinc-800">{inspectedItem.fats}g</span>
                  </div>
                </div>
              </div>

              {/* 19-Point Precision Nutrient Breakdown (100g Base) */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                    <RotateCw className="w-3.5 h-3.5" />
                    19-Point Precision Nutrients
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-1.5 py-0.5 rounded">
                    per 100g Base
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs max-h-48 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                  {PRECISION_19_NUTRIENTS.map(nut => {
                    const val = inspectedItem.precisionMicros[nut.key];
                    return (
                      <div 
                        key={String(nut.key)}
                        className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 flex items-center justify-between"
                      >
                        <span className="text-[10px] text-slate-400 truncate pr-1">
                          {nut.label}
                        </span>
                        <span className={cn("font-mono font-bold text-[11px] shrink-0", nut.color)}>
                          {val} {nut.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* How to prepare / Kaise lena hai */}
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 text-xs">
                <span className="text-zinc-700 font-bold block mb-1">Kaise Lena Hai (Preparation):</span>
                <p className="text-zinc-600 font-medium leading-relaxed">
                  {inspectedItem.howToPrepare}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
              <button
                onClick={() => setInspectedItem(null)}
                className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-900 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => handleLogToCalorieTracker(inspectedItem)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm active:scale-98 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Log to Calorie Tracker (+{inspectedItem.calories} kcal)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-zinc-900 text-white font-bold text-xs shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
});

export default DietSuite;
