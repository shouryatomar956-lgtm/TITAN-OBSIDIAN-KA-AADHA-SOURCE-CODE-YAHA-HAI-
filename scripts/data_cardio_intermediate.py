#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 9: CARDIO - INTERMEDIATE TIER (Total: 114 Exercises)
# 80 Home (70%) + 34 Gym (30%)
# Validated Aerobic-Anaerobic Threshold Pacing, Tempo Conditioning
# Scientific Score Bounds: 6.1 to 8.0
# Equipment: Bodyweight, Backpack-weighted, Resistance Bands, Machine, Dumbbells, Barbell, None
# ==============================================================================

int_home_data = [
    # --- Dynamic Bodyweight Aerobic & Plyometric Calisthenics (Home) ---
    (
        "Standard Full-Range Bodyweight Burpee without Push-Up",
        6.8,
        "Bodyweight",
        "From standing, drop hands to floor, kick both feet back into a rigid plank, instantly snap feet forward outside hands, and jump vertically with hands overhead. Maintain a brisk rhythmic turnover to sustain high aerobic flux."
    ),
    (
        "Standard Chest-to-Floor Bodyweight Burpee",
        7.3,
        "Bodyweight",
        "Drop to floor with chest and thighs contacting mat, press up rapidly while popping hips and feet forward, and jump 6 inches off ground with overhead clap. Pace breathing to sustain steady cardiovascular output across multi-minute rounds."
    ),
    (
        "Continuous High-Knee Sprinting in Place",
        6.9,
        "Bodyweight",
        "Drive knees aggressively to waist height while striking the ground rapidly through the forefoot. Pump arms at 90-degree angles in sync with stride frequency to challenge maximal aerobic velocity."
    ),
    (
        "Rapid-Cadence Floor Mountain Climbers",
        6.7,
        "Bodyweight",
        "Hold a rigid push-up plank. Drive alternate knees explosively toward chest in a continuous piston motion, keeping hips level and core braced to elevate heart rate while minimizing spinal deflection."
    ),
    (
        "Lateral Skater Bounding Hops with Single-Leg Stick",
        7.1,
        "Bodyweight",
        "Leap laterally from right to left foot, sweeping trailing leg behind while swinging arms across torso in an athletic skating posture. Absorb landing softly and immediately rebound to develop lateral cardiovascular stamina."
    ),
    (
        "Bodyweight Jump Squat Rhythmic Cycling",
        7.4,
        "Bodyweight",
        "Descend into a parallel squat and explode upward vertically, extending ankles, knees, and hips completely. Land softly through midfoot and immediately absorb into the next descent in continuous cyclic rhythm."
    ),
    (
        "Alternating Jumping Split Lunges",
        7.6,
        "Bodyweight",
        "Drop into a deep split lunge and explode vertically, switching leg positions mid-air to land softly into the opposite lunge. Continuous split lunging demands massive lower-body oxygen consumption."
    ),
    (
        "Tuck Jump Plyometric Aerobic Intervals",
        7.7,
        "Bodyweight",
        "Explode upward from a half-squat, pulling both knees rapidly to chest at peak height. Land resiliently on balls of feet and immediately rebound, driving acute anaerobic glycolytic and cardiovascular demand."
    ),
    (
        "Fast-Paced Shadow Boxing 4-Punch Combinations",
        6.6,
        "Bodyweight",
        "In an active boxing stance, throw rapid jab-cross-hook-cross combinations while circling dynamically. Pivot on balls of feet and exhale sharply with each strike to sustain high aerobic output."
    ),
    (
        "Dynamic Plank-to-Squat Frogger Hops",
        6.8,
        "Bodyweight",
        "From a push-up plank, hop both feet forward outside hands landing in a deep flat-footed squat with hands lifted, then hop back into plank. Maintain rapid, continuous cycles to stimulate cardiorespiratory demand."
    ),
    (
        "Bear Crawl Dynamic Forward and Reverse Shuttles",
        7.0,
        "Bodyweight",
        "Hover knees 2 inches above ground in tabletop. Crawl forward 10 paces and backward 10 paces in continuous cadence, maintaining neutral spine and demanding continuous full-body oxygen delivery."
    ),
    (
        "Lateral Crab Walk Speed Shuttle Intervals",
        6.5,
        "Bodyweight",
        "Support body face up on hands and feet with hips elevated. Scuttle rapidly side-to-side across the room, challenging posterior chain and triceps while driving steady cardiovascular work."
    ),
    (
        "Speed Skater Hops with Floor Touchdown",
        7.2,
        "Bodyweight",
        "Bound laterally from foot to foot, hinging at the hips on each landing to lightly touch the opposite hand to the floor. The increased vertical displacement significantly magnifies aerobic expenditure."
    ),
    (
        "Pike Push-Up to Squat Jump Flow",
        7.3,
        "Bodyweight",
        "Perform a pike push-up targeting shoulders, hop feet forward into a squat, and explode into a vertical jump. Fluidly transition back down to link upper-body pressing with ballistic cardiovascular power."
    ),
    (
        "Cross-Jack Plyometric Scissor Intervals",
        6.4,
        "Bodyweight",
        "Jump feet wide while crossing arms in front of chest, then jump feet crossing right over left, alternating cross patterns continuously at a brisk tempo to elevate cardiac stroke volume."
    ),
    (
        "Lateral Plank Walks with High-Knee Rebound",
        6.8,
        "Bodyweight",
        "Walk hands and feet 4 paces laterally in a push-up plank, jump up to standing, perform 4 high-knee sprints, and return to plank. This multi-level transition stresses vascular compliance."
    ),
    (
        "Squat Thrust to Tuck Jump Transition",
        7.5,
        "Bodyweight",
        "Drop hands to floor, kick feet back to plank, snap feet forward into squat, and immediately launch into a vertical tuck jump. Continuous cyclic execution creates severe lactate and aerobic stress."
    ),
    (
        "Prone Hand-Release Burpee Cycling",
        7.2,
        "Bodyweight",
        "Descend into burpee, rest chest fully on floor, lift hands briefly off mat to ensure strict dead-stop, then press up dynamically and jump vertically with overhead reach."
    ),
    (
        "Donkey Kick to Broad Jump Sequence",
        7.4,
        "Bodyweight",
        "Place hands down, kick both heels toward glutes in a controlled handstand hop, land on feet, and immediately bound forward into a broad jump. Backpedal quickly and repeat."
    ),
    (
        "Fast-Tempo Sprawl to Double Knee Strike",
        7.1,
        "Bodyweight",
        "Drop hips to floor in an MMA defensive sprawl, bounce back to athletic stance, and fire two rapid alternating Muay Thai knee drives before resetting immediately."
    ),

    # --- Jump Rope Protocols & Agility Drills (Home) ---
    (
        "Jump Rope Basic Two-Foot Bounce Continuous Pacing",
        6.5,
        "Bodyweight",
        "Turn rope with wrists, jumping 1-2 inches off floor with soft knees and rhythmic forefoot strikes. Maintain steady breathing across 3-minute rounds to build aerobic efficiency."
    ),
    (
        "Jump Rope Alternate-Foot Boxer Step Cycling",
        6.8,
        "Bodyweight",
        "Shift weight lightly from left to right foot with each revolution of the rope in a classic boxer shuffle, keeping shoulders relaxed and core braced for prolonged aerobic stamina."
    ),
    (
        "Jump Rope High-Knee Sprint Revolutions",
        7.5,
        "Bodyweight",
        "Drive knees alternately toward waist height while spinning rope at high speed, turning standard jump rope into a high-cadence sprint interval for maximal cardiovascular stress."
    ),
    (
        "Jump Rope Lateral Side-to-Side Ski Hops",
        6.9,
        "Bodyweight",
        "Jump rope while hopping feet together laterally 6 inches side-to-side on each turn, challenging ankle stabilizers and elevating metabolic conditioning."
    ),
    (
        "Jump Rope Forward-and-Back Bell Hops",
        6.8,
        "Bodyweight",
        "Hop feet forward and backward across an imaginary midline with each rope turn, maintaining continuous ankle elasticity and steady respiratory rhythm."
    ),
    (
        "Jump Rope Speed Sprint Intervals (20s on / 10s off)",
        7.6,
        "Bodyweight",
        "Spin rope at maximum turnover rate for 20 seconds, followed by 10 seconds of slow boxer bouncing. Repeat for 8 continuous cycles to drive Tabata aerobic-anaerobic power."
    ),
    (
        "Jump Rope Criss-Cross Arm Crossover Revolutions",
        7.1,
        "Bodyweight",
        "Alternate standard two-foot jumps with crossed-forearm revolutions, coordinating rapid shoulder adduction with light footwork to sustain high metabolic demand."
    ),
    (
        "Jump Rope Heel-Toe Alternating Tap Intervals",
        6.7,
        "Bodyweight",
        "Tap right heel forward on one turn and left toe back on the next while maintaining uninterrupted rope revolutions, building neuro-cardiovascular rhythm."
    ),

    # --- Weighted Backpack & Banded Conditioning (Home) ---
    (
        "Backpack Weighted Walking Lunges Continuous Pacing",
        7.0,
        "Backpack-weighted",
        "Wear a 15-20 lb backpack strapped securely. Step forward into continuous lunges across living space, keeping torso tall and cycling without stopping to challenge oxygen delivery."
    ),
    (
        "Backpack Weighted Stair Climbing Intervals",
        7.4,
        "Backpack-weighted",
        "Ascend household stairs at a brisk 2-steps-at-a-time or steady 1-step cadence with a 20 lb backpack. Descend carefully to recover and repeat for multi-minute aerobic blocks."
    ),
    (
        "Backpack Loaded Speed Squat-to-Overhead Press",
        7.2,
        "Backpack-weighted",
        "Hold a weighted backpack at chest, squat rapidly to parallel, and thrust overhead with full hip extension. Continuous cyclic execution recruits full-body musculature."
    ),
    (
        "Backpack Weighted Rucking Brisk Incline Steps",
        7.1,
        "Backpack-weighted",
        "Wear a 20-25 lb weighted backpack and step continuously onto a sturdy 12-inch step or household incline, maintaining a steady 120-130 BPM aerobic tempo."
    ),
    (
        "Backpack Swing to Clean Dynamic Intervals",
        7.3,
        "Backpack-weighted",
        "Hinge at hips, swing weighted backpack between legs, and snap hips forward to catch backpack at chest height. Rapid hip extension drives substantial metabolic and cardiac output."
    ),
    (
        "Backpack Lateral Bound and Shuffle",
        7.2,
        "Backpack-weighted",
        "With a snug 15 lb backpack, bound laterally across room, touch floor, and shuffle rapidly back. The external mass increases kinetic braking and acceleration demands."
    ),
    (
        "Backpack Bear Hug March with High Knees",
        6.7,
        "Backpack-weighted",
        "Clasp a heavy backpack firmly against chest with both arms. March vigorously in place driving knees high, challenging thoracic breathing mechanics under aerobic load."
    ),
    (
        "Resistance Band Fast-Twitch Alternating Shadow Punching",
        6.6,
        "Resistance Bands",
        "Anchor band around upper back and hold handles. Fire rapid 1-2 punch combinations against continuous elastic tension, building upper-extremity aerobic stamina."
    ),
    (
        "Resistance Band High-Cadence Stationary Sprint Resisted Drive",
        7.3,
        "Resistance Bands",
        "Loop a heavy resistance band around waist anchored securely behind. Sprint in place against forward band pull, driving knees high and pumping arms aggressively."
    ),
    (
        "Resistance Band Jumping Jack Dynamic Pulsing",
        6.5,
        "Resistance Bands",
        "Place a mini-band around forearms and another around ankles. Perform standard jumping jacks against continuous outward elastic tension to intensify metabolic burn."
    ),
    (
        "Resistance Band Fast Mountain Climbers with Foot Loops",
        7.2,
        "Resistance Bands",
        "Loop a mini-band around balls of feet. Assume push-up plank and drive alternate knees forward against band resistance, combining core conditioning with aerobic output."
    ),
    (
        "Resistance Band Speed Squat to High Pull Cycling",
        6.9,
        "Resistance Bands",
        "Stand on band, squat to parallel, and explode upward while pulling handles to collarbones with flared elbows. Cycle continuously to elevate cardiovascular rate."
    ),

    # --- Floor & Agility Interval Drills (Home) ---
    (
        "Lateral Line Shuffles with Double Floor Touch",
        6.9,
        "Bodyweight",
        "Stay low in an athletic quarter-squat, shuffle 4 steps right, touch floor with both hands, and shuffle 4 steps left. Maintain rapid foot turnover without crossing feet."
    ),
    (
        "Forward-and-Back Acceleration Deceleration Shuttles",
        7.1,
        "Bodyweight",
        "Sprint forward 5 meters across room, plant lead foot to decelerate smoothly, backpedal rapidly to start, and immediately re-accelerate to train cardiac rate transitions."
    ),
    (
        "Quadrant Four-Square Hop Agility Conditioning",
        6.8,
        "Bodyweight",
        "Imagine a 2x2 grid on floor. Hop rapidly with feet together: front-right, front-left, back-left, back-right. Maintain continuous light hops for 45-second intervals."
    ),
    (
        "Continuous Plank Jacks with Forearm Support",
        6.6,
        "Bodyweight",
        "From a low plank on forearms, jump feet wide and narrow in a continuous jumping jack pattern, keeping core braced and hips level to elevate metabolic rate."
    ),
    (
        "Standing Fast-Paced Butt-Kick Sprints with High Turnover",
        6.5,
        "Bodyweight",
        "Sprint in place driving heels forcefully into glutes with maximum turnover rate, leaning slightly forward with active arm pumps to train posterior chain aerobic speed."
    ),
    (
        "Single-Leg Lateral Hop Bounds (Alternating Sets)",
        7.2,
        "Bodyweight",
        "Hop continuously on right foot laterally back and forth across a line for 30 seconds, then switch to left foot, developing unilateral foot and cardiorespiratory stamina."
    ),
    (
        "Prone Mountain Climber to Push-Up Ladder (5:1 Ratio)",
        7.4,
        "Bodyweight",
        "Perform 5 rapid mountain climber paces per leg, execute 1 crisp push-up, and immediately resume mountain climbers. Maintain seamless transitions for 3 minutes."
    ),
    (
        "In-and-Out Floor Agility Squat Thrusts",
        7.0,
        "Bodyweight",
        "From push-up plank, hop feet wide toward hands, hop back to narrow plank, hop feet between hands, and return. Constant hip and foot movement demands high oxygen flow."
    ),
    (
        "Continuous Scissor Lunge Jumps with Arm Drive",
        7.5,
        "Bodyweight",
        "Rapidly switch feet forward and back in a shallow split stance without dropping into deep lunges, pumping arms like a sprinter to sustain high-cadence aerobic work."
    ),
    (
        "Shadow Kickboxing 6-Strike Fluid Sequence",
        7.1,
        "Bodyweight",
        "String together jab, cross, left hook, right roundhouse kick, reset, and double knee strike. Constant multi-planar rotation and hip drives elevate heart rate effectively."
    ),
    (
        "Speed Bear Crawl 360-Degree Floor Rotations",
        7.2,
        "Bodyweight",
        "In bear crawl position with knees hovering, pivot hands and feet in a full 360-degree circle clockwise, then reverse counter-clockwise to challenge vestibular and aerobic control."
    ),
    (
        "Bilateral Frog Jumps with Quick Backpedal",
        7.4,
        "Bodyweight",
        "Perform two consecutive forward broad jumps from a squat, land softly, and immediately backpedal rapidly 10 feet to start, repeating in continuous unbroken sets."
    ),
    (
        "Gorilla Lateral Hop Shuttles",
        7.0,
        "Bodyweight",
        "In a deep low squat, place hands laterally on floor and hop feet across in a gorilla shuffle, shifting back and forth to tax quadriceps and cardiorespiratory capacity."
    ),
    (
        "Dynamic Duck Walk to Broad Jump Burst",
        7.3,
        "Bodyweight",
        "Walk 4 paces forward in a deep squat (duck walk), explode forward into a maximum-effort broad jump, jog backward to start, and immediately cycle."
    ),
    (
        "High-Plank Cross-Body Toe Tap Pacing",
        6.7,
        "Bodyweight",
        "From push-up plank, reach right hand under body to touch left toe while piking hips slightly, return, and alternate left hand to right toe in brisk rhythm."
    ),
    (
        "Standing Air-Jumping-Rope Double Unders Simulation",
        7.0,
        "Bodyweight",
        "Jump higher than standard rope hops, flicking wrists twice rapidly per jump to simulate double unders, conditioning plyometric calf stiffness and anaerobic threshold."
    ),
    (
        "Prone Cobra to Burpee Snap Up",
        7.1,
        "Bodyweight",
        "Lie prone, perform a spinal cobra extension, drop hands to floor, pop immediately to feet, jump vertically, and drop back down in a continuous aerobic-mobility flow."
    ),
    (
        "Alternating Curtsy Lunge Speed Hops",
        6.9,
        "Bodyweight",
        "Step left leg diagonally behind right into a curtsy lunge, spring laterally to switch directly into a right curtsy lunge, maintaining unbroken side-to-side rhythm."
    ),
    (
        "Staircase Double-Step Continuous Sprint Intervals",
        7.5,
        "Bodyweight",
        "Sprint up household stairs taking two steps per stride with forward torso lean, walk down carefully for active recovery, and repeat for 10 continuous ascents."
    ),
    (
        "Side-Plank Bottom Knee-Drive Aerobic Pulse",
        6.6,
        "Bodyweight",
        "Hold forearm side plank and drive top knee rhythmically toward chest for 30 seconds before switching sides, training lateral core stability under elevated respiration."
    ),
    (
        "Standing Triple-Punch to Sprawl Drill",
        7.4,
        "Bodyweight",
        "Throw three rapid straight punches in place, immediately drop chest to floor in a combat sprawl, pop up to fighting stance, and fire again in continuous flow."
    ),
    (
        "High-Speed Russian Twist with Hovering Feet",
        6.5,
        "Bodyweight",
        "Sit on floor with knees bent and feet elevated. Rotate hands rapidly from hip to hip, maintaining high turnover to stimulate abdominal endurance and breathing control."
    ),
    (
        "Standing Alternating Knee-Smash Pulls",
        6.8,
        "Bodyweight",
        "Reach both hands high diagonally, drive knee up forcefully to meet hands as if pulling an opponent into a strike, switch sides, and cycle at high cadence."
    ),
    (
        "Lateral Hurdle Jump Simulation over Household Object",
        7.3,
        "Bodyweight",
        "Bound side-to-side with feet together over a yoga block or towel roll, absorbing landing through knees and rebounding instantly to train lateral plyometric cardio."
    ),
    (
        "Standing Windmill Toe Touch Speed Intervals",
        6.4,
        "Bodyweight",
        "With wide stance and arms outstretched, hinge rapidly to touch opposite foot with alternating hands in continuous rotation, promoting posterior chain circulation."
    ),
    (
        "Plank Shoulder Tap to Mountain Climber Combo",
        6.8,
        "Bodyweight",
        "Tap right shoulder then left shoulder in push-up plank, drive 4 rapid mountain climbers, and repeat sequence without allowing hips to sag or sway."
    ),
    (
        "Low-Stance Lateral Defensive Basketball Slide",
        6.9,
        "Bodyweight",
        "Sink into a wide athletic squat, shuffle 5 paces laterally with arms wide, touch floor, and slide back, maintaining low center of mass to tax quadriceps and heart."
    ),
    (
        "Single-Leg Hop Stationary Matrix (North-East-South-West)",
        7.2,
        "Bodyweight",
        "Hop on one foot forward, right, back, and left in a continuous compass pattern for 30 seconds per leg, building ankle stability and unilateral cardiovascular endurance."
    ),
    (
        "Standing Overhead Fast High-Knee Chops",
        6.7,
        "Bodyweight",
        "Chop clasped hands downward from overhead to meet alternating high knee drives, pairing violent torso flexion with rapid lower-body turnover."
    ),
    (
        "Fast-Tempo Sprawl to Jump Squat Combo",
        7.5,
        "Bodyweight",
        "Drop to floor in a sprawl, snap feet under hips, explode into a vertical jump squat, land softly, and immediately drop back into sprawl for maximum metabolic density."
    ),
    (
        "Forward Broad Jump to 4-Count Backpedal Cycle",
        7.3,
        "Bodyweight",
        "Execute a powerful 2-foot broad jump landing softly in a quarter squat, immediately backpedal 4 quick steps, and reset to leap again in continuous cyclic pacing."
    ),
    (
        "Floor Bicycle Crunch High-Cadence Sprint Intervals",
        6.6,
        "Bodyweight",
        "Lie on back and pedal legs rapidly with reciprocal elbow-to-knee contact at maximum turnover for 30 seconds, forcing rapid respiration under core compression."
    ),
    (
        "Standing Split Jack Fast-Twitch Switch",
        6.5,
        "Bodyweight",
        "Jump feet forward and backward in a split stance while pumping opposite arms up and down, cycling at high cadence to develop running-specific aerobic coordination."
    ),
    (
        "Prone Hand-Release Burpee with Lateral Hop",
        7.4,
        "Bodyweight",
        "Perform a hand-release burpee, stand, and leap laterally 3 feet over a line before dropping directly into the next burpee on the opposite side."
    ),
    (
        "Lateral Plank Hop-Unders to Mountain Climber",
        7.1,
        "Bodyweight",
        "In high plank, hop both feet together diagonally to the right, hop back, hop to the left, hop back, and finish with 4 center mountain climbers."
    ),
    (
        "Standing Alternating Crescent Kick Cardio Flow",
        6.7,
        "Bodyweight",
        "Perform large circular outside-to-inside crescent kicks with alternating legs in continuous rhythm, opening hip capsule and elevating cardiorespiratory rate."
    ),
    (
        "Drop Squat to Rapid High-Knee Burst",
        7.0,
        "Bodyweight",
        "Drop feet wide into a quick squat touch, spring feet together, sprint 6 rapid high knees in place, and immediately drop back into wide squat."
    ),
    (
        "Continuous Side-to-Side Speed Hops on Low Step",
        7.1,
        "Bodyweight",
        "Hop continuously on and off a low household step laterally, maintaining elastic Achilles tendon recoil and steady cardiovascular rhythm."
    ),
    (
        "Burpee Broad Jump Across Living Room Floor",
        7.6,
        "Bodyweight",
        "Drop into a chest-to-floor burpee, snap feet under, and immediately jump forward as far as possible in a broad jump. Turn around and repeat continuously."
    ),
    (
        "Standing Double Jab-Cross-Hook Footwork Shuffle",
        6.8,
        "Bodyweight",
        "Deliver rapid double jab, cross, and lead hook, then shuffle 4 steps back and circle right, maintaining high aerobic alertness and combat conditioning."
    ),
]

int_gym_data = [
    # --- Commercial Ergometer Intervals & Gym Conditioning (Gym) ---
    (
        "Rowing Ergometer 500-Meter Moderate Interval Repeats",
        7.4,
        "Machine",
        "Row 500m intervals at 1:55-2:05/500m split pace with 1 minute rest between sets. Drive with 60% legs, 20% core, 20% arms at 26-28 SPM to develop aerobic power."
    ),
    (
        "Assault AirBike 10-Calorie High-Intensity Interval Sprints",
        7.7,
        "Machine",
        "Sprint at 65-75 RPM to burn 10 calories as fast as possible, rest 40 seconds, and repeat for 8-10 rounds to stress anaerobic threshold and cardiac recovery."
    ),
    (
        "Concept2 SkiErg 250-Meter Unbroken Pacing Repeats",
        7.5,
        "Machine",
        "Pull at 28-32 strokes per minute with full hip hinge and core crunch, holding steady split pace for 250m intervals to develop upper-body cardiovascular endurance."
    ),
    (
        "Commercial Stair Climber 60-Second Speed Surges",
        7.3,
        "Machine",
        "Alternate between 2 minutes of moderate stepping (level 7) and 1 minute of high-speed climbing (level 12-14) without holding handrails to maximize VO2 kinetics."
    ),
    (
        "Curved Manual Treadmill Steady-State Aerobic Run",
        7.5,
        "Machine",
        "Propel the curved belt manually by striking with midfoot under hips. The self-powered curved deck demands 30% higher metabolic expenditure than motorized treadmills."
    ),
    (
        "Treadmill 12-3-30 Incline Walking Protocol",
        7.2,
        "Machine",
        "Set treadmill to 12% incline at 3.0 mph for 30 unbroken minutes. The steep gradient elevates heart rate into Zone 3 without joint impact from running."
    ),
    (
        "Gym Turf Sled Forward Push Moderate-Load Shuttles",
        7.6,
        "Machine",
        "Load sled with 50% bodyweight. Push sled 25 meters across turf with low torso angle and full leg extension, rest 45 seconds, and repeat for 6 rounds."
    ),
    (
        "Gym Turf Sled Reverse Backward Drag Intervals",
        7.4,
        "Machine",
        "Face sled with straps attached to waist or handles. Walk backward continuously for 30 meters with bent knees to isolate quadriceps and sustain high cardiac output."
    ),
    (
        "Commercial Elliptical Trainer Reverse Stride Resistance Intervals",
        6.9,
        "Machine",
        "Pedal backward against high resistance at 60-70 RPM, targeting hamstrings and glutes while elevating heart rate through upper-body handle drive."
    ),
    (
        "Kettlebell Two-Handed Cardiovascular Swing Intervals",
        7.5,
        "Dumbbells",
        "Using a moderate kettlebell or dumbbell, snap hips explosively into a shoulder-height swing. Complete 20 unbroken swings every minute on the minute (EMOM) for 10 minutes."
    ),
    (
        "Commercial Rower 2000-Meter Paced Aerobic Time Trial",
        7.8,
        "Machine",
        "Pace a 2000m row holding consistent 2:00-2:10 split at 24-26 SPM, managing lactate accumulation and breathing rhythm for endurance benchmark testing."
    ),
    (
        "Assault Bike Steady 60 RPM Aerobic Threshold Cruise",
        7.2,
        "Machine",
        "Sustain a constant 60 RPM for 15-20 unbroken minutes, maintaining nose-mouth breathing equilibrium at the boundary of aerobic and anaerobic thresholds."
    ),
    (
        "SkiErg Alternating High-Cadence Double-Pole Sprint",
        7.6,
        "Machine",
        "Sprint for 30 seconds at maximum stroke rate (>36 SPM), dropping into deep hip hinge on each stroke, followed by 30 seconds easy paddling."
    ),
    (
        "Plyometric Box Step-Over Continuous Pacing",
        7.1,
        "Bodyweight",
        "Step onto a 20-inch gym box, step down the opposite side, pivot, and return in continuous rhythm without jumping, challenging hip flexors and cardiac endurance."
    ),
    (
        "Battle Rope Alternating Wave Continuous Pacing",
        7.5,
        "Bodyweight",
        "Hold standard-diameter battle rope ends in half-squat. Generate continuous alternating ripples down rope for 30-second work intervals, demanding intense upper-body aerobic supply."
    ),
    (
        "Battle Rope Double Arm Slam to Burpee Transition",
        7.8,
        "Bodyweight",
        "Perform 5 explosive double-arm rope slams, drop rope, drop into a burpee, stand, and immediately grip ropes for next round to induce massive metabolic perturbation."
    ),
    (
        "Treadmill 400-Meter Interval Sprints (1:1 Work-to-Rest)",
        7.6,
        "Machine",
        "Run 400m at 8.0-9.5 mph, step onto side rails to rest for equal time, and repeat 6 times to expand cardiovascular stroke volume and VO2 max."
    ),
    (
        "Stationary Cycle High-Resistance Standing Hill Climb",
        7.3,
        "Machine",
        "Crank bike resistance high, stand out of the saddle, and pedal at 55-65 RPM with strong rhythmic torso sway, challenging leg power endurance and aerobic capacity."
    ),
    (
        "Barbell Light Clean and Press Cycling (Cardio Flow)",
        7.7,
        "Barbell",
        "Use an empty Olympic barbell (45 lbs). Clean from hang and press overhead in continuous, smooth cycles for 60 seconds, challenging total-body aerobic conditioning."
    ),
    (
        "Dumbbell Farmer Walk Heavy Pacing across Gym Floor",
        7.2,
        "Dumbbells",
        "Carry two dumbbells (30% bodyweight each) with upright posture and short, brisk strides for 40 meters, challenging grip, traps, and cardiorespiratory pacing."
    ),
    (
        "Stair Climber Cross-Over Step Aerobic Conditioning",
        7.0,
        "Machine",
        "On moving stair climber, step diagonally across body to target lateral hip stabilizers while maintaining steady stair-stepping aerobic cadence."
    ),
    (
        "Rowing Ergometer Pyramidal Split Intervals (250m/500m/750m/500m/250m)",
        7.7,
        "Machine",
        "Row progressive distance intervals at high intensity with 1:1 rest periods, managing pacing strategy to avoid premature lactate accumulation."
    ),
    (
        "Assault Bike 30-Second Tabata Sprint Protocol",
        7.8,
        "Machine",
        "Alternate 20 seconds at maximum pedal velocity (>75 RPM) with 10 seconds complete rest for 8 consecutive rounds to drive peak cardiovascular adaptation."
    ),
    (
        "SkiErg Butterfly Single-Arm High-Cadence Repeats",
        7.3,
        "Machine",
        "Execute alternating single-arm strokes on SkiErg at rapid 40 SPM cadence for 60-second intervals to tax upper-body aerobic coordination."
    ),
    (
        "Gym Turf Sled Lateral Push-Drag Across Field",
        7.5,
        "Machine",
        "Push sled sideways across turf with cross-over footwork, developing adductor and abductor muscular endurance under substantial cardiovascular strain."
    ),
    (
        "Medicine Ball Overhead Slam to Lateral Jump",
        7.4,
        "Bodyweight",
        "Slam a 12 lb slam ball into floor using full lat engagement, pick up ball, jump laterally over a cone, and repeat continuously for 45-second rounds."
    ),
    (
        "Treadmill 5% Incline 800-Meter Tempo Repeats",
        7.6,
        "Machine",
        "Run 800m intervals on a 5% incline at half-marathon race pace, building mental tenacity and lactate threshold endurance."
    ),
    (
        "Curved Manual Treadmill 15-Second Sprint Bursts",
        7.9,
        "Machine",
        "Accelerate curved treadmill to maximum speed for 15 seconds, step onto side rails to rest 45 seconds, and repeat for 8 sets of high-velocity sprint training."
    ),
    (
        "Rowing Ergometer Low-Rate Power Stroke Intervals (18 SPM @ High Watts)",
        7.5,
        "Machine",
        "Row strictly at 18 strokes per minute while pulling maximal wattage per stroke, training cardiovascular aerobic endurance coupled with high muscular force."
    ),
    (
        "Dumbbell Squat Thruster Continuous Cycling",
        7.8,
        "Dumbbells",
        "Hold light-to-moderate dumbbells at shoulders, descend into full front squat, and thrust overhead in one fluid motion for 15 reps unbroken."
    ),
    (
        "Cable Double-Handle Dynamic Woodchopper Sprints",
        7.1,
        "Cable",
        "Rotate diagonally across torso against light cable resistance in rapid reciprocating sets to condition rotational aerobic power."
    ),
    (
        "Battle Rope In-and-Out Wave to Jumping Jack Combo",
        7.4,
        "Bodyweight",
        "Generate horizontal in-and-out waves with battle ropes while jumping feet wide and narrow, challenging multi-planar shoulder and cardiovascular stamina."
    ),
    (
        "Commercial Arc Trainer High-Incline Glute Burn Sprints",
        7.2,
        "Machine",
        "Set incline to maximum (incline 15-20) on arc trainer and drive through heels at 120-130 strides per minute to tax gluteal and cardiovascular systems."
    ),
    (
        "Rowing Ergometer to Assault Bike Brick Transition Intervals",
        7.9,
        "Machine",
        "Row 250m sprint immediately followed by 10-calorie Assault Bike sprint with zero transition pause, training rapid physiological adaptation across modalities."
    ),
]

if __name__ == "__main__":
    print(f"Intermediate Home: {len(int_home_data)}")
    print(f"Intermediate Gym: {len(int_gym_data)}")
    print(f"Intermediate Total: {len(int_home_data) + len(int_gym_data)}")
    for name, score, eq, inst in int_home_data + int_gym_data:
        assert 6.1 <= score <= 8.0, f"Score {score} out of bounds for {name}"
    print("All intermediate scores within 6.1 - 8.0 range!")
