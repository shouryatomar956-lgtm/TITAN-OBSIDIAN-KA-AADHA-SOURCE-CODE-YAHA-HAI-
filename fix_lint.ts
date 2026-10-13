import { writeFileSync, readFileSync } from 'fs';

// 1. fix Dashboard.tsx
let dash = readFileSync('src/components/Dashboard.tsx', 'utf8');
dash = dash.replace(/, generateMasterExerciseDatabase/g, '');
dash = dash.replace(/generateMasterExerciseDatabase,/g, '');
writeFileSync('src/components/Dashboard.tsx', dash);

// 2. fix exerciseFactory.ts
let factory = readFileSync('src/services/exerciseFactory.ts', 'utf8');
factory = factory.replace("const CURATED_DB: Omit<ExerciseEntity, 'id'>[] =", "const CURATED_DB: Omit<ExerciseEntity, 'id'>[] = <Omit<ExerciseEntity, 'id'>[]>");
writeFileSync('src/services/exerciseFactory.ts', factory);
console.log("Lint fixes applied.");
