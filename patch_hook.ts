import fs from 'fs';

let content = fs.readFileSync('src/hooks/useExerciseState.ts', 'utf8');

// Remove import { buildExerciseTrie, ExerciseTrie }
content = content.replace("import { buildExerciseTrie, ExerciseTrie } from '../lib/trie';", "");

// Remove searchIndex state
content = content.replace("  const [searchIndex, setSearchIndex] = useState<ExerciseTrie | null>(null);\n", "");

// Remove Trie generation logic
content = content.replace("        // 3. Build the Trie index asynchronously (yield to event loop first)\n        await new Promise(resolve => setTimeout(resolve, 0));\n        const trie = buildExerciseTrie(cachedDb);\n\n        if (!isMounted) return;\n\n", "");
content = content.replace("        setSearchIndex(trie);\n", "");

// Update return statement
content = content.replace("  return { db, searchIndex, isLoading };", "  return { db, isLoading };");

fs.writeFileSync('src/hooks/useExerciseState.ts', content);
