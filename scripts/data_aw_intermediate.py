#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 11: ARM WRESTLING PRACTICE - INTERMEDIATE TIER (Total: 152 Exercises)
# 106 Home (70%) + 46 Gym (30%)
# Validated Combat Sports Biomechanics, Arm Wrestling Kinematics, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 6.1 and 8.0
# ==============================================================================

int_home_data = [
    # --- PRONATION & POSTING TOPROLL (Home: 22) ---
    (
        "Judo Belt Heavy Backpack Pronation Twist",
        7.1,
        "Backpack-weighted",
        "Thread a thick martial arts judo belt through a weighted backpack. Wrap the strap over the radial edge of the thumb metacarpal. Rest forearm across your thigh with elbow bent at 85 degrees and rotate forcefully from flat neutral into full inward pronation against the gravity-dependent load."
    ),
    (
        "Double Band High-Anchor Posting Pronation Pull",
        7.4,
        "Resistance Bands",
        "Double up heavy resistance bands anchored high on a door frame. Loop webbing over knuckles and radial wrist. Drop into a low combat stance and execute an explosive posting rise followed by a torque-driven pronation roll that simulates cracking an opponent's wrist."
    ),
    (
        "Table-Edge Towel Pronation Drag",
        6.8,
        "Backpack-weighted",
        "Sit at a solid table with elbow anchored on a dense rubber mat. Wrap a thick bath towel around the hand and thumb, attaching the lower end to a weighted backpack. Drag the elbow backward while rotating the forearm inward into aggressive pronation."
    ),
    (
        "Heavy Resistance Band Low-Cross Pronation Sweep",
        7.3,
        "Resistance Bands",
        "Anchor band at ground level on opposite side. Grip band with thumb-wrap loop. Pull hand diagonally upward and across your chest into pronation, reinforcing the exact counter-hook posting vector used to peel an opponent's fingers."
    ),
    (
        "Doorframe Sledgehammer-Lever Pronator Terus Hold",
        6.7,
        "Bodyweight",
        "Grip a long household broom or weighted tool by the end of the shaft with thumb upward. Hold the shaft horizontal to the floor against a doorframe for 15 seconds, using pure pronator quadratus and teres torque to fight downward gravity leverage."
    ),
    (
        "Backpack Offset-Handle Pronation Drop and Catch",
        7.2,
        "Backpack-weighted",
        "Fill backpack with books. Hold the offset side strap across the thumb. Rest forearm on a desk. Allow the backpack to rotate the forearm into controlled supination, then explosively fire the pronator muscles to snap the hand back into full pronation."
    ),
    (
        "Resistance Band Thumb-Line Defensive Toproll Peel",
        7.5,
        "Resistance Bands",
        "Anchor strong band at table level. Loop directly over the thumb knuckle. Set up in neutral position. Drive backpressure with your lat while simultaneously torquing the thumb down toward the floor to mimic defensive hand recovery."
    ),
    (
        "Kneeling Table Pad Pronation Pivot Hold",
        6.9,
        "Resistance Bands",
        "Kneel at table with elbow pinned on pad. Pull heavy band into full pronation at 90 degrees elbow flexion. Hold this max torque position for 15 seconds against elastic recoil to harden the medial epicondyle tendon complex."
    ),
    (
        "Dual-Strap Backpack High-Post Pronation Lift",
        7.6,
        "Backpack-weighted",
        "Fasten both backpack straps over the radial styloid process. Stand in combat stance and elevate the entire arm structure 4 inches vertically through radial rise before twisting the wrist into pronation."
    ),
    (
        "Resistance Band Horizontal Pronation Chop",
        7.0,
        "Resistance Bands",
        "Anchor band at shoulder level to the side. Grip band across knuckles. Drive the elbow backward while chopping the forearm inward, targeting the pronator muscle belly under rapid stretch-shortening conditions."
    ),
    (
        "Weighted Book Radial Deviation Pronation Glide",
        6.5,
        "Backpack-weighted",
        "Hold a heavy atlas or encyclopedia between thumb and fingers. Keep forearm horizontal. Rotate from neutral to pronated while maintaining an unyielding upward radial cock of the wrist."
    ),
    (
        "Banded Table-Pad Isometric Toproll Lock",
        7.3,
        "Resistance Bands",
        "Anchor band directly opposite table arm wrestling pad. Lock hand into full pronation and cupping with elbow at 80 degrees. Hold static tension against heavy band for 12 seconds, training match-ready isometric stabilization."
    ),
    (
        "Thick Towel-Loop Pronator Drag Off Knee",
        6.8,
        "Resistance Bands",
        "Loop thick towel around resistance band anchored under foot. Rest wrist on knee. Drive pronation while dragging the entire forearm backward along the thigh to integrate brachioradialis tension."
    ),
    (
        "Heavy Backpack Thumb-Web Lever Lift",
        7.4,
        "Backpack-weighted",
        "Loop backpack strap exclusively around the thumb web. Stand with elbow locked at 90 degrees and lift load directly off the floor using wrist pronation and upward posting tension."
    ),
    (
        "Cross-Doorway Banded Pronation Counter",
        7.1,
        "Resistance Bands",
        "Anchor band to adjacent door hinge. Step back into deep arm wrestling stance. Pull inward and downward across your abdomen, simulating an offensive pin-pad transition via continuous pronator torque."
    ),
    (
        "Belt-Suspended Household Pronation Eccentric Lower",
        6.9,
        "Backpack-weighted",
        "Suspend weighted bag from a leather belt wrapped around the thumb. Use both hands to pronate, then release non-working hand and slowly resist the supination stretch over 5 controlled seconds."
    ),
    (
        "High-Resistance Band Radial Posting Sweep",
        7.5,
        "Resistance Bands",
        "Anchor high-tension looped band. Grip with knuckles facing ceiling. Elevate the hand along a high posting plane while pronating inward, drilling the standard outside toproll attack vector."
    ),
    (
        "Seated Table-Edge Towel Toproll Roll-Over",
        6.7,
        "Backpack-weighted",
        "Rest elbow on table pad. Thread towel through backpack handle. Starting from open hand, roll the fingers shut, pronate the forearm, and drag the elbow back 2 inches along the pad."
    ),
    (
        "Doorframe Corner Thumb-Pushed Pronation Lock",
        6.4,
        "Bodyweight",
        "Press the thumb web firmly into an interior corner trim. Generate maximal internal rotational force through the forearm and anterior shoulder capsule for 12 seconds of static activation."
    ),
    (
        "Banded Pronation Pulley Simulation With Judo Belt",
        7.7,
        "Resistance Bands",
        "Loop judo belt over top of an open door with resistance band attached. Grip belt in combat hand, step back, and execute sharp pronation-driven downward sweeps mimicking table pulley action."
    ),
    (
        "Backpack Radial Styloid Pronator Pulse",
        7.0,
        "Backpack-weighted",
        "Place forearm on table with wrist hanging 2 inches off edge. With strap across thumb, pulse between neutral and maximum pronation for 10 controlled repetitions, maintaining steady elbow contact."
    ),
    (
        "Resistance Band Semi-Pronated High-Post Hold",
        7.2,
        "Resistance Bands",
        "Set band at eye level. Grip with semi-pronated hand, elevate knuckles above wrist, and hold against heavy tension for 15 seconds to forge isometric posting stability."
    ),

    # --- WRIST CUPPING & CARPAL FLEXION (Home: 22) ---
    (
        "Thick Rolling Towel Wrist Flexion Dead-Hang",
        7.0,
        "Bodyweight",
        "Drape two thick bath towels over a pull-up bar or sturdy door frame. Grip both towels with deeply cupped wrists and hold a bodyweight dead-hang for 15 seconds with elbows slightly unlocked."
    ),
    (
        "Heavy Backpack Thick-Handle Wrist Curl Off Bench",
        7.2,
        "Backpack-weighted",
        "Wrap a foam roller or folded towel around backpack handles to create a 3-inch diameter grip. Rest forearms on a chair and execute full-range wrist curls with strict 2-second peak contractions."
    ),
    (
        "Double Banded Table Wrist Cupping Snap",
        7.5,
        "Resistance Bands",
        "Anchor dual heavy bands at floor level. Sit at table with elbow on pad. Grip bands across metacarpal heads and snap wrists into full flexion against the compounding elastic resistance."
    ),
    (
        "Kneeling Table-Edge Deep Hook Cupping Hold",
        7.3,
        "Backpack-weighted",
        "Kneel at table with elbow on pad. Connect strap to heavy backpack resting on floor. Pull wrist into maximum flexion and hold statically at 85 degrees elbow angle for 15 seconds."
    ),
    (
        "Banded Fingertip-To-Carpal Deep Curl",
        6.8,
        "Resistance Bands",
        "Step on heavy band. Allow band to roll down to distal finger phalanges, then curl fingers into palm and finish with deep wrist flexion to mimic closing a tight hook on an opponent's hand."
    ),
    (
        "Backpack Palmar Compression Wrist Pulses",
        7.1,
        "Backpack-weighted",
        "Rest forearm flat along a tabletop with hand extended over edge. Hold heavily loaded backpack across palm and perform 12 rhythmic, high-tension wrist flexions without letting forearm rise."
    ),
    (
        "Resistance Band Hook-Locked Wrist Flexion Pulse",
        7.4,
        "Resistance Bands",
        "Anchor band at table height. Turn hand into supinated hook orientation and curl wrist inward, pulsing through the final 30 degrees of carpal flexion against extreme band tension."
    ),
    (
        "Towel-Wrapped Water Jug Wrist Flexion Drag",
        6.6,
        "Backpack-weighted",
        "Fill large water jug or backpack. Wrap towel around handle. Rest forearm on knee and curl wrist upward while simultaneously dragging the elbow backward along the thigh."
    ),
    (
        "Doorframe Isometric Palmar Wrist Crush",
        6.4,
        "Bodyweight",
        "Stand facing door frame. Place cupped palm and fingers against inner wood frame. Exert continuous forward and inward flexion pressure for 15 seconds, engaging deep finger and wrist flexors."
    ),
    (
        "Heavy Band Seated Concentration Wrist Curl",
        7.2,
        "Resistance Bands",
        "Sit on chair with band anchored under opposite foot. Brace active elbow against inner knee. Perform single-arm concentration wrist curls focusing on pure flexor carpi ulnaris recruitment."
    ),
    (
        "Backpack Strap Ulnar-Biased Wrist Flexion",
        7.0,
        "Backpack-weighted",
        "Angle backpack strap across the pinky side of the palm. Rest forearm supine on table and curl wrist with an inward ulnar tilt to build targeted hooking power."
    ),
    (
        "Resistance Band Low-Pulley Simulation Cupping",
        7.6,
        "Resistance Bands",
        "Anchor band low behind a table. Sit in combat position, plant elbow on pad, and curl wrist inward against the backward pull, simulating a battle against an aggressive toproller."
    ),
    (
        "Table-Supported Heavy Book Pinch-And-Cup",
        6.5,
        "Backpack-weighted",
        "Pinch two heavy hardcover books between fingers and thumb. Rest forearm on table and curl wrists upward, challenging both pinch containment and flexor tendon tensile strength."
    ),
    (
        "Banded Defensive Wrist Re-Cupping Pull",
        7.3,
        "Resistance Bands",
        "Start with wrist slightly extended under moderate band load. Dynamically flex the wrist inward to neutral and beyond, grooving the motor pattern of regaining hand control during a match."
    ),
    (
        "Towel-Anchored Table Edge Isometric Cup",
        6.9,
        "Bodyweight",
        "Hook fingers over the underside lip of a heavy dining table. Form a tight hook posture and attempt to curl the tabletop upward for 12 seconds of intense static strain."
    ),
    (
        "Backpack Single-Arm Incline Wrist Flexion",
        7.1,
        "Backpack-weighted",
        "Rest forearm on an inclined ironing board or cushion. Perform slow wrist curls with a weighted backpack, emphasizing controlled eccentric lowering down to full extension."
    ),
    (
        "Resistance Band Standing Dual-Arm Wrist Squeeze",
        6.7,
        "Resistance Bands",
        "Stand upright holding band behind your back across palms. Curl both wrists upward against band tension, firing flexor carpi radialis while keeping shoulder blades retracted."
    ),
    (
        "Heavy Backpack Palm-Rolled Isometric Lock",
        7.5,
        "Backpack-weighted",
        "Rest elbow on pad. Grip backpack strap with a fully closed fist and locked wrist. Hold static position for 15 seconds against maximum load without allowing the wrist joint to kick back."
    ),
    (
        "Banded Hammer-To-Cup Dynamic Transition",
        7.2,
        "Resistance Bands",
        "Anchor band at hip level. Start in neutral hammer position, then dynamically twist and cup the wrist into full hook flexion while pulling toward opposite pec."
    ),
    (
        "Household Belt-Loaded Forearm Flexion Burnout",
        6.6,
        "Backpack-weighted",
        "Loop a wide belt through a weighted bag. Perform 15 deliberate wrist curls resting on your knee, holding the 15th repetition at peak flexion for an additional 10-second burn."
    ),
    (
        "Resistance Band Cross-Body Hook Cupping Sweep",
        7.4,
        "Resistance Bands",
        "Anchor band to side wall. Plant elbow on table pad and pull the cupped hand across your chest, training the coordinated action of wrist flexion and inward body rotation."
    ),
    (
        "Towel Multi-Layered Thick-Grip Wrist Curl",
        6.8,
        "Backpack-weighted",
        "Wrap 3 hand towels around a backpack handle to make a 3.5-inch cylinder. Perform short-range wrist curls to train the open-hand containment muscles of the forearm."
    ),

    # --- RISING & RADIAL DEVIATION (Home: 16) ---
    (
        "Judo Belt Heavy Rising Lift Off Floor",
        7.5,
        "Backpack-weighted",
        "Wrap a non-elastic judo belt over the index-finger knuckle and under the thumb. Attach to a heavy backpack. Keep elbow at 90 degrees locked to ribs and lift load strictly through radial deviation."
    ),
    (
        "Resistance Band Low-Anchor Hammer Rising Pull",
        7.2,
        "Resistance Bands",
        "Anchor strong band under front foot. Hold band in vertical fist. Elevate the thumb side of the wrist straight toward ceiling, maintaining an immovable elbow joint at 85 degrees."
    ),
    (
        "Table-Edge Supported Heavy Radial Lever",
        7.0,
        "Backpack-weighted",
        "Rest forearm flat along table surface with wrist extending past edge. Grip a weighted bag via top strap in hammer grip and cock the wrist upward into full radial deviation."
    ),
    (
        "Banded High-Post Isometric Table Lock",
        7.6,
        "Resistance Bands",
        "Anchor band across table. Set hand in maximum rise with knuckles elevated above wrist. Hold position against heavy elastic tension for 15 seconds without letting the hand tip downward."
    ),
    (
        "Backpack Strap Posting Elevator Hold",
        7.3,
        "Backpack-weighted",
        "Loop backpack strap around the bottom knuckles. Stand in combat stance and elevate the wrist into full rise, holding static tension at 90-degree elbow flexion for 15 seconds."
    ),
    (
        "Wall-Braced Hammer Rising Lever Press",
        6.5,
        "Bodyweight",
        "Stand with forearm vertical against a wall corner. Press the radial edge of your fist upward and outward against the wall corner, exerting sustained static rising pressure for 12 seconds."
    ),
    (
        "Resistance Band Cross-Body High-Post Sweep",
        7.4,
        "Resistance Bands",
        "Anchor band low and to opposite side. Stand tall, cock wrist into maximum rise, and pull upward and across your face line to reinforce the outside posting toproll trajectory."
    ),
    (
        "Towel-Suspended Backpack Vertical Rising Pulse",
        7.1,
        "Backpack-weighted",
        "Suspend heavy backpack using a rolled hand towel gripped vertically like a sword. Perform 10 strict radial rising pulses, pausing for 1 second at the top of each contraction."
    ),
    (
        "Banded Hammer-Lock Forearm Drag",
        7.3,
        "Resistance Bands",
        "Step inside looped band. Keep hand in vertical hammer position with wrist cocked upward. Drag elbow backward along hip while maintaining total radial stiffness throughout."
    ),
    (
        "Table-Pad Belt Rising Static Hold Off Table",
        7.5,
        "Backpack-weighted",
        "Rest elbow on table pad. Loop belt over index knuckle connected to floor-resting backpack. Lift load 2 inches off floor purely with wrist rise and hold for 12 seconds."
    ),
    (
        "Resistance Band Posting Radial Deviation Snap",
        7.2,
        "Resistance Bands",
        "Anchor band beneath table. Rapidly cock wrist upward from neutral into maximal radial deviation, developing reactive explosive stiffness for the 'Ready-Go' table start."
    ),
    (
        "Weighted Sledgehammer Lever Rising Balance",
        6.8,
        "Backpack-weighted",
        "Hold a weighted household handle horizontally out in front with thumb on top. Lift the far end upward using purely radial wrist flexors and maintain balance for 10 seconds."
    ),
    (
        "Door-Anchor Low-Angle Banded Rising Drag",
        7.4,
        "Resistance Bands",
        "Anchor band low in door jamb. Pull backward into lat backpressure while actively driving the knuckles upward to prevent opponent from initiating a high-hand posting counter."
    ),
    (
        "Kneeling Table Banded Rising Lock",
        7.1,
        "Resistance Bands",
        "Kneel at table with elbow anchored. Maintain a strict 90-degree elbow bend and elevate wrist into full rise against a heavy band, resisting any downward wrist collapse."
    ),
    (
        "Heavy Backpack Thumb-Index Web Rising Row",
        7.5,
        "Backpack-weighted",
        "Thread strap between thumb and index finger. Perform horizontal row pulses where the initiation begins with radial rising before lat recruitment takes over."
    ),
    (
        "Resistance Band High-Knuckle Isometric Wall Lock",
        6.9,
        "Resistance Bands",
        "Loop band around hand and press fist against a wall at eye level with knuckles cocked upward. Drive rising tension into the wall for 15 seconds of unyielding static recruitment."
    ),

    # --- SUPINATION & HOOK CONTAINMENT (Home: 16) ---
    (
        "Banded Table-Pad Deep Hook Supination Pull",
        7.5,
        "Resistance Bands",
        "Anchor heavy band to side of table. Plant elbow on pad, turn palm fully upward into supination with wrist cupped, and pull hand inward toward your chest against heavy elastic resistance."
    ),
    (
        "Heavy Backpack Supinated Bicep-Lock Drag",
        7.4,
        "Backpack-weighted",
        "Load backpack with heavy weight. Hold top handle with underhand supinated grip, lock elbow at 85 degrees, and drag the weight across a smooth floor using upper body frame momentum."
    ),
    (
        "Doorframe Supinated Frame-Crush Isometric",
        6.7,
        "Bodyweight",
        "Stand inside doorway. Place supinated wrist against inner frame with elbow glued to hip. Drive entire torso forward and inward, creating a bone-on-bone hook lock for 15 seconds."
    ),
    (
        "Resistance Band Offset Supination Curl",
        7.1,
        "Resistance Bands",
        "Step on band. Loop band over the outer ulnar edge of palm. Curl upward while fighting the band's rotational pull to force deep activation of the supinator and biceps brachii."
    ),
    (
        "Table-Edge Towel Hook Drag Off Pad",
        7.3,
        "Backpack-weighted",
        "Thread towel through backpack. Rest elbow on table pad, turn palm supine with cupped fingers, and drag backward 4 inches across the pad to simulate an offensive hook drag."
    ),
    (
        "Banded Low-Pulley Hook Lock Hold",
        7.6,
        "Resistance Bands",
        "Anchor band low on table opposite side. Lock hand into deep hook with cupped wrist and supinated forearm. Hold static against heavy tension for 15 seconds with chest clamped to hand."
    ),
    (
        "Backpack Supinated Short-Range Bicep Pulses",
        7.0,
        "Backpack-weighted",
        "Sit on chair holding heavy backpack in underhand grip. Pulse through 75-95 degrees of elbow flexion with wrist cupped, building the specific joint angle strength needed for hook battles."
    ),
    (
        "Resistance Band Cross-Body Supination Snap",
        7.2,
        "Resistance Bands",
        "Anchor band to door at waist height. Face 45 degrees away. Snap hand into deep supination and pull across torso to simulate diving into a deep defensive hook."
    ),
    (
        "Towel-Wrapped Inverted Table Supinated Row",
        6.9,
        "Bodyweight",
        "Lie beneath a sturdy table. Grip table underside with supinated cupped hand. Pull chest upward to table lip, holding isometric tension at 90-degree elbow bend for 10 seconds."
    ),
    (
        "Banded Hook Transition Under Table-Pad Tension",
        7.4,
        "Resistance Bands",
        "Set elbow on pad with band pulling hand open. Forcefully supinate and cup inward against the band, drilling the exact movement required to force an outside puller into your hook."
    ),
    (
        "Heavy Backpack Supinated Concentration Hold",
        7.2,
        "Backpack-weighted",
        "Brace elbow against inner thigh with underhand grip on a heavy backpack. Hold at 90 degrees with wrist curled upward for 15 seconds of intense bicep and forearm contraction."
    ),
    (
        "Door-Anchor Banded Supination Sweep",
        7.1,
        "Resistance Bands",
        "Anchor band at hip level on door. Start with hand in neutral, then explosively rotate into full supination while stepping inward with the lead foot to lock your shoulder frame."
    ),
    (
        "Table-Braced Supinated Forearm Squeeze Hold",
        6.6,
        "Bodyweight",
        "Plant both elbows on table pad. Lock fingers together in underhand grip and pull both arms inward toward your chest in a self-resisted isometric hook battle for 15 seconds."
    ),
    (
        "Backpack Lateral Hook Frame Drag",
        7.5,
        "Backpack-weighted",
        "Hold heavy backpack in deep hook position with elbow against ribs. Step laterally across the floor, fighting the swaying load using lat containment and supinated bicep strength."
    ),
    (
        "Resistance Band High-Tension Hook Pin Simulation",
        7.6,
        "Resistance Bands",
        "Anchor heavy band. In deep hook position with supinated forearm, drive downward and laterally toward an imaginary pin pad, focusing on smooth shoulder and hip coordination."
    ),
    (
        "Towel-Loop Supination Eccentric Resister",
        6.8,
        "Backpack-weighted",
        "Wrap towel around a backpack handle with underhand grip. Curl to top with both arms, release non-working arm, and lower through slow 5-second eccentric supinated extension."
    ),

    # --- SIDE PRESSURE & CHEST/SHOULDER FRAME (Home: 16) ---
    (
        "Doorframe Full-Body Lateral Side-Pressure Drive",
        7.2,
        "Bodyweight",
        "Stand sideways in a doorframe with elbow at 90 degrees braced on hip. Press inner forearm into the frame using whole-body core and hip rotation for 15 seconds of static drive."
    ),
    (
        "Heavy Resistance Band Table Side-Pressure Slam",
        7.7,
        "Resistance Bands",
        "Anchor thick band to the side at table level. Plant elbow on pad, lock hand directly in front of shoulder, and drive sideways toward the pin pad against massive band resistance."
    ),
    (
        "Table-Pad Elbow-Anchored Towel Side Press",
        7.4,
        "Backpack-weighted",
        "Set elbow on table pad. Thread towel through heavy backpack hanging off table edge. Drive forearm laterally inward across the pad, lifting the backpack via internal humerus rotation."
    ),
    (
        "Resistance Band 90-Degree Frame Lock Walkout",
        7.3,
        "Resistance Bands",
        "Anchor heavy band at chest height. Lock arm at 90 degrees against chest in side-pressure frame. Walk laterally 3 steps away from anchor, holding static frame alignment against elastic pull."
    ),
    (
        "Kneeling Table Frame-Crush Isometric",
        6.9,
        "Bodyweight",
        "Kneel at heavy desk. Brace forearm against desk edge in winning position. Lean 70% of bodyweight forward and inward, conditioning subscapularis and elbow connective tissue for 12 seconds."
    ),
    (
        "Banded Internal Rotation Side-Pressure Pulse",
        7.5,
        "Resistance Bands",
        "Anchor band at elbow level. Keep elbow pinned to hip with towel roll cushion. Drive forearm inward across stomach through internal shoulder rotation, performing 12 high-tension pulses."
    ),
    (
        "Backpack Shoulder-Committed Frame Press",
        7.6,
        "Backpack-weighted",
        "Get in combat stance. Commit shoulder behind the hand with elbow at 85 degrees. Push a heavy backpack horizontally across a slick table using triceps and bodyweight frame drive."
    ),
    (
        "Doorway Corner Isometric Flop-Wrist Press Lock",
        6.8,
        "Bodyweight",
        "Position triceps and rear humerus against a doorframe with wrist slightly extended (flop posture). Press bodyweight forward into the frame to condition the elbow joint for pressing defense."
    ),
    (
        "Resistance Band Cross-Table Pin Drive",
        7.8,
        "Resistance Bands",
        "Anchor heavy band perpendicular to table. Plant elbow on pad. Drive across the body in a decisive pinning motion, keeping your chest tightly glued to the hand throughout."
    ),
    (
        "Towel-Wrapped Wall Corner Side-Pressure Drive",
        7.0,
        "Bodyweight",
        "Place towel on interior wall corner. Plant forearm and elbow against wall at table height. Drive body weight inward with 80% maximum effort for 15 seconds of static frame training."
    ),
    (
        "Backpack Lateral Table Drag Off Pad",
        7.3,
        "Backpack-weighted",
        "Connect backpack strap around wrist. Rest elbow on table pad and drag the forearm laterally toward your opposite side, lifting the backpack off the floor through pure side pressure."
    ),
    (
        "Resistance Band Heavy Frame Containment Hold",
        7.5,
        "Resistance Bands",
        "Anchor band to side wall. Step into combat stance, lock arm in winning position, and hold against extreme band tension for 15 seconds without letting the hand move away from chest."
    ),
    (
        "Seated Table Side-Pressure Isometric Pad Push",
        7.1,
        "Resistance Bands",
        "Sit at table with elbow on pad. Anchor band to outer table leg. Drive hand inward 3 inches and hold static lock against band for 12 seconds, training joint angle specific stability."
    ),
    (
        "Heavy Backpack Cross-Body Frame Shove",
        7.4,
        "Backpack-weighted",
        "Hold heavy backpack with both hands clamped on top. Stand in combat stance and push sideways across a table using torso rotation, building synchronized core and shoulder drive."
    ),
    (
        "Resistance Band High-Angle Side Pressure Sweep",
        7.6,
        "Resistance Bands",
        "Anchor band high to the side. Step in with front shoulder committed forward and sweep hand downward and inward toward the pin pad, grooving the high-to-low side pressure vector."
    ),
    (
        "Doorframe Static Table-Pin Simulation",
        6.7,
        "Bodyweight",
        "Set up at doorframe at table height. Place inner forearm against frame in pin-pad position. Drive continuous isometric force through the frame for 12 seconds with packed shoulder."
    ),

    # --- BACKPRESSURE & LAT DRAG (Home: 14) ---
    (
        "Heavy Resistance Band 90-Degree Locked Lat Row",
        7.6,
        "Resistance Bands",
        "Anchor thick looped band at chest level on door. Lock elbow at exactly 90 degrees with hammer grip. Drive body backward using latissimus dorsi, holding position for 3 seconds per rep."
    ),
    (
        "Backpack Hammer-Grip Brachioradialis Table Drag",
        7.5,
        "Backpack-weighted",
        "Rest elbow on table pad. Grip top handle of heavily loaded backpack in vertical hammer grip. Drag elbow backward across pad 3 inches, lifting backpack off floor via backpressure."
    ),
    (
        "Doorway Inverted Isometric Backpressure Hang",
        7.2,
        "Bodyweight",
        "Face a sturdy doorway. Grip door frame with both hands in hammer orientation, elbows locked at 85 degrees. Lean body backward at 45-degree angle and hold static tension for 15 seconds."
    ),
    (
        "Judo Belt Suspended Backpack Hammer Hold",
        7.7,
        "Backpack-weighted",
        "Loop judo belt through heavy backpack. Grip belt in vertical hand with elbow bent to 90 degrees tight against ribs. Hold static hammer lock for 20 seconds of intense brachioradialis burn."
    ),
    (
        "Resistance Band High-Anchor Backpressure Lat Sweep",
        7.4,
        "Resistance Bands",
        "Anchor band high on door. Grip with cupped hand. Drag backward and downward using latissimus dorsi activation, mimicking a counter-offensive toproll pull on an opponent's arm."
    ),
    (
        "Table-Edge Towel Lat Drag Off Pad",
        7.3,
        "Backpack-weighted",
        "Wrap towel around backpack handle. Plant elbow on table pad and pull elbow backward toward your hip, keeping the hand and wrist locked in an unyielding right angle."
    ),
    (
        "Resistance Band Neutral-Grip Iso-Pinch Backpressure Hold",
        7.1,
        "Resistance Bands",
        "Pinch band ends tightly between fingertips and thumb. Pull backward against heavy band tension with elbow glued to your side, integrating finger containment with lat backpressure."
    ),
    (
        "Backpack Posting Backpressure Deadlift",
        7.5,
        "Backpack-weighted",
        "Loop strap over index knuckle. Keep elbow bent at 90 degrees with knuckles high. Lift heavy backpack straight off floor by standing up, transferring load directly through backpressure."
    ),
    (
        "Seated Table Banded Backpressure Pulses",
        7.4,
        "Resistance Bands",
        "Sit at table with elbow on pad. Anchor band directly in front. Execute 12 short-range rearward elbow drags, keeping the forearm strictly vertical to enforce pure backpressure recruitment."
    ),
    (
        "Under-Table Single-Arm Suspended Inverted Row",
        7.0,
        "Bodyweight",
        "Lie under a heavy dining table. Grip table underside with one hand in hammer position with feet on floor. Pull chest upward and hold for 10 seconds of intense single-arm backpressure."
    ),
    (
        "Resistance Band Low-Angle Backpressure Drag",
        7.3,
        "Resistance Bands",
        "Anchor band at base of door. Stand in combat stance and drag arm backward and upward along a 45-degree plane, developing the foundational backpressure needed to defend against a hook."
    ),
    (
        "Heavy Backpack Preacher-Locked Backpressure Hold",
        7.6,
        "Backpack-weighted",
        "Brace upper arm against back of a sofa or chair at 45 degrees. Hold heavy backpack in hammer grip with elbow at 90 degrees. Hold statically for 15 seconds against gravity."
    ),
    (
        "Door-Anchor Banded Lat Drag With Table Stance",
        7.5,
        "Resistance Bands",
        "Anchor band at table height. Step back into tournament stance. Drag elbow backward along hip with 85-degree elbow lock, holding peak lat and bicep contraction for 3 seconds."
    ),
    (
        "Towel-Loop Static Backpressure Table Clamp",
        6.9,
        "Bodyweight",
        "Hook a rolled towel under a heavy table leg. Grip both ends with elbow bent at 90 degrees. Pull upward and backward with maximal effort for 12 seconds of static lat and bicep recruitment."
    ),
]

int_gym_data = [
    # --- GYM: CABLE PRONATION & TOPROLL (12) ---
    (
        "Cable Judo Strap High-Anchor Pronation Roll",
        7.5,
        "Cable",
        "Attach a heavy judo belt to a high cable pulley. Wrap strap over thumb and across back of hand. Plant elbow on an arm wrestling table pad, step back, and execute a dynamic downward pronation roll against the weight stack."
    ),
    (
        "Cable Eccentric Handle Pronator Rotation",
        7.7,
        "Cable",
        "Connect an eccentric (off-center) arm wrestling handle to a mid-pulley. Rest elbow on preacher bench. Rotate forearm from neutral into full pronation, overcoming the off-center axis of resistance."
    ),
    (
        "Standing Cable Multi-Spinner Pronation Drag",
        7.6,
        "Cable",
        "Attach a multi-spinner cylinder handle to chest-height cable. Grip top cone with thumb-up orientation and pull backward into backpressure while rolling the thumb down into pronation."
    ),
    (
        "Cable Low-Pulley Posting Pronation Lift",
        7.4,
        "Cable",
        "Set pulley at floor height with strap looped over thumb. Stand at table pad, cock wrist into rise, and lift cable weight straight up while pronating inward to simulate posting toproll entry."
    ),
    (
        "Cable Wrist Wrench Heavy Pronation Sweep",
        7.8,
        "Cable",
        "Attach a 2.5-inch rolling wrist wrench to a cable set at table height. Grip wrench, keep elbow on pad, and sweep hand inward into pronation while combating the wrench's tendency to kick back."
    ),
    (
        "Preacher Bench Heavy Dumbbell Offset Pronation",
        7.2,
        "Dumbbells",
        "Rest forearm flat across a preacher curl bench. Hold a dumbbell loaded only on the thumb side. Control the descent into supination, then explosively contract the pronator muscles back to vertical."
    ),
    (
        "Cable Table-Pad Pronation Isometric Hold",
        7.5,
        "Cable",
        "Set mid-height cable connected to a strap around thumb. Plant elbow on table pad in winning position. Hold full pronation statically against the weight stack for 15 seconds."
    ),
    (
        "Cable Low-Cross Pronation Counter-Hook Sweep",
        7.3,
        "Cable",
        "Attach strap to low cable on opposite side. Plant elbow on pad, reach across, and sweep the hand upward and across your chest into full pronation to drill counter-hook finger stripping."
    ),
    (
        "Seated Cable Cone-Grip Pronator Pulses",
        7.4,
        "Cable",
        "Connect a cone handle with wide base toward thumb. Rest elbow on knee. Perform 10 controlled pronation pulses against the weight stack, focusing on deep muscle activation at the elbow joint."
    ),
    (
        "Cable Standing High-Pulley Toproll Drive",
        7.6,
        "Cable",
        "Set pulley above head height. Wrap strap around knuckles and thumb. Step into tournament stance and pull downward and backward, driving elbow to rear edge of the pad."
    ),
    (
        "Dumbbell Hammer-To-Pronation Preacher Roll",
        7.1,
        "Dumbbells",
        "Rest upper arm on preacher bench with heavy dumbbell in hammer grip. Lower slightly, then curl and rotate forearm into pronation at the top of the contraction."
    ),
    (
        "Cable Dual-Pulley Opposing Pronation Lock",
        7.7,
        "Cable",
        "Attach strap from high pulley across thumb and strap from low pulley across wrist. Maintain isometric pronation and rising simultaneously against the dual directional shear force."
    ),

    # --- GYM: WRIST CUPPING & FLEXION (10) ---
    (
        "Barbell Heavy Seated Table Wrist Curl",
        7.4,
        "Barbell",
        "Sit on flat bench with forearms resting across thighs and wrists hanging past knees. Load an Olympic barbell with heavy plates and execute strict wrist curls through complete active flexion."
    ),
    (
        "Cable Rolling Thunder Wrist Flexion Curl",
        7.7,
        "Cable",
        "Attach a 2.375-inch Rolling Thunder handle to a low cable pulley. Stand tall and curl wrist inward, resisting the rotating cylinder's attempt to pry open the fingers."
    ),
    (
        "Preacher Bench Dumbbell Heavy Single-Arm Wrist Curl",
        7.2,
        "Dumbbells",
        "Anchor forearm flat along a 45-degree preacher bench pad. Hold heavy dumbbell with palm facing ceiling and perform slow, controlled wrist flexions with a 2-second squeeze at the apex."
    ),
    (
        "Cable Wrist Wrench Table Cupping Drag",
        7.8,
        "Cable",
        "Connect a thick wrist wrench to a table-height cable. Plant elbow on table pad and curl wrist inward while dragging the elbow backward 2 inches along the pad surface."
    ),
    (
        "EZ-Bar Reverse-Camber Heavy Table Wrist Curl",
        7.3,
        "EZ-Bar",
        "Rest forearms on flat bench holding an EZ-bar on the outer camber. Perform heavy wrist curls to overload the flexor carpi ulnaris under a comfortable wrist angle."
    ),
    (
        "Cable Thick-Bar Standing Cupping Hold",
        7.5,
        "Cable",
        "Connect a 3-inch thick fat bar to a low cable. Stand upright and curl wrists into maximum flexion against the stack, holding the peak static contraction for 12 seconds."
    ),
    (
        "Machine Seated Forearm Wrist Flexor Isolation",
        6.9,
        "Machine",
        "Lock forearms into a dedicated wrist curl machine with heavy pin setting. Flex wrists through full range, pausing at peak contraction to build deep carpal flexor hypertrophy."
    ),
    (
        "Cable Multi-Spinner Palmar Hook Cupping",
        7.6,
        "Cable",
        "Attach multi-spinner handle to low pulley. Grip bottom flange with fingers deeply hooked and curl wrist into full carpal flexion against the stack resistance."
    ),
    (
        "Barbell Behind-The-Back Standing Wrist Curl",
        7.3,
        "Barbell",
        "Hold loaded Olympic barbell behind your glutes with underhand grip. Curl wrists upward toward ceiling, squeezing forearm flexors tightly without allowing elbows to swing."
    ),
    (
        "Cable Low-Pulley Eccentric Wrist Extension Catch",
        7.4,
        "Cable",
        "Grip cable handle with cupped wrist. Allow weight stack to pull wrist into controlled eccentric extension over 4 seconds, then explosively cup back into full flexion."
    ),

    # --- GYM: RISING & RADIAL DEVIATION (8) ---
    (
        "Cable Low-Pulley Judo Belt Rising Pull",
        7.7,
        "Cable",
        "Attach a heavy judo belt to a low cable. Wrap belt over top of index finger knuckle. Plant elbow on table pad and lift wrist straight upward into maximum radial rise against the stack."
    ),
    (
        "Dumbbell Standing Heavy Hammer Radial Rise",
        7.3,
        "Dumbbells",
        "Hold heavy dumbbell at side in hammer grip with elbow at 90 degrees. Cock wrist upward into full radial deviation without swinging torso, targeting extensor carpi radialis longus."
    ),
    (
        "Cable Multi-Spinner High-Post Rising Vector",
        7.8,
        "Cable",
        "Connect multi-spinner to mid-height cable. Grip near top conical flange, plant elbow on table pad, and drive wrist upward into rise while pulling backward into backpressure."
    ),
    (
        "Barbell Plate-Loaded Wrist Roller Rising Lift",
        7.4,
        "Barbell",
        "Mount a wrist roller device on a power rack pin. Roll the cord upward using upward radial cocking motions rather than standard wrist curls to specifically target rising strength."
    ),
    (
        "Cable Table-Pad Isometric High-Post Lock",
        7.6,
        "Cable",
        "Set mid-pulley at table height with strap around knuckles. Elevate wrist into maximum rise and hold statically against the weight stack for 15 seconds without losing knuckle height."
    ),
    (
        "Dumbbell Preacher Bench Radial Deviation Lever",
        7.2,
        "Dumbbells",
        "Rest forearm horizontally along a preacher bench. Hold dumbbell by rear bell only and elevate the front bell upward using pure radial wrist flexors."
    ),
    (
        "Cable Low-Angle Rising Drag With Pad Transition",
        7.5,
        "Cable",
        "Attach strap to low pulley. Step into combat stance on table pad. Pull upward and backward, keeping the knuckles higher than the wrist joint throughout the entire range."
    ),
    (
        "Machine Lever Arm Wrist Rising Elevation",
        7.1,
        "Machine",
        "Position forearm on machine support pad. Hook hand under lever arm attachment and lift upward into radial deviation against plate-loaded resistance."
    ),

    # --- GYM: SUPINATION & HOOK BIOMECHANICS (8) ---
    (
        "Cable Low-Pulley Heavy Supinated Hook Curl",
        7.7,
        "Cable",
        "Attach D-handle to low pulley. Set elbow on preacher pad in deep hook posture with palm fully supinated and wrist cupped. Curl cable upward toward opposite clavicle."
    ),
    (
        "Cable Thick-Rope Supinated Table Drag",
        7.5,
        "Cable",
        "Connect thick rope attachment to mid-pulley. Grip one end with palm facing ceiling and elbow tight to hip. Drag weight backward across floor while maintaining strict supination."
    ),
    (
        "Preacher Bench Heavy Dumbbell Offset Supination",
        7.3,
        "Dumbbells",
        "Rest forearm on preacher bench holding a dumbbell weighted heavily on the pinky side. Lower into pronation under control, then contract supinator muscle to return to vertical."
    ),
    (
        "Cable Table-Pad Deep Hook Isometric Lock",
        7.8,
        "Cable",
        "Set cable pulley level with arm wrestling table. Lock hand into deep supination and wrist flexion on table pad. Hold static tension against the weight stack for 15 seconds."
    ),
    (
        "Cable Low-Cross Supination Hook Sweep",
        7.6,
        "Cable",
        "Attach single handle to low cable opposite side. Grip handle, step into hook stance, and sweep hand across your chest into deep supinated containment."
    ),
    (
        "Machine Bicep Curl Single-Arm Supinated Lock",
        7.2,
        "Machine",
        "On a seated selectorized bicep machine, pull handle to 85 degrees elbow flexion with hand supinated and wrist cupped. Hold static contraction against stack for 12 seconds."
    ),
    (
        "Cable Multi-Spinner Supinated Carpal Drag",
        7.7,
        "Cable",
        "Attach multi-spinner to low pulley. Grip with supinated palm, cupping the bottom lip, and drag backward across table pad to build crushing hook containment."
    ),
    (
        "EZ-Bar Close-Grip Supinated Preacher Lock",
        7.4,
        "EZ-Bar",
        "Rest upper arms on preacher bench holding inner camber of EZ-bar with supinated grip and cupped wrists. Hold barbell at 90-degree flexion for 15 seconds of intense tendon load."
    ),

    # --- GYM: SIDE PRESSURE & BACKPRESSURE (8) ---
    (
        "Cable Table-Height Side Pressure Pin Drive",
        7.8,
        "Cable",
        "Set cable pulley level with table pad. Grip handle with elbow anchored on pad and drive forearm laterally inward toward pin pad, engaging entire chest, shoulder, and hip frame."
    ),
    (
        "Cable 90-Degree Locked Lat Backpressure Row",
        7.7,
        "Cable",
        "Connect strap handle to chest-height cable. Lock elbow at exactly 90 degrees in neutral hammer grip and pull body backward using latissimus dorsi, holding position for 3 seconds."
    ),
    (
        "Cable Multi-Angle Arm Wrestling Frame Lock",
        7.6,
        "Cable",
        "Set pulley at shoulder height. Step into combat stance, lock elbow at 85 degrees against ribs, and hold cable under static isometric tension while shifting feet in small pivot steps."
    ),
    (
        "Preacher Bench Heavy Dumbbell Hammer Backpressure Hold",
        7.4,
        "Dumbbells",
        "Place upper arm on 45-degree preacher bench. Hold heavy dumbbell in hammer grip at a 90-degree elbow lock. Hold statically for 15 seconds against gravity's downward moment arm."
    ),
    (
        "Cable Standing Cross-Body Side-Pressure Sweep",
        7.9,
        "Cable",
        "Set pulley at elbow level. Step into combat stance with chest over hand. Drive inward and downward toward an imaginary pin pad, keeping the shoulder-to-hand distance immovable."
    ),
    (
        "Cable High-Anchor Lat Backpressure Pull-Down",
        7.5,
        "Cable",
        "Set cable high. Grip strap with cupped hand and locked 90-degree elbow. Pull straight down and backward using latissimus dorsi, simulating a high toproll backpressure drag."
    ),
    (
        "Machine Preacher Hammer Curl Isometric Stop",
        7.3,
        "Machine",
        "Using a seated plate-loaded preacher curl machine, pull handle to 90 degrees with neutral grip. Freeze motion and hold against the plates for 12 seconds of brachialis overload."
    ),
    (
        "Cable Table-Height Rotator Cuff Frame Lock",
        7.6,
        "Cable",
        "Set cable at elbow level. Plant elbow on table pad and hold handle in neutral position. Maintain an unyielding 90-degree internal rotation frame against lateral pull for 15 seconds."
    ),
]

if __name__ == "__main__":
    print(f"Intermediate Home Count: {len(int_home_data)} (Target: 106)")
    print(f"Intermediate Gym Count: {len(int_gym_data)} (Target: 46)")
    print(f"Total Intermediate Count: {len(int_home_data) + len(int_gym_data)} (Target: 152)")
    assert len(int_home_data) == 106
    assert len(int_gym_data) == 46
    for item in int_home_data + int_gym_data:
        assert 6.1 <= item[1] <= 8.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Intermediate exercise: {item[0]}"
    print("Intermediate validation passed!")
