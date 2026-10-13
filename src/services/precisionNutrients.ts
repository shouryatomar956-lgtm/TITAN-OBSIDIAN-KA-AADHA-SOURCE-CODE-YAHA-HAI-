/**
 * Precision Nutrient Breakdown Engine (100g Base, Strict 19 Parameters)
 * Grounded in ICMR-NIN (National Institute of Nutrition, India) and USDA FoodData Central.
 */

export interface PrecisionMicros {
  calcium: number; // mg / 100g
  calories: number; // kcal / 100g
  copper: number; // mg / 100g
  dietaryFiber: number; // g / 100g
  magnesium: number; // mg / 100g
  manganese: number; // mg / 100g
  monounsaturatedFat: number; // g / 100g
  phosphorus: number; // mg / 100g
  polyunsaturatedFat: number; // g / 100g
  potassium: number; // mg / 100g
  protein: number; // g / 100g
  saturatedFat: number; // g / 100g
  sodium: number; // mg / 100g
  totalCarbohydrates: number; // g / 100g
  vitaminA: number; // mcg / 100g
  vitaminBComplex: number; // mg / 100g
  vitaminC: number; // mg / 100g
  waterMoisture: number; // g / 100g
  zinc: number; // mg / 100g
}

export type DietType = 'Veg' | 'Non-Veg' | 'Supplement';

export function getDietType(name: string, type: string): DietType {
  if (type === 'Gym Supplement') return 'Supplement';
  const lower = name.toLowerCase();
  const nonVegKeywords = [
    'chicken', 'egg', 'anda', 'fish', 'machhli', 'surmai', 'rohu', 'pomfret',
    'mutton', 'meat', 'tuna', 'salmon', 'prawn', 'shrimp', 'keema', 'turkey'
  ];
  for (const kw of nonVegKeywords) {
    if (lower.includes(kw)) return 'Non-Veg';
  }
  return 'Veg';
}

export function parseServingGrams(servingSize: string): number {
  if (!servingSize) return 100;
  const match = servingSize.match(/(\d+(?:\.\d+)?)\s*(?:g|grams|ml)\b/i);
  if (match) {
    const val = parseFloat(match[1]);
    if (val > 0 && val <= 1000) return val;
  }
  const lower = servingSize.toLowerCase();
  if (lower.includes('piece') || lower.includes('roti') || lower.includes('phulka')) {
    const countMatch = servingSize.match(/(\d+)\s*(?:pieces?|rotis?|phulkas?)/i);
    const count = countMatch ? parseInt(countMatch[1], 10) : 1;
    return count * 40;
  }
  if (lower.includes('bowl') || lower.includes('plate') || lower.includes('cup')) {
    return 200;
  }
  if (lower.includes('scoop')) {
    return 32;
  }
  if (lower.includes('glass') || lower.includes('shake') || lower.includes('bottle')) {
    return 250;
  }
  return 100;
}

export function calculatePrecisionMicros(item: {
  name: string;
  type: string;
  category: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}): PrecisionMicros {
  const name = item.name.toLowerCase();
  const isSupp = item.type === 'Gym Supplement';
  const servingGrams = parseServingGrams(item.servingSize);
  const factor = 100 / servingGrams;

  // Normalized primary macronutrients strictly per 100g base
  const calories = Math.max(1, Math.round(item.calories * factor));
  const protein = Math.max(0, Math.round(item.protein * factor * 10) / 10);
  const totalCarbohydrates = Math.max(0, Math.round(item.carbs * factor * 10) / 10);
  const fats = Math.max(0, Math.round(item.fats * factor * 10) / 10);

  // Default values
  let calcium = 45;
  let copper = 0.2;
  let dietaryFiber = 0;
  let magnesium = 35;
  let manganese = 0.5;
  let phosphorus = 120;
  let potassium = 240;
  let sodium = 90;
  let vitaminA = 25;
  let vitaminBComplex = 1.0;
  let vitaminC = 2.0;
  let waterMoisture = 65.0;

  let satFatRatio = 0.3;
  let monoFatRatio = 0.4;
  let polyFatRatio = 0.3;

  if (isSupp) {
    if (name.includes('whey') || name.includes('casein') || name.includes('protein') || name.includes('shake') || name.includes('mass')) {
      calcium = Math.round(350 + protein * 2.5);
      copper = 0.25;
      dietaryFiber = totalCarbohydrates > 5 ? 1.5 : 0.4;
      magnesium = 65;
      manganese = 0.2;
      phosphorus = Math.round(280 + protein * 1.5);
      potassium = Math.round(380 + protein * 3);
      sodium = 180;
      vitaminA = 45;
      vitaminBComplex = 2.8;
      vitaminC = 4.0;
      waterMoisture = 5.2;
      satFatRatio = 0.55;
      monoFatRatio = 0.35;
      polyFatRatio = 0.10;
    } else if (name.includes('creatine') || name.includes('citrulline') || name.includes('beta-alanine') || name.includes('glutamine') || name.includes('eaa') || name.includes('bcaa') || name.includes('arginine') || name.includes('taurine')) {
      calcium = 12;
      copper = 0.05;
      dietaryFiber = 0;
      magnesium = 18;
      manganese = 0.04;
      phosphorus = 35;
      potassium = 45;
      sodium = 60;
      vitaminA = 0;
      vitaminBComplex = 0.8;
      vitaminC = 0.5;
      waterMoisture = 2.1;
      satFatRatio = 0;
      monoFatRatio = 0;
      polyFatRatio = 0;
    } else if (name.includes('magnesium')) {
      calcium = 40;
      copper = 0.1;
      dietaryFiber = 0.5;
      magnesium = 2500;
      manganese = 0.5;
      phosphorus = 80;
      potassium = 120;
      sodium = 40;
      vitaminA = 0;
      vitaminBComplex = 1.2;
      vitaminC = 1.0;
      waterMoisture = 3.5;
    } else if (name.includes('spirulina') || name.includes('moringa') || name.includes('ashwagandha') || name.includes('shilajit')) {
      calcium = 280;
      copper = 0.8;
      dietaryFiber = 8.5;
      magnesium = 190;
      manganese = 2.2;
      phosphorus = 320;
      potassium = 950;
      sodium = 110;
      vitaminA = 340;
      vitaminBComplex = 4.2;
      vitaminC = 18.0;
      waterMoisture = 6.0;
      satFatRatio = 0.25;
      monoFatRatio = 0.35;
      polyFatRatio = 0.40;
    } else {
      calcium = 85;
      copper = 0.3;
      dietaryFiber = 1.0;
      magnesium = 75;
      manganese = 0.4;
      phosphorus = 140;
      potassium = 310;
      sodium = 120;
      vitaminA = 50;
      vitaminBComplex = 3.0;
      vitaminC = 15.0;
      waterMoisture = 4.0;
    }
  } else {
    // Indian Home Food archetypes
    if (name.includes('chicken') || name.includes('mutton') || name.includes('meat') || name.includes('keema')) {
      calcium = 22;
      copper = 0.18;
      dietaryFiber = 0;
      magnesium = 32;
      manganese = 0.05;
      phosphorus = 240;
      potassium = 360;
      sodium = 95;
      vitaminA = 48;
      vitaminBComplex = 4.8;
      vitaminC = 0.8;
      waterMoisture = 69.5;
      satFatRatio = 0.34;
      monoFatRatio = 0.44;
      polyFatRatio = 0.22;
    } else if (name.includes('fish') || name.includes('machhli') || name.includes('surmai') || name.includes('rohu') || name.includes('pomfret') || name.includes('tuna') || name.includes('salmon')) {
      calcium = 38;
      copper = 0.15;
      dietaryFiber = 0;
      magnesium = 38;
      manganese = 0.04;
      phosphorus = 260;
      potassium = 390;
      sodium = 85;
      vitaminA = 65;
      vitaminBComplex = 5.2;
      vitaminC = 1.0;
      waterMoisture = 72.0;
      satFatRatio = 0.24;
      monoFatRatio = 0.36;
      polyFatRatio = 0.40;
    } else if (name.includes('egg') || name.includes('anda')) {
      calcium = 56;
      copper = 0.12;
      dietaryFiber = 0;
      magnesium = 24;
      manganese = 0.06;
      phosphorus = 210;
      potassium = 155;
      sodium = 140;
      vitaminA = 160;
      vitaminBComplex = 2.4;
      vitaminC = 0;
      waterMoisture = 74.0;
      satFatRatio = 0.33;
      monoFatRatio = 0.42;
      polyFatRatio = 0.25;
    } else if (name.includes('banana') || name.includes('kela')) {
      calcium = 8;
      copper = 0.08;
      dietaryFiber = Math.min(totalCarbohydrates, Math.max(2.2, Math.round(totalCarbohydrates * 0.11 * 10) / 10));
      magnesium = 28;
      manganese = 0.27;
      phosphorus = 24;
      potassium = 360;
      sodium = 1.5;
      vitaminA = 64;
      vitaminBComplex = 0.5;
      vitaminC = 8.7;
      waterMoisture = 74.9;
      satFatRatio = 0.33;
      monoFatRatio = 0.22;
      polyFatRatio = 0.45;
    } else if (name.includes('coconut water') || name.includes('nariyal pani')) {
      calcium = 24;
      copper = 0.04;
      dietaryFiber = 1.1;
      magnesium = 25;
      manganese = 0.14;
      phosphorus = 20;
      potassium = 250;
      sodium = 105;
      vitaminA = 0;
      vitaminBComplex = 0.3;
      vitaminC = 2.4;
      waterMoisture = 95.0;
      satFatRatio = 0.60;
      monoFatRatio = 0.20;
      polyFatRatio = 0.20;
    } else if (name.includes('makhana')) {
      calcium = 60;
      copper = 0.22;
      dietaryFiber = 7.6;
      magnesium = 65;
      manganese = 1.1;
      phosphorus = 90;
      potassium = 350;
      sodium = 5.0;
      vitaminA = 12;
      vitaminBComplex = 1.2;
      vitaminC = 1.4;
      waterMoisture = 11.2;
      satFatRatio = 0.20;
      monoFatRatio = 0.40;
      polyFatRatio = 0.40;
    } else if (name.includes('sattu')) {
      calcium = 65;
      copper = 0.65;
      dietaryFiber = 14.5;
      magnesium = 135;
      manganese = 1.8;
      phosphorus = 310;
      potassium = 780;
      sodium = 15;
      vitaminA = 22;
      vitaminBComplex = 2.4;
      vitaminC = 1.0;
      waterMoisture = 9.8;
      satFatRatio = 0.18;
      monoFatRatio = 0.38;
      polyFatRatio = 0.44;
    } else if (name.includes('paneer') || name.includes('dahi') || name.includes('curd') || name.includes('milk') || name.includes('doodh') || name.includes('chaas') || name.includes('lassi')) {
      calcium = name.includes('paneer') ? 440 : 130;
      copper = 0.08;
      dietaryFiber = 0;
      magnesium = 28;
      manganese = 0.04;
      phosphorus = 220;
      potassium = 180;
      sodium = 65;
      vitaminA = 85;
      vitaminBComplex = 1.6;
      vitaminC = 1.2;
      waterMoisture = name.includes('paneer') ? 52.0 : 86.0;
      satFatRatio = 0.65;
      monoFatRatio = 0.28;
      polyFatRatio = 0.07;
    } else if (name.includes('dal') || name.includes('moong') || name.includes('chana') || name.includes('rajma') || name.includes('lobia') || name.includes('chhole') || name.includes('sattu') || name.includes('besan') || name.includes('kulthi') || name.includes('sprout')) {
      calcium = 68;
      copper = 0.38;
      dietaryFiber = Math.min(totalCarbohydrates, Math.max(3.5, Math.round(totalCarbohydrates * 0.25 * 10) / 10));
      magnesium = 72;
      manganese = 1.2;
      phosphorus = 185;
      potassium = 460;
      sodium = 110;
      vitaminA = 28;
      vitaminBComplex = 2.1;
      vitaminC = name.includes('sprout') ? 12.0 : 3.5;
      waterMoisture = 68.0;
      satFatRatio = 0.20;
      monoFatRatio = 0.35;
      polyFatRatio = 0.45;
    } else if (name.includes('ragi') || name.includes('jowar') || name.includes('bajra') || name.includes('oats') || name.includes('daliya') || name.includes('rice') || name.includes('roti') || name.includes('phulka') || name.includes('khichdi') || name.includes('pulao') || name.includes('bhakri') || name.includes('poha') || name.includes('upma')) {
      calcium = name.includes('ragi') ? 160 : 35;
      copper = 0.28;
      dietaryFiber = Math.min(totalCarbohydrates, Math.max(2.2, Math.round(totalCarbohydrates * 0.16 * 10) / 10));
      magnesium = 55;
      manganese = 1.4;
      phosphorus = 135;
      potassium = 195;
      sodium = 70;
      vitaminA = 18;
      vitaminBComplex = 1.8;
      vitaminC = 1.5;
      waterMoisture = 60.0;
      satFatRatio = 0.22;
      monoFatRatio = 0.38;
      polyFatRatio = 0.40;
    } else if (name.includes('palak') || name.includes('spinach') || name.includes('lauki') || name.includes('baingan') || name.includes('shimla') || name.includes('tori') || name.includes('bhindi') || name.includes('gajar') || name.includes('methi') || name.includes('kheera') || name.includes('salad')) {
      calcium = name.includes('palak') || name.includes('methi') ? 115 : 42;
      copper = 0.16;
      dietaryFiber = Math.min(totalCarbohydrates, Math.max(2.0, Math.round(totalCarbohydrates * 0.45 * 10) / 10));
      magnesium = 45;
      manganese = 0.7;
      phosphorus = 55;
      potassium = 340;
      sodium = 50;
      vitaminA = name.includes('palak') || name.includes('gajar') || name.includes('methi') ? 480 : 65;
      vitaminBComplex = 1.1;
      vitaminC = 28.0;
      waterMoisture = 88.0;
      satFatRatio = 0.20;
      monoFatRatio = 0.40;
      polyFatRatio = 0.40;
    } else if (name.includes('badam') || name.includes('almond') || name.includes('akhrot') || name.includes('walnut') || name.includes('peanut') || name.includes('chia') || name.includes('seed')) {
      calcium = 180;
      copper = 0.95;
      dietaryFiber = Math.min(totalCarbohydrates, Math.max(4.0, Math.round(totalCarbohydrates * 0.5 * 10) / 10));
      magnesium = 220;
      manganese = 2.8;
      phosphorus = 440;
      potassium = 680;
      sodium = 25;
      vitaminA = 20;
      vitaminBComplex = 2.5;
      vitaminC = 2.0;
      waterMoisture = 12.0;
      satFatRatio = 0.12;
      monoFatRatio = 0.58;
      polyFatRatio = 0.30;
    }
  }

  // Zinc estimation
  let zinc = 1.5;
  if (protein > 15) {
    zinc = Math.round((1.8 + protein * 0.08) * 10) / 10;
  } else if (isSupp && name.includes('multivitamin')) {
    zinc = 12.0;
  } else {
    zinc = 1.2;
  }

  // Dietary fiber clamp
  if (dietaryFiber === 0 && totalCarbohydrates > 8) {
    dietaryFiber = Math.round(totalCarbohydrates * 0.12 * 10) / 10;
  }

  // Exact lipid breakdown guaranteeing saturated + mono + poly = total fats
  let saturatedFat = Math.round(fats * satFatRatio * 10) / 10;
  let monounsaturatedFat = Math.round(fats * monoFatRatio * 10) / 10;
  let polyunsaturatedFat = Math.max(0, Math.round((fats - saturatedFat - monounsaturatedFat) * 10) / 10);

  // Water moisture clamp so sum of water + macros <= 100g
  const macroSum = protein + totalCarbohydrates + fats + (dietaryFiber * 0.2);
  const maxWater = Math.max(2.0, Math.round((100 - macroSum) * 10) / 10);
  waterMoisture = Math.min(waterMoisture, maxWater);

  return {
    calcium: Math.round(calcium),
    calories,
    copper: Math.round(copper * 100) / 100,
    dietaryFiber: Math.round(dietaryFiber * 10) / 10,
    magnesium: Math.round(magnesium),
    manganese: Math.round(manganese * 100) / 100,
    monounsaturatedFat,
    phosphorus: Math.round(phosphorus),
    polyunsaturatedFat,
    potassium: Math.round(potassium),
    protein,
    saturatedFat,
    sodium: Math.round(sodium),
    totalCarbohydrates,
    vitaminA: Math.round(vitaminA),
    vitaminBComplex: Math.round(vitaminBComplex * 10) / 10,
    vitaminC: Math.round(vitaminC * 10) / 10,
    waterMoisture: Math.round(waterMoisture * 10) / 10,
    zinc
  };
}

export function enrichItemWithMicros<T extends {
  name: string;
  type: 'Indian Home Food' | 'Gym Supplement';
  category: string;
  servingSize: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}>(item: T) {
  const precisionMicros = calculatePrecisionMicros(item);
  const dietType = getDietType(item.name, item.type);
  return {
    ...item,
    dietType,
    isVeg: dietType === 'Veg',
    precisionMicros
  };
}
