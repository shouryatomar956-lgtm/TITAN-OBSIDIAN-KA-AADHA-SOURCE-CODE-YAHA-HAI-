import { 
    UniversalLevenshteinAutomata, 
    BytePairEncoder, 
    BeiderMorsePhonetic,
    SemanticVectorEngine,
    generateFallbackEmbedding,
    ReciprocalRankFusion,
    AdaptiveRadixTree,
    FrozenFST,
    RoaringBitmap,
    LockFreeInvertedIndex,
    LockFreeRingBuffer,
    BinarySchemaValidator,
    QuantumHNSWGraph
} from './searchEngineCore';
import { SearchMetadata, validateSearchMetadata } from '../types/search';
import * as localforage from 'localforage';

const STOP_WORDS = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'with', 'to', 'for', 'of', 'at', 'by']);

export class SearchRegistry {
    registry: Map<string, SearchMetadata>;
    trie: AdaptiveRadixTree;
    bpe: BytePairEncoder;
    documentFrequency: Map<string, number>;
    usageMetrics: Map<string, number>;
    queryCache: Map<string, { timestamp: number; results: SearchMetadata[] }>;
    taskQueue: LockFreeRingBuffer;
    invertedIndex: LockFreeInvertedIndex;
    embeddingCache: Map<string, number[]>;
    bitmapIndex: Map<string, RoaringBitmap>;
    phoneticIndex: Map<string, Set<string>>;
    docIdNumericMap: Map<string, number>;
    numericDocIdMap: Map<number, string>;
    nextNumericId: number;
    isInitialized: boolean;
    private indexedIds: Set<string> = new Set();
    private precomputedDocCache: Map<string, { titleLower: string; titleWords: string[]; keywordsLower: string[]; aliasesLower: string[] }> = new Map();

    constructor() {
        this.registry = new Map();
        this.trie = new AdaptiveRadixTree();
        this.bpe = new BytePairEncoder();
        this.documentFrequency = new Map();
        this.usageMetrics = new Map();
        this.queryCache = new Map();
        this.taskQueue = new LockFreeRingBuffer(1024);
        this.invertedIndex = new LockFreeInvertedIndex(50000);
        this.embeddingCache = new Map();
        this.bitmapIndex = new Map();
        this.phoneticIndex = new Map();
        this.docIdNumericMap = new Map();
        this.numericDocIdMap = new Map();
        this.nextNumericId = 0;
        this.isInitialized = false;

        // 5. Initialize Semantic Vector Engine
        SemanticVectorEngine.init().catch(() => {});
        
        // Pre-seed essential global sections so search works instantly on startup
        this.preSeedDefaultSections();
    }

    private preSeedDefaultSections() {
        const defaultSections: SearchMetadata[] = [
            { id: 'sec_overview', title: 'Dashboard Overview', category: 'Section', keywords: ['dashboard', 'home', 'summary', 'stats', 'analytics', 'overview'], aliases: ['dash', 'home', 'overview'], priority: 100, route: 'dashboard', score: 10 },
            { id: 'sec_exercises', title: 'Exercise Catalog', category: 'Section', keywords: ['exercises', 'catalog', 'workouts', 'movements', 'library', 'training'], aliases: ['workouts', 'library'], priority: 95, route: 'exercises', score: 10 },
            { id: 'sec_profile', title: 'User Profile & Biometrics', category: 'Section', keywords: ['account', 'settings', 'user', 'preferences', 'profile', 'biometrics', 'pin'], aliases: ['profile', 'me', 'account'], priority: 90, route: 'profile', score: 10 },
            { id: 'sec_history', title: 'Workout History & Logs', category: 'Section', keywords: ['logs', 'past workouts', 'history', 'calendar', 'sessions'], aliases: ['history', 'logs'], priority: 85, route: 'history', score: 9 },
            { id: 'sec_analytics', title: 'Analytics & EMG Progress', category: 'Section', keywords: ['charts', 'progress', 'graphs', 'analytics', 'performance', 'emg'], aliases: ['stats', 'progress'], priority: 80, route: 'analytics', score: 9 },
            { id: 'sec_settings', title: 'App Settings & Security', category: 'Section', keywords: ['theme', 'notifications', 'dark mode', 'settings', 'config', 'security'], aliases: ['settings', 'config'], priority: 75, route: 'settings', score: 8 },
        ];
        this.registerBulk(defaultSections, false);
    }

    async init(): Promise<boolean> {
        if (this.isInitialized) return true;
        try {
            const cachedUsage = await localforage.getItem<Record<string, number>>('search_usage_metrics');
            if (cachedUsage && typeof cachedUsage === 'object') {
                for (const [id, count] of Object.entries(cachedUsage)) {
                    this.usageMetrics.set(id, count);
                }
            }
        } catch (e) {}
        this.isInitialized = true;
        return true;
    }

    setupRxDBSync() {
        if (typeof BroadcastChannel !== 'undefined') {
            try {
                const channel = new BroadcastChannel('rxdb_mutations');
                channel.onmessage = (event) => {
                    if (event.data?.type === 'APP_STATE_UPDATE') {
                        this.queryCache.clear();
                    }
                };
            } catch (e) {}
        }
    }

    private getDocNumericId(id: string): number {
        let num = this.docIdNumericMap.get(id);
        if (num === undefined) {
            num = this.nextNumericId++;
            this.docIdNumericMap.set(id, num);
            this.numericDocIdMap.set(num, id);
        }
        return num;
    }

    register(metadata: SearchMetadata, shouldPersist = true) {
        this.registerBulk([metadata], shouldPersist);
    }

    unregister(id: string) {
        if (this.registry.has(id)) {
            this.registry.delete(id);
            this.indexedIds.delete(id);
            this.precomputedDocCache.delete(id);
            this.queryCache.clear();
        }
    }

    recordUsage(id: string) {
        const count = (this.usageMetrics.get(id) || 0) + 1;
        this.usageMetrics.set(id, count);
        this.queryCache.clear();
        try {
            const usageObj: Record<string, number> = {};
            this.usageMetrics.forEach((v, k) => { usageObj[k] = v; });
            localforage.setItem('search_usage_metrics', usageObj).catch(() => {});
        } catch (e) {}
    }

    private indexSingleItem(id: string, metadata: SearchMetadata) {
        if (this.indexedIds.has(id)) return;
        this.indexedIds.add(id);

        const numId = this.getDocNumericId(id);
        const titleLower = metadata.title.toLowerCase();
        const titleWords = titleLower.split(/[\s\W]+/).filter(Boolean);
        const keywordsLower = (metadata.keywords || []).map(k => k.toLowerCase());
        const aliasesLower = (metadata.aliases || []).map(a => a.toLowerCase());

        this.precomputedDocCache.set(id, {
            titleLower,
            titleWords,
            keywordsLower,
            aliasesLower
        });

        const textParts = [
            metadata.title,
            ...(metadata.keywords || []),
            ...(metadata.aliases || []),
            metadata.category
        ];
        const fullText = textParts.join(' ').toLowerCase();

        // 3. Byte-Pair Encoding Tokenization
        const tokens = this.bpe.tokenize(fullText).filter(t => !STOP_WORDS.has(t));
        const uniqueTokens = new Set(tokens);

        for (const token of uniqueTokens) {
            // 7. Insert into Adaptive Radix Tree
            this.trie.insert(token, id);
            this.documentFrequency.set(token, (this.documentFrequency.get(token) || 0) + 1);

            // 4. Beider-Morse Phonetic Indexing
            const phoneticHash = BeiderMorsePhonetic.getPhoneticHash(token);
            if (phoneticHash) {
                let pSet = this.phoneticIndex.get(phoneticHash);
                if (!pSet) {
                    pSet = new Set();
                    this.phoneticIndex.set(phoneticHash, pSet);
                }
                pSet.add(id);
            }

            // 9. Roaring Bitmaps (SIMD Bitset per token)
            let bitmap = this.bitmapIndex.get(token);
            if (!bitmap) {
                bitmap = new RoaringBitmap(15000);
                this.bitmapIndex.set(token, bitmap);
            }
            bitmap.add(numId);

            // 10. LockFree Inverted Indexing
            let hash = 0;
            for (let i = 0; i < token.length; i++) {
                hash = Math.imul(31, hash) + token.charCodeAt(i) | 0;
            }
            this.invertedIndex.addDocument(hash, id);
        }
    }

    registerBulk(metadataArray: SearchMetadata[], shouldPersist = true) {
        if (!Array.isArray(metadataArray) || metadataArray.length === 0) return;
        
        // 12. Binary Schema Validation hook for telemetry
        const validationBuffer = BinarySchemaValidator.createValidationBuffer();
        BinarySchemaValidator.validate(validationBuffer);

        let added = 0;
        for (const metadata of metadataArray) {
            if (validateSearchMetadata(metadata)) {
                const existing = this.registry.get(metadata.id);
                if (existing && existing.title === metadata.title && existing.route === metadata.route) {
                    continue; // Already registered and indexed — skip duplicate work!
                }

                const safeItem: SearchMetadata = {
                    ...metadata,
                    keywords: Array.isArray(metadata.keywords) ? metadata.keywords.filter(Boolean) : [],
                    aliases: Array.isArray(metadata.aliases) ? metadata.aliases.filter(Boolean) : [],
                    priority: typeof metadata.priority === 'number' ? metadata.priority : 10,
                    score: typeof metadata.score === 'number' ? metadata.score : 5,
                };

                this.registry.set(safeItem.id, safeItem);
                this.indexSingleItem(safeItem.id, safeItem);
                added++;

                // 13. Quantum HNSW Semantic Graph indexing
                const rawText = (safeItem.title + " " + safeItem.category + " " + safeItem.keywords.join(" ") + " " + safeItem.aliases.join(" ")).toLowerCase();
                const vec = generateFallbackEmbedding(rawText);
                this.embeddingCache.set(safeItem.id, vec);
                QuantumHNSWGraph.add(safeItem.id, vec);
            }
        }

        if (added > 0) {
            FrozenFST.freeze(this.trie);
            this.queryCache.clear();
        }
    }

    rebuildIndex() {
        this.trie = new AdaptiveRadixTree();
        this.documentFrequency.clear();
        this.bitmapIndex.clear();
        this.phoneticIndex.clear();
        this.indexedIds.clear();
        this.precomputedDocCache.clear();

        for (const [id, metadata] of this.registry.entries()) {
            this.indexSingleItem(id, metadata);
        }

        // 8. Freeze FST
        FrozenFST.freeze(this.trie);
    }

    async search(query: string, page = 0, limit = 50, maxFuzzyDistance = 2): Promise<{ results: SearchMetadata[]; total: number; page: number }> {
        if (!query || typeof query !== 'string' || query.trim() === '') {
            return { results: [], total: 0, page };
        }

        // 11. LockFree Ring Buffer task telemetry
        this.taskQueue.enqueue(query.length);

        const queryClean = query.toLowerCase().trim();

        // Check query cache (10 second TTL)
        if (this.queryCache.has(queryClean)) {
            const cached = this.queryCache.get(queryClean)!;
            if (Date.now() - cached.timestamp < 10000) {
                return {
                    results: cached.results.slice(page * limit, (page + 1) * limit),
                    total: cached.results.length,
                    page
                };
            }
        }

        // 3. Tokenize query using BPE
        let queryTokens = this.bpe.tokenize(queryClean).filter(t => !STOP_WORDS.has(t));
        if (queryTokens.length === 0) {
            queryTokens = [queryClean];
        }

        const lexicalScores = new Map<string, number>();
        const totalDocs = Math.max(this.registry.size, 1);

        // A. Direct & Prefix Matching via Adaptive Radix Tree (ART)
        for (const token of queryTokens) {
            const exactPrefixMatches = this.trie.searchPrefix(token);
            const docFreq = this.documentFrequency.get(token) || 1;
            const idf = Math.log10(totalDocs / docFreq) + 1.0;

            for (const id of exactPrefixMatches) {
                const current = lexicalScores.get(id) || 0;
                lexicalScores.set(id, current + 120 * idf);
            }
        }

        // A.5 Direct O(1) Phonetic Index Lookup
        for (const token of queryTokens) {
            if (token.length < 2) continue;
            const tokenPhonetic = BeiderMorsePhonetic.getPhoneticHash(token);
            if (tokenPhonetic) {
                const phoneticMatches = this.phoneticIndex.get(tokenPhonetic);
                if (phoneticMatches) {
                    for (const id of phoneticMatches) {
                        lexicalScores.set(id, (lexicalScores.get(id) || 0) + 75);
                    }
                }
            }
        }

        // B. Comprehensive Substring, Alias, and Levenshtein Matching using Precomputed Doc Cache
        for (const [id, item] of this.registry.entries()) {
            const pre = this.precomputedDocCache.get(id);
            const titleLower = pre ? pre.titleLower : item.title.toLowerCase();
            const titleWords = pre ? pre.titleWords : titleLower.split(/[\s\W]+/);
            const keywordsLower = pre ? pre.keywordsLower : (item.keywords || []).map(k => k.toLowerCase());
            const aliasesLower = pre ? pre.aliasesLower : (item.aliases || []).map(a => a.toLowerCase());

            let itemScore = lexicalScores.get(id) || 0;
            let hasMatch = itemScore > 0;

            // 1. Exact full-query matches
            if (titleLower === queryClean) {
                itemScore += 500;
                hasMatch = true;
            } else if (titleLower.startsWith(queryClean)) {
                itemScore += 300;
                hasMatch = true;
            } else if (titleLower.includes(queryClean)) {
                itemScore += 180;
                hasMatch = true;
            } else if (aliasesLower.some(a => a === queryClean || a.includes(queryClean))) {
                itemScore += 200;
                hasMatch = true;
            } else if (keywordsLower.some(k => k === queryClean || k.includes(queryClean))) {
                itemScore += 140;
                hasMatch = true;
            }

            // 2. Token-level analysis
            for (const token of queryTokens) {
                if (token.length < 2) continue;

                // Word boundary check in title
                if (titleWords.some(w => w.startsWith(token))) {
                    itemScore += 80;
                    hasMatch = true;
                }

                // 1 & 2. Universal Levenshtein Automata / Bit-Parallel Damerau-Levenshtein
                if (token.length >= 3) {
                    for (let wIdx = 0; wIdx < titleWords.length; wIdx++) {
                        const tw = titleWords[wIdx];
                        if (tw.length >= 3 && Math.abs(tw.length - token.length) <= maxFuzzyDistance) {
                            const dist = UniversalLevenshteinAutomata.evaluate(token, tw, maxFuzzyDistance);
                            if (dist <= maxFuzzyDistance) {
                                itemScore += (maxFuzzyDistance + 1 - dist) * 35;
                                hasMatch = true;
                                break;
                            }
                        }
                    }
                }
            }

            // 3. ONLY if the item actually matched the query, apply priority & usage boost!
            if (hasMatch && itemScore > 0) {
                const usage = this.usageMetrics.get(id) || 0;
                itemScore += (item.priority || 0) * 1.5;
                itemScore += usage * 15;
                itemScore += (item.score || 0) * 0.5;
                lexicalScores.set(id, itemScore);
            }
        }

        const lexicalResultsList = Array.from(lexicalScores.entries()).map(([id, score]) => ({ id, score }));

        // 5 & 13. Semantic Vector Search with Quantum HNSW Graph
        let semanticResultsList: Array<{ id: string; score: number }> = [];
        try {
            const queryVector = await SemanticVectorEngine.getEmbedding(queryClean);
            if (queryVector) {
                const rawHnsw = QuantumHNSWGraph.search(queryVector, Math.min(limit * 2, 100));
                // If strong lexical matches exist, require high semantic confidence
                const hasStrongLexical = lexicalResultsList.some(l => l.score >= 100);
                const threshold = hasStrongLexical ? 0.75 : 0.60;
                semanticResultsList = rawHnsw.filter(s => s.score >= threshold);
            }
        } catch (e) {}

        // 6. Reciprocal Rank Fusion (RRF)
        const candidateIds = new Set([
            ...lexicalResultsList.map(l => l.id),
            ...semanticResultsList.map(s => s.id)
        ]);

        let finalIds: string[];
        if (candidateIds.size > 0) {
            const fused = ReciprocalRankFusion.fuse(lexicalResultsList, semanticResultsList);
            finalIds = fused.filter(id => candidateIds.has(id));
        } else {
            finalIds = [];
        }

        // Map back to metadata and attach computed rank score
        const sortedResults: SearchMetadata[] = [];
        for (const id of finalIds) {
            const item = this.registry.get(id);
            if (item) {
                const matchScore = lexicalScores.get(id) || item.score || 10;
                sortedResults.push({
                    ...item,
                    score: Number(matchScore.toFixed(1))
                });
            }
        }

        // Cache full results
        this.queryCache.set(queryClean, { timestamp: Date.now(), results: sortedResults });

        return {
            results: sortedResults.slice(page * limit, (page + 1) * limit),
            total: sortedResults.length,
            page
        };
    }
}

export const searchRegistry = new SearchRegistry();
