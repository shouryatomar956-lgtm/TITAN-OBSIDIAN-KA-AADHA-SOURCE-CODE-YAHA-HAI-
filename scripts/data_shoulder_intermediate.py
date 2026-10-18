#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 6: SHOULDER - INTERMEDIATE TIER (Total: 152 Exercises)
# 106 Home (70%) + 46 Gym (30%)
# Validated Overhead Pushing, Deltoid Hypertrophy, Rotator Cuff Dynamics
# Scientific Score Bounds: 6.1 to 8.0
# Equipment: Bodyweight, Backpack-weighted, Resistance Bands, Dumbbells, Barbell, Cable, Machine, EZ-Bar
# ==============================================================================

int_home_data = [
    # --- Floor & Elevated Pike Push-Up Progressions (Home) ---
    (
        "Standard Floor Pike Push-Up (Tripod Head Touch)",
        6.8,
        "Bodyweight",
        "From a short downward-dog stance with hips elevated high, lower crown of head forward of hands forming an equilateral tripod. Press back through palms while elevating scapulae to isolate anterior and medial deltoids."
    ),
    (
        "Feet-Elevated Chair Pike Push-Up (60-Degree Angle)",
        7.3,
        "Bodyweight",
        "Place toes on a sturdy chair with hands on floor shoulder-width apart, stacking hips directly over shoulders. Lower forehead toward floor between hands, pressing up under strict 3-second eccentric tempo."
    ),
    (
        "Box-Elevated Pike Push-Up with Deep Shoulder Flexion",
        7.4,
        "Bodyweight",
        "Elevate feet on an 18-inch box, walk hands back until torso is near-vertical, and lower forehead forward of fingertips. Push the floor away into full lockout to maximize anterior deltoid motor unit recruitment."
    ),
    (
        "Deficit Floor Pike Push-Up on Books or Yoga Blocks",
        7.5,
        "Bodyweight",
        "Place hands on two equal-height sturdy book stacks or blocks to create a 3-inch deficit. Lower head past the level of hands to achieve deep anterior deltoid stretch before pressing aggressively to full extension."
    ),
    (
        "Wall-Assisted Incline Handstand Push-Up Negative (Eccentric)",
        7.6,
        "Bodyweight",
        "Kick up against a wall with back to surface in a handstand. Lower head smoothly to floor across 5 slow seconds, kick down to reset, and repeat to build maximal eccentric overhead pressing tolerance."
    ),
    (
        "Wall-Facing Handstand Isometric Shoulder Lockout Hold (30s)",
        7.2,
        "Bodyweight",
        "Walk feet up wall with nose facing surface until body forms a straight vertical line. Actively push shoulders toward ears in maximum scapular elevation for 30 seconds to condition overhead joint integrity."
    ),
    (
        "Feet-Elevated Pike Push-Up with Single-Leg Extension",
        7.5,
        "Bodyweight",
        "In a feet-elevated pike position, lift one leg straight in the air aligned with torso. Press through shoulders with reduced base of support, alternating legs each set to challenge unilateral stability."
    ),
    (
        "Wide-Grip Floor Pike Push-Up for Lateral Deltoids",
        7.0,
        "Bodyweight",
        "Set hands wide at one and a half times shoulder-width in pike stance. Flare elbows outward at 60 degrees while descending, shifting more mechanical load to the lateral deltoid fibers and upper pectoralis."
    ),
    (
        "Diamond Grip Incline Pike Push-Up",
        6.9,
        "Bodyweight",
        "Form a diamond shape with thumbs and index fingers on floor in pike stance. Lower forehead directly to hands, emphasizing anterior deltoids and triceps lateral head."
    ),
    (
        "Pike Push-Up to Downward Dog Shoulder Shrug Flow",
        6.7,
        "Bodyweight",
        "Perform a full pike push-up, push back into downward dog, and perform an overhead scapular shrug at lockout, training serratus anterior and deltoid integration."
    ),

    # --- Weighted Backpack Overhead Pressing & Deltoid Loading (Home) ---
    (
        "Backpack 25 lb Standing Strict Overhead Press",
        7.2,
        "Backpack-weighted",
        "Hold a 25 lb loaded backpack by outer edges at collarbones. Brace core, squeeze glutes, and press vertically to full lockout beside ears without leaning back, lowering under 3-second control."
    ),
    (
        "Backpack 30 lb Seated Strict Shoulder Military Press",
        7.4,
        "Backpack-weighted",
        "Sit tall on a bench or chair with feet planted firmly. Press a 30 lb backpack from upper chest to full lockout overhead, isolating anterior deltoids without assistance from leg drive."
    ),
    (
        "Backpack 20 lb Single-Arm Strict Overhead Press",
        7.3,
        "Backpack-weighted",
        "Grip the top handle of a 20 lb backpack in one hand at shoulder level. Press straight overhead while engaging contralateral obliques to prevent spinal lateral flexion."
    ),
    (
        "Backpack 35 lb Standing Push Press with Hip Dip",
        7.5,
        "Backpack-weighted",
        "Hold a 35 lb backpack at chest. Dip hips 3 inches into a shallow quarter-squat and drive explosively through heels, transferring kinetic energy to lock out the heavy pack overhead."
    ),
    (
        "Backpack 15 lb Standing Lateral Raise (Alternating)",
        6.9,
        "Backpack-weighted",
        "Hold light 10-15 lb backpacks or loaded grocery bags in hands. Raise one arm in scapular plane to parallel with floor, hold 1 second, and lower under control before alternating."
    ),
    (
        "Backpack 25 lb Two-Handed Front Scaption Raise",
        6.8,
        "Backpack-weighted",
        "Hold a 25 lb backpack by top and bottom handles with straight arms. Raise forward and slightly outward to eye level at 30 degrees, pausing for peak anterior delt tension."
    ),
    (
        "Backpack 30 lb Bent-Over Wide-Elbow Rear Delt Row",
        7.1,
        "Backpack-weighted",
        "Hinge forward 60 degrees with flat spine. Row a 30 lb backpack toward collarbones with elbows flared wide at 90 degrees to load posterior deltoids and infraspinatus."
    ),
    (
        "Backpack 25 lb Upright Row to Sternum with Wide Elbows",
        7.0,
        "Backpack-weighted",
        "Grip backpack handle at thighs with hands shoulder-width. Pull elbows upward toward ceiling until hands reach mid-chest, keeping elbows higher than forearms to isolate lateral delts."
    ),
    (
        "Backpack 20 lb Kneeling Half-Kneeling Overhead Press",
        7.3,
        "Backpack-weighted",
        "Kneel with one knee up and opposite knee on mat. Hold a 20 lb pack on kneeling side and press overhead, stabilizing through pelvis and rotary shoulder stabilizers."
    ),
    (
        "Backpack 25 lb Overhead Carry Shuttle Intervals (30s)",
        7.1,
        "Backpack-weighted",
        "Lock a 25 lb backpack directly overhead with both arms straight and ribs tucked. Walk briskly back and forth for 30 seconds, maintaining continuous isometric shoulder girdle stabilization."
    ),
    (
        "Backpack 15 lb Prone Incline Rear Delt Fly on Bed Edge",
        6.8,
        "Backpack-weighted",
        "Lie chest-down across a firm bed or couch with 15 lb weighted bags. Raise arms horizontally to sides with slight elbow bend, holding 2 seconds to isolate rear delts."
    ),
    (
        "Backpack 20 lb Single-Arm Upright Row to Collarbone",
        7.0,
        "Backpack-weighted",
        "Grip top strap of a 20 lb backpack in right hand. Drive elbow toward ceiling, raising pack to mid-chest while keeping torso upright to isolate right lateral deltoid."
    ),
    (
        "Backpack 30 lb Clean and Strict Shoulder Press",
        7.4,
        "Backpack-weighted",
        "Clean a 30 lb backpack from floor to front rack position at shoulders in one fluid motion, pause, and press overhead to full lockout under strict anterior delt drive."
    ),
    (
        "Backpack 20 lb Halo Circle to Overhead Press Combo",
        7.2,
        "Backpack-weighted",
        "Circle a 20 lb pack clockwise around head, return to chest, press vertically overhead, lower, circle counter-clockwise, and repeat for fluid multi-planar deltoid training."
    ),
    (
        "Backpack 15 lb Front Scaption Hold to Lateral Fly Flow",
        7.1,
        "Backpack-weighted",
        "Raise 15 lb pack to eye level, spread arms horizontally outward in a reverse fly motion, bring back to center, and lower under 3-second eccentric control."
    ),

    # --- Resistance Band Deltoid Hypertrophy & Rotator Cuff Protocols (Home) ---
    (
        "Heavy Resistance Band Standing Overhead Press (Under Foot)",
        7.2,
        "Resistance Bands",
        "Anchor heavy loop band under feet, rack handles at shoulders, and press overhead against progressive elastic tension that peaks at full lockout, maximizing deltoid peak tension."
    ),
    (
        "Resistance Band High-Rep Face Pull with Double External Rotation",
        7.5,
        "Resistance Bands",
        "Anchor band at eye level. Pull band toward eyes while pulling hands wide apart and rotating fists backward to parallel with ears, holding peak contraction for 2 full seconds."
    ),
    (
        "Resistance Band Standing Lateral Raise (Cross-Body Anchor)",
        7.4,
        "Resistance Bands",
        "Anchor band under left foot and hold handle in right hand across body. Raise arm out to side to 90 degrees against steady diagonal resistance, emphasizing lateral deltoid stretch."
    ),
    (
        "Resistance Band Prone Y-Raise with External Rotation",
        6.9,
        "Resistance Bands",
        "Lie prone, loop light band around wrists with thumbs pointed up. Raise arms into a 'Y' shape off floor while pulling wrists apart, taxing lower traps and rear deltoids."
    ),
    (
        "Resistance Band 90/90 External Shoulder Rotation at Abduction",
        7.3,
        "Resistance Bands",
        "Elevate elbow to shoulder height (90 degrees abduction). Rotate forearm from horizontal to vertical against band resistance, strengthening infraspinatus and teres minor in throwing position."
    ),
    (
        "Resistance Band Cuban Press Complete Complex",
        7.4,
        "Resistance Bands",
        "Stand on band, upright row to chest with wide elbows, externally rotate forearms 90 degrees to vertical, press overhead, and reverse sequence under slow control."
    ),
    (
        "Resistance Band Diagonal D2 Flexion Pattern (PNF Shoulder)",
        7.1,
        "Resistance Bands",
        "Anchor band low at left hip. Grasp handle with right hand and pull diagonally across body up and to the right into overhead extension and external rotation, training functional fascial lines."
    ),
    (
        "Resistance Band Diagonal D1 Flexion Pattern (PNF Shoulder)",
        7.0,
        "Resistance Bands",
        "Anchor band low at right. Grasp with right hand and pull diagonally across body up toward left ear into shoulder flexion and external rotation for balanced rotator cuff recruitment."
    ),
    (
        "Resistance Band Bent-Over Reverse Fly with Top Peak Squeeze",
        7.2,
        "Resistance Bands",
        "Step on center of band, cross handles, hinge forward 70 degrees. Raise arms out to sides with soft elbows, squeezing rear deltoids and rhomboids for 2 full seconds at peak."
    ),
    (
        "Resistance Band Upright Row to Lateral Raise Drop Set",
        7.3,
        "Resistance Bands",
        "Perform 10 upright rows to chest with band, then immediately step slightly narrower and perform 10 lateral raises without resting to push lateral delts into deep metabolic fatigue."
    ),
    (
        "Resistance Band High-Angle Overhead Scapular Shrugs",
        6.7,
        "Resistance Bands",
        "Press band handles overhead, lock elbows, and elevate and depress scapulae rhythmically against band tension to build upward scapular rotation capacity."
    ),
    (
        "Resistance Band Seated Reverse Hug Fly",
        7.1,
        "Resistance Bands",
        "Sit with legs out, loop band on feet, cross bands, and pull hands laterally outward in a reverse hugging motion with elbows slightly bent, keeping chest upright."
    ),
    (
        "Resistance Band Standing Archer Pull to Full Draw",
        7.2,
        "Resistance Bands",
        "Hold band at arm's length. Draw right elbow straight back horizontally past shoulder while pushing left hand forward, engaging posterior deltoid against peak elastic load."
    ),
    (
        "Resistance Band Standing Scaption Raise with Thumbs Up",
        6.9,
        "Resistance Bands",
        "Step on band, raise arms forward at 30-degree angle from body with thumbs pointed toward ceiling up to eye level, prioritizing supraspinatus without impingement."
    ),
    (
        "Resistance Band Overhead Band Dislocates (Controlled Dynamic)",
        6.4,
        "Resistance Bands",
        "Hold band wide with straight arms. Pass band from front of waist up overhead and down behind back in a continuous fluid circle, expanding shoulder girdle active mobility."
    ),

    # --- Calisthenic Levers, Bodyweight Planks & Shoulder Holds (Home) ---
    (
        "Planche Lean on Floor with Maximum Scapular Protraction",
        7.7,
        "Bodyweight",
        "Assume push-up plank, turn hands slightly outward, and lean shoulders forward past wrists until hands align with ribs. Actively push floor away into full protraction for 20-30 seconds."
    ),
    (
        "Feet-Elevated Planche Lean on 12-Inch Platform",
        7.9,
        "Bodyweight",
        "Place feet on a 12-inch platform, lean shoulders forward 6 inches past wrists, and lock arms completely straight, shifting immense shear loading onto anterior deltoids and biceps tendons."
    ),
    (
        "Tuck Planche Attempt on Household Chairs / Push-Up Bars",
        8.0,
        "Bodyweight",
        "Grip sturdy chair seats or low parallettes, lock elbows straight, lean forward, and tuck knees toward chest, lifting toes off floor for 5-10 second isometric holds."
    ),
    (
        "Wall-Facing Handstand Shoulder Taps (Slow Alternating)",
        7.8,
        "Bodyweight",
        "Hold handstand against wall with stomach facing surface. Shift weight to left arm, tap left shoulder with right hand, plant hand, and alternate smoothly across 10 total reps."
    ),
    (
        "Dolphin Pose Forearm Shoulder Pressing Pulses",
        6.8,
        "Bodyweight",
        "From forearm plank, walk feet forward into an inverted-V dolphin pose. Press through forearms to lift head away from floor, pulsing shoulders into deep active flexion."
    ),
    (
        "Side Plank with Overhead Arm Abduction Pulse",
        6.7,
        "Bodyweight",
        "In a full side plank on palm, raise top arm to vertical and pulse arm backward against gravity, training both supporting and elevated shoulder complexes simultaneously."
    ),
    (
        "Crab Walk Scapular Retraction and Depression Shuttles",
        6.6,
        "Bodyweight",
        "Support body in reverse crab stance with hands behind hips. Walk 15 paces forward and back keeping chest open and shoulders actively depressed away from ears."
    ),
    (
        "Reverse Tabletop Shoulder Extension Stretch and Press",
        6.5,
        "Bodyweight",
        "Sit on floor with hands behind hips, fingers pointing forward. Lift hips until torso is parallel to floor, driving through palms into shoulder extension to open anterior capsule."
    ),
    (
        "Wall-Supported Scapular Depressions from Inverted Hang",
        7.1,
        "Bodyweight",
        "Place feet up on wall in a partial handstand. Shrug shoulders toward ears, then press floor away to elevate body, training scapular upward rotators under load."
    ),
    (
        "Prone Floor Swimmer with 5 lb Household Object Handoff",
        6.9,
        "Backpack-weighted",
        "Lie prone, hold a 5 lb object in right hand, sweep arms out wide, transfer object behind lower back to left hand, sweep forward, and transfer in front of head continuously."
    ),
    (
        "Incline Push-Up to Pike Hop-Through Combo",
        7.1,
        "Bodyweight",
        "Perform an incline push-up on a bench, pop feet into a high pike, hold 2 seconds under vertical deltoid load, step back into plank, and repeat in rhythmic cycles."
    ),
    (
        "Floor Pseudo Planche Push-Up with Hands at Waist",
        7.8,
        "Bodyweight",
        "Set hands at waist level with fingers pointing backward/sideways. Lean forward aggressively and perform push-ups, keeping elbows tucked to maximally load anterior delts."
    ),
    (
        "Backpack 25 lb Overhead Tri-Press (Front / Neutral / Wide)",
        7.3,
        "Backpack-weighted",
        "Press a 25 lb pack overhead with narrow grip for 5 reps, neutral grip for 5 reps, and wide edge grip for 5 reps without putting pack down to induce deep metabolic fatigue."
    ),
    (
        "Resistance Band Face Pull to Y-Press Transition",
        7.5,
        "Resistance Bands",
        "Perform a face pull to forehead with high elbows, then immediately extend arms overhead into a high 'Y' against elastic tension before reversing under slow control."
    ),
    (
        "Resistance Band Overhead Hold with Lateral Step Shuffles",
        7.1,
        "Resistance Bands",
        "Press band handles overhead, lock elbows, and shuffle 10 paces left and 10 right across floor while resisting band pull into shoulder adduction."
    ),
    (
        "Doorframe Supported Single-Arm Incline Pike Press",
        7.2,
        "Bodyweight",
        "Stand angled inside doorframe, press one palm upward against top frame while leaning body weight forward to generate high unilateral anterior deltoid force."
    ),
    (
        "Backpack 20 lb High Incline Chest-Supported Rear Delt Fly",
        7.0,
        "Backpack-weighted",
        "Straddle an inclined chair backwards with chest supported. Raise 20 lb loaded bags outward with straight arms, holding peak contraction for 2 seconds."
    ),
    (
        "Prone Incline Floor Y-T-W Arm Series (10 Reps Each)",
        6.8,
        "Bodyweight",
        "Lie face down on a mat. Execute 10 strict prone Y-raises, immediately followed by 10 T-raises, and 10 W-external rotations without resting to exhaust rear deltoid and rotator cuff."
    ),
    (
        "Wall Climber Handstand to Shoulder Tap Flow",
        7.7,
        "Bodyweight",
        "Walk feet up wall into vertical handstand, perform 4 alternating shoulder taps, walk feet down to plank, perform 1 pike push-up, and repeat for 3 continuous rounds."
    ),
    (
        "Resistance Band No-Money External Rotation with Mini-Band",
        6.7,
        "Resistance Bands",
        "Pin elbows to sides with mini-band around wrists. Pull forearms apart outward into maximal external rotation, hold 2 seconds, and release slowly to condition infraspinatus."
    ),
    (
        "Backpack 30 lb High Pull to Overhead Snatch Grip Press",
        7.5,
        "Backpack-weighted",
        "Hinge at hips, pull backpack explosively to chest level with flared elbows, and seamlessly punch pack overhead into full extension, controlling the eccentric descent."
    ),
    (
        "Standing Band-Resisted Overhead Iron Cross Hold",
        7.2,
        "Resistance Bands",
        "Stand on band, raise arms laterally to cross position (90 degrees abduction), and hold arms horizontal against band pull for 20-30 seconds of pure isometric lateral delt stress."
    ),
    (
        "Bear Crawl Clock Rotations with Straight Arm Posts",
        7.0,
        "Bodyweight",
        "In bear crawl with knees hovering, rotate hands and feet around a central pivot point like clock hands, pushing floor away through straight posted arms to condition stabilizers."
    ),
    (
        "Floor Pike Shoulder Taps with Alternating Reach",
        7.3,
        "Bodyweight",
        "In a steep floor pike stance, lift right hand to tap left shoulder, extend arm forward overhead, plant hand, and alternate left to right, maintaining level hips."
    ),
    (
        "Backpack 25 lb Z-Press on Floor (Legs Flat)",
        7.6,
        "Backpack-weighted",
        "Sit flat on floor with legs extended straight in a 'V' shape. Press 25 lb backpack from collarbones straight overhead without leaning back, demanding immense core and shoulder stability."
    ),
    (
        "Kneeling Resistance Band Arnold Press (Continuous Rotation)",
        7.1,
        "Resistance Bands",
        "Kneel on center of band, hold handles at chin with palms in. Rotate forearms outward while pressing overhead, finishing with palms forward at full extension."
    ),
    (
        "Backpack 20 lb Prone Overhead Arm Flutter Kicks",
        6.9,
        "Backpack-weighted",
        "Lie prone with chest lifted, hold 20 lb pack in hands hovering 3 inches off floor. Pulse arms up and down in small rhythmic flutters for 30 seconds to fatigue lower traps and delts."
    ),
    (
        "Standing Double Resistance Band Face Pull with High Flare",
        7.4,
        "Resistance Bands",
        "Anchor two heavy bands at face height. Pull handles toward ears while aggressively spreading elbows wide and backward, holding peak posterior delt squeeze."
    ),
    (
        "Wall-Facing Handstand Shrugs with Scapular Elevation",
        7.6,
        "Bodyweight",
        "In a wall-facing vertical handstand, shrug shoulders toward ears to push body higher up wall, then lower under control for 10 strict reps of upward rotator strengthening."
    ),
    (
        "Feet-Elevated Deficit Pike Push-Up (Deep Range)",
        7.7,
        "Bodyweight",
        "Place toes on couch and hands on 4-inch blocks. Lower crown of head between blocks below hand level, exploding up into full lockout for intense anterior delt work."
    ),
    (
        "Backpack 25 lb Standing Scapular Y-Press",
        7.2,
        "Backpack-weighted",
        "Grip backpack with wide grip, press diagonally upward and outward into a 'Y' configuration at 30 degrees, emphasizing lower trapezius and anterior deltoid fibers."
    ),
    (
        "Resistance Band Overhead External Rotation Walkouts",
        7.3,
        "Resistance Bands",
        "Anchor band behind, press handles overhead, and take 4 steps forward against band pull trying to pull arms backward, demanding intense rotator cuff stabilization."
    ),
    (
        "Prone Floor Swimmer Handstand Simulation Flow",
        6.8,
        "Bodyweight",
        "Lie prone, extend arms straight overhead, lift chest, rotate thumbs to ceiling, and maintain maximum overhead reach for 45 seconds of continuous postural contraction."
    ),
    (
        "Backpack 20 lb Lateral Crawl Shuttles in Bear Plank",
        7.1,
        "Backpack-weighted",
        "Wear a 20 lb backpack in bear plank. Scuttle laterally side-to-side across room, keeping back flat and shoulders actively depressed to build rotational resilience."
    ),
    (
        "Resistance Band High-Anchor Straight-Arm Overhead Lat and Delt Sweep",
        6.9,
        "Resistance Bands",
        "Anchor band overhead, grasp with straight arms, and pull hands downward in wide arcs to hips, controlling the eccentric recoil back overhead."
    ),
    (
        "Seated Floor Crab Reach to Opposite Shoulder Tap",
        6.7,
        "Bodyweight",
        "Lift into reverse crab, press through left shoulder, reach right hand across body to tap floor next to left hand, return, and alternate sides continuously."
    ),
    (
        "Backpack 30 lb Clean-to-Overhead Strict Press Wave",
        7.5,
        "Backpack-weighted",
        "Clean 30 lb backpack from floor, press overhead, lower to collarbones, lower to waist, and immediately cycle into next clean-and-press rep."
    ),
    (
        "Resistance Band Standing Scapular Clock Face Pulls",
        7.3,
        "Resistance Bands",
        "Pull band to eye level, then rotate wrists to 10 and 2 o'clock, 9 and 3 o'clock, and return, conditioning multi-angle rotator cuff stabilizers."
    ),
    (
        "Feet-Elevated Pike Isometric Head-Hover Hold (15s)",
        7.4,
        "Bodyweight",
        "In feet-elevated pike push-up, lower until forehead hovers 1 inch off floor. Hold isometrically for 15 seconds before pressing back up with max voluntary effort."
    ),
    (
        "Backpack 20 lb Single-Arm Lateral Raise with 3-Second Pause",
        7.2,
        "Backpack-weighted",
        "Hold 20 lb backpack in one hand, raise laterally to shoulder level, hold for 3 full seconds at peak parallel position, and lower under 4-second tempo."
    ),
    (
        "Resistance Band Overhead Double-Arm Pullover to Chest",
        7.0,
        "Resistance Bands",
        "Anchor band high behind, pull handles overhead forward and downward to chest level with straight arms, squeezing serratus anterior and front delts."
    ),
    (
        "Standing Isometric Doorway Shoulder Abduction Push",
        6.5,
        "None",
        "Stand inside doorframe, place backs of wrists against both side frames at shoulder height, and push outward into frame with 80% effort for 15 seconds."
    ),
    (
        "Prone Head-Supported W-to-Y Resistance Band Extension",
        7.2,
        "Resistance Bands",
        "Lie prone with mini-band around wrists. Form a 'W', pull wrists apart, extend arms overhead into 'Y', and return to 'W' without losing outward band tension."
    ),
    (
        "Backpack 25 lb Standing Bent-Over Y-Raise with Neutral Wrists",
        7.3,
        "Backpack-weighted",
        "Hinge forward 45 degrees, hold 25 lb pack, raise arms diagonally forward into a 'Y' path to eye height, squeezing lower traps and rear deltoids."
    ),
    (
        "Resistance Band Standing Reverse Fly to External Rotation Pulse",
        7.4,
        "Resistance Bands",
        "Perform a bent-over reverse fly, and at top of movement, pulse hands backward 3 inches 5 times before lowering, inducing severe rear-delt metabolic burn."
    ),
    (
        "Floor Plank to Downward Dog Single-Arm Shoulder Reach",
        6.9,
        "Bodyweight",
        "Push from plank into downward dog, reach right hand back to touch left ankle while stabilizing entire body weight through left shoulder joint, and alternate."
    ),
    (
        "Resistance Band Overhead Pull-Apart with 3-Second Hold",
        7.1,
        "Resistance Bands",
        "Hold resistance band directly overhead with arms extended. Pull hands apart outward until band reaches base of neck, holding peak contraction for 3 full seconds."
    ),
    (
        "Backpack 25 lb Floor Z-Press with Neutral Grip",
        7.5,
        "Backpack-weighted",
        "Sit on floor with legs extended flat in a wide straddle. Hold a 25 lb backpack at chin and press vertically overhead without arching lumbar spine, demanding high anterior delt drive."
    ),
    (
        "Standing Resistance Band Lateral Raise to Overhead V-Press",
        7.4,
        "Resistance Bands",
        "Raise band handles laterally to shoulder height, then immediately press upward diagonally into an overhead 'V' configuration, fusing lateral and anterior deltoid mechanics."
    ),
    (
        "Feet-Elevated Pike Push-Up on Couch with Deficit Touch",
        7.6,
        "Bodyweight",
        "Elevate feet on couch seat and place hands on 2-inch floor blocks. Lower forehead smoothly past hands into deficit depth and press back to locked-out vertical shoulders."
    ),
    (
        "Backpack 20 lb Single-Arm Clean to Strict Press",
        7.3,
        "Backpack-weighted",
        "Swing 20 lb backpack from between knees to shoulder rack with one hand, settle feet, and press overhead to full lockout under strict anterior deltoid power."
    ),
    (
        "Resistance Band Standing Cross-Body Lateral Abduction (Opposite Anchor)",
        7.3,
        "Resistance Bands",
        "Anchor band under left foot, hold handle in right hand at left pocket, and raise arm diagonally upward and outward to 90 degrees across chest, training lateral delt stretch."
    ),
    (
        "Prone Floor Cobra with Mini-Band Wrist Abduction",
        6.9,
        "Resistance Bands",
        "Lie prone with mini-band around wrists. Lift chest off mat into cobra extension while pulling wrists outward against band tension, firing infraspinatus, teres minor, and rear delts."
    ),
    (
        "Backpack 30 lb High-Pull to Upright Collarbone Row",
        7.2,
        "Backpack-weighted",
        "Stand tall holding 30 lb backpack. Drive elbows vertically toward ceiling, raising pack smoothly to collarbones with elbows flared high to recruit middle and posterior deltoids."
    ),
    (
        "Wall-Facing Handstand Negative to Controlled Floor Step-Down",
        7.7,
        "Bodyweight",
        "Walk feet up wall into vertical handstand. Lower chest slowly toward floor over 5 seconds under maximum eccentric shoulder load, then step feet safely down to reset."
    ),
    (
        "Resistance Band Seated Floor Arnold Press",
        7.2,
        "Resistance Bands",
        "Sit flat on floor, loop band under thighs, and hold handles at chin with palms in. Rotate forearms out while pressing overhead, challenging seated shoulder stability."
    ),
    (
        "Backpack 15 lb Single-Arm Prone Incline Rear Delt Sweep",
        7.0,
        "Backpack-weighted",
        "Lie chest-down across an angled chair or bed. Raise 15 lb backpack horizontally outward to 90 degrees with thumb pointing sideways, pausing 2 seconds at peak squeeze."
    ),
    (
        "Standing Wall-Leaning Isometric Lateral Deltoid Abduction",
        6.8,
        "Bodyweight",
        "Stand sideways 1 foot from wall, lean upper forearm against wall at shoulder height, and drive elbow outward into wall with 75% effort for 20-second isometric holds."
    ),
    (
        "Bear Crawl Multi-Directional Hallway Shoulder Shuttles",
        7.1,
        "Bodyweight",
        "Crawl forward 10 yards, crawl laterally 5 yards right, and crawl backward 10 yards in bear plank, maintaining rigid scapular protraction and level pelvis."
    ),
    (
        "Resistance Band Half-Kneeling Face Pull with High Rotational Flare",
        7.4,
        "Resistance Bands",
        "In half-kneeling stance, anchor band at forehead height. Pull handles to temples with elbows flared high, rotating forearms upward to activate posterior rotator cuff."
    ),
    (
        "Backpack 25 lb Standing Halo to Lateral Push Press",
        7.3,
        "Backpack-weighted",
        "Orbit 25 lb backpack around head clockwise, drop to shoulders, dip and drive into an overhead push press, lower, and orbit counter-clockwise in continuous flow."
    ),
    (
        "Prone Floor Swimmer with 3-Second Posterior Deltoid Hold",
        6.9,
        "Bodyweight",
        "Lie prone, sweep straight arms from overhead down past hips, interlace fingers behind lower back, lift shoulders 3 inches off mat, and hold peak rear-delt squeeze for 3 seconds."
    ),
    (
        "Resistance Band High-Anchor Diagonal Woodchopper Press",
        7.1,
        "Resistance Bands",
        "Anchor band overhead, pull diagonally downward across chest with straight arms, and finish with a punch toward opposite hip under continuous elastic control."
    ),
    (
        "Reverse Tabletop Crab Shoulder Push-Up with Elevated Hips",
        6.8,
        "Bodyweight",
        "In reverse crab pose with hips raised, bend elbows straight backward to dip shoulders into extension, then press through palms into full lockout to condition posterior capsule."
    ),
    (
        "Backpack 20 lb Overhead Waiter Walk across Room",
        7.2,
        "Backpack-weighted",
        "Hold a 20 lb backpack flat on open palm directly overhead like a waiter's tray. Walk across room with locked elbow, stabilizing through glenohumeral stabilizers."
    ),
    (
        "Resistance Band Standing Reverse Fly to W-Squeeze Pulse",
        7.3,
        "Resistance Bands",
        "Perform a bent-over reverse fly with band, bend elbows into a 'W' at top, pulse shoulder blades together 3 times, and lower under 3-second eccentric tempo."
    ),
]

int_gym_data = [
    # --- Gym Dumbbell, Barbell, Cable & Machine Deltoid Protocols (Gym) ---
    (
        "Standing Barbell Overhead Military Press (Strict)",
        7.7,
        "Barbell",
        "Grip Olympic barbell just outside shoulders. Squeeze glutes and quads, press bar straight up clearing chin, and lock out overhead with head pushed through, lowering under 3-second control."
    ),
    (
        "Seated Dumbbell Overhead Shoulder Press (Heavy)",
        7.6,
        "Dumbbells",
        "Sit on 90-degree upright bench with heavy dumbbells at shoulders. Press dumbbells vertically, converging slightly at top without clanking, and lower slowly to ear level."
    ),
    (
        "Dumbbell Standing Arnold Press (Standard Hypertrophy)",
        7.5,
        "Dumbbells",
        "Start with dumbbells at chest level, palms facing body. Rotate forearms outward while pressing overhead, finishing with palms facing forward at full lockout."
    ),
    (
        "Barbell Standing Push Press (Explosive Triple Extension)",
        7.8,
        "Barbell",
        "Dip hips 3 inches into shallow quarter-squat, drive explosively through heels, and punch barbell overhead to lockout, building dynamic vertical pressing power."
    ),
    (
        "Cable Single-Arm Lateral Raise Behind-the-Back (Low Pulley)",
        7.9,
        "Cable",
        "Stand beside cable stack with pulley set at wrist height. Run cable behind back, grasp handle, and raise arm laterally to 90 degrees with constant baseline tension."
    ),
    (
        "Cable Bilateral Cross-Over Lateral Raise (Dual Low Pulleys)",
        7.8,
        "Cable",
        "Set dual low pulleys, cross cables in front, and raise arms out to sides simultaneously, maintaining peak tension across the entire range of motion."
    ),
    (
        "Cable Eye-Level Face Pull with Double Rope Attachment",
        7.7,
        "Cable",
        "Attach two ropes to cable pulley at eye level. Pull ropes apart toward ears while rotating wrists back, intensely recruiting posterior deltoids and external rotators."
    ),
    (
        "Dumbbell Seated Incline Rear Delt Fly (Chest Supported)",
        7.4,
        "Dumbbells",
        "Lie chest-down on a 30-degree incline bench holding moderate dumbbells. Raise arms out to sides leading with pinkies, squeezing rear deltoids at peak."
    ),
    (
        "Barbell Behind-the-Neck Overhead Press (Strict)",
        7.6,
        "Barbell",
        "Take a wide snatch grip, rest bar across upper trapezius, and press straight overhead to lockout, developing active mobility and lateral-rear deltoid strength."
    ),
    (
        "Dumbbell Standing Lateral Raise with 2-Second Top Pause",
        7.5,
        "Dumbbells",
        "Raise dumbbells to parallel in scapular plane, pause for 2 full seconds of isometric hold at peak contraction, and lower under strict 3-second eccentric tempo."
    ),
    (
        "EZ-Bar Standing Upright Row with Wide Grip to Sternum",
        7.3,
        "EZ-Bar",
        "Hold outer camber of EZ-bar with wide overhand grip. Pull bar to mid-chest with elbows flared high and wide, isolating lateral deltoid heads without wrist strain."
    ),
    (
        "Machine Seated Shoulder Press (Neutral Grip / Independent Arms)",
        7.5,
        "Machine",
        "Sit on machine with neutral grip handles. Press upward through independent converging arms, eliminating dominant side compensation and isolating anterior delts."
    ),
    (
        "Dumbbell Seated Cuban Press with 90/90 Rotation",
        7.6,
        "Dumbbells",
        "Upright row light dumbbells to chest with wide elbows, rotate forearms upward 90 degrees to vertical, press overhead, reverse motion, and repeat smoothly."
    ),
    (
        "Cable Standing External Rotation in 90-Degree Abduction",
        7.5,
        "Cable",
        "Set pulley at shoulder height. Abduct shoulder 90 degrees with elbow supported or free, rotate forearm from horizontal to vertical, targeting infraspinatus."
    ),
    (
        "Dumbbell Incline Chest-Supported Y-Raise (Scapular Plane)",
        7.4,
        "Dumbbells",
        "Lie chest-down on 45-degree incline bench with light dumbbells. Raise arms diagonally forward at 30 degrees with thumbs up, targeting lower traps and anterior delts."
    ),
    (
        "Barbell Bradford Press (Front-to-Back Alternating)",
        7.7,
        "Barbell",
        "Press barbell from collarbones just high enough to clear crown of head, lower behind neck, press just over head, and lower to front in continuous unbroken cycles."
    ),
    (
        "Cable Low-Pulley Scaption Raise (30-Degree Angle)",
        7.6,
        "Cable",
        "Grasp low cable handle with thumb up. Raise arm forward and outward at 30 degrees in the scapular plane to eye level, optimizing supraspinatus recruitment."
    ),
    (
        "Machine Reverse Pec Deck Fly with Neutral Grip",
        7.6,
        "Machine",
        "Set machine arms forward. Grip handles with neutral thumbs-up grip, sweep arms backward horizontally, and pause 1 second at peak posterior delt contraction."
    ),
    (
        "Dumbbell Standing Front Raise to Overhead Lockout",
        7.3,
        "Dumbbells",
        "Hold dumbbells at thighs. Raise arms forward through full 180-degree arc all the way to overhead lockout, controlling eccentric descent through full range."
    ),
    (
        "Cable Standing High-to-Low Cross-Over Rear Delt Fly",
        7.7,
        "Cable",
        "Set dual pulleys overhead, cross cables, and pull diagonally downward and outward in reverse hug, targeting posterior deltoid lower fibers and rhomboids."
    ),
    (
        "Smith Machine Behind-the-Neck Overhead Press",
        7.5,
        "Machine",
        "Sit under Smith bar with bar tracking behind head to ear level. Press upward along fixed track, isolating lateral and rear deltoids under steady stability."
    ),
    (
        "Dumbbell Seated Hammer Shoulder Press with Slow Negative",
        7.4,
        "Dumbbells",
        "Press dumbbells overhead with neutral palms-in grip, lowering under a strict 4-second eccentric count to maximize time-under-tension on anterior delts."
    ),
    (
        "Cable Single-Arm Leaning Lateral Raise",
        7.8,
        "Cable",
        "Grasp cable pole with one hand and lean torso outward at 30 degrees. Raise cable handle laterally to parallel, creating peak tension at the top of the range."
    ),
    (
        "Dumbbell Standing Lu Raise (Lateral to Overhead Circle)",
        7.8,
        "Dumbbells",
        "Hold light dumbbells. Raise arms laterally outward and continue arcing upward until dumbbells lightly touch overhead, lowering smoothly along the same outer circle."
    ),
    (
        "Barbell Seated Overhead Military Press from Pins",
        7.7,
        "Barbell",
        "Set safety pins at chin height in power rack. Press barbell upward from a dead-stop on the pins to full lockout overhead, developing dead-stop starting strength."
    ),
    (
        "Dumbbell Standing Side-Lying Lateral Raise on Incline Bench",
        7.7,
        "Dumbbells",
        "Lie sideways on a 30-degree incline bench with top arm holding dumbbell. Raise dumbbell from hip to 90 degrees, targeting lateral deltoid initial abduction."
    ),
    (
        "Cable Standing Straight-Arm Diagonal Woodchopper (Low to High)",
        7.3,
        "Cable",
        "Anchor cable low, pull diagonally upward and across torso to overhead extension with straight arms, integrating rotational core and anterior deltoid power."
    ),
    (
        "Dumbbell Prone Incline T-Raise (Posterior Deltoid Focus)",
        7.4,
        "Dumbbells",
        "Lie chest-down on incline bench, raise dumbbells straight out to sides forming a 'T' with thumbs pointing outward, squeezing rear deltoids at the top."
    ),
    (
        "Cable Dual-Pulley Front Raise with Rope Attachment",
        7.5,
        "Cable",
        "Straddle low cable with rope between legs. Raise rope forward to eye level, spreading hands apart at peak contraction to stimulate front deltoid heads."
    ),
    (
        "Machine Standing Lateral Deltoid Raise",
        7.6,
        "Machine",
        "Stand inside lateral raise machine with pads on outer forearms. Drive elbows upward to shoulder level, holding 1 second to eliminate swinging momentum."
    ),
    (
        "Dumbbell Seated W-Press (Scapular Retraction)",
        7.5,
        "Dumbbells",
        "Hold dumbbells at shoulders with elbows wide forming a 'W'. Press upward diagonally into a 'V', focusing on scapular upward rotation and lateral delts."
    ),
    (
        "Barbell Standing Snatch-Grip High Pull to Chest",
        7.8,
        "Barbell",
        "Grip wide in snatch grip. Explode through hips and pull barbell to collarbones with elbows high and wide, building explosive lateral and posterior deltoid power."
    ),
    (
        "Cable Standing Reverse Cross-Over Fly at Shoulder Height",
        7.7,
        "Cable",
        "Cross cables at chest height without handles, pull arms backward horizontally in a reverse bear-hug, squeezing rear deltoids against continuous resistance."
    ),
    (
        "Dumbbell Standing Monkey Row (High Elbow Lateral Flare)",
        7.4,
        "Dumbbells",
        "Hold dumbbells at sides, pull elbows straight up along ribs toward armpits in a monkey row, keeping wrists loose to isolate lateral deltoids."
    ),
    (
        "Barbell Landmine Half-Kneeling Overhead Press",
        7.6,
        "Barbell",
        "Slot barbell into landmine attachment. In half-kneeling stance, press end of barbell upward at 45-degree angle, building joint-friendly anterior deltoid strength."
    ),
    (
        "Barbell Landmine Standing Alternating Rotational Press",
        7.7,
        "Barbell",
        "Hold landmine barbell with both hands, pivot hips, and press aggressively from side to side in an arc, training rotational core and shoulder stability."
    ),
    (
        "Cable Low-Pulley Prone Rear Delt Fly on Incline Bench",
        7.8,
        "Cable",
        "Position incline bench over low cable cross. Lie chest-down, cross cables, and fly outward against smooth continuous cable resistance to isolate rear delts."
    ),
    (
        "Dumbbell Standing Alternating Front-to-Lateral Raise Combo",
        7.5,
        "Dumbbells",
        "Raise right arm forward to eye level while simultaneously raising left arm laterally to side, lower under control, and switch arm assignments each rep."
    ),
    (
        "Smith Machine Overhead Shrug with 2-Second Top Pause",
        7.2,
        "Machine",
        "Lock Smith bar overhead with straight arms, elevate shoulders toward ears in active scapular elevation, pause for 2 seconds, and lower under control."
    ),
    (
        "Dumbbell Seated 6-Way Lateral Raise Complex",
        7.9,
        "Dumbbells",
        "Raise dumbbells laterally to 90 degrees, bring forward to touch in front, raise straight overhead, lower to front, spread out to sides, and lower to hips."
    ),
    (
        "Cable Standing Face Pull to Overhead External Press",
        7.8,
        "Cable",
        "Face pull rope to bridge of nose with high elbows, rotate wrists backward, and press straight overhead against horizontal cable pull before reversing."
    ),
    (
        "EZ-Bar Seated Overhead French Shoulder Press",
        7.5,
        "EZ-Bar",
        "Sit on upright bench holding EZ-bar with shoulder-width grip. Press from collarbones overhead to full lockout, lowering under 3-second eccentric tempo."
    ),
    (
        "Dumbbell Standing Overhead Farmer Walk (Bilateral)",
        7.6,
        "Dumbbells",
        "Lock two moderate dumbbells directly overhead with straight elbows. Walk 40 meters across gym floor, maintaining locked core and stable shoulder girdle."
    ),
    (
        "Cable Standing External Rotation with Towel Roll Support",
        7.4,
        "Cable",
        "Keep rolled towel between elbow and ribs, set cable at elbow level, rotate forearm outward across 90 degrees, training infraspinatus with zero deltoid cheat."
    ),
    (
        "Barbell Landmine Standing Viking Overhead Press",
        7.7,
        "Barbell",
        "Attach dual handles to landmine bar, rest at shoulders, and press overhead in natural arc, providing joint-friendly overhead pressing overload."
    ),
    (
        "Dumbbell Incline Prone Rear Delt Row with External Rotation",
        7.5,
        "Dumbbells",
        "Lie chest-down on incline bench. Row dumbbells with elbows at 90 degrees, and at top of row rotate forearms upward to fire external rotators and rear delts."
    ),
]

if __name__ == "__main__":
    print(f"Intermediate Home: {len(int_home_data)}")
    print(f"Intermediate Gym: {len(int_gym_data)}")
    print(f"Intermediate Total: {len(int_home_data) + len(int_gym_data)}")
    for name, score, eq, inst in int_home_data + int_gym_data:
        assert 6.1 <= score <= 8.0, f"Score {score} out of bounds for {name}"
        assert "1.5" not in inst and "1.5" not in name, f"1.5 protocol found in {name}"
    print("All intermediate scores within 6.1 - 8.0 range and no 1.5 protocol!")
