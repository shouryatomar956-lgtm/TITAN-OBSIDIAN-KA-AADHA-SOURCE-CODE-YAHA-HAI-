import * as Comlink from 'comlink';

class BloomFilter {
  private bitArray: Uint8Array;
  private size: number;
  private hashes: number;

  constructor(size = 10000, hashes = 3) {
    this.size = size;
    this.hashes = hashes;
    this.bitArray = new Uint8Array(Math.ceil(size / 8));
  }

  private getHashes(str: string): number[] {
    const results = [];
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    for (let i = 0; i < this.hashes; i++) {
      results.push(Math.abs((h1 + i * h2) % this.size));
    }
    return results;
  }

  add(str: string) {
    const hashes = this.getHashes(str);
    for (const h of hashes) {
      const byteIdx = Math.floor(h / 8);
      const bitIdx = h % 8;
      this.bitArray[byteIdx] |= (1 << bitIdx);
    }
  }

  test(str: string): boolean {
    const hashes = this.getHashes(str);
    for (const h of hashes) {
      const byteIdx = Math.floor(h / 8);
      const bitIdx = h % 8;
      if ((this.bitArray[byteIdx] & (1 << bitIdx)) === 0) {
        return false;
      }
    }
    return true;
  }
}

const SYNONYMS: Record<string, string> = {
  'pushup': 'push up',
  'elevated': 'incline',
  'db': 'dumbbell',
  'bb': 'barbell',
  'kb': 'kettlebell',
  'bw': 'bodyweight',
  'chins': 'chin up',
  'pullups': 'pull up',
  'situp': 'sit up',
  'rdl': 'romanian deadlift'
};

class SemanticDeduplicator {
  private bloom = new BloomFilter(10000, 4);
  private exactHashes = new Set<string>();

  async normalizeAndHash(name: string): Promise<string> {
    let normalized = name.toLowerCase().replace(/[^a-z0-9\s]/g, '');
    let tokens = normalized.split(/\s+/).filter(Boolean);
    tokens = tokens.map(t => SYNONYMS[t] || t);
    tokens.sort(); // Sorting handles inversions (e.g., "Incline Push Up" vs "Push Up Incline")
    const finalStr = tokens.join('-');
    
    // Cryptographic Hash
    const encoder = new TextEncoder();
    const data = encoder.encode(finalStr);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  }

  async checkAndAdd(name: string): Promise<{ isDuplicate: boolean, hash: string }> {
    const hash = await this.normalizeAndHash(name);
    
    // Probabilistic check via Bloom Filter Array
    const mightExist = this.bloom.test(hash);
    
    if (mightExist) {
      // Secondary Semantic Collision & Detection Engine Validation
      if (this.exactHashes.has(hash)) {
        return { isDuplicate: true, hash };
      }
    }
    
    this.bloom.add(hash);
    this.exactHashes.add(hash);
    
    return { isDuplicate: false, hash };
  }

  reset() {
    this.bloom = new BloomFilter(10000, 4);
    this.exactHashes.clear();
  }
}

Comlink.expose(SemanticDeduplicator);
