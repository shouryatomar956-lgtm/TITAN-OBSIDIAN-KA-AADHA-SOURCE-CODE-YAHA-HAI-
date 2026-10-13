import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

content = content.replace(
  "const { db, searchIndex, isLoading } = useExerciseState();",
  "const { db, isLoading } = useExerciseState();"
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
