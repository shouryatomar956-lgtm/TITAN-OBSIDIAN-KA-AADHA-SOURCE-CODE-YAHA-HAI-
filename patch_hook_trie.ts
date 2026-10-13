import fs from 'fs';

let content = fs.readFileSync('src/hooks/useExerciseState.ts', 'utf8');

// Add import
content = content.replace(
  "import { getMasterExerciseDatabase, ExerciseEntity } from '../services/exerciseFactory';",
  "import { getMasterExerciseDatabase, ExerciseEntity } from '../services/exerciseFactory';\nimport { buildExerciseTrie, ExerciseTrie } from '../lib/trie';"
);

// Add searchIndex to state
content = content.replace(
  "const [isLoading, setIsLoading] = useState(true);",
  "const [searchIndex, setSearchIndex] = useState<ExerciseTrie | null>(null);\n  const [isLoading, setIsLoading] = useState(true);"
);

// Add Trie generation
content = content.replace(
  "// 4. Update state to render the UI",
  "// 3. Build the Trie index asynchronously\n        await new Promise(resolve => setTimeout(resolve, 0));\n        const trie = buildExerciseTrie(cachedDb);\n        if (!isMounted) return;\n\n        // 4. Update state to render the UI\n        setSearchIndex(trie);"
);

// Update return
content = content.replace(
  "return { db, isLoading };",
  "return { db, searchIndex, isLoading };"
);

fs.writeFileSync('src/hooks/useExerciseState.ts', content);
