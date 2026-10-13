import { writeFileSync } from 'fs';

const content = `import { useState, useMemo } from 'react';
import { getMasterExerciseDatabase } from '../services/exerciseFactory';
import { Search, Dumbbell, Home as HomeIcon, Activity, Target, Crosshair } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export function ExercisesTab({ onNotify }: { onNotify?: (msg: string) => void }) {
  const db = useMemo(() => getMasterExerciseDatabase(), []);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<string | null>(null);

  const muscleGroups = useMemo(() => Array.from(new Set(db.map(ex => ex.muscleGroup))).sort(), [db]);

  const filteredDb = useMemo(() => {
    return db.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || ex.instructions.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGroup = selectedGroup ? ex.muscleGroup === selectedGroup : true;
      const matchesEquip = selectedEquip ? ex.equipmentNeeded === selectedEquip : true;
      return matchesSearch && matchesGroup && matchesEquip;
    });
  }, [db, searchQuery, selectedGroup, selectedEquip]);

  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'Beginner': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Advanced': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Elite': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-zinc-400 bg-zinc-800 border-zinc-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 mt-4">
      <div className="flex flex-col gap-4">
        {/* Header Stats */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-col gap-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><Target className="w-5 h-5 text-emerald-400"/> Curated Master Database</h2>
            <p className="text-xs text-zinc-400 font-medium">{db.length} Scientifically Profiled Movements (70% Home / 30% Gym)</p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                placeholder="Search exercises or mechanics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                <button
                    onClick={() => setSelectedEquip(null)}
                    className={cn("snap-start whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors", !selectedEquip ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")}
                >
                    All Equipment
                </button>
                <button
                    onClick={() => setSelectedEquip('Home')}
                    className={cn("snap-start whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5", selectedEquip === 'Home' ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")}
                >
                    <HomeIcon className="w-3.5 h-3.5"/> Home Only
                </button>
                <button
                    onClick={() => setSelectedEquip('Gym')}
                    className={cn("snap-start whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5", selectedEquip === 'Gym' ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")}
                >
                    <Dumbbell className="w-3.5 h-3.5"/> Gym Only
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                <button
                    onClick={() => setSelectedGroup(null)}
                    className={cn("snap-start whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors", !selectedGroup ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")}
                >
                    All Domains
                </button>
                {muscleGroups.map(mg => (
                    <button
                        key={mg}
                        onClick={() => setSelectedGroup(mg)}
                        className={cn("snap-start whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors", selectedGroup === mg ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-400" : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200")}
                    >
                        {mg}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="space-y-3 pb-8">
        <AnimatePresence mode="popLayout">
            {filteredDb.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 text-center text-zinc-500 text-sm"
                >
                    No unique entities found matching parameters.
                </motion.div>
            ) : (
                filteredDb.map((ex) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={ex.id}
                    className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-4 space-y-3 relative overflow-hidden group hover:border-zinc-700/80 transition-colors"
                  >
                    <div className="flex justify-between items-start gap-4 z-10 relative">
                      <h3 className="font-semibold text-zinc-100 leading-tight group-hover:text-emerald-400 transition-colors">{ex.name}</h3>
                      <span className={cn("text-[10px] font-bold px-2 py-0.5 border rounded whitespace-nowrap", getDifficultyColor(ex.difficulty))}>
                        {ex.difficulty}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider z-10 relative">
                      <span className="text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-1 rounded flex items-center gap-1.5"><Crosshair className="w-3 h-3" /> {ex.muscleGroup}</span>
                      <span className="text-zinc-400 bg-zinc-800/50 border border-zinc-700/50 px-2 py-1 rounded flex items-center gap-1.5">
                          {ex.equipmentNeeded === 'Home' ? <HomeIcon className="w-3 h-3"/> : <Dumbbell className="w-3 h-3"/>}
                          {ex.equipmentNeeded}
                      </span>
                      <span className="text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded flex items-center gap-1.5">
                          <Activity className="w-3 h-3" /> {ex.scientificEffectivenessScore.toFixed(1)} EFF
                      </span>
                    </div>

                    <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800/50 pt-3 mt-1 z-10 relative">
                      {ex.instructions}
                    </p>
                  </motion.div>
                ))
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
`;

writeFileSync('src/components/ExercisesTab.tsx', content);
console.log("Tab overwritten.");
