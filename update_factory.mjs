import fs from 'fs';
let content = fs.readFileSync('src/utils/workerFactory.ts', 'utf8');
content = content.replace("domain: 'search' | 'analytics' | 'history' | 'database';", "domain: 'search' | 'analytics' | 'history' | 'database' | 'prediction';");
fs.writeFileSync('src/utils/workerFactory.ts', content);
