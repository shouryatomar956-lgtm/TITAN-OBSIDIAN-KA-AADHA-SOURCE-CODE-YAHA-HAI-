import fs from 'fs';

let content = fs.readFileSync('src/workers/search.worker.ts', 'utf8');

const levenshteinRegex = /function levenshtein\([\s\S]*?return matrix\[a\.length\]\[b\.length\];\n}/;

const phoneticLogic = `
// Damerau-Levenshtein distance (accounts for transpositions)
function damerauLevenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );

      // Transposition check
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        matrix[i][j] = Math.min(
          matrix[i][j],
          matrix[i - 2][j - 2] + cost // transposition
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

// Soundex phonetic algorithm
function soundex(s: string): string {
    let a = s.toLowerCase().split('');
    let f = a.shift();
    if (!f) return '0000';
    let r = '';
    let codes: Record<string, any> = { a:'', e:'', i:'', o:'', u:'', y:'', h:'', w:'', b:1, f:1, p:1, v:1, c:2, g:2, j:2, k:2, q:2, s:2, x:2, z:2, d:3, t:3, l:4, m:5, n:5, r:6 };
    r = f + a.map(v => codes[v]).filter((v, i, arr) => (i === 0) ? v !== codes[f] : v !== arr[i - 1]).filter(Boolean).join('');
    return (r + '000').slice(0, 4).toUpperCase();
}
`;

content = content.replace(levenshteinRegex, phoneticLogic);

const fuzzyRegex = "const distance = levenshtein(queryLower, token);";
const fuzzyReplacement = "const distance = damerauLevenshtein(queryLower, token);\n         const phoneticMatch = soundex(queryLower) === soundex(token);\n         const finalDistance = phoneticMatch ? Math.max(0, distance - 2) : distance;";
content = content.replace(fuzzyRegex, fuzzyReplacement);

const finalDistanceRegex = "if (distance < bestFuzzyScore) {";
const finalDistanceReplacement = "if (finalDistance < bestFuzzyScore) {";
content = content.replace(finalDistanceRegex, finalDistanceReplacement);

const bestFuzzyRegex = "bestFuzzyScore = distance;";
const bestFuzzyReplacement = "bestFuzzyScore = finalDistance;";
content = content.replace(bestFuzzyRegex, bestFuzzyReplacement);

fs.writeFileSync('src/workers/search.worker.ts', content);
