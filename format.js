import fs from 'fs';
let code = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

let braces = 0;
let lines = code.split('\n');
for(let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const open = (line.match(/\{/g) || []).length;
  const close = (line.match(/\}/g) || []).length;
  braces += open - close;
  if(braces < 0) {
    console.log(`Mismatch at line ${i+1}: ${line} (braces = ${braces})`);
  }
}
console.log(`Final braces: ${braces}`);
