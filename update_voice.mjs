import fs from 'fs';
let content = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');

const oldFunc = `  const handleVoiceSearch = useCallback(async () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setQuery("Voice search is not supported in your browser.");
       setTimeout(() => setQuery(""), 2500);
       return;
    }
    
    if (isListening) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
    } catch (err) {
        console.warn("Microphone permission blocked by browser or user.", err);
        setQuery("Microphone permission blocked.");
        setTimeout(() => setQuery(""), 2500);
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
       setIsListening(true);
       setIsOpen(true);
    };

    recognition.onresult = (event: any) => {
       const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
       setQuery(transcript);
    };

    recognition.onerror = (event: any) => {
       if (event.error === 'not-allowed') {
           console.warn("Microphone permission blocked by browser or user.");
           setQuery("Microphone permission blocked.");
           setTimeout(() => setQuery(""), 2500);
       } else {
           console.error("Speech recognition error:", event.error);
       }
       setIsListening(false);
    };

    recognition.onend = () => {
       setIsListening(false);
       if (inputRef.current) inputRef.current.focus();
    };

    recognition.start();
  }, []);`;

const newFunc = `  const recognitionRef = useRef<any>(null);

  const handleVoiceSearch = useCallback(async () => {
    if (isListening && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
        return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setQuery("Voice search is not supported in your browser.");
       setTimeout(() => setQuery(""), 2500);
       return;
    }
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
    } catch (err) {
        console.warn("Microphone permission blocked by browser or user.", err);
        setQuery("Microphone permission blocked.");
        setTimeout(() => setQuery(""), 2500);
        return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => {
       setIsListening(true);
       setIsOpen(true);
    };

    recognition.onresult = (event: any) => {
       const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
       setQuery(transcript);

       // Check if this is the final transcript
       const isFinal = event.results[event.results.length - 1].isFinal;
       if (isFinal) {
           recognition.stop();
           setIsListening(false);
           // Search triggers automatically via debouncedQuery effect
           // Optionally we can programmatically submit if there's a dedicated search trigger
       }
    };

    recognition.onerror = (event: any) => {
       if (event.error === 'not-allowed') {
           console.warn("Microphone permission blocked by browser or user.");
           setQuery("Microphone permission blocked.");
           setTimeout(() => setQuery(""), 2500);
       } else if (event.error === 'no-speech') {
           setQuery("No speech detected.");
           setTimeout(() => setQuery(""), 2500);
       } else {
           console.error("Speech recognition error:", event.error);
       }
       setIsListening(false);
    };

    recognition.onend = () => {
       setIsListening(false);
       if (inputRef.current) inputRef.current.focus();
    };

    recognition.start();
  }, [isListening]);`;

content = content.replace(oldFunc, newFunc);
fs.writeFileSync('src/components/GlobalSearch.tsx', content);
