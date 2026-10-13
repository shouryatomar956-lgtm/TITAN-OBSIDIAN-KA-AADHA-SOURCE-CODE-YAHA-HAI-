import { memo } from 'react';
import { AnalyticsSkeleton } from './AnalyticsSkeleton';
import { cn } from '../lib/utils';

interface DashboardSkeletonProps {
  className?: string;
  showOnlyContent?: boolean;
}

export const DashboardSkeleton = memo(function DashboardSkeleton({ 
  className,
  showOnlyContent = false 
}: DashboardSkeletonProps) {
  const content = (
    <div 
      className={cn("w-full flex flex-col px-4 sm:px-6 md:px-8 pb-8 space-y-6 animate-pulse select-none", className)}
      role="status"
      aria-label="Loading dashboard metrics and recommendations"
      aria-busy="true"
    >
      {/* The Big Gradient Hero Card Skeleton */}
      <div className="w-full mt-2 h-[220px] rounded-[32px] bg-gradient-to-br from-purple-200/60 via-indigo-100/50 to-cyan-100/60 p-8 flex flex-col justify-between border border-purple-100/60 shadow-xs relative overflow-hidden">
        <div className="flex justify-between items-start z-10">
          <div className="flex flex-col space-y-2">
            <div className="h-4 w-28 bg-white/70 rounded-md" />
            <div className="flex items-baseline gap-2">
              <div className="h-9 w-20 bg-white/90 rounded-xl" />
              <div className="h-5 w-24 bg-white/70 rounded-md" />
            </div>
          </div>
          <div className="h-6 w-12 bg-white/70 rounded-lg" />
        </div>

        <div className="flex items-center justify-between z-10 mt-4">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
          </div>
          <div className="h-4 w-32 bg-white/70 rounded-md" />
        </div>
      </div>

      {/* Workouts Monthly Summary Block Skeleton */}
      <div className="w-full bg-zinc-50 rounded-[32px] p-6 flex items-center justify-between border border-zinc-100 shadow-xs">
        <div className="flex flex-col space-y-1.5">
          <div className="h-4 w-20 bg-zinc-200 rounded" />
          <div className="flex items-baseline gap-2">
            <div className="h-7 w-12 bg-zinc-300 rounded-lg" />
            <div className="h-4 w-16 bg-zinc-200 rounded" />
          </div>
        </div>
        <div className="h-11 w-32 rounded-[20px] bg-zinc-200 shrink-0" />
      </div>

      {/* Smart Suggestions Block Skeleton */}
      <div className="w-full bg-purple-50/60 rounded-[24px] p-5 flex flex-col gap-3 border border-purple-100/60">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1.5">
            <div className="h-3.5 w-32 bg-purple-200/80 rounded" />
            <div className="h-4 w-48 bg-zinc-200 rounded" />
          </div>
          <div className="h-8 w-16 rounded-[16px] bg-purple-200/80 shrink-0" />
        </div>
        <div className="flex gap-2 overflow-hidden pb-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[120px] h-[66px] shrink-0 bg-white border border-purple-100/80 rounded-[12px] p-2 flex flex-col justify-between">
              <div className="h-2.5 w-14 bg-purple-200/70 rounded" />
              <div className="h-3 w-20 bg-zinc-200 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Today's Recommendations Section Skeleton */}
      <div className="space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 w-44 bg-zinc-200 rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between w-full py-2 px-1">
                <div className="flex items-center gap-4">
                  <div className="w-[52px] h-[52px] rounded-[18px] bg-zinc-100 shrink-0 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-md bg-zinc-200" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <div className="h-4 w-36 bg-zinc-200 rounded" />
                    <div className="h-3 w-48 bg-zinc-100 rounded" />
                  </div>
                </div>
                <div className="h-5 w-8 bg-zinc-200 rounded-md ml-4 shrink-0" />
              </div>
            ))}
          </div>
        </section>

        {/* Condition & Settings Section Skeleton */}
        <section>
          <div className="h-5 w-40 bg-zinc-200 rounded-md mb-3" />
          
          {/* Injury & Shield Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-[24px] bg-zinc-50 border border-zinc-100 flex flex-col justify-between h-20">
              <div className="flex justify-between items-start w-full">
                <div className="w-5 h-5 rounded bg-zinc-200" />
                <div className="w-5 h-5 rounded-[6px] bg-zinc-200" />
              </div>
              <div className="h-4 w-20 bg-zinc-200 rounded" />
            </div>
            <div className="p-4 rounded-[24px] bg-zinc-50 border border-zinc-100 flex flex-col justify-between h-20">
              <div className="flex justify-between items-start w-full">
                <div className="w-5 h-5 rounded bg-zinc-200" />
                <div className="w-5 h-5 rounded-[6px] bg-zinc-200" />
              </div>
              <div className="h-4 w-20 bg-zinc-200 rounded" />
            </div>
          </div>

          {/* Physiological State Cards */}
          <div className="bg-zinc-50 rounded-[24px] p-4 flex flex-col gap-3 border border-zinc-100">
            <div className="h-3 w-32 bg-zinc-200 rounded" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex-1 py-3 px-2 rounded-2xl bg-white border border-zinc-100 shadow-xs flex flex-col items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-200" />
                  <div className="h-3 w-12 bg-zinc-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Biometric Settings Placeholder Skeleton */}
        <section className="bg-zinc-50 rounded-[28px] p-6 border border-zinc-100 space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="h-5 w-36 bg-zinc-200 rounded" />
              <div className="h-3 w-48 bg-zinc-100 rounded" />
            </div>
            <div className="h-8 w-20 bg-zinc-200 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 border border-zinc-100 space-y-2">
                <div className="h-3 w-14 bg-zinc-100 rounded" />
                <div className="h-5 w-20 bg-zinc-200 rounded" />
              </div>
            ))}
          </div>
        </section>

        {/* Embedded Analytics Skeleton */}
        <AnalyticsSkeleton />
      </div>
    </div>
  );

  if (showOnlyContent) {
    return content;
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-white text-zinc-900 font-sans flex flex-col">
      {/* Sticky Top Header Skeleton */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md pt-safe px-4 pb-2 border-b border-zinc-100">
        <div className="w-full flex items-center justify-between h-14">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-200 to-indigo-200 animate-pulse flex items-center justify-center font-black text-sm text-purple-400">
              A
            </div>
            <div className="flex flex-col space-y-1">
              <div className="h-3.5 w-16 bg-zinc-200 rounded" />
              <div className="h-2.5 w-24 bg-zinc-100 rounded" />
            </div>
          </div>

          {/* Navigation Tabs Pill Skeleton */}
          <div className="flex gap-2 p-1 bg-zinc-100 rounded-xl ml-2 shrink-0">
            <div className="w-8 h-7 bg-white rounded-lg shadow-xs" />
            <div className="w-8 h-7 bg-zinc-200/60 rounded-lg" />
            <div className="w-8 h-7 bg-zinc-200/60 rounded-lg" />
            <div className="w-8 h-7 bg-zinc-200/60 rounded-lg" />
            <div className="w-8 h-8 rounded-full bg-zinc-200" />
          </div>
        </div>
      </header>

      {/* Main Scrollable Area */}
      <main className="w-full flex-1 flex flex-col pb-safe min-h-0 overflow-y-auto">
        {content}
      </main>
    </div>
  );
});
