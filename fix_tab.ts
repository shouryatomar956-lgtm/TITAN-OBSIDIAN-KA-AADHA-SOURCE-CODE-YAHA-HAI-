import { writeFileSync, readFileSync } from 'fs';

let tab = readFileSync('src/components/ExercisesTab.tsx', 'utf8');

tab = tab.replace("import { useState, useMemo } from 'react';", "import { useState, useMemo, useEffect, useRef } from 'react';");

const stateInsert = `  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(50);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 50);
        }
      },
      { rootMargin: '200px' }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => observer.disconnect();
  }, []);

  // Reset visible count on search/filter
  useEffect(() => {
    setVisibleCount(50);
  }, [searchQuery, selectedGroup, selectedEquip]);`;

tab = tab.replace(/  const \[selectedGroup, setSelectedGroup\] = useState<string \| null>\(null\);\n  const \[selectedEquip, setSelectedEquip\] = useState<string \| null>\(null\);/, stateInsert);

tab = tab.replace("filteredDb.map((ex) => (", "filteredDb.slice(0, visibleCount).map((ex) => (");

const observerDiv = `                  </motion.div>
                ))
            )}
            {visibleCount < filteredDb.length && (
              <div ref={observerTarget} className="w-full h-10 flex items-center justify-center">
                 <span className="text-zinc-500 text-xs">Loading more...</span>
              </div>
            )}`;

tab = tab.replace(/                  <\/motion\.div>\n                \)\)\n            \)}/, observerDiv);

writeFileSync('src/components/ExercisesTab.tsx', tab);
console.log("Tab fixed.");
