import { expose } from 'comlink';
import localforage from 'localforage';
import { SuggestionEngine } from '../services/SuggestionEngine';
import { getMasterExerciseDatabaseAsync } from '../services/exerciseFactory';
import { UserProfile } from '../services/storage';

const threadAApi = {
  // Worker Thread A: Manages data aggregation, localforage workout/overload telemetry extraction, feature engineering, and dynamic workout synthesis.
  async aggregateAndGenerateWorkout(
    profile: UserProfile,
    mood: string,
    isInjured: boolean = false,
    passedWorkouts?: any[]
  ) {
    const [masterDb, storedHistory, appState, repHistory] = await Promise.all([
      getMasterExerciseDatabaseAsync(),
      localforage.getItem<any[]>('pulsefit_workout_history').catch(() => []),
      localforage.getItem<any>('app_state').catch(() => null),
      localforage.getItem<any[]>('pulsefit_rep_counter_history').catch(() => [])
    ]);

    const combinedWorkouts = [
      ...(Array.isArray(passedWorkouts) ? passedWorkouts : []),
      ...(Array.isArray(storedHistory) ? storedHistory : []),
      ...(Array.isArray(appState?.workouts) ? appState.workouts : [])
    ];

    const engine = new SuggestionEngine(
      masterDb,
      profile,
      mood,
      isInjured,
      combinedWorkouts,
      Array.isArray(repHistory) ? repHistory : []
    );

    // Extract genuine athlete biometric telemetry array for delta pattern calculation
    const weight = parseFloat(String(profile?.weightKg || profile?.weight || '70')) || 70;
    const height = parseFloat(String(profile?.heightCm || profile?.height || '175')) || 175;
    const streak = Number(profile?.streak || appState?.currentStreak) || 0;
    const moodFactor = mood === 'Energetic' ? 1.0 : mood === 'Tired' ? 0.3 : 0.6;
    const telemetry = new Float32Array([weight / 100, height / 200, streak / 30, moodFactor]);
    await this.calculateDeltaPatterns(telemetry);

    return engine.generateFullBodyWorkout();
  },

  async getBootstrapAndOverloadDiagnostics(
    profile: UserProfile,
    mood: string,
    passedWorkouts?: any[]
  ) {
    const [masterDb, storedHistory, appState, repHistory] = await Promise.all([
      getMasterExerciseDatabaseAsync(),
      localforage.getItem<any[]>('pulsefit_workout_history').catch(() => []),
      localforage.getItem<any>('app_state').catch(() => null),
      localforage.getItem<any[]>('pulsefit_rep_counter_history').catch(() => [])
    ]);

    const combinedWorkouts = [
      ...(Array.isArray(passedWorkouts) ? passedWorkouts : []),
      ...(Array.isArray(storedHistory) ? storedHistory : []),
      ...(Array.isArray(appState?.workouts) ? appState.workouts : [])
    ];

    const engine = new SuggestionEngine(
      masterDb,
      profile,
      mood,
      false,
      combinedWorkouts,
      Array.isArray(repHistory) ? repHistory : []
    );

    return engine.computeBootstrapState();
  },

  async calculateDeltaPatterns(telemetryData: Float32Array) {
    // Zero-Copy Shared Memory ArrayBuffers operations
    const length = telemetryData.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += telemetryData[i];
    }
    return { status: 'processed', length, deltaSum: sum };
  }
};

expose(threadAApi);
