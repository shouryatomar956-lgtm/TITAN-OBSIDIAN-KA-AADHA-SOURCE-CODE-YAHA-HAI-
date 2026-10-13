import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import localforage from 'localforage';
import { 
  Trophy, 
  Sparkles, 
  Check, 
  X, 
  ArrowRight, 
  Palette, 
  Zap, 
  Crown, 
  ShieldCheck, 
  Dumbbell, 
  Flame, 
  FlameKindling,
  Volume2,
  VolumeX,
  Eye
} from 'lucide-react';
import { VaultBadge, VaultTheme, VaultTier } from '../types/vault';
import { vaultService } from '../services/vaultService';
import { playUnlockSound } from '../utils/vaultAudioEngine';
import { triggerConfettiExplosion } from '../utils/confettiExplosion';
import { triggerHapticFeedback } from '../utils/haptics';
import { getRxDBProxy } from '../utils/rxdbManager';
import { COMMON_BADGE_ICONS } from './vault/CommonBadgeIcons';
import { RARE_BADGE_ICONS } from './vault/RareBadgeIcons';
import { LEGENDARY_BADGE_ICONS } from './vault/LegendaryBadgeIcons';
import { MYTHIC_BADGE_ICONS } from './vault/MythicBadgeIcons';

export interface OverlayItem {
  id: string;
  type: 'badge' | 'theme';
  tier: VaultTier;
  title: string;
  description: string;
  criteriaText?: string;
  iconName?: string;
  badgeData?: VaultBadge;
  themeData?: VaultTheme;
  timestamp: number;
}

const ALL_BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Trophy,
  Crown,
  Dumbbell,
  Flame,
  FlameKindling,
  ShieldCheck,
  ...COMMON_BADGE_ICONS,
  ...RARE_BADGE_ICONS,
  ...LEGENDARY_BADGE_ICONS,
  ...MYTHIC_BADGE_ICONS
};

const STORAGE_KEY_NOTIFIED = 'pulsefit_overlay_notified_keys';
const AUTO_DISMISS_DURATION_MS = 7500;

export const BadgeUnlockOverlay = memo(function BadgeUnlockOverlay({
  onNavigateVault
}: {
  onNavigateVault?: () => void;
}) {
  const [queue, setQueue] = useState<OverlayItem[]>([]);
  const [currentItem, setCurrentItem] = useState<OverlayItem | null>(null);
  const [isApplyingTheme, setIsApplyingTheme] = useState(false);
  const [isThemeApplied, setIsThemeApplied] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(100);

  const timerRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);
  const activeItemIdRef = useRef<string | null>(null);
  const notifiedIdsRef = useRef<Set<string>>(new Set());

  // Load previously notified IDs from localforage on boot
  useEffect(() => {
    localforage.getItem<string[]>(STORAGE_KEY_NOTIFIED).then((stored) => {
      if (Array.isArray(stored)) {
        stored.forEach(id => notifiedIdsRef.current.add(id));
      }
    }).catch(() => {});
  }, []);

  /**
   * Enqueue a newly unlocked Rare or Mythic reward.
   * Offloads data preparation to Web Worker Pool via Comlink.
   */
  const enqueueReward = useCallback(async (
    rewardType: 'badge' | 'theme',
    rewardObjOrId: any
  ) => {
    try {
      const rewardId = typeof rewardObjOrId === 'string' 
        ? rewardObjOrId 
        : (rewardObjOrId.id || rewardObjOrId.name);
      
      const tier = rewardObjOrId?.tier || 'rare';

      // Strict filter: ONLY Rare and Mythic tiers
      if (tier !== 'rare' && tier !== 'mythic') {
        return;
      }

      const dedupeKey = `${rewardType}_${rewardId}`;
      if (notifiedIdsRef.current.has(dedupeKey)) {
        return;
      }

      // Mark as notified in memory and localforage
      notifiedIdsRef.current.add(dedupeKey);
      localforage.setItem(
        STORAGE_KEY_NOTIFIED, 
        Array.from(notifiedIdsRef.current)
      ).catch(() => {});

      // Leverage Web Worker Pool via Comlink for zero-jank resolution
      const workerData = await vaultService.prepareUnlockOverlayData(rewardType, rewardId);

      const resolvedItem: OverlayItem = {
        id: rewardId,
        type: rewardType,
        tier: (workerData?.tier || tier) as VaultTier,
        title: workerData?.title || rewardObjOrId?.title || rewardObjOrId?.name || 'Workout Achievement',
        description: workerData?.description || rewardObjOrId?.description || rewardObjOrId?.tagline || 'Milestone verified.',
        criteriaText: workerData?.criteriaText || rewardObjOrId?.criteriaText,
        iconName: workerData?.iconName || rewardObjOrId?.iconName,
        badgeData: workerData?.badgeData || (rewardType === 'badge' ? rewardObjOrId : undefined),
        themeData: workerData?.themeData || (rewardType === 'theme' ? rewardObjOrId : undefined),
        timestamp: Date.now()
      };

      setQueue(prev => [...prev, resolvedItem]);

      // Sync snapshot check to RxDB proxy
      getRxDBProxy().then(async (rxdb) => {
        if (rxdb && typeof rxdb.getState === 'function') {
          await rxdb.getState();
        }
      }).catch(() => {});
    } catch (err) {
      console.warn('[BadgeUnlockOverlay] Enqueue notice:', err);
    }
  }, []);

  // Event listeners for workout rewards and vault unlock events
  useEffect(() => {
    const handleVaultUnlockEvent = (e: any) => {
      const detail = e.detail;
      if (!detail) return;

      // Badges
      if (Array.isArray(detail.badges)) {
        detail.badges.forEach((b: any) => {
          if (b.tier === 'rare' || b.tier === 'mythic') {
            enqueueReward('badge', b);
          }
        });
      }

      // Themes
      if (Array.isArray(detail.themes)) {
        detail.themes.forEach((t: any) => {
          if (t.tier === 'rare' || t.tier === 'mythic') {
            enqueueReward('theme', t);
          }
        });
      }
    };

    const handleAchievementRegistered = (e: any) => {
      const badge = e.detail?.badge;
      if (badge && (badge.tier === 'rare' || badge.tier === 'mythic')) {
        enqueueReward('badge', badge);
      }
    };

    const handleWorkoutSessionReward = (e: any) => {
      const { type, reward } = e.detail || {};
      if (type && reward) {
        enqueueReward(type, reward);
      }
    };

    const handleExplicitTrigger = (e: any) => {
      const { type = 'badge', id, tier = 'mythic', data } = e.detail || {};
      if (data) {
        enqueueReward(type, data);
      } else if (id) {
        enqueueReward(type, { id, tier });
      }
    };

    window.addEventListener('pulsefit_vault_reward_unlocked', handleVaultUnlockEvent);
    window.addEventListener('pulsefit_achievement_registered', handleAchievementRegistered);
    window.addEventListener('pulsefit_workout_session_reward', handleWorkoutSessionReward);
    window.addEventListener('pulsefit_trigger_unlock_overlay', handleExplicitTrigger);

    // Global developer helper for instant manual testing from console
    (window as any).pulsefitTestUnlockOverlay = (tier: 'rare' | 'mythic' = 'mythic', type: 'badge' | 'theme' = 'badge') => {
      if (type === 'badge') {
        const testId = tier === 'mythic' ? 'consistency-monster' : 'beast-mode';
        window.dispatchEvent(new CustomEvent('pulsefit_trigger_unlock_overlay', {
          detail: { type: 'badge', id: testId, tier }
        }));
      } else {
        const testId = tier === 'mythic' ? 'celestial-aurora' : 'electric-cobalt';
        window.dispatchEvent(new CustomEvent('pulsefit_trigger_unlock_overlay', {
          detail: { type: 'theme', id: testId, tier }
        }));
      }
    };

    return () => {
      window.removeEventListener('pulsefit_vault_reward_unlocked', handleVaultUnlockEvent);
      window.removeEventListener('pulsefit_achievement_registered', handleAchievementRegistered);
      window.removeEventListener('pulsefit_workout_session_reward', handleWorkoutSessionReward);
      window.removeEventListener('pulsefit_trigger_unlock_overlay', handleExplicitTrigger);
    };
  }, [enqueueReward]);

  // Advance queue when current item finishes or queue populates
  useEffect(() => {
    if (!currentItem && queue.length > 0) {
      const nextItem = queue[0];
      setQueue(prev => prev.slice(1));
      setCurrentItem(nextItem);
      activeItemIdRef.current = nextItem.id;
      setIsThemeApplied(false);
      setProgressPercent(100);

      // Web Audio sound cue
      if (!isMuted) {
        playUnlockSound({ type: nextItem.type, tier: nextItem.tier });
      }

      // Haptic burst
      triggerHapticFeedback('heavy');

      // GPU-accelerated Confetti explosion
      triggerConfettiExplosion({
        originX: 0.5,
        originY: 0.15,
        tier: nextItem.tier,
        particleCount: nextItem.tier === 'mythic' ? 220 : 120,
        staggerBursts: true,
        spread: 160,
        startVelocity: 35
      });
    }
  }, [currentItem, queue, isMuted]);

  // Auto-dismiss countdown timer with pause-on-hover
  useEffect(() => {
    if (!currentItem) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);

    if (isPaused) return;

    const startTime = Date.now();
    const intervalTime = 50;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remainingRatio = Math.max(0, 1 - (elapsed / AUTO_DISMISS_DURATION_MS));
      setProgressPercent(remainingRatio * 100);
      if (remainingRatio <= 0) {
        clearInterval(progressIntervalRef.current);
      }
    }, intervalTime);

    timerRef.current = setTimeout(() => {
      handleDismiss();
    }, AUTO_DISMISS_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentItem, isPaused]);

  const handleDismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    setCurrentItem(null);
    activeItemIdRef.current = null;
    setIsApplyingTheme(false);
    setIsThemeApplied(false);
  }, []);

  /**
   * Directly activates the newly unlocked theme into DOM root CSS variables
   */
  const handleApplyTheme = useCallback(async (themeId: string) => {
    try {
      setIsApplyingTheme(true);
      triggerHapticFeedback('medium');
      const res = await vaultService.setActiveTheme(themeId);
      if (res.success) {
        setIsThemeApplied(true);
        triggerHapticFeedback('heavy');
        // Visual cue
        if (!isMuted) {
          playUnlockSound({ type: 'theme', tier: currentItem?.tier || 'rare' });
        }
      }
    } catch (e) {
      console.warn('[BadgeUnlockOverlay] Theme apply warning:', e);
    } finally {
      setIsApplyingTheme(false);
    }
  }, [currentItem, isMuted]);

  const handleOpenVault = useCallback(() => {
    handleDismiss();
    if (onNavigateVault) {
      onNavigateVault();
    } else {
      // Dispatch global tab switch
      window.dispatchEvent(new CustomEvent('pulsefit_navigate_tab', { detail: 'vault' }));
    }
  }, [handleDismiss, onNavigateVault]);

  if (!currentItem) {
    return null;
  }

  const isMythic = currentItem.tier === 'mythic';
  const isTheme = currentItem.type === 'theme';

  // Resolve Icon Component
  let IconComp: React.ComponentType<{ className?: string }> = Trophy;
  if (currentItem.iconName && ALL_BADGE_ICONS[currentItem.iconName]) {
    IconComp = ALL_BADGE_ICONS[currentItem.iconName];
  } else if (isTheme) {
    IconComp = Palette;
  } else if (isMythic) {
    IconComp = Crown;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentItem.id + '_' + currentItem.timestamp}
        initial={{ opacity: 0, y: -45, scale: 0.90, rotateX: 10 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotateX: 0,
          transition: {
            type: 'spring',
            damping: 22,
            stiffness: 300,
            mass: 0.8
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -30, 
          scale: 0.94,
          transition: { duration: 0.22, ease: 'easeOut' }
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          perspective: 1000,
          contain: 'layout paint'
        }}
        className="fixed top-3 sm:top-5 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-[9999] pointer-events-auto will-change-transform"
      >
        <div 
          className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
            isMythic
              ? 'border-purple-500/60 bg-gradient-to-br from-zinc-950/95 via-purple-950/90 to-zinc-950/95 shadow-[0_12px_40px_rgba(192,132,252,0.35)]'
              : 'border-cyan-500/50 bg-gradient-to-br from-zinc-950/95 via-slate-950/90 to-zinc-950/95 shadow-[0_12px_40px_rgba(6,182,212,0.30)]'
          }`}
        >
          {/* Animated Ambient GPU Aura Glow */}
          <div 
            className="absolute -inset-1 opacity-50 blur-xl pointer-events-none -z-10 animate-pulse"
            style={{
              background: isMythic 
                ? 'radial-gradient(circle at 50% 20%, rgba(192, 132, 252, 0.4), rgba(244, 63, 94, 0.2), transparent 70%)'
                : 'radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.35), rgba(56, 189, 248, 0.2), transparent 70%)'
            }}
          />

          {/* Top Status & Tier Banner */}
          <div className="flex items-center justify-between px-4 pt-3.5 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span 
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm ${
                  isMythic
                    ? 'bg-gradient-to-r from-purple-500 to-amber-500 text-white shadow-purple-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-500/30'
                }`}
              >
                {isMythic ? <Crown className="w-3 h-3 animate-bounce" /> : <Zap className="w-3 h-3" />}
                {isMythic ? 'MYTHIC' : 'RARE'} {isTheme ? 'THEME UNLOCKED' : 'BADGE EARNED'}
              </span>

              <span className="text-[10px] font-mono font-bold tracking-tight text-white/50 flex items-center gap-1">
                <Dumbbell className="w-2.5 h-2.5 text-white/40" />
                Live Session
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/10 transition-colors"
                title={isMuted ? 'Unmute Audio Cue' : 'Mute Audio Cue'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-4 flex items-start gap-3.5">
            {/* High-Fidelity Vector Icon Container with GPU Rotation Aura */}
            <div className="relative shrink-0 mt-0.5">
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center p-2.5 border shadow-inner relative z-10 transition-transform ${
                  isMythic
                    ? 'bg-purple-950/80 border-purple-400/50 shadow-purple-500/20'
                    : 'bg-cyan-950/80 border-cyan-400/50 shadow-cyan-500/20'
                }`}
              >
                <IconComp className={`w-9 h-9 ${isMythic ? 'text-purple-300' : 'text-cyan-300'}`} />
              </div>

              {/* Orbital Pedestal Ring */}
              <div 
                className={`absolute -inset-1 rounded-2xl opacity-60 blur-[2px] animate-spin -z-0 ${
                  isMythic 
                    ? 'bg-gradient-to-tr from-purple-500 via-amber-400 to-rose-500' 
                    : 'bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500'
                }`}
                style={{ animationDuration: '8s' }}
              />
            </div>

            {/* Details Column */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <h3 className="text-sm sm:text-base font-black text-white tracking-tight leading-tight truncate">
                  {currentItem.title}
                </h3>
                {isMythic && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
                )}
              </div>

              <p className="text-xs text-white/70 line-clamp-2 font-normal leading-relaxed mb-1.5">
                {currentItem.description}
              </p>

              {currentItem.criteriaText && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/80 max-w-full truncate">
                  <ShieldCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{currentItem.criteriaText}</span>
                </div>
              )}
            </div>
          </div>

          {/* Theme Palette Swatch Strip (Only if Theme) */}
          {isTheme && currentItem.themeData && (
            <div className="px-4 pb-2.5 flex items-center gap-2">
              <div className="text-[10px] uppercase font-mono font-bold text-white/50">Palette:</div>
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10">
                <div 
                  className="w-4 h-4 rounded-md shadow-sm border border-white/20"
                  style={{ backgroundColor: currentItem.themeData.cssVars.primaryAccent }}
                  title="Primary Accent"
                />
                <div 
                  className="w-4 h-4 rounded-md shadow-sm border border-white/20"
                  style={{ backgroundColor: currentItem.themeData.cssVars.borderGlow }}
                  title="Border Glow"
                />
                <div 
                  className="w-4 h-4 rounded-md shadow-sm border border-white/20"
                  style={{ backgroundColor: currentItem.themeData.cssVars.bgCard }}
                  title="Card Background"
                />
              </div>
              <span className="text-[11px] font-semibold text-white/80 truncate">
                {currentItem.themeData.name}
              </span>
            </div>
          )}

          {/* Action Footer Buttons */}
          <div className="px-4 pb-3.5 pt-1 flex items-center justify-between gap-2">
            {/* Primary Action Button */}
            {isTheme ? (
              <button
                onClick={() => handleApplyTheme(currentItem.id)}
                disabled={isApplyingTheme || isThemeApplied}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isThemeApplied
                    ? 'bg-emerald-500 text-white shadow-emerald-500/25 cursor-default'
                    : isMythic
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 hover:opacity-90 text-white shadow-purple-500/30'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-white shadow-cyan-500/30'
                }`}
              >
                {isThemeApplied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    Theme Active ✓
                  </>
                ) : (
                  <>
                    <Palette className="w-3.5 h-3.5" />
                    {isApplyingTheme ? 'Applying...' : 'Apply Theme Now'}
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleOpenVault}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  isMythic
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-purple-500 text-white shadow-purple-600/30'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:bg-cyan-500 text-white shadow-cyan-600/30'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                View in Vault
              </button>
            )}

            {/* Secondary Action / Dismiss */}
            {isTheme && (
              <button
                onClick={handleOpenVault}
                className="px-3 py-2 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 transition-colors flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                Vault
              </button>
            )}

            <button
              onClick={handleDismiss}
              className="px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              Dismiss
            </button>
          </div>

          {/* GPU Accelerated Auto-Dismiss Progress Bar */}
          <div className="w-full h-1 bg-white/10 relative overflow-hidden">
            <div 
              className={`h-full transition-transform duration-75 origin-left will-change-transform ${
                isMythic 
                  ? 'bg-gradient-to-r from-purple-500 via-amber-400 to-pink-500' 
                  : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500'
              }`}
              style={{
                transform: `scaleX(${progressPercent / 100})`,
                transformOrigin: 'left'
              }}
            />
          </div>
        </div>

        {/* Queue Indicator badge if more rewards are queued up */}
        {queue.length > 0 && (
          <div className="mt-1.5 flex justify-end">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-black/70 border border-white/20 text-white/70 backdrop-blur-md">
              +{queue.length} more in queue
            </span>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

export default BadgeUnlockOverlay;
