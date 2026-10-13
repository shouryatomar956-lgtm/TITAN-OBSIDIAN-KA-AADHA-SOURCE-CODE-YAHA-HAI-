import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Update checkAuth for instant transition
const oldCheckAuth = `  const checkAuth = async (initialBoot: boolean = false) => {
    const p = await storage.getUserProfile();
    startTransition(() => {
      if (p && p.pin) {
        setProfile(p);
        if (initialBoot) {
          setScreen('PIN_GUARD');
        } else {
          setScreen('ANALYZING');
        }
      } else {
        setScreen('ONBOARDING');
      }
    });
  };`;

const newCheckAuth = `  const checkAuth = async (initialBoot: boolean = false) => {
    const p = await storage.getUserProfile();
    // Instant fallback without transition lag
    if (p && p.pin) {
      setProfile(p);
      if (initialBoot) {
        setScreen('PIN_GUARD');
      } else {
        setScreen('ANALYZING');
      }
    } else {
      setScreen('ONBOARDING');
    }
  };`;
content = content.replace(oldCheckAuth, newCheckAuth);

// Update handlePinComplete for instant transition
const oldHandlePinComplete = `  const handlePinComplete = (enteredPin: string) => {
    if (profile && profile.pin === enteredPin) {
      startTransition(() => {
        setScreen('DASHBOARD');
        setPinError('');
      });
    } else {
      setPinError('Incorrect PIN');
    }
  };`;

const newHandlePinComplete = `  const handlePinComplete = (enteredPin: string) => {
    if (profile && profile.pin === enteredPin) {
      // Immediate screen swap to trigger Suspense instantly
      setScreen('DASHBOARD');
      setPinError('');
    } else {
      setPinError('Incorrect PIN');
    }
  };`;
content = content.replace(oldHandlePinComplete, newHandlePinComplete);

const oldHandleAnalysisComplete = `const handleAnalysisComplete = async () => {
    startTransition(() => {
      setScreen('DASHBOARD');
    });
  };`;
  
const newHandleAnalysisComplete = `const handleAnalysisComplete = async () => {
    setScreen('DASHBOARD');
  };`;
content = content.replace(oldHandleAnalysisComplete, newHandleAnalysisComplete);

fs.writeFileSync('src/App.tsx', content);
