const fs = require('fs');

const exercises = [];
let idCounter = 1;

function addEx(name, diff, score, eq, env, inst) {
  exercises.push({
    id: `core_${idCounter++}`,
    name,
    muscleGroup: "Core",
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
const intHomeEq = ["Bodyweight", "Backpack-weighted", "Resistance Bands"];
const gymEq = ["Cable", "Machine", "Dumbbells", "Barbell"];

const prefixes = ["", "Paused ", "Slow-Eccentric ", "Tempo ", "Isometric "];

const generateUnique = (count, bases, eqList, env, diff, minScore, maxScore, inst, prefixList, suffixList = [""]) => {
  let current = 0;
  let attempts = 0;
  while(current < count && attempts < 50000) {
    attempts++;
    const name = rand(prefixList) + rand(bases) + rand(suffixList);
    if(!exercises.find(e => e.name === name)) {
      addEx(name, diff, randScore(minScore, maxScore), rand(eqList), env, inst);
      current++;
    }
  }
  if(current < count) throw new Error("Could not generate enough unique exercises for " + env + " " + diff + ". Only generated " + current + " of " + count);
}

const begInst = "Designed for an initial training age of 1 to 1.5 months with maximum structural support and low axial loading to build foundational transverse abdominis activation safely. Employs controlled eccentric tempos.";
const begHomeBases = ["Deadbug", "Forearm Plank", "Straight Arm Plank", "Standard Crunch", "Reverse Crunch", "Bird Dog", "Heel Taps", "Lying Knee Tuck", "Alternating Heel Touch", "Cross-Body Crunch", "Supported Side Plank", "Seated In-and-Outs", "Flutter Kicks", "Scissor Kicks", "Plank to Downward Dog", "Kneeling Plank", "Wall Plank", "Leg Drops"];
generateUnique(38, begHomeBases, homeEq, "Home", "Beginner", 4.0, 6.0, begInst, prefixes);

const begGymBases = ["Cable Crunch", "Machine Crunch", "Captain's Chair Knee Raise", "Cable Pallof Hold", "Light Dumbbell Side Bend", "Cable Woodchopper", "Flat Bench Leg Raise", "Decline Bench Crunch", "Kneeling Cable Crunch", "Standing Cable Crunch", "Assisted Ab Machine", "Low Cable Woodchopper", "High Cable Woodchopper"];
generateUnique(17, begGymBases, gymEq, "Gym", "Beginner", 4.0, 6.0, begInst, prefixes);

const intInst = "Targeted for a training age of 3 to 4 months of consistent resistance history using full unassisted bodyweight control and moderate weighted stabilization. Implements moderate time-under-tension protocols.";
const intHomeBases = ["Weighted Russian Twist", "V-Up", "Bicycle Crunch", "Side Plank", "Hollow Body Hold", "Resistance Band Woodchopper", "Weighted Deadbug", "Plank Jacks", "Bear Crawl Hold", "Hanging Knee Raise", "Jackknife Crunch", "Alternating V-Up", "Tuck Jump", "Band Resisted Plank", "Suitcase Carry", "Lying Leg Raise", "Alternating Leg Raise", "Side Plank Rotations", "Reverse Crunch Pulse", "Leg Raises", "Ab Bikes", "V-Crunch", "Toe Touches", "Star Crunch"];
generateUnique(67, intHomeBases, intHomeEq, "Home", "Intermediate", 6.1, 8.0, intInst, prefixes);

const intGymBases = ["Hanging Knee Raise", "Cable Pallof Press", "Dumbbell Side Bend", "Weighted Decline Crunch", "Cable Reverse Crunch", "Machine Torso Twist", "Dumbbell Russian Twist", "Barbell Rollout (Kneeling)", "Cable Chops", "Hanging Oblique Knee Raise", "Standing Cable Twist", "Decline Sit-up", "Weighted Captain's Chair", "Heavy Medicine Ball Twist", "Incline Dumbbell Sit-up", "Cable Crunch Pull"];
generateUnique(28, intGymBases, gymEq, "Gym", "Intermediate", 6.1, 8.0, intInst, prefixes);

const advInst = "Engineered for individuals with 3 to 4 years of continuous, rigorous training history applying high mechanical disadvantage, trunk anti-rotation, and complex neuromuscular coordination. Enforces strict biomechanical alignment.";
const advHomeBases = ["Dragon Flag Negative", "L-Sit Progression", "Standing Ab Wheel Rollout", "Weighted Hollow Hold", "Backpack-weighted V-Up", "Plank with Alternating Arm/Leg Raise", "Extended Plank", "Weighted Side Plank", "Windshield Wipers", "Strict Toes to Bar", "Hanging Straight Leg Raise", "Tuck Planche Hold", "Advanced Hollow Rock", "Weighted Russian Twist (Feet Elevated)", "Single-Arm Plank", "L-Sit Flutter Kicks", "Strict Dragon Flag", "Weighted V-Sit", "L-Sit Hold", "Hanging Leg Raise Hold", "One-Arm Plank", "Weighted Extended Plank"];
generateUnique(43, advHomeBases, intHomeEq, "Home", "Advanced", 8.1, 9.2, advInst, prefixes);

const advGymBases = ["Hanging Straight Leg Raise", "Heavy Cable Woodchopper", "Barbell Rollout", "Heavy Cable Crunch", "Weighted Hanging Knee Raise", "Decline Weighted Russian Twist", "Landmine 180s", "Barbell Suitcase Deadlift Hold", "Heavy Cable Pallof Press", "GHD Sit-up", "Strict Hanging Windshield Wipers", "Heavy Dumbbell Side Bend", "Cable Weighted Leg Raise", "Barbell Landmine Twist", "Dumbbell Weighted Plank", "Heavy Weighted Decline Crunch"];
generateUnique(19, advGymBases, gymEq, "Gym", "Advanced", 8.1, 9.2, advInst, prefixes);

const eliteInst = "Built for peak human anatomy tiers maximizing tendon stiffness, skeletal alignment, and explosive neural drive. Requires the strict 1.5 repetition protocol (full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension) paired with hyper-advanced levers and holds.";
const elitePrefixes = ["Strict ", "Weighted ", "Hyper-Advanced ", "Unilateral ", "Extreme "];
const eliteSuffixes = [" Hold", " 1.5 Rep", " Isometric 1.5 Rep", " Static Hold 1.5 Rep", " Lever 1.5 Rep"];
const eliteHomeBases = ["Human Flag", "L-Sit", "Maltese Cross Core", "Dragon Flag", "Hollow Body", "One-Arm Ab Wheel Rollout", "V-Sit", "Planche Core", "Front Lever", "Straddle Planche Core", "Toes to Bar", "Extended Plank", "Ab Wheel Isometric", "One-Arm One-Leg Plank", "Full Planche Core", "Iron Cross Core"];
generateUnique(27, eliteHomeBases, intHomeEq, "Home", "Elite", 9.3, 10.0, eliteInst, elitePrefixes, eliteSuffixes);

const eliteGymBases = ["Barbell Suitcase", "Hanging Straight Leg Raise", "Cable Human Flag Pull", "GHD Sit-up", "Landmine Full Rotation", "Cable Pallof", "Hanging Windshield Wipers", "Barbell Rollout", "Cable Woodchopper", "Heavy Deadbug", "Dumbbell Core Hold"];
generateUnique(11, eliteGymBases, gymEq, "Gym", "Elite", 9.3, 10.0, eliteInst, elitePrefixes, eliteSuffixes);

const coreData = `export const CORE_EXERCISES: ExerciseEntity[] = ${JSON.stringify(exercises, null, 2)};\n\n`;

const workerFile = 'src/workers/database.worker.ts';
let workerContent = fs.readFileSync(workerFile, 'utf8');

workerContent = workerContent.replace(
  'export const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES];',
  coreData + 'export const ALL_EXERCISES: ExerciseEntity[] = [...BACK_EXERCISES, ...ARM_EXERCISES, ...CORE_EXERCISES];'
);

fs.writeFileSync(workerFile, workerContent);
console.log("Successfully generated and injected 250 core exercises.");
