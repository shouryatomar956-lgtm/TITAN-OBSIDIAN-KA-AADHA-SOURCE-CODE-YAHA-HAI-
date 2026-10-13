import { wrap } from 'comlink';

class TriCoreWorkerPool {
  private workerA: Worker | null = null;
  private workerB: Worker | null = null;

  public threadA: any = null;
  public threadB: any = null;

  constructor() {
    // Lazy initialization on first task execution
  }

  private ensureInit() {
    if (typeof window === 'undefined') return;
    
    if (!this.workerA) {
      // Worker Thread A: Data aggregation, feature engineering, delta calculations
      this.workerA = new Worker(new URL('../workers/workerA.ts', import.meta.url), { type: 'module' });
      this.threadA = wrap(this.workerA);
    }

    if (!this.workerB) {
      // Worker Thread B: ONNX / TF.js tensor routines, XGBoost evaluations
      this.workerB = new Worker(new URL('../workers/workerB.ts', import.meta.url), { type: 'module' });
      this.threadB = wrap(this.workerB);
    }
  }

  // Support for Dashboard component requesting Smart Suggestions
  public async execute(taskType: string, payload: any): Promise<any> {
    this.ensureInit();
    if (!this.threadA) throw new Error("Worker pool not initialized");
    
    if (taskType === 'GENERATE_WORKOUT') {
      // Routing workout generation strictly to Thread A with full workout history for progressive overload
      return await this.threadA.aggregateAndGenerateWorkout(
        payload.profile,
        payload.mood,
        payload.isInjured,
        payload.workouts
      );
    }

    if (taskType === 'GET_DIAGNOSTICS') {
      return await this.threadA.getBootstrapAndOverloadDiagnostics(
        payload.profile,
        payload.mood,
        payload.workouts
      );
    }
    
    throw new Error(`Unknown task type: ${taskType}`);
  }

  public terminate() {
    this.workerA?.terminate();
    this.workerB?.terminate();
  }
}

export const suggestionWorkerPool = new TriCoreWorkerPool();
