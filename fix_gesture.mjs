import fs from 'fs';
let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

const regex = /    try \{\n        const stream = await navigator\.mediaDevices\.getUserMedia\(\{ audio: true \}\);\n        stream\.getTracks\(\)\.forEach\(track => track\.stop\(\)\);\n    \} catch \(err\) \{\n        console\.warn\("Microphone permission blocked by browser or user\.", err\);\n        setQuery\("Microphone permission blocked\."\);\n        setTimeout\(\(\) => setQuery\(""\), 2500\);\n        return;\n    \}\n/;

content = content.replace(regex, '');
fs.writeFileSync('src/components/GlobalSearch.tsx', content);
