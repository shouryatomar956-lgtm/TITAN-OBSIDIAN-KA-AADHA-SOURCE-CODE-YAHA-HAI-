import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * 1. First Spark: Energetic golden lightning spark on obsidian shield
 */
export function FirstSparkIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="firstSparkGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9.5" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
      <path 
        d="M13 2.5L4.5 13.5H12L11 21.5L19.5 10.5H12L13 2.5Z" 
        fill="url(#firstSparkGrad)" 
        stroke="#78350f" 
        strokeWidth="0.8" 
        strokeLinejoin="round" 
      />
      <circle cx="12" cy="12" r="1.2" fill="#ffffff" />
    </svg>
  );
}

/**
 * 2. Iron Will: Gilded trophy with reinforced iron core
 */
export function IronWillIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ironWillGrad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Trophy Handles */}
      <path d="M5 8C3.5 8 2.5 9 2.5 10.5C2.5 12.5 4 13.5 6 13.5M19 8C20.5 8 21.5 9 21.5 10.5C21.5 12.5 20 13.5 18 13.5" stroke="url(#ironWillGrad)" strokeWidth="1.6" strokeLinecap="round" />
      {/* Trophy Cup Body */}
      <path d="M5.5 5.5H18.5V11.5C18.5 15 15.5 17 12 17C8.5 17 5.5 15 5.5 11.5V5.5Z" fill="url(#ironWillGrad)" stroke="#78350f" strokeWidth="0.8" />
      {/* Trophy Stem & Base */}
      <path d="M10 17V19.5H14V17M7.5 19.5H16.5V21.5H7.5V19.5Z" fill="#78350f" stroke="#451a03" strokeWidth="0.6" />
      {/* 5-Streak Roman numeral V inside cup */}
      <path d="M9.5 8.5L12 13.5L14.5 8.5" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 3. Hydration Novice: Pure water droplets trio with crystalline cyan sheen
 */
export function HydrationNoviceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dropletGrad" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>
      {/* Primary Droplet */}
      <path 
        d="M12 3C12 3 7.5 9 7.5 13.5C7.5 16 9.5 18 12 18C14.5 18 16.5 16 16.5 13.5C16.5 9 12 3 12 3Z" 
        fill="url(#dropletGrad)" 
        stroke="#bae6fd" 
        strokeWidth="0.8" 
      />
      {/* Water glint */}
      <ellipse cx="10" cy="12.5" rx="1" ry="2.2" fill="#ffffff" opacity="0.6" transform="rotate(-20 10 12.5)" />
      {/* Secondary Companion Droplet */}
      <path d="M17.5 14C17.5 14 15 17 15 19C15 20.2 16 21 17.5 21C19 21 20 20.2 20 19C20 17 17.5 14 17.5 14Z" fill="#38bdf8" />
    </svg>
  );
}

/**
 * 4. Step Counter I: Supersonic kinetic footprint trails
 */
export function StepCounterIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stepGrad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Left Sole & Heel */}
      <ellipse cx="8.5" cy="11.5" rx="2.5" ry="4.5" transform="rotate(-15 8.5 11.5)" fill="url(#stepGrad)" />
      <circle cx="7.2" cy="17.5" r="1.8" fill="url(#stepGrad)" />
      {/* Right Sole & Heel (Forward Step) */}
      <ellipse cx="15.5" cy="8" rx="2.5" ry="4.5" transform="rotate(15 15.5 8)" fill="#10b981" />
      <circle cx="16.8" cy="14" r="1.8" fill="#10b981" />
      {/* 10k Pace Wave */}
      <path d="M3 21C6 19 9 20 12 18.5C15 17 18 19 21 17" stroke="#6ee7b7" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 5. Calorie Spark: Active thermal calorie blaze
 */
export function CalorieSparkIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="flameGrad" x1="12" y1="3" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
      </defs>
      <path 
        d="M12 2C12 2 15 6 15 9.5C15 11.5 14 12.5 13 13C15 13 18 14.5 18 17.5C18 20 15.5 22 12 22C8.5 22 6 20 6 17.5C6 14 9 12 9 8.5C9 6.5 8 5.5 8 5.5C8 5.5 12 2 12 2Z" 
        fill="url(#flameGrad)" 
        stroke="#7c2d12" 
        strokeWidth="0.7" 
      />
      {/* Inner White Hot Core */}
      <path d="M12 14C13 14 14 15.5 14 17C14 18.5 13 19.5 12 19.5C11 19.5 10 18.5 10 17C10 15.5 11 14 12 14Z" fill="#ffffff" />
    </svg>
  );
}

/**
 * 6. Volume Starter: Hexagonal chrome dumbbell with knurled grip
 */
export function VolumeStarterIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dumbbellGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Barbell Bar */}
      <line x1="7.5" y1="16.5" x2="16.5" y2="7.5" stroke="url(#dumbbellGrad)" strokeWidth="3" strokeLinecap="round" />
      {/* Left Weight Plates */}
      <rect x="3.5" y="13.5" width="4" height="7" rx="1.2" transform="rotate(-45 3.5 13.5)" fill="#475569" stroke="#1e293b" strokeWidth="0.7" />
      <rect x="5.5" y="15.5" width="2" height="4.5" rx="0.8" transform="rotate(-45 5.5 15.5)" fill="#94a3b8" />
      {/* Right Weight Plates */}
      <rect x="13.5" y="3.5" width="4" height="7" rx="1.2" transform="rotate(-45 13.5 3.5)" fill="#475569" stroke="#1e293b" strokeWidth="0.7" />
      <rect x="15.5" y="5.5" width="2" height="4.5" rx="0.8" transform="rotate(-45 15.5 5.5)" fill="#94a3b8" />
      {/* 1000kg badge plate */}
      <circle cx="12" cy="12" r="2.2" fill="#fbbf24" />
      <path d="M12 10.5V13.5" stroke="#78350f" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 7. Early Bird: Morning dawn sun rising above the horizon
 */
export function EarlyBirdIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunGrad" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      {/* Dawn Rays */}
      <path d="M12 2V5M4.93 4.93L7.05 7.05M2 12H5M19 12H22M16.95 7.05L19.07 4.93" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      {/* Rising Sun Half-Sphere */}
      <path d="M5 16C5 12.13 8.13 9 12 9C15.87 9 19 12.13 19 16H5Z" fill="url(#sunGrad)" stroke="#b45309" strokeWidth="0.8" />
      {/* Horizon Baseline */}
      <line x1="2" y1="16" x2="22" y2="16" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      {/* Morning bird wing */}
      <path d="M10 12.5C11 11.5 12 12.5 13 12.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 8. Night Owl: Crescent nocturnal moon with twinkling constellation
 */
export function NightOwlIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="moonGrad" x1="5" y1="3" x2="19" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      {/* Crescent Moon */}
      <path 
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" 
        fill="url(#moonGrad)" 
        stroke="#a5b4fc" 
        strokeWidth="1.2" 
        strokeLinejoin="round" 
      />
      {/* Night Stars */}
      <circle cx="16" cy="6" r="1" fill="#ffffff" />
      <circle cx="19" cy="9" r="0.7" fill="#e0e7ff" />
      <circle cx="14" cy="10" r="0.6" fill="#ffffff" />
    </svg>
  );
}

/**
 * 9. Set Grinder: Stacked isometric workout plates & layers
 */
export function SetGrinderIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="layerGrad" x1="2" y1="4" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Top Working Set Plate */}
      <path d="M12 3L21 8L12 13L3 8L12 3Z" fill="url(#layerGrad)" stroke="#78350f" strokeWidth="0.8" strokeLinejoin="round" />
      {/* Mid Working Set Plate */}
      <path d="M3 12L12 17L21 12" stroke="url(#layerGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Bottom Working Set Plate */}
      <path d="M3 16L12 21L21 16" stroke="url(#layerGrad)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Number 50 spark */}
      <circle cx="12" cy="8" r="1.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * 10. Consistency Seed: Green sprouting acorn of momentum
 */
export function ConsistencySeedIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sproutGrad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>
      {/* Soil mound base */}
      <path d="M4 20C6 18 10 18 12 18C14 18 18 18 20 20" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" />
      {/* Sprouting Stem */}
      <path d="M12 18V10" stroke="url(#sproutGrad)" strokeWidth="2.2" strokeLinecap="round" />
      {/* Left Leaf */}
      <path d="M12 13C8.5 13 6 10 6 6C10 6 12 9 12 13Z" fill="url(#sproutGrad)" stroke="#166534" strokeWidth="0.8" />
      {/* Right Leaf */}
      <path d="M12 10C15 10 18 8 18 5C15 5 13 7.5 12 10Z" fill="#22c55e" stroke="#166534" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 11. Hydration Tracker: Hydro flask tumbler with measurement gauge
 */
export function HydrationTrackerIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waterCupGrad" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Glass / Tumbler Contour */}
      <path d="M6 3H18L16.2 20C16.1 20.6 15.6 21 15 21H9C8.4 21 7.9 20.6 7.8 20L6 3Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.2" />
      {/* Water Fill Level */}
      <path d="M7 10H17L16.2 20H7.8L7 10Z" fill="url(#waterCupGrad)" opacity="0.85" />
      {/* 7-Day Tick Marks */}
      <line x1="8.5" y1="7" x2="10.5" y2="7" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <line x1="8.5" y1="11" x2="11" y2="11" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <line x1="8.5" y1="15" x2="11.5" y2="15" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      {/* Droplet Spark */}
      <circle cx="12" cy="14" r="1.2" fill="#ffffff" />
    </svg>
  );
}

/**
 * 12. Form Checker: Precision clipboard with verified checkmark
 */
export function FormCheckerIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="clipboardGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Clipboard board */}
      <rect x="4" y="4" width="16" height="18" rx="2" fill="#18181b" stroke="#52525b" strokeWidth="1" />
      {/* Top metal clip */}
      <path d="M9 3H15V6H9V3Z" fill="url(#clipboardGrad)" stroke="#78350f" strokeWidth="0.8" rx="1" />
      {/* Form Checkmark */}
      <path d="M8 12.5L11 15.5L16.5 9" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="18" x2="16" y2="18" stroke="#71717a" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 13. Weekend Warrior: Fortified tactical shield with dual crossed swords
 */
export function WeekendWarriorIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="60%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* Warrior Shield */}
      <path 
        d="M12 2L20 5.5V12C20 17 16.5 20.8 12 22C7.5 20.8 4 17 4 12V5.5L12 2Z" 
        fill="url(#shieldGrad)" 
        stroke="#f59e0b" 
        strokeWidth="1.2" 
        strokeLinejoin="round" 
      />
      {/* Saturday & Sunday Crossed Twin Blades */}
      <path d="M8 8L16 16M16 8L8 16" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="1.8" fill="#f59e0b" />
    </svg>
  );
}

/**
 * 14. Progression Dad: High-velocity boost speedometer gauge
 */
export function ProgressionDadIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gaugeGrad" x1="4" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      {/* Speedometer Arc */}
      <path 
        d="M5 17C3.5 15 3 12 4 9C5.5 5 9 3 13 3C17.5 3 21 6.5 21 11C21 13.5 20 15.5 18.5 17" 
        stroke="url(#gaugeGrad)" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
      />
      {/* Needle pinned to max velocity */}
      <line x1="12" y1="14" x2="17.5" y2="7.5" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="14" r="2.5" fill="#ffffff" stroke="#7f1d1d" strokeWidth="0.8" />
      {/* Turbo Thrust Flame */}
      <path d="M12 18L13 21L12 20L11 21L12 18Z" fill="#f59e0b" />
    </svg>
  );
}

export const COMMON_BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap: FirstSparkIcon,
  Trophy: IronWillIcon,
  Droplets: HydrationNoviceIcon,
  Footprints: StepCounterIcon,
  Flame: CalorieSparkIcon,
  Dumbbell: VolumeStarterIcon,
  Sun: EarlyBirdIcon,
  Moon: NightOwlIcon,
  Layers: SetGrinderIcon,
  Sprout: ConsistencySeedIcon,
  GlassWater: HydrationTrackerIcon,
  ClipboardCheck: FormCheckerIcon,
  Shield: WeekendWarriorIcon,
  Gauge: ProgressionDadIcon,
  // Direct name fallbacks
  FirstSpark: FirstSparkIcon,
  IronWill: IronWillIcon,
  HydrationNovice: HydrationNoviceIcon,
  StepCounter: StepCounterIcon,
  CalorieSpark: CalorieSparkIcon,
  VolumeStarter: VolumeStarterIcon,
  EarlyBird: EarlyBirdIcon,
  NightOwl: NightOwlIcon,
  SetGrinder: SetGrinderIcon,
  ConsistencySeed: ConsistencySeedIcon,
  HydrationTracker: HydrationTrackerIcon,
  FormChecker: FormCheckerIcon,
  WeekendWarrior: WeekendWarriorIcon,
  ProgressionDad: ProgressionDadIcon
};
