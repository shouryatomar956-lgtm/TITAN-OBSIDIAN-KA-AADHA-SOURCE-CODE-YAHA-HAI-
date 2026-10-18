#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 11: ARM WRESTLING PRACTICE - ADVANCED TIER (Total: 100 Exercises)
# 70 Home (70%) + 30 Gym (30%)
# Validated Combat Sports Biomechanics, Arm Wrestling Kinematics, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 8.1 and 9.2
# ==============================================================================

adv_home_data = [
    # --- PRONATION & POSTING TOPROLL (Home: 15) ---
    (
        "Heavy Judo Belt Thumb-Metacarpal Pronation Lock",
        8.8,
        "Backpack-weighted",
        "Wrap a thick judo belt across the radial styloid and over the thumb metacarpal, attached to a maximum-load backpack. Plant elbow on a dense table pad with a strict 80-degree elbow lock. Lift the backpack off the floor through pure pronation torque, holding static tension for 15 seconds without losing wrist height."
    ),
    (
        "Quad-Band High-Tension Posting Toproll Crack",
        8.9,
        "Resistance Bands",
        "Anchor four heavy resistance bands to top of a doorframe. Loop webbing over knuckles and radial bone. Step into competition stance and drive an aggressive posting riser pull followed by an explosive pronation roll to crack the opponent's wrist across the table line."
    ),
    (
        "Table-Edge Weighted Towel Pronation Drag Off Pad",
        8.6,
        "Backpack-weighted",
        "Thread a thick bath towel through a heavily loaded backpack. Rest elbow on table pad in ready position. Drag elbow backward along the pad while rotating the forearm inward into aggressive pronation, pulling the backpack off the ground via coordinated backpressure."
    ),
    (
        "Double-Band Low-Cross Counter-Hook Pronation Sweep",
        8.7,
        "Resistance Bands",
        "Anchor heavy dual bands at floor level on opposite side. Grip band with thumb-wrap loop. Pull hand diagonally upward and across chest into pronation, reinforcing the counter-hook posting vector used to peel an opponent's fingers and force open their bicep angle."
    ),
    (
        "Doorframe Sledgehammer-Lever Pronator Max Torque Hold",
        8.5,
        "Backpack-weighted",
        "Grip the end of a long sledgehammer or weighted lever arm horizontally with thumb upward. Brace forearm against an interior doorframe at 90-degree elbow flexion. Resist downward gravitational torque for 15 seconds of intense pronator quadratus and teres recruitment."
    ),
    (
        "Backpack Asymmetric-Strap Eccentric Pronation Lower",
        8.6,
        "Backpack-weighted",
        "Load backpack with heavy weight. Thread strap around the thumb. Use both hands to twist forearm into full pronation. Remove assisting hand and fight the heavy load through a slow 6-second eccentric stretch into supination."
    ),
    (
        "High-Resistance Band Thumb-Line Defensive Toproll Recover",
        8.9,
        "Resistance Bands",
        "Anchor heavy band at table level. Loop directly over the thumb knuckle. Set up in neutral position. Drive backpressure with your lat while simultaneously torquing the thumb down toward the floor to mimic defensive hand recovery under heavy match load."
    ),
    (
        "Kneeling Table Pad Pronation Pivot Maximum Isometric",
        8.8,
        "Resistance Bands",
        "Kneel at table with elbow pinned on pad. Pull heavy dual bands into full pronation at 85 degrees elbow flexion. Hold this max torque position for 15 seconds against elastic recoil to harden the medial epicondyle tendon complex."
    ),
    (
        "Heavy Backpack High-Post Radial Pronation Row",
        8.7,
        "Backpack-weighted",
        "Fasten both backpack straps over the radial styloid process. Stand in combat stance and elevate the entire arm structure 4 inches vertically through radial rise before twisting the wrist into pronation and rowing the load backward."
    ),
    (
        "Resistance Band High-Anchor Defensive Toproll Retraction",
        8.8,
        "Resistance Bands",
        "Anchor band at high door hinge. Loop over knuckles. Execute a rapid high-posting riser pull while simultaneously peeling the hand back and rolling thumb inward, neutralizing an opponent's offensive hook attempt."
    ),
    (
        "Doorway Corner Thumb-Pushed Pronation Maximum Lock",
        8.4,
        "Bodyweight",
        "Press the thumb web firmly into an interior corner trim. Generate near-maximal internal rotational force through the forearm and anterior shoulder capsule for 15 seconds of static activation."
    ),
    (
        "Judo Belt Suspended Table Toproll Simulation",
        8.9,
        "Backpack-weighted",
        "Loop judo belt over top of a heavy table and wrap around thumb web. Plant elbow on table pad and pull backward into backpressure while rotating the forearm into pronation, lifting the backpack off the floor."
    ),
    (
        "Banded Pronation Pulley Simulation With Judo Belt Vector",
        9.0,
        "Resistance Bands",
        "Loop judo belt over top of an open door with heavy resistance bands attached. Grip belt in combat hand, step back into deep tournament stance, and execute sharp pronation-driven downward sweeps mimicking professional table pulley action."
    ),
    (
        "Backpack Radial Styloid Pronator High-Tension Pulse",
        8.6,
        "Backpack-weighted",
        "Place forearm on table with wrist hanging 2 inches off edge. With strap across thumb, pulse between neutral and maximum pronation for 8 slow high-tension repetitions, maintaining steady elbow contact."
    ),
    (
        "Resistance Band High-Tension Posting Toproll Lock",
        8.9,
        "Resistance Bands",
        "Set dual bands at eye level. Grip with semi-pronated hand, elevate knuckles above wrist, and hold against heavy tension for 15 seconds to forge unbreakable isometric posting stability."
    ),

    # --- WRIST CUPPING & CARPAL FLEXION (Home: 15) ---
    (
        "Heavy Backpack Thick-Handle Forearm Flexion Over Table",
        8.7,
        "Backpack-weighted",
        "Wrap a thick folded towel around backpack handles to create a 3.5-inch diameter grip. Rest forearms across table edge with wrists extended over edge. Execute heavy wrist curls with strict 2-second peak carpal contractions."
    ),
    (
        "Double Banded Table Wrist Cupping Dynamic Snap",
        8.8,
        "Resistance Bands",
        "Anchor dual heavy bands at floor level. Sit at table with elbow on pad. Grip bands across metacarpal heads and snap wrists into full flexion against the compounding elastic resistance, pausing at peak flexion."
    ),
    (
        "Kneeling Table-Edge Deep Hook Cupping Maximum Hold",
        8.9,
        "Backpack-weighted",
        "Kneel at table with elbow on pad. Connect strap to maximum-load backpack resting on floor. Pull wrist into maximum flexion and hold statically at 85 degrees elbow angle for 15 seconds without letting wrist buckle."
    ),
    (
        "Thick Towel Heavy Inverted Table Cupping Pull-Up",
        8.6,
        "Bodyweight",
        "Drape two thick bath towels over a pull-up bar or sturdy door frame. Grip both towels with deeply cupped wrists and hold a bodyweight dead-hang for 15 seconds with elbows locked at 90 degrees."
    ),
    (
        "Banded Fingertip-To-Carpal Deep Hook Closure",
        8.7,
        "Resistance Bands",
        "Step on heavy looped band. Allow band to roll down to distal finger phalanges, then forcefully curl fingers into palm and finish with deep wrist flexion to mimic closing a crushing hook on an opponent's hand."
    ),
    (
        "Backpack Palmar Compression Heavy Wrist Flexion Pulses",
        8.6,
        "Backpack-weighted",
        "Rest forearm flat along a tabletop with hand extended over edge. Hold heavily loaded backpack across palm and perform 10 deliberate, high-tension wrist flexions without letting the forearm lift off the surface."
    ),
    (
        "Resistance Band Hook-Locked Wrist Flexion Maximum Hold",
        8.9,
        "Resistance Bands",
        "Anchor band at table height. Turn hand into supinated hook orientation and curl wrist inward, holding static carpal flexion at peak contraction against heavy band tension for 15 seconds."
    ),
    (
        "Towel-Wrapped Water Jug Heavy Wrist Flexion Drag",
        8.5,
        "Backpack-weighted",
        "Fill heavy water jugs in a backpack. Wrap towel around handle. Rest forearm on knee and curl wrist upward while simultaneously dragging the elbow backward along the thigh."
    ),
    (
        "Doorframe Isometric Palmar Wrist Deep Crush",
        8.4,
        "Bodyweight",
        "Stand facing door frame. Place cupped palm and fingers against inner wood frame. Exert near-maximal forward and inward flexion pressure for 15 seconds, engaging deep finger and wrist flexors."
    ),
    (
        "Heavy Band Seated Concentration Deep Hook Curl",
        8.8,
        "Resistance Bands",
        "Sit on chair with heavy band anchored under opposite foot. Brace active elbow against inner knee. Perform single-arm concentration wrist curls focusing on pure flexor carpi ulnaris recruitment."
    ),
    (
        "Backpack Strap Ulnar-Biased Heavy Wrist Flexion",
        8.7,
        "Backpack-weighted",
        "Angle backpack strap across the pinky side of the palm. Rest forearm supine on table and curl wrist with an inward ulnar tilt to build targeted offensive hooking power."
    ),
    (
        "Resistance Band Low-Pulley Simulation Heavy Cupping",
        9.0,
        "Resistance Bands",
        "Anchor heavy band low behind a table. Sit in combat position, plant elbow on pad, and curl wrist inward against the backward pull, simulating a battle against an aggressive toproller."
    ),
    (
        "Banded Defensive Wrist Re-Cupping Snap Under Load",
        8.8,
        "Resistance Bands",
        "Start with wrist slightly extended under heavy band load. Dynamically flex the wrist inward to neutral and beyond, grooving the motor pattern of regaining hand control during a match."
    ),
    (
        "Towel-Anchored Table Edge Maximum Isometric Cup",
        8.6,
        "Bodyweight",
        "Hook fingers over the underside lip of a heavy dining table. Form a tight hook posture and attempt to curl the tabletop upward for 15 seconds of intense static strain."
    ),
    (
        "Heavy Backpack Palm-Rolled Isometric Maximum Lock",
        8.9,
        "Backpack-weighted",
        "Rest elbow on pad. Grip backpack strap with a fully closed fist and locked wrist. Hold static position for 15 seconds against maximum load without allowing the wrist joint to kick back."
    ),

    # --- RISING & RADIAL DEVIATION (Home: 14) ---
    (
        "Judo Belt Heavy Rising Deadlift Off Floor",
        9.0,
        "Backpack-weighted",
        "Wrap a non-elastic judo belt over the index-finger knuckle and under the thumb. Attach to a heavy backpack. Keep elbow at 90 degrees locked to ribs and lift load strictly through radial deviation."
    ),
    (
        "Resistance Band Low-Anchor Heavy Hammer Rising Pull",
        8.8,
        "Resistance Bands",
        "Anchor strong band under front foot. Hold band in vertical fist. Elevate the thumb side of the wrist straight toward ceiling, maintaining an immovable elbow joint at 85 degrees."
    ),
    (
        "Table-Edge Supported Heavy Radial Lever Raise",
        8.6,
        "Backpack-weighted",
        "Rest forearm flat along table surface with wrist extending past edge. Grip a weighted bag via top strap in hammer grip and cock the wrist upward into full radial deviation."
    ),
    (
        "Banded High-Post Isometric Table Maximum Lock",
        9.1,
        "Resistance Bands",
        "Anchor band across table. Set hand in maximum rise with knuckles elevated above wrist. Hold position against heavy elastic tension for 15 seconds without letting the hand tip downward."
    ),
    (
        "Backpack Strap Posting Elevator Maximum Hold",
        8.7,
        "Backpack-weighted",
        "Loop backpack strap around the bottom knuckles. Stand in combat stance and elevate the wrist into full rise, holding static tension at 90-degree elbow flexion for 15 seconds."
    ),
    (
        "Wall-Braced Hammer Rising Lever Maximum Press",
        8.5,
        "Bodyweight",
        "Stand with forearm vertical against a wall corner. Press the radial edge of your fist upward and outward against the wall corner, exerting sustained static rising pressure for 15 seconds."
    ),
    (
        "Resistance Band Cross-Body High-Post Maximum Sweep",
        8.9,
        "Resistance Bands",
        "Anchor band low and to opposite side. Stand tall, cock wrist into maximum rise, and pull upward and across your face line to reinforce the outside posting toproll trajectory."
    ),
    (
        "Towel-Suspended Backpack Vertical Rising Pulses",
        8.6,
        "Backpack-weighted",
        "Suspend heavy backpack using a rolled hand towel gripped vertically like a sword. Perform 8 strict radial rising pulses, pausing for 2 seconds at the top of each contraction."
    ),
    (
        "Banded Hammer-Lock Forearm Heavy Drag",
        8.8,
        "Resistance Bands",
        "Step inside looped band. Keep hand in vertical hammer position with wrist cocked upward. Drag elbow backward along hip while maintaining total radial stiffness throughout."
    ),
    (
        "Table-Pad Belt Rising Static Hold Off Table Pad",
        8.9,
        "Backpack-weighted",
        "Rest elbow on table pad. Loop belt over index knuckle connected to floor-resting backpack. Lift load 2 inches off floor purely with wrist rise and hold for 15 seconds."
    ),
    (
        "Resistance Band Posting Radial Deviation Rapid Snap",
        8.7,
        "Resistance Bands",
        "Anchor band beneath table. Rapidly cock wrist upward from neutral into maximal radial deviation, developing reactive explosive stiffness for the 'Ready-Go' table start."
    ),
    (
        "Weighted Sledgehammer Lever Rising Static Balance",
        8.6,
        "Backpack-weighted",
        "Hold a weighted household handle horizontally out in front with thumb on top. Lift the far end upward using purely radial wrist flexors and maintain balance for 15 seconds."
    ),
    (
        "Door-Anchor Low-Angle Banded Rising Heavy Drag",
        8.9,
        "Resistance Bands",
        "Anchor band low in door jamb. Pull backward into lat backpressure while actively driving the knuckles upward to prevent opponent from initiating a high-hand posting counter."
    ),
    (
        "Kneeling Table Banded Rising Maximum Lock",
        8.8,
        "Resistance Bands",
        "Kneel at table with elbow anchored. Maintain a strict 90-degree elbow bend and elevate wrist into full rise against a heavy band, resisting any downward wrist collapse."
    ),

    # --- SUPINATION & HOOK (Home: 13) ---
    (
        "Banded Table-Pad Deep Hook Supination Heavy Pull",
        8.9,
        "Resistance Bands",
        "Anchor heavy band to side of table. Plant elbow on pad, turn palm fully upward into supination with wrist cupped, and pull hand inward toward your chest against heavy elastic resistance."
    ),
    (
        "Heavy Backpack Supinated Bicep-Lock Floor Drag",
        8.8,
        "Backpack-weighted",
        "Load backpack with heavy weight. Hold top handle with underhand supinated grip, lock elbow at 85 degrees, and drag the weight across a smooth floor using upper body frame momentum."
    ),
    (
        "Doorframe Supinated Frame-Crush Maximum Isometric",
        8.5,
        "Bodyweight",
        "Stand inside doorway. Place supinated wrist against inner frame with elbow glued to hip. Drive entire torso forward and inward, creating a bone-on-bone hook lock for 15 seconds."
    ),
    (
        "Resistance Band Offset Heavy Supination Curl",
        8.7,
        "Resistance Bands",
        "Step on heavy band. Loop band over the outer ulnar edge of palm. Curl upward while fighting the band's rotational pull to force deep activation of the supinator and biceps brachii."
    ),
    (
        "Table-Edge Towel Hook Drag Off Pad Heavy",
        8.8,
        "Backpack-weighted",
        "Thread towel through backpack. Rest elbow on table pad, turn palm supine with cupped fingers, and drag backward 4 inches across the pad to simulate an offensive hook drag."
    ),
    (
        "Banded Low-Pulley Hook Lock Maximum Hold",
        9.0,
        "Resistance Bands",
        "Anchor band low on table opposite side. Lock hand into deep hook with cupped wrist and supinated forearm. Hold static against heavy tension for 15 seconds with chest clamped to hand."
    ),
    (
        "Backpack Supinated Short-Range Heavy Bicep Pulses",
        8.6,
        "Backpack-weighted",
        "Sit on chair holding heavy backpack in underhand grip. Pulse through 75-95 degrees of elbow flexion with wrist cupped, building the specific joint angle strength needed for hook battles."
    ),
    (
        "Resistance Band Cross-Body Supination Rapid Snap",
        8.7,
        "Resistance Bands",
        "Anchor band to door at waist height. Face 45 degrees away. Snap hand into deep supination and pull across torso to simulate diving into a deep defensive hook."
    ),
    (
        "Towel-Wrapped Inverted Table Supinated Heavy Row",
        8.6,
        "Bodyweight",
        "Lie beneath a sturdy table. Grip table underside with supinated cupped hand. Pull chest upward to table lip, holding isometric tension at 90-degree elbow bend for 12 seconds."
    ),
    (
        "Banded Hook Transition Under Table-Pad Maximum Tension",
        8.9,
        "Resistance Bands",
        "Set elbow on pad with band pulling hand open. Forcefully supinate and cup inward against the band, drilling the exact movement required to force an outside puller into your hook."
    ),
    (
        "Heavy Backpack Supinated Concentration Maximum Hold",
        8.7,
        "Backpack-weighted",
        "Brace elbow against inner thigh with underhand grip on a heavy backpack. Hold at 90 degrees with wrist curled upward for 15 seconds of intense bicep and forearm contraction."
    ),
    (
        "Door-Anchor Banded Supination Sweep Heavy",
        8.8,
        "Resistance Bands",
        "Anchor band at hip level on door. Start with hand in neutral, then explosively rotate into full supination while stepping inward with the lead foot to lock your shoulder frame."
    ),
    (
        "Backpack Lateral Hook Frame Heavy Drag",
        8.9,
        "Backpack-weighted",
        "Hold heavy backpack in deep hook position with elbow against ribs. Step laterally across the floor, fighting the swaying load using lat containment and supinated bicep strength."
    ),

    # --- SIDE PRESSURE & BACKPRESSURE (Home: 13) ---
    (
        "Doorframe Full-Body Lateral Side-Pressure Maximum Drive",
        8.8,
        "Bodyweight",
        "Stand sideways in a doorframe with elbow at 90 degrees braced on hip. Press inner forearm into the frame using whole-body core and hip rotation for 15 seconds of static drive."
    ),
    (
        "Heavy Resistance Band Table Side-Pressure Slam Down",
        9.1,
        "Resistance Bands",
        "Anchor thick band to the side at table level. Plant elbow on pad, lock hand directly in front of shoulder, and drive sideways toward the pin pad against massive band resistance."
    ),
    (
        "Table-Pad Elbow-Anchored Towel Heavy Side Press",
        8.7,
        "Backpack-weighted",
        "Set elbow on table pad. Thread towel through heavy backpack hanging off table edge. Drive forearm laterally inward across the pad, lifting the backpack via internal humerus rotation."
    ),
    (
        "Resistance Band 90-Degree Frame Lock Lateral Walkout",
        8.9,
        "Resistance Bands",
        "Anchor heavy band at chest height. Lock arm at 90 degrees against chest in side-pressure frame. Walk laterally 3 steps away from anchor, holding static frame alignment against elastic pull."
    ),
    (
        "Kneeling Table Frame-Crush Maximum Isometric",
        8.6,
        "Bodyweight",
        "Kneel at heavy desk. Brace forearm against desk edge in winning position. Lean 75% of bodyweight forward and inward, conditioning subscapularis and elbow connective tissue for 15 seconds."
    ),
    (
        "Banded Internal Rotation Side-Pressure Heavy Pulse",
        8.8,
        "Resistance Bands",
        "Anchor band at elbow level. Keep elbow pinned to hip with towel roll cushion. Drive forearm inward across stomach through internal shoulder rotation, performing 10 high-tension pulses."
    ),
    (
        "Backpack Shoulder-Committed Frame Press Heavy",
        8.9,
        "Backpack-weighted",
        "Get in combat stance. Commit shoulder behind the hand with elbow at 85 degrees. Push a heavy backpack horizontally across a slick table using triceps and bodyweight frame drive."
    ),
    (
        "Resistance Band Heavy Lat Backpressure Row Hold",
        9.0,
        "Resistance Bands",
        "Anchor thick looped band at chest level on door. Lock elbow at exactly 90 degrees with hammer grip. Drive body backward using latissimus dorsi, holding position for 5 seconds per rep."
    ),
    (
        "Backpack Hammer-Grip Brachioradialis Table Drag Heavy",
        8.9,
        "Backpack-weighted",
        "Rest elbow on table pad. Grip top handle of heavily loaded backpack in vertical hammer grip. Drag elbow backward across pad 3 inches, lifting backpack off floor via backpressure."
    ),
    (
        "Doorway Inverted Isometric Backpressure Hang Heavy",
        8.6,
        "Bodyweight",
        "Face a sturdy doorway. Grip door frame with both hands in hammer orientation, elbows locked at 85 degrees. Lean body backward at 45-degree angle and hold static tension for 15 seconds."
    ),
    (
        "Judo Belt Suspended Backpack Hammer Maximum Hold",
        9.1,
        "Backpack-weighted",
        "Loop judo belt through heavy backpack. Grip belt in vertical hand with elbow bent to 90 degrees tight against ribs. Hold static hammer lock for 20 seconds of intense brachioradialis burn."
    ),
    (
        "Resistance Band High-Anchor Backpressure Lat Sweep Heavy",
        8.8,
        "Resistance Bands",
        "Anchor band high on door. Grip with cupped hand. Drag backward and downward using latissimus dorsi activation, mimicking a counter-offensive toproll pull on an opponent's arm."
    ),
    (
        "Table-Edge Towel Lat Drag Off Pad Heavy",
        8.7,
        "Backpack-weighted",
        "Wrap towel around backpack handle. Plant elbow on table pad and pull elbow backward toward your hip, keeping the hand and wrist locked in an unyielding right angle."
    ),
]

adv_gym_data = [
    # --- GYM: CABLE PRONATION & TOPROLL (8) ---
    (
        "Cable Judo Strap High-Anchor Pronation Roll Heavy",
        9.0,
        "Cable",
        "Attach a heavy judo belt to a high cable pulley. Wrap strap over thumb and across back of hand. Plant elbow on an arm wrestling table pad, step back, and execute a dynamic downward pronation roll against heavy stack weight."
    ),
    (
        "Cable Eccentric Handle Heavy Pronator Rotation",
        9.1,
        "Cable",
        "Connect an eccentric (off-center) arm wrestling handle to a mid-pulley. Rest elbow on preacher bench. Rotate forearm from neutral into full pronation, overcoming the off-center axis of resistance."
    ),
    (
        "Standing Cable Multi-Spinner Heavy Pronation Drag",
        9.1,
        "Cable",
        "Attach a multi-spinner cylinder handle to chest-height cable. Grip top cone with thumb-up orientation and pull backward into backpressure while rolling the thumb down into pronation."
    ),
    (
        "Cable Low-Pulley Posting Pronation Heavy Lift",
        8.9,
        "Cable",
        "Set pulley at floor height with strap looped over thumb. Stand at table pad, cock wrist into rise, and lift cable weight straight up while pronating inward to simulate posting toproll entry."
    ),
    (
        "Cable Wrist Wrench Maximum Pronation Sweep",
        9.2,
        "Cable",
        "Attach a 2.5-inch rolling wrist wrench to a cable set at table height. Grip wrench, keep elbow on pad, and sweep hand inward into pronation while combating the wrench's tendency to kick back."
    ),
    (
        "Preacher Bench Heavy Dumbbell Offset Pronation Overload",
        8.8,
        "Dumbbells",
        "Rest forearm flat across a preacher curl bench. Hold a dumbbell loaded only on the thumb side with heavy plates. Control the descent into supination, then explosively contract the pronator muscles back to vertical."
    ),
    (
        "Cable Table-Pad Pronation Maximum Isometric Hold",
        9.1,
        "Cable",
        "Set mid-height cable connected to a strap around thumb. Plant elbow on table pad in winning position. Hold full pronation statically against the weight stack for 15 seconds."
    ),
    (
        "Cable Low-Cross Pronation Counter-Hook Sweep Heavy",
        8.9,
        "Cable",
        "Attach strap to low cable on opposite side. Plant elbow on pad, reach across, and sweep the hand upward and across your chest into full pronation to drill counter-hook finger stripping."
    ),

    # --- GYM: WRIST CUPPING & FLEXION (7) ---
    (
        "Barbell Heavy Seated Table Wrist Curl Overload",
        8.9,
        "Barbell",
        "Sit on flat bench with forearms resting across thighs and wrists hanging past knees. Load an Olympic barbell with heavy plates and execute strict wrist curls through complete active flexion."
    ),
    (
        "Cable Rolling Thunder Heavy Wrist Flexion Curl",
        9.1,
        "Cable",
        "Attach a 2.375-inch Rolling Thunder handle to a low cable pulley. Stand tall and curl wrist inward, resisting the rotating cylinder's attempt to pry open the fingers."
    ),
    (
        "Preacher Bench Dumbbell Heavy Single-Arm Wrist Curl Overload",
        8.8,
        "Dumbbells",
        "Anchor forearm flat along a 45-degree preacher bench pad. Hold heavy dumbbell with palm facing ceiling and perform slow, controlled wrist flexions with a 2-second squeeze at the apex."
    ),
    (
        "Cable Wrist Wrench Table Heavy Cupping Drag",
        9.2,
        "Cable",
        "Connect a thick wrist wrench to a table-height cable. Plant elbow on table pad and curl wrist inward while dragging the elbow backward 2 inches along the pad surface."
    ),
    (
        "EZ-Bar Reverse-Camber Heavy Table Wrist Curl Overload",
        8.8,
        "EZ-Bar",
        "Rest forearms on flat bench holding an EZ-bar on the outer camber. Perform heavy wrist curls to overload the flexor carpi ulnaris under a comfortable wrist angle."
    ),
    (
        "Cable Thick-Bar Standing Cupping Maximum Hold",
        9.0,
        "Cable",
        "Connect a 3-inch thick fat bar to a low cable. Stand upright and curl wrists into maximum flexion against the stack, holding the peak static contraction for 15 seconds."
    ),
    (
        "Cable Multi-Spinner Palmar Hook Heavy Cupping",
        9.1,
        "Cable",
        "Attach multi-spinner handle to low pulley. Grip bottom flange with fingers deeply hooked and curl wrist into full carpal flexion against the stack resistance."
    ),

    # --- GYM: RISING & RADIAL DEVIATION (5) ---
    (
        "Cable Low-Pulley Judo Belt Heavy Rising Pull",
        9.1,
        "Cable",
        "Attach a heavy judo belt to a low cable. Wrap belt over top of index finger knuckle. Plant elbow on table pad and lift wrist straight upward into maximum radial rise against the stack."
    ),
    (
        "Dumbbell Standing Heavy Hammer Radial Rise Overload",
        8.8,
        "Dumbbells",
        "Hold heavy dumbbell at side in hammer grip with elbow at 90 degrees. Cock wrist upward into full radial deviation without swinging torso, targeting extensor carpi radialis longus."
    ),
    (
        "Cable Multi-Spinner High-Post Rising Vector Heavy",
        9.2,
        "Cable",
        "Connect multi-spinner to mid-height cable. Grip near top conical flange, plant elbow on table pad, and drive wrist upward into rise while pulling backward into backpressure."
    ),
    (
        "Barbell Plate-Loaded Wrist Roller Rising Lift Overload",
        8.9,
        "Barbell",
        "Mount a wrist roller device on a power rack pin. Roll the cord upward using upward radial cocking motions rather than standard wrist curls to specifically target rising strength."
    ),
    (
        "Cable Table-Pad Isometric High-Post Maximum Lock",
        9.1,
        "Cable",
        "Set mid-pulley at table height with strap around knuckles. Elevate wrist into maximum rise and hold statically against the weight stack for 15 seconds without losing knuckle height."
    ),

    # --- GYM: SUPINATION & HOOK BIOMECHANICS (5) ---
    (
        "Cable Low-Pulley Heavy Supinated Hook Curl Overload",
        9.1,
        "Cable",
        "Attach D-handle to low pulley. Set elbow on preacher pad in deep hook posture with palm fully supinated and wrist cupped. Curl cable upward toward opposite clavicle."
    ),
    (
        "Cable Thick-Rope Supinated Table Heavy Drag",
        8.9,
        "Cable",
        "Connect thick rope attachment to mid-pulley. Grip one end with palm facing ceiling and elbow tight to hip. Drag weight backward across floor while maintaining strict supination."
    ),
    (
        "Preacher Bench Heavy Dumbbell Offset Supination Overload",
        8.8,
        "Dumbbells",
        "Rest forearm on preacher bench holding a dumbbell weighted heavily on the pinky side. Lower into pronation under control, then contract supinator muscle to return to vertical."
    ),
    (
        "Cable Table-Pad Deep Hook Isometric Maximum Lock",
        9.2,
        "Cable",
        "Set cable pulley level with arm wrestling table. Lock hand into deep supination and wrist flexion on table pad. Hold static tension against the weight stack for 15 seconds."
    ),
    (
        "Cable Low-Cross Supination Hook Sweep Heavy",
        9.0,
        "Cable",
        "Attach single handle to low cable opposite side. Grip handle, step into hook stance, and sweep hand across your chest into deep supinated containment."
    ),

    # --- GYM: SIDE PRESSURE & BACKPRESSURE (5) ---
    (
        "Cable Table-Height Side Pressure Pin Drive Overload",
        9.2,
        "Cable",
        "Set cable pulley level with table pad. Grip handle with elbow anchored on pad and drive forearm laterally inward toward pin pad, engaging entire chest, shoulder, and hip frame."
    ),
    (
        "Cable 90-Degree Locked Lat Backpressure Row Overload",
        9.1,
        "Cable",
        "Connect strap handle to chest-height cable. Lock elbow at exactly 90 degrees in neutral hammer grip and pull body backward using latissimus dorsi, holding position for 5 seconds."
    ),
    (
        "Cable Multi-Angle Arm Wrestling Frame Maximum Lock",
        9.0,
        "Cable",
        "Set pulley at shoulder height. Step into combat stance, lock elbow at 85 degrees against ribs, and hold cable under static isometric tension while shifting feet in small pivot steps."
    ),
    (
        "Preacher Bench Heavy Dumbbell Hammer Backpressure Hold Overload",
        8.9,
        "Dumbbells",
        "Place upper arm on 45-degree preacher bench. Hold heavy dumbbell in hammer grip at a 90-degree elbow lock. Hold statically for 15 seconds against gravity's downward moment arm."
    ),
    (
        "Cable Standing Cross-Body Side-Pressure Sweep Overload",
        9.2,
        "Cable",
        "Set pulley at elbow level. Step into combat stance with chest over hand. Drive inward and downward toward an imaginary pin pad, keeping the shoulder-to-hand distance immovable."
    ),
]

if __name__ == "__main__":
    print(f"Advanced Home Count: {len(adv_home_data)} (Target: 70)")
    print(f"Advanced Gym Count: {len(adv_gym_data)} (Target: 30)")
    print(f"Total Advanced Count: {len(adv_home_data) + len(adv_gym_data)} (Target: 100)")
    assert len(adv_home_data) == 70
    assert len(adv_gym_data) == 30
    for item in adv_home_data + adv_gym_data:
        assert 8.1 <= item[1] <= 9.2, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Advanced exercise: {item[0]}"
    print("Advanced validation passed!")
