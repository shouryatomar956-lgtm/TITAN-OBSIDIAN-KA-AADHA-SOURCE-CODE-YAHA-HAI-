import { memo } from 'react';
import { cn } from '../lib/utils';

interface AnalyticsSkeletonProps {
  className?: string;
}

export const AnalyticsSkeleton = memo(function AnalyticsSkeleton({ className }: AnalyticsSkeletonProps) {
  return (
    <div 
      className={cn("mt-2 space-y-6 animate-pulse select-none", className)}
      role="status"
      aria-label="Loading analytics and telemetry data"
      aria-busy="true"
    >
      {/* Header & Export Action Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="space-y-1.5">
          <div className="h-6 w-48 bg-zinc-200 rounded-lg" />
          <div className="h-3.5 w-64 bg-zinc-100 rounded-md" />
        </div>

        {/* Action Button Skeleton */}
        <div className="h-10 w-48 rounded-2xl bg-zinc-200/80 shrink-0" />
      </div>

      <div className="space-y-6 bg-white text-zinc-900">
        {/* Main Metric & Toggles */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col space-y-2">
            <div className="h-3.5 w-28 bg-zinc-200 rounded" />
            <div className="h-8 w-24 bg-zinc-300 rounded-xl" />
          </div>
          <div className="flex gap-2">
            <div className="w-10 h-10 rounded-[14px] bg-zinc-200" />
            <div className="w-10 h-10 rounded-[14px] bg-zinc-100" />
          </div>
        </div>

        {/* Date Selector Pill Skeleton */}
        <div className="flex items-center justify-between bg-zinc-50 rounded-[20px] p-4 border border-zinc-100">
          <div className="h-4 w-44 bg-zinc-200 rounded-md" />
          <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-zinc-100 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-zinc-200" />
          </div>
        </div>

        {/* Charts Skeletons */}
        <div className="space-y-6">
          {/* Chart 1: Progression Volume Curve */}
          <div className="space-y-2">
            <div className="h-48 w-full bg-gradient-to-b from-zinc-50 to-zinc-100/50 rounded-[24px] border border-zinc-100 p-4 flex flex-col justify-between">
              {/* Simulated Chart Gridlines */}
              <div className="w-full space-y-7 pt-2">
                <div className="h-px w-full bg-zinc-200/60" />
                <div className="h-px w-full bg-zinc-200/60" />
                <div className="h-px w-full bg-zinc-200/60" />
                <div className="h-px w-full bg-zinc-200/60" />
              </div>
              {/* Horizontal Axis Skeleton */}
              <div className="flex justify-between items-center px-2 pt-2 border-t border-zinc-200/80">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="h-3 w-8 bg-zinc-200 rounded" />
                ))}
              </div>
            </div>
          </div>

          {/* Chart 2: Training Frequency Bars */}
          <div className="space-y-3">
            <div className="h-4 w-36 bg-zinc-200 rounded-md" />
            <div className="h-40 w-full bg-zinc-50 rounded-[24px] border border-zinc-100 p-4 flex items-end justify-around gap-2">
              {[60, 85, 30, 95, 75, 20, 90].map((heightPct, idx) => (
                <div key={idx} className="flex-1 max-w-[36px] flex flex-col items-center gap-2 h-full justify-end">
                  <div 
                    className="w-full bg-zinc-200/80 rounded-t-lg transition-all"
                    style={{ height: `${heightPct}%` }}
                  />
                  <div className="h-3 w-6 bg-zinc-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Chart 3: Targeted Muscle Distribution Donut */}
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="h-4 w-44 bg-zinc-200 rounded-md" />
              <div className="h-3 w-56 bg-zinc-100 rounded" />
            </div>

            <div className="h-44 w-full bg-zinc-50 rounded-[24px] border border-zinc-100 flex items-center justify-center relative">
              {/* Donut Ring Skeleton */}
              <div className="w-32 h-32 rounded-full border-[16px] border-zinc-200 border-t-purple-200/80 border-r-indigo-200/80 animate-pulse" />
              <div className="absolute w-12 h-6 bg-zinc-200 rounded" />
            </div>

            {/* Muscle Distribution Legend Tags */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-2">
              {[
                { w: 'w-24' },
                { w: 'w-20' },
                { w: 'w-24' },
                { w: 'w-28' },
                { w: 'w-24' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-200 shrink-0" />
                  <div className={cn("h-3 bg-zinc-200 rounded", item.w)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
