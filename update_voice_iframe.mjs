import fs from 'fs';
let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

const regex = /    recognition\.onerror = \(event: any\) => \{[\s\S]*?setIsListening\(false\);\n    \};/;

const newFunc = `    recognition.onerror = (event: any) => {
       if (event.error === 'not-allowed') {
           const isIframe = window.self !== window.top;
           if (isIframe) {
               console.warn("Speech recognition blocked in iframe. Please open in a new tab.");
               setQuery("Blocked in preview. Open app in a new tab to use Voice.");
           } else {
               console.warn("Microphone permission blocked by browser or user.");
               setQuery("Microphone permission blocked.");
           }
           setTimeout(() => setQuery(""), 3500);
       } else if (event.error === 'no-speech') {
           setQuery("No speech detected.");
           setTimeout(() => setQuery(""), 2500);
       } else {
           console.error("Speech recognition error:", event.error);
       }
       setIsListening(false);
    };`;

content = content.replace(regex, newFunc);
fs.writeFileSync('src/components/GlobalSearch.tsx', content);
