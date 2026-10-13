import { SearchRegistry } from './src/workers/searchRegistry.ts';

async function test() {
    const registry = new SearchRegistry();
    // Register bulk
    registry.registerBulk([
        { id: '1', title: 'Squat', category: 'Exercise', keywords: ['legs'], aliases: [], priority: 1, route: 'e' }
    ]);
    
    const r1 = await registry.search("squat", 0, 50, 3);
    console.log("Search 'squat':", r1.total);
    
    const r2 = await registry.search("s", 0, 50, 3);
    console.log("Search 's':", r2.total);
}
test();
