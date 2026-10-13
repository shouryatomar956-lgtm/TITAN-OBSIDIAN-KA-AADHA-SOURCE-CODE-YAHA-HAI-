const fs = require('fs');

const path = 'src/components/Dashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

const returnIdx = content.indexOf('  return (\n');
if (returnIdx === -1) {
    console.error("Could not find return statement in Dashboard.tsx");
    process.exit(1);
}

const beforeReturn = content.substring(0, returnIdx);
const newReturn = `  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-zinc-900 font-sans selection:bg-purple-200 flex flex-col">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md pt-safe px-4 pb-2">
        <div className="w-full flex items-center justify-between h-14">
          <div className="flex-1 max-w-lg">
             <GlobalSearch onNavigate={(route, payload) => {
                 if (route === 'exercises') {
                    startTransition(() => setActiveTab('exercises'));
                    window.dispatchEvent(new CustomEvent('search_select_exercise', { detail: payload }));
                 } else if (route === 'overview') {
                    startTransition(() => setActiveTab('overview'));
                 }
              }} />
          </div>
          <div className="flex gap-2 p-1 bg-zinc-100 rounded-xl ml-2 shrink-0">
             <button 
                onClick={() => setActiveTab('overview')}
                className={cn("px-3 py-1.5 rounded-lg text-sm font-bold transition-colors", activeTab === 'overview' ? "bg-white text-black shadow-sm" : "text-zinc-400")}
             >
                <LayoutDashboard className="w-4 h-4" />
             </button>
             <button 
                onClick={() => setActiveTab('exercises')}
                className={cn("px-3 py-1.5 rounded-lg text-sm font-bold transition-colors", activeTab === 'exercises' ? "bg-white text-black shadow-sm" : "text-zinc-400")}
             >
                <Database className="w-4 h-4" />
             </button>
          </div>
        </div>
      </header>

      <main className="w-full flex-1 overflow-y-auto flex flex-col pb-safe">
        {activeTab === 'overview' && (
          <div className="w-full flex flex-col px-4 sm:px-6 md:px-8 pb-8 space-y-6">
            
            {/* The Big Gradient Card */}
            <div className="w-full mt-2 h-[220px] rounded-[32px] bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] p-8 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(139,92,246,0.5)] text-white relative overflow-hidden">
                <div className="flex justify-between items-start z-10">
                   <div className="flex flex-col">
                      <span className="text-sm font-medium opacity-90">{profile?.username || 'Athlete'}</span>
                      <span className="text-[32px] font-bold mt-1 tracking-tight flex items-baseline gap-2">
                        {state?.currentStreak || 0} 
                        <span className="text-xl font-normal opacity-90">Day Streak</span>
                      </span>
                   </div>
                   <span className="text-xl font-bold italic tracking-wider opacity-95">PRO</span>
                </div>
                <div className="flex items-center justify-between z-10 opacity-90 mt-4">
                   <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                   </div>
                   <span className="font-semibold tracking-[0.1em] uppercase text-sm">
                      {profile?.workoutLocation === 'Home' ? 'HOME WORKOUTS' : 'GYM WORKOUTS'}
                   </span>
                </div>
            </div>

            {/* Expenses / Workouts Summary Block */}
            <div className="w-full bg-zinc-50 rounded-[32px] p-6 flex items-center justify-between shadow-sm">
                <div className="flex flex-col">
                    <span className="text-zinc-500 font-semibold mb-1 text-sm">{format(new Date(), 'MMMM')}</span>
                    <span className="text-2xl font-bold text-zinc-900 tracking-tight flex items-baseline gap-1">
                      {recommendedExercises.length}
                      <span className="text-sm text-zinc-400 font-medium ml-1">workouts</span>
                    </span>
                </div>
                <button 
                  onClick={handleCompleteSession}
                  className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3.5 rounded-[20px] font-bold text-sm transition-colors flex items-center gap-2 shadow-lg"
                >
                   <CheckCircle2 className="w-4 h-4" />
                   Complete
                </button>
            </div>

            {smartSuggestion && (
               <div className="w-full bg-purple-50 rounded-[24px] p-5 flex items-center justify-between border border-purple-100">
                  <div className="flex flex-col mr-4">
                     <span className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-1 flex items-center gap-1"><BrainCircuit className="w-3.5 h-3.5" /> Suggestion</span>
                     <span className="text-zinc-900 font-bold text-sm">{smartSuggestion.name}</span>
                  </div>
                  <button 
                     onClick={() => {
                        startTransition(() => setActiveTab('exercises'));
                        window.dispatchEvent(new CustomEvent('search_select_exercise', { detail: smartSuggestion.id }));
                     }}
                     className="bg-purple-600 hover:bg-purple-500 text-white rounded-[16px] px-4 py-2 font-bold text-sm shrink-0 shadow-sm"
                  >
                     Start
                  </button>
               </div>
            )}

            <div className="space-y-6">
                <section>
                    <div className="flex items-center justify-between mb-3">
                       <h2 className="text-base font-bold text-zinc-900">Today's Recommendations</h2>
                    </div>
                    <div className="flex flex-col gap-2">
                        <AnimatePresence mode="popLayout">
                          {state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? (
                            <motion.div
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="w-full text-center group relative overflow-hidden rounded-[24px] p-8 transition-all duration-300 bg-rose-50 border border-rose-100 flex flex-col gap-3 items-center"
                            >
                              <Crosshair className="w-8 h-8 text-rose-500" />
                              <h3 className="font-bold text-rose-900 text-lg">Recovery Mode Active</h3>
                              <p className="text-sm text-rose-600/70 font-medium">You've marked today as an injury day. Rest up, hydrate, and focus on recovery.</p>
                            </motion.div>
                          ) : recommendedExercises.map((workout, index) => (
                              <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                key={workout.id}
                              >
                                <div className="flex items-center justify-between w-full py-2 px-1">
                                    <div className="flex items-center gap-4">
                                        <div className="w-[52px] h-[52px] rounded-[18px] bg-zinc-100 flex items-center justify-center shrink-0">
                                            <Dumbbell className="w-6 h-6 text-zinc-800" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[15px] text-zinc-900">{workout.name}</span>
                                            <span className="font-medium text-[13px] text-zinc-400">{workout.muscleGroup} &bull; {workout.equipmentNeeded}</span>
                                        </div>
                                    </div>
                                    <span className="font-bold text-[15px] text-zinc-900 ml-4 shrink-0">{workout.scientificEffectivenessScore}</span>
                                </div>
                              </motion.div>
                          ))}
                        </AnimatePresence>
                    </div>
                </section>

                <section>
                    <h2 className="text-base font-bold text-zinc-900 mb-3">Condition & Settings</h2>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button 
                            onClick={() => handleToggleInjury(format(new Date(), 'yyyy-MM-dd'))}
                            className={cn("p-4 rounded-[24px] text-left font-bold transition-all", state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? "bg-rose-500 text-white shadow-lg" : "bg-zinc-50 text-zinc-900")}
                        >
                            <Crosshair className="w-5 h-5 mb-2" />
                            Injured
                        </button>
                        <button 
                            onClick={() => handleToggleShield(format(new Date(), 'yyyy-MM-dd'))}
                            className={cn("p-4 rounded-[24px] text-left font-bold transition-all", state?.protectedRestDates?.includes(format(new Date(), 'yyyy-MM-dd')) ? "bg-indigo-500 text-white shadow-lg" : "bg-zinc-50 text-zinc-900")}
                        >
                            <Shield className="w-5 h-5 mb-2" />
                            Shield Today
                        </button>
                    </div>

                    <div className="bg-zinc-50 rounded-[24px] p-4 flex flex-col gap-3">
                        <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Physiological State</h3>
                        <div className="flex gap-2">
                            {[
                              { id: 'Energetic', icon: Zap, activeClass: 'bg-emerald-500 text-white shadow-md', hover: 'hover:bg-zinc-200' },
                              { id: 'Tired', icon: BatteryLow, activeClass: 'bg-amber-500 text-white shadow-md', hover: 'hover:bg-zinc-200' },
                              { id: 'Stressed', icon: BrainCircuit, activeClass: 'bg-indigo-500 text-white shadow-md', hover: 'hover:bg-zinc-200' }
                            ].map((m) => (
                                <button
                                   key={m.id}
                                   onClick={() => setMood(m.id as Mood)}
                                   className={cn("flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-2xl text-[11px] font-bold transition-all", mood === m.id ? m.activeClass : \`bg-white text-zinc-500 shadow-sm \${m.hover}\`)}
                                >
                                   <m.icon className="w-5 h-5" />
                                   {m.id}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
                
                <section>
                    <BiometricSettings />
                </section>

                <AnalyticsDashboard currentStreak={state?.currentStreak || 0} username={profile?.username || 'Athlete'} />
            </div>

          </div>
        )}
        
        {activeTab === 'exercises' && (
          <div className="flex-1 w-full h-full bg-white text-zinc-900">
             <ExerciseCatalog onNotify={(msg) => {
                setToastMessage(msg);
                setTimeout(() => setToastMessage(''), 4000);
             }} />
          </div>
        )}
      </main>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-6 left-1/2 z-50 px-6 py-4 bg-zinc-900 text-white rounded-[20px] shadow-2xl font-bold text-sm whitespace-nowrap flex items-center gap-3"
          >
            <Trophy className="w-5 h-5 text-purple-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
`;

fs.writeFileSync(path, beforeReturn + newReturn);
console.log('Dashboard.tsx updated!');
