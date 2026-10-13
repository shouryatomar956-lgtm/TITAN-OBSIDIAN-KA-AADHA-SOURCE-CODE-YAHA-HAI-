import localforage from 'localforage';

// Ensure consistent configuration across contexts
localforage.config({
  name: 'PulseFitTracker',
  storeName: 'gym_data', 
  description: 'Stores workout plans, logs, and streak metrics.',
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ]
});

self.onmessage = async (e: MessageEvent) => {
  const { id, type, payload } = e.data;
  
  try {
    switch (type) {
      case 'PARSE_JSON': {
        // Offload heavy JSON.parse from main thread
        const parsed = JSON.parse(payload);
        self.postMessage({ id, type: 'SUCCESS', payload: parsed });
        break;
      }
      case 'STRINGIFY_JSON': {
        // Offload heavy JSON.stringify from main thread
        const str = JSON.stringify(payload);
        self.postMessage({ id, type: 'SUCCESS', payload: str });
        break;
      }
      case 'LOCALFORAGE_GET': {
        
        let data = null;
        try {
           data = await localforage.getItem(payload);
        } catch (storageErr: any) {
           console.error("[Storage Worker] Fallback safety triggered on GET:", storageErr);
           data = null; // Absolute fallback safety
        }

        self.postMessage({ id, type: 'SUCCESS', payload: data });
        break;
      }
      case 'LOCALFORAGE_SET': {
        
        try {
           await localforage.setItem(payload.key, payload.value);
        } catch (storageErr: any) {
           console.error("[Storage Worker] Fallback safety triggered on SET (Quota Re-allocation/Failure):", storageErr);
           // Non-blocking fallback
        }

        self.postMessage({ id, type: 'SUCCESS' });
        break;
      }
      default:
        throw new Error(`Unknown worker task type: ${type}`);
    }
  } catch (error: any) {
    self.postMessage({ id, type: 'ERROR', payload: error.message || 'Worker processing failed' });
  }
};
