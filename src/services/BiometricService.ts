import {
  zkBiometricEnclave,
  BiometricTelemetryReport,
  EnrolledBiometricEnclaveRecord,
  TouchBiometricSample,
} from './zeroKnowledgeBiometricEnclave';

export interface BiometricResult {
  success: boolean;
  error?: string;
  requiresTouchEnrollmentFallback?: boolean;
  telemetry?: BiometricTelemetryReport;
}

export class BiometricService {
  static async isSupported(): Promise<boolean> {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      return true;
    }
    return false;
  }

  static async auditHardwareAndGenerateNonce() {
    return await zkBiometricEnclave.auditHardwareAndGenerateNonce();
  }

  static hasEnrolledBiometricSync(): boolean {
    return zkBiometricEnclave.hasEnrolledBiometricSync();
  }

  static async isHardwarePasskeyAvailable(): Promise<boolean> {
    return await zkBiometricEnclave.isWebAuthnPlatformSupported();
  }

  static async hasEnrolledBiometric(): Promise<boolean> {
    return await zkBiometricEnclave.hasEnrolledBiometric();
  }

  static async getEnclaveRecord(): Promise<EnrolledBiometricEnclaveRecord | null> {
    return await zkBiometricEnclave.getBiometricEnclave();
  }

  static async removeEnrolledBiometric(): Promise<void> {
    await zkBiometricEnclave.clearBiometricEnclave();
  }

  static async enrollHardwareBiometric(
    onStage?: (stage: BiometricTelemetryReport['stage']) => void
  ): Promise<BiometricResult> {
    return await zkBiometricEnclave.enrollHardwareWebAuthn(onStage);
  }

  static executeHardwareSensorPhase1AuditSync() {
    return zkBiometricEnclave.executeHardwareSensorPhase1AuditSync();
  }

  static async executeHardwareSensorPhase1Audit() {
    return await zkBiometricEnclave.executeHardwareSensorPhase1Audit();
  }

  static async executeHardwareSensorPhase2Touch(challengeBytes?: Uint8Array) {
    return await zkBiometricEnclave.executeHardwareSensorPhase2Touch(challengeBytes);
  }

  static async executeHardwareSensorPhase3Pinning(
    pendingRecord: EnrolledBiometricEnclaveRecord,
    requireConfirmTouch = false
  ): Promise<BiometricResult> {
    return await zkBiometricEnclave.executeHardwareSensorPhase3Pinning(
      pendingRecord,
      requireConfirmTouch
    );
  }

  static async enrollTouchBiometric(samples: TouchBiometricSample[]): Promise<BiometricResult> {
    return await zkBiometricEnclave.enrollTouchBiometricTemplate(samples);
  }

  static async verifyTouchBiometric(sample: TouchBiometricSample): Promise<BiometricResult> {
    const enclave = await zkBiometricEnclave.getBiometricEnclave();
    if (!enclave) {
      return {
        success: false,
        error: 'Fingerprint not set up yet.',
      };
    }
    return await zkBiometricEnclave.verifyTouchBiometricSample(enclave, sample);
  }

  static async authenticate(
    onStage?: (stage: BiometricTelemetryReport['stage']) => void,
    preloadedEnclave?: EnrolledBiometricEnclaveRecord | null
  ): Promise<BiometricResult> {
    const existingEnclave = preloadedEnclave || (await zkBiometricEnclave.getBiometricEnclave());
    if (!existingEnclave) {
      return await zkBiometricEnclave.enrollHardwareWebAuthn(onStage);
    }

    // Always invoke the phone's physical hardware fingerprint sensor via WebAuthn Level 3 / FIDO2
    return await zkBiometricEnclave.verifyHardwareWebAuthn(existingEnclave, onStage);
  }
}
