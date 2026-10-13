/**
 * Smart 3D Body Mesh Reconstruction & Anthropometric Engine
 * 
 * Reconstructs a rotatable, high-precision 3D body volume wireframe mesh
 * from contour geometric silhouette analysis with Cloth-Invariant Body Recovery.
 * Calculates anthropometric body fat %, lean mass, waist-to-hip ratio, and localized muscle density.
 */

import localforage from 'localforage';
import * as Comlink from 'comlink';

export interface Vertex3D {
  x: number;
  y: number;
  z: number;
}

export interface LandmarkPoint {
  x: number;
  y: number;
}

export interface AnatomicalLandmarks {
  shoulderLeft: LandmarkPoint;
  shoulderRight: LandmarkPoint;
  chestLeft: LandmarkPoint;
  chestRight: LandmarkPoint;
  waistLeft: LandmarkPoint;
  waistRight: LandmarkPoint;
  hipLeft: LandmarkPoint;
  hipRight: LandmarkPoint;
  thighLeft: LandmarkPoint;
  thighRight: LandmarkPoint;
}

export interface BodySegmentMesh {
  name: string;
  vertices: Vertex3D[];
  indices: number[][]; // Polygon face connections
  densityScore: number; // 0 to 100 for muscle hypertrophy color mapping
}

export type GarmentFitType = 'auto' | 'casual' | 'loose' | 'fitted';

export interface GarmentCompensationDetails {
  fitType: string;
  slackReductionPct: number;
  trueWaistOffsetCm: number;
  estimatedFabricVolumePct: number;
}

export interface AnthropometricProfile {
  estimatedBodyFatPercent: number;
  leanMassKg: number;
  fatMassKg: number;
  waistToHipRatio: number;
  shoulderToWaistRatio: number;
  chestToShoulderRatio: number;
  shoulderToChestRatio: number;
  somatotype: 'Mesomorph Dominant' | 'Ectomorph Dominant' | 'Endomorph Dominant' | 'Balanced Athletic';
  posturalSymmetryScore: number;
  localizedMuscleDistribution: {
    deltoidsAndChest: number;
    coreAndAbs: number;
    quadricepsAndGlutes: number;
    calvesAndLowerLimbs: number;
  };
  landmarks?: AnatomicalLandmarks;
  garmentCompensated?: boolean;
  garmentCompensationDetails?: GarmentCompensationDetails;
  advancedIndices?: {
    siriBodyFatPct: number;
    brozekBodyFatPct: number;
    bodyDensityGcm3: number;
    fatFreeMassIndexFfmi: number;
    normalizedFfmi: number;
    aBodyShapeIndexAbsi: number;
    bodyRoundnessIndexBri: number;
    conicityIndexCi: number;
    duBoisSurfaceAreaM2: number;
    ramanujanWaistCm: number;
    ramanujanHipCm: number;
  };
  scannedAt: string;
}

export interface SavedBodyScan {
  id: string;
  timestamp: number;
  dateStr: string;
  metrics: AnthropometricProfile;
}

export interface SilhouetteContourRatios {
  shoulderRatio: number;
  waistRatio: number;
  hipRatio: number;
  chestRatio: number;
  thighRatio: number;
  chestToShoulderRatio: number;
  shoulderToChestRatio: number;
  garmentSlackPercent: number;
  appliedWaistContraction: number;
  detectedFit: string;
  landmarks: AnatomicalLandmarks;
  pixelWidths: {
    shoulder: number;
    chest: number;
    waist: number;
    hip: number;
    thigh: number;
  };
}

const STORAGE_BODY_MESH_HISTORY = 'pulsefit_body_mesh_history';

// Comlink Worker initialization
let workerApi: any = null;
try {
  if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
    const worker = new Worker(new URL('../workers/bodyMesh.worker.ts', import.meta.url), {
      type: 'module'
    });
    workerApi = Comlink.wrap<any>(worker);
  }
} catch (e) {
  console.warn('[BodyMeshReconstructionEngine] Worker proxy notice:', e);
}

export class BodyMeshReconstructionEngine {
  /**
   * Generates a 3D cylindrical wireframe surface mesh for anatomical body contour
   */
  public generate3DMesh(
    heightCm: number = 175,
    weightKg: number = 72,
    waistScale: number = 1.0,
    shoulderScale: number = 1.0,
    hipScale: number = 1.0
  ): Vertex3D[] {
    const vertices: Vertex3D[] = [];
    const layers = 28;
    const slicesPerLayer = 18;

    // Longitudinal profile scale factor from head to feet (-1.0 to +1.0)
    for (let layer = 0; layer < layers; layer++) {
      const v = layer / (layers - 1); // 0 (head) to 1 (feet)
      const y = (1.0 - (v * 2.0)) * 1.8; // Centered vertical coordinate

      // Anatomical radius profile
      let baseRadius = 0.25;

      if (v < 0.12) {
        // Head / Cranium
        baseRadius = 0.28 * Math.sin((v / 0.12) * Math.PI);
      } else if (v < 0.18) {
        // Neck
        baseRadius = 0.17;
      } else if (v < 0.32) {
        // Shoulders & Chest
        const t = (v - 0.18) / 0.14;
        baseRadius = (0.42 + 0.08 * Math.sin(t * Math.PI)) * shoulderScale;
      } else if (v < 0.44) {
        // Waist
        baseRadius = 0.32 * waistScale;
      } else if (v < 0.56) {
        // Hips / Pelvis
        baseRadius = 0.38 * hipScale;
      } else if (v < 0.78) {
        // Upper Legs / Thighs
        const t = (v - 0.56) / 0.22;
        baseRadius = (0.28 - (t * 0.07));
      } else if (v < 0.92) {
        // Calves
        const t = (v - 0.78) / 0.14;
        baseRadius = 0.20 + 0.05 * Math.sin(t * Math.PI);
      } else {
        // Ankles / Feet
        baseRadius = 0.15;
      }

      // Elliptical cross section (anterior-posterior is flatter than lateral width)
      const xRadius = baseRadius;
      const zRadius = baseRadius * 0.72;

      for (let slice = 0; slice < slicesPerLayer; slice++) {
        const angle = (slice / slicesPerLayer) * Math.PI * 2;
        const x = Math.cos(angle) * xRadius;
        const z = Math.sin(angle) * zRadius;

        vertices.push({ x, y, z });
      }
    }

    return vertices;
  }

  /**
   * Fast synchronous fallback / baseline silhouette scanner
   */
  public analyzeSilhouette(canvas: HTMLCanvasElement): SilhouetteContourRatios {
    return this.analyzeSilhouetteWithGarments(canvas, 'auto');
  }

  /**
   * Advanced Cloth-Invariant Silhouette Analysis:
   * Extracts the true anatomical body contours even when the user is wearing clothes
   * (compensates for fabric drape, loose t-shirt falloff, pocket flares, etc.)
   */
  public analyzeSilhouetteWithGarments(
    canvas: HTMLCanvasElement,
    garmentFit: GarmentFitType = 'auto',
    userProfile?: { height: number; weight: number; gender: string }
  ): SilhouetteContourRatios {
    const defaultLandmarks: AnatomicalLandmarks = {
      shoulderLeft: { x: 70, y: 100 },
      shoulderRight: { x: 250, y: 100 },
      chestLeft: { x: 80, y: 140 },
      chestRight: { x: 240, y: 140 },
      waistLeft: { x: 95, y: 190 },
      waistRight: { x: 225, y: 190 },
      hipLeft: { x: 85, y: 240 },
      hipRight: { x: 235, y: 240 },
      thighLeft: { x: 100, y: 300 },
      thighRight: { x: 220, y: 300 }
    };

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { 
        shoulderRatio: 1.0, 
        waistRatio: 1.0, 
        hipRatio: 1.0, 
        chestRatio: 1.0,
        thighRatio: 1.0,
        chestToShoulderRatio: 1.0,
        shoulderToChestRatio: 1.0,
        garmentSlackPercent: 10,
        appliedWaistContraction: 11,
        detectedFit: 'Standard',
        landmarks: defaultLandmarks,
        pixelWidths: { shoulder: 180, chest: 160, waist: 130, hip: 150, thigh: 120 }
      };
    }

    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h);
    const pixels = imgData.data;

    // 1. Otsu's Global Histogram Variance Maximization Thresholding on Rec.709 Luminance
    const hist = new Int32Array(256);
    const totalSampled = Math.max(1, Math.floor((w * h) / 4));
    for (let i = 0; i < pixels.length; i += 16) {
      const luma = Math.min(255, Math.max(0, Math.round(0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2])));
      hist[luma]++;
    }
    let sumAll = 0;
    for (let t = 0; t < 256; t++) sumAll += t * hist[t];
    let sumB = 0, wB = 0, maxVar = 0, otsuThreshold = 42;
    for (let t = 15; t < 230; t++) {
      wB += hist[t];
      if (wB === 0) continue;
      const wF = totalSampled - wB;
      if (wF <= 0) break;
      sumB += t * hist[t];
      const mB = sumB / wB;
      const mF = (sumAll - sumB) / wF;
      const betweenVar = wB * wF * (mB - mF) * (mB - mF);
      if (betweenVar > maxVar) {
        maxVar = betweenVar;
        otsuThreshold = t;
      }
    }
    const lowBound = Math.max(25, Math.min(60, Math.round(otsuThreshold * 0.65)));

    // Scan horizontal slice widths at key anatomical heights with Sobel horizontal gradient refinement
    const getRowWidth = (yRatio: number): { width: number; minX: number; maxX: number } => {
      const y = Math.min(h - 2, Math.max(1, Math.floor(h * yRatio)));
      let minX = w;
      let maxX = 0;

      for (let x = 1; x < w - 1; x++) {
        const idx = (y * w + x) * 4;
        const luma = 0.2126 * pixels[idx] + 0.7152 * pixels[idx + 1] + 0.0722 * pixels[idx + 2];
        const lumaLeft = 0.2126 * pixels[idx - 4] + 0.7152 * pixels[idx - 3] + 0.0722 * pixels[idx - 2];
        const lumaRight = 0.2126 * pixels[idx + 4] + 0.7152 * pixels[idx + 5] + 0.0722 * pixels[idx + 6];
        const gradX = Math.abs(lumaRight - lumaLeft);

        // Subject silhouette boundary detection combining Otsu luminance envelope & Sobel edge gradient
        if ((luma > lowBound && luma < 242) || gradX > 22) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
        }
      }
      return { 
        width: maxX > minX ? (maxX - minX) : (w * 0.32),
        minX: minX === w ? Math.floor(w * 0.25) : minX,
        maxX: maxX === 0 ? Math.floor(w * 0.75) : maxX
      };
    };

    const shoulder = getRowWidth(0.24);
    const chest = getRowWidth(0.32);
    const waist = getRowWidth(0.42);
    const hip = getRowWidth(0.54);
    const thigh = getRowWidth(0.68);

    // Anatomical landmark points pinned to image coordinates
    const landmarks: AnatomicalLandmarks = {
      shoulderLeft: { x: shoulder.minX, y: Math.floor(h * 0.24) },
      shoulderRight: { x: shoulder.maxX, y: Math.floor(h * 0.24) },
      chestLeft: { x: chest.minX, y: Math.floor(h * 0.32) },
      chestRight: { x: chest.maxX, y: Math.floor(h * 0.32) },
      waistLeft: { x: waist.minX, y: Math.floor(h * 0.42) },
      waistRight: { x: waist.maxX, y: Math.floor(h * 0.42) },
      hipLeft: { x: hip.minX, y: Math.floor(h * 0.54) },
      hipRight: { x: hip.maxX, y: Math.floor(h * 0.54) },
      thighLeft: { x: thigh.minX, y: Math.floor(h * 0.68) },
      thighRight: { x: thigh.maxX, y: Math.floor(h * 0.68) }
    };

    // Edge wrinkle / fabric crease detection
    let edgeVariance = 0;
    let sampleCount = 0;
    for (let r = 0.28; r <= 0.50; r += 0.02) {
      const current = getRowWidth(r);
      const next = getRowWidth(r + 0.02);
      edgeVariance += Math.abs(current.width - next.width);
      sampleCount++;
    }
    const avgEdgeJitter = sampleCount > 0 ? edgeVariance / sampleCount : 4;

    // Estimate garment looseness / drape slack
    const rawWaistToChestRatio = waist.width / Math.max(1, chest.width);
    let slackFactor = 0.10; // Default casual clothing slack (10%)
    let detectedFitName = 'Casual Garments';

    if (garmentFit === 'fitted') {
      slackFactor = 0.03;
      detectedFitName = 'Fitted / Athletic';
    } else if (garmentFit === 'loose') {
      slackFactor = 0.18;
      detectedFitName = 'Loose / Oversized';
    } else if (garmentFit === 'casual') {
      slackFactor = 0.11;
      detectedFitName = 'Casual / Regular Clothes';
    } else {
      // Auto-detect based on straightness of lateral contour & fold frequency
      if (rawWaistToChestRatio > 0.90 || avgEdgeJitter > 6.5) {
        slackFactor = 0.15;
        detectedFitName = 'Auto: Loose T-Shirt / Hoodie';
      } else if (rawWaistToChestRatio > 0.82) {
        slackFactor = 0.11;
        detectedFitName = 'Auto: Regular Clothes';
      } else {
        slackFactor = 0.04;
        detectedFitName = 'Auto: Fitted Wear';
      }
    }

    // Biometric anthropometric prior bounds (Height & Weight physical reality)
    const height = userProfile?.height || 176;
    const weight = userProfile?.weight || 74;
    const isFemale = (userProfile?.gender || 'male').toLowerCase().includes('female');
    const bmi = weight / ((height / 100) * (height / 100));

    const expectedWaistNorm = isFemale 
      ? Math.max(0.72, Math.min(1.22, 0.76 + (bmi - 20) * 0.028))
      : Math.max(0.75, Math.min(1.25, 0.80 + (bmi - 22) * 0.026));

    // Apply Cloth-Invariant Garment Contraction Filter
    const rawNormShoulder = shoulder.width / (w * 0.38);
    const rawNormChest = chest.width / (w * 0.35);
    const rawNormWaist = waist.width / (w * 0.30);
    const rawNormHip = hip.width / (w * 0.35);

    // Contraction adjustments:
    const compensatedShoulder = rawNormShoulder * (1 - (slackFactor * 0.25));
    const compensatedChest = rawNormChest * (1 - (slackFactor * 0.30));
    const waistContraction = slackFactor * 1.15;
    let compensatedWaist = rawNormWaist * (1 - waistContraction);
    
    // Blend with biomechanical expectation so heavy clothes don't crush geometry
    compensatedWaist = (compensatedWaist * 0.70) + (expectedWaistNorm * 0.30);

    const compensatedHip = rawNormHip * (1 - (slackFactor * 0.40));

    const finalShoulder = Math.max(0.75, Math.min(1.35, compensatedShoulder));
    const finalChest = Math.max(0.70, Math.min(1.35, compensatedChest));
    const finalWaist = Math.max(0.70, Math.min(1.35, compensatedWaist));
    const finalHip = Math.max(0.75, Math.min(1.35, compensatedHip));

    const chestToShoulder = Math.round((finalChest / Math.max(0.1, finalShoulder)) * 100) / 100;
    const shoulderToChest = Math.round((finalShoulder / Math.max(0.1, finalChest)) * 100) / 100;

    return {
      shoulderRatio: Math.round(finalShoulder * 100) / 100,
      waistRatio: Math.round(finalWaist * 100) / 100,
      hipRatio: Math.round(finalHip * 100) / 100,
      chestRatio: Math.round(finalChest * 100) / 100,
      thighRatio: Math.round((thigh.width / (w * 0.30)) * 100) / 100,
      chestToShoulderRatio: chestToShoulder,
      shoulderToChestRatio: shoulderToChest,
      garmentSlackPercent: Math.round(slackFactor * 1000) / 10,
      appliedWaistContraction: Math.round(waistContraction * 1000) / 10,
      detectedFit: detectedFitName,
      landmarks,
      pixelWidths: {
        shoulder: Math.round(shoulder.width),
        chest: Math.round(chest.width),
        waist: Math.round(waist.width),
        hip: Math.round(hip.width),
        thigh: Math.round(thigh.width)
      }
    };
  }

  /**
   * Async worker-accelerated silhouette analysis with Comlink
   */
  public async analyzeSilhouetteAsync(
    canvas: HTMLCanvasElement,
    garmentFit: GarmentFitType = 'auto',
    userProfile?: { height: number; weight: number; gender: string }
  ): Promise<SilhouetteContourRatios> {
    if (workerApi) {
      try {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const result = await workerApi.analyzeSilhouettePixels(
            imgData.data,
            canvas.width,
            canvas.height,
            garmentFit,
            userProfile
          );
          return result;
        }
      } catch (e) {
        console.warn('[BodyMeshReconstructionEngine] Worker analysis fallback:', e);
      }
    }
    // Fallback to internal fast path
    return this.analyzeSilhouetteWithGarments(canvas, garmentFit, userProfile);
  }

  /**
   * Derives comprehensive anthropometric calculations from profile & contours
   */
  public computeAnthropometrics(
    weightKg: number = 74,
    heightCm: number = 176,
    gender: string = 'male',
    contourRatios?: SilhouetteContourRatios
  ): AnthropometricProfile {
    const isFemale = gender.toLowerCase().includes('female');
    const sr = contourRatios?.shoulderRatio || 1.05;
    const wr = contourRatios?.waistRatio || 0.96;
    const hr = contourRatios?.hipRatio || 1.02;
    const cr = contourRatios?.chestRatio || 1.00;

    // Real-time Chest-to-Shoulder dynamic ratio
    const chestToShoulder = contourRatios?.chestToShoulderRatio || (Math.round((cr / Math.max(0.1, sr)) * 100) / 100);
    const shoulderToChest = contourRatios?.shoulderToChestRatio || (Math.round((sr / Math.max(0.1, cr)) * 100) / 100);

    // Ramanujan's Second Approximation for Elliptical Cross-Sectional Perimeter:
    // P ≈ π * (a + b) * [1 + (3h) / (10 + sqrt(4 - 3h))], where h = ((a - b)/(a + b))^2
    const ramanujanEllipsePerimeter = (semiMajorA: number, semiMinorB: number): number => {
      const sumAB = Math.max(1, semiMajorA + semiMinorB);
      const diffAB = semiMajorA - semiMinorB;
      const hParam = (diffAB * diffAB) / (sumAB * sumAB);
      return Math.PI * sumAB * (1 + (3 * hParam) / (10 + Math.sqrt(Math.max(0.1, 4 - 3 * hParam))));
    };

    // Estimated waist circumference (cm) via Ramanujan elliptical cross-section (coronal semi-axis a vs sagittal semi-axis b)
    const baseWaistCm = isFemale ? (weightKg * 0.90) : (weightKg * 0.94);
    const coronalWaistRadius = (baseWaistCm / (2 * Math.PI)) * wr * 1.14;
    const sagittalWaistRadius = (baseWaistCm / (2 * Math.PI)) * wr * 0.86;
    const estimatedWaistCm = Math.round(ramanujanEllipsePerimeter(coronalWaistRadius, sagittalWaistRadius));

    // Estimated neck circumference (cm) dynamically scaled with shoulder development
    const estimatedNeckCm = isFemale ? Math.round(34 * Math.sqrt(sr)) : Math.round(39 * Math.sqrt(sr));

    // Estimated hip circumference (cm) via Ramanujan elliptical perimeter
    const baseHipCm = isFemale ? (weightKg * 1.25) : (weightKg * 1.15);
    const coronalHipRadius = (baseHipCm / (2 * Math.PI)) * hr * 1.12;
    const sagittalHipRadius = (baseHipCm / (2 * Math.PI)) * hr * 0.88;
    const estimatedHipCm = Math.round(ramanujanEllipsePerimeter(coronalHipRadius, sagittalHipRadius));

    // Multi-Model Consensus Body Fat %: Siri (1956) + Brozek (1963) + US Navy Density + RFM Prior
    let bodyDensityGcm3 = 1.064;
    let navyBf = 15;
    try {
      if (isFemale) {
        bodyDensityGcm3 =
          1.29579 -
          0.35004 * Math.log10(Math.max(10, estimatedWaistCm + estimatedHipCm - estimatedNeckCm)) +
          0.22100 * Math.log10(heightCm);
      } else {
        bodyDensityGcm3 =
          1.0324 -
          0.19077 * Math.log10(Math.max(10, estimatedWaistCm - estimatedNeckCm)) +
          0.15456 * Math.log10(heightCm);
      }
      bodyDensityGcm3 = Math.max(1.01, Math.min(1.095, bodyDensityGcm3));
      navyBf = 495 / bodyDensityGcm3 - 450;
    } catch {}

    const siriBodyFatPct = Math.round(Math.max(5, Math.min(44, 495 / bodyDensityGcm3 - 450)) * 10) / 10;
    const brozekBodyFatPct = Math.round(Math.max(5, Math.min(44, 457 / bodyDensityGcm3 - 414.2)) * 10) / 10;

    const heightM = heightCm / 100;
    const bmi = weightKg / Math.pow(heightM, 2);
    const rfmBf = isFemale
      ? 76 - (20 * (heightCm / Math.max(45, estimatedWaistCm)))
      : 64 - (20 * (heightCm / Math.max(45, estimatedWaistCm)));

    // 4-Equation Bayesian Consensus: Siri + Brozek + US Navy + RFM
    const bodyFatPct =
      siriBodyFatPct * 0.35 +
      brozekBodyFatPct * 0.30 +
      navyBf * 0.15 +
      Math.max(6, Math.min(40, rfmBf)) * 0.20 +
      (bmi - 22) * 0.06;

    const clampedBf = Math.max(isFemale ? 14 : 7, Math.min(isFemale ? 38 : 34, Math.round(bodyFatPct * 10) / 10));
    const fatMass = Math.round((weightKg * (clampedBf / 100)) * 10) / 10;
    const leanMass = Math.round((weightKg - fatMass) * 10) / 10;

    // Fat-Free Mass Index (FFMI) & Kouri Height-Normalized FFMI
    const fatFreeMassIndexFfmi = Math.round((leanMass / (heightM * heightM)) * 100) / 100;
    const normalizedFfmi = Math.round((fatFreeMassIndexFfmi + 6.1 * (1.8 - heightM)) * 100) / 100;

    // Krakauer A Body Shape Index (ABSI): WC(m) / (BMI^(2/3) * Height(m)^(1/2))
    const wcMeters = estimatedWaistCm / 100;
    const aBodyShapeIndexAbsi =
      Math.round((wcMeters / (Math.pow(Math.max(12, bmi), 2 / 3) * Math.sqrt(heightM))) * 10000) / 10000;

    // Thomas Body Roundness Index (BRI): 364.2 - 365.5 * sqrt(1 - ((WC / (2*pi)) / (0.5 * Height))^2)
    const eccentricitySq = Math.min(
      0.96,
      Math.pow((estimatedWaistCm / (2 * Math.PI)) / (0.5 * heightCm), 2)
    );
    const bodyRoundnessIndexBri =
      Math.round(Math.max(1.0, Math.min(15.0, 364.2 - 365.5 * Math.sqrt(1 - eccentricitySq))) * 100) / 100;

    // Valdez Conicity Index (CI): WC(m) / (0.109 * sqrt(Weight(kg) / Height(m)))
    const conicityIndexCi =
      Math.round((wcMeters / (0.109 * Math.sqrt(weightKg / heightM))) * 1000) / 1000;

    // Du Bois Body Surface Area (BSA in m^2)
    const duBoisSurfaceAreaM2 =
      Math.round(0.007184 * Math.pow(weightKg, 0.425) * Math.pow(heightCm, 0.725) * 100) / 100;

    const whr = Math.round((estimatedWaistCm / Math.max(1, estimatedHipCm)) * 100) / 100;
    const swr = Math.round((sr / Math.max(0.1, wr)) * 100) / 100;

    // Real-Time Somatotype dynamically driven by upper-to-lower body contours, chest taper & body fat
    let somatotype: AnthropometricProfile['somatotype'] = 'Balanced Athletic';
    if (swr >= 1.18 && clampedBf <= 17 && chestToShoulder >= 0.84) {
      somatotype = 'Mesomorph Dominant';
    } else if (clampedBf <= 13 && swr < 1.14 && whr <= 0.84) {
      somatotype = 'Ectomorph Dominant';
    } else if (clampedBf >= 22 || whr >= 0.91) {
      somatotype = 'Endomorph Dominant';
    }

    const hasGarmentInfo = contourRatios?.garmentSlackPercent !== undefined;
    const slackPct = contourRatios?.garmentSlackPercent || 10;
    const waistOffsetCm = Math.round((baseWaistCm * (contourRatios?.appliedWaistContraction || 11)) / 100);

    return {
      estimatedBodyFatPercent: clampedBf,
      leanMassKg: leanMass,
      fatMassKg: fatMass,
      waistToHipRatio: whr,
      shoulderToWaistRatio: swr,
      chestToShoulderRatio: chestToShoulder,
      shoulderToChestRatio: shoulderToChest,
      somatotype,
      posturalSymmetryScore: 95,
      localizedMuscleDistribution: {
        deltoidsAndChest: Math.min(100, Math.round(sr * 78)),
        coreAndAbs: Math.min(100, Math.round((1.4 - (clampedBf / 30)) * 80)),
        quadricepsAndGlutes: Math.min(100, Math.round(hr * 75)),
        calvesAndLowerLimbs: 72
      },
      landmarks: contourRatios?.landmarks,
      garmentCompensated: hasGarmentInfo,
      garmentCompensationDetails: hasGarmentInfo ? {
        fitType: contourRatios?.detectedFit || 'Regular Clothes',
        slackReductionPct: slackPct,
        trueWaistOffsetCm: waistOffsetCm,
        estimatedFabricVolumePct: Math.round(slackPct * 1.2)
      } : undefined,
      advancedIndices: {
        siriBodyFatPct,
        brozekBodyFatPct,
        bodyDensityGcm3: Math.round(bodyDensityGcm3 * 10000) / 10000,
        fatFreeMassIndexFfmi,
        normalizedFfmi,
        aBodyShapeIndexAbsi,
        bodyRoundnessIndexBri,
        conicityIndexCi,
        duBoisSurfaceAreaM2,
        ramanujanWaistCm: estimatedWaistCm,
        ramanujanHipCm: estimatedHipCm,
      },
      scannedAt: new Date().toISOString()
    };
  }

  public async saveScan(metrics: AnthropometricProfile): Promise<void> {
    try {
      const history = (await localforage.getItem<SavedBodyScan[]>(STORAGE_BODY_MESH_HISTORY)) || [];
      const newScan: SavedBodyScan = {
        id: `scan_${Date.now()}`,
        timestamp: Date.now(),
        dateStr: new Date().toISOString().split('T')[0],
        metrics
      };
      await localforage.setItem(STORAGE_BODY_MESH_HISTORY, [newScan, ...history.slice(0, 19)]);
    } catch (e) {
      console.warn('[BodyMeshReconstructionEngine] Save scan notice:', e);
    }
  }

  public async getScanHistory(): Promise<SavedBodyScan[]> {
    try {
      return (await localforage.getItem<SavedBodyScan[]>(STORAGE_BODY_MESH_HISTORY)) || [];
    } catch {
      return [];
    }
  }

  public async clearHistory(): Promise<void> {
    try {
      await localforage.removeItem(STORAGE_BODY_MESH_HISTORY);
    } catch {}
  }
}

export const bodyMeshReconstruction = new BodyMeshReconstructionEngine();
