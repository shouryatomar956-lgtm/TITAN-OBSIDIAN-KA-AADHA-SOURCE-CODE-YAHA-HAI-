import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * 1. Hydration Master: Glowing water droplet badge with multi-layer cyan-blue radial aura & highlights
 */
export function HydrationMasterIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="hydrMasterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#0284c7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hydrMasterDroplet" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="85%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="hydrMasterInner" x1="10" y1="6" x2="14" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Radiant Aura Ring */}
      <circle cx="12" cy="12" r="10.5" fill="url(#hydrMasterGlow)" />
      <circle cx="12" cy="12" r="9" stroke="#0ea5e9" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.6" />
      {/* Outer Water Droplet Base */}
      <path
        d="M12 2.5C12 2.5 5 11 5 15.5C5 19.0899 8.13401 22 12 22C15.866 22 19 19.0899 19 15.5C19 11 12 2.5 12 2.5Z"
        fill="url(#hydrMasterDroplet)"
        stroke="#0369a1"
        strokeWidth="0.8"
      />
      {/* Specular Glint & Inner Crest */}
      <path
        d="M12 5C12 5 7.5 12 7.5 15C7.5 17.5 9.5 19.5 12 19.5C10 18.5 9 16.5 9 14.5C9 12 12 5 12 5Z"
        fill="url(#hydrMasterInner)"
      />
      {/* Sparkle star */}
      <circle cx="9.5" cy="11.5" r="1" fill="#ffffff" />
      <circle cx="14" cy="17" r="0.75" fill="#e0f2fe" />
    </svg>
  );
}

/**
 * 2. Beast Mode (Perk/Badgehybrid): Roaring beast emblem with sharp fangs, glowing eyes & primal fury
 */
export function BeastModeIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="beastModeGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="beastHornGrad" x1="4" y1="2" x2="20" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
      </defs>
      {/* Beast Face Shield Backing */}
      <path
        d="M12 2L4 6V13C4 18 8 21.5 12 22.5C16 21.5 20 18 20 13V6L12 2Z"
        fill="#1e1b4b"
        stroke="#06b6d4"
        strokeWidth="1"
      />
      {/* Beast Brow & Horns */}
      <path
        d="M5.5 6L8.5 9.5L12 7L15.5 9.5L18.5 6L16.5 11L12 9L7.5 11L5.5 6Z"
        fill="url(#beastHornGrad)"
        stroke="#4c0519"
        strokeWidth="0.6"
      />
      {/* Beast Snout & Jaws */}
      <path
        d="M8 12.5L12 10.5L16 12.5L17 17L12 20L7 17L8 12.5Z"
        fill="url(#beastModeGrad)"
        stroke="#4c0519"
        strokeWidth="0.6"
      />
      {/* Fangs */}
      <path d="M9.5 15.5L10 18L10.8 15.5M14.5 15.5L14 18L13.2 15.5" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      {/* Glowing Eyes */}
      <polygon points="8.5,12 10.5,12.5 9,13.5" fill="#38bdf8" />
      <polygon points="15.5,12 13.5,12.5 15,13.5" fill="#38bdf8" />
      <circle cx="9.5" cy="12.5" r="0.5" fill="#ffffff" />
      <circle cx="14.5" cy="12.5" r="0.5" fill="#ffffff" />
    </svg>
  );
}

/**
 * 3. Step Centurion: Hermes-style winged boot with feathers and swift stride lines
 */
export function StepCenturionIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stepCenturionBoot" x1="4" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <linearGradient id="stepCenturionWing" x1="12" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Wing Behind Boot */}
      <path
        d="M11 7C14 4 19 3 22 4C21 7 19 9 16 10C18 9 20 8.5 21.5 9.5C19 11.5 16 12 13 11.5"
        fill="url(#stepCenturionWing)"
        stroke="#78350f"
        strokeWidth="0.6"
      />
      {/* Athletic Boot Silhouette */}
      <path
        d="M6 8L10 8L11 12L16 13C17.5 13 19 14.5 19.5 16L20 18H4C3.5 18 3 17 3.5 15.5L5 9C5.2 8.4 5.5 8 6 8Z"
        fill="url(#stepCenturionBoot)"
        stroke="#164e63"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* Outsole Grip */}
      <path d="M3.5 18.5H20.5V20H3.5V18.5Z" fill="#155e75" stroke="#083344" strokeWidth="0.6" />
      {/* Laces & Speed Highlights */}
      <path d="M8 9.5H10.5M8.5 11H11" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" />
      <path d="M1 16H2.5M1 18H2" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. Calorie Furnace: Roaring blue flame with intense sapphire inferno core & embers
 */
export function CalorieFurnaceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="calFurnaceOuter" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#0284c7" />
          <stop offset="80%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
        <linearGradient id="calFurnaceCore" x1="12" y1="8" x2="12" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor="#bae6fd" />
          <stop offset="70%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Outer Roaring Sapphire Flame */}
      <path
        d="M12 2C13 5 15.5 7 17 9.5C18.5 12 19 14.5 19 16.5C19 20 16 22 12 22C8 22 5 20 5 16.5C5 13 8 9 9 7C9.5 9 10.5 10 11.5 10C12.5 10 13 8.5 12 7C10.5 5 11 3 12 2Z"
        fill="url(#calFurnaceOuter)"
        stroke="#0369a1"
        strokeWidth="0.8"
      />
      {/* Inner White-Hot Thermal Core */}
      <path
        d="M12 9C13 11 14.5 12.5 15 14C15.5 15.5 15 17 14.5 17.5C13.5 18.5 12.8 19 12 19C11.2 19 10.5 18.5 9.5 17.5C9 17 8.5 15.5 9 14C9.5 12.5 11 11 12 9Z"
        fill="url(#calFurnaceCore)"
      />
      {/* Embers */}
      <circle cx="16.5" cy="6.5" r="0.75" fill="#38bdf8" />
      <circle cx="7.5" cy="8.5" r="0.65" fill="#7dd3fc" />
    </svg>
  );
}

/**
 * 5. Volume Heavy: Heavy bronze Olympic plate with deep concentric ridges and 50K engraving
 */
export function VolumeHeavyIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="volHeavyBronze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="55%" stopColor="#b45309" />
          <stop offset="85%" stopColor="#92400e" />
          <stop offset="100%" stopColor="#451a03" />
        </radialGradient>
        <linearGradient id="volHeavyRim" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      {/* Outer Plate Rim */}
      <circle cx="12" cy="12" r="10" fill="url(#volHeavyBronze)" stroke="url(#volHeavyRim)" strokeWidth="1.2" />
      {/* Inner Grip Ridges */}
      <circle cx="12" cy="12" r="7.5" stroke="#78350f" strokeWidth="0.8" fill="none" />
      <circle cx="12" cy="12" r="5.5" stroke="#d97706" strokeWidth="0.6" strokeDasharray="3 1.5" fill="none" />
      {/* Center Steel Hub */}
      <circle cx="12" cy="12" r="3" fill="#1c1917" stroke="#fbbf24" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="1.4" fill="#78350f" />
      {/* Weight markings '50K' at top and bottom */}
      <path d="M10 6.5H13.5M10 7.5H13M10 6.5V8.5H13.5" stroke="#fde68a" strokeWidth="0.6" strokeLinecap="round" />
      <path d="M10 16.5H13.5M10 17.5H13M10 16.5V18.5H13.5" stroke="#fde68a" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 6. Streak Fortified: Imposing stone fortress keep with battlements and portcullis gate
 */
export function StreakFortifiedIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="streakFortWall" x1="12" y1="3" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Fortress Wall Base */}
      <path
        d="M4 21V9L6 9V6H8V9H10V6H14V9H16V6H18V9L20 9V21H4Z"
        fill="url(#streakFortWall)"
        stroke="#1e293b"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      {/* Center Rampart Tower Banner */}
      <path d="M12 6V2.5L14.5 4L12 5.5" fill="#06b6d4" stroke="#0891b2" strokeWidth="0.5" />
      {/* Portcullis Arched Gate */}
      <path d="M9.5 21V15C9.5 13.6 10.6 12.5 12 12.5C13.4 12.5 14.5 13.6 14.5 15V21H9.5Z" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
      {/* Iron Grate inside Gate */}
      <line x1="11" y1="13" x2="11" y2="21" stroke="#38bdf8" strokeWidth="0.7" />
      <line x1="13" y1="13" x2="13" y2="21" stroke="#38bdf8" strokeWidth="0.7" />
      <line x1="10" y1="16" x2="14" y2="16" stroke="#38bdf8" strokeWidth="0.7" />
      <line x1="10" y1="18.5" x2="14" y2="18.5" stroke="#38bdf8" strokeWidth="0.7" />
      {/* Stonework Lines */}
      <line x1="6" y1="12" x2="8" y2="12" stroke="#cbd5e1" strokeWidth="0.5" />
      <line x1="16" y1="12" x2="18" y2="12" stroke="#cbd5e1" strokeWidth="0.5" />
      <line x1="5" y1="16" x2="7.5" y2="16" stroke="#cbd5e1" strokeWidth="0.5" />
      <line x1="16.5" y1="16" x2="19" y2="16" stroke="#cbd5e1" strokeWidth="0.5" />
    </svg>
  );
}

/**
 * 7. Water Guardian: Crystal chalice / goblet with swirling pure azure water & refractions
 */
export function WaterGuardianIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="waterGuardChalice" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bae6fd" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <radialGradient id="waterGuardLiquid" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="60%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>
      {/* Goblet Cup */}
      <path
        d="M6 3.5H18V10C18 13.5 15.3 16.5 12 16.5C8.7 16.5 6 13.5 6 10V3.5Z"
        fill="url(#waterGuardChalice)"
        stroke="#0c4a6e"
        strokeWidth="0.9"
      />
      {/* Living Water Surface Inside */}
      <path
        d="M7 6C8.5 6.5 10 5.5 12 5.5C14 5.5 15.5 6.5 17 6V10C17 12.8 14.8 15 12 15C9.2 15 7 12.8 7 10V6Z"
        fill="url(#waterGuardLiquid)"
      />
      {/* Stem & Faceted Base */}
      <path d="M11 16.5V19.5H13V16.5" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 20.5H16V22H8V20.5Z" fill="#0284c7" stroke="#082f49" strokeWidth="0.7" />
      {/* Floating Droplet Crest */}
      <path d="M12 1.5C12 1.5 10 3 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 3 12 1.5 12 1.5Z" fill="#7dd3fc" stroke="#0284c7" strokeWidth="0.5" />
      <circle cx="12" cy="3.5" r="0.6" fill="#ffffff" />
    </svg>
  );
}

/**
 * 8. Set Machine: Interlocking mechanical gear cluster with metallic teeth & central bearings
 */
export function SetMachineIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="setMachineLargeGear" x1="4" y1="4" x2="16" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="setMachineSmallGear" x1="12" y1="12" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="60%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      {/* Primary Gear (Top-Left) */}
      <g>
        <circle cx="9.5" cy="9.5" r="6" fill="url(#setMachineLargeGear)" stroke="#0c4a6e" strokeWidth="0.8" />
        {/* Teeth around perimeter */}
        <rect x="8.5" y="2" width="2" height="2" rx="0.4" fill="#38bdf8" />
        <rect x="8.5" y="15" width="2" height="2" rx="0.4" fill="#0284c7" />
        <rect x="2" y="8.5" width="2" height="2" rx="0.4" fill="#38bdf8" />
        <rect x="15" y="8.5" width="2" height="2" rx="0.4" fill="#0284c7" />
        <circle cx="9.5" cy="9.5" r="2.2" fill="#0f172a" stroke="#7dd3fc" strokeWidth="0.8" />
      </g>
      {/* Secondary Interlocking Gear (Bottom-Right) */}
      <g>
        <circle cx="16.5" cy="16.5" r="4.5" fill="url(#setMachineSmallGear)" stroke="#1e293b" strokeWidth="0.7" />
        <rect x="15.8" y="11" width="1.4" height="1.4" rx="0.3" fill="#cbd5e1" />
        <rect x="15.8" y="20.6" width="1.4" height="1.4" rx="0.3" fill="#475569" />
        <rect x="11" y="15.8" width="1.4" height="1.4" rx="0.3" fill="#cbd5e1" />
        <rect x="20.6" y="15.8" width="1.4" height="1.4" rx="0.3" fill="#475569" />
        <circle cx="16.5" cy="16.5" r="1.6" fill="#0f172a" stroke="#94a3b8" strokeWidth="0.7" />
      </g>
    </svg>
  );
}

/**
 * 9. Velocity Tracker: Speedometer dial with high-speed needle swept toward +15% boost redline
 */
export function VelocityTrackerIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="veloTrackGauge" x1="4" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="80%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      {/* Gauge Outer Bezel */}
      <path
        d="M4.5 16.5C3.5 14.5 3.5 11.5 5 9C7.5 5 12 3.5 16 5C19 6.5 21 9.5 20.5 13C20.2 14.5 19.5 16 18.5 17"
        stroke="url(#veloTrackGauge)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Dial Ticks */}
      <line x1="6.5" y1="13.5" x2="8" y2="13" stroke="#10b981" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="7.5" y1="9" x2="9" y2="9.8" stroke="#06b6d4" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="12" y1="6.5" x2="12" y2="8" stroke="#06b6d4" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="16.5" y1="9" x2="15" y2="9.8" stroke="#f59e0b" strokeWidth="0.9" strokeLinecap="round" />
      <line x1="17.5" y1="13.5" x2="16" y2="13" stroke="#ef4444" strokeWidth="1" strokeLinecap="round" />
      {/* High-Velocity Needle Pointing Aggressively Right (+15% Redline zone) */}
      <path d="M12 15L17.5 10.5" stroke="#f43f5e" strokeWidth="1.8" strokeLinecap="round" />
      {/* Center Pivot Hub */}
      <circle cx="12" cy="15" r="2.5" fill="#18181b" stroke="#ffffff" strokeWidth="1" />
      <circle cx="12" cy="15" r="0.9" fill="#f43f5e" />
    </svg>
  );
}

/**
 * 10. Recovery Disciplinarian: Bio-vitality restorative leaf intertwined with an ECG pulse line
 */
export function RecoveryDisciplinarianIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="recovDiscLeaf" x1="5" y1="4" x2="19" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#059669" />
          <stop offset="100%" stopColor="#065f46" />
        </linearGradient>
      </defs>
      {/* Restorative Herbal Leaf Curved Silhouette */}
      <path
        d="M19 4C19 4 13 4 8 9C4 13 4.5 18 6.5 20C8.5 22 13.5 22.5 17.5 18.5C22.5 13.5 22.5 7.5 22.5 7.5L19 4Z"
        fill="url(#recovDiscLeaf)"
        stroke="#064e3b"
        strokeWidth="0.8"
      />
      {/* Leaf Central Rib */}
      <path d="M8 18C11 15 15 11 19 6" stroke="#a7f3d0" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      {/* Active Vitality ECG Pulse Line through the center */}
      <path
        d="M2 13.5H5.5L7 10L8.5 16L10.5 11L12 14.5L13 13.5H16"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="13.5" r="1.2" fill="#38bdf8" />
    </svg>
  );
}

/**
 * 11. Macro Balance: Precision scale of equilibrium with balanced weighing pans in 5% tolerance
 */
export function MacroBalanceIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="macroBalBrass" x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>
      </defs>
      {/* Center Pillar & Fulcrum Pivot */}
      <line x1="12" y1="3" x2="12" y2="20" stroke="url(#macroBalBrass)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="5" r="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
      {/* Crossbeam Perfectly Balanced */}
      <line x1="4.5" y1="7.5" x2="19.5" y2="7.5" stroke="#38bdf8" strokeWidth="1.4" strokeLinecap="round" />
      {/* Left Weighing Pan & Chains */}
      <path d="M4.5 7.5L2 13.5M4.5 7.5L7 13.5" stroke="#94a3b8" strokeWidth="0.8" />
      <path d="M1.5 13.5H7.5C7.5 15.5 6 16.5 4.5 16.5C3 16.5 1.5 15.5 1.5 13.5Z" fill="url(#macroBalBrass)" stroke="#0c4a6e" strokeWidth="0.6" />
      {/* Right Weighing Pan & Chains */}
      <path d="M19.5 7.5L17 13.5M19.5 7.5L22 13.5" stroke="#94a3b8" strokeWidth="0.8" />
      <path d="M16.5 13.5H22.5C22.5 15.5 21 16.5 19.5 16.5C18 16.5 16.5 15.5 16.5 13.5Z" fill="url(#macroBalBrass)" stroke="#0c4a6e" strokeWidth="0.6" />
      {/* Base Pedestal */}
      <path d="M8 20.5H16V22H8V20.5Z" fill="#0369a1" stroke="#082f49" strokeWidth="0.7" />
    </svg>
  );
}

/**
 * 12. Iron Novice Apex: Polished silver-plated heater shield with chevron & star emblem
 */
export function IronNoviceApexIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ironNoviceShield" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="35%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="ironNoviceChevron" x1="12" y1="8" x2="12" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Knightly Heater Shield */}
      <path
        d="M12 2.5L4.5 5.5V12.5C4.5 17.5 7.8 20.8 12 22C16.2 20.8 19.5 17.5 19.5 12.5V5.5L12 2.5Z"
        fill="url(#ironNoviceShield)"
        stroke="#1e293b"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {/* Rivet Details along the rim */}
      <circle cx="6.5" cy="6.5" r="0.6" fill="#334155" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="#334155" />
      <circle cx="5.8" cy="12.5" r="0.6" fill="#334155" />
      <circle cx="18.2" cy="12.5" r="0.6" fill="#334155" />
      <circle cx="12" cy="20.5" r="0.6" fill="#334155" />
      {/* Central Polished Cyan Chevron */}
      <path
        d="M12 8L7.5 12.5H9.8L12 10.3L14.2 12.5H16.5L12 8Z"
        fill="url(#ironNoviceChevron)"
        stroke="#0c4a6e"
        strokeWidth="0.5"
      />
      {/* Star of 25 Logged Workouts */}
      <polygon points="12,13.5 12.9,15.5 15.2,15.6 13.4,17 14,19.2 12,17.8 10,19.2 10.6,17 8.8,15.6 11.1,15.5" fill="#f8fafc" stroke="#0284c7" strokeWidth="0.5" />
    </svg>
  );
}

export const RARE_BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  GlowingWaterDroplet: HydrationMasterIcon,
  HydrationMaster: HydrationMasterIcon,
  RoaringBeast: BeastModeIcon,
  BeastMode: BeastModeIcon,
  WingedBoot: StepCenturionIcon,
  StepCenturion: StepCenturionIcon,
  RoaringBlueFlame: CalorieFurnaceIcon,
  CalorieFurnace: CalorieFurnaceIcon,
  HeavyBronzePlate: VolumeHeavyIcon,
  VolumeHeavy: VolumeHeavyIcon,
  StoneFortress: StreakFortifiedIcon,
  StreakFortified: StreakFortifiedIcon,
  CrystalChalice: WaterGuardianIcon,
  WaterGuardian: WaterGuardianIcon,
  GearCluster: SetMachineIcon,
  SetMachine: SetMachineIcon,
  SpeedometerNeedle: VelocityTrackerIcon,
  VelocityTracker: VelocityTrackerIcon,
  LeafPulse: RecoveryDisciplinarianIcon,
  RecoveryDisciplinarian: RecoveryDisciplinarianIcon,
  ScaleEquilibrium: MacroBalanceIcon,
  MacroBalance: MacroBalanceIcon,
  SilverPlatedShield: IronNoviceApexIcon,
  IronNoviceApex: IronNoviceApexIcon
};
