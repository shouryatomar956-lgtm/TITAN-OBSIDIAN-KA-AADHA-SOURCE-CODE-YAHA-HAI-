import fs from 'fs';
let content = fs.readFileSync('src/utils/searchManager.ts', 'utf8');
content = content.replace('search.worker.ts', 'searchWorker.ts');
fs.writeFileSync('src/utils/searchManager.ts', content);
