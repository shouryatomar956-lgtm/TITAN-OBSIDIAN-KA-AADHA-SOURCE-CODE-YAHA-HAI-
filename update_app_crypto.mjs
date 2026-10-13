import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf8');

const importCrypto = `import { hashData } from './utils/crypto';\nimport { Dashboard } from`;
content = content.replace(`import { Dashboard } from`, importCrypto);

const oldHandlePin = `  const handlePinComplete = (enteredPin: string) => {
    if (enteredPin === 'BIOMETRIC_SUCCESS' || (profile && profile.pin === enteredPin)) {
      setPinError('');
      setScreen('DASHBOARD');
    } else {
      setPinError('Incorrect PIN');
    }
  };`;

const newHandlePin = `  const handlePinComplete = async (enteredPin: string) => {
    if (enteredPin === 'BIOMETRIC_SUCCESS') {
      setPinError('');
      setScreen('DASHBOARD');
      return;
    }
    
    if (profile) {
      const hashedEntry = await hashData(enteredPin);
      // Fallback check for plain text PIN in case of legacy unhashed PINs
      if (profile.pin === enteredPin || profile.pin === hashedEntry) {
        setPinError('');
        setScreen('DASHBOARD');
        return;
      }
    }
    
    setPinError('Incorrect PIN');
  };`;

content = content.replace(oldHandlePin, newHandlePin);
fs.writeFileSync('src/App.tsx', content);
