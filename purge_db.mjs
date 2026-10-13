import fs from 'fs';
let content = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

// We will overwrite the database worker to just return a flat, small list, and clear the massive cached data.
const newWorker = `
import localforage from 'localforage';

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
     Elite: ["One-Arm Push-Up", "Planche Push-Up", "Tiger Bend Push-Up", "Heavy Weighted Dips", "Maltese Push-Up", "Inverted Cross Push-Up"]
  }
};

self.onmessage = async (e) => {
  const { type, payload } = e.data;
  
  if (type === "GENERATE_MASTER") {
    try {
      // Purge the old massive database to instantly fix the lag
      await localforage.removeItem("exec_metadata_index");
      await localforage.removeItem("exec_payload_meta");
      await localforage.removeItem("exercise_tab_v27_mathematical_allocation");
      
      // Attempt to delete chunk files from the old massive dataset
      for (let i = 0; i < 50; i++) {
        await localforage.removeItem(\`exec_payload_store_\${i}\`);
      }
      
      const enrichedDB = [];
      let globalIndex = 0;
      
      for (const [domain, tiers] of Object.entries(BASES)) {
        for (const [tier, exercises] of Object.entries(tiers as any)) {
           exercises.forEach((name: string) => {
             enrichedDB.push({
               id: \`pulse-ex-\${globalIndex.toString().padStart(4, '0')}\`,
               name,
               muscleGroup: domain,
               difficulty: tier,
               equipmentNeeded: tier === 'Beginner' ? 'Bodyweight' : 'Gym',
               environment: tier === 'Beginner' ? 'Home' : 'Gym',
               _searchString: name.toLowerCase(),
               scientificEffectivenessScore: tier === 'Beginner' ? 6 : tier === 'Intermediate' ? 7.5 : tier === 'Advanced' ? 9 : 10,
               instructions: \`Execute \${name} focusing on the \${domain}.\`
             });
             globalIndex++;
           });
        }
      }
      
      self.postMessage({ type: "MASTER_GENERATED", payload: enrichedDB });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }

  if (type === "FILTER_DB") {
    try {
      const { db, activeTab } = payload;
      let filtered = db;
      if (activeTab === "Beginner" || activeTab === "Intermediate" || activeTab === "Advanced" || activeTab === "Elite") {
        filtered = db.filter((ex: any) => ex.difficulty === activeTab);
      }
      self.postMessage({ type: "FILTER_DONE", payload: filtered });
    } catch(err: any) {
      self.postMessage({ type: "ERROR", payload: err.message });
    }
  }

  if (type === "SEARCH_DB") {
    try {
      const { db, query, selectedEquips, selectedGroups, selectedDifficulties } = payload;
      let result = db;
      let q = query.trim().toLowerCase();
      
      if (q.length > 0) {
        result = result.filter((ex: any) => ex._searchString.includes(q));
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

fs.writeFileSync('src/workers/database.worker.ts', newWorker);
