import { readFileSync, writeFileSync } from 'fs';
let content = readFileSync('src/components/Dashboard.tsx', 'utf8');

// I will match everything from `// useMemo for intensive roadmap filtering` down to `if (loading) {`
const blockRegex = /\/\/ useMemo for intensive roadmap filtering[\s\S]*?if \(loading\) \{/m;

const replacement = `
  const handleToggleShield = useCallback(async (dateStr: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const shielded = prev.protectedRestDates || [];
      const isShielded = shielded.includes(dateStr);
      return {
        ...prev,
        protectedRestDates: isShielded ? shielded.filter(d => d !== dateStr) : [...shielded, dateStr]
      };
    });
    const newState = await storage.toggleRestDayShield(dateStr);
    setState(newState);
  }, []);

  const recommendedExercises = useMemo(() => {
    if (!profile) return [];
    return getRecommendedExercises(profile, mood, 5);
  }, [profile, mood]);

  const handleCompleteSession = async () => {
      const newState = await storage.completeDailySession();
      setState(newState);
      setToastMessage(\`Absolute Beast Mode! You're crushing it, \${profile?.username || 'Athlete'}!\`);
      setTimeout(() => setToastMessage(''), 4000);
  };

  if (loading) {
`;

content = content.replace(blockRegex, replacement);

writeFileSync('src/components/Dashboard.tsx', content);
