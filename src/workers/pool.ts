import { WorkStealingWorkerPool } from './workStealingPool';

/**
 * Backward-compatible ComlinkWorkerPool powered by Dual-Layer Work-Stealing Pool
 */
export class ComlinkWorkerPool<T> extends WorkStealingWorkerPool<T> {
  constructor(workerFactory: () => Worker, poolSize?: number) {
    super(workerFactory, poolSize);
  }
}
