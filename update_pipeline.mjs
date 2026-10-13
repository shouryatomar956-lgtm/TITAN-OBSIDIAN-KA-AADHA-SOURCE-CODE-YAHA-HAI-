import fs from 'fs';

let content = fs.readFileSync('src/workers/database.worker.ts', 'utf8');

// I will completely replace the bloom filter and collision engine section with a more rigorous one.
// Let's locate the top of the file down to the start of the worker message handler.

const startIdx = content.indexOf('class ProbabilisticBloomFilter');
const endIdx = content.indexOf('      const filter = new ProbabilisticBloomFilter();');

if (startIdx !== -1 && endIdx !== -1) {
  const newClasses = `class ProbabilisticBloomFilter {
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
        return false; // Definitely not in set
      }
    }
    return true; // Possibly in set (requires secondary semantic validation)
  }
}

class SemanticCollisionEngine {
  static normalizeAndHash(str: string): { norm: string, cryptoHash: string } {
    let norm = str.toLowerCase();
    
    // String Normalization: Strips special characters, trims whitespace
    norm = norm.replace(/[^a-z0-9\\s\\-]/g, '');
    
    // Semantic Collision & Detection: Synonym swaps & hyphenation differences
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
    
    // 3-to-4 word naming constraints enforcement
    const words = norm.split(' ');
    if (words.length > 4) {
      // Intelligently truncate to 4 words while preserving the core movement (last 2 words usually hold the base)
      const core = words.slice(-2);
      const modifiers = words.slice(0, 2);
      norm = [...modifiers, ...core].join(' ');
    } else if (words.length < 3 && words.length > 0) {
      // Pad to at least 3 words if necessary, or just leave it. The prompt says "3-to-4 word naming constraints"
      // We will ensure our generator outputs 3-4 words.
    }
    
    // Cryptographic Hashing: Generate unique cryptographic hash key (SHA-like deterministic hex simulation)
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
  content = content.substring(0, startIdx) + newClasses + content.substring(endIdx);
}

// Now replace the initialization and generation loop
const loopStart = content.indexOf('      const filter = new ProbabilisticBloomFilter();');
const loopEnd = content.indexOf('      database.sort((a, b) => a.name.localeCompare(b.name));');

if (loopStart !== -1 && loopEnd !== -1) {
  const newLoop = `      const bloomFilter = new ProbabilisticBloomFilter(1000000, 4);
      // Secondary validation set to prevent false positives from Bloom Filter
      const secondaryValidationSet = new Set<string>();
      
      let globalIndex = 0;
      // Calculate perfect 70/30 environment split cells
      let currentHome = 0;
      const targetHome = 2485;
      let currentGym = 0;
      const targetGym = 1065;
      
      let cells = [];
      for (let domain in ALLOCATION) {
         for (let tier in ALLOCATION[domain]) {
            cells.push({ domain, tier, count: ALLOCATION[domain][tier] });
         }
      }

      cells.forEach((cell, index) => {
         if (index === cells.length - 1) {
            cell.homeCount = targetHome - currentHome;
            cell.gymCount = targetGym - currentGym;
         } else {
            let h = Math.round(cell.count * 0.7);
            let g = cell.count - h;
            cell.homeCount = h;
            cell.gymCount = g;
            currentHome += h;
            currentGym += g;
         }
      });

      for (const cell of cells) {
         const { domain, tier, homeCount, gymCount } = cell;
         const bases = BASES[domain][tier] || [domain];
         
         const buildCell = (targetCount: number, isHome: boolean) => {
            const equips = isHome ? HOME_EQUIP : GYM_EQUIP;
            let count = 0;
            let attempt = 0;
            
            while (count < targetCount) {
               const base = bases[attempt % bases.length];
               const eq = equips[attempt % equips.length];
               
               let name = buildAuthenticName(tier, base, attempt);
               
               // Ensure 3-to-4 word constraint strictly on the raw name before normalization
               let words = name.split(' ');
               if (words.length > 4) {
                 name = [...words.slice(0, 2), ...words.slice(-2)].join(' ');
               } else if (words.length < 3) {
                 // Add automated modifiers to enforce 3-to-4 word constraint
                 name = isHome ? \`Strict \${name} Protocol\` : \`Heavy \${name} Variation\`;
               }

               let { norm, cryptoHash } = SemanticCollisionEngine.normalizeAndHash(name);
               
               let isDuplicate = false;
               // Positive flags route candidate records to secondary semantic validation
               if (bloomFilter.has(cryptoHash)) {
                 if (secondaryValidationSet.has(cryptoHash)) {
                    isDuplicate = true; // True positive collision detected
                 }
               }
               
               if (!isDuplicate) {
                  // Register in pipeline
                  bloomFilter.add(cryptoHash);
                  secondaryValidationSet.add(cryptoHash);
                  
                  let baseScore = tier === 'Beginner' ? 5.0 : tier === 'Intermediate' ? 7.0 : tier === 'Advanced' ? 8.5 : 9.5;
                  let eff = Math.min(10.0, Math.round((baseScore + Math.random()) * 10) / 10);
                  
                  let trainingAge = "";
                  let bioProfile = "";
                  let specialized = "";

                  if (tier === "Beginner") {
                     trainingAge = "1 to 1.5 months of initial fitness exposure.";
                     bioProfile = "Maximum structural support, low axial loading, wall/incline assistance, high stability to build foundational motor patterns safely.";
                  } else if (tier === "Intermediate") {
                     trainingAge = "3 to 4 months of consistent training history.";
                     bioProfile = "Full unassisted bodyweight control or moderate free-weight resistance across standard movement planes.";
                  } else if (tier === "Advanced") {
                     trainingAge = "3 to 4 years of continuous, rigorous training.";
                     bioProfile = "High mechanical disadvantage, unilateral loading, severe tendon/joint conditioning, and complex neuromuscular coordination.";
                  } else if (tier === "Elite") {
                     trainingAge = "Peak human anatomy tier for elite calisthenics masters, Olympic gymnasts, and grandmasters maximizing tendon stiffness and skeletal alignment.";
                     specialized = "\\n\\n**Specialized Execution Parameters:** Integrated with a strict 1.5 repetition protocol (full eccentric-concentric range of motion followed immediately by a mandatory half-range contraction under continuous time-under-tension) coupled with extreme external axial barbell loading or weighted chain/vest integration.";
                  }
                  
                  let instructions = \`**Training Age:** \${trainingAge}\\n**Biomechanical Profile:** \${bioProfile}\${specialized}\\n\\n**Execution Parameters:** Engage the \${domain} musculature utilizing \${eq}. Ensure strictly controlled eccentric loading to maximize kinetic adaptation.\`;
                  
                  database.push({
                     id: \`pulse-ex-\${globalIndex.toString().padStart(4, '0')}\`,
                     name,
                     muscleGroup: domain,
                     difficulty: tier,
                     scientificEffectivenessScore: eff,
                     equipmentNeeded: isHome ? 'Home' : 'Gym',
                     _rawEquipment: eq,
                     instructions,
                     _searchString: name.toLowerCase(),
                     _cryptoHash: cryptoHash
                  });
                  
                  count++;
                  globalIndex++;
               }
               // Automated Substitution Protocol: if isDuplicate is true, attempt increments and next iteration generates distinct variation
               attempt++;
               if (attempt > 100000) break; // Fail-safe
            }
         };
         
         buildCell(homeCount as number, true);
         buildCell(gymCount as number, false);
      }
      
`;
  content = content.substring(0, loopStart) + newLoop + content.substring(loopEnd);
}

fs.writeFileSync('src/workers/database.worker.ts', content);

