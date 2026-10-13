import { MealType } from './CalorieStorageService';

export interface ParsedFoodItem {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  confidence: number;
}

export interface VoiceParseResult {
  transcript: string;
  hasCalories: boolean;
  errorMessage?: string;
  items: ParsedFoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  suggestedMealType: MealType;
}

/**
 * Hindi / English / Hinglish word-to-number dictionary for spoken amounts
 */
const NUMBER_WORDS: Record<string, number> = {
  'one': 1, 'ek': 1, 'a': 1,
  'two': 2, 'do': 2,
  'three': 3, 'teen': 3, 'tin': 3,
  'four': 4, 'char': 4, 'chaar': 4,
  'five': 5, 'paanch': 5, 'panch': 5,
  'six': 6, 'chhe': 6, 'che': 6,
  'seven': 7, 'saat': 7,
  'eight': 8, 'aath': 8,
  'nine': 9, 'nau': 9,
  'ten': 10, 'das': 10,
  'eleven': 11, 'gyarah': 11,
  'twelve': 12, 'barah': 12,
  'fifteen': 15, 'pandrah': 15,
  'twenty': 20, 'bees': 20,
  'twentyfive': 25, 'pachis': 25, 'pacchis': 25,
  'thirty': 30, 'tees': 30,
  'forty': 40, 'chalis': 40,
  'fifty': 50, 'pachas': 50,
  'sixty': 60, 'saath': 60,
  'seventy': 70, 'sattar': 70,
  'eighty': 80, 'assi': 80,
  'ninety': 90, 'nabbe': 90,
  'dedh': 1.5, 'dhai': 2.5, 'sawa': 1.25, 'sadhe': 0.5,
  'hundred': 100, 'sau': 100, 'so': 100,
  'thousand': 1000, 'hazaar': 1000
};

export class VoiceParser {
  private activeRecognition: any = null;
  private silenceTimer: any = null;

  /**
   * Check if browser has native Web Speech API support
   */
  public getIsSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return Boolean(
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition
    );
  }

  /**
   * Starts real listening via Web Speech API with live interim transcript streaming
   */
  public startListening(
    onResult: (result: VoiceParseResult, isFinal: boolean, liveTranscript: string) => void,
    onError: (error: string) => void,
    onEnd: () => void,
    options?: { language?: string }
  ): () => void {
    if (typeof window === 'undefined') {
      onError('Audio is not supported in this environment.');
      onEnd();
      return () => {};
    }

    const SpeechRecognitionClass = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      onError('Web Speech API is not supported in this browser. Please use Chrome, Edge, or Safari.');
      onEnd();
      return () => {};
    }

    // Stop any existing session cleanly
    this.stopListening();

    let recognition: any = null;
    try {
      recognition = new SpeechRecognitionClass();
    } catch (e: any) {
      onError(`Failed to initialize Speech Recognition: ${e?.message || 'Unknown error'}`);
      onEnd();
      return () => {};
    }

    this.activeRecognition = recognition;

    // Configure for continuous speech-to-text
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    const userLanguage = options?.language || (typeof navigator !== 'undefined' ? navigator.language : 'en-IN') || 'en-IN';
    recognition.lang = userLanguage;

    let accumulatedFinalTranscript = '';
    let hasReceivedAudio = false;

    const resetSilenceTimer = () => {
      if (this.silenceTimer) clearTimeout(this.silenceTimer);
      // Auto-finalize after 3.2 seconds of silence once speech has been received
      this.silenceTimer = setTimeout(() => {
        if (hasReceivedAudio && this.activeRecognition) {
          try {
            this.activeRecognition.stop();
          } catch {}
        }
      }, 3200);
    };

    recognition.onstart = () => {
      resetSilenceTimer();
    };

    recognition.onresult = (event: any) => {
      hasReceivedAudio = true;
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        if (item.isFinal) {
          accumulatedFinalTranscript += item[0].transcript + ' ';
        } else {
          interim += item[0].transcript;
        }
      }

      const activeText = (accumulatedFinalTranscript + ' ' + interim).replace(/\s+/g, ' ').trim();
      resetSilenceTimer();

      if (activeText) {
        const parsed = this.parseTextToMeals(activeText);
        const isFinal = Boolean(event.results[event.results.length - 1]?.isFinal);
        onResult(parsed, isFinal, activeText);
      }
    };

    recognition.onerror = (event: any) => {
      const errCode = event.error;
      let friendlyError = 'Speech recognition error';

      if (errCode === 'not-allowed' || errCode === 'service-not-allowed') {
        friendlyError = 'Microphone permission blocked. Please allow microphone access in your browser settings.';
      } else if (errCode === 'no-speech') {
        friendlyError = 'No speech detected. Please speak closer to the microphone.';
      } else if (errCode === 'network') {
        friendlyError = 'Speech recognition network error. Please check your internet connection.';
      } else if (errCode === 'audio-capture') {
        friendlyError = 'No microphone device found or audio capture failed.';
      }

      onError(friendlyError);
    };

    recognition.onend = () => {
      if (this.silenceTimer) clearTimeout(this.silenceTimer);
      this.activeRecognition = null;

      if (accumulatedFinalTranscript.trim()) {
        const finalParsed = this.parseTextToMeals(accumulatedFinalTranscript.trim());
        onResult(finalParsed, true, accumulatedFinalTranscript.trim());
      }
      onEnd();
    };

    // Request microphone access cleanly
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach(track => track.stop());
          try {
            recognition.start();
          } catch (e: any) {
            if (e?.name !== 'InvalidStateError') {
              onError(e?.message || 'Could not start speech recognition');
              onEnd();
            }
          }
        })
        .catch(() => {
          try {
            recognition.start();
          } catch {
            onError('Microphone access denied. Please allow microphone permissions in browser.');
            onEnd();
          }
        });
    } else {
      try {
        recognition.start();
      } catch (e: any) {
        onError(e?.message || 'Could not start speech recognition');
        onEnd();
      }
    }

    return () => {
      this.stopListening();
    };
  }

  /**
   * Stop active speech recognition safely
   */
  public stopListening(): void {
    if (this.silenceTimer) {
      clearTimeout(this.silenceTimer);
      this.silenceTimer = null;
    }
    if (this.activeRecognition) {
      try {
        this.activeRecognition.stop();
      } catch {}
      this.activeRecognition = null;
    }
  }

  /**
   * Strict Natural Language Voice Parser:
   * 1. NEVER GUESSES CALORIES! Total calories MUST be explicitly stated by the user.
   * 2. NEVER GUESSES MACROS! Protein, carbs, fats are only set if explicitly stated by the user.
   * 3. Detects meal type: breakfast, lunch, snack, dinner.
   * 4. Returns hasCalories=false with helpful message if user did not mention calories.
   */
  public parseTextToMeals(transcript: string): VoiceParseResult {
    const rawClean = transcript.trim();
    if (!rawClean) {
      return {
        transcript: '',
        hasCalories: false,
        items: [],
        totalCalories: 0,
        totalProtein: 0,
        totalCarbs: 0,
        totalFats: 0,
        suggestedMealType: this.getDefaultMealType()
      };
    }

    const lower = rawClean.toLowerCase().replace(/[\.,\?!\+]/g, ' ').replace(/\s+/g, ' ');

    // 1. Detect Suggested Meal Type
    let suggestedMealType = this.getDefaultMealType();
    if (/\b(breakfast|nashta|subah|morning)\b/i.test(lower)) {
      suggestedMealType = 'breakfast';
    } else if (/\b(lunch|dopehar|afternoon)\b/i.test(lower)) {
      suggestedMealType = 'lunch';
    } else if (/\b(dinner|raat|night)\b/i.test(lower)) {
      suggestedMealType = 'dinner';
    } else if (/\b(snack|snacks|shaam|tea|chai|pre[\s-]*workout|post[\s-]*workout|evening)\b/i.test(lower)) {
      suggestedMealType = 'snack';
    }

    // 2. Extract EXPLICIT TOTAL CALORIES (Supports single or multi-item additive utterances: e.g. "250 calories oats and 150 calories eggs")
    let extractedCalories: number | null = null;

    const calRegexGlobal = /(\d+)\s*(?:calories|calorie|kcal|cal|kilo\s*calories)\b/gi;
    const allCalMatches = Array.from(lower.matchAll(calRegexGlobal));

    const calRegexB = /(?:total\s+calories|total\s+calorie|calories|calorie|kcal)\s*(?:is|hai|of|:|me)?\s*(\d+)\b/i;
    const calMatchB = lower.match(calRegexB);

    if (allCalMatches.length > 0) {
      extractedCalories = allCalMatches.reduce((sum, m) => sum + parseInt(m[1], 10), 0);
    } else if (calMatchB) {
      extractedCalories = parseInt(calMatchB[1], 10);
    } else {
      // Fractional & Word-based Hindi/English hundreds: e.g. "dedh sau calories" (150), "dhai sau calories" (250), "sadhe teen sau calories" (350), "char sau calories" (400)
      const sadheSauMatch = lower.match(/\bsadhe\s+(ek|do|teen|tin|char|chaar|paanch|panch|chhe|che|saat|aath|nau)\s*(?:sau|so|hundred)\b/i);
      const wordSauMatch = lower.match(/\b(dedh|dhai|sawa|ek|do|teen|tin|char|chaar|paanch|panch|chhe|che|saat|aath|nau|das)\s*(?:sau|so|hundred)\s*(?:pachas)?\s*(?:calories|calorie|kcal|cal)?\b/i);
      if (sadheSauMatch) {
        const base = NUMBER_WORDS[sadheSauMatch[1].toLowerCase()] || 1;
        extractedCalories = Math.round((base + 0.5) * 100);
      } else if (wordSauMatch) {
        const multiplier = NUMBER_WORDS[wordSauMatch[1].toLowerCase()] || 1;
        const extraFifty = wordSauMatch[0].toLowerCase().includes('pachas') ? 50 : 0;
        extractedCalories = Math.round(multiplier * 100) + extraFifty;
      }
    }

    // 3. Extract EXPLICIT MACROS (if spoken by user, otherwise strictly 0 — NO GUESSING!)
    const proteinMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:protein|protien)\b/i) || 
                         lower.match(/(?:protein|protien)\s*(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\b/i);
    const carbsMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:carbs|carb|carbohydrates)\b/i) || 
                       lower.match(/(?:carbs|carb)\s*(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\b/i);
    const fatsMatch = lower.match(/(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\s*(?:fats|fat)\b/i) || 
                      lower.match(/(?:fats|fat)\s*(\d+(?:\.\d+)?)\s*(?:g|gm|grams)?\b/i);

    const explicitProtein = proteinMatch ? Math.round(parseFloat(proteinMatch[1])) : 0;
    const explicitCarbs = carbsMatch ? Math.round(parseFloat(carbsMatch[1])) : 0;
    const explicitFats = fatsMatch ? Math.round(parseFloat(fatsMatch[1])) : 0;

    // 4. If NO calories found:
    // STRICT RULE: PulseFit never guesses calories from food names!
    if (!extractedCalories || isNaN(extractedCalories) || extractedCalories <= 0) {
      return {
        transcript: rawClean,
        hasCalories: false,
        errorMessage: 'Total calories batana zaroori hai (Jaise: "450 calories for lunch" ya "350 kcal"). App calories guess nahi karta.',
        items: [],
        totalCalories: 0,
        totalProtein: explicitProtein,
        totalCarbs: explicitCarbs,
        totalFats: explicitFats,
        suggestedMealType
      };
    }

    // 5. Extract Food / Meal Title from spoken phrase
    let cleanTitle = lower
      .replace(/(\d+)\s*(?:calories|calorie|kcal|cal|kilo\s*calories)\b/gi, '')
      .replace(/(?:total\s+calories|total\s+calorie|calories|calorie|kcal)\s*(?:is|hai|of|:|me)?\s*\d+\b/gi, '')
      .replace(/\b\d+(?:\.\d+)?\s*(?:g|gm|grams)?\s*(?:protein|protien|carbs|carb|carbohydrates|fats|fat)\b/gi, '')
      .replace(/\b(?:protein|protien|carbs|carb|fats|fat)\s*\d+(?:\.\d+)?\s*(?:g|gm|grams)?\b/gi, '')
      .replace(/\b(?:for|in|mein|me|ka|ki|ke|breakfast|lunch|dinner|snack|snacks|nashta|subah|dopehar|raat)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();

    const displayTitle = cleanTitle.length >= 2 
      ? cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1)
      : (suggestedMealType.charAt(0).toUpperCase() + suggestedMealType.slice(1) + ' Meal');

    const foodItem: ParsedFoodItem = {
      name: displayTitle,
      quantity: 1,
      unit: 'serving',
      calories: extractedCalories,
      protein: explicitProtein,
      carbs: explicitCarbs,
      fats: explicitFats,
      confidence: 1.0
    };

    return {
      transcript: rawClean,
      hasCalories: true,
      items: [foodItem],
      totalCalories: extractedCalories,
      totalProtein: explicitProtein,
      totalCarbs: explicitCarbs,
      totalFats: explicitFats,
      suggestedMealType
    };
  }

  private getDefaultMealType(): MealType {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 16) return 'lunch';
    if (hour >= 16 && hour < 20) return 'snack';
    return 'dinner';
  }
}

export const voiceParser = new VoiceParser();
