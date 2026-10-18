#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 6: SHOULDER - BEGINNER TIER (Total: 88 Exercises)
# 62 Home (70%) + 26 Gym (30%)
# Validated Scapular Mobility, Foundational Vertical Pushing, Rotator Cuff Activation
# Scientific Score Bounds: 4.0 to 6.0
# Equipment: Bodyweight, None, Resistance Bands, Backpack-weighted, Dumbbells, Cable, Machine
# ==============================================================================

beg_home_data = [
    # --- Wall-Supported & Incline Vertical Pushing Mechanics (Home) ---
    (
        "Standing Wall-Supported Incline Scapular Push-Up",
        4.5,
        "Bodyweight",
        "Stand facing a wall at arm's length with hands placed flat at shoulder height. Keeping elbows extended, protract and retract your scapulae smoothly to activate serratus anterior and build foundational scapulothoracic rhythm without axial spinal compression."
    ),
    (
        "Wall-Supported Overhead Arm Slide with Foam Roll",
        4.6,
        "Bodyweight",
        "Place forearms against a wall with pinky sides touching surface. Slide forearms upward in a slight 'V' shape, actively reaching overhead and rotating scapulae upward before returning under controlled eccentric tempo."
    ),
    (
        "Standing Incline Wall Pike Push-Up",
        5.1,
        "Bodyweight",
        "Place hands shoulder-width on a wall, step feet back into a 45-degree angle, and hinge at the hips. Lower your forehead toward the wall between your hands and press through your palms to recruit the anterior deltoids safely."
    ),
    (
        "Kitchen Counter Incline Pike Shoulder Press",
        5.3,
        "Bodyweight",
        "Grip the edge of a sturdy kitchen counter, hinge at hips to form an inverted-V torso angle, and lower crown of head toward edge. Press upward through shoulders, maintaining neutral cervical spine to build vertical pressing strength."
    ),
    (
        "Kneeling Floor Pike Push-Up with Elevated Hands",
        5.2,
        "Bodyweight",
        "Place hands on yoga blocks or low couch edge while kneeling with hips high. Lower head forward of hands in a tripod pattern, pressing back up through anterior deltoid and triceps."
    ),
    (
        "Standing Wall Overhead Y-Raise with Thumb Leads",
        4.4,
        "Bodyweight",
        "Stand with heels, glutes, upper back, and head against a wall. Raise arms diagonally overhead into a 'Y' formation with thumbs pointing backward, squeezing lower trapezius and rear delts."
    ),
    (
        "Prone Floor Scapular I-T-Y-W Arm Raises",
        4.8,
        "Bodyweight",
        "Lie face down on a mat with forehead resting on a folded towel. Alternately lift straight arms in I, T, Y, and W formations with thumbs pointing upward, targeting lower traps and posterior deltoids."
    ),
    (
        "Prone Floor Cobra Shoulder Retraction",
        4.7,
        "Bodyweight",
        "Lie prone with arms by sides, palms facing floor. Rotate thumbs outward and lift chest slightly off mat while squeezing shoulder blades together, strengthening infraspinatus, teres minor, and rhomboids."
    ),
    (
        "Standing Wall Clock Scapular Reaches",
        4.3,
        "Bodyweight",
        "Stand facing wall with one palm centered on surface. Slide palm smoothly to 12, 3, 6, and 9 o'clock positions, maintaining active scapular protraction to challenge multi-directional rotator cuff stability."
    ),
    (
        "Quadruped Scapular Push-Up on Hands and Knees",
        4.7,
        "Bodyweight",
        "In a tabletop position on hands and knees, keep elbows straight while retracting shoulder blades together, then actively push floor away into full protraction to condition serratus anterior."
    ),

    # --- Elastic Resistance Band Delt Isolation & Rotator Cuff Activation (Home) ---
    (
        "Standing Resistance Band Pull-Apart to Sternum",
        5.4,
        "Resistance Bands",
        "Hold a light resistance band at shoulder width with straight arms. Pull hands horizontally apart until band contacts upper chest, squeezing rear deltoids and mid-trapezius under strict 2-second eccentric return."
    ),
    (
        "Resistance Band Overhead Pull-Apart in Scapular Plane",
        5.3,
        "Resistance Bands",
        "Hold band overhead with palms forward. Pull hands outward and downward into a 'Y' configuration behind head, activating posterior deltoids, rhomboids, and lower traps."
    ),
    (
        "Standing Resistance Band Front Raise in Scapular Plane",
        5.2,
        "Resistance Bands",
        "Anchor band under one foot and hold handles with thumbs up. Raise arms forward at a 30-degree angle from the sagittal plane (scaption) to shoulder height, minimizing subacromial impingement risk."
    ),
    (
        "Standing Resistance Band Lateral Raise (Neutral Grip)",
        5.5,
        "Resistance Bands",
        "Stand on center of band, hold handles at sides with palms facing inward, and raise arms to parallel with floor leading with elbows. Emphasize a 3-second lowering tempo to isolate lateral deltoid fibers."
    ),
    (
        "Resistance Band Face Pull with External Rotation",
        5.7,
        "Resistance Bands",
        "Anchor band at eye level. Pull band toward bridge of nose with high elbows, rotating wrists backward at the apex to simultaneously recruit posterior deltoid, infraspinatus, and teres minor."
    ),
    (
        "Standing Resistance Band External Shoulder Rotation (Elbow Tucked)",
        5.6,
        "Resistance Bands",
        "Anchor band at elbow height. Place a rolled towel between elbow and ribs, keep elbow bent 90 degrees, and rotate forearm outward away from abdomen to isolate infraspinatus and teres minor."
    ),
    (
        "Standing Resistance Band Internal Shoulder Rotation (Elbow Tucked)",
        5.3,
        "Resistance Bands",
        "Anchor band at waist height, grasp handle with elbow bent 90 degrees, and pull forearm inward across abdomen to condition subscapularis under controlled elastic resistance."
    ),
    (
        "Seated Resistance Band Upright Row to Chest",
        5.1,
        "Resistance Bands",
        "Sit on floor with legs extended, loop band around feet, and pull handles toward collarbones with elbows flared outward and higher than wrists, engaging lateral and rear deltoids."
    ),
    (
        "Resistance Band W-External Rotation Pulse",
        5.0,
        "Resistance Bands",
        "Hold a mini-band between wrists with elbows bent at 90 degrees tucked to sides. Spread wrists apart outward against elastic resistance in small, controlled pulses to activate external rotators."
    ),
    (
        "Standing Resistance Band Overhead Press (Bilateral)",
        5.6,
        "Resistance Bands",
        "Stand on center of band with feet hip-width, hold handles at collarbones, and press straight overhead until elbows lock out beside ears, lowering under slow eccentric control."
    ),
    (
        "Single-Arm Resistance Band Overhead Shoulder Press",
        5.4,
        "Resistance Bands",
        "Anchor band under same-side foot, rack handle at shoulder, and press overhead while bracing core against lateral flexion, training anterior deltoids and unilateral stability."
    ),
    (
        "Resistance Band Diagonal Archer Pull-Apart",
        5.5,
        "Resistance Bands",
        "Hold band with arms extended. Anchor lead hand forward while drawing trail hand backward like drawing a bowstring, engaging the posterior deltoid and scapular retractors."
    ),
    (
        "Kneeling Resistance Band Overhead Shrug",
        4.9,
        "Resistance Bands",
        "Kneel on center of band, press handles overhead, and elevate shoulder blades toward ears against resistance, building upper trapezius and upward rotation mechanics."
    ),
    (
        "Resistance Band Reverse Fly in Bent-Over Stance",
        5.6,
        "Resistance Bands",
        "Stand on band, hinge forward at hips with flat back, and raise arms outward laterally with slightly bent elbows to directly stimulate the posterior deltoid head."
    ),
    (
        "Standing Resistance Band Scapular Retraction Row",
        5.0,
        "Resistance Bands",
        "Anchor band at chest height, grip handles, and initiate pull strictly by pinching shoulder blades together with straight arms before bending elbows slightly."
    ),

    # --- Household Backpack & Dumbbell-Free Shoulder Mechanics (Home) ---
    (
        "Light Backpack Standing Overhead Strict Press",
        5.5,
        "Backpack-weighted",
        "Hold a 10 lb loaded backpack by side edges at collarbones. Brace glutes and abs, press pack vertically until arms are fully locked overhead, and lower under 3-second tempo."
    ),
    (
        "Light Backpack Seated Strict Military Press",
        5.4,
        "Backpack-weighted",
        "Sit tall on a sturdy upright chair with feet flat. Press a light backpack smoothly overhead from chest level, eliminating lower-body momentum to isolate anterior deltoids."
    ),
    (
        "Light Backpack Two-Handed Front Scaption Raise",
        5.2,
        "Backpack-weighted",
        "Grip top and bottom handles of a light backpack. With straight arms and soft knees, raise pack to eye level at a 30-degree forward angle, controlling descent."
    ),
    (
        "Light Backpack Bent-Over Rear Delt Row",
        5.3,
        "Backpack-weighted",
        "Hinge forward 45 degrees with flat spine. Pull backpack toward upper chest with elbows flared wide at 90 degrees to load posterior deltoids and rhomboids."
    ),
    (
        "Light Backpack Single-Arm Upright Row to Sternum",
        5.1,
        "Backpack-weighted",
        "Hold backpack top handle in one hand at thighs. Pull elbow upward and outward toward ceiling until hand reaches mid-chest level, lowering smoothly."
    ),
    (
        "Backpack Halo Rotations around Head",
        5.3,
        "Backpack-weighted",
        "Hold a light backpack upside down at chest. Orbit pack around head in a tight circle clockwise then counter-clockwise, promoting shoulder girdle mobility and stability."
    ),
    (
        "Light Backpack Kneeling Overhead Press",
        5.4,
        "Backpack-weighted",
        "Kneel tall on both knees to eliminate hip sway. Press backpack overhead with neutral spine and engaged core, building clean vertical pressing mechanics."
    ),
    (
        "Standing Water Bottle Lateral Raise (Scapular Plane)",
        4.8,
        "None",
        "Hold two 1-liter water bottles at sides. Raise arms in scapular plane slightly forward of torso to shoulder height with pinkies slightly higher than thumbs."
    ),
    (
        "Water Bottle Prone Rear Delt Fly on Bed Edge",
        4.9,
        "None",
        "Lie chest-down across the edge of a bed or bench holding water bottles. Raise arms laterally parallel to floor, squeezing rear deltoids for 2 seconds at peak contraction."
    ),
    (
        "Water Bottle Front Raise with Pronated Grip",
        4.7,
        "None",
        "Hold water bottles in front of thighs with palms facing downward. Raise bottles smoothly to eye level, pausing briefly before lowering under control."
    ),

    # --- Structural Wall, Floor & Active Mobility Holds (Home) ---
    (
        "Wall-Facing Isometric Handstand Walk-Up Hold (30-Degree)",
        5.6,
        "Bodyweight",
        "Step feet 2-3 paces up a wall into a shallow incline plank. Push the floor away firmly through hands, holding active shoulder protraction for 15-20 seconds."
    ),
    (
        "Bear Plank Shoulder Taps with Stationary Hips",
        5.3,
        "Bodyweight",
        "Hold quadruped position with knees hovering 2 inches off mat. Tap opposite shoulder with hand in alternating cycles without rotating hips, building isometric shoulder stability."
    ),
    (
        "Prone Floor Snow Angel Arm Sweeps",
        4.6,
        "Bodyweight",
        "Lie prone on floor with arms extended overhead. Keeping arms hovering 1 inch off ground, sweep hands down to touch hips and back overhead in continuous fluid arcs."
    ),
    (
        "Side-Lying External Rotation with Towel Roll",
        4.9,
        "Bodyweight",
        "Lie on side with head supported, top elbow bent 90 degrees against a folded towel at ribs. Rotate top forearm upward toward ceiling against gravity to condition infraspinatus."
    ),
    (
        "Standing Doorframe Pectoral and Anterior Capsule Stretch",
        4.1,
        "None",
        "Place forearm against doorframe at 90 degrees and step gently forward, opening anterior shoulder capsule to restore healthy scapulohumeral mechanics."
    ),
    (
        "Seated Active Scapular Depression and Elevation Shrugs",
        4.2,
        "Bodyweight",
        "Sit upright on chair with arms dangling at sides. Shrug shoulders up to ears for 2 seconds, then actively depress scapulae downward away from ears for 2 seconds."
    ),
    (
        "Standing Arm Circles with Forward Scapular Lead",
        4.0,
        "Bodyweight",
        "Extend arms horizontally to sides. Perform small 6-inch circular motions forward for 30 seconds, then reverse backward to warm up deltoid heads and rotator cuff."
    ),
    (
        "Prone Floor Swimmer Hovers with Hand Behind Head",
        4.7,
        "Bodyweight",
        "Lie prone, place hands behind head, extend arms out wide, rotate internally to clasp hands behind lower back, and reverse smoothly without letting hands touch floor."
    ),
    (
        "Wall-Supported Overhead Isometric Press Against Wall",
        4.5,
        "Bodyweight",
        "Stand facing wall with arms overhead and palms flat against surface. Press hands firmly forward into wall for 10-second isometric contractions to recruit serratus and anterior delts."
    ),
    (
        "Kneeling Downward Dog to Plank Shoulder Transition",
        4.9,
        "Bodyweight",
        "Transition smoothly from a high plank to a downward dog pose, driving chest toward thighs to open thoracic spine and activate shoulder stabilizers."
    ),
    (
        "Standing Elastic Band Cuban Press Rotation",
        5.7,
        "Resistance Bands",
        "Stand on band, upright row to chest height with elbows wide, rotate forearms upward 90 degrees, press overhead, reverse motion, and return smoothly."
    ),
    (
        "Wall-Supported Back-Facing Overhead Slider (Wall Angel)",
        4.5,
        "Bodyweight",
        "Stand with head, upper back, elbows, and wrists pressed flat against wall. Slide arms up and down slowly while keeping all contact points glued to wall surface."
    ),
    (
        "Prone Head-Supported W-to-Y Arm Extension",
        4.7,
        "Bodyweight",
        "Lie face down with forehead on hands. Form a 'W' with arms, lift elbows and wrists off mat, extend forward into a 'Y', and return to 'W' under continuous rear-delt tension."
    ),
    (
        "Standing Resistance Band Shrug with Upward Protraction",
        4.9,
        "Resistance Bands",
        "Stand on band holding handles at sides. Shrug shoulders upward toward ears while rolling slightly backward to strengthen upper trapezius and levator scapulae."
    ),
    (
        "Side-Plank Knee-Down Isometric Shoulder Hold",
        5.2,
        "Bodyweight",
        "Support body on forearm and knees in a modified side plank. Drive elbow into floor and keep torso in a straight line, training shoulder girdle stability."
    ),
    (
        "Standing Band-Resisted Scapular Clock Pulses",
        5.1,
        "Resistance Bands",
        "Place a mini-band around wrists with forearms parallel against wall. Pulse hands outward against band resistance while sliding arms up and down wall surface."
    ),
    (
        "Backpack Front-Loaded Isometric Hug Hold",
        5.0,
        "Backpack-weighted",
        "Hug a 15 lb backpack firmly against chest with arms wrapped around pack for 30-45 seconds, developing isometric anterior shoulder and postural endurance."
    ),
    (
        "Prone T-Raise with Thumbs Up on Yoga Mat",
        4.8,
        "Bodyweight",
        "Lie prone with arms extended straight out to sides forming a 'T'. With thumbs pointing to ceiling, squeeze shoulder blades together to lift arms 3 inches off mat."
    ),
    (
        "Standing Wall-Pushed Isometric Lateral Abduction Hold",
        4.4,
        "Bodyweight",
        "Stand sideways next to wall, place back of forearm flat against surface at shoulder height, and push outward into wall for 10-second isometric deltoid contractions."
    ),
    (
        "Resistance Band High-To-Low Diagonal Chop",
        5.3,
        "Resistance Bands",
        "Anchor band high, pull diagonally across body toward opposite hip with straight arms, controlling the eccentric return to stimulate shoulder stabilizers."
    ),
    (
        "Kneeling Push-Up to Pike Push-Up Transition",
        5.2,
        "Bodyweight",
        "Perform a modified push-up on knees, walk hands back slightly, pike hips in air, and perform a shallow pike push-up to shift load to anterior deltoids."
    ),
    (
        "Resistance Band Low-To-High Diagonal Lift (Scaption)",
        5.4,
        "Resistance Bands",
        "Anchor band under opposite foot, draw band diagonally across chest upward to overhead lockout, engaging anterior delt, serratus, and core."
    ),
    (
        "Standing Resisted Band Cross-Body Shoulder Abduction",
        5.2,
        "Resistance Bands",
        "Anchor band at waist on left side, grip with right hand across body, and raise arm diagonally up and out to the right, targeting middle and rear deltoid."
    ),
    (
        "Prone Scapular Clock Tap on Yoga Mat",
        4.6,
        "Bodyweight",
        "Lie prone with straight arms hovering above mat. Tap fingers to 12 o'clock, 2 o'clock, and 3 o'clock positions in smooth, unbroken cycles."
    ),
    (
        "Standing Door-Frame Supported Isometric Overhead Press",
        4.3,
        "Bodyweight",
        "Stand under top of doorframe, place hands on underside of top frame, and press upward against immovable frame for 10 seconds of max safe voluntary activation."
    ),
    (
        "Light Backpack Suitcase Carry Scapular Stabilizer Walk",
        5.1,
        "Backpack-weighted",
        "Grip backpack in one hand at side, walk with perfectly level shoulders and neutral spine, resisting lateral tilt to train dynamic rotator cuff stabilization."
    ),
    (
        "Floor Mat Crab Reach Scapular Extension Flow",
        5.3,
        "Bodyweight",
        "Sit on mat with hands behind hips, lift glutes, and reach one arm diagonally over opposite shoulder while stabilizing through supporting shoulder joint."
    ),
]

beg_gym_data = [
    # --- Gym Free-Weight & Machine Foundational Vertical Pushing (Gym) ---
    (
        "Seated Dumbbell Shoulder Press (Neutral Grip)",
        5.6,
        "Dumbbells",
        "Sit on an upright bench with dumbbells at shoulders, palms facing inward. Press dumbbells vertically until elbows are extended overhead, lowering under strict 3-second control."
    ),
    (
        "Machine Overhead Shoulder Press (Converging Axis)",
        5.5,
        "Machine",
        "Adjust seat height so handles align with chin. Grip handles and press smoothly overhead following the machine's converging arc, maintaining continuous deltoid tension."
    ),
    (
        "Dumbbell Standing Lateral Raise (Light Pinky-Up)",
        5.7,
        "Dumbbells",
        "Hold light 5-8 lb dumbbells at sides. Raise arms in scapular plane to parallel with floor leading with elbows and keeping wrists neutral to activate lateral deltoids."
    ),
    (
        "Dumbbell Standing Front Raise (Alternating)",
        5.4,
        "Dumbbells",
        "Stand tall holding dumbbells on front of thighs. Raise one dumbbell smoothly to eye level, pause for 1 second, lower with control, and alternate sides."
    ),
    (
        "Cable Low-Pulley Bilateral Lateral Raise",
        5.8,
        "Cable",
        "Set pulleys at lowest position, cross cables, and grasp opposite handles. Raise arms laterally to shoulder height with continuous cable tension throughout range of motion."
    ),
    (
        "Cable High-Pulley Face Pull with Rope Attachment",
        5.9,
        "Cable",
        "Attach rope to eye-level cable pulley. Pull rope toward forehead while spreading hands apart and rotating wrists back, targeting posterior deltoid and infraspinatus."
    ),
    (
        "Dumbbell Seated Rear Delt Fly on Incline Bench",
        5.7,
        "Dumbbells",
        "Lie chest-down on a 30-degree incline bench with light dumbbells. Raise arms laterally outward with elbows slightly bent, squeezing rear deltoids at peak contraction."
    ),
    (
        "Machine Reverse Fly (Pec Deck Rear Delt)",
        5.8,
        "Machine",
        "Sit facing machine with chest firmly against pad. Grip handles with neutral grip and sweep arms horizontally outward, maintaining slight elbow bend to isolate posterior delts."
    ),
    (
        "Cable Single-Arm Standing Lateral Raise (Behind Back)",
        5.9,
        "Cable",
        "Stand beside low cable stack with cable running behind torso. Grasp handle and raise arm out to side to 90 degrees, capitalizing on deep stretch at the bottom."
    ),
    (
        "Cable Standing External Rotation at Neutral Abduction",
        5.6,
        "Cable",
        "Set cable pulley level with elbow. Place towel roll between elbow and torso, grip handle, and rotate forearm outward across 90 degrees to isolate infraspinatus."
    ),
    (
        "Cable Standing Internal Rotation at Neutral Abduction",
        5.4,
        "Cable",
        "Set pulley at elbow height, hold handle with elbow tucked at 90 degrees, and pull forearm inward across abdomen to condition subscapularis under constant tension."
    ),
    (
        "Smith Machine Seated Overhead Shoulder Press",
        5.7,
        "Machine",
        "Position upright bench under Smith bar. Unrack bar at collarbones, press upward to full lockout, and lower slowly under fixed track guidance for maximum stability."
    ),
    (
        "Dumbbell Standing Arnold Press (Foundational Light)",
        5.8,
        "Dumbbells",
        "Start with dumbbells in front of shoulders with palms facing body. Rotate wrists outward while pressing overhead, finishing with palms facing forward."
    ),
    (
        "Barbell Standing Overhead Press with Empty Olympic Bar",
        5.8,
        "Barbell",
        "Grip empty 45 lb bar just outside shoulders at collarbones. Squeeze glutes, press bar straight up clearing chin, and lock out overhead with head pushed slightly through."
    ),
    (
        "Dumbbell Prone Incline Y-Raise (Chest Supported)",
        5.5,
        "Dumbbells",
        "Lie face down on a 45-degree incline bench with 3-5 lb dumbbells. Raise arms diagonally forward into a 'Y' with thumbs pointing to ceiling, strengthening lower traps."
    ),
    (
        "Dumbbell Seated Hammer Shoulder Press",
        5.6,
        "Dumbbells",
        "Sit with back supported, hold dumbbells with palms facing each other throughout the lift, and press vertically to protect subacromial space while building anterior delts."
    ),
    (
        "Cable Low-Pulley Front Raise with Straight Bar",
        5.5,
        "Cable",
        "Straddle low cable with straight bar attachment held at thighs. Raise bar forward to shoulder height against constant downward cable tension, lowering smoothly."
    ),
    (
        "Dumbbell Incline Bench Lateral Raise (Side-Lying)",
        5.8,
        "Dumbbells",
        "Lie on side on a 30-degree incline bench. Raise top dumbbell from hip laterally to 90 degrees, creating high tension in the bottom portion of the lateral deltoid range."
    ),
    (
        "EZ-Bar Standing Wide-Grip Upright Row",
        5.6,
        "EZ-Bar",
        "Hold EZ-bar with wide overhand grip on outer knurling. Pull bar smoothly to mid-chest keeping elbows higher than forearms and flared wide to target lateral delts."
    ),
    (
        "Cable Standing Scapular Plane Scaption Raise",
        5.7,
        "Cable",
        "Stand at low cable cross, raise cables forward and outward at 30 degrees to eye level with thumbs pointed upward, maximizing supraspinatus and anterior delt recruitment."
    ),
    (
        "Dumbbell Standing Cuban Rotation to Press",
        5.7,
        "Dumbbells",
        "With light dumbbells, upright row to chest with elbows wide, externally rotate forearms up 90 degrees, press overhead, reverse under control, and lower."
    ),
    (
        "Machine Lateral Deltoid Raise (Padded Levers)",
        5.7,
        "Machine",
        "Sit on machine with side pads resting against outer elbows. Drive elbows outward and upward against pads to collarbone level, removing forearm grip fatigue."
    ),
    (
        "Cable Standing High-to-Low Face Pull with Rope",
        5.8,
        "Cable",
        "Set pulley overhead, pull rope diagonally downward to nose while rotating hands backward, engaging posterior deltoid, rhomboids, and external rotators."
    ),
    (
        "Dumbbell Standing Shrug with 2-Second Top Pause",
        5.3,
        "Dumbbells",
        "Hold moderate dumbbells at sides with neutral grip. Elevate shoulders straight up toward ears, hold the peak isometric squeeze for 2 seconds, and lower under control."
    ),
    (
        "Cable Low-Pulley Cross-Over Rear Delt Fly",
        5.9,
        "Cable",
        "Cross cables without handles, grasp cable ends, and pull horizontally outward in a reverse hug motion, keeping arms extended to isolate posterior deltoid."
    ),
    (
        "Seated Dumbbell External Rotation on Knee",
        5.5,
        "Dumbbells",
        "Sit on bench with one knee propped up. Rest elbow on knee with forearm horizontal, rotate dumbbell upward until forearm is vertical, and lower slowly to train infraspinatus."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home: {len(beg_home_data)}")
    print(f"Beginner Gym: {len(beg_gym_data)}")
    print(f"Beginner Total: {len(beg_home_data) + len(beg_gym_data)}")
    for name, score, eq, inst in beg_home_data + beg_gym_data:
        assert 4.0 <= score <= 6.0, f"Score {score} out of bounds for {name}"
        assert "1.5" not in inst and "1.5" not in name, f"1.5 protocol found in {name}"
    print("All beginner scores within 4.0 - 6.0 range and no 1.5 protocol!")
