export class ProbabilisticBloomFilter {
  size: number;
  k: number;
  buffer: Uint32Array;

  constructor(size = 1000000, k = 4) {
    this.size = size;
    this.k = k;
    this.buffer = new Uint32Array(Math.ceil(size / 32));
  }
  
  hash1(str: string): number {
    // FNV-1a 32-bit hash
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  hash2(str: string): number {
    // MurmurHash3-inspired 32-bit avalanching mixer
    let h = 0xdeadbeef ^ str.length;
    for (let i = 0; i < str.length; i++) {
      let k = str.charCodeAt(i);
      k = Math.imul(k, 0xcc9e2d51);
      k = (k << 15) | (k >>> 17);
      k = Math.imul(k, 0x1b873593);
      h ^= k;
      h = (h << 13) | (h >>> 19);
      h = (Math.imul(h, 5) + 0xe6546b64) | 0;
    }
    h ^= h >>> 16;
    h = Math.imul(h, 0x85ebca6b);
    h ^= h >>> 13;
    h = Math.imul(h, 0xc2b2ae35);
    h ^= h >>> 16;
    return (h >>> 0) || 1;
  }

  getHashes(str: string): number[] {
    // Kirsch-Mitzenmacher Double Hashing: g_i(x) = (h1(x) + i * h2(x) + i^2) mod m
    // Achieves full k-hash independence using only 2 string traversals instead of k traversals
    const hashes = new Array<number>(this.k);
    const h1 = this.hash1(str);
    const h2 = this.hash2(str);
    for (let i = 0; i < this.k; i++) {
      hashes[i] = ((h1 + Math.imul(i, h2) + i * i) >>> 0) % this.size;
    }
    return hashes;
  }

  add(str: string): void {
    const hashes = this.getHashes(str);
    for (let h of hashes) {
      const index = Math.floor(h / 32);
      const bit = h % 32;
      this.buffer[index] |= (1 << bit);
    }
  }

  has(str: string): boolean {
    const hashes = this.getHashes(str);
    for (let h of hashes) {
      const index = Math.floor(h / 32);
      const bit = h % 32;
      if ((this.buffer[index] & (1 << bit)) === 0) {
        return false;
      }
    }
    return true;
  }
}

export class SemanticCollisionEngine {
  static normalizeAndHash(str: string): { norm: string, cryptoHash: string } {
    let norm = str.toLowerCase();
    
    norm = norm.replace(/[^a-z0-9\s\-]/g, '');
    
    const synonyms: Record<string, string> = {
      'push up': 'pushup',
      'pull up': 'pullup',
      'chin up': 'chinup',
      'sit up': 'situp',
      'elevated': 'incline',
      'lowered': 'decline',
      'step up': 'stepup',
      'squats': 'squat',
      'lunges': 'lunge'
    };
    
    for (const [key, val] of Object.entries(synonyms)) {
      norm = norm.split(key).join(val);
    }
    
    norm = norm.replace(/\s+/g, ' ').trim();
    
    const words = norm.split(' ');
    if (words.length > 4) {
      const core = words.slice(-2);
      const modifiers = words.slice(0, 2);
      norm = [...modifiers, ...core].join(' ');
    }
    
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < norm.length; i++) {
        const ch = norm.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const cryptoHash = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
    
    return { norm, cryptoHash };
  }
}
