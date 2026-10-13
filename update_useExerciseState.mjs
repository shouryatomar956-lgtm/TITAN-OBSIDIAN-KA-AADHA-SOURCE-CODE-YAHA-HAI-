import fs from 'fs';

const content = fs.readFileSync('src/hooks/useExerciseState.ts', 'utf8');

const updated = content.replace(
  "import { ExerciseEntity, getMasterExerciseDatabaseAsync } from '../services/exerciseFactory';",
  "import { ExerciseEntity, getMasterExerciseDatabaseAsync } from '../services/exerciseFactory';\nimport { getSearchProxy } from '../utils/searchManager';"
).replace(
  "setDb(masterDb);",
  `setDb(masterDb);
          
          // Bulk register exercises into the background Trie search engine
          getSearchProxy().then(proxy => {
             if (proxy) {
                const searchData = masterDb.map(ex => ({
                   id: 'ex_' + ex.id,
                   title: ex.name,
                   category: 'Exercise',
                   keywords: [ex.muscleGroup, ex.equipment, ex.difficulty],
                   aliases: [ex.name.toLowerCase()],
                   priority: 10,
                   route: 'exercises',
                   payload: ex.id
                }));
                proxy.registerBulk(searchData);
             }
          });`
);

fs.writeFileSync('src/hooks/useExerciseState.ts', updated);
