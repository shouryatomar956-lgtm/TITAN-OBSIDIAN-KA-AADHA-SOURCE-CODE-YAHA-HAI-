import fs from 'fs';
let code = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

let braces = 0;
let lines = code.split('\n');
for(let i = 0; i < lines.length; i++) {
  const line = lines[i];
  // naive check
  for(let c of line) {
    if (c === '{') braces++;
    else if (c === '}') braces--;
  }
}
console.log(`Missing ${braces} closing braces.`);
