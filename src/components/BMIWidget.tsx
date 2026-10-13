import { useState, useEffect, useMemo } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { Calculator, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

interface BMIWidgetProps {
  weightKg?: number;
  heightCm?: number;
}

export function BMIWidget({ weightKg, heightCm }: BMIWidgetProps) {
  const [bmiData, setBmiData] = useState<{ value: number, category: string, colorClass: string } | null>(null);

  const { weight$, height$ } = useMemo(() => ({
    weight$: new BehaviorSubject<number | null>(weightKg || null),
    height$: new BehaviorSubject<number | null>(heightCm || null)
  }), []);

  useEffect(() => {
    weight$.next(weightKg || null);
  }, [weightKg, weight$]);

  useEffect(() => {
    height$.next(heightCm || null);
  }, [heightCm, height$]);

  useEffect(() => {
    const sub = combineLatest([
      weight$.pipe(distinctUntilChanged()),
      height$.pipe(distinctUntilChanged())
    ]).pipe(
      map(([w, h]) => {
        if (!w || !h) return null;
        const heightM = h / 100;
        const squareHeight = heightM * heightM;
        const bmiValue = w / squareHeight;
        
        let category = '';
        let colorClass = '';
        
        if (bmiValue < 18.5) {
          category = 'Underweight';
          colorClass = 'text-blue-500 bg-blue-500/10 border-blue-500/20';
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
          category = 'Normal / Healthy Weight';
          colorClass = 'text-green-500 bg-green-500/10 border-green-500/20';
        } else if (bmiValue >= 25.0 && bmiValue <= 29.9) {
          category = 'Overweight';
          colorClass = 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        } else if (bmiValue >= 30.0 && bmiValue <= 34.9) {
          category = 'Obese Class I';
          colorClass = 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        } else if (bmiValue >= 35.0 && bmiValue <= 39.9) {
          category = 'Obese Class II';
          colorClass = 'text-red-500 bg-red-500/10 border-red-500/20';
        } else {
          category = 'Obese Class III';
          colorClass = 'text-purple-500 bg-purple-500/10 border-purple-500/20';
        }
        
        return { value: Number(bmiValue.toFixed(1)), category, colorClass };
      })
    ).subscribe(setBmiData);

    return () => sub.unsubscribe();
  }, [weight$, height$]);

  return (
    <section className="bg-white/60 backdrop-blur-xl border border-white shadow-sm rounded-[32px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden w-full">
      {/* Glow */}<div className="absolute -bottom-24 -left-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="flex items-center gap-3 border-b border-white/50 pb-4 relative z-10">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-md">
          <Calculator className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Body Mass Index (BMI) Calculator</h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 py-2">
        <div className="flex-1 w-full bg-white/50 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center border border-white/60 shadow-sm min-h-[140px] relative overflow-hidden z-10">
           {bmiData ? (
             <>
               <span className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-2 z-10">Your Current BMI</span>
               <span className="text-5xl font-black text-zinc-800 tracking-tighter z-10">{bmiData.value.toFixed(1)}</span>
               <span className={cn("mt-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border z-10", bmiData.colorClass)}>
                 {bmiData.category}
               </span>
             </>
           ) : (
             <div className="flex flex-col items-center opacity-50 z-10">
               <AlertTriangle className="w-8 h-8 text-zinc-400 mb-2" />
               <span className="text-sm font-bold text-zinc-500">Awaiting Height & Weight Inputs</span>
             </div>
           )}
        </div>
        <div className="flex-1 w-full flex flex-col gap-2">
           <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">WHO Health Classification Scale</h3>
           {[
             { label: 'Underweight', range: '< 18.5', color: 'bg-blue-500' },
             { label: 'Normal Weight', range: '18.5 – 24.9', color: 'bg-green-500' },
             { label: 'Overweight', range: '25.0 – 29.9', color: 'bg-yellow-500' },
             { label: 'Obese I, II, III', range: '≥ 30.0', color: 'bg-red-500' }
           ].map(item => (
             <div key={item.label} className="flex items-center justify-between p-2.5 rounded-xl bg-white/50 backdrop-blur-md border border-white/60 shadow-sm relative z-10">
               <div className="flex items-center gap-2">
                 <span className={`w-2.5 h-2.5 rounded-full ${item.color}`}></span>
                 <span className="text-sm font-medium text-zinc-700">{item.label}</span>
               </div>
               <span className="text-xs font-bold text-zinc-500 font-mono">{item.range}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
