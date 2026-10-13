import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. Add BiometricSettings import
content = content.replace(
  `import { AnalyticsDashboard } from './AnalyticsDashboard';`,
  `import { BiometricSettings } from './BiometricSettings';\nimport { AnalyticsDashboard } from './AnalyticsDashboard';`
);

// 2. Add Settings tab button
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
              onClick={() => setActiveTab('settings')}
              className={cn("flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors", activeTab === 'settings' ? "bg-zinc-800 text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-300")}
            >
              <Settings className="w-4 h-4" /> <span className="hidden sm:inline">Settings</span>
            </button>
          </div>`;

content = content.replace(oldTabs, newTabs);

// 3. Add the Settings content section
const oldContentEnd = `        {activeTab === 'exercises' && (
          <ExerciseCatalog onNotify={(msg) => {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(''), 4000);
          }} />
        )}
      </main>`;

const newContentEnd = `        {activeTab === 'exercises' && (
          <ExerciseCatalog onNotify={(msg) => {
            setToastMessage(msg);
            setTimeout(() => setToastMessage(''), 4000);
          }} />
        )}

        {activeTab === 'settings' && (
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-8 w-full max-w-2xl mx-auto">
             <div className="mb-4">
                 <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Settings</h2>
                 <p className="text-zinc-400 text-sm">Manage your security and application preferences.</p>
             </div>
             
             <section className="space-y-4">
                <h3 className="text-sm font-semibold tracking-tight text-zinc-400 uppercase">Security</h3>
                <BiometricSettings />
             </section>
          </div>
        )}
      </main>`;

content = content.replace(oldContentEnd, newContentEnd);

fs.writeFileSync('src/components/Dashboard.tsx', content);
