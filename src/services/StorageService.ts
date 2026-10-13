import localforage from 'localforage';
import { storage, UserProfile, AppState, Workout } from './storage';
import { DataMigrationEngine } from './appSubsystems';
import { dataPruningService } from './dataPruningService';
import { vaultService } from './vaultService';
import { silentHydrationEngine } from './silentHydrationEngine';
import { silentVolumeEngine } from './silentVolumeEngine';
import { silentCalorieEngine } from './silentCalorieEngine';
import { silentStepEngine } from './silentStepEngine';
import { realTimeEventMesh } from './realTimeEventMesh';
import { polyglotStorageMesh } from './polyglotStorageMesh';

export type StoragePriority = 'CRITICAL' | 'HIGH' | 'NORMAL' | 'BACKGROUND';

export interface StorageTask<T = any> {
  id: string;
  partitionKey: string;
  priority: StoragePriority;
  operation: () => Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: any) => void;
  enqueuedAt: number;
}

const PRIORITY_WEIGHTS: Record<StoragePriority, number> = {
  CRITICAL: 4,
  HIGH: 3,
  NORMAL: 2,
  BACKGROUND: 1
};

/**
 * Centralized Single-Threaded Asynchronous StorageService Queue Manager & Partition Lock Coordinator
 * 
 * - Eliminates asynchronous timing race conditions across Hydration, Diet, Streak Validator,
 *   40-Day Data Pruning, Reward Vault progress checker, and PDF Export.
 * - Assigns priority keys and locks storage partitions during batch writes.
 * - Integrates with the 7-Tier Polyglot Storage Mesh (ART Memory + Comlink RxDB + OPFS WAL +
 *   Dexie IndexedDB + LocalForage + CacheStorage Vault + W3C Storage Buckets / Web Locks).
 */
export class CentralizedStorageQueueManager {
  private static instance: CentralizedStorageQueueManager | null = null;
  private queue: StorageTask[] = [];
  private isProcessingQueue: boolean = false;
  private lockedPartitions: Set<string> = new Set();
  private globalTransactionLock: boolean = false;
  private startupSequenceCompleted: boolean = false;
  private startupPromise: Promise<void> | null = null;

  public static getInstance(): CentralizedStorageQueueManager {
    if (!this.instance) {
      this.instance = new CentralizedStorageQueueManager();
    }
    return this.instance;
  }

  /**
   * Checks whether a specific partition or global transaction lock is currently active
   */
  public isPartitionLocked(partitionKey: string): boolean {
    return this.globalTransactionLock || this.lockedPartitions.has(partitionKey);
  }

  /**
   * Acquires an explicit partition lock for batch multi-key atomic transactions
   */
  public acquirePartitionLock(partitionKey: string): void {
    this.lockedPartitions.add(partitionKey);
  }

  /**
   * Releases a partition lock and resumes pending queue operations
   */
  public releasePartitionLock(partitionKey: string): void {
    this.lockedPartitions.delete(partitionKey);
    this.processQueue();
  }

  /**
   * Enqueues an asynchronous storage operation with priority ordering
   * and partition-level mutual exclusion.
   */
  public enqueue<T>(
    partitionKey: string,
    operation: () => Promise<T>,
    priority: StoragePriority = 'NORMAL'
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const nonce = typeof crypto !== 'undefined' && crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint8Array(4))).map(b => b.toString(16).padStart(2, '0')).join('') : Date.now().toString(36);
      const task: StorageTask<T> = {
        id: `task_${Date.now()}_${nonce}`,
        partitionKey,
        priority,
        operation,
        resolve,
        reject,
        enqueuedAt: performance.now()
      };

      this.queue.push(task);
      // Sort queue by priority weight descending, then FIFO timestamp
      this.queue.sort((a, b) => {
        const weightDiff = PRIORITY_WEIGHTS[b.priority] - PRIORITY_WEIGHTS[a.priority];
        return weightDiff !== 0 ? weightDiff : a.enqueuedAt - b.enqueuedAt;
      });

      this.processQueue();
    });
  }

  /**
   * Processes queued storage tasks sequentially without overlapping mutations
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue) return;
    this.isProcessingQueue = true;

    try {
      while (this.queue.length > 0) {
        // Find the first task whose partition is not locked (unless it is CRITICAL)
        const nextIdx = this.queue.findIndex(
          t => t.priority === 'CRITICAL' || !this.lockedPartitions.has(t.partitionKey)
        );

        if (nextIdx === -1) {
          // All remaining tasks are waiting on locked partitions
          break;
        }

        const [task] = this.queue.splice(nextIdx, 1);
        this.lockedPartitions.add(task.partitionKey);

        try {
          const result = await realTimeEventMesh.withDistributedLock(task.partitionKey, task.operation);
          task.resolve(result);
        } catch (err) {
          task.reject(err);
        } finally {
          this.lockedPartitions.delete(task.partitionKey);
        }
      }
    } finally {
      this.isProcessingQueue = false;
    }
  }

  /**
   * Serialized Atomic Batch Write across Hydration & Diet or Multi-Store Keys
   */
  public async executeAtomicBatchWrite<T>(
    partitions: string[],
    batchOperation: () => Promise<T>,
    priority: StoragePriority = 'HIGH'
  ): Promise<T> {
    return this.enqueue(
      partitions.join('+'),
      async () => {
        this.globalTransactionLock = true;
        partitions.forEach(p => this.lockedPartitions.add(p));
        try {
          return await batchOperation();
        } finally {
          partitions.forEach(p => this.lockedPartitions.delete(p));
          this.globalTransactionLock = false;
        }
      },
      priority
    );
  }

  /**
   * Serialized Startup Sequence:
   * Executes strictly in sequence through the queue manager:
   * 0. Initialize 7-Tier Polyglot Storage Mesh (OPFS + Dexie + RxDB + LocalForage + CacheStorage + Storage Buckets)
   * 1. Zero-Downtime Legacy Data Migration (purging any legacy localStorage hooks)
   * 2. Streak Continuity Validator
   * 3. 40-Day Automated Data Pruning
   * 4. Hydration Goal & Daily Fluid Ledger Updater
   * 5. Reward Vault Milestone & Progress Checker
   */
  public async runStartupSequence(): Promise<void> {
    if (this.startupSequenceCompleted) return;
    if (this.startupPromise) return this.startupPromise;

    this.startupPromise = this.enqueue(
      'startup_sequence',
      async () => {
        try {
          // Step 0: Boot 7-Tier Polyglot Storage Mesh
          await polyglotStorageMesh.initializeMesh();

          // Step 1: Migrate & purge any legacy localStorage items into async 7-tier storage
          await DataMigrationEngine.migrateLegacyData();

          // Step 2: Validate Streak Continuity
          await storage.checkStreakContinuity();

          // Step 3: 40-Day Automated Data Pruning
          await dataPruningService.runAutomatedPruning();

          // Step 4: Hydration Goal & Silent Telemetry Ledgers
          await silentHydrationEngine.silentlyRecalculate();
          await silentCalorieEngine.silentlyRecalculate();
          await silentVolumeEngine.silentlyRecalculate();
          await silentStepEngine.silentlyRecalculate();

          // Step 5: Reward Vault Progress & Milestone Evaluation
          await vaultService.evaluateVaultMilestones();

          // Step 6: Silent 24/7 Autonomic Self-Healing & 7-Tier BFT Quorum Daemon
          const { autonomicSelfHealingEngine } = await import('./autonomicSelfHealingEngine');
          await autonomicSelfHealingEngine.executeMapeKCycle(true);

          this.startupSequenceCompleted = true;
        } catch (err) {
          console.warn('[StorageService] Serialized startup sequence notice:', err);
        }
      },
      'CRITICAL'
    );

    return this.startupPromise;
  }

  /**
   * Serialized 7-Tier Polyglot Quorum getItem wrapper
   */
  public async getItem<T>(key: string, priority: StoragePriority = 'NORMAL'): Promise<T | null> {
    return this.enqueue(
      key,
      async () => {
        const res = await polyglotStorageMesh.readQuorum<T>(key);
        if (res !== null && res !== undefined) return res;
        return await localforage.getItem<T>(key);
      },
      priority
    );
  }

  /**
   * Serialized 7-Tier Polyglot Quorum setItem wrapper
   */
  public async setItem<T>(key: string, value: T, priority: StoragePriority = 'NORMAL'): Promise<T> {
    return this.enqueue(
      key,
      async () => {
        await polyglotStorageMesh.writeQuorum<T>(key, value);
        return value;
      },
      priority
    );
  }

  /**
   * Serialized 7-Tier Polyglot Quorum removeItem wrapper
   */
  public async removeItem(key: string, priority: StoragePriority = 'NORMAL'): Promise<void> {
    return this.enqueue(
      key,
      async () => {
        await polyglotStorageMesh.removeQuorum(key);
      },
      priority
    );
  }
}

export const storageQueueManager = CentralizedStorageQueueManager.getInstance();
export { storage };
export type { UserProfile, AppState, Workout };
export default storageQueueManager;
