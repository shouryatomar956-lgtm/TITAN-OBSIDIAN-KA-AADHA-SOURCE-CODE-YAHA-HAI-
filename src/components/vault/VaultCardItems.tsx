import React, { memo } from 'react';
import { motion } from 'motion/react';
import {
  Palette,
  Award,
  Sparkles,
  Lock,
  Unlock,
  Check,
  Zap,
  Flame,
  Crown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { VaultBadge, VaultTheme, VaultTier } from '../../types/vault';
import { COMMON_BADGE_ICONS } from './CommonBadgeIcons';
import { LEGENDARY_BADGE_ICONS } from './LegendaryBadgeIcons';
import { RARE_BADGE_ICONS } from './RareBadgeIcons';
import { MYTHIC_BADGE_ICONS } from './MythicBadgeIcons';

export const DEFAULT_THEME_ID = 'obsidian-violet';

export const TIER_CONFIG: Record<VaultTier, {
  label: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  cardGlow: string;
  icon: React.ComponentType<{ className?: string }>;
}> = {
  common: {
    label: 'Category 1 (Common)',
    badgeBg: 'bg-zinc-800/80',
    badgeBorder: 'border-zinc-700',
    badgeText: 'text-zinc-300',
    cardGlow: 'hover:border-zinc-600/80',
    icon: Zap
  },
  rare: {
    label: 'Category 2 (Rare)',
    badgeBg: 'bg-cyan-950/70',
    badgeBorder: 'border-cyan-700/60',
    badgeText: 'text-cyan-300',
    cardGlow: 'hover:border-cyan-500/60 hover:shadow-cyan-900/20',
    icon: Flame
  },
  legendary: {
    label: 'Category 3 (Legendary)',
    badgeBg: 'bg-amber-950/70',
    badgeBorder: 'border-amber-700/60',
    badgeText: 'text-amber-300',
    cardGlow: 'hover:border-amber-500/60 hover:shadow-amber-900/20',
    icon: Award
  },
  mythic: {
    label: 'Category 4 (Mythic)',
    badgeBg: 'bg-purple-950/70',
    badgeBorder: 'border-purple-700/60',
    badgeText: 'text-purple-300',
    cardGlow: 'hover:border-purple-500/60 hover:shadow-purple-900/30',
    icon: Crown
  }
};

export const BADGE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  ...COMMON_BADGE_ICONS,
  ...LEGENDARY_BADGE_ICONS,
  ...RARE_BADGE_ICONS,
  ...MYTHIC_BADGE_ICONS
};

export const ThemeCardItem = memo(function ThemeCardItem({
  theme,
  isThemeActive,
  isThemeUnlocked,
  tierStyle,
  applyingThemeId,
  onApply,
  onInspect
}: {
  theme: VaultTheme;
  isThemeActive: boolean;
  isThemeUnlocked: boolean;
  tierStyle: any;
  applyingThemeId: string | null;
  onApply: (theme: VaultTheme) => void;
  onInspect?: (theme: VaultTheme, e?: React.MouseEvent) => void;
}) {
  return (
    <motion.div
      key={theme.id}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 24,
        mass: 0.9
      }}
      className={cn(
        "relative rounded-[24px] p-5 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl border shadow-xl overflow-hidden hardware-accelerated",
        "bg-zinc-950/70 border-zinc-800/80",
        tierStyle?.cardGlow,
        isThemeActive && "ring-2 ring-purple-500/80 shadow-purple-900/30",
        isThemeUnlocked && "hover:border-zinc-700/80 cursor-pointer"
      )}
      style={{
        boxShadow: isThemeActive ? `0 0 25px ${theme.cssVars.borderGlow}` : undefined,
        transform: 'translateZ(0)'
      }}
      onClick={(e) => {
        if (isThemeUnlocked && onInspect) onInspect(theme, e);
      }}
    >
      {/* 144fps Sheen Sweep for Unlocked Themes */}
      {isThemeUnlocked && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[24px]">
          <div 
            className="absolute -top-1/2 -bottom-1/2 -left-1/2 -right-1/2 w-[200%] h-[200%] animate-sheen-sweep pointer-events-none opacity-30"
            style={{
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)'
            }}
          />
        </div>
      )}

      {/* Visual Swatch Strip */}
      <div 
        className="relative w-full h-2.5 rounded-full mb-3.5 opacity-95 overflow-hidden shadow-xs"
        style={{ background: theme.cssVars.accentGradient || theme.cssVars.primaryAccent }}
      >
        {isThemeUnlocked && (
          <div 
            className="absolute inset-0 animate-sheen-sweep pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%)'
            }}
          />
        )}
      </div>

      <div className="flex flex-col gap-3">
        {/* Header with Title and Tier Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-zinc-500 text-xs font-mono font-bold">#{theme.number.toString().padStart(2, '0')}</span>
              {theme.isDefault && (
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-900/80 text-purple-200 border border-purple-600/60">
                  Developer Default
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {theme.name}
            </h3>
            <p className="text-xs text-zinc-400 font-medium mt-1 leading-relaxed">
              {theme.tagline}
            </p>
          </div>

          <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-lg border uppercase tracking-wider shrink-0", tierStyle?.badgeBg, tierStyle?.badgeBorder, tierStyle?.badgeText)}>
            {theme.tier}
          </span>
        </div>

        {/* Criteria / Status Info */}
        <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/60 p-2.5 flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2 text-zinc-400 min-w-0">
            {isThemeUnlocked ? (
              <Unlock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            )}
            <span className="truncate text-[11px] font-medium">{theme.criteriaText}</span>
          </div>

          <span className={cn(
            "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0",
            isThemeUnlocked ? "text-emerald-400 bg-emerald-950/60" : "text-zinc-500 bg-zinc-900"
          )}>
            {isThemeUnlocked ? 'Unlocked' : 'Locked'}
          </span>
        </div>
      </div>

      {/* Theme Action Button & Swatches */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <div 
            className="w-4 h-4 rounded-full border border-white/20 shadow-xs shrink-0"
            style={{ backgroundColor: theme.cssVars.primaryAccent }}
            title="Theme Accent"
          />
          {isThemeUnlocked && onInspect && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInspect(theme, e);
              }}
              title="Celebrate & Inspect Theme FX"
              className="p-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 text-amber-400 hover:text-amber-300 transition-all active:scale-95 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            </button>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onApply(theme);
          }}
          disabled={isThemeActive || applyingThemeId === theme.id}
          className={cn(
            "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shrink-0 cursor-pointer",
            isThemeActive
              ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700/60 cursor-default"
              : "text-white active:scale-95"
          )}
          style={
            !isThemeActive
              ? {
                  background: 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%))',
                  boxShadow: '0 4px 14px var(--border-glow, rgba(139, 92, 246, 0.35))'
                }
              : undefined
          }
        >
          {isThemeActive ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Active</span>
            </>
          ) : applyingThemeId === theme.id ? (
            <>
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Applying...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apply Theme</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
});

export const BadgeCardItem = memo(function BadgeCardItem({
  badge,
  tierStyle,
  onInspect
}: {
  badge: VaultBadge;
  tierStyle: any;
  onInspect?: (badge: VaultBadge, e?: React.MouseEvent) => void;
}) {
  const IconComponent = (badge.iconName && BADGE_ICON_MAP[badge.iconName]) || Award;

  return (
    <motion.div
      key={badge.id}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 24,
        mass: 0.9
      }}
      className={cn(
        "relative rounded-[22px] p-5 flex flex-col justify-between transition-all duration-300 backdrop-blur-xl border shadow-lg overflow-hidden hardware-accelerated",
        "bg-zinc-950/70 border-zinc-800/80",
        tierStyle?.cardGlow,
        badge.isUnlocked && "ring-1 ring-amber-500/40 border-amber-500/30 hover:border-amber-400/50 cursor-pointer"
      )}
      style={{ transform: 'translateZ(0)' }}
      onClick={(e) => {
        if (badge.isUnlocked && onInspect) onInspect(badge, e);
      }}
    >
      {/* 144fps Sheen Sweep for Unlocked Badges */}
      {badge.isUnlocked && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[22px]">
          <div 
            className="absolute -top-1/2 -bottom-1/2 -left-1/2 -right-1/2 w-[200%] h-[200%] animate-sheen-sweep pointer-events-none opacity-40"
            style={{
              background: 'linear-gradient(105deg, transparent 35%, rgba(251,191,36,0.25) 50%, transparent 65%)'
            }}
          />
        </div>
      )}

      <div>
        {/* Badge Icon & Tier */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className={cn(
            "w-11 h-11 rounded-2xl flex items-center justify-center shadow-md border relative",
            badge.isUnlocked
              ? "bg-amber-950/80 text-amber-300 border-amber-600/60 shadow-amber-900/20"
              : "bg-zinc-900/90 text-zinc-500 border-zinc-800"
          )}>
            <IconComponent className={cn("w-5 h-5", badge.isUnlocked ? "text-amber-400" : "text-zinc-500")} />
            {!badge.isUnlocked && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center text-zinc-400">
                <Lock className="w-2.5 h-2.5" />
              </div>
            )}
            {badge.isUnlocked && (
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 border border-amber-900 flex items-center justify-center animate-ping opacity-60" />
            )}
          </div>

          <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider", tierStyle?.badgeBg, tierStyle?.badgeBorder, tierStyle?.badgeText)}>
            {badge.tier}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
          <span className="text-zinc-500 text-xs font-mono">#{badge.number.toString().padStart(2, '0')}</span>
          <span className="truncate">{badge.title}</span>
        </h3>
        <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
          {badge.description}
        </p>
      </div>

      {/* Progress bar and Unlock status */}
      <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-zinc-400">
          <span className="truncate">{badge.criteriaText}</span>
          <span className="font-bold font-mono text-zinc-300 shrink-0">
            {badge.isUnlocked ? '100%' : `${badge.progress}%`}
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden">
          <div 
            className={cn(
              "h-full rounded-full transition-all duration-500",
              badge.isUnlocked ? "bg-amber-400" : "bg-purple-600/80"
            )}
            style={{ width: `${badge.isUnlocked ? 100 : Math.max(badge.progress, 5)}%` }}
          />
        </div>

        {badge.isUnlocked && onInspect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onInspect(badge, e);
            }}
            className="mt-1 w-full py-1 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Celebrate 144fps FX</span>
          </button>
        )}
      </div>
    </motion.div>
  );
});
