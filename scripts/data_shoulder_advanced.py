#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 6: SHOULDER - ADVANCED TIER (Total: 100 Exercises)
# 70 Home (70%) + 30 Gym (30%)
# Validated High Mechanical Disadvantage, Unilateral Loading, Strict Scapular Alignment
# Scientific Score Bounds: 8.1 to 9.2
# Equipment: Bodyweight, Backpack-weighted, Resistance Bands, Dumbbells, Barbell, Cable, Machine, EZ-Bar
# ==============================================================================

adv_home_data = [
    # --- Advanced Handstand & Calisthenic Shoulder Levers (Home) ---
    (
        "Wall-Supported Strict Handstand Push-Up (Full Head-to-Floor)",
        8.8,
        "Bodyweight",
        "Kick into a vertical handstand against a smooth wall with heels lightly resting on surface. Lower crown of head forward of fingertips in a strict tripod descent, then press aggressively through palms into full scapular elevation at top lockout."
    ),
    (
        "Wall-Facing Strict Handstand Push-Up (Hollow Body Posture)",
        9.0,
        "Bodyweight",
        "Walk feet up wall with chest facing surface and body in a hollow dish shape. Lower forehead to touch floor, press upward with elbows tracking at 45 degrees, maintaining active posterior pelvic tilt to avoid lumbar hyperextension."
    ),
    (
        "Deficit Wall Handstand Push-Up on 3-Inch Parallettes",
        9.2,
        "Bodyweight",
        "Grip low parallettes or sturdy blocks positioned 6 inches from wall. Descend until shoulders touch the level of hands in a deep deficit, pressing upward through full shoulder flexion."
    ),
    (
        "Eccentric-Overload Handstand Push-Up Negative (8-Second Descent)",
        8.7,
        "Bodyweight",
        "Kick into vertical handstand against wall. Control the eccentric descent over 8 grueling seconds until forehead grazes mat, kick down safely, and repeat to build maximal motor unit recruitment."
    ),
    (
        "Wall-Supported Handstand Shoulder Taps with 2-Second Hold",
        8.6,
        "Bodyweight",
        "In a strict wall handstand, shift weight smoothly onto left arm, lift right hand to tap left shoulder, pause for 2 seconds of pure unilateral support, and switch sides under control."
    ),
    (
        "Floor Pseudo Planche Push-Up with Deep Forward Lean",
        8.8,
        "Bodyweight",
        "Set hands beside hips with fingers turned outward at 45 degrees. Lean shoulders forward until hands align with naval, lowering chest while maintaining maximum scapular protraction throughout."
    ),
    (
        "Feet-Elevated Planche Lean on 20-Inch Box with Forward Shift",
        8.7,
        "Bodyweight",
        "Elevate feet on a 20-inch box, walk hands out, and lean forward until shoulders are 8 inches ahead of wrists. Lock elbows straight and hold for 20 seconds under intense anterior delt shear load."
    ),
    (
        "Tuck Planche Push-Up on Low Parallettes",
        9.1,
        "Bodyweight",
        "Hold tuck planche with knees glued to chest and elbows locked. Bend elbows to 90 degrees lowering shoulders forward, and press back up to straight-arm protraction without feet touching ground."
    ),
    (
        "Freestanding Handstand Kick-Up to Shoulder Tap Attempt",
        8.9,
        "Bodyweight",
        "Kick into a freestanding handstand away from wall. Stabilize via fingertip camber and shoulder elevation, tap shoulder rapidly, and step down under control, challenging spatial proprioception."
    ),
    (
        "Pike Push-Up on Rings / Suspension Straps with Flare",
        8.8,
        "Bodyweight",
        "Hang suspension straps or rings 6 inches off floor. Place feet on chair and hands in rings in pike stance. Lower head between unstable rings, forcing rotator cuff to stabilize against intense lateral drift."
    ),
    (
        "Wall Walk to Handstand with Isometric Shoulder Shrug at Top",
        8.5,
        "Bodyweight",
        "Start in push-up plank, walk feet up wall while walking hands toward baseboard until nose touches wall. Push shoulders upward toward ears for 5 seconds, and walk back down under control."
    ),
    (
        "Deficit Feet-Elevated Pike Push-Up (6-Inch Hand Blocks)",
        8.6,
        "Bodyweight",
        "Elevate feet on high table and place hands on 6-inch sturdy blocks. Descend deep between blocks until clavicles align with hands, pressing back through full vertical plane."
    ),
    (
        "Single-Arm Incline Wall Planche Lean Hold",
        8.7,
        "Bodyweight",
        "Place one hand on wall at shoulder height, step feet back, and lean full body weight into supporting shoulder while protracting scapula for 15 seconds per side."
    ),
    (
        "Advanced Dolphin Pose to Forearm Stand Hop Balance",
        8.4,
        "Bodyweight",
        "From dolphin pose on forearms, kick one leg upward to catch a brief forearm balance, pushing through elbows to keep head elevated off floor and engaging deltoids."
    ),
    (
        "Floor Planche Lean to Push-Up Repetition Waves",
        8.8,
        "Bodyweight",
        "Assume maximum forward lean planche plank, perform a push-up with hands remaining beside waist, press to locked protraction, and maintain forward lean throughout all reps."
    ),

    # --- Heavy Backpack & Weighted Calisthenic Overload (Home) ---
    (
        "Backpack 45 lb Standing Strict Overhead Military Press",
        8.9,
        "Backpack-weighted",
        "Load backpack with 45 lbs of dense books or weight plates. Squeeze glutes, press from collarbones to overhead lockout with zero backward spinal arching, lowering over 3 seconds."
    ),
    (
        "Backpack 50 lb Standing Push Press with Explosive Leg Drive",
        9.0,
        "Backpack-weighted",
        "Hold a 50 lb heavy backpack at collarbones. Dip knees 3 inches, explode through hips, and punch pack aggressively overhead, locking out with head pushed through."
    ),
    (
        "Backpack 35 lb Single-Arm Strict Shoulder Press",
        8.8,
        "Backpack-weighted",
        "Grip 35 lb backpack top handle in right hand. Brace obliques against lateral tilt, press vertically to full extension beside ear, and lower under strict anterior delt tension."
    ),
    (
        "Backpack 40 lb Seated Floor Z-Press (Legs Straddled)",
        9.1,
        "Backpack-weighted",
        "Sit on floor with legs flat in a wide 'V'. Hold a 40 lb backpack at chin and press overhead without leaning back or flexing hips, requiring immense core stability and delt strength."
    ),
    (
        "Backpack 30 lb Weighted Pike Push-Up on Floor",
        8.9,
        "Backpack-weighted",
        "Wear a 30 lb backpack strapped high and tight across upper back. Assume steep downward-dog pike stance and perform strict push-ups, lowering crown of head to floor under added load."
    ),
    (
        "Backpack 25 lb Weighted Feet-Elevated Pike Push-Up",
        9.1,
        "Backpack-weighted",
        "With a 25 lb backpack strapped snug, place toes on chair and hands on floor. Lower forehead between hands under intensified axial load, pressing to full lockout."
    ),
    (
        "Backpack 30 lb Clean-to-Thruster Overhead Wave",
        8.8,
        "Backpack-weighted",
        "Clean a 30 lb backpack from floor to front rack, drop into full squat, and explode upward directly into an overhead thruster, transferring force through anterior delts."
    ),
    (
        "Backpack 25 lb Lateral Raise with 3-Second Isometric Apex Pause",
        8.6,
        "Backpack-weighted",
        "Hold 25 lb loaded bags in hands. Raise arms in scapular plane to horizontal, pause for 3 full seconds at parallel under intense lateral deltoid burn, and lower under 4-second tempo."
    ),
    (
        "Backpack 35 lb Single-Arm High Pull to Upright Row",
        8.7,
        "Backpack-weighted",
        "Hold 35 lb pack in one hand, explode through hips, and pull elbow high toward ceiling until hand reaches collarbone, isolating lateral and rear deltoid heads."
    ),
    (
        "Backpack 40 lb Bent-Over Wide-Grip Rear Delt Row",
        8.6,
        "Backpack-weighted",
        "Hinge forward 75 degrees with flat spine. Grip outer edges of a 40 lb pack, pull toward collarbones with elbows flared at 90 degrees, holding peak posterior delt contraction."
    ),
    (
        "Backpack 30 lb Overhead Waiter Carry Shuttle (45 Seconds)",
        8.7,
        "Backpack-weighted",
        "Support a 30 lb backpack flat on palm with arm locked directly overhead. Walk briskly across room for 45 seconds per arm, maintaining active scapular elevation."
    ),
    (
        "Backpack 35 lb Half-Kneeling Strict Shoulder Press",
        8.8,
        "Backpack-weighted",
        "Kneel on one knee, hold 35 lb pack on kneeling side, and press overhead without rotating pelvis or leaning torso, challenging unilateral vertical pressing power."
    ),
    (
        "Backpack 30 lb Heavy Halo Orbit to Strict Press",
        8.6,
        "Backpack-weighted",
        "Circle a 30 lb backpack around head clockwise, press overhead, lower, circle counter-clockwise, and press overhead, building dynamic multidirectional shoulder armor."
    ),
    (
        "Backpack 25 lb Prone Incline Y-T-W Shoulder Complex",
        8.5,
        "Backpack-weighted",
        "Lie chest-down across a firm inclined surface holding 15-20 lb loaded bags. Perform 5 Y-raises, 5 T-raises, and 5 W-presses continuously to thoroughly exhaust rear delts."
    ),
    (
        "Backpack 35 lb Front Scaption Raise to Lateral Flare",
        8.7,
        "Backpack-weighted",
        "Raise 35 lb pack to eye level in scapular plane, spread hands outward, lower smoothly to sides, and reset, demanding high anterior delt eccentric control."
    ),

    # --- Heavy Resistance Band Deltoid Isolation & Rotator Protocols (Home) ---
    (
        "Heavy Resistance Band Standing Strict Overhead Press (Double Looped)",
        8.7,
        "Resistance Bands",
        "Step inside a heavy looped resistance band with feet shoulder-width, rack band at collarbones, and press overhead against extreme elastic tension peaking at top extension."
    ),
    (
        "Resistance Band High-Tension Face Pull to Overhead Y-Press",
        8.8,
        "Resistance Bands",
        "Anchor heavy band at eye height. Pull band to forehead with elbows high, externally rotate wrists 90 degrees, and press straight overhead into a 'Y' against heavy elastic load."
    ),
    (
        "Resistance Band Cross-Body Lateral Raise with 3-Second Pause",
        8.6,
        "Resistance Bands",
        "Anchor heavy band at opposite foot, grip handle across body, raise arm out to side to 90 degrees, hold peak contraction for 3 seconds, and lower under 4-second tempo."
    ),
    (
        "Dual Resistance Band Standing Overhead Iron Cross Hold (20s)",
        8.9,
        "Resistance Bands",
        "Stand on two heavy bands, raise arms laterally to cross position (90 degrees abduction), and hold arms horizontal against intense downward elastic pull for 20 seconds."
    ),
    (
        "Resistance Band Bent-Over Reverse Fly with Top Pulse Ladder",
        8.6,
        "Resistance Bands",
        "Step on heavy band, hinge 75 degrees forward, raise arms laterally, and perform 5 micro-pulses at peak contraction on every rep to push posterior deltoids to failure."
    ),
    (
        "Resistance Band Standing Cuban Press with Heavy Band",
        8.7,
        "Resistance Bands",
        "Upright row heavy band to chest with wide elbows, externally rotate forearms upward 90 degrees against strong elastic pull, press overhead, and reverse strictly."
    ),
    (
        "Resistance Band Single-Arm Standing Overhead Press with Lateral Lean",
        8.5,
        "Resistance Bands",
        "Anchor heavy band under same-side foot, lean torso slightly away to optimize deltoid line of pull, and press overhead to full lockout against progressive tension."
    ),
    (
        "Resistance Band 90/90 External Rotation with Extended Lever",
        8.6,
        "Resistance Bands",
        "Abduct arm to 90 degrees with elbow straight, rotate arm externally against band tension across 90-degree arc, training supraspinatus and infraspinatus with long lever arm."
    ),
    (
        "Resistance Band Overhead Shrug to Planche Push-Up Combo",
        8.8,
        "Resistance Bands",
        "Perform 10 overhead band shrugs, drop to floor immediately, and execute 8 pseudo planche push-ups with forward lean to combine scapular elevation with anterior delt drive."
    ),
    (
        "Resistance Band Lateral Raise Drop Set (Heavy to Light Band)",
        8.7,
        "Resistance Bands",
        "Perform 10 lateral raises with a heavy band to near-failure, immediately switch to a medium band for 10 reps, and finish with a light band for 10 reps without rest."
    ),

    # --- Advanced Bodyweight & Hybrid Home Movements ---
    (
        "Wall-Supported Handstand Push-Up with Hands on Books (Deficit)",
        9.1,
        "Bodyweight",
        "Place hands on two 4-inch firm books against wall. Descend below hand level until collarbones tap books, pressing out of the bottom dead-stop to full lockout."
    ),
    (
        "Planche Lean Push-Up with Feet on Wall (Horizontal Lever)",
        9.0,
        "Bodyweight",
        "Place feet against wall at hip height in a horizontal plank. Lean shoulders 6 inches ahead of wrists and perform push-ups, keeping body parallel to floor throughout."
    ),
    (
        "Feet-Elevated Pike Push-Up to Handstand Kick-Up Transfer",
        8.9,
        "Bodyweight",
        "Perform a deep feet-elevated pike push-up, press to top, hop feet off chair, and kick straight into a brief wall handstand before stepping back to chair."
    ),
    (
        "Backpack 30 lb Standing Bradford Press (Over-the-Head Arc)",
        8.8,
        "Backpack-weighted",
        "Hold 30 lb backpack at collarbones. Press just high enough to clear head, lower behind neck to upper traps, press back over head, and lower to front in continuous cycles."
    ),
    (
        "Single-Arm Resistance Band Overhead Snatch Press",
        8.6,
        "Resistance Bands",
        "Anchor band at foot, pull handle from floor to shoulder in one fluid high pull, punch overhead into lockout, and lower slowly under eccentric deltoid tension."
    ),
    (
        "Bear Plank to Handstand Push-Up Wall Walk Dynamic Flow",
        8.7,
        "Bodyweight",
        "Start in bear plank, walk hands and feet up wall into vertical handstand, perform 1 strict handstand push-up, walk down to bear plank, and repeat continuously."
    ),
    (
        "Backpack 40 lb Floor Chest-Supported Incline Rear Delt Row",
        8.6,
        "Backpack-weighted",
        "Position chest against backrest of an angled chair holding 40 lb pack. Row pack with elbows flared wide at 90 degrees, holding peak rear-delt squeeze for 2 seconds."
    ),
    (
        "Freestanding Pike Handstand Shoulder Taps on Floor",
        9.0,
        "Bodyweight",
        "In a steep floor pike with toes on tiptoes, shift weight completely to one arm and tap opposite shoulder, maintaining balance without falling for 10 reps."
    ),
    (
        "Resistance Band High-Velocity Shadow Boxing with Deltoid Focus",
        8.4,
        "Resistance Bands",
        "Anchor band around upper back, throw rapid straights, hooks, and uppercuts against heavy resistance for 3 minutes, building muscular endurance in deltoid heads."
    ),
    (
        "Backpack 35 lb Standing Overhead Push Press to Slow Negative",
        8.9,
        "Backpack-weighted",
        "Push press a 35 lb backpack overhead using leg drive, then lower the pack from overhead to collarbones across 5 slow eccentric seconds under pure anterior delt control."
    ),
    (
        "Wall-Facing Handstand Isometric Single-Arm Post Hold",
        9.2,
        "Bodyweight",
        "In a vertical wall-facing handstand, peel one hand off floor and post onto fingertips or hover for 5 seconds per arm, exposing shoulder joint to extreme axial load."
    ),
    (
        "Pseudo Planche Push-Up on Elevated Blocks (Deficit)",
        9.0,
        "Bodyweight",
        "Place hands on 3-inch blocks at waist level. Lean forward aggressively, lower chest below block level, and press up into full protracted lockout."
    ),
    (
        "Backpack 25 lb Lateral Fly to Overhead Arc Continuous Flow",
        8.7,
        "Backpack-weighted",
        "Raise 25 lb pack laterally to 90 degrees, arc arms straight overhead until pack is locked out, reverse arc laterally back to hips under unbroken tension."
    ),
    (
        "Resistance Band Standing Archer Pull-Apart with 5-Second Hold",
        8.5,
        "Resistance Bands",
        "Draw band like an archer pulling a 70 lb bowstring. Hold full draw with rear elbow pulled far behind torso for 5 full seconds to maximize rear-delt hypertrophy."
    ),
    (
        "Doorframe Incline Single-Arm Handstand Lean Press",
        8.8,
        "Bodyweight",
        "Press one palm against top of doorframe at 45 degrees with feet stepped back. Drive upward into frame with maximum effort for 15 seconds of isometric deltoid recruitment."
    ),
    (
        "Backpack 35 lb Z-Press to Front Scaption Hold",
        8.9,
        "Backpack-weighted",
        "Sit on floor with legs straddled. Press 35 lb pack overhead, lower to eye level, hold isometrically for 3 seconds in scaption plane, and lower to lap."
    ),
    (
        "Wall Handstand Push-Up Negative with Weighted Backpack (15 lbs)",
        9.2,
        "Backpack-weighted",
        "Wear a 15 lb backpack, kick into wall handstand, and perform slow 6-second eccentric lowering to floor, building supramaximal vertical pushing strength."
    ),
    (
        "Resistance Band Double-Under Overhead Walkout",
        8.6,
        "Resistance Bands",
        "Anchor heavy band low, press handles overhead, and walk forward 5 paces against progressive rearward pull, forcing rotator cuff to stabilize against extension."
    ),
    (
        "Feet-Elevated Deficit Pike Push-Up on Chairs (8-Inch Deficit)",
        8.9,
        "Bodyweight",
        "Place feet on high table and hands on two sturdy chairs. Descend deep between chairs until ears pass hands, pressing through full overhead extension."
    ),
    (
        "Backpack 45 lb Clean and Push Press Wave Intervals",
        8.9,
        "Backpack-weighted",
        "Clean 45 lb backpack from floor to chest, push press overhead, lower to floor, and cycle for 10 unbroken reps, testing whole-body vertical pressing stamina."
    ),
    (
        "Tuck Planche to Pike Handstand Transition Attempt",
        9.2,
        "Bodyweight",
        "Hold tuck planche on parallettes, push hips upward into a pike handstand without touching feet to floor, and lower back to tuck planche under control."
    ),
    (
        "Resistance Band High-Anchor Reverse Cross-Over Fly",
        8.5,
        "Resistance Bands",
        "Anchor dual bands overhead, cross handles, and pull downward and outward in wide reverse fly arc, holding peak posterior deltoid contraction."
    ),
    (
        "Backpack 30 lb Single-Arm Push Press (Right Arm)",
        8.8,
        "Backpack-weighted",
        "Dip hips and drive 30 lb backpack overhead with right arm, stabilizing through core and locking out with head pushed through."
    ),
    (
        "Backpack 30 lb Single-Arm Push Press (Left Arm)",
        8.8,
        "Backpack-weighted",
        "Dip hips and drive 30 lb backpack overhead with left arm, ensuring balanced unilateral power development and rotator cuff stabilization."
    ),
    (
        "Floor Pseudo Planche Lean Hold with 4-Inch Forward Shift (30s)",
        8.8,
        "Bodyweight",
        "In push-up plank, shift shoulders 4 inches forward of wrists, turn fingers back, and hold maximum protraction for 30 unbroken seconds."
    ),
    (
        "Resistance Band Standing Scapular Y-Press to Lateral Drop",
        8.6,
        "Resistance Bands",
        "Press band handles diagonally into overhead 'Y', lower arms outward into cross position, hold 2 seconds, and return to shoulders under control."
    ),
    (
        "Wall-Supported Handstand Push-Up with Close-Grip Diamond Hands",
        9.1,
        "Bodyweight",
        "Kick into wall handstand with hands set narrow in diamond alignment. Lower forehead to hands and press out, shifting immense force to anterior deltoids and triceps."
    ),
    (
        "Backpack 25 lb Prone Incline Reverse Fly with Pronated Grip",
        8.5,
        "Backpack-weighted",
        "Lie chest-supported on incline chair, raise 25 lb bags outward with palms facing down, squeezing posterior deltoids and infraspinatus at top."
    ),
    (
        "Reverse Tabletop Crab Hold with Overhead Single-Arm Reach",
        8.4,
        "Bodyweight",
        "In high reverse crab, press through supporting shoulder and reach opposite arm straight overhead, holding 10 seconds per side to condition posterior stabilizers."
    ),
    (
        "Resistance Band Standing High-Tension Cuban Press Waves",
        8.7,
        "Resistance Bands",
        "Perform upright row, rotate forearms to vertical, press overhead against heavy band, lower to 90 degrees, rotate forward, and cycle 8 reps unbroken."
    ),
]

adv_gym_data = [
    # --- Advanced Olympic, Free-Weight & Cable Deltoid Overload (Gym) ---
    (
        "Barbell Standing Overhead Military Press (Bodyweight Load)",
        9.2,
        "Barbell",
        "Clean or unrack Olympic barbell loaded to athlete's bodyweight. Press strictly from clavicles to full lockout overhead with zero hip dip or backward spine lean."
    ),
    (
        "Barbell Standing Push Press (120% Bodyweight Overload)",
        9.1,
        "Barbell",
        "Load barbell with 120% bodyweight. Dip knees 3 inches, drive explosively through heels, and punch bar overhead, absorbing lockout with stiff core and elevated shoulders."
    ),
    (
        "Dumbbell Seated Heavy Overhead Press (80 lb+ Pairs)",
        9.0,
        "Dumbbells",
        "Kick 80 lb dumbbells to shoulders, sit tall on upright bench, and press vertically to full extension without arching back, lowering under 3-second tempo."
    ),
    (
        "Dumbbell Standing Heavy Arnold Press (70 lb Pairs)",
        8.9,
        "Dumbbells",
        "Press heavy dumbbells overhead with full 180-degree forearm rotation from chin to lockout, recruiting all three deltoid heads through multi-planar overload."
    ),
    (
        "Barbell Behind-the-Neck Snatch-Grip Push Press",
        9.0,
        "Barbell",
        "Rest bar on upper traps with wide snatch grip. Dip and drive bar aggressively overhead to wide lockout, demanding exceptional thoracic mobility and delt strength."
    ),
    (
        "Cable Single-Arm Behind-the-Back Lateral Raise with 3-Second Hold",
        8.8,
        "Cable",
        "Set low cable behind back, grasp handle without cuff, raise arm to 90 degrees, hold 3 full seconds at peak parallel position, and lower under 4-second tempo."
    ),
    (
        "Cable Dual-Pulley Cross-Over Lateral Raise with Heavy Progressive Weight Stack",
        8.7,
        "Cable",
        "Cross low cables in front of thighs, raise arms out to sides against heavy stack tension, controlling eccentric descent across the entire arc."
    ),
    (
        "Barbell Standing Klokov Press (Behind-the-Neck Snatch Press from Deep Squat)",
        9.2,
        "Barbell",
        "Descend into a full bottom overhead squat, press barbell from behind neck to full overhead lockout while remaining in bottom squat position, building elite mobility."
    ),
    (
        "Dumbbell Standing Lu Raise with 25 lb Plates (Circumduction)",
        8.8,
        "Dumbbells",
        "Hold 25 lb Olympic bumper plates or dumbbells. Raise arms laterally outward and continue arcing upward to touch plates overhead, lowering in wide 180-degree circle."
    ),
    (
        "Barbell Snatch-Grip High Pull from Hang (Explosive Triple Extension)",
        8.9,
        "Barbell",
        "Hold bar at mid-thigh in wide snatch grip. Explode through hips and ankles, pulling bar to sternum with elbows flared high and wide, building posterior and lateral delts."
    ),
    (
        "Dumbbell Incline Chest-Supported Heavy Rear Delt Row (80 lb Pairs)",
        8.8,
        "Dumbbells",
        "Lie chest-down on 30-degree incline bench with 80 lb dumbbells. Row weights with elbows flared at 90 degrees to load rear deltoids under extreme mechanical tension."
    ),
    (
        "Barbell Landmine Single-Arm Push Press with Heavy Load",
        8.9,
        "Barbell",
        "Load landmine bar heavily. Dip hips and punch bar upward at 45 degrees, transferring rotational kinetic energy into anterior deltoid and serratus anterior."
    ),
    (
        "Cable High-Pulley Heavy Face Pull with External Rotation Hold",
        8.7,
        "Cable",
        "Set heavy weight on cable stack. Pull rope to forehead with high elbows, rotate wrists backward past ears, and hold peak contraction for 3 seconds."
    ),
    (
        "Dumbbell Seated 6-Way Lateral Raise Complex with 15 lb Pairs",
        8.8,
        "Dumbbells",
        "Raise laterally, bring together in front, raise overhead, lower to front, spread out to sides, and lower to hips for 8 brutal cycles without dropping weights."
    ),
    (
        "Smith Machine Behind-the-Neck Shoulder Press (Strict Dead-Stop)",
        8.7,
        "Machine",
        "Set Smith bar behind neck on safety pins at ear level. Press from dead-stop to full lockout overhead, removing stretch reflex to build raw starting strength."
    ),
    (
        "Barbell Seated Pin Press from Eye Level (Overhead Power)",
        9.0,
        "Barbell",
        "Set pins at eye height in rack. Sit tall, press heavy bar from dead-stop off pins to full lockout overhead, developing maximal mid-range vertical pressing force."
    ),
    (
        "Dumbbell Standing Side-Lying Lateral Raise on 45-Degree Incline",
        8.8,
        "Dumbbells",
        "Lie on side on 45-degree incline bench, raise dumbbell from hip to 90 degrees against gravity, eliminating momentum to purely isolate lateral deltoid fibers."
    ),
    (
        "Cable Standing Diagonal D2 Flexion Pattern (Heavy Stack)",
        8.6,
        "Cable",
        "Grasp low cable at opposite hip, pull diagonally upward and across body into overhead extension and external rotation, training athletic functional throwing lines."
    ),
    (
        "EZ-Bar Heavy Upright Row with Snatch Grip to Collarbones",
        8.7,
        "EZ-Bar",
        "Grip outer knurling of heavy EZ-bar. Pull bar smoothly to collarbones with elbows flared high, keeping elbows above wrists throughout entire range of motion."
    ),
    (
        "Dumbbell Seated Cuban Press with 35 lb Dumbbells",
        8.8,
        "Dumbbells",
        "Upright row 35 lb dumbbells to chest with wide elbows, externally rotate forearms 90 degrees to vertical, press overhead, and reverse under strict control."
    ),
    (
        "Machine Standing Lateral Deltoid Raise with Stack Drop Set",
        8.8,
        "Machine",
        "Perform 8 reps with full machine stack, drop pin 2 plates, perform 8 reps, drop 2 plates, perform 8 reps to failure, driving lateral deltoids to complete exhaustion."
    ),
    (
        "Barbell Standing Bradford Press with 95 lbs Unbroken (10 Reps)",
        8.9,
        "Barbell",
        "With 95 lbs, press from collarbones just over crown of head to behind neck, and immediately back to front for 10 unbroken cycles under continuous time-under-tension."
    ),
    (
        "Cable Low-Pulley Prone Rear Delt Fly on Incline Bench (Dual Stack)",
        8.8,
        "Cable",
        "Lie chest-down on incline bench straddling two low cable stacks. Fly arms outward to horizontal, holding peak contraction for 2 seconds against constant tension."
    ),
    (
        "Barbell Standing Strict Overhead Press with Chains (Variable Resistance)",
        9.1,
        "Barbell",
        "Hang 20 lb chains on each side of barbell. Press overhead as chain links lift off floor, progressively increasing load toward lockout to overload triceps and delts."
    ),
    (
        "Dumbbell Standing Overhead Farmer Carry (70 lb Pairs, 50 Meters)",
        9.0,
        "Dumbbells",
        "Lock two 70 lb dumbbells straight overhead with locked elbows. Walk 50 meters with neutral spine, forcing shoulder stabilizers to resist massive axial displacement."
    ),
    (
        "Barbell Clean and Strict Military Press Wave (85% 1RM)",
        9.1,
        "Barbell",
        "Power clean heavy bar from floor to front rack, pause 2 seconds, and execute a strict military press overhead, testing full-body vertical power and deltoid drive."
    ),
    (
        "Cable Standing Face Pull to Overhead External Press Complex",
        8.7,
        "Cable",
        "Pull rope to forehead with elbows high, rotate forearms to vertical, press overhead against horizontal cable vector, and reverse under 4-second tempo."
    ),
    (
        "Dumbbell Incline Prone Y-T-W-L Circuit with 15 lb Pairs",
        8.8,
        "Dumbbells",
        "Lie chest-supported on 45-degree incline. Perform 6 Y-raises, 6 T-raises, 6 W-rotations, and 6 L-extensions with 15 lb dumbbells without dropping weights."
    ),
    (
        "Barbell Snatch-Grip Overhead Shrug in Power Rack",
        8.9,
        "Barbell",
        "Lock barbell overhead in snatch grip with arms straight. Elevate shoulders toward ears with heavy load, hold 2 seconds, and lower to strengthen upward rotators."
    ),
    (
        "Dumbbell Standing Lateral-to-Front Fly Sweep Complex",
        8.8,
        "Dumbbells",
        "Raise dumbbells laterally to 90 degrees, sweep arms horizontally forward to touch dumbbells in front, sweep back laterally, and lower under 3-second control."
    ),
]

if __name__ == "__main__":
    print(f"Advanced Home: {len(adv_home_data)}")
    print(f"Advanced Gym: {len(adv_gym_data)}")
    print(f"Advanced Total: {len(adv_home_data) + len(adv_gym_data)}")
    for name, score, eq, inst in adv_home_data + adv_gym_data:
        assert 8.1 <= score <= 9.2, f"Score {score} out of bounds for {name}"
        assert "1.5" not in inst and "1.5" not in name, f"1.5 protocol found in {name}"
    print("All advanced scores within 8.1 - 9.2 range and no 1.5 protocol!")
