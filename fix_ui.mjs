import fs from 'fs';
let content = fs.readFileSync('src/components/ExerciseCatalog.tsx', 'utf8');

content = content.replace(
  /ex\.equipmentNeeded === 'Home'/g,
  "ex.environment === 'Home'"
);

fs.writeFileSync('src/components/ExerciseCatalog.tsx', content);
