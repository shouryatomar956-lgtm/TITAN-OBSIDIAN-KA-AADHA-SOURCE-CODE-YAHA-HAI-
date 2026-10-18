const fs = require('fs');
const path = require('path');

// Helper to create an exercise entry
function makeEx(idNum, name, difficulty, score, equipment, environment, instructions) {
  return {
    id: `back_${idNum}`,
    name,
    muscleGroup: 'Back',
    difficulty,
    scientificEffectivenessScore: Math.round(score * 10) / 10,
    equipmentNeeded: equipment,
    environment,
    instructions
  };
}

// We will build:
// 1. beginnerHome (92)
// 2. beginnerGym (40)
// Total beginner = 132

// 3. intermediateHome (160)
// 4. intermediateGym (68)
// Total intermediate = 228

// 5. advancedHome (105)
// 6. advancedGym (45)
// Total advanced = 150

// 7. eliteHome (63)
// 8. eliteGym (27)
// Total elite = 90

// Total = 600 (420 Home, 180 Gym)

console.log("Dataset generator template initialized.");
