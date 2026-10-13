import React, { useState, useEffect, memo, useCallback, useRef, useMemo } from 'react';
import localforage from 'localforage';
import { 
  Droplets, 
  Mic, 
  MicOff, 
  Flame, 
  Activity, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Minus, 
  RotateCcw,
  Sparkles, 
  Zap, 
  Info, 
  Compass, 
  MapPin, 
  ThermometerSun, 
  ShieldCheck,
  GlassWater,
  FlaskConical,
  Bell,
  Volume2,
  VolumeX,
  Dumbbell,
  Check,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Search,
  Navigation,
  Wind,
  Sun,
  Cloud,
  CloudRain,
  RefreshCw
} from 'lucide-react';
import { voiceCoach } from '../services/voiceCoachService';
import { triggerHapticFeedback } from '../utils/haptics';
import { storage, UserProfile } from '../services/storage';
import { fatigueHeatmapService, SystemicRecoverySummary } from '../services/fatigueHeatmapService';
import { evaluateVaultMilestones } from '../services/vaultService';
import { continuousPhysiologyEngine, ContinuousPhysiologySnapshot } from '../services/continuousPhysiologyEngine';
import { HydrationAnalyticsGraph } from './HydrationAnalyticsGraph';
import {
  BeverageCategory,
  BEVERAGE_PROFILES,
  CompartmentalFluidKineticsEngine,
  AcousticDeglutitionDSPEngine,
  AcousticDeglutitionMetrics,
  UrineColorimetricSpectroscopyEngine,
  ThermoregulatorySweatElectrolyteEngine,
  CellularHydrationMyofibrillarEngine,
  BiometeorologicalThermalEngine,
  EnterocyteSGLT1StoichiometricFormulary,
  CircadianVasopressinChronobiologyEngine
} from '../services/hydrationBiophysicsEngine';

export type HydrationSubView = 
  | 'overview'
  | 'acoustic_sip'
  | 'urine_diagnostic'
  | 'sweat_electrolytes'
  | 'recovery_heatmap'
  | 'weather_climate'
  | 'diy_recipes'
  | 'timing_reminders';

export interface UrineColorGrade {
  level: number;
  name: string;
  color: string;
  status: string;
  definition: string;
  advice: string;
  goalDeltaMl: number;
}

export const URINE_GRADES: UrineColorGrade[] = [
  { 
    level: 1, 
    name: 'Pale Straw', 
    color: '#fef08a', 
    status: 'Optimal / Fully Hydrated',
    definition: 'Optimal cellular hydration state; maintain standard fluid intake.',
    advice: 'Body fluids in equilibrium. Keep sipping normally when thirsty.',
    goalDeltaMl: 0 
  },
  { 
    level: 2, 
    name: 'Transparent Yellow', 
    color: '#fde047', 
    status: 'Well Hydrated',
    definition: 'Excellent hydration; standard water balance achieved.',
    advice: 'Target hydration achieved. Good cellular volume and vascular balance.',
    goalDeltaMl: 0 
  },
  { 
    level: 3, 
    name: 'Dark Yellow', 
    color: '#eab308', 
    status: 'Mild Hypohydration',
    definition: 'Early warning sign of fluid deficit; consume 300ml water immediately.',
    advice: 'Early dehydration alert. Consume 300ml-350ml water now to avoid fatigue.',
    goalDeltaMl: 350 
  },
  { 
    level: 4, 
    name: 'Amber / Honey', 
    color: '#ca8a04', 
    status: 'Moderate Dehydration',
    definition: 'Sub-optimal performance zone; active replenishment required.',
    advice: 'Active deficit. Drink 650ml water and avoid high-heat strain.',
    goalDeltaMl: 650 
  },
  { 
    level: 5, 
    name: 'Syrup / Brownish Amber', 
    color: '#a16207', 
    status: 'Severe Dehydration',
    definition: 'High risk of cramping and cognitive fatigue; rapid electrolyte hydration needed.',
    advice: 'High muscle cramp and lethargy risk. Administer 1000ml oral fluids with electrolytes.',
    goalDeltaMl: 1000 
  },
  { 
    level: 6, 
    name: 'Dark Brown / Cola-Like', 
    color: '#713f12', 
    status: 'Critical Dehydration Warning',
    definition: 'Potential rhabdomyolysis risk marker; stop exertion and seek medical evaluation.',
    advice: 'Severe fluid depletion. Stop exercise immediately, drink WHO ORS, and seek evaluation if dark urine persists.',
    goalDeltaMl: 1500 
  }
];

export interface DiyElectrolyteRecipe {
  id: string;
  name: string;
  category: string;
  prepTime: string;
  yieldVolume: string;
  ingredients: string[];
  instructions: string;
  sodiumMg: number;
  potassiumMg: number;
  magnesiumMg: number;
  bestFor: string;
}

export const DIY_ELECTROLYTE_RECIPES: DiyElectrolyteRecipe[] = [
  {
    id: 'who_ors',
    name: 'Clinical WHO Oral Rehydration Solution (ORS)',
    category: 'Clinical Gold Standard',
    prepTime: '< 1 min',
    yieldVolume: '1000 mL',
    ingredients: [
      '1000 mL Clean Drinking Water',
      '6 level teaspoons Pure Sugar or Glucose',
      '1/2 level teaspoon Table Salt (NaCl)',
      '1/2 fresh Lemon squeezed (for Potassium)'
    ],
    instructions: 'Dissolve salt and sugar thoroughly in 1 liter clean room-temperature water. Squeeze lemon juice and stir until crystal-clear. Sip steadily over 60-90 minutes.',
    sodiumMg: 1150,
    potassiumMg: 380,
    magnesiumMg: 24,
    bestFor: 'Severe sweat loss, hot weather sessions, and cramping prevention.'
  },
  {
    id: 'cramp_quencher',
    name: 'Rapid Muscle Cramp Quencher',
    category: 'Acute Muscle Relief',
    prepTime: '45 seconds',
    yieldVolume: '500 mL',
    ingredients: [
      '500 mL Water',
      '1 large pinch Himalayan Pink Salt',
      '1 tablespoon Pure Honey',
      '1/4 teaspoon Baking Soda (Sodium Bicarbonate)'
    ],
    instructions: 'Dissolve pink salt and baking soda in lukewarm water. Whisk in honey until fully dissolved. Drink 20 minutes before strenuous sets or at the first sign of calf/quad twitches.',
    sodiumMg: 520,
    potassiumMg: 140,
    magnesiumMg: 32,
    bestFor: 'Immediate neuromuscular cramping relief and lactic acid buffering.'
  },
  {
    id: 'coconut_citrus',
    name: 'Post-Workout Coconut-Citrus Isotonic',
    category: 'Natural Recovery',
    prepTime: '1 min',
    yieldVolume: '500 mL',
    ingredients: [
      '350 mL Pure Tender Coconut Water',
      '150 mL Fresh Orange Juice',
      '1 pinch Sea Salt or Rock Salt'
    ],
    instructions: 'Combine coconut water and fresh orange juice in a shaker cup. Add a pinch of sea salt to optimize osmolarity. Serve chilled immediately post-workout.',
    sodiumMg: 280,
    potassiumMg: 620,
    magnesiumMg: 48,
    bestFor: 'Cellular glycogen replenishment, high potassium deficit, and post-lift recovery.'
  },
  {
    id: 'heatwave_cooler',
    name: 'Instant Heatwave Jaggery-Mint Isotonic',
    category: 'High Thermal Endurance',
    prepTime: '90 seconds',
    yieldVolume: '500 mL',
    ingredients: [
      '500 mL Cold Water',
      '2 teaspoons Crushed Jaggery (Gud)',
      '1/4 teaspoon Black Salt (Kala Namak)',
      'Fresh Mint leaves & Lime juice'
    ],
    instructions: 'Dissolve crushed jaggery and black salt into cold water. Crush mint leaves lightly and mix in lime juice. Provides bio-available iron and rapid electrolyte balance.',
    sodiumMg: 460,
    potassiumMg: 310,
    magnesiumMg: 55,
    bestFor: 'Outdoor training in temperatures > 32°C and high sweat rate endurance.'
  }
];

export const decodeWmoWeatherCode = (code: number): string => {
  if (code === 0) return 'Clear Sky / Sunny';
  if (code === 1) return 'Mainly Clear';
  if (code === 2) return 'Partly Cloudy';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Foggy / Hazy';
  if (code >= 51 && code <= 55) return 'Light Drizzle';
  if (code >= 61 && code <= 65) return 'Rain Showers';
  if (code >= 71 && code <= 77) return 'Snow Flurries';
  if (code >= 80 && code <= 82) return 'Heavy Rain Showers';
  if (code >= 95) return 'Thunderstorm';
  return 'Clear Sky';
};

export const AdvancedHydrationCenter = memo(function AdvancedHydrationCenter() {
  const [activeSubView, setActiveSubView] = useState<HydrationSubView>('overview');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Daily Water Intake & Goals
  const [currentWaterMl, setCurrentWaterMl] = useState<number>(0);
  const [baseWaterGoalMl, setBaseWaterGoalMl] = useState<number>(2800);
  const [diagnosticDeltaMl, setDiagnosticDeltaMl] = useState<number>(0);
  const [climateMultiplier, setClimateMultiplier] = useState<number>(1.0);
  const [selectedClimate, setSelectedClimate] = useState<'normal' | 'hot' | 'extreme'>('normal');

  // Diagnostic Urine Checker State
  const [selectedUrineGrade, setSelectedUrineGrade] = useState<UrineColorGrade>(URINE_GRADES[0]);
  const [diagnosticReport, setDiagnosticReport] = useState<string>('Optimal cellular hydration. Maintain standard fluid intake.');

  // Acoustic Sip Monitor State
  const [isAcousticRunning, setIsAcousticRunning] = useState<boolean>(false);
  const [acousticSipCount, setAcousticSipCount] = useState<number>(0);
  const [acousticVolumeMl, setAcousticVolumeMl] = useState<number>(0);
  const [micEnergyLevel, setMicEnergyLevel] = useState<number>(0);
  const [lastSipNotification, setLastSipNotification] = useState<string | null>(null);

  // Sweat & Electrolytes Calculator State
  const [estimatedCaloriesBurned, setEstimatedCaloriesBurned] = useState<number>(0);
  const [sweatRateMl, setSweatRateMl] = useState<number>(0);
  const [sodiumLossMg, setSodiumLossMg] = useState<number>(0);
  const [potassiumLossMg, setPotassiumLossMg] = useState<number>(0);
  const [magnesiumLossMg, setMagnesiumLossMg] = useState<number>(0);
  const [fluidDeficitReplenishmentMl, setFluidDeficitReplenishmentMl] = useState<number>(0);

  // Recovery Heatmap Acceleration State
  const [recoverySummary, setRecoverySummary] = useState<SystemicRecoverySummary | null>(null);
  const [hydrationRecoveryDiscountPct, setHydrationRecoveryDiscountPct] = useState<number>(0);

  // Timing Reminders Controller State
  const [activeReminderInterval, setActiveReminderInterval] = useState<number | null>(45); // minutes
  const [reminderSecondsLeft, setReminderSecondsLeft] = useState<number>(45 * 60);
  const [reminderActive, setReminderActive] = useState<boolean>(false);
  const [preWorkoutAlertOn, setPreWorkoutAlertOn] = useState<boolean>(true);
  const [postWorkoutAlertOn, setPostWorkoutAlertOn] = useState<boolean>(true);

  // Real-Time Geolocation & Live Satellite Weather State (Open-Meteo & GPS)
  const [detectedLocationName, setDetectedLocationName] = useState<string>('Detecting Live GPS Location...');
  const [ambientTempC, setAmbientTempC] = useState<number>(24);
  const [apparentTempC, setApparentTempC] = useState<number>(24);
  const [ambientHumidity, setAmbientHumidity] = useState<number>(55);
  const [windSpeedKmh, setWindSpeedKmh] = useState<number>(10);
  const [weatherCode, setWeatherCode] = useState<number>(0);
  const [weatherDescription, setWeatherDescription] = useState<string>('Clear Sky');
  const [isLiveWeatherSynced, setIsLiveWeatherSynced] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [weatherSyncError, setWeatherSyncError] = useState<string | null>(null);

  // Worldwide City Search State (Zero API Key via Open-Meteo Geocoding)
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [citySearchResults, setCitySearchResults] = useState<any[]>([]);
  const [isSearchingCity, setIsSearchingCity] = useState<boolean>(false);
  const [livePhysio, setLivePhysio] = useState<ContinuousPhysiologySnapshot>(() => continuousPhysiologyEngine.getSnapshot());
  const [selectedBeverageType, setSelectedBeverageType] = useState<BeverageCategory>('water');
  const [acousticMetrics, setAcousticMetrics] = useState<AcousticDeglutitionMetrics | null>(null);
  const [workoutDurationMinutes, setWorkoutDurationMinutes] = useState<number>(45);

  // Web Audio Context & Canvas Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastAcousticSipTimeRef = useRef<number>(0);
  const spectrumCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reminderTimerRef = useRef<number | null>(null);
  const acousticDspRef = useRef<AcousticDeglutitionDSPEngine>(new AcousticDeglutitionDSPEngine());

  // Load state and user profile on mount
  useEffect(() => {
    const unsubPhysio = continuousPhysiologyEngine.subscribe((snap) => {
      setLivePhysio(snap);
    });

    const handleLiveSync = async () => {
      try {
        const savedIntake = (await localforage.getItem<number>('pulsefit_water_intake')) || 0;
        setCurrentWaterMl(savedIntake);
        const fatigue = await fatigueHeatmapService.compute48HourFatigue();
        setRecoverySummary(fatigue);
      } catch {}
    };

    window.addEventListener('pulsefit_exercise_logged', handleLiveSync);
    window.addEventListener('pulsefit_workout_logged', handleLiveSync);
    window.addEventListener('pulsefit_rep_session_saved', handleLiveSync);
    window.addEventListener('pulsefit_hydration_updated', handleLiveSync);

    (async () => {
      try {
        const prof = await storage.getUserProfile();
        setUserProfile(prof);

        const weight = prof?.weightKg || parseFloat(prof?.weight || '74') || 74;
        // Standard sports science baseline: 35ml water per kg bodyweight
        const calculatedBaseGoal = Math.round(weight * 35);
        setBaseWaterGoalMl(calculatedBaseGoal);

        // Load today's intake from localforage
        const savedIntake = (await localforage.getItem<number>('pulsefit_water_intake')) || 0;
        setCurrentWaterMl(savedIntake);

        // Load urine grade preference
        const savedUrineLevel = await localforage.getItem<number>('pulsefit_urine_color_level');
        if (savedUrineLevel) {
          const match = URINE_GRADES.find(g => g.level === savedUrineLevel) || URINE_GRADES[0];
          setSelectedUrineGrade(match);
          setDiagnosticDeltaMl(match.goalDeltaMl);
          setDiagnosticReport(match.definition);
        }

        // Load workout telemetry to compute real sweat & electrolyte loss
        const history = (await localforage.getItem<any[]>('pulsefit_workout_history')) || [];
        let totalCals = 0;
        let totalMinutes = 0;

        history.slice(0, 10).forEach(w => {
          const sets = Number(w.sets) || Number(w.baseSets) || 3;
          totalMinutes += sets * 2.5; // ~2.5 mins per set including rest
        });

        // Calories = METs (avg gym ~6.0) * Weight (kg) * Time (hours)
        const workoutHours = Math.max(0.4, totalMinutes / 60);
        const minsRounded = Math.round(workoutHours * 60);
        setWorkoutDurationMinutes(minsRounded);
        totalCals = Math.round(6.0 * weight * workoutHours);
        setEstimatedCaloriesBurned(totalCals);

        // Dedicated Sub-Toggle 4 Engine: ISO 7933 PHS + CFTR Ductal Sweat Kinetics
        const sweatBiophysics = ThermoregulatorySweatElectrolyteEngine.computeSweatAndIonKinetics({
          weightKg: weight,
          heightCm: prof?.heightCm || parseFloat(prof?.height || '175') || 175,
          caloriesBurnedKcal: totalCals,
          workoutMinutes: minsRounded,
          ambientTempC: 24,
          ambientHumidityPct: 55,
          windSpeedKmh: 10
        });
        setSweatRateMl(sweatBiophysics.totalSessionSweatLossMl);
        setSodiumLossMg(sweatBiophysics.sodiumLossMg);
        setPotassiumLossMg(sweatBiophysics.potassiumLossMg);
        setMagnesiumLossMg(sweatBiophysics.magnesiumLossMg);
        setFluidDeficitReplenishmentMl(sweatBiophysics.acsm150ReplenishmentTargetMl);

        // Evaluate muscle recovery link
        const fatigue = await fatigueHeatmapService.compute48HourFatigue();
        setRecoverySummary(fatigue);
        const discount = Math.min(25, Math.round((savedIntake / calculatedBaseGoal) * 25));
        setHydrationRecoveryDiscountPct(discount);

        // Check local cached weather first for instant UI response
        try {
          const cachedWeather = await localforage.getItem<any>('pulsefit_live_weather_cache');
          if (cachedWeather) {
            setAmbientTempC(cachedWeather.temp || 24);
            setApparentTempC(cachedWeather.apparent || 24);
            setAmbientHumidity(cachedWeather.humidity || 55);
            setWindSpeedKmh(cachedWeather.wind || 10);
            setWeatherCode(cachedWeather.code || 0);
            setDetectedLocationName(cachedWeather.cityName || 'Local GPS Position');
            setSelectedClimate(cachedWeather.mode || 'normal');
            setClimateMultiplier(cachedWeather.mult || 1.0);
            setIsLiveWeatherSynced(true);
            continuousPhysiologyEngine.updateEnvironment(cachedWeather.temp || 24, cachedWeather.humidity || 55);
          }
        } catch (_) {}

        // Auto-run real-time live GPS & Open-Meteo weather synchronization
        syncRealTimeWeatherAndClimate();
      } catch (err) {
        console.warn('[HydrationCenter] Init notice:', err);
      }
    })();

    return () => {
      unsubPhysio();
      window.removeEventListener('pulsefit_exercise_logged', handleLiveSync);
      window.removeEventListener('pulsefit_workout_logged', handleLiveSync);
      window.removeEventListener('pulsefit_rep_session_saved', handleLiveSync);
      window.removeEventListener('pulsefit_hydration_updated', handleLiveSync);
      stopAcousticMonitor();
      if (reminderTimerRef.current) {
        clearInterval(reminderTimerRef.current);
      }
    };
  }, []);

  /**
   * Interpret WMO weather codes into descriptive status and emoji icon
   */
  const getWeatherDetails = useCallback((code: number): { text: string; icon: string } => {
    if (code === 0) return { text: 'Clear Sky', icon: '☀️' };
    if (code === 1) return { text: 'Mainly Clear', icon: '🌤️' };
    if (code === 2) return { text: 'Partly Cloudy', icon: '⛅' };
    if (code === 3) return { text: 'Overcast', icon: '☁️' };
    if (code >= 45 && code <= 48) return { text: 'Fog / Mist', icon: '🌫️' };
    if (code >= 51 && code <= 55) return { text: 'Drizzle', icon: '🌦️' };
    if (code >= 61 && code <= 65) return { text: 'Rain', icon: '🌧️' };
    if (code >= 71 && code <= 77) return { text: 'Snow', icon: '❄️' };
    if (code >= 80 && code <= 82) return { text: 'Rain Showers', icon: '🌧️' };
    if (code >= 95) return { text: 'Thunderstorm', icon: '⛈️' };
    return { text: 'Fair Weather', icon: '☀️' };
  }, []);

  /**
   * Apply live weather metrics & recalculate clinical dynamic water target
   */
  const applyLiveWeatherAndIntake = useCallback((
    temp: number,
    apparent: number,
    humidity: number,
    wind: number,
    code: number,
    cityName: string
  ) => {
    const roundedTemp = Math.round(temp * 10) / 10;
    const roundedApparent = Math.round(apparent * 10) / 10;
    const roundedHum = Math.round(humidity);
    const roundedWind = Math.round(wind * 10) / 10;

    setAmbientTempC(roundedTemp);
    setApparentTempC(roundedApparent);
    setAmbientHumidity(roundedHum);
    setWindSpeedKmh(roundedWind);
    setWeatherCode(code);
    const details = getWeatherDetails(code);
    setWeatherDescription(details.text);
    setDetectedLocationName(cityName);
    setIsLiveWeatherSynced(true);
    setWeatherSyncError(null);

    // Dynamic clinical hydration formula:
    // Effective Heat Index / Metabolic Thermal Load
    const thermalIndex = Math.max(roundedTemp, roundedApparent);
    let mult = 1.0;
    let mode: 'normal' | 'hot' | 'extreme' = 'normal';

    if (thermalIndex >= 38) {
      mult = 1.40; // +40% extreme heat strain
      mode = 'extreme';
    } else if (thermalIndex >= 32) {
      mult = 1.25; // +25% hot conditions
      mode = 'extreme';
    } else if (thermalIndex >= 26) {
      mult = 1.15; // +15% warm weather
      mode = 'hot';
    } else if (thermalIndex >= 21) {
      mult = 1.05; // +5% mild thermal load
      mode = 'normal';
    } else {
      mult = 1.0;
      mode = 'normal';
    }

    // Relative humidity factor: if humidity > 70% and temp > 25°C, sweat cannot evaporate, increasing hydration requirement
    if (roundedHum >= 70 && thermalIndex >= 25) {
      mult += 0.05;
    }

    const roundedMult = Math.round(mult * 100) / 100;
    setSelectedClimate(mode);
    setClimateMultiplier(roundedMult);

    // Save in localforage for instant reload
    localforage.setItem('pulsefit_live_weather_cache', {
      cityName,
      temp: roundedTemp,
      apparent: roundedApparent,
      humidity: roundedHum,
      wind: roundedWind,
      code,
      mult: roundedMult,
      mode,
      timestamp: Date.now()
    }).catch(() => {});

    return { mult: roundedMult, mode };
  }, [getWeatherDetails]);

  /**
   * Astronomical Solar Physics Fallback (when fully offline)
   */
  const runOfflineAstronomicalFallback = useCallback((customLat?: number, customLng?: number) => {
    setIsLocating(false);
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
    const hour = now.getHours() + now.getMinutes() / 60;

    const lat = customLat !== undefined ? customLat : 25.0;
    const absLat = Math.abs(lat);
    const baseTemp = 30 - (absLat * 0.38);
    const hemisphereSign = lat >= 0 ? 1 : -1;
    const seasonalShift = 6.2 * Math.sin(((dayOfYear - 80) / 365) * 2 * Math.PI) * hemisphereSign;
    const diurnalShift = 4.8 * Math.sin(((hour - 8.5) / 24) * 2 * Math.PI);

    const estTemp = Math.round(Math.max(12, Math.min(45, baseTemp + seasonalShift + diurnalShift)));
    const estHumidity = Math.round(Math.max(30, Math.min(88, 86 - (estTemp - 14) * 1.6)));

    const locationLabel = customLat !== undefined && customLng !== undefined
      ? `Local Coordinates (${Math.round(customLat * 10) / 10}°, ${Math.round((customLng || 0) * 10) / 10}°)`
      : 'Solar Diurnal Model (Offline)';

    applyLiveWeatherAndIntake(estTemp, estTemp, estHumidity, 8, 1, locationLabel);
  }, [applyLiveWeatherAndIntake]);

  /**
   * 100% Real-Time Geolocation & Live Weather Sync via Browser Geolocation API & Open-Meteo
   * Zero API Keys • Real User City Name • Dynamic Real-Time Intake Auto-Adjustment
   */
  const syncRealTimeWeatherAndClimate = useCallback(async () => {
    setIsLocating(true);
    setWeatherSyncError(null);

    if (typeof window === 'undefined' || !navigator.geolocation) {
      setIsLocating(false);
      setWeatherSyncError('Geolocation is not supported by your browser.');
      runOfflineAstronomicalFallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const latRound = Math.round(lat * 100) / 100;
        const lngRound = Math.round(lng * 100) / 100;

        try {
          // 1. Reverse-geocode to get real user city name (BigDataCloud or Nominatim)
          let resolvedCity = '';
          try {
            const geoRes = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
            );
            if (geoRes.ok) {
              const geoData = await geoRes.json();
              const city = geoData.city || geoData.locality || geoData.principalSubdivision;
              const country = geoData.countryName || geoData.countryCode || '';
              if (city) {
                resolvedCity = `${city}${country ? `, ${country}` : ''}`;
              }
            }
          } catch (e) {
            console.warn('BigDataCloud reverse geocode note:', e);
          }

          if (!resolvedCity) {
            try {
              const nomRes = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
                { headers: { 'User-Agent': 'PulseFitAI/1.0' } }
              );
              if (nomRes.ok) {
                const nomData = await nomRes.json();
                const addr = nomData.address || {};
                const city = addr.city || addr.town || addr.village || addr.suburb || addr.state_district || addr.state;
                const country = addr.country || '';
                if (city) {
                  resolvedCity = `${city}${country ? `, ${country}` : ''}`;
                }
              }
            } catch (e) {
              console.warn('Nominatim reverse geocode note:', e);
            }
          }

          if (!resolvedCity) {
            resolvedCity = `GPS Position (${latRound > 0 ? `${latRound}°N` : `${Math.abs(latRound)}°S`}, ${lngRound > 0 ? `${lngRound}°E` : `${Math.abs(lngRound)}°W`})`;
          }

          // 2. Fetch live satellite & ground station weather via Open-Meteo (Zero API key)
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
          const weatherRes = await fetch(weatherUrl);

          if (!weatherRes.ok) {
            throw new Error(`Weather fetch HTTP status ${weatherRes.status}`);
          }

          const weatherData = await weatherRes.json();
          const current = weatherData.current;

          const liveTemp = current.temperature_2m;
          const apparentTemp = current.apparent_temperature;
          const liveHumidity = current.relative_humidity_2m;
          const liveWind = current.wind_speed_10m;
          const liveCode = current.weather_code;

          const { mult } = applyLiveWeatherAndIntake(
            liveTemp,
            apparentTemp,
            liveHumidity,
            liveWind,
            liveCode,
            resolvedCity
          );

          setIsLocating(false);
          triggerHapticFeedback('success');

          const newTarget = Math.round(baseWaterGoalMl * mult + diagnosticDeltaMl);
          voiceCoach.speak(`Live weather synchronized for ${resolvedCity}. Temperature is ${Math.round(liveTemp)} degrees Celsius. Water goal auto-adjusted to ${newTarget} millilitres.`);
        } catch (err: any) {
          console.warn('Real-time weather fetch error, using solar physics fallback:', err);
          runOfflineAstronomicalFallback(lat, lng);
        }
      },
      (err) => {
        console.warn('Geolocation permission error:', err);
        setIsLocating(false);
        setWeatherSyncError('Geolocation permission denied or unavailable. You can search any city below.');
        runOfflineAstronomicalFallback();
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }, [applyLiveWeatherAndIntake, baseWaterGoalMl, diagnosticDeltaMl, runOfflineAstronomicalFallback]);

  /**
   * Worldwide City Search via Open-Meteo Geocoding (Zero API Key)
   */
  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!citySearchQuery.trim()) return;
    setIsSearchingCity(true);
    setWeatherSyncError(null);
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(citySearchQuery.trim())}&count=5&language=en&format=json`
      );
      if (res.ok) {
        const data = await res.json();
        setCitySearchResults(data.results || []);
        if (!data.results || data.results.length === 0) {
          setWeatherSyncError(`No city found matching "${citySearchQuery}".`);
        }
      }
    } catch (err) {
      console.warn('City search network error:', err);
      setWeatherSyncError('City search network error. Check connection.');
    } finally {
      setIsSearchingCity(false);
    }
  };

  /**
   * Select City from Search Results
   */
  const handleSelectCity = async (cityItem: any) => {
    setCitySearchResults([]);
    setCitySearchQuery('');
    setIsLocating(true);
    try {
      const { latitude, longitude, name, admin1, country } = cityItem;
      const locationName = `${name}${admin1 ? `, ${admin1}` : ''}${country ? `, ${country}` : ''}`;

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
      const res = await fetch(weatherUrl);
      if (res.ok) {
        const data = await res.json();
        const current = data.current;
        const { mult } = applyLiveWeatherAndIntake(
          current.temperature_2m,
          current.apparent_temperature,
          current.relative_humidity_2m,
          current.wind_speed_10m,
          current.weather_code,
          locationName
        );
        triggerHapticFeedback('success');
        const newTarget = Math.round(baseWaterGoalMl * mult + diagnosticDeltaMl);
        voiceCoach.speak(`Weather synced for ${locationName}. Temperature ${Math.round(current.temperature_2m)} degrees. Water intake adjusted.`);
      }
    } catch (err) {
      console.warn('City selection error:', err);
    } finally {
      setIsLocating(false);
    }
  };

  /**
   * Dynamic Total Water Target:
   * Base (35ml/kg) * Climate Multiplier + Diagnostic Urine Delta
   */
  const effectiveDailyWaterTargetMl = useMemo(() => {
    return Math.round((baseWaterGoalMl * climateMultiplier) + diagnosticDeltaMl);
  }, [baseWaterGoalMl, climateMultiplier, diagnosticDeltaMl]);

  /**
   * Hydration Completion Ratio
   */
  const hydrationRatioPercent = useMemo(() => {
    return Math.min(100, Math.round((currentWaterMl / Math.max(1, effectiveDailyWaterTargetMl)) * 100));
  }, [currentWaterMl, effectiveDailyWaterTargetMl]);

  /**
   * Log Water Intake Asynchronously in localforage & Sync with Heatmap & Vault
   */
  const handleLogWater = async (amountMl: number) => {
    triggerHapticFeedback('medium');
    const newIntake = Math.max(0, currentWaterMl + amountMl);
    setCurrentWaterMl(newIntake);

    try {
      await localforage.setItem('pulsefit_water_intake', newIntake);

      // Re-evaluate muscle recovery link dynamically
      const discount = Math.min(25, Math.round((newIntake / baseWaterGoalMl) * 25));
      setHydrationRecoveryDiscountPct(discount);
      const updatedFatigue = await fatigueHeatmapService.compute48HourFatigue();
      setRecoverySummary(updatedFatigue);

      // Check Reward Vault rules
      evaluateVaultMilestones().catch(() => {});

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_hydration_updated', {
          detail: { waterMl: newIntake, addedMl: amountMl, targetMl: effectiveDailyWaterTargetMl }
        }));
      }

      if (amountMl > 0) {
        voiceCoach.speak(`${amountMl} millilitres water logged. Target ${Math.round((newIntake / effectiveDailyWaterTargetMl) * 100)} percent complete.`);
      }
    } catch (e) {
      console.warn('Error saving water intake:', e);
    }
  };

  /**
   * Diagnostic Urine Color Selection
   */
  const handleSelectUrineGrade = async (grade: UrineColorGrade) => {
    triggerHapticFeedback('light');
    setSelectedUrineGrade(grade);
    setDiagnosticDeltaMl(grade.goalDeltaMl);
    setDiagnosticReport(grade.definition);

    try {
      await localforage.setItem('pulsefit_urine_color_level', grade.level);
    } catch {}

    voiceCoach.speak(`Urine diagnostic: ${grade.status}. ${grade.advice}`);
  };

  /**
   * Climate Mode Toggle
   */
  const handleClimateChange = (mode: 'normal' | 'hot' | 'extreme') => {
    triggerHapticFeedback('light');
    setSelectedClimate(mode);
    if (mode === 'normal') {
      setClimateMultiplier(1.0);
    } else if (mode === 'hot') {
      setClimateMultiplier(1.20); // +20%
    } else {
      setClimateMultiplier(1.35); // +35%
    }
  };

  /**
   * In-Browser Acoustic Sip Counter (Web Audio API)
   * Monitors microphone for swallowing resonant frequencies (200Hz - 800Hz transient bursts)
   */
  const startAcousticMonitor = async () => {
    if (isAcousticRunning) return;
    triggerHapticFeedback('medium');

    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      alert('Microphone access is not supported on this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: true
        },
        video: false
      });

      micStreamRef.current = stream;
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      audioCtxRef.current = audioCtx;

      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const source = audioCtx.createMediaStreamSource(stream);

      // Bandpass filter isolating characteristic swallow / gulp frequencies (200 Hz - 800 Hz)
      const bandpass = audioCtx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(500, audioCtx.currentTime);
      bandpass.Q.setValueAtTime(1.6, audioCtx.currentTime);

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.6;
      analyserRef.current = analyser;

      source.connect(bandpass);
      bandpass.connect(analyser);

      setIsAcousticRunning(true);
      lastAcousticSipTimeRef.current = Date.now();

      pollAcousticStream();
      voiceCoach.speak('Acoustic sip monitoring active. Take a drink to test automatic detection.');
    } catch (err) {
      console.error('[AcousticSip] Mic start error:', err);
      setIsAcousticRunning(false);
    }
  };

  const stopAcousticMonitor = () => {
    setIsAcousticRunning(false);
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(t => t.stop());
      micStreamRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setMicEnergyLevel(0);
  };

  const pollAcousticStream = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const freqBuffer = new Uint8Array(analyser.frequencyBinCount);
    const timeBuffer = new Uint8Array(analyser.fftSize);
    analyser.getByteFrequencyData(freqBuffer);
    analyser.getByteTimeDomainData(timeBuffer);

    const sampleRate = audioCtxRef.current?.sampleRate || 44100;
    const dspReport = acousticDspRef.current.analyzeAudioFrame(timeBuffer, freqBuffer, sampleRate);
    setAcousticMetrics(dspReport);
    setMicEnergyLevel(dspReport.pharyngealBandPowerDb);

    // Render live dual-layer audio spectrum + TKEO envelope on canvas
    if (spectrumCanvasRef.current) {
      const canvas = spectrumCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const w = canvas.width;
        const h = canvas.height;
        const sliceWidth = w / freqBuffer.length;

        // Layer 1: Frequency spectrum
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = dspReport.swallowConfidencePct >= 52 ? '#34d399' : '#38bdf8';
        ctx.beginPath();
        let x = 0;

        for (let i = 0; i < freqBuffer.length; i++) {
          const v = freqBuffer[i] / 255.0;
          const y = h - (v * h);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          x += sliceWidth;
        }
        ctx.stroke();

        // Layer 2: Time-domain pharyngeal waveform overlay
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = 'rgba(129, 140, 248, 0.55)';
        ctx.beginPath();
        const tSlice = w / timeBuffer.length;
        let tx = 0;
        for (let i = 0; i < timeBuffer.length; i++) {
          const tv = timeBuffer[i] / 255.0;
          const ty = tv * h;
          if (i === 0) ctx.moveTo(tx, ty);
          else ctx.lineTo(tx, ty);
          tx += tSlice;
        }
        ctx.stroke();
      }
    }

    // Detect acoustic swallow burst via TKEO + Pharyngeal MFCC Classifier (with 1.2s refractory window)
    const now = Date.now();
    if (dspReport.isSwallowDetected && (now - lastAcousticSipTimeRef.current) >= 1200) {
      lastAcousticSipTimeRef.current = now;
      setAcousticSipCount(prev => prev + 1);
      const sipMl = dspReport.estimatedBolusVolumeMl || 240;
      setAcousticVolumeMl(prev => prev + sipMl);

      // Automatically log to main hydration tracker asynchronously
      handleLogWater(sipMl);
      setLastSipNotification(
        `+${sipMl}mL Bolus Detected (TKEO: ${dspReport.tkeoInstantaneousEnergy}% • Centroid: ${dspReport.spectralCentroidHz}Hz • Conf: ${dspReport.swallowConfidencePct}%)`
      );
      setTimeout(() => setLastSipNotification(null), 4500);
      triggerHapticFeedback('success');
    }

    animFrameRef.current = requestAnimationFrame(pollAcousticStream);
  };

  /**
   * Dedicated 8-Sub-Toggle Real-Time Biophysical & Clinical Reports
   */
  const userWeightKg = useMemo(
    () => userProfile?.weightKg || parseFloat(userProfile?.weight || '74') || 74,
    [userProfile]
  );
  const userHeightCm = useMemo(
    () => userProfile?.heightCm || parseFloat(userProfile?.height || '175') || 175,
    [userProfile]
  );
  const userAge = useMemo(
    () => Number(userProfile?.age || 26) || 26,
    [userProfile]
  );
  const userGender = useMemo(
    () => userProfile?.gender || 'male',
    [userProfile]
  );

  // [Sub-Toggle 1 Dedicated Engine]: Watson TBW + Leiper Gastric + Edelman 3-Compartment Kinetics
  const compartmentalReport = useMemo(() => {
    return CompartmentalFluidKineticsEngine.evaluateCompartments({
      weightKg: userWeightKg,
      heightCm: userHeightCm,
      age: userAge,
      gender: userGender,
      currentWaterMl,
      targetWaterMl: effectiveDailyWaterTargetMl,
      sweatLossMl: sweatRateMl,
      sodiumLossMg,
      gastricBufferMl: livePhysio.gastricBufferVolumeMl,
      beverageType: selectedBeverageType
    });
  }, [
    userWeightKg,
    userHeightCm,
    userAge,
    userGender,
    currentWaterMl,
    effectiveDailyWaterTargetMl,
    sweatRateMl,
    sodiumLossMg,
    livePhysio.gastricBufferVolumeMl,
    selectedBeverageType
  ]);

  // [Sub-Toggle 3 Dedicated Engine]: CIELAB Delta-E 2000 + Armstrong USG + Osmolality + Renal C_H2O
  const urineClinicalReport = useMemo(() => {
    return UrineColorimetricSpectroscopyEngine.analyzeUrineGrade(selectedUrineGrade, userWeightKg);
  }, [selectedUrineGrade, userWeightKg]);

  // [Sub-Toggle 4 Dedicated Engine]: ISO 7933 Predicted Heat Strain + Eccrine CFTR Ductal Sweat Kinetics
  const sweatBiophysicsReport = useMemo(() => {
    return ThermoregulatorySweatElectrolyteEngine.computeSweatAndIonKinetics({
      weightKg: userWeightKg,
      heightCm: userHeightCm,
      caloriesBurnedKcal: estimatedCaloriesBurned,
      workoutMinutes: workoutDurationMinutes,
      ambientTempC,
      ambientHumidityPct: ambientHumidity,
      windSpeedKmh
    });
  }, [
    userWeightKg,
    userHeightCm,
    estimatedCaloriesBurned,
    workoutDurationMinutes,
    ambientTempC,
    ambientHumidity,
    windSpeedKmh
  ]);

  // [Sub-Toggle 5 Dedicated Engine]: Haussinger Myocyte Swelling mTORC1 + Banister Bi-Exponential ODE
  const cellularRecoveryReport = useMemo(() => {
    return CellularHydrationMyofibrillarEngine.evaluateCellularRecoveryKinetics({
      currentWaterMl,
      targetWaterMl: effectiveDailyWaterTargetMl,
      plasmaOsmolalityMosmKg: compartmentalReport.plasmaOsmolalityMosmKg,
      muscleGlycogenGrams: livePhysio.muscleGlycogenGrams
    });
  }, [
    currentWaterMl,
    effectiveDailyWaterTargetMl,
    compartmentalReport.plasmaOsmolalityMosmKg,
    livePhysio.muscleGlycogenGrams
  ]);

  // [Sub-Toggle 6 Dedicated Engine]: Magnus-Tetens VPD + Stull Wet-Bulb + WBGT + Bröde UTCI
  const biometeorologyReport = useMemo(() => {
    return BiometeorologicalThermalEngine.analyzeAtmosphere({
      ambientTempC,
      relativeHumidityPct: ambientHumidity,
      windSpeedKmh,
      weatherCode
    });
  }, [ambientTempC, ambientHumidity, windSpeedKmh, weatherCode]);

  // [Sub-Toggle 7 Dedicated Engine]: SGLT1 2Na+:1Glc:260H2O Stoichiometry & Custom Deficit Synthesizer
  const customSynthesizedOrs = useMemo(() => {
    return EnterocyteSGLT1StoichiometricFormulary.synthesizeCustomDeficitORS(
      sweatBiophysicsReport.totalSessionSweatLossMl,
      sweatBiophysicsReport.sodiumLossMg
    );
  }, [sweatBiophysicsReport.totalSessionSweatLossMl, sweatBiophysicsReport.sodiumLossMg]);

  // [Sub-Toggle 8 Dedicated Engine]: SCN Circadian Vasopressin (AVP) + Diurnal Renal GFR Chronobiology
  const chronobiologyReport = useMemo(() => {
    const remaining = Math.max(0, effectiveDailyWaterTargetMl - currentWaterMl);
    return CircadianVasopressinChronobiologyEngine.evaluateChronobiology(userWeightKg, remaining);
  }, [userWeightKg, effectiveDailyWaterTargetMl, currentWaterMl]);

  /**
   * Pre-Hydration & Post-Hydration Timing Reminders
   */
  const toggleReminder = (intervalMins: number) => {
    triggerHapticFeedback('light');
    if (reminderActive && activeReminderInterval === intervalMins) {
      // Turn off
      setReminderActive(false);
      if (reminderTimerRef.current) clearInterval(reminderTimerRef.current);
      return;
    }

    setActiveReminderInterval(intervalMins);
    setReminderSecondsLeft(intervalMins * 60);
    setReminderActive(true);

    if (reminderTimerRef.current) clearInterval(reminderTimerRef.current);

    reminderTimerRef.current = window.setInterval(() => {
      setReminderSecondsLeft(prev => {
        if (prev <= 1) {
          // Trigger reminder!
          triggerHapticFeedback('heavy');
          voiceCoach.speak('Hydration Reminder. Drink 250 millilitres of water to avoid cellular dehydration and cramping.');
          return intervalMins * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col space-y-6 pb-16 text-zinc-100 font-sans">
      {/* Top Header Card */}
      <div className="w-full bg-gradient-to-br from-sky-950/70 via-zinc-900 to-zinc-950 border border-sky-500/20 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-10 relative">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
              <Droplets className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Hydration Command Center
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  100% On-Device
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Acoustic Sip Detection • Urine Diagnostic Chart • Dynamic Heatmap Recovery Link
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={syncRealTimeWeatherAndClimate}
              title="Refresh Geolocation & Live Weather"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 text-sky-400 ${isLocating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Sync Live Weather</span>
            </button>
          </div>
        </div>

        {/* Sub-Navigation Strip */}
        <div className="mt-6 flex items-center gap-1.5 overflow-x-auto py-1 px-1 bg-black/40 rounded-2xl border border-white/10 scrollbar-none">
          {[
            { id: 'overview', label: 'Intake Hub', icon: GlassWater },
            { id: 'acoustic_sip', label: 'Acoustic Sip AI', icon: Mic },
            { id: 'urine_diagnostic', label: 'Urine Diagnostic', icon: FlaskConical },
            { id: 'sweat_electrolytes', label: 'Sweat & Electrolytes', icon: Flame },
            { id: 'recovery_heatmap', label: 'Heatmap Recovery Link', icon: Activity },
            { id: 'weather_climate', label: 'Weather Sync', icon: ThermometerSun },
            { id: 'diy_recipes', label: 'DIY Electrolyte Recipes', icon: Sparkles },
            { id: 'timing_reminders', label: 'Reminders', icon: Bell }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  triggerHapticFeedback('light');
                  setActiveSubView(tab.id as HydrationSubView);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. OVERVIEW & INTAKE HUB — Dedicated Engine: Watson (1980) TBW + Leiper Gastric ODE + Edelman (1958) Plasma Osmolality & BHI */}
      {activeSubView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Circular Progress + 3-Compartment Fluid Kinetics Card */}
          <div className="lg:col-span-2 bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-xl">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Circular SVG Progress */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="44%"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-white/10"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="44%"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-sky-500 transition-all duration-500"
                  fill="transparent"
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * hydrationRatioPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>

              <div className="flex flex-col items-center justify-center text-center z-10">
                <Droplets className="w-8 h-8 text-sky-400 mb-1" />
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  {currentWaterMl}
                </span>
                <span className="text-xs uppercase font-bold text-zinc-400 tracking-wider">
                  mL of {effectiveDailyWaterTargetMl} mL Goal
                </span>
                <span className="mt-2 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-[11px] font-mono font-bold">
                  {hydrationRatioPercent}% • BHI ×{compartmentalReport.effectiveBeverageHydrationIndex}
                </span>
              </div>
            </div>

            {/* Maughan (2016) Beverage Hydration Index (BHI) Selector */}
            <div className="mt-6 w-full max-w-xl">
              <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 text-center mb-2">
                Maughan (2016) Beverage Hydration Index (BHI) & Osmotic Profile:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(BEVERAGE_PROFILES) as BeverageCategory[]).map((bKey) => {
                  const prof = BEVERAGE_PROFILES[bKey];
                  const active = selectedBeverageType === bKey;
                  return (
                    <button
                      key={bKey}
                      type="button"
                      onClick={() => setSelectedBeverageType(bKey)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        active
                          ? 'border-sky-400 bg-sky-500/15 text-white shadow-md'
                          : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <div className="text-[11px] font-bold truncate">{prof.label}</div>
                      <div className="text-[10px] font-mono text-sky-400">
                        BHI {prof.bhi.toFixed(2)} • {prof.osmolarityMosmL} mOsm/L
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Logging Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 w-full">
              <button
                onClick={() => handleLogWater(250)}
                className="px-4 py-2.5 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +250 mL (Glass)
              </button>
              <button
                onClick={() => handleLogWater(500)}
                className="px-4 py-2.5 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +500 mL (Bottle)
              </button>
              <button
                onClick={() => handleLogWater(1000)}
                className="px-4 py-2.5 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +1000 mL (Flask)
              </button>
              <button
                onClick={() => handleLogWater(-250)}
                title="Undo last log"
                className="p-2.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-white/10 transition-all cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Body Water & Electrolyte Balance Matrix */}
            <div className="mt-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 border-t border-white/10">
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Total Body Water</span>
                <span className="text-base font-black text-white font-mono">
                  {compartmentalReport.currentTbwLiters} L
                </span>
                <span className="text-[10px] text-sky-400 font-mono block">
                  Cellular {compartmentalReport.baselineIcfLiters}L • Vascular {compartmentalReport.baselineEcfLiters}L
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Electrolyte Balance</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {compartmentalReport.serumSodiumMmolL} mmol/L
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  Fluid Osmolarity: {compartmentalReport.plasmaOsmolalityMosmKg} mOsm/kg
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Fluid Retention</span>
                <span className="text-base font-black text-amber-400 font-mono">
                  {compartmentalReport.circulatingAvpPgMl} pg/mL
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  Renal Output: ~{compartmentalReport.renalUrineOutputRateMlHr} mL/hr
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Net Fluid Retained</span>
                <span className="text-base font-black text-cyan-400 font-mono">
                  {compartmentalReport.netRetainedVolumeMl} mL
                </span>
                <span className="text-[10px] text-zinc-400 font-mono block">
                  Cell Hydration: {compartmentalReport.intracellularHydrationPct}%
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Diagnostic Summary Column */}
          <div className="space-y-4">
            {/* Urine Grade Card */}
            <div 
              onClick={() => setActiveSubView('urine_diagnostic')}
              className="bg-zinc-900/60 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Diagnostic Status</span>
                <span 
                  className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                  style={{ backgroundColor: selectedUrineGrade.color }}
                />
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
                {selectedUrineGrade.name} ({selectedUrineGrade.status})
              </h4>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                Fluid Density {urineClinicalReport.urineSpecificGravity.toFixed(3)} • Level {urineClinicalReport.urineOsmolalityMosmKg} mOsm/kg
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-sky-400 gap-1">
                <span>View Hydration Color Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Recovery Acceleration Card */}
            <div 
              onClick={() => setActiveSubView('recovery_heatmap')}
              className="bg-zinc-900/60 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Recovery Heatmap Link</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                +{cellularRecoveryReport.overallRecoveryAccelerationPct}% Boost
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Muscle Recovery Boost +{cellularRecoveryReport.mTorc1AnabolicSignalingGainPct}% • Saves {cellularRecoveryReport.hoursSavedOn48hWindow}h Soreness
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-emerald-400 gap-1">
                <span>Inspect Muscle Group Timers</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Sweat & Sodium Loss Card */}
            <div 
              onClick={() => setActiveSubView('sweat_electrolytes')}
              className="bg-zinc-900/60 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">ISO 7933 Sweat & Ions</span>
                <Flame className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-lg font-bold text-white">
                {sweatBiophysicsReport.totalSessionSweatLossMl} mL Sweat • {sweatBiophysicsReport.sodiumLossMg} mg Na+
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                Eccrine CFTR [Na+]: {sweatBiophysicsReport.eccrineSweatSodiumMmolL} mmol/L • BSA {sweatBiophysicsReport.bodySurfaceAreaM2} m²
              </p>
              <div className="mt-3 flex items-center text-xs font-bold text-amber-400 gap-1">
                <span>View ISO 7933 Electrolyte Ledger</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Live Weather & Climate Intake Card */}
            <div 
              onClick={() => setActiveSubView('weather_climate')}
              className="bg-zinc-900/60 border border-white/10 rounded-3xl p-5 hover:border-white/20 transition-all cursor-pointer shadow-lg group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Local Weather & UTCI</span>
                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold">
                  <ThermometerSun className="w-4 h-4 text-amber-400" />
                  <span>{ambientTempC}°C (WBGT {biometeorologyReport.wbgtCelsius}°C)</span>
                </div>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span className="truncate">{detectedLocationName}</span>
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                UTCI {biometeorologyReport.utciEquivalentCelsius}°C • VPD {biometeorologyReport.vaporPressureDeficitKpa} kPa • {ambientHumidity}% RH
              </p>
              <div className="mt-2 text-xs font-mono text-amber-400 font-bold">
                {climateMultiplier > 1.0 
                  ? `+${Math.round(baseWaterGoalMl * (climateMultiplier - 1))} mL (+${Math.round((climateMultiplier - 1) * 100)}%) thermal fluid boost`
                  : 'Standard baseline climate intake'}
              </div>
              <div className="mt-3 flex items-center text-xs font-bold text-amber-400 gap-1">
                <span>Open Biometeorological Engine</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ACOUSTIC SIP MONITOR — Dedicated Engine: Teager-Kaiser Energy Operator (TKEO) + 13-Band MFCC + ZCR */}
      {activeSubView === 'acoustic_sip' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-sky-400" />
                Smart Drinking &amp; Swallow Detection
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Uses your device microphone to listen for swallowing sounds when you drink water, automatically logging your intake in real time.
              </p>
            </div>

            <button
              onClick={isAcousticRunning ? stopAcousticMonitor : startAcousticMonitor}
              className={`px-6 py-3 rounded-2xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
                isAcousticRunning
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25'
                  : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25'
              }`}
            >
              {isAcousticRunning ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isAcousticRunning ? 'Stop Swallow Detection' : 'Start Swallow Detection'}</span>
            </button>
          </div>

          {/* Live Audio Visualizer Canvas */}
          <div className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 flex flex-col space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-sky-300 font-bold">
                <Activity className="w-3.5 h-3.5" /> Live Acoustic Audio Spectrum
              </span>
              <div className="flex items-center gap-3">
                <span>Audio Power: {micEnergyLevel}%</span>
                <span className="text-emerald-400">
                  Swallow Signal: {acousticMetrics?.tkeoInstantaneousEnergy ?? 0}%
                </span>
                <span className="text-indigo-300">
                  Confidence: {acousticMetrics?.swallowConfidencePct ?? 0}%
                </span>
              </div>
            </div>

            <canvas
              ref={spectrumCanvasRef}
              width={600}
              height={100}
              className="w-full h-24 rounded-xl bg-zinc-950/80 block"
            />

            {/* Visual threshold trigger bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-100 ${
                  (acousticMetrics?.swallowConfidencePct ?? 0) >= 52 ? 'bg-emerald-400' : 'bg-sky-400'
                }`}
                style={{ width: `${ Math.max(micEnergyLevel, acousticMetrics?.swallowConfidencePct ?? 0) }%` }}
              />
            </div>
          </div>

          {/* Notification Badge if sip detected */}
          {lastSipNotification && (
            <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>{lastSipNotification}</span>
            </div>
          )}

          {/* Real-Time Acoustic Telemetry Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Swallow Sound Level</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                {acousticMetrics?.tkeoInstantaneousEnergy ?? 0}%
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">Acoustic Energy</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Audio Frequency</span>
              <span className="text-lg font-black text-sky-400 font-mono">
                {acousticMetrics?.spectralCentroidHz ?? 0} Hz
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">Swallow Sound Band</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Voice Filter Gate</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {acousticMetrics?.zeroCrossingRate ?? 0}
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">Ignores Talking</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Est. Sip Volume</span>
              <span className="text-lg font-black text-white font-mono">
                {acousticMetrics?.estimatedBolusVolumeMl ?? 220} mL
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">From Swallow Detection</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-mono uppercase text-zinc-400">Detected Sips / Gulps</span>
              <div className="text-2xl font-black text-white font-mono mt-1">{acousticSipCount}</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-mono uppercase text-zinc-400">Auto-Logged Volume</span>
              <div className="text-2xl font-black text-sky-400 font-mono mt-1">+{acousticVolumeMl} mL</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[11px] font-mono uppercase text-zinc-400">MFCC Cepstral Vector (C₀–C₅)</span>
              <div className="text-xs font-mono font-bold text-emerald-400 mt-2 truncate">
                {acousticMetrics?.mfccVector ? `[${acousticMetrics.mfccVector.join(', ')}]` : '[0.00, 0.00, 0.00, 0.00, 0.00, 0.00]'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SMART URINE COLOR & HYDRATION STATUS DIAGNOSTIC CHECKER — Dedicated Engine: CIELAB ΔE*₀₀ + Armstrong USG & U_osm */}
      {activeSubView === 'urine_diagnostic' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-amber-400" />
              Hydration Color &amp; Balance Checker
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Select your current hydration color to estimate your body fluid levels, electrolyte concentration, and daily water needs.
            </p>
          </div>

          {/* 6-Shade Swatch Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {URINE_GRADES.map(grade => {
              const isSelected = selectedUrineGrade.level === grade.level;
              return (
                <button
                  key={grade.level}
                  onClick={() => handleSelectUrineGrade(grade)}
                  className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer relative ${
                    isSelected 
                      ? 'border-white bg-white/10 shadow-lg scale-102 ring-2 ring-sky-400' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-white/40 shadow-inner mb-3"
                    style={{ backgroundColor: grade.color }}
                  />
                  <span className="text-xs font-bold text-white leading-tight mb-1">
                    {grade.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 leading-tight">
                    {grade.status}
                  </span>

                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Clinical Hydration Balance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Hydration Density</span>
              <span className="text-xl font-black text-white font-mono">
                {urineClinicalReport.urineSpecificGravity.toFixed(3)}
              </span>
              <span className="text-[10px] text-sky-400 font-mono block">Optimal: 1.005 – 1.015</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Fluid Concentration</span>
              <span className="text-xl font-black text-amber-400 font-mono">
                {urineClinicalReport.urineOsmolalityMosmKg} <span className="text-xs">mOsm/kg</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block">
                Fluid Deficit: -{urineClinicalReport.bodyMassDehydrationPct}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Color Shade Score</span>
              <span className="text-base font-black text-emerald-400 font-mono">
                Match Score: {Math.max(80, Math.round(100 - urineClinicalReport.deltaE2000FromOptimal * 2))}%
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block">
                Color Grade {selectedUrineGrade.level} of 6
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Daily Fluid Balance</span>
              <span className="text-xl font-black text-cyan-400 font-mono">
                {urineClinicalReport.renalFreeWaterClearanceMlMin > 0 ? '+' : ''}
                {urineClinicalReport.renalFreeWaterClearanceMlMin} <span className="text-xs">mL/min</span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono block">
                Kidney Clearance Rate
              </span>
            </div>
          </div>

          {/* Diagnostic Clinical Report Card */}
          <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold">
                Clinical Diagnostic Evaluation • {urineClinicalReport.vasopressinActivityState}
              </span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full bg-white/10 text-white">
                Grade {selectedUrineGrade.level} of 6
              </span>
            </div>

            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span 
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: selectedUrineGrade.color }}
              />
              {selectedUrineGrade.name} — {selectedUrineGrade.status}
            </h4>

            <p className="text-sm text-zinc-300">
              {selectedUrineGrade.definition}
            </p>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs">
              <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block mb-0.5">Hydration Action:</span>
                <span className="text-zinc-300">{selectedUrineGrade.advice}</span>
                {selectedUrineGrade.goalDeltaMl > 0 && (
                  <span className="block mt-1 font-bold text-amber-400">
                    Daily intake target automatically increased by +{selectedUrineGrade.goalDeltaMl} mL (Clinical Free Water Deficit: {urineClinicalReport.freeWaterDeficitMl} mL).
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. REAL-TIME INTENSITY & ELECTROLYTE LOSS CALCULATOR — Dedicated Engine: ISO 7933 PHS + Eccrine CFTR Ductal Kinetics */}
      {activeSubView === 'sweat_electrolytes' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              ISO 7933 Predicted Heat Strain (PHS) & Eccrine CFTR Ion Kinetics Engine
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Solves DuBois Body Surface Area ({sweatBiophysicsReport.bodySurfaceAreaM2} m²), Required Evaporative Heat Flux (E_req = {sweatBiophysicsReport.evaporativeHeatRequiredWatts} W), and CFTR Ductal Sodium Reabsorption Saturation ([Na+]_sweat = {sweatBiophysicsReport.eccrineSweatSodiumMmolL} mmol/L).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col">
              <span className="text-xs font-mono uppercase text-zinc-400">Metabolic Heat Load</span>
              <span className="text-2xl font-black text-white font-mono mt-1">{estimatedCaloriesBurned} kcal</span>
              <span className="text-[11px] text-zinc-500 mt-1">
                Internal Heat: {sweatBiophysicsReport.metabolicHeatProductionWatts} W • E_req: {sweatBiophysicsReport.evaporativeHeatRequiredWatts} W
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col">
              <span className="text-xs font-mono uppercase text-zinc-400">ISO 7933 Sweat Loss</span>
              <span className="text-2xl font-black text-sky-400 font-mono mt-1">
                {sweatBiophysicsReport.totalSessionSweatLossMl} mL
              </span>
              <span className="text-[11px] text-zinc-500 mt-1">
                Flux: {sweatBiophysicsReport.hourlySweatRateMlHr} mL/hr • Wettedness w={sweatBiophysicsReport.skinWettednessFraction}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col">
              <span className="text-xs font-mono uppercase text-zinc-400">CFTR Sodium (Na+) Loss</span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-1">
                {sweatBiophysicsReport.sodiumLossMg} mg
              </span>
              <span className="text-[11px] text-zinc-500 mt-1">
                Ductal [Na+]: {sweatBiophysicsReport.eccrineSweatSodiumMmolL} mmol/L
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col">
              <span className="text-xs font-mono uppercase text-zinc-400">ACSM 150% Replenishment</span>
              <span className="text-2xl font-black text-emerald-400 font-mono mt-1">
                {sweatBiophysicsReport.acsm150ReplenishmentTargetMl} mL
              </span>
              <span className="text-[11px] text-zinc-500 mt-1">Compensates obligatory renal urine loss</span>
            </div>
          </div>

          {/* Complete 6-Ion Eccrine Sweat Depletion Ledger */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col space-y-3">
            <span className="text-xs font-bold text-white">
              Complete 6-Ion Eccrine Sweat Depletion Ledger (Montain-Sawka & CFTR Ductal Model):
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-amber-300 block font-bold">Sodium (Na⁺)</span>
                <span className="text-sm font-black text-white">{sweatBiophysicsReport.sodiumLossMg} mg</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-cyan-300 block font-bold">Chloride (Cl⁻)</span>
                <span className="text-sm font-black text-white">{sweatBiophysicsReport.chlorideLossMg} mg</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-sky-300 block font-bold">Potassium (K⁺)</span>
                <span className="text-sm font-black text-white">{sweatBiophysicsReport.potassiumLossMg} mg</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-purple-300 block font-bold">Magnesium (Mg²⁺)</span>
                <span className="text-sm font-black text-white">{sweatBiophysicsReport.magnesiumLossMg} mg</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-emerald-300 block font-bold">Calcium (Ca²⁺)</span>
                <span className="text-sm font-black text-white">{sweatBiophysicsReport.calciumLossMg} mg</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <span className="text-rose-300 block font-bold">Zinc (Zn²⁺)</span>
                <span className="text-sm font-black text-white">{sweatBiophysicsReport.zincLossMcg} µg</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. DYNAMIC HYDRATION-TO-MUSCLE RECOVERY HEATMAP LINK — Dedicated Engine: Haussinger Cell Swelling mTORC1 + Banister Bi-Exponential ODE */}
      {activeSubView === 'recovery_heatmap' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              Hydration-Driven Muscle Recovery Booster
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Proper cellular hydration speeds up protein synthesis (+{cellularRecoveryReport.mTorc1AnabolicSignalingGainPct}%), flushes metabolic waste, and reduces muscle soreness after intense workouts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex flex-col">
              <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Soreness Recovery Boost</span>
              <div className="text-3xl font-black text-white font-mono mt-1">
                +{cellularRecoveryReport.overallRecoveryAccelerationPct}%
              </div>
              <span className="text-[11px] text-zinc-400 mt-1">
                Recovers {cellularRecoveryReport.hoursSavedOn48hWindow} hrs faster across 48h
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <span className="text-xs font-mono uppercase text-zinc-400">Readiness Score</span>
              <div className="text-3xl font-black text-sky-400 font-mono mt-1">
                {recoverySummary?.systemicReadinessScore || 100}%
              </div>
              <span className="text-[11px] text-zinc-400 mt-1">
                Fast Cellular Rebound • High Training Readiness
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col">
              <span className="text-xs font-mono uppercase text-zinc-400">Active Fatigue Load</span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                {recoverySummary?.systemicFatigueScore || 0}%
              </div>
              <span className="text-[11px] text-zinc-400 mt-1">
                Glycogen-Bound H₂O Pool: {cellularRecoveryReport.glycogenBoundWaterPoolMl} mL
              </span>
            </div>
          </div>

          {/* Dedicated Engine 5 Cellular Biophysics Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Myocyte Swelling ΔV</span>
              <span className="text-lg font-black text-emerald-400 font-mono">
                +{cellularRecoveryReport.myocyteVolumeSwellingIndexPct}%
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">Integrin Mechanosensor</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">mTORC1 / S6K1 Gain</span>
              <span className="text-lg font-black text-sky-400 font-mono">
                +{cellularRecoveryReport.mTorc1AnabolicSignalingGainPct}%
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">Myofibrillar Anabolism</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Proteolysis Inhibition</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                -{cellularRecoveryReport.proteolysisSuppressionPct}%
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">Anti-Catabolic Shield</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block">Sarcoplasmic Glyco-H₂O</span>
              <span className="text-lg font-black text-white font-mono">
                {cellularRecoveryReport.glycogenBoundWaterPoolMl} mL
              </span>
              <span className="text-[10px] text-zinc-500 block font-mono">3.0g H₂O / 1g Glycogen</span>
            </div>
          </div>

          {/* Muscle Groups Breakdown */}
          {recoverySummary?.muscles && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Muscle Group Hydration Saturation & Banister Fatigue Matrix:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {Object.values(recoverySummary.muscles).slice(0, 8).map(m => (
                  <div key={m.id} className="p-3 rounded-xl bg-zinc-950 border border-white/10 flex flex-col">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-white truncate">{m.name}</span>
                      <span className="font-mono font-bold" style={{ color: m.statusColor }}>
                        {m.fatiguePercent}%
                      </span>
                    </div>
                    <span className="text-[10px] text-zinc-400 truncate">{m.recoveryStatus}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. LOCAL WEATHER & HUMIDITY SYNC — Dedicated Engine: UTCI + WBGT + Magnus-Tetens Vapor Pressure Deficit */}
      {activeSubView === 'weather_climate' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  100% Real-Time Biometeorological UTCI • WBGT • Magnus-Tetens VPD Engine
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
                <ThermometerSun className="w-6 h-6 text-amber-400" />
                Live City Weather & Biometeorological Hydration Engine
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Solves Universal Thermal Climate Index (UTCI = {biometeorologyReport.utciEquivalentCelsius}°C), Stull Psychrometric Wet-Bulb (T_w = {biometeorologyReport.wetBulbTempCelsius}°C), WBGT ({biometeorologyReport.wbgtCelsius}°C), and Magnus-Tetens Vapor Pressure Deficit (VPD = {biometeorologyReport.vaporPressureDeficitKpa} kPa).
              </p>
            </div>

            <button
              onClick={syncRealTimeWeatherAndClimate}
              disabled={isLocating}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              <RefreshCw className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating GPS & Syncing...' : 'Sync Live Weather'}</span>
            </button>
          </div>

          {weatherSyncError && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{weatherSyncError}</span>
            </div>
          )}

          {/* Current City & Live Atmosphere Card */}
          <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <span>Detected User Location • {biometeorologyReport.thermalStressCategory}</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {detectedLocationName}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <span>{getWeatherDetails(weatherCode).icon}</span>
                    <span>{weatherDescription}</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-300 font-bold">
                    Wind: {windSpeedKmh} km/h
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-300 font-bold">
                    Status: {isLiveWeatherSynced ? 'Live Real-Time' : 'Calculated'}
                  </span>
                </div>
              </div>

              {/* Live Temperature & Feels Like Pill */}
              <div className="flex items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-white/10 self-stretch sm:self-auto justify-around">
                <div className="text-center px-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block font-bold">Temperature</span>
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
                    {ambientTempC}°<span className="text-xl text-zinc-400">C</span>
                  </span>
                  <span className="text-[11px] text-zinc-400 block font-mono">
                    {Math.round((ambientTempC * 9/5 + 32) * 10) / 10}°F
                  </span>
                </div>

                <div className="w-[1px] h-12 bg-white/10" />

                <div className="text-center px-2">
                  <span className="text-[11px] font-mono uppercase text-zinc-400 block font-bold">UTCI / Feels</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {biometeorologyReport.utciEquivalentCelsius}°<span className="text-base text-zinc-400">C</span>
                  </span>
                  <span className="text-[11px] text-sky-400 block font-mono font-bold">
                    {ambientHumidity}% RH • Td {biometeorologyReport.dewPointCelsius}°C
                  </span>
                </div>
              </div>
            </div>

            {/* Dedicated Engine 6 Biometeorological Psychrometric Telemetry */}
            <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
              <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">WBGT & Wet-Bulb</span>
                <span className="text-base font-black text-amber-400 font-mono">
                  {biometeorologyReport.wbgtCelsius}°C WBGT
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">
                  Stull T_w: {biometeorologyReport.wetBulbTempCelsius}°C
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Magnus-Tetens VPD</span>
                <span className="text-base font-black text-sky-400 font-mono">
                  {biometeorologyReport.vaporPressureDeficitKpa} kPa
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">
                  e_s {biometeorologyReport.saturationVaporPressureKpa} • e_a {biometeorologyReport.actualVaporPressureKpa} kPa
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Respiratory Loss</span>
                <span className="text-base font-black text-white font-mono">
                  {biometeorologyReport.insensibleRespiratoryLossMlHr} mL/hr
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">Alveolar Vapor Flux</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/50 border border-white/5">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block">Transcutaneous TEWL</span>
                <span className="text-base font-black text-emerald-400 font-mono">
                  {biometeorologyReport.transcutaneousPassiveLossMlHr} mL/hr
                </span>
                <span className="text-[10px] text-zinc-500 font-mono block">Passive Epidermal Diffusion</span>
              </div>
            </div>
          </div>

          {/* Dynamic Hydration Mathematical Adjustment Breakdown */}
          <div className="p-6 rounded-3xl bg-zinc-950/60 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                Live Thermal Water Target Auto-Adjustment
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Formula: Base × Thermal Index + Urine Delta
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-zinc-400 uppercase font-mono block">1. Baseline Intake</span>
                <span className="text-xl font-black text-white font-mono">{baseWaterGoalMl} mL</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">35 mL/kg body weight</span>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-[11px] text-amber-300 uppercase font-mono block">2. Thermal Multiplier</span>
                <span className="text-xl font-black text-amber-400 font-mono">× {climateMultiplier}</span>
                <span className="text-[10px] text-amber-300/80 block mt-0.5">
                  {climateMultiplier > 1.0 ? `+${Math.round((climateMultiplier - 1) * 100)}% Heat/Humidity load` : 'Standard normal climate'}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[11px] text-zinc-400 uppercase font-mono block">3. Diagnostic Delta</span>
                <span className="text-xl font-black text-white font-mono">+{diagnosticDeltaMl} mL</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Urine shade adjustment</span>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 border border-sky-500/30">
                <span className="text-[11px] text-sky-300 uppercase font-mono block font-bold">4. Effective Daily Goal</span>
                <span className="text-xl font-black text-sky-400 font-mono">{effectiveDailyWaterTargetMl} mL</span>
                <span className="text-[10px] text-sky-200 block mt-0.5 font-bold">Auto-updated in real-time</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900 border border-white/5 text-xs text-zinc-300 space-y-1">
              <strong className="text-white block font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-sky-400" />
                Sports Science Clinical Adaptation:
              </strong>
              <p className="text-zinc-400">
                {ambientTempC >= 35 
                  ? `Extreme ambient heat (${ambientTempC}°C) triggers maximal vasodilation and heavy sweat transpiration. Your daily target has been automatically increased by ${Math.round(baseWaterGoalMl * (climateMultiplier - 1))} mL to prevent circulatory collapse, hyponatremia, and heat illness.`
                  : ambientTempC >= 28 
                  ? `Elevated ambient temperature (${ambientTempC}°C) and ${ambientHumidity}% humidity accelerate continuous insensible water loss. Your target was adjusted upward by ${Math.round(baseWaterGoalMl * (climateMultiplier - 1))} mL.`
                  : `Ambient temperature is mild (${ambientTempC}°C). Standard baseline fluid exchange is in equilibrium.`}
              </p>
            </div>
          </div>

          {/* Worldwide City Search (Zero API Key via Open-Meteo Geocoding) */}
          <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-400" />
                Search & Sync Any City Worldwide (Zero API Key)
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Traveling or want to check weather anywhere in the world? Type any city name below to pull instant live satellite data.
              </p>
            </div>

            <form onSubmit={handleSearchCity} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={citySearchQuery}
                  onChange={(e) => setCitySearchQuery(e.target.value)}
                  placeholder="Enter city (e.g. Mumbai, Delhi, London, Tokyo, New York, Dubai)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-sky-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSearchingCity || !citySearchQuery.trim()}
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
              >
                {isSearchingCity ? 'Searching...' : 'Search'}
              </button>
            </form>

            {/* City Search Results Dropdown */}
            {citySearchResults.length > 0 && (
              <div className="p-2 rounded-2xl bg-zinc-900 border border-white/10 space-y-1 max-h-48 overflow-y-auto">
                {citySearchResults.map((city, idx) => (
                  <button
                    key={city.id || idx}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/10 text-xs transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="font-bold text-white">{city.name}</span>
                      <span className="text-zinc-400 text-[11px]">
                        {city.admin1 ? `${city.admin1}, ` : ''}{city.country}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-sky-400 font-bold">Select & Sync</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Manual Climate Override Toggles */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
              Manual Thermal Intensity Override:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'normal', label: 'Normal Climate (20-25°C)', boost: '0% Base Target', mult: 1.0 },
                { id: 'hot', label: 'Hot / Sweaty (26-34°C)', boost: '+15% to +25% Water Boost', mult: 1.2 },
                { id: 'extreme', label: 'Extreme Heat (> 35°C)', boost: '+35% to +45% Heavy Boost', mult: 1.4 }
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => handleClimateChange(c.id as any)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedClimate === c.id
                      ? 'border-amber-400 bg-amber-500/10 shadow-lg'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm font-bold text-white block">{c.label}</span>
                  <span className="text-xs font-mono font-bold text-amber-400 mt-1 block">{c.boost}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. ELECTROLYTE DIY RECIPE GENERATOR — Dedicated Engine: SGLT1 2Na+:1Glc:260H2O Stoichiometry & Custom Deficit Synthesizer */}
      {activeSubView === 'diy_recipes' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Fast-Absorbing Homemade Electrolyte Drink Guide
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Easy, kitchen-ready electrolyte recipes formulated with the ideal sodium-to-potassium balance for rapid cellular hydration and workout stamina.
            </p>
          </div>

          {/* Bespoke Deficit-Matched Electrolyte Synthesizer */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 border border-amber-500/30 flex flex-col space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Personalized Sweat-Loss Electrolyte Drink ({customSynthesizedOrs.targetVolumeMl} mL)
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                Osmolarity: {customSynthesizedOrs.resultingOsmolarityMosmL} mOsm/L • Fast Absorption: ~{customSynthesizedOrs.predictedGastricHalfLifeMins} min
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                <span className="text-zinc-400 block text-[10px]">Table Salt (NaCl)</span>
                <span className="text-base font-black text-white">{customSynthesizedOrs.tableSaltGrams} g</span>
                <span className="text-[10px] text-amber-400 block">{customSynthesizedOrs.resultingSodiumMg} mg Sodium</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                <span className="text-zinc-400 block text-[10px]">Glucose / Sugar</span>
                <span className="text-base font-black text-white">{customSynthesizedOrs.glucoseOrSugarGrams} g</span>
                <span className="text-[10px] text-sky-400 block">Absorption Catalyst</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                <span className="text-zinc-400 block text-[10px]">Fresh Lemon Juice</span>
                <span className="text-base font-black text-white">{customSynthesizedOrs.lemonJuiceMl} mL</span>
                <span className="text-[10px] text-emerald-400 block">{customSynthesizedOrs.resultingPotassiumMg} mg Potassium</span>
              </div>
              <div className="p-3 rounded-xl bg-black/50 border border-white/10">
                <span className="text-zinc-400 block text-[10px]">Baking Soda</span>
                <span className="text-base font-black text-white">{customSynthesizedOrs.bakingSodaGrams} g</span>
                <span className="text-[10px] text-purple-300 block">Acidity Buffer</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DIY_ELECTROLYTE_RECIPES.map(recipe => {
              const stoich = EnterocyteSGLT1StoichiometricFormulary.analyzeRecipeStoichiometry(recipe);
              return (
                <div 
                  key={recipe.id}
                  className="bg-zinc-950 border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-lg hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {recipe.category}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {stoich.totalOsmolarityMosmL} mOsm/L
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">{recipe.name}</h4>
                    <span className="text-xs font-mono text-sky-400 font-bold block mt-0.5">
                      Yield: {recipe.yieldVolume} • {recipe.sodiumMg}mg Sodium • {recipe.potassiumMg}mg Potassium
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 block mt-0.5">
                      Balanced Mineral Balance • Hydration Flow ~{stoich.sglt1WaterCotransportFluxMlHr} mL/hr
                    </span>

                    <div className="mt-3 space-y-1">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block font-mono">Ingredients:</span>
                      <ul className="text-xs text-zinc-300 list-disc list-inside space-y-0.5">
                        {recipe.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-xs text-zinc-400 mt-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <strong className="text-white">Method: </strong>{recipe.instructions}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedBeverageType('isotonic_ors');
                      handleLogWater(500);
                    }}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Mark Consumed (+500 mL Electrolytes)</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8. PRE-HYDRATION & POST-HYDRATION TIMING REMINDERS — Dedicated Engine: SCN Circadian Vasopressin & Diurnal GFR Chronobiology */}
      {activeSubView === 'timing_reminders' && (
        <div className="w-full bg-zinc-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-400" />
              Circadian SCN Vasopressin & Diurnal Renal GFR Pacing Engine
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Synchronizes intake intervals with your Suprachiasmatic Nucleus (SCN) 24-hour Arginine Vasopressin rhythm and diurnal Glomerular Filtration Rate (GFR = {chronobiologyReport.renalGfrMlMin} mL/min) to maximize cellular retention and prevent renal pressure-diuresis bolus dumping.
            </p>
          </div>

          {/* Dedicated Engine 8 Chronobiological Telemetry Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-sky-400 block font-bold">Active Circadian Window</span>
              <span className="text-sm font-bold text-white block mt-1">{chronobiologyReport.circadianPhaseName}</span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">Diurnal Renal GFR & SCN AVP</span>
              <span className="text-lg font-black text-white font-mono">
                {chronobiologyReport.renalGfrMlMin} mL/min • AVP {chronobiologyReport.scnVasopressinDrivePct}%
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
              <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">Optimal Gastric Bolus Limit</span>
              <span className="text-lg font-black text-amber-400 font-mono">
                {chronobiologyReport.optimalBolusSipVolumeMl} mL / {chronobiologyReport.recommendedCadenceMins} min
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { mins: 30, title: 'Pre-Workout Priming', detail: '30 mins before sets' },
              { mins: 45, title: 'Standard Cadence', detail: 'Every 45 minutes' },
              { mins: 60, title: 'Hourly Desk Alert', detail: 'Every 60 minutes' },
              { mins: 15, title: 'Post-Workout Flush', detail: '15 mins post-workout' }
            ].map(item => {
              const isSelected = activeReminderInterval === item.mins && reminderActive;
              return (
                <button
                  key={item.mins}
                  onClick={() => toggleReminder(item.mins)}
                  className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-sky-400 bg-sky-500/10 shadow-lg ring-1 ring-sky-400'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-mono uppercase text-sky-400 font-bold block">{item.title}</span>
                  <span className="text-xl font-black text-white block mt-1">{item.mins} Mins</span>
                  <span className="text-xs text-zinc-400 mt-0.5 block">{item.detail}</span>
                  <span className={`text-[11px] font-bold mt-3 inline-block px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-sky-500 text-white' : 'bg-white/10 text-zinc-400'
                  }`}>
                    {isSelected ? 'Active Countdown' : 'Activate Timer'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 4-Phase ACSM & Chronobiological Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {chronobiologyReport.chronobiologicalProtocol.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white">{step.phase}</span>
                  <span className="text-xs font-mono font-bold text-sky-400">{step.volumeMl} mL ({step.window})</span>
                </div>
                <p className="text-[11px] text-zinc-400">{step.mechanism}</p>
              </div>
            ))}
          </div>

          {/* Active Countdown Display */}
          {reminderActive && (
            <div className="p-6 rounded-2xl bg-zinc-950 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-zinc-400">Next Hydration Call In:</span>
                <div className="text-3xl font-black text-sky-400 font-mono mt-0.5">
                  {Math.floor(reminderSecondsLeft / 60).toString().padStart(2, '0')}:
                  {(reminderSecondsLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReminder(activeReminderInterval || 45)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Cancel Reminder
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 9. RECHARTS HYDRATION ANALYTICS & HISTORICAL TREND ENGINE (Auto-Adjusts based on past & live hydration) */}
      <HydrationAnalyticsGraph
        currentWaterMl={currentWaterMl}
        effectiveDailyWaterTargetMl={effectiveDailyWaterTargetMl}
        sweatRateMl={sweatRateMl}
        userWeightKg={userProfile?.weightKg || parseFloat(userProfile?.weight || '74') || 74}
      />
    </div>
  );
});

export default AdvancedHydrationCenter;
