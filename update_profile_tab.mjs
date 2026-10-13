import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. Add User to imports
content = content.replace(
  `import { Flame, CheckCircle2, Trophy, Dumbbell, Zap, BatteryLow, BrainCircuit, Shield, ShieldCheck, LayoutDashboard, Database, Search, Activity, Crosshair, Settings, Palette } from 'lucide-react';`,
  `import { Flame, CheckCircle2, Trophy, Dumbbell, Zap, BatteryLow, BrainCircuit, Shield, ShieldCheck, LayoutDashboard, Database, Search, Activity, Crosshair, Settings, Palette, User } from 'lucide-react';`
);

// 2. Change activeTab type
content = content.replace(
  `const [activeTab, setActiveTab] = useState<'overview' | 'exercises' | 'settings'>('overview');`,
  `const [activeTab, setActiveTab] = useState<'overview' | 'exercises' | 'profile'>('overview');`
);

// 3. Add the third tab button
const oldTabs = `            <button 
              onClick={() => setActiveTab('exercises')}
              className={cn("flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === 'exercises' ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Database className="w-4 h-4" /> <span className="hidden sm:inline">Database</span>
            </button>
          </div>`;

const newTabs = `            <button 
              onClick={() => setActiveTab('exercises')}
              className={cn("flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === 'exercises' ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Database className="w-4 h-4" /> <span className="hidden sm:inline">Database</span>
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={cn("flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === 'profile' ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
            >
              <User className="w-4 h-4" /> <span className="hidden sm:inline">User Profile</span>
            </button>
          </div>`;

content = content.replace(oldTabs, newTabs);

// 4. Add the empty content container at the end of the main tag
const oldMainEnd = `        {activeTab === 'exercises' && (
          <ExerciseCatalog onNotify={(msg) => {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(''), 4000);
          }} />
        )}

      </main>`;

const newMainEnd = `        {activeTab === 'exercises' && (
          <ExerciseCatalog onNotify={(msg) => {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(''), 4000);
          }} />
        )}

        {activeTab === 'profile' && (
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full">
            {/* Empty User Profile Tab as requested */}
          </div>
        )}
      </main>`;

content = content.replace(oldMainEnd, newMainEnd);

// Edge case if the end of main looks a little different
if (content.indexOf(newMainEnd) === -1) {
    const backupOldMainEnd = `        {activeTab === 'exercises' && (
          <ExerciseCatalog onNotify={(msg) => {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(''), 4000);
          }} />
        )}



      </main>`;
    content = content.replace(backupOldMainEnd, newMainEnd);
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
