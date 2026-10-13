import fs from 'fs';

let content = fs.readFileSync('src/workers/workerA.ts', 'utf8');
content = content.replace(
    'sum += Atomics.load(new Int32Array(new SharedArrayBuffer(4)), 0) + telemetryData[i];',
    'sum += telemetryData[i];'
);

fs.writeFileSync('src/workers/workerA.ts', content);
