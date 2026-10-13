import fs from 'fs';

let content = fs.readFileSync('src/components/ExerciseCatalog.tsx', 'utf8');

// Import Play and storage
if (!content.includes("Play,")) {
    content = content.replace("Search, Dumbbell", "Search, Dumbbell, Play");
}
if (!content.includes("import { storage }")) {
    content = content.replace("import { VirtuosoGrid }", "import { storage } from '../services/storage';\nimport { VirtuosoGrid }");
}

const exerciseRowHeader = `const ExerciseRow = memo(({ ex }: { ex: ExerciseEntity }) => {`;
const newExerciseRowHeader = `const ExerciseRow = memo(({ ex, onExecute }: { ex: ExerciseEntity, onExecute: (ex: ExerciseEntity) => void }) => {`;
content = content.replace(exerciseRowHeader, newExerciseRowHeader);

const oldP = `          <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3 mt-2 whitespace-pre-wrap font-medium">
              {formattedInstructions}
          </p>`;

const newP = `          <p className="text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3 mt-2 whitespace-pre-wrap font-medium">
              {formattedInstructions}
          </p>
          <button 
              onClick={() => onExecute(ex)}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold py-2 rounded-lg border border-emerald-500/20 transition-colors"
          >
              <Play className="w-3.5 h-3.5" /> Execute & Log Session
          </button>`;

content = content.replace(oldP, newP);

// Update ExerciseCatalog to handle execution
const handleExecute = `
  const handleExecute = useCallback(async (ex: ExerciseEntity) => {
    try {
        const { state, newReward } = await storage.logExerciseExecution(ex.name, 3, "10-12");
        if (onNotify) {
            onNotify(\`Logged: \${ex.name}\`);
            if (newReward) {
               setTimeout(() => onNotify(\`🏆 Reward Unlocked: \${newReward}\`), 1500);
            }
        }
    } catch(err) {
        console.error("Execution failed", err);
    }
  }, [onNotify]);
`;

content = content.replace("const totalCount = filteredDb.length;", handleExecute + "\n  const totalCount = filteredDb.length;");

const oldItemContent = `itemContent={(index, ex) => <ExerciseRow ex={ex} />}`;
const newItemContent = `itemContent={(index, ex) => <ExerciseRow ex={ex} onExecute={handleExecute} />}`;
content = content.replace(oldItemContent, newItemContent);

fs.writeFileSync('src/components/ExerciseCatalog.tsx', content);
console.log("Updated ExerciseCatalog for execution");
