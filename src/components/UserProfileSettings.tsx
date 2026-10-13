import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, ChevronDown, ChevronUp, Shield, MapPin, Loader2, BatteryCharging } from 'lucide-react';
import { storage, UserProfile } from '../services/storage';
import { BiometricSettings } from './BiometricSettings';
import { GeolocationService } from '../services/GeolocationService';
import { batterySaverService } from '../services/batterySaverService';

export function UserProfileSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [batterySaver, setBatterySaver] = useState<boolean>(() => batterySaverService.isEnabled());

  useEffect(() => {
    const loadProfile = () => {
      storage.getUserProfile().then(setProfile);
    };
    loadProfile();
    const unsubBattery = batterySaverService.subscribe(setBatterySaver);
    window.addEventListener('pulsefit_profile_updated', loadProfile);
    return () => {
      unsubBattery();
      window.removeEventListener('pulsefit_profile_updated', loadProfile);
    };
  }, []);

  const handleUpdateLocation = async () => {
    setIsLocating(true);
    setLocationError('');
    try {
      const locationData = await GeolocationService.getCurrentLocation();
      if (profile) {
        const updated = { 
          ...profile, 
          workoutLocation: locationData.formattedAddress || `${locationData.city || ''}, ${locationData.country || ''}`,
          locationLat: locationData.latitude,
          locationLng: locationData.longitude,
          locationAccuracy: locationData.accuracy,
          city: locationData.city,
          state: locationData.state,
          country: locationData.country
        };
        await storage.saveUserProfile(updated);
        setProfile(updated);
      }
    } catch (e: any) {
      console.error("Failed to set location name", e);
      setLocationError(e.message || 'Failed to get location');
    } finally {
      setIsLocating(false);
    }
  };

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
            <p className="text-zinc-400 text-sm mt-1">Manage your profile, battery saver, and fingerprint lock</p>
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
                    <div className="flex items-center gap-2">
                       <span className="font-medium text-zinc-200 capitalize">{profile.workoutLocation}</span>
                       <button 
                          onClick={(e) => { e.stopPropagation(); handleUpdateLocation(); }} 
                          disabled={isLocating} 
                          title="Detect Current Location"
                          className="text-zinc-500 hover:text-blue-400 transition-colors disabled:opacity-50"
                       >
                          {isLocating ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                       </button>
                    </div>
                    {locationError && <span className="text-red-400 text-xs mt-1 block">{locationError}</span>}
                  </div>
                </div>
              )}

              {/* Battery Saver Toggle */}
              <div className="p-5 bg-zinc-950/50 border border-zinc-800/40 rounded-2xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${batterySaver ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    <BatteryCharging className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-100">Battery Saver</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      {batterySaver
                        ? 'ON: Heavy background loops suspended; real-time event data active.'
                        : 'OFF: All 24×7 continuous background solvers running at peak rate.'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => batterySaverService.toggle()}
                  role="switch"
                  aria-checked={batterySaver}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    batterySaver ? 'bg-emerald-500' : 'bg-zinc-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${
                      batterySaver ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

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
