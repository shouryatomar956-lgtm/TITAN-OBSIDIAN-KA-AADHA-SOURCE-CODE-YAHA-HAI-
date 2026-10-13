import React from 'react';

interface IconProps {
  className?: string;
}

/**
 * 1. Consistency Monster: Ultimate glowing mythical badge signifying absolute fitness dedication
 * Features multi-layered cosmic purple & golden radial aura, mythical diamond crest, celestial spikes and 100-day rune
 */
export function ConsistencyMonsterIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mythicConsGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#7e22ce" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b0764" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mythicSealGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#e879f9" />
          <stop offset="65%" stopColor="#9333ea" />
          <stop offset="100%" stopColor="#3b0764" />
        </linearGradient>
        <linearGradient id="mythicCoreGold" x1="12" y1="5" x2="12" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#fef08a" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
      </defs>
      {/* Outer Mythic Aura Ring */}
      <circle cx="12" cy="12" r="11" fill="url(#mythicConsGlow)" />
      {/* Outer 8-Pointed Celestial Star/Seal */}
      <polygon
        points="12,1.5 14.5,7 20.5,4.5 17.5,10.5 22.5,12 17.5,13.5 20.5,19.5 14.5,17 12,22.5 9.5,17 3.5,19.5 6.5,13.5 1.5,12 6.5,10.5 3.5,4.5 9.5,7"
        fill="url(#mythicSealGrad)"
        stroke="#fef08a"
        strokeWidth="0.6"
        strokeLinejoin="round"
      />
      {/* Inner Mythic Shield Medallion */}
      <circle cx="12" cy="12" r="7" fill="#180c2e" stroke="#e879f9" strokeWidth="0.9" />
      <circle cx="12" cy="12" r="5.6" stroke="#fbbf24" strokeWidth="0.6" strokeDasharray="2 1.5" />
      {/* Central Dedication Monolith Crest & 100 Emblem */}
      <path
        d="M12 6.5L14.8 9.8L13.8 14H10.2L9.2 9.8L12 6.5Z"
        fill="url(#mythicCoreGold)"
        stroke="#78350f"
        strokeWidth="0.5"
      />
      {/* Centered Monster Eye / Prism Sparkle */}
      <circle cx="12" cy="11.5" r="1.5" fill="#ffffff" />
      <circle cx="12" cy="11.5" r="0.75" fill="#a855f7" />
      <polygon points="12,7.5 12.8,11.5 12,13 11.2,11.5" fill="#ffffff" opacity="0.8" />
      {/* Bottom Roman Century Wings */}
      <path d="M8.5 16L12 17.5L15.5 16" stroke="#fde047" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 2. The Immortal 200: Mythic winged skull-less phoenix crest
 * Features majestic soaring phoenix rising with sweeping wings of crimson/solar gold, rebirth flames, and immortality halo
 */
export function TheImmortal200Icon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="phoenixAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#dc2626" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#450a0a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="phoenixWings" x1="2" y1="4" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f97316" />
          <stop offset="75%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="phoenixBody" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#fef08a" />
          <stop offset="80%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#b91c1c" />
        </linearGradient>
      </defs>
      {/* Radiant Rebirth Aura */}
      <circle cx="12" cy="12" r="10" fill="url(#phoenixAura)" />
      {/* Immortality Solar Halo Ring */}
      <circle cx="12" cy="7" r="4.5" stroke="#fde047" strokeWidth="0.75" strokeDasharray="3 1.5" />
      {/* Left Wing Spanning Outward & Upward */}
      <path
        d="M12 11C9 7 5 5 1.5 6.5C3.5 9 5.5 12 7.5 13.5C5.5 13 3.5 13.5 2 15C5 16 8 15 10.5 14"
        fill="url(#phoenixWings)"
        stroke="#7f1d1d"
        strokeWidth="0.5"
      />
      {/* Right Wing Spanning Outward & Upward */}
      <path
        d="M12 11C15 7 19 5 22.5 6.5C20.5 9 18.5 12 16.5 13.5C18.5 13 20.5 13.5 22 15C19 16 16 15 13.5 14"
        fill="url(#phoenixWings)"
        stroke="#7f1d1d"
        strokeWidth="0.5"
      />
      {/* Soaring Phoenix Head & Majestic Crest */}
      <path
        d="M12 2.5C12.5 4 13.5 4.5 14.5 4.5C13.5 5.5 12.5 6 12 7.5C11.5 6 10.5 5.5 9.5 4.5C10.5 4.5 11.5 4 12 2.5Z"
        fill="url(#phoenixBody)"
        stroke="#f59e0b"
        strokeWidth="0.4"
      />
      {/* Slender Phoenix Torso & Flame Feather Ribs */}
      <path
        d="M10.8 7.5H13.2L13.8 13.5L12 16.5L10.2 13.5L10.8 7.5Z"
        fill="url(#phoenixBody)"
        stroke="#991b1b"
        strokeWidth="0.6"
      />
      {/* Triple Eternal Tail Plumes */}
      <path
        d="M12 16.5L12 22.5M10.5 16L8.5 21M13.5 16L15.5 21"
        stroke="#fbbf24"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Center Spark of 200 Undefeated Days */}
      <circle cx="12" cy="10" r="1.1" fill="#ffffff" />
    </svg>
  );
}

/**
 * 3. Volume Sovereign: Obsidian crown floating above molten core
 * Features a dark jagged crystalline obsidian crown levitating above a bubbling magma furnace core
 */
export function VolumeSovereignIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moltenCoreGlow" cx="50%" cy="75%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#fed7aa" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="75%" stopColor="#dc2626" />
          <stop offset="100%" stopColor="#450a0a" />
        </radialGradient>
        <linearGradient id="obsidianCrownGrad" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="35%" stopColor="#334155" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="obsidianGlint" x1="7" y1="3" x2="17" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
      </defs>
      {/* Molten Magma Crucible Base (Bottom) */}
      <path
        d="M3 16.5C3 16.5 5 22 12 22C19 22 21 16.5 21 16.5C18.5 18.5 14.5 19 12 19C9.5 19 5.5 18.5 3 16.5Z"
        fill="url(#moltenCoreGlow)"
        stroke="#f97316"
        strokeWidth="0.8"
      />
      {/* Molten Lava Ripples & Heat Waves */}
      <path d="M6 18C8 19 10 17.5 12 18C14 18.5 16 17 18 18" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
      <circle cx="8" cy="16" r="0.8" fill="#ffedd5" />
      <circle cx="15.5" cy="15.5" r="0.7" fill="#fed7aa" />
      {/* Levitation Magnetic Rift Gap / Energy Field */}
      <path d="M7 14.5C9 13.8 15 13.8 17 14.5" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5" />
      {/* Floating Obsidian Jagged Sovereign Crown */}
      <path
        d="M4 12.5L5.5 4.5L9 8.5L12 2.5L15 8.5L18.5 4.5L20 12.5C17.5 11.5 14.5 11 12 11C9.5 11 6.5 11.5 4 12.5Z"
        fill="url(#obsidianCrownGrad)"
        stroke="#475569"
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      {/* Sharp Crown Facet Prisms */}
      <path d="M12 2.5V11M9 8.5L10.5 11.5M15 8.5L13.5 11.5" stroke="url(#obsidianGlint)" strokeWidth="0.7" />
      {/* Violet Obsidian Crown Core Jewel */}
      <polygon points="12,6 13.2,8.2 12,10 10.8,8.2" fill="#c084fc" stroke="#fdf4ff" strokeWidth="0.4" />
      {/* 1M Sovereign Ingot Rune */}
      <path d="M10 12.8H14" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. Apex Physiology Synthesis: Multi-dimensional glowing cosmic nexus insignia
 * Features hyper-dimensional celestial gyroscope rings, converging elemental beams, and platinum core singularity
 */
export function ApexPhysiologySynthesisIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="nexusCosmicCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="85%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <linearGradient id="nexusRingA" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="nexusRingB" x1="22" y1="2" x2="2" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      {/* Deep Interstellar Nexus Background Glow */}
      <circle cx="12" cy="12" r="10.5" fill="url(#nexusCosmicCore)" opacity="0.35" />
      {/* Outer Synthesis Compass Nodes */}
      <circle cx="12" cy="1.8" r="1.2" fill="#38bdf8" />
      <circle cx="22.2" cy="12" r="1.2" fill="#fbbf24" />
      <circle cx="12" cy="22.2" r="1.2" fill="#34d399" />
      <circle cx="1.8" cy="12" r="1.2" fill="#f43f5e" />
      {/* Orbit 1: Elliptical Tilted Gyro Ring A */}
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="4.2"
        transform="rotate(-30 12 12)"
        stroke="url(#nexusRingA)"
        strokeWidth="1"
        fill="none"
      />
      {/* Orbit 2: Elliptical Tilted Gyro Ring B */}
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="4.2"
        transform="rotate(45 12 12)"
        stroke="url(#nexusRingB)"
        strokeWidth="1"
        fill="none"
      />
      {/* Converging 4-Quadrant Cardinal Laser Beams */}
      <line x1="12" y1="3" x2="12" y2="8" stroke="#38bdf8" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="21" y1="12" x2="16" y2="12" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="16" stroke="#34d399" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="3" y1="12" x2="8" y2="12" stroke="#f43f5e" strokeWidth="1.2" strokeLinecap="round" />
      {/* Center Cosmic Singularity Core */}
      <circle cx="12" cy="12" r="3.6" fill="#0f172a" stroke="#ffffff" strokeWidth="1.1" />
      <circle cx="12" cy="12" r="2.2" fill="url(#nexusCosmicCore)" />
      {/* Central Pure White Starlight Core */}
      <polygon
        points="12,8.5 13,11 15.5,12 13,13 12,15.5 11,13 8.5,12 11,11"
        fill="#ffffff"
      />
    </svg>
  );
}

export const MYTHIC_BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ConsistencyMonster: ConsistencyMonsterIcon,
  UltimateMythicAura: ConsistencyMonsterIcon,
  GlowingMythicalBadge: ConsistencyMonsterIcon,
  'consistency-monster': ConsistencyMonsterIcon,

  TheImmortal200: TheImmortal200Icon,
  ImmortalPhoenix: TheImmortal200Icon,
  PhoenixCrest: TheImmortal200Icon,
  'the-immortal-200': TheImmortal200Icon,

  VolumeSovereign: VolumeSovereignIcon,
  ObsidianCrown: VolumeSovereignIcon,
  MoltenCoreCrown: VolumeSovereignIcon,
  'volume-sovereign': VolumeSovereignIcon,

  ApexPhysiologySynthesis: ApexPhysiologySynthesisIcon,
  CosmicNexus: ApexPhysiologySynthesisIcon,
  ApexNexus: ApexPhysiologySynthesisIcon,
  'apex-physiology-synthesis': ApexPhysiologySynthesisIcon
};
