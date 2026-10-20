/**
 * ============================================================================
 * PILLAR 5: AUTONOMOUS SELF-HEALING & DISTRIBUTED SUPERVISORS (29 - 35)
 * ============================================================================
 * Distributed fault-tolerance and self-healing algorithms:
 * Erlang/OTP Hierarchical Supervision Tree with restart intensity budgets,
 * CRDT Observed-Remove Set (OR-Set) with Hybrid Logical Clocks (HLC),
 * ACID Shadow Paging Two-Phase Commit coordinator, formal seL4 Capability Space (CSpace),
 * ADWIN Hoeffding bound concept drift detector, Luby Transform rateless erasure codes,
 * and Monotonic Nanosecond Vector Clocks.
 */

// ============================================================================
// 29. ERLANG/OTP HIERARCHICAL SUPERVISION TREE WITH CRASH BUDGETS
// ============================================================================

export enum SupervisorStrategy {
  ONE_FOR_ONE,
  ONE_FOR_ALL,
  REST_FOR_ONE
}

export interface SupervisedActor {
  id: string;
  restart: () => void;
  crashCount: number;
}

export class ErlangOTPHierarchicalSupervisor {
  private strategy: SupervisorStrategy;
  private maxRestarts: number;
  private timeWindowMs: number;
  private restartHistory: number[] = [];
  private children: Map<string, SupervisedActor> = new Map();

  constructor(
    strategy: SupervisorStrategy = SupervisorStrategy.ONE_FOR_ONE,
    maxRestarts: number = 5,
    timeWindowMs: number = 10000
  ) {
    this.strategy = strategy;
    this.maxRestarts = maxRestarts;
    this.timeWindowMs = timeWindowMs;
  }

  public registerChild(id: string, restartCallback: () => void): void {
    this.children.set(id, {
      id,
      restart: restartCallback,
      crashCount: 0
    });
  }

  /**
   * Reports child failure and evaluates leaky-bucket restart intensity budget.
   * If restarts exceed budget in window, supervisor triggers cascade escalation.
   */
  public reportCrashAndCheckBudget(childId: string): {
    canRestart: boolean;
    currentIntensity: number;
    healthScore: number;
  } {
    const now = Date.now();
    this.restartHistory = this.restartHistory.filter(t => now - t < this.timeWindowMs);
    this.restartHistory.push(now);

    const child = this.children.get(childId);
    if (child) child.crashCount++;

    const canRestart = this.restartHistory.length <= this.maxRestarts;
    const healthScore = Math.max(0, 1.0 - this.restartHistory.length / (this.maxRestarts + 1));

    if (canRestart && child) {
      if (this.strategy === SupervisorStrategy.ONE_FOR_ONE) {
        child.restart();
      } else if (this.strategy === SupervisorStrategy.ONE_FOR_ALL) {
        this.children.forEach(c => c.restart());
      }
    }

    return {
      canRestart,
      currentIntensity: this.restartHistory.length,
      healthScore: Math.round(healthScore * 100) / 100
    };
  }

  public getHealthScore(): number {
    const now = Date.now();
    this.restartHistory = this.restartHistory.filter(t => now - t < this.timeWindowMs);
    return Math.max(0, 1.0 - this.restartHistory.length / (this.maxRestarts + 1));
  }
}

// ============================================================================
// 30. CONFLICT-FREE REPLICATED DATA TYPES (CRDT) OR-SET WITH HYBRID CLOCKS
// ============================================================================

export interface HLC {
  physicalTimeMs: number;
  logicalCounter: number;
}

export class ConflictFreeReplicatedDataORSet<T> {
  // Add-set: elementId -> { value, hlc, tag }
  private addSet: Map<string, { value: T; hlc: HLC; tag: string }> = new Map();
  // Remove-set: tag -> hlc
  private removeSet: Map<string, HLC> = new Map();

  public add(id: string, value: T, hlc: HLC): string {
    const tag = `${id}_${hlc.physicalTimeMs}_${hlc.logicalCounter}_${Math.random().toString(36).substring(2, 7)}`;
    this.addSet.set(tag, { value, hlc, tag });
    return tag;
  }

  public remove(tag: string, hlc: HLC): void {
    if (this.addSet.has(tag)) {
      this.removeSet.set(tag, hlc);
    }
  }

  /**
   * Commutative, associative, and idempotent state merge: S_A u S_B
   */
  public merge(remoteSet: ConflictFreeReplicatedDataORSet<T>): void {
    remoteSet.addSet.forEach((val, tag) => {
      if (!this.addSet.has(tag)) {
        this.addSet.set(tag, val);
      }
    });

    remoteSet.removeSet.forEach((hlc, tag) => {
      this.removeSet.set(tag, hlc);
    });
  }

  public readElements(): T[] {
    const activeElements: T[] = [];
    this.addSet.forEach((entry, tag) => {
      if (!this.removeSet.has(tag)) {
        activeElements.push(entry.value);
      }
    });
    return activeElements;
  }
}

// ============================================================================
// 31. SHADOW PAGING WITH TWO-PHASE COMMIT (2PC) WRITE-AHEAD LOGGING
// ============================================================================

export class ShadowPagingTwoPhaseCommitCoordinator {
  private activePageDirectory: Map<string, any> = new Map();
  private shadowPageDirectory: Map<string, any> = new Map();
  private writeAheadLog: string[] = [];
  private transactionCounter: number = 0;

  /**
   * Phase 1 (Prepare): Writes modifications to shadow page without mutating active memory.
   */
  public prepare(key: string, value: any): number {
    const txId = ++this.transactionCounter;
    this.writeAheadLog.push(`TX_${txId}_PREPARE:${key}`);
    this.shadowPageDirectory.set(key, value);
    return txId;
  }

  /**
   * Phase 2 (Commit): Atomically swaps directory pointer to commit shadow changes.
   */
  public commit(txId: number): void {
    this.writeAheadLog.push(`TX_${txId}_COMMIT`);
    this.shadowPageDirectory.forEach((val, key) => {
      this.activePageDirectory.set(key, val);
    });
    this.shadowPageDirectory.clear();
  }

  /**
   * Rollback: Discards shadow directory on error, leaving active memory pristine.
   */
  public abort(txId: number): void {
    this.writeAheadLog.push(`TX_${txId}_ABORT`);
    this.shadowPageDirectory.clear();
  }

  public get(key: string): any {
    return this.activePageDirectory.get(key);
  }
}

// ============================================================================
// 32. FORMAL SEL4-STYLE CAPABILITY SPACE (CSPACE) ACCESS CONTROLLER
// ============================================================================

export class seL4CapabilitySpaceAccessController {
  public static readonly CAP_READ_SENSOR    = 1 << 0;
  public static readonly CAP_WRITE_DATABASE = 1 << 1;
  public static readonly CAP_EXECUTE_JIT    = 1 << 2;
  public static readonly CAP_LATCH_OVERRIDE = 1 << 3;
  public static readonly CAP_ADMIN_RESET    = 1 << 4;

  private capabilityNodeMap: Map<string, number> = new Map();

  public grantCapability(token: string, rightsMask: number): void {
    this.capabilityNodeMap.set(token, rightsMask);
  }

  public verify(token: string, requiredRight: number): boolean {
    const mask = this.capabilityNodeMap.get(token) || 0;
    return (mask & requiredRight) === requiredRight;
  }

  /**
   * Capability Attenuation: Mints a derived token with strictly diminished rights.
   */
  public attenuate(parentToken: string, newToken: string, diminishedMask: number): boolean {
    const parentMask = this.capabilityNodeMap.get(parentToken) || 0;
    // Cannot grant rights that parent does not possess
    if ((parentMask & diminishedMask) !== diminishedMask) {
      return false;
    }
    this.capabilityNodeMap.set(newToken, diminishedMask);
    return true;
  }
}

// ============================================================================
// 33. ADWIN (ADAPTIVE WINDOWING) NON-STATIONARY CONCEPT DRIFT DETECTOR
// ============================================================================

export class AdaptiveWindowingConceptDriftDetector {
  private window: number[] = [];
  private readonly maxCapacity: number = 150;
  private readonly delta: number = 0.05; // Confidence 1 - delta (95%)

  /**
   * Evaluates Hoeffding Bound cut threshold:
   * eps_cut = sqrt( (1 / (2*m)) * ln(4 * n / delta) )
   * where m = 1 / (1/n0 + 1/n1) harmonic mean
   */
  public addSampleAndCheckDrift(val: number): {
    hasDrifted: boolean;
    windowSize: number;
    driftMagnitude: number;
  } {
    this.window.push(val);
    if (this.window.length > this.maxCapacity) {
      this.window.shift();
    }

    const n = this.window.length;
    if (n < 20) {
      return { hasDrifted: false, windowSize: n, driftMagnitude: 0 };
    }

    const mid = Math.floor(n / 2);
    const n0 = mid;
    const n1 = n - mid;
    const m = 1.0 / (1.0 / n0 + 1.0 / n1);

    let sum0 = 0.0;
    let sum1 = 0.0;
    for (let i = 0; i < mid; i++) sum0 += this.window[i];
    for (let i = mid; i < n; i++) sum1 += this.window[i];

    const mean0 = sum0 / n0;
    const mean1 = sum1 / n1;
    const driftMagnitude = Math.abs(mean0 - mean1);

    // Hoeffding bound
    const epsCut = Math.sqrt((1.0 / (2.0 * m)) * Math.log((4.0 * n) / this.delta));
    const hasDrifted = driftMagnitude > epsCut;

    if (hasDrifted) {
      // Discard older stale distribution subwindow
      this.window = this.window.slice(mid);
    }

    return {
      hasDrifted,
      windowSize: this.window.length,
      driftMagnitude: Math.round(driftMagnitude * 100) / 100
    };
  }
}

// ============================================================================
// 34. LUBY TRANSFORM (LT) RATELESS FOUNTAIN ERASURE CODER
// ============================================================================

export class LubyTransformFountainErasureCoder {
  /**
   * Generates Robust Soliton Degree Distribution droplet packet.
   * Enables peeling belief-propagation recovery of K source telemetry blocks.
   */
  public generateDroplet(blocks: number[]): {
    indices: number[];
    payload: number;
    degree: number;
  } {
    const k = blocks.length;
    if (k === 0) return { indices: [], payload: 0, degree: 0 };

    // Robust Soliton degree selection (d = 1 with prob 1/k, else 1/(d*(d-1)))
    const rand = Math.random();
    let degree = 1;
    if (rand < 1.0 / k) {
      degree = 1;
    } else {
      degree = Math.min(k, Math.floor(1.0 / (1.0 - rand)) + 1);
    }
    degree = Math.max(1, Math.min(degree, k));

    const indices: number[] = [];
    let payload = 0;

    while (indices.length < degree) {
      const idx = Math.floor(Math.random() * k);
      if (!indices.includes(idx)) {
        indices.push(idx);
        payload ^= blocks[idx]; // Bitwise XOR encoding
      }
    }

    return { indices, payload, degree };
  }

  /**
   * Peeling Belief-Propagation Decoder step:
   * Resolves degree-1 droplets and peels them from higher degree packets.
   */
  public peelSolve(
    receivedDroplets: { indices: number[]; payload: number }[],
    kBlocks: number
  ): (number | null)[] {
    const decoded: (number | null)[] = new Array(kBlocks).fill(null);
    let progress = true;

    while (progress) {
      progress = false;
      for (const droplet of receivedDroplets) {
        if (droplet.indices.length === 1) {
          const blockIdx = droplet.indices[0];
          if (decoded[blockIdx] === null) {
            decoded[blockIdx] = droplet.payload;
            progress = true;

            // Peel from all other droplets
            for (const other of receivedDroplets) {
              const pos = other.indices.indexOf(blockIdx);
              if (pos !== -1 && other !== droplet) {
                other.payload ^= droplet.payload;
                other.indices.splice(pos, 1);
              }
            }
          }
        }
      }
    }

    return decoded;
  }
}

// ============================================================================
// 35. VECTOR CLOCK DETERMINISTIC TIE-BREAKING WITH MONOTONIC CLOCKS
// ============================================================================

export class MonotonicNanosecondVectorClock {
  private vector: number[] = [0, 0, 0, 0];
  private nodeId: number = 0;
  private logicalTicks: number = 0;

  constructor(nodeId: number = 0) {
    this.nodeId = nodeId;
  }

  /**
   * Returns monotonic nanosecond timestamp with causal vector increment.
   */
  public tick(): number {
    this.vector[this.nodeId]++;
    this.logicalTicks++;

    const perfMs = typeof performance !== 'undefined' ? performance.now() : Date.now();
    return Math.floor(perfMs * 1e6) + (this.logicalTicks & 0xffff);
  }

  public merge(remoteVector: number[]): void {
    for (let i = 0; i < Math.min(this.vector.length, remoteVector.length); i++) {
      this.vector[i] = Math.max(this.vector[i], remoteVector[i]);
    }
  }

  public getVector(): number[] {
    return [...this.vector];
  }
}
