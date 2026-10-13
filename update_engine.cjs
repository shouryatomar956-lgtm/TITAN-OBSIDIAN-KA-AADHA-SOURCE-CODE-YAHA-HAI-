const fs = require('fs');

const path = 'src/services/recommendationEngine.ts';
let content = fs.readFileSync(path, 'utf8');

// Add import
const importStr = "import { getDedupeService } from '../utils/bloomDedupeManager';\n";
content = importStr + content;

// Replace unique extraction logic
const oldLogic = `  // Extract exactly 'count' unique exercises by name to guarantee no duplicates
  const uniqueResults: ExerciseEntity[] = [];
  const seenNames = new Set<string>();
  
  for (const ex of ranked) {
    if (!seenNames.has(ex.name)) {
      seenNames.add(ex.name);
      uniqueResults.push(ex);
    }
    if (uniqueResults.length === count) break;
  }`;

const newLogic = `  // Extract exactly 'count' unique exercises by name using Hyper-Advanced Bloom Filtering
  const uniqueResults: ExerciseEntity[] = [];
  
  const deduplicator = await getDedupeService();
  await deduplicator.reset();
  
  for (const ex of ranked) {
    const { isDuplicate } = await deduplicator.checkAndAdd(ex.name);
    if (!isDuplicate) {
      uniqueResults.push(ex);
    }
    if (uniqueResults.length === count) break;
  }`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync(path, content);
