#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 9: CARDIO - BEGINNER TIER (Total: 66 Exercises)
# 46 Home (70%) + 20 Gym (30%)
# Validated Aerobic Base Building, Low Axial Loading, Zone 2 Conditioning
# Scientific Score Bounds: 4.0 to 6.0
# Equipment: Bodyweight, None, Resistance Bands, Backpack-weighted, Machine, Dumbbells
# ==============================================================================

beg_home_data = [
    # --- Zone 2 Low-Impact Aerobic Stepping & Marches (Home) ---
    (
        "Standing Controlled High-Knee March in Place",
        4.6,
        "Bodyweight",
        "Stand tall with chest proud and core engaged. Alternately lift each knee to hip level in a steady rhythmic cadence. Swing opposite arms naturally to drive reciprocal torso rotation, keeping foot impact soft on the balls of the feet to maintain a steady Zone 2 heart rate."
    ),
    (
        "Low-Impact Lateral Side-Step Aerobic Reach",
        4.4,
        "Bodyweight",
        "Step side-to-side across the floor with soft knees while reaching both arms overhead in a continuous reciprocal sweep. Maintain a fluid aerobic tempo without jumping, focusing on steady nasal breathing to build baseline cardiovascular efficiency."
    ),
    (
        "Stationary Low-Impact Boxer Shuffle",
        4.7,
        "Bodyweight",
        "Shift weight lightly from foot to foot with soft knee flexion, keeping weight primarily on the metatarsal pads. Keep hands up in a loose guard position and rotate hips subtly to sustain continuous low-amplitude aerobic output."
    ),
    (
        "Standing Cross-Body Knee-to-Elbow Aerobic Drive",
        4.8,
        "Bodyweight",
        "From an upright standing stance, rhythmically drive your right knee toward your left elbow across the midline. Alternate sides continuously, coordinating rhythmic exhalations on knee elevation to stimulate core-driven cardiorespiratory pacing."
    ),
    (
        "Low-Impact Step-Jack with Overhead Arm Sweeps",
        4.3,
        "Bodyweight",
        "Eliminate high-impact jumping by tapping your right foot laterally while sweeping both arms overhead, then return to center and repeat on the left. Sustain a continuous brisk tempo to elevate cardiac output without joint impact."
    ),
    (
        "Wall-Supported Mountain Climber March",
        4.5,
        "Bodyweight",
        "Place hands flat against a wall at shoulder height with feet stepped back at a 45-degree angle. Rhythmically drive alternate knees toward chest in a smooth, continuous piston action, prioritizing core brace and steady ventilatory pacing."
    ),
    (
        "Elevated Hands Chair Step Mountain Climber",
        4.9,
        "Bodyweight",
        "Support hands firmly on a sturdy chair or couch seat in a high plank position. Alternately march knees toward the chest at a brisk aerobic cadence, maintaining a neutral lumbar spine and continuous rhythmic breathing."
    ),
    (
        "Standing Alternating Butt-Kicker Heel Taps",
        4.5,
        "Bodyweight",
        "Jog lightly in place or step rhythmically, drawing alternate heels straight back toward glutes. Pump arms in a runner's stride to encourage hamstring circulation and steady aerobic work."
    ),
    (
        "Alternating Front Aerobic Kick and Punch Combination",
        4.8,
        "Bodyweight",
        "Stand with soft knees and alternate low front snap kicks with reciprocal straight punches. Maintain a steady rhythmic cadence to encourage full-body oxygen transport and light metabolic acceleration."
    ),
    (
        "Low-Impact Skater Taps with Reciprocal Arm Swing",
        4.9,
        "Bodyweight",
        "Step laterally to the right while sweeping the left foot diagonally behind without jumping, pumping arms in a speed-skating flow. Alternate sides continuously, stabilizing through the stance glute to elevate heart rate safely."
    ),

    # --- Calisthenic Aerobic Conditioning & Bodyweight Circuits (Home) ---
    (
        "Incline Hands-Elevated Burpee Step-Back",
        5.2,
        "Bodyweight",
        "Place hands on an elevated bench or sturdy sofa, step both feet back sequentially into a solid plank, step forward flat-footed, and stand upright with an overhead reach. Eliminates high-impact plyometrics while demanding full-body oxygen delivery."
    ),
    (
        "No-Jump Half Burpee with Step-Through",
        5.1,
        "Bodyweight",
        "Hinge at the hips, place hands on the floor, step feet back one at a time into plank, step forward to a squat position, and extend hips to stand. Maintain a steady, continuous cyclic pace for cardiorespiratory adaptation."
    ),
    (
        "Prone Hand-Supported Seal Jack Steps",
        4.7,
        "Bodyweight",
        "Step one foot laterally at a time while opening and closing arms horizontally in a chest-expanding flight pattern. Focus on deep diaphragmatic breathing to build aerobic stamina and chest mobility."
    ),
    (
        "Bodyweight Chair Squat to Standing Calf Raise",
        5.0,
        "Bodyweight",
        "Lower hips smoothly until glutes lightly touch a chair, drive up through midfoot, and extend immediately onto balls of the feet with a calf raise. Cycle repetitions without pauses to challenge muscular endurance and blood return."
    ),
    (
        "Standing Alternating Knee Lift with Torso Rotation",
        4.6,
        "Bodyweight",
        "March in place with high knee drive while rotating shoulders and torso toward the elevated leg. Coordinate deliberate inhalations and exhalations to condition breathing under dynamic movement."
    ),
    (
        "Lateral Step-Under Duck and Weave",
        5.1,
        "Bodyweight",
        "Step laterally while dropping into a shallow quarter-squat, rolling under an imaginary horizontal line and rising on the opposite side. Continuous multi-planar duck-and-weave patterns train leg stamina and aerobic capacity."
    ),
    (
        "Slow-Cadence Floor Mountain Climber Step",
        5.2,
        "Bodyweight",
        "From a push-up plank on the floor, step one knee forward beneath the hips, touch the toe down, step back, and alternate. Maintain strict pelvic stability and continuous breathing to build baseline cardiovascular core stamina."
    ),
    (
        "Standing High-Knee March with Overhead Pulse",
        4.8,
        "Bodyweight",
        "Elevate knees alternately to 90 degrees while pulsing both arms overhead with open palms. Elevating arms above the heart naturally increases cardiac output demands for safe conditioning."
    ),
    (
        "Shadow Jab-Cross Aerobic Shuttle Tap",
        5.3,
        "Bodyweight",
        "Throw alternating straight jab-cross punches while shuffling feet lightly in a forward-and-backward bounce. Maintain shoulder relaxation to optimize oxygen conservation and aerobic pacing."
    ),
    (
        "Alternating Reverse Lunge to Overhead Reach",
        5.2,
        "Bodyweight",
        "Step back into a shallow reverse lunge while sweeping both arms skyward, drive through front heel to stand, and alternate sides. Continuous lunging engages large lower-body muscle masses to drive aerobic oxygen consumption."
    ),

    # --- Household Backpack & Band Aerobic Loading (Home) ---
    (
        "Light Backpack Loaded Step-Up on Household Box",
        5.4,
        "Backpack-weighted",
        "Wear a securely strapped light backpack (5-10 lbs). Step smoothly onto a stable box or step, fully extending hips at the top before stepping down under control. Alternate lead feet continuously to build rhythmic aerobic power."
    ),
    (
        "Backpack Rucking Brisk Indoor Pacing Walk",
        5.0,
        "Backpack-weighted",
        "With a comfortably weighted backpack strapped high against upper back, pace briskly across living space or hallway with upright posture, rhythmic arm swings, and heel-to-toe stride mechanics for Zone 2 aerobic base building."
    ),
    (
        "Light Backpack Front-Loaded Good Morning March",
        5.1,
        "Backpack-weighted",
        "Hug a light backpack against your chest while marching in place with deliberate knee lifts. The anterior load challenges postural stabilizers and expands thoracic breathing volume under cardiovascular load."
    ),
    (
        "Backpack Suitcase Carry Hallway Shuttle Intervals",
        5.3,
        "Backpack-weighted",
        "Grip the top handle of a weighted backpack in one hand at your side. Walk briskly back and forth for 45-second intervals, maintaining level shoulders and neutral spine, switching hands every round."
    ),
    (
        "Resistance Band Standing Chest Press Fast Punch Drill",
        5.0,
        "Resistance Bands",
        "Anchor a light band behind back at mid-torso height. Punch alternate arms forward in a rapid, continuous cycling rhythm against light elastic resistance, elevating upper-body aerobic heart rate."
    ),
    (
        "Resistance Band Under-Foot Lat Pulldown March",
        4.9,
        "Resistance Bands",
        "Stand on center of band with feet hip-width. March in place while pulling band handles upward in an upright row or reciprocal arm pumps to sustain full-body cardiorespiratory work."
    ),
    (
        "Resistance Band Lateral Monster Walk Aerobic Shuffle",
        5.2,
        "Resistance Bands",
        "Place a light mini-band around calves or above knees. Step continuously side-to-side across the room in an athletic quarter-squat stance, keeping constant band tension to drive glute and cardiovascular endurance."
    ),
    (
        "Resistance Band Seated Fast Row Intervals",
        4.8,
        "Resistance Bands",
        "Sit on floor with legs extended, loop light band around feet. Perform continuous, rhythmic rows with rapid turnover and controlled return to stimulate upper-body aerobic conditioning."
    ),
    (
        "Light Backpack Rucking Stair Step Intervals",
        5.5,
        "Backpack-weighted",
        "Wear a light backpack and step up and down the bottom step of a staircase in a rhythmic, continuous 4-count pattern (up, up, down, down). Alternate lead foot every 60 seconds."
    ),
    (
        "Backpack Hugged Squat-to-Overhead Press Cycling",
        5.4,
        "Backpack-weighted",
        "Hold light backpack at chest, perform a comfortable quarter-squat, and press backpack smoothly overhead as you stand. Fluid, unbroken reps activate large muscle groups for cardiovascular stimulus."
    ),

    # --- Pacing, Agility & Footwork Base Drills (Home) ---
    (
        "Imaginary Line Forward-and-Back Two-Step Quick Taps",
        4.7,
        "Bodyweight",
        "Mark an imaginary line on the floor. Step both feet rapidly forward over the line, then both feet backward, maintaining a soft, bouncy foot strike and steady cadence."
    ),
    (
        "Lateral Line In-In-Out-Out Footwork Pacing",
        4.9,
        "Bodyweight",
        "Step right foot then left foot over an imaginary mark laterally, then return to baseline. Maintain bent knees, relaxed shoulders, and smooth nasal breathing."
    ),
    (
        "Standing Wide-to-Narrow Base Aerobic Jump Swaps",
        5.1,
        "Bodyweight",
        "Gently transition feet between a narrow stance and wide stance with minimal ground contact shock, pumping arms in rhythm to build aerobic elasticity."
    ),
    (
        "Standing Heel-to-Toe Rocker Aerobic Pump",
        4.2,
        "Bodyweight",
        "Rock from heels to toes in a brisk continuous rhythm while swinging arms vigorously, engaging calf pumps to assist venous return to the heart."
    ),
    (
        "Standing Alternating Side Knee Raises with Lateral Tap",
        4.7,
        "Bodyweight",
        "Lift right knee toward right elbow with slight lateral torso crunch, step down, and alternate left. Keep cadence constant to maintain consistent aerobic workload."
    ),
    (
        "Floor Mat Bear Crawl Step-Forward and Step-Back",
        5.3,
        "Bodyweight",
        "In a tabletop quadruped stance with knees hovering 2 inches off floor, take 3 small crawling steps forward and 3 back in continuous loops to challenge aerobic quadrupedal stamina."
    ),
    (
        "Standing Cross-Body Upper-Cut Aerobic Pulse",
        4.8,
        "Bodyweight",
        "Deliver continuous alternating uppercut punches with hip pivot and soft knees. Rapid arm turnover creates an efficient aerobic stimulus without joint impact."
    ),
    (
        "Wall-Facing Fast-Paced Calf Bounce Pacing",
        4.4,
        "Bodyweight",
        "Lightly rest fingertips on a wall for balance and perform continuous low-amplitude ankle bounces, training Achilles tendon compliance and cardiovascular rhythm."
    ),
    (
        "Standing Air-Swimming Freestyle Arm Strokes with March",
        4.5,
        "Bodyweight",
        "March in place with steady foot strikes while executing large, rhythmic freestyle swimming arm circles forward, opening thoracic mobility and respiratory capacity."
    ),
    (
        "Seated Core-Engaged Fast Leg Flutter Kicks",
        4.9,
        "Bodyweight",
        "Sit on edge of sturdy chair with hands gripping seat. Lean back slightly, elevate feet, and perform continuous small flutter kicks for 30-45 seconds of metabolic stress."
    ),
    (
        "Prone Aerobic Swimmer Kick and Flutter Reach",
        5.0,
        "Bodyweight",
        "Lie face down on a mat, gently lift chest and thighs, and perform continuous alternating arm and leg flutters in a smooth aerobic cadence."
    ),
    (
        "Standing Low Overhead Arm Scissor March",
        4.4,
        "Bodyweight",
        "Cross and uncross straight arms overhead in a continuous scissor motion while marching in place, promoting lymphatic and cardiovascular flow."
    ),
    (
        "Single-Leg Stride Aerobic Runner Pump (Right Lead)",
        4.9,
        "Bodyweight",
        "Step left foot back into a shallow runner's stance, pump right arm forward and left arm back while repeatedly driving left knee forward and back smoothly."
    ),
    (
        "Single-Leg Stride Aerobic Runner Pump (Left Lead)",
        4.9,
        "Bodyweight",
        "Step right foot back into shallow runner's stance, pumping arms rapidly while driving right knee forward to hip height and back in continuous aerobic cycles."
    ),
    (
        "Standing Torso Twist with Low Foot Tap",
        4.6,
        "Bodyweight",
        "Rotate torso side to side with bent elbows, tapping alternate toes behind and across midline to promote multi-planar aerobic mobility."
    ),
    (
        "Floor Crab Bridge Alternating Toe Tap Pacing",
        5.2,
        "Bodyweight",
        "Sit on floor with hands behind hips, lift glutes 2 inches off floor, and alternately lift feet in a steady cadence to challenge cardiovascular core endurance."
    ),
]

beg_gym_data = [
    # --- Commercial Ergometers & Gym Base Aerobic Equipment (Gym) ---
    (
        "Rowing Ergometer Steady-State Zone 2 Base Pacing",
        5.5,
        "Machine",
        "Set damper to 3-4. Drive through the heels, swing hips through neutral, and pull handle smoothly to solar plexus at a controlled 18-20 strokes per minute to build foundational aerobic capacity."
    ),
    (
        "Upright Stationary Cycle Steady-Cadence Base Ride",
        4.8,
        "Machine",
        "Maintain a steady 80-90 RPM cadence at a moderate resistance level where conversational breathing is sustainable, promoting mitochondrial density and vascularization."
    ),
    (
        "Recumbent Bike Low-Stress Aerobic Flush",
        4.5,
        "Machine",
        "Pedal at a smooth, continuous 75-85 RPM with full back support, keeping heart rate within 60-70% of maximum to develop cardiac stroke volume without axial spinal compression."
    ),
    (
        "Commercial Elliptical Trainer Forward Glide Intervals",
        4.9,
        "Machine",
        "Grip mobile handles and drive pedals in a smooth forward elliptical path, matching arm push-pull to foot cadence for total-body low-impact cardiovascular work."
    ),
    (
        "Treadmill Low-Incline Brisk Aerobic Walking",
        5.0,
        "Machine",
        "Set incline to 2-3% and speed to 3.5-4.0 mph. Walk with upright posture and natural arm swing, maintaining steady aerobic breathing without holding handrails."
    ),
    (
        "Stair Climber Slow-Cadence Step Pacing",
        5.4,
        "Machine",
        "Select a slow, steady stepping rate (30-40 steps per minute). Stand tall without leaning on handrails, stepping flat-footed to engage glutes and maintain aerobic output."
    ),
    (
        "SkiErg Foundational Bilateral Pull Pacing",
        5.6,
        "Machine",
        "Stand tall facing the SkiErg. Initiate pull by hinging hips and engaging lats, pulling handles down smoothly past thighs at a controlled 22-24 SPM aerobic cadence."
    ),
    (
        "Assault AirBike Low-Intensity Aerobic Warm-Up Cruise",
        5.2,
        "Machine",
        "Pedal and push-pull handles at a sustainable 45-50 RPM, distributing workload evenly between upper and lower extremities for continuous cardiovascular base building."
    ),
    (
        "Gym Aerobic Step Bench Alternating Step-Ups",
        5.1,
        "Bodyweight",
        "Step onto a 6-inch aerobic step bench, lead with right foot, bring left foot up, and step down sequentially. Switch lead foot every 60 seconds to balance muscular workload."
    ),
    (
        "Light Dumbbell Shadow Boxing in Place",
        5.3,
        "Dumbbells",
        "Hold 2 lb dumbbells in hands with a relaxed boxing stance. Throw controlled straight jabs and crosses at a continuous rhythmic pace to elevate cardiac output."
    ),
    (
        "Treadmill Flat-Paced Base Jogging Intervals",
        5.5,
        "Machine",
        "Jog at a steady 5.0-5.5 mph pace on a flat treadmill deck with midfoot landing, focusing on rhythmic nasal-oral breathing cycles to expand aerobic base."
    ),
    (
        "Arc Trainer Low-Impact Cross-Training Glide",
        5.0,
        "Machine",
        "Set moderate resistance and glide smoothly on the arc path, coordinating arm levers with leg drive to sustain steady Zone 2 heart rate with zero joint impact."
    ),
    (
        "Cable Alternating Low-Tension Punch Presses",
        5.2,
        "Cable",
        "Set cable pulleys at chest height with minimal weight. Face away and execute alternating punch presses in a continuous boxing rhythm for metabolic stamina."
    ),
    (
        "Light Medicine Ball Chest Pass Rebound against Wall",
        5.4,
        "Bodyweight",
        "Hold a light 4-6 lb medicine ball, stand 3 feet from a concrete wall, and perform continuous rhythmic chest passes, catching and cycling without pauses."
    ),
    (
        "Commercial Rower Legs-Only Drive Aerobic Drill",
        5.3,
        "Machine",
        "On rowing machine, lock arms straight and torso vertical. Drive solely through the legs back and forth smoothly to condition lower-body aerobic blood flow."
    ),
    (
        "Assault Bike Single-Arm Cyclic Pacing Drill",
        5.4,
        "Machine",
        "Pedal at moderate effort while resting one arm on lap, driving bike with legs and one arm. Switch arms every 90 seconds to train unilateral aerobic stabilization."
    ),
    (
        "SkiErg Alternating Butterfly Single-Arm Pulls",
        5.5,
        "Machine",
        "Perform alternating arm strokes on the SkiErg in a continuous Nordic cross-country cadence, focusing on steady torso rotation and rhythmic exhalation."
    ),
    (
        "Incline Treadmill Striding at 4.0 MPH",
        5.6,
        "Machine",
        "Set treadmill to 4% incline at 4.0 mph walking pace. Drive through the heels and maintain relaxed shoulder posture to build calf and glute aerobic stamina."
    ),
    (
        "Gym Sled Light Load Continuous Pacing Walk",
        5.7,
        "Machine",
        "Grip high uprights of an unweighted or lightly loaded turf sled. Walk forward in a steady, continuous stride across turf to elevate heart rate under mild resistance."
    ),
    (
        "Rowing Ergometer Pyramidal Cadence Step (18 to 24 SPM)",
        5.8,
        "Machine",
        "Row smoothly, adjusting stroke rate from 18 to 20, 22, and 24 SPM every 2 minutes while maintaining consistent split power to develop aerobic pacing precision."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home: {len(beg_home_data)}")
    print(f"Beginner Gym: {len(beg_gym_data)}")
    print(f"Beginner Total: {len(beg_home_data) + len(beg_gym_data)}")
    for name, score, eq, inst in beg_home_data + beg_gym_data:
        assert 4.0 <= score <= 6.0, f"Score {score} out of bounds for {name}"
    print("All beginner scores within 4.0 - 6.0 range!")
