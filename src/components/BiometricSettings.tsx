import { useState, useEffect } from 'react';
import { BiometricService } from '../services/BiometricService';
import { Fingerprint, Shield, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { FingerprintScanner } from './FingerprintScanner';

export function BiometricSettings() {
  const [isSupported, setIsSupported] = useState(true);
  const [isEnabled, setIsEnabled] = useState<boolean>(() =>
    BiometricService.hasEnrolledBiometricSync()
  );
  const [loading, setLoading] = useState(true);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerMode, setScannerMode] = useState<'setup' | 'auth'>('setup');

  const refreshEnclaveState = async () => {
    const supported = await BiometricService.isSupported();
    setIsSupported(supported);
    if (supported) {
      const hasBio = await BiometricService.hasEnrolledBiometric();
      setIsEnabled(hasBio);
    }
    setLoading(false);
  };

  useEffect(() => {
    refreshEnclaveState();
  }, []);

  const handleToggle = async () => {
    if (isEnabled) {
      await BiometricService.removeEnrolledBiometric();
      setIsEnabled(false);
    } else {
      setScannerMode('setup');
      setShowScanner(true);
    }
  };

  const handleScannerSuccess = async () => {
    setShowScanner(false);
    await refreshEnclaveState();
  };

  if (loading) {
    return (
      <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl animate-pulse flex h-24"></div>
    );
  }

  if (!isSupported) {
    return (
      <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-red-50 p-2 rounded-lg">
            <ShieldAlert className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-bold text-zinc-800">Fingerprint Lock</h3>
        </div>
        <p className="text-zinc-500 text-sm">
          Fingerprint unlock is not available on this device.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-2xl shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'p-2.5 rounded-xl',
                isEnabled ? 'bg-emerald-500/15 text-emerald-600' : 'bg-zinc-200 text-zinc-500'
              )}
            >
              {isEnabled ? <Shield className="w-5 h-5" /> : <Fingerprint className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-zinc-800">Fingerprint Lock</h3>
              <p className="text-zinc-500 text-sm mt-0.5">
                {isEnabled
                  ? '3 / 3 Phases Completed • Permanently Saved'
                  : 'Set your fingerprint once in 3 phases to unlock the app.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleToggle}
            className={cn(
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
              isEnabled ? 'bg-emerald-500' : 'bg-zinc-300'
            )}
            role="switch"
            aria-checked={isEnabled}
          >
            <span
              aria-hidden="true"
              className={cn(
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                isEnabled ? 'translate-x-5' : 'translate-x-0'
              )}
            />
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isEnabled ? 'auto' : 0, opacity: isEnabled ? 1 : 0 }}
          className="overflow-hidden"
        >
          {isEnabled && (
            <div className="pt-3 mt-3 border-t border-zinc-200/80 flex items-center justify-between flex-wrap gap-2">
              <p className="text-emerald-600 font-bold text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Fingerprint Active (3 / 3 Phases Saved)
              </p>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showScanner && (
          <FingerprintScanner
            mode={scannerMode}
            forceReEnroll={scannerMode === 'setup'}
            onSuccess={handleScannerSuccess}
            onCancel={() => setShowScanner(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
