import fs from 'fs';

let content = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

content = content.replace(
  /class ProbabilisticBloomFilter \{/,
  "class ProbabilisticBloomFilter {\n  size: number;\n  k: number;\n  buffer: Uint32Array;"
);

fs.writeFileSync('src/workers/database.worker.ts', content);
