import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

const importReplacement = `import { useState, useMemo, useRef } from 'react';
import { getMasterExerciseDatabase } from '../services/exerciseFactory';
import { Search, Dumbbell, Home as HomeIcon, Activity, Target, Crosshair } from 'lucide-react';
import { cn } from '../lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { buildExerciseTrie } from '../lib/trie';`;

content = content.replace(
  /import { useState.*from '@tanstack\/react-virtual';/s, 
  importReplacement
);

const memoReplacement = `  const db = useMemo(() => getMasterExerciseDatabase(), []);
  
  // Build the trie once when DB loads
  const searchIndex = useMemo(() => buildExerciseTrie(db), [db]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<string | null>(null);

  const muscleGroups = useMemo(() => Array.from(new Set(db.map(ex => ex.muscleGroup))).sort(), [db]);

  const filteredDb = useMemo(() => {
    let matchedIds: Set<string> | null = null;
    
    // Quick prefix search using Trie
    if (searchQuery.trim().length > 0) {
      const tokens = searchQuery.toLowerCase().split(/[^a-z0-9]+/).filter(t => t.length > 0);
      if (tokens.length > 0) {
        for (const token of tokens) {
          const idsForToken = searchIndex.search(token);
          if (matchedIds === null) {
            matchedIds = new Set(idsForToken);
          } else {
            // Intersect
            const newMatched = new Set<string>();
            for (const id of matchedIds) {
              if (idsForToken.has(id)) newMatched.add(id);
            }
            matchedIds = newMatched;
          }
        }
      }
      
      // If we had a query but matched nothing, return empty
      if (matchedIds && matchedIds.size === 0) return [];
    }

    return db.filter(ex => {
      // 1. Check Trie IDs
      if (matchedIds !== null && !matchedIds.has(ex.id)) return false;
      // 2. Check Muscle Group
      if (selectedGroup && ex.muscleGroup !== selectedGroup) return false;
      // 3. Check Equipment
      if (selectedEquip && ex.equipmentNeeded !== selectedEquip) return false;
      return true;
    });
  }, [db, searchIndex, searchQuery, selectedGroup, selectedEquip]);`;

content = content.replace(
  /  const db = useMemo.*?}, \[db, searchQuery, selectedGroup, selectedEquip\]\);/s,
  memoReplacement
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
