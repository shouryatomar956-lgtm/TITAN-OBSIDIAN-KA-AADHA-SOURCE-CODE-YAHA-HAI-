import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { UserProfile, storage } from '../services/storage';
import { PinPad } from './PinPad';

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  { id: 'start', title: 'Welcome to PulseFit' },
  { id: 'experience', title: 'Experience Level', options: ['Beginner', 'Intermediate', 'Advanced'] },
  { id: 'goal', title: 'Primary Goal', options: ['Muscle Gain', 'Fat Loss', 'Endurance', 'General Fitness'] },
  { id: 'ageBracket', title: 'Age Bracket', options: ['18-24', '25-34', '35-44', '45-54', '55+'] },
  { id: 'physicalConstraints', title: 'Physical Constraints & Injuries', options: ['None', 'Lower Back Pain', 'Knee Sensitivity', 'Shoulder Issues', 'Wrist/Elbow Pain', 'Neck Stiffness'], isMulti: true },
  { id: 'location', title: 'Training Preference', options: ['Gym Membership', 'Home (Bodyweight & Backpack)', 'Hybrid'] },
  { id: 'equipmentInventory', title: 'Available Equipment', isMulti: true,
    options: [
      // Home
      'Bodyweight', 'Backpack-weighted', 'Minimal Structural Support', 'Resistance Bands',
      // Gym
      'Olympic Barbell', 'Heavy Cable Machine Stack', 'Commercial Power Rack', 'Pin-loaded Leverage System'
    ]
  },
  { id: 'bodyType', title: 'Body Type', options: ['Ectomorph (Lean)', 'Mesomorph (Athletic)', 'Endomorph (Heavy)'] },
  { id: 'heightWeight', title: 'Height & Weight' },
  { id: 'gender', title: 'Gender', options: ['Male', 'Female', 'Other', 'Prefer not to say'] }
];

export function OnboardingWizard({ onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const [username, setUsername] = useState('');
  const [draftUsername, setDraftUsername] = useState('');
  const [pin, setPin] = useState('');
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    experienceLevel: '',
    primaryGoal: '',
    workoutLocation: '',
    bodyType: '',
    height: '',
    weight: '',
    gender: '',
    ageBracket: '',
    physicalConstraints: [],
    equipmentInventory: []
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = async () => {
    const fullProfile: UserProfile = {
      username: username || 'Athlete',
      pin,
      experienceLevel: profile.experienceLevel || 'Skipped',
      primaryGoal: profile.primaryGoal || 'Skipped',
      workoutLocation: profile.workoutLocation || 'Skipped',
      bodyType: profile.bodyType || 'Skipped',
      height: profile.height || 'Skipped',
      weight: profile.weight || 'Skipped',
      gender: profile.gender || 'Skipped',
      ageBracket: profile.ageBracket || 'Skipped',
      physicalConstraints: profile.physicalConstraints || [],
      equipmentInventory: profile.equipmentInventory || []
    };
    await storage.saveUserProfile(fullProfile);
    onComplete();
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    if (step.id === 'start') {
      if (!username) {
        return (
          <div className="flex flex-col justify-center h-full max-w-sm mx-auto w-full px-4">
             <h1 className="text-3xl font-bold mb-2 tracking-tight">Create Athlete Profile</h1>
             <p className="text-zinc-400 mb-10">Enter your alias to get started.</p>
             <input 
               type="text" 
               placeholder="Username"
               value={draftUsername}
               onChange={(e) => setDraftUsername(e.target.value)}
               className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-5 text-lg text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors mb-6 shadow-sm"
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && draftUsername.trim()) {
                   setUsername(draftUsername.trim());
                 }
               }}
             />
             <button 
                onClick={() => {
                  if (draftUsername.trim()) setUsername(draftUsername.trim());
                }}
                disabled={!draftUsername.trim()}
                className="w-full bg-zinc-100 text-zinc-900 rounded-2xl py-4 font-bold flex justify-center items-center gap-2 hover:bg-white active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:active:scale-100"
             >
               Continue <ChevronRight className="w-5 h-5" />
             </button>
          </div>
        );
      }
      if (!pin) {
        return <PinPad title="Create a 4-Digit PIN" subtitle="This will secure your session." onComplete={(p) => {
           setPin(p);
           setTimeout(() => handleNext(), 300);
        }} />;
      }
      return null;
    }

    if (step.id === 'heightWeight') {
      return (
        <div className="flex flex-col justify-center h-full max-w-sm mx-auto w-full px-4">
          <h2 className="text-2xl font-bold mb-8 tracking-tight">{step.title}</h2>
          <div className="space-y-4 mb-8">
            <input 
               type="text" 
               placeholder="Height (e.g. 180cm)"
               value={profile.height || ''}
               onChange={e => setProfile({...profile, height: e.target.value})}
               className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-5 text-white focus:outline-none focus:border-zinc-500 transition-colors shadow-sm"
             />
             <input 
               type="text" 
               placeholder="Weight (e.g. 75kg)"
               value={profile.weight || ''}
               onChange={e => setProfile({...profile, weight: e.target.value})}
               className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-5 text-white focus:outline-none focus:border-zinc-500 transition-colors shadow-sm"
             />
          </div>
          <button 
             onClick={handleNext}
             className="w-full bg-zinc-100 text-zinc-900 rounded-2xl py-4 font-bold flex justify-center items-center gap-2 hover:bg-white active:scale-95 transition-all shadow-sm"
          >
            Continue <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      );
    }

    const isMulti = step.isMulti;
    const selectedList = isMulti 
      ? ((profile[step.id as keyof UserProfile] as string[]) || [])
      : [];
    const hasSelection = isMulti ? selectedList.length > 0 : !!profile[step.id as keyof UserProfile];

    return (
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full px-4 h-full relative min-h-0">
        <div className="flex-1 overflow-y-auto pt-16 pb-4 scrollbar-none">
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">{step.title}</h2>
          {isMulti ? (
            <p className="text-xs text-zinc-400 mb-6 font-medium">Select available equipment, then tap Continue</p>
          ) : (
            <div className="mb-6" />
          )}

          <div className="space-y-3 pb-4">
            {step.options?.map(opt => {
              const isSelected = isMulti 
                ? selectedList.includes(opt)
                : profile[step.id as keyof UserProfile] === opt;
                
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (isMulti) {
                      const currentArr = (profile[step.id as keyof UserProfile] as string[]) || [];
                      let newArr: string[];
                      if (step.id === 'physicalConstraints') {
                        if (opt === 'None') {
                          newArr = ['None'];
                        } else {
                          const withoutNone = currentArr.filter(i => i !== 'None');
                          newArr = withoutNone.includes(opt) ? withoutNone.filter(i => i !== opt) : [...withoutNone, opt];
                        }
                      } else {
                        newArr = currentArr.includes(opt) ? currentArr.filter(i => i !== opt) : [...currentArr, opt];
                      }
                      setProfile({ ...profile, [step.id]: newArr });
                    } else {
                      setProfile({ ...profile, [step.id]: opt });
                      setTimeout(handleNext, 150);
                    }
                  }}
                  className={`w-full border rounded-2xl p-4 sm:p-5 text-left font-medium active:scale-98 transition-all shadow-sm flex items-center justify-between ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold' 
                      : 'bg-zinc-900/60 border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700 text-zinc-200'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sticky Action Footer - Always visible above the fold */}
        {isMulti && (
          <div className="shrink-0 pt-3 pb-8 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)] to-transparent border-t border-zinc-800/40 mt-auto flex flex-col gap-2 z-20">
            <button 
              type="button"
              onClick={handleNext}
              className={`w-full rounded-2xl py-4 font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-95 ${
                hasSelection 
                  ? 'bg-zinc-100 text-zinc-900 hover:bg-white cursor-pointer ring-2 ring-emerald-500/20' 
                  : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer'
              }`}
            >
              <span>{hasSelection ? `Continue (${selectedList.length} selected)` : 'Continue'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <button 
              type="button"
              onClick={handleNext} 
              className="text-xs text-zinc-500 hover:text-zinc-300 font-medium py-1 transition-colors text-center cursor-pointer"
            >
              Skip this step
            </button>
          </div>
        )}

        {!isMulti && (
          <div className="shrink-0 pb-8 text-center">
            <button 
              type="button"
              onClick={handleNext} 
              className="text-sm text-zinc-500 hover:text-zinc-300 font-medium pb-4 transition-colors cursor-pointer"
            >
              Skip this step
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen max-h-screen bg-[var(--bg-main)] text-zinc-100 flex flex-col relative overflow-hidden">
      {currentStep > 0 && currentStep < steps.length && (
         <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 z-10">
           <motion.div 
             className="h-full bg-zinc-400"
             initial={{ width: 0 }}
             animate={{ width: `${(currentStep / steps.length) * 100}%` }}
           />
         </div>
      )}
      
      {currentStep > 0 && username && pin && (
        <button 
          onClick={() => setCurrentStep(s => s - 1)}
          className="absolute top-8 left-4 p-2 text-zinc-500 hover:text-zinc-300 z-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep + (username ? '-u' : '') + (pin ? '-p' : '')}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col min-h-0 overflow-hidden"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
