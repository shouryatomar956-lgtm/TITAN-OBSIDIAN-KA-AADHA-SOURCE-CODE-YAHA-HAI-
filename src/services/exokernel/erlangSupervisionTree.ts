/**
 * ============================================================================
 * EXOKERNEL PILLAR 4: ERLANG/OTP HIERARCHICAL SUPERVISION TREE & ACTOR ENGINE
 * ============================================================================
 * Fault-tolerant actor runtime:
 * - Subsystems isolated as SupervisedWorkerActors
 * - Configurable restart strategies: one_for_one, one_for_all, rest_for_one
 * - Sliding-window crash intensity budget (MaxRestarts / TimeWindow)
 * - Micro-heartbeat dead-man switch detecting stalled subsystems in <100ms
 */

export enum ActorState {
  INITIALIZING = 'INITIALIZING',
  RUNNING      = 'RUNNING',
  STALLED      = 'STALLED',
  CRASHED      = 'CRASHED',
  TERMINATED   = 'TERMINATED'
}

export enum SupervisionStrategy {
  ONE_FOR_ONE  = 'ONE_FOR_ONE',
  ONE_FOR_ALL  = 'ONE_FOR_ALL',
  REST_FOR_ONE = 'REST_FOR_ONE'
}

export interface ActorSpec {
  id: string;
  name: string;
  maxRestarts: number;
  timeWindowMs: number;
  init: () => void | Promise<void>;
  healthCheck: () => boolean;
  shutdown: () => void | Promise<void>;
}

export class SupervisedWorkerActor {
  public readonly id: string;
  public readonly name: string;
  public state: ActorState = ActorState.INITIALIZING;
  public crashTimestamps: number[] = [];
  public lastHeartbeatMs: number = Date.now();
  public restartCount: number = 0;
  private spec: ActorSpec;

  constructor(spec: ActorSpec) {
    this.spec = spec;
    this.id = spec.id;
    this.name = spec.name;
    this.boot();
  }

  public boot(): void {
    try {
      this.spec.init();
      this.state = ActorState.RUNNING;
      this.lastHeartbeatMs = Date.now();
    } catch {
      this.handleCrash();
    }
  }

  public ping(): boolean {
    if (this.state === ActorState.TERMINATED) return false;
    try {
      const isHealthy = this.spec.healthCheck();
      if (isHealthy) {
        this.lastHeartbeatMs = Date.now();
        this.state = ActorState.RUNNING;
        return true;
      } else {
        this.state = ActorState.STALLED;
        return false;
      }
    } catch {
      this.handleCrash();
      return false;
    }
  }

  public handleCrash(): boolean {
    const now = Date.now();
    this.state = ActorState.CRASHED;
    this.crashTimestamps = this.crashTimestamps.filter(t => now - t < this.spec.timeWindowMs);
    this.crashTimestamps.push(now);

    if (this.crashTimestamps.length > this.spec.maxRestarts) {
      this.state = ActorState.TERMINATED;
      return false; // Intensity budget exceeded
    }

    this.restartCount++;
    this.boot();
    return true;
  }

  public terminate(): void {
    try {
      this.spec.shutdown();
    } finally {
      this.state = ActorState.TERMINATED;
    }
  }
}

export class ErlangOtpSupervisionTree {
  private actors: Map<string, SupervisedWorkerActor> = new Map();
  private strategy: SupervisionStrategy;
  private heartbeatIntervalId: any = null;
  private totalCascades: number = 0;

  constructor(strategy: SupervisionStrategy = SupervisionStrategy.ONE_FOR_ONE) {
    this.strategy = strategy;
    this.startMicroHeartbeatDaemon();
  }

  public registerActor(spec: ActorSpec): void {
    const actor = new SupervisedWorkerActor(spec);
    this.actors.set(spec.id, actor);
  }

  private startMicroHeartbeatDaemon(): void {
    if (typeof window === 'undefined') return;

    this.heartbeatIntervalId = window.setInterval(() => {
      this.actors.forEach((actor) => {
        const ok = actor.ping();
        if (!ok && actor.state === ActorState.STALLED) {
          this.applyStrategyRecovery(actor.id);
        }
      });
    }, 100); // 100ms micro-heartbeat dead-man switch
  }

  private applyStrategyRecovery(failedActorId: string): void {
    const failedActor = this.actors.get(failedActorId);
    if (!failedActor) return;

    if (this.strategy === SupervisionStrategy.ONE_FOR_ONE) {
      failedActor.handleCrash();
    } else if (this.strategy === SupervisionStrategy.ONE_FOR_ALL) {
      this.totalCascades++;
      this.actors.forEach(a => a.handleCrash());
    } else if (this.strategy === SupervisionStrategy.REST_FOR_ONE) {
      this.totalCascades++;
      let found = false;
      this.actors.forEach((a) => {
        if (a.id === failedActorId) found = true;
        if (found) a.handleCrash();
      });
    }
  }

  public getStats() {
    const states: Record<string, string> = {};
    let running = 0;
    this.actors.forEach((a, id) => {
      states[id] = a.state;
      if (a.state === ActorState.RUNNING) running++;
    });

    return {
      totalActors: this.actors.size,
      runningActors: running,
      strategy: this.strategy,
      totalCascades: this.totalCascades,
      actorStates: states
    };
  }
}
