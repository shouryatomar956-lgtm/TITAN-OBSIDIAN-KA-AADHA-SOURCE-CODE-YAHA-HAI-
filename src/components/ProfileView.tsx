import { useState, useEffect, useRef } from 'react';
import { storage, UserProfile } from '../services/storage';
import { zkBiometricEnclave } from '../services/zeroKnowledgeBiometricEnclave';
import { User, Activity, MapPin, RefreshCw, Sparkles, Navigation, Edit2, Check, X, Volume2, VolumeX, Mic, BatteryCharging, Zap, KeyRound, ShieldCheck, Download, Upload, Database, HardDrive, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { BMIWidget } from './BMIWidget';
import { BiometricSettings } from './BiometricSettings';
import { GeolocationService } from '../services/GeolocationService';
import { voiceCoach } from '../services/voiceCoachService';
import { batterySaverService } from '../services/batterySaverService';
import { triggerHapticFeedback } from '../utils/haptics';
import { offlineBackupEngine, RestoreResult } from '../services/offlineBackupEngine';
import { InteractiveProductManual } from './InteractiveProductManual';





const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <section className={cn("bg-white/60 backdrop-blur-xl border border-white shadow-sm rounded-[32px] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden", className)}>
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/40 rounded-full blur-3xl pointer-events-none"></div>
    <div className="relative z-10 flex flex-col gap-6 h-full">
      {children}
    </div>
  </section>
);

const EditableField = ({ 
   label, 
   fieldKey, 
   options,
  placeholder,
  isEditing,
  profile,
  editProfile,
  onChange
}: { 
   label: string, 
   fieldKey: keyof UserProfile, 
   options?: string[],
  placeholder?: string,
  isEditing: boolean,
  profile: Partial<UserProfile>,
  editProfile: Partial<UserProfile>,
  onChange: (key: keyof UserProfile, value: string) => void
}) => {
  const displayValue = isEditing ? editProfile[fieldKey] : profile[fieldKey];
  
  if (!isEditing && !displayValue) return null;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{label}</label>
      {isEditing ? (
        options ? (
          <select 
            value={(displayValue as string) || ''}
            onChange={e => onChange(fieldKey, e.target.value)}
            className="w-full bg-white/50 border border-white/60 text-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all"
          >
            <option value="">Select...</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        ) : (
          <input 
            type="text"
            placeholder={placeholder}
            value={(displayValue as string) || ''}
            onChange={e => onChange(fieldKey, e.target.value)}
            className="w-full bg-white/50 border border-white/60 text-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm transition-all placeholder:text-zinc-400"
          />
        )
      ) : (
        <div className="text-sm font-bold text-zinc-700 bg-white/40 px-4 py-3 rounded-xl border border-white/40 shadow-sm">{displayValue as string}</div>
      )}
    </div>
  );
};

export function ProfileView() {
  const [profile, setProfile] = useState<Partial<UserProfile>>({});
  const [editProfile, setEditProfile] = useState<Partial<UserProfile>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [batterySaver, setBatterySaver] = useState<boolean>(() => batterySaverService.isEnabled());
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [pinUpdateMsg, setPinUpdateMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [updatingPin, setUpdatingPin] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  const handleUpdatePin = async () => {
    setPinUpdateMsg(null);
    if (currentPinInput.length !== 4 || newPinInput.length !== 4) {
      setPinUpdateMsg({ type: 'error', text: 'Both current and new PIN must be 4 digits.' });
      return;
    }
    setUpdatingPin(true);
    try {
      const storedProfile = await storage.getUserProfile();
      const verifyRes = await zkBiometricEnclave.verifyPinOrPassword(
        currentPinInput,
        storedProfile?.pin || profile.pin
      );
      if (!verifyRes.verified) {
        setPinUpdateMsg({
          type: 'error',
          text: 'Current PIN verification failed! Enter your exact registered PIN.',
        });
        setUpdatingPin(false);
        return;
      }
      await storage.updatePin(newPinInput);
      const refreshed = await storage.getUserProfile();
      if (refreshed) setProfile(refreshed);
      setCurrentPinInput('');
      setNewPinInput('');
      setPinUpdateMsg({
        type: 'success',
        text: 'Security PIN updated successfully!',
      });
      triggerHapticFeedback('heavy');
    } catch {
      setPinUpdateMsg({ type: 'error', text: 'Failed to update security PIN.' });
    } finally {
      setUpdatingPin(false);
    }
  };

  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreResult, setRestoreResult] = useState<RestoreResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportBackup = async () => {
    setIsExporting(true);
    setExportStatus(null);
    triggerHapticFeedback('medium');
    try {
      const { filename, manifest } = await offlineBackupEngine.exportBackup();
      setExportStatus(`Exported ${manifest.totalKeys} records (${(manifest.byteSize / 1024).toFixed(1)} KB) to ${filename}`);
      triggerHapticFeedback('heavy');
    } catch (err: any) {
      setExportStatus(`Export failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsRestoring(true);
    setRestoreResult(null);
    triggerHapticFeedback('medium');
    try {
      const res = await offlineBackupEngine.restoreBackup(file);
      setRestoreResult(res);
      if (res.success) {
        triggerHapticFeedback('heavy');
        const refreshed = await storage.getUserProfile();
        if (refreshed) {
          setProfile(refreshed);
          setEditProfile(refreshed);
        }
      }
    } catch (err: any) {
      setRestoreResult({
        success: false,
        keysRestored: 0,
        username: '',
        exportedAt: '',
        message: err.message || 'Restore error',
        error: err.message
      });
    } finally {
      setIsRestoring(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    storage.getUserProfile().then(p => {
      if (p) {
        setProfile(p);
      }
      setLoading(false);
    });

    voiceCoach.getVoiceEnabled().then(v => {
      setVoiceEnabled(v);
    });

    const unsubBattery = batterySaverService.subscribe((enabled) => {
      setBatterySaver(enabled);
    });

    return () => {
      unsubBattery();
    };
  }, []);

  const handleToggleVoice = async () => {
    const next = !voiceEnabled;
    setVoiceEnabled(next);
    await voiceCoach.setVoiceEnabled(next);
    if (next) {
      voiceCoach.speak("PulseFit AI Coach Voice is active.", { force: true });
    }
  };

  const handleToggleBatterySaver = async () => {
    triggerHapticFeedback('light');
    const next = !batterySaver;
    setBatterySaver(next);
    await batterySaverService.setEnabled(next);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    try {
      await storage.saveUserProfile(newProfile as UserProfile);
    } catch (e) {
      console.error("Local persistence error", e);
    }
  };

  const handleSave = () => {
    updateProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile({});
    setIsEditing(false);
  };

  const startEditing = () => {
    setEditProfile({ ...profile });
    setIsEditing(true);
  };

  const handleLocationUpdate = async () => {
    setIsLocating(true);
    try {
      const locationData = await GeolocationService.getCurrentLocation();
      updateProfile({
        locationLat: locationData.latitude,
        locationLng: locationData.longitude,
        locationAccuracy: locationData.accuracy,
        locationName: locationData.formattedAddress || `${locationData.city || ''}${locationData.country ? `, ${locationData.country}` : ''}`,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country
      });
      voiceCoach.speak(`Location updated: ${locationData.city || ''}${locationData.country ? `, ${locationData.country}` : ''}.`);
    } catch (error: any) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_toast', { detail: { message: error.message || "Could not fetch location." } }));
      }
      console.error("Error obtaining location", error);
    } finally {
      setIsLocating(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-full p-8"><RefreshCw className="animate-spin w-8 h-8 text-zinc-400" /></div>;
  }

  // Parse height and weight to numbers for the BMI widget
  const parseNumber = (val: any) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const parsed = parseFloat(val.replace(/[^0-9.]/g, ''));
      return isNaN(parsed) ? undefined : parsed;
    }
    return undefined;
  };

  const heightNum = parseNumber(isEditing ? editProfile.height : profile.height) || parseNumber(isEditing ? editProfile.heightCm : profile.heightCm);
  const weightNum = parseNumber(isEditing ? editProfile.weight : profile.weight) || parseNumber(isEditing ? editProfile.weightKg : profile.weightKg);

  

  

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col p-4 sm:p-6 pb-24 space-y-6 animate-in fade-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 px-2 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0">
            <User className="w-7 h-7" />
          </div>
          <div className="flex-1 min-w-[120px]">
            {isEditing ? (
              <input 
                type="text"
                value={editProfile.username || ''}
                onChange={e => setEditProfile({...editProfile, username: e.target.value})}
                placeholder="Username"
                className="text-2xl font-black text-zinc-800 tracking-tight bg-white/80 border-2 border-indigo-100 focus:border-indigo-400 rounded-xl px-3 py-1 outline-none w-full max-w-[200px]"
              />
            ) : (
              <h1 className="text-2xl font-black text-zinc-800 tracking-tight">{profile.username || 'Athlete'}</h1>
            )}
            <p className="text-sm font-medium text-zinc-500 flex items-center gap-1.5 mt-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Your Fitness Identity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button onClick={handleCancel} className="px-4 py-2.5 rounded-xl text-zinc-600 bg-white/50 hover:bg-white font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2.5 rounded-xl text-white bg-indigo-500 hover:bg-indigo-600 font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
                <Check className="w-4 h-4" /> Save
              </button>
            </>
          ) : (
            <button onClick={startEditing} className="px-4 py-2.5 rounded-xl text-indigo-600 bg-white/80 hover:bg-white font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Personal Data */}
          <GlassCard>
            <div className="flex items-center gap-3 border-b border-white/50 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-md shrink-0">
                <User className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Personal Data</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <EditableField label="Age/Bracket" fieldKey="ageBracket" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} placeholder="e.g. 25 or 25-34" />
              <EditableField label="Gender" fieldKey="gender" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} options={['Male', 'Female', 'Other', 'Prefer not to say']} />
              <div className="col-span-2 w-full">
                <EditableField label="Experience Level" fieldKey="experienceLevel" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} options={['Beginner', 'Intermediate', 'Advanced']} />
              </div>
              <div className="col-span-2 w-full">
                <EditableField label="Primary Goal" fieldKey="primaryGoal" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} options={['Muscle Gain', 'Fat Loss', 'Endurance', 'General Fitness']} />
              </div>
              <div className="col-span-2 w-full">
                <EditableField label="Training Preference" fieldKey="workoutLocation" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} options={['Gym Membership', 'Home (Bodyweight & Backpack)', 'Hybrid']} />
              </div>
            </div>
          </GlassCard>

          {/* Location Info */}
          <GlassCard>
            <div className="flex items-center justify-between border-b border-white/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Location Info</h2>
              </div>
              <button 
                onClick={handleLocationUpdate}
                disabled={isLocating || isEditing}
                className="px-3 py-2 bg-white/80 hover:bg-white text-emerald-600 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50 shrink-0"
              >
                {isLocating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                Sync
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <EditableField label="Display Name" fieldKey="locationName" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} />
              
              {!isEditing && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Geolocation Data</span>
                  <div className="p-4 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm min-h-[48px]">
                    {profile.locationLat ? (
                      <div className="flex flex-col gap-4 text-sm font-mono text-zinc-700">
                        {/* Coordinates Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase">Latitude</span>
                            <span>{profile.locationLat.toFixed(6)}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase">Longitude</span>
                            <span>{profile.locationLng?.toFixed(6)}</span>
                          </div>
                          <div className="flex flex-col col-span-2">
                            <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase">Accuracy</span>
                            <span className="text-emerald-600 font-bold">± {profile.locationAccuracy?.toFixed(1)} meters</span>
                          </div>
                        </div>

                        {/* Real-time Reverse Geocoding Address Data */}
                        {(profile.city || profile.state || profile.country) && (
                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/50">
                            {profile.city && (
                              <div className="flex flex-col">
                                <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase">City</span>
                                <span>{profile.city}</span>
                              </div>
                            )}
                            {profile.state && (
                              <div className="flex flex-col">
                                <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase">State</span>
                                <span>{profile.state}</span>
                              </div>
                            )}
                            {profile.country && (
                              <div className="flex flex-col col-span-2">
                                <span className="text-[10px] font-sans font-bold text-zinc-400 uppercase">Country</span>
                                <span>{profile.country}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-2">
                        <span className="text-xs font-medium text-zinc-500">No GPS data synced</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

          {/* AI Coach Voice & Audio Pipeline Card */}
          <GlassCard>
            <div className="flex items-center justify-between border-b border-white/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-800 tracking-tight">AI Coach Voice</h2>
                  <p className="text-[11px] text-zinc-500">Web Speech API guidance & audio notifications</p>
                </div>
              </div>

              {/* Master Switch */}
              <button
                onClick={handleToggleVoice}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shadow-inner ${
                  voiceEnabled ? 'bg-cyan-600 justify-end' : 'bg-zinc-300 justify-start'
                }`}
                title="Toggle AI Coach Voice"
              >
                <div className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs text-zinc-600">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/50 border border-white/60">
                {voiceEnabled ? (
                  <Volume2 className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                ) : (
                  <VolumeX className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                )}
                <p className="leading-relaxed">
                  {voiceEnabled ? (
                    <span>
                      <strong className="text-zinc-800">Voice Coach is active:</strong> Real-time reps, form correction cues, rest timer countdowns, and reward milestone announcements will be spoken aloud.
                    </span>
                  ) : (
                    <span>
                      <strong className="text-zinc-800">Voice Coach is muted:</strong> Notifications will remain strictly visual toasts and badges without speech synthesis.
                    </span>
                  )}
                </p>
              </div>

              {voiceEnabled && (
                <button
                  onClick={() => voiceCoach.speak("PulseFit offline voice coach ready. Perfect your form and crush your workout!", { force: true })}
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Test Voice Audio Cue
                </button>
              )}
            </div>
          </GlassCard>

          {/* Battery Saver Toggle Card */}
          <GlassCard>
            <div className="flex items-center justify-between border-b border-white/50 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 transition-colors ${
                  batterySaver
                    ? 'bg-gradient-to-br from-emerald-500 to-green-600'
                    : 'bg-gradient-to-br from-amber-500 to-orange-600'
                }`}>
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-800 tracking-tight">Battery Saver</h2>
                  <p className="text-[11px] text-zinc-500">Smart power governor for heavy background engines</p>
                </div>
              </div>

              {/* Battery Saver Master Switch */}
              <button
                onClick={handleToggleBatterySaver}
                role="switch"
                aria-checked={batterySaver}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shadow-inner ${
                  batterySaver ? 'bg-emerald-600 justify-end' : 'bg-zinc-300 justify-start'
                }`}
                title="Toggle Battery Saver"
              >
                <div className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs text-zinc-600">
              <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/50 border border-white/60">
                <Zap className={`w-4 h-4 shrink-0 mt-0.5 ${batterySaver ? 'text-emerald-600' : 'text-amber-500'}`} />
                <p className="leading-relaxed">
                  {batterySaver ? (
                    <span>
                      <strong className="text-zinc-800">Battery Saver ON (Low Power Mode):</strong> Conserves battery by pausing background processing. All your workouts, steps, calories, and hydration still record and update <strong className="text-emerald-700">instantly in real time</strong>.
                    </span>
                  ) : (
                    <span>
                      <strong className="text-zinc-800">Battery Saver OFF (High Performance):</strong> Continuous live wellness tracking, dynamic metabolism estimation, and instant recovery analytics run actively in the background.
                    </span>
                  )}
                </p>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Physical Metrics */}
          <GlassCard>
            <div className="flex items-center gap-3 border-b border-white/50 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-zinc-800 tracking-tight">Physical Metrics</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <EditableField label="Height" fieldKey="height" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} placeholder="e.g. 180" />
              <EditableField label="Weight" fieldKey="weight" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} placeholder="e.g. 75" />
              <div className="col-span-2 w-full">
                <EditableField label="Body Type" fieldKey="bodyType" isEditing={isEditing} profile={profile} editProfile={editProfile} onChange={(key, val) => setEditProfile({...editProfile, [key]: val})} options={['Ectomorph (Lean)', 'Mesomorph (Athletic)', 'Endomorph (Heavy)']} />
              </div>
            </div>

            {((profile.physicalConstraints && profile.physicalConstraints.length > 0) || isEditing) && (
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Constraints & Injuries</span>
                {isEditing ? (
                  <div className="text-sm text-zinc-500 italic px-2">Edit in onboarding (multi-select not supported here yet)</div>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.physicalConstraints?.map(constraint => (
                      <span key={constraint} className="px-3 py-1.5 bg-rose-50/80 backdrop-blur-sm text-rose-700 border border-rose-200/50 rounded-xl text-sm font-bold shadow-sm">
                        {constraint}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {((profile.equipmentInventory && profile.equipmentInventory.length > 0) || isEditing) && (
              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Available Equipment</span>
                {isEditing ? (
                  <div className="text-sm text-zinc-500 italic px-2">Edit in onboarding (multi-select not supported here yet)</div>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {profile.equipmentInventory?.map(equip => (
                      <span key={equip} className="px-3 py-1.5 bg-indigo-50/80 backdrop-blur-sm text-indigo-700 border border-indigo-200/50 rounded-xl text-sm font-bold shadow-sm">
                        {equip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </GlassCard>

          {/* BMI CALCULATOR */}
          <div className="w-full">
            <BMIWidget weightKg={weightNum} heightCm={heightNum} />
          </div>

          {/* Fingerprint & Security PIN Card */}
          <GlassCard>
            <div className="flex items-center justify-between border-b border-white/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-800 tracking-tight">
                    Fingerprint &amp; Security PIN
                  </h2>
                  <p className="text-[11px] text-zinc-500">
                    Manage your 3-phase fingerprint lock and 4-digit security PIN
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <BiometricSettings />

              <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-zinc-800 font-bold text-sm">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <span>Update 4-Digit Security PIN</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="Current 4-Digit PIN"
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-mono tracking-widest text-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="New 4-Digit PIN"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-white border border-zinc-200 rounded-xl px-3.5 py-2.5 text-sm font-mono tracking-widest text-zinc-800 outline-none focus:ring-2 focus:ring-indigo-500/40"
                  />
                </div>
                {pinUpdateMsg && (
                  <p
                    className={cn(
                      'text-xs font-bold',
                      pinUpdateMsg.type === 'success' ? 'text-emerald-600' : 'text-rose-600'
                    )}
                  >
                    {pinUpdateMsg.text}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleUpdatePin}
                  disabled={updatingPin || currentPinInput.length !== 4 || newPinInput.length !== 4}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm"
                >
                  {updatingPin ? 'Saving New PIN...' : 'Update PIN'}
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Interactive Feature Guide & Master Manual Card */}
          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-md shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-800 tracking-tight">
                    PulseFit Master Feature Guide &amp; Manual
                  </h2>
                  <p className="text-[11px] text-zinc-500">
                    5-Page Interactive Manual Covering Every Engine &amp; Feature in Detail
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowManualModal(true)}
                className="self-start sm:self-auto px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                <span>Open 5-Page Guide</span>
              </button>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Explore step-by-step guides for the 5,050+ Exercise Catalog, AI Camera Rep Counter, Contactless Heart Rate &amp; Vitals, Acoustic Hydration, and the Secure Offline Vault.
            </p>
          </GlassCard>

          {/* 100% Offline Vault Backup & Recovery (Tamper-Proof SHA-256) */}
          <GlassCard>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-zinc-800 tracking-tight">
                    Offline Backup &amp; Recovery Enclave
                  </h2>
                  <p className="text-[11px] text-zinc-500">
                    100% Client-Side Snapshot with SHA-256 Cryptographic Tamper-Proofing
                  </p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                ZERO CLOUD / 100% OFFLINE
              </span>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed">
              Your workouts, rep counts, vitals, hydration logs, unlocked themes, and athlete profile are stored completely and securely on your own device. Your private data stays 100% offline and in your hands. Export a private encrypted backup anytime to keep a saved copy or transfer to another phone.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Export Backup Card */}
              <div className="p-4 rounded-2xl bg-white/70 border border-zinc-200/80 shadow-xs flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                    <Download className="w-4 h-4 text-indigo-600" />
                    <span>Export Local Backup</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Download an authenticated .json snapshot file directly to your device storage.
                  </p>
                </div>

                {exportStatus && (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span className="truncate">{exportStatus}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleExportBackup}
                  disabled={isExporting}
                  className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Hashing &amp; Packaging...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Backup (.json)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Import Backup Card */}
              <div className="p-4 rounded-2xl bg-white/70 border border-zinc-200/80 shadow-xs flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                    <Upload className="w-4 h-4 text-purple-600" />
                    <span>Restore From Backup</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Import a previously exported PulseFit backup to restore all workout metrics and athlete data.
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleFileSelected}
                />

                {restoreResult && (
                  <div className={cn(
                    "p-2.5 rounded-xl text-xs flex items-center gap-2",
                    restoreResult.success
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                      : "bg-rose-50 border border-rose-200 text-rose-700"
                  )}>
                    {restoreResult.success ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    )}
                    <span className="truncate">{restoreResult.message}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isRestoring}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isRestoring ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying SHA-256 &amp; Restoring...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Backup File</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-3 h-3 text-zinc-400" />
                <span>Format: PulseFit Cryptographic Snapshot v2.5</span>
              </span>
              <span>Integrity: SHA-256 Validated</span>
            </div>
          </GlassCard>

        </div>

      </div>

      {showManualModal && (
        <InteractiveProductManual
          onComplete={() => setShowManualModal(false)}
          onSkip={() => setShowManualModal(false)}
        />
      )}
    </div>
  );
}
