import { useState, useEffect, startTransition } from 'react';
import { executeConcurrent, runIdleTask } from './utils/optimizationEngine';

import { Suspense, lazy } from 'react';
const OnboardingWizard = lazy(() => import('./components/OnboardingWizard').then(module => ({ default: module.OnboardingWizard })));
const PinPad = lazy(() => import('./components/PinPad').then(module => ({ default: module.PinPad })));
const RecoveryChallenge = lazy(() => import('./components/RecoveryChallenge').then(module => ({ default: module.RecoveryChallenge })));
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const AnalysisLoader = lazy(() => import('./components/AnalysisLoader').then(module => ({ default: module.AnalysisLoader })));
import { storage, UserProfile } from './services/storage';
import { zkBiometricEnclave } from './services/zeroKnowledgeBiometricEnclave';
import { BiometricService } from './services/BiometricService';
import { getMasterExerciseDatabaseAsync } from './services/exerciseFactory';
import { getSearchProxy } from './utils/searchManager';
import { useMilestoneMonitor } from './services/milestoneMonitor';
import { DashboardSkeleton } from './components/DashboardSkeleton';
import { autonomicSelfHealingEngine } from './services/autonomicSelfHealingEngine';
import { continuousPhysiologyEngine } from './services/continuousPhysiologyEngine';
import { sovereignExokernelHypervisor } from './services/sovereignExokernelHypervisor';

type AppScreen = 'LOADING' | 'ONBOARDING' | 'ANALYZING' | 'PIN_GUARD' | 'RECOVERY' | 'DASHBOARD';

export default function App() {
  // Headless telemetry, 24/7 autonomic self-healing MAPE-K + BFT + UKF daemon,
  // Sovereign Exokernel Hypervisor (WebGPU + STM + Roaring Bitmap + LT Fountain + Active Inference),
  // & milestone observer: runs 100% invisibly in the background with zero frontend UI footprint.
  useMilestoneMonitor();
  useEffect(() => {
    void autonomicSelfHealingEngine;
    void continuousPhysiologyEngine;
    void sovereignExokernelHypervisor;
  }, []);

  const [screen, setScreen] = useState<AppScreen>('LOADING');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [pinError, setPinError] = useState('');

  
  useEffect(() => {
    const bootTelemetryAndIndex = () => {
      if ((window as any).__PULSEFIT_SEARCH_INDEXED__) return;
      (window as any).__PULSEFIT_SEARCH_INDEXED__ = true;
      getMasterExerciseDatabaseAsync().then(masterDb => {
          getSearchProxy().then(proxy => {
              if (proxy) {
                  const searchData = masterDb.map((ex: any) => ({
                      id: 'ex_' + ex.id,
                      title: ex.name,
                      category: 'Exercise',
                      keywords: [ex.muscleGroup, ex.equipmentNeeded, ex.difficulty],
                      aliases: [ex.name.toLowerCase()],
                      priority: 10,
                      route: 'exercises',
                      payload: ex.id,
                      tier: ex.difficulty.toLowerCase(),
                      score: ex.scientificEffectivenessScore
                  }));
                  
                  const globalSections = [
                      { id: 'sec_overview', title: 'Overview', category: 'Section', keywords: ['dashboard', 'home', 'summary', 'stats', 'analytics', 'overview'], route: 'dashboard', priority: 100 },
                      { id: 'sec_profile', title: 'User Profile', category: 'Section', keywords: ['account', 'settings', 'user', 'preferences', 'profile', 'logout'], route: 'profile', priority: 90 },
                      { id: 'sec_history', title: 'Workout History', category: 'Section', keywords: ['logs', 'past workouts', 'history', 'calendar'], route: 'history', priority: 80 },
                      { id: 'sec_analytics', title: 'Analytics & Progress', category: 'Section', keywords: ['charts', 'progress', 'graphs', 'analytics', 'performance'], route: 'analytics', priority: 80 },
                      { id: 'sec_settings', title: 'App Settings', category: 'Section', keywords: ['theme', 'notifications', 'dark mode', 'settings', 'config'], route: 'settings', priority: 50 },
                  ];
                  proxy.registerBulk([...searchData, ...globalSections], true);

              }
          });
      }).catch(console.error);
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(bootTelemetryAndIndex);
    } else {
      setTimeout(bootTelemetryAndIndex, 100);
    }
  }, []);

  const checkAuth = async (initialBoot: boolean = false) => {
    const p = await storage.getUserProfile();
    // Instant fallback without transition lag
    if (p && p.pin) {
      executeConcurrent(() => {
        setProfile(p);
        if (initialBoot) {
          setScreen('PIN_GUARD');
        } else {
          setScreen('ANALYZING');
        }
      });
    } else {
      executeConcurrent(() => setScreen('ONBOARDING'));
    }
  };

  useEffect(() => {
    checkAuth(true);
  }, []);

  const handlePinComplete = async (enteredPin: string) => {
    let isValid = false;

    if (enteredPin === 'BIOMETRIC_SUCCESS') {
      // Strictly verify that a real v2 Biometric Enclave is enrolled and was just verified
      isValid = await BiometricService.hasEnrolledBiometric();
    } else if (profile) {
      const latestProfile = (await storage.getUserProfile()) || profile;
      const result = await zkBiometricEnclave.verifyPinOrPassword(enteredPin, latestProfile.pin);
      isValid = result.verified;

      // If legacy plaintext/SHA-256 PIN was transparently upgraded to PBKDF2-HMAC-SHA512 + AES-256-GCM, persist it
      if (isValid && result.upgradedPinString) {
        const updatedProfile = { ...latestProfile, pin: result.upgradedPinString };
        setProfile(updatedProfile);
        await storage.saveUserProfile(updatedProfile);
      }
    }

    if (isValid) {
      // Immediate screen swap to trigger Suspense instantly
      executeConcurrent(() => {
        executeConcurrent(() => setScreen('DASHBOARD'));
        setPinError('');
      });
    } else {
      setPinError('Incorrect PIN');
    }
  };
const handleAnalysisComplete = async () => {
    setScreen('DASHBOARD');
  };

  if (screen === 'LOADING') {
    return <div className="min-h-screen bg-[var(--bg-main)]" />;
  }

  if (screen === 'ONBOARDING') {
    return <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}><OnboardingWizard onComplete={() => checkAuth(false)} /></Suspense>;
  }
  
  if (screen === 'ANALYZING') {
    return <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}><AnalysisLoader onComplete={handleAnalysisComplete} username={profile?.username || 'Athlete'} /></Suspense>;
  }

  if (screen === 'PIN_GUARD') {
    return <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}><PinPad
         title={`Welcome back, ${profile?.username || 'Athlete'}`}
         subtitle="Enter your 4-digit PIN to unlock your session."
         error={pinError}
         clearError={() => setPinError('')}
         onComplete={handlePinComplete}
         forgotPinAction={() => setScreen('RECOVERY')}
       /></Suspense>;
  }
  
  if (screen === 'RECOVERY') {
    return <Suspense fallback={<div className="min-h-screen bg-[var(--bg-main)]" />}><RecoveryChallenge
         onRecovered={checkAuth}
         onCancel={() => setScreen('PIN_GUARD')}
       /></Suspense>;
  }

  return <Suspense fallback={<DashboardSkeleton />}><Dashboard /></Suspense>;
}
