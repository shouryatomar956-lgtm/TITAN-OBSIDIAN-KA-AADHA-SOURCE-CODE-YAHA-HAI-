import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import localforage from 'localforage';
import { 
  XAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  FileDown, 
  Activity, 
  TrendingUp, 
  Target, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  FileCheck,
  Dumbbell
} from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import { cn } from '../lib/utils';
import { pdfExportEngine } from '../services/PdfExportEngine';
import { silentVolumeEngine, VolumeAuditSummary } from '../services/silentVolumeEngine';
import { continuousPhysiologyEngine, ContinuousPhysiologySnapshot } from '../services/continuousPhysiologyEngine';
import { storage } from '../services/storage';
import { AnalyticsSkeleton } from './AnalyticsSkeleton';

export { AnalyticsSkeleton };

interface AnalyticsProps {
  currentStreak: number;
  username: string;
  isLoading?: boolean;
}

export function AnalyticsDashboard({ currentStreak, username, isLoading = false }: AnalyticsProps) {
  const [internalLoading, setInternalLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [inlineNotice, setInlineNotice] = useState<string | null>(null);
  const [summary, setSummary] = useState<VolumeAuditSummary | null>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<any[]>([]);
  const [livePhysio, setLivePhysio] = useState<ContinuousPhysiologySnapshot>(() => continuousPhysiologyEngine.getSnapshot());
  const reportRef = useRef<HTMLDivElement>(null);

  const fetchRealAnalytics = async () => {
    try {
      const sum = await silentVolumeEngine.silentlyRecalculate();
      const state = await storage.getState();
      const history = (await localforage.getItem<any[]>('pulsefit_workout_history')) || [];
      const repHistory = (await localforage.getItem<any[]>('pulsefit_rep_counter_history')) || [];
      
      const combined = [
        ...(state?.workouts || []),
        ...history,
        ...repHistory.map((r: any) => ({
          name: r.exerciseName || 'Universal Rep Session',
          date: r.date || (r.timestamp ? new Date(r.timestamp).toISOString() : new Date().toISOString()),
          isCompleted: true,
          completed: true
        }))
      ];
      setSummary(sum);
      setRecentWorkouts(combined);
    } catch (e) {
      console.warn('[AnalyticsDashboard] Live scan notice:', e);
    } finally {
      setInternalLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchRealAnalytics();

    const unsubPhysio = continuousPhysiologyEngine.subscribe((snap) => {
      if (isMounted) setLivePhysio(snap);
    });

    const handleLogged = () => {
      if (isMounted) {
        fetchRealAnalytics();
      }
    };

    window.addEventListener('pulsefit_exercise_logged', handleLogged);
    window.addEventListener('pulsefit_workout_logged', handleLogged);
    window.addEventListener('pulsefit_rep_session_saved', handleLogged);
    window.addEventListener('pulsefit_telemetry_updated', handleLogged);
    return () => {
      isMounted = false;
      unsubPhysio();
      window.removeEventListener('pulsefit_exercise_logged', handleLogged);
      window.removeEventListener('pulsefit_workout_logged', handleLogged);
      window.removeEventListener('pulsefit_rep_session_saved', handleLogged);
      window.removeEventListener('pulsefit_telemetry_updated', handleLogged);
    };
  }, [username, currentStreak]);

  const today = useMemo(() => new Date(), []);

  // 100% Real-Time 7-Day Volume Progression
  const progressionData = useMemo(() => {
    const ledgerMap = new Map<string, number>();
    if (summary?.dailyLedger) {
      summary.dailyLedger.forEach(item => {
        ledgerMap.set(item.date, item.totalTonnageKg);
      });
    }
    return Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(today, 6 - i);
      const dateKey = format(d, 'yyyy-MM-dd');
      const label = format(d, 'MMM dd');
      const volume = ledgerMap.get(dateKey) || 0;
      return { date: label, volume };
    });
  }, [summary, today]);

  // 100% Real-Time Weekly Training Frequency (Mon - Sun)
  const frequencyData = useMemo(() => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const counts: Record<string, number> = { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 };

    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const currentWeekEnd = endOfWeek(today, { weekStartsOn: 1 });

    const seenDayWorkout = new Set<string>();

    recentWorkouts.forEach(w => {
      if ((w.isCompleted === true || w.completed === true) && w.date) {
        const wDate = new Date(w.date);
        if (!isNaN(wDate.getTime()) && isWithinInterval(wDate, { start: currentWeekStart, end: currentWeekEnd })) {
          const dayKey = format(wDate, 'yyyy-MM-dd');
          const dayName = format(wDate, 'EEE'); // Mon, Tue, etc.
          // Count unique session days or total sessions
          const uniqueKey = `${dayKey}_${w.id || w.name}`;
          if (!seenDayWorkout.has(uniqueKey)) {
            seenDayWorkout.add(uniqueKey);
            if (counts[dayName] !== undefined) {
              counts[dayName] += 1;
            }
          }
        }
      }
    });

    return daysOfWeek.map(name => ({
      name,
      completed: counts[name] || 0
    }));
  }, [recentWorkouts, today]);

  // 100% Real-Time Targeted Muscle Distribution
  const totalVolume = summary?.lifetimeTonnageKg || 0;
  const hasVolume = totalVolume > 0;

  const muscleDistributionData = useMemo(() => {
    if (!summary || !summary.topMusclesByVolume || summary.topMusclesByVolume.length === 0 || totalVolume === 0) {
      return [
        { name: 'Chest & Triceps', value: 0, color: '#8b5cf6' },
        { name: 'Back & Lats', value: 0, color: '#10b981' },
        { name: 'Legs & Core', value: 0, color: '#06b6d4' },
        { name: 'Shoulders & Arms', value: 0, color: '#f59e0b' },
        { name: 'Full Conditioning', value: 0, color: '#ec4899' },
      ];
    }
    const colorPalette = ['#8b5cf6', '#10b981', '#06b6d4', '#f59e0b', '#ec4899', '#3b82f6'];
    return summary.topMusclesByVolume.slice(0, 5).map((m, idx) => ({
      name: m.muscle,
      value: Math.round(m.percent),
      color: colorPalette[idx % colorPalette.length]
    }));
  }, [summary, totalVolume]);

  const formattedVolume = totalVolume >= 1000 
    ? `${(totalVolume / 1000).toFixed(1)}k` 
    : `${Math.round(totalVolume)}`;

  /**
   * Ultra-fast client-side vector PDF generation & native download trigger
   */
  const handleExportPDF = async () => {
    if (exporting) return;
    
    setExporting(true);
    setInlineNotice(null);

    try {
      const result = await pdfExportEngine.generateAndDownloadReport();

      if (!result.success) {
        if (result.reason === 'NO_WORKOUTS') {
          setInlineNotice("No workout history found. Complete your first session to unlock progress exports!");
        } else {
          setInlineNotice(result.message || "Failed to generate report. Please try again.");
        }
      } else {
        setToastMessage("Your progress saved on your device");
        setTimeout(() => setToastMessage(''), 4500);
      }
    } catch (error) {
      console.error('[AnalyticsDashboard] Export failed:', error);
      setInlineNotice("An unexpected error occurred while compiling your report.");
    } finally {
      setExporting(false);
    }
  };

  if (isLoading || internalLoading) {
    return <AnalyticsSkeleton />;
  }

  return (
    <section className="mt-2 space-y-6">
      {/* Header & Export Action Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900">Analytics & Progress</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Live health & workout progress</p>
        </div>

        {/* Updated Export Action Control: Download Progress Report (PDF) */}
        <button 
          id="btn-download-progress-report-pdf"
          type="button"
          onClick={handleExportPDF}
          disabled={exporting}
          className={cn(
            "inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shrink-0",
            exporting && "opacity-80 cursor-wait"
          )}
          title="Download Progress Report (PDF)"
        >
          {exporting ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
          ) : (
            <FileDown className="w-4 h-4 text-purple-400 shrink-0" />
          )}
          <span className="whitespace-nowrap">
            {exporting ? "Generating PDF..." : "Download Progress Report (PDF)"}
          </span>
        </button>
      </div>

      {/* Zero-Data / Error Inline Safeguard Notice */}
      <AnimatePresence>
        {inlineNotice && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -6 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -6 }}
            className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-3 shadow-xs"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-amber-950">Notice</p>
              <p className="text-amber-800 mt-0.5 leading-relaxed">{inlineNotice}</p>
            </div>
            <button
              type="button"
              onClick={() => setInlineNotice(null)}
              className="text-amber-700 hover:text-amber-900 text-xs font-bold px-2 py-1 rounded-lg hover:bg-amber-100/60"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={reportRef} className="space-y-6 bg-white text-zinc-900">
        
        {/* Main Metric & Toggles */}
        <div className="flex items-end justify-between">
            <div className="flex flex-col">
               <span className="text-sm font-bold text-zinc-400 mb-1">Total Est. Volume</span>
               <span className="text-[32px] font-bold text-zinc-900 tracking-tight leading-none flex items-baseline gap-1">
                 {formattedVolume}
                 <span className="text-sm font-normal text-zinc-400">kg</span>
               </span>
               <span className="text-[11px] text-zinc-400 mt-1">
                 {totalVolume === 0 ? '0% — No volume lifted yet' : `${summary?.activeTrainingDays || 0} active training days recorded`}
               </span>
            </div>
            <div className="flex gap-2">
                <button className="w-10 h-10 rounded-[14px] bg-zinc-900 flex items-center justify-center shadow-lg" aria-label="Trending Volume">
                    <TrendingUp className="w-5 h-5 text-white" />
                </button>
                <button className="w-10 h-10 rounded-[14px] bg-zinc-100 flex items-center justify-center transition-colors" aria-label="Activity Level">
                    <Activity className="w-5 h-5 text-zinc-400" />
                </button>
            </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center justify-between bg-zinc-50 rounded-[20px] p-4">
            <span className="text-sm font-bold text-zinc-700">From {format(subDays(today, 6), 'MMM dd')} to {format(today, 'MMM dd')}</span>
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm flex items-center justify-center text-zinc-500">
               <Target className="w-4 h-4" />
            </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-700">7-Day Real-Time Volume Trend</h3>
              {totalVolume === 0 && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                  0% Recorded
                </span>
              )}
            </div>
            <div className="h-48 w-full -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressionData}>
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#ffffff', fontWeight: 'bold' }}
                    itemStyle={{ color: '#8b5cf6' }}
                    formatter={(val) => [`${new Intl.NumberFormat('en-US').format(Number(val) || 0)} kg`, 'Volume']}
                  />
                  <Line type="monotone" dataKey="volume" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff', stroke: '#8b5cf6'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-900">Training Frequency</h3>
              <span className="text-xs font-mono text-zinc-400">Current Week</span>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={frequencyData}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#ffffff', fontWeight: 'bold' }}
                    cursor={{fill: '#f3f4f6'}}
                    formatter={(val) => [`${val} workout${Number(val) === 1 ? '' : 's'}`, 'Completed']}
                  />
                  <Bar dataKey="completed" fill="#06b6d4" radius={[6, 6, 6, 6]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-zinc-900">Targeted Muscle Distribution</h3>
              <span className="text-xs font-mono text-zinc-400">
                {hasVolume ? 'Real-Time Allocation' : '0% — Awaiting First Workout'}
              </span>
            </div>
            <p className="text-xs text-zinc-500 mb-3">Functional balance & volume allocation</p>
            
            <div className="h-44 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {hasVolume ? (
                    <Pie
                      data={muscleDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {muscleDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  ) : (
                    <Pie
                      data={[{ name: 'No Activity', value: 100 }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      dataKey="value"
                    >
                      <Cell fill="#f4f4f5" stroke="#e4e4e7" strokeWidth={1} />
                    </Pie>
                  )}
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '12px', color: '#ffffff', fontWeight: 'bold' }}
                    formatter={(val) => [hasVolume ? `${val}%` : '0%', 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>

              {!hasVolume && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-sm font-black text-zinc-400">0%</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-mono">No Logs</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2">
              {muscleDistributionData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-zinc-600">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.name} ({hasVolume ? item.value : 0}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Completion Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 bg-zinc-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-zinc-700/60 font-bold text-xs sm:text-sm whitespace-nowrap flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-4 h-4" />
            </div>
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
