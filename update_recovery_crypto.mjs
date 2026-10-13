import fs from 'fs';
let content = fs.readFileSync('src/components/RecoveryChallenge.tsx', 'utf8');

const importCrypto = `import { BiometricService } from '../services/BiometricService';\nimport { hashData } from '../utils/crypto';`;
content = content.replace(`import { BiometricService } from '../services/BiometricService';`, importCrypto);

const oldVerifyPrevPin = `  const handleVerifyPreviousPin = () => {
      if (profile?.previousPin === prevPinInput && isWithin72Hours()) {
          setMode('RESET_PIN');
      } else {
          setError('Incorrect previous PIN or 72-hour window expired.');
      }
  };`;

const newVerifyPrevPin = `  const handleVerifyPreviousPin = async () => {
      if (profile?.previousPin && isWithin72Hours()) {
          const hashedInput = await hashData(prevPinInput);
          if (profile.previousPin === prevPinInput || profile.previousPin === hashedInput) {
              setMode('RESET_PIN');
              return;
          }
      }
      setError('Incorrect previous PIN or 72-hour window expired.');
  };`;

content = content.replace(oldVerifyPrevPin, newVerifyPrevPin);

fs.writeFileSync('src/components/RecoveryChallenge.tsx', content);
