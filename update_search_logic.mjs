import fs from 'fs';

let content = fs.readFileSync('src/workers/searchRegistry.ts', 'utf8');

const lines = content.split('\n');
const searchStart = lines.findIndex(l => l.includes('search(query: string, page: number = 0, limit: number = 50, maxFuzzyDistance: number = 2) {'));
const exportStart = lines.findIndex(l => l.includes('export const searchRegistry = new SearchRegistry();'));

const replacement = `  search(query: string, page: number = 0, limit: number = 50, maxFuzzyDistance: number = 2) {
    if (!query || query.trim() === '') return { results: [], total: 0, page };
    
    const queryLower = query.toLowerCase().trim();
    
    // Check transient cache (10s expiry)
    const cached = this.queryCache.get(queryLower);
    if (cached && (Date.now() - cached.timestamp < 10000)) {
       const start = page * limit;
       return {
           results: cached.results.slice(start, start + limit),
           total: cached.results.length,
           page
        };
    }

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

    const queryTokens = queryLower.split(/\\s+/).filter(t => !STOP_WORDS.has(t));
    if (queryTokens.length === 0 && !targetTier && targetScore === null) return { results: [], total: 0, page };

    const totalDocs = this.registry.size || 1;
    const results = new Map<string, { item: SearchMetadata, score: number }>();

    if (targetTier || targetScore !== null) {
        for (const item of this.registry.values()) {
            if (targetTier && item.tier !== targetTier) continue;
            if (targetScore !== null && item.score !== undefined) {
                if (Math.floor(item.score) !== Math.floor(targetScore)) continue;
            }
            const existing = { item, score: 1000 }; 
            results.set(item.id, existing);
        }
    }

    for (const token of queryTokens) {
       const exactPrefixMatches = this.trie.searchPrefix(token);
       const idf = Math.log10(totalDocs / (this.documentFrequency.get(token) || 1));
       
       for (const id of exactPrefixMatches) {
         const item = this.registry.get(id);
         if (item) {
           if (targetTier && item.tier !== targetTier) continue;
           if (targetScore !== null && item.score !== undefined && Math.floor(item.score) !== Math.floor(targetScore)) continue;

           const existing = results.get(id) || { item, score: 0 };
           existing.score += (100 * idf);
           results.set(id, existing);
         }
       }
       
       for (const item of this.registry.values()) {
         if (targetTier && item.tier !== targetTier) continue;
         if (targetScore !== null && item.score !== undefined && Math.floor(item.score) !== Math.floor(targetScore)) continue;

         const itemTokens = [item.title, ...(item.keywords || []), ...(item.aliases || [])].filter(t => typeof t === 'string')
             .map(t => t.toLowerCase());
         
         let bestFuzzyScore = Infinity;
         for (const it of itemTokens) {
            if (it.includes(token)) {
               bestFuzzyScore = 0;
               break;
            }
            const distance = damerauLevenshtein(token, it);
            const phoneticMatch = soundex(token) === soundex(it);
            const finalDistance = phoneticMatch ? Math.max(0, distance - 2) : distance;
            
            if (finalDistance < bestFuzzyScore) {
              bestFuzzyScore = finalDistance;
            }
         }

         if (bestFuzzyScore <= maxFuzzyDistance) {
            const existing = results.get(item.id) || { item, score: 0 };
            const fuzzyWeight = (90 - (bestFuzzyScore * 15)) * idf;
            existing.score += fuzzyWeight;
            results.set(item.id, existing);
         }
       }
    }

    for (const val of results.values()) {
       const usageBoost = Math.min((this.usageMetrics.get(val.item.id) || 0) * 2, 30);
       val.score += (val.item.priority || 0) + usageBoost;
    }

    const sortedResults = Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .map(r => r.item);

    this.queryCache.set(queryLower, { timestamp: Date.now(), results: sortedResults });

    if (this.queryCache.size > 100) {
       const firstKey = this.queryCache.keys().next().value;
       this.queryCache.delete(firstKey);
    }

    const start = page * limit;
    return {
        results: sortedResults.slice(start, start + limit),
        total: sortedResults.length,
        page
     };
  }
}
`;

content = lines.slice(0, searchStart).join('\n') + '\n' + replacement + '\n' + lines.slice(exportStart).join('\n');
fs.writeFileSync('src/workers/searchRegistry.ts', content);
