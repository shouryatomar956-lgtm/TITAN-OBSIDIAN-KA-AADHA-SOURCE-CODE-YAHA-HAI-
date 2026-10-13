import { writeFileSync, readFileSync } from 'fs';

// 1. exerciseFactory.ts
const factoryContent = `export interface ExerciseEntity {
  id: string;
  name: string;
  muscleGroup: 'Arms' | 'Legs' | 'Core' | 'Cardio' | 'Back' | 'Chest' | 'Explosiveness' | 'Neck Strength' | 'Tendons and Bones';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  scientificEffectivenessScore: number;
  equipmentNeeded: 'Home' | 'Gym';
  instructions: string;
}

const CURATED_DB: Omit<ExerciseEntity, 'id'>[] = [
  { name: 'Backpack Bicep Curl', muscleGroup: 'Arms', difficulty: 'Beginner', scientificEffectivenessScore: 7.5, equipmentNeeded: 'Home', instructions: 'Grip the top handle of a heavily loaded backpack. Curl upwards keeping elbows pinned to your sides. Squeeze at the peak.' },
  { name: 'Cable Tricep Pushdown', muscleGroup: 'Arms', difficulty: 'Intermediate', scientificEffectivenessScore: 8.8, equipmentNeeded: 'Gym', instructions: 'Using a rope attachment, push the weight downward extending the elbow fully. Keep shoulders depressed.' },
  { name: 'Diamond Push-up', muscleGroup: 'Arms', difficulty: 'Intermediate', scientificEffectivenessScore: 8.5, equipmentNeeded: 'Home', instructions: 'Place hands together forming a diamond shape. Lower chest to hands, maintaining a rigid plank.' },
  { name: 'Towel Bicep Isometrics', muscleGroup: 'Arms', difficulty: 'Beginner', scientificEffectivenessScore: 6.5, equipmentNeeded: 'Home', instructions: 'Stand on the center of a towel. Grip the ends and pull upwards with maximum force for 10 seconds without moving.' },
  { name: 'Tricep Chair Dip', muscleGroup: 'Arms', difficulty: 'Beginner', scientificEffectivenessScore: 7.0, equipmentNeeded: 'Home', instructions: 'Place hands on the edge of a sturdy chair. Lower your body until elbows hit 90 degrees, then press back up.' },
  
  { name: 'Backpack Bulgarian Split Squat', muscleGroup: 'Legs', difficulty: 'Intermediate', scientificEffectivenessScore: 9.0, equipmentNeeded: 'Home', instructions: 'Place rear foot on an elevated surface. Hold a heavy backpack on your chest. Drop hips straight down until front thigh is parallel.' },
  { name: 'Barbell Back Squat', muscleGroup: 'Legs', difficulty: 'Advanced', scientificEffectivenessScore: 9.8, equipmentNeeded: 'Gym', instructions: 'Rest barbell on upper traps. Descend by breaking at the hips and knees simultaneously. Drive up through the mid-foot.' },
  { name: 'Bodyweight Squat', muscleGroup: 'Legs', difficulty: 'Beginner', scientificEffectivenessScore: 7.0, equipmentNeeded: 'Home', instructions: 'Stand shoulder-width apart. Sit back into an imaginary chair, keeping chest proud. Stand and squeeze glutes.' },
  { name: 'Forward Alternating Lunges', muscleGroup: 'Legs', difficulty: 'Beginner', scientificEffectivenessScore: 7.2, equipmentNeeded: 'Home', instructions: 'Step forward and drop the back knee to hover just above the floor. Push off the front heel to return.' },
  { name: 'Leg Press Machine', muscleGroup: 'Legs', difficulty: 'Intermediate', scientificEffectivenessScore: 8.5, equipmentNeeded: 'Gym', instructions: 'Place feet shoulder-width on the sled. Lower the weight until knees hit 90 degrees. Press back up without locking knees.' },
  { name: 'Pistol Squat', muscleGroup: 'Legs', difficulty: 'Elite', scientificEffectivenessScore: 9.5, equipmentNeeded: 'Home', instructions: 'Extend one leg forward. Squat down fully on the other leg until hamstring touches calf. Drive up maintaining balance.' },

  { name: 'Bicycle Crunches', muscleGroup: 'Core', difficulty: 'Beginner', scientificEffectivenessScore: 7.8, equipmentNeeded: 'Home', instructions: 'Lie flat, bring opposite elbow to opposite knee while extending the other leg.' },
  { name: 'Cable Woodchopper', muscleGroup: 'Core', difficulty: 'Intermediate', scientificEffectivenessScore: 8.5, equipmentNeeded: 'Gym', instructions: 'Pull cable across your body from high to low, rotating through the torso while keeping hips stable.' },
  { name: 'Dragon Flag', muscleGroup: 'Core', difficulty: 'Elite', scientificEffectivenessScore: 9.8, equipmentNeeded: 'Home', instructions: 'Lie on bench, grip behind head. Raise entire body in a straight line until vertical, then slowly lower eccentrically.' },
  { name: 'Hollow Body Hold', muscleGroup: 'Core', difficulty: 'Intermediate', scientificEffectivenessScore: 8.9, equipmentNeeded: 'Home', instructions: 'Lie on back, press lower back into floor. Raise arms and legs slightly off the floor. Hold tension.' },
  { name: 'Standard Plank', muscleGroup: 'Core', difficulty: 'Beginner', scientificEffectivenessScore: 7.5, equipmentNeeded: 'Home', instructions: 'Hold a push-up position on forearms. Keep body in a perfectly straight line from head to heels.' },

  { name: 'Assault Bike Sprint', muscleGroup: 'Cardio', difficulty: 'Advanced', scientificEffectivenessScore: 9.6, equipmentNeeded: 'Gym', instructions: 'Sprint at maximum wattage using both arms and legs for designated interval.' },
  { name: 'Burpees', muscleGroup: 'Cardio', difficulty: 'Intermediate', scientificEffectivenessScore: 8.8, equipmentNeeded: 'Home', instructions: 'Drop into a push-up, press up, snap hips to bring feet to hands, and jump explosively vertically.' },
  { name: 'High Knees', muscleGroup: 'Cardio', difficulty: 'Beginner', scientificEffectivenessScore: 7.0, equipmentNeeded: 'Home', instructions: 'Run in place, driving knees up to hip height with maximal frequency.' },
  { name: 'Jumping Jacks', muscleGroup: 'Cardio', difficulty: 'Beginner', scientificEffectivenessScore: 6.0, equipmentNeeded: 'Home', instructions: 'Jump feet apart while swinging arms overhead. Return to start. Maintain rapid cadence.' },
  { name: 'Mountain Climbers', muscleGroup: 'Cardio', difficulty: 'Intermediate', scientificEffectivenessScore: 8.0, equipmentNeeded: 'Home', instructions: 'In a plank position, alternate driving knees rapidly toward the chest without raising hips.' },
  { name: 'Rowing Machine 500m', muscleGroup: 'Cardio', difficulty: 'Advanced', scientificEffectivenessScore: 9.2, equipmentNeeded: 'Gym', instructions: 'Drive with the legs, lean back slightly, and pull the handle to the sternum. Recover in reverse order.' },

  { name: 'Backpack Bent Over Row', muscleGroup: 'Back', difficulty: 'Intermediate', scientificEffectivenessScore: 8.2, equipmentNeeded: 'Home', instructions: 'Hinge at hips holding a loaded backpack. Pull the bag to your navel, squeezing shoulder blades together.' },
  { name: 'Barbell Deadlift', muscleGroup: 'Back', difficulty: 'Elite', scientificEffectivenessScore: 9.9, equipmentNeeded: 'Gym', instructions: 'Hinge and grip the bar. Brace core, drive through the floor with legs, and extend hips to lockout.' },
  { name: 'Doorframe Pull', muscleGroup: 'Back', difficulty: 'Beginner', scientificEffectivenessScore: 6.5, equipmentNeeded: 'Home', instructions: 'Grip a sturdy doorframe, lean back, and pull your chest to the frame utilizing the lats.' },
  { name: 'Reverse Snow Angels', muscleGroup: 'Back', difficulty: 'Beginner', scientificEffectivenessScore: 7.0, equipmentNeeded: 'Home', instructions: 'Lie face down. Keep arms straight and sweep them from your hips to overhead, squeezing the upper back.' },
  { name: 'Superman Extensions', muscleGroup: 'Back', difficulty: 'Intermediate', scientificEffectivenessScore: 7.5, equipmentNeeded: 'Home', instructions: 'Lie prone. Simultaneously lift arms, chest, and legs off the floor. Hold peak contraction for 2 seconds.' },
  { name: 'Weighted Pull-Up', muscleGroup: 'Back', difficulty: 'Advanced', scientificEffectivenessScore: 9.5, equipmentNeeded: 'Gym', instructions: 'With a weight belt attached, perform a strict pull-up until chin clears the bar.' },

  { name: 'Archer Push-up', muscleGroup: 'Chest', difficulty: 'Advanced', scientificEffectivenessScore: 8.9, equipmentNeeded: 'Home', instructions: 'Take a wide stance with hands. Lower to one side, keeping the opposite arm completely straight.' },
  { name: 'Backpack Floor Press', muscleGroup: 'Chest', difficulty: 'Beginner', scientificEffectivenessScore: 7.2, equipmentNeeded: 'Home', instructions: 'Lie on the floor with a loaded backpack. Press it vertically until arms are fully extended.' },
  { name: 'Barbell Bench Press', muscleGroup: 'Chest', difficulty: 'Advanced', scientificEffectivenessScore: 9.3, equipmentNeeded: 'Gym', instructions: 'Lie on bench. Unrack bar, lower it with control to the mid-chest, and press explosively.' },
  { name: 'Decline Push-up', muscleGroup: 'Chest', difficulty: 'Intermediate', scientificEffectivenessScore: 8.0, equipmentNeeded: 'Home', instructions: 'Elevate feet on a chair. Perform a push-up to target the clavicular head of the pectorals.' },
  { name: 'Standard Push-up', muscleGroup: 'Chest', difficulty: 'Beginner', scientificEffectivenessScore: 7.5, equipmentNeeded: 'Home', instructions: 'Hands just outside shoulder-width. Keep body straight, lower until chest is 1 inch from the floor.' },

  { name: 'Box Jumps', muscleGroup: 'Explosiveness', difficulty: 'Intermediate', scientificEffectivenessScore: 8.7, equipmentNeeded: 'Gym', instructions: 'Load the hips and swing arms. Jump explosively onto a plyo box. Step down to reset.' },
  { name: 'Broad Jumps', muscleGroup: 'Explosiveness', difficulty: 'Intermediate', scientificEffectivenessScore: 8.5, equipmentNeeded: 'Home', instructions: 'Drop into a quarter squat, swing arms, and jump as far forward as possible. Stick the landing.' },
  { name: 'Lunge Jumps', muscleGroup: 'Explosiveness', difficulty: 'Advanced', scientificEffectivenessScore: 9.0, equipmentNeeded: 'Home', instructions: 'Start in a lunge. Jump explosively, switching leg positions mid-air, and land softly in the opposite lunge.' },
  { name: 'Plyo Clap Push-ups', muscleGroup: 'Explosiveness', difficulty: 'Advanced', scientificEffectivenessScore: 9.2, equipmentNeeded: 'Home', instructions: 'Lower into a push-up, then push off the floor with enough force to clap hands before landing.' },
  { name: 'Power Clean', muscleGroup: 'Explosiveness', difficulty: 'Elite', scientificEffectivenessScore: 9.8, equipmentNeeded: 'Gym', instructions: 'Explosively pull the barbell from the floor, extending hips fully, and catch it across the front delts.' },
  { name: 'Squat Jumps', muscleGroup: 'Explosiveness', difficulty: 'Beginner', scientificEffectivenessScore: 7.8, equipmentNeeded: 'Home', instructions: 'Perform a bodyweight squat, then jump vertically as high as possible. Land smoothly into the next rep.' },

  { name: 'Isometric Front Neck Press', muscleGroup: 'Neck Strength', difficulty: 'Beginner', scientificEffectivenessScore: 6.8, equipmentNeeded: 'Home', instructions: 'Press the palms against the forehead. Push head forward while resisting entirely with hands.' },
  { name: 'Isometric Side Neck Press', muscleGroup: 'Neck Strength', difficulty: 'Beginner', scientificEffectivenessScore: 6.8, equipmentNeeded: 'Home', instructions: 'Press one palm against the side of the head. Push neck sideways into the hand without moving.' },
  { name: 'Neck Bridge', muscleGroup: 'Neck Strength', difficulty: 'Elite', scientificEffectivenessScore: 9.0, equipmentNeeded: 'Home', instructions: 'Lie on your back, push up onto your feet and the crown of your head. Hold for time. Use extreme caution.' },
  { name: 'Towel Neck Extension', muscleGroup: 'Neck Strength', difficulty: 'Intermediate', scientificEffectivenessScore: 7.5, equipmentNeeded: 'Home', instructions: 'Wrap a towel behind your head, hold ends with hands. Extend neck backward against manual resistance.' },
  { name: 'Weighted Neck Harness Extension', muscleGroup: 'Neck Strength', difficulty: 'Advanced', scientificEffectivenessScore: 8.5, equipmentNeeded: 'Gym', instructions: 'Attach weight plate to a neck harness. Slowly nod head downward, then extend upward against the load.' },

  { name: 'Eccentric Calf Raises', muscleGroup: 'Tendons and Bones', difficulty: 'Intermediate', scientificEffectivenessScore: 8.2, equipmentNeeded: 'Home', instructions: 'Rise onto toes with both feet. Lift one foot, and slowly lower yourself on the single leg over 5 seconds.' },
  { name: 'Heavy Rack Pull', muscleGroup: 'Tendons and Bones', difficulty: 'Elite', scientificEffectivenessScore: 9.5, equipmentNeeded: 'Gym', instructions: 'Load barbell on rack pins just above the knee. Pull supra-maximal weight to lock out, overloading the skeleton.' },
  { name: 'Pogo Hops', muscleGroup: 'Tendons and Bones', difficulty: 'Beginner', scientificEffectivenessScore: 7.8, equipmentNeeded: 'Home', instructions: 'Keep knees stiff. Bounce rapidly off the balls of the feet using only ankle and Achilles tendon elasticity.' },
  { name: 'Sled Push', muscleGroup: 'Tendons and Bones', difficulty: 'Advanced', scientificEffectivenessScore: 9.2, equipmentNeeded: 'Gym', instructions: 'Load a heavy sled. Stay low and drive it forward continuously. Great for heavy slow tissue adaptation.' },
  { name: 'Wall Sit', muscleGroup: 'Tendons and Bones', difficulty: 'Beginner', scientificEffectivenessScore: 7.0, equipmentNeeded: 'Home', instructions: 'Lean back against a wall. Lower until knees are at 90 degrees. Hold this isometric position.' },
  { name: 'Weighted Eccentric Drops', muscleGroup: 'Tendons and Bones', difficulty: 'Advanced', scientificEffectivenessScore: 8.8, equipmentNeeded: 'Gym', instructions: 'Step off a low box holding dumbbells. Land softly to absorb the shock, stimulating connective tissue.' }
].sort((a, b) => a.name.localeCompare(b.name));

let cachedDatabase: ExerciseEntity[] | null = null;

export function getMasterExerciseDatabase(): ExerciseEntity[] {
  if (!cachedDatabase) {
    cachedDatabase = CURATED_DB.map((ex, i) => ({
      ...ex,
      id: \`obs-ex-\${i.toString().padStart(3, '0')}\`
    }));
  }
  return cachedDatabase;
}
`;
writeFileSync('src/services/exerciseFactory.ts', factoryContent);

// 2. recommendationEngine.ts
const engineContent = `import { ExerciseEntity, getMasterExerciseDatabase } from './exerciseFactory';
import { UserProfile } from './storage';

export function getRecommendedExercises(profile: UserProfile, mood: string, count: number = 5): ExerciseEntity[] {
    const db = getMasterExerciseDatabase();

    // 1. Filter by location (Home vs Gym)
    let filtered = db.filter(ex => {
        if (profile.workoutLocation.toLowerCase().includes('home')) {
            return ex.equipmentNeeded === 'Home';
        }
        return true; // Gym users can do both bodyweight and gym equip
    });

    // 2. Filter by Experience Level
    filtered = filtered.filter(ex => {
        const exp = profile.experienceLevel.toLowerCase();
        if (exp.includes('beginner')) {
            return ex.difficulty === 'Beginner' || ex.difficulty === 'Intermediate';
        } else if (exp.includes('advanced') || exp.includes('elite')) {
            return ex.difficulty === 'Advanced' || ex.difficulty === 'Elite';
        }
        return true;
    });

    // 3. Filter by Primary Goal -> Maps to muscleGroup
    const goal = profile.primaryGoal.toLowerCase();
    let preferredDomains: string[] = [];
    if (goal.includes('muscle gain')) {
        preferredDomains = ['Chest', 'Back', 'Legs', 'Arms', 'Core'];
    } else if (goal.includes('fat loss')) {
        preferredDomains = ['Cardio', 'Core', 'Legs', 'Explosiveness'];
    } else if (goal.includes('endurance')) {
        preferredDomains = ['Cardio', 'Legs', 'Explosiveness'];
    } else {
        preferredDomains = ['Chest', 'Back', 'Legs', 'Arms', 'Core', 'Cardio']; // General
    }

    filtered = filtered.filter(ex => preferredDomains.includes(ex.muscleGroup));

    // 4. Mood-based Reordering and Selection
    if (mood === 'Tired') {
        filtered = filtered.filter(ex => ex.difficulty === 'Beginner' || ex.difficulty === 'Intermediate');
        filtered.sort((a, b) => b.scientificEffectivenessScore - a.scientificEffectivenessScore);
    } else if (mood === 'Energetic') {
        filtered.sort((a, b) => {
            const tierScore = (tier: string) => tier === 'Elite' ? 4 : tier === 'Advanced' ? 3 : tier === 'Intermediate' ? 2 : 1;
            return tierScore(b.difficulty) - tierScore(a.difficulty);
        });
    } else if (mood === 'Stressed') {
        filtered.sort((a, b) => {
            const isAStressRelief = a.muscleGroup === 'Explosiveness' || a.muscleGroup === 'Cardio' ? 1 : 0;
            const isBStressRelief = b.muscleGroup === 'Explosiveness' || b.muscleGroup === 'Cardio' ? 1 : 0;
            return isBStressRelief - isAStressRelief;
        });
    }

    const results: ExerciseEntity[] = [];
    const usedDomains = new Set<string>();

    for (const ex of filtered) {
        if (!usedDomains.has(ex.muscleGroup)) {
            results.push(ex);
            usedDomains.add(ex.muscleGroup);
        }
        if (results.length >= count) break;
    }

    if (results.length < count) {
        for (const ex of filtered) {
            if (!results.find(r => r.id === ex.id)) {
                results.push(ex);
            }
            if (results.length >= count) break;
        }
    }

    return results;
}
`;
writeFileSync('src/services/recommendationEngine.ts', engineContent);

// 3. Dashboard.tsx
let dash = readFileSync('src/components/Dashboard.tsx', 'utf8');
dash = dash.replace(/workout\.domain/g, 'workout.muscleGroup');
dash = dash.replace(/workout\.equipmentType/g, 'workout.equipmentNeeded');
dash = dash.replace(/workout\.difficultyTier/g, 'workout.difficulty');
writeFileSync('src/components/Dashboard.tsx', dash);

console.log("Rewrite successful.");
