import fs from 'fs';
let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

content = content.replace('const handleVoiceSearch = useCallback(async () => {', 'const handleVoiceSearch = useCallback(() => {');
fs.writeFileSync('src/components/GlobalSearch.tsx', content);
