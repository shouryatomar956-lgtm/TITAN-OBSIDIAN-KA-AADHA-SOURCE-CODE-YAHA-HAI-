import fs from 'fs';
let content = fs.readFileSync('src/hooks/useFluidInteraction.ts', 'utf8');

const regex = /    const handler = \(e: Event\) => \{[\s\S]*?      \}\n    \};/;

const newFunc = `    let lastFired = 0;
    const handler = (e: Event) => {
      // Prevent double firing on touch devices (touchstart + click)
      const now = Date.now();
      if (now - lastFired < 400) return;
      lastFired = now;

      // 1. Critical Phase: Execute immediately (0ms visual change)
      if (criticalRef.current) {
        criticalRef.current(e);
      }

      // 2. Deferred Phase: Queue non-critical tasks to background idle time
      if (deferredRef.current) {
        const deferredTask = () => {
          if (deferredRef.current) deferredRef.current(e);
        };

        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(deferredTask, { timeout: 1000 });
        } else {
          setTimeout(deferredTask, 50);
        }
      }
    };`;

content = content.replace(regex, newFunc);
fs.writeFileSync('src/hooks/useFluidInteraction.ts', content);
