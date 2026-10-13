import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

content = content.replace(
  "{db.length} Scientifically Profiled Movements",
  "{isLoading ? 'Mapping encrypted parameters...' : `${db.length} Scientifically Profiled Movements`}"
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
