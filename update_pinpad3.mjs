import fs from 'fs';
let content = fs.readFileSync('src/components/PinPad.tsx', 'utf8');

// We need to add local error state for biometric error if it's not present.
// Let's replace the top of the component to add a local state.

const oldImports = `export function PinPad({ title, subtitle, error, onComplete, forgotPinAction, clearError }: PinPadProps) {
  const [pin, setPin] = useState('');
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [hasBiometricSupport, setHasBiometricSupport] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);`;

const newImports = `export function PinPad({ title, subtitle, error, onComplete, forgotPinAction, clearError }: PinPadProps) {
  const [pin, setPin] = useState('');
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [hasBiometricSupport, setHasBiometricSupport] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);`;

content = content.replace(oldImports, newImports);

const oldAuth = `  const handleBiometricAuth = async (type: 'fingerprint' | 'face') => {
    if (clearError) clearError();
    const success = await BiometricService.authenticate();
    if (success) {
      setIsBiometricEnabled(true);
      onComplete('BIOMETRIC_SUCCESS');
    } else {
      // If authentication failed or was cancelled during registration, we might want to alert or just silently fail.
    }
  };`;

const newAuth = `  const handleBiometricAuth = async (type: 'fingerprint' | 'face') => {
    if (clearError) clearError();
    setLocalError(null);
    const result = await BiometricService.authenticate();
    if (result.success) {
      setIsBiometricEnabled(true);
      onComplete('BIOMETRIC_SUCCESS');
    } else {
      if (result.error) {
         setLocalError(result.error);
      }
    }
  };`;

content = content.replace(oldAuth, newAuth);

// Display the localError alongside the prop error
const oldErrorDisplay = `      <div className="h-8 mb-4">
        {error && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 font-medium text-center"
          >
            {error}
          </motion.p>
        )}
      </div>`;

const newErrorDisplay = `      <div className="min-h-8 mb-4 flex justify-center px-4">
        <AnimatePresence mode="wait">
          {(error || localError) && (
            <motion.p 
              key={error || localError}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="text-red-400 font-medium text-center text-sm"
            >
              {error || localError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>`;

content = content.replace(oldErrorDisplay, newErrorDisplay);

// Also reset localError on press
const oldHandlePress = `  const handlePress = (val: string) => {
    if (clearError) clearError();
    if (pin.length < 4) {
      setPin(prev => prev + val);
    }
  };`;
const newHandlePress = `  const handlePress = (val: string) => {
    if (clearError) clearError();
    setLocalError(null);
    if (pin.length < 4) {
      setPin(prev => prev + val);
    }
  };`;
content = content.replace(oldHandlePress, newHandlePress);

const oldHandleBackspace = `  const handleBackspace = () => {
    if (clearError) clearError();
    setPin(prev => prev.slice(0, -1));
  };`;
const newHandleBackspace = `  const handleBackspace = () => {
    if (clearError) clearError();
    setLocalError(null);
    setPin(prev => prev.slice(0, -1));
  };`;
content = content.replace(oldHandleBackspace, newHandleBackspace);

fs.writeFileSync('src/components/PinPad.tsx', content);
