#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 7: EXPLOSIVENESS - BEGINNER TIER (Total: 110 Exercises)
# 77 Home (70%) + 33 Gym (30%)
# Validated Plyometric Science, Foundational SSC & RFD, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 4.0 and 6.0
# ==============================================================================

beg_home_data = [
    # --- LOW-IMPACT VERTICAL PLYOMETRICS & POGOS (Home: 16) ---
    (
        "Standing Double-Foot Pogo Hops in Place",
        4.8,
        "Bodyweight",
        "Stand tall with feet hip-width apart and hands on hips. Bounce rhythmically off the balls of both feet, keeping knees slightly unlocked and ankles stiff to develop basic fast stretch-shortening cycle elasticity and Achilles tendon reactivity."
    ),
    (
        "Wall-Supported Low-Intensity Ankle Pogos",
        4.4,
        "Bodyweight",
        "Place fingertips against a wall at shoulder height for light balance. Perform small, continuous vertical hops clearing the floor by 2 inches, focusing on rapid ankle plantarflexion and minimal ground contact time."
    ),
    (
        "Supported Countermovement Jump to Low Box",
        5.2,
        "Bodyweight",
        "Stand facing a sturdy 6-inch step or platform. Dip hips into a quarter-squat swinging arms back, then explosively extend hips, knees, and ankles to jump onto the step, landing softly in a quiet athletic quarter-squat."
    ),
    (
        "Bilateral Soft Drop Landing From 4-Inch Step",
        5.0,
        "Bodyweight",
        "Step forward off a 4-inch stair step with both feet simultaneously. Absorb the landing quietly through the balls of the feet and knees, freezing in an athletic stance for 2 seconds to train eccentric deceleration."
    ),
    (
        "Assisted Squat Jump Holding Doorframe",
        5.1,
        "Bodyweight",
        "Grip an interior doorframe with both hands at chest level. Descend into a quarter-squat, then explosively drive upward into a vertical jump, using light upper-body assistance to reduce joint impact upon soft landing."
    ),
    (
        "Double-Foot Carpet Line Hops Forward and Back",
        4.6,
        "Bodyweight",
        "Identify a line on the carpet or floor tape. Hop back and forth across the line with feet together, emphasizing rhythmic spring-like ankle bounces without letting heels slam into the floor."
    ),
    (
        "Standing Vertical Reach Jump With Soft Stick",
        4.9,
        "Bodyweight",
        "Dip into a quarter-squat, swing arms overhead, and jump vertically to reach toward the ceiling. Land quietly on the balls of both feet with hips sinking into a shock-absorbing half-squat, holding for 2 seconds."
    ),
    (
        "Low-Height Tuck Jump With Double Bounce",
        5.3,
        "Bodyweight",
        "Jump upward from an athletic stance, bringing knees slightly toward chest at peak height. Land softly, take one small reset bounce in place, and immediately initiate the next jump."
    ),
    (
        "Chair-Assisted Single-Leg Pogo Hop",
        4.7,
        "Bodyweight",
        "Hold the back of a sturdy chair with both hands for 40% bodyweight support. Bounce continuously on one foot for 12 light hops, conditioning unilateral ankle stiffness under low axial load."
    ),
    (
        "Prone Floor Snap-Up to Athletic Stance",
        5.4,
        "Bodyweight",
        "Start in a high plank position. Explosively jump both feet forward outside your hands, snapping the hips under to land in a balanced, upright squat stance with chest tall."
    ),
    (
        "Standing Double-Foot Lateral Line Hops",
        4.6,
        "Bodyweight",
        "Stand beside a floor line with feet joined. Hop side-to-side across the line continuously, developing frontal-plane stretch-shortening cycle coordination across 20 rapid touches."
    ),
    (
        "Stair-Supported Reactive Jump-Up",
        5.1,
        "Bodyweight",
        "Stand at the bottom of a staircase. Dip quickly and jump up onto the first stair, absorbing the landing softly with flexed ankles and knees before stepping down to reset."
    ),
    (
        "Low-Impact Squat-to-Toes Triple Extension Drive",
        4.3,
        "Bodyweight",
        "Squat to 60 degrees, then explosively drive upward onto the tips of your toes with arms sweeping overhead, simulating vertical jump propulsion without leaving the floor."
    ),
    (
        "Seated Box Pop to Athletic Stand",
        4.8,
        "Bodyweight",
        "Sit upright on a dining chair with feet flat. Rock slightly back, then explosively drive through midfoot and glutes to pop up into a tall standing posture with zero hesitation."
    ),
    (
        "Bilateral In-Place Spring Hops With Arm Swing",
        4.7,
        "Bodyweight",
        "Coordinate a rhythmic double-arm backswing with quick in-place vertical ankle hops, syncing upper-body momentum transfer with lower-body ground reaction forces."
    ),
    (
        "Hands-on-Hips Stiff Ankle Bounce Matrix",
        4.5,
        "Bodyweight",
        "Keep hands locked on hips to eliminate arm momentum. Bounce vertically in place for 20 quick contacts, forcing the gastrocnemius-soleus complex to generate pure reactive propulsion."
    ),

    # --- HORIZONTAL & MULTI-DIRECTIONAL PLYOMETRICS (Home: 16) ---
    (
        "Standing Broad Jump to Stick Landing",
        5.5,
        "Bodyweight",
        "Stand with feet shoulder-width apart. Swing arms backward while hinging hips, then thrust arms forward and jump horizontally 3 to 4 feet, sticking the landing firmly in a deep quarter-squat."
    ),
    (
        "Staggered Stance Linear Bound to Stick",
        5.2,
        "Bodyweight",
        "In a split stance, drive off the front foot to leap forward 3 feet, landing on both feet simultaneously with even weight distribution to absorb horizontal deceleration."
    ),
    (
        "Lateral Skater Hop With Tap-Down Balance",
        5.1,
        "Bodyweight",
        "Hop sideways 3 feet to the right landing on the right foot, lightly touching the left toes to the floor behind for balance. Pause for 1 second, then bound laterally to the left."
    ),
    (
        "Two-Foot Diagonal Zig-Zag Hops",
        4.8,
        "Bodyweight",
        "Hop diagonally forward-right, then immediately diagonally forward-left across an imaginary zig-zag grid, developing multi-planar foot speed and elastic rebound."
    ),
    (
        "Forward Linear Double Hop and Freeze",
        5.0,
        "Bodyweight",
        "Perform two consecutive short broad hops forward without pausing between contacts, freezing the second landing instantly to train reactive ground transition."
    ),
    (
        "Lateral Shuffler Push-Off to Sprint Stop",
        5.3,
        "Bodyweight",
        "Shuffle laterally 3 steps to the right, plant the outside foot firmly, and drive off the inside edge into an explosive 2-step acceleration forward, sticking the stop."
    ),
    (
        "Double-Leg Backward Spring Hops",
        4.6,
        "Bodyweight",
        "Hop backward in small 1-foot increments for 10 consecutive bounces, conditioning the anterior tibialis and forefoot to decelerate rearward momentum."
    ),
    (
        "Four-Square Clockwise Hop Grid",
        4.7,
        "Bodyweight",
        "Hop into the four quadrants of an imaginary 2-foot square (forward, right, back, left) with feet together, reversing direction after two complete cycles."
    ),
    (
        "Short Shuttle Push-Off and Touch",
        5.2,
        "Bodyweight",
        "Place two markers 10 feet apart. Sprint to the first marker, touch the floor with a low center of gravity, and explosively decelerate to push off back toward the start."
    ),
    (
        "Staggered Broad Jump With Step-Out",
        5.0,
        "Bodyweight",
        "Start with one foot slightly ahead of the other. Jump forward into a broad jump, landing on both feet with a wide, shock-absorbing base of support."
    ),
    (
        "Diagonal Bound With Two-Foot Landing",
        5.1,
        "Bodyweight",
        "Bound diagonally 45 degrees off one foot, landing softly on both feet to manage deceleration forces safely before alternating lead legs."
    ),
    (
        "Side-to-Side Barrier Hops Over Rolled Towel",
        4.8,
        "Bodyweight",
        "Place a rolled towel on the floor. Hop laterally over the towel back and forth with continuous spring-like ground contacts, maintaining a tall chest."
    ),
    (
        "Forward-to-Backward Fast Foot Deceleration Hop",
        4.9,
        "Bodyweight",
        "Hop forward 2 feet, instantly bounce backward 2 feet on landing, and stabilize in an athletic stance, refining rapid change-of-direction mechanics."
    ),
    (
        "Single-Leg Lateral Bound to Two-Foot Catch",
        5.2,
        "Bodyweight",
        "Push off the right foot laterally, absorb the landing onto both feet in a balanced crouch, pause for 2 seconds, and repeat off the left foot."
    ),
    (
        "Standing Triple Short Hop Progression",
        5.3,
        "Bodyweight",
        "Execute three consecutive small forward hops covering 2 feet each, minimizing ground contact time between hops and sticking the third landing."
    ),
    (
        "Wide-to-Narrow Fast In-Out Foot Fires",
        4.5,
        "Bodyweight",
        "In a half-squat stance, rapidly jump feet out wide and in narrow as fast as possible for 15 seconds, driving rapid hip abductor-adductor neuromuscular recruitment."
    ),

    # --- UPPER BODY PLYOMETRICS & BALLISTICS (Home: 15) ---
    (
        "Wall Plyometric Push-Off",
        4.5,
        "Bodyweight",
        "Stand 2 feet from a wall. Fall forward onto your palms with elbows bending to 90 degrees, then explosively shove away from the wall until hands leave the surface, catching yourself in tall posture."
    ),
    (
        "Incline Countertop Explosive Push-Up",
        5.0,
        "Bodyweight",
        "Place hands on a sturdy kitchen counter in a plank. Lower your chest quickly, then drive through palms with maximal velocity so hands momentarily separate from the counter edge."
    ),
    (
        "Kneeling Floor Plyo Push-Up With Hand Release",
        5.4,
        "Bodyweight",
        "Kneel on a padded mat in a modified push-up. Lower chest to floor, then explode upward so hands lift 2 inches off the mat, landing softly with elbows unlocking immediately."
    ),
    (
        "Backpack Chest Pass Against Outdoor Wall",
        5.3,
        "Backpack-weighted",
        "Hold a 4 kg backpack at your chest with two hands. Stand 4 feet from a concrete wall, dip slightly, and throw the backpack forcefully into the wall, catching the rebound."
    ),
    (
        "Supine Light Backpack Overhead Throw and Catch",
        5.1,
        "Backpack-weighted",
        "Lie on back with knees bent. Hold a 3 kg soft backpack over your chest. Push it upward explosively into the air, releasing it 12 inches above hands and catching it on the descent."
    ),
    (
        "Kneeling Overhead Ballistic Slam With Backpack",
        5.5,
        "Backpack-weighted",
        "Kneel tall on a mat holding a 5 kg backpack overhead. Engage lats and core to slam the backpack downward onto a floor cushion with full velocity, picking it up to reset."
    ),
    (
        "Seated Incline Wall Ballistic Chest Push",
        4.8,
        "Backpack-weighted",
        "Sit on a chair facing a wall holding a 3 kg backpack. Explosively chest-push the bag forward into the wall, extending elbows rapidly to train upper-body RFD."
    ),
    (
        "Prone Hand-Clap Push-Up Progression on Incline",
        5.6,
        "Bodyweight",
        "With hands on a stable sofa edge, lower into a push-up and drive upward explosively. Perform a quick hand clap before returning hands to the sofa to absorb the landing."
    ),
    (
        "Stair-Supported Incline Explosive Push-Up",
        4.9,
        "Bodyweight",
        "Place hands on the third stair step. Perform rapid explosive push-ups where palms leave the tread, landing softly and transitioning immediately into the next descent."
    ),
    (
        "Standing Rotational Towel Whip Against Wall",
        4.7,
        "None",
        "Hold a heavy wet towel with both hands. Rotate hips and snap the towel violently against a hard wall or floor, drilling rotational kinetic chain sequencing."
    ),
    (
        "Kneeling Backward Medicine-Style Backpack Launch",
        5.2,
        "Backpack-weighted",
        "Kneel facing away from an open yard or soft surface. Swing a 4 kg backpack between knees and launch it backward overhead, driving through glutes and thoracic extensors."
    ),
    (
        "Table-Supported Fast Push-Drop Catch",
        4.6,
        "Bodyweight",
        "Stand facing a sturdy table. Drop hands onto the table from 4 inches above, catch your weight with flexed elbows, and instantly press back up to starting position."
    ),
    (
        "Isometric-to-Explosive Wall Shove",
        4.9,
        "Bodyweight",
        "Press palms into a wall with 100% effort for 3 seconds in a static push-up stance, then instantly take one step back and launch an explosive wall push-off."
    ),
    (
        "Supine Explosive Arm Extension Punch With Towel",
        4.4,
        "None",
        "Lie on back holding a tightly rolled towel across fists. Drive both arms upward into the air with maximum speed, simulating a rapid ballistic bench strike."
    ),
    (
        "Kneeling Side-Arm Rotational Backpack Throw",
        5.3,
        "Backpack-weighted",
        "Kneel sideways to a wall holding a 3 kg backpack. Swing the bag behind your hip and release it across your body into the wall using explosive core rotation."
    ),

    # --- BAND BALLISTICS & HIP HINGE VELOCITY (Home: 15) ---
    (
        "Resistance Band Explosive Hip Thrust Drive",
        5.4,
        "Resistance Bands",
        "Anchor a heavy loop band behind you around waist. In a tall kneeling or standing stance, hinge back slightly, then violently snap hips forward to full lockout against elastic resistance."
    ),
    (
        "Banded Ballistic Kettlebell-Style Swing",
        5.3,
        "Resistance Bands",
        "Stand on the center of a resistance band while holding both looped ends. Hinge at hips, then explosively extend hips to snap the band to shoulder height, utilizing hip snap."
    ),
    (
        "Standing Band-Resisted Sprint Start Acceleration",
        5.5,
        "Resistance Bands",
        "Anchor band to a doorpost and loop around waist. Lean forward into a 45-degree sprint angle against tension, then drive front knee forward in an explosive 2-step burst."
    ),
    (
        "Door-Anchored Band Ballistic Punch-Out",
        5.0,
        "Resistance Bands",
        "Anchor band at chest height behind you. In a staggered boxing stance, drive an explosive straight punch forward against the band, snapping the fist back immediately."
    ),
    (
        "Band-Resisted Vertical Jump Squat Pop",
        5.6,
        "Resistance Bands",
        "Stand on a light band with the loop draped across upper traps. Dip into a shallow quarter-squat and jump upward 4 inches, accelerating through the compounding elastic load."
    ),
    (
        "Standing Banded Lateral Speed Skater Drive",
        5.2,
        "Resistance Bands",
        "Anchor band to the side around waist. Bound laterally away from the anchor against elastic pull, landing on the outside foot and stabilizing for 1 second."
    ),
    (
        "Door-Anchor Band Fast Underhand Scoop",
        4.9,
        "Resistance Bands",
        "Anchor band low behind you. Grip handle between legs and drive upward into an explosive underhand scoop to chest height, powering the movement from the hips."
    ),
    (
        "Light Backpack Explosive Deadlift Snap",
        5.1,
        "Backpack-weighted",
        "Set an 8 kg backpack on the floor. Hinge down with flat back, grip handles, and violently stand up to full lockout with maximum barbell-speed intent across 10 reps."
    ),
    (
        "Band-Assisted Vertical Jump Unloading",
        5.5,
        "Resistance Bands",
        "Anchor heavy band to a pull-up bar overhead. Hold band handles with hands to take 15 kg off bodyweight, then perform high, float-phase vertical jumps with soft landings."
    ),
    (
        "Standing Band Resisted High Knee Drives",
        4.8,
        "Resistance Bands",
        "Anchor band at ankle height. Step back into tension and drive working knee upward toward chest as explosively as possible, pausing for half a second at peak height."
    ),
    (
        "Backpack Ballistic Clean to Front Rack",
        5.4,
        "Backpack-weighted",
        "Hold a 6 kg backpack at mid-thigh. Dip hips, jump upward with triple extension, and catch the backpack across your chest in a solid quarter-squat."
    ),
    (
        "Band-Resisted Broad Jump Propulsion",
        5.6,
        "Resistance Bands",
        "Anchor band low behind you around waist. Jump forward horizontally against elastic tension, landing in a deep shock-absorbing squat 3 feet in front."
    ),
    (
        "Standing Banded Speed Pull-Apart Snap",
        4.7,
        "Resistance Bands",
        "Hold light band in front of chest. Snap arms apart horizontally as fast as possible to tap chest, resetting slowly to train high-velocity posterior shoulder firing."
    ),
    (
        "Backpack Floor-to-Overhead Ballistic Snatch",
        5.5,
        "Backpack-weighted",
        "Grip backpack on floor between feet. In one continuous explosive hip extension, pull the bag upward along your body and punch it overhead into a locked catch."
    ),
    (
        "Band-Resisted Ankle Flips for Foot Speed",
        4.6,
        "Resistance Bands",
        "Anchor band under feet while holding ends for downward tension. Execute 20 rapid ankle hops off the floor, training plantarflexor stretch reflex under light tension."
    ),

    # --- UNILATERAL & ROTATIONAL HOME RFD (Home: 15) ---
    (
        "Single-Leg Step-Up With Explosive Knee Drive",
        5.2,
        "Bodyweight",
        "Place one foot on a 6-inch step. Drive through the heel to ascend explosively, launching the trailing knee upward to hip height while lifting slightly off the step surface."
    ),
    (
        "Lateral Bound to Counter-Movement Spring",
        5.4,
        "Bodyweight",
        "Bound laterally off right foot to left foot, immediately spring back to right foot with minimal amortization delay, and freeze the landing for 2 seconds."
    ),
    (
        "Standing Rotational Pivot Jump 90 Degrees",
        5.0,
        "Bodyweight",
        "Dip into a quarter-squat, jump vertically, and rotate hips 90 degrees in mid-air to land facing the side wall softly in an athletic stance, alternating sides."
    ),
    (
        "Split Squat Jump With Light Hand Support",
        5.3,
        "Bodyweight",
        "In a lunge stance holding a chair for balance, dip down and explosively jump upward, switching foot positions in mid-air to land softly in the opposite lunge."
    ),
    (
        "Single-Leg Low Pogo Hop on Carpet Left",
        4.8,
        "Bodyweight",
        "Perform 12 light, springy ankle hops in place on the left foot with minimal knee bend, focusing on rapid ground contact and calf stiffness."
    ),
    (
        "Single-Leg Low Pogo Hop on Carpet Right",
        4.8,
        "Bodyweight",
        "Perform 12 light ankle hops on the right foot, matching spring frequency and landing stability."
    ),
    (
        "Backpack Rotational Hip Throw Simulation",
        5.1,
        "Backpack-weighted",
        "Hold a 4 kg backpack at your right hip. Pivot on your right foot and swing the bag violently across your chest to the left shoulder, stopping the bag abruptly to train core deceleration."
    ),
    (
        "Standing Speed Skater Jump Progression",
        5.2,
        "Bodyweight",
        "Leap laterally from foot to foot with a wide arm swing, maintaining continuous rhythmic side-to-side cadence across 16 explosive bounds."
    ),
    (
        "Forward Deceleration Hop to Balance Left",
        4.9,
        "Bodyweight",
        "Hop forward 3 feet landing on the left foot only, sinking into a 45-degree knee bend and freezing the balance for 3 seconds without wobbling."
    ),
    (
        "Forward Deceleration Hop to Balance Right",
        4.9,
        "Bodyweight",
        "Hop forward 3 feet landing strictly on the right foot, absorbing ground reaction forces through the hip and knee."
    ),
    (
        "Staggered Stance Rotational Jump Turn 180",
        5.3,
        "Bodyweight",
        "In a split stance, jump explosively and rotate 180 degrees in mid-air, landing in a reversed split stance with quiet footwork."
    ),
    (
        "Wall-Supported Single-Leg Lateral Bound",
        5.0,
        "Bodyweight",
        "Stand beside a wall for safety. Push off the outside foot laterally toward the wall, absorbing the landing on the inside foot with hand touching the wall."
    ),
    (
        "Curtsy Lunge to Explosive Lateral Hop",
        5.2,
        "Bodyweight",
        "Step back into a curtsy lunge, then drive out of the bottom position into an explosive lateral jump to the opposite side, sticking the landing."
    ),
    (
        "Floor-Tap to Explosive Vertical Pop",
        5.1,
        "Bodyweight",
        "Hinge down to tap the floor between your feet, then instantly explode upward into a vertical pop jump with arms overhead, resetting between reps."
    ),
    (
        "Standing High-Cadence Fast-Feet Chopper",
        4.4,
        "Bodyweight",
        "In a quarter-squat athletic stance, chop feet against the floor as fast as possible for 10 seconds, stimulating maximum motor unit firing frequency."
    ),
]

beg_gym_data = [
    # --- GYM: OLYMPIC INTRODUCTIONS & BALLISTIC RESISTANCE (Gym: 33) ---
    (
        "Light Barbell Hang Clean High Pull",
        5.8,
        "Barbell",
        "Hold an empty Olympic barbell at mid-thigh in a hang position. Hinge hips, then violently extend hips and knees while shrugging shoulders to pull the bar to sternum height with vertical bar path."
    ),
    (
        "Dumbbell Jump Squat With Light Load",
        5.7,
        "Dumbbells",
        "Hold two 5 kg dumbbells at your sides. Descend into a shallow quarter-squat, then explosively jump vertically, absorbing the landing smoothly through hips and knees."
    ),
    (
        "Kettlebell Two-Hand Russian Swing Ballistic Drive",
        5.6,
        "Dumbbells",
        "Grip a moderate kettlebell with both hands. Hinge hips backward, then snap hips forward forcefully to float the bell to chest level, powering the movement exclusively with the posterior chain."
    ),
    (
        "Medicine Ball Overhead Floor Slam",
        5.5,
        "Dumbbells",
        "Stand tall holding a 4 kg medicine ball overhead. Rise onto toes, engage core, and slam the ball violently into the gym floor, catching it off the bounce."
    ),
    (
        "Trap Bar Low-Box Jump Shrug",
        5.9,
        "Barbell",
        "Step inside an empty trap bar. Dip into a quarter-squat, then explosively jump 2 inches off the floor while shrugging shoulders at peak extension, landing softly with reset."
    ),
    (
        "Dumbbell Push Press With Dip and Drive",
        5.6,
        "Dumbbells",
        "Hold dumbbells at shoulder height. Dip knees 3 inches, then aggressively drive through legs to launch the dumbbells overhead to locked arms in one fluid impulse."
    ),
    (
        "Cable Low-Pulley Explosive Woodchopper",
        5.4,
        "Cable",
        "Grip handle at low pulley. Rotate torso diagonally upward and across to opposite shoulder with high velocity, driving through the rear foot pivot."
    ),
    (
        "Light Barbell Push Jerk Power Catch",
        5.9,
        "Barbell",
        "Hold bar in front rack. Dip knees, drive upward through legs, and drop underneath the bar into a solid quarter-squat catch with arms locked overhead."
    ),
    (
        "Medicine Ball Rotational Chest Pass Against Wall",
        5.3,
        "Dumbbells",
        "Stand sideways 5 feet from a concrete wall holding a medicine ball. Rotate hips and throw the ball explosively into the wall, catching the rebound."
    ),
    (
        "Standing Cable Ballistic Punch-Out Right",
        5.2,
        "Cable",
        "Grip single cable handle at chest height facing away from stack. Drive an explosive straight punch against light stack resistance, snapping back under control."
    ),
    (
        "Standing Cable Ballistic Punch-Out Left",
        5.2,
        "Cable",
        "Drive an explosive left straight punch against cable tension, training upper-body rate of force development."
    ),
    (
        "Plyometric Box Jump 12-Inch Soft Land",
        5.6,
        "Bodyweight",
        "Stand facing a 12-inch padded box. Swing arms and jump onto the box, landing softly in a quarter-squat with knees aligned over toes."
    ),
    (
        "Single-Arm Dumbbell Snatch From Hang",
        5.8,
        "Dumbbells",
        "Hold dumbbell between knees in a hang stance. Drive hips forward, pull dumbbell vertically, and punch overhead to catch in a shallow squat."
    ),
    (
        "Cable High-to-Low Ballistic Core Chop",
        5.3,
        "Cable",
        "Pull cable diagonally downward across body with maximum speed, engaging rectus abdominis and obliques in rapid deceleration."
    ),
    (
        "Kettlebell Single-Arm Swing Right",
        5.5,
        "Dumbbells",
        "Hinge at hips holding kettlebell in right hand. Snap hips forward to project the bell to chest level with a neutral spine."
    ),
    (
        "Kettlebell Single-Arm Swing Left",
        5.5,
        "Dumbbells",
        "Execute single-arm kettlebell swing with left hand, training unilateral posterior chain power transfer."
    ),
    (
        "Medicine Ball Overhead Backward Toss",
        5.4,
        "Dumbbells",
        "Stand in an open area holding a medicine ball between knees. Hinge hips and launch the ball backward over your head with full-body extension."
    ),
    (
        "Smith Machine Explosive Bench Throw Catch",
        5.8,
        "Machine",
        "Lie on bench under empty Smith machine bar. Lower bar to chest, press upward with maximum velocity so bar releases into air 4 inches, and catch softly."
    ),
    (
        "Cable Low-Anchor Explosive Hip Extension Drive",
        5.2,
        "Cable",
        "Straddle low cable with rope attachment between legs. Hinge hips back, then explosively thrust hips forward to full upright standing lockout."
    ),
    (
        "Barbell Hang Clean Pull From Above Knee",
        5.9,
        "Barbell",
        "From above knees, drive aggressively into triple extension and shrug shoulders, letting bar float to chest height without catching in a rack."
    ),
    (
        "Seated Medicine Ball Chest Pass to Partner or Wall",
        5.1,
        "Dumbbells",
        "Sit on floor with legs straight holding medicine ball at sternum. Throw ball horizontally forward into wall with explosive elbow extension."
    ),
    (
        "Dumbbell Push Jerk Power Land",
        5.7,
        "Dumbbells",
        "Dip and drive two moderate dumbbells overhead, dropping into a shallow squat catch with locked arms before standing up."
    ),
    (
        "Plyometric Lateral Box Step-Off and Stick",
        5.3,
        "Bodyweight",
        "Step laterally off a 6-inch aerobic step, land on the gym floor on both feet with a wide base, and absorb the impact quietly."
    ),
    (
        "Barbell Overhead Shrug Pop",
        5.6,
        "Barbell",
        "Hold bar locked overhead with snatch grip. Dip knees 2 inches and pop upward onto toes while shrugging traps violently toward ears."
    ),
    (
        "Cable Explosive Row With 2-Second Hold",
        5.4,
        "Cable",
        "Sit at cable row with light stack. Pull handle into abdomen with explosive velocity, hold peak retraction for 2 seconds, and return smoothly."
    ),
    (
        "Kettlebell Clean to Goblet Catch",
        5.5,
        "Dumbbells",
        "Swing kettlebell from between legs and pop it upward, catching the horns of the bell at chest height in a crisp quarter-squat."
    ),
    (
        "Medicine Ball Rotational Scoop Toss",
        5.3,
        "Dumbbells",
        "Hold medicine ball low at hip. Pivot on rear foot and scoop the ball forward and upward into a wall with explosive hip drive."
    ),
    (
        "Incline Bench Plyometric Push-Up on Barbell in Rack",
        5.5,
        "Barbell",
        "Set barbell on safety pins at waist height. Perform push-ups against the bar, driving upward so palms leave the steel momentarily."
    ),
    (
        "Cable Face Pull With Explosive Terminal Snap",
        5.2,
        "Cable",
        "Pull rope toward forehead with rapid acceleration, flaring wrists back to snap the posterior deltoids into rapid contraction."
    ),
    (
        "Dumbbell Hang Clean and Press Combo",
        5.8,
        "Dumbbells",
        "Clean dumbbells to shoulders with hip pop, immediately dip and drive them overhead into a locked push press."
    ),
    (
        "Barbell Speed Deadlift at 50% 1RM",
        5.9,
        "Barbell",
        "Load bar with 50% 1RM. Set up with tight lats and pull from floor with maximum acceleration, locking out hips aggressively."
    ),
    (
        "Plyometric Low-Hurdle Forward Step-Over Jump",
        5.4,
        "Bodyweight",
        "Place three 6-inch mini hurdles in a line. Jump over each hurdle in succession with bouncy, spring-loaded foot contacts."
    ),
    (
        "Cable Single-Arm High-Speed Lat Pulldown",
        5.3,
        "Cable",
        "Kneel before high pulley. Pull handle down to shoulder with maximal speed, pausing for 1 second at full lat contraction."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home Count: {len(beg_home_data)} (Target: 77)")
    print(f"Beginner Gym Count: {len(beg_gym_data)} (Target: 33)")
    print(f"Total Beginner Count: {len(beg_home_data) + len(beg_gym_data)} (Target: 110)")
    assert len(beg_home_data) == 77
    assert len(beg_gym_data) == 33
    for item in beg_home_data + beg_gym_data:
        assert 4.0 <= item[1] <= 6.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Beginner exercise: {item[0]}"
    print("Beginner validation passed!")
