import fs from 'fs';

let workerContent = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

const classDefs = `export class ProbabilisticBloomFilter {
  size: number;
  k: number;
  buffer: Uint32Array;

  constructor(size = 1000000, k = 4) {
    this.size = size;
    this.k = k;
    this.buffer = new Uint32Array(Math.ceil(size / 32));
  }
  
  hash(str: string, seed: number): number {
    let h = seed;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return h >>> 0;
  }

  getHashes(str: string): number[] {
    const hashes = [];
    for (let i = 0; i < this.k; i++) {
      hashes.push(this.hash(str, 0x811C9DC5 + i * 0x1234567) % this.size);
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
    
    norm = norm.replace(/[^a-z0-9\\s\\-]/g, '');
    
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
    
    norm = norm.replace(/\\s+/g, ' ').trim();
    
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
`;

fs.writeFileSync('src/services/exerciseIndexer.ts', classDefs);

const startIdx = workerContent.indexOf('class ProbabilisticBloomFilter');
if (startIdx !== -1) {
  let endIdx = workerContent.indexOf('      const bloomFilter = new ProbabilisticBloomFilter(1000000, 4);');
  if (endIdx !== -1) {
    workerContent = `import { ProbabilisticBloomFilter, SemanticCollisionEngine } from '../services/exerciseIndexer';\n` + workerContent.substring(0, startIdx) + workerContent.substring(endIdx);
    fs.writeFileSync('src/workers/database.worker.ts', workerContent);
  }
}

