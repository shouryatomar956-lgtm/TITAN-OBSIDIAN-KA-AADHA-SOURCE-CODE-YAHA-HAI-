import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(/import \{ Flame, CheckCircle2, Circle, Calendar, Trophy, Dumbbell, Zap, BatteryLow, BrainCircuit, Shield, ShieldCheck, LayoutDashboard, Database, Search \} from 'lucide-react';/, "import { Flame, CheckCircle2, Trophy, Dumbbell, Zap, BatteryLow, BrainCircuit, Shield, ShieldCheck, LayoutDashboard, Database, Search } from 'lucide-react';");

content = content.replace(/import \{ storage, AppState, Workout \} from '\.\.\/services\/storage';/, "import { storage, AppState } from '../services/storage';");

content = content.replace(/import \{ format, isSameDay, parseISO, startOfWeek, addDays \} from 'date-fns';/, "import { format } from 'date-fns';");

writeFileSync('src/components/Dashboard.tsx', content);
