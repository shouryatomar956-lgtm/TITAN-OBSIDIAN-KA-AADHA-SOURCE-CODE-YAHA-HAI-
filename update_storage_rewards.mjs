import fs from 'fs';

let content = fs.readFileSync('src/services/storage.ts', 'utf8');

// update AppState interface
content = content.replace(
    /export interface AppState \{([\s\S]*?)workouts: Workout\[\];/m,
    "export interface AppState {\n  rewards?: string[];\n  totalExercisesLogged?: number;\n  workouts: Workout[];"
);

content = content.replace(
    /const DEFAULT_STATE: AppState = \{/m,
    "const DEFAULT_STATE: AppState = {\n  rewards: [],\n  totalExercisesLogged: 0,"
);

// Add logExercise function
const newFunction = `
  async logExerciseExecution(exerciseName: string, sets: number, reps: string): Promise<{state: AppState, newReward: string | null}> {
    const state = await this.getState();
    const todayStr = new Date().toISOString();
    
    // Add to workouts
    const newWorkout: Workout = {
      id: "log_" + Date.now().toString(),
      name: exerciseName,
      isCompleted: true,
      date: todayStr,
      baseSets: sets,
      baseReps: reps,
      baseRest: 60
    };
    state.workouts.push(newWorkout);
    state.totalExercisesLogged = (state.totalExercisesLogged || 0) + 1;
    
    // Streak increment
    if (!state.lastWorkoutDate) {
       state.currentStreak = 1;
       state.lastWorkoutDate = todayStr;
    } else {
       const today = new Date().toISOString().split('T')[0];
       const last = new Date(state.lastWorkoutDate).toISOString().split('T')[0];
       if (today !== last) {
          state.currentStreak += 1;
          state.lastWorkoutDate = todayStr;
       }
    }
    
    // Evaluate Reward Vault
    if (!state.rewards) state.rewards = [];
    let newReward = null;
    if (state.totalExercisesLogged === 1 && !state.rewards.includes('First Blood')) {
       newReward = 'First Blood';
       state.rewards.push(newReward);
    } else if (state.totalExercisesLogged === 10 && !state.rewards.includes('Consistency Master')) {
       newReward = 'Consistency Master';
       state.rewards.push(newReward);
    } else if (state.currentStreak === 3 && !state.rewards.includes('3-Day Streak')) {
       newReward = '3-Day Streak';
       state.rewards.push(newReward);
    } else if (state.currentStreak === 7 && !state.rewards.includes('7-Day Streak')) {
       newReward = '7-Day Streak';
       state.rewards.push(newReward);
    }
    
    await this.saveState(state);
    
    // Dispatch cross-module event for PDF / UI refresh
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_exercise_logged', { detail: { state } }));
    }
    
    return { state, newReward };
  }
`;

content = content.replace("async checkStreakContinuity(): Promise<AppState> {", newFunction + "\n  async checkStreakContinuity(): Promise<AppState> {");

fs.writeFileSync('src/services/storage.ts', content);

console.log("Updated storage.ts with logging and rewards");
