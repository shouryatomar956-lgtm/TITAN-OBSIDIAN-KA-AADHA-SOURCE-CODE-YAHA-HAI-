#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 12: CALISTHENICS - ELITE TIER (Total: 45 Exercises)
# 31 Home (70%) + 14 Gym (30%)
# Validated Peak Human Relative Strength, Hyper-Advanced Levers, Extreme Joint Torque
# Strict 1.5 Repetition Protocol & Hyper-Advanced Static-Active Holds Exclusively
# Scientific Score Bounds: 9.3 to 10.0
# Equipment: Bodyweight, Backpack-weighted, Resistance Bands, None
# ==============================================================================

elite_home_data = [
    # --- Hyper-Advanced Calisthenic Levers & 1.5 Protocols (Home) ---
    (
        "Hyper-Advanced Full Planche Push-Up 1.5 Repetition Protocol",
        9.9,
        "Bodyweight",
        "Hold a full straight-body planche on floor parallettes with toes pointed and body horizontal. Lower chest forward until shoulders dip below handles, press up, immediately lower halfway to parallel for a strict 1.5 repetition pulse under continuous anterior deltoid tension, and press to locked protraction."
    ),
    (
        "Full Front Lever Touch Rise 1.5 Repetition Protocol",
        9.8,
        "Bodyweight",
        "From a horizontal full front lever on doorway bar, pull straight arms down until hips contact bar, lower body halfway to 45 degrees, pulse back up to touch bar (1.5 repetition protocol) under continuous latissimus contraction, and lower back to horizontal lever."
    ),
    (
        "Strict One-Arm Chin-Up 1.5 Repetition Protocol (Right Arm)",
        10.0,
        "Bodyweight",
        "Hang from doorway bar on right arm only with left arm free. Pull chin cleanly over bar without kipping, lower body halfway until elbow reaches 90 degrees, pulse back over bar (1.5 repetition protocol) under supramaximal unilateral tendon load, and lower to dead hang."
    ),
    (
        "Strict One-Arm Chin-Up 1.5 Repetition Protocol (Left Arm)",
        10.0,
        "Bodyweight",
        "Hang from bar on left arm only. Pull vertically until chin clears bar, lower under control to 90 degrees, pulse back over bar (1.5 repetition protocol) maintaining strict core anti-rotation, and lower smoothly to full extension."
    ),
    (
        "Hyper-Advanced Manna Static Hold 1.5 Pulse Protocol",
        9.9,
        "Bodyweight",
        "Sit on floor parallettes, press downward through straight arms, elevate hips past wrists, push straight legs backward overhead beyond vertical (Manna), hold for 8 seconds, and execute a strict 1.5 repetition half-range compression pulse under continuous time-under-tension."
    ),
    (
        "Full Planche to Handstand Press 1.5 Repetition Protocol",
        10.0,
        "Bodyweight",
        "Hold full horizontal planche on parallettes, press hips and legs smoothly upward with straight arms into a vertical handstand, lower halfway to 45-degree planche angle, pulse back to handstand (1.5 repetition protocol), and lower to full planche."
    ),
    (
        "Doorway Bar Strict Weighted Muscle-Up 1.5 Protocol (25 lb Vest)",
        9.7,
        "Backpack-weighted",
        "Wearing a 25 lb weighted vest or backpack, execute a strict dead-hang muscle-up over doorway bar without kipping, perform a straight-bar dip lockout, lower halfway to bar, pulse back up (1.5 repetition protocol), and lower through negative transition."
    ),
    (
        "Full Back Lever Pull-to-Inverted 1.5 Repetition Protocol",
        9.5,
        "Bodyweight",
        "From horizontal full back lever with supinated grip, pull body upward through shoulder extension to vertical inverted hang, lower halfway back toward horizontal, pulse back up to inverted hang (1.5 repetition protocol), and lower to full back lever."
    ),
    (
        "Doorway Gymnastics Rings Maltese Press Isometric Hold (10s)",
        9.9,
        "Bodyweight",
        "On low rings, lower body into a horizontal Maltese cross with arms spread wide at waist level, holding extreme static-active tendon tension for 10 seconds, then complete 2 micro-presses utilizing the 1.5 repetition protocol."
    ),
    (
        "Freestanding Handstand 1.5 Deficit Push-Up on High Parallettes",
        9.8,
        "Bodyweight",
        "In a freestanding vertical handstand on 12-inch parallettes without wall contact, lower shoulders 3 inches below handles into deficit, press up, lower halfway, pulse back to lockout (1.5 repetition protocol), balancing purely through wrist torque."
    ),
    (
        "Full Front Lever Pull-Up 1.5 Repetition Protocol",
        9.9,
        "Bodyweight",
        "Hold rigid straight-body front lever horizontally. Row chest to touch bar, lower halfway to 4-inch gap, pulse back to touch bar (1.5 repetition protocol) maintaining completely flat back, and lower to horizontal lever."
    ),
    (
        "Hyper-Advanced Victorian Cross Floor Lever Hold 1.5 Pulse Protocol",
        10.0,
        "Bodyweight",
        "Lie on back with hands on 2-inch floor blocks beside hips. Push downward through straight arms to lift entire rigid body 2 inches off floor horizontally (Victorian cross), hold static-active tension for 10 seconds, and complete a 1.5 repetition micro-press pulse under extreme triceps tendon load."
    ),
    (
        "Weighted Pistol Squat 1.5 Protocol with 50 lb Backpack (Right Leg)",
        9.4,
        "Backpack-weighted",
        "Wear a 50 lb backpack, descend into rock-bottom pistol squat on right leg, drive halfway up to parallel, pulse back to calf touch (1.5 repetition protocol) under extreme unilateral quad load, and press to full standing extension."
    ),
    (
        "Weighted Pistol Squat 1.5 Protocol with 50 lb Backpack (Left Leg)",
        9.4,
        "Backpack-weighted",
        "Wear a 50 lb backpack, descend into deep single-leg squat on left leg, rise to parallel, pulse back to bottom depth (1.5 repetition protocol) maintaining ankle dorsiflexion, and stand upright."
    ),
    (
        "Doorway Bar Hefesto Curl-to-Support 1.5 Protocol",
        9.8,
        "Bodyweight",
        "Hang behind bar in German hang. Curl body backward using pure biceps and rear delts to pull hips over bar into backward support, lower halfway, pulse back to support (1.5 repetition protocol), and reverse under control."
    ),
    (
        "Full Dragon Flag 1.5 Repetition Protocol (Straight Body)",
        9.4,
        "Bodyweight",
        "From vertical candle position on shoulders, lower rigid straight body until heels hover 2 inches above mat, pull body halfway up to 45 degrees, pulse back to hover (1.5 repetition protocol), and pull to vertical."
    ),
    (
        "Doorway Bar Strict One-Arm Front Lever Tuck Attempt 1.5 Wave",
        9.7,
        "Bodyweight",
        "Grip bar with single arm, pull into tuck front lever, hold 3 seconds, lower 2 inches, pulse back up (1.5 repetition protocol), and lower to dead hang, building extreme unilateral rotational lat force."
    ),
    (
        "Hyper-Advanced Full Straddle Planche Push-Up 1.5 Protocol",
        9.8,
        "Bodyweight",
        "In a full straddle planche with legs locked straight, lower shoulders forward into push-up, press to top, lower halfway, pulse back to locked protraction (1.5 repetition protocol) without feet touching mat."
    ),
    (
        "Doorway Gymnastics Rings Full Front Lever Hold (Rings Turned Out)",
        9.8,
        "Bodyweight",
        "Hold horizontal full front lever on rings with rings turned outward (RTO), holding body straight for 10 seconds, then complete 2 front lever pulls with 1.5 pulse repetitions."
    ),
    (
        "Manna to Full Handstand Press 1.5 Protocol",
        10.0,
        "Bodyweight",
        "From Manna with legs compressed past vertical, press through straight arms directly into a vertical handstand, lower halfway to 45 degrees, pulse back to handstand (1.5 repetition protocol), and return to Manna."
    ),
    (
        "Weighted Push-Up 1.5 Protocol with 70 lb Backpack (Deficit)",
        9.4,
        "Backpack-weighted",
        "Wear a 70 lb backpack with hands on deficit blocks. Lower chest 2 inches below hands, press to top, lower halfway, pulse back to lockout (1.5 repetition protocol) under massive axial chest compression."
    ),
    (
        "Doorway Bar Archer Pull-Up 1.5 Repetition Protocol",
        9.5,
        "Bodyweight",
        "Pull chest to right hand with left arm locked straight, lower halfway to 90 degrees, pulse back to right hand (1.5 repetition protocol), lower to center, and repeat to left hand."
    ),
    (
        "Full Planche Hold on Floor with 10 lb Vest 1.5 Protocol",
        9.9,
        "Backpack-weighted",
        "Wearing a 10 lb weighted vest on floor, hold full horizontal planche for 8 seconds, perform 1 planche push-up with a strict 1.5 repetition pulse, and hold for 3 final seconds."
    ),
    (
        "Doorway Gymnastics Rings Pelican Curl 1.5 Protocol",
        9.7,
        "Bodyweight",
        "Lower chest through rings into extreme backward shoulder extension, curl body halfway up, pulse back down to deep stretch (1.5 repetition protocol), and curl all the way up to lockout."
    ),
    (
        "Freestanding Handstand Pirouette to 1.5 Push-Up",
        9.7,
        "Bodyweight",
        "Execute a 360-degree pirouette turn in freestanding handstand, lower head to floor, press halfway, pulse back to floor (1.5 repetition protocol), and press to overhead lockout without falling."
    ),
    (
        "Doorway Bar Strict L-Sit Muscle-Up 1.5 Protocol",
        9.8,
        "Bodyweight",
        "Maintain strict horizontal L-sit legs throughout: pull over bar into straight-bar dip, lower halfway to bar, pulse back to dip lockout (1.5 repetition protocol), and lower through negative."
    ),
    (
        "Full Front Lever to Back Lever 360 Continuous 1.5 Rotation",
        9.8,
        "Bodyweight",
        "Pull from dead hang into full front lever, rotate straight body through German hang into full back lever, perform a 1.5 repetition back lever pull, and reverse rotation."
    ),
    (
        "Doorway Bar Typewriter Pull-Up 1.5 Protocol",
        9.5,
        "Bodyweight",
        "Pull chin over bar, slide horizontally to right hand, slide halfway back to center, pulse back to right hand (1.5 repetition protocol), slide across to left hand, and repeat pulse."
    ),
    (
        "Floor Parallettes V-Sit to Full Planche Press 1.5 Protocol",
        10.0,
        "Bodyweight",
        "From high V-sit with toes at face level, swing straight body forward through arms into full horizontal planche, hold 3 seconds, perform a 1.5 repetition push-up pulse, and return to V-sit."
    ),
    (
        "Single-Arm Push-Up 1.5 Repetition Protocol (Feet Together)",
        9.5,
        "Bodyweight",
        "In single-arm push-up stance with feet together (narrow base), lower chest to floor, press halfway, pulse back to floor (1.5 repetition protocol) fighting extreme rotational torque, and press to lockout."
    ),
    (
        "Doorway Bar One-Arm Assisted Pull-Up 1.5 Protocol (Fingertip Assist)",
        9.6,
        "Bodyweight",
        "Pull chin over bar with right hand while single fingertip of left hand touches bar. Lower halfway, pulse back over bar (1.5 repetition protocol), and lower to dead hang."
    ),
]

elite_gym_data = [
    # --- Extreme Institutional Rig, High Rings & Calisthenics Stations (Gym) ---
    (
        "Hyper-Advanced Iron Cross Ring Hold 1.5 Protocol (Institutional High Rings)",
        10.0,
        "Bodyweight",
        "From straight-arm ring support on high gymnastics rings, lower body with locked straight arms horizontally outward to 90 degrees abduction (Iron Cross), hold 8 seconds, and execute a 1.5 repetition micro-abduction pulse under legendary connective tissue load."
    ),
    (
        "Gymnastics Rings Iron Cross to L-Sit Press 1.5 Repetition Protocol",
        10.0,
        "Bodyweight",
        "Hold Iron Cross on rings, pull rings into hips into straight L-sit support, lower halfway back toward Iron Cross, pulse into support (1.5 repetition protocol), and lock out with RTO."
    ),
    (
        "Calisthenics Rig Strict Bar Muscle-Up 1.5 Protocol (35 lb Weight Belt)",
        9.8,
        "Backpack-weighted",
        "With a 35 lb weight belt attached, execute a strict dead-hang bar muscle-up without kipping, dip above bar, lower halfway, pulse back to dip lockout (1.5 repetition protocol), and lower smoothly."
    ),
    (
        "Calisthenics Rig Full Front Lever 1.5 Pull-Up Protocol (Touch Bar)",
        9.9,
        "Bodyweight",
        "Hold horizontal full front lever on straight bar. Row chest to touch bar, lower halfway, pulse back to touch bar (1.5 repetition protocol) under continuous latissimus contraction, and lower to horizontal."
    ),
    (
        "Stall Bars Strict Full Human Flag 1.5 Press Protocol",
        9.8,
        "Bodyweight",
        "Suspend body horizontal to floor in full human flag on stall bars. Press body upward 15 degrees, lower halfway, pulse back upward (1.5 repetition protocol), and lower under control."
    ),
    (
        "Gymnastics High Rings Maltese Cross Static Hold 1.5 Protocol (Horizontal)",
        10.0,
        "Bodyweight",
        "Lower from ring support into a full horizontal Maltese position with arms spread wide along hips and body parallel to floor, hold static-active tension for 6 seconds, and complete a 1.5 repetition pulse micro-press."
    ),
    (
        "Parallel Bars Full Planche Push-Up 1.5 Protocol (Olympic Standard)",
        9.9,
        "Bodyweight",
        "On parallel bars, hold full horizontal planche, descend until shoulders drop below bar level, press up, lower halfway, pulse back to full extension (1.5 repetition protocol) with protracted scapulae."
    ),
    (
        "Calisthenics Rig Korean Dip 1.5 Repetition Protocol (Behind Back)",
        9.5,
        "Bodyweight",
        "Sit on straight bar with bar behind lower back. Lower hips below bar into deep backward shoulder extension dip, press up, lower halfway, pulse back to lockout (1.5 repetition protocol)."
    ),
    (
        "Gymnastics Rings Inverted Cross Static Hold 1.5 Protocol (Upside-Down Cross)",
        10.0,
        "Bodyweight",
        "Invert on rings into a vertical handstand, spread straight arms laterally outward into an inverted cross, hold stationary for 5 seconds, and execute a strict 1.5 repetition pulse under extreme shoulder torque."
    ),
    (
        "Calisthenics Rig Hefesto 1.5 Repetition Protocol on Straight Bar",
        9.9,
        "Bodyweight",
        "From German hang behind straight bar, curl body backward over bar into rear dip support, lower halfway, pulse back to support (1.5 repetition protocol), and reverse under control."
    ),
    (
        "Parallel Bars Straight-Arm Manna Press 1.5 Protocol",
        9.9,
        "Bodyweight",
        "Press from L-sit on parallel bars into full Manna with legs past vertical, lower halfway to V-sit, pulse back to Manna (1.5 repetition protocol), and lower smoothly."
    ),
    (
        "Gymnastics Rings Strict One-Arm Chin-Up 1.5 Protocol (Free Rings)",
        10.0,
        "Bodyweight",
        "Hang from single gymnastics ring, pull chin above ring without body swing, lower halfway to 90 degrees, pulse back over ring (1.5 repetition protocol), and lower to dead hang."
    ),
    (
        "Stall Bars Dragon Flag to Full Lever Rise 1.5 Protocol",
        9.6,
        "Bodyweight",
        "Grip bottom stall bar rung, lower straight body to hover above floor, pull body halfway up to 45 degrees, pulse back to hover (1.5 repetition protocol), and pull to vertical candle."
    ),
    (
        "Calisthenics Rig Victor Cross to Front Lever 1.5 Transition",
        10.0,
        "Bodyweight",
        "Transition from horizontal front lever into a backward Victorian cross below bar, hold 3 seconds, pulse through a 1.5 repetition half-range contraction, and return to front lever."
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
