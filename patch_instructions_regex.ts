import fs from 'fs';

let content = fs.readFileSync('src/services/exerciseFactory.ts', 'utf8');

const regex = /instructions:\s*\`Execute the \$\{name\}.*?concentric force output\.\`/g;

const newInstructions = `instructions: \`**Proper Form & Execution Guide:**\\n1. Setup: Establish a stable base using the \${eq} and ensure your posture is neutrally aligned before initiating the \${base}.\\n2. Execution: Brace your core and begin the \${name}. Maintain strict control and avoid using momentum.\\n3. Movement: Follow the \${v.toLowerCase()} variation technique, focusing on a deep mind-muscle connection during both the concentric and eccentric phases.\\n4. Completion: Return to the starting position smoothly, ensuring the \${group} remains under tension.\\n\\n**Target Muscles & Function:**\\n- Primary Target: Activates and hypertrophies the \${group} musculature.\\n- Function: This \${base} variation strengthens biomechanical pathways and enhances kinetic force generation.\\n- Benefit: Utilizing the \${eq} with a \${v.toLowerCase()} execution style forces adaptive growth, improves joint stability, and prevents injury.\``;

content = content.replace(regex, newInstructions);

fs.writeFileSync('src/services/exerciseFactory.ts', content);
