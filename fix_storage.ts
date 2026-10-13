import { readFileSync, writeFileSync } from 'fs';
const file = 'src/services/storage.ts';
let content = readFileSync(file, 'utf8');

content = content.replace('ensureCurrentWeekWorkouts(): Promise<AppState> {', 'async ensureCurrentWeekWorkouts(): Promise<AppState> {');
writeFileSync(file, content);
