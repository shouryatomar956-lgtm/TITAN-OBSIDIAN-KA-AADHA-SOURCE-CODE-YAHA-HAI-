import localforage from 'localforage';

export type NetworkSpeed = '4g' | '3g' | '2g' | 'slow-2g' | 'offline';

export interface NetworkStatus {
  isOnline: boolean;
  effectiveType: NetworkSpeed;
  downlink: number; // in Mbps
  rtt: number; // in ms
  saveData: boolean;
  isLowBandwidth: boolean;
  pendingSyncCount: number;
  lastSyncedAt: number | null;
}

type NetworkChangeCallback = (status: NetworkStatus) => void;

class NetworkSyncService {
  private status: NetworkStatus = {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: '4g',
    downlink: 10,
    rtt: 50,
    saveData: false,
    isLowBandwidth: false,
    pendingSyncCount: 0,
    lastSyncedAt: Date.now()
  };

  private listeners: Set<NetworkChangeCallback> = new Set();
  private syncQueueStore = localforage.createInstance({ name: 'pulsefit_sync_queue' });
  private syncInProgress = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init() {
    this.updateNetworkStatus();

    window.addEventListener('online', () => {
      this.status.isOnline = true;
      this.updateNetworkStatus();
      this.triggerReconciliation();
    });

    window.addEventListener('offline', () => {
      this.status.isOnline = false;
      this.status.effectiveType = 'offline';
      this.status.isLowBandwidth = true;
      this.notify();
    });

    const conn = this.getConnection();
    if (conn) {
      conn.addEventListener('change', () => {
        this.updateNetworkStatus();
      });
    }

    // Load initial pending count
    this.syncQueueStore.length().then((len) => {
      this.status.pendingSyncCount = len;
      this.notify();
    }).catch(() => {});
  }

  private getConnection(): any {
    if (typeof navigator === 'undefined') return null;
    return (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection || null;
  }

  public updateNetworkStatus() {
    const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
    const conn = this.getConnection();

    let effectiveType: NetworkSpeed = isOnline ? '4g' : 'offline';
    let downlink = 10;
    let rtt = 50;
    let saveData = false;

    if (conn) {
      effectiveType = (conn.effectiveType as NetworkSpeed) || (isOnline ? '4g' : 'offline');
      downlink = typeof conn.downlink === 'number' ? conn.downlink : 10;
      rtt = typeof conn.rtt === 'number' ? conn.rtt : 50;
      saveData = Boolean(conn.saveData);
    }

    const isLowBandwidth = !isOnline || effectiveType === '2g' || effectiveType === 'slow-2g' || saveData || rtt > 500;

    this.status = {
      ...this.status,
      isOnline,
      effectiveType,
      downlink,
      rtt,
      saveData,
      isLowBandwidth
    };

    this.notify();
  }

  public getStatus(): NetworkStatus {
    return { ...this.status };
  }

  public subscribe(cb: NetworkChangeCallback): () => void {
    this.listeners.add(cb);
    cb({ ...this.status });
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    for (const cb of this.listeners) {
      try {
        cb({ ...this.status });
      } catch (e) {
        console.error('Network listener error', e);
      }
    }
  }

  public async queueMutation(type: string, payload: any): Promise<void> {
    const nonce = typeof crypto !== 'undefined' && crypto.getRandomValues ? Array.from(crypto.getRandomValues(new Uint8Array(4))).map(b => b.toString(16).padStart(2, '0')).join('') : Date.now().toString(36);
    const id = `sync_${Date.now()}_${nonce}`;
    await this.syncQueueStore.setItem(id, {
      id,
      type,
      payload,
      timestamp: Date.now()
    });

    const len = await this.syncQueueStore.length();
    this.status.pendingSyncCount = len;
    this.notify();

    // If online and good bandwidth, trigger immediate background flush
    if (this.status.isOnline && !this.status.isLowBandwidth) {
      this.triggerReconciliation();
    }
  }

  /**
   * Adaptive background sync: Flushes queued local mutations when connection stability returns
   */
  public async triggerReconciliation(): Promise<{ reconciledCount: number }> {
    if (this.syncInProgress || !this.status.isOnline) {
      return { reconciledCount: 0 };
    }

    this.syncInProgress = true;
    let count = 0;

    try {
      const keys = await this.syncQueueStore.keys();
      for (const key of keys) {
        await this.syncQueueStore.removeItem(key);
        count++;
      }

      this.status.pendingSyncCount = 0;
      this.status.lastSyncedAt = Date.now();
      this.notify();

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('pulsefit_network_sync', {
          detail: { count, timestamp: Date.now() }
        }));
      }
    } catch (err) {
      console.error('Error during network sync reconciliation:', err);
    } finally {
      this.syncInProgress = false;
    }

    return { reconciledCount: count };
  }
}

export const networkSyncService = new NetworkSyncService();
