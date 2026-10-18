#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 7: EXPLOSIVENESS - ADVANCED TIER (Total: 125 Exercises)
# 87 Home (70%) + 38 Gym (30%)
# Validated Olympic Weightlifting Biomechanics, Advanced RFD, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 8.1 and 9.2
# ==============================================================================

adv_home_data = [
    # --- ADVANCED VERTICAL PLYOMETRICS & LEVERS (Home: 20) ---
    (
        "Unassisted Depth Jump From 24-Inch Platform to Maximal Vertical Leap",
        9.1,
        "Bodyweight",
        "Step cleanly off a 24-inch sturdy household box or platform. Upon touching the ground, immediately redirect the downward kinetic energy into a maximal vertical explosion, minimizing ground contact time to under 180 milliseconds while driving arms forcefully overhead."
    ),
    (
        "Heavy Backpack Jump Squat 20 kg Explosive Drive",
        9.0,
        "Backpack-weighted",
        "Wear a tightly cinched 20 kg backpack. Descend to parallel, pause for half a second to eliminate elastic recoil, and violently explode upward off the floor, absorbing the weighted landing through a full decelerative squat."
    ),
    (
        "Single-Leg Box Jump Onto 18-Inch Chair",
        8.9,
        "Bodyweight",
        "Stand on one leg before a 18-inch sturdy chair. Dip into a single-leg quarter-squat and explode upward, landing softly on top of the chair on the same single leg with zero knee valgus."
    ),
    (
        "Kneeling Jump to Full Squat to Vertical Tuck Jump",
        9.1,
        "Bodyweight",
        "From a kneeling posture, explode hips forward to snap feet underneath into a squat, immediately rebounding without pause into a maximal vertical tuck jump, pulling knees to chest in mid-air."
    ),
    (
        "Single-Leg Depth Drop From 12-Inch Step to Vertical Hop",
        9.0,
        "Bodyweight",
        "Step off a 12-inch step landing strictly on one leg. Instantly rebound off the ball of that single foot into a maximal vertical hop, challenging unilateral fast stretch-shortening cycle mechanics."
    ),
    (
        "Repeated Tuck Jumps With Sub-150ms Ground Contact",
        8.9,
        "Bodyweight",
        "Execute 10 consecutive maximal tuck jumps in place, treating the floor as hot coals with ground contact times below 150 milliseconds to optimize Achilles and patellar tendon elasticity."
    ),
    (
        "Heavy Backpack Lunge Jump With Scissor Switch 15 kg",
        9.0,
        "Backpack-weighted",
        "Wear a 15 kg backpack. Descend into a deep lunge and explode upward with maximal power, switching legs in mid-air and landing softly in the opposite lunge."
    ),
    (
        "Rotational 360-Degree Jump Squat Land and Stick",
        8.8,
        "Bodyweight",
        "Dip into a squat, launch vertically with maximal angular torque, complete a full 360-degree rotation in mid-air, and stick the landing squarely in an athletic quarter-squat."
    ),
    (
        "Backpack-Weighted Single-Leg Step-Up Jump 12 kg",
        8.8,
        "Backpack-weighted",
        "Place one foot on a sturdy chair wearing a 12 kg backpack. Drive through the heel with maximal velocity to launch the entire body into the air, landing softly on the chair."
    ),
    (
        "Continuous Hurdle Hops Over 18-Inch Obstacles",
        8.9,
        "Bodyweight",
        "Line up four 18-inch obstacles. Jump over each obstacle in rapid succession with stiff ankles and minimal knee flexion, training fast reactive elasticity."
    ),
    (
        "Single-Leg Lateral Hurdle Hop Rebound Left",
        8.8,
        "Bodyweight",
        "Hop laterally over an 8-inch obstacle on the left leg and immediately rebound back over to the starting position without pausing."
    ),
    (
        "Single-Leg Lateral Hurdle Hop Rebound Right",
        8.8,
        "Bodyweight",
        "Hop laterally over the obstacle on the right leg and instantly spring back, demanding extreme unilateral frontal-plane stiffness."
    ),
    (
        "Depth Drop From 30-Inch Bed Edge to Freeze Stick",
        9.0,
        "Bodyweight",
        "Step off a 30-inch bed. Absorb the high-velocity landing on both feet simultaneously, locking into a parallel squat freeze for 3 seconds with zero deviation."
    ),
    (
        "Backpack Tuck Jump Over Barrier 10 kg",
        8.9,
        "Backpack-weighted",
        "Wear a 10 kg backpack. Jump over a 12-inch obstacle, tucking knees to chest in mid-air and landing softly on the opposite side."
    ),
    (
        "Assisted Sissy Squat Jump Rebound",
        8.7,
        "Bodyweight",
        "From a deep sissy squat hold on a doorframe, explode upward off the balls of the feet into an airborne jump, absorbing the return into sissy squat flexion."
    ),
    (
        "Single-Leg Pogo Hop Sprint Down Hallway Left",
        8.7,
        "Bodyweight",
        "Hop forward down a hallway on the left leg only across 10 rapid, continuous linear bounds with minimal amortization time."
    ),
    (
        "Single-Leg Pogo Hop Sprint Down Hallway Right",
        8.7,
        "Bodyweight",
        "Execute 10 rapid forward single-leg pogo hops on the right leg, matching unilateral elasticity and ground contact brevity."
    ),
    (
        "Backpack Jump Squat From 3-Second Dead-Stop Pause 16 kg",
        9.1,
        "Backpack-weighted",
        "Wear a 16 kg backpack. Descend to parallel, pause for 3 seconds to eliminate stretch reflex, then violently explode off the floor."
    ),
    (
        "Lateral Bound to Instant Vertical Tuck Jump",
        9.0,
        "Bodyweight",
        "Leap laterally 5 feet, land on the outside foot, and immediately transition into a maximal vertical tuck jump off two feet."
    ),
    (
        "Pike Jump to Explosive Floor Tap Rebound",
        8.8,
        "Bodyweight",
        "Jump vertically, fold body to touch toes with hands at hip height in mid-air, land softly, and instantly rebound into a second jump."
    ),

    # --- ADVANCED HORIZONTAL & LATERAL BOUNDING (Home: 20) ---
    (
        "Triple Broad Jump for Maximal Distance",
        9.1,
        "Bodyweight",
        "Execute three consecutive maximal broad jumps without pausing between landings, channeling the horizontal momentum of each jump directly into the subsequent launch."
    ),
    (
        "Single-Leg Repeated Linear Bounds for Distance Left",
        9.0,
        "Bodyweight",
        "Perform four consecutive maximal single-leg broad jumps forward on the left leg, minimizing ground contact between hops and sticking the fourth landing."
    ),
    (
        "Single-Leg Repeated Linear Bounds for Distance Right",
        9.0,
        "Bodyweight",
        "Perform four consecutive maximal broad jumps forward on the right leg, training unilateral horizontal power and eccentric deceleration."
    ),
    (
        "Heavy Backpack Broad Jump With 15 kg",
        8.9,
        "Backpack-weighted",
        "Wear a 15 kg backpack. Hinge and launch horizontally for maximum distance, absorbing the heavy deceleration into a deep, controlled squat."
    ),
    (
        "Lateral Speed Skater Bound With 6-Foot Spread",
        8.8,
        "Bodyweight",
        "Bound laterally across a 6-foot span from single leg to single leg, utilizing full triple extension of the push leg and sticking each landing."
    ),
    (
        "Zig-Zag Multi-Directional Lateral Bound Circuit",
        8.9,
        "Bodyweight",
        "Bound diagonally 45 degrees forward-right, forward-left, backward-right, and backward-left across a 10-foot grid with zero ground delay."
    ),
    (
        "Single-Leg Lateral Bound to 180-Degree Cut",
        9.0,
        "Bodyweight",
        "Bound laterally off right foot, plant left foot hard to reverse direction 180 degrees, and sprint 3 explosive paces forward."
    ),
    (
        "Backward Broad Jump to Immediate Forward Rebound",
        8.8,
        "Bodyweight",
        "Leap backward 3 feet, touch down on the balls of both feet, and instantly reverse momentum into a maximal forward broad jump."
    ),
    (
        "Single-Leg Forward Bound to Lateral Bound Left",
        8.9,
        "Bodyweight",
        "Hop forward 4 feet on left leg, absorb landing, and instantly bound 4 feet laterally to the left without touching the right foot down."
    ),
    (
        "Single-Leg Forward Bound to Lateral Bound Right",
        8.9,
        "Bodyweight",
        "Hop forward 4 feet on right leg and immediately bound 4 feet laterally to the right, challenging multi-planar decelerative control."
    ),
    (
        "Backpack Lateral Skater Bound 12 kg Overload",
        8.9,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Bound laterally 5 feet side-to-side across 12 continuous repetitions, absorbing the heavy momentum."
    ),
    (
        "Heiden Bound With Medicine-Style Backpack Slap",
        8.8,
        "Backpack-weighted",
        "Bound laterally holding an 8 kg backpack. Slap the bag against the thigh of the landing leg to brake angular momentum."
    ),
    (
        "Double-Leg Broad Jump to 180-Degree Mid-Air Turn",
        8.8,
        "Bodyweight",
        "Launch forward into a broad jump, rotate 180 degrees in mid-air, and land backward softly in a shock-absorbing athletic stance."
    ),
    (
        "Staggered Stance Explosive Sprint Shovel 10 Yards",
        8.7,
        "Bodyweight",
        "From a low three-point track stance, explode forward into a 10-yard acceleration burst at 100% maximal sprinting velocity."
    ),
    (
        "Single-Leg Lateral Zig-Zag Hop Matrix Left",
        8.9,
        "Bodyweight",
        "Hop in a zig-zag pattern on the left leg across 6 continuous markers, emphasizing lateral force production and deceleration."
    ),
    (
        "Single-Leg Lateral Zig-Zag Hop Matrix Right",
        8.9,
        "Bodyweight",
        "Hop in a zig-zag pattern on the right leg, developing equal unilateral agility and reactive force transmission."
    ),
    (
        "Backpack Triple Broad Jump 10 kg",
        9.1,
        "Backpack-weighted",
        "Wear a 10 kg backpack. Perform three consecutive broad jumps across the floor with minimal transition delay."
    ),
    (
        "Rotational 90-Degree Lateral Bound to Sprint",
        8.9,
        "Bodyweight",
        "Bound laterally, rotate 90 degrees on landing, and instantly accelerate into a 5-yard forward sprint burst."
    ),
    (
        "Cross-Over Lateral Bound to Stick Overload",
        8.7,
        "Bodyweight",
        "Cross rear leg behind and launch laterally 5 feet, sticking the landing on the lead foot in deep single-leg stability."
    ),
    (
        "Lateral Bound to Deep Drop Landing Combination",
        8.8,
        "Bodyweight",
        "Bound laterally off a step onto the floor, immediately absorbing the shock into a low athletic crouch."
    ),

    # --- ADVANCED UPPER BODY PLYOMETRICS (Home: 20) ---
    (
        "Floor Aztec Push-Up With Toe Tap in Mid-Air",
        9.2,
        "Bodyweight",
        "From a plank, explode upward off hands and feet simultaneously, bending at hips to touch fingertips to toes in mid-air before landing softly in plank."
    ),
    (
        "Floor Superman Plyometric Push-Up",
        9.1,
        "Bodyweight",
        "Drive off the floor with maximal velocity so hands and feet leave the mat, extending arms straight overhead in full flight before catching the landing."
    ),
    (
        "Triple-Clap Plyometric Push-Up",
        9.2,
        "Bodyweight",
        "Explode off the floor with extreme velocity: clap hands in front of chest, clap hands behind back, and clap in front again before catching the landing."
    ),
    (
        "Heavy Backpack Plyo Push-Up 12 kg",
        9.0,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Explode off the floor so palms separate 4 inches from the mat, absorbing the weighted landing with soft elbows."
    ),
    (
        "Doorframe Pull-Up Bar Muscle-Up Transition Pop",
        9.0,
        "Bodyweight",
        "Hang from a doorway pull-up bar. Drive aggressively into a high chest-to-bar pull, pop wrists over the bar, and press out to support."
    ),
    (
        "Explosive Chest-to-Bar Pull-Up With Hand Release",
        8.9,
        "Bodyweight",
        "Pull explosively to a doorway bar so chest strikes bar, release grip momentarily at the apex of the pull, and re-grip on the descent."
    ),
    (
        "Single-Arm Floor Plyometric Push-Up Left",
        9.1,
        "Bodyweight",
        "Perform a single-arm push-up on the left arm with wide feet. Explode upward so the left palm leaves the mat, landing softly."
    ),
    (
        "Single-Arm Floor Plyometric Push-Up Right",
        9.1,
        "Bodyweight",
        "Explode off the floor with the right arm alone, training unilateral upper-body rate of force development."
    ),
    (
        "Backpack Heavy Overhead Floor Slam 15 kg",
        8.9,
        "Backpack-weighted",
        "Lift a 15 kg backpack overhead and violently slam it downward into a floor mat with full lat and core contraction."
    ),
    (
        "Explosive Push-Up From 3-Second Dead-Stop Chest Pause",
        8.8,
        "Bodyweight",
        "Lower chest to floor, rest completely for 3 seconds to dissipate elastic recoil, and explode off the floor with maximal velocity into a clap."
    ),
    (
        "Decline Clap Push-Up With Feet on Bed",
        9.0,
        "Bodyweight",
        "Place feet elevated on a bed with hands on floor. Explode upward, clap hands in mid-air, and absorb the heavy decline landing."
    ),
    (
        "Backpack Rotational Wall Slam 12 kg Left",
        8.8,
        "Backpack-weighted",
        "Kneel sideways to a wall. Slam a 12 kg backpack into the wall with violent core rotation, catching the rebound."
    ),
    (
        "Backpack Rotational Wall Slam 12 kg Right",
        8.8,
        "Backpack-weighted",
        "Execute rotational slam with the 12 kg backpack to the right, balancing bilateral rotational power."
    ),
    (
        "Floor Plyometric Push-Up to High Box Land",
        8.9,
        "Bodyweight",
        "Explode off the floor and jump hands up onto an 8-inch step or platform, dropping back to the floor on the next rep."
    ),
    (
        "Supine Explosive Backpack Launch and Catch 14 kg",
        8.9,
        "Backpack-weighted",
        "Lie supine. Press a 14 kg backpack upward with maximal velocity, launching it 2 feet into the air, and catch softly."
    ),
    (
        "Staggered Hand-Switch Plyo Push-Up at Speed",
        8.8,
        "Bodyweight",
        "Alternate hands forward and back on every explosive rep in rapid succession across 10 continuous plyometric push-ups."
    ),
    (
        "Kneeling Backward Overhead Backpack Launch 10 kg",
        8.8,
        "Backpack-weighted",
        "Launch a 10 kg backpack backward overhead for maximal distance using full posterior chain extension."
    ),
    (
        "Explosive Dips on Counter Corner With Hand Separation",
        8.9,
        "Bodyweight",
        "Lower to 90 degrees on a kitchen counter corner, explode upward so palms lift off the surface, catching softly."
    ),
    (
        "Heavy Band Explosive Push-Up Resistance",
        8.8,
        "Resistance Bands",
        "Loop a heavy resistance band across your back under palms. Perform explosive push-ups against compounding band tension."
    ),
    (
        "Doorframe Pull-Up With Explosive Top Release",
        8.9,
        "Bodyweight",
        "Pull to bar with maximum speed, release grip at peak, tap shoulders, and re-grip before descending."
    ),

    # --- ADVANCED RESISTANCE & VELOCITY BALLISTICS (Home: 27) ---
    (
        "Heavy Backpack Hang Power Clean 20 kg",
        8.8,
        "Backpack-weighted",
        "Hold 20 kg backpack at knee level. Explode with triple extension, shrug violently, and catch in a solid quarter-squat."
    ),
    (
        "Heavy Backpack Hang Power Snatch 16 kg",
        8.9,
        "Backpack-weighted",
        "From hang position, violently extend hips and pull 16 kg backpack overhead in one continuous path into a locked catch."
    ),
    (
        "Heavy Backpack Push Jerk 20 kg",
        8.8,
        "Backpack-weighted",
        "Dip knees 3 inches with 20 kg backpack on chest, drive upward through legs, and drop underneath to catch with locked arms."
    ),
    (
        "Dual Heavy Band Resisted Broad Jump 6 Feet",
        9.0,
        "Resistance Bands",
        "Anchor two heavy bands behind you at waist. Jump horizontally 6 feet against massive elastic resistance, sticking landing."
    ),
    (
        "Heavy Backpack Thruster Ballistic Launch 18 kg",
        8.9,
        "Backpack-weighted",
        "Descend into full front squat with 18 kg backpack, explode out of the hole, and launch the bag overhead."
    ),
    (
        "Heavy Band Resisted Sprint Acceleration 10 Yards",
        8.8,
        "Resistance Bands",
        "Sprint 10 yards against heavy band tension anchored to doorpost, driving knees with maximal forward lean."
    ),
    (
        "Backpack Kettlebell Swing 24 kg Overload",
        8.9,
        "Backpack-weighted",
        "Swing a 24 kg backpack with violent hip snap, locking glutes and floating the bag to chest level across 12 heavy reps."
    ),
    (
        "Backpack Single-Arm Snatch 14 kg Left",
        8.8,
        "Backpack-weighted",
        "Snatch a 14 kg backpack overhead with left arm in one explosive motion from the floor."
    ),
    (
        "Backpack Single-Arm Snatch 14 kg Right",
        8.8,
        "Backpack-weighted",
        "Snatch the 14 kg backpack overhead with right arm, training unilateral explosive hip drive."
    ),
    (
        "Heavy Band Vertical Jump Squats 20 kg Equivalent",
        8.9,
        "Resistance Bands",
        "Stand on heavy looped bands with strap across traps. Jump vertically against the massive elastic tension."
    ),
    (
        "Backpack Floor-to-Overhead Clean and Jerk 22 kg",
        9.0,
        "Backpack-weighted",
        "Lift 22 kg backpack from floor, clean to shoulders, dip and jerk overhead to full lockout."
    ),
    (
        "Band-Resisted Skater Jump Rebound Matrix",
        8.7,
        "Resistance Bands",
        "Bound laterally against heavy band tension, immediately rebound back, and stick the landing."
    ),
    (
        "Heavy Backpack Sumo Deadlift High Pull 22 kg",
        8.8,
        "Backpack-weighted",
        "Explode upward from wide stance with 22 kg backpack, pulling elbows high to chin level in one fluid motion."
    ),
    (
        "Backpack Russian Swing With 28 kg Overload",
        9.0,
        "Backpack-weighted",
        "Hinge and snap hips with a 28 kg backpack, driving maximum rate of force development through the posterior chain."
    ),
    (
        "Dual-Band Resisted Sprint in Place 20 Seconds",
        8.7,
        "Resistance Bands",
        "Sprint in place against dual heavy bands anchored to doorpost at maximal knee drive frequency."
    ),
    (
        "Heavy Backpack Lateral Speed Bound 14 kg",
        8.9,
        "Backpack-weighted",
        "Wear a 14 kg backpack. Bound laterally 5 feet side-to-side, absorbing the heavy momentum with stability."
    ),
    (
        "Backpack Snatch to Full Overhead Squat Catch 12 kg",
        9.0,
        "Backpack-weighted",
        "Snatch 12 kg backpack overhead, dropping into a deep overhead squat catch before standing up."
    ),
    (
        "Band-Resisted Lateral Hurdle Hop Rebound",
        8.8,
        "Resistance Bands",
        "Hop laterally over an obstacle against band tension and immediately rebound back over."
    ),
    (
        "Backpack Hang Clean Pull 24 kg",
        8.9,
        "Backpack-weighted",
        "From above knees, violently extend hips and traps with a 24 kg backpack, floating the bag to sternum."
    ),
    (
        "Heavy Backpack Cluster Clean and Thruster 16 kg",
        9.1,
        "Backpack-weighted",
        "Clean backpack from floor into a front squat, then explode upward to press overhead in one continuous movement."
    ),
    (
        "Standing Band-Resisted Rotational Hook Snap",
        8.6,
        "Resistance Bands",
        "Rotate hips and throw an explosive lead hook against heavy band resistance, pivoting on front foot."
    ),
    (
        "Backpack Single-Arm Clean and Push Press 16 kg",
        8.8,
        "Backpack-weighted",
        "Clean 16 kg backpack to shoulder with one arm, dip and drive overhead to locked extension."
    ),
    (
        "Band-Resisted Backward Broad Jump Rebound",
        8.8,
        "Resistance Bands",
        "Jump backward against band tension, touch down, and instantly explode forward into a broad jump."
    ),
    (
        "Backpack High Pull From Floor 25 kg",
        9.0,
        "Backpack-weighted",
        "Pull 25 kg backpack from floor with maximal acceleration, exploding through traps and calves."
    ),
    (
        "Heavy Band Resisted Jump Lunge Alternating",
        8.9,
        "Resistance Bands",
        "Perform jump lunges with a heavy band looped over shoulders and under front foot, fighting elastic load."
    ),
    (
        "Backpack Hang Snatch High Pull 20 kg",
        8.9,
        "Backpack-weighted",
        "From hang position, violently extend hips with 20 kg backpack, floating bag to collarbone height."
    ),
    (
        "Heavy Backpack Push Press From Behind Neck 18 kg",
        8.8,
        "Backpack-weighted",
        "From back rack, dip and drive 18 kg backpack overhead using aggressive leg propulsion."
    ),
]

adv_gym_data = [
    # --- GYM: OLYMPIC WEIGHTLIFTING & ADVANCED BALLISTICS (Gym: 38) ---
    (
        "Barbell Power Clean From Floor at 80% 1RM",
        9.1,
        "Barbell",
        "Set up in clean stance. Accelerate bar off floor, explode into violent second pull past knees with full triple extension, and catch bar on front deltoids in a solid quarter-squat."
    ),
    (
        "Barbell Power Snatch From Hang at 75% 1RM",
        9.2,
        "Barbell",
        "Hold barbell with wide snatch grip at hip crease. Dip into hang position, violently extend hips and shrug, and punch bar overhead to catch in a shallow overhead squat."
    ),
    (
        "Barbell Clean and Jerk at 80% 1RM",
        9.2,
        "Barbell",
        "Clean bar from floor to shoulders in one motion, adjust grip, dip knees 3 inches, and drive into an explosive split jerk catch with locked arms overhead."
    ),
    (
        "Barbell Snatch Balance With Drop Under at 75% 1RM",
        9.0,
        "Barbell",
        "Hold bar on back traps with wide snatch grip. Dip and drive slightly, then drop rapidly underneath the bar into a full overhead squat, catching with locked arms."
    ),
    (
        "Trap Bar Jump Squat at 45% 1RM",
        8.9,
        "Barbell",
        "Load trap bar with 45% 1RM. Dip into quarter-squat and jump vertically with maximal intent, absorbing landing softly on gym floor."
    ),
    (
        "Heavy Kettlebell Double Snatch 24 kg",
        9.0,
        "Dumbbells",
        "Swing two 24 kg kettlebells between legs, snap hips violently, and punch both bells overhead simultaneously into lockout."
    ),
    (
        "Depth Jump From 24-Inch Box to 30-Inch Box Rebound",
        9.2,
        "Bodyweight",
        "Step off 24-inch box, touch floor, and instantly rebound onto a 30-inch box with sub-180ms ground contact time."
    ),
    (
        "Barbell Push Jerk at 80% 1RM",
        9.0,
        "Barbell",
        "Dip and drive bar from front rack, dropping 4 inches into a power catch with locked arms overhead."
    ),
    (
        "Dumbbell Hang Clean and Jerk Heavy 28 kg",
        8.9,
        "Dumbbells",
        "Clean two 28 kg dumbbells from hang to shoulders, immediately dip and jerk overhead to full lockout."
    ),
    (
        "Barbell Hang Clean Pull at 100% Clean 1RM",
        9.1,
        "Barbell",
        "From hang position, pull bar with 100% clean 1RM using violent hip extension and trap shrug, floating the bar."
    ),
    (
        "Plyometric Box Jump 36-Inch Step-Down",
        9.0,
        "Bodyweight",
        "Explode onto a 36-inch box from a countermovement, landing softly on top in a balanced quarter-squat."
    ),
    (
        "Single-Leg Box Jump Onto 24-Inch Box Left",
        9.0,
        "Bodyweight",
        "Jump onto 24-inch box off left leg only, sticking the single-leg landing atop the box."
    ),
    (
        "Single-Leg Box Jump Onto 24-Inch Box Right",
        9.0,
        "Bodyweight",
        "Jump onto 24-inch box off right leg only, absorbing landing in quiet athletic control."
    ),
    (
        "Barbell Split Jerk From Rack at 80% 1RM",
        9.1,
        "Barbell",
        "Dip and drive 80% 1RM bar from shoulders, splitting feet into a wide lunge catch with arms locked overhead."
    ),
    (
        "Medicine Ball Rotational Wall Slam 10 kg",
        8.8,
        "Dumbbells",
        "Violently pivot and slam a 10 kg medicine ball into a concrete wall with full rotational hip-core torque."
    ),
    (
        "Barbell Hang Snatch Pull at 85% Snatch 1RM",
        9.0,
        "Barbell",
        "From hang position, pull bar with 85% 1RM using violent hip extension and trap shrug."
    ),
    (
        "Trap Bar Deadlift Speed Pulls at 70% 1RM",
        8.9,
        "Barbell",
        "Pull trap bar from floor with maximal acceleration, locking out hips violently across 5 sets of 2 reps."
    ),
    (
        "Kettlebell Heavy Double Clean 28 kg",
        8.9,
        "Dumbbells",
        "Clean two 28 kg kettlebells from floor to rack position with explosive hip snap and smooth wrist catch."
    ),
    (
        "Smith Machine Incline Bench Throw 50% 1RM",
        8.9,
        "Machine",
        "On 30-degree incline, throw Smith bar upward off chest with maximal velocity, catching softly on descent."
    ),
    (
        "Barbell Speed Back Squat at 60% 1RM Chains",
        9.0,
        "Barbell",
        "Attach heavy chains to barbell. Lower to parallel and explode upward with maximal bar speed across 6 sets of 2 reps."
    ),
    (
        "Kettlebell Two-Hand High Pull 32 kg",
        8.8,
        "Dumbbells",
        "Hinge and snap hips with a 32 kg kettlebell, pulling elbows high to chin level in one fluid explosive pull."
    ),
    (
        "Barbell Power Clean From Hang Below Knee 75% 1RM",
        9.1,
        "Barbell",
        "Lower bar below kneecap, explode into vertical extension, and catch in a solid quarter-squat."
    ),
    (
        "Medicine Ball Overhead Slam 12 kg",
        8.8,
        "Dumbbells",
        "Slam a 12 kg medicine ball into gym floor using full lat and core contraction, catching off bounce."
    ),
    (
        "Dumbbell Single-Arm Snatch From Floor 30 kg Left",
        9.0,
        "Dumbbells",
        "Pull 30 kg dumbbell from floor between feet, pop hips, and punch overhead into locked arm."
    ),
    (
        "Dumbbell Single-Arm Snatch From Floor 30 kg Right",
        9.0,
        "Dumbbells",
        "Snatch 30 kg dumbbell overhead with right arm, training unilateral explosive hip drive."
    ),
    (
        "Barbell Overhead Shrug Pop 80% 1RM",
        8.9,
        "Barbell",
        "Hold bar locked overhead with snatch grip. Dip knees and pop upward onto toes while shrugging traps violently."
    ),
    (
        "Plyometric Depth Jump to Broad Jump Combo",
        9.1,
        "Bodyweight",
        "Step off 18-inch box, touch floor, and instantly explode forward into a maximal 8-foot broad jump."
    ),
    (
        "Barbell Push Press at 85% 1RM",
        9.0,
        "Barbell",
        "Dip knees 4 inches and drive with maximum leg drive to launch 85% 1RM barbell to overhead lockout."
    ),
    (
        "Kettlebell Double Push Jerk 24 kg",
        9.0,
        "Dumbbells",
        "Clean two 24 kg kettlebells, dip and jerk overhead, dropping into a shallow catch with locked arms."
    ),
    (
        "Barbell Clean Pull From Blocks at Knee 100% 1RM",
        9.1,
        "Barbell",
        "From wooden blocks, pull bar with 100% clean 1RM using violent hip extension and trap shrug."
    ),
    (
        "Dumbbell Jump Shrug Heavy 35 kg",
        8.9,
        "Dumbbells",
        "Hold 35 kg dumbbells at sides. Dip knees and pop upward into a vertical jump shrug."
    ),
    (
        "Barbell Hang Power Snatch From Blocks 75% 1RM",
        9.1,
        "Barbell",
        "From blocks at knee height, explode into vertical extension, catching bar in a solid overhead quarter-squat."
    ),
    (
        "Medicine Ball Backward Overhead Toss 10 kg",
        8.8,
        "Dumbbells",
        "Launch a 10 kg medicine ball backward overhead for maximum horizontal distance."
    ),
    (
        "Trap Bar Jump Shrug at 50% 1RM",
        9.0,
        "Barbell",
        "Dip inside trap bar with 50% 1RM, jump vertically off floor while shrugging traps violently at peak."
    ),
    (
        "Cable Standing Diagonal Chop Low-to-High Heavy Stack",
        8.7,
        "Cable",
        "Lift heavy cable diagonally from knee height up past opposite shoulder with maximal speed."
    ),
    (
        "Barbell Speed Deadlift at 65% 1RM Bands",
        9.0,
        "Barbell",
        "Pull barbell against heavy bands from floor with maximal acceleration, locking out hips violently."
    ),
    (
        "Dumbbell Hang Clean to Front Squat 26 kg",
        8.9,
        "Dumbbells",
        "Clean two 26 kg dumbbells to shoulders, drop into front squat, and drive up out of the hole."
    ),
    (
        "Barbell Snatch Pull From Floor at 90% 1RM",
        9.1,
        "Barbell",
        "Pull with wide snatch grip from floor with maximum acceleration, exploding through traps and calves."
    ),
]

if __name__ == "__main__":
    print(f"Advanced Home Count: {len(adv_home_data)} (Target: 87)")
    print(f"Advanced Gym Count: {len(adv_gym_data)} (Target: 38)")
    print(f"Total Advanced Count: {len(adv_home_data) + len(adv_gym_data)} (Target: 125)")
    assert len(adv_home_data) == 87
    assert len(adv_gym_data) == 38
    for item in adv_home_data + adv_gym_data:
        assert 8.1 <= item[1] <= 9.2, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Advanced exercise: {item[0]}"
    print("Advanced validation passed!")
