import fs from 'fs';

let factory = fs.readFileSync('src/services/exerciseFactory.ts', 'utf8');

// Replace the difficulty assignment
const oldDiffLogic = `let diff: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite' = 'Intermediate';
                          if (['Single-Arm', 'Single-Leg', 'Speed', 'Over-speed Eccentric', 'Explosive'].includes(v)) diff = 'Elite';
                          else if (['Paused', 'Deficit', '1.5 Rep', 'Slow Eccentric'].includes(v)) diff = 'Advanced';
                          else if (v === 'Standard') diff = 'Beginner';`;

const newDiffLogic = `let diff: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite' = 'Intermediate';
                          
                          // Elite: ONLY extreme movements
                          const isElite = ['Planche', 'Handstand', 'Dragon Flag', 'Front Lever', 'Iron Cross', 'Bruce Lee', 'Jackie Chan'].some(k => name.includes(k));
                          
                          // Advanced: 2-3 years serious training
                          const isAdvanced = !isElite && (
                              ['Snatch', 'Power Clean', 'Split Jerk', 'Guillotine Press', 'Heavy Rack Pull'].includes(base) ||
                              ['Single-Arm', 'Single-Leg', 'Deficit', 'Over-speed Eccentric', '1.5 Rep'].includes(v)
                          );

                          // Beginner: Absolute beginners safely
                          const isBeginner = !isElite && !isAdvanced && (
                              v === 'Standard' && ['Bodyweight', 'Resistance Band', 'Floor', 'Wall', 'Chair', 'Machine', 'Cable'].includes(eq)
                          );

                          if (isElite) diff = 'Elite';
                          else if (isAdvanced) diff = 'Advanced';
                          else if (isBeginner) diff = 'Beginner';
                          else diff = 'Intermediate';`;

factory = factory.replace(oldDiffLogic, newDiffLogic);

// Add Elite bases to ensure they exist
factory = factory.replace(
  "'Core': ['Plank', 'Crunch', 'Leg Raise', 'Russian Twist', 'Ab Rollout', 'Woodchopper', 'Hollow Body Hold', 'V-Up', 'Sit-up', 'Side Plank', 'Dead Bug', 'Flutter Kicks', 'Toe Touches'],",
  "'Core': ['Plank', 'Crunch', 'Leg Raise', 'Russian Twist', 'Ab Rollout', 'Woodchopper', 'Hollow Body Hold', 'V-Up', 'Sit-up', 'Side Plank', 'Dead Bug', 'Flutter Kicks', 'Dragon Flag', 'Front Lever'],"
);

factory = factory.replace(
  "'Arms': ['Bicep Curl', 'Tricep Extension', 'Hammer Curl', 'Skullcrusher', 'Tricep Pushdown', 'Preacher Curl', 'Concentration Curl', 'Kickback', 'Spider Curl', 'Drag Curl', 'Zottman Curl', 'French Press'],",
  "'Arms': ['Bicep Curl', 'Tricep Extension', 'Hammer Curl', 'Skullcrusher', 'Tricep Pushdown', 'Preacher Curl', 'Concentration Curl', 'Kickback', 'Spider Curl', 'Drag Curl', 'Bruce Lee One-Inch Punch', 'French Press'],"
);

factory = factory.replace(
  "'Chest': ['Bench Press', 'Push-up', 'Chest Fly', 'Dip', 'Floor Press', 'Cable Crossover', 'Hex Press', 'Spoto Press', 'Guillotine Press', 'Squeeze Press', 'Pec Deck', 'Svends Press'],",
  "'Chest': ['Bench Press', 'Push-up', 'Chest Fly', 'Dip', 'Floor Press', 'Cable Crossover', 'Planche Push-up', 'Handstand Push-up', 'Guillotine Press', 'Squeeze Press', 'Pec Deck', 'Svends Press'],"
);

fs.writeFileSync('src/services/exerciseFactory.ts', factory);
