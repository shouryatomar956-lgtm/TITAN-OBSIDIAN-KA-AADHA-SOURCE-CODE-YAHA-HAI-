import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

// 1. Remove the fixed height calculation from the main wrapper
content = content.replace(
  'className="space-y-6 animate-in fade-in duration-300 mt-4 flex flex-col h-[calc(100vh-140px)]"',
  'className="space-y-6 animate-in fade-in duration-300 mt-4"'
);

// 2. Remove shrink-0 from the header
content = content.replace(
  '<div className="flex flex-col gap-4 shrink-0">',
  '<div className="flex flex-col gap-4">'
);

// 3. Remove flex-1 overflow-hidden from the list wrapper
content = content.replace(
  '<div className="flex-1 overflow-hidden min-h-0 relative">',
  '<div>'
);

// 4. Update Virtuoso to use useWindowScroll and remove strict 100% height
content = content.replace(
  /<Virtuoso\s+style=\{\{\s*height:\s*'100%',\s*width:\s*'100%'\s*\}\}/,
  '<Virtuoso\n              useWindowScroll'
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
