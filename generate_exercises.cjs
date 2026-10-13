const fs = require('fs');

const beginnerBases = ['Scapular Retraction', 'Wall Slide', 'Assisted Row', 'Band Pull-Apart', 'Isometric Back Hold', 'High Inverted Row', 'Superman Hold', 'Prone Cobra', 'Assisted Pull-down', 'Lat Stretch', 'Wall-Supported Row', 'Floor Shrug'];
const beginnerModifiers = ['Seated', 'Kneeling', 'Half-Kneeling', 'Standing', 'Lying', 'Eccentric-Only', 'Partial-Range', 'Slow-Tempo', 'Paused', 'Supported', 'Bilateral'];
const beginnerGrips = ['Neutral-Grip', 'Supinated', 'Pronated', 'Wide', 'Narrow'];

const intermediateBases = ['Pull-up', 'Chin-up', 'Bent-Over Row', 'Seated Row', 'Lat Pulldown', 'T-Bar Row', 'Chest-Supported Row', 'Meadows Row', 'Pendlay Row', 'Straight-Arm Pulldown', 'Shrug', 'Seal Row', 'Kroc Row', 'Renegade Row', 'Gorilla Row'];
const intermediateModifiers = ['Standard', 'Alternating', 'Single-Arm', 'Paused', 'Deficit', 'Incline', 'Decline', 'Flat', 'Staggered-Stance', 'Tempo', 'Explosive', 'Dead-Stop'];
const intermediateGrips = ['Wide-Grip', 'Close-Grip', 'Neutral-Grip', 'Reverse-Grip', 'Underhand', 'Overhand', 'Mixed-Grip'];

const advancedBases = ['Pull-up', 'Chin-up', 'Row', 'Deadlift', 'Rack Pull', 'High Row', 'Low Row', 'Pullover', 'Muscle-up Transition', 'Tuck Front Lever', 'Inverted Row'];
const advancedModifiers = ['Archer', 'Weighted', 'Plyometric', 'Band-Resisted', 'Chain-Weighted', 'Commando', 'L-Sit', 'Typewriter', 'One-Arm Negative', 'Deficit Paused', 'Strict', 'Dynamic'];
const advancedGrips = ['Towel-Grip', 'Fat-Grip', 'False-Grip', 'Pinch-Grip', 'Three-Finger', 'Two-Finger'];

function generateNames(bases, modifiers, grips, count, requiredString = "") {
    const names = new Set();
    for (const base of bases) {
        for (const mod of modifiers) {
            for (const grip of grips) {
                let name = `${mod} ${grip} ${base}`;
                if (requiredString) name += ` ${requiredString}`;
                names.add(name);
            }
        }
    }
    if (names.size < count) {
        for (const base of bases) {
            for (const mod1 of modifiers) {
                for (const mod2 of modifiers) {
                    if (mod1 === mod2) continue;
                    let name = `${mod1} ${mod2} ${base}`;
                    if (requiredString) name += ` ${requiredString}`;
                    names.add(name);
                }
            }
        }
    }
    return Array.from(names).slice(0, count);
}

// Elite 30 Weighted Peak
const eliteBasesA = ['One-Arm Pull-up', 'One-Arm Chin-up', 'Front Lever', 'Iron Cross Pull', 'Planche Row'];
const eliteGripsA = ['One-Finger', 'Two-Finger', 'Towel', 'Rope', 'Ring', 'Standard'];
const eliteWeightedNames = [];
for(const base of eliteBasesA) {
    for(const grip of eliteGripsA) {
        eliteWeightedNames.push(`Weighted ${grip} ${base}`);
    }
}

// Elite 60 1.5 Rep
const eliteBasesB = ['Muscle-up', 'Human Flag Pull', 'Victorian Pull', 'Mantis Row', 'Campus Pull', 'Rope Climb'];
const eliteModifiersB = ['Strict', 'Explosive', 'Isometric-to-Dynamic', 'Deficit', 'Dead-Hang'];
const eliteGripsB = ['Pinch', 'False', 'Neutral', 'Towel'];
const elite15Names = [];
for(const base of eliteBasesB) {
    for(const mod of eliteModifiersB) {
        for(const grip of eliteGripsB) {
            if(elite15Names.length < 60) {
                elite15Names.push(`${mod} ${grip} ${base} 1.5 Rep`);
            }
        }
    }
}
const eliteNamesCombined = [...eliteWeightedNames, ...elite15Names];

const tiers = [
  { level: 'Beginner', count: 132, scoreMin: 4.0, scoreMax: 6.0, homeCount: 92, gymCount: 40, names: generateNames(beginnerBases, beginnerModifiers, beginnerGrips, 132) },
  { level: 'Intermediate', count: 228, scoreMin: 6.1, scoreMax: 8.0, homeCount: 160, gymCount: 68, names: generateNames(intermediateBases, intermediateModifiers, intermediateGrips, 228) },
  { level: 'Advanced', count: 150, scoreMin: 8.1, scoreMax: 9.2, homeCount: 105, gymCount: 45, names: generateNames(advancedBases, advancedModifiers, advancedGrips, 150) },
  { level: 'Elite', count: 90, scoreMin: 9.3, scoreMax: 10.0, homeCount: 63, gymCount: 27, names: eliteNamesCombined }
];

const homeEq = ['Bodyweight', 'Backpack-weighted', 'Resistance Bands', 'None'];
const gymEq = ['Barbell', 'Machine', 'Cable'];

let idCounter = 1;
const exercises = [];

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
      instruction = `Focus on wall-supported scapular retractions and assisted movements. Maintain controlled eccentric tempos to ensure proper back muscle activation safely.`;
    } else if (tier.level === 'Intermediate') {
      instruction = `Perform full unassisted bodyweight control or standard load. Execute the movement with moderate time-under-tension protocols for maximum hypertrophy.`;
    } else if (tier.level === 'Advanced') {
      instruction = `Enforce strict biomechanical alignment on this advanced exercise applying high mechanical disadvantage.`;
    } else if (tier.level === 'Elite') {
      if (i < 30) {
          instruction = `The absolute peak of human anatomy and relative strength. Execute this hyper-advanced weighted movement under extreme mechanical tension.`;
      } else {
          instruction = `Strict 1.5 repetition protocol (full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension) paired with hyper-advanced levers and isometric holds under extreme mechanical disadvantage.`;
      }
    }
    
    let score = (tier.scoreMin + ((i / tier.count) * (tier.scoreMax - tier.scoreMin))).toFixed(1);
    
    exercises.push({
      id: `back_${idCounter++}`,
      name: name,
      muscleGroup: 'Back',
      difficulty: tier.level,
      scientificEffectivenessScore: parseFloat(score),
      equipmentNeeded: eq,
      environment: env,
      instructions: instruction
    });
  }
}

const fileContent = `
import { ExerciseEntity } from '../services/types';

export const BACK_EXERCISES: ExerciseEntity[] = ${JSON.stringify(exercises, null, 2)};

self.onmessage = async (e) => {
  const { type, payload } = e.data;
  
  if (type === "GENERATE_MASTER") {
    try {
      self.postMessage({ type: "MASTER_GENERATED", payload: BACK_EXERCISES });
    } catch(err) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
  if (type === "FILTER_DB") {
    try {
      const { masterDb, profile } = payload;
      let filtered = masterDb || BACK_EXERCISES;
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
      let res = db || BACK_EXERCISES;
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

fs.writeFileSync('src/workers/database.worker.ts', fileContent);
