import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

// Replace standard imports
content = content.replace(
  "import { Virtuoso } from 'react-virtuoso';",
  "import { Virtuoso } from 'react-virtuoso';\nimport Fuse from 'fuse.js';"
);

// We need to replace the entire `filteredDb` useMemo block.
const memoBlockRegex = /  const filteredDb = useMemo\(\(\) => \{[\s\S]*?\}, \[db, searchIndex, searchQuery, selectedGroup, selectedEquip\]\);/m;

const newMemoBlock = `  const fuseIndex = useMemo(() => {
    if (!db || db.length === 0) return null;
    return new Fuse(db, {
      keys: ['name', 'instructions'],
      threshold: 0.3, // Fuzzy match tolerance for typos
      ignoreLocation: true,
      includeScore: false,
    });
  }, [db]);

  const filteredDb = useMemo(() => {
    if (isLoading || !db) return [];
    
    let result = db;
    let query = searchQuery.trim();

    // 1. Scientific/Point Filtering (e.g. '10 point', '8.5 eff')
    const pointMatch = query.match(/([0-9.]+)\s*(point|score|eff|points)/i);
    if (pointMatch) {
      const targetScore = parseFloat(pointMatch[1]);
      result = result.filter(ex => Math.abs(ex.scientificEffectivenessScore - targetScore) < 0.05); // Float tolerance
      query = query.replace(pointMatch[0], '').trim();
    }

    // 2. Fuzzy Text Search & Typo Tolerance using Fuse.js
    if (query.length > 0 && fuseIndex) {
      const fuseResults = fuseIndex.search(query);
      const matchedIds = new Set(fuseResults.map(r => r.item.id));
      result = result.filter(ex => matchedIds.has(ex.id));
    }

    // 3. Equipment Filter
    if (selectedEquip) {
      result = result.filter(ex => ex.equipmentNeeded === selectedEquip);
    }

    // 4. Muscle Group Filter
    if (selectedGroup) {
      result = result.filter(ex => ex.muscleGroup === selectedGroup);
    }

    return result;
  }, [db, fuseIndex, searchQuery, selectedGroup, selectedEquip, isLoading]);`;

content = content.replace(memoBlockRegex, newMemoBlock);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
