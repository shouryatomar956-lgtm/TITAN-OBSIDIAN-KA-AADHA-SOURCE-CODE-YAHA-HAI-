const fs = require('fs');

// 1. Rewrite recommendationEngine.ts
const enginePath = 'src/services/recommendationEngine.ts';
const engineContent = `import localforage from 'localforage';
import { ExerciseEntity, getMasterExerciseDatabaseAsync } from './exerciseFactory';
import { UserProfile } from './storage';
import { dbWorkerPool } from '../utils/workerManager';

const FILTERED_DB_KEY = 'exercise_tab_filtered_v17_pure_final';

export async function buildAndStoreFilteredDatabase(profile: UserProfile): Promise<ExerciseEntity[]> {
  const masterDb = await getMasterExerciseDatabaseAsync();
  return dbWorkerPool.dispatch('FILTER_DB', { masterDb, profile });
}

export async function getFilteredDatabaseAsync(profile: UserProfile): Promise<ExerciseEntity[]> {
  try {
    const cached = await localforage.getItem<ExerciseEntity[]>(FILTERED_DB_KEY);
    if (cached && cached.length > 0) return cached;
  } catch (err) {
    console.warn("[Recommendation Engine] Cache read failed due to storage block, rebuilding fallback", err);
  }
  return buildAndStoreFilteredDatabase(profile);
}

function deterministicHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export async function getRecommendedExercisesAsync(profile: UserProfile, mood: string, count: number = 10, difficultyOverride?: string): Promise<ExerciseEntity[]> {
  const db = await getFilteredDatabaseAsync(profile);
  
  const exp = difficultyOverride ? difficultyOverride.toLowerCase() : profile.experienceLevel.toLowerCase();
  let level = 'Intermediate';
  if (exp.includes('beginner')) level = 'Beginner';
  else if (exp.includes('advanced') || exp.includes('elite')) level = 'Advanced';
  
  const moodKey = mood.toLowerCase();
  
  // We will map exactly 10 distinct, non-duplicate exercises by rigorously filtering and scoring them.
  const ranked = [...db];
  
  // Use today's date for a daily seed so the 10 exercises change daily but remain consistent within the same day
  const todayStr = new Date().toISOString().split('T')[0];

  ranked.forEach(ex => {
    let score = 0;
    
    // 1. Strict Level Matching (Crucial for the 9-category mapping)
    if (ex.difficulty === level) {
        score += 1000;
    } else if (level === 'Advanced' && ex.difficulty === 'Elite') {
        score += 800; // Elite allowed for Advanced tier
    } else if (level === 'Intermediate' && (ex.difficulty === 'Beginner' || ex.difficulty === 'Advanced')) {
        score += 200; // Fallback
    }

    // 2. Curated Logic based on exact Mood & Level mapping
    if (moodKey === 'energetic') {
        // Energetic: High intensity, compound movements, cardio, explosiveness
        if (ex.mechanics === 'Compound') score += 300;
        if (ex.muscleGroup === 'Cardio' || ex.muscleGroup === 'Explosiveness' || ex.muscleGroup === 'Legs') score += 200;
        if (ex.equipmentNeeded === 'Barbell' || ex.equipmentNeeded === 'Dumbbells') score += 100;
    } else if (moodKey === 'tired') {
        // Tired: Low-impact, restorative, isolation, bodyweight/machine
        if (ex.mechanics === 'Isolation') score += 300;
        if (ex.equipmentNeeded === 'Machine' || ex.equipmentNeeded === 'Bodyweight' || ex.equipmentNeeded === 'Cables') score += 200;
        if (ex.muscleGroup === 'Neck Strength' || ex.muscleGroup === 'Core' || ex.muscleGroup === 'Arms' || ex.muscleGroup === 'Mobility') score += 150;
        // Penalize heavy compounds
        if (ex.mechanics === 'Compound' && ex.equipmentNeeded === 'Barbell') score -= 500;
    } else if (moodKey === 'stressed') {
        // Stressed: Calming, stress-relieving, deep-regulation, focus
        if (ex.equipmentNeeded === 'Bodyweight' || ex.equipmentNeeded === 'Kettlebells' || ex.equipmentNeeded === 'Bands') score += 250;
        if (ex.muscleGroup === 'Core' || ex.muscleGroup === 'Back' || ex.muscleGroup === 'Shoulders') score += 200;
        if (ex.mechanics === 'Isolation') score += 100;
    }
    
    // Base scientific effectiveness
    score += (ex.scientificEffectivenessScore * 10);

    // Daily deterministic tie-breaker ensures 10 distinct, unique exercises that map perfectly to the category
    const seed = deterministicHash(ex.name + todayStr) % 100;
    score += seed;

    ex._tempScore = score;
  });

  // Sort by the calculated score descending
  ranked.sort((a: any, b: any) => (b._tempScore || 0) - (a._tempScore || 0));

  // Extract exactly 'count' unique exercises by name to guarantee no duplicates
  const uniqueResults: ExerciseEntity[] = [];
  const seenNames = new Set<string>();
  
  for (const ex of ranked) {
    if (!seenNames.has(ex.name)) {
      seenNames.add(ex.name);
      uniqueResults.push(ex);
    }
    if (uniqueResults.length === count) break;
  }

  return uniqueResults;
}
`;
fs.writeFileSync(enginePath, engineContent);


// 2. Update Dashboard.tsx with the checkbox UI
const dashboardPath = 'src/components/Dashboard.tsx';
let dContent = fs.readFileSync(dashboardPath, 'utf8');

const oldGrid = `<div className="grid grid-cols-2 gap-3 mb-4">
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
                    </div>`;

const newGrid = `<div className="grid grid-cols-2 gap-3 mb-4">
                        <button 
                            onClick={() => handleToggleInjury(format(new Date(), 'yyyy-MM-dd'))}
                            className={cn("p-4 rounded-[24px] text-left font-bold transition-all flex flex-col", state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? "bg-rose-500 text-white shadow-lg" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100")}
                        >
                            <div className="flex justify-between items-start w-full mb-2">
                                <Crosshair className="w-5 h-5" />
                                {state?.injuryDate === format(new Date(), 'yyyy-MM-dd') ? (
                                    <div className="w-5 h-5 rounded-[6px] bg-white flex items-center justify-center shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-[6px] border-2 border-zinc-200 bg-white" />
                                )}
                            </div>
                            <span className="text-sm">Injured Day</span>
                        </button>
                        <button 
                            onClick={() => handleToggleShield(format(new Date(), 'yyyy-MM-dd'))}
                            className={cn("p-4 rounded-[24px] text-left font-bold transition-all flex flex-col", state?.protectedRestDates?.includes(format(new Date(), 'yyyy-MM-dd')) ? "bg-indigo-500 text-white shadow-lg" : "bg-zinc-50 text-zinc-900 hover:bg-zinc-100")}
                        >
                            <div className="flex justify-between items-start w-full mb-2">
                                <Shield className="w-5 h-5" />
                                {state?.protectedRestDates?.includes(format(new Date(), 'yyyy-MM-dd')) ? (
                                    <div className="w-5 h-5 rounded-[6px] bg-white flex items-center justify-center shadow-sm">
                                        <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 rounded-[6px] border-2 border-zinc-200 bg-white" />
                                )}
                            </div>
                            <span className="text-sm">Shield Today</span>
                        </button>
                    </div>`;

if (dContent.includes(oldGrid)) {
    dContent = dContent.replace(oldGrid, newGrid);
    fs.writeFileSync(dashboardPath, dContent);
    console.log('Dashboard.tsx updated with checkbox UI!');
} else {
    console.error('Could not find target grid block in Dashboard.tsx');
    process.exit(1);
}
