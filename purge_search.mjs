import fs from 'fs';

// 1. Clean Dashboard.tsx
let dashboard = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dashboard = dashboard.replace(/import \{ GlobalSearch \} from '\.\/GlobalSearch';\n/g, '');
dashboard = dashboard.replace(/import \{ useSearchRegistration \} from '\.\.\/hooks\/useSearchRegistration';\n/g, '');

dashboard = dashboard.replace(/  useSearchRegistration\(\{[\s\S]*?\}\);\n/g, '');

const headerRegex = /<div className="flex items-center justify-between gap-4">[\s\S]*?<div className="flex-1 max-w-lg hidden md:block">[\s\S]*?<\/div>\s*(<motion\.div)/;
dashboard = dashboard.replace(headerRegex, `<div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                Pulse<span className="text-zinc-500">Fit</span>
              </h1>
            </div>
            $1`);

const mobileRegex = /(<div className="md:hidden w-full">[\s\S]*?<\/div>\s*)+<div className="flex gap-2/g;
dashboard = dashboard.replace(mobileRegex, '<div className="flex gap-2');

fs.writeFileSync('src/components/Dashboard.tsx', dashboard);

// 2. Clean ExerciseCatalog.tsx
let catalog = fs.readFileSync('src/components/ExerciseCatalog.tsx', 'utf8');
const searchEffectRegex = /  useEffect\(\(\) => \{\n     const handleSearchSelect[\s\S]*?  \}, \[db\]\);\n/g;
catalog = catalog.replace(searchEffectRegex, '');
fs.writeFileSync('src/components/ExerciseCatalog.tsx', catalog);

// 3. Clean useExerciseState.ts
let hook = fs.readFileSync('src/hooks/useExerciseState.ts', 'utf8');
hook = hook.replace(/import \{ getSearchProxy \} from '\.\.\/utils\/searchManager';\n/g, '');
const searchProxyRegex = /          \/\/ Bulk register exercises[\s\S]*?\}\);\n/g;
hook = hook.replace(searchProxyRegex, '');
fs.writeFileSync('src/hooks/useExerciseState.ts', hook);

