import fs from 'fs';
let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

content = content.replace(
  "const pointMatch = query.match(/([0-9.]+)\\s*(point|score|eff|points)/i);",
  "const pointMatch = query.match(/([0-9.]+)\\s*(point|score|eff|points)/i) || query.match(/(point|score|eff|points)\\s*([0-9.]+)/i);"
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
