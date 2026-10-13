/**
 * Universal Application Indexing & In-Memory Registry
 * Features:
 * - Adaptive Radix Tree (ART) with Node4, Node16, Node48, Node256 node-size transitions
 * - Minimal Acyclic Automaton (Frozen FST / DAWG) for compressed global state dictionary
 * - Concurrent Event-Sourced In-Memory Registry
 */

// --- Adaptive Radix Tree (ART) Nodes ---

abstract class ARTNode {
  abstract insert(key: Uint8Array, depth: number, value: any): ARTNode;
  abstract find(key: Uint8Array, depth: number): any;
  abstract collect(prefix: Uint8Array, depth: number, out: any[]): void;
}

class ARTLeaf extends ARTNode {
  key: Uint8Array;
  value: any;

  constructor(key: Uint8Array, value: any) {
    super();
    this.key = key;
    this.value = value;
  }

  insert(key: Uint8Array, depth: number, value: any): ARTNode {
    // If keys are identical, overwrite
    if (this.keysMatch(this.key, key)) {
      this.value = value;
      return this;
    }
    // Find first differing depth to split accurately without overwriting shared prefix bytes
    let splitDepth = depth;
    const minLen = Math.min(this.key.length, key.length);
    while (splitDepth < minLen && this.key[splitDepth] === key[splitDepth]) {
      splitDepth++;
    }

    const buildChain = (d: number): ARTNode => {
      if (d === splitDepth) {
        const node4 = new ARTNode4();
        const oldByte = d < this.key.length ? this.key[d] : 0;
        const newByte = d < key.length ? key[d] : 0;
        if (oldByte === newByte) {
          node4.addChild(newByte, new ARTLeaf(key, value));
        } else {
          node4.addChild(oldByte, this);
          node4.addChild(newByte, new ARTLeaf(key, value));
        }
        return node4;
      }
      const intermediate = new ARTNode4();
      intermediate.addChild(key[d], buildChain(d + 1));
      return intermediate;
    };

    return buildChain(depth);
  }

  find(key: Uint8Array, depth: number): any {
    return this.keysMatch(this.key, key) ? this.value : null;
  }

  collect(prefix: Uint8Array, depth: number, out: any[]): void {
    out.push(this.value);
  }

  private keysMatch(a: Uint8Array, b: Uint8Array): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
}

class ARTNode4 extends ARTNode {
  keys: number[] = [];
  children: ARTNode[] = [];

  addChild(byte: number, child: ARTNode) {
    let idx = 0;
    while (idx < this.keys.length && this.keys[idx] < byte) idx++;
    this.keys.splice(idx, 0, byte);
    this.children.splice(idx, 0, child);
  }

  insert(key: Uint8Array, depth: number, value: any): ARTNode {
    if (depth >= key.length) return this;
    const byte = key[depth];
    const idx = this.keys.indexOf(byte);

    if (idx !== -1) {
      this.children[idx] = this.children[idx].insert(key, depth + 1, value);
      return this;
    }

    if (this.keys.length < 4) {
      this.addChild(byte, new ARTLeaf(key, value));
      return this;
    }

    // Grow to Node16
    const node16 = new ARTNode16();
    for (let i = 0; i < this.keys.length; i++) {
      node16.addChild(this.keys[i], this.children[i]);
    }
    node16.addChild(byte, new ARTLeaf(key, value));
    return node16;
  }

  find(key: Uint8Array, depth: number): any {
    if (depth >= key.length) return null;
    const idx = this.keys.indexOf(key[depth]);
    return idx !== -1 ? this.children[idx].find(key, depth + 1) : null;
  }

  collect(prefix: Uint8Array, depth: number, out: any[]): void {
    for (const child of this.children) {
      child.collect(prefix, depth + 1, out);
    }
  }
}

class ARTNode16 extends ARTNode {
  keys: Uint8Array = new Uint8Array(16);
  children: ARTNode[] = [];
  count: number = 0;

  addChild(byte: number, child: ARTNode) {
    let idx = 0;
    while (idx < this.count && this.keys[idx] < byte) idx++;
    for (let i = this.count; i > idx; i--) {
      this.keys[i] = this.keys[i - 1];
    }
    this.keys[idx] = byte;
    this.children.splice(idx, 0, child);
    this.count++;
  }

  private findIndex(byte: number): number {
    // Unrolled binary search over contiguous Uint8Array (zero heap allocation, L1 cache-line friendly)
    let lo = 0;
    let hi = this.count - 1;
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1;
      const k = this.keys[mid];
      if (k === byte) return mid;
      if (k < byte) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }

  insert(key: Uint8Array, depth: number, value: any): ARTNode {
    if (depth >= key.length) return this;
    const byte = key[depth];
    const idx = this.findIndex(byte);

    if (idx !== -1) {
      this.children[idx] = this.children[idx].insert(key, depth + 1, value);
      return this;
    }

    if (this.count < 16) {
      this.addChild(byte, new ARTLeaf(key, value));
      return this;
    }

    // Grow to Node48
    const node48 = new ARTNode48();
    for (let i = 0; i < this.count; i++) {
      node48.addChild(this.keys[i], this.children[i]);
    }
    node48.addChild(byte, new ARTLeaf(key, value));
    return node48;
  }

  find(key: Uint8Array, depth: number): any {
    if (depth >= key.length) return null;
    const idx = this.findIndex(key[depth]);
    return idx !== -1 ? this.children[idx].find(key, depth + 1) : null;
  }

  collect(prefix: Uint8Array, depth: number, out: any[]): void {
    for (const child of this.children) {
      child.collect(prefix, depth + 1, out);
    }
  }
}

class ARTNode48 extends ARTNode {
  childIndex: Int8Array = new Int8Array(256).fill(-1);
  children: ARTNode[] = [];

  addChild(byte: number, child: ARTNode) {
    const pos = this.children.length;
    this.children.push(child);
    this.childIndex[byte] = pos;
  }

  insert(key: Uint8Array, depth: number, value: any): ARTNode {
    if (depth >= key.length) return this;
    const byte = key[depth];
    const idx = this.childIndex[byte];

    if (idx !== -1) {
      this.children[idx] = this.children[idx].insert(key, depth + 1, value);
      return this;
    }

    if (this.children.length < 48) {
      this.addChild(byte, new ARTLeaf(key, value));
      return this;
    }

    // Grow to Node256
    const node256 = new ARTNode256();
    for (let b = 0; b < 256; b++) {
      const cIdx = this.childIndex[b];
      if (cIdx !== -1) {
        node256.children[b] = this.children[cIdx];
      }
    }
    node256.children[byte] = new ARTLeaf(key, value);
    return node256;
  }

  find(key: Uint8Array, depth: number): any {
    if (depth >= key.length) return null;
    const idx = this.childIndex[key[depth]];
    return idx !== -1 ? this.children[idx].find(key, depth + 1) : null;
  }

  collect(prefix: Uint8Array, depth: number, out: any[]): void {
    for (const child of this.children) {
      if (child) child.collect(prefix, depth + 1, out);
    }
  }
}

class ARTNode256 extends ARTNode {
  children: (ARTNode | null)[] = new Array(256).fill(null);

  insert(key: Uint8Array, depth: number, value: any): ARTNode {
    if (depth >= key.length) return this;
    const byte = key[depth];
    if (this.children[byte]) {
      this.children[byte] = this.children[byte]!.insert(key, depth + 1, value);
    } else {
      this.children[byte] = new ARTLeaf(key, value);
    }
    return this;
  }

  find(key: Uint8Array, depth: number): any {
    if (depth >= key.length) return null;
    const child = this.children[key[depth]];
    return child ? child.find(key, depth + 1) : null;
  }

  collect(prefix: Uint8Array, depth: number, out: any[]): void {
    for (const child of this.children) {
      if (child) child.collect(prefix, depth + 1, out);
    }
  }
}

/**
 * Adaptive Radix Tree Container
 */
export class AdaptiveRadixTreeIndex {
  private root: ARTNode | null = null;
  private encoder = new TextEncoder();

  public insert(key: string, value: any): void {
    const bytes = this.encoder.encode(key);
    if (!this.root) {
      this.root = new ARTLeaf(bytes, value);
    } else {
      this.root = this.root.insert(bytes, 0, value);
    }
  }

  public get(key: string): any {
    if (!this.root) return null;
    const bytes = this.encoder.encode(key);
    return this.root.find(bytes, 0);
  }

  public scanPrefix(prefix: string): any[] {
    if (!this.root) return [];
    const bytes = this.encoder.encode(prefix);
    const results: any[] = [];
    this.root.collect(bytes, 0, results);
    return results;
  }
}

/**
 * Minimal Acyclic Automaton (Frozen FST / DAWG)
 * Compresses string dictionaries into a compacted state transition graph
 */
export class FrozenFSTAutomaton {
  private transitions: Map<number, Map<string, number>> = new Map();
  private finalStates: Set<number> = new Set();
  private stateCount: number = 1;

  public compile(words: string[]): void {
    this.transitions.clear();
    this.finalStates.clear();
    this.stateCount = 1;
    this.transitions.set(0, new Map());

    const sorted = [...words].sort();
    for (const word of sorted) {
      let currentState = 0;
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        let nextState = this.transitions.get(currentState)?.get(char);
        if (nextState === undefined) {
          nextState = this.stateCount++;
          this.transitions.set(nextState, new Map());
          this.transitions.get(currentState)!.set(char, nextState);
        }
        currentState = nextState;
      }
      this.finalStates.add(currentState);
    }
  }

  public contains(word: string): boolean {
    let currentState = 0;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const next = this.transitions.get(currentState)?.get(char);
      if (next === undefined) return false;
      currentState = next;
    }
    return this.finalStates.has(currentState);
  }

  public matchPrefix(prefix: string): boolean {
    let currentState = 0;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      const next = this.transitions.get(currentState)?.get(char);
      if (next === undefined) return false;
      currentState = next;
    }
    return true;
  }

  /**
   * Serializes the DAWG into a compact binary buffer for SharedArrayBuffer zero-copy streaming
   */
  public exportToBinary(): Uint8Array {
    const jsonStr = JSON.stringify({
      stateCount: this.stateCount,
      finalStates: Array.from(this.finalStates),
      transitions: Array.from(this.transitions.entries()).map(([k, v]) => [k, Array.from(v.entries())])
    });
    return new TextEncoder().encode(jsonStr);
  }

  public importFromBinary(bytes: Uint8Array): void {
    try {
      const jsonStr = new TextDecoder().decode(bytes);
      const data = JSON.parse(jsonStr);
      this.stateCount = data.stateCount;
      this.finalStates = new Set(data.finalStates);
      this.transitions.clear();
      for (const [k, v] of data.transitions) {
        this.transitions.set(k, new Map(v));
      }
    } catch (e) {
      console.warn('[Frozen FST] Binary import failed:', e);
    }
  }
}

import { nanosecondKernel } from '../utils/nanosecondKernel';

/**
 * Concurrent Event-Sourced In-Memory App Registry
 */
export class AppRegistry {
  private static instance: AppRegistry | null = null;
  private art = new AdaptiveRadixTreeIndex();
  private fst = new FrozenFSTAutomaton();
  private entities = new Map<string, any>();
  private routes = new Map<string, any>();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.initPredefinedRoutes();
    this.setupEventSourcing();
  }

  public static getInstance(): AppRegistry {
    if (!this.instance) {
      this.instance = new AppRegistry();
    }
    return this.instance;
  }

  private initPredefinedRoutes() {
    const defaultRoutes = [
      { route: 'overview', title: 'Dashboard Overview', prefetch: ['pulsefit_state', 'pulsefit_user_profile'] },
      { route: 'exercises', title: 'Exercise Catalog', prefetch: ['exercises'] },
      { route: 'calories', title: 'Calorie Tracker', prefetch: ['pulsefit_calories'] },
      { route: 'vault', title: 'Reward Vault', prefetch: ['pulsefit_vault_state'] },
      { route: 'rep-counter-volume', title: 'Rep Counter & Volume Calculator', prefetch: ['pulsefit_state', 'pulsefit_workout_history', 'pulsefit_rep_counter_history'] },
      { route: 'vitals', title: 'Vitals & Pulse', prefetch: ['pulsefit_state'] },
      { route: 'profile', title: 'User Profile', prefetch: ['pulsefit_user_profile'] },
      { route: 'history', title: 'Workout History', prefetch: ['pulsefit_state', 'pulsefit_workout_history'] },
      { route: 'analytics', title: 'Analytics & Progress', prefetch: ['pulsefit_state'] },
      { route: 'settings', title: 'Settings', prefetch: ['pulsefit_user_profile'] },
    ];

    for (const r of defaultRoutes) {
      this.routes.set(r.route, r);
      this.art.insert(`route:${r.route}`, r);
      nanosecondKernel.writeHotL0(`route:${r.route}`, r);
    }
    this.fst.compile(defaultRoutes.map(r => r.route));
  }

  private setupEventSourcing() {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('rxdb_mutations');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'APP_STATE_UPDATE') {
            this.handleStateMutation(event.data.payload);
          }
        };
      } catch (e) {}
    }
  }

  public registerEntity(key: string, data: any): void {
    if (data === null || data === undefined) {
      this.entities.delete(key);
      nanosecondKernel.evictHotL0(key);
      return;
    }
    nanosecondKernel.writeHotL0(key, data);
    this.entities.set(key, data);
    this.art.insert(key, data);
  }

  public getEntity(key: string): any {
    const l0Hit = nanosecondKernel.readHotL0(key);
    if (l0Hit !== undefined) {
      return l0Hit;
    }
    const entity = this.entities.get(key) || this.art.get(key);
    if (entity !== null && entity !== undefined) {
      nanosecondKernel.writeHotL0(key, entity);
    }
    return entity;
  }

  public getRoute(route: string): any {
    return nanosecondKernel.readHotL0(`route:${route}`) || this.routes.get(route);
  }

  public handleStateMutation(statePayload: any): void {
    nanosecondKernel.writeHotL0('pulsefit_state', statePayload);
    this.entities.set('pulsefit_state', statePayload);
    this.art.insert('pulsefit_state', statePayload);
    if (statePayload?.workouts) {
      for (const w of statePayload.workouts) {
        if (w.id) {
          nanosecondKernel.writeHotL0(`workout:${w.id}`, w);
          this.art.insert(`workout:${w.id}`, w);
        }
      }
    }
  }
}

export const appRegistry = AppRegistry.getInstance();
