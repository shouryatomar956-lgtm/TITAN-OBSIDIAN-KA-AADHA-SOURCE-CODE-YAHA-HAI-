import { CalorieLogItem, MealType } from './CalorieStorageService';

export interface ClipboardParseResult {
  rawText: string;
  sourceDetected: 'zomato' | 'swiggy' | 'nutrition_label' | 'recipe' | 'freeform';
  items: Omit<CalorieLogItem, 'id' | 'timestamp'>[];
  totalCalories: number;
}

export class ClipboardParser {
  /**
   * Reads system clipboard and auto-scrapes meal entries
   */
  public static async scrapeFromClipboard(targetMealType?: MealType): Promise<ClipboardParseResult> {
    if (typeof navigator === 'undefined' || !navigator.clipboard || !navigator.clipboard.readText) {
      throw new Error('Clipboard API is not available in this browser environment.');
    }

    const text = await navigator.clipboard.readText();
    if (!text || !text.trim()) {
      throw new Error('Clipboard is empty. Copy food details or order receipt first!');
    }

    return this.parseText(text.trim(), targetMealType);
  }

  /**
   * Normalizes raw text blocks from Swiggy, Zomato, or generic nutrition logs
   * Never guesses calories: strictly extracts numbers provided in clipboard text.
   */
  public static parseText(rawText: string, defaultMeal: MealType = 'lunch'): ClipboardParseResult {
    const lower = rawText.toLowerCase();
    let sourceDetected: ClipboardParseResult['sourceDetected'] = 'freeform';

    if (lower.includes('zomato') || lower.includes('order summary') || lower.includes('delivered to')) {
      sourceDetected = 'zomato';
    } else if (lower.includes('swiggy') || lower.includes('item total') || lower.includes('bill details')) {
      sourceDetected = 'swiggy';
    } else if (lower.includes('protein') && (lower.includes('kcal') || lower.includes('calories') || lower.includes('carbs'))) {
      sourceDetected = 'nutrition_label';
    } else if (lower.includes('ingredients') || lower.includes('servings') || lower.includes('prep time')) {
      sourceDetected = 'recipe';
    }

    const items: Omit<CalorieLogItem, 'id' | 'timestamp'>[] = [];
    const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    for (const line of lines) {
      const calMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:kcal|calories|cal)\b/i);
      const protMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:protein|prot)\b/i);
      const carbMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:carbs|carbohydrates|carb)\b/i);
      const fatMatch = line.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:fat|fats|lipid)\b/i);

      if (calMatch) {
        const calories = parseFloat(calMatch[1]);
        const protein = protMatch ? Math.round(parseFloat(protMatch[1])) : 0;
        const carbs = carbMatch ? Math.round(parseFloat(carbMatch[1])) : 0;
        const fats = fatMatch ? Math.round(parseFloat(fatMatch[1])) : 0;

        let name = line
          .replace(/(\d+(?:\.\d+)?)\s*(?:kcal|calories|cal)\b/gi, '')
          .replace(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:protein|prot)\b/gi, '')
          .replace(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:carbs|carbohydrates|carb)\b/gi, '')
          .replace(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:fat|fats|lipid)\b/gi, '')
          .replace(/[:\|\-,\(\)]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (name.length < 2) name = 'Nutritional Meal';

        items.push({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          mealType: defaultMeal,
          calories: Math.round(calories),
          protein,
          carbs,
          fats,
          quantity: 1,
          unit: 'portion',
          source: 'clipboard'
        });
      }
    }

    if (items.length === 0) {
      // Look for a general calorie number in whole text
      const globalCalMatch = rawText.match(/(\d+(?:\.\d+)?)\s*(?:kcal|calories|cal)\b/i);
      if (globalCalMatch) {
        const cals = Math.round(parseFloat(globalCalMatch[1]));
        items.push({
          name: rawText.slice(0, 30).trim() || 'Logged Meal',
          mealType: defaultMeal,
          calories: cals,
          protein: 0,
          carbs: 0,
          fats: 0,
          quantity: 1,
          unit: 'serving',
          source: 'clipboard'
        });
      } else {
        throw new Error('Copied text does not contain calories. Please copy text that includes calories (e.g. "450 kcal"). App calories guess nahi karta.');
      }
    }

    const totalCalories = items.reduce((sum, i) => sum + i.calories, 0);

    return {
      rawText,
      sourceDetected,
      items,
      totalCalories
    };
  }
}
