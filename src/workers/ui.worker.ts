// UI Effects / Telemetry Feature Worker Pool
self.onmessage = (e) => {
    const { type, payload } = e.data;
    if (type === 'PROCESS_TELEMETRY') {
        self.postMessage({ type: 'SUCCESS', payload: true });
    }
};
