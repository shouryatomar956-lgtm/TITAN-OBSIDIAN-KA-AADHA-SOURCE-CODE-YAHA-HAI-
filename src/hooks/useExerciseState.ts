
import { useState, useEffect } from 'react';
import { ExerciseEntity, getMasterExerciseDatabaseAsync, MASTER_EXERCISE_DATABASE } from '../services/exerciseFactory';
import { getSearchProxy } from '../utils/searchManager';

let isSearchBulkRegistered = false;

export function useExerciseState() {
  const [db, setDb] = useState<ExerciseEntity[]>(() => MASTER_EXERCISE_DATABASE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    async function loadCache() {
      try {
        const masterDb = await getMasterExerciseDatabaseAsync();
        if (isMounted) {
          setDb(masterDb);
          setIsLoading(false);

          if (!isSearchBulkRegistered && !(typeof window !== 'undefined' && (window as any).__PULSEFIT_SEARCH_INDEXED__)) {
            isSearchBulkRegistered = true;
            if (typeof window !== 'undefined') (window as any).__PULSEFIT_SEARCH_INDEXED__ = true;
            getSearchProxy().then(proxy => {
               if (proxy) {
                  const searchData = masterDb.map(ex => ({
                     id: 'ex_' + ex.id,
                     title: ex.name,
                     category: 'Exercise',
                     keywords: [ex.muscleGroup, ex.equipmentNeeded, ex.difficulty],
                     aliases: [ex.name.toLowerCase()],
                     priority: 10,
                     route: 'exercises',
                     payload: ex.id,
                     tier: ex.difficulty.toLowerCase(),
                     score: ex.scientificEffectivenessScore
                  }));
                  
                  const globalSections = [
                        { id: 'sec_overview', title: 'Overview', category: 'Section', keywords: ['dashboard', 'home', 'summary', 'stats', 'analytics', 'overview'], route: 'dashboard', priority: 100 },
                        { id: 'sec_profile', title: 'User Profile', category: 'Section', keywords: ['account', 'settings', 'user', 'preferences', 'profile', 'logout'], route: 'profile', priority: 90 },
                        { id: 'sec_history', title: 'Workout History', category: 'Section', keywords: ['logs', 'past workouts', 'history', 'calendar'], route: 'history', priority: 80 },
                        { id: 'sec_analytics', title: 'Analytics & Progress', category: 'Section', keywords: ['charts', 'progress', 'graphs', 'analytics', 'performance'], route: 'analytics', priority: 80 },
                        { id: 'sec_settings', title: 'App Settings', category: 'Section', keywords: ['theme', 'notifications', 'dark mode', 'settings', 'config'], route: 'settings', priority: 50 },
                  ];
                  proxy.registerBulk([...searchData, ...globalSections], true);
               }
            });
          }
        }
      } catch (e: any) {
        console.error('Critical fallback triggered in hook. Error:', e?.message, e); 
        if (isMounted) setIsLoading(false);
      }
    }
    
    loadCache();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return { db, isLoading };
}
