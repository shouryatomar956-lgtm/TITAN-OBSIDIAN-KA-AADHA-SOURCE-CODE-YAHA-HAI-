import fs from 'fs';

let content = fs.readFileSync('src/services/recommendationEngine.ts', 'utf8');

content = content.replace(
  "export function getRecommendedExercises(profile: UserProfile, mood: string, count: number = 5): ExerciseEntity[] {",
  "export function getRecommendedExercises(profile: UserProfile, mood: string, count: number = 5, difficultyOverride?: string): ExerciseEntity[] {"
);

const oldExpLogic = `    // 2. Filter by Experience Level
    filtered = filtered.filter(ex => {
        const exp = profile.experienceLevel.toLowerCase();
        if (exp.includes('beginner')) {
            return ex.difficulty === 'Beginner' || ex.difficulty === 'Intermediate';
        } else if (exp.includes('advanced') || exp.includes('elite')) {
            return ex.difficulty === 'Advanced' || ex.difficulty === 'Elite';
        }
        return true;
    });`;

const newExpLogic = `    // 2. Filter by Experience Level
    filtered = filtered.filter(ex => {
        const exp = difficultyOverride ? difficultyOverride.toLowerCase() : profile.experienceLevel.toLowerCase();
        if (exp.includes('beginner')) {
            return ex.difficulty === 'Beginner' || ex.difficulty === 'Intermediate';
        } else if (exp.includes('advanced') || exp.includes('elite')) {
            return ex.difficulty === 'Advanced' || ex.difficulty === 'Elite';
        } else if (exp.includes('intermediate')) {
            return ex.difficulty === 'Intermediate' || ex.difficulty === 'Advanced';
        }
        return true;
    });`;

content = content.replace(oldExpLogic, newExpLogic);

fs.writeFileSync('src/services/recommendationEngine.ts', content);
