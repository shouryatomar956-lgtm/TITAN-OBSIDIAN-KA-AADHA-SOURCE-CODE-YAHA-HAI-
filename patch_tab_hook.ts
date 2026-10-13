import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

// Replace imports to remove getMasterExerciseDatabase and add useExerciseState
content = content.replace(
  "import { getMasterExerciseDatabase } from '../services/exerciseFactory';",
  "import { useExerciseState } from '../hooks/useExerciseState';"
);

// Remove buildExerciseTrie since it's now in the hook
content = content.replace(
  "import { buildExerciseTrie } from '../lib/trie';",
  ""
);

// Replace the synchronous DB loading with the new hook
const memoReplacement = `  const { db, searchIndex, isLoading } = useExerciseState();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<string | null>(null);

  const muscleGroups = useMemo(() => Array.from(new Set(db.map(ex => ex.muscleGroup))).sort(), [db]);

  const filteredDb = useMemo(() => {
    if (isLoading || !searchIndex) return [];
    
    let matchedIds: Set<string> | null = null;`;

content = content.replace(
  /  const db = useMemo\(\(\) => getMasterExerciseDatabase\(\), \[\]\);\n  \n  \/\/ Build the trie once when DB loads\n  const searchIndex = useMemo\(\(\) => buildExerciseTrie\(db\), \[db\]\);\n\n  const \[searchQuery, setSearchQuery\] = useState\(''\);\n  const \[selectedGroup, setSelectedGroup\] = useState<string \| null>\(null\);\n  const \[selectedEquip, setSelectedEquip\] = useState<string \| null>\(null\);\n\n  const muscleGroups = useMemo\(\(\) => Array\.from\(new Set\(db\.map\(ex => ex\.muscleGroup\)\)\)\.sort\(\), \[db\]\);\n\n  const filteredDb = useMemo\(\(\) => {\n    let matchedIds: Set<string> \| null = null;/s,
  memoReplacement
);

// Add loading state UI rendering
const loadingUI = `        {isLoading ? (
            <div className="py-12 text-center text-zinc-500 text-sm animate-pulse">
                Loading encrypted inventory parameters...
            </div>
        ) : filteredDb.length === 0 ? (`;

content = content.replace(
  /        \{filteredDb\.length === 0 \? \(/,
  loadingUI
);

// Close the loading UI logic by ensuring parenthesis match
content = content.replace(
  /              \}\)\}\n            <\/div>\n        \)\}\n      <\/div>/,
  `              })}\n            </div>\n        )}\n      </div>`
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
