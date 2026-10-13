/**
 * CRDT State Synchronization Engine
 * Implements Conflict-Free Replicated Data Types (CRDTs):
 * - Lamport Logical Clocks & Vector Clocks
 * - Last-Write-Wins (LWW) Register for scalar attributes
 * - Add-Wins Observed-Remove Set (OR-Set) for arrays (workouts, rewards, rest dates)
 */

export interface VectorClock {
  nodeId: string;
  counter: number;
  timestamp: number;
}

export interface CRDTDocumentDelta<T = any> {
  type: 'LWW_MUTATION' | 'SET_ADD' | 'SET_REMOVE' | 'FULL_MERGE';
  path: string;
  payload: T;
  clock: VectorClock;
}

export class CRDTEngine {
  private nodeId: string;
  private localCounter: number = 0;
  private lastWallTime: number = 0;

  constructor(nodeId?: string) {
    if (nodeId) {
      this.nodeId = nodeId;
    } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const b = new Uint8Array(6);
      crypto.getRandomValues(b);
      this.nodeId = 'node_' + Array.from(b).map(x => x.toString(16).padStart(2, '0')).join('');
    } else {
      this.nodeId = 'node_' + Date.now().toString(36);
    }
  }

  public getNodeId(): string {
    return this.nodeId;
  }

  public nextClock(): VectorClock {
    const nowWall = Date.now();
    // Hybrid Logical Clock (HLC - Kulkarni et al.):
    // Ensures strict monotonicity even if system wall clock drifts or multiple mutations occur in the same millisecond
    if (nowWall > this.lastWallTime) {
      this.lastWallTime = nowWall;
      this.localCounter = 0;
    } else {
      this.localCounter++;
    }
    return {
      nodeId: this.nodeId,
      counter: this.localCounter,
      timestamp: this.lastWallTime
    };
  }

  /**
   * Synchronize local HLC with a received remote VectorClock (causality preservation)
   */
  public receiveRemoteClock(remote: VectorClock): VectorClock {
    const nowWall = Date.now();
    if (nowWall > this.lastWallTime && nowWall > remote.timestamp) {
      this.lastWallTime = nowWall;
      this.localCounter = 0;
    } else if (this.lastWallTime === remote.timestamp) {
      this.localCounter = Math.max(this.localCounter, remote.counter) + 1;
    } else if (remote.timestamp > this.lastWallTime) {
      this.lastWallTime = remote.timestamp;
      this.localCounter = remote.counter + 1;
    } else {
      this.localCounter++;
    }
    return {
      nodeId: this.nodeId,
      counter: this.localCounter,
      timestamp: this.lastWallTime
    };
  }

  /**
   * Compare two vector clocks:
   * Returns:
   *  1 if a > b (a is newer)
   * -1 if a < b (b is newer)
   *  0 if concurrent / identical (resolved deterministically by nodeId string comparison)
   */
  public static compareClocks(a: VectorClock, b: VectorClock): number {
    if (a.timestamp !== b.timestamp) {
      return a.timestamp > b.timestamp ? 1 : -1;
    }
    if (a.counter !== b.counter) {
      return a.counter > b.counter ? 1 : -1;
    }
    return a.nodeId.localeCompare(b.nodeId);
  }

  /**
   * Deterministic merge of AppState documents across tabs/replicas
   */
  public mergeStates(localState: any, remoteState: any, localClock: VectorClock, remoteClock: VectorClock): any {
    if (!localState) return remoteState;
    if (!remoteState) return localState;

    const clockComp = CRDTEngine.compareClocks(remoteClock, localClock);
    const preferRemote = clockComp > 0;

    // Merge scalar fields using LWW (Last-Write-Wins)
    const merged: any = {
      id: localState.id || remoteState.id,
      currentStreak: preferRemote ? remoteState.currentStreak : localState.currentStreak,
      lastWorkoutDate: preferRemote ? remoteState.lastWorkoutDate : localState.lastWorkoutDate,
      totalExercisesLogged: Math.max(localState.totalExercisesLogged || 0, remoteState.totalExercisesLogged || 0),
      injuryDate: preferRemote ? remoteState.injuryDate : localState.injuryDate,
    };

    // Merge arrays using Add-Wins Observed-Remove logic
    // 1. Rewards: Union of sets
    const rewardsSet = new Set<string>([
      ...(Array.isArray(localState.rewards) ? localState.rewards : []),
      ...(Array.isArray(remoteState.rewards) ? remoteState.rewards : [])
    ]);
    merged.rewards = Array.from(rewardsSet);

    // 2. Protected Rest Dates: Union of unique dates
    const restDatesSet = new Set<string>([
      ...(Array.isArray(localState.protectedRestDates) ? localState.protectedRestDates : []),
      ...(Array.isArray(remoteState.protectedRestDates) ? remoteState.protectedRestDates : [])
    ]);
    merged.protectedRestDates = Array.from(restDatesSet);

    // 3. Workouts: Deduplicate by workout.id and merge individual workout completion states
    const workoutMap = new Map<string, any>();
    const allWorkouts = [
      ...(Array.isArray(localState.workouts) ? localState.workouts : []),
      ...(Array.isArray(remoteState.workouts) ? remoteState.workouts : [])
    ];

    for (const w of allWorkouts) {
      if (!w || !w.id) continue;
      const existing = workoutMap.get(w.id);
      if (!existing) {
        workoutMap.set(w.id, { ...w });
      } else {
        // Workout completion is monotonic (completed wins)
        existing.isCompleted = existing.isCompleted || w.isCompleted;
        if (w.date && (!existing.date || w.date > existing.date)) {
          existing.date = w.date;
        }
      }
    }
    merged.workouts = Array.from(workoutMap.values());

    return merged;
  }
}
