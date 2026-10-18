#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 12: CALISTHENICS - ADVANCED TIER (Total: 75 Exercises)
# 53 Home (70%) + 22 Gym (30%)
# Validated High Mechanical Disadvantage, Severe Relative Strength Scaling
# Scientific Score Bounds: 8.1 to 9.2
# Equipment: Bodyweight, None, Resistance Bands
# ==============================================================================

adv_home_data = [
    # --- Advanced Pulling & Horizontal Levers (Home) ---
    (
        "Doorway Bar Advanced Tuck Front Lever Static Hold (15s)",
        8.6,
        "Bodyweight",
        "Hang from doorway bar with straight arms. Pull torso and hips horizontally parallel to floor with knees uncurled to 90 degrees (flat back), holding rigid straight-arm lat engagement for 15 seconds."
    ),
    (
        "Doorway Bar One-Leg Extended Front Lever Hold",
        8.9,
        "Bodyweight",
        "From tuck front lever, extend one leg straight out in line with torso while keeping opposite knee tucked to chest. Hold 8-10 seconds per leg, keeping hips perfectly level with shoulders."
    ),
    (
        "Doorway Bar Straddle Front Lever Static Hold",
        9.1,
        "Bodyweight",
        "Engage straight-arm scapular depression and lat retraction to elevate entire body into horizontal alignment with legs spread wide in a straddle, holding for 6-8 seconds without hip sag."
    ),
    (
        "Doorway Bar Tuck Front Lever Pulls to Horizontal (5 Reps)",
        8.7,
        "Bodyweight",
        "From vertical dead hang, pull body with locked straight arms directly into a flat-back tuck front lever, pause 1 second, and lower under control to dead hang."
    ),
    (
        "Doorway Bar Strict Bar Muscle-Up (Zero Kip / Clean Turnover)",
        9.0,
        "Bodyweight",
        "Hang from doorway pull-up bar with false grip or active overhand grip. Pull chest explosively to bar, roll wrists and shoulders forward over bar in a simultaneous turnover, and press out straight-bar dip."
    ),
    (
        "Doorway Bar Archer Pull-Up with Fully Extended Arm",
        8.6,
        "Bodyweight",
        "Pull body aggressively to right hand while sliding left arm completely straight across top of bar, lower under control to dead hang, and pull to opposite side."
    ),
    (
        "Doorway Bar Typewriter Pull-Up (Full Lateral Travel)",
        8.7,
        "Bodyweight",
        "Pull chest to bar, slide horizontally all the way until right shoulder touches right hand with left arm locked straight, slide across to left hand, return to center, and lower."
    ),
    (
        "Doorway Bar One-Arm Chin-Up Eccentric Negative (8 Seconds)",
        9.2,
        "Bodyweight",
        "Use two hands to pull chin over bar, release one hand, and lower entire body weight smoothly across 8 slow seconds on a single arm, fighting rotation with intense core brace."
    ),
    (
        "Doorway Bar One-Arm Assisted Pull-Up (Towel Hold Assist)",
        8.8,
        "Bodyweight",
        "Grip bar with right hand and hold a hanging towel with left hand at chest level for minimal assistance. Pull chin over bar, controlling 85% of body mass on right arm."
    ),
    (
        "Doorway Bar L-Sit Muscle-Up Transition Prep",
        8.9,
        "Bodyweight",
        "Hold strict L-sit with legs horizontal, pull chest to bar with explosive lat acceleration, and transition shoulders over bar while maintaining parallel legs."
    ),

    # --- Advanced Gymnastics Rings & Straight-Arm Levers (Home) ---
    (
        "Doorway Gymnastics Rings Full Back Lever Static Hold (Supinated)",
        9.0,
        "Bodyweight",
        "Invert on rings, pass feet through into German hang, and pull up into horizontal body line facing down with supinated grip, holding straight arms and locked core for 10 seconds."
    ),
    (
        "Doorway Gymnastics Rings Straddle Back Lever Hold",
        8.8,
        "Bodyweight",
        "Lower from inverted hang into horizontal back lever with legs straddled wide, maintaining depressed and protracted scapulae to condition distal biceps tendons."
    ),
    (
        "Doorway Gymnastics Rings Strict Ring Muscle-Up (False Grip)",
        9.1,
        "Bodyweight",
        "Hang from rings in deep false grip. Execute a smooth, deliberate pull to sternum, rotate elbows around rings into deep ring dip without kipping, and press to lockout with RTO."
    ),
    (
        "Doorway Gymnastics Rings RTO Dip (90-Degree Turn Out at Top)",
        8.7,
        "Bodyweight",
        "Descend into deep ring dip until shoulders touch rings, press up to straight-arm lockout, and forcefully rotate rings outward 90 degrees (RTO), holding peak stability for 2 seconds."
    ),
    (
        "Doorway Gymnastics Rings Bulgarian Ring Dip (Wide Flare)",
        8.6,
        "Bodyweight",
        "Lower into ring dip while spreading rings wide laterally at 90 degrees, and drive through chest and triceps to bring rings back into hips at lockout."
    ),
    (
        "Doorway Gymnastics Rings Pelican Curl / Push-Up (Deep Biceps Stretch)",
        9.1,
        "Bodyweight",
        "Set rings at hip height, lean forward into push-up, allow elbows to travel backward behind torso into extreme shoulder extension, and curl body back up using biceps tendons."
    ),
    (
        "Doorway Gymnastics Rings Advanced Tuck Front Lever Hold",
        8.7,
        "Bodyweight",
        "Hold horizontal front lever on rings with flat back and knees opened to 90 degrees, actively stabilizing against ring rotation with straight locked elbows."
    ),
    (
        "Doorway Gymnastics Rings Front Lever Pull to Inverted Hang",
        9.0,
        "Bodyweight",
        "From dead hang on rings, pull with locked straight arms through horizontal front lever all the way into vertical inverted hang in one continuous arc."
    ),

    # --- Planche, Parallettes & Advanced Pushing (Home) ---
    (
        "Floor Parallettes Advanced Tuck Planche Static Hold (15s)",
        8.9,
        "Bodyweight",
        "Support straight arms on parallettes, lean shoulders forward until hands align with naval, open hips to 90 degrees with flat back, and hold body suspended for 15 seconds."
    ),
    (
        "Floor Parallettes Straddle Planche Lean with Single-Foot Hover",
        9.0,
        "Bodyweight",
        "Grip parallettes, lean forward aggressively into straddle planche position, hovering one foot completely off mat while opposite toe barely skims floor."
    ),
    (
        "Floor Parallettes Tuck Planche Push-Up (Full 90-Degree Dip)",
        9.1,
        "Bodyweight",
        "In tuck planche with straight arms, bend elbows to 90 degrees lowering shoulders forward, and press back up to full scapular protraction without feet touching floor."
    ),
    (
        "Household Floor Pseudo Planche Push-Up (Hands at Hips, 45-Degree Lean)",
        8.5,
        "Bodyweight",
        "Set hands beside hips with fingers pointing backward. Lean shoulders 6 inches ahead of wrists, lower chest to floor, and press up maintaining protracted dome back."
    ),
    (
        "Floor Parallettes L-Sit to Tuck Planche Press Flow",
        8.8,
        "Bodyweight",
        "Hold L-sit on parallettes, swing legs backward smoothly through straight arms, lean shoulders forward, and press into tuck planche without touching mat."
    ),
    (
        "Floor Parallettes V-Sit Compression Hold (45-Degree Leg Angle)",
        8.8,
        "Bodyweight",
        "Support on parallettes, elevate straight legs upward past horizontal toward chest at 45 degrees, contracting hip flexors and lower abdominals for 10-15 seconds."
    ),
    (
        "Household Floor Strict Dragon Flag (Full Straight-Body Lowering)",
        8.9,
        "Bodyweight",
        "Anchor hands behind head to solid furniture. Raise entire body into a vertical candle on upper shoulders, and lower straight rigid body to 2 inches off floor, holding 2 seconds."
    ),
    (
        "Floor Dragon Flag Flutter Kicks (Hovering 6 Inches)",
        8.7,
        "Bodyweight",
        "Hold straight-body dragon flag hovering 6 inches above mat, performing small rapid up-and-down flutter kicks for 15 seconds under extreme core shear load."
    ),

    # --- Advanced Handstands & Gymnastic Inversions (Home) ---
    (
        "Freestanding Handstand Push-Up (Zero Wall Assistance)",
        9.2,
        "Bodyweight",
        "In a freestanding vertical handstand away from walls, lower crown of head forward to touch floor in a tripod shape, press back to full lockout, maintaining balance via wrist micro-adjustments."
    ),
    (
        "Deficit Handstand Push-Up on Household Parallettes (Chest to Handles)",
        9.2,
        "Bodyweight",
        "Grip parallettes against wall. Lower shoulders below handle level into deep deficit, pressing forcefully to straight-arm lockout with scapulae elevated."
    ),
    (
        "Freestanding Handstand 60-Second Static Hold (Hollow Alignment)",
        8.6,
        "Bodyweight",
        "Kick into freestanding handstand, lock shoulders, tuck pelvis, point toes, and hold stationary balance for 60 continuous seconds without taking walking steps."
    ),
    (
        "Freestanding Handstand Pirouette 360-Degree Turn",
        8.8,
        "Bodyweight",
        "In freestanding handstand, shift weight between hands and take four 90-degree steps in a circle to complete a full 360-degree rotation on palms."
    ),
    (
        "Wall-Facing Handstand Single-Arm Touch and Hold (5s per Arm)",
        8.9,
        "Bodyweight",
        "In wall-facing vertical handstand, shift weight entirely onto left arm, lift right arm to touch hip, hold single-arm balance for 5 seconds, and switch arms."
    ),
    (
        "Press to Handstand from Straddle Stand (Straight Arms)",
        9.1,
        "Bodyweight",
        "Stand with legs in wide straddle, place hands flat on floor, shift weight into shoulders, compress core, and lift straight legs smoothly upward into vertical handstand."
    ),

    # --- Lower Body Advanced Calisthenics (Home) ---
    (
        "Strict Unassisted Dragon Squat (Single-Leg Wrap-Around)",
        8.8,
        "Bodyweight",
        "Stand on right leg, thread left leg behind right ankle and outward to side, descending into full single-leg pistol squat with knee crossing midline, pressing up cleanly."
    ),
    (
        "Strict Unassisted Dragon Squat (Left Lead)",
        8.8,
        "Bodyweight",
        "Stand on left leg, thread right leg behind and across laterally, descend into full rock-bottom single-leg squat, and drive through midfoot to stand."
    ),
    (
        "Nordic Hamstring Curl Unassisted Full Repetition (Touch and Rise)",
        9.2,
        "Bodyweight",
        "Anchor heels under heavy sofa. From upright kneeling with straight hips, lower chest to floor under pure eccentric hamstring control, lightly tap nose, and pull body back up."
    ),
    (
        "Unassisted Full Sissy Squat to Floor Knees-Touch",
        8.5,
        "Bodyweight",
        "Rise onto toes, push knees forward until they touch floor smoothly while torso leans back at 45 degrees, and drive through balls of feet to stand."
    ),
    (
        "Pistol Squat with 3-Second Isometric Bottom Pause (Left Leg)",
        8.4,
        "Bodyweight",
        "Descend into full pistol squat on left leg, pause for 3 full seconds at rock-bottom without relaxing hip tension, and explode to standing."
    ),
    (
        "Pistol Squat with 3-Second Isometric Bottom Pause (Right Leg)",
        8.4,
        "Bodyweight",
        "Descend into full pistol squat on right leg, hold rock-bottom pause for 3 seconds, and drive up to standing, demonstrating total unilateral control."
    ),

    # --- Additional Advanced Calisthenic Progressions (Home) ---
    (
        "Doorway Bar Hanging Windshield Wipers (Toes Pointed to Ceiling)",
        8.7,
        "Bodyweight",
        "Invert on doorway bar with legs locked straight. Rotate legs side-to-side in a full 180-degree arc, grazing bar ends while maintaining level hips."
    ),
    (
        "Doorway Bar Tuck Front Lever to Tuck Back Lever Rotations (360)",
        8.9,
        "Bodyweight",
        "From tuck front lever, rotate straight body through German hang into tuck back lever, and reverse rotation smoothly without touching floor."
    ),
    (
        "Floor Parallettes Straddle Planche Lean to Push-Up",
        9.0,
        "Bodyweight",
        "Grip parallettes, lean forward into straddle planche angle, perform a push-up with forward-angled forearms, and press to locked protraction."
    ),
    (
        "Doorway Bar Chest-to-Bar Pull-Up with 3-Second Top Squeeze",
        8.5,
        "Bodyweight",
        "Pull sternum firmly against doorway bar, hold peak latissimus and rhomboid contraction for 3 full seconds without dropping chest, and lower under 3-second tempo."
    ),
    (
        "Gymnastics Rings Ring-Turn-Out Dip (RTO 45-Degree Bottom to Top)",
        8.9,
        "Bodyweight",
        "Maintain rings turned outward 45 degrees throughout both the descent and ascent of the dip, preventing rings from collapsing inward against biceps."
    ),
    (
        "Doorway Bar Close-Grip False Grip Pull-Up to Sternum",
        8.7,
        "Bodyweight",
        "Curl wrists over bar in false grip with hands 4 inches apart. Pull chest to touch bar with high wrists, conditioning wrist flexors for slow muscle-ups."
    ),
    (
        "Floor Parallettes V-Sit to Tuck Planche Compression Flow",
        9.1,
        "Bodyweight",
        "Hold V-sit with legs elevated to 45 degrees, fold knees to chest, swing through arms into tuck planche, and return to V-sit in unbroken control."
    ),
    (
        "Household Doorframe Human Flag Tuck Hold (Top Pull / Bottom Push)",
        8.9,
        "Bodyweight",
        "Grip vertical doorframe with top hand pulling and bottom hand pushing into frame. Lift tucked body sideways horizontal to floor, holding for 6-8 seconds."
    ),
    (
        "Doorway Bar Archer Chin-Up (Supinated Hand Lead)",
        8.8,
        "Bodyweight",
        "Pull body toward right hand with supinated grip while left arm extends straight along bar with pronated palm, alternating sides."
    ),
    (
        "Gymnastics Rings Inverted Hang to One-Arm Support Release",
        8.9,
        "Bodyweight",
        "Hold inverted hang on rings, release right hand to touch thigh while balancing body weight completely on left ring, hold 3 seconds, and switch."
    ),
    (
        "Floor Parallettes L-Sit to Handstand Press Attempt",
        9.2,
        "Bodyweight",
        "From L-sit on parallettes, tuck knees, shift shoulders forward into planched angle, and press hips and legs vertically into a handstand without kipping."
    ),
    (
        "Doorway Bar Slow Muscle-Up Negative (10-Second Transition)",
        9.0,
        "Bodyweight",
        "Start above bar in dip lockout. Lower chest to bar, lean back slowly, roll wrists over bar into top pull-up, and lower to dead hang over 10 seconds."
    ),
    (
        "Gymnastics Rings Pelican Push-Up Negative on Floor",
        8.9,
        "Bodyweight",
        "Hold rings at floor height, lower chest into extreme backward shoulder extension across 5 seconds, drop knees to reset, and build tendon resilience."
    ),
    (
        "Floor Dragon Flag Single-Leg Extension Waves",
        8.8,
        "Bodyweight",
        "Hold straight dragon flag hovering 12 inches above floor, alternately tuck and extend one knee at a time without breaking straight torso alignment."
    ),
    (
        "Doorway Bar Wide L-Sit Pull-Up to Collarbones",
        8.8,
        "Bodyweight",
        "Take wide overhand grip on bar with legs locked horizontally in L-sit. Pull collarbones to bar, holding L-sit rigid throughout full range of motion."
    ),
]

adv_gym_data = [
    # --- Institutional Calisthenics Rig, Wall Bars & High Rings (Gym) ---
    (
        "Calisthenics Rig Strict Bar Muscle-Up (Clean No-Dip Transition)",
        9.1,
        "Bodyweight",
        "From absolute dead hang on straight bar, pull explosively with hollow body, transition over bar simultaneously with both elbows, and lock out without dipping below 90 degrees."
    ),
    (
        "Gymnastics High Rings Strict Ring Muscle-Up (Zero Swing)",
        9.2,
        "Bodyweight",
        "Hang from rings in false grip with arms straight. Pull rings to chest, roll wrists and shoulders forward between rings, and press to straight-arm RTO support."
    ),
    (
        "Calisthenics Rig Full Front Lever Static Hold (Straight Body, 10s)",
        9.2,
        "Bodyweight",
        "From dead hang, pull straight arms down to elevate body into perfectly horizontal line from ankles to shoulders, holding rigid glutes and lats for 10 seconds."
    ),
    (
        "Calisthenics Rig Full Back Lever Static Hold (Supinated Grip)",
        9.0,
        "Bodyweight",
        "Drop from inverted hang into horizontal back lever with palms facing floor, holding body straight with pointed toes and protracted scapulae for 10 seconds."
    ),
    (
        "Stall Bars Full Human Flag Static Hold (Horizontal)",
        9.2,
        "Bodyweight",
        "Grip two rungs of stall bars. Push bottom arm straight and pull top arm to suspend entire body horizontal to floor like a rigid flag for 5-8 seconds."
    ),
    (
        "Stall Bars Straddle Human Flag Hold (Adductor Spread)",
        9.0,
        "Bodyweight",
        "Suspend body sideways from stall bars with legs spread wide in straddle to shorten lever arm, holding horizontal alignment for 8-10 seconds per side."
    ),
    (
        "Calisthenics Rig Front Lever Touch-to-Bar Pulls",
        9.2,
        "Bodyweight",
        "From straight-body horizontal front lever, pull with straight arms until lower thighs or hips touch pull-up bar, lowering back to horizontal."
    ),
    (
        "Gymnastics Rings Iron Cross Preparation Pulls (45-Degree Abduction)",
        9.1,
        "Bodyweight",
        "In ring support, lower body with straight arms abducting outward to 45 degrees, holding for 3 seconds before pulling rings back into hips."
    ),
    (
        "Calisthenics Rig One-Arm Dead Hang to Active Shrug (Right Arm)",
        8.9,
        "Bodyweight",
        "Hang from bar on right arm only. Transition between passive hang and active lat/scapular shrug, holding top active position for 5 seconds."
    ),
    (
        "Calisthenics Rig One-Arm Dead Hang to Active Shrug (Left Arm)",
        8.9,
        "Bodyweight",
        "Hang on left arm only, depress scapula to lift body 2 inches without bending elbow, holding for 5 seconds to build unilateral lat force."
    ),
    (
        "Parallel Bars Straight-Body Planche Lean (45-Degree Angle)",
        8.9,
        "Bodyweight",
        "Support on parallel bars with feet resting on elevated box at shoulder height. Lean shoulders 8 inches forward into severe planched angle for 20 seconds."
    ),
    (
        "Parallel Bars Straddle Planche Attempt (Toes Off Box)",
        9.1,
        "Bodyweight",
        "Lean shoulders forward on parallel bars with legs straddled wide, peel toes off elevated box, and balance in straddle planche for 3-5 seconds."
    ),
    (
        "Stall Bars Strict Hanging Dragon Flag to Top Rung",
        9.0,
        "Bodyweight",
        "Hang from stall bars, curl pelvis and straight legs upward until body is vertical against rungs, and lower straight body horizontal to floor."
    ),
    (
        "Calisthenics Rig Archer Muscle-Up on Straight Bar",
        9.2,
        "Bodyweight",
        "Pull over bar transitioning onto right arm while extending left arm straight along bar, press to lockout, and reverse under control."
    ),
    (
        "Gymnastics Rings Bulgarian Ring Dip to L-Sit Flow",
        8.9,
        "Bodyweight",
        "Perform deep Bulgarian ring dip with flared rings, press to lockout, kick legs immediately into straight L-sit, hold 3 seconds, and cycle."
    ),
    (
        "Parallel Bars V-Sit High Compression Hold (60-Degree Angle)",
        9.0,
        "Bodyweight",
        "Press down on parallel bars and elevate straight legs upward toward face at a 60-degree angle, holding feet above shoulder height for 10 seconds."
    ),
    (
        "Calisthenics Rig Typewriter Pull-Up with 2-Second Lockouts",
        8.8,
        "Bodyweight",
        "Pull chin over bar, slide horizontally to right hand, hold 2 seconds with left arm straight, slide across to left hand, hold 2 seconds, and lower."
    ),
    (
        "Gymnastics Rings Back Lever Pull to Inverted Hang",
        9.1,
        "Bodyweight",
        "From horizontal back lever, pull with straight arms through shoulder extension to lift body into vertical inverted hang without bending knees."
    ),
    (
        "Stall Bars Human Flag Raise and Lower Repetitions",
        9.2,
        "Bodyweight",
        "Grip stall bars, kick into vertical flag, lower body to horizontal flag under control, and pull back to vertical for 3 strict reps."
    ),
    (
        "Parallel Bars Handstand Press from L-Sit (Straight Arm / Bent Hip)",
        9.2,
        "Bodyweight",
        "From L-sit on parallel bars, lift hips with straight arms, press into vertical handstand, and lower back through L-sit without touching bars."
    ),
    (
        "Calisthenics Rig Behind-the-Neck Muscle-Up Transition",
        9.1,
        "Bodyweight",
        "Pull over bar bringing bar behind head onto traps, transition shoulders forward, and press into straight-bar rear dip lockout."
    ),
    (
        "Gymnastics Rings Pelican Push-Up (Full 90-Degree Biceps Extension)",
        9.0,
        "Bodyweight",
        "Lower chest through rings until shoulders are in maximal backward extension with elbows behind back, pressing back up under pure biceps tendon drive."
    ),
]

if __name__ == "__main__":
    print(f"Advanced Home: {len(adv_home_data)}")
    print(f"Advanced Gym: {len(adv_gym_data)}")
    print(f"Advanced Total: {len(adv_home_data) + len(adv_gym_data)}")
    for name, score, eq, inst in adv_home_data + adv_gym_data:
        assert 8.1 <= score <= 9.2, f"Score {score} out of bounds for {name}"
        assert "1.5" not in inst and "1.5" not in name, f"1.5 protocol found in {name}"
    print("All advanced scores within 8.1 - 9.2 range and no 1.5 protocol!")
