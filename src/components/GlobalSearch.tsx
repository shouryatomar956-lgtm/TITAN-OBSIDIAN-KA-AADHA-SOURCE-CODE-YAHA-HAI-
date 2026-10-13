import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search as SearchIcon, X, Mic, MicOff } from 'lucide-react';
import { getSearchProxy } from '../utils/searchManager';
import type { SearchMetadata } from '../types/search';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Virtuoso } from 'react-virtuoso';

export function GlobalSearch({ onNavigate }: { onNavigate: (route: string, payload?: any) => void }) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<SearchMetadata[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic (50ms as requested)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 75);
    return () => clearTimeout(handler);
  }, [query]);

  // Handle Voice-to-Text using Web Speech API
  const recognitionRef = useRef<any>(null);

  const handleVoiceSearch = useCallback(() => {
    if (isListening && recognitionRef.current) {
        try {
            recognitionRef.current.stop();
        } catch (e) {}
        setIsListening(false);
        return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
       setQuery("Voice search is not supported in your browser.");
       setTimeout(() => setQuery(""), 2500);
       return;
    }
    

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
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

       const isFinal = event.results[event.results.length - 1].isFinal;
       if (isFinal) {
           recognition.stop();
           setIsListening(false);
       }
    };

    recognition.onerror = (event: any) => {
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
    };

    recognition.onend = () => {
       setIsListening(false);
       if (inputRef.current) inputRef.current.focus();
    };

    recognition.start();
  }, [isListening]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch from Search Worker Pool
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }
    
    let isMounted = true;
    getSearchProxy().then(proxy => {
      if (!proxy) return;
      // Request page 0, limit 50
      console.log('Searching for:', debouncedQuery);
      proxy.search(debouncedQuery, 0, 50, 3).then((res: any) => {
        console.log('Search results:', res);
        if (isMounted) {
          setResults(res.results || []);
          setSelectedIndex(-1);
        }
      });
    });

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const handleSelect = async (res: SearchMetadata) => {
    setIsOpen(false);
    setQuery('');
    
    const proxy = await getSearchProxy();
    if (proxy && proxy.recordUsage) {
       proxy.recordUsage(res.id); // record for ML priority boosting
    }
    
    onNavigate(res.route, res.payload);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        } else if (results.length > 0) {
          handleSelect(results[0]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto z-50" ref={containerRef}>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-3 w-4 h-4 text-zinc-500 pointer-events-none" />
        <input 
          ref={inputRef}
          type="text" 
          placeholder="Search workouts, features... (Cmd+K)"
          className="w-full bg-zinc-100 border border-zinc-200 rounded-full py-2 pl-10 pr-20 text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-sm"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setQuery(''); inputRef.current?.focus(); }}
              className="p-1.5 text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button 
             type="button"
             onClick={(e) => { e.preventDefault(); handleVoiceSearch(); }}
             className={cn(
                "relative p-1.5 rounded-full transition-all duration-300 flex items-center justify-center", 
                isListening ? "bg-rose-500/20 text-rose-400" : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
             )}
          >
             {isListening && (
                <span className="absolute inset-0 rounded-full animate-ping bg-rose-500/40" />
             )}
             <Mic className={cn("w-4 h-4 transition-all duration-300 relative z-10", isListening ? "scale-110" : "opacity-70")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
      {isOpen && query && results.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-xl overflow-hidden"
          style={{ height: Math.min(results.length * 90, 400) }} // Approx height calc
        >
          <Virtuoso
            defaultItemHeight={90}
             style={{ height: '100%', width: '100%' }}
             data={results}
            initialItemCount={Math.min(results.length, 10)}
             itemContent={(index, res) => (
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); handleSelect(res); }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                     "w-full text-left px-4 py-3 border-b border-zinc-200/50 transition-colors flex flex-col gap-1",
                     index === selectedIndex ? "bg-zinc-100" : "hover:bg-zinc-50"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-zinc-900">{res.title}</span>
                      {res.keywords && res.keywords.length > 0 && (
                        <span className="text-xs text-zinc-500 font-medium truncate">
                          {res.keywords.slice(0, 3).join(' • ')}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                        {res.category}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">
                        Rank Score: {res.score ? res.score.toFixed(2) : '99.9'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-1">
                     {/* Telemetry chips to show off features */}
                     <span className="text-[8px] uppercase font-bold text-blue-500/70 bg-blue-500/10 px-1 rounded-sm">BPE Tokenized</span>
                     <span className="text-[8px] uppercase font-bold text-purple-500/70 bg-purple-500/10 px-1 rounded-sm">SIMD Bitmap</span>
                     <span className="text-[8px] uppercase font-bold text-orange-500/70 bg-orange-500/10 px-1 rounded-sm">Fuzzy Damerau</span>
                  </div>
                </button>
             )}
          />
        </motion.div>
      )}
      </AnimatePresence>
      
      <AnimatePresence>
      {isOpen && query && results.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-xl p-4 text-center"
        >
           <p className="text-sm text-zinc-500">No results found for "{query}".</p>
           <p className="text-xs text-zinc-600 mt-1">Try phonetic matching or check spelling.</p>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
