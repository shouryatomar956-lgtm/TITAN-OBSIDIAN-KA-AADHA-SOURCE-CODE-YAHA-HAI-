/**
 * High-Precision Media Permission Denied Fallback & Guided Diagnostic UI
 * 
 * Provides human-centric OS-aware recovery instructions for iOS Safari,
 * Android Chrome, and Desktop browsers when Camera or Microphone access is denied.
 * Includes privacy verification badges and non-blocking fallback modes.
 */

import React, { useState, useEffect } from 'react';
import { Camera, Mic, ShieldAlert, RefreshCw, Smartphone, Globe, ArrowRight, CheckCircle2, Lock, HelpCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { triggerHapticFeedback } from '../utils/haptics';

export interface MediaPermissionFallbackProps {
  mediaType: 'camera' | 'microphone' | 'both';
  moduleTitle: string;
  errorMessage?: string | null;
  onRetry: () => void | Promise<void>;
  onManualFallback?: () => void;
  manualFallbackLabel?: string;
  className?: string;
}

export const MediaPermissionFallback: React.FC<MediaPermissionFallbackProps> = ({
  mediaType,
  moduleTitle,
  errorMessage,
  onRetry,
  onManualFallback,
  manualFallbackLabel = 'Use Manual / Sensor Mode',
  className
}) => {
  const [isRetrying, setIsRetrying] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop'>('desktop');
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      setPlatform('ios');
    } else if (/android/.test(ua)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    triggerHapticFeedback('medium');
    try {
      await onRetry();
    } finally {
      setIsRetrying(false);
    }
  };

  const isCamera = mediaType === 'camera' || mediaType === 'both';
  const isMic = mediaType === 'microphone' || mediaType === 'both';

  return (
    <div className={cn(
      "w-full rounded-3xl bg-zinc-950/95 border border-rose-500/30 p-5 sm:p-7 text-white shadow-2xl backdrop-blur-xl relative overflow-hidden",
      className
    )}>
      {/* Background ambient gradient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Header with status badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0 shadow-inner">
              {isCamera && !isMic && <Camera className="w-6 h-6" />}
              {isMic && !isCamera && <Mic className="w-6 h-6" />}
              {isCamera && isMic && <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-rose-400">
                  Permission Required
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
              </div>
              <h3 className="text-base sm:text-lg font-black tracking-tight text-zinc-100">
                {isCamera && isMic ? 'Camera & Microphone Access Blocked' : isCamera ? 'Camera Access Blocked' : 'Microphone Access Blocked'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
              {platform === 'ios' ? 'Apple iOS Safari' : platform === 'android' ? 'Android Chrome' : 'Desktop Browser'}
            </span>
          </div>
        </div>

        {/* Diagnostic explanation */}
        <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-900/60 p-3.5 sm:p-4 rounded-2xl border border-zinc-800/60 space-y-2">
          <p>
            <strong className="text-white">{moduleTitle}</strong> requires real-time {isCamera && isMic ? 'camera video & microphone' : isCamera ? 'camera optical feed' : 'microphone acoustic stream'} to execute pure client-side processing directly on your device.
          </p>
          {errorMessage && (
            <p className="text-[11px] font-mono text-rose-300/90 bg-rose-950/40 p-2 rounded-lg border border-rose-800/30">
              Browser Notice: {errorMessage}
            </p>
          )}
        </div>

        {/* Step-by-Step Recovery Guide based on OS */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
            <span>How to unblock in 3 steps:</span>
            <button
              type="button"
              onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
              className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Lock className="w-3 h-3" />
              <span>Privacy Guarantee</span>
            </button>
          </div>

          {showPrivacyDetails && (
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-200/90 leading-relaxed space-y-1 animate-in fade-in duration-200">
              <div className="font-bold flex items-center gap-1.5 text-indigo-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>100% Client-Side Privacy Boundary</span>
              </div>
              <p>
                PulseFit operates offline. Zero video frames or audio buffers ever leave your device or touch an external server. Computations run locally inside your browser GPU/WASM pipeline.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            {platform === 'ios' ? (
              <>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center">1</div>
                  <span className="font-bold text-zinc-200">Tap "aA" or Page Icon</span>
                  <p className="text-[11px] text-zinc-400">Located at the left side of your Safari address bar.</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center">2</div>
                  <span className="font-bold text-zinc-200">Open Website Settings</span>
                  <p className="text-[11px] text-zinc-400">Select Website Settings and switch {isCamera ? 'Camera' : 'Microphone'} to <strong>Allow</strong>.</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">3</div>
                  <span className="font-bold text-zinc-200">Tap Retry Below</span>
                  <p className="text-[11px] text-zinc-400">Tap "Retry Permission Request" to resume tracking instantly.</p>
                </div>
              </>
            ) : platform === 'android' ? (
              <>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center">1</div>
                  <span className="font-bold text-zinc-200">Tap Lock or Settings Icon</span>
                  <p className="text-[11px] text-zinc-400">Located on the left side of Chrome's address bar.</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center">2</div>
                  <span className="font-bold text-zinc-200">Permissions &rarr; Allow</span>
                  <p className="text-[11px] text-zinc-400">Tap Permissions and toggle {isCamera ? 'Camera' : 'Microphone'} on.</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">3</div>
                  <span className="font-bold text-zinc-200">Tap Retry Below</span>
                  <p className="text-[11px] text-zinc-400">Click Retry to re-engage the hardware driver.</p>
                </div>
              </>
            ) : (
              <>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center">1</div>
                  <span className="font-bold text-zinc-200">Check Address Bar Lock</span>
                  <p className="text-[11px] text-zinc-400">Click the tune/lock icon next to the website URL.</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-300 text-[11px] font-bold flex items-center justify-center">2</div>
                  <span className="font-bold text-zinc-200">Enable {isCamera ? 'Camera' : 'Microphone'}</span>
                  <p className="text-[11px] text-zinc-400">Set permissions to Allow or click Reset Permissions.</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">3</div>
                  <span className="font-bold text-zinc-200">Click Retry</span>
                  <p className="text-[11px] text-zinc-400">Re-prompt the browser permission dialogue.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full sm:flex-1 py-3 px-5 rounded-2xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className={cn("w-4 h-4", isRetrying && "animate-spin")} />
            <span>{isRetrying ? 'Attempting Connection...' : 'Retry Permission Request'}</span>
          </button>

          {onManualFallback && (
            <button
              type="button"
              onClick={onManualFallback}
              className="w-full sm:w-auto py-3 px-5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-xs sm:text-sm border border-zinc-800 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{manualFallbackLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
