import fs from 'fs';

let content = fs.readFileSync('src/workers/searchRegistry.ts', 'utf8');

const replacement = `  performFuzzyMatch(query: string, maxDistance: number = 2) {
    if (!query) return [];
    
    const results = [];
    const queryLower = query.toLowerCase().trim();
    
    let targetTier: string | null = null;
    const tierKeywords = ['beginner', 'intermediate', 'advanced', 'elite'];
    for (const t of tierKeywords) {
        if (new RegExp("\\\\b" + t + "\\\\b").test(queryLower)) {
            targetTier = t;
            break;
        }
    }

    let targetScore: number | null = null;
    const scoreMatch = queryLower.match(/\\b([1-9](?:\\.\\d)?|10(?:\\.0)?)\\s*points?\\b/) || queryLower.match(/^([1-9](?:\\.\\d)?|10(?:\\.0)?)$/);
    if (scoreMatch) {
        targetScore = parseFloat(scoreMatch[1]);
    }
    
    for (const item of this.registry.values()) {
        if (targetTier && item.tier !== targetTier) continue;
        if (targetScore !== null && item.score !== undefined && Math.floor(item.score) !== Math.floor(targetScore)) continue;

        const itemTokens = [item.title, ...(item.keywords || []), ...(item.aliases || [])]
            .filter(t => typeof t === 'string')
            .map(t => t.toLowerCase());
            
        let bestFuzzyScore = Infinity;
        for (const it of itemTokens) {
            if (it.includes(queryLower)) {
               bestFuzzyScore = 0;
               break;
            }
            const distance = damerauLevenshtein(queryLower, it);
            const phoneticMatch = soundex(queryLower) === soundex(it);
            const finalDistance = phoneticMatch ? Math.max(0, distance - 2) : distance;
            
            if (finalDistance < bestFuzzyScore) {
              bestFuzzyScore = finalDistance;
            }
        }
        
        if (bestFuzzyScore <= maxDistance || targetTier || targetScore !== null) {
            results.push({ item, score: (targetTier || targetScore !== null) ? 0 : bestFuzzyScore });
        }
    }
    
    return results.sort((a, b) => a.score - b.score).map(r => r.item);
  }
`;

content = content.replace(/  performFuzzyMatch\(query: string[\s\S]*?(?=\n  search\()/, replacement);
fs.writeFileSync('src/workers/searchRegistry.ts', content);
