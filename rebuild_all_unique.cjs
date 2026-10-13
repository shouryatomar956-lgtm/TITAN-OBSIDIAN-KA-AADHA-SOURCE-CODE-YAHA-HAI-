const fs = require('fs');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function generateUniqueNames(bases, modifiers, grips, count, suffix = "", prefix = "") {
    const names = new Set();
    
    // Seed pure forms
    bases.forEach(b => {
         names.add(`${prefix ? prefix + ' ' : ''}${b}${suffix ? ' ' + suffix : ''}`);
    });

    // Seed 1-modifier forms
    for (const b of bases) {
        for (const m of modifiers) {
             names.add(`${prefix ? prefix + ' ' : ''}${m} ${b}${suffix ? ' ' + suffix : ''}`);
        }
        for (const g of grips) {
             names.add(`${prefix ? prefix + ' ' : ''}${g} ${b}${suffix ? ' ' + suffix : ''}`);
        }
    }

    // Generate varied combinations
    let attempts = 0;
    while (names.size < count * 2 && attempts < 100000) {
        attempts++;
        const b = bases[Math.floor(Math.random() * bases.length)];
        const m = modifiers[Math.floor(Math.random() * modifiers.length)];
        const g = grips[Math.floor(Math.random() * grips.length)];
        
        const format = Math.random();
        let generatedName = "";
        
        // Randomize the order of adjectives to prevent visual patterns
        if (format < 0.3) {
            generatedName = `${m} ${b}`;
        } else if (format < 0.6) {
            generatedName = `${g} ${b}`;
        } else if (format < 0.8) {
            generatedName = `${m} ${g} ${b}`;
        } else {
            generatedName = `${g} ${m} ${b}`; 
        }
        
        names.add(`${prefix ? prefix + ' ' : ''}${generatedName}${suffix ? ' ' + suffix : ''}`);
    }

    return shuffle(Array.from(names)).slice(0, count);
}

// ---------------- BACK EXERCISES ----------------
const bBases = ['Scapular Retraction', 'Wall Slide', 'Assisted Row', 'Band Pull-Apart', 'Back Hold', 'Inverted Row', 'Superman', 'Prone Cobra', 'Lat Stretch', 'Floor Shrug'];
const bMods = ['Seated', 'Kneeling', 'Standing', 'Eccentric-Only', 'Slow-Tempo', 'Paused', 'Supported', 'Alternating', 'Isometric'];
const bGrips = ['Neutral-Grip', 'Supinated', 'Pronated', 'Wide', 'Narrow'];

const iBases = ['Pull-up', 'Chin-up', 'Bent-Over Row', 'Seated Row', 'Lat Pulldown', 'T-Bar Row', 'Chest-Supported Row', 'Meadows Row', 'Pendlay Row', 'Shrug', 'Seal Row', 'Kroc Row', 'Gorilla Row', 'Straight-Arm Pulldown'];
const iMods = ['Dumbbell', 'Barbell', 'Cable', 'Machine', 'Alternating', 'Single-Arm', 'Paused', 'Deficit', 'Incline', 'Decline', 'Tempo', 'Dead-Stop'];
const iGrips = ['Wide-Grip', 'Close-Grip', 'Neutral-Grip', 'Reverse-Grip', 'Underhand', 'Overhand'];

const aBases = ['Pull-up', 'Chin-up', 'Row', 'Deadlift', 'Rack Pull', 'High Row', 'Low Row', 'Pullover', 'Muscle-up Transition', 'Tuck Front Lever', 'Inverted Row'];
const aMods = ['Archer', 'Plyometric', 'Band-Resisted', 'Chain-Weighted', 'Commando', 'L-Sit', 'Typewriter', 'One-Arm Negative', 'Deficit', 'Strict', 'Dynamic'];
const aGrips = ['Towel-Grip', 'Fat-Grip', 'False-Grip', 'Pinch-Grip'];

const e15BasesBack = ['Muscle-up', 'Human Flag Pull', 'Victorian Pull', 'Mantis Row', 'Campus Pull', 'Rope Climb', 'OAPU Negative'];
const e15ModsBack = ['Strict', 'Explosive', 'Isometric-to-Dynamic', 'Deficit', 'Dead-Hang'];
const e15GripsBack = ['Pinch', 'False', 'Neutral', 'Towel', 'Fat-Grip', 'One-Finger'];

const eWBasesBack = ['One-Arm Pull-up', 'One-Arm Chin-up', 'Front Lever', 'Iron Cross Pull', 'Planche Row'];
const eWModsBack = ['Strict', 'Deficit', 'Isometric', 'Dynamic'];
const eWGripsBack = ['One-Finger', 'Two-Finger', 'Towel', 'Rope', 'Ring', 'Standard'];

const backTiers = [
  { level: 'Beginner', count: 132, scoreMin: 4.0, scoreMax: 6.0, homeCount: 92, gymCount: 40, names: generateUniqueNames(bBases, bMods, bGrips, 132) },
  { level: 'Intermediate', count: 228, scoreMin: 6.1, scoreMax: 8.0, homeCount: 160, gymCount: 68, names: generateUniqueNames(iBases, iMods, iGrips, 228) },
  { level: 'Advanced', count: 150, scoreMin: 8.1, scoreMax: 9.2, homeCount: 105, gymCount: 45, names: generateUniqueNames(aBases, aMods, aGrips, 150) },
  { level: 'Elite', count: 90, scoreMin: 9.3, scoreMax: 10.0, homeCount: 63, gymCount: 27, names: shuffle([
      ...generateUniqueNames(eWBasesBack, eWModsBack, eWGripsBack, 30, "", "Weighted"),
      ...generateUniqueNames(e15BasesBack, e15ModsBack, e15GripsBack, 60, "1.5 Rep")
  ])}
];

// ---------------- ARM EXERCISES ----------------
const bBasesArm = ['Band Curl', 'Towel Curl', 'Drag Curl', 'Tricep Extension', 'Band Pushdown', 'Tricep Kickback', 'Wrist Curl', 'Reverse Wrist Curl', 'Towel Grip Hold'];
const bModsArm = ['Seated', 'Standing', 'Kneeling', 'Slow-Tempo', 'Paused', 'Alternating', 'Isometric', 'Eccentric'];
const bGripsArm = ['Supinated', 'Pronated', 'Neutral-Grip'];

const iBasesArm = ['Bicep Curl', 'Preacher Curl', 'Spider Curl', 'Zottman Curl', 'Reverse Curl', 'Tricep Extension', 'Skullcrusher', 'Tricep Pushdown', 'Overhead Extension', 'French Press', 'JM Press'];
const iModsArm = ['Dumbbell', 'Barbell', 'Cable', 'EZ-Bar', 'Machine', 'Incline', 'Decline', 'Flat', 'Alternating', 'Single-Arm', 'Tempo'];
const iGripsArm = ['Close-Grip', 'Wide-Grip', 'Neutral-Grip'];

const aBasesArm = ['Pelican Curl', 'Ring Dip', 'Tiger Bend Push-up', 'Impossible Dip', 'Bodyweight Tricep Extension', 'Ring Tricep Extension', 'One-Arm Preacher Curl', 'Strict Curl', 'Cross-Body Hammer Curl'];
const aModsArm = ['Deficit', 'Plyometric', 'Band-Resisted', 'Chain-Weighted', 'Strict', 'Dynamic', 'Paused', 'One-Arm Negative'];
const aGripsArm = ['Fat-Grip', 'Towel-Grip', 'Pinch-Grip', 'False-Grip'];

const e15BasesArm = ['Ring Dip', 'Impossible Dip', 'Pelican Curl', 'Tiger Bend Push-up', 'L-Sit Dip', 'Hefesto', 'Bodyweight Skullcrusher'];
const e15ModsArm = ['Strict', 'Explosive', 'Isometric', 'Deficit', 'Dead-Hang', 'Reverse'];
const e15GripsArm = ['Pinch', 'False', 'Neutral', 'Towel', 'Fat-Grip'];

const eWBasesArm = ['One-Arm Dip', 'One-Arm Ring Dip', 'Iron Cross Bicep Hold', 'Hefesto', 'Front Lever Curl'];
const eWModsArm = ['Strict', 'Isometric', 'Explosive'];
const eWGripsArm = ['One-Finger', 'Two-Finger', 'Towel', 'Ring', 'Standard', 'Pinch'];

const armTiers = [
  { level: 'Beginner', count: 121, scoreMin: 4.0, scoreMax: 6.0, homeCount: 85, gymCount: 36, names: generateUniqueNames(bBasesArm, bModsArm, bGripsArm, 121) },
  { level: 'Intermediate', count: 209, scoreMin: 6.1, scoreMax: 8.0, homeCount: 146, gymCount: 63, names: generateUniqueNames(iBasesArm, iModsArm, iGripsArm, 209) },
  { level: 'Advanced', count: 137, scoreMin: 8.1, scoreMax: 9.2, homeCount: 96, gymCount: 41, names: generateUniqueNames(aBasesArm, aModsArm, aGripsArm, 137) },
  { level: 'Elite', count: 83, scoreMin: 9.3, scoreMax: 10.0, homeCount: 58, gymCount: 25, names: shuffle([
      ...generateUniqueNames(eWBasesArm, eWModsArm, eWGripsArm, 28, "", "Weighted"),
      ...generateUniqueNames(e15BasesArm, e15ModsArm, e15GripsArm, 55, "1.5 Rep")
  ])}
];

function buildExercises(tiersConfig, muscleGroup, isBack) {
    let idCounter = 1;
    const homeEq = ['Bodyweight', 'Backpack-weighted', 'Resistance Bands', 'None'];
    const gymEq = ['Barbell', 'Machine', 'Cable', 'Dumbbell', 'EZ-Bar'];
    const exercises = [];

    for (const tier of tiersConfig) {
        let h = 0;
        let g = 0;
        for (let i = 0; i < tier.count; i++) {
            const isHome = h < tier.homeCount;
            if (isHome) h++; else g++;
            
            const env = isHome ? 'Home' : 'Gym';
            const eq = isHome ? homeEq[i % homeEq.length] : gymEq[i % gymEq.length];
            
            let instruction = '';
            if (tier.level === 'Beginner') {
                instruction = isBack 
                    ? 'Focus on wall-supported scapular retractions and assisted movements. Maintain controlled eccentric tempos to ensure proper back muscle activation safely.'
                    : 'Focus on wall or incline assistance and high stability to build foundational elbow flexion and extension motor patterns safely. Maintain controlled eccentric tempos.';
            } else if (tier.level === 'Intermediate') {
                instruction = isBack
                    ? 'Perform full unassisted bodyweight control or standard load. Execute the movement with moderate time-under-tension protocols for maximum hypertrophy.'
                    : 'Perform full unassisted bodyweight control or moderate free-weight resistance. Execute the movement with moderate time-under-tension protocols for maximum arm hypertrophy.';
            } else if (tier.level === 'Advanced') {
                instruction = isBack
                    ? 'Enforce strict biomechanical alignment on this advanced exercise applying high mechanical disadvantage.'
                    : 'Enforce strict biomechanical alignment on this advanced exercise applying unilateral loading, high mechanical disadvantage, and complex neuromuscular coordination.';
            } else if (tier.level === 'Elite') {
                const is15 = tier.names[i].includes('1.5');
                if (!is15) {
                    instruction = 'The absolute peak of human anatomy and relative strength. Execute this hyper-advanced weighted movement under extreme mechanical tension.';
                } else {
                    instruction = 'Strict 1.5 repetition protocol (full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension) paired with hyper-advanced levers maximizing tendon stiffness and neural drive.';
                }
            }

            let score = (tier.scoreMin + ((i / tier.count) * (tier.scoreMax - tier.scoreMin))).toFixed(1);
            
            exercises.push({
                id: `${muscleGroup.toLowerCase()}_${idCounter++}`,
                name: tier.names[i],
                muscleGroup: muscleGroup,
                difficulty: tier.level,
                scientificEffectivenessScore: parseFloat(score),
                equipmentNeeded: eq,
                environment: env,
                instructions: instruction
            });
        }
    }
    return exercises;
}

const backExercises = buildExercises(backTiers, 'Back', true);
const armExercises = buildExercises(armTiers, 'Arms', false);

const newFileContent = `
import { ExerciseEntity } from '../services/types';

export const BACK_EXERCISES: ExerciseEntity[] = ${JSON.stringify(backExercises, null, 2)};
export const ARM_EXERCISES: ExerciseEntity[] = ${JSON.stringify(armExercises, null, 2)};
export const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES];

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
           filtered = filtered.filter(ex => ex.environment === 'Home');
        }
        if (profile.equipmentInventory && profile.equipmentInventory.length > 0) {
           filtered = filtered.filter(ex => profile.equipmentInventory.includes(ex.equipmentNeeded) || ex.equipmentNeeded === 'Bodyweight' || ex.equipmentNeeded === 'None');
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
      let res = db || ALL_EXERCISES;
      if (query) {
         const q = query.toLowerCase();
         res = res.filter(ex => ex.name.toLowerCase().includes(q) || ex.instructions.toLowerCase().includes(q));
      }
      if (selectedEquips && selectedEquips.length > 0) {
         res = res.filter(ex => selectedEquips.includes(ex.equipmentNeeded));
      }
      if (selectedGroups && selectedGroups.length > 0) {
         res = res.filter(ex => selectedGroups.includes(ex.muscleGroup));
      }
      if (selectedDifficulties && selectedDifficulties.length > 0) {
         res = res.filter(ex => selectedDifficulties.includes(ex.difficulty));
      }
      self.postMessage({ type: "SEARCH_DONE", payload: res });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
};
`;

fs.writeFileSync('src/workers/database.worker.ts', newFileContent);
console.log("Successfully randomized 600 Back and 550 Arm exercises using Fisher-Yates mapping.");
