export type MuscleGroup = 
  | 'Shoulders'
  | 'Shoulder'
  | 'Calisthenics'
  | 'Arms' 
  | 'Legs' 
  | 'Core' 
  | 'Cardio' 
  | 'Back' 
  | 'Chest' 
  | 'Explosiveness' 
  | 'Neck Strength' 
  | 'Tendons and Bones' | 'Arm Wrestling';

export type DifficultyTier = 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';

export interface ExerciseEntity {
  /** Unique cryptographic or sequential string identifier. */
  id: string;
  
  /** Standardized biomechanical nomenclature complying with concise formatting. */
  name: string;
  
  /** Enforced union type matching one of the 9 master physiological categories. */
  muscleGroup: MuscleGroup;
  
  /** Granular classification union (beginner, intermediate, advanced, elite). */
  difficulty: DifficultyTier;
  
  /** Numeric rating (1.0 to 10.0) derived from electromyographic (EMG) efficiency and joint safety indices. */
  scientificEffectivenessScore: number;
  
  /** Categorized asset requirement complying with the 70/30 home-to-gym rule (bodyweight, backpack-weighted, dumbbells, resistance bands, machine, barbell, cable, or none). */
  equipmentNeeded: 'Bodyweight' | 'Backpack-weighted' | 'Dumbbells' | 'Resistance Bands' | 'Machine' | 'Barbell' | 'Cable' | 'None' | 'EZ-Bar';
  environment: 'Home' | 'Gym'; // "Home" | "Gym" are used in the UI, but it reflects the rule
  
  /** Step-by-step biomechanical execution cues and safety guidelines. */
  instructions: string;
  
  // Internal pipeline indices
  _searchString?: string;
  _cryptoHash?: string;
  _rawEquipment?: string;
  _tempScore?: number;
}
