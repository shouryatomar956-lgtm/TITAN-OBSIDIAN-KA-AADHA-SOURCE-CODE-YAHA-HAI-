import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

const importTarget = `import { GlobalSearch } from './GlobalSearch';`;
const importReplacement = `import { GlobalSearch } from './GlobalSearch';\nimport { useSearchRegistration } from '../hooks/useSearchRegistration';`;
content = content.replace(importTarget, importReplacement);

const hookTarget = `const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);`;
const hookReplacement = `const [exercisesList, setExercisesList] = useState<ExerciseEntity[]>([]);

  useSearchRegistration({
    id: 'route_overview',
    title: 'Dashboard Overview',
    category: 'Navigation',
    keywords: ['home', 'dashboard', 'stats', 'streak', 'overview'],
    aliases: ['main menu'],
    priority: 100,
    route: 'overview'
  });

  useSearchRegistration({
    id: 'route_settings',
    title: 'Settings & Preferences',
    category: 'Navigation',
    keywords: ['settings', 'preferences', 'theme', 'account', 'profile'],
    aliases: ['config'],
    priority: 95,
    route: 'settings'
  });

  useSearchRegistration({
    id: 'route_exercises',
    title: 'Exercise Catalog',
    category: 'Navigation',
    keywords: ['exercises', 'catalog', 'database', 'workouts', 'movements'],
    aliases: ['list of exercises'],
    priority: 95,
    route: 'exercises'
  });`;

content = content.replace(hookTarget, hookReplacement);
fs.writeFileSync('src/components/Dashboard.tsx', content);
