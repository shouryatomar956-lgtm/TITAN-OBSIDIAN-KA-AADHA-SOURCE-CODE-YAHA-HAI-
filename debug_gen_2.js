const MUSCLE_GROUPS = [
  'Arms', 'Legs', 'Core', 'Cardio', 
  'Back', 'Chest', 'Explosiveness', 
  'Neck Strength', 'Tendons and Bones'
];

const TIER_TARGETS = {
  Beginner: 900,
  Intermediate: 1200,
  Advanced: 800,
  Elite: 600
};

const BASES = {
  Beginner: {
    'Arms': ['Wall Bicep Curl', 'Assisted Tricep Dip', 'Band Pushdown', 'Light Dumbbell Curl'],
    'Legs': ['Wall Sit', 'Assisted Squat', 'Glute Bridge', 'Step-Up', 'Knee Extension'],
    'Core': ['Knee Plank', 'Deadbug', 'Bird Dog', 'Assisted Crunch', 'Pelvic Tilt'],
    'Cardio': ['March in Place', 'Step Jacks', 'Seated Punches', 'Wall Mountain Climbers'],
    'Back': ['Wall Pull', 'Band Row', 'Superman Hold', 'Prone Cobra', 'Assisted Inverted Row'],
    'Chest': ['Wall Push-Up', 'Incline Push-Up', 'Band Chest Press', 'Knee Push-Up'],
    'Explosiveness': ['Assisted Jump', 'Speed Step-Up', 'Wall Plys', 'Light Medicine Ball Toss'],
    'Neck Strength': ['Isometric Neck Hold', 'Band Neck Flexion', 'Wall Neck Support', 'Manual Resistance Neck'],
    'Tendons and Bones': ['Static Wall Hold', 'Slow Step-Down', 'Assisted Calf Raise', 'Band Isometric Hold']
  },
  Intermediate: {
    'Arms': ['Standard Curl', 'Triceps Extension', 'Hammer Curl', 'Skullcrusher', 'Preacher Curl'],
    'Legs': ['Bodyweight Squat', 'Walking Lunge', 'Romanian Deadlift', 'Goblet Squat', 'Leg Press'],
    'Core': ['Standard Plank', 'Russian Twist', 'Bicycle Crunch', 'V-Up', 'Leg Raise'],
    'Cardio': ['Burpee', 'Jumping Jacks', 'High Knees', 'Mountain Climber', 'Jump Rope'],
    'Back': ['Pull-Up', 'Dumbbell Row', 'Lat Pulldown', 'T-Bar Row', 'Back Extension'],
    'Chest': ['Standard Push-Up', 'Dumbbell Bench Press', 'Cable Fly', 'Decline Push-Up', 'Incline Press'],
    'Explosiveness': ['Jump Squat', 'Broad Jump', 'Clapping Push-Up', 'Kettlebell Swing', 'Box Jump'],
    'Neck Strength': ['Weighted Neck Flexion', 'Neck Harness Extension', 'Wrestlers Bridge', 'Shrug'],
    'Tendons and Bones': ['Farmers Walk', 'Loaded Carry', 'Slow Eccentric Squat', 'Suitcase Carry']
  },
  Advanced: {
    'Arms': ['Strict Curl', 'Archer Dip', 'Deficit Pushdown', 'Spider Curl', 'Overhead Tricep Extension'],
    'Legs': ['Pistol Squat', 'Bulgarian Split Squat', 'Sissy Squat', 'Heavy Front Squat', 'Nordic Hamstring Curl'],
    'Core': ['Dragon Flag', 'Ab Wheel Rollout', 'L-Sit', 'Windshield Wipers', 'Human Flag Progression'],
    'Cardio': ['Sprint Intervals', 'Double Unders', 'Weighted Burpee', 'Assault Bike Sprint', 'Rucking'],
    'Back': ['Muscle-Up', 'Front Lever', 'One-Arm Row', 'Pendlay Row', 'Weighted Pull-Up'],
    'Chest': ['Archer Push-Up', 'Guillotine Press', 'Ring Dip', 'Weighted Dips', 'Plyo Push-Up'],
    'Explosiveness': ['Depth Jump', 'Power Clean', 'Snatch', 'Plyo Muscle-Up', 'Explosive Lunge'],
    'Neck Strength': ['Heavy Plate Neck Curl', 'Advanced Wrestlers Bridge', 'Heavy Barbell Shrug', 'Bite Hold'],
    'Tendons and Bones': ['Heavy Yoke Carry', 'Overload Lockout', 'Zercher Carry', 'Iron Cross Progression']
  },
  Elite: {
    'Arms': ['Victorian Cross Press', 'One-Arm Tricep Extension', 'Impossible Dip', 'Maltese Press', 'Hefesto'],
    'Legs': ['Weighted Pistol Squat', 'Heavy Zercher Squat', 'Extreme Deficit Deadlift', 'Jumping Pistol Squat', 'Shrimp Squat'],
    'Core': ['Full Human Flag', 'Weighted Dragon Flag', 'Manna', 'Strict Front Lever', 'One-Arm L-Sit'],
    'Cardio': ['Weighted Sprint', 'High-Altitude Mask Sprint', 'Heavy Sled Push', 'Weighted Vest Muscle-Ups', 'Extreme Rucking'],
    'Back': ['One-Arm Pull-Up', 'Iron Cross Pull', 'Weighted Front Lever', 'Heavy Rack Pull', 'Victorian Hold'],
    'Chest': ['90-Degree Push-Up', 'Planche Push-Up', 'Heavy Floor Press', 'Crucifix Fly', 'Ring Planche Press'],
    'Explosiveness': ['Weighted Muscle-Up', 'Heavy Hang Clean', 'Explosive Planche', 'Backflip Burpee', 'Clapping Muscle-Up'],
    'Neck Strength': ['Extreme Harness Extension', 'Max Axle Shrug', 'Unsupported Neck Bridge', 'Heavy Isometric Neck'],
    'Tendons and Bones': ['Super Heavy Rack Hold', 'Max Effort Yoke', 'Strict Iron Cross', 'Heavy Overload Support']
  }
};

const EQUIP_HOME = ['Bodyweight', 'Backpack-weighted', 'Minimal Structural Support', 'Resistance Bands'];
const EQUIP_GYM = ['Olympic Barbell', 'Heavy Cable Machine Stack', 'Commercial Power Rack', 'Pin-loaded Leverage System'];

const ADJECTIVES = ['Incline', 'Decline', 'Seated', 'Standing', 'Lying', 'Reverse', 'Alternating', 'Single-Arm', 'Single-Leg', 'Strict', 'Deficit', 'Elevated', 'Paused', 'Tempo', 'Isometric', 'Dynamic', 'Banded', 'Close-Grip', 'Wide-Grip', 'Neutral-Grip'];
const PROTOCOLS = ['', '(Max Reps)', '(To Failure)', '(Drop Set)', '(Cluster Set)', '(Burnout)', '(Myo-Reps)', '(AMRAP)', '(Timed Hold)', '(Pre-Exhaust)'];

class BloomFilterSimulator {
  memory = new Set();
  normalize(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  has(name) {
    return this.memory.has(this.normalize(name));
  }
  add(name) {
    this.memory.add(this.normalize(name));
  }
}

const filter = new BloomFilterSimulator();
const database = [];
let globalIndex = 0;

const TARGETS = {
  'Arms': 500,
  'Legs': 450,
  'Core': 200,
  'Cardio': 300,
  'Back': 600,
  'Chest': 500,
  'Explosiveness': 300,
  'Neck Strength': 300,
  'Tendons and Bones': 400
};
const tiers = Object.keys(TIER_TARGETS);

let duplicatedCount = 0;

for (const [group, totalTarget] of Object.entries(TARGETS)) {
  const homeTarget = Math.round(totalTarget * 0.7);
  const gymTarget = totalTarget - homeTarget;
  
  const generateForEnv = (target, isHome) => {
    let currentCount = 0;
    let iteration = 0;
    while (currentCount < target) {
      const tier = tiers[iteration % tiers.length];
      const tierBases = BASES[tier][group];
      const base = tierBases[(iteration * 7) % tierBases.length];
      
      const eqPool = isHome ? EQUIP_HOME : EQUIP_GYM;
      const eq = eqPool[iteration % eqPool.length];
      
      const adj = ADJECTIVES[(iteration * 13) % ADJECTIVES.length];
      const prot = PROTOCOLS[(iteration * 17) % PROTOCOLS.length];
      let rawName = adj + " " + base;
      
      if (tier === 'Elite') {
          rawName = eq + " " + base + " 1.5 Rep";
      } else if (iteration % 3 === 0) {
          rawName = eq + " " + adj + " " + base;
      }
      if (prot && tier !== 'Elite') {
          rawName += " " + prot;
      }
      
      // We had iteration > 200 appended 'Var' which caused things like 'Incline Bicep Curl Var 201' for multiple muscle groups maybe?
      if (iteration > 200) {
        rawName += " Var " + iteration;
      }
      
      rawName = rawName.replace(/\s+/g, ' ').trim();
      rawName = rawName.replace(/Bodyweight Bodyweight/gi, 'Bodyweight');

      if (!filter.has(rawName)) {
         filter.add(rawName);
         database.push({ name: rawName, muscleGroup: group, equipmentNeeded: eq });
         globalIndex++;
         currentCount++;
      } else {
         duplicatedCount++;
      }
      iteration++;
      if (iteration > 20000) break;
    }
  };
  
  generateForEnv(homeTarget, true);
  generateForEnv(gymTarget, false);
}

console.log("Total generated:", database.length);
console.log("Total collisions in Bloom Filter:", duplicatedCount);

// Let's print out the first 10 with "Var"
console.log(database.filter(x => x.name.includes("Var")).slice(0, 10));

