import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const oldHandlePin = `  const handlePinComplete = (enteredPin: string) => {
    if (profile && profile.pin === enteredPin) {
      // Immediate screen swap to trigger Suspense instantly
      setScreen('DASHBOARD');
      setPinError('');
    } else {
      setPinError('Incorrect PIN');
    }
  };`;

const newHandlePin = `  const handlePinComplete = (enteredPin: string) => {
    if (enteredPin === 'BIOMETRIC_SUCCESS' || (profile && profile.pin === enteredPin)) {
      // Immediate screen swap to trigger Suspense instantly
      setScreen('DASHBOARD');
      setPinError('');
    } else {
      setPinError('Incorrect PIN');
    }
  };`;

content = content.replace(oldHandlePin, newHandlePin);
// Minified fallback:
const altOldHandlePin = `  const handlePinComplete = (enteredPin: string) => {    if (profile && profile.pin === enteredPin) {      // Immediate screen swap to trigger Suspense instantly      setScreen('DASHBOARD');      setPinError('');    } else {      setPinError('Incorrect PIN');    }  };`;
content = content.replace(altOldHandlePin, newHandlePin);

fs.writeFileSync('src/App.tsx', content);
