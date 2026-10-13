import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CalorieLogItem, calorieStorage, MealType } from '../services/CalorieStorageService';
import { format } from 'date-fns';

export interface MealComponentItem {
  id: string;
  name: string;
  quantity?: string;
  approxCalories?: number;
}

export interface SuggestedMealOption {
  id: string;
  name: string;
  hindiName?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  quantity: number;
  unit: string;
  isPopular?: boolean;
  components: MealComponentItem[];
}

export interface MealWindowDefinition {
  mealType: MealType;
  hindiLabel: string;
  englishLabel: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  timeRangeDisplay: string;
  suggestions: SuggestedMealOption[];
}

export const REALTIME_MEAL_WINDOWS: MealWindowDefinition[] = [
  {
    mealType: 'breakfast',
    hindiLabel: 'Subah ka Nashta',
    englishLabel: 'Breakfast Window',
    startHour: 6,
    startMinute: 0,
    endHour: 11,
    endMinute: 30,
    timeRangeDisplay: '06:00 AM - 11:30 AM',
    suggestions: [
      {
        id: 'bf_oats',
        name: 'High-Protein Oats with Milk, Banana & Almonds',
        hindiName: 'Doodh Oats, Kela aur Badam',
        calories: 380,
        protein: 16,
        carbs: 60,
        fats: 9,
        quantity: 1,
        unit: 'bowl',
        isPopular: true,
        components: [
          { id: 'c1', name: 'Rolled Oats (50g)', quantity: '50g', approxCalories: 190 },
          { id: 'c2', name: 'Low-Fat Milk (200ml)', quantity: '200ml', approxCalories: 90 },
          { id: 'c3', name: '1 Medium Banana', quantity: '1 pc', approxCalories: 60 },
          { id: 'c4', name: 'Almonds & Seeds', quantity: '6 pcs', approxCalories: 40 }
        ]
      },
      {
        id: 'bf_eggs',
        name: '3 Egg Whites & 1 Whole Egg Omelette with Brown Bread',
        hindiName: 'Egg Omelette aur Brown Bread',
        calories: 340,
        protein: 24,
        carbs: 28,
        fats: 10,
        quantity: 1,
        unit: 'plate',
        isPopular: false,
        components: [
          { id: 'c1', name: '3 Egg Whites', quantity: '3 pcs', approxCalories: 51 },
          { id: 'c2', name: '1 Whole Egg', quantity: '1 pc', approxCalories: 72 },
          { id: 'c3', name: '2 Slices Brown Bread', quantity: '2 slices', approxCalories: 150 },
          { id: 'c4', name: 'Olive Oil / Butter for Cooking', quantity: '1/2 tsp', approxCalories: 67 }
        ]
      },
      {
        id: 'bf_paneer_roti',
        name: 'Paneer Bhurji (100g) with 2 Multigrain Rotis',
        hindiName: 'Paneer Bhurji aur 2 Multigrain Roti',
        calories: 430,
        protein: 22,
        carbs: 44,
        fats: 15,
        quantity: 1,
        unit: 'serving',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Fresh Paneer Bhurji (100g)', quantity: '100g', approxCalories: 240 },
          { id: 'c2', name: '2 Multigrain Rotis', quantity: '2 rotis', approxCalories: 160 },
          { id: 'c3', name: 'Tomato, Onion & Green Chilli Salad', quantity: '1 bowl', approxCalories: 30 }
        ]
      },
      {
        id: 'bf_poha_sprouts',
        name: 'Poha with Roasted Peanuts & Boiled Moong Sprouts',
        hindiName: 'Poha aur Roasted Moong Sprouts',
        calories: 320,
        protein: 11,
        carbs: 52,
        fats: 8,
        quantity: 1,
        unit: 'plate',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Flattened Rice (Poha)', quantity: '1 plate', approxCalories: 180 },
          { id: 'c2', name: 'Roasted Peanuts', quantity: '20g', approxCalories: 80 },
          { id: 'c3', name: 'Boiled Moong Sprouts', quantity: '30g', approxCalories: 60 }
        ]
      }
    ]
  },
  {
    mealType: 'lunch',
    hindiLabel: 'Dopehar ka Khana',
    englishLabel: 'Lunch Window',
    startHour: 11,
    startMinute: 30,
    endHour: 16,
    endMinute: 0,
    timeRangeDisplay: '11:30 AM - 04:00 PM',
    suggestions: [
      {
        id: 'ln_dal_roti',
        name: '2 Wheat Chapatis, Dal Tadka, Seasonal Sabzi & Curd',
        hindiName: '2 Roti, Dal Tadka, Sabzi aur Dahi',
        calories: 490,
        protein: 21,
        carbs: 70,
        fats: 13,
        quantity: 1,
        unit: 'thali',
        isPopular: true,
        components: [
          { id: 'c1', name: '2 Whole Wheat Chapatis', quantity: '2 rotis', approxCalories: 160 },
          { id: 'c2', name: '1 Bowl Yellow Dal Tadka', quantity: '1 bowl', approxCalories: 140 },
          { id: 'c3', name: 'Seasonal Mixed Vegetable Sabzi', quantity: '1 bowl', approxCalories: 120 },
          { id: 'c4', name: 'Fresh Curd (Dahi)', quantity: '100g', approxCalories: 70 }
        ]
      },
      {
        id: 'ln_rice_chicken',
        name: 'Brown Rice, Grilled Chicken Breast & Cucumber Salad',
        hindiName: 'Brown Rice, Chicken Breast aur Salad',
        calories: 540,
        protein: 42,
        carbs: 58,
        fats: 10,
        quantity: 1,
        unit: 'plate',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Steamed Brown Rice', quantity: '1 bowl (150g)', approxCalories: 180 },
          { id: 'c2', name: 'Grilled Chicken Breast', quantity: '140g', approxCalories: 260 },
          { id: 'c3', name: 'Cucumber & Tomato Green Salad', quantity: '1 plate', approxCalories: 40 },
          { id: 'c4', name: 'Lemon & Herbs Dressing', quantity: '1 tsp', approxCalories: 60 }
        ]
      },
      {
        id: 'ln_paneer_curry',
        name: 'Low-Oil Paneer Curry with 2 Phulkas & Salad',
        hindiName: 'Paneer Curry, 2 Phulka aur Salad',
        calories: 510,
        protein: 26,
        carbs: 48,
        fats: 18,
        quantity: 1,
        unit: 'serving',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Paneer Masala Curry (Low Oil)', quantity: '1 bowl (120g)', approxCalories: 280 },
          { id: 'c2', name: '2 Fresh Phulkas (No Ghee)', quantity: '2 pcs', approxCalories: 160 },
          { id: 'c3', name: 'Fresh Cucumber Raita', quantity: '1 small bowl', approxCalories: 70 }
        ]
      },
      {
        id: 'ln_rajma_rice',
        name: 'Rajma / Chole Curry with 1 Bowl Jeera Rice & Onions',
        hindiName: 'Rajma Chawal aur Salad',
        calories: 520,
        protein: 19,
        carbs: 78,
        fats: 11,
        quantity: 1,
        unit: 'plate',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Rajma / Chole Curry', quantity: '1 bowl (180g)', approxCalories: 240 },
          { id: 'c2', name: 'Jeera Rice / Steamed Rice', quantity: '1 bowl (150g)', approxCalories: 220 },
          { id: 'c3', name: 'Onion, Mint & Lemon Salad', quantity: '1 small plate', approxCalories: 60 }
        ]
      }
    ]
  },
  {
    mealType: 'snack',
    hindiLabel: 'Shaam ka Snack',
    englishLabel: 'Evening Fuel Window',
    startHour: 16,
    startMinute: 0,
    endHour: 19,
    endMinute: 30,
    timeRangeDisplay: '04:00 PM - 07:30 PM',
    suggestions: [
      {
        id: 'sn_chana_tea',
        name: 'Roasted Chana (50g) with Green Tea / Black Coffee',
        hindiName: 'Bhuna Chana aur Green Tea',
        calories: 190,
        protein: 10,
        carbs: 28,
        fats: 3,
        quantity: 1,
        unit: 'snack',
        isPopular: true,
        components: [
          { id: 'c1', name: 'Roasted Bengal Gram (Bhuna Chana)', quantity: '50g', approxCalories: 180 },
          { id: 'c2', name: 'Green Tea (Zero Sugar)', quantity: '1 cup', approxCalories: 10 }
        ]
      },
      {
        id: 'sn_pb_toast',
        name: '1 Multigrain Toast with 1 Tbsp Peanut Butter & Banana',
        hindiName: 'Peanut Butter Toast aur Kela',
        calories: 250,
        protein: 9,
        carbs: 30,
        fats: 11,
        quantity: 1,
        unit: 'serving',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Multigrain Bread Toast', quantity: '1 slice', approxCalories: 80 },
          { id: 'c2', name: 'Natural Peanut Butter', quantity: '1 tbsp (16g)', approxCalories: 100 },
          { id: 'c3', name: 'Sliced Banana Topping', quantity: '1/2 banana', approxCalories: 70 }
        ]
      },
      {
        id: 'sn_boiled_eggs',
        name: '4 Boiled Egg Whites with Chaat Masala & Lemon',
        hindiName: '4 Boiled Egg Whites',
        calories: 140,
        protein: 18,
        carbs: 2,
        fats: 1,
        quantity: 4,
        unit: 'eggs',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Boiled Egg Whites', quantity: '4 pcs', approxCalories: 130 },
          { id: 'c2', name: 'Lemon Juice & Black Salt', quantity: 'pinch', approxCalories: 10 }
        ]
      },
      {
        id: 'sn_sprouts_salad',
        name: 'Moong Sprouts Chaat with Tomato, Onion & Lemon',
        hindiName: 'Sprouts Chaat Salad',
        calories: 180,
        protein: 12,
        carbs: 30,
        fats: 2,
        quantity: 1,
        unit: 'bowl',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Sprouted Green Moong', quantity: '1 bowl (100g)', approxCalories: 120 },
          { id: 'c2', name: 'Diced Tomato & Onion', quantity: '1/2 bowl', approxCalories: 40 },
          { id: 'c3', name: 'Lemon Juice & Chaat Masala', quantity: '1 tsp', approxCalories: 20 }
        ]
      }
    ]
  },
  {
    mealType: 'dinner',
    hindiLabel: 'Raat ka Bhojan',
    englishLabel: 'Dinner Window',
    startHour: 19,
    startMinute: 30,
    endHour: 23,
    endMinute: 30,
    timeRangeDisplay: '07:30 PM - 11:30 PM',
    suggestions: [
      {
        id: 'dn_khichdi',
        name: 'Light Yellow Moong Dal Khichdi with Curd & Papad',
        hindiName: 'Moong Dal Khichdi aur Dahi',
        calories: 420,
        protein: 16,
        carbs: 64,
        fats: 9,
        quantity: 1,
        unit: 'bowl',
        isPopular: true,
        components: [
          { id: 'c1', name: 'Light Moong Dal Khichdi', quantity: '1 big bowl', approxCalories: 280 },
          { id: 'c2', name: 'Fresh Low-Fat Curd', quantity: '100g', approxCalories: 70 },
          { id: 'c3', name: 'Dry Roasted Papad', quantity: '1 pc', approxCalories: 40 },
          { id: 'c4', name: 'Carrot & Cucumber Salad', quantity: '1 plate', approxCalories: 30 }
        ]
      },
      {
        id: 'dn_phulka_sabzi',
        name: '2 Phulkas, Soya Bhurji / Grilled Paneer & Clear Veg Soup',
        hindiName: '2 Phulka, Soya Bhurji aur Veg Soup',
        calories: 440,
        protein: 28,
        carbs: 46,
        fats: 11,
        quantity: 1,
        unit: 'plate',
        isPopular: false,
        components: [
          { id: 'c1', name: '2 Whole Wheat Phulkas', quantity: '2 pcs', approxCalories: 150 },
          { id: 'c2', name: 'Soya Granules Bhurji (High Protein)', quantity: '1 bowl (100g)', approxCalories: 210 },
          { id: 'c3', name: 'Hot Clear Vegetable Soup', quantity: '1 bowl', approxCalories: 50 },
          { id: 'c4', name: 'Beetroot & Cucumber Slices', quantity: '1 plate', approxCalories: 30 }
        ]
      },
      {
        id: 'dn_chicken_salad',
        name: 'Grilled Chicken / Fish Breast with Steamed Veggies',
        hindiName: 'Grilled Chicken aur Steamed Veggies',
        calories: 390,
        protein: 40,
        carbs: 16,
        fats: 8,
        quantity: 1,
        unit: 'plate',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Herb Grilled Chicken Breast', quantity: '150g', approxCalories: 250 },
          { id: 'c2', name: 'Steamed Broccoli, Carrots & Beans', quantity: '1 big bowl', approxCalories: 90 },
          { id: 'c3', name: 'Olive Oil & Lemon Dressing', quantity: '1 tsp', approxCalories: 50 }
        ]
      },
      {
        id: 'dn_palak_paneer',
        name: 'Palak Paneer with 2 Multigrain Rotis & Beetroot Salad',
        hindiName: 'Palak Paneer aur 2 Multigrain Roti',
        calories: 460,
        protein: 22,
        carbs: 48,
        fats: 15,
        quantity: 1,
        unit: 'serving',
        isPopular: false,
        components: [
          { id: 'c1', name: 'Palak Paneer (Homestyle)', quantity: '1 bowl (150g)', approxCalories: 240 },
          { id: 'c2', name: '2 Multigrain Rotis', quantity: '2 rotis', approxCalories: 160 },
          { id: 'c3', name: 'Sliced Beetroot, Onion & Lemon Salad', quantity: '1 plate', approxCalories: 60 }
        ]
      }
    ]
  }
];

export interface MealTimingPrompt {
  mealType: MealType;
  mealLabel: string;
  hindiLabel: string;
  englishLabel: string;
  timeRangeDisplay: string;
  message: string;
  realTimeClockStr: string;
  timeZoneStr: string;
  locationName: string;
  windowTimeRemainingText: string;
  suggestedItems: SuggestedMealOption[];
  selectedSuggestion: SuggestedMealOption;
  cachedRoutine: CalorieLogItem[] | null;
  isAlreadyLoggedToday: boolean;
  loggedItemSummary?: string;
}

export function useMealTimingEngine(username: string, onRoutineApplied?: () => void) {
  const [activePrompt, setActivePrompt] = useState<MealTimingPrompt | null>(null);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [timeZoneStr, setTimeZoneStr] = useState<string>('');
  const [locationName, setLocationName] = useState<string>('Detecting Live Location...');
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(0);

  // Verification modal state: When user initiates logging, we ask what was eaten and verify macros!
  const [verifyingMeal, setVerifyingMeal] = useState<{
    mealType: MealType;
    mealName: string;
    components: MealComponentItem[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  } | null>(null);
  
  const lastVisibilityChangeRef = useRef<number>(Date.now());
  const dismissedPromptsRef = useRef<Set<string>>(new Set());

  // Dynamic Browser Timezone & Locale (Zero Hardcoding, Never static Calcutta)
  const dynamicTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'System Local Time';
    } catch {
      return 'Local Time';
    }
  }, []);

  const dynamicLocale = useMemo(() => {
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language;
    }
    return undefined;
  }, []);

  // Format localized live time dynamically
  const formatLiveClock = useCallback((dateObj: Date): string => {
    try {
      return new Intl.DateTimeFormat(dynamicLocale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: dynamicTimeZone !== 'System Local Time' ? dynamicTimeZone : undefined
      }).format(dateObj);
    } catch {
      return dateObj.toLocaleTimeString();
    }
  }, [dynamicLocale, dynamicTimeZone]);

  // Pure Client-Side Browser Geolocation (Zero Server, Zero Backend, Zero Paid APIs)
  const syncGeolocationAndLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setLocationName(dynamicTimeZone);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setGeoCoords({ lat, lng });

        // Client-side free reverse geocoding via BigDataCloud or OpenStreetMap (Zero paid key)
        let resolvedCity = '';
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          if (res.ok) {
            const data = await res.json();
            const city = data.city || data.locality || data.principalSubdivision;
            const country = data.countryName || data.countryCode;
            if (city) {
              resolvedCity = `${city}${country ? `, ${country}` : ''}`;
            }
          }
        } catch (_) {}

        if (!resolvedCity) {
          try {
            const nomRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
              { headers: { 'User-Agent': 'PulseFitAI-Timing/1.0' } }
            );
            if (nomRes.ok) {
              const nomData = await nomRes.json();
              const addr = nomData.address || {};
              const city = addr.city || addr.town || addr.village || addr.suburb || addr.state;
              const country = addr.country;
              if (city) {
                resolvedCity = `${city}${country ? `, ${country}` : ''}`;
              }
            }
          } catch (_) {}
        }

        if (resolvedCity) {
          setLocationName(resolvedCity);
        } else {
          // GPS Coordinates fallback
          const latRound = Math.round(lat * 100) / 100;
          const lngRound = Math.round(lng * 100) / 100;
          setLocationName(`GPS Position (${latRound}°, ${lngRound}°) • ${dynamicTimeZone}`);
        }
      },
      (err) => {
        console.warn('Geolocation access note:', err.message);
        setLocationName(dynamicTimeZone);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  }, [dynamicTimeZone]);

  // Determine current meal window definition based on live hour & minute
  const getCurrentMealWindow = useCallback((dateObj: Date): {
    windowDef: MealWindowDefinition | null;
    remainingMinutes: number;
    remainingText: string;
  } => {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const totalMinutesNow = hours * 60 + minutes;

    for (const def of REALTIME_MEAL_WINDOWS) {
      const startTotal = def.startHour * 60 + def.startMinute;
      const endTotal = def.endHour * 60 + def.endMinute;

      if (totalMinutesNow >= startTotal && totalMinutesNow < endTotal) {
        const remaining = endTotal - totalMinutesNow;
        const remH = Math.floor(remaining / 60);
        const remM = remaining % 60;
        const remainingText = remH > 0 ? `${remH}h ${remM}m bache hain` : `${remM} minute bache hain`;
        return { windowDef: def, remainingMinutes: remaining, remainingText };
      }
    }

    return { windowDef: null, remainingMinutes: 0, remainingText: '' };
  }, []);

  // Evaluate contextual prompt against IndexedDB records
  const checkContextualMealPrompt = useCallback(async () => {
    const now = new Date();
    const today = format(now, 'yyyy-MM-dd');
    const { windowDef, remainingText } = getCurrentMealWindow(now);

    const clockDisplay = formatLiveClock(now);
    setCurrentTimeStr(clockDisplay);
    setTimeZoneStr(dynamicTimeZone);

    if (!windowDef) {
      setActivePrompt(null);
      return;
    }

    const promptKey = `${today}_${windowDef.mealType}`;
    if (dismissedPromptsRef.current.has(promptKey)) {
      return;
    }

    try {
      // Check if user has already logged this meal today
      const dayLog = await calorieStorage.getDayLog(today);
      const existingMeals = dayLog.meals.filter(m => m.mealType === windowDef.mealType);
      const hasMealLogged = existingMeals.length > 0;

      // Check if user has a stored favorite routine for this window
      const routine = await calorieStorage.getRoutineForMeal(windowDef.mealType);
      const athleteName = username?.trim() || 'Athlete';

      const defaultSuggestion = (routine && routine.length > 0)
        ? {
            id: `routine_${windowDef.mealType}`,
            name: routine.map(r => r.name).join(' + '),
            hindiName: 'Aapka Saved Routine',
            calories: routine.reduce((sum, r) => sum + r.calories, 0),
            protein: routine.reduce((sum, r) => sum + r.protein, 0),
            carbs: routine.reduce((sum, r) => sum + r.carbs, 0),
            fats: routine.reduce((sum, r) => sum + r.fats, 0),
            quantity: 1,
            unit: 'routine',
            isPopular: true,
            components: routine.map((r, i) => ({
              id: `rc_${i}`,
              name: r.name,
              quantity: `${r.quantity || 1} ${r.unit || 'serving'}`,
              approxCalories: r.calories
            }))
          }
        : windowDef.suggestions[0];

      let promptMessage = '';
      if (hasMealLogged) {
        const totalLoggedCals = existingMeals.reduce((acc, m) => acc + m.calories, 0);
        promptMessage = `✅ Badhiya! Tune ${windowDef.hindiLabel} (${totalLoggedCals} kcal) pehle hi log kar liya hai.`;
      } else {
        promptMessage = `Clock: ${clockDisplay} • Lagta hai tune is waqt ${windowDef.hindiLabel} kiya hoga! Kya ye meal log kar doon, ${athleteName}?`;
      }

      setActivePrompt({
        mealType: windowDef.mealType,
        mealLabel: windowDef.englishLabel,
        hindiLabel: windowDef.hindiLabel,
        englishLabel: windowDef.englishLabel,
        timeRangeDisplay: windowDef.timeRangeDisplay,
        message: promptMessage,
        realTimeClockStr: clockDisplay,
        timeZoneStr: dynamicTimeZone,
        locationName: locationName || dynamicTimeZone,
        windowTimeRemainingText: remainingText,
        suggestedItems: windowDef.suggestions,
        selectedSuggestion: defaultSuggestion,
        cachedRoutine: routine,
        isAlreadyLoggedToday: hasMealLogged,
        loggedItemSummary: hasMealLogged ? existingMeals.map(m => m.name).join(', ') : undefined
      });
    } catch (e) {
      console.warn('[MealTimingEngine] Error evaluating contextual prompt:', e);
    }
  }, [getCurrentMealWindow, formatLiveClock, dynamicTimeZone, locationName, username]);

  // Real-Time Browser Clock Ticker: Ticks every 1000ms with system synchronization
  useEffect(() => {
    syncGeolocationAndLocation();
    checkContextualMealPrompt();

    const intervalId = window.setInterval(() => {
      const now = new Date();
      const clockDisplay = formatLiveClock(now);
      setCurrentTimeStr(clockDisplay);

      // Periodically re-evaluate prompt windows every 30 seconds
      if (now.getSeconds() === 0 || now.getSeconds() === 30) {
        checkContextualMealPrompt();
      }
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkContextualMealPrompt();
        lastVisibilityChangeRef.current = Date.now();
      }
    };

    const handleFocus = () => {
      checkContextualMealPrompt();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkContextualMealPrompt, formatLiveClock, syncGeolocationAndLocation]);

  // Step 1: User clicks suggestion -> Opens Verification Dialog ("Puchega kya kya khaya aur kitna macros")
  const openMealVerification = useCallback((optionToVerify?: SuggestedMealOption) => {
    if (!activePrompt) return;
    const targetMeal = optionToVerify || activePrompt.selectedSuggestion;

    setVerifyingMeal({
      mealType: activePrompt.mealType,
      mealName: targetMeal.name,
      components: targetMeal.components && targetMeal.components.length > 0
        ? targetMeal.components.map(c => ({ ...c }))
        : [{ id: 'c1', name: targetMeal.name, quantity: '1 serving', approxCalories: targetMeal.calories }],
      calories: targetMeal.calories,
      protein: targetMeal.protein,
      carbs: targetMeal.carbs,
      fats: targetMeal.fats
    });
  }, [activePrompt]);

  // Step 2: User confirms verified items and macros -> Commits to IndexedDB!
  const commitVerifiedMeal = useCallback(async (verifiedData: {
    mealType: MealType;
    mealName: string;
    components: MealComponentItem[];
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  }) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const itemsDescription = verifiedData.components.length > 0
      ? verifiedData.components.map(c => c.name).join(' + ')
      : verifiedData.mealName;

    try {
      await calorieStorage.addMealItem(today, {
        name: itemsDescription,
        mealType: verifiedData.mealType,
        calories: Number(verifiedData.calories) || 0,
        protein: Number(verifiedData.protein) || 0,
        carbs: Number(verifiedData.carbs) || 0,
        fats: Number(verifiedData.fats) || 0,
        quantity: 1,
        unit: 'meal',
        source: 'routine'
      });

      dismissedPromptsRef.current.add(`${today}_${verifiedData.mealType}`);
      setVerifyingMeal(null);
      setActivePrompt(null);
      if (onRoutineApplied) onRoutineApplied();
    } catch (e) {
      console.error('[MealTimingEngine] Error committing verified meal:', e);
    }
  }, [onRoutineApplied]);

  const cancelVerification = useCallback(() => {
    setVerifyingMeal(null);
  }, []);

  const dismissPrompt = useCallback(() => {
    if (activePrompt) {
      const today = format(new Date(), 'yyyy-MM-dd');
      dismissedPromptsRef.current.add(`${today}_${activePrompt.mealType}`);
      setActivePrompt(null);
    }
  }, [activePrompt]);

  return {
    activePrompt,
    currentTimeStr,
    timeZoneStr,
    locationName,
    geoCoords,
    selectedOptionIndex,
    setSelectedOptionIndex,
    verifyingMeal,
    setVerifyingMeal,
    openMealVerification,
    commitVerifiedMeal,
    cancelVerification,
    dismissPrompt,
    checkContextualMealPrompt,
    syncGeolocationAndLocation
  };
}
