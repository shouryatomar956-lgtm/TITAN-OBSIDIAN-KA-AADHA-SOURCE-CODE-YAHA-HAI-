import fs from 'fs';

let typesContent = fs.readFileSync('src/services/types.ts', 'utf8');

typesContent = typesContent.replace(
  /equipmentNeeded: string;/g,
  "equipmentNeeded: 'Bodyweight' | 'Backpack-weighted' | 'Dumbbells' | 'Resistance Bands' | 'Machine' | 'Barbell' | 'Cable' | 'None';\n  environment: 'Home' | 'Gym';"
);

fs.writeFileSync('src/services/types.ts', typesContent);

let workerContent = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

workerContent = workerContent.replace(
  /const HOME_EQUIP = \[[^\]]+\];/,
  'const HOME_EQUIP = ["Bodyweight", "Backpack-weighted", "Resistance Bands", "Dumbbells", "None"];'
);

workerContent = workerContent.replace(
  /const GYM_EQUIP = \[[^\]]+\];/,
  'const GYM_EQUIP = ["Machine", "Barbell", "Cable"];'
);

workerContent = workerContent.replace(
  /equipmentNeeded: isHome \? 'Home' : 'Gym',/g,
  "equipmentNeeded: eq as any,\n                     environment: isHome ? 'Home' : 'Gym',"
);

// We should also update the worker search filter because currently it checks equipmentNeeded === selectedEquips
// But selectedEquips is "Home" or "Gym" in the UI
workerContent = workerContent.replace(
  /if \(selectedEquips && selectedEquips\.length > 0\) \{\s*result = result\.filter\(\(ex\) => selectedEquips\.includes\(ex\.equipmentNeeded\)\);\s*\}/,
  "if (selectedEquips && selectedEquips.length > 0) {\n        result = result.filter((ex) => selectedEquips.includes(ex.environment));\n      }"
);

fs.writeFileSync('src/workers/database.worker.ts', workerContent);

