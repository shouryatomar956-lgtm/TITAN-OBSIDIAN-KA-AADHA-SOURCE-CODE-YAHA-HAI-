import fs from 'fs';
let content = fs.readFileSync('src/components/PinPad.tsx', 'utf8');

const newImports = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Lock, Fingerprint, ScanFace, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { BiometricService } from '../services/BiometricService';
`;

content = content.replace("import { useState, useEffect } from 'react';\nimport { motion, AnimatePresence } from 'motion/react';\nimport { Delete, Lock, Fingerprint, ScanFace, X } from 'lucide-react';\nimport { cn } from '../lib/utils';", newImports);


const oldLogicStart = `  useEffect(() => {
    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(available => {
          setHasBiometricSupport(available);
        })
        .catch(() => {
          setHasBiometricSupport(false);
        });
    }
  }, []);

  const handleBiometricAuth = async (type: 'fingerprint' | 'face') => {
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
          
          onComplete('BIOMETRIC_SUCCESS');
        }
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
          onComplete('BIOMETRIC_SUCCESS');
        }
      }
    } catch (err: any) {
      console.error("Biometric auth failed:", err);
      if (clearError) clearError();
      // Browser handles its own rejection UI, but we can alert just in case
      // alert(\`Biometric authentication failed.\`);
    }
  };`;

const newLogicStart = `  useEffect(() => {
    BiometricService.isSupported().then(setHasBiometricSupport);
  }, []);

  const handleBiometricAuth = async (type: 'fingerprint' | 'face') => {
    if (clearError) clearError();
    const success = await BiometricService.authenticate();
    if (success) {
      onComplete('BIOMETRIC_SUCCESS');
    }
  };`;

content = content.replace(oldLogicStart, newLogicStart);

fs.writeFileSync('src/components/PinPad.tsx', content);
