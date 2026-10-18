import fs from 'fs';
import path from 'path';

// Import existing master database
import { MASTER_EXERCISE_DATABASE } from '../src/services/exerciseFactory';

console.log('Total Master Database entries before update:', MASTER_EXERCISE_DATABASE.length);

const nonEliteNames = new Set(
  MASTER_EXERCISE_DATABASE.filter(e => e.difficulty !== 'Elite').map(e => e.name)
);

function cleanName(name: string, taken: Set<string>): string {
  // Never touch measurements or multipliers
  if (!name.includes('1.5')) return name;
  if (name.includes('1.5x') || name.includes('1.5-inch') || name.includes('1.5 in')) return name;

  // Primary candidate: cleanly strip 1.5 protocol/rep phrasing
  let c = name;
  c = c.replace(/\s*\(15s Hold to 1\.5 Reps\)/gi, ' (15s Hold)');
  c = c.replace(/\s*1\.5 Repetition Protocol/gi, '');
  c = c.replace(/\s*1\.5 Pulse Protocol/gi, '');
  c = c.replace(/\s*1\.5 Protocol Lock/gi, ' Lock');
  c = c.replace(/\s*1\.5 Protocol\b/gi, '');
  c = c.replace(/\s*1\.5 Repetition\b/gi, '');
  c = c.replace(/\s*1\.5 Rep\b/gi, '');
  c = c.replace(/\s*1\.5 Pulse\b/gi, ' Pulse');
  c = c.replace(/\s*1\.5\s+/gi, ' ');
  c = c.replace(/\s*1\.5$/gi, '');
  c = c.replace(/\s+/g, ' ').trim();

  if (!taken.has(c)) {
    return c;
  }

  // Secondary candidate: replace 1.5 with 'Elite'
  let alt = name;
  alt = alt.replace(/\s*\(15s Hold to 1\.5 Reps\)/gi, ' (15s Hold)');
  alt = alt.replace(/\s*1\.5 Repetition Protocol/gi, ' Elite Protocol');
  alt = alt.replace(/\s*1\.5 Pulse Protocol/gi, ' Elite Protocol');
  alt = alt.replace(/\s*1\.5 Protocol Lock/gi, ' Elite Lock');
  alt = alt.replace(/\s*1\.5 Protocol/gi, ' Elite Protocol');
  alt = alt.replace(/\s*1\.5 Repetition/gi, ' Elite');
  alt = alt.replace(/\s*1\.5 Rep\b/gi, ' Elite');
  alt = alt.replace(/\s*1\.5 Pulse\b/gi, ' Elite Pulse');
  alt = alt.replace(/\s*1\.5\s+/gi, ' Elite ');
  alt = alt.replace(/\s*1\.5$/gi, ' Elite');
  alt = alt.replace(/\s+/g, ' ').trim();

  if (!taken.has(alt)) {
    return alt;
  }

  // Tertiary fallback: append (Elite)
  const tertiary = `${c} (Elite)`;
  if (!taken.has(tertiary)) {
    return tertiary;
  }

  throw new Error('Could not resolve unique name for ' + name);
}

function cleanInstruction(inst: string): string {
  let s = inst;

  // Protect measurements like 1.5x bodyweight or 1.5-inch rope
  const tokens: string[] = [];
  s = s.replace(/1\.5x bodyweight/gi, '___BW15___');
  s = s.replace(/1\.5x/gi, '___X15___');
  s = s.replace(/1\.5-inch/gi, '___INCH15___');
  s = s.replace(/1\.5 in\b/gi, '___IN15___');

  // Boilerplate sentences
  s = s.replace(/Execute using the strict 1\.5 repetition protocol: perform a full eccentric-concentric range followed immediately by a mandatory half-range contraction under continuous time-under-tension\. Pair with maximum explosive intent and minimal ground contact time\./gi, 'Execute full range of motion under continuous time-under-tension with maximum explosive intent and minimal ground contact time.');
  s = s.replace(/Execute using the strict 1\.5 repetition protocol: perform a full eccentric-concentric range followed immediately by a mandatory half-range contraction under continuous time-under-tension\./gi, 'Execute full range of motion under continuous time-under-tension with strict muscular control.');
  s = s.replace(/Strict 1\.5 repetition protocol \(full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension\)\.?\s*/gi, 'Execute full range of motion under continuous time-under-tension with strict muscular control. ');
  s = s.replace(/utilizing the strict 1\.5 repetition protocol \(full eccentric-concentric range followed by a mandatory half-range contraction under continuous time-under-tension\)\.?\s*/gi, 'under continuous time-under-tension with strict muscular control. ');
  s = s.replace(/utilizing the strict 1\.5 repetition protocol \(full chest-to-floor pop plus 50% squat jump pulse\)/gi, 'maintaining continuous dynamic time-under-tension');
  s = s.replace(/utilizing the 1\.5 repetition protocol \(full jump plus 50% squat pulse\)/gi, 'maintaining continuous dynamic time-under-tension');

  // Prefaces
  s = s.replace(/Execute the strict 1\.5 repetition protocol:\s*/gi, 'Execute with strict form and continuous tension: ');
  s = s.replace(/Perform the strict 1\.5 repetition protocol:\s*/gi, 'Perform with strict form and continuous tension: ');
  s = s.replace(/In combat stance with 80-degree elbow lock, execute the strict 1\.5 repetition protocol:\s*/gi, 'In combat stance with 80-degree elbow lock, execute with strict form: ');
  s = s.replace(/Execute the strict 1\.5 repetition protocol on ([^:]+):\s*/gi, 'Execute with strict form on $1: ');
  s = s.replace(/Execute the strict 1\.5 repetition protocol\s*/gi, 'Execute with strict form and continuous tension ');

  // Inline protocol mentions
  s = s.replace(/utilizing the strict 1\.5 repetition protocol/gi, 'under continuous time-under-tension with strict muscular control');
  s = s.replace(/utilizing the 1\.5 repetition protocol/gi, 'under continuous time-under-tension');
  s = s.replace(/mandatory 1\.5 repetition half-range contraction under continuous time-under-tension/gi, 'peak muscular contraction under continuous time-under-tension');
  s = s.replace(/mandatory 1\.5 repetition half-range pulse contraction under continuous time-under-tension/gi, 'peak muscular contraction under continuous time-under-tension');
  s = s.replace(/mandatory 1\.5 repetition half-range pulse under continuous muscular tension/gi, 'peak muscular contraction under continuous time-under-tension');
  s = s.replace(/mandatory 1\.5 repetition half-range pulse under continuous time-under-tension/gi, 'peak muscular contraction under continuous time-under-tension');
  s = s.replace(/mandatory 1\.5 repetition pulse/gi, 'peak muscular pulse');
  s = s.replace(/strict 1\.5 repetition protocol pulse cycles/gi, 'strict continuous dynamic pulse cycles');
  s = s.replace(/strict 1\.5 repetition protocol/gi, 'strict continuous tension protocol');
  s = s.replace(/1\.5 repetition protocol pulse cycles/gi, 'continuous dynamic pulse cycles');
  s = s.replace(/1\.5 repetition protocol/gi, 'continuous tension protocol');
  s = s.replace(/1\.5 protocol/gi, 'continuous tension protocol');
  s = s.replace(/1\.5 repetition pulse/gi, 'peak contraction pulse');
  s = s.replace(/1\.5 pulse reps/gi, 'peak pulse reps');
  s = s.replace(/1\.5 pulse cycles/gi, 'dynamic pulse cycles');
  s = s.replace(/1\.5 pulse/gi, 'peak pulse');
  s = s.replace(/1\.5 repetition/gi, 'full-range');
  s = s.replace(/1\.5 rep /gi, 'full rep ');
  s = s.replace(/1\.5 rep\b/gi, 'full rep');
  s = s.replace(/\(1\.5 repetition protocol\)/gi, '(under continuous peak tension)');
  s = s.replace(/\(1\.5 protocol\)/gi, '(under continuous peak tension)');
  s = s.replace(/\(1\.5 repetition\)/gi, '(under continuous peak tension)');
  s = s.replace(/\(1\.5 protocol Lock\)/gi, '(under continuous peak tension)');
  s = s.replace(/\(15s Hold to 1\.5 Reps\)/gi, '(15s Hold)');

  // Any remaining generic 1.5 in protocol contexts
  s = s.replace(/1\.5/gi, 'full-range');

  // Restore protected tokens
  s = s.replace(/___BW15___/g, '1.5x bodyweight');
  s = s.replace(/___X15___/g, '1.5x');
  s = s.replace(/___INCH15___/g, '1.5-inch');
  s = s.replace(/___IN15___/g, '1.5 in');

  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

// Map files
const files = [
  { path: 'src/services/arm.ts', varName: 'ARM_EXERCISES' },
  { path: 'src/services/arm_wrestling.ts', varName: 'ARM_WRESTLING_EXERCISES' },
  { path: 'src/services/back.ts', varName: 'BACK_EXERCISES' },
  { path: 'src/services/calisthenics.ts', varName: 'CALISTHENICS_EXERCISES' },
  { path: 'src/services/cardio.ts', varName: 'CARDIO_EXERCISES' },
  { path: 'src/services/chest.ts', varName: 'CHEST_EXERCISES' },
  { path: 'src/services/core.ts', varName: 'CORE_EXERCISES' },
  { path: 'src/services/explosiveness.ts', varName: 'EXPLOSIVENESS_EXERCISES' },
  { path: 'src/services/leg.ts', varName: 'LEG_EXERCISES' },
  { path: 'src/services/neck.ts', varName: 'NECK_EXERCISES' },
  { path: 'src/services/shoulder.ts', varName: 'SHOULDER_EXERCISES' },
  { path: 'src/services/tendon.ts', varName: 'TENDON_EXERCISES' }
];

const takenNames = new Set<string>();

// Pre-fill takenNames with non-elite names (allowing existing 1 non-elite duplicate: Barbell Romanian Deadlift (RDL))
MASTER_EXERCISE_DATABASE.forEach(e => {
  if (e.difficulty !== 'Elite') {
    takenNames.add(e.name);
  }
});

const updatedExercisesByFile: Record<string, any[]> = {};
let eliteProcessedCount = 0;
let elite15ProtocolRemovedCount = 0;

for (const f of files) {
  const rawContent = fs.readFileSync(f.path, 'utf-8');
  const jsonMatch = rawContent.match(/\[\s*\{[\s\S]*\}\s*\]/);
  if (!jsonMatch) {
    throw new Error(`Could not parse array from ${f.path}`);
  }
  
  let list: any[];
  try {
    list = JSON.parse(jsonMatch[0]);
  } catch (err) {
    const evalCode = `(function() { return ${jsonMatch[0]}; })()`;
    list = eval(evalCode);
  }

  const updatedList = list.map(e => {
    if (e.difficulty === 'Elite') {
      eliteProcessedCount++;
      const origName = e.name;
      const origInst = e.instructions;

      const newName = cleanName(e.name, takenNames);
      takenNames.add(newName);

      const newInst = cleanInstruction(e.instructions);

      if (newName !== origName || newInst !== origInst) {
        elite15ProtocolRemovedCount++;
      }

      return {
        ...e,
        name: newName,
        instructions: newInst
      };
    } else {
      return e;
    }
  });

  updatedExercisesByFile[f.path] = updatedList;
}

console.log('Total Elite processed:', eliteProcessedCount);
console.log('Elite exercises updated:', elite15ProtocolRemovedCount);

// Final verification checks
let grandTotal = 0;
let remaining15InEliteName = 0;
let remaining15ProtocolInEliteInst = 0;

for (const f of files) {
  const list = updatedExercisesByFile[f.path];
  grandTotal += list.length;
  list.forEach(e => {
    if (e.difficulty === 'Elite') {
      if (e.name.includes('1.5') && !e.name.includes('1.5x') && !e.name.includes('1.5-inch')) {
        remaining15InEliteName++;
        console.log('REMAINING 1.5 IN ELITE NAME:', e.name, 'in', f.path);
      }
      if (e.instructions.includes('1.5') && !e.instructions.includes('1.5x') && !e.instructions.includes('1.5-inch')) {
        remaining15ProtocolInEliteInst++;
        console.log('REMAINING 1.5 IN ELITE INST:', e.instructions, 'in', f.path);
      }
    }
  });
}

console.log('Grand Total across all 12 domains:', grandTotal);
console.log('Remaining 1.5 in Elite names (non-multiplier):', remaining15InEliteName);
console.log('Remaining 1.5 protocol in Elite instructions (non-multiplier):', remaining15ProtocolInEliteInst);

if (grandTotal === 5050 && remaining15InEliteName === 0 && remaining15ProtocolInEliteInst === 0) {
  console.log('ALL VERIFICATIONS PASSED! Writing updated files to disk...');
  for (const f of files) {
    const list = updatedExercisesByFile[f.path];
    const tsCode = `import { ExerciseEntity } from './types';\n\nexport const ${f.varName}: ExerciseEntity[] = ${JSON.stringify(list, null, 2)};\n`;
    fs.writeFileSync(f.path, tsCode, 'utf-8');
    console.log(`Updated ${f.path} (${list.length} exercises)`);
  }
  console.log('SUCCESS! All domain files updated and 1.5 rep protocol completely removed from Elite tier.');
} else {
  console.error('VERIFICATION FAILED! Files not written.');
  process.exit(1);
}
