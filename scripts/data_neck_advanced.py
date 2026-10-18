#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 10: NECK STRENGTH - ADVANCED TIER (Total: 50 Exercises)
# 35 Home (70%) + 15 Gym (30%)
# Validated Combat Sports Conditioning, Rigorous Biomechanics, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 8.1 and 9.2
# ==============================================================================

adv_home_data = [
    # --- ADVANCED UNASSISTED BRIDGING & CALISTHENICS (Home: 15) ---
    (
        "Hands-Free Supine Wrestler Back Bridge Hold",
        9.0,
        "Bodyweight",
        "Lie supine on a dense wrestling mat. Plant feet flat with knees bent, drive hips upward, and arch onto the crown of your head with hands folded across your chest. Hold the static unassisted back bridge for 20 seconds, maintaining continuous posterior cervical tension."
    ),
    (
        "Hands-Free Kneeling Wrestler Front Bridge Hold",
        8.9,
        "Bodyweight",
        "Kneel on a padded mat, place forehead on the surface, and elevate knees off the ground into an inverted V-stance. Remove hands from the floor and clasp them behind your lower back. Hold the unassisted front bridge for 20 continuous seconds."
    ),
    (
        "Dynamic Wrestler Back Bridge Cervical Roll",
        9.1,
        "Bodyweight",
        "In a full back bridge supported on feet and skull, slowly roll from the crown of your head back toward the occiput, then drive through the posterior cervical chain back to the crown. Perform 8 deliberate, controlled rolling repetitions."
    ),
    (
        "Dynamic Wrestler Front Bridge Forehead-to-Nose Roll",
        9.0,
        "Bodyweight",
        "In a knees-elevated front bridge, slowly rock your head forward until the tip of your nose grazes the mat, then push backward through the forehead to the crown, challenging the deep cervical flexor and extensor interplay."
    ),
    (
        "Hands-Free Lateral Wrestler Bridge Roll Left",
        8.8,
        "Bodyweight",
        "From a back bridge position, pivot bodyweight toward the left side of the skull, loading the left temporal bone and lateral musculature with 80% bodyweight, holding for 12 seconds before returning to center."
    ),
    (
        "Hands-Free Lateral Wrestler Bridge Roll Right",
        8.8,
        "Bodyweight",
        "In an arched bridge, rotate bodyweight onto the right temporal ridge with arms folded. Hold the static lateral load for 12 seconds, demanding intense stabilization from the right scalene and upper trapezius complex."
    ),
    (
        "Wall-Supported Inverted Headstand Cervical Rotation",
        8.7,
        "Bodyweight",
        "Kick up into a wall-supported headstand with palms flat on the mat for 50% stabilization. Slowly rotate your head 15 degrees to the left, return to center, and rotate 15 degrees to the right under controlled axial loading."
    ),
    (
        "Elevated Feet Wrestler Back Bridge on Chair",
        9.2,
        "Bodyweight",
        "Place both feet elevated 18 inches atop a sturdy chair. Bridge hips upward and support the upper body exclusively on the crown of the head on a mat with hands folded on chest, holding for 15 intense seconds."
    ),
    (
        "Kneeling 360-Degree Wrestler Skull Pivot Roll",
        9.1,
        "Bodyweight",
        "In a front bridge stance with hands hovering, smoothly trace a full circular roll around the circumference of the skull: forehead to left temple, to crown, to right temple, and back, completing 3 slow rotations per direction."
    ),
    (
        "Prone Inverted Neck Bridge Push-Up",
        8.9,
        "Bodyweight",
        "Set up in a front headstand bridge. Lower your forehead toward the mat under control, then forcefully push through the cervical spine and neck extensors to lift the head back to full extension without pushing off your toes."
    ),
    (
        "Supine Neck Bridge Hip-Thrust Pulses",
        8.8,
        "Bodyweight",
        "In a back bridge supported on head and feet, lower hips 3 inches toward the floor, then drive hips aggressively toward ceiling while driving through the occiput, reinforcing the full posterior athletic chain."
    ),
    (
        "Front Bridge Rotational Head Turn Under Load",
        9.0,
        "Bodyweight",
        "In a knees-elevated front bridge, slowly turn head 20 degrees to look toward the left shoulder, pause for 2 seconds under axial load, return to center, and repeat to the right side."
    ),
    (
        "Wall-Facing Inverted Front Bridge Press",
        8.7,
        "Bodyweight",
        "Place forehead on a wall-mounted pad with feet 4 feet away. Lean 70% of bodyweight forward into the wall, holding an unyielding 45-degree angle for 25 seconds of anterior cervical strain."
    ),
    (
        "Declined Surface Wrestler Back Bridge",
        9.1,
        "Bodyweight",
        "Position head on a 4-inch declined wedge while feet remain flat on the floor. Bridge upward into extreme cervical extension, holding the biomechanically disadvantaged bridge for 15 seconds."
    ),
    (
        "Head-Tripod Leg Kickout Cervical Stabilization",
        8.8,
        "Bodyweight",
        "In a head-and-hands tripod on a mat, slowly kick one leg straight back into the air while maintaining an immovable cervical alignment, holding for 10 seconds before alternating legs."
    ),

    # --- HEAVY BACKPACK & MULTI-BAND COMBAT LOAD (Home: 20) ---
    (
        "Heavy Backpack Supine Cervical Curl Overload",
        8.6,
        "Backpack-weighted",
        "Lie supine with head extending off a firm bench. Cushion your forehead with a folded towel and balance a 10 kg weighted backpack across the brow. Curl chin to chest through full range, pausing for 2 seconds at peak contraction."
    ),
    (
        "Heavy Backpack Prone Cervical Extension Overload",
        8.8,
        "Backpack-weighted",
        "Lie prone with head extended off bench. Place a 10 kg backpack across the occiput. Extend the neck upward against gravity, contracting the deep erectors and splenius capitis for 10 strict repetitions."
    ),
    (
        "Heavy Backpack Side-Lying Lateral Neck Flexion Left",
        8.5,
        "Backpack-weighted",
        "Lie on right side with head over edge. Rest a 7 kg weighted backpack over a towel on your left ear. Perform 10 deliberate lateral flexions toward the ceiling, controlling the 3-second descent."
    ),
    (
        "Heavy Backpack Side-Lying Lateral Neck Flexion Right",
        8.5,
        "Backpack-weighted",
        "Lie on left side with head free. Balance 7 kg backpack on your right temple. Laterally flex upward, building robust lateral cervical wall protection against combat impact."
    ),
    (
        "Triple-Band Seated Cervical Extension Snap",
        8.7,
        "Resistance Bands",
        "Anchor three heavy resistance bands to a door at eye level. Sit facing the door with the loop behind the occiput. Drive neck backward into full extension, pausing for 2 seconds against maximum elastic tension."
    ),
    (
        "Triple-Band Seated Cervical Flexion Drive",
        8.6,
        "Resistance Bands",
        "Anchor three heavy bands behind you. Place loop over forehead. Drive chin forward and downward into deep flexion against compounding elastic resistance, holding peak contraction for 2 seconds."
    ),
    (
        "Heavy Band Standing Lateral Neck Shear Hold Left",
        8.4,
        "Resistance Bands",
        "Anchor heavy band at temple height. Stand sideways and loop strap over left temple. Step 4 feet away into deep tension, holding vertical cervical alignment against lateral shear for 20 seconds."
    ),
    (
        "Heavy Band Standing Lateral Neck Shear Hold Right",
        8.4,
        "Resistance Bands",
        "Anchor heavy band at temple height. Loop strap over right temple and step away to create intense lateral displacement force, maintaining rigid head posture for 20 seconds."
    ),
    (
        "Heavy Band-Resisted 360-Degree Iron Spin",
        8.9,
        "Resistance Bands",
        "With a high-tension looped band around the head, rotate your entire body in small pivot steps around the anchor, forcing the neck to stabilize continuously against multi-directional shear."
    ),
    (
        "Backpack-Loaded Quadruped Cervical Extension",
        8.6,
        "Backpack-weighted",
        "On all fours, drape a 10 kg backpack over the back of your head with towel padding. Lift skull toward ceiling into full retraction and extension, holding each repetition for 3 seconds."
    ),
    (
        "Heavy Band Standing Combat Diagonal Snap Left",
        8.7,
        "Resistance Bands",
        "Anchor band at high door hinge. Loop around left temple. Explosively pull head diagonally downward toward right hip against heavy band tension, then reset under 3-second control."
    ),
    (
        "Heavy Band Standing Combat Diagonal Snap Right",
        8.7,
        "Resistance Bands",
        "Anchor band at high door hinge. Loop around right temple. Drive head diagonally down toward left hip, building rotational force absorption for combat sports."
    ),
    (
        "Dual-Band Antagonistic Cervical Tug-of-War Hold",
        9.0,
        "Resistance Bands",
        "Set heavy bands on opposing walls. Loop both to a head strap. Stand at center under immense bidirectional tension, maintaining absolute static stillness for 20 continuous seconds."
    ),
    (
        "Backpack-Weighted Supine Isometric Flexion Hold",
        8.7,
        "Backpack-weighted",
        "Lie supine with head off bench holding an 8 kg backpack on forehead at a 30-degree flexion angle. Hold statically for 25 seconds without allowing the head to drop."
    ),
    (
        "Backpack-Weighted Prone Isometric Extension Hold",
        8.8,
        "Backpack-weighted",
        "Lie prone with head off bench holding an 8 kg backpack on the occiput in neutral horizontal alignment for 25 continuous seconds of posterior chain isometric strain."
    ),
    (
        "Heavy Band Cervical Protraction-Retraction Cycle Overload",
        8.6,
        "Resistance Bands",
        "Facing anchor with heavy band on occiput, protract head forward under control, then forcefully retract chin backward through full range against heavy elastic load for 12 reps."
    ),
    (
        "Heavy Band Resisted Neck Figure-8 Combat Trace",
        8.9,
        "Resistance Bands",
        "Under heavy rearward band tension, trace a wide horizontal figure-8 pattern with your nose for 20 seconds, demanding high-level coordination and stabilizer endurance."
    ),
    (
        "Standing Heavy Band Isometric Forward Lean Hold",
        8.5,
        "Resistance Bands",
        "Anchor heavy band behind you. Step forward into a deep lunge with band across forehead until torso is angled at 45 degrees. Hold static position against band pull for 20 seconds."
    ),
    (
        "Heavy Backpack Towel-Suspended Incline Neck Row",
        8.7,
        "Backpack-weighted",
        "Drape towel around head with ends gripping a heavy backpack. From a 45-degree hinge stance, lift the backpack purely through cervical extension and retraction."
    ),
    (
        "Four-Way Heavy Band Multi-Directional Rapid Switch",
        8.8,
        "Resistance Bands",
        "Perform 10 seconds of max isometric resistance in all four directions consecutively against heavy bands, testing rapid neuromuscular adaptation under fatigue."
    ),
]

adv_gym_data = [
    # --- GYM: HEAVY CABLE, HARNESS, MACHINE & BARBELL (Gym: 15) ---
    (
        "Heavy Neck Harness Standing Cable Extension",
        8.9,
        "Cable",
        "Fit a commercial leather neck harness connected to a mid-height cable pulley. Load with 25 kg on the stack. Step back into combat stance and execute strict cervical extensions, pausing for 2 seconds at peak contraction."
    ),
    (
        "Heavy Neck Harness Standing Cable Flexion",
        8.8,
        "Cable",
        "Connect front D-ring of neck harness to cable. Face away from stack with 20 kg loaded. Flex chin toward chest against stack resistance, controlling the 3-second eccentric return."
    ),
    (
        "Heavy Neck Harness Seated Plate-Loaded Extension",
        9.1,
        "Barbell",
        "Sit on a flat bench leaning forward at 45 degrees with elbows resting on knees. Suspend a 15-20 kg Olympic plate from the harness chain. Slowly lower plate toward floor, then extend neck upward to parallel."
    ),
    (
        "Plate-Loaded Supine Cervical Flexion Heavy Overload",
        8.9,
        "Barbell",
        "Lie supine on bench with head hanging off. Place a folded towel and a 10 kg Olympic plate on your forehead. Perform 12 slow, controlled cervical curls through complete active flexion."
    ),
    (
        "Plate-Loaded Prone Cervical Extension Heavy Overload",
        9.0,
        "Barbell",
        "Lie prone with head off bench. Place a cushioned 10-15 kg plate across the occiput. Extend head upward until parallel with spine, holding the top position for 2 full seconds."
    ),
    (
        "Plate-Loaded Side-Lying Lateral Flexion Left Overload",
        8.7,
        "Barbell",
        "Lie on right side with head over edge. Rest a cushioned 5 kg plate on left temple. Flex head toward left shoulder, executing 10 strict repetitions without body sway."
    ),
    (
        "Plate-Loaded Side-Lying Lateral Flexion Right Overload",
        8.7,
        "Barbell",
        "Lie on left side with head over edge. Balance 5 kg plate on right temple. Laterally flex upward against gravity, building dense lateral cervical muscle armor."
    ),
    (
        "Machine 4-Way Cervical Flexion Advanced Stack Overload",
        9.0,
        "Machine",
        "Set seat height on commercial 4-way neck machine with heavy pin setting. Flex neck forward into pad, holding peak contraction for 3 seconds per rep to forge anterior cervical density."
    ),
    (
        "Machine 4-Way Cervical Extension Advanced Stack Overload",
        9.2,
        "Machine",
        "Load heavy weight on rear pad of 4-way machine. Extend neck backward through full cam arc, engaging splenius capitis, semispinalis capitis, and upper trapezius under guided overload."
    ),
    (
        "Machine 4-Way Lateral Cervical Flexion Left Stack Overload",
        8.8,
        "Machine",
        "Align left temple against machine pad with heavy counterweight. Execute 10 slow lateral flexions, focusing on muscular burn and joint control without momentum."
    ),
    (
        "Machine 4-Way Lateral Cervical Flexion Right Stack Overload",
        8.8,
        "Machine",
        "Align right temple with machine pad. Flex toward right shoulder against heavy resistance stack, training unilateral cervical strength balance."
    ),
    (
        "Cable Heavy Harness Lateral Neck Flexion Left",
        8.8,
        "Cable",
        "Attach harness side ring to mid-pulley with 15 kg. Stand perpendicular to cable column and laterally flex head away from stack across 10 controlled repetitions."
    ),
    (
        "Cable Heavy Harness Lateral Neck Flexion Right",
        8.8,
        "Cable",
        "Connect harness side ring to cable with 15 kg. Stand with left side to column and flex head toward right shoulder, resisting the heavy lateral shear force."
    ),
    (
        "Cable Head Harness 360-Degree Static Table Lock",
        9.1,
        "Cable",
        "Attach heavy cable to harness at table height. Step out into tournament stance and hold static cervical alignment against 25 kg of stack tension for 20 seconds."
    ),
    (
        "Heavy Barbell Shrug With Cervical Harness Isometric Pull",
        9.2,
        "Barbell",
        "Hold a heavy loaded Olympic barbell at thigh level while a head harness is attached to a floor weight plate. Shrug shoulders upward while maintaining an unyielding chin tuck against dual loading vectors."
    ),
]

if __name__ == "__main__":
    print(f"Advanced Home Count: {len(adv_home_data)} (Target: 35)")
    print(f"Advanced Gym Count: {len(adv_gym_data)} (Target: 15)")
    print(f"Total Advanced Count: {len(adv_home_data) + len(adv_gym_data)} (Target: 50)")
    assert len(adv_home_data) == 35
    assert len(adv_gym_data) == 15
    for item in adv_home_data + adv_gym_data:
        assert 8.1 <= item[1] <= 9.2, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Advanced exercise: {item[0]}"
    print("Advanced validation passed!")
