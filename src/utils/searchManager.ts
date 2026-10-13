import { ComlinkWorkerPool } from '../workers/pool';

let pool: ComlinkWorkerPool<any> | null = null;
let initPromise: Promise<boolean> | null = null;

export async function getSearchProxy() {
  if (typeof window === 'undefined') return null; // SSR safety
  
  if (!pool) {
    pool = new ComlinkWorkerPool(
      () => new Worker(new URL('../workers/searchWorker.ts', import.meta.url), { type: 'module' }),
      1
    );
  }
  
  const proxyInstance = pool.getWorker();
  
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await proxyInstance.init();
        return true;
      } catch (e) {
        console.warn('Search worker init error:', e);
        return false;
      }
    })();
  }
  
  await initPromise;
  
  return proxyInstance;
}
