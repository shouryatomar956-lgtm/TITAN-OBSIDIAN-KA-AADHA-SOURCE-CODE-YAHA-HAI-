import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

content = content.replace(
  '<p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800/50 pt-3 mt-1">',
  '<p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800/50 pt-3 mt-1 whitespace-pre-wrap">'
);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
