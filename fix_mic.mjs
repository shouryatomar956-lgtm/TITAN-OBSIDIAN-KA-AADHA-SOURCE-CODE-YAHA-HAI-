import fs from 'fs';

let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

const oldMicCheck = `const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       alert("Speech recognition is not supported in this browser.");
       return;
    }`;

const newMicCheck = `const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setQuery("Voice search is not supported in your browser.");
       setTimeout(() => setQuery(""), 2500);
       return;
    }`;

content = content.replace(oldMicCheck, newMicCheck);

const oldMicError = `recognition.onerror = (event: any) => {
       console.error("Speech recognition error:", event.error);
       setIsListening(false);
    };`;
    
const newMicError = `recognition.onerror = (event: any) => {
       console.error("Speech recognition error:", event.error);
       if (event.error === 'not-allowed') {
           setQuery("Microphone permission blocked.");
           setTimeout(() => setQuery(""), 2500);
       }
       setIsListening(false);
    };`;

content = content.replace(oldMicError, newMicError);

fs.writeFileSync('src/components/GlobalSearch.tsx', content);
