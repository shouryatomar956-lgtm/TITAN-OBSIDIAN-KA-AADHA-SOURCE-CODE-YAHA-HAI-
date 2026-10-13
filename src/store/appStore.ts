import { create } from 'zustand';

// ---------------------------------------------------------------------------------
// PART 5: REACTIVE STATE SYNC & DELTA DETECTION PIPELINE
// ---------------------------------------------------------------------------------

interface ApplicationState {
  userProfile: Record<string, any>;
  activeWorkouts: any[];
  preferences: Record<string, any>;
  appMetrics: Record<string, any>;
  
  // Delta Context Window for LLM Prompting
  deltaContext: Record<string, any>;
  
  // Actions
  updateProfile: (updates: Record<string, any>) => void;
  logWorkout: (workout: any) => void;
  computeDelta: (newState: any) => void;
}

export const useAppStore = create<ApplicationState>((set, get) => ({
  userProfile: { level: 'Intermediate', goal: 'Hypertrophy', injury: 'None' },
  activeWorkouts: [],
  preferences: { theme: 'dark', voiceEnabled: true },
  appMetrics: { sessionCount: 0, fatigueIndex: 0.2 },
  
  deltaContext: {},

  computeDelta: (newPartialState) => {
      // High-Performance Delta Detection Middleware
      // Performs shallow diffs to update deltaContext without serializing global state
      set((state) => {
          const delta = { ...state.deltaContext, ...newPartialState };
          return { deltaContext: delta };
      });
  },

  updateProfile: (updates) => {
      set((state) => {
          const newProfile = { ...state.userProfile, ...updates };
          get().computeDelta({ userProfile: newProfile });
          return { userProfile: newProfile };
      });
  },

  logWorkout: (workout) => {
      set((state) => {
          const newWorkouts = [...state.activeWorkouts, workout];
          get().computeDelta({ activeWorkouts_count: newWorkouts.length, latest_workout: workout.name });
          return { activeWorkouts: newWorkouts };
      });
  }
}));
