import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Vault, 
  Lock, 
  Unlock, 
  Check, 
  Palette, 
  Award, 
  Sparkles, 
  RefreshCw, 
  Flame, 
  Droplets, 
  Footprints, 
  Dumbbell, 
  Activity, 
  Shield, 
  Crown, 
  Zap, 
  Clock, 
  Layers,
  ChevronRight,
  Filter,
  Trophy,
  Sun,
  Moon,
  Sprout,
  GlassWater,
  ClipboardCheck,
  Gauge
} from 'lucide-react';
import { cn } from '../lib/utils';
import { 
  VaultState, 
  VaultTheme, 
  VaultBadge, 
  VaultTier, 
  INITIAL_VAULT_STATE,
  MASTER_VAULT_THEMES,
  MASTER_VAULT_BADGES 
} from '../types/vault';
import { 
  vaultService, 
  KEY_VAULT_STATE, 
  KEY_ACTIVE_THEME, 
  DEFAULT_THEME_ID 
} from '../services/vaultService';
import { 
  VaultUnlockCelebrationModal, 
  CelebrationReward 
} from './VaultUnlockCelebrationModal';
import { triggerConfettiExplosion } from '../utils/confettiExplosion';
import { playUnlockSound } from '../utils/vaultAudioEngine';
import {
  TIER_CONFIG,
  ThemeCardItem,
  BadgeCardItem,
  CommonCategorySection,
  RareCategorySection,
  LegendaryCategorySection,
  MythicCategorySection
} from './vault';

export const VaultView = memo(function VaultView() {
  const [vaultState, setVaultState] = useState<VaultState>(INITIAL_VAULT_STATE);
  const [activeThemeId, setActiveThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [activeSubTab, setActiveSubTab] = useState<'themes' | 'badges' | 'categories'>('themes');
  const [tierFilter, setTierFilter] = useState<'all' | VaultTier>('all');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [applyingThemeId, setApplyingThemeId] = useState<string | null>(null);
  const [celebrationReward, setCelebrationReward] = useState<CelebrationReward | null>(null);
  const [showPreviewMenu, setShowPreviewMenu] = useState<boolean>(false);

  useEffect(() => {
    // 1. Subscribe to Vault State
    const unsubVault = vaultService.subscribeToVaultState((state) => {
      if (state) setVaultState(state);
    });

    // 2. Subscribe to Active Theme
    const unsubTheme = vaultService.subscribeToActiveTheme((theme) => {
      if (theme) setActiveThemeId(theme);
    });

    // 3. Listen for celebratory unlock event
    const handleUnlockEvent = (e: Event) => {
      const custom = e as CustomEvent<{ badges?: VaultBadge[]; themes?: VaultTheme[] }>;
      if (custom.detail?.badges && custom.detail.badges.length > 0) {
        const b = custom.detail.badges[0];
        setCelebrationReward({ type: 'badge', badge: b });
        triggerConfettiExplosion({
          originX: 0.5,
          originY: 0.42,
          tier: b.tier,
          staggerBursts: true,
          particleCount: b.tier === 'mythic' ? 160 : b.tier === 'legendary' ? 130 : 90
        });
      } else if (custom.detail?.themes && custom.detail.themes.length > 0) {
        const t = custom.detail.themes[0];
        setCelebrationReward({ type: 'theme', theme: t });
        triggerConfettiExplosion({
          originX: 0.5,
          originY: 0.42,
          tier: t.tier,
          staggerBursts: true,
          particleCount: t.tier === 'mythic' ? 160 : t.tier === 'legendary' ? 130 : 90
        });
      }
    };
    window.addEventListener('pulsefit_vault_reward_unlocked', handleUnlockEvent);

    return () => {
      unsubVault();
      unsubTheme();
      window.removeEventListener('pulsefit_vault_reward_unlocked', handleUnlockEvent);
    };
  }, []);

  const handleInspectTheme = (theme: VaultTheme, e?: React.MouseEvent) => {
    setCelebrationReward({ type: 'theme', theme });
    playUnlockSound({ type: 'theme', tier: theme.tier });
    if (e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      triggerConfettiExplosion({
        originX: (rect.left + rect.width / 2) / window.innerWidth,
        originY: (rect.top + rect.height / 2) / window.innerHeight,
        tier: theme.tier,
        particleCount: theme.tier === 'mythic' ? 140 : 90,
        spread: 180,
        startVelocity: 40
      });
    } else {
      triggerConfettiExplosion({
        originX: 0.5,
        originY: 0.45,
        tier: theme.tier,
        staggerBursts: true
      });
    }
  };

  const handleInspectBadge = (badge: VaultBadge, e?: React.MouseEvent) => {
    setCelebrationReward({ type: 'badge', badge });
    playUnlockSound({ type: 'badge', tier: badge.tier });
    if (e && e.currentTarget) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      triggerConfettiExplosion({
        originX: (rect.left + rect.width / 2) / window.innerWidth,
        originY: (rect.top + rect.height / 2) / window.innerHeight,
        tier: badge.tier,
        particleCount: badge.tier === 'mythic' ? 140 : 90,
        spread: 180,
        startVelocity: 38
      });
    } else {
      triggerConfettiExplosion({
        originX: 0.5,
        originY: 0.45,
        tier: badge.tier,
        staggerBursts: true
      });
    }
  };

  const handleApplyTheme = async (themeOrId: VaultTheme | string) => {
    const themeId = typeof themeOrId === 'string' ? themeOrId : themeOrId.id;
    setApplyingThemeId(themeId);
    try {
      await vaultService.setActiveTheme(themeId);
      setActiveThemeId(themeId);
    } finally {
      setTimeout(() => setApplyingThemeId(null), 300);
    }
  };

  const handleManualEvaluation = async () => {
    setIsEvaluating(true);
    try {
      const refreshed = await vaultService.evaluateVaultMilestones();
      setVaultState(refreshed);
    } finally {
      setTimeout(() => setIsEvaluating(false), 600);
    }
  };

  const themesToDisplay = (vaultState.themes && vaultState.themes.length > 0 ? vaultState.themes : MASTER_VAULT_THEMES).filter((t) => {
    if (tierFilter === 'all') return true;
    return t.tier === tierFilter;
  });

  const badgesToDisplay = (vaultState.badges && vaultState.badges.length > 0 ? vaultState.badges : MASTER_VAULT_BADGES).filter((b) => {
    if (tierFilter === 'all') return true;
    return b.tier === tierFilter;
  });

  const unlockedThemesCount = vaultState.unlockedThemes?.length ?? 0;
  const unlockedBadgesCount = vaultState.unlockedBadges?.length ?? 0;
  const totalThemesCount = vaultState.themes?.length ?? 0;
  const totalBadgesCount = vaultState.badges?.length ?? 0;

  return (
    <div
      className="w-full flex flex-col px-4 sm:px-6 md:px-8 py-6 space-y-6 max-w-7xl mx-auto text-zinc-100 transition-colors duration-500"
      style={{ backgroundColor: 'var(--bg-page, #09090b)' }}
    >
      
      {/* Top Glassmorphic Master Header */}
      <section
        className="w-full backdrop-blur-xl border rounded-[32px] p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6 transition-all duration-500"
        style={{
          background: 'var(--bg-card, rgba(18, 18, 24, 0.85))',
          borderColor: 'var(--border-glow, rgba(139, 92, 246, 0.45))',
          boxShadow: '0 20px 50px -20px var(--border-glow, rgba(139, 92, 246, 0.35))'
        }}
      >
        
        {/* Glow ambient background backdrop */}
        <div 
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-500"
          style={{ background: 'var(--accent-gradient, var(--primary-accent, #8b5cf6))' }}
        />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0 border transition-all duration-500"
              style={{
                background: 'var(--accent-gradient, linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%))',
                borderColor: 'var(--border-glow, rgba(139, 92, 246, 0.45))'
              }}
            >
              <Vault className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">The Vault</h1>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-0.5 rounded-full shadow-inner border text-white"
                  style={{
                    backgroundColor: 'rgba(24, 24, 27, 0.85)',
                    borderColor: 'var(--border-glow, rgba(139, 92, 246, 0.45))'
                  }}
                >
                  <Shield className="w-3.5 h-3.5" style={{ color: 'var(--primary-accent, #8b5cf6)' }} />
                  Master Architecture & Rules
                </span>
              </div>
              <p className="text-sm text-zinc-400 font-medium mt-1">
                Select any theme below to dynamically transform the entire PulseFit interface in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            {/* 144fps Unlock FX Interactive Preview Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowPreviewMenu(!showPreviewMenu)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-sky-500/20 hover:from-amber-500/30 hover:to-sky-500/30 border border-amber-500/40 text-amber-200 transition-all active:scale-95 shadow-md"
                title="Preview 144fps Unlock FX"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Test 144fps FX</span>
              </button>

              {showPreviewMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-zinc-950/95 border border-zinc-800 rounded-2xl p-2.5 shadow-2xl z-30 flex flex-col gap-1 backdrop-blur-2xl">
                  <div className="px-3 py-1 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                    <span>144FPS CELEBRATION FX</span>
                    <span className="text-amber-400">GPU LAYER</span>
                  </div>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'first-spark') || MASTER_VAULT_BADGES[0];
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'common' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'common', staggerBursts: true, particleCount: 100 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">First Spark</div>
                      <div className="text-[10px] text-zinc-400">Category 1 Common Badge</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'iron-will') || MASTER_VAULT_BADGES[1];
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'common' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'common', staggerBursts: true, particleCount: 110 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Iron Will</div>
                      <div className="text-[10px] text-zinc-400">5 Consecutive Logged Workouts</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'beast-mode') || MASTER_VAULT_BADGES.find(b => b.id === 'beast-mode');
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'rare' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'rare', staggerBursts: true, particleCount: 130 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Award className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Beast Mode</div>
                      <div className="text-[10px] text-zinc-400">14-Day Streak Perk (Rare Tier)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'consistency-king') || MASTER_VAULT_BADGES.find(b => b.id === 'consistency-king');
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'legendary' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'legendary', staggerBursts: true, particleCount: 150 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Consistency King</div>
                      <div className="text-[10px] text-zinc-400">50-Day Consistent Workouts (Legendary)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'the-legacy-anchor') || MASTER_VAULT_BADGES.find(b => b.id === 'the-legacy-anchor');
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'legendary' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'legendary', staggerBursts: true, particleCount: 175 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Award className="w-4 h-4 text-yellow-300 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">THE LEGACY ANCHOR</div>
                      <div className="text-[10px] text-zinc-400">Apex Legendary 365 Days + 15% Baseline</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'consistency-monster') || MASTER_VAULT_BADGES.find(b => b.id === 'consistency-monster');
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'mythic' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'mythic', staggerBursts: true, particleCount: 200 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Crown className="w-4 h-4 text-purple-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Consistency Monster</div>
                      <div className="text-[10px] text-zinc-400">100-Day Consistent Activity (Mythic)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const badge = vaultState.badges?.find(b => b.id === 'apex-physiology-synthesis') || MASTER_VAULT_BADGES.find(b => b.id === 'apex-physiology-synthesis');
                      if (badge) {
                        playUnlockSound({ type: 'badge', tier: 'mythic' });
                        setCelebrationReward({ type: 'badge', badge: { ...badge, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'mythic', staggerBursts: true, particleCount: 220 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Apex Physiology Synthesis</div>
                      <div className="text-[10px] text-zinc-400">Pinnacle Cosmic Nexus (Mythic)</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const theme = vaultState.themes?.find(t => t.id === 'golden-obsidian') || MASTER_VAULT_THEMES[13];
                      if (theme) {
                        playUnlockSound({ type: 'theme', tier: 'legendary' });
                        setCelebrationReward({ type: 'theme', theme: { ...theme, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'legendary', staggerBursts: true, particleCount: 140 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Palette className="w-4 h-4 text-yellow-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Golden Obsidian</div>
                      <div className="text-[10px] text-zinc-400">Category 3 Legendary Theme</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      const theme = vaultState.themes?.find(t => t.id === 'celestial-aurora') || MASTER_VAULT_THEMES[17];
                      if (theme) {
                        playUnlockSound({ type: 'theme', tier: 'mythic' });
                        setCelebrationReward({ type: 'theme', theme: { ...theme, isUnlocked: true } });
                        triggerConfettiExplosion({ tier: 'mythic', staggerBursts: true, particleCount: 180 });
                      }
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-zinc-200 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Celestial Aurora</div>
                      <div className="text-[10px] text-zinc-400">Category 4 Mythic Theme</div>
                    </div>
                  </button>

                  <div className="my-1 border-t border-zinc-800 px-3 py-1">
                    <span className="text-[9px] font-mono uppercase font-bold text-cyan-400 tracking-wider">⚡ Live Workout Overlay Tests</span>
                  </div>

                  <button
                    onClick={() => {
                      vaultService.triggerUnlockOverlay({ type: 'badge', id: 'beast-mode', tier: 'rare' });
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-cyan-300 transition-colors"
                  >
                    <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Overlay: Rare Beast Mode Badge</div>
                      <div className="text-[10px] text-cyan-400/70">14-Day Streak (Rare Badge)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      vaultService.triggerUnlockOverlay({ type: 'badge', id: 'consistency-monster', tier: 'mythic' });
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-purple-300 transition-colors"
                  >
                    <Crown className="w-4 h-4 text-purple-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Overlay: Mythic Consistency Monster</div>
                      <div className="text-[10px] text-purple-400/70">100-Day Consistent Activity (Mythic Badge)</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      vaultService.triggerUnlockOverlay({ type: 'theme', id: 'electric-cobalt', tier: 'rare' });
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-blue-300 transition-colors"
                  >
                    <Palette className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Overlay: Rare Electric Cobalt Theme</div>
                      <div className="text-[10px] text-blue-400/70">With Direct "Apply Theme Now" Action</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      vaultService.triggerUnlockOverlay({ type: 'theme', id: 'celestial-aurora', tier: 'mythic' });
                      setShowPreviewMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-zinc-900 flex items-center gap-2 text-pink-300 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-pink-400 shrink-0" />
                    <div className="min-w-0">
                      <div className="font-semibold text-white truncate">Overlay: Mythic Celestial Aurora Theme</div>
                      <div className="text-[10px] text-pink-400/70">With Direct "Apply Theme Now" Action</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={handleManualEvaluation}
              disabled={isEvaluating}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 transition-all hover:border-purple-500/60 active:scale-95 shadow-md"
              title="Check Progress Milestones"
            >
              <RefreshCw className={cn("w-3.5 h-3.5", isEvaluating && "animate-spin text-purple-400")} />
              <span>{isEvaluating ? 'Evaluating...' : 'Check Milestones'}</span>
            </button>
          </div>
        </div>

        {/* Global Real-Time Status Stats - Clean 3-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 relative z-10">
          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Themes Unlocked</span>
              <Palette className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-white flex items-baseline gap-1.5">
              <span>{unlockedThemesCount}</span>
              <span className="text-xs font-normal text-zinc-500">/ {totalThemesCount} Total</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1">
              {totalThemesCount === 0 ? 'Awaiting theme definitions' : `${totalThemesCount - unlockedThemesCount} Locked`}
            </span>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Badges Unlocked</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-white flex items-baseline gap-1.5">
              <span>{unlockedBadgesCount}</span>
              <span className="text-xs font-normal text-zinc-500">/ {totalBadgesCount} Badges</span>
            </div>
            <span className="text-[11px] text-zinc-400 mt-1">
              {totalBadgesCount === 0 ? 'Awaiting badge definitions' : 'Across 4 Tiers'}
            </span>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Theme</span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm sm:text-base font-bold text-cyan-300 truncate">
              {vaultState.themes?.find(t => t.id === activeThemeId)?.name || 'Developer Default (PulseFit Baseline)'}
            </div>
            <span className="text-[11px] text-zinc-500 mt-1">
              CSS variables active on root
            </span>
          </div>
        </div>

        {/* Informational Guidance */}
        <div className="rounded-2xl bg-zinc-900/40 border border-zinc-800/70 p-4 flex items-start gap-3 relative z-10">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-xs text-zinc-300 leading-relaxed">
            <strong className="font-semibold text-white">Vault Active: </strong>
            19 Master Themes across 4 Categories, Category 1 (14 Common Badges), Category 2 (12 Rare Badges), Category 3 (10 Legendary Badges), and Category 4 (4 Mythic Badges) are fully active with real-time Web Worker milestone evaluation and dynamic root CSS variables.
          </div>
        </div>
      </section>

      {/* Vault Sub-Tabs (Themes / Badges / Categories) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Toggle between Themes, Badges, and Categories */}
        <div className="flex items-center bg-zinc-950/80 p-1 rounded-2xl border border-zinc-800/80">
          <button
            onClick={() => setActiveSubTab('themes')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
              activeSubTab === 'themes'
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Themes ({totalThemesCount})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('badges')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
              activeSubTab === 'badges'
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Badges ({totalBadgesCount})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('categories')}
            className={cn(
              "px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
              activeSubTab === 'categories'
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4-Tier Categories</span>
          </button>
        </div>

        {/* Tier filter for Themes, Badges & Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setTierFilter('all')}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all shrink-0 border",
              tierFilter === 'all'
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            )}
          >
            All Tiers
          </button>
          <button
            onClick={() => setTierFilter('common')}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all shrink-0 border",
              tierFilter === 'common'
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            )}
          >
            Common
          </button>
          <button
            onClick={() => setTierFilter('rare')}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all shrink-0 border",
              tierFilter === 'rare'
                ? "bg-cyan-950 border-cyan-700 text-cyan-200"
                : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            )}
          >
            Rare
          </button>
          <button
            onClick={() => setTierFilter('legendary')}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all shrink-0 border",
              tierFilter === 'legendary'
                ? "bg-amber-950 border-amber-700 text-amber-200"
                : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            )}
          >
            Legendary
          </button>
          <button
            onClick={() => setTierFilter('mythic')}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all shrink-0 border",
              tierFilter === 'mythic'
                ? "bg-purple-950 border-purple-700 text-purple-200"
                : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            )}
          >
            Mythic
          </button>
        </div>
      </div>

      {/* VIEW 1: THEMES GRID */}
      {activeSubTab === 'themes' && (
        themesToDisplay.length === 0 ? (
          <div className="w-full bg-zinc-950/70 border border-zinc-800/80 rounded-[28px] p-12 text-center flex flex-col items-center justify-center space-y-4 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 flex items-center justify-center text-zinc-500 shadow-inner">
              <Palette className="w-8 h-8 text-purple-400" />
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-lg font-bold text-white">No Themes Added Yet</h3>
              <p className="text-sm text-zinc-400">
                The vault themes container is empty and ready. Custom themes will appear here once you provide them.
              </p>
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {themesToDisplay.map((theme) => {
            const isThemeActive = activeThemeId === theme.id;
            const isThemeUnlocked = theme.isUnlocked || theme.id === DEFAULT_THEME_ID;
            const tierStyle = TIER_CONFIG[theme.tier];

            return (
              <ThemeCardItem
                key={theme.id}
                theme={theme}
                isThemeActive={isThemeActive}
                isThemeUnlocked={isThemeUnlocked}
                tierStyle={tierStyle}
                applyingThemeId={applyingThemeId}
                onApply={handleApplyTheme}
                onInspect={handleInspectTheme}
              />
            );
          })}
        </div>
        )
      )}

      {/* VIEW 2: BADGES GRID */}
      {activeSubTab === 'badges' && (
        badgesToDisplay.length === 0 ? (
          <div className="w-full bg-zinc-950/70 border border-zinc-800/80 rounded-[28px] p-12 text-center flex flex-col items-center justify-center space-y-4 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-zinc-900/80 border border-zinc-700/60 flex items-center justify-center text-zinc-500 shadow-inner">
              <Award className="w-8 h-8 text-amber-400" />
            </div>
            <div className="space-y-1 max-w-md">
              <h3 className="text-lg font-bold text-white">No Badges Added Yet</h3>
              <p className="text-sm text-zinc-400">
                The vault badges container is empty and ready. Custom badges will appear here once you provide them.
              </p>
            </div>
          </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badgesToDisplay.map((badge) => (
            <BadgeCardItem
              key={badge.id}
              badge={badge}
              tierStyle={TIER_CONFIG[badge.tier]}
              onInspect={handleInspectBadge}
            />
          ))}
        </div>
        )
      )}

      {/* VIEW 3: 4-TIER CATEGORIES (Each Category contains 2 Sub-Sections: Themes & Badges) */}
      {activeSubTab === 'categories' && (
        <div className="flex flex-col gap-6">
          {(vaultState.categories && vaultState.categories.length > 0 ? vaultState.categories : INITIAL_VAULT_STATE.categories)
            .filter(cat => tierFilter === 'all' || cat.tier === tierFilter)
            .map((cat, idx) => {
              const catThemes = (vaultState.themes && vaultState.themes.length > 0 ? vaultState.themes : MASTER_VAULT_THEMES)
                .filter(t => t.tier === cat.tier);
              const catBadges = (vaultState.badges && vaultState.badges.length > 0 ? vaultState.badges : MASTER_VAULT_BADGES)
                .filter(b => b.tier === cat.tier);

              const props = {
                key: cat.id,
                category: cat,
                themes: catThemes,
                badges: catBadges,
                activeThemeId,
                applyingThemeId,
                onApplyTheme: handleApplyTheme,
                onInspectTheme: handleInspectTheme,
                onInspectBadge: handleInspectBadge,
                index: idx
              };

              switch (cat.tier) {
                case 'common':
                  return <CommonCategorySection {...props} />;
                case 'rare':
                  return <RareCategorySection {...props} />;
                case 'legendary':
                  return <LegendaryCategorySection {...props} />;
                case 'mythic':
                  return <MythicCategorySection {...props} />;
                default:
                  return null;
              }
            })}
        </div>
      )}

      {/* 144fps Fluid Cinematic Unlock Celebration Modal */}
      <VaultUnlockCelebrationModal
        reward={celebrationReward}
        onClose={() => setCelebrationReward(null)}
        onApplyTheme={handleApplyTheme}
        isThemeActive={celebrationReward?.theme?.id === activeThemeId}
      />

    </div>
  );
});
