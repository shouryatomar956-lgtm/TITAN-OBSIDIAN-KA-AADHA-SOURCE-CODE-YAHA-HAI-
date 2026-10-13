import React, { useState, useEffect, useMemo, memo } from 'react';
import localforage from 'localforage';
import { 
  Dumbbell, 
  RotateCcw, 
  Plus, 
  Minus, 
  Settings2, 
  Check, 
  AlertCircle,
  Scale
} from 'lucide-react';
import { 
  Unit, 
  STANDARD_BARS, 
  METRIC_PLATES_PALETTE, 
  IMPERIAL_PLATES_PALETTE, 
  calculatePlates, 
  CalculationResult 
} from '../utils/plateCalculator';
import { triggerHapticFeedback } from '../utils/haptics';

const STORAGE_KEY = 'pulsefit_plate_calculator_state';

export const PlateCalculator = memo(function PlateCalculator() {
  const [unit, setUnit] = useState<Unit>('kg');
  const [barId, setBarId] = useState<string>('olympic_standard');
  const [targetWeight, setTargetWeight] = useState<number>(20);
  const [customBarWeight, setCustomBarWeight] = useState<number>(20);

  // Load saved preferences from localforage
  useEffect(() => {
    localforage.getItem<{ unit: Unit; barId: string; targetWeight: number }>(STORAGE_KEY).then(saved => {
      if (saved) {
        if (saved.unit) setUnit(saved.unit);
        if (saved.barId) setBarId(saved.barId);
        if (saved.targetWeight) setTargetWeight(saved.targetWeight);
      }
    }).catch(() => {});
  }, []);

  // Save changes asynchronously
  const persistState = (newUnit: Unit, newBarId: string, newTarget: number) => {
    localforage.setItem(STORAGE_KEY, {
      unit: newUnit,
      barId: newBarId,
      targetWeight: newTarget
    }).catch(() => {});
  };

  const selectedBar = useMemo(() => {
    return STANDARD_BARS.find(b => b.id === barId) || STANDARD_BARS[0];
  }, [barId]);

  const activeBarWeight = useMemo(() => {
    return unit === 'kg' ? selectedBar.weightKg : selectedBar.weightLbs;
  }, [selectedBar, unit]);

  const result: CalculationResult = useMemo(() => {
    return calculatePlates(targetWeight, activeBarWeight, unit);
  }, [targetWeight, activeBarWeight, unit]);

  const handleAdjustWeight = (delta: number) => {
    triggerHapticFeedback('light');
    setTargetWeight(prev => {
      const next = Math.max(activeBarWeight, Math.round((prev + delta) * 100) / 100);
      persistState(unit, barId, next);
      return next;
    });
  };

  const handleUnitSwitch = (newUnit: Unit) => {
    if (newUnit === unit) return;
    triggerHapticFeedback('medium');
    let convertedTarget = targetWeight;
    if (newUnit === 'lbs' && unit === 'kg') {
      convertedTarget = Math.round(targetWeight * 2.20462);
    } else if (newUnit === 'kg' && unit === 'lbs') {
      convertedTarget = Math.round(targetWeight / 2.20462);
    }
    setUnit(newUnit);
    setTargetWeight(convertedTarget);
    persistState(newUnit, barId, convertedTarget);
  };

  const handleBarChange = (newBarId: string) => {
    triggerHapticFeedback('light');
    setBarId(newBarId);
    const bar = STANDARD_BARS.find(b => b.id === newBarId) || STANDARD_BARS[0];
    const newBarW = unit === 'kg' ? bar.weightKg : bar.weightLbs;
    if (targetWeight < newBarW) {
      setTargetWeight(newBarW);
      persistState(unit, newBarId, newBarW);
    } else {
      persistState(unit, newBarId, targetWeight);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Header & Unit Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-zinc-900/60 border border-white/10 p-5 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">Barbell Plate Calculator</h2>
            <p className="text-xs text-white/60">Biomechanical barbell loading & symmetrical plate distribution</p>
          </div>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center bg-black/40 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => handleUnitSwitch('kg')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              unit === 'kg' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            Metric (kg)
          </button>
          <button
            onClick={() => handleUnitSwitch('lbs')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              unit === 'lbs' 
                ? 'bg-indigo-600 text-white shadow-md' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            Imperial (lbs)
          </button>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Config Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Target Weight Display Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-xl">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase mb-1">
              Target Barbell Load
            </span>
            <div className="flex items-baseline gap-2 mb-3">
              <input
                type="number"
                value={targetWeight}
                min={activeBarWeight}
                step={unit === 'kg' ? 1.25 : 2.5}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || activeBarWeight;
                  setTargetWeight(val);
                  persistState(unit, barId, val);
                }}
                className="text-5xl font-black text-white bg-transparent text-center outline-none w-44 tracking-tight focus:ring-2 focus:ring-indigo-500/50 rounded-xl"
              />
              <span className="text-2xl font-bold text-white/50">{unit}</span>
            </div>

            {/* Quick Increment Buttons */}
            <div className="flex items-center gap-2 flex-wrap justify-center w-full">
              {[-10, -5, -2.5, +2.5, +5, +10].map((step) => (
                <button
                  key={step}
                  onClick={() => handleAdjustWeight(step)}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95"
                >
                  {step > 0 ? `+${step}` : step}
                </button>
              ))}
            </div>

            {/* Barbell Selector Dropdown */}
            <div className="w-full mt-5 pt-4 border-t border-white/10 flex flex-col gap-2">
              <label className="text-xs font-mono font-semibold text-white/50">
                Barbell Calibration
              </label>
              <select
                value={barId}
                onChange={(e) => handleBarChange(e.target.value)}
                className="w-full bg-black/50 border border-white/10 text-white text-xs font-bold rounded-xl px-3 py-2.5 outline-none focus:border-indigo-500 transition-colors"
              >
                {STANDARD_BARS.map(bar => (
                  <option key={bar.id} value={bar.id} className="bg-zinc-900 text-white">
                    {bar.name} ({unit === 'kg' ? `${bar.weightKg} kg` : `${bar.weightLbs} lbs`})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Metrics Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4 flex flex-col">
              <span className="text-[11px] font-mono text-white/50 uppercase">Per Sleeve Load</span>
              <span className="text-2xl font-black text-white mt-1">
                {result.weightPerSide} <span className="text-xs font-normal text-white/40">{unit}</span>
              </span>
              <span className="text-[10px] text-white/40 mt-0.5">Weight on each side</span>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-4 flex flex-col">
              <span className="text-[11px] font-mono text-white/50 uppercase">Total Plates</span>
              <span className="text-2xl font-black text-white mt-1">
                {result.totalPlatesCount} <span className="text-xs font-normal text-white/40">plates</span>
              </span>
              <span className="text-[10px] text-white/40 mt-0.5">
                {result.isExact ? 'Exact weight loaded' : `Remainder: ${result.remainder} ${unit}`}
              </span>
            </div>
          </div>
        </div>

        {/* Right Visual Barbell Display & Plate Checklist */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Interactive Barbell Graphic Card */}
          <div className="bg-zinc-900/80 border border-white/10 rounded-3xl p-6 flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-indigo-400" />
                Barbell Sleeve Loading Visualizer (One Side)
              </h3>
              <span className="text-[11px] font-mono text-white/50">
                Inside &rarr; Collar &rarr; Outside
              </span>
            </div>

            {/* SVG / Canvas Barbell Sleeve Rendering */}
            <div className="w-full h-44 bg-zinc-950/80 rounded-2xl border border-white/10 flex items-center justify-start px-6 relative overflow-x-auto overflow-y-hidden shadow-inner">
              {/* Central Shaft */}
              <div className="w-16 h-4 bg-gradient-to-b from-zinc-400 via-zinc-200 to-zinc-500 rounded-l shadow shrink-0" />
              
              {/* Inner Collar Ring */}
              <div className="w-5 h-16 bg-gradient-to-r from-zinc-400 to-zinc-600 border-r border-zinc-700 rounded-sm shrink-0 shadow-md" />

              {/* Sleeve Loaded Plates Container */}
              <div className="flex items-center gap-1.5 h-full relative z-10 shrink-0">
                {result.platesPerSide.length === 0 ? (
                  <div className="text-xs font-mono text-white/40 italic pl-4">
                    Empty Barbell Sleeve ({activeBarWeight} {unit})
                  </div>
                ) : (
                  result.platesPerSide.map((plateGroup) => (
                    Array.from({ length: plateGroup.countPerSide }).map((_, idx) => (
                      <div
                        key={`${plateGroup.weight}_${idx}`}
                        className="relative rounded-md flex flex-col items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-105 border border-black/30 cursor-pointer"
                        style={{
                          backgroundColor: plateGroup.color,
                          width: `${plateGroup.widthPx}px`,
                          height: `${Math.max(48, (plateGroup.heightPercent / 100) * 140)}px`,
                          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(0,0,0,0.4)`
                        }}
                        title={`${plateGroup.weight} ${unit}`}
                      >
                        {/* Plate Inner Ring Rim */}
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900/60 my-auto" />
                        <span 
                          className="text-[9px] font-black tracking-tighter leading-none select-none pb-1"
                          style={{ color: plateGroup.textColor }}
                        >
                          {plateGroup.weight}
                        </span>
                      </div>
                    ))
                  ))
                )}

                {/* Outer Sleeve Extension & End Cap */}
                <div className="w-20 h-6 bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 rounded-r shadow-md shrink-0 flex items-center justify-end pr-1">
                  <div className="w-2 h-5 bg-zinc-700 rounded-sm" />
                </div>
              </div>
            </div>

            {/* Plate Loading Sequence List */}
            <div className="mt-5">
              <h4 className="text-xs font-mono font-bold text-white/60 uppercase mb-2">
                Plates to Load (Per Side)
              </h4>
              
              {result.platesPerSide.length === 0 ? (
                <div className="p-4 rounded-xl bg-white/5 text-center text-xs text-white/40">
                  Target is equal to or lower than empty bar weight. No plates required.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {result.platesPerSide.map((plate) => (
                    <div 
                      key={plate.weight}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3.5 h-7 rounded shadow"
                          style={{ backgroundColor: plate.color }}
                        />
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-white leading-none">
                            {plate.weight} {unit}
                          </span>
                          <span className="text-[10px] text-white/40 mt-0.5">Plate</span>
                        </div>
                      </div>
                      <div className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-mono font-black text-white">
                        &times; {plate.countPerSide}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PlateCalculator;
