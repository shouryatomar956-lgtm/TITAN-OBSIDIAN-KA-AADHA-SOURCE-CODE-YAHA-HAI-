#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 12: CALISTHENICS - INTERMEDIATE TIER (Total: 114 Exercises)
# 80 Home (70%) + 34 Gym (30%)
# Validated Full Unassisted Control, Kinetic Chain Tension, Multi-Planar Calisthenics
# Scientific Score Bounds: 6.1 to 8.0
# Equipment: Bodyweight, None, Resistance Bands
# ==============================================================================

int_home_data = [
    # --- Vertical & Horizontal Pulling Progressions (Home) ---
    (
        "Doorway Bar Strict Dead-Hang Pull-Up",
        7.3,
        "Bodyweight",
        "Hang from doorway pull-up bar with overhand grip just outside shoulders. Engage hollow body with legs glued, depress scapulae, and pull vertically until chin clears bar cleanly without kipping, lowering to complete dead-hang under 2-second tempo."
    ),
    (
        "Doorway Bar Strict Supinated Chin-Up",
        7.1,
        "Bodyweight",
        "Grasp bar with shoulder-width underhand grip. Pull chest toward bar focusing on latissimus dorsi and biceps brachii contraction, pausing at apex before lowering with controlled eccentric control."
    ),
    (
        "Doorway Bar Wide-Grip Pull-Up to Collarbones",
        7.5,
        "Bodyweight",
        "Take a wide overhand grip wider than shoulder width. Pull vertically with flared lats until collarbones reach bar height, maintaining strict core rigidity and avoiding leg swing."
    ),
    (
        "Doorway Bar Neutral-Grip Parallel Pull-Up",
        7.2,
        "Bodyweight",
        "Grasp neutral handles on doorway pull-up bar. Pull smoothly with elbows tracking forward, keeping wrists aligned and shoulders depressed throughout range of motion."
    ),
    (
        "Doorway Bar Commando Alternating Side Pull-Up",
        7.4,
        "Bodyweight",
        "Grip doorway bar with hands in line (baseball bat grip). Pull head to right side of bar, lower smoothly to dead hang, and pull head to left side on subsequent rep."
    ),
    (
        "Doorway Bar Chest-to-Bar Explosive Pull-Up",
        7.7,
        "Bodyweight",
        "Initiate aggressive lat drive from dead-hang, accelerating through the pull to touch lower sternum firmly to doorway bar before lowering smoothly."
    ),
    (
        "Doorway Bar L-Sit Pull-Up (Legs Parallel)",
        7.9,
        "Bodyweight",
        "Hang from bar with legs held straight out horizontally in a strict 90-degree L-sit. Execute pull-ups without dropping legs or flexing knees, fusing upper pulling with core compression."
    ),
    (
        "Doorway Bar Slow Eccentric Pull-Up (8-Second Descent)",
        7.4,
        "Bodyweight",
        "Pull or step to chin-over-bar position. Resist gravity across 8 full seconds of slow eccentric descent until elbows lock completely, developing connective tissue tensile strength."
    ),
    (
        "Horizontal Table Underneath Strict Bodyweight Row (Heels Down)",
        6.7,
        "Bodyweight",
        "Lie beneath a sturdy table, grip edge with overhand grip, and keep straight body line from heels to crown. Row chest to table underside, squeezing shoulder blades together."
    ),
    (
        "Feet-Elevated Australian Incline Row on Household Chairs",
        7.0,
        "Bodyweight",
        "Place heels on chair with hands gripping doorway low bar or table edge. Row chest to hands in horizontal plane, pulling against increased percentage of body mass."
    ),

    # --- Calisthenic Pushing, Dips & Parallette Mechanics (Home) ---
    (
        "Household Chairs Parallel Bar Triceps Dips (Legs Bent)",
        6.8,
        "Bodyweight",
        "Place two sturdy chairs back-to-back at shoulder width. Support body on chair backs, bend knees, descend until upper arms are parallel to floor, and press to lockout."
    ),
    (
        "Straight-Leg Parallel Chair Dips with Hollow Posture",
        7.2,
        "Bodyweight",
        "On two sturdy parallel chairs, suspend body with legs extended straight forward. Lower into 90-degree dip depth with elbows tracking straight back, pressing to straight-arm depression."
    ),
    (
        "Parallel Floor Parallettes Standard Calisthenic Dip",
        7.4,
        "Bodyweight",
        "Mount 12-inch parallettes with tucked legs, lower shoulders toward handles, maintaining forward torso lean to recruit chest and anterior delts, pressing to full lockout."
    ),
    (
        "Floor Diamond Close-Grip Push-Up",
        6.6,
        "Bodyweight",
        "Place index fingers and thumbs touching in a diamond below sternum in full plank. Lower chest to hands and press to lockout, emphasizing triceps and inner pectoralis."
    ),
    (
        "Floor Archer Push-Up (Alternating Extended Arms)",
        7.5,
        "Bodyweight",
        "Set hands wide. Lower chest toward right hand while extending left arm straight out laterally like an archer drawing a bow, press up, and repeat to left side."
    ),
    (
        "Floor Typewriter Sliding Push-Up",
        7.6,
        "Bodyweight",
        "Descend into deep wide push-up, slide chest horizontally 1 inch above floor across to right hand, slide across to left hand, and press back to center."
    ),
    (
        "Floor Pseudo Planche Push-Up (Hands at Mid-Torso)",
        7.7,
        "Bodyweight",
        "Place hands on floor beside ribs with fingers turned slightly outward. Lean shoulders forward past wrists and perform push-ups, maintaining protracted hollow body."
    ),
    (
        "Feet-Elevated Push-Up on Household Chair (18-Inch)",
        6.9,
        "Bodyweight",
        "Place toes on chair and hands on floor in straight plank. Lower chest to floor with elbows at 45 degrees, pressing to lockout under increased anterior deltoid load."
    ),
    (
        "Spiderman Push-Up with Alternating Knee-to-Elbow Touch",
        7.0,
        "Bodyweight",
        "As chest descends to floor, drive right knee outward to touch right elbow in deep horizontal abduction, press up, and alternate with left knee."
    ),
    (
        "Clapping Plyometric Explosive Push-Up",
        7.5,
        "Bodyweight",
        "Explode upward from bottom of push-up with enough vertical force for hands to leave floor, clap hands together, and land smoothly absorbing directly into next rep."
    ),
    (
        "Floor Wide-Grip Push-Up to Scapular Protraction",
        6.5,
        "Bodyweight",
        "Set hands twice shoulder-width apart. Lower chest to 1 inch off floor, press to full lockout, and push extra inch into serratus protraction at apex."
    ),
    (
        "Staggered Hands Asymmetrical Calisthenic Push-Up",
        6.8,
        "Bodyweight",
        "Place right hand under shoulder and left hand 6 inches forward. Perform push-up, switch hand stagger, and repeat to train asymmetrical shoulder force distribution."
    ),

    # --- Core Compression, Levers & Gymnastics Static Holds (Home) ---
    (
        "Floor Parallettes Tucked L-Sit Hold (Knees at Chest)",
        7.1,
        "Bodyweight",
        "Support straight arms on parallettes, tuck knees to chest, and hold body suspended in air with toes off mat for 15-20 seconds without shoulder shrugging."
    ),
    (
        "Floor Parallettes One-Leg Extended L-Sit Hold",
        7.5,
        "Bodyweight",
        "From tuck L-sit on parallettes, extend one leg straight forward while opposite knee remains tucked. Hold 10 seconds per side, keeping hips pushed forward."
    ),
    (
        "Floor Parallettes Full L-Sit Hold (Horizontal Legs)",
        7.8,
        "Bodyweight",
        "Lock arms straight on parallettes, elevate hips, and extend both legs straight forward parallel to floor with pointed toes for 10-15 seconds of intense core compression."
    ),
    (
        "Household Floor Strict L-Sit (Fingertip / Palm Press)",
        8.0,
        "Bodyweight",
        "Sit on floor with legs together. Press palms flat beside hips and push shoulders down into depression, lifting entire butt and straight legs off floor without equipment."
    ),
    (
        "Doorway Bar Hanging Knee-to-Elbow Tuck Raise",
        6.8,
        "Bodyweight",
        "Hang from bar with straight arms. Flex hips and curl pelvis upward until knees touch elbows, pausing 1 second at top before lowering under control."
    ),
    (
        "Doorway Bar Hanging Straight-Leg Raise to 90 Degrees",
        7.4,
        "Bodyweight",
        "From straight dead hang, raise straight legs with pointed toes until thighs are exactly parallel to floor (L-hang), holding 2 seconds before slow descent."
    ),
    (
        "Doorway Bar Hanging Toes-to-Bar Strict Raise",
        7.8,
        "Bodyweight",
        "Engage lats to lean torso back slightly and flex hips, bringing pointed toes to touch pull-up bar between hands without kipping momentum, lowering slowly."
    ),
    (
        "Doorway Bar Hanging Windshield Wipers (Bent Knee)",
        7.6,
        "Bodyweight",
        "Tuck knees to chest in hanging invert, rotate knees from side to side in a 90-degree arc like a windshield wiper, engaging obliques and latissimus dorsi."
    ),
    (
        "Floor Hollow Body Rocker Cycles (Straight Arms Overhead)",
        7.2,
        "Bodyweight",
        "Lock body into classic gymnastics hollow dish shape with arms pinned beside ears. Rock forward and backward like a rigid cradle for 30 seconds without breaking curve."
    ),
    (
        "Floor Dragon Flag Tucked Knee Lowering Negative",
        7.9,
        "Bodyweight",
        "Anchor hands behind head to a sturdy table leg. Lift torso and tucked knees vertically onto upper back, and lower straight rigid torso slowly toward floor over 5 seconds."
    ),
    (
        "Prone Floor Gymnastics Arch Body Rockers (Superman Rocks)",
        6.6,
        "Bodyweight",
        "In reverse hollow arch position with chest and knees lifted, rock smoothly forward and backward using gluteal and erector spinae contraction."
    ),
    (
        "Floor Side-Plank Star Hold with Leg Abduction",
        6.7,
        "Bodyweight",
        "Support body on one hand and foot in side plank. Elevate top arm and top leg into a star shape, holding 20 seconds to condition lateral hip and shoulder chain."
    ),

    # --- Handstand & Inversion Fundamentals (Home) ---
    (
        "Wall-Facing Handstand Static Hold (60 Seconds)",
        7.5,
        "Bodyweight",
        "Walk feet up wall until nose and toes lightly touch surface. Lock elbows, elevate shoulders into ears, squeeze glutes, and hold pristine vertical alignment for 60 seconds."
    ),
    (
        "Wall-Supported Handstand Shoulder Taps (Continuous Alternating)",
        7.7,
        "Bodyweight",
        "In a strict wall handstand, shift weight from palm to palm, tapping opposite shoulder with hand in rhythmic cadence without twisting pelvis."
    ),
    (
        "Wall Handstand Scapular Shrugs (Elevation and Depression)",
        7.3,
        "Bodyweight",
        "In vertical handstand against wall, shrug shoulders up toward ears to lift body higher, then lower under control for 12 strict reps to build trap and serratus drive."
    ),
    (
        "Wall Handstand Toe-Pull Away Balance Drill",
        7.6,
        "Bodyweight",
        "In wall-facing handstand, push through fingertips to pull toes 2 inches off wall into freestanding balance, holding as long as possible before tapping back."
    ),
    (
        "Crow Pose (Bakasana) Knee-to-Triceps Balance Hold",
        7.2,
        "Bodyweight",
        "Place hands flat on floor, rest knees high on backs of triceps, lean forward, and lift feet off mat, balancing entire body weight on hands for 20 seconds."
    ),
    (
        "Floor Pike Press to Handstand Negative",
        7.8,
        "Bodyweight",
        "From handstand against wall, lower hips and legs with straight knees into a pike, controlling the eccentric fold until toes touch floor softly."
    ),

    # --- Gymnastics Rings Calisthenics Fundamentals (Home) ---
    (
        "Doorway Gymnastics Rings Straight-Arm Support Hold (Turn Out)",
        7.7,
        "Bodyweight",
        "Hang rings from doorway bar. Jump to support with arms locked, turn rings outward at 45 degrees (RTO), and hold for 20 seconds without ring shake."
    ),
    (
        "Gymnastics Rings Standard Bodyweight Dip",
        7.8,
        "Bodyweight",
        "In ring support, descend until bicep touches ring top, keeping rings close to hips, and press up to lockout, turning rings outward at top."
    ),
    (
        "Gymnastics Rings Bulgarian Dip with Wide Flared Elbows",
        7.9,
        "Bodyweight",
        "Lower into ring dip while spreading rings wide apart, pressing back up by adducting chest and triceps to bring rings together at top lockout."
    ),
    (
        "Gymnastics Rings Incline Bodyweight Bicep Curl",
        6.9,
        "Bodyweight",
        "Lean back at 45 degrees holding rings with supinated grip, keep elbows stationary high, and curl forehead toward rings using pure biceps flexion."
    ),
    (
        "Gymnastics Rings Overhead Triceps Bodyweight Extension",
        7.1,
        "Bodyweight",
        "Lean forward holding rings, bend elbows to lower head through rings, and extend arms overhead to lockout, using bodyweight to overload triceps."
    ),
    (
        "Gymnastics Rings Chest Fly Horizontal Abduction",
        7.4,
        "Bodyweight",
        "From push-up stance on rings, spread straight arms laterally outward into a fly, lower chest toward floor, and squeeze rings together to return."
    ),
    (
        "Gymnastics Rings Tuck Inverted Hang Hold",
        7.2,
        "Bodyweight",
        "Hang from rings, pull knees to chest, invert body upside down with head pointing to floor, and hold stationary balance with arms straight."
    ),
    (
        "Gymnastics Rings Skin the Cat Rotation (Full Range)",
        7.8,
        "Bodyweight",
        "From dead hang, tuck knees, invert, pass feet between arms into a deep German hang shoulder extension, pause 1 second, and reverse rotation smoothly."
    ),
    (
        "Gymnastics Rings German Hang Passive Extension Hold",
        7.5,
        "Bodyweight",
        "Pass legs through rings into backward hanging position with shoulders in maximal extension. Hold passively for 15-20 seconds to condition biceps tendons."
    ),
    (
        "Gymnastics Rings Tuck Front Lever Row (Horizontal)",
        7.9,
        "Bodyweight",
        "Invert into a tuck front lever with back parallel to floor. Row chest to rings, keeping hips level, and lower to straight arms under control."
    ),

    # --- Lower Body Calisthenic Unilateral Mastery (Home) ---
    (
        "Unassisted Full-Depth Pistol Squat (Single-Leg)",
        7.8,
        "Bodyweight",
        "Balance on left leg with right leg extended straight forward. Descend until left hamstring touches calf without heel rising, and drive through midfoot to stand."
    ),
    (
        "Unassisted Full-Depth Pistol Squat (Right Lead)",
        7.8,
        "Bodyweight",
        "Balance on right leg, extend left leg forward, descend smoothly into rock-bottom pistol squat, and press explosively to full hip extension."
    ),
    (
        "Airborne Shrimp Squat (Hands Free, Rear Knee Touch)",
        7.7,
        "Bodyweight",
        "Hold rear foot with hand or cross arms across chest. Descend on single leg until rear knee lightly touches mat behind lead heel, pressing up without foot assist."
    ),
    (
        "Bodyweight Sissy Squat with Backward Torso Lean",
        7.3,
        "Bodyweight",
        "Rise onto balls of feet, push knees forward, and lean torso backward in straight line from knees to shoulders, feeling intense eccentric rectus femoris load."
    ),
    (
        "Nordic Hamstring Curl Bodyweight Negative (Hinged Anchor)",
        7.9,
        "Bodyweight",
        "Anchor heels under a sofa or bed. From kneeling with rigid hips, lower body slowly forward toward floor over 5 seconds, catching with hands and resetting."
    ),
    (
        "Single-Leg Calf Raise on Household Step (Full Deficit)",
        6.6,
        "Bodyweight",
        "Stand on edge of step on one foot. Lower heel into maximum dorsiflexion stretch, drive up onto big toe for 2-second apex squeeze, and lower slowly."
    ),
    (
        "Household Hallway Walking Lunges with Arms Overhead (Hollow)",
        6.8,
        "Bodyweight",
        "Lunge continuously across hallway with arms locked straight overhead, keeping ribs depressed and core braced to integrate lower body with shoulder girdle."
    ),
    (
        "Single-Leg Glute Bridge with Extended Knee Pulse",
        6.5,
        "Bodyweight",
        "Lie on back, elevate one leg straight to ceiling, drive opposite heel into floor to lift hips, and pulse at peak extension for 15 reps per leg."
    ),
    (
        "Copenhagen Adductor Plank on Sturdy Chair (Full Lever)",
        7.6,
        "Bodyweight",
        "Rest inside of top foot on chair seat in side plank with bottom leg hanging free. Elevate hips and hold for 20 seconds, training groin resilience."
    ),
    (
        "Doorway Bar Hanging Scapular Pull to Reverse Shrug",
        6.9,
        "Bodyweight",
        "From dead hang, depress scapulae to elevate chest, pull elbows slightly back, hold 2 seconds, and lower to dead hang to build foundational pulling strength."
    ),

    # --- Additional Calisthenic Variations (Home) ---
    (
        "Floor Pseudo Planche Push-Up to Pike Press Combo",
        7.7,
        "Bodyweight",
        "Perform pseudo planche push-up with forward lean, press up, immediately walk feet forward into pike push-up, and alternate in fluid succession."
    ),
    (
        "Parallel Floor Parallettes L-Sit Flutter Kicks",
        7.8,
        "Bodyweight",
        "Hold full L-sit on parallettes and perform small rapid up-and-down flutter kicks with pointed toes for 15 seconds, challenging hip flexors to exhaustion."
    ),
    (
        "Doorway Bar Narrow-Grip Chin-Up with Elbows Tucked",
        7.2,
        "Bodyweight",
        "Grasp doorway bar with hands touching (close underhand grip). Pull chin over bar, squeezing biceps at top, and lower slowly to full stretch."
    ),
    (
        "Floor Archer Push-Up Negative Slide",
        7.6,
        "Bodyweight",
        "Drop to right side of archer push-up, slide chest along floor to left hand over 4 seconds, press up on left, and alternate sides."
    ),
    (
        "Doorway Bar Hanging Knee-Tuck Windshield Wipers",
        7.5,
        "Bodyweight",
        "Hang from bar, tuck knees to chest, and rotate hips side to side across 180 degrees, keeping arms locked straight to condition rotational core."
    ),
    (
        "Household Floor Frog Stand to Handstand Kick-Up",
        7.4,
        "Bodyweight",
        "Balance in frog stand (knees on elbows) for 5 seconds, jump feet back to plank, kick immediately into wall handstand, and step down."
    ),
    (
        "Gymnastics Rings Ring-Turn-Out Push-Up (RTO 45-Degree)",
        7.6,
        "Bodyweight",
        "Perform push-up on rings, and at top lockout, actively rotate rings outward 45 degrees, locking elbows straight and protracting scapulae."
    ),
    (
        "Doorway Bar Eccentric Muscle-Up Negative Transition",
        8.0,
        "Bodyweight",
        "Stand on chair to start in straight-bar dip above bar. Lower chest to bar, lean back, roll wrists around bar into top of pull-up, and lower to dead hang."
    ),
    (
        "Parallel Floor Parallettes Tuck Planche Taps",
        7.9,
        "Bodyweight",
        "In straight-arm support on parallettes, lean forward, tuck knees, lift toes off floor for 3 seconds, tap toes lightly, and immediately re-lift."
    ),
    (
        "Floor Bear Crawl Forward and Reverse Hallway Shuttles",
        6.7,
        "Bodyweight",
        "Crawl forward 15 feet and backward 15 feet in bear plank with knees 1 inch off floor, maintaining flat spine and continuous serratus engagement."
    ),
    (
        "Floor Parallette Archer Push-Up on Elevated Handles",
        7.6,
        "Bodyweight",
        "Grip floor parallettes placed wide. Lower chest to right parallette while extending left arm straight laterally, press up, and alternate to left side."
    ),
    (
        "Doorway Bar Hanging Alternating Knee-to-Shoulder Twist",
        7.2,
        "Bodyweight",
        "From dead hang, flex hips and twist pelvis to bring knees toward right shoulder, pause 1 second, lower to center, and twist toward left shoulder."
    ),
    (
        "Gymnastics Rings Incline Bodyweight Face Pull with RTO",
        7.4,
        "Bodyweight",
        "Lean back at 45 degrees holding rings. Pull rings to temples with elbows flared high, rotating rings outward at peak contraction to load rear delts."
    ),
    (
        "Floor Sliding Bodyweight Pike Rollout (Socks on Hardwood)",
        7.5,
        "Bodyweight",
        "In push-up plank with socks on smooth floor, slide feet backward into an extended hollow rollout, then pull hips up into an inverted pike using lower core."
    ),
    (
        "Doorway Bar Single-Arm Assisted Dead Hang (Opposite Hand on Wrist)",
        7.6,
        "Bodyweight",
        "Hang from bar with right hand while left hand grips right wrist for partial assistance. Hold for 15 seconds per arm, building unilateral tendon density."
    ),
    (
        "Household Chair Support L-Sit to Tuck Planche Swing",
        7.8,
        "Bodyweight",
        "Support straight arms on chair backs. Swing legs smoothly from a forward L-sit through straight arms into a backward tucked planche hold."
    ),
    (
        "Floor Reverse Plank Bridge with Alternating Leg Lift",
        6.8,
        "Bodyweight",
        "Hold straight-arm reverse plank with hips elevated and glutes squeezed. Lift one straight leg 12 inches, hold 2 seconds, lower, and alternate sides."
    ),
    (
        "Gymnastics Rings High Incline Bodyweight Bicep Curl to Tricep Dip Flow",
        7.3,
        "Bodyweight",
        "Perform a bodyweight bicep curl on rings, turn body forward immediately, and execute a ring tricep extension, linking antagonist arm chains."
    ),
    (
        "Floor Cossack Squat with Arms Outstretched in Counterbalance",
        7.1,
        "Bodyweight",
        "Descend laterally into deep single-leg squat on right leg while keeping left leg straight with toes pointed up, reaching arms forward to counterbalance."
    ),
    (
        "Doorway Bar Inverted Hang to Candle Pose Hold",
        7.7,
        "Bodyweight",
        "Invert on doorway bar, extend legs straight up toward ceiling in a vertical candle pose with bar at hips, holding isometric control for 15 seconds."
    ),
]

int_gym_data = [
    # --- Institutional Calisthenics Rig & Stall Bars Mastery (Gym) ---
    (
        "Calisthenics Rig High-Bar Strict Dead-Hang Pull-Up",
        7.4,
        "Bodyweight",
        "Hang from institutional pull-up bar with overhand grip. Pull chest to touch bar with zero leg swing or kipping, holding chin over bar for 1 second before descent."
    ),
    (
        "Gymnastics High Rings Strict Dead-Hang Pull-Up (Rings Turn Out at Bottom)",
        7.7,
        "Bodyweight",
        "From free-hanging rings, pull chin above ring tops with palms facing in, lower to complete dead hang, and rotate palms forward into active shoulder external rotation."
    ),
    (
        "Calisthenics Rig Chest-to-Bar Pull-Up (Full Contact)",
        7.8,
        "Bodyweight",
        "Explode from dead hang to pull lower sternum firmly against the straight bar, engaging lower trapezius and latissimus dorsi to prepare for muscle-up transitions."
    ),
    (
        "Calisthenics Rig Straight-Bar Dip (Above-the-Bar Dip)",
        7.6,
        "Bodyweight",
        "Mount on top of pull-up bar in straight-arm support. Lean chest over bar, bend elbows to lower chest to bar, and press back up to full lockout."
    ),
    (
        "Parallel Bars Standard Bodyweight Dip to 90 Degrees",
        7.3,
        "Bodyweight",
        "Jump onto institutional parallel bars. Lower under control until shoulder joint drops below elbow, maintaining forward chest lean, and press to lockout."
    ),
    (
        "Parallel Bars Straight-Leg L-Sit Hold (Gym Station)",
        7.7,
        "Bodyweight",
        "Support straight arms on parallel bars, depress shoulders, and elevate straight legs parallel to floor with pointed toes for 15-20 seconds."
    ),
    (
        "Stall Bars Hanging Strict Toes-to-Bar",
        7.8,
        "Bodyweight",
        "Hang from top rung of stall bars with back facing rungs. Flex hips with locked knees, pulling toes up to touch hands against the bars without swinging."
    ),
    (
        "Stall Bars Hanging L-Sit Hold (Spine Against Bars)",
        7.6,
        "Bodyweight",
        "Hang with back supported by stall bar rungs, raise straight legs to horizontal, and hold for 15 seconds, using rungs to enforce zero backward torso lean."
    ),
    (
        "Calisthenics Rig Hanging Windshield Wipers (Straight Legs)",
        8.0,
        "Bodyweight",
        "Invert on pull-up bar with straight legs pointing to ceiling. Rotate legs side-to-side in a wide 180-degree windshield wiper arc, controlling with obliques and lats."
    ),
    (
        "Gymnastics Rings Free-Hanging Muscle-Up Transition Drill (False Grip)",
        8.0,
        "Bodyweight",
        "Hang from rings in false grip with wrists curled over ring tops. Pull rings to chest, lean chest aggressively forward between rings, and transition to dip."
    ),
    (
        "Calisthenics Rig Wide-Grip Behind-the-Neck Pull-Up",
        7.7,
        "Bodyweight",
        "Take a wide grip on pull-up bar, pull head forward, and touch base of neck to bar, building rear deltoid and mid-trapezius pulling strength."
    ),
    (
        "Parallel Bars Russian Dip (Elbow-Drop Transition)",
        7.9,
        "Bodyweight",
        "Lower into parallel bar dip, shift weight backward to drop forearms onto bars, rock forward onto hands, and press out to lockout in one fluid cycle."
    ),
    (
        "Stall Bars Dragon Flag Bodyweight Progression (Full Drop)",
        8.0,
        "Bodyweight",
        "Grip low stall bar rung behind head, elevate body into vertical candle stance on upper back, and lower rigid straight body to hover 2 inches above floor."
    ),
    (
        "Gymnastics Rings Inverted Hang to German Hang Transitions",
        7.9,
        "Bodyweight",
        "Invert on rings, pass feet smoothly backward through rings into German hang with shoulders fully extended, hold 2 seconds, and pull back to inverted hang."
    ),
    (
        "Calisthenics Rig Archer Pull-Up on Straight Bar",
        7.9,
        "Bodyweight",
        "Pull body up toward right hand while extending left arm straight along top of bar, lower under control, and alternate sides."
    ),
    (
        "Parallel Bars Swing to Handstand Prep (Kick Drill)",
        7.5,
        "Bodyweight",
        "Support on parallel bars, swing legs forward and backward in rhythm, kicking up toward 45 degrees to condition shoulder stability in dynamic momentum."
    ),
    (
        "Gymnastics Rings L-Sit Dip Combination",
        8.0,
        "Bodyweight",
        "Hold straight-leg L-sit on gymnastics rings, maintain L-sit position while bending elbows to 90 degrees, and press back up to full lockout."
    ),
    (
        "Stall Bars Side-Lying Human Flag Prep Hold (Bottom Lever)",
        7.9,
        "Bodyweight",
        "Grip two stall bar rungs with top arm pulling and bottom arm pushing. Lift body sideways into a diagonal tuck, holding 10 seconds per side."
    ),
    (
        "Calisthenics Rig Commando Grip Pull-Up to Sternum",
        7.4,
        "Bodyweight",
        "Hang sideways under bar with mixed inline grip. Pull sternum directly to bar, alternate hand lead, and lower to full dead hang."
    ),
    (
        "Parallel Bars Forward-Leaning Planche Dip",
        7.8,
        "Bodyweight",
        "Lean shoulders forward 6 inches over hands on parallel bars, dip down, and press to lockout while maintaining forward lean to load anterior delts."
    ),
    (
        "Gymnastics Rings Chest-to-Bar Ring Pull-Up with RTO Finish",
        7.8,
        "Bodyweight",
        "Pull chest to touch rings with thumbs touching sternum, lower to bottom, and turn rings outward (RTO) with straight arms to challenge biceps tendons."
    ),
    (
        "Calisthenics Rig Kipping Bar Muscle-Up (Smooth Transition)",
        7.9,
        "Bodyweight",
        "Generate a controlled hollow-to-arch kip, pull aggressively around bar, roll wrists over bar into straight-bar dip, and press to lockout."
    ),
    (
        "Parallel Bars Backward Shoulder Walk Across Bars",
        7.6,
        "Bodyweight",
        "In straight-arm support on parallel bars, walk hands backward along bars step-by-step for the full length, maintaining locked elbows and depressed shoulders."
    ),
    (
        "Stall Bars Hanging Straddle Leg Raise to Toes-to-Bar",
        7.7,
        "Bodyweight",
        "Hang from stall bars, spread legs in wide straddle, and lift feet up to touch outside hands, challenging adductor flexibility and lower core."
    ),
    (
        "Gymnastics Rings Archer Push-Up on Rings",
        7.7,
        "Bodyweight",
        "In ring push-up stance, lower chest to right ring while extending left arm straight out to side, press up, and alternate to left ring."
    ),
    (
        "Calisthenics Rig Dead-Hang One-Arm Isometric Hang (15s)",
        7.8,
        "Bodyweight",
        "Grip pull-up bar with single hand, let opposite arm dangle, and hold body suspended for 15 seconds per arm, building exceptional unilateral grip."
    ),
    (
        "Parallel Bars Dip with 3-Second Isometric Bottom Pause",
        7.5,
        "Bodyweight",
        "Descend into parallel bar dip, hold isometrically at 90 degrees for 3 full seconds under deep chest stretch, and press forcefully to lockout."
    ),
    (
        "Gymnastics Rings Push-Up to Incline Fly Combo",
        7.6,
        "Bodyweight",
        "Perform ring push-up, press to top, spread rings out into wide fly, squeeze back to center, and repeat in smooth continuous alternation."
    ),
    (
        "Stall Bars Reverse Hyperextension on High Rung",
        7.2,
        "Bodyweight",
        "Lie face down across padded stall bar bench or rung, hold bars, and lift straight legs behind body to horizontal, squeezing glutes at apex."
    ),
    (
        "Calisthenics Rig Neutral-Grip Pull-Up with 2-Second Top Pause",
        7.5,
        "Bodyweight",
        "Pull chin over parallel neutral bars, hold peak contraction with chest touching handles for 2 seconds, and lower under 3-second eccentric tempo."
    ),
    (
        "Parallel Bars Tucked Planche Jump to Support",
        7.8,
        "Bodyweight",
        "From standing between parallel bars, jump into tuck planche with arms straight and knees tucked, holding 3 seconds before stepping down."
    ),
    (
        "Gymnastics Rings Tuck Front Lever Static Hold (15s)",
        8.0,
        "Bodyweight",
        "Invert on rings, drop into horizontal tuck front lever with back flat and parallel to floor, holding straight arms for 15 unbroken seconds."
    ),
    (
        "Stall Bars Hanging Oblique Knee Tuck Pulses",
        7.4,
        "Bodyweight",
        "Hang from stall bars, tuck knees, twist hips right, and pulse knees toward right armpit 10 times, switch to left, conditioning rotational core."
    ),
    (
        "Calisthenics Rig Typewriter Pull-Up on Straight Bar",
        8.0,
        "Bodyweight",
        "Pull chin over bar, slide chin horizontally along bar to right hand, slide across to left hand, return to center, and lower to dead hang."
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
