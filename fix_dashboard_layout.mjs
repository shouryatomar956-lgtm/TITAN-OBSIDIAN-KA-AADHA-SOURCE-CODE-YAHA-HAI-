import fs from 'fs';

let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// 1. Remove UserProfileSettings from the overview tab and put BiometricSettings directly
content = content.replace(
  /<UserProfileSettings \/>/g,
  `<section className="space-y-4">\n              <h3 className="text-sm font-semibold tracking-tight text-zinc-400 uppercase">Hardware Security</h3>\n              <BiometricSettings />\n            </section>`
);

// 2. Make sure BiometricSettings is imported
if (!content.includes("import { BiometricSettings }")) {
  content = content.replace(
    /import \{ UserProfileSettings \} from '.\/UserProfileSettings';/,
    `import { BiometricSettings } from './BiometricSettings';`
  );
}

fs.writeFileSync('src/components/Dashboard.tsx', content);
console.log("Updated Dashboard layout.");
