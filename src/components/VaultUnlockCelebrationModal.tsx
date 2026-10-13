import React, { useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Sparkles, 
  Award, 
  Palette, 
  Check, 
  Zap, 
  X, 
  Flame, 
  Shield, 
  Droplets, 
  Footprints, 
  Dumbbell, 
  Sun, 
  Moon, 
  Layers, 
  Sprout, 
  GlassWater, 
  ClipboardCheck, 
  Gauge 
} from 'lucide-react';
import { cn } from '../lib/utils';
import { VaultBadge, VaultTheme, VaultTier } from '../types/vault';
import { triggerConfettiExplosion } from '../utils/confettiExplosion';
import { playUnlockSound } from '../utils/vaultAudioEngine';
import { COMMON_BADGE_ICONS } from './vault/CommonBadgeIcons';
import { LEGENDARY_BADGE_ICONS } from './vault/LegendaryBadgeIcons';
import { RARE_BADGE_ICONS } from './vault/RareBadgeIcons';
import { MYTHIC_BADGE_ICONS } from './vault/MythicBadgeIcons';

export type CelebrationReward = 
  | { type: 'badge'; badge: VaultBadge; theme?: never }
  | { type: 'theme'; theme: VaultTheme; badge?: never };

interface VaultUnlockCelebrationModalProps {
  reward: CelebrationReward | null;
  onClose: () => void;
  onApplyTheme?: (themeId: string) => void;
  isThemeActive?: boolean;
}

const BADGE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Trophy,
  Droplets,
  Footprints,
  Flame,
  Dumbbell,
  Sun,
  Moon,
  Layers,
  Sprout,
  GlassWater,
  ClipboardCheck,
  Shield,
  Gauge,
  Award,
  ...COMMON_BADGE_ICONS,
  ...LEGENDARY_BADGE_ICONS,
  ...RARE_BADGE_ICONS,
  ...MYTHIC_BADGE_ICONS
};

const TIER_GLOW_COLORS: Record<VaultTier, {
  accent: string;
  glow: string;
  gradient: string;
  border: string;
  particleColors: string[];
}> = {
  common: {
    accent: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.65)',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    border: 'border-amber-500/50',
    particleColors: ['#fbbf24', '#f59e0b', '#d97706', '#fef3c7', '#ffffff']
  },
  rare: {
    accent: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.65)',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    border: 'border-blue-500/50',
    particleColors: ['#60a5fa', '#3b82f6', '#2563eb', '#93c5fd', '#ffffff']
  },
  legendary: {
    accent: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.75)',
    gradient: 'from-yellow-500/25 via-amber-600/15 to-transparent',
    border: 'border-yellow-400/60',
    particleColors: ['#fbbf24', '#f59e0b', '#f97316', '#fef08a', '#ffffff']
  },
  mythic: {
    accent: '#38bdf8',
    glow: 'rgba(56, 189, 248, 0.85)',
    gradient: 'from-sky-500/25 via-purple-600/20 to-emerald-500/10',
    border: 'border-sky-400/70',
    particleColors: ['#38bdf8', '#c084fc', '#34d399', '#f43f5e', '#ffffff']
  }
};

export const VaultUnlockCelebrationModal = memo(function VaultUnlockCelebrationModal({
  reward,
  onClose,
  onApplyTheme,
  isThemeActive
}: VaultUnlockCelebrationModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const tier: VaultTier = reward?.type === 'badge' 
    ? (reward.badge.tier || 'common') 
    : (reward?.theme?.tier || 'legendary');

  const tierStyle = TIER_GLOW_COLORS[tier] || TIER_GLOW_COLORS.common;

  // Trigger low-latency Web Audio API sound effect and lightweight GPU confetti explosion on open
  useEffect(() => {
    if (reward) {
      playUnlockSound({
        type: reward.type,
        tier
      });
      
      // Immediate primary radial burst
      triggerConfettiExplosion({
        originX: 0.5,
        originY: 0.42,
        tier,
        staggerBursts: true,
        particleCount: tier === 'mythic' ? 160 : tier === 'legendary' ? 130 : 90
      });

      // Secondary celebratory wave when the spring animation lands
      const timer = setTimeout(() => {
        triggerConfettiExplosion({
          originX: 0.5,
          originY: 0.38,
          tier,
          spread: 120,
          startVelocity: 38,
          particleCount: 50,
          staggerBursts: false
        });
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [reward, tier]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && reward) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [reward, onClose]);

  // 144Hz-capped particle canvas renderer
  useEffect(() => {
    if (!reward) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors = tierStyle.particleColors;
    const particleCount = 65;

    // Pre-allocated particle pool
    const particles = Array.from({ length: particleCount }, () => ({
      x: width * 0.5 + (Math.random() - 0.5) * 160,
      y: height * 0.42 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 10 - 3,
      size: Math.random() * 5 + 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.2,
      gravity: 0.22,
      drag: 0.985
    }));

    let lastTime = performance.now();

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        if (p.alpha <= 0.01) continue;
        activeCount++;

        p.vx *= p.drag;
        p.vy = (p.vy + p.gravity) * p.drag;
        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;
        p.rotation += p.vr * 60 * dt;
        p.alpha -= 0.009 * (60 * dt);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        if (i % 2 === 0) {
          // Confetti ribbon
          ctx.fillRect(-p.size, -p.size * 0.5, p.size * 2, p.size);
        } else {
          // Circular photon star
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.75, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (activeCount > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reward, tierStyle]);

  if (!reward) return null;

  const isBadge = reward.type === 'badge';
  const badge = reward.badge;
  const theme = reward.theme;
  const IconComponent = isBadge && badge.iconName ? (BADGE_ICONS[badge.iconName] || Award) : Award;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Fullscreen Backdrop blur with 144fps GPU composite */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl hardware-accelerated cursor-pointer"
        />

        {/* Dynamic Celestial Rays and Ambient Tier Glow */}
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Radial Bloom */}
          <div 
            className="w-[650px] h-[650px] rounded-full blur-[120px] opacity-40 animate-beacon-glow"
            style={{ backgroundColor: tierStyle.accent }}
          />

          {/* Rotating Celestial Rays */}
          <div 
            className="absolute w-[800px] h-[800px] opacity-25 animate-celestial-rays"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, ${tierStyle.accent} 25deg, transparent 50deg, ${tierStyle.accent} 75deg, transparent 100deg, ${tierStyle.accent} 125deg, transparent 150deg, ${tierStyle.accent} 175deg, transparent 200deg, ${tierStyle.accent} 225deg, transparent 250deg, ${tierStyle.accent} 275deg, transparent 300deg, ${tierStyle.accent} 325deg, transparent 350deg)`
            }}
          />

          {/* Expanding Shockwave Rings */}
          <div 
            className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full border border-white/40 animate-shockwave-1 pointer-events-none"
            style={{ borderColor: tierStyle.accent }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full border border-white/30 animate-shockwave-2 pointer-events-none"
            style={{ borderColor: tierStyle.accent }}
          />
        </div>

        {/* 144Hz Particle Canvas */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 pointer-events-none z-10 w-full h-full"
        />

        {/* Main 3D Perspective Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.72, y: 35, rotateX: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 24,
            mass: 0.95
          }}
          className={cn(
            "relative z-20 w-full max-w-lg rounded-[32px] p-7 sm:p-8 backdrop-blur-2xl border shadow-2xl overflow-hidden",
            "bg-zinc-950/95 border-zinc-800 text-center flex flex-col items-center",
            tierStyle.border,
            "hardware-accelerated"
          )}
          style={{
            boxShadow: `0 25px 60px -15px ${tierStyle.glow}, 0 0 40px -10px ${tierStyle.glow}`
          }}
        >
          {/* Top Holographic Sheen Sweep across Card */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute -top-1/2 -bottom-1/2 -left-1/2 -right-1/2 w-[200%] h-[200%] animate-sheen-sweep pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)'
              }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all z-30 active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Superheader / Tier Banner */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 mb-5 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: tierStyle.accent }} />
            <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-zinc-200">
              {isBadge ? `★ CATEGORY ${tier.toUpperCase()} BADGE UNLOCKED ★` : `★ ${tier.toUpperCase()} THEME DISCOVERED ★`}
            </span>
          </motion.div>

          {/* Center Emblem / Trophy Core with 3D Spring Bounce */}
          <motion.div
            initial={{ scale: 0.4, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 18,
              delay: 0.08
            }}
            className="relative mb-6 flex items-center justify-center"
          >
            {/* Glowing Aura Ring behind emblem */}
            <div 
              className="absolute w-28 h-28 rounded-3xl blur-xl opacity-70 animate-unlock-aura pointer-events-none"
              style={{ backgroundColor: tierStyle.accent }}
            />

            {isBadge ? (
              <div 
                className={cn(
                  "relative w-24 h-24 rounded-3xl flex items-center justify-center border shadow-2xl z-10",
                  "bg-gradient-to-b from-zinc-800/90 to-zinc-950/90 border-amber-500/60"
                )}
                style={{
                  boxShadow: `0 10px 30px ${tierStyle.glow}`
                }}
              >
                <IconComponent className="w-12 h-12 text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)]" />
                <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider shadow-lg">
                  #{badge.number.toString().padStart(2, '0')}
                </div>
              </div>
            ) : (
              <div 
                className="relative w-28 h-24 rounded-3xl p-2.5 border shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
                style={{
                  background: theme.cssVars?.bgCard || 'rgba(15, 23, 42, 0.95)',
                  borderColor: theme.cssVars?.primaryAccent || tierStyle.accent,
                  boxShadow: `0 12px 35px ${theme.cssVars?.borderGlow || tierStyle.glow}`
                }}
              >
                <div className="flex items-center justify-between">
                  <div 
                    className="w-4 h-4 rounded-full border border-white/40 shadow-sm"
                    style={{ background: theme.cssVars?.primaryAccent }}
                  />
                  <Palette className="w-4 h-4 text-white/80" />
                </div>
                <div 
                  className="w-full h-4 rounded-lg shadow-inner"
                  style={{ background: theme.cssVars?.accentGradient }}
                />
                <div className="text-[10px] font-mono font-bold text-white/90 truncate">
                  #{theme.number.toString().padStart(2, '0')} {theme.name}
                </div>
              </div>
            )}
          </motion.div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="space-y-2 mb-6 max-w-sm"
          >
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <span>{isBadge ? badge.title : theme.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {isBadge ? badge.description : theme.tagline}
            </p>
          </motion.div>

          {/* Criteria & Telemetry confirmation box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24 }}
            className="w-full bg-zinc-900/70 border border-zinc-800/80 rounded-2xl p-3.5 mb-6 flex items-center justify-between gap-3 text-left"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: `${tierStyle.accent}15`,
                  borderColor: `${tierStyle.accent}40`
                }}
              >
                <Check className="w-4 h-4" style={{ color: tierStyle.accent }} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Requirement Cleared
                </div>
                <div className="text-xs font-semibold text-white truncate">
                  {isBadge ? badge.criteriaText : `Threshold: ${theme.unlockCondition.threshold.toLocaleString()}`}
                </div>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 uppercase">
                Secured In Vault
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full flex flex-col sm:flex-row items-center gap-3"
          >
            {!isBadge && onApplyTheme && (
              <button
                onClick={(e) => {
                  triggerConfettiExplosion({
                    originX: e.clientX ? e.clientX / window.innerWidth : 0.5,
                    originY: e.clientY ? e.clientY / window.innerHeight : 0.7,
                    tier,
                    spread: 180,
                    startVelocity: 36,
                    particleCount: 65
                  });
                  onApplyTheme(theme.id);
                  onClose();
                }}
                className={cn(
                  "w-full sm:flex-1 py-3 px-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95",
                  isThemeActive
                    ? "bg-emerald-900/60 text-emerald-300 border border-emerald-600/60"
                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
                )}
              >
                {isThemeActive ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Currently Active</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply Theme Now</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={(e) => {
                if (isBadge) {
                  triggerConfettiExplosion({
                    originX: e.clientX ? e.clientX / window.innerWidth : 0.5,
                    originY: e.clientY ? e.clientY / window.innerHeight : 0.7,
                    tier,
                    particleCount: 50,
                    spread: 120,
                    startVelocity: 32
                  });
                }
                onClose();
              }}
              className={cn(
                "w-full py-3 px-5 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 active:scale-95",
                isBadge
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/25"
                  : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 sm:w-auto"
              )}
            >
              <span>{isBadge ? 'Claim Badge & Keep Grinding' : 'Dismiss'}</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
