const fs = require('fs');

const workerContent = fs.readFileSync('src/workers/database.worker.ts', 'utf8');
const backExercisesMatch = workerContent.match(/export const BACK_EXERCISES: ExerciseEntity\[\] = (\[[\s\S]*?\]);/);
if (!backExercisesMatch) {
    console.error("Could not find BACK_EXERCISES in the worker file.");
    process.exit(1);
}
const backExercisesStr = backExercisesMatch[1];

// Safer Name Generator
function generateValidBeginner(count) {
    const bicep = ['Band Curl', 'Towel Curl', 'Isometric Bicep Hold', 'Drag Curl'];
    const tricep = ['Band Tricep Extension', 'Band Pushdown', 'Tricep Kickback', 'Isometric Tricep Hold'];
    const forearm = ['Wrist Curl', 'Reverse Wrist Curl', 'Towel Grip Hold'];

    const stances = ['Standing', 'Seated', 'Kneeling'];
    const tempos = ['Slow-Tempo', 'Paused', 'Eccentric-Only'];
    const grips = ['Supinated', 'Pronated', 'Neutral-Grip'];

    const names = new Set();
    for(const stance of stances) {
      for(const tempo of tempos) {
         for(const grip of grips) {
            for(const b of bicep) names.add(`${stance} ${grip} ${tempo} ${b}`);
            for(const t of tricep) names.add(`${stance} ${grip} ${tempo} ${t}`);
            for(const f of forearm) names.add(`${stance} ${grip} ${tempo} ${f}`);
         }
      }
    }
    return Array.from(names).slice(0, count);
}

function generateValidIntermediate(count) {
    const bicep = ['Bicep Curl', 'Preacher Curl', 'Spider Curl', 'Zottman Curl', 'Reverse Curl'];
    const tricep = ['Tricep Extension', 'Skullcrusher', 'Tricep Pushdown', 'Overhead Extension', 'French Press'];
    
    const positions = ['Incline', 'Decline', 'Flat', 'Standing', 'Seated'];
    const execs = ['Alternating', 'Single-Arm', 'Dead-Stop', 'Tempo'];
    const grips = ['Close-Grip', 'Wide-Grip', 'Neutral-Grip', 'Supinated', 'Pronated'];

    const names = new Set();
    for(const pos of positions) {
        for(const exec of execs) {
            for(const grip of grips) {
                for(const b of bicep) names.add(`${pos} ${exec} ${grip} ${b}`);
                for(const t of tricep) names.add(`${pos} ${exec} ${grip} ${t}`);
            }
        }
    }
    return Array.from(names).slice(0, count);
}

function generateValidAdvanced(count) {
    const bases = ['Pelican Curl', 'Ring Dip', 'Tiger Bend Push-up', 'Impossible Dip', 'Bodyweight Tricep Extension', 'Ring Tricep Extension', 'One-Arm Preacher Curl', 'Strict Curl', 'Cross-Body Hammer Curl', 'Sphinx Push-up', 'L-Sit Dip'];
    const modifiers = ['Deficit', 'Weighted', 'Plyometric', 'Band-Resisted', 'Chain-Weighted', 'Strict', 'Dynamic', 'Paused', 'One-Arm Negative'];
    const grips = ['Fat-Grip', 'Towel-Grip', 'Pinch-Grip', 'False-Grip', 'Three-Finger'];

    const names = new Set();
    for(const mod of modifiers) {
        for(const grip of grips) {
            for(const base of bases) {
                names.add(`${mod} ${grip} ${base}`);
            }
        }
    }
    return Array.from(names).slice(0, count);
}

// Elite 28 Weighted Peak
const eliteBasesA = ['One-Arm Dip', 'One-Arm Ring Dip', 'Iron Cross Bicep Hold', 'Hefesto', 'Front Lever Curl'];
const eliteGripsA = ['One-Finger', 'Two-Finger', 'Towel', 'Ring', 'Standard', 'Pinch'];
const eliteWeightedNames = [];
for(const base of eliteBasesA) {
    for(const grip of eliteGripsA) {
        eliteWeightedNames.push(`Weighted ${grip} ${base}`);
    }
}

// Elite 55 1.5 Rep
const eliteBasesB = ['Ring Dip', 'Impossible Dip', 'Pelican Curl', 'Tiger Bend Push-up', 'L-Sit Dip', 'Hefesto', 'Bodyweight Skullcrusher'];
const eliteModifiersB = ['Strict', 'Explosive', 'Isometric-to-Dynamic', 'Deficit', 'Dead-Hang', 'Reverse'];
const eliteGripsB = ['Pinch', 'False', 'Neutral', 'Towel', 'Fat-Grip'];
const elite15Names = [];
for(const base of eliteBasesB) {
    for(const mod of eliteModifiersB) {
        for(const grip of eliteGripsB) {
            if(elite15Names.length < 55) {
                elite15Names.push(`${mod} ${grip} ${base} 1.5 Rep`);
            }
        }
    }
}
const eliteNamesCombined = [...eliteWeightedNames.slice(0, 28), ...elite15Names.slice(0, 55)];

const tiers = [
  { level: 'Beginner', count: 121, scoreMin: 4.0, scoreMax: 6.0, homeCount: 85, gymCount: 36, names: generateValidBeginner(121) },
  { level: 'Intermediate', count: 209, scoreMin: 6.1, scoreMax: 8.0, homeCount: 146, gymCount: 63, names: generateValidIntermediate(209) },
  { level: 'Advanced', count: 137, scoreMin: 8.1, scoreMax: 9.2, homeCount: 96, gymCount: 41, names: generateValidAdvanced(137) },
  { level: 'Elite', count: 83, scoreMin: 9.3, scoreMax: 10.0, homeCount: 58, gymCount: 25, names: eliteNamesCombined }
];

const homeEq = ['Bodyweight', 'Backpack-weighted', 'Resistance Bands', 'None'];
const gymEq = ['Barbell', 'Machine', 'Cable'];

let idCounter = 1;
const armExercises = [];

for (const tier of tiers) {
  let h = 0;
  let g = 0;

  for (let i = 0; i < tier.count; i++) {
    const isHome = h < tier.homeCount;
    if (isHome) h++; else g++;

    const env = isHome ? 'Home' : 'Gym';
    const eq = isHome ? homeEq[i % homeEq.length] : gymEq[i % gymEq.length];

    let name = tier.names[i];

    let instruction = '';
    if (tier.level === 'Beginner') {
      instruction = `Focus on wall or incline assistance and high stability to build foundational elbow flexion and extension motor patterns safely. Maintain controlled eccentric tempos.`;
    } else if (tier.level === 'Intermediate') {
      instruction = `Perform full unassisted bodyweight control or moderate free-weight resistance. Execute the movement with moderate time-under-tension protocols for maximum arm hypertrophy.`;
    } else if (tier.level === 'Advanced') {
      instruction = `Enforce strict biomechanical alignment on this advanced exercise applying unilateral loading, high mechanical disadvantage, and complex neuromuscular coordination.`;
    } else if (tier.level === 'Elite') {
      if (i < 28) {
          instruction = `The absolute peak of human anatomy and relative strength. Execute this hyper-advanced weighted movement under extreme mechanical tension.`;
      } else {
          instruction = `Strict 1.5 repetition protocol (full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension) paired with hyper-advanced levers maximizing tendon stiffness and neural drive.`;
      }
    }

    let score = (tier.scoreMin + ((i / tier.count) * (tier.scoreMax - tier.scoreMin))).toFixed(1);

    armExercises.push({
      id: `arm_${idCounter++}`,
      name: name,
      muscleGroup: 'Arms',
      difficulty: tier.level,
      scientificEffectivenessScore: parseFloat(score),
      equipmentNeeded: eq,
      environment: env,
      instructions: instruction
    });
  }
}

const newFileContent = `import { ExerciseEntity } from '../services/types';

export const BACK_EXERCISES: ExerciseEntity[] = ${backExercisesStr};
export const ARM_EXERCISES: ExerciseEntity[] = ${JSON.stringify(armExercises, null, 2)};
export const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES];

self.onmessage = async (e) => {
  const { type, payload } = e.data;
  
  if (type === "GENERATE_MASTER") {
    try {
      self.postMessage({ type: "MASTER_GENERATED", payload: ALL_EXERCISES });
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
};
`;

fs.writeFileSync('src/workers/database.worker.ts', newFileContent);
console.log("Success: Written " + armExercises.length + " arm exercises. Completely removed Wall Pushaway.");
