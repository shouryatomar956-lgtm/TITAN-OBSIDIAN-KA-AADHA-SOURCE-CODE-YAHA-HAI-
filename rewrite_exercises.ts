import fs from 'fs';

const content = `import { useState, useMemo, useEffect, memo, useDeferredValue, useCallback } from 'react';
import { useExerciseState } from '../hooks/useExerciseState';
import { Search, Dumbbell, Home as HomeIcon, Activity, Target, Crosshair, FilterX, Filter, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { VirtuosoGrid } from 'react-virtuoso';
import { ExerciseEntity } from '../services/exerciseFactory';

// High-performance memoized row component
const ExerciseRow = memo(({ ex }: { ex: ExerciseEntity }) => {
  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Advanced': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Elite': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  // Splitting instructions with memoization to avoid parsing on every render
  const formattedInstructions = useMemo(() => {
    return ex.instructions.split(/\\*\\*(.*?)\\*\\*/g).map((part, i) => 
      i % 2 === 1 ? <strong key={i} className="text-zinc-300 font-semibold">{part}</strong> : part
    );
  }, [ex.instructions]);

  return (
    <div className="h-full p-1">
        <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-xl p-4 space-y-3 h-full flex flex-col group hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm hover:shadow-emerald-900/10 will-change-transform">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-bold text-zinc-100 leading-tight group-hover:text-emerald-400 transition-colors break-words whitespace-normal break-all sm:break-normal text-base tracking-tight">{ex.name}</h3>
            <span className={cn("text-[10px] font-bold px-2 py-0.5 border rounded-full whitespace-nowrap shadow-sm", getDifficultyColor(ex.difficulty))}>
              {ex.difficulty}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-md flex items-center gap-1.5"><Crosshair className="w-3 h-3" /> {ex.muscleGroup}</span>
            <span className="text-zinc-300 bg-zinc-800/80 border border-zinc-700/80 px-2 py-1 rounded-md flex items-center gap-1.5">
                {ex.equipmentNeeded === 'Home' ? <HomeIcon className="w-3 h-3 text-emerald-400"/> : <Dumbbell className="w-3 h-3 text-amber-400"/>}
                {ex.equipmentNeeded}
            </span>
            <span className="text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md flex items-center gap-1.5">
                <Activity className="w-3 h-3" /> {ex.scientificEffectivenessScore.toFixed(1)} EFF
            </span>
          </div>
          
          <div className="flex-1"></div>
          <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3 mt-2 whitespace-pre-wrap font-medium">
              {formattedInstructions}
          </p>
        </div>
    </div>
  );
});
ExerciseRow.displayName = 'ExerciseRow';

const workerInstance = new Worker(new URL('../workers/database.worker.ts', import.meta.url), { type: 'module' });

export function ExerciseCatalog({ onNotify }: { onNotify?: (msg: string) => void }) {
  const { db, isLoading } = useExerciseState();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedEquips, setSelectedEquips] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [filteredDb, setFilteredDb] = useState<ExerciseEntity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const deferredSearchQuery = useDeferredValue(searchQuery);
  
  const muscleGroups = useMemo(() => {
     if (!db) return [];
     return Array.from(new Set(db.map(ex => ex.muscleGroup))).sort();
  }, [db]);

  useEffect(() => {
    if (isLoading || !db || db.length === 0) {
      setFilteredDb([]);
      return;
    }
    
    setIsSearching(true);
    
    const handler = (e: MessageEvent) => {
      const { type, payload } = e.data;
      if (type === 'SEARCH_DONE') {
        setFilteredDb(payload);
        setIsSearching(false);
      }
    };
    
    workerInstance.addEventListener('message', handler);
    workerInstance.postMessage({
      type: 'SEARCH_DB',
      payload: { db, query: deferredSearchQuery, selectedEquips, selectedGroups, selectedDifficulties }
    });
    
    return () => {
      workerInstance.removeEventListener('message', handler);
    };
  }, [db, deferredSearchQuery, selectedGroups, selectedEquips, selectedDifficulties, isLoading]);

  const clearFilters = useCallback(() => {
      setSearchQuery('');
      setSelectedGroups([]);
      setSelectedEquips([]);
      setSelectedDifficulties([]);
  }, []);

  const totalCount = filteredDb.length;
  const isFiltered = searchQuery !== '' || selectedGroups.length > 0 || selectedEquips.length > 0 || selectedDifficulties.length > 0;

  return (
    <div className="animate-in fade-in duration-500 flex flex-col flex-1 w-full relative">
      <div className="flex flex-col shrink-0">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-b border-zinc-800/80 p-2 flex flex-col gap-1 shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                    <Target className="w-5 h-5 text-emerald-400"/> 
                    Exercise Catalog
                </h2>
                {isFiltered && (
                    <button onClick={clearFilters} className="text-xs font-bold text-zinc-400 hover:text-zinc-200 flex items-center gap-1 bg-zinc-800/50 px-2 py-1 rounded-md transition-colors">
                        <FilterX className="w-3 h-3" /> Clear
                    </button>
                )}
            </div>
            <p className="text-sm text-zinc-400 font-medium">
                {isLoading ? 'Mapping encrypted parameters...' :
                  isSearching ? 'Applying dimensional filters...' :
                  \`\${totalCount} Scientifically Profiled Movements\`}
            </p>
        </div>
        
        <div className="p-3 border-b border-zinc-800/50">
            <div className="flex gap-2">
              <div className="relative group flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  placeholder="Search mechanics, variations, or protocols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm font-medium text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-sm"
                />
              </div>
              <button 
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                className={cn("px-4 py-3 rounded-xl border flex items-center justify-center gap-2 font-bold text-sm transition-colors", isDrawerOpen || isFiltered ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")}
              >
                <Filter className="w-4 h-4" /> Filters {isFiltered && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>}
              </button>
            </div>
            
            {isDrawerOpen && (
              <div className="mt-3 bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 space-y-5 animate-in slide-in-from-top-2 fade-in duration-200 shadow-xl">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2"><Filter className="w-4 h-4 text-emerald-400"/> Filter Matrix</h3>
                  <button onClick={() => setIsDrawerOpen(false)} className="text-zinc-500 hover:text-zinc-300 p-1"><X className="w-4 h-4"/></button>
                </div>
                
                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2"><Crosshair className="w-3.5 h-3.5"/> Performance Domains</span>
                  <div className="flex flex-wrap gap-2">
                    {muscleGroups.map(mg => {
                      const active = selectedGroups.includes(mg);
                      return (
                        <button
                          key={mg}
                          onClick={() => setSelectedGroups(prev => active ? prev.filter(g => g !== mg) : [...prev, mg])}
                          className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200", active ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.1)]" : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
                        >
                          {mg}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2"><Activity className="w-3.5 h-3.5"/> Difficulty Tiers</span>
                  <div className="flex flex-wrap gap-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'Elite'].map(tier => {
                      const active = selectedDifficulties.includes(tier);
                      const getTierColor = (t) => {
                        switch(t) {
                          case 'Beginner': return "emerald";
                          case 'Intermediate': return "blue";
                          case 'Advanced': return "amber";
                          case 'Elite': return "rose";
                          default: return "zinc";
                        }
                      };
                      const color = getTierColor(tier);
                      
                      let baseClass = "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800";
                      if (active) {
                         if (color === 'emerald') baseClass = "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]";
                         if (color === 'blue') baseClass = "bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.1)]";
                         if (color === 'amber') baseClass = "bg-amber-500/10 border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.1)]";
                         if (color === 'rose') baseClass = "bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.1)]";
                      }

                      return (
                        <button
                          key={tier}
                          onClick={() => setSelectedDifficulties(prev => active ? prev.filter(d => d !== tier) : [...prev, tier])}
                          className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200", baseClass)}
                        >
                          {tier}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2"><Target className="w-3.5 h-3.5"/> Equipment Constraints</span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'Home', label: 'Home Only', icon: HomeIcon },
                      { id: 'Gym', label: 'Gym Only', icon: Dumbbell }
                    ].map(eq => {
                      const active = selectedEquips.includes(eq.id);
                      return (
                        <button
                          key={eq.id}
                          onClick={() => setSelectedEquips(prev => active ? prev.filter(e => e !== eq.id) : [...prev, eq.id])}
                          className={cn("px-3 py-1.5 rounded-lg text-xs font-bold border transition-all duration-200 flex items-center gap-1.5", active ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]" : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800")}
                        >
                          <eq.icon className="w-3.5 h-3.5"/> {eq.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                
                {isFiltered && (
                  <div className="pt-2 border-t border-zinc-800/80 flex justify-end">
                    <button onClick={clearFilters} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Clear All Filters</button>
                  </div>
                )}
              </div>
            )}
        </div>
      </div>

      <div className="flex-1 min-h-0 relative">
        {(isLoading) ? (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-sm animate-pulse font-medium">
                Loading highly classified parameters...
            </div>
        ) : (!isSearching && filteredDb.length === 0) ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 text-sm gap-2">
                <FilterX className="w-8 h-8 text-zinc-700" />
                <p>No unique entities found matching parameters.</p>
                <button onClick={clearFilters} className="text-emerald-400 font-bold hover:underline mt-2">Clear Filters</button>
            </div>
        ) : (
            <VirtuosoGrid
              useWindowScroll={false}
              data={filteredDb}
              overscan={400}
              computeItemKey={(index, item) => item.id}
              listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 pb-4 px-2 pt-2"
              className="h-full w-full scrollbar-thin scrollbar-thumb-zinc-700/50 scrollbar-track-transparent pr-2"
              itemContent={(index, ex) => <ExerciseRow ex={ex} />}
            />
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/components/ExerciseCatalog.tsx', content);
