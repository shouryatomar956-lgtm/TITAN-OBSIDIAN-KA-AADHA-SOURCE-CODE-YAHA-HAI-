export interface WorkerTask {
  type: string;
  payload?: any;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
  id?: number;
}

class ManagedWorkerPool {
  private workers: Worker[] = [];
  private taskQueue: WorkerTask[] = [];
  private activeTasks: Map<Worker, WorkerTask> = new Map();
  private pendingPromises: Map<number, WorkerTask> = new Map();
  private poolSize: number;
  private workerFactory: () => Worker;
  private isStorageWorker: boolean;
  private messageIdCounter: number = 0;

  constructor(workerFactory: () => Worker, isStorageWorker: boolean = false, poolSize: number = typeof navigator !== 'undefined' ? Math.max(2, Math.min(navigator.hardwareConcurrency || 4, 4)) : 2) {
    this.workerFactory = workerFactory;
    this.isStorageWorker = isStorageWorker;
    this.poolSize = poolSize;
  }

  private getOrSpawnWorker(): Worker | undefined {
    const idleWorker = this.workers.find(w => !this.activeTasks.has(w));
    if (idleWorker) return idleWorker;

    if (typeof Worker !== 'undefined' && this.workers.length < this.poolSize) {
      const worker = this.workerFactory();
      worker.onmessage = (e) => this.handleMessage(worker, e);
      worker.onerror = (e) => this.handleError(worker, e);
      this.workers.push(worker);
      return worker;
    }
    return undefined;
  }

  private handleMessage(worker: Worker, e: MessageEvent) {
    if (this.isStorageWorker) {
      const { id, type, payload } = e.data;
      if (this.pendingPromises.has(id)) {
        const task = this.pendingPromises.get(id)!;
        this.pendingPromises.delete(id);
        if (type === 'SUCCESS') {
          task.resolve(payload);
        } else if (type === 'ERROR') {
          task.reject(new Error(payload));
        }
      }
      this.activeTasks.delete(worker);
      this.processQueue();
    } else {
      const task = this.activeTasks.get(worker);
      if (task) {
        if (e.data.type === 'ERROR') {
          task.reject(new Error(e.data.payload));
        } else {
          task.resolve(e.data.payload);
        }
        this.activeTasks.delete(worker);
        this.processQueue();
      }
    }
  }

  private handleError(worker: Worker, e: ErrorEvent) {
    const task = this.activeTasks.get(worker);
    if (task) {
      task.reject(new Error(e.message));
      this.activeTasks.delete(worker);
      if (task.id) this.pendingPromises.delete(task.id);
      this.processQueue();
    }
  }

  private processQueue() {
    if (this.taskQueue.length === 0) return;

    const availableWorker = this.getOrSpawnWorker();
    if (availableWorker) {
      const task = this.taskQueue.shift()!;
      this.activeTasks.set(availableWorker, task);
      
      if (this.isStorageWorker) {
        const id = ++this.messageIdCounter;
        task.id = id;
        this.pendingPromises.set(id, task);
        availableWorker.postMessage({ id, type: task.type, payload: task.payload });
      } else {
        availableWorker.postMessage({ type: task.type, payload: task.payload });
      }
    }
  }

  public async dispatch(type: string, payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ type, payload, resolve, reject });
      this.processQueue();
    });
  }
}

export const dbWorkerPool = new ManagedWorkerPool(() => new Worker(new URL('../workers/database.worker.ts', import.meta.url), { type: 'module' }), false);
export const storageWorkerPool = new ManagedWorkerPool(() => new Worker(new URL('../workers/exerciseData.worker.ts', import.meta.url), { type: 'module' }), true);
export const analyticsWorkerPool = new ManagedWorkerPool(() => new Worker(new URL('../workers/analytics.worker.ts', import.meta.url), { type: 'module' }), false, 2);
export const searchWorkerPool = new ManagedWorkerPool(() => new Worker(new URL('../workers/search.worker.ts', import.meta.url), { type: 'module' }), false, 2);
export const uiWorkerPool = new ManagedWorkerPool(() => new Worker(new URL('../workers/ui.worker.ts', import.meta.url), { type: 'module' }), false, 2);
