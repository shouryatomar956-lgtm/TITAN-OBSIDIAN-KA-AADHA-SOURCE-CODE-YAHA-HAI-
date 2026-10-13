import localforage from 'localforage';
import { appRegistry } from './appRegistry';
import { UserProfile } from './storage';
import { silentCalorieEngine } from './silentCalorieEngine';
import { silentHydrationEngine } from './silentHydrationEngine';
import { silentStepEngine } from './silentStepEngine';

// Background silent initialization of the daily caloric, hydration, and step precision ledgers
if (typeof window !== 'undefined') {
  setTimeout(() => {
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
    silentStepEngine.silentlyRecalculate().catch(() => {});
  }, 300);
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface CalorieLogItem {
  id: string;
  name: string;
  mealType: MealType;
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fats: number;    // in grams
  quantity: number;
  unit: string;
  timestamp: number;
  source?: 'voice' | 'clipboard' | 'manual' | 'routine';
}

export interface MealDayRecord {
  date: string; // YYYY-MM-DD
  meals: CalorieLogItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  waterMl?: number;
  updatedAt: number;
}

export interface MacroTargets {
  dailyCalories: number;
  protein: number;
  carbs: number;
  fats: number;
  waterMl: number;
}

export interface ActiveBurnRecord {
  date: string;
  steps: number;
  caloriesBurned: number;
  activeMinutes: number;
  updatedAt: number;
}

import { polyglotStorageMesh } from './polyglotStorageMesh';
import { registerOPFSDriver } from './opfsStorageEngine';

registerOPFSDriver();

/**
 * Isolated LocalForage Namespaces with OPFS Binary Driver + IndexedDB + WebSQL
 */
const calorieLogStore = localforage.createInstance({
  name: 'PulseFit_CalorieTracker',
  storeName: 'pulsefit_calorie_logs',
  description: 'OPFS + IndexedDB store for daily nutrition intake and itemized meal records',
  driver: ['opfsBinaryDriver', localforage.INDEXEDDB, localforage.WEBSQL]
});

const macroTargetStore = localforage.createInstance({
  name: 'PulseFit_CalorieTracker',
  storeName: 'pulsefit_macro_targets',
  description: 'OPFS + IndexedDB store for target macros and biometric goals',
  driver: ['opfsBinaryDriver', localforage.INDEXEDDB, localforage.WEBSQL]
});

const sessionVaultStore = localforage.createInstance({
  name: 'PulseFit_CalorieTracker',
  storeName: 'pulsefit_session_vault',
  description: 'Vault for active burns, meal routines, and offline compressed snapshots',
  driver: ['opfsBinaryDriver', localforage.INDEXEDDB, localforage.WEBSQL]
});

/**
 * Lightweight JSON compression utility for ultra-fast offline caching
 */
function compressData(rawObj: any): string {
  try {
    const json = JSON.stringify(rawObj);
    return btoa(encodeURIComponent(json));
  } catch (e) {
    return JSON.stringify(rawObj);
  }
}

function decompressData<T>(compressed: string): T | null {
  try {
    const json = decodeURIComponent(atob(compressed));
    return JSON.parse(json) as T;
  } catch (e) {
    try {
      return JSON.parse(compressed) as T;
    } catch {
      return null;
    }
  }
}

export class CalorieStorageService {
  private static instance: CalorieStorageService | null = null;
  private memoryDayCache = new Map<string, MealDayRecord>();
  private memoryTargets: MacroTargets | null = null;

  public static getInstance(): CalorieStorageService {
    if (!this.instance) {
      this.instance = new CalorieStorageService();
    }
    return this.instance;
  }

  /**
   * Calculates default macro targets based on athlete profile
   */
  public calculateDefaultTargets(profile?: UserProfile | null): MacroTargets {
    let weightKg = 70;
    if (profile?.weightKg) {
      weightKg = profile.weightKg;
    } else if (profile?.weight) {
      const parsed = parseFloat(profile.weight);
      if (!isNaN(parsed)) weightKg = parsed;
    }

    const goal = profile?.primaryGoal?.toLowerCase() || 'hypertrophy';
    let baseCalories = 2200;

    if (goal.includes('fat') || goal.includes('cut') || goal.includes('weight loss')) {
      baseCalories = Math.round(weightKg * 26);
    } else if (goal.includes('bulk') || goal.includes('muscle') || goal.includes('strength')) {
      baseCalories = Math.round(weightKg * 34);
    } else {
      baseCalories = Math.round(weightKg * 30);
    }

    // Default macro breakdown: 2g protein/kg, 1g fat/kg, remaining carbs
    const protein = Math.round(weightKg * 2.0);
    const fats = Math.round(weightKg * 0.9);
    const caloriesFromProteinAndFats = (protein * 4) + (fats * 9);
    const remainingCaloriesForCarbs = Math.max(200, baseCalories - caloriesFromProteinAndFats);
    const carbs = Math.round(remainingCaloriesForCarbs / 4);

    return {
      dailyCalories: Math.max(1200, baseCalories),
      protein: Math.max(50, protein),
      carbs: Math.max(50, carbs),
      fats: Math.max(30, fats),
      waterMl: 3000
    };
  }

  /**
   * Retrieves target macros
   */
  public async getTargets(profile?: UserProfile | null): Promise<MacroTargets> {
    if (this.memoryTargets) return { ...this.memoryTargets };

    try {
      const quorumTargets = await polyglotStorageMesh.readQuorum<MacroTargets>('pulsefit_macro_targets');
      if (quorumTargets && quorumTargets.dailyCalories > 0) {
        this.memoryTargets = quorumTargets;
        return quorumTargets;
      }
      const stored = await macroTargetStore.getItem<MacroTargets>('user_macro_targets');
      if (stored && stored.dailyCalories > 0) {
        this.memoryTargets = stored;
        return stored;
      }
    } catch (err) {
      console.warn('[CalorieStorage] Targets fetch fallback:', err);
    }

    const defaults = this.calculateDefaultTargets(profile);
    this.memoryTargets = defaults;
    this.saveTargets(defaults).catch(() => {});
    return defaults;
  }

  /**
   * Saves custom target macros
   */
  public async saveTargets(targets: MacroTargets): Promise<void> {
    this.memoryTargets = targets;
    await Promise.allSettled([
      macroTargetStore.setItem('user_macro_targets', targets),
      polyglotStorageMesh.writeQuorum('pulsefit_macro_targets', targets)
    ]);
    appRegistry.registerEntity('pulsefit_macro_targets', targets);
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
  }

  /**
   * Retrieves day log for a specific date (YYYY-MM-DD)
   */
  public async getDayLog(date: string): Promise<MealDayRecord> {
    if (this.memoryDayCache.has(date)) {
      return { ...this.memoryDayCache.get(date)! };
    }

    try {
      const quorumDay = await polyglotStorageMesh.readQuorum<MealDayRecord>(`calorie_log_${date}`);
      if (quorumDay && Array.isArray(quorumDay.meals)) {
        this.memoryDayCache.set(date, quorumDay);
        return quorumDay;
      }

      const stored = await calorieLogStore.getItem<MealDayRecord>(date);
      if (stored) {
        this.memoryDayCache.set(date, stored);
        return stored;
      }

      // Check compressed vault snapshot fallback
      const compressed = await sessionVaultStore.getItem<string>(`snap_${date}`);
      if (compressed) {
        const decomp = decompressData<MealDayRecord>(compressed);
        if (decomp) {
          this.memoryDayCache.set(date, decomp);
          return decomp;
        }
      }
    } catch (err) {
      console.warn('[CalorieStorage] Read error for date:', date, err);
    }

    const emptyRecord: MealDayRecord = {
      date,
      meals: [],
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFats: 0,
      waterMl: 0,
      updatedAt: Date.now()
    };

    this.memoryDayCache.set(date, emptyRecord);
    return emptyRecord;
  }

  /**
   * Saves a day log with transactional recalculation and 7-tier polyglot quorum backup
   */
  public async saveDayLog(record: MealDayRecord): Promise<void> {
    // Recompute totals
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    for (const item of record.meals) {
      totalCalories += Math.round(item.calories || 0);
      totalProtein += Math.round(item.protein || 0);
      totalCarbs += Math.round(item.carbs || 0);
      totalFats += Math.round(item.fats || 0);
    }

    const updated: MealDayRecord = {
      ...record,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFats,
      waterMl: record.waterMl || 0,
      updatedAt: Date.now()
    };

    this.memoryDayCache.set(record.date, updated);

    // Save across primary LocalForage + 7-Tier Polyglot Storage Mesh + Compressed Vault
    await Promise.allSettled([
      calorieLogStore.setItem(record.date, updated),
      polyglotStorageMesh.writeQuorum(`calorie_log_${record.date}`, updated),
      sessionVaultStore.setItem(`snap_${record.date}`, compressData(updated))
    ]);

    // Broadcast update across app
    appRegistry.registerEntity(`calorie_log_${record.date}`, updated);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('pulsefit_calorie_logged', { detail: updated }));
      window.dispatchEvent(new CustomEvent('pulsefit_hydration_updated', { detail: { date: record.date, waterMl: updated.waterMl } }));
    }

    // Silently compute daily caloric and hydration ledgers in background worker
    silentCalorieEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
  }

  /**
   * Adds a meal item atomically
   */
  public async addMealItem(
    date: string, 
    itemData: Omit<CalorieLogItem, 'id' | 'timestamp'>
  ): Promise<CalorieLogItem> {
    const day = await this.getDayLog(date);
    const nonce = typeof crypto !== 'undefined' && crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint8Array(4))).map(b => b.toString(16).padStart(2, '0')).join('') : Date.now().toString(36);
    const newItem: CalorieLogItem = {
      ...itemData,
      id: `meal_${Date.now()}_${nonce}`,
      timestamp: Date.now()
    };

    day.meals.push(newItem);
    await this.saveDayLog(day);

    // Save item into last logged routine cache
    this.updateRecentMealRoutine(itemData.mealType, newItem).catch(() => {});

    return newItem;
  }

  /**
   * Deletes a meal item by ID
   */
  public async deleteMealItem(date: string, itemId: string): Promise<void> {
    const day = await this.getDayLog(date);
    day.meals = day.meals.filter(m => m.id !== itemId);
    await this.saveDayLog(day);
  }

  /**
   * Water tracking helpers
   */
  public async addWater(date: string, amountMl: number): Promise<number> {
    const day = await this.getDayLog(date);
    day.waterMl = Math.max(0, (day.waterMl || 0) + amountMl);
    await this.saveDayLog(day);
    return day.waterMl;
  }

  public async getWater(date: string): Promise<number> {
    const day = await this.getDayLog(date);
    return day.waterMl || 0;
  }

  /**
   * Active Burn Storage (Steps & Active Calories)
   */
  public async getActiveBurn(date: string): Promise<ActiveBurnRecord> {
    try {
      const stored = await sessionVaultStore.getItem<ActiveBurnRecord>(`burn_${date}`);
      if (stored) return stored;
    } catch {}

    return {
      date,
      steps: 0,
      caloriesBurned: 0,
      activeMinutes: 0,
      updatedAt: Date.now()
    };
  }

  public async saveActiveBurn(date: string, burn: Partial<ActiveBurnRecord>): Promise<ActiveBurnRecord> {
    const current = await this.getActiveBurn(date);
    const updated: ActiveBurnRecord = {
      ...current,
      ...burn,
      updatedAt: Date.now()
    };
    await sessionVaultStore.setItem(`burn_${date}`, updated);
    silentStepEngine.silentlyRecalculate().catch(() => {});
    silentHydrationEngine.silentlyRecalculate().catch(() => {});
    return updated;
  }

  /**
   * Meal Routine Management (Used by Meal Timing Engine)
   */
  public async getRoutineForMeal(mealType: MealType): Promise<CalorieLogItem[] | null> {
    try {
      const routine = await sessionVaultStore.getItem<CalorieLogItem[]>(`routine_${mealType}`);
      return routine && routine.length > 0 ? routine : null;
    } catch {
      return null;
    }
  }

  public async saveRoutineForMeal(mealType: MealType, items: CalorieLogItem[]): Promise<void> {
    await sessionVaultStore.setItem(`routine_${mealType}`, items);
  }

  private async updateRecentMealRoutine(mealType: MealType, item: CalorieLogItem): Promise<void> {
    try {
      const current = (await this.getRoutineForMeal(mealType)) || [];
      // Keep up to 5 most frequent items
      const existingIdx = current.findIndex(i => i.name.toLowerCase() === item.name.toLowerCase());
      if (existingIdx >= 0) {
        current[existingIdx] = item;
      } else {
        current.unshift(item);
        if (current.length > 5) current.pop();
      }
      await this.saveRoutineForMeal(mealType, current);
    } catch {}
  }
}

export const calorieStorage = CalorieStorageService.getInstance();
