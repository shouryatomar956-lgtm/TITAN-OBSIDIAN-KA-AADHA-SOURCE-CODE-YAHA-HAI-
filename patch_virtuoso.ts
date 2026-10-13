import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

// Replace import
content = content.replace(
  "import { useVirtualizer } from '@tanstack/react-virtual';",
  "import { Virtuoso } from 'react-virtuoso';"
);

// Remove useVirtualizer hook
const hookRegex = /  const parentRef = useRef<HTMLDivElement>\(null\);\n\n  const rowVirtualizer = useVirtualizer\(\{[\s\S]*?overscan: 5,\n  \}\);\n/m;
content = content.replace(hookRegex, "");

// Replace the rendering block
const renderBlockRegex = /      <div \n        ref=\{parentRef\} \n        className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent pb-8"\n      >\n        \{isLoading \? \([\s\S]*?\}\)\n            <\/div>\n        \)\}\n      <\/div>/m;

const virtuosoReplacement = `      <div className="flex-1 overflow-hidden min-h-0 relative">
        {isLoading ? (
            <div className="py-12 text-center text-zinc-500 text-sm animate-pulse">
                Loading encrypted inventory parameters...
            </div>
        ) : filteredDb.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-sm">
                No unique entities found matching parameters.
            </div>
        ) : (
            <Virtuoso
              style={{ height: '100%', width: '100%' }}
              data={filteredDb}
              overscan={200}
              className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-2"
              itemContent={(index, ex) => (
                <div className="pb-3">
                    <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-4 space-y-3 group hover:border-zinc-700/80 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-semibold text-zinc-100 leading-tight group-hover:text-emerald-400 transition-colors">{ex.name}</h3>
                        <span className={cn("text-[10px] font-bold px-2 py-0.5 border rounded whitespace-nowrap", getDifficultyColor(ex.difficulty))}>
                          {ex.difficulty}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <span className="text-indigo-400 bg-indigo-400/10 border border-indigo-400/20 px-2 py-1 rounded flex items-center gap-1.5"><Crosshair className="w-3 h-3" /> {ex.muscleGroup}</span>
                        <span className="text-zinc-400 bg-zinc-800/50 border border-zinc-700/50 px-2 py-1 rounded flex items-center gap-1.5">
                            {ex.equipmentNeeded === 'Home' ? <HomeIcon className="w-3 h-3"/> : <Dumbbell className="w-3 h-3"/>}
                            {ex.equipmentNeeded}
                        </span>
                        <span className="text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded flex items-center gap-1.5">
                            <Activity className="w-3 h-3" /> {ex.scientificEffectivenessScore.toFixed(1)} EFF
                        </span>
                      </div>

                      <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800/50 pt-3 mt-1">
                        {ex.instructions}
                      </p>
                    </div>
                </div>
              )}
            />
        )}
      </div>`;

content = content.replace(renderBlockRegex, virtuosoReplacement);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
