import fs from 'fs';

let content = fs.readFileSync('src/workers/search.worker.ts', 'utf8');

// Remove expose and comlink import
content = content.replace("import { expose } from 'comlink';", "");
content = content.replace("expose(new SearchRegistry());", "");

// Add BroadcastChannel sync logic to SearchRegistry class
const rxdbSyncMethod = `
  public setupRxDBSync() {
    const channel = new BroadcastChannel('rxdb_mutations');
    channel.onmessage = (event) => {
      const { type, payload } = event.data;
      if (type === 'APP_STATE_UPDATE') {
        this.syncAppState(payload);
      }
    };
  }

  private syncAppState(state: any) {
    if (state.workouts && Array.isArray(state.workouts)) {
      const workoutsMeta = state.workouts.map((w: any) => ({
        id: \`workout_\${w.id}\`,
        title: w.name,
        category: 'Workout Log',
        route: '/history',
        keywords: [w.name, 'log', 'history', 'completed', 'workout'],
        aliases: [],
        priority: 50
      }));
      this.registerBulk(workoutsMeta, true);
    }
  }
`;

content = content.replace(
  "class SearchRegistry {",
  "export class SearchRegistry {\n" + rxdbSyncMethod
);

content += "\nexport const searchRegistry = new SearchRegistry();\n";

fs.writeFileSync('src/workers/searchRegistry.ts', content);

// Update search.worker.ts to use the singleton
const newWorkerContent = `import { expose } from 'comlink';
import { searchRegistry } from './searchRegistry';

// Setup incremental sync with RxDB stream
searchRegistry.setupRxDBSync();

expose(searchRegistry);
`;
fs.writeFileSync('src/workers/search.worker.ts', newWorkerContent);

// Add broadcast to rxdb.worker.ts
let rxdbContent = fs.readFileSync('src/workers/rxdb.worker.ts', 'utf8');
const broadcastCode = `            db.appstate.$.subscribe(() => {
               db.appstate.exportJSON().then(dump => localforage.setItem('rxdb_dump_appstate', dump));
               db.appstate.findOne({ selector: { id: 'pulsefit_state' } }).exec().then(doc => {
                   if(doc) {
                      new BroadcastChannel('rxdb_mutations').postMessage({ type: 'APP_STATE_UPDATE', payload: doc.toJSON() });
                   }
               });
            });`;
rxdbContent = rxdbContent.replace(
    /db\.appstate\.\$\.subscribe\(\(\) => \{[\s\S]*?\}\);/,
    broadcastCode
);
fs.writeFileSync('src/workers/rxdb.worker.ts', rxdbContent);
