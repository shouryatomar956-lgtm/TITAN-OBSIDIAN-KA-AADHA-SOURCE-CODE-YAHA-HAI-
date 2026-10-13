import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/services/storage.ts', 'utf8');

const regex = /async ensureCurrentWeekWorkouts\(\): Promise<AppState> \{[\s\S]*?\n  \}/;

content = content.replace(regex, `async ensureCurrentWeekWorkouts(): Promise<AppState> {
    // Legacy weekly workouts system completely removed.
    // Daily recommendations are now generated dynamically by RecommendationEngine.
    return this.getState();
  }`);

writeFileSync('src/services/storage.ts', content);
