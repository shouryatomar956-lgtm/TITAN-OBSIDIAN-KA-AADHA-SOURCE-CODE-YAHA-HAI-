import fs from 'fs';

let content = fs.readFileSync('src/workers/searchRegistry.ts', 'utf8');

// We will add the `performFuzzyMatch` method which they explicitly asked for.
const performFuzzyMatchCode = `
  performFuzzyMatch(query: string, maxDistance: number = 2) {
    if (!query) return [];
    
    const results = [];
    const queryLower = query.toLowerCase().trim();
    
    for (const item of this.registry.values()) {
        const itemTokens = [item.title, ...(item.keywords || []), ...(item.aliases || [])]
            .filter(t => typeof t === 'string')
            .map(t => t.toLowerCase());
            
        let bestFuzzyScore = Infinity;
        for (const it of itemTokens) {
            if (it.includes(queryLower)) {
               bestFuzzyScore = 0;
               break;
            }
            // Use existing damerauLevenshtein and soundex
            const distance = damerauLevenshtein(queryLower, it);
            const phoneticMatch = soundex(queryLower) === soundex(it);
            const finalDistance = phoneticMatch ? Math.max(0, distance - 2) : distance;
            
            if (finalDistance < bestFuzzyScore) {
              bestFuzzyScore = finalDistance;
            }
        }
        
        if (bestFuzzyScore <= maxDistance) {
            results.push({ item, score: bestFuzzyScore });
        }
    }
    
    return results.sort((a, b) => a.score - b.score).map(r => r.item);
  }
`;

content = content.replace("search(query: string,", performFuzzyMatchCode + "\n  search(query: string,");
fs.writeFileSync('src/workers/searchRegistry.ts', content);
