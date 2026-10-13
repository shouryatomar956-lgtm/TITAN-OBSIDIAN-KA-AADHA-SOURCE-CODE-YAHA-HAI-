import * as Comlink from 'comlink';

let dedupeWorker: Worker | null = null;
let dedupeService: any = null;

export async function getDedupeService() {
  if (!dedupeWorker) {
    dedupeWorker = new Worker(new URL('../workers/bloomDedupe.worker.ts', import.meta.url), { type: 'module' });
    const SemanticDeduplicator = Comlink.wrap<any>(dedupeWorker);
    dedupeService = await new (SemanticDeduplicator as any)();
  }
  return dedupeService;
}
