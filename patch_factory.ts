import { readFileSync, writeFileSync } from 'fs';
const file = 'src/services/exerciseFactory.ts';
let content = readFileSync(file, 'utf8');

// Replace the duplication checking logic to be absolute (Core Identity based)
const oldLogic = `      // Ensure absolute uniqueness by structural naming convention
      const name = \`\${tempo} \${mod} \${base} with \${equip}\`;
      
      if (!generatedNames.has(name)) {
        generatedNames.add(name);`;

const newLogic = `      // Ensure absolute fundamental uniqueness (never repeated in a different way)
      // By using a core identity WITHOUT tempo, we guarantee no two exercises 
      // are just the same movement with a different speed.
      const coreIdentity = \`\${mod}-\${base}-\${equip}\`;
      const name = \`\${tempo} \${mod} \${base} with \${equip}\`;
      
      if (!generatedNames.has(coreIdentity) && !generatedNames.has(name)) {
        generatedNames.add(coreIdentity);
        generatedNames.add(name);`;

content = content.replace(oldLogic, newLogic);
writeFileSync(file, content);
