import fs from 'fs';

let content = fs.readFileSync('src/components/ExercisesTab.tsx', 'utf8');

const correctEnding = `                </div>
              )}
            />
        )}
      </div>
    </div>
  );
}`;

content = content.replace(/<\/div><\/div>[\s\S]*\}\;/g, correctEnding);
fs.writeFileSync('src/components/ExercisesTab.tsx', content);
