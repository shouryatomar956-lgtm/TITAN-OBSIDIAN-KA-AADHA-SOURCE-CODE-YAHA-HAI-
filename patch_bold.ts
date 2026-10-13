import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

const regex = /{ex\.instructions}/g;

const replacement = `
                          {ex.instructions.split(/\\*\\*(.*?)\\*\\*/g).map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="text-zinc-300 font-semibold">{part}</strong> : part
                          )}
`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/ExercisesTab.tsx', content);
