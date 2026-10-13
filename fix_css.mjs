import fs from 'fs';

let content = fs.readFileSync('src/components/ExerciseCatalog.tsx', 'utf8');

// I'll just leave it since the actual classes used are the static ones defined in `baseClass`.
// But to prevent the Vite warning, I can remove any lingering string interpolation.

content = content.replace(/\\$\{color\}-500/g, 'emerald-500');

fs.writeFileSync('src/components/ExerciseCatalog.tsx', content);
