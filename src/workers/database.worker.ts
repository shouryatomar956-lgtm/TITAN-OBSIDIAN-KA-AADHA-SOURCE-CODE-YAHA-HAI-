
import { ExerciseEntity } from '../services/types';
import { MASTER_EXERCISE_DATABASE } from '../services/exerciseFactory';

const ALL_EXERCISES = MASTER_EXERCISE_DATABASE;
const searchCache = new Map<string, ExerciseEntity[]>();

// Pre-compute lowercased search strings once for 10x faster filtering
const PRECOMPUTED_SEARCH_STRINGS = new WeakMap<ExerciseEntity, string>();
for (let i = 0; i < ALL_EXERCISES.length; i++) {
  const ex = ALL_EXERCISES[i];
  PRECOMPUTED_SEARCH_STRINGS.set(ex, `${ex.name.toLowerCase()} ${ex.instructions.toLowerCase()} ${ex.muscleGroup.toLowerCase()} ${ex.equipmentNeeded.toLowerCase()}`);
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;
  
  if (type === "GENERATE_MASTER") {
    try {
      self.postMessage({ type: "MASTER_GENERATED", payload: ALL_EXERCISES });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
  if (type === "FILTER_DB") {
    try {
      const { masterDb, profile } = payload;
      let filtered = masterDb || ALL_EXERCISES;
      if (profile) {
        if (profile.workoutLocation === 'Home') {
           filtered = filtered.filter((ex: ExerciseEntity) => ex.environment === 'Home');
        }
        if (profile.equipmentInventory && profile.equipmentInventory.length > 0) {
           filtered = filtered.filter((ex: ExerciseEntity) => profile.equipmentInventory.includes(ex.equipmentNeeded) || ex.equipmentNeeded === 'Bodyweight' || ex.equipmentNeeded === 'None');
        }
      }
      self.postMessage({ type: "FILTER_DONE", payload: filtered });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
  if (type === "SEARCH_DB") {
    try {
      const { db, query, selectedEquips, selectedGroups, selectedDifficulties } = payload;
      const cacheKey = `${query || ''}|${(selectedEquips || []).join(',')}|${(selectedGroups || []).join(',')}|${(selectedDifficulties || []).join(',')}`;
      
      if ((!db || db.length === ALL_EXERCISES.length) && searchCache.has(cacheKey)) {
        self.postMessage({ type: "SEARCH_DONE", payload: searchCache.get(cacheKey) });
        return;
      }

      let res: ExerciseEntity[] = db || ALL_EXERCISES;
      if (query) {
         const q = query.toLowerCase().trim();
         if (q) {
           res = res.filter(ex => {
             const pre = PRECOMPUTED_SEARCH_STRINGS.get(ex);
             return pre ? pre.includes(q) : (ex.name.toLowerCase().includes(q) || ex.instructions.toLowerCase().includes(q));
           });
         }
      }
      if (selectedEquips && selectedEquips.length > 0) {
         res = res.filter(ex => selectedEquips.includes(ex.environment) || selectedEquips.includes(ex.equipmentNeeded));
      }
      if (selectedGroups && selectedGroups.length > 0) {
         res = res.filter(ex => selectedGroups.includes(ex.muscleGroup));
      }
      if (selectedDifficulties && selectedDifficulties.length > 0) {
         res = res.filter(ex => selectedDifficulties.includes(ex.difficulty));
      }

      if (!db || db.length === ALL_EXERCISES.length) {
        if (searchCache.size > 128) searchCache.clear();
        searchCache.set(cacheKey, res);
      }

      self.postMessage({ type: "SEARCH_DONE", payload: res });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
};
