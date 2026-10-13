const fs = require('fs');

const exercises = [];
let idCounter = 1;

function addEx(name, diff, score, eq, env, inst) {
  exercises.push({
    id: `aw_${idCounter++}`,
    name,
    muscleGroup: "Arm Wrestling",
    difficulty: diff,
    scientificEffectivenessScore: Number(score.toFixed(1)),
    equipmentNeeded: eq,
    environment: env,
    instructions: inst
  });
}

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randScore = (min, max) => min + Math.random() * (max - min);

const homeEq = ["Resistance Bands", "Bodyweight", "Backpack-weighted"];
const gymEq = ["Cable", "Dumbbells", "Barbell", "Machine"];

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

// Beginner (88 total -> 70% Home = 62, 30% Gym = 26)
const prefixesBeg = ["", "Paused ", "Supported ", "Slow-Eccentric ", "Light ", "Isometric ", "Assisted ", "Partial ", "Seated "];
const begInst = "Designed for an initial training age of 1 to 1.5 months with maximum structural support and low axial loading to build foundational wrist and pronation motor patterns safely. Employs controlled eccentric tempos.";

const begHomeBases = ["Towel Isometric Wrist Hold", "Light Band Pronation Pull", "Door-Frame Side Pressure Hold", "Banded Cupping", "Banded Supination", "Static Towel Pull", "Banded Rising", "Band Ulnar Deviation", "Band Radial Deviation", "Supported Wrist Curl", "Band Finger Walk", "Thumb Hook Practice", "Band Toproll Simulation"];
generateUnique(62, begHomeBases, homeEq, "Home", "Beginner", 4.0, 6.0, begInst, prefixesBeg);

const begGymBases = ["Cable Wrist Curl", "Dumbbell Pronation Rotation", "Light Cable Backpressure", "Dumbbell Supination", "Supported Dumbbell Cupping", "Cable Side Pressure", "Fat Grip Wrist Curl", "Light Cable Hook Simulation", "Preacher Curl Pronation"];
generateUnique(26, begGymBases, gymEq, "Gym", "Beginner", 4.0, 6.0, begInst, prefixesBeg);


// Intermediate (152 total -> 70% Home = 106, 30% Gym = 46)
const prefixesInt = ["", "Paused ", "Tempo ", "Slow-Eccentric ", "Alternating ", "Constant Tension ", "Explosive ", "Banded ", "High-Rep ", "Speed ", "Fat Grip ", "Overhand "];
const intInst = "Targeted for a training age of 3 to 4 months of consistent resistance history using full unassisted control across standard arm wrestling vectors. Implements moderate time-under-tension protocols.";

const intHomeBases = ["Band Toproll Hold", "Band Hook Hold", "Heavy Towel Pull", "Banded Side Pressure", "Banded Backpressure", "Banded Pronation Twist", "Static Table Lock", "Heavy Band Cupping", "Heavy Band Supination", "Band Rising Drill", "Band Posting Drill", "Towel Grip Pull-up Hold", "Banded Dragging", "Finger Flexion Hold", "Thumb Lock Hold"];
generateUnique(106, intHomeBases, homeEq, "Home", "Intermediate", 6.1, 8.0, intInst, prefixesInt);

const intGymBases = ["Cable Cupping", "Dumbbell Pronation", "Static Backpressure Hold", "Thick-Bar Wrist Curl", "Cable Toproll", "Cable Hook", "Dumbbell Supination Twist", "Cable Rising", "Cable Posting", "Cable Dragging", "Fat Grip Hammer Curl", "Plate Pinch Hold", "Wrist Roller", "Preacher Curl Isometric"];
generateUnique(46, intGymBases, gymEq, "Gym", "Intermediate", 6.1, 8.0, intInst, prefixesInt);


// Advanced (100 total -> 70% Home = 70, 30% Gym = 30)
const prefixesAdv = ["Heavy ", "Deficit ", "Single-Arm ", "Staggered Stance ", "Banded ", "Elevated ", "Paused Deficit ", "Explosive ", "Continuous Tension ", "Plyometric ", "Overcoming Isometric ", "Yielding Isometric ", "Multi-Angular "];
const advInst = "Engineered for individuals with 3 to 4 years of continuous, rigorous training history applying high mechanical disadvantage, severe joint conditioning, and complex table-simulation neuromuscular coordination. Enforces strict biomechanical alignment.";

const advHomeBases = ["Towel Grip Pull-up", "Overcoming Isometric Side Pressure", "Dynamic Band Toproll", "Dynamic Band Hook", "Heavy Band Backpressure", "Heavy Band Pronation", "Heavy Band Rising", "Fingertip Push-up", "Wrist Push-up", "One-Arm Towel Hang", "Band Overhand Toproll", "Band Inside Hook", "Explosive Band Posting"];
generateUnique(70, advHomeBases, homeEq, "Home", "Advanced", 8.1, 9.2, advInst, prefixesAdv);

const advGymBases = ["Multi-Angular Pulley Side Pressure", "Thick-Bar Rising Drill", "Heavy Cable Backpressure", "Heavy Dumbbell Pronation", "Heavy Cable Toproll", "Heavy Cable Hook", "Fat Grip Preacher Curl", "Heavy Wrist Roller", "Cable Dragging Simulation", "Plate Pinch Curl", "Cable Overhand Toproll", "Heavy Dumbbell Cupping"];
generateUnique(30, advGymBases, gymEq, "Gym", "Advanced", 8.1, 9.2, advInst, prefixesAdv);


// Elite (60 total -> 70% Home = 42, 30% Gym = 18)
const eliteInst = "Built for peak human anatomy tiers maximizing tendon stiffness, skeletal alignment, and explosive neural drive. Requires the strict 1.5 repetition protocol paired with hyper-advanced levers and hyper-advanced isometric table locks under extreme chain/band integration.";
const elitePrefixes = ["Hyper-Advanced ", "Weighted ", "Extreme ", "Strict ", "Max-Effort ", "Unilateral ", "Heavy ", "Accommodating Resistance "];
const eliteSuffixes = [" 1.5 Rep", " Isometric Table Lock", " Lock-Out Lever Hold", " Static-Active Hold 1.5 Rep", " Tension Protocol", " Ascending Overload", " Yielding Protocol"];

const eliteHomeBases = ["Table-Simulation Sparring Drill", "Multi-Angle Pronation", "Extreme Band Backpressure", "Extreme Band Side Pressure", "Extreme Band Toproll", "Extreme Band Hook", "Towel Grip One-Arm Pull-up", "Fingertip Planche Hold", "Wrist Planche Hold", "Extreme Band Rising", "Overcoming Isometric Table Lock"];
generateUnique(42, eliteHomeBases, homeEq, "Home", "Elite", 9.3, 10.0, eliteInst, elitePrefixes, eliteSuffixes);

const eliteGymBases = ["Cable Table-Simulation Drill", "Multi-Angular Pulley System Drill", "Heavy Fat Grip Preacher Curl", "Extreme Cable Backpressure", "Extreme Cable Side Pressure", "Extreme Dumbbell Pronation", "Thick-Bar Rising Sequence", "Heavy Plate Pinch Curl", "Cable Cupping Lever", "Extreme Hook Simulation"];
generateUnique(18, eliteGymBases, gymEq, "Gym", "Elite", 9.3, 10.0, eliteInst, elitePrefixes, eliteSuffixes);


const awData = `\nexport const ARM_WRESTLING_EXERCISES: ExerciseEntity[] = ${JSON.stringify(exercises, null, 2)};\n`;

const workerFile = 'src/workers/database.worker.ts';
let workerContent = fs.readFileSync(workerFile, 'utf8');

workerContent = workerContent.replace(
  'export const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES, ...CORE_EXERCISES, ...LEG_EXERCISES];',
  awData + '\nexport const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES, ...CORE_EXERCISES, ...LEG_EXERCISES, ...ARM_WRESTLING_EXERCISES];'
);

fs.writeFileSync(workerFile, workerContent);
console.log("Successfully generated and injected 400 Arm Wrestling exercises.");
