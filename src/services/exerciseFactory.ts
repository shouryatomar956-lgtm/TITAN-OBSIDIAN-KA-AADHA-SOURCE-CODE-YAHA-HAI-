import { ExerciseEntity, MuscleGroup } from './types';
import { dbWorkerPool } from '../utils/workerManager';

import { ARM_EXERCISES } from './arm';
import { ARM_WRESTLING_EXERCISES } from './arm_wrestling';
import { BACK_EXERCISES } from './back';
import { CALISTHENICS_EXERCISES } from './calisthenics';
import { CARDIO_EXERCISES } from './cardio';
import { CHEST_EXERCISES } from './chest';
import { CORE_EXERCISES } from './core';
import { EXPLOSIVENESS_EXERCISES } from './explosiveness';
import { LEG_EXERCISES } from './leg';
import { NECK_EXERCISES } from './neck';
import { SHOULDER_EXERCISES } from './shoulder';
import { TENDON_EXERCISES } from './tendon';

export type { ExerciseEntity, MuscleGroup };

// Aggregated Master Database
export const MASTER_EXERCISE_DATABASE: ExerciseEntity[] = [
  ...ARM_EXERCISES,
  ...ARM_WRESTLING_EXERCISES,
  ...BACK_EXERCISES,
  ...CALISTHENICS_EXERCISES,
  ...CARDIO_EXERCISES,
  ...CHEST_EXERCISES,
  ...CORE_EXERCISES,
  ...EXPLOSIVENESS_EXERCISES,
  ...LEG_EXERCISES,
  ...NECK_EXERCISES,
  ...SHOULDER_EXERCISES,
  ...TENDON_EXERCISES,
];

export async function getMasterExerciseDatabaseAsync(): Promise<ExerciseEntity[]> {
  // If the user still wants to use the worker for async generation we can, 
  // but we can also just return the aggregated array directly or via worker.
  // The prompt asks to ensure exerciseFactory.ts imports and aggregates them.
  return MASTER_EXERCISE_DATABASE;
}
