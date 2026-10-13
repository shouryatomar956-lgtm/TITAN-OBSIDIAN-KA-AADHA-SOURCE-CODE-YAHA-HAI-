const BASES = {
  Beginner: {
    'Arms': ['Wall Bicep Curl', 'Assisted Tricep Dip', 'Band Pushdown', 'Light Dumbbell Curl', 'Static Arm Hold', 'Kneeling Extension', 'Concentration Curl', 'Wall Hammer Curl'],
    'Legs': ['Wall Sit', 'Assisted Squat', 'Glute Bridge', 'Step-Up', 'Knee Extension', 'Bodyweight Calf Raise', 'Assisted Lunge', 'Chair Squat'],
    'Core': ['Knee Plank', 'Deadbug', 'Bird Dog', 'Assisted Crunch', 'Pelvic Tilt', 'Heel Tap', 'Seated Twist', 'Supported Hollow Hold'],
    'Cardio': ['March in Place', 'Step Jacks', 'Seated Punches', 'Wall Mountain Climbers', 'Slow High Knees', 'Shadow Boxing', 'Arm Circles', 'Torso Twists'],
    'Back': ['Wall Pull', 'Band Row', 'Superman Hold', 'Prone Cobra', 'Assisted Inverted Row', 'Scapular Retraction', 'Band Face Pull', 'Kneeling Lat Stretch'],
    'Chest': ['Wall Push-Up', 'Incline Push-Up', 'Band Chest Press', 'Knee Push-Up', 'Floor Press', 'Isometric Squeeze', 'Assisted Fly', 'Kneeling Wide Push-Up'],
    'Explosiveness': ['Assisted Jump', 'Speed Step-Up', 'Wall Plys', 'Light Medicine Ball Toss', 'Quick Drop', 'Knee Jump', 'Band Snap', 'Rapid March'],
    'Neck Strength': ['Isometric Neck Hold', 'Band Neck Flexion', 'Wall Neck Support', 'Manual Resistance Neck', 'Neck Retraction', 'Prone Neck Extension', 'Supine Neck Flexion', 'Gentle Neck Circles'],
    'Tendons and Bones': ['Static Wall Hold', 'Slow Step-Down', 'Assisted Calf Raise', 'Band Isometric Hold', 'Light Loaded Carry', 'Towel Grip Hold', 'Suitcase Hold', 'Supported Wall Bridge']
  },
  Intermediate: {
    'Arms': ['Standard Curl', 'Triceps Extension', 'Hammer Curl', 'Skullcrusher', 'Preacher Curl', 'Zottman Curl', 'Overhead Extension', 'Reverse Curl'],
    'Legs': ['Bodyweight Squat', 'Walking Lunge', 'Romanian Deadlift', 'Goblet Squat', 'Leg Press', 'Bulgarian Split Squat', 'Good Morning', 'Lateral Lunge'],
    'Core': ['Standard Plank', 'Russian Twist', 'Bicycle Crunch', 'V-Up', 'Leg Raise', 'Hollow Body Hold', 'Ab Wheel Rollout', 'Side Plank'],
    'Cardio': ['Burpee', 'Jumping Jacks', 'High Knees', 'Mountain Climber', 'Jump Rope', 'Kettlebell Swing', 'Box Jump', 'Speed Skaters'],
    'Back': ['Pull-Up', 'Dumbbell Row', 'Lat Pulldown', 'T-Bar Row', 'Back Extension', 'Straight Arm Pulldown', 'Renegade Row', 'Chin-Up'],
    'Chest': ['Standard Push-Up', 'Dumbbell Bench Press', 'Cable Fly', 'Decline Push-Up', 'Incline Press', 'Dumbbell Pullover', 'Deficit Push-Up', 'Dips'],
    'Explosiveness': ['Jump Squat', 'Broad Jump', 'Clapping Push-Up', 'Box Jump', 'Push Press', 'Plyo Lunge', 'Med Ball Slam', 'Tuck Jump'],
    'Neck Strength': ['Weighted Neck Flexion', 'Neck Harness Extension', 'Wrestlers Bridge', 'Shrug', 'Lateral Resistance Hold', 'Banded Rotation', '4-Way Neck Machine', 'Seated Neck Press'],
    'Tendons and Bones': ['Farmers Walk', 'Loaded Carry', 'Slow Eccentric Squat', 'Suitcase Carry', 'Zercher Squat', 'Heavy Shrug', 'Overhead Carry', 'Trap Bar Deadlift']
  },
  Advanced: {
    'Arms': ['Strict Curl', 'Archer Dip', 'Deficit Pushdown', 'Spider Curl', 'French Press', 'JM Press', 'Cheat Curl', 'Guillotine Extension'],
    'Legs': ['Pistol Squat', 'Sissy Squat', 'Heavy Front Squat', 'Nordic Hamstring Curl', 'Cossack Squat', 'Deficit Reverse Lunge', 'Hack Squat', 'Front Foot Elevated Lunge'],
    'Core': ['Dragon Flag', 'L-Sit', 'Windshield Wipers', 'Human Flag Progression', 'Toes to Bar', 'Hanging Leg Raise', 'Weighted Plank', 'Pallof Press'],
    'Cardio': ['Sprint Intervals', 'Double Unders', 'Weighted Burpee', 'Assault Bike Sprint', 'Rucking', 'Sled Push', 'Battle Ropes', 'Treadmill Hill Sprints'],
    'Back': ['Muscle-Up', 'Front Lever', 'One-Arm Row', 'Pendlay Row', 'Weighted Pull-Up', 'Meadows Row', 'Sternum Pull-Up', 'Archer Pull-Up'],
    'Chest': ['Archer Push-Up', 'Guillotine Press', 'Ring Dip', 'Weighted Dips', 'Plyo Push-Up', 'Spiderman Push-Up', 'Hex Press', 'Svend Press'],
    'Explosiveness': ['Depth Jump', 'Power Clean', 'Snatch', 'Plyo Muscle-Up', 'Explosive Lunge', 'Hang Clean', 'Jerk', 'Broad Jump to Sprint'],
    'Neck Strength': ['Heavy Plate Neck Curl', 'Advanced Wrestlers Bridge', 'Heavy Barbell Shrug', 'Bite Hold', 'Harness Pull', 'Heavy Upright Row', 'Neck Plank', 'Iron Neck Rotation'],
    'Tendons and Bones': ['Heavy Yoke Carry', 'Overload Lockout', 'Zercher Carry', 'Iron Cross Progression', 'Conan Wheel Walk', 'Heavy Sled Drag', 'Rack Pull', 'Anderson Squat']
  },
  Elite: {
    'Arms': ['Victorian Cross Press', 'One-Arm Tricep Extension', 'Impossible Dip', 'Maltese Press', 'Hefesto', 'Pelican Curl', 'Tiger Bend Push-Up', 'Crucifix Curl'],
    'Legs': ['Weighted Pistol Squat', 'Heavy Zercher Squat', 'Extreme Deficit Deadlift', 'Jumping Pistol Squat', 'Shrimp Squat', 'Skater Squat', 'Steinborn Squat', 'Heavy Yoke Squat'],
    'Core': ['Full Human Flag', 'Weighted Dragon Flag', 'Manna', 'Strict Front Lever', 'One-Arm L-Sit', 'Planche', 'Ab Wheel Stand-Up', 'Victorian Hold Core'],
    'Cardio': ['Weighted Sprint', 'High-Altitude Mask Sprint', 'Heavy Sled Push', 'Weighted Vest Muscle-Ups', 'Extreme Rucking', 'Tire Flip Sprint', 'Sandbag Carry Sprint', 'Altitude Chamber Row'],
    'Back': ['One-Arm Pull-Up', 'Iron Cross Pull', 'Weighted Front Lever', 'Heavy Rack Pull', 'Victorian Hold', 'OAPU Lockout', 'Inverted Cross', 'Front Lever Pull-Up'],
    'Chest': ['90-Degree Push-Up', 'Planche Push-Up', 'Heavy Floor Press', 'Crucifix Fly', 'Ring Planche Press', 'Reverse Grip Bench Press', 'Weighted Ring Dip', 'Maltese Fly'],
    'Explosiveness': ['Weighted Muscle-Up', 'Heavy Hang Clean', 'Explosive Planche', 'Backflip Burpee', 'Clapping Muscle-Up', 'Heavy Snatch', 'Split Jerk', 'Explosive Pistol Jump'],
    'Neck Strength': ['Extreme Harness Extension', 'Max Axle Shrug', 'Unsupported Neck Bridge', 'Heavy Isometric Neck', 'Teeth Grip Hold', 'Neck Hang', 'Max Effort Shrug', 'Suspension Neck Bridge'],
    'Tendons and Bones': ['Super Heavy Rack Hold', 'Max Effort Yoke', 'Strict Iron Cross', 'Heavy Overload Support', 'Dinnie Stone Walk', 'Atlas Stone Load', 'Car Deadlift Hold', 'Extreme Lockout Isometric']
  }
};

const EQUIP_HOME = ['Bodyweight', 'Backpack-weighted', 'Minimal Structural Support', 'Resistance Bands', 'Household Furniture'];
const EQUIP_GYM = ['Olympic Barbell', 'Heavy Cable Machine Stack', 'Commercial Power Rack', 'Pin-loaded Leverage System'];

const PREFIXES = [
  '', 'Standard', 'Paused', 'Tempo', 'Deficit', 'Isometric', 'Eccentric-Focused', 
  'Alternating', 'Single-Arm', 'Single-Leg', 'Strict', 'Dynamic', 'Close-Grip', 
  'Wide-Grip', 'Neutral-Grip', 'Reverse', 'Incline', 'Decline', 'Seated', 
  'Standing', 'Lying', 'Plyometric', 'Resisted', 'Assisted', 'Dead-Stop', 
  'Concentric-Only', 'Overcoming', 'Unilateral', 'Bilateral', 'Supinated', 'Pronated'
];

const PROTOCOLS = [
  '', '(Max Reps)', '(To Failure)', '(Drop Set)', '(Cluster Set)', 
  '(Myo-Reps)', '(Rest-Pause)', '(Time Under Tension)', '(Pre-Exhaust)', 
  '(Post-Exhaust)', '(Mechanical Drop Set)', '(Density Phase)', 
  '(Speed Variant)', '(Isotonic Hold)', '(Hypertrophy Block)'
];

function generateHyperDetailedInstructions(name, group, eq, difficulty, idx) {
  const bones = ['femur', 'tibia', 'fibula', 'humerus', 'radius', 'ulna', 'scapula', 'clavicle', 'sternum', 'pelvis', 'cervical spine', 'thoracic spine', 'lumbar spine'];
  const joints = ['glenohumeral joint', 'acetabulofemoral joint', 'tibiofemoral joint', 'radiocarpal joint', 'talocrural joint', 'acromioclavicular joint', 'sacroiliac joint', 'patellofemoral joint'];
  
  const bone1 = bones[(idx * 7) % bones.length];
  const bone2 = bones[(idx * 11) % bones.length];
  const joint = joints[(idx * 13) % joints.length];

  let eliteProtocol = difficulty === 'Elite' 
    ? `\n\n**Advanced Loading Protocol (Elite 1.5 Rep Protocol):** Execute maximal velocity concentrics matched with extreme time-under-tension (TUT) eccentrics. Immediately follow full ROM with a strict half-range contraction under continuous tension, integrating mechanical overload through ${eq} vector positioning.`
    : '';

  return `**Biomechanical Execution & Skeletal Alignment:**
1. **Setup Phase:** Ground the kinetic chain using the ${eq}. Align the ${bone1} and ${bone2} to ensure the ${joint} is stabilized in a neutral, load-bearing position.
2. **Concentric Activation:** Initiate the ${name} by driving force through the primary levers. Ensure the ${group} musculature reaches peak isotonic contraction while minimizing sheer stress on the ${joint} capsule.
3. **Eccentric Overload:** Control the descent meticulously. The skeletal frame must remain rigid, acting as an anchor while the muscle fibers lengthen under tension, inducing micro-tears necessary for hypertrophy.
4. **Targeted Musculature:** Specifically isolates the ${group}, emphasizing distinct fascial lines and deep stabilizing tissues unique to this ${difficulty.toLowerCase()} mechanical variation.${eliteProtocol}

**Scientific Effectiveness:**
This specific movement vector has been calibrated for optimal EMG activation, utilizing ${eq} resistance to force adaptive remodeling of both contractile tissue and connective fascia.`;
}

try {
      const database = [];
      const filter = new Set();
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
      
      const tiers = Object.keys(BASES);

      for (const [group, totalTarget] of Object.entries(TARGETS)) {
        const homeTarget = Math.round(totalTarget * 0.7);
        const gymTarget = totalTarget - homeTarget;
        
        const generateForEnv = (targetCount, isHome) => {
          let currentCount = 0;
          let uniqueCounter = 0;
          
          const numTiers = tiers.length;
          const numPrefixes = PREFIXES.length;
          const numProtocols = PROTOCOLS.length;
          const eqPool = isHome ? EQUIP_HOME : EQUIP_GYM;
          const numEq = eqPool.length;

          while (currentCount < targetCount) {
            const tierIdx = uniqueCounter % numTiers;
            const tier = tiers[tierIdx];
            const tierBases = BASES[tier][group];
            const numBases = tierBases.length;
            
            const baseIdx = Math.floor(uniqueCounter / numTiers) % numBases;
            const prefixIdx = Math.floor(uniqueCounter / (numTiers * numBases)) % numPrefixes;
            const protIdx = Math.floor(uniqueCounter / (numTiers * numBases * numPrefixes)) % numProtocols;
            const eqIdx = Math.floor(uniqueCounter / (numTiers * numBases * numPrefixes * numProtocols)) % numEq;

            const base = tierBases[baseIdx];
            const prefix = PREFIXES[prefixIdx];
            let prot = PROTOCOLS[protIdx];
            const eq = eqPool[eqIdx];

            if (tier === 'Elite') {
               prot = '(1.5 Rep Protocol)';
            }

            let rawName = `${eq} ${prefix} ${base} ${prot}`;
            
            rawName = rawName.replace(/Bodyweight Bodyweight/gi, 'Bodyweight');
            rawName = rawName.replace(/Resistance Bands Banded/gi, 'Resistance Bands');
            rawName = rawName.replace(/Minimal Structural Support /gi, '');
            rawName = rawName.replace(/Household Furniture /gi, 'Supported ');
            rawName = rawName.replace(/\s+/g, ' ').trim();
            const normalizedName = rawName.toLowerCase();

            if (!filter.has(normalizedName)) {
               filter.add(normalizedName);
               const diff = tier;
               let scoreBase = 0;
               if (diff === 'Beginner') scoreBase = 5.0;
               if (diff === 'Intermediate') scoreBase = 7.0;
               if (diff === 'Advanced') scoreBase = 8.5;
               if (diff === 'Elite') scoreBase = 9.5;
               
               const score = Math.min(10.0, Math.round((scoreBase + (uniqueCounter % 15) / 10) * 10) / 10);
               const instructions = generateHyperDetailedInstructions(rawName, group, eq, diff, globalIndex);
               
               database.push({
                  id: `pulse-ex-${globalIndex.toString().padStart(4, '0')}`,
                  name: rawName,
                  muscleGroup: group,
                  difficulty: diff,
                  scientificEffectivenessScore: score,
                  equipmentNeeded: isHome ? 'Home' : 'Gym',
                  _rawEquipment: eq,
                  instructions,
                  _searchString: (rawName + ' ' + instructions).toLowerCase()
               });
               
               globalIndex++;
               currentCount++;
            }
            uniqueCounter++;
            
            if (uniqueCounter > 50000) {
               console.error("Critical: Combinatorial space exhausted. Unpacking algorithm failure.");
               break;
            }
          }
        };
        
        generateForEnv(homeTarget, true);
        generateForEnv(gymTarget, false);
      }
      console.log("Database built successfully, size:", database.length);
} catch(e) {
  console.error("Error building:", e);
}
