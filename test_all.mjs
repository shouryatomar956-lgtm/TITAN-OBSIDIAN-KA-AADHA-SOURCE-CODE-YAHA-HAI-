import { SearchRegistry } from './src/workers/searchRegistry.ts';
import { SemanticVectorEngine } from './src/workers/searchEngineCore.ts';

async function test() {
    const registry = new SearchRegistry();
    registry.registerBulk([
        { id: '1', title: 'Squat', category: 'Exercise', keywords: ['legs'], aliases: [], priority: 1, route: 'e' },
        { id: 'sec_profile', title: 'User Profile', category: 'Section', keywords: ['account', 'settings', 'user', 'preferences', 'profile', 'logout'], route: 'profile', priority: 90 }
    ]);
    
    // allow time for vector init
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Vector Ready:", SemanticVectorEngine.ready);
    
    const r1 = await registry.search("profffile");
    console.log("Search 'profffile':", r1.results.map(x => x.title));
    
    const r2 = await registry.search("s");
    console.log("Search 's':", r2.results.map(x => x.title));
}
test().catch(console.error);
