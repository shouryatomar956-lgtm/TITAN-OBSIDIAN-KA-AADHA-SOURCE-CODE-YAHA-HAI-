import { useEffect } from 'react';
import { getSearchProxy } from '../utils/searchManager';
import type { SearchMetadata } from '../types/search';

export function useSearchRegistration(metadata: SearchMetadata) {
  useEffect(() => {
    let registered = false;
    getSearchProxy().then(proxy => {
      if (proxy) {
        proxy.register(metadata);
        registered = true;
      }
    });

    return () => {
      if (registered) {
        getSearchProxy().then(proxy => {
          if (proxy) proxy.unregister(metadata.id);
        });
      }
    };
  }, [metadata.id, metadata.title, metadata.route]);
}
