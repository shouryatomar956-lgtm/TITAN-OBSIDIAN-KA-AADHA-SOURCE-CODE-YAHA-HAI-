import fs from 'fs';

let content = fs.readFileSync('src/services/exerciseFactory.ts', 'utf8');

const generateInstructionsFunc = `
function generateUniqueInstructions(name: string, base: string, group: string, v: string, eq: string): string {
    const eqSetup: Record<string, string> = {
        'Bodyweight': 'Position your body securely with feet or hands firmly planted, using your own mass as resistance.',
        'Backpack': 'Secure the weighted backpack tightly against your torso to prevent shifting and find your center of gravity.',
        'Resistance Band': 'Anchor the band securely and grip the handles or loop firmly, stepping out to establish initial tension.',
        'Towel': 'Grip the ends of the towel tightly, pulling them apart to create maximum isometric tension across the fibers.',
        'Chair': 'Place a sturdy chair on a non-slip surface, checking its stability before committing your body weight.',
        'Wall': 'Press firmly against the wall, using the structural resistance to align your spine and stabilize your core.',
        'Floor': 'Lie flat or plant yourself solidly on the floor, pressing into the ground to create a stable kinetic chain.',
        'Barbell': 'Address the barbell with a symmetrical grip, ensuring the load is perfectly balanced before un-racking.',
        'Dumbbell': 'Grasp the dumbbells with a firm, neutral grip, maintaining active tension in your wrists and forearms.',
        'Cable': 'Set the cable pulley to the appropriate height and take a step out to engage the weight stack.',
        'Machine': 'Adjust the machine seat and pads to your specific biomechanics, aligning your joints with the axis of rotation.',
        'Kettlebell': 'Grab the kettlebell handle tightly, keeping your shoulders packed and core braced for the offset load.',
        'Smith Machine': 'Position yourself under the fixed bar path, unlatching the hooks with a slight rotation of the wrists.',
        'Trap Bar': 'Step inside the hexagonal frame, gripping the high or low handles squarely to align the load with your center of mass.',
        'Medicine Ball': 'Hold the medicine ball firmly at chest height, engaging your lats and core to stabilize the spherical weight.'
    };

    const varExecution: Record<string, string> = {
        'Standard': \`Execute the \${base} with a full, controlled range of motion.\`,
        'Paused': \`Descend into the \${base}, pausing completely at the point of maximum stretch for 2 seconds to eliminate the stretch reflex.\`,
        'Slow Eccentric': \`Perform the yielding phase of the \${base} over a strict 4-5 second count to maximize muscle fiber tearing.\`,
        'Incline': \`Execute the \${base} from an inclined angle, shifting the force vector to target the upper muscular fibers.\`,
        'Decline': \`Perform the \${base} from a declined position, recruiting the lower muscle fibers and altering the leverage point.\`,
        'Alternating': \`Alternate sides dynamically during the \${base}, requiring intense anti-rotational core stabilization.\`,
        'Single-Arm': \`Perform the \${base} unilaterally with one arm, balancing the asymmetrical load using your obliques.\`,
        'Single-Leg': \`Execute the \${base} on one leg, challenging your proprioception and targeting the unilateral stabilizers.\`,
        'Close-Grip': \`Keep your hands narrow during the \${base} to shift the mechanical tension heavily onto the triceps and inner fibers.\`,
        'Wide-Grip': \`Take an exaggerated wide grip for the \${base}, stretching the outer muscle bellies and reducing the range of motion.\`,
        'Reverse-Grip': \`Supinate your grip for the \${base}, altering the elbow path and heavily recruiting the biceps and lower lats.\`,
        'Dead-stop': \`Let the weight settle completely at the bottom of the \${base}, generating pure concentric force from zero momentum.\`,
        '1.5 Rep': \`Drop into the \${base}, rise halfway, drop back down, and then complete the full rep to double the time under tension.\`,
        'Isometric Hold': \`Hold the hardest portion of the \${base} statically, maximizing continuous muscle recruitment without joint movement.\`,
        'Pulsing': \`Perform rapid, partial reps at the bottom of the \${base} to trap blood in the muscle and trigger severe metabolic stress.\`,
        'Speed': \`Execute the concentric phase of the \${base} as explosively as possible to train fast-twitch muscle fibers.\`,
        'Deficit': \`Perform the \${base} from an elevated platform, drastically increasing the range of motion and deep tissue stretch.\`,
        'Front': \`Anteriorly load the \${base} to force your torso totally upright, slamming the quads and anterior core.\`,
        'Bulgarian': \`Elevate your rear foot during the \${base} to isolate the front leg and force extreme unilateral glute recruitment.\`,
        'Staggered-Stance': \`Stagger your feet slightly for the \${base}, keeping 80% of the load on the front leg while the rear acts as a kickstand.\`,
        'Wide-Stance': \`Take a sumo stance for the \${base}, heavily involving the adductors, hips, and inner leg musculature.\`,
        'Narrow-Stance': \`Bring your feet together for the \${base}, shifting the tension entirely to the outer quad sweep.\`,
        'Weighted': \`Add external load to the \${base}, forcing your nervous system to adapt to the newly applied gravitational stress.\`,
        'Interval': \`Perform the \${base} in strict time intervals, demanding high cardiovascular output and muscular endurance.\`,
        'Rotational': \`Incorporate a twist into the \${base}, engaging the transverse plane and firing the obliques sequentially.\`,
        'Reverse': \`Perform the \${base} in a retrograde motion, challenging your standard motor patterns and targeting antagonist muscles.\`,
        'Lateral': \`Move strictly side-to-side during the \${base}, hitting the abductors, adductors, and lateral stabilizers.\`
    };

    const groupTarget: Record<string, string> = {
        'Arms': 'biceps, triceps, and brachialis for complete sleeve-busting arm hypertrophy.',
        'Legs': 'quadriceps, hamstrings, and glutes, building a foundational pillar of lower body power.',
        'Core': 'rectus abdominis, obliques, and deep transverse core, creating an ironclad midsection.',
        'Cardio': 'cardiovascular system, skyrocketing your heart rate and incinerating systemic body fat.',
        'Back': 'latissimus dorsi, rhomboids, and traps, forging a thick, wide, and imposing posterior chain.',
        'Chest': 'pectoralis major and minor, developing a dense, armor-like anterior torso.',
        'Explosiveness': 'fast-twitch Type II fibers, translating directly to athletic power and vertical force generation.',
        'Neck Strength': 'cervical musculature, preventing concussion risks and building a thick, resilient neck.',
        'Tendons and Bones': 'connective tissues and bone density, bulletproofing your structural joints against injury.'
    };

    const s1 = eqSetup[eq] || 'Establish a stable base and ensure your posture is neutrally aligned.';
    const s2 = varExecution[v] || \`Execute the \${base} with strict control.\`;
    const s3 = \`Focus on a deep mind-muscle connection during both the concentric and eccentric phases of the \${name}.\`;
    const s4 = \`Return to the starting position smoothly, ensuring the \${group} remains under constant mechanical tension.\`;
    const tg = groupTarget[group] || \`the \${group} musculature.\`;

    return \`**Proper Form & Execution Guide:**\\n1. Setup: \${s1}\\n2. Execution: \${s2}\\n3. Movement: \${s3}\\n4. Completion: \${s4}\\n\\n**Target Muscles & Function:**\\n- Primary Target: Activates and hypertrophies the \${tg}\\n- Function: This \${base} specific variation forces your body to adapt to the unique biomechanical stressors of the \${eq}.\\n- Benefit: Utilizing a \${v.toLowerCase()} execution style forces adaptive growth, improves structural joint stability, and drastically enhances your overall \${group} output.\`;
}
`;

const oldMapCode = /instructions: \`\*\*Proper Form & Execution Guide:\*\*\[\\s\\S\]*?prevents injury.\`/g;

content = content.replace("let cachedDatabase: ExerciseEntity[] | null = null;", generateInstructionsFunc + "\nlet cachedDatabase: ExerciseEntity[] | null = null;");

content = content.replace(oldMapCode, "instructions: generateUniqueInstructions(name, base, group, v, eq)");

fs.writeFileSync('src/services/exerciseFactory.ts', content);
