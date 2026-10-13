import fs from 'fs';

let content = fs.readFileSync('src/services/recommendationEngine.ts', 'utf8');

const replacement = `import localforage from 'localforage';
import { ExerciseEntity, getMasterExerciseDatabaseAsync } from './exerciseFactory';
import { UserProfile } from './storage';
import { dbWorkerPool } from './workerPool';

const FILTERED_DB_KEY = 'exercise_tab_filtered_v17_pure_final';

export async function buildAndStoreFilteredDatabase(profile: UserProfile): Promise<ExerciseEntity[]> {
  const masterDb = await getMasterExerciseDatabaseAsync();
  return dbWorkerPool.dispatch('FILTER_DB', { masterDb, profile });
}`;

// I will just replace everything up to the definition of getFilteredDatabaseAsync
const splitPoint = "export async function getFilteredDatabaseAsync";
const parts = content.split(splitPoint);

const newContent = replacement + "\n\n" + splitPoint + parts[1];

fs.writeFileSync('src/services/recommendationEngine.ts', newContent);

console.log("Updated recommendationEngine.ts");
