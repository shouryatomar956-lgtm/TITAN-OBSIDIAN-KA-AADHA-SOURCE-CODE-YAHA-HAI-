import fs from 'fs';
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
content = content.replace("history: data.history || []", "history: data.workouts || []");
fs.writeFileSync('src/components/Dashboard.tsx', content);
