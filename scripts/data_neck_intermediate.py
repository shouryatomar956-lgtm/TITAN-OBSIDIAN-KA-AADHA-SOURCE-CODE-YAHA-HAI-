#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 10: NECK STRENGTH - INTERMEDIATE TIER (Total: 76 Exercises)
# 53 Home (70%) + 23 Gym (30%)
# Validated Physical Therapy, Combat Neck Conditioning, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 6.1 and 8.0
# ==============================================================================

int_home_data = [
    # --- RESISTED FLEXION & EXTENSION PROGRESSIONS (Home: 15) ---
    (
        "Supine Head-Off-Bed Cervical Flexion Raise",
        6.8,
        "Bodyweight",
        "Lie supine on a firm bed with head and neck extending beyond the edge. Begin with head in comfortable extension, perform a gentle chin tuck, and flex the neck upward until the chin approaches the sternum. Pause for 1 second, then lower with a strict 3-second eccentric tempo."
    ),
    (
        "Prone Head-Off-Bed Cervical Extension Raise",
        6.9,
        "Bodyweight",
        "Lie face down with clavicles aligned with the edge of the bed. Begin with head hanging in full flexion. Contract the splenius capitis and upper trapezius to raise the skull until parallel with the spine, holding the top position for 2 seconds."
    ),
    (
        "Side-Lying Head-Off-Bed Lateral Cervical Flexion",
        6.7,
        "Bodyweight",
        "Lie on your side with shoulder supported at the bed's edge. Lower the head toward the floor into full lateral stretch, then laterally flex upward toward the ceiling, pausing at the horizontal midpoint for 1 second of isometric control."
    ),
    (
        "Backpack-Weighted Supine Cervical Flexion",
        7.2,
        "Backpack-weighted",
        "Lie supine with head off a bench or bed. Place a flat folded towel over your forehead and rest a 3-5 kg weighted backpack on top, holding it lightly for balance. Perform deliberate cervical curls through a 45-degree active range."
    ),
    (
        "Backpack-Weighted Prone Cervical Extension",
        7.4,
        "Backpack-weighted",
        "Lie prone with head extended past the bed edge. Drape a lightly weighted backpack with a towel buffer over the occiput. Smoothly extend the neck upward against gravity, training posterior cervical endurance across 12 strict repetitions."
    ),
    (
        "Double Band Supine Cervical Curl",
        7.1,
        "Resistance Bands",
        "Anchor dual resistance bands under your heels while lying flat on a mat. Loop the padded strap around your forehead. Curl the chin toward the chest against the compounding elastic tension, feeling deep anterior neck recruitment."
    ),
    (
        "Door-Anchored Medium Band Cervical Extension",
        7.3,
        "Resistance Bands",
        "Anchor a medium resistance band at eye height to a door frame. Step back facing the door with the band around the occiput. Extend the neck backward against firm elastic resistance while maintaining locked shoulder blades."
    ),
    (
        "Standing Medium Band Lateral Neck Flexion",
        6.9,
        "Resistance Bands",
        "Anchor band at ear height. Stand sideways to the anchor with the loop secured around the temple. Tilt the head laterally away from the anchor through a 35-degree excursion, holding the peak contraction for 2 seconds."
    ),
    (
        "Prone Sphynx Active Neck Extension Hold",
        6.4,
        "Bodyweight",
        "Rest on forearms in a prone sphinx posture. Retract the chin and extend the cervical spine against gravity, holding the active extension lock for 20 continuous seconds while breathing rhythmically."
    ),
    (
        "Supine Isometric Cervical Flexion Table Bridge",
        7.0,
        "Bodyweight",
        "Lie on back with knees bent at 90 degrees. Lift the head 2 inches off the mat, tuck the chin, and maintain an unyielding static flexion hold for 25 seconds, developing stamina in the sternocleidomastoid complex."
    ),
    (
        "Backpack-Resisted Side-Lying Lateral Flexion Left",
        7.3,
        "Backpack-weighted",
        "Lie on your right side with head off the support. Balance a light weighted backpack cushioned by a towel on your left ear. Laterally flex the head upward toward the ceiling for 10 controlled repetitions."
    ),
    (
        "Backpack-Resisted Side-Lying Lateral Flexion Right",
        7.3,
        "Backpack-weighted",
        "Lie on your left side with head extended past the edge. Support the backpack on your right temple. Flex the neck toward the right shoulder, engaging the right scalene group under steady mechanical load."
    ),
    (
        "Quadruped Resisted Band Neck Retraction Drive",
        7.1,
        "Resistance Bands",
        "On hands and knees, anchor band under hands with center loop across back of head. Drive head upward toward ceiling into full cervical retraction against medium elastic resistance, holding for 3 seconds."
    ),
    (
        "Supine Towel-Resisted Dynamic Chin Tuck",
        6.6,
        "None",
        "Lie supine with a towel wrapped around your forehead. Pull downward and forward with your hands to provide dynamic resistance as you tuck your chin and curl your head upward."
    ),
    (
        "Prone Incline Towel-Resisted Neck Extension",
        6.8,
        "None",
        "Lie on an inclined wedge cushion. Place a towel across the occiput, pulling downward with your hands while extending your neck upward against self-administered progressive resistance."
    ),

    # --- BRIDGE PROGRESSIONS & COMBAT PREP (Home: 18) ---
    (
        "Hand-Supported Kneeling Front Wrestling Bridge",
        7.4,
        "Bodyweight",
        "Kneel on a soft mat and place your forehead on a folded towel. Support 60% of your bodyweight with your hands placed on the floor alongside your head. Gently roll your forehead forward and backward through a short 2-inch arc."
    ),
    (
        "Hand-Supported Supine Back Wrestling Bridge",
        7.5,
        "Bodyweight",
        "Lie on your back, plant feet flat, and bridge hips toward ceiling. Place hands beside ears on the mat to share load with the crown of your head. Hold the static bridge for 15 seconds, conditioning posterior cervical structures safely."
    ),
    (
        "Four-Point Kneeling Head Tripod Isometric",
        7.2,
        "Bodyweight",
        "Set up in a four-point stance with knees, hands, and forehead forming a stable tripod base on a padded mat. Distribute weight evenly and maintain an active cervical spine alignment for 20 seconds."
    ),
    (
        "Wall-Supported Back Bridge Cervical Roll",
        7.1,
        "Bodyweight",
        "Stand with your back to a wall. Lean back so the crown of your head rests against a cushioned wall pad while supporting yourself with hands on hips. Roll gently through small cervical arcs to build compression tolerance."
    ),
    (
        "Wall-Supported Front Bridge Forehead Press",
        7.0,
        "Bodyweight",
        "Stand facing a wall with a soft foam block at forehead level. Place forehead against the pad and step feet back into a 45-degree angle. Press into the wall with 50% bodyweight effort for 20 seconds."
    ),
    (
        "Kneeling Front Bridge Lateral Rocking",
        7.6,
        "Bodyweight",
        "From a hand-supported front bridge on a mat, slowly shift weight from the center of the forehead toward the left brow, return through center, and rock to the right brow, training rotational shear resistance."
    ),
    (
        "Supine Glute Bridge With Occipital Mat Press",
        6.8,
        "Bodyweight",
        "Elevate hips into a standard glute bridge. Simultaneously drive the back of the head firmly downward into the floor, creating co-contraction between the posterior cervical chain and gluteal complex for 15 seconds."
    ),
    (
        "Hand-Assisted Lateral Neck Bridge on Foam Pad",
        7.3,
        "Bodyweight",
        "Position the side of your head on a dense foam pad while kneeling. Support majority of weight on hands and knees while loading 30% of lateral force through the temple, holding for 12 seconds per side."
    ),
    (
        "Kneeling Tripod Head Pivot and Roll",
        7.5,
        "Bodyweight",
        "From a head-and-hands tripod base on a mat, gently trace a small circle with the contact point of the skull, transitioning smoothly from forehead to crown and back over 15 seconds."
    ),
    (
        "Elevated Feet Hand-Supported Back Bridge",
        7.7,
        "Bodyweight",
        "Place feet on a 6-inch step while bridging. Support upper body with crown of head and hands flat on the mat. The elevated feet angle increases compressive loading through the cervical extensors."
    ),
    (
        "Forehead Wall-Ball Multi-Angle Circle Tracking",
        6.9,
        "None",
        "Place a soft ball between forehead and a wall. Without using hands, trace slow clockwise and counterclockwise circles against the wall using subtle cervical movements for 20 seconds."
    ),
    (
        "Occipital Wall-Ball Figure-8 Tracing",
        7.0,
        "None",
        "Position a soft ball behind the back of the head against a wall. Apply steady rearward pressure while tracing horizontal figure-8 patterns with your nose, activating suboccipital coordinators."
    ),
    (
        "Supine Head-Suspended Combat Isometric Hold",
        7.4,
        "Bodyweight",
        "Lie supine with shoulders at the very edge of an exercise bench. Hold the unsupported head perfectly level with the torso for 30 continuous seconds, building combat-specific isometric endurance."
    ),
    (
        "Prone Head-Suspended Combat Isometric Hold",
        7.5,
        "Bodyweight",
        "Lie prone with chest at bench edge. Hold the head and neck in rigid horizontal alignment against gravity for 30 seconds without allowing the chin to poke forward or sag downward."
    ),
    (
        "Side-Lying Head-Suspended Combat Isometric Hold",
        7.3,
        "Bodyweight",
        "Lie on side with neck extending off bench. Maintain a completely straight cervical-thoracic line for 25 seconds per side, challenging the lateral muscular wall against gravity."
    ),
    (
        "Kneeling Front Bridge Nodding Drill",
        7.6,
        "Bodyweight",
        "With hands firmly supporting torso in a front bridge, slowly nod chin toward chest, then push through forehead back to neutral, developing dynamic cervical flexor-extensor interplay under bodyweight."
    ),
    (
        "Hand-Assisted Back Bridge Rotational Turn",
        7.7,
        "Bodyweight",
        "In a hand-supported back bridge, gently rotate head 15 degrees to the left, return to center, and rotate 15 degrees to the right, loading the cervical facets under controlled axial compression."
    ),
    (
        "Kneeling Forehead Balance Hold on Soft Block",
        7.2,
        "Bodyweight",
        "Kneel before a yoga block. Rest forehead on the block with hands hovering 1 inch above the floor. Hold 10 seconds of balance before touching hands down, testing pure cervical stabilizer recruitment."
    ),

    # --- MULTI-ANGULAR BAND & ROTATIONAL RESISTANCE (Home: 20) ---
    (
        "Band-Resisted 360-Degree Cervical Spin Walkout",
        7.6,
        "Resistance Bands",
        "Attach a padded band around your head connected to a door anchor. Walk in a complete circle around the anchor while maintaining head posture, smoothly challenging the neck across all 360 degrees of resistance."
    ),
    (
        "Door-Anchor Band Resisted Diagonal Head Chop",
        7.2,
        "Resistance Bands",
        "Anchor band at high door hinge. Loop around temple. Pull head diagonally downward and across toward opposite shoulder, building multi-planar strength for contact absorption."
    ),
    (
        "Door-Anchor Band Resisted Diagonal Head Lift",
        7.3,
        "Resistance Bands",
        "Anchor band low on door. Facing away, lift head upward and outward along a 45-degree trajectory against elastic recoil, conditioning the posterior oblique cervical sling."
    ),
    (
        "Seated Band Resisted Horizontal Head Translation",
        6.8,
        "Resistance Bands",
        "Anchor band to side at eye level. Loop around forehead. Perform pure horizontal lateral glide of the head away from the anchor without tilting, isolating intervertebral translator muscles."
    ),
    (
        "Standing Band-Resisted Cervical Protraction-Retraction",
        7.1,
        "Resistance Bands",
        "Facing a door anchor with band across occiput, protract head forward toward anchor, then forcefully retract chin backward against band resistance through full active horizontal travel."
    ),
    (
        "Band-Loaded Figure-8 Cervical Path Tracking",
        7.5,
        "Resistance Bands",
        "With a medium band providing light rearward tension, trace a horizontal figure-8 pattern with your chin, building coordinated multi-axis neuromuscular control."
    ),
    (
        "Standing Band Isometric Anterior Hold in Split Stance",
        7.0,
        "Resistance Bands",
        "Anchor band behind you. Loop around forehead. Step forward into a deep split stance until high tension is reached. Hold static forward posture against the rearward pull for 20 seconds."
    ),
    (
        "Standing Band Isometric Posterior Hold in Split Stance",
        7.1,
        "Resistance Bands",
        "Facing the door anchor with band around occiput, step backward into a strong combat base. Hold an immovable upright cervical lock against the forward pull for 20 seconds."
    ),
    (
        "Standing Band Isometric Lateral Hold Left",
        6.9,
        "Resistance Bands",
        "Stand sideways to anchor with band looped over right temple. Step away to create heavy lateral shear and maintain vertical cervical alignment for 20 seconds."
    ),
    (
        "Standing Band Isometric Lateral Hold Right",
        6.9,
        "Resistance Bands",
        "Stand with left side toward anchor, band looped over left temple. Step laterally and hold an unyielding upright posture against the elastic force for 20 seconds."
    ),
    (
        "Dual-Band Cross-Tension Cervical Stabilization",
        7.7,
        "Resistance Bands",
        "Anchor two bands on opposing doorposts. Loop both straps around the head. Stand at center where both bands pull in opposite directions, holding a micro-balanced isometric center for 20 seconds."
    ),
    (
        "Seated Towel-Weighted Dynamic Rotational Sweep",
        6.7,
        "Backpack-weighted",
        "Sit upright holding a light weight connected to a towel strap around your head. Rotate smoothly through 60 degrees of cervical rotation, maintaining level chin tracking."
    ),
    (
        "Supine Resisted Cervical Nod With Band Under Feet",
        7.2,
        "Resistance Bands",
        "Lie flat on back with band looped around feet and held over forehead. Perform 15 deliberate chin tuck curls against the upward-directed elastic pull."
    ),
    (
        "Prone Band Resisted Neck Extension Off Floor",
        7.3,
        "Resistance Bands",
        "Lie prone with band anchored under chest. Loop band across occiput and extend head upward against the downward elastic load, holding peak contraction for 2 seconds."
    ),
    (
        "Standing Band Resisted Neck Shrug and Tuck",
        7.0,
        "Resistance Bands",
        "Stand on a heavy band while a light band wraps your head from behind. Shrug shoulders upward while simultaneously performing an active chin tuck against both resistance sources."
    ),
    (
        "Kneeling Band-Resisted Head Rotation Hold",
        7.4,
        "Resistance Bands",
        "Kneel sideways to anchor. Turn head 45 degrees away against band tension and hold the static rotational contraction for 15 seconds before resetting."
    ),
    (
        "Band-Resisted Diagonal Head Roll Left",
        7.2,
        "Resistance Bands",
        "Anchor band at shoulder level. Tilt head diagonally from left collarbone toward right upper ceiling, building rotational resilience against band pull."
    ),
    (
        "Band-Resisted Diagonal Head Roll Right",
        7.2,
        "Resistance Bands",
        "Anchor band at opposite shoulder level. Tilt head from right collarbone up toward left upper quadrant against smooth elastic resistance."
    ),
    (
        "Backpack-Resisted Prone Incline Neck Extension",
        7.5,
        "Backpack-weighted",
        "Lie on a 45-degree inclined surface. Place a 5 kg backpack across occiput and extend neck upward, training posterior musculature through a functional gravity vector."
    ),
    (
        "Four-Way Manual Resistance High-Intensity Matrix",
        6.8,
        "None",
        "Execute 10 seconds of maximal manual isometric resistance consecutively in 4 directions: anterior, posterior, right lateral, and left lateral without resting between positions."
    ),
]

int_gym_data = [
    # --- GYM: CABLE, HARNESS, MACHINE & WEIGHT PLATES (Gym: 23) ---
    (
        "Plate-Loaded Supine Cervical Flexion on Flat Bench",
        7.5,
        "Barbell",
        "Lie supine on a flat bench with head extending beyond the edge. Place a folded towel and a 5 kg Olympic plate on your forehead, holding it with fingertips for stability. Curl head upward through full active range, lowering under 3-second control."
    ),
    (
        "Plate-Loaded Prone Cervical Extension on Flat Bench",
        7.7,
        "Barbell",
        "Lie face down with head over bench edge. Place a cushioned 5 kg plate over the occiput. Smoothly extend the neck upward until aligned with the thoracic spine, pausing for 1 second at peak contraction."
    ),
    (
        "Plate-Loaded Side-Lying Lateral Neck Flexion Left",
        7.4,
        "Barbell",
        "Lie on right side across a bench with head over edge. Rest a cushioned 2.5 kg weight plate on the left temple. Laterally flex upward toward the ceiling across 12 strict repetitions."
    ),
    (
        "Plate-Loaded Side-Lying Lateral Neck Flexion Right",
        7.4,
        "Barbell",
        "Lie on left side with head over edge. Balance a cushioned 2.5 kg plate on the right temple. Flex neck toward right shoulder with deliberate 2-second concentric and 3-second eccentric cadence."
    ),
    (
        "Cable Head Harness Seated Neck Extension",
        7.8,
        "Cable",
        "Fit a padded neck harness connected to a mid-height cable pulley. Sit upright facing the machine with torso stabilized. Slowly extend the neck backward against the weight stack, maintaining square shoulders."
    ),
    (
        "Cable Head Harness Seated Neck Flexion",
        7.6,
        "Cable",
        "Facing away from a mid-cable pulley with harness secured to forehead ring, perform controlled cervical flexion downward toward the chest against the stack resistance, returning smoothly."
    ),
    (
        "Cable Head Harness Standing Lateral Neck Flexion",
        7.5,
        "Cable",
        "Stand perpendicular to cable column with harness attached to lateral D-ring. Tilt head away from the stack through a 35-degree active range, keeping the torso completely stationary."
    ),
    (
        "Machine 4-Way Cervical Flexion Intermediate Overload",
        7.7,
        "Machine",
        "Position seat so forehead contacts the front pad of a commercial 4-way neck machine. Select moderate pin weight and execute 12 strict repetitions with a 2-second hold at full flexion."
    ),
    (
        "Machine 4-Way Cervical Extension Intermediate Overload",
        7.9,
        "Machine",
        "Set rear pad against the occiput. With chest pressed firmly against the chest pad, extend the neck backward through the cam's full range of motion against moderate stack resistance."
    ),
    (
        "Machine 4-Way Lateral Cervical Flexion Left Overload",
        7.5,
        "Machine",
        "Align left temple against the machine pad. Flex head toward left shoulder against the balanced counterweight, pausing for 1 second at maximum lateral excursion."
    ),
    (
        "Machine 4-Way Lateral Cervical Flexion Right Overload",
        7.5,
        "Machine",
        "Align right temple against pad and execute 12 smooth repetitions of right lateral flexion, training the right sternocleidomastoid and middle scalene under guided path mechanics."
    ),
    (
        "Cable Head Harness Prone Extension on Incline Bench",
        7.8,
        "Cable",
        "Lie prone on a 30-degree incline bench facing a low cable. Attach harness to the low pulley. Extend neck upward and backward against the angled resistance vector."
    ),
    (
        "Cable Head Harness Supine Flexion on Incline Bench",
        7.6,
        "Cable",
        "Lie supine on an incline bench facing away from low pulley with harness attached. Flex neck forward against cable tension, isolating anterior stabilizers under continuous load."
    ),
    (
        "Standing Cable Rotational Head Turn With Harness",
        7.3,
        "Cable",
        "Connect side ring of head harness to a mid-pulley. Stand sideways and rotate head 60 degrees away from the stack, building functional rotational force absorption for combat sports."
    ),
    (
        "Cable High-Pulley Cervical Retraction and Trap Lock",
        7.6,
        "Cable",
        "Attach rope to high pulley. Hold rope ends beside temples and perform a simultaneous deep chin tuck and scapular retraction, holding the static isometric tension for 15 seconds."
    ),
    (
        "Incline Bench Dumbbell Shrug With Cervical Isometric Lock",
        7.2,
        "Dumbbells",
        "Hold heavy dumbbells on a 60-degree incline bench. Shrug shoulders upward toward ears while maintaining an immovable chin-tuck isometric lock against spinal compression for 15 seconds."
    ),
    (
        "Preacher Bench Plate-Loaded Cervical Extension",
        7.5,
        "Barbell",
        "Drape torso over preacher pad with head hanging free. Balance a cushioned 5 kg plate on the occiput and perform slow extension repetitions to condition the upper thoracic-cervical junction."
    ),
    (
        "Flat Bench Dumbbell Overhead Cervical Stabilization Hold",
        7.1,
        "Dumbbells",
        "Lie supine on bench holding a dumbbell in a straight-arm pullover position overhead. The extended lever creates thoracic-cervical tension; maintain a rigid chin tuck for 20 seconds."
    ),
    (
        "Cable Low-Pulley Head Harness Isometric Table Lock",
        7.9,
        "Cable",
        "Attach harness to low cable at table height. Step back into combat stance and lock cervical spine in neutral against 15 kg of stack tension for 15 seconds of unyielding static strain."
    ),
    (
        "Machine Seated Cervical Rotational Iso-Hold",
        7.4,
        "Machine",
        "Set 4-way machine pad in a fixed rotational position. Press temple into the pad with 60% voluntary effort, holding the static rotational torque for 15 seconds."
    ),
    (
        "Plate-Loaded Incline Bench Neck Extension",
        7.6,
        "Barbell",
        "Lie prone on an incline bench set to 45 degrees with head free at the apex. Place a 5 kg plate over the occiput and extend the head upward against gravity's diagonal vector."
    ),
    (
        "Cable Low-Anchor Cervical Protraction-Retraction Cycle",
        7.5,
        "Cable",
        "Facing low pulley with harness, protract head forward under control, then retract chin firmly backward against the upward-angled cable vector for 10 deliberate repetitions."
    ),
    (
        "Standing Cable Multi-Angle Cervical Diagonal Pull",
        7.7,
        "Cable",
        "Connect harness to mid-pulley. Stand at a 45-degree angle to the column and perform diagonal flexion-rotation pulls to train complex neuromuscular sports motor patterns."
    ),
]

if __name__ == "__main__":
    print(f"Intermediate Home Count: {len(int_home_data)} (Target: 53)")
    print(f"Intermediate Gym Count: {len(int_gym_data)} (Target: 23)")
    print(f"Total Intermediate Count: {len(int_home_data) + len(int_gym_data)} (Target: 76)")
    assert len(int_home_data) == 53
    assert len(int_gym_data) == 23
    for item in int_home_data + int_gym_data:
        assert 6.1 <= item[1] <= 8.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Intermediate exercise: {item[0]}"
    print("Intermediate validation passed!")
