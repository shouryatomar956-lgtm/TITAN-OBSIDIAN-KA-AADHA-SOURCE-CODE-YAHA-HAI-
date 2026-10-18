#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 10: NECK STRENGTH - ELITE TIER (Total: 30 Exercises)
# 21 Home (70%) + 9 Gym (30%)
# Validated Combat Sports Conditioning, Hyper-Advanced Levers,
# Severe Mechanical Disadvantage, and Mandatory 1.5 Repetition Protocol / Static-Active Locks
# Scores strictly bounded between 9.3 and 10.0
# ==============================================================================

elite_home_data = [
    # --- ELITE HOME: HYPER-LEVER BRIDGES & HEAVY BACKPACK / MULTI-BAND (21) ---
    (
        "Hands-Free Wrestler Back Bridge 1.5 Repetition Roll",
        9.8,
        "Bodyweight",
        "In a full unassisted wrestler back bridge on feet and crown of skull with arms folded, execute the strict 1.5 repetition protocol: roll from crown to occiput through full active range, roll forward halfway under continuous compressive load, re-drive back into peak occipital extension, then return to neutral under 4-second eccentric control."
    ),
    (
        "Hands-Free Wrestler Front Bridge 1.5 Protocol Forehead Roll",
        9.7,
        "Bodyweight",
        "Set up in a knees-elevated front bridge with hands clasped behind back. Execute the strict 1.5 repetition protocol: roll from crown forward until nose grazes mat, return halfway under massive neck flexor tension, drive back into maximum forward range, then slowly push back to starting alignment."
    ),
    (
        "Heavy Backpack Supine Cervical Curl 1.5 Repetition Overload",
        9.7,
        "Backpack-weighted",
        "Lie supine with head extending off bench, holding a 15 kg weighted backpack on forehead with towel buffer. Execute the strict 1.5 repetition protocol: curl chin to chest through full flexion, lower halfway under continuous tension, re-contract into peak carpal flexion, then control a 4-second descent to start."
    ),
    (
        "Heavy Backpack Prone Cervical Extension 1.5 Protocol Overload",
        9.9,
        "Backpack-weighted",
        "Lie prone with head off bench holding a 15 kg backpack across occiput. Execute the strict 1.5 repetition protocol: extend head upward until parallel with spine, lower halfway, drive back into maximum cervical extension, then lower through a punishing 4-second eccentric reset."
    ),
    (
        "Elevated Feet Wrestler Back Bridge 1.5 Pulse Cycle",
        9.8,
        "Bodyweight",
        "Elevate feet 18 inches on a sturdy platform with head on mat and hands folded on chest. Execute the strict 1.5 repetition protocol: lower hips 3 inches, drive hips and neck into peak bridge extension, lower 1.5 inches, pulse back into maximum extension lock, then hold static for 5 seconds."
    ),
    (
        "Heavy Backpack Side-Lying Lateral Neck Flexion 1.5 Left",
        9.6,
        "Backpack-weighted",
        "Lie on right side with head over edge, balancing a 10 kg backpack on left temple. Execute the strict 1.5 repetition protocol: flex laterally toward ceiling through full active arc, lower halfway, pulse back into peak lateral contraction, then lower over 4 controlled seconds."
    ),
    (
        "Heavy Backpack Side-Lying Lateral Neck Flexion 1.5 Right",
        9.6,
        "Backpack-weighted",
        "Lie on left side with head over edge, balancing 10 kg backpack on right temple. Execute the strict 1.5 repetition protocol: laterally flex head toward right shoulder, lower halfway under continuous strain, pulse back to peak contraction, then lower slowly."
    ),
    (
        "Quad-Band High-Tension Cervical Extension 1.5 Snap",
        9.7,
        "Resistance Bands",
        "Anchor four heavy bands at eye level behind head. Execute the strict 1.5 repetition protocol: drive neck backward into full extension against extreme elastic recoil, return halfway under tension, snap back into peak posterior lockout, then control a 4-second eccentric reset."
    ),
    (
        "Quad-Band High-Tension Cervical Flexion 1.5 Drive",
        9.6,
        "Resistance Bands",
        "Anchor four heavy bands behind you over forehead. Execute the strict 1.5 repetition protocol: pull chin into deep chest flexion, release halfway, drive back into maximum flexion contraction, then return smoothly under control."
    ),
    (
        "Hands-Free Lateral Wrestler Bridge 1.5 Protocol Roll Left",
        9.8,
        "Bodyweight",
        "In an arched bridge, rotate bodyweight onto the left temple ridge with arms folded. Execute the strict 1.5 repetition protocol: roll through full lateral excursion, return halfway under massive shear, surge back into maximum lateral load, then reset to center."
    ),
    (
        "Hands-Free Lateral Wrestler Bridge 1.5 Protocol Roll Right",
        9.8,
        "Bodyweight",
        "In a back bridge, roll bodyweight onto right temple with arms folded. Execute the strict 1.5 repetition protocol: drive into peak right lateral bridge, return halfway, pulse back into maximum lateral engagement, then return to neutral."
    ),
    (
        "Heavy Band 360-Degree Iron Neck Isometric Stress Hold 1.5",
        9.9,
        "Resistance Bands",
        "With dual maximum-tension bands strapped to head, execute the strict 1.5 repetition protocol: rotate body 180 degrees into peak multi-axis shear, yield 45 degrees back, surge into full 180-degree lock, then complete the full 360-degree circuit under unyielding tension."
    ),
    (
        "Backpack-Weighted Inverted Neck Bridge Push-Up 1.5",
        9.9,
        "Backpack-weighted",
        "In an inverted headstand bridge with an 8 kg backpack strapped to torso, execute the strict 1.5 repetition protocol: lower forehead to mat, push up through neck extensors to full height, lower halfway, drive back to full extension, then reset."
    ),
    (
        "Heavy Band Standing Combat Diagonal 1.5 Snap Left",
        9.6,
        "Resistance Bands",
        "Anchor heavy bands high to side. Execute the strict 1.5 repetition protocol: pull head diagonally across toward opposite hip, allow band to recoil halfway, drive back into peak rotational flexion, then reset under 4-second tempo."
    ),
    (
        "Heavy Band Standing Combat Diagonal 1.5 Snap Right",
        9.6,
        "Resistance Bands",
        "Anchor heavy bands at opposing high corner. Execute the strict 1.5 repetition protocol: pull head down and across to opposite hip, yield halfway under elastic pull, surge into peak contraction, then lower with control."
    ),
    (
        "Dual-Band Antagonistic Cervical Tug-of-War 1.5 Extreme Hold",
        9.9,
        "Resistance Bands",
        "Under massive bidirectional band tension from opposing walls, execute the strict 1.5 repetition protocol: displace head 1 inch forward against anterior band, return halfway, drive back into full 1-inch forward displacement, then hold static center for 15 seconds."
    ),
    (
        "Backpack-Loaded Quadruped Cervical Extension 1.5 Overload",
        9.5,
        "Backpack-weighted",
        "On all fours with a 15 kg backpack on occiput, execute the strict 1.5 repetition protocol: extend head upward to ceiling, lower halfway under massive gravity load, pulse back to peak extension, then lower through a 4-second eccentric phase."
    ),
    (
        "Hands-Free 360-Degree Wrestler Skull Pivot Roll 1.5",
        10.0,
        "Bodyweight",
        "From an unassisted front bridge, execute the strict 1.5 repetition protocol: pivot skull from forehead to left temple to crown, reverse halfway to left temple, drive forward through crown to right temple, completing a full torque cycle under bodyweight load."
    ),
    (
        "Heavy Backpack Towel-Suspended Cervical Deadlift 1.5",
        9.7,
        "Backpack-weighted",
        "Drape towel around head holding a 20 kg backpack in a 45-degree hinge. Execute the strict 1.5 repetition protocol: lift weight purely through cervical extension and retraction, lower halfway, pulse back to peak contraction, then lower to floor."
    ),
    (
        "Wall-Facing Inverted Front Bridge 1.5 Maximum Pulse",
        9.5,
        "Bodyweight",
        "Lean 80% bodyweight into a wall-mounted foam block with forehead. Execute the strict 1.5 repetition protocol: drive maximal anterior cervical pressure for 6 seconds, reduce effort by half, surge back to 100% maximal voluntary torque for 6 seconds, then disengage."
    ),
    (
        "Hyper-Advanced Multi-Angle Cervical Stress Matrix 1.5",
        10.0,
        "Bodyweight",
        "Transition between hands-free front bridge, back bridge, and lateral bridge. In each station, execute the strict 1.5 repetition protocol with full excursion followed by an immediate half-pulse under continuous time-under-tension."
    ),
]

elite_gym_data = [
    # --- ELITE GYM: HEAVY HARNESS, CABLES, CHAINS & 4-WAY MACHINE (9) ---
    (
        "Heavy Neck Harness Extensions 1.5",
        10.0,
        "Barbell",
        "Sit on bench leaning forward with a commercial harness suspending 25-30 kg of Olympic plates. Execute the strict 1.5 repetition protocol: extend neck upward through full concentric range, lower halfway under continuous plate tension, re-contract to peak extension, then control a 4-second eccentric descent."
    ),
    (
        "Hyper-Advanced Multi-Angle Iron Neck Isometric Stress Hold",
        10.0,
        "Cable",
        "Connect an Iron Neck device or multi-angular cable harness with 30 kg stack load. Execute the strict 1.5 repetition protocol: rotate into full 90-degree lateral torque, yield 45 degrees back under tension, surge into peak rotational lockout, then maintain an unyielding 15-second static-active combat lock."
    ),
    (
        "Plate-Loaded Supine Cervical Flexion 1.5 Maximum Overload",
        9.8,
        "Barbell",
        "Lie supine with head off bench holding a 15 kg Olympic plate on forehead. Execute the strict 1.5 repetition protocol: curl chin to chest through full range, lower halfway, pulse back into peak flexion, then lower through complete 4-second eccentric phase."
    ),
    (
        "Plate-Loaded Prone Cervical Extension 1.5 Maximum Overload",
        9.9,
        "Barbell",
        "Lie prone with head off bench holding a 20 kg plate on occiput. Execute the strict 1.5 repetition protocol: extend head upward until parallel with spine, lower halfway, drive back into maximum extension, then lower under strict 4-second control."
    ),
    (
        "Heavy Neck Harness Standing Cable Extension 1.5 Protocol",
        9.9,
        "Cable",
        "Attach heavy harness to cable set at chest height with 30 kg on stack. Execute the strict 1.5 repetition protocol: extend neck backward into full contraction, yield halfway, surge back into peak lockout, then reset under 4-second eccentric control."
    ),
    (
        "Heavy Neck Harness Standing Cable Flexion 1.5 Protocol",
        9.8,
        "Cable",
        "Connect front D-ring to cable with 25 kg. Face away from machine. Execute the strict 1.5 repetition protocol: flex chin toward sternum against stack, allow stack to pull head back halfway, drive back into peak flexion, then lower under control."
    ),
    (
        "Machine 4-Way Cervical Flexion 1.5 Full Stack Overload",
        9.9,
        "Machine",
        "Set 4-way machine pad on forehead with near-maximum pin weight. Execute the strict 1.5 repetition protocol: flex neck forward through full guided cam arc, yield halfway, pulse back to peak flexion, then control the 4-second eccentric return."
    ),
    (
        "Machine 4-Way Cervical Extension 1.5 Full Stack Overload",
        10.0,
        "Machine",
        "Set rear pad against occiput with maximum stack weight. Execute the strict 1.5 repetition protocol: extend neck backward into full contraction, lower halfway, snap back into peak extension, then control descent through complete 4-second tempo."
    ),
    (
        "Cable Heavy Harness Lateral Neck Flexion 1.5 Extreme",
        9.8,
        "Cable",
        "Attach harness side ring to cable with 20 kg. Stand perpendicular to column. Execute the strict 1.5 repetition protocol: laterally flex head away from stack, release halfway under tension, pulse back to peak lateral contraction, then lower over 4 seconds."
    ),
]

if __name__ == "__main__":
    print(f"Elite Home Count: {len(elite_home_data)} (Target: 21)")
    print(f"Elite Gym Count: {len(elite_gym_data)} (Target: 9)")
    print(f"Total Elite Count: {len(elite_home_data) + len(elite_gym_data)} (Target: 30)")
    assert len(elite_home_data) == 21
    assert len(elite_gym_data) == 9
    for item in elite_home_data + elite_gym_data:
        assert 9.3 <= item[1] <= 10.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" in item[3], f"1.5 repetition protocol missing in Elite exercise: {item[0]}"
    print("Elite validation passed!")
