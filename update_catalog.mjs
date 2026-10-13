import fs from 'fs';
let content = fs.readFileSync('src/components/ExerciseCatalog.tsx', 'utf8');

content = content.replace("import { useExerciseState } from '../hooks/useExerciseState';", "import { useExerciseState } from '../hooks/useExerciseState';\nimport { useFluidInteraction } from '../hooks/useFluidInteraction';");

const oldRowStart = `const ExerciseRow = memo(({ ex, onExecute }: { ex: ExerciseEntity, onExecute: (ex: ExerciseEntity) => void }) => {`;
const newRowStart = `const ExerciseRow = memo(({ ex, onExecute }: { ex: ExerciseEntity, onExecute: (ex: ExerciseEntity) => void }) => {
  const buttonRef = useFluidInteraction<HTMLButtonElement>({
    onCriticalInteraction: () => {
      onExecute(ex);
    },
    onDeferredInteraction: () => {
      // Simulate non-critical telemetry or sync deferred via requestIdleCallback
      console.debug(\`[Telemetry Deferred] Card interaction tracked for: \${ex.name}\`);
    }
  });`;
content = content.replace(oldRowStart, newRowStart);

const oldButton = `<button 
              onClick={() => onExecute(ex)}
             className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold py-2 rounded-lg border border-emerald-500/20 transition-colors"
         >
             <Play className="w-3.5 h-3.5" /> Execute & Log Session
         </button>`;

const oldButton2 = `<button 
              onClick={() => onExecute(ex)}
             className="mt-2 w-full flex items-center justify-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold py-2 rounded-lg border border-emerald-500/20 transition-colors"
         >`;

// Because exact spacing can vary, a regex replacement is safer for the button.
const buttonRegex = /<button[\s\S]*?onClick=\{\(\) => onExecute\(ex\)\}[\s\S]*?className="([^"]+)"[\s\S]*?>/;
const newButton = `<button 
              ref={buttonRef}
             className="$1"
         >`;
content = content.replace(buttonRegex, newButton);

fs.writeFileSync('src/components/ExerciseCatalog.tsx', content);
