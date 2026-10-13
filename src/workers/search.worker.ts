// Search Feature Worker Pool
self.onmessage = (e) => {
    const { type, payload } = e.data;
    if (type === 'SEARCH') {
        const { query, dataset } = payload;
        const lowerQuery = query.toLowerCase();
        const results = dataset.filter((item: any) => 
            item.title.toLowerCase().includes(lowerQuery) || 
            item.keywords?.some((k: string) => k.toLowerCase().includes(lowerQuery))
        );
        self.postMessage({ type: 'SUCCESS', payload: results });
    }
};
