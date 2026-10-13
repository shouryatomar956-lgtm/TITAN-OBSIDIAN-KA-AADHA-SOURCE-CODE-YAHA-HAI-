import fs from 'fs';
let content = fs.readFileSync('src/workers/unified.worker.ts', 'utf8');

const oldLogic = `                        // Sort history by date descending to find the most recent
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
                        });`;
                        
const newLogic = `                        // Sort history by date descending to find the most recent
                        const sortedHistory = [...history].sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                        
                        if (sortedHistory.length > 0) {
                            const lastWorkout = sortedHistory[0];
                            // Find the actual exercise entity for the last performed by matching name
                            const lastEx = masterDb.find((ex: any) => ex.name === lastWorkout.name);
                            if (lastEx) lastMuscleGroup = lastEx.muscleGroup;
                        }
                        
                        // Count frequencies based on name
                        history.forEach((workout: any) => {
                            if (workout.name) {
                                exerciseCounts[workout.name] = (exerciseCounts[workout.name] || 0) + 1;
                            }
                        });`;
                        
content = content.replace(oldLogic, newLogic);

const oldScoreLogic = `                            let score = (exerciseCounts[ex.id] || 0) * 2; // Base score on frequency`;
const newScoreLogic = `                            let score = (exerciseCounts[ex.name] || 0) * 2; // Base score on frequency`;

content = content.replace(oldScoreLogic, newScoreLogic);

fs.writeFileSync('src/workers/unified.worker.ts', content);
