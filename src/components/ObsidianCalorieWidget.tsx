import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ResponsiveContainer, 
  RadialBarChart, 
  RadialBar, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { 
  Flame, 
  PieChart as PieIcon, 
  BarChart2, 
  Target, 
  Plus
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { calorieStorage, MealDayRecord, MacroTargets } from '../services/CalorieStorageService';
import { continuousPhysiologyEngine, ContinuousPhysiologySnapshot } from '../services/continuousPhysiologyEngine';

interface ObsidianCalorieWidgetProps {
  profile?: any;
  selectedDate?: string;
  dayLog?: MealDayRecord | null;
  targets?: MacroTargets | null;
  activeBurn?: number;
  onRefresh?: () => void;
}

export const ObsidianCalorieWidget: React.FC<ObsidianCalorieWidgetProps> = ({ 
  profile,
  selectedDate,
  dayLog: propDayLog,
  targets: propTargets,
  activeBurn: propActiveBurn,
  onRefresh
}) => {
  const [internalDayLog, setInternalDayLog] = useState<MealDayRecord | null>(null);
  const [internalTargets, setInternalTargets] = useState<MacroTargets | null>(null);
  const [internalActiveBurn, setInternalActiveBurn] = useState<number>(0);
  const [selectedSubView, setSelectedSubView] = useState<'ring' | 'meals' | 'macros' | 'all'>('all');
  const [quickAddInput, setQuickAddInput] = useState('');
  const [isAddingQuick, setIsAddingQuick] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [livePhysio, setLivePhysio] = useState<ContinuousPhysiologySnapshot>(() => continuousPhysiologyEngine.getSnapshot());

  const effectiveDate = selectedDate || format(new Date(), 'yyyy-MM-dd');

  const loadData = useCallback(async () => {
    if (propDayLog !== undefined && propTargets !== undefined) return;
    try {
      const [log, tgt, burn] = await Promise.all([
        calorieStorage.getDayLog(effectiveDate),
        calorieStorage.getTargets(profile),
        calorieStorage.getActiveBurn(effectiveDate)
      ]);
      setInternalDayLog(log);
      setInternalTargets(tgt);
      if (burn) setInternalActiveBurn(burn.caloriesBurned || 0);
    } catch (e) {
      console.error('Error loading calorie widget data:', e);
    }
  }, [effectiveDate, profile, propDayLog, propTargets]);

  useEffect(() => {
    loadData();
    const unsubPhysio = continuousPhysiologyEngine.subscribe((snap) => {
      setLivePhysio(snap);
    });
    const handleLiveCalorieEvent = () => {
      loadData();
      if (onRefresh) onRefresh();
    };
    window.addEventListener('pulsefit_calorie_logged', handleLiveCalorieEvent);
    window.addEventListener('pulsefit_exercise_logged', handleLiveCalorieEvent);
    window.addEventListener('pulsefit_workout_logged', handleLiveCalorieEvent);
    return () => {
      unsubPhysio();
      window.removeEventListener('pulsefit_calorie_logged', handleLiveCalorieEvent);
      window.removeEventListener('pulsefit_exercise_logged', handleLiveCalorieEvent);
      window.removeEventListener('pulsefit_workout_logged', handleLiveCalorieEvent);
    };
  }, [loadData, effectiveDate, onRefresh]);

  const dayLog = propDayLog !== undefined ? propDayLog : internalDayLog;
  const targets = propTargets !== undefined ? propTargets : internalTargets;
  const activeBurn = propActiveBurn !== undefined ? propActiveBurn : internalActiveBurn;

  // Derived metrics
  const targetCalories = targets?.dailyCalories || 2000;
  const intakeCalories = dayLog?.totalCalories || 0;
  const netCalories = Math.max(0, intakeCalories - activeBurn);
  const remainingCalories = targetCalories - netCalories;
  const progressPercent = Math.min(100, Math.round((netCalories / targetCalories) * 100));

  // Radial Bar Data for the Animated Progress Ring
  const radialData = useMemo(() => {
    return [
      {
        name: 'Daily Calorie Progress',
        value: progressPercent,
        fill: progressPercent > 100 ? '#f43f5e' : '#f59e0b',
      }
    ];
  }, [progressPercent]);

  // Meal breakdown for Bar Graph
  const mealBarData = useMemo(() => {
    const meals = dayLog?.meals || [];
    const bFast = meals.filter(m => m.mealType === 'breakfast').reduce((sum, m) => sum + m.calories, 0);
    const lunch = meals.filter(m => m.mealType === 'lunch').reduce((sum, m) => sum + m.calories, 0);
    const dinner = meals.filter(m => m.mealType === 'dinner').reduce((sum, m) => sum + m.calories, 0);
    const snack = meals.filter(m => m.mealType === 'snack').reduce((sum, m) => sum + m.calories, 0);

    return [
      { name: 'Breakfast', consumed: bFast, target: Math.round(targetCalories * 0.25) },
      { name: 'Lunch', consumed: lunch, target: Math.round(targetCalories * 0.35) },
      { name: 'Dinner', consumed: dinner, target: Math.round(targetCalories * 0.25) },
      { name: 'Snacks', consumed: snack, target: Math.round(targetCalories * 0.15) },
    ];
  }, [dayLog, targetCalories]);

  // Macronutrient breakdown for Pie Chart
  const macroPieData = useMemo(() => {
    const p = dayLog?.totalProtein || 0;
    const c = dayLog?.totalCarbs || 0;
    const f = dayLog?.totalFats || 0;

    const pCals = p * 4;
    const cCals = c * 4;
    const fCals = f * 9;
    const totalMacroCals = pCals + cCals + fCals;

    if (totalMacroCals === 0) {
      return [
        { name: 'Protein', value: 0, grams: 0, color: '#8b5cf6' },
        { name: 'Carbs', value: 0, grams: 0, color: '#f59e0b' },
        { name: 'Fats', value: 0, grams: 0, color: '#10b981' }
      ];
    }

    return [
      { name: 'Protein', value: Math.round((pCals / totalMacroCals) * 100), grams: p, color: '#8b5cf6' },
      { name: 'Carbs', value: Math.round((cCals / totalMacroCals) * 100), grams: c, color: '#f59e0b' },
      { name: 'Fats', value: Math.round((fCals / totalMacroCals) * 100), grams: f, color: '#10b981' }
    ];
  }, [dayLog]);

  const hasMacros = (dayLog?.totalCalories || 0) > 0;

  const handleQuickAdd = async (cals: number) => {
    if (!cals || cals <= 0) return;
    await calorieStorage.addMealItem(effectiveDate, {
      name: 'Quick Meal',
      mealType: 'lunch',
      calories: cals,
      protein: Math.round((cals * 0.25) / 4),
      carbs: Math.round((cals * 0.50) / 4),
      fats: Math.round((cals * 0.25) / 9),
      quantity: 1,
      unit: 'serving',
      source: 'manual'
    });
    setQuickAddInput('');
    setIsAddingQuick(false);
    setQuickMessage(`+${cals} kcal added!`);
    setTimeout(() => setQuickMessage(''), 3000);
    if (onRefresh) {
      onRefresh();
    } else {
      loadData();
    }
  };

  return (
    <div className="w-full rounded-3xl bg-zinc-950 text-white border border-zinc-800/90 shadow-2xl p-5 sm:p-6 relative overflow-hidden transition-all">
      {/* Subtle obsidian ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-purple-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header bar inside the obsidian widget */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-zinc-950 shadow-md shadow-amber-500/20">
            <Flame className="w-4 h-4 fill-zinc-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base tracking-tight text-white">Daily Calorie Progress</h3>
              <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                Obsidian Ring
              </span>
            </div>
            <p className="text-xs text-zinc-400">Animated progress ring, meal distribution & macro ratio</p>
          </div>
        </div>

        {/* View Switchers */}
        <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setSelectedSubView('all')}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all",
              selectedSubView === 'all' ? "bg-amber-500 text-zinc-950 font-bold shadow-sm" : "text-zinc-400 hover:text-white"
            )}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubView('ring')}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1",
              selectedSubView === 'ring' ? "bg-amber-500 text-zinc-950 font-bold shadow-sm" : "text-zinc-400 hover:text-white"
            )}
          >
            <Target className="w-3 h-3" /> Ring
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubView('meals')}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1",
              selectedSubView === 'meals' ? "bg-amber-500 text-zinc-950 font-bold shadow-sm" : "text-zinc-400 hover:text-white"
            )}
          >
            <BarChart2 className="w-3 h-3" /> Bar
          </button>
          <button
            type="button"
            onClick={() => setSelectedSubView('macros')}
            className={cn(
              "px-2.5 py-1 text-xs font-semibold rounded-lg transition-all flex items-center gap-1",
              selectedSubView === 'macros' ? "bg-amber-500 text-zinc-950 font-bold shadow-sm" : "text-zinc-400 hover:text-white"
            )}
          >
            <PieIcon className="w-3 h-3" /> Pie
          </button>
        </div>
      </div>

      {/* Main Visualizations Grid */}
      <div className="relative z-10 pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          
          {/* 1. The Smooth Animated Progress Ring Card */}
          {(selectedSubView === 'all' || selectedSubView === 'ring') && (
            <div className={cn(
              "rounded-2xl bg-zinc-900/70 border border-zinc-800/80 p-4 sm:p-5 flex flex-col items-center justify-between relative shadow-inner overflow-hidden",
              selectedSubView === 'ring' ? "lg:col-span-3 py-6" : ""
            )}>
              <div className="w-full flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  Progress Ring
                </span>
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {progressPercent}%
                </span>
              </div>

              {/* Ring Container with Center Numbers */}
              <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center my-1">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    innerRadius="75%"
                    outerRadius="100%"
                    data={radialData}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {/* Background Track Ring */}
                    <RadialBar
                      background={{ fill: '#27272a' }}
                      dataKey="value"
                      cornerRadius={12}
                      animationDuration={1500}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>

                {/* Ring Center Metrics Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono font-bold">
                    Net Intake
                  </span>
                  <span className="text-2xl font-black tracking-tight text-white font-mono mt-0.5">
                    {netCalories}
                  </span>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    / {targetCalories} kcal
                  </span>
                </div>
              </div>

              {/* Status footer pill */}
              <div className="w-full flex items-center justify-between pt-3 mt-1 border-t border-zinc-800/60 text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono">Status</span>
                  <span className={cn("font-bold font-mono", remainingCalories >= 0 ? "text-emerald-400" : "text-rose-400")}>
                    {remainingCalories >= 0 ? `${remainingCalories} kcal left` : `${Math.abs(remainingCalories)} kcal over`}
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono">Burned</span>
                  <span className="font-bold font-mono text-cyan-400">-{activeBurn} kcal</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. Meal Breakdown Bar Graph Card */}
          {(selectedSubView === 'all' || selectedSubView === 'meals') && (
            <div className={cn(
              "rounded-2xl bg-zinc-900/70 border border-zinc-800/80 p-4 sm:p-5 flex flex-col justify-between relative shadow-inner overflow-hidden",
              selectedSubView === 'meals' ? "lg:col-span-3 py-6" : ""
            )}>
              <div className="w-full flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
                  Bar Graph
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Meals vs Target
                </span>
              </div>

              {/* Recharts Bar Chart */}
              <div className="w-full h-44 sm:h-48 my-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mealBarData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'monospace' }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <YAxis 
                      tick={{ fill: '#71717a', fontSize: 10, fontFamily: 'monospace' }} 
                      axisLine={false} 
                      tickLine={false} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#09090b', 
                        borderColor: '#27272a', 
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '11px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                      }}
                      itemStyle={{ color: '#fbbf24' }}
                      formatter={(val: any) => [`${val} kcal`, 'Calories']}
                    />
                    <Bar 
                      dataKey="consumed" 
                      fill="#f59e0b" 
                      radius={[6, 6, 0, 0]} 
                      name="Consumed" 
                      animationDuration={1200}
                    />
                    <Bar 
                      dataKey="target" 
                      fill="#27272a" 
                      radius={[6, 6, 0, 0]} 
                      name="Target" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Legend */}
              <div className="flex items-center justify-center gap-4 pt-3 mt-1 border-t border-zinc-800/60 text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Consumed
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-zinc-700" /> Target
                </span>
              </div>
            </div>
          )}

          {/* 3. Macronutrients Pie Chart Card */}
          {(selectedSubView === 'all' || selectedSubView === 'macros') && (
            <div className={cn(
              "rounded-2xl bg-zinc-900/70 border border-zinc-800/80 p-4 sm:p-5 flex flex-col justify-between relative shadow-inner overflow-hidden",
              selectedSubView === 'macros' ? "lg:col-span-3 py-6" : ""
            )}>
              <div className="w-full flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <PieIcon className="w-3.5 h-3.5 text-purple-400" />
                  Pie Chart
                </span>
                <span className="text-[11px] font-mono text-zinc-400">
                  Macro Ratio
                </span>
              </div>

              {/* Recharts Pie Chart */}
              <div className="w-full h-44 sm:h-48 my-1 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    {hasMacros ? (
                      <Pie
                        data={macroPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={70}
                        paddingAngle={4}
                        animationDuration={1400}
                      >
                        {macroPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke="#09090b" strokeWidth={2} />
                        ))}
                      </Pie>
                    ) : (
                      <Pie
                        data={[{ name: 'Empty', value: 100 }]}
                        cx="50%"
                        cy="50%"
                        innerRadius={42}
                        outerRadius={70}
                        dataKey="value"
                      >
                        <Cell fill="#27272a" stroke="#18181b" strokeWidth={2} />
                      </Pie>
                    )}
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#09090b', 
                        borderColor: '#27272a', 
                        borderRadius: '12px',
                        color: '#ffffff',
                        fontSize: '11px',
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)'
                      }}
                      formatter={(val: any, name: any, item: any) => [
                        hasMacros ? `${val}% (${item.payload.grams}g)` : '0% (0g)',
                        name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {!hasMacros && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                    <span className="text-xs font-mono font-bold text-zinc-500">0%</span>
                    <span className="text-[10px] text-zinc-600 font-mono">No Meals</span>
                  </div>
                )}
              </div>

              {/* Macro Pills Legend */}
              <div className="grid grid-cols-3 gap-1.5 pt-3 mt-1 border-t border-zinc-800/60 text-center">
                {macroPieData.map((m) => (
                  <div key={m.name} className="p-1 rounded-lg bg-zinc-950/60 border border-zinc-800/60">
                    <span className="text-[10px] text-zinc-400 font-mono block">{m.name}</span>
                    <span className="text-xs font-bold font-mono" style={{ color: m.color }}>
                      {m.value}% <span className="text-[10px] text-zinc-500">({m.grams}g)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Quick Calorie Action Strip */}
        <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-400 font-medium">Quick Log:</span>
            {[150, 300, 450, 600].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => handleQuickAdd(c)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 border border-zinc-800 text-xs font-mono font-semibold transition-all active:scale-95"
              >
                +{c} kcal
              </button>
            ))}

            {isAddingQuick ? (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  placeholder="kcal"
                  value={quickAddInput}
                  onChange={(e) => setQuickAddInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleQuickAdd(parseInt(quickAddInput, 10));
                    }
                  }}
                  className="w-20 px-2 py-1 text-xs bg-zinc-900 border border-amber-500 rounded-lg text-white font-mono focus:outline-none"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => handleQuickAdd(parseInt(quickAddInput, 10))}
                  className="px-2.5 py-1 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-zinc-950 rounded-lg transition-all"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingQuick(false)}
                  className="px-2 py-1 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingQuick(true)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <Plus className="w-3 h-3" /> Custom
              </button>
            )}

            {quickMessage && (
              <span className="text-xs text-emerald-400 font-mono font-semibold">
                {quickMessage}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
