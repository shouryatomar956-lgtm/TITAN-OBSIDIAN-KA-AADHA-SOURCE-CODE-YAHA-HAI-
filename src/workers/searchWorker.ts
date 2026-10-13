import { expose } from 'comlink';
import { searchRegistry } from './searchRegistry';

// Setup incremental sync with RxDB stream
searchRegistry.setupRxDBSync();

expose(searchRegistry);
