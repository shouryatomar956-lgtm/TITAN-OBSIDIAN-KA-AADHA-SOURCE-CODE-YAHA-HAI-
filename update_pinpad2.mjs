import fs from 'fs';

const componentCode = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Lock, Fingerprint, ScanFace, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { BiometricService } from '../services/BiometricService';

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
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [hasBiometricSupport, setHasBiometricSupport] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    BiometricService.isSupported().then(supported => {
      setHasBiometricSupport(supported);
      if (supported) {
        setIsBiometricEnabled(!!localStorage.getItem('pulsefit_biometric_id'));
      }
    });
  }, []);

  const handleBiometricAuth = async (type: 'fingerprint' | 'face') => {
    if (clearError) clearError();
    const success = await BiometricService.authenticate();
    if (success) {
      setIsBiometricEnabled(true);
      onComplete('BIOMETRIC_SUCCESS');
    } else {
      // If authentication failed or was cancelled during registration, we might want to alert or just silently fail.
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
    if (pin.length < 4) {
      setPin(prev => prev + val);
    }
  };

  const handleBackspace = () => {
    if (clearError) clearError();
    setPin(prev => prev.slice(0, -1));
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

      <div className="h-8 mb-4">
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 font-medium text-center"
          >
            {error}
          </motion.p>
        )}
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
            onClick={() => handleBiometricAuth('fingerprint')}
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
            onClick={() => setShowBiometricModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-medium transition-all"
          >
            <Fingerprint className="w-5 h-5 text-emerald-500" />
            Enable Biometrics
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
        {showBiometricModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl relative"
            >
              <button 
                onClick={() => setShowBiometricModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-zinc-100 mb-2">Enable Biometrics</h2>
              <p className="text-zinc-400 text-sm mb-6">
                Register your device to unlock PulseFit securely without a PIN.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                     setShowBiometricModal(false);
                     handleBiometricAuth('fingerprint');
                  }}
                  className="w-full flex items-center gap-4 bg-zinc-800/50 hover:bg-zinc-800 p-4 rounded-xl border border-zinc-700/50 transition-all active:scale-[0.98]"
                >
                  <div className="bg-emerald-900/30 p-2 rounded-lg text-emerald-400">
                    <Fingerprint className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-zinc-200 font-medium">Fingerprint</div>
                    <div className="text-zinc-500 text-xs">Touch ID / Fingerprint Scanner</div>
                  </div>
                </button>
                
                <button
                  onClick={() => {
                     setShowBiometricModal(false);
                     handleBiometricAuth('face');
                  }}
                  className="w-full flex items-center gap-4 bg-zinc-800/50 hover:bg-zinc-800 p-4 rounded-xl border border-zinc-700/50 transition-all active:scale-[0.98]"
                >
                  <div className="bg-blue-900/30 p-2 rounded-lg text-blue-400">
                    <ScanFace className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="text-zinc-200 font-medium">Face ID</div>
                    <div className="text-zinc-500 text-xs">Facial Recognition</div>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`;

fs.writeFileSync('src/components/PinPad.tsx', componentCode);
