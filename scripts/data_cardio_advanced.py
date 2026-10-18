#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 9: CARDIO - ADVANCED TIER (Total: 75 Exercises)
# 53 Home (70%) + 22 Gym (30%)
# Validated High-Mechanical Disadvantage, Severe Metabolic & VO2 Max Stress
# Scientific Score Bounds: 8.1 to 9.2
# Equipment: Bodyweight, Backpack-weighted, Resistance Bands, Machine, Dumbbells, Barbell
# ==============================================================================

adv_home_data = [
    # --- High-Mechanical Disadvantage & Severe Metabolic Calisthenics (Home) ---
    (
        "Chest-to-Floor Burpee to Maximum Vertical Tuck Jump",
        8.6,
        "Bodyweight",
        "Perform a chest-to-floor burpee, pop feet explosively beneath hips, and launch directly into a maximal vertical tuck jump pulling knees to collarbones. Land softly and immediately descend to test high-intensity glycolytic power."
    ),
    (
        "Continuous Plyometric Split Lunge Jumps with Overhead Reach",
        8.4,
        "Bodyweight",
        "Drop into a full split lunge until rear knee grazes floor, explode vertically with both arms locked overhead, switch legs in mid-air, and descend seamlessly into opposite lunge without pauses."
    ),
    (
        "Single-Leg Plyometric Burpee Alternating Sets",
        8.8,
        "Bodyweight",
        "Perform a complete burpee balancing entirely on one leg: hop down, kick single leg back to plank, push up, hop forward, and jump vertically on that same leg. Alternate legs each round to expose unilateral cardiovascular limits."
    ),
    (
        "Sprawl to High-Velocity Double Tuck Jump Flow",
        8.7,
        "Bodyweight",
        "Drop into an aggressive wrestling sprawl with hips driven into mat, bounce back to feet, execute two unbroken maximal tuck jumps, and plunge back into the sprawl in continuous anaerobic intervals."
    ),
    (
        "Full-Range Doorframe Pull-Up Burpee Integration",
        9.0,
        "Bodyweight",
        "Drop into a chest-to-floor burpee beneath a doorway pull-up bar, snap to feet, jump up to grasp bar, and execute a strict chest-to-bar pull-up before dropping back down."
    ),
    (
        "High-Speed Bear Crawl to Crab Walk Continuous Shuttles",
        8.3,
        "Bodyweight",
        "Bear crawl forward 15 paces with knees hovering 1 inch, perform a kick-through into crab walk, sprint backward in crab walk 15 paces, and flip back without touching knees to floor."
    ),
    (
        "Plyometric Lateral Skater Hops with Deep Squat Absorb",
        8.4,
        "Bodyweight",
        "Bound laterally 5-6 feet across the room, catch on single leg sinking into a single-leg pistol quarter-squat to absorb momentum, and explode back laterally across the room."
    ),
    (
        "Continuous Plyometric Push-Up to Burpee Snap",
        8.8,
        "Bodyweight",
        "Perform an explosive clapping push-up at the bottom of the burpee, snap feet under hips, leap 12 inches vertically with knees tucked, and repeat in rapid succession."
    ),
    (
        "Double-Under Jump Rope Continuous 60-Second Blitz",
        8.7,
        "Bodyweight",
        "Spin jump rope twice beneath feet per jump for 60 unbroken seconds, maintaining minimal ground contact time, stiff Achilles recoil, and disciplined rhythmic breathing."
    ),
    (
        "Jump Rope Triple-Under Burst Conditioning",
        9.1,
        "Bodyweight",
        "Launch high into the air with aggressive vertical impulse, snapping wrists three times per jump to clear the rope, challenging maximal neuromuscular reactivity and anaerobic capacity."
    ),
    (
        "Jump Rope High-Knee Double-Under Cycling",
        9.0,
        "Bodyweight",
        "Alternate high-knee drives while spinning the rope at double speed, creating extreme metabolic and coordination demands across 45-second rounds."
    ),
    (
        "Prone Hand-Release Burpee with Forward Broad Jump Rebound",
        8.5,
        "Bodyweight",
        "Drop into hand-release burpee, stand, immediately explode into a maximal distance broad jump, backpedal 4 rapid steps, and drop straight into the next burpee."
    ),
    (
        "Single-Leg Hop to Lateral Burpee Sequence",
        8.6,
        "Bodyweight",
        "Perform 3 single-leg hops forward on right leg, drop laterally into a burpee, pop up onto left leg, hop 3 times, and drop laterally on the left side."
    ),
    (
        "Explosive Mountain Climber Cross-Body Knee-to-Shoulder Sprays",
        8.3,
        "Bodyweight",
        "In a locked push-up plank, sprint knees diagonally all the way to outside of opposite shoulders at maximum turnover, challenging lateral obliques and cardiovascular stamina."
    ),
    (
        "Wall-Facing Handstand Kick-Up to Sprawl Cardio Flow",
        8.9,
        "Bodyweight",
        "Kick up against a wall into a brief handstand, kick down, perform an immediate floor sprawl, pop to feet, and kick back up into handstand in continuous flow."
    ),
    (
        "Continuous 180-Degree Squat Jump Reversals",
        8.4,
        "Bodyweight",
        "Squat to parallel, explode vertically while rotating 180 degrees in air, absorb softly into squat facing opposite direction, and immediately reverse rotation on the rebound."
    ),
    (
        "Alligator Crawl Low-Profile Floor Shuttles",
        8.7,
        "Bodyweight",
        "Crawl forward with chest grazing the floor in a continuous moving push-up stance, coordinating opposite elbow and knee drives to tax full-body musculature and aerobic endurance."
    ),
    (
        "Plank Jack to Double Knee Tuck Thrust",
        8.3,
        "Bodyweight",
        "In high plank, jump feet wide and narrow, then immediately tuck both knees to chest landing outside elbows, jump back to plank, and repeat without pause."
    ),
    (
        "Combat Kickboxing 8-Strike Maximum Cadence Interval",
        8.5,
        "Bodyweight",
        "Throw jab, cross, hook, uppercut, right switch-kick, left knee, spinning back fist, and drop to sprawl. Repeat unbroken combinations for 3 minutes to simulate combat rounds."
    ),
    (
        "Floor Donkey Kick to Explosive Tuck Jump",
        8.8,
        "Bodyweight",
        "Place hands down, kick both legs high toward handstand balance, land on feet, and instantly rebound into a maximal tuck jump, cycling upper and lower body power."
    ),

    # --- Weighted Backpack & Resisted Advanced Conditioning (Home) ---
    (
        "Backpack 30 lb Weighted Chest-to-Floor Burpees",
        9.1,
        "Backpack-weighted",
        "Strap a 30 lb weighted backpack securely against torso. Drop into full chest-to-floor burpees, snap up through heels, and jump vertically, managing severe axial and respiratory load."
    ),
    (
        "Backpack 35 lb Weighted Stair Sprint Escalation",
        9.0,
        "Backpack-weighted",
        "Sprint up household stairs with a 35 lb backpack at maximum sustainable velocity, turn and walk down with controlled cadence, and repeat for 12 consecutive intervals."
    ),
    (
        "Backpack 25 lb Weighted Squat Jump Continuous Sets",
        8.9,
        "Backpack-weighted",
        "Wear a 25 lb backpack strapped snug. Descend into deep squat and leap aggressively off floor, absorbing softly through midfoot to maintain continuous time-under-tension."
    ),
    (
        "Backpack 30 lb Weighted Mountain Climber Piston Sprints",
        8.6,
        "Backpack-weighted",
        "Wear a 30 lb backpack while locked in high plank. Drive knees toward chest in high-speed piston cycles, forcing serratus and core stabilizers to maintain spinal integrity."
    ),
    (
        "Backpack 25 lb Weighted Lateral Bounding Skater Hops",
        8.7,
        "Backpack-weighted",
        "Wear a snug 25 lb backpack. Bound dynamically 5 feet laterally side-to-side, absorbing landing on one leg and countering rotational centrifugal force under load."
    ),
    (
        "Backpack 30 lb Weighted Bear Crawl Multi-Room Shuttles",
        8.8,
        "Backpack-weighted",
        "Bear crawl continuously through hallways and rooms with a 30 lb pack without allowing knees to touch the floor, maintaining neutral spine and deep nasal breathing."
    ),
    (
        "Backpack 35 lb Rucking Step-Up Power Intervals",
        8.8,
        "Backpack-weighted",
        "Step onto a 16-inch sturdy platform with a 35 lb backpack at a brisk 60 steps per minute cadence, fully opening hip joint at the apex of every single stride."
    ),
    (
        "Backpack 25 lb Weighted Burpee Broad Jump Shuttles",
        9.1,
        "Backpack-weighted",
        "Perform a burpee with a 25 lb backpack, jump forward into a powerful broad jump, turn around, and repeat, challenging ballistic deceleration under added mass."
    ),
    (
        "Resistance Band Waist-Resisted Rapid Sprint Accelerations",
        8.5,
        "Resistance Bands",
        "Anchor heavy band behind waist. Sprint forward 10 feet against maximal elastic tension until band halts progress, hold drive for 3 seconds, and backpedal under control."
    ),
    (
        "Resistance Band Quadruple-Punch to Sprawl Explosions",
        8.6,
        "Resistance Bands",
        "Throw 4 rapid straight punches against heavy band tension anchored behind, immediately drop into a combat sprawl, pop up, and fire punches again without resting."
    ),
    (
        "Heavy Resistance Band Resisted High-Knee Bound Sprints",
        8.7,
        "Resistance Bands",
        "With heavy band around hips anchored to a post, perform explosive high-knee bounding strides forward, overcoming escalating elastic resistance on each stride."
    ),
    (
        "Resistance Band Burpee to Overhead Elastic Press",
        8.5,
        "Resistance Bands",
        "Stand on band, drop to floor for a burpee, snap feet onto band, stand, and immediately press band handles aggressively overhead in one continuous motion."
    ),
    (
        "Backpack 25 lb Weighted Split Lunge Jump Switches",
        9.0,
        "Backpack-weighted",
        "Wear 25 lb backpack. Drop into split lunge and leap vertically, switching legs in air and descending smoothly, demanding massive eccentric quad and glute braking force."
    ),
    (
        "Backpack 30 lb Hugged Front-Rack Thruster Ladders",
        8.9,
        "Backpack-weighted",
        "Hug a 30 lb backpack across chest in front rack position, squat deep, and thrust overhead. Perform unbroken ladders of 15, 12, 9, 6 reps with minimal rest."
    ),

    # --- High-Cadence Agility & Complex Footwork conditioning (Home) ---
    (
        "Lateral Shuffle to Sprawl to Lateral Bound Cycle",
        8.6,
        "Bodyweight",
        "Shuffle 4 paces right, drop into an explosive sprawl, pop to feet, leap laterally 5 feet left, and immediately reverse sequence in continuous athletic flow."
    ),
    (
        "Sprint-Decel-Backpedal-Sprint 10-Meter Multi-Vector Shuttle",
        8.4,
        "Bodyweight",
        "Sprint 10 meters forward, plant foot hard into low decel, backpedal 5 meters, change direction instantly into a forward sprint, repeating across 60-second intervals."
    ),
    (
        "Continuous Lateral Bench Step-Overs at Sprint Cadence",
        8.7,
        "Bodyweight",
        "Rapidly step up and over a sturdy household low bench sideways, maintaining light forefoot contact and continuous arm pumps to train lateral aerobic speed."
    ),
    (
        "Floor Quadrupedal Clock Crawl Multi-Directional Shuttles",
        8.5,
        "Bodyweight",
        "Crawl in a circle pivoting like clock hands (12 to 3, 6, 9) maintaining knees 1 inch off floor, then reverse direction immediately to stress core and shoulder stamina."
    ),
    (
        "Jumping Jack to Drop Squat to Burpee Triad",
        8.4,
        "Bodyweight",
        "Execute 3 rapid jumping jacks, drop into 2 wide floor-touch squat jumps, and plunge into 1 full chest-to-floor burpee in continuous cyclic rounds."
    ),
    (
        "Fast-Tempo Sprawl to Double High-Knee Strike Combination",
        8.6,
        "Bodyweight",
        "Sprawl flat on floor, pop up into an athletic base, fire two explosive jumping knees toward chest, and drop back into sprawl without hesitation."
    ),
    (
        "Prone Hand-Release Burpee with 180-Degree Pivot Jump",
        8.7,
        "Bodyweight",
        "Perform a hand-release burpee, stand, explode into a 180-degree vertical jump reversal, and drop into the next burpee facing opposite wall."
    ),
    (
        "Single-Leg Lateral Hop to Burpee Recovery",
        8.8,
        "Bodyweight",
        "Hop 4 times sideways on right leg, drop directly into a burpee, pop up onto left leg, hop 4 times sideways, and repeat sequence unbroken."
    ),
    (
        "Explosive Star Jump Conditioning Blitz",
        8.5,
        "Bodyweight",
        "Crouch into a compact ball and explode upward into full air extension with arms and legs flared into a star, absorbing landing softly and repeating continuously."
    ),
    (
        "Double Mountain Climber to Pike Hop Flow",
        8.3,
        "Bodyweight",
        "In high plank, sprint 4 mountain climbers, hop both feet together into pike position near hands, hop back to plank, and repeat at rapid tempo."
    ),
    (
        "Backpack 20 lb Weighted Star Jumps",
        8.9,
        "Backpack-weighted",
        "Wear a 20 lb backpack, crouch, and launch into explosive star jumps, testing dynamic shoulder, core, and lower-body stability under acceleration."
    ),
    (
        "Burpee to 360-Degree Jump Spin",
        9.0,
        "Bodyweight",
        "Drop to floor in burpee, snap feet under, and leap vertically while spinning a full 360 degrees in air, landing in balance before dropping immediately into the next rep."
    ),
    (
        "Continuous Lateral Ice Skater Bounds with Medicine Ball Hug",
        8.8,
        "Backpack-weighted",
        "Hug a 20 lb weighted backpack to chest while leaping laterally side to side, controlling core rotation and maintaining continuous bounding momentum."
    ),
    (
        "Prone Push-Up Clap to Tuck Jump Burst",
        9.1,
        "Bodyweight",
        "Drop into a burpee, execute a clapping push-up at the bottom, snap up, and explode into a vertical tuck jump, pushing upper and lower body power simultaneously."
    ),
    (
        "Forward Frog Hop to Reverse Crab Crawl Return",
        8.4,
        "Bodyweight",
        "Perform 4 explosive forward frog hops in succession, drop to floor into crab position, scuttle backward rapidly to starting line, and immediately cycle."
    ),
    (
        "High-Speed Floor Switch Kicks (Crab Kicks)",
        8.2,
        "Bodyweight",
        "In reverse crab position, kick alternating legs straight up into air at high speed, contacting opposite hand with foot while driving aerobic turnover."
    ),
    (
        "Backpack 25 lb Weighted Continuous Lateral Shuffles",
        8.7,
        "Backpack-weighted",
        "With 25 lb backpack strapped tightly, stay in low quarter squat and shuffle side to side across a 20-foot span without standing up, burning out quads and lungs."
    ),
    (
        "Sprawl to Broad Jump to Backpedal Circuit",
        8.6,
        "Bodyweight",
        "Sprawl chest to floor, bounce up, launch into a 6-foot broad jump, backpedal 4 quick steps, and plunge directly into the next sprawl in unbroken rhythm."
    ),
    (
        "Continuous Jumping Jack to Burpee Blitz (10:1 Ratio)",
        8.5,
        "Bodyweight",
        "Perform 10 rapid jumping jacks, immediately drop into 1 full burpee, pop up, and cycle for 5 unbroken rounds to push cardiovascular threshold."
    ),
]

adv_gym_data = [
    # --- Advanced Commercial Ergometers, Sleds & Gym Conditioning (Gym) ---
    (
        "Assault AirBike 20-Second All-Out Sprints (Norwegian 4x4 Auxiliary)",
        9.1,
        "Machine",
        "Pedal and pump handles at maximum power output (>80 RPM, >600 watts) for 20 seconds, followed by 40 seconds easy spin, repeated for 8 continuous rounds."
    ),
    (
        "Rowing Ergometer 1000-Meter Maximal Effort Time Trial",
        8.9,
        "Machine",
        "Row 1000 meters at 1:35-1:45/500m split pace at 30-34 SPM, operating at 95% VO2 max to evaluate acute lactate buffering and mental endurance."
    ),
    (
        "Concept2 SkiErg 500-Meter All-Out Sprint Repeats",
        8.8,
        "Machine",
        "Execute 500m intervals on the SkiErg at sub-1:45/500m pace with 2 minutes rest between sets, demanding aggressive lat drive, hip hinge, and ventilatory capacity."
    ),
    (
        "Curved Manual Treadmill Tabata Sprint Intervals (20s on / 10s off)",
        9.2,
        "Machine",
        "Sprint on self-powered curved treadmill deck at top velocity for 20 seconds, jump feet to rails for 10 seconds rest, and repeat for 8 brutally taxing cycles."
    ),
    (
        "Gym Turf Sled Heavy Push Sprints (100% Bodyweight Load)",
        9.0,
        "Machine",
        "Load sled with 100% of athlete's bodyweight. Drive legs forcefully into turf in 25-meter all-out sprints with low forward torso lean, resting 60 seconds between rounds."
    ),
    (
        "Gym Turf Sled Sprint-to-Backward Drag Shuttle",
        8.9,
        "Machine",
        "Push sled 25 meters forward at sprint cadence, grab attached straps, and sprint backward 25 meters dragging the sled without pausing to test multi-planar stamina."
    ),
    (
        "Barbell Thruster High-Cadence Intervals (95 lbs / 43 kg)",
        9.0,
        "Barbell",
        "Perform 15 unbroken thrusters (front squat to overhead press) with 95 lbs at rapid turnover, drop bar, rest 45 seconds, and repeat for 5 rounds."
    ),
    (
        "Assault Bike to Rowing Ergometer Maximal Brick Intervals",
        9.1,
        "Machine",
        "Sprint 15 calories on Assault Bike at maximum effort, transition within 5 seconds to Concept2 rower and pull 250m sprint, resting 90 seconds between cycles."
    ),
    (
        "Commercial Stair Climber Weighted Vest (30 lbs) 10-Minute Ascent",
        8.8,
        "Machine",
        "Wear a 30 lb weighted vest on stair climber at Level 10-12 without touching handrails, maintaining tall posture and continuous high-intensity aerobic stepping."
    ),
    (
        "Kettlebell Two-Handed Snatch Continuous Cycling (24 kg)",
        8.7,
        "Dumbbells",
        "Snatch a 24 kg kettlebell overhead from between legs in one explosive arc, cycling 10 reps per arm continuously for 6 minutes to challenge VO2 kinetics."
    ),
    (
        "Rowing Ergometer 500m Sprint into 15 Burpee Box Jump-Overs",
        9.2,
        "Machine",
        "Row 500m at sub-1:40 split, dismount immediately, and complete 15 burpee box jump-overs on a 24-inch plyo box without pausing."
    ),
    (
        "SkiErg to Assault Bike 20-Calorie Alternating Sprints",
        9.0,
        "Machine",
        "Burn 20 calories on the SkiErg at top speed, sprint across to Assault Bike to burn 20 calories, rest 60 seconds, and repeat for 4 grueling sets."
    ),
    (
        "Battle Rope Double Slams to 30-Inch Box Jump Shuttles",
        8.7,
        "Bodyweight",
        "Execute 10 explosive double-arm battle rope slams, drop ropes, leap onto a 30-inch wooden plyo box, step down, and repeat sequence 5 times unbroken."
    ),
    (
        "Treadmill 15% Incline Steep Hill Sprint Repeats",
        8.9,
        "Machine",
        "Sprint at 8.0 mph on a 15% treadmill incline for 30 seconds, grab rails and straddle deck for 30 seconds rest, repeating for 10 high-lactate rounds."
    ),
    (
        "Curved Manual Treadmill 400-Meter High-Velocity Runs",
        9.0,
        "Machine",
        "Complete 400m intervals on curved manual treadmill holding maximal aerobic speed, managing foot strike under severe quadricep and lung fatigue."
    ),
    (
        "Barbell Power Clean and Jerk Cardio Cycling (115 lbs / 52 kg)",
        8.9,
        "Barbell",
        "Power clean from floor and push jerk overhead in continuous touch-and-go cycling for 60 seconds, pushing upper and lower body aerobic limits."
    ),
    (
        "Gym Turf Sled High-Speed Rope Hand-Over-Hand Pulls",
        8.6,
        "Machine",
        "Attach a 50-foot battle rope to loaded sled. From athletic seated position, pull sled rapidly hand-over-hand across turf, sprint to reset sled, and repeat."
    ),
    (
        "Assault Bike 60-Second Maximal Calorie Burn",
        9.1,
        "Machine",
        "Sprint all-out for 60 seconds on Assault Bike attempting to exceed 40-50 calories in a single effort, driving heart rate to absolute physiological maximum."
    ),
    (
        "Rowing Ergometer 30-Second Tabata Pull Intervals",
        8.8,
        "Machine",
        "Row at maximum wattage (>400W) for 20 seconds, glide for 10 seconds, and repeat for 8 consecutive intervals to test anaerobic capacity."
    ),
    (
        "Dumbbell Man-Maker Continuous Fluid Cycling",
        9.1,
        "Dumbbells",
        "Hold two 25 lb dumbbells. Drop into push-up, row left dumbbell, row right dumbbell, hop feet forward into squat, and clean-thruster overhead in one fluid rep."
    ),
    (
        "Commercial Stair Climber High-Cadence Skip-Step Sprints",
        8.7,
        "Machine",
        "Skip every other step on moving stairs at high speed (Level 14+) without handrails, using explosive knee drives to stimulate massive aerobic output."
    ),
    (
        "SkiErg 1000-Meter Paced Aerobic Threshold Time Trial",
        8.8,
        "Machine",
        "Complete 1000 meters on SkiErg holding steady 1:50 split pace at 32 SPM, demanding continuous core flexion and high cardiac stroke volume."
    ),
]

if __name__ == "__main__":
    print(f"Advanced Home: {len(adv_home_data)}")
    print(f"Advanced Gym: {len(adv_gym_data)}")
    print(f"Advanced Total: {len(adv_home_data) + len(adv_gym_data)}")
    for name, score, eq, inst in adv_home_data + adv_gym_data:
        assert 8.1 <= score <= 9.2, f"Score {score} out of bounds for {name}"
    print("All advanced scores within 8.1 - 9.2 range!")
