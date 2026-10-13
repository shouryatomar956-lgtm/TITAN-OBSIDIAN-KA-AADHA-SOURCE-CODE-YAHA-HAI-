import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Check, Unlock, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { BiometricService } from '../services/BiometricService';
import { EnrolledBiometricEnclaveRecord } from '../services/zeroKnowledgeBiometricEnclave';
import { triggerHapticFeedback } from '../utils/haptics';

interface FingerprintScannerProps {
  onSuccess: () => void;
  onCancel: () => void;
  mode: 'setup' | 'auth';
  forceReEnroll?: boolean;
}

/**
 * 100% REAL-TIME PHYSICAL PHONE HARDWARE FINGERPRINT SENSOR SCANNER
 *
 * - Zero timers (`setTimeout` / `setInterval` completely removed).
 * - Zero screen-hold simulation (`onPointerDown` / `onTouchStart` hold loops completely removed).
 * - Preserves 100% synchronous W3C Transient User Activation so mobile browsers (Android BiometricPrompt
 *   StrongBox/TrustZone & iOS TouchID/FaceID Secure Enclave) immediately wake up the physical phone
 *   fingerprint sensor hardware.
 * - Detection starts ONLY when the user places their finger on their phone's physical fingerprint sensor!
 */
export function FingerprintScanner({
  onSuccess,
  onCancel,
  mode,
  forceReEnroll = false,
}: FingerprintScannerProps) {
  const [effectiveMode, setEffectiveMode] = useState<'setup' | 'auth'>(mode);
  const [completedPhases, setCompletedPhases] = useState<number>(0);
  const [awaitingPhysicalSensor, setAwaitingPhysicalSensor] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const preloadedEnclaveRef = useRef<EnrolledBiometricEnclaveRecord | null>(null);
  const challengeBytesRef = useRef<Uint8Array | null>(null);
  const pendingHardwareRecordRef = useRef<EnrolledBiometricEnclaveRecord | null>(null);

  /**
   * Synchronously wakes up the phone's physical hardware fingerprint sensor (`navigator.credentials.create`
   * or `navigator.credentials.get`) with ZERO `await` before the WebAuthn call so mobile transient user
   * activation is never lost. Detection only starts when the finger touches the physical phone sensor!
   */
  const activatePhonePhysicalSensor = async () => {
    if (awaitingPhysicalSensor || success) return;
    setErrorMsg('');

    try {
      if (effectiveMode === 'setup') {
        // ====================================================================
        // PHASE 1: Synchronous Hardware Capability Audit & 32-Byte Nonce
        // Executed synchronously in 0ms so transient user gesture is preserved!
        // ====================================================================
        const phase1 = BiometricService.executeHardwareSensorPhase1AuditSync();
        if (!phase1.success) {
          setErrorMsg(phase1.error || 'Phone hardware fingerprint sensor unavailable.');
          return;
        }
        challengeBytesRef.current = phase1.challengeBytes;
        setCompletedPhases(1);

        // ====================================================================
        // PHASE 2: Physical Phone Fingerprint Sensor Touch & ECDSA P-256 KeyGen
        // Wakes up native Android BiometricPrompt / Apple TouchID immediately.
        // Detection starts ONLY when the user touches the physical phone sensor!
        // ====================================================================
        setAwaitingPhysicalSensor(true);
        const phase2 = await BiometricService.executeHardwareSensorPhase2Touch(
          phase1.challengeBytes
        );
        if (!phase2.success || !phase2.pendingRecord) {
          setAwaitingPhysicalSensor(false);
          setCompletedPhases(0);
          setErrorMsg(
            phase2.error || 'Place your finger on your phone physical fingerprint sensor.'
          );
          return;
        }

        // Physical sensor recognized the finger! Advance to Phase 2
        pendingHardwareRecordRef.current = phase2.pendingRecord;
        setCompletedPhases(2);
        triggerHapticFeedback('medium');

        // ====================================================================
        // PHASE 3: Cryptographic OPFS AES-256-GCM Pinning & Strict Enforcement
        // Permanently pins the hardware Credential ID & ECDSA P-256 Public Key
        // across the encrypted OPFS vault and 7-Tier Polyglot Storage Mesh.
        // ====================================================================
        const phase3 = await BiometricService.executeHardwareSensorPhase3Pinning(
          phase2.pendingRecord,
          false
        );
        setAwaitingPhysicalSensor(false);

        if (!phase3.success) {
          setErrorMsg(phase3.error || 'Could not pin hardware fingerprint key.');
          return;
        }

        setCompletedPhases(3);
        setSuccess(true);
        triggerHapticFeedback('heavy');
        onSuccess();
      } else {
        // ====================================================================
        // REAL-TIME HARDWARE SENSOR UNLOCK (Byzantine Challenge-Response)
        // Synchronously wakes up the phone's physical fingerprint sensor via
        // `navigator.credentials.get` using the preloaded enclave record.
        // ====================================================================
        setAwaitingPhysicalSensor(true);
        const authRes = await BiometricService.authenticate(undefined, preloadedEnclaveRef.current);
        setAwaitingPhysicalSensor(false);

        if (authRes.success) {
          setCompletedPhases(3);
          setSuccess(true);
          triggerHapticFeedback('heavy');
          onSuccess();
        } else {
          setErrorMsg(
            authRes.error || 'Fingerprint not recognized by phone sensor. Use your registered finger.'
          );
        }
      }
    } catch {
      setAwaitingPhysicalSensor(false);
      setErrorMsg('Place your finger on your phone physical fingerprint sensor.');
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const rec = await BiometricService.getEnclaveRecord();
      if (!mounted) return;
      preloadedEnclaveRef.current = rec;

      if (
        mode === 'setup' &&
        !forceReEnroll &&
        rec &&
        rec.enclaveMode === 'WEBAUTHN_HARDWARE_PASSKEY' &&
        rec.credentialIdBase64
      ) {
        setEffectiveMode('auth');
      } else {
        setEffectiveMode(mode);
      }

      // Attempt immediate hardware sensor activation on mount; if the mobile browser requires a direct
      // tap for transient user activation, the sensor stays ready for immediate synchronous activation.
      activatePhonePhysicalSensor().catch(() => {});
    })();

    return () => {
      mounted = false;
    };
  }, [mode, forceReEnroll]);

  const progressPct =
    effectiveMode === 'setup'
      ? Math.round((completedPhases / 3) * 100)
      : success
      ? 100
      : 0;
  const ringCircumference = 2 * Math.PI * 76;
  const ringDashOffset = ringCircumference - (ringCircumference * progressPct) / 100;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950/95 backdrop-blur-xl overflow-y-auto p-6 select-none">
      {!success && (
        <button
          onClick={onCancel}
          aria-label="Close"
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors p-2 z-50"
        >
          <X className="w-8 h-8" />
        </button>
      )}

      <div className="relative z-10 flex flex-col items-center gap-8 max-w-sm text-center w-full py-6">
        {/* Clean Minimal Phase Counter (Setup Mode Only — Zero Technical Jargon, Zero Timers) */}
        {effectiveMode === 'setup' && !success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="text-2xl font-black text-white tracking-tight">
              {completedPhases} / 3 Phases Completed
            </div>

            <div className="flex items-center justify-center gap-3 w-full">
              {[1, 2, 3].map((phaseNum) => {
                const isDone = completedPhases >= phaseNum;
                const isCurrent = completedPhases + 1 === phaseNum;
                return (
                  <div
                    key={phaseNum}
                    className={cn(
                      'flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all duration-300 flex items-center justify-center gap-1.5',
                      isDone
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : isCurrent
                        ? 'bg-zinc-900 border-emerald-500/60 text-white'
                        : 'bg-zinc-900/40 border-zinc-800 text-zinc-600'
                    )}
                  >
                    <span>Phase {phaseNum}</span>
                    {isDone && <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={3} />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Central Fingerprint Hardware Sensor Indicator */}
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Circular Progress Ring SVG — advances strictly when hardware sensor completes phases */}
          {!success && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 176 176"
            >
              <circle
                cx="88"
                cy="88"
                r="76"
                fill="none"
                stroke="rgba(39, 39, 42, 0.7)"
                strokeWidth="5"
              />
              <circle
                cx="88"
                cy="88"
                r="76"
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringDashOffset}
                className="transition-all duration-300"
              />
            </svg>
          )}

          <AnimatePresence mode="wait">
            {!success ? (
              <motion.button
                key="fp-hardware-trigger"
                type="button"
                onClick={activatePhonePhysicalSensor}
                className={cn(
                  'relative z-10 w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-200 shadow-2xl select-none cursor-pointer',
                  awaitingPhysicalSensor
                    ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_50px_rgba(16,185,129,0.45)]'
                    : 'bg-zinc-900 text-emerald-400 hover:bg-zinc-900/80 shadow-[0_0_30px_rgba(16,185,129,0.2)]'
                )}
              >
                <Fingerprint className="w-20 h-20" />
              </motion.button>
            ) : (
              <motion.div
                key="success-icon"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="relative z-10 w-36 h-36 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-[0_0_60px_rgba(255,255,255,0.5)]"
              >
                {effectiveMode === 'setup' ? (
                  <Check className="w-16 h-16" strokeWidth={3} />
                ) : (
                  <Unlock className="w-16 h-16" strokeWidth={3} />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Minimal Status / Phase Feedback */}
        <div className="min-h-[48px] flex flex-col items-center justify-center w-full px-2">
          <AnimatePresence mode="wait">
            {errorMsg && !success ? (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-rose-400 font-semibold text-sm">{errorMsg}</p>
              </motion.div>
            ) : success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-1"
              >
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {effectiveMode === 'setup' ? '3 / 3 Phases Completed' : 'Unlocked'}
                </h3>
              </motion.div>
            ) : (
              <motion.p
                key="prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-zinc-400 font-medium text-sm"
              >
                {effectiveMode === 'setup'
                  ? 'Place your finger on your phone fingerprint sensor'
                  : 'Place your finger on your phone fingerprint sensor to unlock'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
