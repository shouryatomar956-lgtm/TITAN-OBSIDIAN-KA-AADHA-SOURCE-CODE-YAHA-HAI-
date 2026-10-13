import fs from 'fs';
let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

const oldFunc = `  const handleVoiceSearch = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setQuery("Voice search is not supported in your browser.");
       setTimeout(() => setQuery(""), 2500);
       return;
    }
    
    if (isListening) return;

    const recognition = new SpeechRecognition();`;

const newFunc = `  const handleVoiceSearch = useCallback(async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setQuery("Voice search is not supported in your browser.");
       setTimeout(() => setQuery(""), 2500);
       return;
    }
    
    if (isListening) return;

    try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err) {
        console.warn("Microphone permission blocked by browser or user.", err);
        setQuery("Microphone permission blocked.");
        setTimeout(() => setQuery(""), 2500);
        return;
    }

    const recognition = new SpeechRecognition();`;

content = content.replace(oldFunc, newFunc);
fs.writeFileSync('src/components/GlobalSearch.tsx', content);
