import { useEffect, useRef } from 'react';

interface FluidInteractionOptions {
  onCriticalInteraction?: (e: Event) => void;
  onDeferredInteraction?: (e: Event) => void;
  eventTypes?: string[];
}

/**
 * useFluidInteraction
 * 
 * Autonomous Performance Pillar: 0ms Perceived Touch Latency
 * Attaches passive event listeners to guarantee that browser scrolling
 * and touch panning are never blocked by JavaScript execution.
 * Splits interactions into "critical" (immediate visual updates) and 
 * "deferred" (non-critical telemetry/state sync via requestIdleCallback).
 */
export function useFluidInteraction<T extends HTMLElement = HTMLElement>({
  onCriticalInteraction,
  onDeferredInteraction,
  eventTypes = ['touchstart', 'click']
}: FluidInteractionOptions) {
  const ref = useRef<T>(null);
  const criticalRef = useRef(onCriticalInteraction);
  const deferredRef = useRef(onDeferredInteraction);

  // Keep refs perfectly synchronized with closures without causing re-renders
  useEffect(() => {
    criticalRef.current = onCriticalInteraction;
    deferredRef.current = onDeferredInteraction;
  }, [onCriticalInteraction, onDeferredInteraction]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let lastFired = 0;
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
    };

    // Attach passive listeners to prevent blocking the compositor/scroll threads
    eventTypes.forEach(type => {
      element.addEventListener(type, handler, { passive: true });
    });

    return () => {
      eventTypes.forEach(type => {
        element.removeEventListener(type, handler);
      });
    };
  }, [eventTypes]);

  return ref;
}
