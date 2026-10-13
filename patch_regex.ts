import fs from 'fs';
let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

const oldRegex = /const pointMatch = query.match\(\/\(\[0-9\.\]\+\)\\\s\*\(\point\|score\|eff\|points\)\/i\);/;
const newRegexCode = `const pointMatch = query.match(/([0-9.]+)\\s*(point|score|eff|points)/i) || query.match(/(point|score|eff|points)\\s*([0-9.]+)/i);`;

content = content.replace(oldRegex, newRegexCode);

// Also need to adjust the extraction logic because match groups change order
const oldLogic = /const targetScore = parseFloat\(pointMatch\[1\]\);/g;
const newLogic = `const targetScore = parseFloat(pointMatch[1].match(/[0-9.]+/) ? pointMatch[1] : pointMatch[2]);`;

content = content.replace(oldLogic, newLogic);
fs.writeFileSync('src/components/ExercisesTab.tsx', content);
