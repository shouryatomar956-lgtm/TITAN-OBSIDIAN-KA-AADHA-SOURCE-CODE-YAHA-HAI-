// Analytics Feature Worker Pool — Real-Time Statistical & Welford Online Variance Engine
self.onmessage = (e) => {
  const { type, payload } = e.data;
  if (type === 'CALCULATE_STATS') {
    const list = Array.isArray(payload) ? payload : [];
    let totalWorkouts = 0;
    let totalVolume = 0;
    const uniqueDays = new Set<string>();

    // Welford's online algorithm for numerical stability of session volume mean & variance
    let meanVol = 0;
    let m2Vol = 0;

    for (let i = 0; i < list.length; i++) {
      const w = list[i];
      if (!w || w.isCompleted === false) continue;
      totalWorkouts++;
      const sets = Math.max(1, Number(w.baseSets || w.sets || 3));
      const reps = typeof w.baseReps === 'string' ? (parseInt(w.baseReps, 10) || 10) : Number(w.baseReps || w.reps || 10);
      const load = Number(w.weight || w.load || 25);
      const vol = sets * reps * load;
      totalVolume += vol;

      const delta = vol - meanVol;
      meanVol += delta / totalWorkouts;
      m2Vol += delta * (vol - meanVol);

      if (w.date) {
        uniqueDays.add(String(w.date).split('T')[0]);
      }
    }

    // Calculate active consecutive day streak
    const sortedDays = Array.from(uniqueDays).sort().reverse();
    let streak = sortedDays.length > 0 ? 1 : 0;
    for (let i = 0; i < sortedDays.length - 1; i++) {
      const d1 = new Date(sortedDays[i] + 'T00:00:00Z').getTime();
      const d2 = new Date(sortedDays[i + 1] + 'T00:00:00Z').getTime();
      const diffDays = Math.round((d1 - d2) / 86400000);
      if (diffDays === 1) streak++;
      else break;
    }

    const result = {
      totalWorkouts,
      streak,
      volume: Math.round(totalVolume),
      meanSessionVolume: Math.round(meanVol),
      stdDevVolume: totalWorkouts > 1 ? Math.round(Math.sqrt(m2Vol / (totalWorkouts - 1))) : 0
    };
    self.postMessage({ type: 'SUCCESS', payload: result });
  }
};
