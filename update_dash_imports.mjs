import fs from 'fs';
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const importTarget = "import { getRecommendedExercisesAsync } from '../services/recommendationEngine';";
const newImports = `import { getRecommendedExercisesAsync } from '../services/recommendationEngine';
import { globalWorkerFactory } from '../utils/workerFactory';
import { getMasterExerciseDatabaseAsync } from '../services/exerciseFactory';
import { Play } from 'lucide-react';
`;
content = content.replace(importTarget, newImports);

const stateTarget = "const [debugDbCount, setDebugDbCount] = useState<number | null>(null);";
const newState = `const [debugDbCount, setDebugDbCount] = useState<number | null>(null);
  const [smartSuggestion, setSmartSuggestion] = useState<ExerciseEntity | null>(null);`;
content = content.replace(stateTarget, newState);

const effectTarget = `      const data = await storage.getState();
      const p = await storage.getUserProfile();
      setProfile(p);
      setState(data);
      setLoading(false);
    }
    init();`;
const newEffect = `      const data = await storage.getState();
      const p = await storage.getUserProfile();
      setProfile(p);
      setState(data);
      setLoading(false);
      
      // Async offload Smart Suggestion to worker
      getMasterExerciseDatabaseAsync().then(masterDb => {
        globalWorkerFactory.execute('prediction', 'PREDICT_NEXT_EXERCISE', { history: data.history || [], masterDb }).then(res => {
          setSmartSuggestion(res);
        }).catch(console.error);
      });
    }
    init();`;
content = content.replace(effectTarget, newEffect);

const uiTarget = `{/* Weekly Progress Overview */}
        <section>`;
const newUI = `{/* Smart Suggestion */}
        {smartSuggestion && (
        <section className="mb-2">
            <div className="bg-emerald-900/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5"><BrainCircuit className="w-4 h-4" /> Smart Suggestion</h3>
                <p className="text-zinc-200 font-medium text-sm">Based on your recent activity, we recommend <strong>{smartSuggestion.name}</strong> for your next session.</p>
              </div>
              <button 
                onClick={() => {
                   startTransition(() => setActiveTab('exercises'));
                   window.dispatchEvent(new CustomEvent('search_select_exercise', { detail: smartSuggestion.id }));
                }}
                className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                <Play className="w-4 h-4" /> Start Exercise
              </button>
            </div>
        </section>
        )}
        
        {/* Weekly Progress Overview */}
        <section>`;
content = content.replace(uiTarget, newUI);

fs.writeFileSync('src/components/Dashboard.tsx', content);
