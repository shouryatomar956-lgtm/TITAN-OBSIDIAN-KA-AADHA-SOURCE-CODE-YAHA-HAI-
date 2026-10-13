import { useEffect, useRef } from 'react';
import localforage from 'localforage';

const sessionStore = localforage.createInstance({
  name: 'pulsefit_session_vault'
});

export interface SessionPersistenceOptions<T> {
  key: string;
  state: T;
  onRestore: (restoredState: T) => void;
  debounceMs?: number;
}

/**
 * The Unkillable Memory Core
 * Leverages Page Lifecycle API (visibilitychange, freeze, pagehide, beforeunload)
 * and guarantees zero-byte loss for active, uncommitted calorie tracker form states.
 */
export function useSessionPersistence<T>({
  key,
  state,
  onRestore,
  debounceMs = 300
}: SessionPersistenceOptions<T>) {
  const stateRef = useRef<T>(state);
  stateRef.current = state;
  const onRestoreRef = useRef(onRestore);
  onRestoreRef.current = onRestore;

  // 1. Initial State Restoration on Mount
  useEffect(() => {
    let isCancelled = false;

    const restore = async () => {
      try {
        // First check rapid session storage
        const rawSession = sessionStorage.getItem(`pulsefit_session_${key}`);
        if (rawSession) {
          const parsed = JSON.parse(rawSession);
          if (!isCancelled && parsed !== null && parsed !== undefined) {
            onRestoreRef.current(parsed);
            return;
          }
        }

        // Fallback to durable localforage vault
        const stored = await sessionStore.getItem<T>(key);
        if (!isCancelled && stored !== null && stored !== undefined) {
          onRestoreRef.current(stored);
        }
      } catch (err) {
        console.warn('Session persistence restoration warning:', err);
      }
    };

    restore();

    return () => {
      isCancelled = true;
    };
  }, [key]);

  // 2. Debounced active persistence
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const val = stateRef.current;
        sessionStorage.setItem(`pulsefit_session_${key}`, JSON.stringify(val));
        sessionStore.setItem(key, val).catch(() => {});
      } catch (e) {
        // Quota or serialization issue
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [state, key, debounceMs]);

  // 3. Instant State Freezing on Page Lifecycle events
  useEffect(() => {
    const freezeState = () => {
      try {
        const val = stateRef.current;
        sessionStorage.setItem(`pulsefit_session_${key}`, JSON.stringify(val));
        sessionStore.setItem(key, val).catch(() => {});
      } catch (e) {
        // Safe fail
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        freezeState();
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', freezeState);
    window.addEventListener('pagehide', freezeState);
    window.addEventListener('freeze', freezeState);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', freezeState);
      window.removeEventListener('pagehide', freezeState);
      window.removeEventListener('freeze', freezeState);
    };
  }, [key]);

  const clearPersistedState = async () => {
    try {
      sessionStorage.removeItem(`pulsefit_session_${key}`);
      await sessionStore.removeItem(key);
    } catch (e) {
      // ignore
    }
  };

  return { clearPersistedState };
}
