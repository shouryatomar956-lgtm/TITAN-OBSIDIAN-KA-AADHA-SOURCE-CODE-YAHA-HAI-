import fs from 'fs';
let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

const oldFunc = `    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {`;

const newFunc = `    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
    } catch (err) {`;

content = content.replace(oldFunc, newFunc);
fs.writeFileSync('src/components/GlobalSearch.tsx', content);
