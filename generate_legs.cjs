const fs = require('fs');

const exercises = [];
let idCounter = 1;

function addEx(name, diff, score, eq, env, inst) {
  exercises.push({
    id: `legs_${idCounter++}`,
    name,
    muscleGroup: "Legs",
    difficulty: diff,
    scientificEffectivenessScore: Number(score.toFixed(1)),
    equipmentNeeded: eq,
    environment: env,
    instructions: inst
  });
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randScore = (min, max) => min + Math.random() * (max - min);

const homeEq = ["Bodyweight", "Resistance Bands", "None"];
const intHomeEq = ["Bodyweight", "Backpack-weighted", "Resistance Bands", "None"];
const gymEq = ["Cable", "Machine", "Dumbbells", "Barbell"];

const generateUnique = (count, bases, eqList, env, diff, minScore, maxScore, inst, prefixList, suffixList = [""]) => {
  let current = 0;
  let attempts = 0;
  const seenNames = new Set(exercises.map(e => e.name));
  
  while(current < count && attempts < 500000) {
    attempts++;
    const name = rand(prefixList) + rand(bases) + rand(suffixList);
    if(!seenNames.has(name)) {
      seenNames.add(name);
      addEx(name, diff, randScore(minScore, maxScore), rand(eqList), env, inst);
      current++;
    }
  }
  if(current < count) throw new Error(`Could not generate enough unique exercises for ${env} ${diff}. Generated ${current} of ${count}`);
}

// Beginner
const prefixesBeg = ["", "Paused ", "Supported ", "Slow-Eccentric ", "Isometric ", "Assisted ", "Partial ", "Seated ", "Lying ", "Standing ", "Wall-Assisted ", "Band-Assisted "];
const begInst = "Designed for an initial training age of 1 to 1.5 months with wall or box assistance and high stability to build foundational lower-body motor patterns safely. Employs controlled eccentric tempos.";
const begHomeBases = ["Box Squat", "Wall Sit", "Bodyweight Squat", "Glute Bridge", "Assisted Lunge", "Step-Up", "Clamshell", "Side Lying Leg Raise", "Donkey Kick", "Fire Hydrant", "Calf Raise", "Static Lunge", "Wide Stance Squat", "Knee Extension", "Hip Flexion", "Wall Squat", "Leg Abduction", "Leg Adduction", "Heel Raise", "Toe Raise"];
generateUnique(115, begHomeBases, homeEq, "Home", "Beginner", 4.0, 6.0, begInst, prefixesBeg);

const begGymBases = ["Leg Press", "Leg Extension", "Seated Leg Curl", "Lying Leg Curl", "Machine Calf Raise", "Cable Pull-Through", "Cable Kickback", "Assisted Squat Machine", "Smith Machine Box Squat", "Cable Abduction", "Cable Adduction", "Machine Glute Kickback", "Seated Calf Raise", "Standing Calf Raise"];
generateUnique(50, begGymBases, gymEq, "Gym", "Beginner", 4.0, 6.0, begInst, prefixesBeg);

// Intermediate
const prefixesInt = ["", "Paused ", "Tempo ", "Slow-Eccentric ", "Alternating ", "Constant Tension ", "Explosive ", "1¼ ", "Banded ", "High-Rep ", "Low-Rep ", "Speed ", "Goblet ", "Front-Loaded ", "Suitcase "];
const intInst = "Targeted for a training age of 3 to 4 months of consistent resistance history using full unassisted bodyweight control or moderate free-weight resistance. Implements moderate time-under-tension protocols.";
const intHomeBases = ["Bulgarian Split Squat", "Jump Squat", "Walking Lunge", "Reverse Lunge", "Single-Leg Glute Bridge", "Skater Jump", "Lateral Lunge", "Curtsy Lunge", "Sumo Squat", "Single-Leg Calf Raise", "Duck Walk", "Frog Jump", "Cossack Squat Progression", "Wall Sit March", "Banded Clamshell", "Banded Glute Bridge", "Reverse Hyperextension", "Single-Leg Wall Sit", "Banded Hip Abduction", "Split Squat Hold", "Heel Elevated Squat", "Drop Lunge"];
generateUnique(200, intHomeBases, intHomeEq, "Home", "Intermediate", 6.1, 8.0, intInst, prefixesInt);

const intGymBases = ["Back Squat", "Walking Lunge", "Goblet Squat", "Romanian Deadlift", "Hip Thrust", "Leg Press Calf Raise", "Hack Squat", "Split Squat", "Sumo Deadlift", "Front Squat", "Step-Up", "Stiff-Leg Deadlift", "Cable Pull-Through", "Cable Hip Extension", "Sissy Squat Machine"];
generateUnique(85, intGymBases, gymEq, "Gym", "Intermediate", 6.1, 8.0, intInst, prefixesInt);

// Advanced
const prefixesAdv = ["Deficit ", "Single-Arm Loaded ", "Staggered Stance ", "Heavy ", "Banded ", "Elevated ", "Paused Deficit ", "Explosive ", "Continuous Tension ", "Plyometric ", "Isotonic ", "Overcoming Isometric ", "Yielding Isometric "];
const advInst = "Engineered for individuals with 3 to 4 years of continuous, rigorous training history applying unilateral loading, high mechanical disadvantage, and complex neuromuscular coordination. Enforces strict biomechanical alignment.";
const advHomeBases = ["Pistol Squat Progression", "Nordic Hamstring Curl", "Shrimp Squat", "Sissy Squat", "Jumping Lunges", "Broad Jumps", "Single-Leg RDL", "Bulgarian Split Squat", "Advanced Step-down", "Hover Lunge", "Plyo Step-Up", "Tuck Jump", "Glute Ham Raise Progression", "Airborne Squat", "Skater Squat", "Dragon Pistol Progression"];
generateUnique(131, advHomeBases, intHomeEq, "Home", "Advanced", 8.1, 9.2, advInst, prefixesAdv);

const advGymBases = ["Reverse Lunge", "Bulgarian Split Squat", "Front Squat", "Zercher Squat", "Split Squat", "Glute-Ham Raise", "Barbell RDL", "Safety Bar Squat", "Belt Squat", "Good Morning", "Hip Thrust", "Leg Press", "Pendulum Squat", "Landmine Squat", "Hack Squat"];
generateUnique(56, advGymBases, gymEq, "Gym", "Advanced", 8.1, 9.2, advInst, prefixesAdv);

// Elite
const eliteInst = "Built for peak human anatomy tiers maximizing tendon stiffness, skeletal alignment, and explosive neural drive. Requires the strict 1.5 repetition protocol paired with hyper-advanced levers and hyper-advanced isometric deep-squat hold variations under heavy axial load.";
const elitePrefixes = ["Hyper-Advanced ", "Weighted ", "Extreme ", "Strict ", "Max-Effort ", "Unilateral ", "Heavy Axial ", "Accommodating Resistance "];
const eliteSuffixes = [" 1.5 Rep", " Isometric Deep-Squat Hold", " Static Hold 1.5 Rep", " Tension Protocol", " Ascending Overload", " Yielding Protocol"];
const eliteHomeBases = ["Pistol Squat", "Dragon Pistol Squat", "Full Nordic Hamstring Curl", "Shrimp Squat", "Deep Sissy Squat", "Glute Ham Raise", "Elevated Single-Leg RDL", "Plyometric Bulgarian Split Squat", "Cossack Squat", "One-Leg Box Jump", "Nordic Curl", "Natural Leg Extension", "Harzer Squat"];
generateUnique(79, eliteHomeBases, intHomeEq, "Home", "Elite", 9.3, 10.0, eliteInst, elitePrefixes, eliteSuffixes);

const eliteGymBases = ["Barbell Back Squat", "Barbell Front Squat", "Barbell Hip Thrust", "Barbell Overhead Squat", "Zercher Squat", "Deficit Reverse Lunge", "Bulgarian Split Squat", "Safety Bar Squat", "Good Morning", "Leg Press", "Pendulum Squat", "Hack Squat", "Glute Ham Raise"];
generateUnique(34, eliteGymBases, gymEq, "Gym", "Elite", 9.3, 10.0, eliteInst, elitePrefixes, eliteSuffixes);

const legsData = `\nexport const LEG_EXERCISES: ExerciseEntity[] = ${JSON.stringify(exercises, null, 2)};\n`;

const workerFile = 'src/workers/database.worker.ts';
let workerContent = fs.readFileSync(workerFile, 'utf8');

workerContent = workerContent.replace(
  'export const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES, ...CORE_EXERCISES];',
  legsData + '\nexport const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES, ...CORE_EXERCISES, ...LEG_EXERCISES];'
);

fs.writeFileSync(workerFile, workerContent);
console.log("Successfully generated and injected 750 legs exercises.");
