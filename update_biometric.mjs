import fs from 'fs';
let content = fs.readFileSync('src/services/BiometricService.ts', 'utf8');

const newLogic = `
export interface BiometricResult {
  success: boolean;
  error?: string;
}

export class BiometricService {
  static async isSupported(): Promise<boolean> {
    if (window.PublicKeyCredential) {
      try {
        return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  static async authenticate(): Promise<BiometricResult> {
    try {
      const storedCredId = localStorage.getItem('pulsefit_biometric_id');
      
      if (!storedCredId) {
        // Register (create)
        const challenge = window.crypto.getRandomValues(new Uint8Array(32));
        const userId = window.crypto.getRandomValues(new Uint8Array(16));
        
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge,
            rp: {
              name: "PulseFit PWA"
            },
            user: {
              id: userId,
              name: "PulseFit Athlete",
              displayName: "PulseFit Athlete"
            },
            pubKeyCredParams: [
              { type: "public-key", alg: -7 },
              { type: "public-key", alg: -257 }
            ],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required"
            },
            timeout: 60000,
            attestation: "none"
          }
        }) as PublicKeyCredential;

        if (credential) {
          const credIdBuffer = credential.rawId;
          const credIdArray = new Uint8Array(credIdBuffer);
          const base64id = btoa(String.fromCharCode.apply(null, Array.from(credIdArray)));
          localStorage.setItem('pulsefit_biometric_id', base64id);
          return { success: true };
        }
        return { success: false, error: "Authentication failed" };
      } else {
        // Verify (get)
        const challenge = window.crypto.getRandomValues(new Uint8Array(32));
        const binaryString = atob(storedCredId);
        const credIdArray = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            credIdArray[i] = binaryString.charCodeAt(i);
        }

        const assertion = await navigator.credentials.get({
          publicKey: {
            challenge,
            allowCredentials: [{
              id: credIdArray.buffer,
              type: "public-key",
              transports: ["internal"]
            }],
            userVerification: "required",
            timeout: 60000
          }
        });

        if (assertion) {
          return { success: true };
        }
        return { success: false, error: "Authentication failed" };
      }
    } catch (err: any) {
      console.error("Biometric auth failed:", err);
      let errorMessage = err.message || "An unknown error occurred.";
      if (errorMessage.includes("publickey-credentials-create") || errorMessage.includes("not enabled in this document")) {
          errorMessage = "Biometrics are blocked inside this preview frame. Please open the app in a New Tab (icon at top right) to use Touch/Face ID.";
      } else if (errorMessage.includes("cancelled")) {
          errorMessage = "Biometric authentication cancelled.";
      }
      return { success: false, error: errorMessage };
    }
  }
}
`;

fs.writeFileSync('src/services/BiometricService.ts', newLogic);
