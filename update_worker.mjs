import fs from 'fs';
let content = fs.readFileSync('src/workers/unified.worker.ts', 'utf8');

const analyticsCase = `            case 'analytics':
                if (type === 'CALCULATE_TRENDS') {
                    // Simulate trend computation
                    result = { trend: 'upward', confidence: 0.95 };
                }
                break;`;

const predictionCase = `            case 'prediction':
                if (type === 'PREDICT_NEXT_EXERCISE') {
                    const { history = [], masterDb = [] } = payload;
                    
                    if (!masterDb || masterDb.length === 0) {
                        result = null;
                        break;
                    }
                    
                    if (!history || history.length === 0) {
                        // Cold start: recommend a fundamental compound movement
                        const beginnerExercises = masterDb.filter((ex: any) => ex.difficulty === 'Beginner' && ex.scientificEffectivenessScore > 8);
                        result = beginnerExercises.length > 0 ? beginnerExercises[Math.floor(Math.random() * beginnerExercises.length)] : masterDb[0];
                    } else {
                        // Analyze patterns: frequency and recent muscle groups
                        const exerciseCounts = {};
                        let lastMuscleGroup = null;
                        
                        // Sort history by date descending to find the most recent
                        const sortedHistory = [...history].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                        
                        if (sortedHistory.length > 0) {
                            const lastWorkout = sortedHistory[0];
                            if (lastWorkout.exercises && lastWorkout.exercises.length > 0) {
                                // Find the actual exercise entity for the last performed
                                const lastEx = masterDb.find((ex: any) => ex.id === lastWorkout.exercises[0].exerciseId);
                                if (lastEx) lastMuscleGroup = lastEx.muscleGroup;
                            }
                        }
                        
                        // Count frequencies
                        history.forEach((session: any) => {
                            if (session.exercises) {
                                session.exercises.forEach((ex: any) => {
                                    exerciseCounts[ex.exerciseId] = (exerciseCounts[ex.exerciseId] || 0) + 1;
                                });
                            }
                        });
                        
                        // Score exercises based on frequency + muscle group synergy (antagonist or same group depending on split, we'll favor complementary or highly frequent)
                        let bestScore = -1;
                        let bestEx = null;
                        
                        masterDb.forEach((ex: any) => {
                            let score = (exerciseCounts[ex.id] || 0) * 2; // Base score on frequency
                            
                            // If we know the last muscle group, let's suggest a different one to avoid overtraining (e.g., if Chest -> suggest Back/Legs)
                            if (lastMuscleGroup) {
                                if (ex.muscleGroup !== lastMuscleGroup) {
                                    score += 5; 
                                }
                            }
                            
                            score += ex.scientificEffectivenessScore; // Weigh highly effective exercises
                            
                            if (score > bestScore) {
                                bestScore = score;
                                bestEx = ex;
                            }
                        });
                        
                        result = bestEx || masterDb[0];
                    }
                }
                break;`;

content = content.replace(analyticsCase, analyticsCase + '\n\n' + predictionCase);
fs.writeFileSync('src/workers/unified.worker.ts', content);
