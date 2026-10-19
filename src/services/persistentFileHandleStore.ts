/**
 * Persistent W3C File System Access API Handle Store
 * Uses native IndexedDB Structured Clone algorithm to store FileSystemFileHandle
 * across browser sessions, reloads, and tab closures without any server or backend.
 */

const DB_NAME = 'PulseFitPersistentHandleStore';
const DB_VERSION = 1;
const STORE_NAME = 'file_handles';
const KEY_CONTINUOUS_BACKUP = 'pulsefit_active_continuous_vault_handle';

class PersistentFileHandleStore {
  private dbPromise: Promise<IDBDatabase> | null = null;

  private getDB(): Promise<IDBDatabase> {
    if (!this.dbPromise) {
      this.dbPromise = new Promise((resolve, reject) => {
        if (typeof window === 'undefined' || !window.indexedDB) {
          reject(new Error('IndexedDB not supported in this environment'));
          return;
        }

        const request = window.indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME);
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
    return this.dbPromise;
  }

  /**
   * Save a FileSystemFileHandle to persistent IndexedDB storage
   */
  async saveHandle(handle: FileSystemFileHandle): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(handle, KEY_CONTINUOUS_BACKUP);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('[HandleStore] Failed to save handle to IndexedDB:', err);
    }
  }

  /**
   * Retrieve stored FileSystemFileHandle
   */
  async getHandle(): Promise<FileSystemFileHandle | null> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(KEY_CONTINUOUS_BACKUP);
        req.onsuccess = () => {
          const handle = req.result as FileSystemFileHandle;
          resolve(handle || null);
        };
        req.onerror = () => resolve(null);
      });
    } catch (err) {
      console.warn('[HandleStore] Failed to retrieve handle from IndexedDB:', err);
      return null;
    }
  }

  /**
   * Remove stored handle
   */
  async clearHandle(): Promise<void> {
    try {
      const db = await this.getDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(KEY_CONTINUOUS_BACKUP);
        req.onsuccess = () => resolve();
        req.onerror = () => resolve();
      });
    } catch (err) {
      console.warn('[HandleStore] Failed to clear handle:', err);
    }
  }
}

export const persistentFileHandleStore = new PersistentFileHandleStore();
