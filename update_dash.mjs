import fs from 'fs';
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace standard export function with React.memo
content = content.replace("import { useEffect, useState, useMemo, useCallback } from 'react';", "import { useEffect, useState, useMemo, useCallback, startTransition, memo } from 'react';");
content = content.replace("export function Dashboard() {", "export const Dashboard = memo(function Dashboard() {");

// We need to find the matching closing bracket for Dashboard, which is at the very end of the file.
// Or we can just do a replace backwards. 
const lastBracketIndex = content.lastIndexOf('}');
content = content.substring(0, lastBracketIndex) + '});\n' + content.substring(lastBracketIndex + 1);

// Inside Dashboard, find activeTab setters and wrap with startTransition
content = content.replace(/setActiveTab\('overview'\);/g, "startTransition(() => setActiveTab('overview'));");
content = content.replace(/setActiveTab\('exercises'\);/g, "startTransition(() => setActiveTab('exercises'));");
content = content.replace(/setActiveTab\('settings'\);/g, "startTransition(() => setActiveTab('settings'));");

fs.writeFileSync('src/components/Dashboard.tsx', content);
