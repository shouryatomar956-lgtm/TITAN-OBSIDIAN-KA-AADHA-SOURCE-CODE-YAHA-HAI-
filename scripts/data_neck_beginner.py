#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 10: NECK STRENGTH - BEGINNER TIER (Total: 44 Exercises)
# 31 Home (70%) + 13 Gym (30%)
# Validated Physical Therapy, Cervical Spine Stabilization, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 4.0 and 6.0
# ==============================================================================

beg_home_data = [
    # --- CERVICAL RETRACTION & DEEP FLEXOR ACTIVATION (Home: 8) ---
    (
        "Seated Active Cervical Chin Tuck",
        4.6,
        "None",
        "Sit tall with neutral lumbar curve and relaxed shoulders. Keeping eyes and jaw level with the horizon, glide your head straight backward as if creating a double chin. Hold the retracted position for 5 seconds to activate the deep longus colli and longus capitis muscles before releasing smoothly."
    ),
    (
        "Supine Gravity-Assisted Chin Tuck",
        4.8,
        "None",
        "Lie supine on a flat exercise mat with knees bent and feet flat. Gently nod your head as if indicating yes, flattening the back of the cervical spine toward the mat without pressing down forcefully. Maintain steady diaphragmatic breathing for a 6-second hold."
    ),
    (
        "Wall-Supported Cervical Retraction Glide",
        4.5,
        "None",
        "Stand with upper back and sacrum in contact with a flat wall. Retract your chin horizontally backward until the occiput makes gentle contact with the wall surface. Hold for 5 seconds, ensuring the sternocleidomastoid remains relaxed without clenching the jaw."
    ),
    (
        "Prone Cervical Retraction on Forearms",
        4.9,
        "Bodyweight",
        "Adopt a prone sphinx position resting on your forearms with chest slightly elevated. Looking directly down at the floor, pull your chin back into full retraction against gravity. Hold for 5 seconds, feeling activation across the lower cervical stabilizers and mid-trapezius."
    ),
    (
        "Quadruped Neutral Cervical Alignment Hold",
        4.7,
        "Bodyweight",
        "Position yourself on all fours with wrists below shoulders and knees below hips. Maintain a completely horizontal spine from sacrum to skull. Retract the chin slightly to eliminate cervical sagging and hold the static neutral alignment for 20 continuous seconds."
    ),
    (
        "Towel-Assisted Cervical Nodding Glide",
        4.4,
        "None",
        "Drape a rolled hand towel behind the mid-cervical curve (C4-C5), holding both ends forward with light tension. Gently nod the chin downward over the towel pivot, restoring anterior cervical glide while decompressing the suboccipital region."
    ),
    (
        "Standing Wall-Ball Occipital Stabilization Hold",
        5.1,
        "None",
        "Place a small soft foam ball between the back of your head and a wall. Press the occiput backward with 20% maximal voluntary effort to compress the ball slightly, holding steady for 12 seconds to stimulate suboccipital postural mechanoreceptors."
    ),
    (
        "Supine Head-Off-Pillow Deep Flexor Lift",
        5.2,
        "Bodyweight",
        "Lie supine with head resting on a thin pillow. Perform a chin tuck, then lift the skull just 1 centimeter off the pillow surface. Hold for 5 seconds while keeping the jaw unclenched, targeting the deep neck flexors over superficial musculature."
    ),

    # --- MANUAL ISOMETRIC MULTI-DIRECTIONAL RESISTANCE (Home: 12) ---
    (
        "Seated Anterior Manual Resistance Isometric Flexion",
        4.8,
        "None",
        "Sit tall in a supportive chair. Place the palms of both hands against your forehead. Attempt to gently nod your head forward while matching the force equally with your hands, maintaining an immovable neutral cervical posture for 10 seconds."
    ),
    (
        "Seated Posterior Manual Resistance Isometric Extension",
        4.9,
        "None",
        "Interlace your fingers behind the occipital ridge. Push your head backward against your clasped hands with gentle, controlled pressure while your hands resist completely, building isometric extensor endurance for 10 seconds."
    ),
    (
        "Seated Right Lateral Manual Cervical Resistance",
        4.7,
        "None",
        "Place the palm of your right hand flat against the right temporal bone above the ear. Attempt to tilt your right ear toward your right shoulder while resisting all movement with your hand, holding the static contraction for 10 seconds."
    ),
    (
        "Seated Left Lateral Manual Cervical Resistance",
        4.7,
        "None",
        "Place your left palm securely against your left temporal region. Drive a gentle lateral flexion force toward the left shoulder against unyielding manual counter-resistance, maintaining total vertical head alignment for 10 seconds."
    ),
    (
        "Seated Right Rotational Manual Cervical Block",
        4.6,
        "None",
        "Rest the heel of your right hand against your right temple and cheekbone. Attempt to turn your head to look over your right shoulder while blocking all rotation with your hand, holding the isometric twist for 8 seconds."
    ),
    (
        "Seated Left Rotational Manual Cervical Block",
        4.6,
        "None",
        "Position your left hand on the left side of your forehead and cheek. Drive rotational torque to the left against firm manual resistance, activating the contralateral sternocleidomastoid and ipsilateral splenius capitis for 8 seconds."
    ),
    (
        "Supine Manual Forehead Flexion Resistance Hold",
        5.0,
        "None",
        "Lie flat on your back with knees bent. Place one hand across your forehead and press your head upward against it with 30% effort, maintaining an unyielding isometric hold for 10 seconds without lifting the shoulders."
    ),
    (
        "Prone Manual Occipital Extension Resistance Hold",
        5.2,
        "None",
        "Lie prone with forehead resting on a folded towel. Place your hands on the back of your head and press your skull upward against manual resistance for 10 seconds, reinforcing the deep cervical erectors."
    ),
    (
        "Side-Lying Manual Lateral Flexion Isometric",
        5.1,
        "None",
        "Lie on your right side with a rolled towel supporting your neck. Place your left hand on the left temple and press upward into the hand for 8 seconds, isolating the left scalenes and upper trapezius stabilizers."
    ),
    (
        "Seated Diagonal Antero-Lateral Manual Resistance",
        4.8,
        "None",
        "Place your right palm over the front-right corner of your forehead. Attempt to flex and rotate toward the right armpit against manual resistance, training integrated diagonal cervical stabilization for 8 seconds."
    ),
    (
        "Seated Diagonal Postero-Lateral Manual Resistance",
        4.9,
        "None",
        "Place your hand on the back-right quadrant of your skull. Push backward and outward at a 45-degree angle against hand resistance, recruiting the splenius cervicis and longissimus capitis for 8 seconds."
    ),
    (
        "Standing Doorframe Forehead Isometric Stabilization",
        4.5,
        "Bodyweight",
        "Place a folded towel over a door jamb at forehead height. Lean forehead gently into the towel with 20% bodyweight pressure, maintaining an aligned cervical spine for 15 seconds of effortless isometric control."
    ),

    # --- CONTROLLED ACTIVE RANGE & LIGHT BAND TRAJECTORIES (Home: 11) ---
    (
        "Standing Light Band Cervical Extension Glide",
        5.4,
        "Resistance Bands",
        "Loop a light loop band around the back of your skull while holding both ends forward at eye level. Slowly push the head backward into the band through full controlled extension, pausing for 2 seconds at peak contraction before resetting."
    ),
    (
        "Standing Light Band Cervical Lateral Flexion",
        5.3,
        "Resistance Bands",
        "Anchor a very light band at ear height to a door frame. Loop the padded strap around the side of your head. Step laterally to create gentle tension, then tilt the ear away from the anchor through a controlled 30-degree arc."
    ),
    (
        "Seated Light Band Resisted Rotation",
        5.2,
        "Resistance Bands",
        "Anchor light resistance band at head height to the side. Loop around the temple and forehead. Slowly rotate head away from the anchor against light elastic resistance, building rotational endurance across 10 deliberate repetitions."
    ),
    (
        "Supine Cervical Nod to Ceiling Reach",
        4.6,
        "None",
        "Lie on back with knees bent. Tuck chin gently, then slowly lift head 2 inches off the mat, looking toward your toes. Lower with a controlled 3-second descent, keeping neck movements smooth and vibration-free."
    ),
    (
        "Prone Edge-of-Bed Cervical Extension",
        5.3,
        "Bodyweight",
        "Lie face down on a bed with head and neck extending past the edge. Start with chin tucked in full flexion, then slowly extend the neck upward until the head is aligned with the spine, holding for 2 seconds."
    ),
    (
        "Side-Lying Edge-of-Bed Lateral Cervical Raise",
        5.2,
        "Bodyweight",
        "Lie on your side on a bed with head hanging over the edge. Slowly lower the ear toward the floor, then laterally flex the neck upward toward the ceiling through a pain-free range of motion."
    ),
    (
        "Standing Light Band Anterior Cervical Flexion",
        5.5,
        "Resistance Bands",
        "Anchor light band behind you at head height. Place band across forehead with a folded towel buffer. Slowly flex head forward bringing chin toward chest against mild elastic resistance, returning under 3-second eccentric control."
    ),
    (
        "Quadruped Light Band Cervical Retraction",
        5.4,
        "Resistance Bands",
        "On all fours, anchor a light band beneath both hands with the loop draped across the back of your head. Push the skull upward toward the ceiling against the band while maintaining an aligned spine."
    ),
    (
        "Seated Active Cervical Controlled Rotation Clock",
        4.3,
        "None",
        "Sit tall with hands resting on thighs. Turn head slowly to the right over 3 seconds, pause for 2 seconds at end-range, return to center, and repeat to the left side, restoring smooth articular surface glide."
    ),
    (
        "Supine Foam Roller Occipital Decompression Nod",
        4.5,
        "None",
        "Rest the base of your skull directly atop a soft foam roller. Gently perform micro-nodding motions of 10 degrees, releasing tension in the rectus capitis posterior and superior oblique muscles."
    ),
    (
        "Wall-Facing Light Band Cervical Retraction Row",
        5.6,
        "Resistance Bands",
        "Anchor a light band at face height. Loop strap around forehead and hold band handles with both hands. Step back and perform a simultaneous chin tuck and rear scapular retraction hold for 8 seconds."
    ),
]

beg_gym_data = [
    # --- GYM: CABLE, MACHINE, & SUPPORTED BENCH (Gym: 13) ---
    (
        "Cable Low-Tension Cervical Flexion With Head Strap",
        5.6,
        "Cable",
        "Attach a padded head harness to a cable pulley set at chest height with the lowest weight plate. Facing away from the machine, perform slow, deliberate cervical flexion through a 30-degree arc with a 3-second eccentric reset."
    ),
    (
        "Cable Low-Tension Cervical Extension With Head Strap",
        5.7,
        "Cable",
        "Facing a mid-height cable pulley with head harness attached, step back into a stable split stance. Slowly extend the neck backward against light stack resistance, engaging the upper trapezius and splenius capitis safely."
    ),
    (
        "Cable Low-Tension Lateral Cervical Flexion",
        5.5,
        "Cable",
        "Stand perpendicular to a cable column with the pulley at ear height. Attach the padded head harness to the side of the head and gently flex the neck away from the column through a controlled, pain-free range."
    ),
    (
        "Machine 4-Way Cervical Flexion Station Beginner Setup",
        5.8,
        "Machine",
        "Adjust seat height on a 4-way neck machine so the forehead pad aligns with the brow line. With minimal pin weight, smoothly flex the neck forward against the circular cam resistance, pausing for 1 second at full flexion."
    ),
    (
        "Machine 4-Way Cervical Extension Station Beginner Setup",
        5.9,
        "Machine",
        "Position the posterior pad of a 4-way neck machine securely against the occiput. Keeping torso upright against the backrest, extend the neck backward in a smooth, continuous path without arching the lower back."
    ),
    (
        "Machine 4-Way Lateral Cervical Flexion Left Station",
        5.6,
        "Machine",
        "Align the lateral pad of the neck machine against the left temporal bone. Gently flex the head toward the left shoulder against the balanced counterweight, maintaining square shoulders throughout."
    ),
    (
        "Machine 4-Way Lateral Cervical Flexion Right Station",
        5.6,
        "Machine",
        "Align the lateral pad against the right side of the head. Flex smoothly toward the right shoulder, emphasizing steady motor control and avoiding any rapid or jerky movements."
    ),
    (
        "Flat Bench Dumbbell Supported Cervical Shrug",
        5.4,
        "Dumbbells",
        "Lie face down on an incline bench holding light dumbbells. Shrug the shoulder blades upward toward the ears while holding the cervical spine in a rigidly packed, neutral chin-tuck position."
    ),
    (
        "Cable Supported Cervical Retraction and Posture Hold",
        5.8,
        "Cable",
        "Attach a rope attachment to a mid-pulley. Hold rope at cheek level while maintaining a firm chin tuck against light cable tension, holding for 12 seconds to build postural thoracic-cervical endurance."
    ),
    (
        "Preacher Bench Prone Light Cervical Extension",
        5.5,
        "Dumbbells",
        "Rest chest over the angled pad of a preacher bench with head extending beyond the top. Place a 1 kg soft plate over the back of the head and slowly extend upward to neutral alignment."
    ),
    (
        "Seated Cable High-Pulley Cervical Decompression Hold",
        5.7,
        "Cable",
        "Sit facing a high pulley with a light head strap. Allow the gentle upward vector to provide mild axial decompression while holding an active chin tuck against 5 kg of stack counter-tension for 10 seconds."
    ),
    (
        "Incline Bench Prone Neck Retraction With Light Dumbbells",
        5.3,
        "Dumbbells",
        "Lie prone on a 30-degree incline bench with light dumbbells hanging downward. Retract your shoulder blades and pull chin straight back into deep retraction, holding the posture for 5 seconds per rep."
    ),
    (
        "Machine Seated Cervical Isometric Block Hold",
        5.9,
        "Machine",
        "Set the arm of a 4-way neck machine in a locked position. Sit upright and exert 30% maximal voluntary force into the forehead pad for a 15-second static isometric conditioning hold."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home Count: {len(beg_home_data)} (Target: 31)")
    print(f"Beginner Gym Count: {len(beg_gym_data)} (Target: 13)")
    print(f"Total Beginner Count: {len(beg_home_data) + len(beg_gym_data)} (Target: 44)")
    assert len(beg_home_data) == 31
    assert len(beg_gym_data) == 13
    for item in beg_home_data + beg_gym_data:
        assert 4.0 <= item[1] <= 6.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Beginner exercise: {item[0]}"
    print("Beginner validation passed!")
