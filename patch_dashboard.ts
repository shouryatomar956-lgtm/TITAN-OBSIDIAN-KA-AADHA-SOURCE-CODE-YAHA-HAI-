import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const regex = /<div className="flex gap-2 bg-zinc-900\/50 p-1\.5 rounded-2xl border border-zinc-800">[\s\S]*?<\/div>\n\s*<\/section>/;

const replacement = `<div className="flex gap-2">
            {[
              { id: 'Energetic', icon: Zap, activeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', hover: 'hover:text-emerald-300' },
              { id: 'Tired', icon: BatteryLow, activeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20', hover: 'hover:text-amber-300' },
              { id: 'Stressed', icon: BrainCircuit, activeClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20', hover: 'hover:text-indigo-300' }
            ].map((m) => (
              <div key={m.id} className="flex-1 flex flex-col gap-1 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 transition-all duration-300">
                <button 
                  onClick={() => setMood(m.id as Mood)}
                  className={cn(
                    "flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-xs font-medium transition-all border border-transparent",
                    mood === m.id ? m.activeClass : \`text-zinc-500 \${m.hover}\`
                  )}
                >
                  <m.icon className="w-5 h-5" />
                  {m.id}
                </button>
                <AnimatePresence>
                  {mood === m.id && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-1 mt-1 overflow-hidden"
                    >
                      {['Beginner', 'Intermediate', 'Advanced'].map(diff => (
                        <button
                          key={diff}
                          onClick={() => setMoodDifficulty(prev => ({ ...prev, [m.id]: diff }))}
                          className={cn(
                            "py-2 px-1 rounded-lg text-[10px] font-bold uppercase transition-colors text-center border border-transparent",
                            moodDifficulty[m.id as Mood] === diff 
                              ? "bg-zinc-800 text-white border-zinc-700" 
                              : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
                          )}
                        >
                          {diff}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>`;

content = content.replace(regex, replacement);

// Add moodDifficulty state
content = content.replace(
  "const [mood, setMood] = useState<Mood>('Energetic');",
  "const [mood, setMood] = useState<Mood>('Energetic');\n  const [moodDifficulty, setMoodDifficulty] = useState<Record<Mood, string>>({\n    Energetic: 'Intermediate',\n    Tired: 'Beginner',\n    Stressed: 'Intermediate'\n  });"
);

// Update recommendedExercises useMemo
content = content.replace(
  "return getRecommendedExercises(profile, mood, 5);",
  "return getRecommendedExercises(profile, mood, 5, moodDifficulty[mood]);"
);
content = content.replace(
  "}, [profile, mood]);",
  "}, [profile, mood, moodDifficulty]);"
);


fs.writeFileSync('src/components/Dashboard.tsx', content);
