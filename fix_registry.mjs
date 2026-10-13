import fs from 'fs';

let content = fs.readFileSync('src/workers/searchRegistry.ts', 'utf8');

// Fix undefined tokens crash
content = content.replace(
  "].map(t => t.toLowerCase().trim())",
  "].filter(t => typeof t === 'string').map(t => t.toLowerCase().trim())"
);

// Fix undefined soundex/levenshtein input crash
content = content.replace(
  "const itemTokens = [item.title, ...(item.keywords || []), ...(item.aliases || [])]",
  "const itemTokens = [item.title, ...(item.keywords || []), ...(item.aliases || [])].filter(t => typeof t === 'string')"
);

fs.writeFileSync('src/workers/searchRegistry.ts', content);
