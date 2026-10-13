const fs = require('fs');
const path = 'src/components/Dashboard.tsx';
let content = fs.readFileSync(path, 'utf8');

const loadingCheckIndex = content.indexOf('if (loading) {');
if (loadingCheckIndex === -1) {
    console.error("Could not find 'if (loading) {'");
    process.exit(1);
}

// Find where my replacement started. It started with "    return (" right after "if (loading) {"
const returnIndex = content.indexOf('    return (', loadingCheckIndex);

const beforeLoading = content.substring(0, loadingCheckIndex);
const loadingBlock = `  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        >
          <Dumbbell className="w-8 h-8 text-purple-500" />
        </motion.div>
      </div>
    );
  }

`;

// Get the rest of my injected return block starting from "  return ("
const restOfContent = content.substring(returnIndex).replace(/^    return \(/, '  return (');

fs.writeFileSync(path, beforeLoading + loadingBlock + restOfContent);
console.log('Fixed Dashboard.tsx!');
