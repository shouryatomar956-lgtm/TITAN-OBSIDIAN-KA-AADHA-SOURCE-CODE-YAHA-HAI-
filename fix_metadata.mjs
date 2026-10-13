import fs from 'fs';
const data = JSON.parse(fs.readFileSync('metadata.json', 'utf8'));
data.requestFramePermissions = ["microphone"];
fs.writeFileSync('metadata.json', JSON.stringify(data, null, 2));
