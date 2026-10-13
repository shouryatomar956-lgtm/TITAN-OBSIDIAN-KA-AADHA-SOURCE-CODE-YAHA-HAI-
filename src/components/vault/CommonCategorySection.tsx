import React, { memo } from 'react';
import { motion } from 'motion/react';
import { Palette, Award, Unlock, Lock } from 'lucide-react';
import { cn } from '../../lib/utils';
import { VaultCategory, VaultTheme, VaultBadge } from '../../types/vault';
import { TIER_CONFIG, ThemeCardItem, BadgeCardItem, DEFAULT_THEME_ID } from './VaultCardItems';

export interface CategorySectionProps {
  category: VaultCategory;
  themes: VaultTheme[];
  badges: VaultBadge[];
  activeThemeId: string;
  applyingThemeId: string | null;
  onApplyTheme: (theme: VaultTheme) => void;
  onInspectTheme?: (theme: VaultTheme, e?: React.MouseEvent) => void;
  onInspectBadge?: (badge: VaultBadge, e?: React.MouseEvent) => void;
  index?: number;
}

/**
 * Category 1: Common Foundations
 * Dedicated view container for Common tier themes & badges.
 */
export const CommonCategorySection = memo(function CommonCategorySection({
  category,
  themes,
  badges,
  activeThemeId,
  applyingThemeId,
  onApplyTheme,
  onInspectTheme,
  onInspectBadge,
  index = 0
}: CategorySectionProps) {
  const tierStyle = TIER_CONFIG.common;
  const TierIcon = tierStyle.icon;

  return (
    <motion.section
      key={category.id}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05 }}
      className={cn(
        "w-full bg-zinc-950/70 backdrop-blur-xl border rounded-[28px] p-6 sm:p-7 shadow-xl flex flex-col gap-6 relative overflow-hidden transition-all",
        "border-zinc-800/80",
        tierStyle.cardGlow
      )}
    >
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-xs border", tierStyle.badgeBg, tierStyle.badgeBorder, tierStyle.badgeText)}>
            <TierIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-white">{category.title}</h2>
              <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider", tierStyle.badgeBg, tierStyle.badgeBorder, tierStyle.badgeText)}>
                Tier {category.tierNumber}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-0.5">
              {category.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {themes.length > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1.5 rounded-xl">
              <Unlock className="w-3.5 h-3.5 text-emerald-400" />
              Active Tier • {themes.length} Themes
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
              <Lock className="w-3.5 h-3.5 text-zinc-500" />
              Locked Slot
            </span>
          )}
          <span className="inline-flex items-center text-xs font-semibold text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-xl">
            {themes.length} Themes • {badges.length} Badges
          </span>
        </div>
      </div>

      {/* SUB-SECTION 1: THEMES */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-950/70 border border-purple-800/60 flex items-center justify-center text-purple-400">
              <Palette className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-200">Themes Sub-Section</h3>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
              {themes.length} {themes.length === 1 ? 'Theme' : 'Themes'}
            </span>
          </div>
          <span className="text-xs text-zinc-400 font-medium hidden sm:inline-block">
            Category 1 Baseline & Milestone Unlockable Themes
          </span>
        </div>

        {themes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {themes.map((theme) => {
              const isThemeActive = activeThemeId === theme.id;
              const isThemeUnlocked = theme.isUnlocked || theme.id === DEFAULT_THEME_ID;
              return (
                <ThemeCardItem
                  key={theme.id}
                  theme={theme}
                  isThemeActive={isThemeActive}
                  isThemeUnlocked={isThemeUnlocked}
                  tierStyle={tierStyle}
                  applyingThemeId={applyingThemeId}
                  onApply={onApplyTheme}
                  onInspect={onInspectTheme}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full border-2 border-dashed border-zinc-800/80 rounded-[20px] p-6 flex flex-col items-center justify-center text-center bg-zinc-900/20">
            <div className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-2">
              <Palette className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-zinc-300">Themes Sub-Section (0 Themes)</h4>
            <p className="text-[11px] text-zinc-500 max-w-sm mt-0.5">
              Themes slot is established and strictly empty. Awaiting custom theme definitions.
            </p>
          </div>
        )}
      </div>

      {/* SUB-SECTION 2: BADGES */}
      <div className="flex flex-col gap-3.5 pt-4 border-t border-zinc-800/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-zinc-200">Badges Sub-Section</h3>
            <span className={cn(
              "text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border",
              badges.length > 0
                ? "bg-amber-950/50 border-amber-800/70 text-amber-300"
                : "bg-zinc-900 border-zinc-800 text-zinc-400"
            )}>
              {badges.length} {badges.length === 1 ? 'Badge' : 'Badges'}
            </span>
          </div>
          <span className="text-xs text-zinc-400/90 font-medium hidden sm:inline-block">
            Foundational Consistency & Habit Badges
          </span>
        </div>

        {badges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <BadgeCardItem
                key={badge.id}
                badge={badge}
                tierStyle={tierStyle}
                onInspect={onInspectBadge}
              />
            ))}
          </div>
        ) : (
          <div className="w-full border-2 border-dashed border-zinc-800/80 rounded-[20px] p-6 flex flex-col items-center justify-center text-center bg-zinc-900/20">
            <div className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-2">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-zinc-300">Badges Sub-Section (0 Badges)</h4>
            <p className="text-[11px] text-zinc-500 max-w-sm mt-0.5">
              Badges slot is established. Awaiting custom badge definitions.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
});
