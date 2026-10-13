import fs from 'fs';

const workerCode = `import { ProbabilisticBloomFilter, SemanticCollisionEngine } from '../services/exerciseIndexer';
import localforage from 'localforage';

const ALLOCATION = {
  "Arms": { Beginner: 125, Intermediate: 170, Advanced: 125, Elite: 80 },
  "Legs": { Beginner: 110, Intermediate: 150, Advanced: 115, Elite: 75 },
  "Core": { Beginner: 55, Intermediate: 70, Advanced: 45, Elite: 30 },
  "Cardio": { Beginner: 80, Intermediate: 100, Advanced: 75, Elite: 45 },
  "Back": { Beginner: 150, Intermediate: 205, Advanced: 150, Elite: 95 },
  "Chest": { Beginner: 125, Intermediate: 170, Advanced: 125, Elite: 80 },
  "Explosiveness": { Beginner: 75, Intermediate: 105, Advanced: 75, Elite: 45 },
  "Neck Strength": { Beginner: 75, Intermediate: 100, Advanced: 75, Elite: 50 },
  "Tendons and Bones": { Beginner: 100, Intermediate: 130, Advanced: 110, Elite: 60 }
};

const BASES = {
  "Arms": {
     Beginner: ["Bicep Curl", "Tricep Extension", "Hammer Curl", "Pushdown", "Concentration Curl", "Kickback", "Preacher Curl"],
     Intermediate: ["Barbell Curl", "Dumbbell Extension", "Cable Curl", "Overhead Extension", "Skullcrusher", "Zottman Curl", "JM Press"],
     Advanced: ["Strict Curl", "Archer Extension", "Deficit Pushdown", "French Press", "Cheat Curl", "Tate Press", "Tiger Bend", "Pelican Curl"],
     Elite: ["Victorian Press", "One-Arm Extension", "Impossible Dip", "Maltese Press", "Hefesto", "Crucifix Curl"]
  },
  "Legs": {
     Beginner: ["Wall Sit", "Assisted Squat", "Glute Bridge", "Step-Up", "Leg Extension", "Calf Raise", "Assisted Lunge", "Chair Squat"],
     Intermediate: ["Bodyweight Squat", "Walking Lunge", "Romanian Deadlift", "Goblet Squat", "Leg Press", "Bulgarian Split Squat", "Good Morning", "Lateral Lunge"],
     Advanced: ["Pistol Squat", "Heavy Front Squat", "Nordic Hamstring Curl", "Cossack Squat", "Deficit Lunge", "Front Foot Elevated Lunge", "Shrimp Squat", "Skater Squat", "Anderson Squat"],
     Elite: ["Weighted Pistol Squat", "Heavy Zercher Squat", "Extreme Deficit Deadlift", "Jumping Pistol Squat", "Steinborn Squat", "Heavy Yoke Squat"]
  },
  "Core": {
     Beginner: ["Knee Plank", "Deadbug", "Bird Dog", "Assisted Crunch", "Pelvic Tilt", "Heel Tap", "Seated Twist", "Hollow Hold"],
     Intermediate: ["Standard Plank", "Russian Twist", "Bicycle Crunch", "V-Up", "Leg Raise", "Ab Wheel Rollout", "Side Plank", "Pallof Press"],
     Advanced: ["Dragon Flag", "L-Sit", "Windshield Wipers", "Human Flag Progression", "Toes to Bar", "Hanging Leg Raise", "Weighted Plank"],
     Elite: ["Full Human Flag", "Weighted Dragon Flag", "Manna", "Strict Front Lever", "One-Arm L-Sit", "Planche"]
  },
  "Cardio": {
     Beginner: ["March in Place", "Step Jacks", "Seated Punches", "Wall Climbers", "Slow High Knees", "Shadow Boxing", "Arm Circles"],
     Intermediate: ["Burpee", "Jumping Jacks", "High Knees", "Mountain Climber", "Jump Rope", "Kettlebell Swing", "Box Jump", "Speed Skaters"],
     Advanced: ["Sprint Intervals", "Double Unders", "Weighted Burpee", "Assault Bike Sprint", "Rucking", "Sled Push", "Battle Ropes"],
     Elite: ["Weighted Sprint", "High-Altitude Mask Sprint", "Heavy Sled Push", "Weighted Vest Muscle-Ups", "Extreme Rucking", "Tire Flip Sprint"]
  },
  "Back": {
     Beginner: ["Wall Pull", "Band Row", "Superman Hold", "Prone Cobra", "Assisted Inverted Row", "Scapular Retraction", "Face Pull"],
     Intermediate: ["Pull-Up", "Dumbbell Row", "Lat Pulldown", "T-Bar Row", "Back Extension", "Straight Arm Pulldown", "Chin-Up"],
     Advanced: ["Muscle-Up", "Front Lever Progression", "One-Arm Row", "Pendlay Row", "Weighted Pull-Up", "Sternum Pull-Up", "Archer Pull-Up"],
     Elite: ["One-Arm Pull-Up", "Iron Cross Pull", "Weighted Front Lever", "Heavy Rack Pull", "Victorian Hold", "Inverted Cross"]
  },
  "Chest": {
     Beginner: ["Wall Push-Up", "Incline Push-Up", "Band Chest Press", "Knee Push-Up", "Floor Press", "Isometric Squeeze", "Assisted Fly"],
     Intermediate: ["Standard Push-Up", "Bench Press", "Cable Fly", "Decline Push-Up", "Incline Press", "Dumbbell Pullover", "Dips"],
     Advanced: ["Archer Push-Up", "Guillotine Press", "Ring Dip", "Weighted Dips", "Plyo Push-Up", "Spiderman Push-Up", "Hex Press"],
     Elite: ["90-Degree Push-Up", "Planche Push-Up", "Heavy Floor Press", "Crucifix Fly", "Ring Planche Press", "Reverse Grip Bench Press"]
  },
  "Explosiveness": {
     Beginner: ["Assisted Jump", "Speed Step-Up", "Wall Plys", "Light Med Ball Toss", "Quick Drop", "Knee Jump", "Band Snap"],
     Intermediate: ["Jump Squat", "Broad Jump", "Clapping Push-Up", "Push Press", "Plyo Lunge", "Med Ball Slam", "Tuck Jump"],
     Advanced: ["Depth Jump", "Power Clean", "Snatch", "Plyo Muscle-Up", "Explosive Lunge", "Hang Clean", "Jerk"],
     Elite: ["Weighted Muscle-Up", "Heavy Hang Clean", "Explosive Planche", "Backflip Burpee", "Clapping Muscle-Up", "Heavy Snatch", "Split Jerk"]
  },
  "Neck Strength": {
     Beginner: ["Isometric Neck Hold", "Band Neck Flexion", "Wall Neck Support", "Manual Resistance", "Neck Retraction", "Prone Neck Extension", "Supine Neck Flexion"],
     Intermediate: ["Weighted Neck Flexion", "Neck Harness Extension", "Wrestlers Bridge", "Shrug", "Lateral Resistance Hold", "Banded Rotation"],
     Advanced: ["Heavy Plate Neck Curl", "Advanced Wrestlers Bridge", "Heavy Barbell Shrug", "Bite Hold", "Harness Pull", "Heavy Upright Row"],
     Elite: ["Extreme Harness Extension", "Max Axle Shrug", "Unsupported Neck Bridge", "Heavy Isometric Neck", "Teeth Grip Hold", "Neck Hang"]
  },
  "Tendons and Bones": {
     Beginner: ["Static Wall Hold", "Slow Step-Down", "Assisted Calf Raise", "Band Isometric Hold", "Light Loaded Carry", "Towel Grip Hold", "Suitcase Hold"],
     Intermediate: ["Farmers Walk", "Loaded Carry", "Slow Eccentric Squat", "Suitcase Carry", "Zercher Squat", "Heavy Shrug", "Overhead Carry"],
     Advanced: ["Heavy Yoke Carry", "Overload Lockout", "Zercher Carry", "Iron Cross Progression", "Conan Wheel Walk", "Heavy Sled Drag"],
     Elite: ["Super Heavy Rack Hold", "Max Effort Yoke", "Strict Iron Cross", "Heavy Overload Support", "Dinnie Stone Walk", "Atlas Stone Load"]
  }
};

const HOME_EQUIP = ["Bodyweight", "Backpack-weighted", "Resistance Bands", "Dumbbells", "None"];
const GYM_EQUIP = ["Machine", "Barbell", "Cable"];

function buildAuthenticName(tier: string, base: string, attempt: number) {
   if (attempt === 0) {
      if (tier === "Elite") return \`Weighted \${base} 1.5\`;
      return base;
   }
   
   const B_MODS = ["Assisted", "Wall-Supported", "Incline", "Decline", "Seated", "Kneeling", "Supported", "Machine", "Band-Assisted", "Light", "Modified", "Partial"];
   const I_MODS = ["Standard", "Dumbbell", "Barbell", "Cable", "Paused", "Tempo", "Alternating", "Single-Arm", "Wide-Grip", "Close-Grip", "Neutral-Grip", "Reverse-Grip", "Resistance Band", "Strict", "Dynamic"];
   const A_MODS = ["Plyometric", "Strict", "Overcoming", "Unilateral", "Archer", "Explosive", "Deficit", "Dead-Stop", "Banded", "Chain-Loaded", "Cluster Set", "Mechanical Drop Set", "Myo-Rep", "Rest-Pause", "Eccentric-Focused"];
   const E_PRE = ["Weighted", "Heavy", "Maximal", "Super-Heavy", "Extreme", "Suspended", "Deficit", "Strict", "Barbell", "Chain-Weighted", "Vest-Loaded"];
   const E_SUF = ["1.5", "Heavy", "1.5 Protocol", "Heavy 1.5", "Max", "(1.5 Reps)"];

   let name = base;
   if (tier === "Beginner") {
      let mod1 = B_MODS[attempt % B_MODS.length];
      let mod2 = B_MODS[Math.floor(attempt / B_MODS.length) % B_MODS.length];
      name = attempt < B_MODS.length ? \`\${mod1} \${base}\` : \`\${mod1} \${mod2} \${base}\`;
   } else if (tier === "Intermediate") {
      let mod1 = I_MODS[attempt % I_MODS.length];
      let mod2 = I_MODS[Math.floor(attempt / I_MODS.length) % I_MODS.length];
      name = attempt < I_MODS.length ? \`\${mod1} \${base}\` : \`\${mod1} \${mod2} \${base}\`;
   } else if (tier === "Advanced") {
      let mod1 = A_MODS[attempt % A_MODS.length];
      let mod2 = A_MODS[Math.floor(attempt / A_MODS.length) % A_MODS.length];
      name = attempt < A_MODS.length ? \`\${mod1} \${base}\` : \`\${mod1} \${mod2} \${base}\`;
   } else if (tier === "Elite") {
      let pre = E_PRE[attempt % E_PRE.length];
      let pre2 = E_PRE[Math.floor(attempt / E_PRE.length) % E_PRE.length];
      let suf = E_SUF[attempt % E_SUF.length];
      name = attempt < E_PRE.length ? \`\${pre} \${base} \${suf}\` : \`\${pre} \${pre2} \${base} \${suf}\`;
   }
   
   // Deduplicate consecutive words
   let parts = name.split(" ");
   let uniqueParts: string[] = [];
   for (let p of parts) {
      if (uniqueParts.length === 0 || uniqueParts[uniqueParts.length - 1] !== p) {
         uniqueParts.push(p);
      }
   }
   return uniqueParts.join(" ").trim();
}

self.onmessage = async (e) => {
  const { type, payload } = e.data;
  
  if (type === "GENERATE_MASTER") {
    try {
      const CACHE_KEY = "exercise_tab_v28_bloom_filtering";
      let cached: any = null;
      try { cached = await localforage.getItem(CACHE_KEY); } catch (err) {}
      
      if (cached && cached.length >= 3550) {
        self.postMessage({ type: "MASTER_GENERATED", payload: cached });
        return;
      }

      const database: any[] = [];
      const bloomFilter = new ProbabilisticBloomFilter(1000000, 4);
      // Secondary validation set to prevent false positives from Bloom Filter
      const secondaryValidationSet = new Set<string>();
      
      let globalIndex = 0;
      // Calculate perfect 70/30 environment split cells
      let currentHome = 0;
      const targetHome = 2485;
      let currentGym = 0;
      const targetGym = 1065;
      
      let cells: any[] = [];
      for (let domain in ALLOCATION) {
         for (let tier in (ALLOCATION as any)[domain]) {
            cells.push({ domain, tier, count: (ALLOCATION as any)[domain][tier] });
         }
      }

      cells.forEach((cell, index) => {
         if (index === cells.length - 1) {
            cell.homeCount = targetHome - currentHome;
            cell.gymCount = targetGym - currentGym;
         } else {
            let h = Math.round(cell.count * 0.7);
            let g = cell.count - h;
            cell.homeCount = h;
            cell.gymCount = g;
            currentHome += h;
            currentGym += g;
         }
      });

      for (const cell of cells) {
         const { domain, tier, homeCount, gymCount } = cell;
         const bases = (BASES as any)[domain][tier] || [domain];
         
         const buildCell = (targetCount: number, isHome: boolean) => {
            const equips = isHome ? HOME_EQUIP : GYM_EQUIP;
            let count = 0;
            let attempt = 0;
            
            while (count < targetCount) {
               const base = bases[attempt % bases.length];
               const eq = equips[attempt % equips.length];
               
               let name = buildAuthenticName(tier, base, attempt);
               
               // Ensure 3-to-4 word constraint strictly on the raw name before normalization
               let words = name.split(' ');
               if (words.length > 4) {
                 name = [...words.slice(0, 2), ...words.slice(-2)].join(' ');
               } else if (words.length < 3) {
                 // Add automated modifiers to enforce 3-to-4 word constraint
                 name = isHome ? \`Strict \${name} Protocol\` : \`Heavy \${name} Variation\`;
               }

               let { norm, cryptoHash } = SemanticCollisionEngine.normalizeAndHash(name);
               
               let isDuplicate = false;
               // Positive flags route candidate records to secondary semantic validation
               if (bloomFilter.has(cryptoHash)) {
                 if (secondaryValidationSet.has(cryptoHash)) {
                    isDuplicate = true; // True positive collision detected
                 }
               }
               
               if (!isDuplicate) {
                  // Register in pipeline
                  bloomFilter.add(cryptoHash);
                  secondaryValidationSet.add(cryptoHash);
                  
                  let baseScore = tier === 'Beginner' ? 5.0 : tier === 'Intermediate' ? 7.0 : tier === 'Advanced' ? 8.5 : 9.5;
                  let eff = Math.min(10.0, Math.round((baseScore + Math.random()) * 10) / 10);
                  
                  let trainingAge = "";
                  let bioProfile = "";
                  let specialized = "";

                  if (tier === "Beginner") {
                     trainingAge = "1 to 1.5 months of initial fitness exposure.";
                     bioProfile = "Maximum structural support, low axial loading, wall/incline assistance, high stability to build foundational motor patterns safely.";
                  } else if (tier === "Intermediate") {
                     trainingAge = "3 to 4 months of consistent training history.";
                     bioProfile = "Full unassisted bodyweight control or moderate free-weight resistance across standard movement planes.";
                  } else if (tier === "Advanced") {
                     trainingAge = "3 to 4 years of continuous, rigorous training.";
                     bioProfile = "High mechanical disadvantage, unilateral loading, severe tendon/joint conditioning, and complex neuromuscular coordination.";
                  } else if (tier === "Elite") {
                     trainingAge = "Peak human anatomy tier for elite calisthenics masters, Olympic gymnasts, and grandmasters maximizing tendon stiffness and skeletal alignment.";
                     specialized = "\\n\\n**Specialized Execution Parameters:** Integrated with a strict 1.5 repetition protocol (full eccentric-concentric range of motion followed immediately by a mandatory half-range contraction under continuous time-under-tension) coupled with extreme external axial barbell loading or weighted chain/vest integration.";
                  }
                  
                  let instructions = \`**Training Age:** \${trainingAge}\\n**Biomechanical Profile:** \${bioProfile}\${specialized}\\n\\n**Execution Parameters:** Engage the \${domain} musculature utilizing \${eq}. Ensure strictly controlled eccentric loading to maximize kinetic adaptation.\`;
                  
                  database.push({
                     id: \`pulse-ex-\${globalIndex.toString().padStart(4, '0')}\`,
                     name,
                     muscleGroup: domain,
                     difficulty: tier,
                     scientificEffectivenessScore: eff,
                     equipmentNeeded: eq,
                     environment: isHome ? 'Home' : 'Gym',
                     _rawEquipment: eq,
                     instructions,
                     _searchString: name.toLowerCase(),
                     _cryptoHash: cryptoHash
                  });
                  
                  count++;
                  globalIndex++;
               }
               // Automated Substitution Protocol: if isDuplicate is true, attempt increments and next iteration generates distinct variation
               attempt++;
               if (attempt > 100000) break; // Fail-safe
            }
         };
         
         buildCell(homeCount as number, true);
         buildCell(gymCount as number, false);
      }
      
      database.sort((a, b) => a.name.localeCompare(b.name));
      
      try {
        await localforage.setItem(CACHE_KEY, database);
      } catch (err) {}
      
      self.postMessage({ type: "MASTER_GENERATED", payload: database });

    } catch (err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }

  if (type === "FILTER_DB") {
    self.postMessage({ type: "FILTER_DONE", payload: [] });
  }

  if (type === "SEARCH_DB") {
    try {
      const { db, query, selectedEquips, selectedGroups, selectedDifficulties } = payload;
      let result = db;
      let q = query.trim().toLowerCase();
      const pointMatch = q.match(/([0-9.]+)\\s*(point|score|eff|points)/i) || q.match(/(point|score|eff|points)\\s*([0-9.]+)/i);
      
      if (pointMatch) {
        const targetScore = parseFloat(pointMatch[1]?.match(/[0-9.]+/) ? pointMatch[1] : pointMatch[2]);
        if (!isNaN(targetScore)) {
            result = result.filter((ex: any) => Math.abs(ex.scientificEffectivenessScore - targetScore) < 0.05);
        }
        q = q.replace(pointMatch[0], "").trim();
      }

      if (q.length > 0) {
        const terms = q.split(/\\s+/);
        result = result.filter((ex: any) => {
           const searchSpace = ex._searchString;
           return terms.every((term: string) => searchSpace.includes(term));
        });
      }

      if (selectedEquips && selectedEquips.length > 0) {
        result = result.filter((ex: any) => selectedEquips.includes(ex.environment));
      }

      if (selectedGroups && selectedGroups.length > 0) {
        result = result.filter((ex: any) => selectedGroups.includes(ex.muscleGroup));
      }

      if (selectedDifficulties && selectedDifficulties.length > 0) {
        result = result.filter((ex: any) => selectedDifficulties.includes(ex.difficulty));
      }

      self.postMessage({ type: "SEARCH_DONE", payload: result });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }
};
`;

fs.writeFileSync('src/workers/database.worker.ts', workerCode);
