import fs from 'fs';
['src/App.tsx', 'src/hooks/useExerciseState.ts'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/payload: ex.id/g, 'payload: ex.id,\n                    tier: ex.difficulty.toLowerCase(),\n                    score: ex.scientificEffectivenessScore');
  fs.writeFileSync(file, content);
});
