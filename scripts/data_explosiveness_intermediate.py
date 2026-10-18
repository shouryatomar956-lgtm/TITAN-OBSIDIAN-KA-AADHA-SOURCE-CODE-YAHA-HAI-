#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 7: EXPLOSIVENESS - INTERMEDIATE TIER (Total: 190 Exercises)
# 133 Home (70%) + 57 Gym (30%)
# Validated Plyometric Science, Dynamic SSC & Ballistic RFD, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 6.1 and 8.0
# ==============================================================================

int_home_data = [
    # --- VERTICAL PLYOMETRICS & JUMP PROGRESSIONS (Home: 30) ---
    (
        "Maximal Countermovement Jump With Arm Swing",
        7.4,
        "Bodyweight",
        "Stand tall with feet hip-width apart. Rapidly unweight by dipping into a quarter-squat while driving arms backward, then violently reverse direction through full triple extension, launching vertically with maximal intent and absorbing landing softly in an athletic stance."
    ),
    (
        "Standing Continuous Tuck Jumps",
        7.5,
        "Bodyweight",
        "From an athletic stance, explode upward into a vertical jump, pulling knees up to chest at the peak of the jump. Immediately upon touching the floor, rebound off the balls of your feet with minimal ground contact time across 8 continuous repetitions."
    ),
    (
        "Heavy Backpack Jump Squat Explosive Drive",
        7.7,
        "Backpack-weighted",
        "Wear a 10 kg backpack securely strapped across chest and shoulders. Descend into a half-squat, pause for half a second to dissipate passive elasticity, and violently explode off the floor, landing softly through a full decelerative squat."
    ),
    (
        "Kneeling Jump to Athletic Squat Catch",
        7.6,
        "Bodyweight",
        "Kneel on a soft mat with toes untucked and hips extended. Swing arms backward, then violently thrust hips forward while snapping feet underneath you, landing in a deep, balanced squat stance with chest upright."
    ),
    (
        "Pause Squat Jump With 3-Second Bottom Hold",
        7.3,
        "Bodyweight",
        "Descend into a parallel squat and hold for 3 seconds to eliminate stretch-shortening cycle potentiation. From the dead stop, explode vertically into the air with zero countermovement, maximizing pure concentric rate of force development."
    ),
    (
        "Household Stair Triple Step Jump-Up",
        7.4,
        "Bodyweight",
        "Stand at the base of a flight of stairs. Dip and leap upward to land softly on the third stair tread in a balanced quarter-squat, absorbing the impact before stepping down to reset."
    ),
    (
        "Repeated Double-Leg Hurdle Hops Over Household Cones",
        7.5,
        "Bodyweight",
        "Set up four 12-inch obstacles in a line. Jump over each hurdle in rapid succession, minimizing ground contact time to less than 200 milliseconds to train fast stretch-shortening cycle mechanics."
    ),
    (
        "Squat Jump With 180-Degree Mid-Air Turn",
        7.2,
        "Bodyweight",
        "Perform an explosive vertical jump, rotate 180 degrees in mid-air, and land facing the opposite direction in a shock-absorbing quarter-squat, reversing rotation direction each repetition."
    ),
    (
        "Split Squat Jump With Scissor Switch",
        7.6,
        "Bodyweight",
        "Descend into a lunge until rear knee hovers above the floor. Explode vertically with maximum power, switch leg positions in mid-air, and land softly in the opposite lunge position."
    ),
    (
        "Staggered Stance Vertical Launch",
        7.1,
        "Bodyweight",
        "Set up with one foot half a step ahead of the other. Dip quickly and launch upward into a maximal vertical jump, focusing on asymmetric propulsion before switching stance."
    ),
    (
        "Backpack-Weighted Step-Up Jump",
        7.5,
        "Backpack-weighted",
        "Place one foot on a sturdy 12-inch chair wearing an 8 kg backpack. Drive through the heel with maximal velocity to launch the body into the air, landing back on the step under control."
    ),
    (
        "Continuous Reactive Pogo Hops Over Line",
        7.0,
        "Bodyweight",
        "Bounce rapidly forward and backward over a floor tape line with stiff ankles, keeping knees nearly straight to isolate fast Achilles tendon recoil across 25 rapid touches."
    ),
    (
        "Depth Drop From 12-Inch Chair to Vertical Jump",
        7.8,
        "Bodyweight",
        "Step off a 12-inch chair. Upon touching the floor, instantly reverse the landing impact into a maximal vertical leap, minimizing ground contact time."
    ),
    (
        "Double-Foot Frog Jump Progression",
        7.2,
        "Bodyweight",
        "Squat deep, touch fingertips to floor, and explode upward and forward in a high arching leap, landing softly in a deep squat across 6 continuous bounds."
    ),
    (
        "Single-Leg Step-Down to Explosive Box Pop",
        7.4,
        "Bodyweight",
        "Lower from a step on one leg, touch the floor lightly, and instantly drive back up into a vertical leap off the working leg."
    ),
    (
        "Backpack-Weighted Tuck Jump 6 kg",
        7.7,
        "Backpack-weighted",
        "Wear a tightly fastened 6 kg backpack. Execute explosive tuck jumps, pulling knees up to hips and absorbing the weighted landing with great control."
    ),
    (
        "Seated Chair Jump With Instant Floor Rebound",
        7.5,
        "Bodyweight",
        "Sit on a dining chair. Stand and jump forward 2 feet, land on the balls of your feet, and immediately rebound into a maximal vertical jump."
    ),
    (
        "Wall-Facing Countermovement Jump to Target Touch",
        7.2,
        "Bodyweight",
        "Stand 1 foot from a wall. Perform a countermovement jump reaching for the highest possible mark on the wall, landing softly."
    ),
    (
        "Drop Freeze Landing From 18-Inch Bed Edge",
        7.3,
        "Bodyweight",
        "Step off an 18-inch bed. Land with both feet simultaneously in a perfect quarter-squat, freezing the landing with zero wobble for 3 seconds."
    ),
    (
        "Continuous Ankle Jumps With Overhead Reach",
        7.0,
        "Bodyweight",
        "Keep arms locked overhead and bounce off stiff ankles for 20 continuous reps, training vertical stiffness under an elongated torso lever."
    ),
    (
        "Diagonal Slant Jump From Carpet to Mat",
        7.1,
        "Bodyweight",
        "Jump diagonally upward off two feet, landing 3 feet away on a soft mat to condition multi-planar shock absorption."
    ),
    (
        "Rotational Squat Jump 90 Degrees Continuous",
        7.3,
        "Bodyweight",
        "Perform continuous jump squats, rotating 90 degrees at each rebound to complete a full 360-degree circle in four explosive jumps."
    ),
    (
        "Backpack Lunge Jump With Alternating Switch 8 kg",
        7.8,
        "Backpack-weighted",
        "Wear an 8 kg backpack. Perform alternating lunge jumps, switching legs in mid-air with explosive hip extension and quiet foot landings."
    ),
    (
        "Squat Jack Explosive Plyometric Rebound",
        6.9,
        "Bodyweight",
        "From a deep squat, jump explosively into the air, flaring legs and arms out into a star shape, returning to a deep squat landing."
    ),
    (
        "Prone Burpee to Maximal Tuck Jump",
        7.6,
        "Bodyweight",
        "Drop to floor chest-to-mat, snap feet to hands, and instantly launch into a maximal tuck jump, pulling knees high."
    ),
    (
        "Elevated Knee-Tuck Jump Off 6-Inch Step",
        7.4,
        "Bodyweight",
        "Jump from flat floor onto a 6-inch step, tucking knees at peak height and landing softly atop the step."
    ),
    (
        "Staggered Stance Rapid Rebound Hops",
        7.1,
        "Bodyweight",
        "In a split stance, bounce rapidly in place off both feet for 10 quick touches, then switch lead foot without pausing."
    ),
    (
        "Wall-Facing Continuous Jump and Tap",
        7.0,
        "Bodyweight",
        "Jump continuously against a wall, tapping high marks on each rebound with minimal ground contact time."
    ),
    (
        "Backpack Quarter-Squat Spring Hops 10 kg",
        7.5,
        "Backpack-weighted",
        "Wear a 10 kg backpack. Perform 12 rhythmic, spring-like vertical jumps off the balls of the feet with quick turnaround."
    ),
    (
        "Single-Leg Low Step Jump Catch",
        7.4,
        "Bodyweight",
        "Stand on one foot before a 4-inch step. Jump onto the step on the same foot, absorbing the landing in a quiet quarter-squat balance."
    ),

    # --- HORIZONTAL & LATERAL BOUNDING (Home: 30) ---
    (
        "Maximal Standing Broad Jump for Distance",
        7.6,
        "Bodyweight",
        "Swing arms back while loading hips into a deep hinge, then explosively drive forward horizontally, extending hips and knees fully to achieve maximum distance, landing softly on both feet."
    ),
    (
        "Repeated Double-Leg Broad Jumps Across Room",
        7.7,
        "Bodyweight",
        "Perform three consecutive maximal broad jumps across the floor, linking each landing into the next jump with zero hesitation to optimize horizontal stretch-shortening cycle efficiency."
    ),
    (
        "Lateral Skater Bounds With 2-Second Stick",
        7.5,
        "Bodyweight",
        "Push off the right foot laterally, bound 5 feet sideways to the left, land cleanly on the left foot, and freeze the single-leg balance for 2 seconds before bounding back."
    ),
    (
        "Continuous Lateral Speed Skater Hops",
        7.4,
        "Bodyweight",
        "Bound side-to-side continuously without pausing on landings, utilizing the stretch reflex of the hip abductors and ankle stabilizers across 16 rapid lateral bounds."
    ),
    (
        "Single-Leg Linear Hop to Two-Foot Stick",
        7.3,
        "Bodyweight",
        "Drive off one foot for a maximal forward hop, absorb the landing on both feet simultaneously in a wide athletic stance, and pause for 2 seconds."
    ),
    (
        "Zig-Zag Diagonal Lateral Bounding Matrix",
        7.6,
        "Bodyweight",
        "Bound diagonally forward-right off left foot, land on right foot, and instantly bound diagonally forward-left off right foot in a dynamic multi-directional slalom pattern."
    ),
    (
        "Backpack-Weighted Standing Broad Jump 8 kg",
        7.8,
        "Backpack-weighted",
        "Wear an 8 kg backpack. Hinge and launch horizontally for distance, using aggressive arm drive to counter the torso load upon stick landing."
    ),
    (
        "Backward Linear Bound to Two-Foot Stick",
        7.1,
        "Bodyweight",
        "Hinge hips and leap backward 3 feet, landing on both feet simultaneously with chest upright and knees tracking over toes."
    ),
    (
        "Single-Leg Lateral Hop Over Towel Roll Left",
        7.2,
        "Bodyweight",
        "Stand on the left foot beside a rolled towel. Hop laterally over the towel back and forth on the left leg only for 10 continuous touches."
    ),
    (
        "Single-Leg Lateral Hop Over Towel Roll Right",
        7.2,
        "Bodyweight",
        "Hop laterally over the towel on the right leg only, conditioning unilateral frontal-plane ankle stiffness and lateral RFD."
    ),
    (
        "Sprint-Deceleration 3-Step Plant and Cut",
        7.5,
        "Bodyweight",
        "Accelerate forward 3 fast sprint steps, plant the outside foot hard at a 45-degree angle, and explode laterally into a 2-step cut."
    ),
    (
        "Heiden Skater Jump With Floor Touch",
        7.4,
        "Bodyweight",
        "Bound laterally onto one leg, sink into a deep single-leg hinge to touch the floor with opposite hand, and explode laterally back to start."
    ),
    (
        "Linear Triple Hop on Single Leg Left",
        7.5,
        "Bodyweight",
        "Perform three consecutive forward hops on the left leg, maximizing forward displacement while maintaining rhythm and sticking the third landing."
    ),
    (
        "Linear Triple Hop on Single Leg Right",
        7.5,
        "Bodyweight",
        "Perform three consecutive forward hops on the right leg, ensuring equal horizontal force output and landing stability."
    ),
    (
        "Lateral Bound to Linear Sprint Burst",
        7.7,
        "Bodyweight",
        "Bound sideways 4 feet, land on the outside foot, and immediately redirect your momentum into an explosive 3-step forward sprint."
    ),
    (
        "Rotational 90-Degree Broad Jump",
        7.3,
        "Bodyweight",
        "Dip into a hinge, jump forward while rotating 90 degrees in the air, and land facing perpendicular to the launch vector in an athletic squat."
    ),
    (
        "Backpack Lateral Skater Bound 6 kg",
        7.6,
        "Backpack-weighted",
        "Wear a 6 kg backpack. Bound side-to-side over 4-foot distances, challenging lateral deceleration and hip abductor tendon stiffness."
    ),
    (
        "Double-Leg Forward Bound to Backward Pedal",
        7.4,
        "Bodyweight",
        "Leap forward in a broad jump, land, and instantly backpedal 4 steps with rapid turnover to starting position."
    ),
    (
        "Single-Leg Lateral Hop and Freeze Left",
        7.3,
        "Bodyweight",
        "Hop laterally to the left off the left foot, land on the left foot, and freeze the single-leg stance for 3 seconds without moving."
    ),
    (
        "Single-Leg Lateral Hop and Freeze Right",
        7.3,
        "Bodyweight",
        "Hop laterally to the right off the right foot, land on the right foot, and hold the balance firmly."
    ),
    (
        "Diagonal Cross-Over Bound to Stick",
        7.5,
        "Bodyweight",
        "Cross trailing leg behind and bound diagonally outward 4 feet, sticking the landing on the lead foot in deep athletic flexion."
    ),
    (
        "Broad Jump With 3-Second Deep Squat Pause",
        7.2,
        "Bodyweight",
        "Jump horizontally for maximum distance, land in a deep parallel squat, and hold the bottom position for 3 seconds."
    ),
    (
        "Multi-Directional Four-Corner Sprint Shuffle",
        7.1,
        "Bodyweight",
        "Sprint forward 10 feet, shuffle right 8 feet, backpedal 10 feet, and shuffle left 8 feet with rapid change-of-direction plants."
    ),
    (
        "Single-Leg Diagonal Bound Left-to-Right",
        7.4,
        "Bodyweight",
        "Bound diagonally 45 degrees from left foot to right foot covering 4 feet, stabilizing for 1 second before alternating."
    ),
    (
        "Single-Leg Diagonal Bound Right-to-Left",
        7.4,
        "Bodyweight",
        "Bound diagonally from right foot to left foot, training multi-planar decelerative motor control."
    ),
    (
        "Double-Leg Lateral Bound to Box",
        7.5,
        "Bodyweight",
        "Stand beside a 6-inch step. Jump laterally with both feet onto the step, landing softly in an athletic crouch."
    ),
    (
        "Fast-Turnover Linear Bound Sprints",
        7.6,
        "Bodyweight",
        "Perform 5 continuous long, bounding sprint strides down a hallway or yard, emphasizing maximal hip extension and knee drive."
    ),
    (
        "Backward Hop to Forward Broad Jump",
        7.4,
        "Bodyweight",
        "Hop backward 2 feet, land on the balls of your feet, and instantly rebound forward into a maximal broad jump."
    ),
    (
        "Backpack Linear Hop-to-Stick 10 kg",
        7.7,
        "Backpack-weighted",
        "Wear a 10 kg backpack. Hop forward 3 feet off both feet and stick the landing with rigid torso alignment."
    ),
    (
        "Lateral Shuffler Double Bound Combo",
        7.3,
        "Bodyweight",
        "Shuffle twice to the right and immediately leap into a maximal lateral bound, sticking the landing."
    ),

    # --- UPPER BODY PLYOMETRICS & EXPLOSIVE PUSH-UPS (Home: 25) ---
    (
        "Full Floor Plyometric Clap Push-Up",
        7.7,
        "Bodyweight",
        "From a rigid plank, lower chest to floor, then violently press upward with maximal velocity so hands leave the floor, clap palms together in mid-air, and land with soft, absorbing elbows."
    ),
    (
        "Explosive Hand-Release Push-Up",
        7.3,
        "Bodyweight",
        "Lower chest to mat, lift hands completely off the floor for half a second to break momentum, then plant palms and drive upward with explosive speed to full lockout."
    ),
    (
        "Incline Plyometric Push-Up to Elevated Platform",
        7.4,
        "Bodyweight",
        "Start with hands on floor. Explode upward and jump hands onto a 4-inch aerobic step or book stack, then drop hands back to floor on the next rep."
    ),
    (
        "Explosive Crossover Push-Up on Stair Step",
        7.5,
        "Bodyweight",
        "With one hand on a stair step and one on the floor, explode upward, travel laterally, and switch hands in mid-air, landing softly on the opposite side."
    ),
    (
        "Backpack Heavy Chest Pass to Ground Slam",
        7.6,
        "Backpack-weighted",
        "Stand tall holding an 8 kg backpack. Slam it violently into the floor with full upper body and core flexion, pick it up, and repeat rapidly."
    ),
    (
        "Staggered Stance Explosive Plyo Push-Up",
        7.4,
        "Bodyweight",
        "Place one hand 4 inches forward and one hand 4 inches back. Explode upward off the floor, switch hand positions in mid-air, and land softly."
    ),
    (
        "Kneeling Rotational Backpack Wall Throw Left",
        7.5,
        "Backpack-weighted",
        "Kneel sideways to a wall holding a 6 kg backpack. Rotate shoulders back, then violently twist and launch the bag into the wall with core snap."
    ),
    (
        "Kneeling Rotational Backpack Wall Throw Right",
        7.5,
        "Backpack-weighted",
        "Kneel with right side to wall and launch the 6 kg backpack using explosive right-side core rotation and pectoral drive."
    ),
    (
        "Explosive Push-Up With Shoulder Tap",
        7.5,
        "Bodyweight",
        "Drive explosively off the floor so torso elevates, tap opposite shoulders with both hands in mid-air, and catch yourself softly before hitting the mat."
    ),
    (
        "Backpack-Weighted Incline Plyo Push-Up 6 kg",
        7.6,
        "Backpack-weighted",
        "Wear a 6 kg backpack with hands on a sofa. Explode upward so palms separate 3 inches from the cushion, landing softly."
    ),
    (
        "Overhead Soccer Throw With Weighted Backpack",
        7.3,
        "Backpack-weighted",
        "Hold a 5 kg backpack behind your head with both hands. Take a step forward and throw the bag into the ground with full lat and core extension."
    ),
    (
        "Supine Explosive Backpack Chest Throw 8 kg",
        7.7,
        "Backpack-weighted",
        "Lie supine on a mat holding an 8 kg backpack. Press it upward with maximum velocity, launching it 18 inches into the air, and catch softly."
    ),
    (
        "Kneeling Forward Fall to Explosive Push-Up",
        7.4,
        "Bodyweight",
        "Fall forward from a tall kneel, catch yourself on palms with elbows flexing smoothly, and instantly reverse direction to launch back to kneeling."
    ),
    (
        "Single-Arm Incline Explosive Push-Off Left",
        7.6,
        "Bodyweight",
        "Place left hand on a sturdy counter in a single-arm plank. Lower chest, then explosively shove away until the palm leaves the counter."
    ),
    (
        "Single-Arm Incline Explosive Push-Off Right",
        7.6,
        "Bodyweight",
        "Shove explosively off the counter with the right arm, building unilateral upper-body rate of force development."
    ),
    (
        "Floor Plyometric Diamond Push-Up",
        7.5,
        "Bodyweight",
        "With thumbs and index fingers joined under chest, lower down and explode upward so hands lift off the floor, landing with soft triceps absorption."
    ),
    (
        "Explosive Push-Up to High Pike Pop",
        7.3,
        "Bodyweight",
        "Drive off the floor explosively while simultaneously snapping hips upward into a pike, landing hands and feet softly."
    ),
    (
        "Backpack Underhand Forward Scoop Launch",
        7.4,
        "Backpack-weighted",
        "Grip an 8 kg backpack between legs. Hinge down and launch the bag forward and upward across the yard with explosive hip and delt power."
    ),
    (
        "Explosive Wide-Grip Floor Push-Up",
        7.2,
        "Bodyweight",
        "Place hands 6 inches wider than shoulder width. Explode upward off the mat, absorbing the wide landing with controlled pectoral tension."
    ),
    (
        "Prone Hand-Release Push-Up With Forward Reach",
        7.1,
        "Bodyweight",
        "Lower to floor, release hands, reach arms straight overhead in a superman pose, return palms to mat, and explode up to plank."
    ),
    (
        "Kneeling Backward Overhead Backpack Toss 6 kg",
        7.4,
        "Backpack-weighted",
        "Kneel facing away from target. Swing backpack between legs and throw backward overhead with full thoracic extension."
    ),
    (
        "Explosive Push-Up With Thigh Tap",
        7.7,
        "Bodyweight",
        "Drive off the floor with maximal velocity, tap hands to thighs in mid-air, and return hands to mat before chest makes contact."
    ),
    (
        "Chair-to-Floor Plyometric Push-Up Drop",
        7.5,
        "Bodyweight",
        "Start with hands on two low blocks. Drop hands to floor, absorb impact with elbows at 90 degrees, and explode back onto blocks."
    ),
    (
        "Standing Wall Chest Pass With 6 kg Backpack",
        7.3,
        "Backpack-weighted",
        "Stand 4 feet from wall. Throw backpack into wall with aggressive chest pass, catching and instantly driving back into the next throw."
    ),
    (
        "Explosive Decline Push-Up Feet on Bed",
        7.8,
        "Bodyweight",
        "Place feet on bed with hands on floor. Lower chest and drive upward so palms separate from the mat, absorbing the heavy decline load."
    ),

    # --- BAND BALLISTICS & WEIGHTED HIP SNAP (Home: 25) ---
    (
        "Heavy Band-Resisted Broad Jump",
        7.8,
        "Resistance Bands",
        "Anchor heavy band behind you around hips. Jump horizontally forward against strong elastic recoil, sticking the landing 4 feet out."
    ),
    (
        "Heavy Backpack Ballistic Kettlebell Swing 14 kg",
        7.7,
        "Backpack-weighted",
        "Hold a 14 kg backpack by top handle. Hinge hips deeply, then snap hips forward violently to project the bag to shoulder height with crisp glute lock."
    ),
    (
        "Standing Band-Resisted Sprint Acceleration Burst",
        7.6,
        "Resistance Bands",
        "Anchor band to doorpost around waist. Lean forward at 45 degrees into heavy tension, then drive into a 3-step explosive sprint burst."
    ),
    (
        "Heavy Band-Resisted Jump Squats 15 Reps",
        7.7,
        "Resistance Bands",
        "Stand on heavy loop band with strap across traps. Squat down and explode into vertical jumps against the compounding elastic resistance."
    ),
    (
        "Backpack Hang Power Clean 12 kg",
        7.5,
        "Backpack-weighted",
        "Hold 12 kg backpack at knees. Explode with triple extension, shrug shoulders, and catch bag on chest in a crisp quarter-squat."
    ),
    (
        "Backpack Hang Snatch 10 kg",
        7.6,
        "Backpack-weighted",
        "From hang position, violently extend hips and pull backpack in a single fluid vertical path, punching it overhead into a locked catch."
    ),
    (
        "Band-Resisted Lateral Speed Bound",
        7.5,
        "Resistance Bands",
        "With band anchored to side of waist, bound laterally away from anchor against heavy elastic tension, sticking the outside foot."
    ),
    (
        "Door-Anchor Band Explosive Hip Thrust",
        7.4,
        "Resistance Bands",
        "Loop heavy band around hips anchored behind. In tall kneeling, hinge back and snap hips forward with maximal velocity."
    ),
    (
        "Heavy Backpack Push Press 14 kg",
        7.5,
        "Backpack-weighted",
        "Hold 14 kg backpack at chest. Dip knees 3 inches and drive through legs to pop the bag overhead to full lockout."
    ),
    (
        "Standing Band-Resisted High Knee Sprint in Place",
        7.2,
        "Resistance Bands",
        "With band pulling backward at waist, sprint in place with high knee drive for 15 seconds at maximal turnover frequency."
    ),
    (
        "Backpack Single-Arm Ballistic Snatch 8 kg Left",
        7.6,
        "Backpack-weighted",
        "Swing 8 kg backpack between legs with left hand, pop hips, and snatch overhead in one explosive continuous trajectory."
    ),
    (
        "Backpack Single-Arm Ballistic Snatch 8 kg Right",
        7.6,
        "Backpack-weighted",
        "Snatch the 8 kg backpack overhead with right hand, training unilateral power transfer."
    ),
    (
        "Heavy Band Underhand Explosive Scoop Toss Simulation",
        7.3,
        "Resistance Bands",
        "Anchor band under feet. Grip band between legs and explosively scoop upward to chest height with full hip extension."
    ),
    (
        "Backpack Floor-to-Shoulder Ballistic Pop 14 kg",
        7.5,
        "Backpack-weighted",
        "Grip backpack on floor. In one motion, extend hips and pull bag to right shoulder, alternating to left shoulder on next rep."
    ),
    (
        "Band-Resisted Vertical Tuck Jump",
        7.8,
        "Resistance Bands",
        "With band over traps, jump upward and tuck knees against elastic resistance, landing softly in an athletic stance."
    ),
    (
        "Standing Band-Resisted Rotational Punch Cross",
        7.4,
        "Resistance Bands",
        "Anchor band behind. Rotate hips violently and throw a straight punch, transferring force from rear foot through the fist."
    ),
    (
        "Backpack Explosive Sumo Deadlift High Pull 14 kg",
        7.6,
        "Backpack-weighted",
        "Stand wide over backpack. Explode upward extending hips and pulling elbows high to chin level in one fluid motion."
    ),
    (
        "Band-Assisted Overspeed Jump Squats",
        7.5,
        "Resistance Bands",
        "Attach heavy band overhead to a chin-up bar. Grip band to reduce bodyweight by 20 kg, performing rapid, high-altitude jump squats."
    ),
    (
        "Backpack Thruster Ballistic Launch 12 kg",
        7.7,
        "Backpack-weighted",
        "Front squat with 12 kg backpack, then drive upward explosively out of the hole to launch the backpack overhead."
    ),
    (
        "Band-Resisted Lateral Hurdle Hop",
        7.4,
        "Resistance Bands",
        "With band around waist anchored to the side, hop laterally over an obstacle against resistance, landing softly."
    ),
    (
        "Backpack Russian Swing With 1-Second Float 16 kg",
        7.7,
        "Backpack-weighted",
        "Swing 16 kg backpack with maximum hip snap so it floats weightlessly at shoulder height for 1 second before snapping back down."
    ),
    (
        "Standing Band-Resisted Triple Extension Pop",
        7.3,
        "Resistance Bands",
        "Step on band while holding at shoulders. Dip and pop onto toes with rapid hip-knee-ankle extension without leaving floor."
    ),
    (
        "Backpack Power Clean and Push Jerk 14 kg",
        7.8,
        "Backpack-weighted",
        "Clean backpack to chest, immediately dip and jerk overhead, dropping into a shallow squat catch."
    ),
    (
        "Band-Resisted Skater Jump Rebound",
        7.5,
        "Resistance Bands",
        "Bound laterally against band resistance, immediately spring back, and stick the return landing."
    ),
    (
        "Backpack Hang Snatch to Overhead Squat Catch 10 kg",
        7.7,
        "Backpack-weighted",
        "Snatch backpack overhead, catching in a parallel squat with arms locked straight above head."
    ),

    # --- UNILATERAL & ROTATIONAL PLYOMETRICS (Home: 23) ---
    (
        "Single-Leg Box Jump Onto 12-Inch Chair",
        7.8,
        "Bodyweight",
        "Balance on one leg before a sturdy 12-inch chair. Dip into a quarter-squat and jump onto the chair landing on the same single leg, freezing the balance for 2 seconds."
    ),
    (
        "Single-Leg Forward Broad Jump Left",
        7.6,
        "Bodyweight",
        "Balance on left leg. Swing arms and hop forward 4 feet landing on left foot only, absorbing impact through knee and hip."
    ),
    (
        "Single-Leg Forward Broad Jump Right",
        7.6,
        "Bodyweight",
        "Jump forward 4 feet on right leg, sticking the single-leg landing firmly."
    ),
    (
        "Alternating Split Squat Jump With Pause",
        7.5,
        "Bodyweight",
        "Perform lunge jumps, pausing for 2 seconds in the bottom lunge position of each rep to eliminate elastic energy before jumping."
    ),
    (
        "Lateral Bound to Single-Leg 90-Degree Turn",
        7.6,
        "Bodyweight",
        "Bound laterally off right foot, rotate 90 degrees in air, and land on left foot facing perpendicular, sticking the landing."
    ),
    (
        "Single-Leg Pogo Hop Over Cone Left",
        7.3,
        "Bodyweight",
        "Hop forward and backward over a cone on left foot only with stiff ankle contacts for 10 reps."
    ),
    (
        "Single-Leg Pogo Hop Over Cone Right",
        7.3,
        "Bodyweight",
        "Hop over cone on right foot, developing unilateral Achilles reactivity."
    ),
    (
        "Rotational 180-Degree Broad Jump",
        7.5,
        "Bodyweight",
        "Hinge hips, jump forward while rotating 180 degrees in mid-air, and land backward in a balanced athletic squat."
    ),
    (
        "Curtsy Lunge to Explosive High Lateral Bound",
        7.4,
        "Bodyweight",
        "Drop into curtsy lunge and explode laterally outward 5 feet, sticking the landing on the outside foot."
    ),
    (
        "Single-Leg Triple Lateral Hop Left",
        7.5,
        "Bodyweight",
        "Hop three consecutive times laterally to the left on the left foot, sticking the third landing."
    ),
    (
        "Single-Leg Triple Lateral Hop Right",
        7.5,
        "Bodyweight",
        "Hop three times laterally to the right on the right foot, maintaining rhythmic ground contacts."
    ),
    (
        "Step-Down to Single-Leg Lateral Bound",
        7.7,
        "Bodyweight",
        "Step off 6-inch step on one foot and immediately bound laterally 4 feet onto the opposite foot."
    ),
    (
        "Rotational Skater Bound With 360 Arm Swing",
        7.4,
        "Bodyweight",
        "Bound laterally from foot to foot with wide, athletic arm swings to maximize angular momentum transfer."
    ),
    (
        "Single-Leg Lateral Hurdle Jump to Stick",
        7.5,
        "Bodyweight",
        "Jump laterally over an 8-inch obstacle off one leg and land on the same leg, freezing the stick."
    ),
    (
        "Staggered Stance Linear Sprint Cut Left",
        7.4,
        "Bodyweight",
        "Sprint 3 paces forward, plant right foot hard, and cut 60 degrees to the left with explosive hip drive."
    ),
    (
        "Staggered Stance Linear Sprint Cut Right",
        7.4,
        "Bodyweight",
        "Plant left foot and cut 60 degrees to the right, training multidirectional deceleration."
    ),
    (
        "Single-Leg Backward Hop to Forward Bound",
        7.6,
        "Bodyweight",
        "Hop backward 2 feet on one leg, instantly rebound forward into a 4-foot broad hop on the same leg."
    ),
    (
        "Backpack Single-Leg Lateral Bound 6 kg",
        7.7,
        "Backpack-weighted",
        "Wear a 6 kg backpack. Bound laterally 4 feet from foot to foot, absorbing the weighted landing."
    ),
    (
        "Split Lunge Jump to Deep Squat Transition",
        7.5,
        "Bodyweight",
        "Jump from a lunge, land in a parallel squat, jump from the squat, and land in the opposite lunge."
    ),
    (
        "Diagonal Bound Slalom Across Room",
        7.4,
        "Bodyweight",
        "Slalom diagonally across the floor on alternating single legs across 8 continuous explosive bounds."
    ),
    (
        "Single-Leg Drop Freeze From 8-Inch Block Left",
        7.5,
        "Bodyweight",
        "Step off an 8-inch block landing strictly on the left foot, freezing the knee at 45 degrees without knee valgus."
    ),
    (
        "Single-Leg Drop Freeze From 8-Inch Block Right",
        7.5,
        "Bodyweight",
        "Step off block landing on right foot, absorbing ground reaction forces cleanly."
    ),
    (
        "High-Velocity Fast-Feet In-and-Outs With Jump",
        7.2,
        "Bodyweight",
        "Perform 4 fast in-and-out foot chops, then immediately explode into a maximal vertical tuck jump."
    ),
]

int_gym_data = [
    # --- GYM: OLYMPIC LIFTS & BALLISTIC OVERLOAD (Gym: 57) ---
    (
        "Barbell Hang Power Clean at 65% 1RM",
        7.8,
        "Barbell",
        "Unrack barbell to mid-thigh. Hinge hips to top of knees, violently explode into triple extension, shrug, and pull underneath, catching the bar on front deltoids in a crisp quarter-squat."
    ),
    (
        "Barbell Hang Power Snatch at 60% 1RM",
        7.9,
        "Barbell",
        "Hold barbell with wide snatch grip at hip crease. Hinge, jump vertically with aggressive hip snap, and punch the bar overhead to catch in a shallow overhead squat."
    ),
    (
        "Barbell Push Jerk From Front Rack at 70% 1RM",
        7.8,
        "Barbell",
        "From front rack position, dip knees 3 inches vertically, drive up aggressively through legs, and drop 3 inches to catch the bar with locked arms overhead before standing."
    ),
    (
        "Trap Bar Jump Squat at 30% 1RM",
        7.7,
        "Barbell",
        "Stand inside trap bar loaded with 30% 1RM. Dip into quarter-squat and jump vertically off the floor, landing softly and resetting between repetitions."
    ),
    (
        "Kettlebell Heavy Ballistic Swing 24 kg",
        7.6,
        "Dumbbells",
        "Hinge deeply with a 24 kg kettlebell. Snap hips forward with maximum rate of force development to float the bell to chest height."
    ),
    (
        "Medicine Ball Rotational Wall Slam 6 kg",
        7.5,
        "Dumbbells",
        "Stand sideways 4 feet from wall. Rotate hips backward, then violently pivot and slam the 6 kg ball into the wall, catching off the rebound."
    ),
    (
        "Plyometric Box Jump 24-Inch Step-Down",
        7.6,
        "Bodyweight",
        "Jump onto a 24-inch plyo box from an athletic countermovement, landing softly on top in a quarter-squat, then step down to reset."
    ),
    (
        "Depth Jump From 18-Inch Box to Vertical Leap",
        7.9,
        "Bodyweight",
        "Step off an 18-inch box. Upon landing, instantly explode vertically toward the ceiling, minimizing ground contact time to less than 200 ms."
    ),
    (
        "Barbell Push Press at 75% 1RM",
        7.7,
        "Barbell",
        "Dip knees 4 inches and drive with maximum leg drive to launch barbell from front rack to overhead lockout."
    ),
    (
        "Dumbbell Hang Clean and Jerk 20 kg",
        7.7,
        "Dumbbells",
        "Clean two 20 kg dumbbells from hang to shoulders, immediately dip and jerk overhead to full lockout."
    ),
    (
        "Single-Arm Kettlebell Snatch 20 kg Left",
        7.7,
        "Dumbbells",
        "Swing kettlebell between legs, snap hips, and punch straight overhead to catch in one smooth ballistic motion."
    ),
    (
        "Single-Arm Kettlebell Snatch 20 kg Right",
        7.7,
        "Dumbbells",
        "Snatch 20 kg kettlebell overhead with right arm, training unilateral explosive hip drive."
    ),
    (
        "Barbell Power Clean From Floor at 70% 1RM",
        8.0,
        "Barbell",
        "Set up in clean start from floor. Pull bar smoothly past knees, then violently explode into second pull and catch on shoulders in quarter-squat."
    ),
    (
        "Cable Ballistic Rotational Woodchopper High-to-Low",
        7.4,
        "Cable",
        "Pull cable diagonally across body with maximum speed, accelerating through the core and pivoting on rear foot."
    ),
    (
        "Medicine Ball Overhead Slam 8 kg",
        7.6,
        "Dumbbells",
        "Lift 8 kg ball overhead on tiptoes, slam violently into gym floor using full lat and core contraction, and catch off bounce."
    ),
    (
        "Barbell Split Jerk From Rack at 70% 1RM",
        7.9,
        "Barbell",
        "Dip and drive bar from shoulders, splitting feet into a wide lunge catch with arms locked overhead before recovering feet."
    ),
    (
        "Trap Bar Deadlift Speed Pulls at 60% 1RM",
        7.7,
        "Barbell",
        "Pull trap bar from floor with maximal acceleration, locking out hips violently across 5 sets of 3 fast reps."
    ),
    (
        "Dumbbell Single-Arm Push Jerk 24 kg",
        7.6,
        "Dumbbells",
        "Dip and drive a 24 kg dumbbell overhead, dropping into a shallow catch with locked arm."
    ),
    (
        "Medicine Ball Scoop Toss for Height 6 kg",
        7.5,
        "Dumbbells",
        "Hinge down with 6 kg ball between knees, explode upward into full triple extension, launching ball straight up into the air."
    ),
    (
        "Kettlebell Double Clean From Floor 16 kg",
        7.6,
        "Dumbbells",
        "Clean two 16 kg kettlebells from floor to rack position with explosive hip drive and smooth wrist rotation."
    ),
    (
        "Cable Explosive High Pull With Step",
        7.4,
        "Cable",
        "Step back from low pulley, then drive forward while pulling rope to collarbones with explosive velocity."
    ),
    (
        "Barbell Hang Clean High Pull at 75% 1RM",
        7.8,
        "Barbell",
        "Explode through hips and traps with 75% 1RM, pulling bar to chest height with high elbows without catching."
    ),
    (
        "Plyometric Box Jump 30-Inch Soft Catch",
        7.8,
        "Bodyweight",
        "Jump onto a 30-inch box with maximal arm swing, absorbing landing in a quarter-squat."
    ),
    (
        "Dumbbell Power Clean to Push Press 18 kg",
        7.7,
        "Dumbbells",
        "Clean dumbbells to shoulders, then immediately launch overhead with leg drive across 6 explosive reps."
    ),
    (
        "Medicine Ball Lateral Wall Slam 6 kg Left",
        7.5,
        "Dumbbells",
        "Stand with right side to wall. Pivot on left foot and slam ball into wall with maximal rotational torque."
    ),
    (
        "Medicine Ball Lateral Wall Slam 6 kg Right",
        7.5,
        "Dumbbells",
        "Slam ball into wall from left side, balancing rotational power development."
    ),
    (
        "Barbell Speed Back Squat at 55% 1RM Bands",
        7.8,
        "Barbell",
        "Attach light bands to barbell. Lower to parallel and explode upward with maximal bar speed across 8 sets of 2 reps."
    ),
    (
        "Kettlebell Two-Hand High Pull 24 kg",
        7.6,
        "Dumbbells",
        "Swing kettlebell between legs, snap hips, and pull elbows high to chin level in one fluid explosive pull."
    ),
    (
        "Cable Standing Chest Press Ballistic Release",
        7.4,
        "Cable",
        "Press cable handles forward with maximal acceleration, holding peak extension for 1 second."
    ),
    (
        "Smith Machine Ballistic Incline Bench Throw",
        7.7,
        "Machine",
        "On a 30-degree incline, throw Smith bar upward off chest with maximal velocity, catching softly on descent."
    ),
    (
        "Barbell Hang Snatch High Pull at 65% 1RM",
        7.8,
        "Barbell",
        "From hang position with snatch grip, violently extend hips and traps, floating the bar to collarbone height."
    ),
    (
        "Dumbbell Hang Snatch to Overhead Squat 16 kg",
        7.7,
        "Dumbbells",
        "Snatch dumbbell overhead with one arm, descending into a shallow squat catch before standing."
    ),
    (
        "Trap Bar Explosive High Pull at 65% 1RM",
        7.8,
        "Barbell",
        "Drive trap bar upward from floor into a violent jump shrug, extending ankles, knees, and hips."
    ),
    (
        "Plyometric Lateral Hurdle Bounding Over 18-Inch Hurdles",
        7.7,
        "Bodyweight",
        "Bound laterally over three 18-inch hurdles in continuous succession with fast ground contacts."
    ),
    (
        "Medicine Ball Chest Pass Rebound Machine",
        7.4,
        "Dumbbells",
        "Stand 6 feet from a rebound trampoline. Throw 5 kg ball with maximal chest push and catch the rebound."
    ),
    (
        "Barbell Snatch Grip Deadlift Speed Pulls",
        7.7,
        "Barbell",
        "Pull with wide grip from floor with maximum acceleration, training posterior chain speed-strength."
    ),
    (
        "Cable Low-Pulley Step-Out Explosive Punch",
        7.4,
        "Cable",
        "Step forward explosively into a lunge while driving cable handle forward into a ballistic punch."
    ),
    (
        "Kettlebell Clean and Push Press 20 kg",
        7.7,
        "Dumbbells",
        "Clean 20 kg kettlebell to shoulder, then drive overhead with leg dip to full lockout."
    ),
    (
        "Barbell Push Jerk Behind the Neck at 65% 1RM",
        7.8,
        "Barbell",
        "From back rack position, dip and drive bar overhead, dropping into a shallow catch."
    ),
    (
        "Medicine Ball Backward Overhead Launch 8 kg",
        7.6,
        "Dumbbells",
        "Launch an 8 kg medicine ball backward overhead for maximum horizontal distance."
    ),
    (
        "Dumbbell Jump Shrug Heavy 25 kg",
        7.7,
        "Dumbbells",
        "Hold 25 kg dumbbells at sides. Dip knees and pop upward into a vertical jump shrug."
    ),
    (
        "Cable Face Pull With Ballistic Snap",
        7.3,
        "Cable",
        "Snap cable rope toward face with maximal velocity, holding peak contraction for 1 second."
    ),
    (
        "Barbell Power Clean From Blocks at Knee Height",
        7.9,
        "Barbell",
        "From wooden blocks, explode into second pull and catch bar on front deltoids with zero descent."
    ),
    (
        "Plyometric Depth Drop From 24-Inch Box to Stick",
        7.8,
        "Bodyweight",
        "Step off a 24-inch box, land flat-footed, and freeze the landing instantly to absorb high eccentric shock."
    ),
    (
        "Kettlebell Double Snatch 16 kg",
        7.8,
        "Dumbbells",
        "Swing two 16 kg kettlebells between legs, snap hips, and punch both bells overhead simultaneously."
    ),
    (
        "Barbell Hang Power Snatch Below Knee 65% 1RM",
        7.9,
        "Barbell",
        "Lower bar below kneecap, explode into vertical extension, and catch in a solid quarter-squat."
    ),
    (
        "Medicine Ball Underhand Forward Throw 8 kg",
        7.5,
        "Dumbbells",
        "Hinge and throw 8 kg medicine ball forward for distance using explosive hip extension."
    ),
    (
        "Cable Explosive Lat Pulldown With 1-Second Release",
        7.5,
        "Cable",
        "Pull bar down with maximum acceleration, hold for 1 second, and return smoothly."
    ),
    (
        "Dumbbell Hang Clean to Front Squat 22 kg",
        7.8,
        "Dumbbells",
        "Clean dumbbells to shoulders, drop into front squat, and drive up out of the hole."
    ),
    (
        "Barbell Speed Bench Press at 50% 1RM Bands",
        7.7,
        "Barbell",
        "Press bar off chest with maximal acceleration against band tension across 6 sets of 3 reps."
    ),
    (
        "Trap Bar Low-Box Step-Off to Broad Jump",
        7.8,
        "Bodyweight",
        "Step off a low box and immediately rebound into a maximal broad jump across the turf."
    ),
    (
        "Cable Standing Diagonal Chop Low-to-High Fast",
        7.4,
        "Cable",
        "Lift cable diagonally upward across body with maximum speed, pivoting on rear foot."
    ),
    (
        "Kettlebell Alternating Hand-to-Hand Swing 20 kg",
        7.5,
        "Dumbbells",
        "Swing 20 kg kettlebell, releasing and catching with opposite hand at the apex of the swing."
    ),
    (
        "Barbell Push Press From Behind Neck 70% 1RM",
        7.8,
        "Barbell",
        "Drive bar overhead from back traps using aggressive leg drive and locked core."
    ),
    (
        "Plyometric 18-Inch Hurdle Lateral Jump-and-Stick",
        7.6,
        "Bodyweight",
        "Jump laterally over 18-inch hurdle, sticking the landing on both feet in a deep squat."
    ),
    (
        "Dumbbell Snatch From Floor 22 kg",
        7.8,
        "Dumbbells",
        "Pull dumbbell from floor between feet, pop hips, and punch overhead into locked arm."
    ),
    (
        "Barbell Clean Pull at 90% 1RM",
        8.0,
        "Barbell",
        "Load bar with 90% clean 1RM. Pull from floor with maximum acceleration, exploding through traps and calves."
    ),
]

if __name__ == "__main__":
    print(f"Intermediate Home Count: {len(int_home_data)} (Target: 133)")
    print(f"Intermediate Gym Count: {len(int_gym_data)} (Target: 57)")
    print(f"Total Intermediate Count: {len(int_home_data) + len(int_gym_data)} (Target: 190)")
    assert len(int_home_data) == 133
    assert len(int_gym_data) == 57
    for item in int_home_data + int_gym_data:
        assert 6.1 <= item[1] <= 8.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Intermediate exercise: {item[0]}"
    print("Intermediate validation passed!")
