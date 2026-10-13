import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

content = content.replace(
  /<\/div>\s*<\/>\s*\)}/g,
  "</div>\n          </div>\n        )}"
);

fs.writeFileSync('src/components/Dashboard.tsx', content);
