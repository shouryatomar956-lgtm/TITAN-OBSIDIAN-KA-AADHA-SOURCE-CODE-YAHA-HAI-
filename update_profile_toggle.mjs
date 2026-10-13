import fs from 'fs';

// 1. Write UserProfileSettings.tsx
const userProfileCode = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ChevronDown, ChevronUp, Shield } from 'lucide-react';
import { storage, UserProfile } from '../services/storage';
import { BiometricSettings } from './BiometricSettings';

export function UserProfileSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    storage.getUserProfile().then(setProfile);
  }, []);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl shadow-sm overflow-hidden backdrop-blur-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="bg-blue-900/30 p-3 rounded-xl text-blue-400">
            <User className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-zinc-100">User Profile & Security</h3>
            <p className="text-zinc-400 text-sm mt-1">Manage your identity and biometric authentication</p>
          </div>
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-zinc-800/50"
          >
            <div className="p-6 space-y-6">
              {profile && (
                <div className="grid grid-cols-2 gap-4 text-sm bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800/30">
                  <div>
                    <span className="text-zinc-500 block mb-1 text-xs uppercase tracking-wider font-semibold">Username</span>
                    <span className="font-medium text-zinc-200 capitalize">{profile.username || 'Athlete'}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1 text-xs uppercase tracking-wider font-semibold">Experience</span>
                    <span className="font-medium text-zinc-200 capitalize">{profile.experienceLevel}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1 text-xs uppercase tracking-wider font-semibold">Goal</span>
                    <span className="font-medium text-zinc-200 capitalize">{profile.primaryGoal}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block mb-1 text-xs uppercase tracking-wider font-semibold">Location</span>
                    <span className="font-medium text-zinc-200 capitalize">{profile.workoutLocation}</span>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-bold tracking-widest text-zinc-500 uppercase mb-4 flex items-center gap-2">
                   <Shield className="w-4 h-4" /> Hardware Security
                </h4>
                <div className="relative">
                   <div className="absolute inset-0 bg-zinc-900 rounded-2xl -z-10 shadow-inner opacity-50"></div>
                   <BiometricSettings />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`;

fs.writeFileSync('src/components/UserProfileSettings.tsx', userProfileCode);

// 2. Update Dashboard.tsx
let dashboard = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

dashboard = dashboard.replace(
  `import { BiometricSettings } from './BiometricSettings';`,
  `import { UserProfileSettings } from './UserProfileSettings';`
);

const oldSection = `<section className="space-y-4">
                <h3 className="text-sm font-semibold tracking-tight text-zinc-400 uppercase">Security</h3>
                <BiometricSettings />
             </section>`;
             
const newSection = `<section className="space-y-4">
                <UserProfileSettings />
             </section>`;

dashboard = dashboard.replace(oldSection, newSection);
fs.writeFileSync('src/components/Dashboard.tsx', dashboard);
