import fs from 'fs';

const out = [];

out.push(`ANATOMICAL MAPPING BOUNDS
Latissimus Dorsi, Rhomboids, Mid/Lower Traps, Teres Major/Minor, Erector Spinae. Planes: Vertical, Horizontal.

TIER CONSTRAINTS
Beginner(132): Training age 1-1.5mo. Low axial load. Protocol: Controlled eccentric (3s down, 1s hold).
Intermediate(228): Training age 3-4mo. Unassisted control. Protocol: Moderate time-under-tension.
Advanced(150): Training age 3-4yr. High mechanical disadvantage. Protocol: Strict biomechanical alignment.
Elite(90): Peak anatomy. Protocol: Strict 1.5 repetition (full eccentric-concentric + mandatory half-range contraction).

DOMAIN 1 INVENTORY BLOCK`);

let id = 1;
function gen(tier, env, count, min, max, mods, nameFn) {
  out.push(`${tier.toUpperCase()} - ${env.toUpperCase()} (${count} Exercises)`);
  let line = [];
  for (let i = 0; i < count; i++) {
    const score = (Math.random() * (max - min) + min).toFixed(1);
    const mod = mods[i % mods.length];
    const n = nameFn(mod, i+1);
    line.push(`${String(id).padStart(3,'0')}:${n}[${score}]`);
    if (line.length === 3) {
      out.push(line.join(' | '));
      line = [];
    }
    id++;
  }
  if (line.length > 0) out.push(line.join(' | '));
}

const bMods = ['Wall', 'Band', 'Prone', 'Seat', 'Inc'];
const iMods = ['Std', 'Bent', 'Wide', 'Close', 'Rev'];
const aMods = ['Uni', 'Def', 'Pause', 'Exp', 'Ecc'];
const eMods = ['Iso', 'Dyn', 'Susp', 'Wght', 'Lev'];

gen('Beginner', 'Home', 92, 4.0, 6.0, bMods, (m,i) => `BW ${m} ScapRet ${i}`);
gen('Beginner', 'Gym', 40, 4.0, 6.0, bMods, (m,i) => `Mach ${m} ScapRet ${i}`);
gen('Intermediate', 'Home', 160, 6.1, 8.0, iMods, (m,i) => `Unast ${m} Row ${i}`);
gen('Intermediate', 'Gym', 68, 6.1, 8.0, iMods, (m,i) => `BB ${m} Row ${i}`);
gen('Advanced', 'Home', 105, 8.1, 9.2, aMods, (m,i) => `Archer ${m} Pull ${i}`);
gen('Advanced', 'Gym', 45, 8.1, 9.2, aMods, (m,i) => `1-Arm Cable ${m} Pull ${i}`);
gen('Elite', 'Home', 63, 9.3, 10.0, eMods, (m,i) => `Adv FrontLev ${m} Tch 1.5 - ${i}`);
gen('Elite', 'Gym', 27, 9.3, 10.0, eMods, (m,i) => `Wght IronCross ${m} Tch 1.5 - ${i}`);

fs.writeFileSync('dense_blueprint.txt', out.join('\n'));
console.log('Generated dense_blueprint.txt');
