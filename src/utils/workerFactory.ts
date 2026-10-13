/**
 * Autonomous Worker Factory 
 * 
 * Manages a persistent, pre-warmed pool of universal workers. 
 * Caps maximum threads directly to navigator.hardwareConcurrency to prevent 
 * OS-level thread thrashing, dynamically assigning specific computational domains 
 * (search, history parsing, analytics) to the next available idle thread.
 */

export interface UnifiedTask {
  id: number;
  domain: 'search' | 'analytics' | 'history' | 'database' | 'prediction';
  type: string;
  payload?: any;
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}

class UnifiedWorkerFactory {
  private workers: Worker[] = [];
  private taskQueue: UnifiedTask[] = [];
  private activeTasks: Map<Worker, UnifiedTask> = new Map();
  private pendingPromises: Map<number, UnifiedTask> = new Map();
  private taskIdCounter = 0;
  private poolSize: number;

  constructor() {
    // Dynamically scale pool based on user device hardware specs
    this.poolSize = typeof navigator !== 'undefined' ? Math.max(2, navigator.hardwareConcurrency || 4) : 4;
    this.preWarmPool();
  }

  private preWarmPool() {
    if (typeof Worker === 'undefined') return;
    
    // Boot workers instantly on mount (Pre-warming)
    for (let i = 0; i < this.poolSize; i++) {
      const worker = new Worker(new URL('../workers/unified.worker.ts', import.meta.url), { type: 'module' });
      
      worker.onmessage = (e) => {
        const { id, status, payload } = e.data;
        const task = this.pendingPromises.get(id);
        
        if (task) {
          this.pendingPromises.delete(id);
          this.activeTasks.delete(worker);
          
          if (status === 'SUCCESS') task.resolve(payload);
          else task.reject(new Error(payload));
          
          // Thread freed -> Auto-assign next pending queue task
          this.assignNextTask();
        }
      };
      
      worker.onerror = (e) => {
        const task = this.activeTasks.get(worker);
        if (task) {
          task.reject(new Error(e.message));
          this.activeTasks.delete(worker);
          this.pendingPromises.delete(task.id);
          this.assignNextTask();
        }
      };
      
      this.workers.push(worker);
    }
  }

  private assignNextTask() {
    if (this.taskQueue.length === 0) return;
    
    const availableWorker = this.workers.find(w => !this.activeTasks.has(w));
    
    if (availableWorker) {
      const task = this.taskQueue.shift()!;
      this.activeTasks.set(availableWorker, task);
      this.pendingPromises.set(task.id, task);
      
      availableWorker.postMessage({
        id: task.id,
        domain: task.domain,
        type: task.type,
        payload: task.payload
      });
    }
  }

  /**
   * Dispatches a computation payload to the pre-warmed thread pool.
   * If all threads are saturated, it automatically queues and yields.
   */
  public async execute(domain: UnifiedTask['domain'], type: string, payload?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const id = ++this.taskIdCounter;
      this.taskQueue.push({ id, domain, type, payload, resolve, reject });
      this.assignNextTask();
    });
  }
  
  public getMetrics() {
    return {
      poolSize: this.poolSize,
      activeThreads: this.activeTasks.size,
      queuedTasks: this.taskQueue.length
    };
  }
}

// Export a single, globally scaled factory instance
export const globalWorkerFactory = new UnifiedWorkerFactory();
