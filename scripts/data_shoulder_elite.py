#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 6: SHOULDER - ELITE TIER (Total: 60 Exercises)
# 42 Home (70%) + 18 Gym (30%)
# Validated Peak Human Performance, Hyper-Advanced Levers, Severe Mechanical Disadvantage
# Strict 1.5 Repetition Protocol & Hyper-Advanced Static-Active Holds Exclusively
# Scientific Score Bounds: 9.3 to 10.0
# Equipment: Backpack-weighted, Bodyweight, Resistance Bands, Barbell, Dumbbells, Cable, Machine
# ==============================================================================

elite_home_data = [
    # --- Hyper-Advanced Calisthenic Levers & Weighted 1.5 Protocols (Home) ---
    (
        "Weighted Handstand Push-Ups 1.5 Repetition Protocol (30 lb Backpack)",
        9.8,
        "Backpack-weighted",
        "Wear a 30 lb weighted backpack strapped tight. Kick into a wall-supported handstand, lower forehead to floor, press upward to 50% height, pulse back down under continuous anterior deltoid tension (1.5 repetition protocol), and explode to full overhead lockout."
    ),
    (
        "Hyper-Advanced Planche Push-Up Isometric Hold (15s Hold to 1.5 Reps)",
        9.9,
        "Bodyweight",
        "Hold a full straight-body planche with hands beside hips for 15 seconds of hyper-advanced isometric static-active load, then immediately perform 3 planche push-ups utilizing the strict 1.5 repetition protocol (full press plus 50% pulse) under extreme mechanical disadvantage."
    ),
    (
        "Freestanding Handstand Push-Up 1.5 Repetition Protocol (No Wall)",
        10.0,
        "Bodyweight",
        "In a freestanding balance without wall support, lower crown of head forward to touch floor, press halfway up, descend 2 inches for a strict 1.5 repetition pulse under continuous deltoid tension, and press to full overhead lockout."
    ),
    (
        "Deficit Wall Handstand Push-Up 1.5 Pulse Protocol (4-Inch Blocks)",
        9.9,
        "Bodyweight",
        "With hands on 4-inch blocks against wall, lower shoulders below hand level, press to full lockout, lower halfway, pulse back to full extension (1.5 repetition protocol) maintaining scapular upward rotation."
    ),
    (
        "Weighted Backpack 50 lb Standing Strict Military Press 1.5 Wave",
        9.6,
        "Backpack-weighted",
        "Load backpack with 50 lbs. Press strictly from collarbones overhead, lower to eye level, pulse back to full lockout under continuous time-under-tension (1.5 repetition protocol), and lower under 4-second tempo."
    ),
    (
        "Weighted Backpack 60 lb Standing Push Press 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Hold a 60 lb heavy backpack at collarbones. Dip and drive aggressively overhead, lower to eye level, pulse back up to lockout (1.5 repetition protocol), and reset with tight spinal alignment."
    ),
    (
        "Tuck Planche to Handstand Press 1.5 Repetition Protocol",
        9.9,
        "Bodyweight",
        "From tuck planche on low parallettes, press hips and legs vertically into a handstand, lower to a 45-degree inverted pike, pulse back to handstand (1.5 repetition protocol), and lower back to tuck planche."
    ),
    (
        "Weighted Backpack 40 lb Floor Z-Press 1.5 Protocol",
        9.8,
        "Backpack-weighted",
        "Sit on floor with legs straddled flat. Press 40 lb backpack overhead, lower halfway to eye height, pulse back to lockout (1.5 repetition protocol) under pure anterior deltoid and core contraction."
    ),
    (
        "Hyper-Advanced Zanetti Press Incline Lever Hold (10s Hold to 1.5 Reps)",
        9.9,
        "Bodyweight",
        "On low parallettes or floor blocks, lower body into a deep Maltese/Zanetti horizontal cross lever, hold isometrically for 10 seconds, then press back through a 1.5 repetition half-range pulse under severe tendon strain."
    ),
    (
        "Weighted Backpack 35 lb Single-Arm Strict Press 1.5 Protocol",
        9.6,
        "Backpack-weighted",
        "Grip 35 lb backpack in right hand at shoulder. Press overhead, lower halfway to ear, pulse back to full extension (1.5 repetition protocol), and lower smoothly, resisting all lateral torso flexion."
    ),
    (
        "Weighted Backpack 35 lb Single-Arm Strict Press 1.5 Protocol (Left Arm)",
        9.6,
        "Backpack-weighted",
        "Grip 35 lb backpack in left hand at shoulder. Press overhead, lower halfway to ear, pulse back to full extension (1.5 repetition protocol), and lower smoothly to match unilateral strength."
    ),
    (
        "Wall-Facing Handstand Push-Up 1.5 Protocol (Hollow Core)",
        9.7,
        "Bodyweight",
        "In a strict wall-facing handstand with hollow body, lower nose to floor, press to full lockout, lower halfway, pulse back to lockout (1.5 repetition protocol), maintaining active posterior pelvic tilt."
    ),
    (
        "Weighted Backpack 40 lb Pike Push-Up 1.5 Deficit Protocol",
        9.5,
        "Backpack-weighted",
        "With a 40 lb backpack strapped securely, place feet on chair and hands on deficit blocks. Perform full deficit push-up, press up, lower halfway, pulse back to top (1.5 repetition protocol)."
    ),
    (
        "Hyper-Advanced Planche Lean Static-Active Hold (30s at 45-Degree Lean)",
        9.8,
        "Bodyweight",
        "Assume floor push-up position with hands at hips. Shift shoulders 8 inches forward into severe mechanical disadvantage, hold static-active protraction for 30 seconds, and complete 2 push-ups with 1.5 pulse reps."
    ),
    (
        "Weighted Backpack 30 lb Lateral Raise 1.5 Protocol",
        9.4,
        "Backpack-weighted",
        "Hold 30 lb loaded bags. Raise arms laterally to 90 degrees, lower halfway to 45 degrees, pulse back to parallel (1.5 repetition protocol) under continuous lateral deltoid tension, and lower slowly."
    ),
    (
        "Dual Heavy Band Overhead Iron Cross 1.5 Isometric Protocol",
        9.5,
        "Resistance Bands",
        "Stand on dual heavy bands, raise arms to horizontal cross (90 degrees abduction), hold for 15 seconds, pulse upward 3 inches, descend halfway, and lock back out (1.5 protocol) against extreme elastic force."
    ),
    (
        "Weighted Backpack 45 lb Clean-to-Push Press 1.5 Wave",
        9.6,
        "Backpack-weighted",
        "Clean 45 lb backpack from floor, dip and drive overhead, lower halfway to crown of head, pulse back to locked overhead extension (1.5 repetition protocol), and lower under strict control."
    ),
    (
        "Deficit Ring Handstand Push-Up 1.5 Protocol (Unstable Levers)",
        10.0,
        "Bodyweight",
        "In a handstand on gymnastic rings hanging 1 foot from floor, descend into deficit, press up, lower halfway to stabilize ring shake, pulse back to lockout (1.5 repetition protocol) under supreme rotator cuff strain."
    ),
    (
        "Weighted Backpack 35 lb Front Scaption Raise 1.5 Protocol",
        9.4,
        "Backpack-weighted",
        "Raise 35 lb backpack forward at 30-degree scaption angle to eye level, lower halfway, pulse back to eye level (1.5 repetition protocol), and lower under 4-second eccentric tempo."
    ),
    (
        "Wall Handstand Single-Arm Hover Hold to 1.5 Negative",
        9.8,
        "Bodyweight",
        "In vertical wall handstand, shift weight to single arm and hover opposite hand for 10 seconds, place hand back down, and perform a strict handstand push-up with 1.5 repetition half-rep pulse."
    ),
    (
        "Weighted Backpack 40 lb Bent-Over Rear Delt Fly 1.5 Protocol",
        9.5,
        "Backpack-weighted",
        "Hinge forward 80 degrees with flat spine. Fly 40 lb pack bags horizontally, lower halfway, pulse back to peak horizontal squeeze (1.5 repetition protocol), and lower under 3-second control."
    ),
    (
        "Hyper-Advanced Maltese Floor Press Isometric Hold (15s Hold to 1.5 Reps)",
        9.9,
        "Bodyweight",
        "Place hands wide at hip level on floor in Maltese lean with arms extended, hold isometric static-active tension for 15 seconds, and execute 2 micro-presses utilizing the 1.5 repetition protocol."
    ),
    (
        "Weighted Backpack 50 lb Half-Kneeling Strict Press 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "In half-kneeling stance, press 50 lb pack overhead, lower halfway to ear level, pulse back to lockout (1.5 repetition protocol), and lower under strict anterior deltoid control."
    ),
    (
        "Heavy Resistance Band Standing Strict Press 1.5 Repetition Protocol",
        9.5,
        "Resistance Bands",
        "Step on double-looped heavy band, press overhead, lower to forehead, pulse back to full extension (1.5 repetition protocol) against maximal elastic resistance at top."
    ),
    (
        "Pseudo Planche Push-Up with 25 lb Backpack 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Wear a 25 lb backpack with hands placed at waist. Lean forward into severe mechanical disadvantage, lower chest to floor, press halfway, pulse to bottom, and press to full protraction (1.5 protocol)."
    ),
    (
        "Weighted Backpack 40 lb Overhead Waiter Carry 1.5 Dip Protocol",
        9.6,
        "Backpack-weighted",
        "Hold 40 lb backpack flat on palm locked overhead. Walk 20 paces, perform a single-arm overhead dip and 1.5 repetition pulse, and walk back, alternating arms."
    ),
    (
        "Straddle Planche to Incline Handstand 1.5 Pulse Flow",
        10.0,
        "Bodyweight",
        "Hold straddle planche on parallettes for 5 seconds, press hips to handstand, lower halfway to 45-degree shoulder angle, pulse back to handstand (1.5 repetition protocol), and lower to straddle planche."
    ),
    (
        "Weighted Backpack 35 lb Halo to Push Press 1.5 Complex",
        9.5,
        "Backpack-weighted",
        "Orbit 35 lb backpack around head, drop to collarbones, push press overhead, lower halfway, pulse back to top (1.5 repetition protocol), and orbit counter-clockwise."
    ),
    (
        "Resistance Band High-Tension Face Pull to Y-Press 1.5 Protocol",
        9.4,
        "Resistance Bands",
        "Face pull heavy band to nose, externally rotate to vertical, press overhead into 'Y', lower halfway, pulse back to top (1.5 repetition protocol), and reverse under control."
    ),
    (
        "Wall-Supported Handstand Push-Up 1.5 Repetition Protocol (Strict Unweighted)",
        9.6,
        "Bodyweight",
        "From vertical handstand against wall, lower head to floor, press to full lockout, lower halfway to 90-degree elbows, pulse back to lockout (1.5 repetition protocol), maintaining neutral cervical spine."
    ),
    (
        "Weighted Backpack 45 lb Standing Bradford Press 1.5 Protocol",
        9.6,
        "Backpack-weighted",
        "Press 45 lb backpack from front just over crown of head, lower behind neck, press halfway up, pulse back down behind neck (1.5 repetition protocol), and bring back over head to front."
    ),
    (
        "Hyper-Advanced Hollow-Body Handstand Shrug 1.5 Protocol",
        9.5,
        "Bodyweight",
        "In vertical handstand, shrug shoulders into maximum scapular elevation, lower halfway, pulse back to peak elevation (1.5 repetition protocol), and hold for 10 seconds."
    ),
    (
        "Weighted Backpack 30 lb Single-Arm High Pull 1.5 Protocol",
        9.4,
        "Backpack-weighted",
        "Explode through hips and pull 30 lb backpack to collarbone with high elbow, lower halfway to chest, pulse back to collarbone (1.5 repetition protocol), and lower under control."
    ),
    (
        "Tuck Planche Push-Up with 20 lb Backpack 1.5 Protocol",
        9.9,
        "Backpack-weighted",
        "With a 20 lb backpack strapped tight, hold tuck planche on parallettes, lower shoulders forward into push-up, press halfway, pulse to bottom, and press to lockout (1.5 protocol)."
    ),
    (
        "Weighted Backpack 50 lb Standing Push Press 1.5 Pause Protocol",
        9.7,
        "Backpack-weighted",
        "Dip and drive 50 lb backpack overhead, pause 2 seconds at lockout, lower halfway to eye level, pulse back to top (1.5 repetition protocol), and lower under 3-second tempo."
    ),
    (
        "Dual Band Standing Cuban Press 1.5 Protocol (Extreme Rotator Tension)",
        9.5,
        "Resistance Bands",
        "Upright row heavy bands, rotate forearms to vertical, press overhead, lower halfway to eye level, pulse back to lockout (1.5 repetition protocol), and reverse sequence under control."
    ),
    (
        "Freestanding Handstand Shoulder Tap 1.5 Balance Hold",
        9.9,
        "Bodyweight",
        "In freestanding handstand, tap shoulder with hand, hold single-arm balance for 3 seconds, lower head 3 inches, pulse back up (1.5 repetition protocol), and switch arms."
    ),
    (
        "Weighted Backpack 40 lb Prone Y-T-W 1.5 Complex",
        9.5,
        "Backpack-weighted",
        "Lie chest-supported holding 20 lb bags. Perform Y-raise with a 1.5 repetition pulse at top, T-raise with a 1.5 pulse, and W-press with a 1.5 pulse to completely exhaust posterior girdle."
    ),
    (
        "Wall-Facing Handstand 1.5 Deficit Push-Up on Parallettes",
        9.9,
        "Bodyweight",
        "Facing wall in hollow handstand on 4-inch parallettes, descend below hand level, press to lockout, lower halfway, pulse back to full extension (1.5 repetition protocol)."
    ),
    (
        "Weighted Backpack 45 lb Floor Z-Press 1.5 Pause Protocol",
        9.8,
        "Backpack-weighted",
        "In straddle seated position on floor, press 45 lb pack overhead, pause 2 seconds, lower halfway, pulse back to lockout (1.5 repetition protocol), maintaining rigid upright torso."
    ),
    (
        "Planche Lean to Handstand Kick 1.5 Shoulder Burnout",
        9.7,
        "Bodyweight",
        "Hold 20-second planche lean with hands at hips, kick immediately into a wall handstand, and perform 3 handstand push-ups with mandatory 1.5 repetition half-rep pulses."
    ),
    (
        "Weighted Backpack 35 lb Lateral-to-Front Fly 1.5 Protocol",
        9.5,
        "Backpack-weighted",
        "Raise 35 lb bags laterally, sweep to front, lower halfway, pulse back to eye level (1.5 repetition protocol), sweep laterally, and lower under 4-second tempo."
    ),
]

elite_gym_data = [
    # --- Extreme Olympic, Free-Weight & Chain-Loaded 1.5 Protocols (Gym) ---
    (
        "Heavy Push Press 1.5 Repetition Protocol (Barbell 135% Bodyweight)",
        9.9,
        "Barbell",
        "Load Olympic barbell with 135% bodyweight. Dip and drive violently overhead to lockout, lower under control to eye level, pulse back up to lockout (1.5 repetition protocol) under continuous deltoid tension, and reset."
    ),
    (
        "Standing Barbell Military Press 1.5 Repetition Protocol (Bodyweight Load)",
        9.8,
        "Barbell",
        "Press bodyweight load strictly from collarbones overhead, lower under control to eye level, pulse back to lockout (1.5 repetition protocol) maintaining rigid glute and abdominal brace."
    ),
    (
        "Barbell Behind-the-Neck Snatch Press 1.5 Protocol (Full Deficit)",
        9.7,
        "Barbell",
        "Grip barbell in wide snatch grip behind neck. Press to overhead lockout, lower to ear level, pulse back to lockout (1.5 repetition protocol) under continuous lateral and rear delt tension."
    ),
    (
        "Dumbbell Seated Overhead Press 1.5 Protocol (100 lb Pairs)",
        9.9,
        "Dumbbells",
        "Sit on upright bench with 100 lb dumbbells. Press vertically to lockout, lower to ear level, pulse back to full extension (1.5 repetition protocol), and lower under 4-second eccentric tempo."
    ),
    (
        "Barbell Standing Overhead Press with Heavy Chains 1.5 Protocol",
        9.8,
        "Barbell",
        "Hang 40 lbs of heavy chains on barbell. Press overhead as chains clear floor, lower to chin, pulse back to top lockout (1.5 repetition protocol), fighting dynamic oscillating chain load."
    ),
    (
        "Cable Single-Arm Lateral Raise Behind-the-Back 1.5 Protocol",
        9.5,
        "Cable",
        "Set low cable behind back. Raise arm laterally to 90 degrees, lower halfway to 45 degrees, pulse back to horizontal (1.5 repetition protocol) under continuous cable tension, and lower slowly."
    ),
    (
        "Dumbbell Standing Arnold Press 1.5 Protocol (85 lb Pairs)",
        9.7,
        "Dumbbells",
        "Rotate and press 85 lb dumbbells overhead, lower halfway with forearms at 90 degrees, pulse back to overhead lockout (1.5 repetition protocol), and reverse rotation to chin."
    ),
    (
        "Barbell Standing Klokov Press 1.5 Protocol from Overhead Squat",
        10.0,
        "Barbell",
        "Hold full bottom overhead squat, press barbell from behind neck to lockout, lower to ear level, pulse back to full lockout (1.5 repetition protocol) before standing up."
    ),
    (
        "Cable Eye-Level Heavy Face Pull 1.5 Protocol with External Rotation",
        9.4,
        "Cable",
        "Pull heavy cable rope to forehead with high elbows, rotate wrists to ears, lower halfway, pulse back to peak external rotation (1.5 repetition protocol), and return under control."
    ),
    (
        "Dumbbell Standing Lu Raise 1.5 Protocol with 35 lb Plates",
        9.6,
        "Dumbbells",
        "Raise 35 lb plates in wide lateral circle to overhead touch, lower to shoulder level, pulse back overhead (1.5 repetition protocol), and lower along outer arc under 4-second tempo."
    ),
    (
        "Barbell Snatch-Grip High Pull 1.5 Protocol from Hang (Heavy Load)",
        9.6,
        "Barbell",
        "Explode from hang, pull barbell to sternum with high elbows, lower halfway to chest, pulse back to sternum (1.5 repetition protocol), and lower to hang position."
    ),
    (
        "Dumbbell Seated 6-Way Lateral Raise 1.5 Protocol Complex",
        9.7,
        "Dumbbells",
        "Raise laterally, bring to front, raise overhead, lower to eye level, pulse back overhead (1.5 repetition protocol), lower to front, spread out to sides, and lower to hips."
    ),
    (
        "Barbell Standing Bradford Press 1.5 Protocol (115 lbs Unbroken)",
        9.7,
        "Barbell",
        "Press from collarbones over head to behind neck, press halfway up, pulse back to neck (1.5 repetition protocol), press over head to front, and cycle 6 unbroken reps."
    ),
    (
        "Cable Dual-Pulley Cross-Over Lateral Raise 1.5 Protocol",
        9.5,
        "Cable",
        "Cross low cables, raise arms laterally to 90 degrees, lower halfway to 45 degrees, pulse back to horizontal (1.5 repetition protocol) under continuous bilateral stack load."
    ),
    (
        "Smith Machine Behind-the-Neck Overhead Press 1.5 Dead-Stop Protocol",
        9.6,
        "Machine",
        "Press heavy bar from ear-level safety pins to lockout overhead, lower halfway, pulse back to lockout (1.5 repetition protocol), and lower to dead-stop on pins."
    ),
    (
        "Barbell Landmine Heavy Push Press 1.5 Protocol (Rotational Overload)",
        9.6,
        "Barbell",
        "Dip and punch heavily loaded landmine barbell overhead at 45 degrees, lower halfway, pulse back to lockout (1.5 repetition protocol), and lower under strict anterior delt control."
    ),
    (
        "Dumbbell Incline Chest-Supported Rear Delt Row 1.5 Protocol (90 lb Pairs)",
        9.6,
        "Dumbbells",
        "Row 90 lb dumbbells with 90-degree flared elbows, lower halfway, pulse back to peak posterior deltoid contraction (1.5 repetition protocol), and lower under 3-second control."
    ),
    (
        "Hyper-Advanced Multi-Grip Barbell Overhead Pressing Triathlon 1.5 Blitz",
        10.0,
        "Barbell",
        "Perform 3 reps of strict military press, 3 reps of push press, and 3 reps of behind-the-neck press unbroken at 135 lbs, each rep integrating the strict 1.5 repetition half-range pulse."
    ),
]

if __name__ == "__main__":
    print(f"Elite Home: {len(elite_home_data)}")
    print(f"Elite Gym: {len(elite_gym_data)}")
    print(f"Elite Total: {len(elite_home_data) + len(elite_gym_data)}")
    for name, score, eq, inst in elite_home_data + elite_gym_data:
        assert 9.3 <= score <= 10.0, f"Score {score} out of bounds for {name}"
        assert "1.5" in inst or "1.5" in name, f"Missing 1.5 protocol in {name}"
    print("All elite scores within 9.3 - 10.0 range and 1.5 protocol verified!")
