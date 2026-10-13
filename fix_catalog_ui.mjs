import fs from 'fs';

let content = fs.readFileSync('src/components/ExerciseCatalog.tsx', 'utf8');

// I will just rewrite the `return` block manually using standard string manipulation
const returnIndex = content.indexOf('return (');
const firstPart = content.slice(0, returnIndex);

const newReturn = `return (
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

fs.writeFileSync('src/components/ExerciseCatalog.tsx', firstPart + newReturn);
