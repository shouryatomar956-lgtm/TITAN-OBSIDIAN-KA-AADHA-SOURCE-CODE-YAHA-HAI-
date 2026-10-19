/**
 * SOTA Biomechanics & Kinematics Service Bridge
 * 
 * Powered by Universal SOTA Combo:
 * - SMPLer-X / SMPLest-X (10,475-vertex volumetric 3D mesh)
 * - ViTPose++ (Vision Transformer Cross-Attention Occlusion Solver)
 * - RTMW (133 Whole-Body Keypoints with SimCC)
 * - WebGPU Hardware Acceleration Pipeline
 * - BLADE (CVPR 2025) Perspective Projection & Physics-Informed Kinematics
 */

export * from './sotaUniversalPoseEngine';

import {
  Point3D,
  JointAngles,
  FormCorrectionAlert,
  FormAlertSeverity,
  RTMW_133_LANDMARKS,
  SOTA_SKELETON_CONNECTIONS,
  SotaRepCounterFSM,
  calculateJointAngle,
  extractJointAngles,
  evaluateExerciseForm
} from './sotaUniversalPoseEngine';

// Aliases for seamless backwards compatibility
export const MP_LANDMARKS = {
  ...RTMW_133_LANDMARKS,
  // 33-point legacy index compatibility mappings
  LEFT_EYE_INNER: 1,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE_OUTER: 6,
  MOUTH_LEFT: 65,
  MOUTH_RIGHT: 66,
  LEFT_PINKY: 43,
  RIGHT_PINKY: 64,
  LEFT_INDEX: 31,
  RIGHT_INDEX: 52,
  LEFT_THUMB: 27,
  RIGHT_THUMB: 48,
  LEFT_FOOT_INDEX: 17,
  RIGHT_FOOT_INDEX: 20
} as const;

export const SKELETON_CONNECTIONS = SOTA_SKELETON_CONNECTIONS;

export interface MediaPipeExerciseState {
  currentPhase: 'START' | 'ECCENTRIC' | 'INFLECTION_PEAK' | 'CONCENTRIC' | 'COMPLETED';
  progressPercent: number;
  repCount: number;
  activeAngle: number;
  targetInflectionAngle: number;
  formStatus: FormCorrectionAlert;
}

export class MediaPipeRepCounterFSM extends SotaRepCounterFSM {}

export {
  calculateJointAngle,
  extractJointAngles,
  evaluateExerciseForm
};
