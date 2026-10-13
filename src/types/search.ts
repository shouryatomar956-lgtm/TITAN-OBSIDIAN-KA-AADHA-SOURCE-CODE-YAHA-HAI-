export interface SearchMetadata {
  tier?: string;
  score?: number;
  id: string;
  title: string;
  category: string;
  keywords: string[];
  aliases: string[];
  priority: number;
  route: string;
  payload?: any;
}

export function validateSearchMetadata(metadata: any): metadata is SearchMetadata {
  if (!metadata || typeof metadata !== 'object') {
    console.warn('[Search Validation] Invalid metadata object:', metadata);
    return false;
  }
  if (typeof metadata.id !== 'string' || !metadata.id) {
    console.warn('[Search Validation] Missing or invalid ID:', metadata);
    return false;
  }
  if (typeof metadata.title !== 'string' || !metadata.title) {
    console.warn('[Search Validation] Missing or invalid title:', metadata);
    return false;
  }
  if (typeof metadata.category !== 'string' || !metadata.category) {
    console.warn('[Search Validation] Missing or invalid category:', metadata);
    return false;
  }
  if (typeof metadata.route !== 'string' || !metadata.route) {
    console.warn('[Search Validation] Missing or invalid route:', metadata);
    return false;
  }
  return true;
}
