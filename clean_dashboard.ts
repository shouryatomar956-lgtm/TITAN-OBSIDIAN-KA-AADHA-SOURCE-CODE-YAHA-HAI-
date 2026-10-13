import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/Dashboard.tsx', 'utf8');

// replace currentWeekWorkouts and getIntensity
const regex = /const currentWeekWorkouts = useMemo\(\(\) => \{[\s\S]*?\}\, \[state, mood\]\);/g;
content = content.replace(regex, '');

// also replace handleToggleWorkout
const toggleRegex = /const handleToggleWorkout = useCallback[\s\S]*?\}\, \[\]\);/g;
content = content.replace(toggleRegex, '');

writeFileSync('src/components/Dashboard.tsx', content);
