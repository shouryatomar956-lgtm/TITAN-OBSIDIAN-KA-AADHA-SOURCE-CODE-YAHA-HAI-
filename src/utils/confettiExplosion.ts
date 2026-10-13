import { VaultTier } from '../types/vault';

export interface ConfettiOptions {
  /** Origin X coordinate: 0.0 to 1.0 (relative to viewport) or absolute pixel value */
  originX?: number;
  /** Origin Y coordinate: 0.0 to 1.0 (relative to viewport) or absolute pixel value */
  originY?: number;
  /** Number of particles to spawn in this burst */
  particleCount?: number;
  /** Tier style palette: 'common' | 'rare' | 'legendary' | 'mythic' */
  tier?: VaultTier;
  /** Spread angle in degrees (e.g. 360 for radial omnidirectional explosion) */
  spread?: number;
  /** Base explosion angle in degrees (default: -90 for upward cannon, or 0 for radial) */
  angle?: number;
  /** Initial launch velocity (default: 42) */
  startVelocity?: number;
  /** Gravity constant (default: 0.65) */
  gravity?: number;
  /** Velocity decay/air resistance (default: 0.94) */
  decay?: number;
  /** Scale factor for particle size */
  scalar?: number;
  /** If true, fires a primary blast followed by two lateral fountain cannons */
  staggerBursts?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  gravity: number;
  decay: number;
  color: string;
  shape: 'ribbon' | 'star' | 'circle' | 'diamond';
  size: number;
  tiltAngle: number;
  tiltSpeed: number;
  rotation: number;
  rotationSpeed: number;
  alpha: number;
  fadeSpeed: number;
  oscillationSpeed: number;
  oscillationOffset: number;
}

const TIER_COLOR_PALETTES: Record<VaultTier, string[]> = {
  common: [
    '#f59e0b', // Amber 500
    '#fbbf24', // Amber 400
    '#fde047', // Yellow 300
    '#ffffff', // Pure white spark
    '#ea580c', // Orange 600
    '#d97706'  // Amber 600
  ],
  rare: [
    '#06b6d4', // Cyan 500
    '#38bdf8', // Sky 400
    '#60a5fa', // Blue 400
    '#a855f7', // Purple 500
    '#e0f2fe', // Sky 100
    '#0284c7'  // Sky 600
  ],
  legendary: [
    '#fbbf24', // Pure Gold
    '#f59e0b', // Radiant Amber
    '#ef4444', // Solar Flare Red
    '#e11d48', // Crimson Flare
    '#ffffff', // Diamond White
    '#f97316', // Molten Orange
    '#facc15'  // Bright Yellow
  ],
  mythic: [
    '#22d3ee', // Electric Aurora Cyan
    '#c084fc', // Celestial Purple
    '#34d399', // Prismatic Emerald
    '#f472b6', // Neon Pink
    '#38bdf8', // Photon Sky
    '#ffffff', // Starlight White
    '#818cf8'  // Indigo Starlight
  ]
};

class ConfettiEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private isRunning = false;
  private rafId: number | null = null;
  private dpr = 1;
  private width = 0;
  private height = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initEvents();
    }
  }

  private initEvents() {
    // Listen for custom trigger events across the app
    window.addEventListener('pulsefit_confetti_trigger', ((e: CustomEvent<ConfettiOptions>) => {
      this.burst(e.detail);
    }) as EventListener);

    // Automatically trigger whenever VaultService dispatches reward unlocks
    window.addEventListener('pulsefit_vault_reward_unlocked', ((e: CustomEvent<{ badges?: any[]; themes?: any[] }>) => {
      const tier: VaultTier = e.detail?.themes?.[0]?.tier || e.detail?.badges?.[0]?.tier || 'legendary';
      this.burst({
        tier,
        staggerBursts: true,
        particleCount: tier === 'mythic' ? 180 : tier === 'legendary' ? 150 : 110
      });
    }) as EventListener);
  }

  private ensureCanvas(): boolean {
    if (typeof document === 'undefined') return false;

    if (!this.canvas) {
      const canvas = document.createElement('canvas');
      canvas.id = 'pulsefit-gpu-confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '999999';
      canvas.style.willChange = 'transform';
      canvas.style.transform = 'translateZ(0)';
      canvas.style.contain = 'strict';
      canvas.setAttribute('aria-hidden', 'true');

      document.body.appendChild(canvas);
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true });

      this.handleResize();
      window.addEventListener('resize', this.handleResize, { passive: true });
    }

    return !!this.ctx;
  }

  private handleResize = () => {
    if (!this.canvas || !this.ctx) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for optimal 144fps GPU balance
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
  };

  /**
   * Spawns an explosion burst
   */
  public burst(options?: ConfettiOptions) {
    if (!this.ensureCanvas() || !this.ctx) return;

    const tier = options?.tier || 'common';
    const palette = TIER_COLOR_PALETTES[tier] || TIER_COLOR_PALETTES.common;

    // Viewport position resolution
    const rawX = options?.originX ?? 0.5;
    const rawY = options?.originY ?? 0.45;
    const originX = rawX > 1 ? rawX : rawX * this.width;
    const originY = rawY > 1 ? rawY : rawY * this.height;

    const count = options?.particleCount ?? (tier === 'mythic' ? 140 : tier === 'legendary' ? 110 : 80);
    const spread = options?.spread ?? 360;
    const baseAngle = options?.angle ?? 0;
    const startVelocity = options?.startVelocity ?? 44;
    const gravity = options?.gravity ?? 0.65;
    const decay = options?.decay ?? 0.93;
    const scalar = options?.scalar ?? 1;

    // Generate particles
    for (let i = 0; i < count; i++) {
      const angleInDeg = spread === 360 
        ? Math.random() * 360 
        : baseAngle + (Math.random() - 0.5) * spread;
      const angleRad = (angleInDeg * Math.PI) / 180;
      
      const speed = (startVelocity * (0.4 + Math.random() * 0.85)) * (0.8 + Math.random() * 0.4);
      const color = palette[Math.floor(Math.random() * palette.length)];

      const shapeRand = Math.random();
      const shape: Particle['shape'] = shapeRand < 0.5 
        ? 'ribbon' 
        : shapeRand < 0.75 
          ? 'star' 
          : shapeRand < 0.9 
            ? 'diamond' 
            : 'circle';

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angleRad) * speed,
        vy: Math.sin(angleRad) * speed - (spread === 360 ? 3 : 0), // Slight upward bias
        gravity: gravity * (0.85 + Math.random() * 0.3),
        decay: decay * (0.98 + Math.random() * 0.03),
        color,
        shape,
        size: (shape === 'ribbon' ? 8 + Math.random() * 6 : 5 + Math.random() * 5) * scalar,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.08 + Math.random() * 0.16,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        alpha: 1,
        fadeSpeed: 0.007 + Math.random() * 0.009,
        oscillationSpeed: 0.04 + Math.random() * 0.08,
        oscillationOffset: Math.random() * Math.PI * 2
      });
    }

    // Secondary and tertiary staggered lateral cannons for dramatic impact
    if (options?.staggerBursts) {
      setTimeout(() => {
        this.burst({
          originX: Math.max(0.12, rawX - 0.22),
          originY: Math.min(0.85, rawY + 0.12),
          angle: -65,
          spread: 55,
          startVelocity: 50,
          particleCount: Math.floor(count * 0.6),
          tier,
          staggerBursts: false
        });
      }, 140);

      setTimeout(() => {
        this.burst({
          originX: Math.min(0.88, rawX + 0.22),
          originY: Math.min(0.85, rawY + 0.12),
          angle: -115,
          spread: 55,
          startVelocity: 50,
          particleCount: Math.floor(count * 0.6),
          tier,
          staggerBursts: false
        });
      }, 280);
    }

    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    }
  }

  private render = () => {
    if (!this.ctx || !this.canvas) {
      this.isRunning = false;
      return;
    }

    // Clear whole canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    let aliveCount = 0;
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      const p = this.particles[i];
      if (p.alpha <= 0.01 || p.y > this.height + 40) {
        continue;
      }

      aliveCount++;

      // Physics integration (delta-free, 144hz locked)
      p.vx *= p.decay;
      p.vy *= p.decay;
      p.vy += p.gravity;

      // Micro aerodynamic air flutter
      p.x += p.vx + Math.sin(p.oscillationOffset) * 0.6;
      p.y += p.vy;
      p.oscillationOffset += p.oscillationSpeed;

      // 3D rotation simulation
      p.tiltAngle += p.tiltSpeed;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.fadeSpeed;

      const tilt = Math.cos(p.tiltAngle);
      const alpha = Math.max(0, p.alpha);

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.scale(1, tilt); // 3D ribbon flip effect
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = p.color;

      // Render shapes
      if (p.shape === 'ribbon') {
        const w = p.size;
        const h = p.size * 0.45;
        this.ctx.fillRect(-w / 2, -h / 2, w, h);
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, 0, 0, 4, p.size * 0.8, p.size * 0.35);
      } else if (p.shape === 'diamond') {
        this.ctx.beginPath();
        this.ctx.moveTo(0, -p.size * 0.6);
        this.ctx.lineTo(p.size * 0.45, 0);
        this.ctx.lineTo(0, p.size * 0.6);
        this.ctx.lineTo(-p.size * 0.45, 0);
        this.ctx.closePath();
        this.ctx.fill();
      } else {
        // Glowing circle spark
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    // Garbage collection of dead particles when over threshold
    if (this.particles.length > 500 && aliveCount < 80) {
      this.particles = this.particles.filter(p => p.alpha > 0.01 && p.y <= this.height + 40);
    }

    if (aliveCount > 0) {
      this.rafId = requestAnimationFrame(this.render);
    } else {
      this.isRunning = false;
      this.particles.length = 0;
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }
  };

  private drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  public clear() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.isRunning = false;
    this.particles.length = 0;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
}

// Global Singleton
let confettiInstance: ConfettiEngine | null = null;

function getConfettiEngine(): ConfettiEngine {
  if (!confettiInstance) {
    confettiInstance = new ConfettiEngine();
  }
  return confettiInstance;
}

/**
 * Fires a lightweight GPU-accelerated canvas-based confetti explosion.
 * Safe to call from anywhere (main thread, event handlers, animations).
 */
export function triggerConfettiExplosion(options?: ConfettiOptions): void {
  try {
    getConfettiEngine().burst(options);
  } catch (err) {
    console.warn('[PulseFit Confetti] Failed to execute burst:', err);
  }
}

/**
 * Clears any active confetti immediately.
 */
export function clearConfetti(): void {
  if (confettiInstance) {
    confettiInstance.clear();
  }
}
