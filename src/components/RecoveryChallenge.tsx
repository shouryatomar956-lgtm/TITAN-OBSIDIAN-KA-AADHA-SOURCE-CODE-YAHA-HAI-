import { useState, useEffect } from 'react';
import localforage from 'localforage';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, storage } from '../services/storage';
import { PinPad } from './PinPad';
import { ChevronRight, ArrowLeft, ShieldAlert, Fingerprint, History, Trash2, KeyRound } from 'lucide-react';
import { BiometricService } from '../services/BiometricService';
import { zkBiometricEnclave } from '../services/zeroKnowledgeBiometricEnclave';
import { FingerprintScanner } from './FingerprintScanner';

interface RecoveryProps {
  onRecovered: () => void;
  onCancel: () => void;
}

type RecoveryMode = 'HUB' | 'PREVIOUS_PIN' | 'BIOMETRIC' | 'QUESTIONS' | 'WIPE_WARNING' | 'WIPE_CONFIRM' | 'RESET_PIN';

export function RecoveryChallenge({ onRecovered, onCancel }: RecoveryProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [mode, setMode] = useState<RecoveryMode>('HUB');
  
  // Previous PIN state
  const [prevPinInput, setPrevPinInput] = useState('');
  
  // Questions state
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  // Wipe state
  const [wipeInput, setWipeInput] = useState('');
  
  const [error, setError] = useState('');
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    storage.getUserProfile().then(setProfile);
    BiometricService.isSupported().then(async (supported) => {
      if (supported) {
        const hasRealBio = await BiometricService.hasEnrolledBiometric();
        setHasBiometrics(hasRealBio);
      }
    });
  }, []);

  const fields = [
    { key: 'experienceLevel', title: 'Experience Level' },
    { key: 'primaryGoal', title: 'Primary Goal' },
    { key: 'workoutLocation', title: 'Workout Location' },
    { key: 'bodyType', title: 'Body Type' },
    { key: 'height', title: 'Height' },
    { key: 'weight', title: 'Weight' },
    { key: 'gender', title: 'Gender' },
  ];

  // Helper to check if 72 hours passed
  const isWithin72Hours = () => {
      if (!profile?.pinUpdatedAt) return false;
      const updated = new Date(profile.pinUpdatedAt).getTime();
      const now = new Date().getTime();
      return (now - updated) < (72 * 60 * 60 * 1000);
  };

  const handleVerifyPreviousPin = async () => {
      if (profile?.previousPin && isWithin72Hours()) {
          const isValid = await zkBiometricEnclave.verifyPreviousPinOrPassword(prevPinInput, profile.previousPin);
          if (isValid) {
              setMode('RESET_PIN');
              return;
          }
      }
      setError('Incorrect previous PIN or 72-hour window expired.');
  };

  const handleVerifyQuestions = () => {
    if (!profile) return;
    
    const isValid = fields.every(f => {
       const userValue = profile[f.key as keyof UserProfile]?.toString().toLowerCase().trim() || 'skipped';
       const enteredValue = answers[f.key]?.toString().toLowerCase().trim() || 'skipped';
       return userValue === enteredValue;
    });

    if (isValid) {
       setMode('RESET_PIN');
    } else {
       setError('Identity verification failed. Parameters do not match the stored profile.');
    }
  };

  const handleNextQuestion = () => {
     setError('');
     if (step < fields.length - 1) {
       setStep(s => s + 1);
     } else {
       handleVerifyQuestions();
     }
  };

  const handleBiometricOverride = () => {
      setError('');
      setShowScanner(true);
  };
  
  const handleScannerSuccess = () => {
      setShowScanner(false);
      setMode('RESET_PIN');
  };

  const handleFactoryReset = async () => {
      await storage.factoryReset();
      window.location.reload();
  };

  if (!profile) return null;

  if (mode === 'RESET_PIN') {
    return (
       <PinPad
         title="Set New PIN"
         subtitle="Identity verified. Enter a new 4-digit PIN."
         onComplete={async (newPin) => {
            await storage.updatePin(newPin);
            onRecovered();
         }}
       />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-main)] text-zinc-100 relative p-4 pb-12">
       <button onClick={() => {
           if (mode === 'HUB') onCancel();
           else setMode('HUB');
       }} className="absolute top-8 left-4 p-2 text-zinc-500 hover:text-zinc-300 z-10 transition-colors">
         <ArrowLeft className="w-6 h-6" />
       </button>
       
       <div className="max-w-sm mx-auto w-full pt-16 flex-1 flex flex-col">
         <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2 tracking-tight">Recovery Options</h1>
            <p className="text-zinc-400 text-sm">Select a method to recover your account or reset the application.</p>
         </div>

         <AnimatePresence mode="wait">
            {mode === 'HUB' && (
                <motion.div
                    key="hub"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                >
                    {profile.previousPin && isWithin72Hours() && (
                        <button onClick={() => { setError(''); setMode('PREVIOUS_PIN'); }} className="w-full flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl hover:bg-zinc-800 transition-all text-left">
                            <div className="bg-blue-900/30 p-3 rounded-xl text-blue-400"><History className="w-6 h-6" /></div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-zinc-200">Previous PIN</h3>
                                <p className="text-xs text-zinc-500">Available within 72 hours of change</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-600" />
                        </button>
                    )}

                    {hasBiometrics && (
                        <button onClick={() => { setError(''); setMode('BIOMETRIC'); handleBiometricOverride(); }} className="w-full flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl hover:bg-zinc-800 transition-all text-left">
                            <div className="bg-emerald-900/30 p-3 rounded-xl text-emerald-400"><Fingerprint className="w-6 h-6" /></div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-zinc-200">Fingerprint Unlock</h3>
                                <p className="text-xs text-zinc-500">Use registered Face/Touch ID</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-zinc-600" />
                        </button>
                    )}

                    <button onClick={() => { setError(''); setStep(0); setMode('QUESTIONS'); }} className="w-full flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl hover:bg-zinc-800 transition-all text-left">
                        <div className="bg-purple-900/30 p-3 rounded-xl text-purple-400"><KeyRound className="w-6 h-6" /></div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-zinc-200">Security Questions</h3>
                            <p className="text-xs text-zinc-500">Answer your onboarding profile parameters</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-600" />
                    </button>

                    <div className="pt-8 mt-8 border-t border-zinc-800">
                        <button onClick={() => { setError(''); setWipeInput(''); setMode('WIPE_WARNING'); }} className="w-full flex items-center gap-4 bg-red-950/20 border border-red-900/30 p-4 rounded-2xl hover:bg-red-900/30 transition-all text-left">
                            <div className="bg-red-900/50 p-3 rounded-xl text-red-400"><Trash2 className="w-6 h-6" /></div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-red-400">Factory Reset</h3>
                                <p className="text-xs text-red-500/70">Permanently wipe all data & settings</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-red-900" />
                        </button>
                    </div>
                </motion.div>
            )}

            {mode === 'PREVIOUS_PIN' && (
                <motion.div
                    key="prev_pin"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full flex flex-col items-center"
                >
                    <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 mb-6 shadow-sm"><History className="w-8 h-8 text-zinc-400" /></div>
                    <h2 className="text-xl font-semibold mb-2">Enter Previous PIN</h2>
                    <p className="text-sm text-zinc-500 mb-8 text-center">Since you changed your PIN recently, you can use your old PIN to reset it.</p>
                    
                    <input
                        type="password"
                        inputMode="numeric"
                        maxLength={4}
                        autoFocus
                        value={prevPinInput}
                        onChange={e => setPrevPinInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center tracking-widest text-3xl bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-5 text-white focus:outline-none focus:border-zinc-500 mb-6 shadow-sm"
                    />
                    
                    {error && <p className="text-red-400 text-sm mb-6 font-medium text-center">{error}</p>}
                    
                    <button onClick={handleVerifyPreviousPin} disabled={prevPinInput.length !== 4} className="w-full bg-zinc-100 text-zinc-900 rounded-2xl py-4 font-bold disabled:opacity-50 transition-all">Verify</button>
                </motion.div>
            )}

            {mode === 'BIOMETRIC' && (
                <motion.div
                    key="biometric"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="w-full flex flex-col items-center justify-center pt-12"
                >
                    <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 mb-6 animate-pulse"><Fingerprint className="w-12 h-12 text-emerald-500" /></div>
                    <h2 className="text-xl font-semibold mb-2 text-center">Waiting for Fingerprint</h2>
                    <p className="text-sm text-zinc-500 mb-8 text-center">Follow your device prompt to verify.</p>
                    {error && <p className="text-red-400 text-sm mb-6 font-medium text-center">{error}</p>}
                    {error && <button onClick={handleBiometricOverride} className="bg-zinc-800 px-6 py-3 rounded-full text-zinc-300 font-medium">Try Again</button>}
                </motion.div>
            )}

            {mode === 'QUESTIONS' && (
                <motion.div
                    key={`question_${step}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full"
                >
                    <div className="flex gap-1 mb-8">
                        {fields.map((_, i) => (
                            <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-zinc-400' : 'bg-zinc-800'}`} />
                        ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-6 tracking-tight">{fields[step].title}</h2>
                    <input
                        type="text"
                        autoFocus
                        placeholder="Enter exactly as registered..."
                        value={answers[fields[step].key] || ''}
                        onChange={e => setAnswers({...answers, [fields[step].key]: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-5 text-white focus:outline-none focus:border-zinc-500 mb-6 shadow-sm"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleNextQuestion(); }}
                    />
                    
                    {error && <p className="text-red-400 text-sm mb-6 font-medium text-center">{error}</p>}
                    
                    <button onClick={handleNextQuestion} className="w-full bg-zinc-100 text-zinc-900 rounded-2xl py-4 font-bold flex justify-center items-center gap-2 hover:bg-white active:scale-95 transition-all shadow-sm">
                        {step === fields.length - 1 ? 'Verify Identity' : 'Next'} <ChevronRight className="w-5 h-5" />
                    </button>
                </motion.div>
            )}

            {mode === 'WIPE_WARNING' && (
                <motion.div
                    key="wipe_warn"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full bg-red-950/20 border border-red-900/30 rounded-3xl p-6"
                >
                    <div className="bg-red-900/50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                        <ShieldAlert className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-red-400 mb-4">Warning: Data Loss</h2>
                    <p className="text-sm text-red-300/80 mb-6 leading-relaxed">
                        Resetting the app will permanently wipe all your local workout data, streaks, and custom settings stored on this device.
                    </p>
                    <p className="text-sm font-medium text-zinc-300 mb-3">Type RESET to proceed:</p>
                    <input
                        type="text"
                        placeholder="RESET"
                        value={wipeInput}
                        onChange={e => setWipeInput(e.target.value)}
                        className="w-full bg-zinc-900 border border-red-900/50 rounded-xl px-4 py-3 text-red-400 placeholder:text-red-900/50 focus:outline-none focus:border-red-500 mb-8 font-mono tracking-widest uppercase"
                    />
                    <button 
                        disabled={wipeInput.trim().toUpperCase() !== 'RESET'}
                        onClick={() => setMode('WIPE_CONFIRM')} 
                        className="w-full bg-red-600 text-white rounded-xl py-4 font-bold disabled:opacity-50 disabled:bg-zinc-800 disabled:text-zinc-500 transition-all"
                    >
                        Continue to Factory Reset
                    </button>
                </motion.div>
            )}

            {mode === 'WIPE_CONFIRM' && (
                <motion.div
                    key="wipe_confirm"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full flex flex-col items-center justify-center pt-8 text-center"
                >
                    <div className="bg-red-900/20 p-6 rounded-full border border-red-900/50 mb-6 animate-pulse">
                        <Trash2 className="w-12 h-12 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-red-500 mb-2">Final Confirmation</h2>
                    <p className="text-zinc-400 mb-8">This action cannot be undone. All local data will be permanently destroyed.</p>
                    <div className="w-full space-y-3">
                        <button onClick={handleFactoryReset} className="w-full bg-red-600 text-white rounded-xl py-4 font-bold hover:bg-red-700 transition-all">Yes, Wipe Everything</button>
                        <button onClick={() => setMode('HUB')} className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl py-4 font-medium hover:bg-zinc-800 transition-all">Cancel</button>
                    </div>
                </motion.div>
            )}
         </AnimatePresence>

         <AnimatePresence>
           {showScanner && (
             <FingerprintScanner
               mode="auth"
               onSuccess={handleScannerSuccess}
               onCancel={() => {
                 setShowScanner(false);
                 setMode('HUB');
               }}
             />
           )}
         </AnimatePresence>
       </div>
    </div>
  );
}
