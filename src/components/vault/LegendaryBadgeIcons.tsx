import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * 1. Consistency King: Royal crown-styled elite consistency badge
 * Crown with faceted royal jewels, laurel wreath crest, and an elite golden star.
 */
export function CrownConsistencyIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldCrownGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="laurelGrad" x1="4" y1="12" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Laurel Wreath Wings */}
      <path 
        d="M4.5 15.5C3.8 13.8 3.5 11.5 4 9.5M3.5 13C4.2 12.8 5 13.2 5.5 14M5.5 18C4.5 16.5 4 15 4.5 13M19.5 15.5C20.2 13.8 20.5 11.5 20 9.5M20.5 13C19.8 12.8 19 13.2 18.5 14M18.5 18C19.5 16.5 20 15 19.5 13" 
        stroke="url(#laurelGrad)" 
        strokeWidth="1.4" 
        strokeLinecap="round" 
      />
      {/* Royal 5-Point Crown */}
      <path 
        d="M4 17L5.5 7.5L9.5 11.5L12 4.5L14.5 11.5L18.5 7.5L20 17H4Z" 
        fill="url(#goldCrownGrad)" 
        stroke="#78350f" 
        strokeWidth="0.8"
        strokeLinejoin="round" 
      />
      {/* Crown Base Band with Rubies */}
      <path d="M4 17H20V19.5C20 20 19.5 20.5 19 20.5H5C4.5 20.5 4 20 4 19.5V17Z" fill="#b45309" stroke="#78350f" strokeWidth="0.7" />
      <circle cx="7" cy="18.8" r="0.8" fill="#fef08a" />
      <circle cx="12" cy="18.8" r="1" fill="#fef08a" />
      <circle cx="17" cy="18.8" r="0.8" fill="#fef08a" />
      {/* Central Star Gem */}
      <path d="M12 9L12.7 11H14.8L13.1 12.2L13.7 14.2L12 13L10.3 14.2L10.9 12.2L9.2 11H11.3L12 9Z" fill="#ffffff" />
    </svg>
  );
}

/**
 * 2. Volume Titan: Colossal stone monolith barbell
 * Heavy megalithic carved basalt monolith bar loaded with monumental hexagonal iron plates.
 */
export function MonolithBarbellIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="stoneGrad" x1="3" y1="4" x2="21" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="45%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="monolithGold" x1="6" y1="7" x2="18" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Massive Barbell Shaft */}
      <rect x="2" y="10.7" width="20" height="2.6" rx="1.3" fill="url(#stoneGrad)" stroke="#334155" strokeWidth="0.6" />
      {/* Left Colossal Monolith Plates */}
      <rect x="2.5" y="6" width="2" height="12" rx="0.8" fill="#64748b" stroke="#1e293b" strokeWidth="0.7" />
      <rect x="5" y="4" width="2.8" height="16" rx="1" fill="url(#stoneGrad)" stroke="#1e293b" strokeWidth="0.8" />
      {/* Right Colossal Monolith Plates */}
      <rect x="16.2" y="4" width="2.8" height="16" rx="1" fill="url(#stoneGrad)" stroke="#1e293b" strokeWidth="0.8" />
      <rect x="19.5" y="6" width="2" height="12" rx="0.8" fill="#64748b" stroke="#1e293b" strokeWidth="0.7" />
      {/* Center Monolith Stone Pillar Core */}
      <path d="M10 5.5L14 5.5L13.3 18.5L10.7 18.5L10 5.5Z" fill="url(#monolithGold)" stroke="#78350f" strokeWidth="0.7" />
      {/* Ancient Runic Carving Lines */}
      <path d="M12 7V17M10.8 10L13.2 12M10.8 14L13.2 12" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 3. Hydration Archon: Ocean vortex orb
 * Spherical oceanic vortex with swirling tidal currents, water droplet singularity, and luminescent hydro rings.
 */
export function OceanVortexOrbIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oceanGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="vortexGlow" cx="12" cy="12" r="9" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="40%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>
      </defs>
      {/* Outer Spherical Orb Body */}
      <circle cx="12" cy="12" r="9.2" fill="url(#oceanGrad)" stroke="#38bdf8" strokeWidth="0.9" />
      {/* Swirling Oceanic Vortex Arms */}
      <path 
        d="M12 3.5C16.5 3.5 20.2 7 20.5 11.5C20.8 16 17.5 19.8 13.2 20.4C9.5 20.9 6.2 18.8 4.8 15.4C3.8 12.8 4.5 9.5 6.5 7.5" 
        stroke="#7dd3fc" 
        strokeWidth="1.2" 
        strokeLinecap="round" 
        strokeDasharray="3 2"
      />
      <path 
        d="M12 6.5C15 6.5 17.5 9 17.5 12C17.5 15 15 17.5 12 17.5C9.2 17.5 7 15.5 6.8 12.8" 
        stroke="#bae6fd" 
        strokeWidth="1.3" 
        strokeLinecap="round"
      />
      {/* Core Hydro Droplet Singularity */}
      <path 
        d="M12 8.5C12 8.5 9.5 12 9.5 13.5C9.5 14.88 10.62 16 12 16C13.38 16 14.5 14.88 14.5 13.5C14.5 12 12 8.5 12 8.5Z" 
        fill="url(#vortexGlow)" 
        stroke="#ffffff" 
        strokeWidth="0.6" 
      />
      <circle cx="11.2" cy="12.8" r="0.8" fill="#ffffff" />
    </svg>
  );
}

/**
 * 4. Calorie Inferno: Plasma hyper-flame
 * Multi-tiered ionized hyper-flame with violet/crimson outer flares and solar-white inner core.
 */
export function PlasmaHyperFlameIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plasmaOuterGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
        <linearGradient id="plasmaCoreGrad" x1="12" y1="7" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      {/* Outer Hyper-Flame Silhouette */}
      <path 
        d="M12 2C12 2 15.5 6.5 14.5 10C16 8.5 17 6.5 17 6.5C17 6.5 20.5 11 19.5 15.5C18.5 20 14.5 22 12 22C9.5 22 5.5 20 4.5 15.5C3.5 11 7 6.5 7 6.5C7 6.5 8 8.5 9.5 10C8.5 6.5 12 2 12 2Z" 
        fill="url(#plasmaOuterGrad)" 
        stroke="#fda4af" 
        strokeWidth="0.7" 
      />
      {/* Mid Energetic Plasma Core */}
      <path 
        d="M12 7.5C12 7.5 14.2 10.5 13.5 13C14.5 12 15.2 10.8 15.2 10.8C15.2 10.8 17 13.8 16.2 16.8C15.5 19.8 12.8 21 12 21C11.2 21 8.5 19.8 7.8 16.8C7 13.8 8.8 10.8 8.8 10.8C8.8 10.8 9.5 12 10.5 13C9.8 10.5 12 7.5 12 7.5Z" 
        fill="url(#plasmaCoreGrad)" 
      />
      {/* White-Hot Nuclear Fusion Seed */}
      <path 
        d="M12 13C12.5 13 13.5 14.5 13.5 16C13.5 17.5 12.8 18.5 12 18.5C11.2 18.5 10.5 17.5 10.5 16C10.5 14.5 11.5 13 12 13Z" 
        fill="#ffffff" 
      />
      {/* Ion Sparks */}
      <circle cx="5" cy="8" r="0.7" fill="#fb7185" />
      <circle cx="19" cy="8" r="0.7" fill="#fb7185" />
      <circle cx="12" cy="1" r="0.8" fill="#fef08a" />
    </svg>
  );
}

/**
 * 5. Step Marathoner: Global stride insignia
 * Planet meridian coordinate globe with supersonic kinetic stride chevrons.
 */
export function GlobalStrideInsigniaIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="globeGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="strideGrad" x1="4" y1="12" x2="20" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Globe Sphere */}
      <circle cx="12" cy="12" r="9.5" fill="url(#globeGrad)" stroke="#475569" strokeWidth="0.9" />
      {/* Latitudes & Longitudes */}
      <ellipse cx="12" cy="12" rx="4.5" ry="9.5" stroke="#334155" strokeWidth="0.8" />
      <line x1="2.5" y1="12" x2="21.5" y2="12" stroke="#334155" strokeWidth="0.8" />
      <line x1="4.5" y1="7.2" x2="19.5" y2="7.2" stroke="#334155" strokeWidth="0.7" strokeDasharray="2 1" />
      <line x1="4.5" y1="16.8" x2="19.5" y2="16.8" stroke="#334155" strokeWidth="0.7" strokeDasharray="2 1" />
      {/* Supersonic Stride Chevrons */}
      <path d="M6 14.5L10.5 9.5L13.5 12.5L17.5 7.5" stroke="url(#strideGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 7.5H17.5V10.5" stroke="url(#strideGrad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Kinetic Stride Footprints Icon */}
      <circle cx="7" cy="17" r="1.2" fill="#fbbf24" />
      <circle cx="11" cy="15.5" r="1.2" fill="#f59e0b" />
      <circle cx="15" cy="17" r="1.2" fill="#d97706" />
    </svg>
  );
}

/**
 * 6. Iron Veteran: Gold-crusted tactical badge
 * Elite combat-hardened tactical shield badge with beveled gold crusting and triple chevrons.
 */
export function GoldCrustedTacticalIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="crustedGold" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
      </defs>
      {/* Tactical Badge Outer Shield */}
      <path 
        d="M12 2.5L20 5.8V12.2C20 17.5 16.5 21.2 12 22.5C7.5 21.2 4 17.5 4 12.2V5.8L12 2.5Z" 
        fill="#18181b" 
        stroke="url(#crustedGold)" 
        strokeWidth="1.8" 
        strokeLinejoin="round" 
      />
      {/* Gold-Crusted Inner Rim */}
      <path 
        d="M12 4.6L18.2 7.2V12C18.2 16.2 15.5 19.3 12 20.3C8.5 19.3 5.8 16.2 5.8 12V7.2L12 4.6Z" 
        stroke="url(#crustedGold)" 
        strokeWidth="0.8" 
        strokeDasharray="2 1.5"
      />
      {/* Tactical Veteran Triple Chevrons */}
      <path d="M8 8.8L12 11.5L16 8.8" stroke="url(#crustedGold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 12L12 14.7L16 12" stroke="url(#crustedGold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 15.2L12 17.9L16 15.2" stroke="url(#crustedGold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Central Star Crest */}
      <circle cx="12" cy="7.2" r="1" fill="#ffffff" />
    </svg>
  );
}

/**
 * 7. Rest-Timer Tactician: Chrono gear heart
 * Interlocking chronograph precision gear with heart pulse and timer markers.
 */
export function ChronoGearHeartIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chronoGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Outer Chrono Cog Teeth */}
      <circle cx="12" cy="12" r="8.8" stroke="#475569" strokeWidth="1.2" strokeDasharray="1.5 2.5" />
      {/* Mechanical Chrono Heart Contour */}
      <path 
        d="M12 20.5L4.8 13.5C2.8 11.5 2.8 8.2 4.8 6.2C6.8 4.2 10.1 4.2 12.1 6.2L12 6.3L11.9 6.2C13.9 4.2 17.2 4.2 19.2 6.2C21.2 8.2 21.2 11.5 19.2 13.5L12 20.5Z" 
        fill="#1e1b4b" 
        stroke="url(#chronoGrad)" 
        strokeWidth="1.5" 
        strokeLinejoin="round" 
      />
      {/* High-Precision ECG Pulse Vector */}
      <path 
        d="M5.5 12H8.2L9.6 8.5L11.5 15.5L13.2 10L14.4 13L15.6 12H18.5" 
        stroke="#ffffff" 
        strokeWidth="1.4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Chrono Second Hands Indicator */}
      <circle cx="12" cy="12" r="1.3" fill="#f59e0b" />
    </svg>
  );
}

/**
 * 8. Velocity Master: Mach-1 delta wing
 * Supersonic Mach-1 swept delta wing with trailing sonic shockwave cones and speed trails.
 */
export function MachDeltaWingIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="deltaGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      {/* Sonic Mach Shockwave Cone */}
      <path d="M12 1.5L2 19.5M12 1.5L22 19.5" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2 2" />
      {/* Mach-1 Delta Airframe */}
      <path 
        d="M12 3L21 17.5L14 15.5L12 21L10 15.5L3 17.5L12 3Z" 
        fill="url(#deltaGrad)" 
        stroke="#818cf8" 
        strokeWidth="1.2" 
        strokeLinejoin="round" 
      />
      {/* Fuselage Spine & Thrust Intake */}
      <line x1="12" y1="3" x2="12" y2="15.5" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />
      {/* Afterburner Thruster Plume */}
      <path d="M11 21L12 23.5L13 21H11Z" fill="#f59e0b" />
    </svg>
  );
}

/**
 * 9. Unbreakable 60: Diamond-edge diamond shield
 * Heavy faceted diamond-cut shield with reinforced titanium bevels and unbreakable adamantine geometry.
 */
export function DiamondShieldIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="diamondEdgeGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#67e8f9" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>
      </defs>
      {/* Faceted Outer Diamond Shield Geometry */}
      <path 
        d="M12 2L20.5 6.5L18.5 15.5L12 22L5.5 15.5L3.5 6.5L12 2Z" 
        fill="#0f172a" 
        stroke="url(#diamondEdgeGrad)" 
        strokeWidth="1.8" 
        strokeLinejoin="round" 
      />
      {/* Inner Diamond Facet Lines */}
      <path d="M12 2V22M3.5 6.5L12 11.5L20.5 6.5M5.5 15.5L12 11.5L18.5 15.5" stroke="url(#diamondEdgeGrad)" strokeWidth="1" strokeLinejoin="round" />
      {/* Center 60 Insignia Plate */}
      <circle cx="12" cy="11.5" r="3.4" fill="#0369a1" stroke="#38bdf8" strokeWidth="0.8" />
      <text x="12" y="13.2" textAnchor="middle" fill="#ffffff" fontSize="4.6" fontWeight="bold" fontFamily="monospace">60</text>
    </svg>
  );
}

/**
 * 10. THE LEGACY ANCHOR: Pulsing hyper-dense singularity core with rotating orbital rings
 * Deep event horizon singularity core with gyroscopic orbital rings and anchor quantum struts.
 */
export function SingularityAnchorIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="singularityGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <radialGradient id="eventHorizon" cx="12" cy="12" r="5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="65%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#c084fc" />
        </radialGradient>
      </defs>
      {/* Tilted Gyroscopic Orbital Ring 1 */}
      <ellipse cx="12" cy="12" rx="9.8" ry="4" transform="rotate(-30 12 12)" stroke="url(#singularityGrad)" strokeWidth="1.2" strokeDasharray="3 1.5" />
      {/* Tilted Gyroscopic Orbital Ring 2 */}
      <ellipse cx="12" cy="12" rx="9.8" ry="4" transform="rotate(45 12 12)" stroke="url(#singularityGrad)" strokeWidth="1.2" />
      {/* Anchor Quantum Base Hooks */}
      <path 
        d="M12 3V6M6 18C7.5 20.5 10 21.5 12 21.5C14 21.5 16.5 20.5 18 18M12 16.5V21.5" 
        stroke="#fbbf24" 
        strokeWidth="1.6" 
        strokeLinecap="round" 
      />
      <circle cx="12" cy="5" r="1.5" stroke="#fbbf24" strokeWidth="1.2" />
      {/* Hyper-Dense Singularity Core */}
      <circle cx="12" cy="12" r="4.2" fill="url(#eventHorizon)" stroke="#ffffff" strokeWidth="1" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  );
}

export const LEGENDARY_BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  CrownConsistency: CrownConsistencyIcon,
  MonolithBarbell: MonolithBarbellIcon,
  OceanVortexOrb: OceanVortexOrbIcon,
  PlasmaHyperFlame: PlasmaHyperFlameIcon,
  GlobalStrideInsignia: GlobalStrideInsigniaIcon,
  GoldCrustedTactical: GoldCrustedTacticalIcon,
  ChronoGearHeart: ChronoGearHeartIcon,
  MachDeltaWing: MachDeltaWingIcon,
  DiamondShield: DiamondShieldIcon,
  SingularityAnchor: SingularityAnchorIcon
};
