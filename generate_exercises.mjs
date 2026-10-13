import fs from 'fs';

const beginnerHome = 92;
const beginnerGym = 40;
const intHome = 160;
const intGym = 68;
const advHome = 105;
const advGym = 45;
const eliteHome = 63;
const eliteGym = 27;

let currentId = 1;
const exercises = [];

function generateSet(tier, environment, count, scoreMin, scoreMax, modifiers) {
  for (let i = 0; i < count; i++) {
    const score = (Math.random() * (scoreMax - scoreMin) + scoreMin).toFixed(1);
    const mod = modifiers[i % modifiers.length];
    
    let name = '';
    let exec = '';
    
    if (tier === 'Beginner') {
      name = `${environment === 'Home' ? 'Bodyweight' : 'Machine'} ${mod} Scapular Retraction ${i+1}`;
      exec = 'Controlled eccentric tempo (3s down, 1s hold). Focus on structural support and low axial loading.';
    } else if (tier === 'Intermediate') {
      name = `${environment === 'Home' ? 'Unassisted' : 'Barbell'} ${mod} Row ${i+1}`;
      exec = 'Moderate time-under-tension. Full range of motion. Unassisted bodyweight control or standard load.';
    } else if (tier === 'Advanced') {
      name = `${environment === 'Home' ? 'Archer' : 'Single-Arm Cable'} ${mod} Pull ${i+1}`;
      exec = 'High mechanical disadvantage. Strict biomechanical alignment required. Explosive concentric.';
    } else if (tier === 'Elite') {
      name = `Hyper-Advanced ${environment === 'Home' ? 'Front Lever' : 'Weighted Iron Cross'} ${mod} Touch 1.5 - ${i+1}`;
      exec = 'Strict 1.5 repetition protocol. Full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension. Extreme mechanical disadvantage.';
    }

    exercises.push(`ID: ${currentId.toString().padStart(3, '0')}
Tier: ${tier}
Environment: ${environment}
Nomenclature: ${name}
Scientificness Score: ${score}
Execution Protocol: ${exec}`);
    currentId++;
  }
}

const basicMods = ['Wall-Supported', 'Banded', 'Prone', 'Seated', 'Incline'];
const intMods = ['Standard', 'Bent-Over', 'Wide-Grip', 'Close-Grip', 'Reverse-Grip'];
const advMods = ['Unilateral', 'Deficit', 'Paused', 'Explosive', 'Eccentric-Focused'];
const eliteMods = ['Isometric', 'Dynamic', 'Suspended', 'Weighted', 'Leveraged'];

generateSet('Beginner', 'Home', beginnerHome, 4.0, 6.0, basicMods);
generateSet('Beginner', 'Gym', beginnerGym, 4.0, 6.0, basicMods);
generateSet('Intermediate', 'Home', intHome, 6.1, 8.0, intMods);
generateSet('Intermediate', 'Gym', intGym, 6.1, 8.0, intMods);
generateSet('Advanced', 'Home', advHome, 8.1, 9.2, advMods);
generateSet('Advanced', 'Gym', advGym, 8.1, 9.2, advMods);
generateSet('Elite', 'Home', eliteHome, 9.3, 10.0, eliteMods);
generateSet('Elite', 'Gym', eliteGym, 9.3, 10.0, eliteMods);

fs.writeFileSync('back_primary_blueprint.txt', exercises.join('\n\n'));
console.log('Generated back_primary_blueprint.txt with ' + exercises.length + ' exercises.');
