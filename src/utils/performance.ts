import { useEffect, useRef } from 'react';

/**
 * 144 FPS target frame time in milliseconds.
 * 1000ms / 144 frames = ~6.94ms per frame.
 */
export const TARGET_144FPS_MS = 1000 / 144;

/**
 * A lightweight utility to mark and measure code execution time.
 */
export const performanceMonitor = {
  marks: new Map<string, number>(),

  /**
   * Starts a performance measurement.
   * @param id Unique identifier for the measurement.
   */
  start(id: string) {
    this.marks.set(id, performance.now());
  },

  /**
   * Ends a performance measurement and warns if it exceeds the 144fps threshold.
   * @param id Unique identifier for the measurement.
   * @param thresholdMs The threshold in milliseconds (default: 6.94ms).
   * @returns The duration in milliseconds.
   */
  end(id: string, thresholdMs: number = TARGET_144FPS_MS): number | undefined {
    const startTime = this.marks.get(id);
    if (!startTime) return undefined;
    
    const duration = performance.now() - startTime;
    this.marks.delete(id);
    
    if (duration > thresholdMs) {
      console.warn(`[Performance] ${id} took ${duration.toFixed(2)}ms (Target: <${thresholdMs.toFixed(2)}ms for 144fps)`);
    }
    
    return duration;
  }
};

/**
 * A React hook to monitor component rendering performance to ensure 144fps fluidity.
 * It measures the time from render start to paint (layout effect).
 * 
 * @param componentName Name of the component being monitored.
 * @param thresholdMs Threshold in milliseconds before warning (default: 6.94ms).
 */
export function useRenderPerformance(componentName: string, thresholdMs: number = TARGET_144FPS_MS) {
  const renderStartTime = useRef<number>(0);

  // Capture timestamp during the render phase
  renderStartTime.current = performance.now();

  useEffect(() => {
    // Calculate time elapsed after the DOM has been painted
    const duration = performance.now() - renderStartTime.current;
    
    if (duration > thresholdMs) {
      console.warn(`[Performance Frame Drop] ${componentName} render took ${duration.toFixed(2)}ms (Target: <${thresholdMs.toFixed(2)}ms for 144fps)`);
    }
  });
}
