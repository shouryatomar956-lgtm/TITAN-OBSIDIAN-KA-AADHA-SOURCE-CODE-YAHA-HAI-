export type Unit = 'kg' | 'lbs';

export interface PlateDefinition {
  weight: number;
  countPerSide: number;
  color: string;
  textColor: string;
  heightPercent: number; // for proportional visual rendering
  widthPx: number;
}

export interface BarType {
  id: string;
  name: string;
  weightKg: number;
  weightLbs: number;
}

export const STANDARD_BARS: BarType[] = [
  { id: 'olympic_standard', name: 'Olympic Bar (20 kg / 45 lbs)', weightKg: 20, weightLbs: 45 },
  { id: 'olympic_women', name: 'Women\'s Bar (15 kg / 35 lbs)', weightKg: 15, weightLbs: 35 },
  { id: 'technique_bar', name: 'Technique Bar (10 kg / 25 lbs)', weightKg: 10, weightLbs: 25 },
  { id: 'trap_bar', name: 'Trap / Hex Bar (25 kg / 55 lbs)', weightKg: 25, weightLbs: 55 },
];

export const METRIC_PLATES_PALETTE: { weight: number; color: string; textColor: string; heightPercent: number; widthPx: number }[] = [
  { weight: 25, color: '#ef4444', textColor: '#ffffff', heightPercent: 100, widthPx: 24 }, // IWF Red
  { weight: 20, color: '#2563eb', textColor: '#ffffff', heightPercent: 95, widthPx: 22 },  // IWF Blue
  { weight: 15, color: '#eab308', textColor: '#000000', heightPercent: 85, widthPx: 20 },  // IWF Yellow
  { weight: 10, color: '#16a34a', textColor: '#ffffff', heightPercent: 75, widthPx: 18 },  // IWF Green
  { weight: 5, color: '#f8fafc', textColor: '#0f172a', heightPercent: 62, widthPx: 15 },   // White
  { weight: 2.5, color: '#334155', textColor: '#ffffff', heightPercent: 50, widthPx: 13 }, // Black
  { weight: 1.25, color: '#94a3b8', textColor: '#0f172a', heightPercent: 40, widthPx: 11 },// Silver
  { weight: 0.5, color: '#cbd5e1', textColor: '#0f172a', heightPercent: 32, widthPx: 9 },  // Microplate
];

export const IMPERIAL_PLATES_PALETTE: { weight: number; color: string; textColor: string; heightPercent: number; widthPx: number }[] = [
  { weight: 45, color: '#2563eb', textColor: '#ffffff', heightPercent: 100, widthPx: 24 },
  { weight: 35, color: '#eab308', textColor: '#000000', heightPercent: 90, widthPx: 22 },
  { weight: 25, color: '#16a34a', textColor: '#ffffff', heightPercent: 80, widthPx: 20 },
  { weight: 10, color: '#f8fafc', textColor: '#0f172a', heightPercent: 65, widthPx: 16 },
  { weight: 5, color: '#ef4444', textColor: '#ffffff', heightPercent: 52, widthPx: 14 },
  { weight: 2.5, color: '#334155', textColor: '#ffffff', heightPercent: 42, widthPx: 12 },
];

export interface CalculationResult {
  unit: Unit;
  targetWeight: number;
  barWeight: number;
  weightNeeded: number;
  weightPerSide: number;
  actualTotalWeight: number;
  remainder: number;
  platesPerSide: PlateDefinition[];
  totalPlatesCount: number;
  isExact: boolean;
}

/**
 * Calculates optimal plate distribution per barbell side.
 */
export function calculatePlates(
  targetWeight: number,
  barWeight: number,
  unit: Unit = 'kg',
  customAvailablePlates?: number[]
): CalculationResult {
  const isKg = unit === 'kg';
  const palette = isKg ? METRIC_PLATES_PALETTE : IMPERIAL_PLATES_PALETTE;

  // Filter or sort plate denominations descending
  let activePlates = customAvailablePlates && customAvailablePlates.length > 0
    ? palette.filter(p => customAvailablePlates.includes(p.weight))
    : [...palette];

  activePlates.sort((a, b) => b.weight - a.weight);

  const weightNeeded = Math.max(0, targetWeight - barWeight);
  const targetPerSide = weightNeeded / 2;

  let remaining = targetPerSide;
  const platesPerSide: PlateDefinition[] = [];
  let totalPlates = 0;

  for (const plate of activePlates) {
    if (remaining <= 0) break;
    const count = Math.floor((remaining + 1e-4) / plate.weight);
    if (count > 0) {
      platesPerSide.push({
        weight: plate.weight,
        countPerSide: count,
        color: plate.color,
        textColor: plate.textColor,
        heightPercent: plate.heightPercent,
        widthPx: plate.widthPx
      });
      remaining = Number((remaining - (count * plate.weight)).toFixed(3));
      totalPlates += count * 2; // both sides
    }
  }

  // Dynamic Programming (Minimum-Plate Unbounded Knapsack / Change-Making Solver)
  // If greedy heuristic leaves a remainder on a non-canonical custom plate inventory (e.g., [20, 15] for 30kg),
  // solve exact DP in discrete 0.25-unit resolution to guarantee minimum plate count & zero remainder when solvable.
  if (remaining > 0.01 && activePlates.length > 1 && targetPerSide <= 250) {
    const scale = 4; // 0.25kg/lb resolution
    const targetUnits = Math.round(targetPerSide * scale);
    const dp = new Int32Array(targetUnits + 1).fill(1e9);
    const parentPlateIdx = new Int32Array(targetUnits + 1).fill(-1);
    dp[0] = 0;

    for (let w = 1; w <= targetUnits; w++) {
      for (let i = 0; i < activePlates.length; i++) {
        const pUnits = Math.round(activePlates[i].weight * scale);
        if (pUnits > 0 && w >= pUnits && dp[w - pUnits] + 1 < dp[w]) {
          dp[w] = dp[w - pUnits] + 1;
          parentPlateIdx[w] = i;
        }
      }
    }

    // Find closest achievable weight <= targetUnits that beats greedy remainder
    let bestUnits = targetUnits;
    while (bestUnits > 0 && dp[bestUnits] >= 1e9) {
      bestUnits--;
    }
    const dpRemainder = Number((targetPerSide - bestUnits / scale).toFixed(3));
    if (dpRemainder < remaining - 0.01) {
      const counts = new Int32Array(activePlates.length);
      let curr = bestUnits;
      while (curr > 0 && parentPlateIdx[curr] !== -1) {
        const idx = parentPlateIdx[curr];
        counts[idx]++;
        curr -= Math.round(activePlates[idx].weight * scale);
      }
      platesPerSide.length = 0;
      totalPlates = 0;
      for (let i = 0; i < activePlates.length; i++) {
        if (counts[i] > 0) {
          const p = activePlates[i];
          platesPerSide.push({
            weight: p.weight,
            countPerSide: counts[i],
            color: p.color,
            textColor: p.textColor,
            heightPercent: p.heightPercent,
            widthPx: p.widthPx
          });
          totalPlates += counts[i] * 2;
        }
      }
      remaining = dpRemainder;
    }
  }

  const loadedPerSide = targetPerSide - remaining;
  const actualTotalWeight = Number((barWeight + (loadedPerSide * 2)).toFixed(2));
  const remainder = Number((targetWeight - actualTotalWeight).toFixed(2));

  return {
    unit,
    targetWeight,
    barWeight,
    weightNeeded,
    weightPerSide: loadedPerSide,
    actualTotalWeight,
    remainder,
    platesPerSide,
    totalPlatesCount: totalPlates,
    isExact: Math.abs(remainder) < 0.01
  };
}
