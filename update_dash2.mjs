import fs from 'fs';
let content = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');

// Replace standard export function with React.memo
content = content.replace("export const Dashboard = memo(function Dashboard() {", "export const Dashboard = memo(function Dashboard() {");
content = content.replace("});\\n$", "}, (prevProps, nextProps) => true);\n"); // Strict equality since it takes no props

fs.writeFileSync('src/components/Dashboard.tsx', content);
