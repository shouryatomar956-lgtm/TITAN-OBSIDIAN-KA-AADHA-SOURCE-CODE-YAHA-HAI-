import localforage from 'localforage';

export const KEY_AI_VOICE_COACH_ENABLED = 'pulsefit_ai_voice_coach_enabled';

class VoiceCoachService {
  private isEnabled: boolean = true;
  private hasInitPreference: boolean = false;
  private currentVoice: SpeechSynthesisVoice | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.isSupported = true;
      this.loadPreference();
      this.initVoices();
      this.initEventListener();
    }
  }

  private async loadPreference() {
    try {
      const stored = await localforage.getItem<boolean>(KEY_AI_VOICE_COACH_ENABLED);
      if (stored !== null && stored !== undefined) {
        this.isEnabled = stored;
      } else {
        // Default to enabled
        this.isEnabled = true;
        await localforage.setItem(KEY_AI_VOICE_COACH_ENABLED, true);
      }
      this.hasInitPreference = true;
    } catch {
      this.isEnabled = true;
      this.hasInitPreference = true;
    }
  }

  private initVoices() {
    if (!this.isSupported) return;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        // Prefer natural English voices (Google US English, Samantha, Daniel, Karen)
        const natural = voices.find(v => 
          v.lang.startsWith('en') && 
          (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Enhanced') || v.name.includes('Samantha'))
        ) || voices.find(v => v.lang.startsWith('en')) || voices[0];
        this.currentVoice = natural || null;
      }
    };

    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  private initEventListener() {
    // Listen for app-wide toasts to speak if enabled
    if (typeof window !== 'undefined') {
      window.addEventListener('pulsefit_toast', ((e: CustomEvent) => {
        const message = e.detail?.message;
        if (message && typeof message === 'string') {
          // Announce milestone or achievement toasts
          if (message.toLowerCase().includes('crushing it') || 
              message.toLowerCase().includes('unlocked') || 
              message.toLowerCase().includes('beast mode') ||
              message.toLowerCase().includes('streak')) {
            this.speak(message, { priority: false, rate: 1.05 });
          }
        }
      }) as EventListener);
    }
  }

  public async getVoiceEnabled(): Promise<boolean> {
    if (!this.hasInitPreference) {
      await this.loadPreference();
    }
    return this.isEnabled;
  }

  public async setVoiceEnabled(enabled: boolean): Promise<void> {
    this.isEnabled = enabled;
    try {
      await localforage.setItem(KEY_AI_VOICE_COACH_ENABLED, enabled);
    } catch (e) {
      console.warn('[VoiceCoach] Preference save warning:', e);
    }
    if (!enabled && this.isSupported) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Speak aloud text if enabled. Cancels any active utterance if priority is true.
   */
  public speak(
    text: string, 
    options?: { 
      rate?: number; 
      pitch?: number; 
      priority?: boolean;
      force?: boolean;
    }
  ): boolean {
    if (!this.isSupported) return false;
    if (!this.isEnabled && !options?.force) return false;
    if (!text || text.trim().length === 0) return false;

    try {
      if (options?.priority) {
        window.speechSynthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate || 1.1; // Slightly brisk for responsive training tempo
      utterance.pitch = options?.pitch || 1.0;
      if (this.currentVoice) {
        utterance.voice = this.currentVoice;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('[VoiceCoach] Speech error:', e);
      return false;
    }
  }

  /**
   * Speak live rep count with crisp instant delivery
   */
  public speakRepCount(rep: number) {
    this.speak(rep.toString(), { priority: true, rate: 1.25, pitch: 1.05 });
  }

  /**
   * Speak biomechanical form correction
   */
  public speakFormCorrection(cue: string) {
    this.speak(cue, { priority: true, rate: 1.1, pitch: 1.1 });
  }

  /**
   * Speak pre-set briefing
   */
  public speakBriefing(exerciseName: string, guidance: string) {
    this.speak(`${exerciseName} tracking ready. ${guidance}`, { priority: true, rate: 1.05 });
  }
}

export const voiceCoach = new VoiceCoachService();
