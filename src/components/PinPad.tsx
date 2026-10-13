import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { executeConcurrent } from '../utils/optimizationEngine';

import { motion, AnimatePresence } from 'motion/react';
import { Lock, Fingerprint, Delete, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { BiometricService } from '../services/BiometricService';
import { FingerprintScanner } from './FingerprintScanner';

interface PinPadProps {
  title: string;
  subtitle?: string;
  error?: string;
  onComplete: (pin: string) => void;
  forgotPinAction?: () => void;
  clearError?: () => void;
}

export function PinPad({ title, subtitle, error, onComplete, forgotPinAction, clearError }: PinPadProps) {
  const [pin, setPin] = useState('');
  
  // Custom fingerprint UI state
  const [showScanner, setShowScanner] = useState(false);
  const [scannerMode, setScannerMode] = useState<'setup' | 'auth'>('auth');
  
  const [hasBiometricSupport, setHasBiometricSupport] = useState<boolean>(() =>
    typeof window !== 'undefined' && Boolean(window.crypto && window.crypto.subtle)
  );
  const [isBiometricEnabled, setIsBiometricEnabled] = useState<boolean>(() =>
    BiometricService.hasEnrolledBiometricSync()
  );
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    BiometricService.isSupported().then(async (supported) => {
      setHasBiometricSupport(supported);
      if (supported) {
        const hasRealEnclave = await BiometricService.hasEnrolledBiometric();
        setIsBiometricEnabled(hasRealEnclave);
      }
    });
  }, []);

  const handleStartSetup = () => {
    if (isBiometricEnabled || BiometricService.hasEnrolledBiometricSync()) {
      setIsBiometricEnabled(true);
      setScannerMode('auth');
    } else {
      setScannerMode('setup');
    }
    setShowScanner(true);
  };

  const handleStartAuth = () => {
    setScannerMode('auth');
    setShowScanner(true);
  };

  const handleScannerSuccess = async () => {
    setShowScanner(false);
    const hasRealEnclave = await BiometricService.hasEnrolledBiometric();
    setIsBiometricEnabled(hasRealEnclave);
    if (scannerMode === 'auth' || hasRealEnclave) {
      onComplete('BIOMETRIC_SUCCESS');
    }
  };

  useEffect(() => {
    if (pin.length === 4) {
      onComplete(pin);
    }
  }, [pin, onComplete]);

  // Reset pin if external error is updated
  useEffect(() => {
    if (error) {
      setPin('');
    }
  }, [error]);

  const handlePress = (val: string) => {
    if (clearError) clearError();
    setLocalError(null);
    if (pin.length < 4) {
      requestAnimationFrame(() => {
        setPin(prev => prev + val);
      });
    }
  };

  const handleBackspace = () => {
    if (clearError) clearError();
    setLocalError(null);
    requestAnimationFrame(() => {
      setPin(prev => prev.slice(0, -1));
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-main)] text-zinc-100 p-4 w-full relative">
      <div className="flex flex-col items-center mb-12 mt-8">
        <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mb-6 shadow-sm">
          <Lock className="w-8 h-8 text-zinc-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight mb-2 text-center">{title}</h1>
        {subtitle && <p className="text-zinc-500 text-center max-w-xs">{subtitle}</p>}
      </div>

      <div className="flex gap-4 mb-12 h-4">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: pin.length > i ? 1.2 : 1,
              backgroundColor: pin.length > i ? '#f4f4f5' : '#27272a'
            }}
            className={cn(
              "w-4 h-4 rounded-full transition-colors",
              error ? "bg-red-500" : ""
            )}
          />
        ))}
      </div>

      <div className="min-h-8 mb-4 flex justify-center px-4">
        <AnimatePresence mode="wait">
          {(error || localError) && (
            <motion.p 
              key={error || localError}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-red-400 font-medium text-center text-sm"
            >
              {error || localError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handlePress(num.toString())}
            className="w-20 h-20 rounded-full bg-zinc-900/50 flex items-center justify-center text-3xl font-light hover:bg-zinc-800 active:scale-95 transition-all border border-zinc-800/50"
          >
            {num}
          </button>
        ))}
        {hasBiometricSupport && isBiometricEnabled ? (
          <button
            onClick={handleStartAuth}
            className="w-20 h-20 rounded-full flex flex-col items-center justify-center text-emerald-500 hover:bg-zinc-900 hover:text-emerald-400 active:scale-95 transition-all"
          >
            <Fingerprint className="w-8 h-8" />
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={() => handlePress('0')}
          className="w-20 h-20 rounded-full bg-zinc-900/50 flex items-center justify-center text-3xl font-light hover:bg-zinc-800 active:scale-95 transition-all border border-zinc-800/50"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="w-20 h-20 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-900 active:scale-95 transition-all"
        >
          <Delete className="w-8 h-8" />
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-2 mb-8">
        {hasBiometricSupport && !isBiometricEnabled && (
          <button
            onClick={handleStartSetup}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium transition-all"
          >
            <Fingerprint className="w-5 h-5 text-emerald-500" />
            Enable Fingerprint
          </button>
        )}
        
        {forgotPinAction && (
          <button 
            onClick={forgotPinAction}
            className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm font-medium h-12 px-6 rounded-full"
          >
            Forgot PIN?
          </button>
        )}
      </div>

      <AnimatePresence>
        {showScanner && (
          <FingerprintScanner 
            mode={scannerMode}
            onSuccess={handleScannerSuccess}
            onCancel={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
