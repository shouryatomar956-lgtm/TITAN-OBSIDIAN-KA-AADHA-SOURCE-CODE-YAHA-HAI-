import fs from 'fs';

let searchManager = fs.readFileSync('src/utils/searchManager.ts', 'utf8');
searchManager = `import { ComlinkWorkerPool } from '../workers/pool';

let pool: ComlinkWorkerPool<any> | null = null;
let initialized = false;

export async function getSearchProxy() {
  if (typeof window === 'undefined') return null; // SSR safety
  
  if (!pool) {
    pool = new ComlinkWorkerPool(() => new Worker(new URL('../workers/search.worker.ts', import.meta.url), { type: 'module' }), 1);
  }
  
  const proxyInstance = pool.getWorker();
  
  if (!initialized) {
    await proxyInstance.init();
    initialized = true;
  }
  
  return proxyInstance;
}
`;
fs.writeFileSync('src/utils/searchManager.ts', searchManager);

let rxdbManager = fs.readFileSync('src/utils/rxdbManager.ts', 'utf8');
rxdbManager = `import { proxy } from 'comlink';
import { ComlinkWorkerPool } from '../workers/pool';

let pool: ComlinkWorkerPool<any> | null = null;

export async function getRxDBProxy() {
  if (typeof window === 'undefined') return null; // SSR safety
  
  if (!pool) {
    pool = new ComlinkWorkerPool(() => new Worker(new URL('../workers/rxdb.worker.ts', import.meta.url), { type: 'module' }), 1);
  }
  
  return pool.getWorker();
}

export function createComlinkCallback(cb: Function) {
  return proxy(cb);
}
`;
fs.writeFileSync('src/utils/rxdbManager.ts', rxdbManager);
