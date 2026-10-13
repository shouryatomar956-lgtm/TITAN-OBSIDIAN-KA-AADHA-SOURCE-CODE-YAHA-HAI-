import fs from 'fs';

let content = fs.readFileSync('src/workers/rxdb.worker.ts', 'utf8');

// replace dexie with memory and localforage
content = content.replace(
  "import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';",
  "import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';\nimport { RxDBJsonDumpPlugin } from 'rxdb/plugins/json-dump';\nimport localforage from 'localforage';"
);

// Add jsondump plugin
content = content.replace(
  "addRxPlugin(RxDBUpdatePlugin);",
  "addRxPlugin(RxDBUpdatePlugin);\naddRxPlugin(RxDBJsonDumpPlugin);\n\nlocalforage.config({\n  name: 'PulseFitTracker',\n  storeName: 'gym_data_hybrid',\n  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE]\n});"
);

// replace Dexie with Memory
content = content.replace(
  "storage: getRxStorageDexie()",
  "storage: getRxStorageMemory()"
);

const initDbRegex = /await db\.addCollections\(\{[\s\S]*?\}\);\n            return db;/;
content = content.replace(initDbRegex, `await db.addCollections({
                profile: { schema: profileSchema },
                appstate: { schema: stateSchema }
            });

            // LocalForage Hybrid Adapter: Restore from cold storage
            try {
               const profileDump = await localforage.getItem('rxdb_dump_profile');
               if (profileDump) await db.profile.importJSON(profileDump as any);
            } catch(e) {}
            try {
               const stateDump = await localforage.getItem('rxdb_dump_appstate');
               if (stateDump) await db.appstate.importJSON(stateDump as any);
            } catch(e) {}

            // LocalForage Hybrid Adapter: Persist reactive streams back to cold storage
            db.profile.$.subscribe(() => {
               db.profile.exportJSON().then(dump => localforage.setItem('rxdb_dump_profile', dump));
            });
            db.appstate.$.subscribe(() => {
               db.appstate.exportJSON().then(dump => localforage.setItem('rxdb_dump_appstate', dump));
            });

            return db;`);

fs.writeFileSync('src/workers/rxdb.worker.ts', content);
