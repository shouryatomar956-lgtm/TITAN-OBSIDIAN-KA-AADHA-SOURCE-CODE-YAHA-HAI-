import * as Comlink from 'comlink';

export const workerC = Comlink.wrap<any>(
  new Worker(new URL('./workerC.ts', import.meta.url), {
    type: 'module',
  })
);
