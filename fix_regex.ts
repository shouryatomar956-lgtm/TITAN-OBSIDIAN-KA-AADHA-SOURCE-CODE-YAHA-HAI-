import { writeFileSync, readFileSync } from 'fs';
let factory = readFileSync('src/services/exerciseFactory.ts', 'utf8');
factory = factory.replace("/s+/g", "/\\\\s+/g");
writeFileSync('src/services/exerciseFactory.ts', factory);
console.log("Regex fixed.");
