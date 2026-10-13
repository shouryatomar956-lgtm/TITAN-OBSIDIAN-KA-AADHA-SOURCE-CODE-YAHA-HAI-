import { proxy } from 'comlink';
import { WorkStealingWorkerPool } from '../workers/workStealingPool';

let pool: WorkStealingWorkerPool<any> | null = null;
let initPromise: Promise<boolean> | null = null;

export async function getRxDBProxy() {
  if (typeof window === 'undefined') return null; // SSR safety
  
  if (!pool) {
    pool = new WorkStealingWorkerPool(
      () => new Worker(new URL('../workers/rxdb.worker.ts', import.meta.url), { type: 'module' }),
      1
    );
  }
  
  const workerProxy = pool.getWorker();

  if (!initPromise) {
    initPromise = (async () => {
      try {
        await workerProxy.initDb();
        return true;
      } catch (e) {
        console.warn('[RxDB Manager] Worker initialization notice:', e);
        return false;
      }
    })();
  }

  await initPromise;
  return workerProxy;
}

export function createComlinkCallback(cb: Function) {
  return proxy(cb);
}
