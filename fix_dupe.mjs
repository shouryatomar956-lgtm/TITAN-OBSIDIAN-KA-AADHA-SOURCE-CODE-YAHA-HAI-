import fs from 'fs';

let content = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

const lines = content.split('\n');

// Find the second `import { ProbabilisticBloomFilter` or similar duplicate marker
// The file has duplicated code.
// Let's just find the first `self.onmessage = async (e) => {`
const firstOnMsg = lines.findIndex(l => l.includes('self.onmessage = async (e) => {'));
const secondOnMsg = lines.findIndex((l, idx) => idx > firstOnMsg && l.includes('self.onmessage = async (e) => {'));

if (secondOnMsg !== -1) {
  // We have a duplicate! 
  // Let's remove from first import to right before second import
  const secondImport = lines.findIndex((l, idx) => idx > 0 && l.includes('import { ProbabilisticBloomFilter'));
  
  if (secondImport !== -1) {
    const fixedLines = [...lines.slice(0, 1), ...lines.slice(secondImport + 1)];
    fs.writeFileSync('src/workers/database.worker.ts', fixedLines.join('\n'));
    console.log("Fixed by removing from 1 to second import");
  }
}

