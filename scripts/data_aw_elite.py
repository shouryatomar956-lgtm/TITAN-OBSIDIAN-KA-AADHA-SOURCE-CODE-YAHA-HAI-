#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 11: ARM WRESTLING PRACTICE - ELITE TIER (Total: 60 Exercises)
# 42 Home (70%) + 18 Gym (30%)
# Validated Combat Sports Biomechanics, Arm Wrestling Kinematics, Hyper-Advanced Levers,
# Severe Mechanical Disadvantage, and Mandatory 1.5 Repetition Protocol / Static-Active Locks
# Scores strictly bounded between 9.3 and 10.0
# ==============================================================================

elite_home_data = [
    # --- ELITE HOME: HYPER-LEVER PRONATION & POSTING TOPROLL (10) ---
    (
        "Heavy Judo-Strap Metacarpal Pronation 1.5 Protocol Lock",
        9.7,
        "Backpack-weighted",
        "Thread a thick martial arts judo strap over the thumb web and distal radial styloid attached to a maximal backpack load. Execute the strict 1.5 repetition protocol: perform a full-range concentric pronation twist against gravity, lower halfway under continuous tension, re-contract into full pronation pulse, then execute a 4-second eccentric descent to complete one repetition."
    ),
    (
        "Quad-Band High-Posting Toproll 1.5 Repetition Crack",
        9.8,
        "Resistance Bands",
        "Anchor four heavy bands high on door. Grip strap over knuckles and thumb. Execute the strict 1.5 repetition protocol: drive an explosive full-range high-post rising pull with inward pronation roll, return 50% toward neutral under intense elastic shear, snap back into peak pronated lockout, then lower eccentrically over 3 seconds."
    ),
    (
        "Table-Edge Weighted Towel Pronation Drag 1.5 Repetition Cycle",
        9.6,
        "Backpack-weighted",
        "Wrap a heavy towel around hand and thumb connected to a weighted backpack hanging off table. Perform the strict 1.5 repetition protocol: execute a full 4-inch elbow drag while rotating forearm into pronation, release back 2 inches under continuous time-under-tension, drive back into maximum rearward drag and pronation, then control the descent."
    ),
    (
        "Doorframe Sledgehammer Severe Lever Pronation 1.5 Pulse",
        9.5,
        "Backpack-weighted",
        "Hold a heavy sledgehammer or weighted shaft horizontally by the extreme tail with thumb facing ceiling. Execute the strict 1.5 repetition protocol: pronate upward to level with floor, lower 45 degrees, pulse back to horizontal alignment against extreme lever mechanical disadvantage, then slowly lower over 4 seconds."
    ),
    (
        "Dual-Anchor Band Low-Cross Pronation 1.5 Repetition Sweep",
        9.7,
        "Resistance Bands",
        "Anchor heavy dual bands at opposing floor corners. Grip with thumb-wrap loop. Execute the strict 1.5 repetition protocol: sweep hand diagonally across chest into full pronation, yield halfway against the band's rotational torque, surge back into max pronation lock, followed by a controlled 4-second eccentric reset."
    ),
    (
        "Judo-Belt Suspended Backpack High-Post 1.5 Repetition Lift",
        9.8,
        "Backpack-weighted",
        "Loop belt across index knuckle and thumb web. In combat stance with 80-degree elbow lock, execute the strict 1.5 repetition protocol: lift heavy backpack straight off floor using pure radial rise and pronation, lower 2 inches without touching ground, pulse upward into peak elevation, then lower completely."
    ),
    (
        "Double Band Thumb-Line Defensive Toproll 1.5 Recovery",
        9.6,
        "Resistance Bands",
        "Anchor heavy bands at table height. Start in neutral. Execute the strict 1.5 repetition protocol: drive lat backpressure while snapping thumb into defensive pronation, yield halfway to simulate losing hand control, re-accelerate into maximum counter-pronation, then slowly return to starting tension."
    ),
    (
        "Heavy Asymmetric Backpack Eccentric Pronation 1.5 Lock",
        9.5,
        "Backpack-weighted",
        "Strap backpack weight strictly to thumb side of hand. Execute the strict 1.5 repetition protocol: rotate into full pronation off table edge, lower halfway against gravitational lever, contract back into peak inward twist, then control a punishing 5-second eccentric descent into supination."
    ),
    (
        "Banded Table-Pad Isometric Toproll Extreme 1.5 Cycle",
        9.9,
        "Resistance Bands",
        "Plant elbow on table pad against maximum band resistance. Execute the strict 1.5 repetition protocol: pull hand into full pronation and cupping, open elbow angle 15 degrees under continuous isometric tension, snap back into tightly closed 80-degree table lock, then slowly eccentric release."
    ),
    (
        "Door-Anchor High-Angle Posting Pronation 1.5 Repetition Pulley",
        9.7,
        "Resistance Bands",
        "Anchor band at high doorframe with judo strap. Execute the strict 1.5 repetition protocol: pull downward along posting trajectory into full pronation, allow band to pull hand up halfway, drive back down into winning pad position, then control eccentric return."
    ),

    # --- ELITE HOME: HYPER-LEVER WRIST CUPPING & FLEXION (9) ---
    (
        "Thick-Handle Weighted Backpack 1.5 Repetition Wrist Curl",
        9.7,
        "Backpack-weighted",
        "Wrap a thick dense cylinder around backpack straps to create a 3.5-inch diameter handle. Execute the strict 1.5 repetition protocol: curl wrists from full extension into maximum carpal flexion, lower halfway under continuous strain, pulse back into peak contraction, then lower through a strict 4-second eccentric phase."
    ),
    (
        "Dual-Band Table-Pad Deep Hook Cupping 1.5 Protocol Snap",
        9.8,
        "Resistance Bands",
        "Anchor dual heavy bands at floor level. Set elbow on table pad. Execute the strict 1.5 repetition protocol: snap wrist into maximum flexion against massive elastic load, yield halfway through 45 degrees of carpal extension, re-cup violently into peak hook flexion, then release under controlled eccentric tempo."
    ),
    (
        "Heavy Backpack Palmar Compression 1.5 Repetition Flexion",
        9.6,
        "Backpack-weighted",
        "Rest forearm flat across table with wrist hanging over edge. Support near-maximal backpack load on open palm. Execute the strict 1.5 repetition protocol: curl wrist upward into full flexion, lower halfway under extreme time-under-tension, contract back to peak, then lower over 4 seconds."
    ),
    (
        "Thick Towel Inverted Doorframe Cupping 1.5 Repetition Hang",
        9.9,
        "Bodyweight",
        "Drape two thick towels over door top. Grip towels with deeply cupped wrists. Execute the strict 1.5 repetition protocol: pull into full bodyweight flexion with elbows at 90 degrees, lower halfway, pull back into maximum cupping contraction, then slowly lower feet to floor."
    ),
    (
        "Banded Fingertip-To-Carpal Deep Hook 1.5 Closure Cycle",
        9.7,
        "Resistance Bands",
        "Stand on heavy looped bands with handles at distal fingertips. Execute the strict 1.5 repetition protocol: roll fingers into palm and snap wrist into deep flexion, open hand halfway under continuous tension, re-crush into maximum hook closure, then extend fingers slowly over 4 seconds."
    ),
    (
        "Kneeling Table-Edge Heavy Hook 1.5 Repetition Isometric Hold",
        9.8,
        "Backpack-weighted",
        "Kneel at table with elbow on pad. Grip heavy backpack via thick strap. Execute the strict 1.5 repetition protocol: pull wrist into maximum flexion, allow load to drag wrist open halfway, snap wrist back into deep hook lock, then lower under control."
    ),
    (
        "Resistance Band Low-Pulley Simulation 1.5 Cupping Sweep",
        9.6,
        "Resistance Bands",
        "Anchor heavy band low. Set elbow on pad. Execute the strict 1.5 repetition protocol: curl wrist inward against rearward resistance, extend halfway, re-flex into peak carpal contraction, then lower eccentrically over 3 seconds."
    ),
    (
        "Towel-Wrapped Heavy Water Jug 1.5 Wrist Flexion Drag",
        9.5,
        "Backpack-weighted",
        "Rest forearm on thigh. Grip heavy backpack via thick rolled towel. Execute the strict 1.5 repetition protocol: curl wrist up and drag elbow backward 3 inches, yield halfway forward, pull back into maximum flexion drag, then return to start."
    ),
    (
        "Heavy Band Seated Concentration 1.5 Hook Flexion",
        9.7,
        "Resistance Bands",
        "Brace elbow on inner knee with heavy band under foot. Execute the strict 1.5 repetition protocol: curl wrist into full ulnar-biased flexion, lower halfway under massive elastic tension, pulse back into peak contraction, then lower over 4 controlled seconds."
    ),

    # --- ELITE HOME: HYPER-LEVER RISING & RADIAL DEVIATION (8) ---
    (
        "Judo Belt Heavy Backpack 1.5 Repetition Rising Deadlift",
        9.8,
        "Backpack-weighted",
        "Wrap judo belt across index knuckle and thumb web connected to maximal backpack load. Execute the strict 1.5 repetition protocol: lift weight off floor using pure radial wrist rise, lower 2 inches without grounding, pulse back into peak radial elevation, then lower completely under control."
    ),
    (
        "Triple-Band Low-Anchor Hammer Rising 1.5 Protocol Pull",
        9.7,
        "Resistance Bands",
        "Anchor three heavy bands under foot. Hold in vertical hammer fist with 85-degree elbow lock. Execute the strict 1.5 repetition protocol: cock wrist into full upward radial deviation, lower halfway, drive back into maximum rise against immense band recoil, then lower over 3 seconds."
    ),
    (
        "Table-Edge Supported Heavy Sledgehammer 1.5 Rising Lever",
        9.6,
        "Backpack-weighted",
        "Rest forearm flat on table with wrist past edge. Grip heavy weighted lever in hammer orientation. Execute the strict 1.5 repetition protocol: elevate lever tip upward through radial deviation, lower halfway, re-cock to full rise, then lower over 4 seconds."
    ),
    (
        "Banded High-Post Table Pad 1.5 Repetition Isometric Lock",
        9.9,
        "Resistance Bands",
        "Anchor heavy band across table. Set hand in maximum rise with knuckles high. Execute the strict 1.5 repetition protocol: elevate to peak rise against extreme band tension, yield 30% of height, surge back into maximum high-post lockout, then slowly release."
    ),
    (
        "Backpack Strap Thumb-Web 1.5 Repetition Rising Elevator",
        9.5,
        "Backpack-weighted",
        "Thread strap over thumb web. Stand in tournament stance. Execute the strict 1.5 repetition protocol: lift heavy backpack purely through wrist rise, lower halfway under continuous tension, re-elevate to peak height, then lower smoothly to floor."
    ),
    (
        "Wall-Braced Hammer Rising Lever 1.5 Maximum Pulse",
        9.4,
        "Bodyweight",
        "Brace forearm against wall corner at eye level. Execute the strict 1.5 repetition protocol: drive maximal static rising force upward into wall, reduce effort to 50%, surge back to 100% maximal voluntary contraction, then relax."
    ),
    (
        "Resistance Band Cross-Body High-Post 1.5 Sweep",
        9.7,
        "Resistance Bands",
        "Anchor heavy band low and across. Step into stance. Execute the strict 1.5 repetition protocol: pull upward and diagonally across face into maximum rise, yield halfway, drive back into peak posting elevation, then return eccentrically."
    ),
    (
        "Towel-Suspended Heavy Backpack 1.5 Vertical Rising Pulse",
        9.6,
        "Backpack-weighted",
        "Grip vertical rolled towel suspending heavy backpack. Execute the strict 1.5 repetition protocol: cock wrist into full radial deviation, lower halfway, pulse back into peak rise, then lower under 4-second eccentric control."
    ),

    # --- ELITE HOME: HYPER-LEVER SUPINATION & HOOK (8) ---
    (
        "Heavy Backpack Supinated Bicep-Lock 1.5 Repetition Floor Drag",
        9.8,
        "Backpack-weighted",
        "Grip heavy backpack with underhand supinated grip and cupped wrist. Execute the strict 1.5 repetition protocol: drag weight backward 4 inches across carpet with 85-degree locked elbow, yield forward 2 inches under continuous tension, re-drag backward into max hook lock, then reset."
    ),
    (
        "Dual-Band Table-Pad Deep Hook Supination 1.5 Pull",
        9.7,
        "Resistance Bands",
        "Anchor heavy dual bands to side. Plant elbow on table pad in deep hook posture. Execute the strict 1.5 repetition protocol: pull hand inward toward chest in full supination, yield halfway, drive back into deep hook lockout, then control eccentric release over 4 seconds."
    ),
    (
        "Doorframe Supinated Bone-Lock 1.5 Maximum Isometric",
        9.5,
        "Bodyweight",
        "Step in doorway with supinated wrist against frame and elbow pinned to ribs. Execute the strict 1.5 repetition protocol: drive maximal whole-body inward hook compression into frame for 6 seconds, reduce pressure by half, surge back to 100% maximal pressure for 6 seconds, then disengage."
    ),
    (
        "Resistance Band Offset Heavy Supination 1.5 Curl",
        9.6,
        "Resistance Bands",
        "Loop band around pinky side of palm. Execute the strict 1.5 repetition protocol: curl into full supination against band's rotational pull, lower halfway, re-supinate violently to peak, then lower through a 4-second eccentric phase."
    ),
    (
        "Table-Edge Towel Hook Drag Off Pad 1.5 Repetition Cycle",
        9.7,
        "Backpack-weighted",
        "Rest elbow on table pad with towel through heavy backpack. Execute the strict 1.5 repetition protocol: drag elbow backward into deep hook containment, slide forward 2 inches, re-drag backward to pad edge, then control the load."
    ),
    (
        "Banded Low-Pulley Hook Lock 1.5 Repetition Hold",
        9.9,
        "Resistance Bands",
        "Anchor heavy band low across table. Set elbow on pad. Execute the strict 1.5 repetition protocol: lock hand into deep supinated hook against heavy tension, yield 30% of angle, snap back into peak chest-clamped lock, then slowly eccentric return."
    ),
    (
        "Backpack Supinated Short-Range 1.5 Bicep Pulses",
        9.5,
        "Backpack-weighted",
        "Hold heavy backpack in underhand grip with elbow at 90 degrees. Execute the strict 1.5 repetition protocol: curl upward through 15 degrees, lower halfway, pulse back to peak contraction, then lower under strict control."
    ),
    (
        "Resistance Band Cross-Body Supination 1.5 Snap",
        9.6,
        "Resistance Bands",
        "Anchor heavy band at waist height. Execute the strict 1.5 repetition protocol: snap hand into deep supination across torso, allow band to pull hand back halfway, re-accelerate into full hook dive, then return under control."
    ),

    # --- ELITE HOME: HYPER-LEVER SIDE PRESSURE & BACKPRESSURE (7) ---
    (
        "Heavy Resistance Band Table Side-Pressure 1.5 Pin Slam",
        9.9,
        "Resistance Bands",
        "Anchor massive looped band perpendicular to table. Plant elbow on pad with shoulder committed behind hand. Execute the strict 1.5 repetition protocol: drive hand laterally downward toward pin pad against extreme tension, release 50% of the distance, slam back into full pin position, then return over 4 seconds."
    ),
    (
        "Doorframe Full-Body Lateral Side-Pressure 1.5 Protocol Drive",
        9.6,
        "Bodyweight",
        "Brace inner forearm against doorframe at table height with elbow locked to hip. Execute the strict 1.5 repetition protocol: exert maximal whole-body side pressure for 6 seconds, reduce effort to 50%, surge back to 100% maximal voluntary torque for 6 seconds, then disengage."
    ),
    (
        "Table-Pad Elbow-Anchored Towel 1.5 Side Press",
        9.7,
        "Backpack-weighted",
        "Set elbow on table pad. Thread towel through heavy backpack hanging off table edge. Execute the strict 1.5 repetition protocol: drive forearm inward across pad lifting load, lower halfway, drive back into full internal rotation, then control the descent."
    ),
    (
        "Resistance Band 90-Degree Frame Lock 1.5 Lateral Walkout",
        9.8,
        "Resistance Bands",
        "Anchor thick band at chest height. Lock arm at 90 degrees against chest in side-pressure frame. Execute the strict 1.5 repetition protocol: step laterally into maximum tension, yield 1 step inward, surge back out into extreme frame stretch, then hold static for 5 seconds before resetting."
    ),
    (
        "Heavy Resistance Band 90-Degree Locked Lat Row 1.5 Cycle",
        9.8,
        "Resistance Bands",
        "Anchor heavy band at chest level on door. Lock elbow at 90 degrees in hammer grip. Execute the strict 1.5 repetition protocol: drive body backward using latissimus dorsi, yield 50% of range, pull back into peak backpressure lockout, then return under 4-second eccentric control."
    ),
    (
        "Backpack Hammer-Grip Brachioradialis Table Drag 1.5 Repetition",
        9.7,
        "Backpack-weighted",
        "Rest elbow on table pad with heavy backpack in hammer grip. Execute the strict 1.5 repetition protocol: drag elbow backward 3 inches across pad, slide forward halfway, re-drag into maximum backpressure, then control the load."
    ),
    (
        "Judo Belt Suspended Backpack Hammer 1.5 Protocol Hold",
        9.9,
        "Backpack-weighted",
        "Grip judo belt suspending heavy backpack with 85-degree locked elbow. Execute the strict 1.5 repetition protocol: lift load 3 inches with backpressure, lower 1.5 inches, pulse back into peak lock, then hold for 10 seconds of unyielding static tension."
    ),
]

elite_gym_data = [
    # --- ELITE GYM: CABLE PRONATION & TOPROLL (5) ---
    (
        "Cable Judo Strap High-Anchor Pronation Roll 1.5 Protocol",
        9.8,
        "Cable",
        "Attach a heavy judo belt to a high cable pulley. Wrap strap over thumb and across back of hand. Plant elbow on table pad. Execute the strict 1.5 repetition protocol: execute a full-range downward pronation roll against heavy stack weight, yield halfway under continuous stack tension, surge back into peak pronated lockout, then lower eccentrically over 4 seconds."
    ),
    (
        "Cable Eccentric Handle Heavy Pronation 1.5 Repetition Rotation",
        9.9,
        "Cable",
        "Connect an eccentric (off-center) arm wrestling handle to a mid-pulley. Rest elbow on preacher bench. Execute the strict 1.5 repetition protocol: rotate forearm from neutral into full pronation, yield halfway against the asymmetric axis, snap back into peak pronation, then control the 4-second descent into supination."
    ),
    (
        "Standing Cable Multi-Spinner Heavy Pronation Drag 1.5 Cycle",
        9.9,
        "Cable",
        "Attach multi-spinner cylinder to chest-height cable. Grip top cone in hammer orientation. Execute the strict 1.5 repetition protocol: drag backward into backpressure while rolling thumb into full pronation, release halfway under tension, re-contract into maximum pronated drag, then reset under control."
    ),
    (
        "Cable Wrist Wrench Maximum Pronation Sweep 1.5 Protocol",
        10.0,
        "Cable",
        "Connect a 2.5-inch rolling wrist wrench to a table-height cable. Plant elbow on table pad. Execute the strict 1.5 repetition protocol: sweep hand inward into full pronation against near-maximal stack load, allow wrench to roll back halfway, drive back into peak pronation, then control eccentric return over 4 seconds."
    ),
    (
        "Cable Table-Pad Pronation Extreme 1.5 Isometric Hold",
        9.8,
        "Cable",
        "Connect strap around thumb to mid-height cable. Plant elbow on table pad in winning position. Execute the strict 1.5 repetition protocol: pull into full pronation against the weight stack, yield 30% of torque, drive back into 100% max pronation lockout, then hold static for 10 seconds."
    ),

    # --- ELITE GYM: WRIST CUPPING & FLEXION (4) ---
    (
        "Barbell Heavy Seated Table Wrist Curl 1.5 Repetition Overload",
        9.8,
        "Barbell",
        "Sit on bench with forearms on thighs holding loaded Olympic barbell. Execute the strict 1.5 repetition protocol: curl barbell into full active carpal flexion, lower halfway under massive eccentric tension, pulse back to peak flexion, then lower through complete extension over 4 seconds."
    ),
    (
        "Cable Rolling Thunder Heavy Wrist Flexion 1.5 Repetition Curl",
        9.9,
        "Cable",
        "Attach a 2.375-inch Rolling Thunder handle to low pulley. Stand tall. Execute the strict 1.5 repetition protocol: curl wrist inward against rotating cylinder, allow cylinder to roll fingers halfway open, re-cup forcefully into full flexion, then lower over 4 seconds."
    ),
    (
        "Cable Wrist Wrench Table Heavy Cupping Drag 1.5 Protocol",
        10.0,
        "Cable",
        "Connect thick wrist wrench to table-height cable. Plant elbow on table pad. Execute the strict 1.5 repetition protocol: curl wrist inward while dragging elbow backward 2 inches along pad, yield halfway forward, re-cup and drag back to peak contraction, then control eccentric release."
    ),
    (
        "Cable Thick-Bar Standing Cupping 1.5 Repetition Maximum Hold",
        9.8,
        "Cable",
        "Connect 3-inch thick fat bar to low cable. Stand upright. Execute the strict 1.5 repetition protocol: curl wrists into maximum flexion against heavy stack, lower halfway, snap back into peak flexion, then hold static contraction for 10 seconds."
    ),

    # --- ELITE GYM: RISING & RADIAL DEVIATION (3) ---
    (
        "Cable Low-Pulley Judo Belt Heavy Rising 1.5 Protocol Pull",
        9.9,
        "Cable",
        "Attach judo belt to low cable, wrapped over index knuckle. Plant elbow on table pad. Execute the strict 1.5 repetition protocol: lift wrist upward into maximum radial rise against the stack, lower halfway, surge back into peak radial elevation, then lower eccentrically over 4 seconds."
    ),
    (
        "Cable Multi-Spinner High-Post Rising Vector 1.5 Repetition",
        10.0,
        "Cable",
        "Connect multi-spinner to mid-cable. Grip near top conical flange with elbow on pad. Execute the strict 1.5 repetition protocol: drive wrist upward into rise and backward into backpressure, yield halfway under stack tension, snap back into peak posting lockout, then reset."
    ),
    (
        "Cable Table-Pad Isometric High-Post Extreme 1.5 Lock",
        9.8,
        "Cable",
        "Set mid-pulley at table height with strap over knuckles. Execute the strict 1.5 repetition protocol: elevate into maximum rise against stack, yield 30% of height, surge back into peak lockout, then hold static high-post tension for 12 seconds."
    ),

    # --- ELITE GYM: SUPINATION & HOOK (3) ---
    (
        "Cable Low-Pulley Heavy Supinated Hook 1.5 Repetition Curl",
        9.9,
        "Cable",
        "Attach D-handle to low pulley. Set elbow on preacher pad in deep hook posture. Execute the strict 1.5 repetition protocol: curl cable upward toward opposite clavicle in full supination, lower halfway under heavy tension, pulse back to peak hook flexion, then lower over 4 seconds."
    ),
    (
        "Cable Table-Pad Deep Hook Isometric Extreme 1.5 Lock",
        10.0,
        "Cable",
        "Set cable level with arm wrestling table. Lock hand into deep supination and wrist flexion on pad. Execute the strict 1.5 repetition protocol: pull into full hook lockout against stack, yield 25% of angle, re-crush into maximum chest-clamped lock, then hold for 10 seconds."
    ),
    (
        "Cable Multi-Spinner Supinated Carpal Drag 1.5 Protocol",
        9.8,
        "Cable",
        "Attach multi-spinner to low pulley. Grip bottom lip with supinated palm. Execute the strict 1.5 repetition protocol: drag backward across table pad in deep hook, yield 2 inches forward, re-drag into peak carpal containment, then control eccentric release."
    ),

    # --- ELITE GYM: SIDE PRESSURE & BACKPRESSURE (3) ---
    (
        "Cable Table-Height Side Pressure Pin Drive 1.5 Protocol Overload",
        10.0,
        "Cable",
        "Set cable pulley level with table pad. Plant elbow on pad with shoulder committed behind hand. Execute the strict 1.5 repetition protocol: drive forearm laterally downward toward pin pad against heavy stack weight, release 50% of the distance, slam back into full pin pad contact, then control return over 4 seconds."
    ),
    (
        "Cable 90-Degree Locked Lat Backpressure Row 1.5 Protocol Overload",
        9.9,
        "Cable",
        "Connect strap to chest-height cable. Lock elbow at 90 degrees in hammer grip. Execute the strict 1.5 repetition protocol: pull body backward using latissimus dorsi, yield halfway forward under stack tension, drive back into maximum backpressure lockout, then lower over 4 seconds."
    ),
    (
        "Cable Multi-Angle Arm Wrestling Frame Extreme 1.5 Lock",
        9.8,
        "Cable",
        "Set pulley at shoulder height. Step into tournament stance with elbow at 85 degrees locked to ribs. Execute the strict 1.5 repetition protocol: pull into full static combat frame, yield 30% under heavy tension, surge back into unyielding frame alignment, then hold static for 10 seconds."
    ),
]

if __name__ == "__main__":
    print(f"Elite Home Count: {len(elite_home_data)} (Target: 42)")
    print(f"Elite Gym Count: {len(elite_gym_data)} (Target: 18)")
    print(f"Total Elite Count: {len(elite_home_data) + len(elite_gym_data)} (Target: 60)")
    assert len(elite_home_data) == 42
    assert len(elite_gym_data) == 18
    for item in elite_home_data + elite_gym_data:
        assert 9.3 <= item[1] <= 10.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" in item[3], f"1.5 repetition protocol missing in Elite exercise: {item[0]}"
    print("Elite validation passed!")
