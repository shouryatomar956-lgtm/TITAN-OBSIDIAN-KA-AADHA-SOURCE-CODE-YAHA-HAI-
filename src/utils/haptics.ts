import localforage from 'localforage';

export type HapticPattern = 
  | 'heartbeat' 
  | 'budgetApproaching' 
  | 'budgetExceeded' 
  | 'lightTap' 
  | 'mediumTap' 
  | 'success' 
  | 'warning' 
  | 'delete';

const PATTERNS: Record<HapticPattern, number[]> = {
  // Rhythmic heartbeat-like dhak-dhak rhythm for metabolic threshold alert
  heartbeat: [100, 50, 100, 50, 200],
  budgetApproaching: [80, 40, 80, 40, 140],
  budgetExceeded: [150, 60, 150, 60, 300],
  lightTap: [25],
  mediumTap: [45],
  success: [40, 30, 60],
  warning: [70, 40, 70],
  delete: [60, 40, 40]
};

class HapticsManager {
  private enabled: boolean = true;
  private hasVibrationSupport: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      this.hasVibrationSupport = 'vibrate' in navigator && typeof navigator.vibrate === 'function';
      this.loadPreference();
    }
  }

  private async loadPreference() {
    try {
      const stored = await localforage.getItem<boolean>('pulsefit_haptics_enabled');
      if (stored !== null && stored !== undefined) {
        this.enabled = stored;
      }
    } catch {
      this.enabled = true;
    }
  }

  public isSupported(): boolean {
    return this.hasVibrationSupport;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public async setEnabled(enabled: boolean): Promise<void> {
    this.enabled = enabled;
    try {
      await localforage.setItem('pulsefit_haptics_enabled', enabled);
    } catch {
      // safe ignore
    }
  }

  public vibrate(pattern: HapticPattern | number[] = 'lightTap'): boolean {
    if (!this.enabled || !this.hasVibrationSupport) return false;

    try {
      const sequence = Array.isArray(pattern) ? pattern : PATTERNS[pattern] || [30];
      return navigator.vibrate(sequence);
    } catch {
      return false;
    }
  }

  /**
   * Intuitive tactile physical feedback when approaching or exceeding daily calorie budget
   * - 90% to 99%: approaching alert (gentle dhak-dhak)
   * - 100%+: heartbeat warning pulse (rhythmic dhak-dhak)
   */
  public checkCalorieBudgetAlert(consumedCalories: number, targetCalories: number): boolean {
    if (!targetCalories || targetCalories <= 0) return false;

    const ratio = consumedCalories / targetCalories;

    if (ratio >= 1.0) {
      // Crossed daily budget
      return this.vibrate('heartbeat');
    } else if (ratio >= 0.90) {
      // Approaching budget threshold (within 10%)
      return this.vibrate('budgetApproaching');
    }

    return false;
  }
}

export const haptics = new HapticsManager();

export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'success' = 'medium'): boolean => {
  switch (type) {
    case 'light':
      return haptics.vibrate('lightTap');
    case 'medium':
      return haptics.vibrate('mediumTap');
    case 'heavy':
      return haptics.vibrate([60, 40, 60]);
    case 'success':
      return haptics.vibrate('success');
    default:
      return haptics.vibrate('lightTap');
  }
};
