import { bootOptimizationEngine, OfflineAutoSyncBridge } from './utils/optimizationEngine';
// Pillar 1: Pre-Boot Worker Pool Initialization (Execute immediately on parse)
bootOptimizationEngine();

// Initialize the core bridging for RxDB/LocalForage
OfflineAutoSyncBridge.registerFeatureSchema('core_storage', {
  title: 'Core App State',
  version: 1,
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    data: { type: 'object' }
  },
  required: ['id']
}).catch(console.error);

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {
    // We could prompt the user here
  },
  onOfflineReady() {
    // Ready for offline use
  },
});


import localforage from 'localforage';
localforage.getItem('pulsefit_theme').then((theme) => {
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme as string);
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
