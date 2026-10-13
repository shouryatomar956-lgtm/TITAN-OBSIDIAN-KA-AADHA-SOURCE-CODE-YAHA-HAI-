import fs from 'fs';

const files = [
  'src/services/storage.ts',
  'src/services/exerciseFactory.ts',
  'src/services/recommendationEngine.ts',
  'src/components/ExerciseCatalog.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace references
  content = content.replace(/from '\.\/workerPool'/g, "from '../utils/workerManager'");
  content = content.replace(/from '\.\.\/services\/workerPool'/g, "from '../utils/workerManager'");
  
  fs.writeFileSync(file, content);
  console.log(`Updated imports in ${file}`);
}
