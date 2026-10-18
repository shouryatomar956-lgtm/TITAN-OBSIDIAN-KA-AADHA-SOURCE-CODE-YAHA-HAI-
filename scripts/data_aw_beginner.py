#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 11: ARM WRESTLING PRACTICE - BEGINNER TIER (Total: 88 Exercises)
# 62 Home (70%) + 26 Gym (30%)
# Validated Combat Sports Biomechanics, Arm Wrestling Kinematics, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 1.0 and 6.0 (typically 4.2 - 6.0)
# ==============================================================================

beg_home_data = [
    # --- PRONATION & TOPROLL VECTOR (Home: 12) ---
    (
        "Resistance Band Neutral-Grip Pronation Turn",
        4.8,
        "Resistance Bands",
        "Anchor light resistance band at elbow height to a door frame. Loop around the radial styloid process and across the back of the hand. Start with forearm parallel to floor in neutral position and rotate forearm into full pronation while stabilizing the elbow against your torso."
    ),
    (
        "Towel-Loop Pronation Isometric Wall Press",
        4.5,
        "Bodyweight",
        "Wrap a thick cotton towel around the thumb web and outer wrist. Press the forearm against a wall corner at a 90-degree elbow flexion angle, driving rotational pronation torque into the towel for 12-second sustained isometric contractions."
    ),
    (
        "Seated Backpack Strap Pronation Roll",
        5.2,
        "Backpack-weighted",
        "Rest elbow firmly on a flat table or knee. Thread the backpack strap over the radial edge of the thumb joint. Keep wrist flat and pronate inward against the gravity-dependent load, stopping immediately if wrist alignment buckles."
    ),
    (
        "Standing High-Anchor Band Toproll Entry",
        5.4,
        "Resistance Bands",
        "Anchor band high on a door frame. Loop across knuckles and thumb root. Initiate movement with a slight upward rise of the radial bone followed by sharp inward pronation, mimicking an opening toproll entry against moderate elastic resistance."
    ),
    (
        "Doorframe Braced Isometric Pronator Terus Lock",
        5.0,
        "Bodyweight",
        "Position your inner elbow and forearm against a door jamb at 100 degrees elbow angle. Attempt to forcefully rotate the thumb downward and inward into the frame without allowing the shoulder to drift forward."
    ),
    (
        "Prone Floor Towel Pronation Drag",
        4.6,
        "Bodyweight",
        "Kneel on floor with elbow planted on a cushion. Wrap a rolled towel across the thumb and under the wrist, gripping both ends. Pull rotational pronation while maintaining a static 90-degree elbow lock."
    ),
    (
        "Low-Anchor Banded Pronation Sweep",
        5.1,
        "Resistance Bands",
        "Anchor band at ankle height. Loop around the back of the hand and across thumb. Stand with elbow tucked at hip and rotate the forearm inward, targeting the pronator quadratus and distal pronator teres fibers."
    ),
    (
        "Light Backpack Thumb-Loaded Posting Pronation",
        5.3,
        "Backpack-weighted",
        "Load backpack with 4-6 kg. Drape strap over the radial thumb crease. Rest forearm on thigh and execute controlled wrist rotations while keeping the knuckles elevated to prevent loss of height."
    ),
    (
        "Double-Wrapped Towel Resistance Pronation Pivot",
        4.7,
        "Resistance Bands",
        "Wrap a hand towel around an anchored band to increase grip diameter. Rotate hand from neutral to full pronation against elastic tension, focusing on keeping the hand rigid without flexing the wrist prematurely."
    ),
    (
        "Seated Table-Edge Band Toproll Pull",
        5.5,
        "Resistance Bands",
        "Sit at a household table with elbow planted on a pad. Anchor band across the table. Grip band around the base of the fingers, driving backward elbow drag while simultaneously rotating the thumb inward."
    ),
    (
        "Banded Isometric Pronation Breakaway Hold",
        4.9,
        "Resistance Bands",
        "Set band under moderate tension with strap over thumb. Rotate into full pronation at 90-degree elbow flexion and maintain an unyielding isometric hold for 15 seconds, training tendon resilience at the medial epicondyle."
    ),
    (
        "Household Strap Radial Pronation Glide",
        4.4,
        "Backpack-weighted",
        "Loop a non-elastic luggage strap across the radial styloid. Lift a light floor weight using purely rotational forearm torque, keeping the humeral head packed in the glenoid fossa."
    ),

    # --- WRIST CUPPING & FLEXION (Home: 12) ---
    (
        "Table-Supported Towel Wrist Flexion Curl",
        4.9,
        "Backpack-weighted",
        "Rest dorsal forearm flat on a sturdy table with wrist hanging over the edge. Grip a rolled towel connected to a backpack strap and curl the wrist through a strict concentric flexion range, holding the peak contraction for 1 second."
    ),
    (
        "Banded Palm-Loaded Wrist Cupping Curl",
        5.1,
        "Resistance Bands",
        "Stand on a resistance band, grasping the end directly across the metacarpal heads. Perform controlled wrist curls upward, prioritizing the flexor carpi radialis and ulnaris without bending the elbow."
    ),
    (
        "Kneeling Foam-Pad Table Cupping Hold",
        4.7,
        "Bodyweight",
        "Kneel before a table with elbow firmly anchored. Form a fist and hook fingers over the table edge or a raised book spine, pulling a static isometric cup against immovable counter resistance for 15 seconds."
    ),
    (
        "Backpack Thick-Handle Wrist Curl",
        5.3,
        "Backpack-weighted",
        "Wrap a thick sock or towel around the top carry handle of a weighted backpack. Rest forearm on your knee and perform slow wrist flexions with deliberate 3-second lowering eccentric phases."
    ),
    (
        "Seated Dual-Leg Banded Cupping Pulse",
        4.6,
        "Resistance Bands",
        "Sit on a chair with band anchored under both feet. Rest wrists over knees with palms facing ceiling. Perform synchronized wrist curls focusing on deep wrist flexion at the carpometacarpal joints."
    ),
    (
        "Isometric Door-Pillow Wrist Cupping Clamp",
        4.3,
        "Bodyweight",
        "Place a small pillow against a door jamb. Dig the palmar surface and flexed wrist into the door frame at competition table height, generating 10-second static cupping pressure."
    ),
    (
        "Single-Arm Banded Finger-To-Palm Roll",
        5.0,
        "Resistance Bands",
        "Hold band handle in open fingertips. Roll the band into the palm through finger flexion, then finish with full wrist flexion, training progressive deep-hook closure mechanics."
    ),
    (
        "Backpack Strap Deep Hook Wrist Squeeze",
        5.2,
        "Backpack-weighted",
        "Thread a thick strap through a weighted backpack. Cup wrist inward at a 45-degree angle (hook posture) and execute controlled short-range flexion pulses to prime deep hook tendon tolerance."
    ),
    (
        "Seated Reverse Table Wrist Flexion Hold",
        4.8,
        "Bodyweight",
        "Sit with forearms resting supine on thighs. Clench fists firmly with wrists curled into maximum flexion and hold for 20 seconds to build baseline muscular endurance in the forearm anterior compartment."
    ),
    (
        "Banded Resistance Knuckle-Drive Wrist Curl",
        5.4,
        "Resistance Bands",
        "Anchor band low behind you. Pull band over knee with palm up. Curl the wrist upward leading with the knuckles, building the exact flexion trajectory used during a defensive cup recovery."
    ),
    (
        "Towel-Wrapped Book Isometric Wrist Pinch-Cup",
        4.4,
        "Bodyweight",
        "Pinch a thick hardcover book wrapped in a tea towel. Flex wrist upward against gravity while maintaining maximal fingertip friction and hold for 15 seconds per hand."
    ),
    (
        "Prone Table Wrist Flexion Isometric Lock",
        4.7,
        "Resistance Bands",
        "Anchor band in front of your table pad. Pull wrist into full flexion at a 90-degree elbow joint angle and hold static tension, resisting the band's attempt to flatten out the wrist joint."
    ),

    # --- RISING & RADIAL DEVIATION (Home: 10) ---
    (
        "Banded Hammer-Grip Radial Rise",
        5.0,
        "Resistance Bands",
        "Stand holding a resistance band anchored beneath your opposite foot. Grip band in a vertical fist (hammer orientation) and elevate the thumb-side of the wrist straight upward in pure radial deviation."
    ),
    (
        "Backpack Strap Thumb-Web Rising Lift",
        5.3,
        "Backpack-weighted",
        "Drape a sturdy backpack strap over the web between thumb and index finger. Keep elbow tucked tightly at your ribs at 90 degrees and lift the backpack purely through wrist rising mechanics."
    ),
    (
        "Table-Edge Supported Lever Rising Hold",
        4.8,
        "Resistance Bands",
        "Anchor band beneath a table leg. Run band up through a vertical fist with forearm resting on the table surface. Elevate the wrist into full rise and hold for 12 seconds, preventing wrist dump."
    ),
    (
        "Towel-Suspended Weight Radial Deviator",
        4.6,
        "Backpack-weighted",
        "Suspend a light backpack from a rolled kitchen towel gripped vertically. Maintain a 90-degree elbow bend and raise the thumb upward, isolating the extensor carpi radialis longus and brevis."
    ),
    (
        "Wall-Braced Isometric Rising Lock",
        4.5,
        "Bodyweight",
        "Stand perpendicular to a wall. Press the radial edge of your clenched fist upward against an immovable door frame or shelf support, driving continuous upward rising pressure."
    ),
    (
        "Banded High-Post Radial Elevation",
        5.2,
        "Resistance Bands",
        "Anchor band low and to the side. Stand in an arm wrestling combat stance and pull the band upward along the posting vector, ensuring the hand stays above the opponent's imaginary wrist level."
    ),
    (
        "Household Belt Vertical Rising Pull",
        5.1,
        "Backpack-weighted",
        "Loop a leather trouser belt or martial arts belt around a loaded backpack. Grip belt vertically like a sword handle and execute controlled rising pulses without leaning the torso back."
    ),
    (
        "Seated Forearm-Grounded Band Radial Lift",
        4.7,
        "Resistance Bands",
        "Sit with forearm resting horizontally along a table. Hold band anchored at the table base and perform rhythmic radial deviation upward, keeping forearm bone flush against the surface."
    ),
    (
        "Door-Anchor Low-Angle Banded Rising Sweep",
        5.4,
        "Resistance Bands",
        "Anchor band at base of a door. Face door in combat stance and elevate the wrist upward and backward simultaneously, establishing the crucial foundation of posting toproll control."
    ),
    (
        "Static Towel High-Thumb Isometric Hold",
        4.3,
        "Bodyweight",
        "Kneel at table edge. Hook fingers through a towel anchored under your knee. Lock wrist into full radial deviation and hold for 15 seconds with maximum focus on tendon stiffness."
    ),

    # --- SUPINATION & HOOK BIOMECHANICS (Home: 9) ---
    (
        "Banded Forearm Supination Twist",
        4.8,
        "Resistance Bands",
        "Anchor band at hip level. Loop band over ulnar edge of wrist and across palm. Starting from neutral, rotate forearm outward into supination against elastic resistance, driving into a classic hook position."
    ),
    (
        "Towel-Wrapped Backpack Hook Drag",
        5.2,
        "Backpack-weighted",
        "Thread a thick towel through a weighted backpack handle. Stand in hook stance, rotate forearm supine with wrist cupped, and drag backpack 6 inches along the floor toward your hip."
    ),
    (
        "Doorway Isometric Supinated Bicep-Chest Lock",
        4.6,
        "Bodyweight",
        "Step inside a doorway. Place supinated wrist against the inner frame with elbow pinned tightly to lower ribs. Drive the body frame inward to create a locked-in hook simulation."
    ),
    (
        "Banded Underhand Bicep-Forearm Supination Curl",
        5.0,
        "Resistance Bands",
        "Step on band with same-side foot. Curl band with palm fully supinated while keeping the wrist tightly curled inward, reinforcing the primary arm wrestling hook connection."
    ),
    (
        "Table-Braced Supinator Muscle Isometric Press",
        4.4,
        "Bodyweight",
        "Rest elbow on table pad. Turn palm toward face and press the outer edge of wrist against a sturdy post or wall corner, engaging the supinator and biceps brachii statically for 12 seconds."
    ),
    (
        "Backpack Hook-Lock Elbow Drag",
        5.3,
        "Backpack-weighted",
        "Hold backpack with underhand supinated grip and cupped wrist. Keep elbow at strict 85-degree flexion and drag the load backward across a carpeted floor using lat and bicep tension."
    ),
    (
        "Low-Anchor Banded Supination Pull-Through",
        4.9,
        "Resistance Bands",
        "Anchor band low to the side. Grip band across fingers with palm facing up. Pull across the body while maintaining deep supination, grooving the inward hook commitment vector."
    ),
    (
        "Banded Isometric Deep Hook Table Anchor",
        5.1,
        "Resistance Bands",
        "Attach band across table. Pull wrist into full supination and flexion, setting elbow on pad. Hold static position against the elastic tension for 15 seconds without letting the hand open."
    ),
    (
        "Towel-Grip Supinated Forearm Rotation Pulse",
        4.7,
        "Resistance Bands",
        "Wrap towel around a resistance band. Grip towel in neutral and pulse into supination against band resistance, feeling the activation of deep forearm rotators and bicep insertion."
    ),

    # --- SIDE PRESSURE & CHEST/SHOULDER FRAME (Home: 10) ---
    (
        "Doorframe Isometric Internal Rotation Frame Lock",
        4.9,
        "Bodyweight",
        "Stand facing a doorframe with elbow at 90 degrees and forearm tucked across stomach. Press palm and forearm horizontally into the frame, engaging pectoralis major and subscapularis as a rigid frame."
    ),
    (
        "Banded Table Side-Pressure Sweep",
        5.4,
        "Resistance Bands",
        "Anchor band perpendicular to table at elbow height. Plant elbow on a pad and drive the forearm horizontally across the body 4 inches while keeping the hand, wrist, and shoulder locked as one unit."
    ),
    (
        "Towel Door-Anchor Side Pressure Hold",
        5.1,
        "Resistance Bands",
        "Anchor band in door hinge with a towel grip. Stand in side-pressure stance and pull inward toward the center of your chest, holding static tension for 12 seconds with locked humerus alignment."
    ),
    (
        "Backpack Lateral Frame Push",
        5.0,
        "Backpack-weighted",
        "Lie on side on carpet with elbow resting on a pillow. Grip backpack strap with forearm at 90 degrees to torso. Rotate forearm upward toward ceiling against gravity through internal shoulder rotation."
    ),
    (
        "Wall-Braced Elbow-Pad Side Pressure Static Drive",
        4.7,
        "Bodyweight",
        "Plant elbow against a wall-mounted foam block at table height. Press forearm inward against the wall using whole-body hip and torso rotation rather than isolated arm movement."
    ),
    (
        "Resistance Band 90-Degree Side Pressure Pulse",
        5.3,
        "Resistance Bands",
        "Anchor band at rib level. Keep elbow pinned directly in front of hip at a strict right angle. Rotate torso slightly while driving the hand inward across the midline against elastic pull."
    ),
    (
        "Kneeling Table Frame Compression Hold",
        4.8,
        "Bodyweight",
        "Kneel next to a sturdy desk. Hook hand and forearm over desk edge and lean partial bodyweight inward, training the shoulder-girdle and elbow joint to absorb lateral combat stress safely."
    ),
    (
        "Banded Cross-Body Arm Wrestling Pin Simulation",
        5.5,
        "Resistance Bands",
        "Anchor band to the side. Set up in winning table posture and drive hand downward and across toward an imaginary pin pad, focusing on smooth torso follow-through and frame stability."
    ),
    (
        "Towel-Loop Isometric Corner Side Press",
        4.5,
        "Bodyweight",
        "Place a folded towel inside an interior wall corner. Press your forearm and clenched fist into the corner using chest and shoulder engagement for 15 continuous seconds."
    ),
    (
        "Backpack Frame-Locked Lateral Drag",
        5.2,
        "Backpack-weighted",
        "Loop backpack strap over wrist. Lock elbow at 90 degrees against ribs and step sideways across the room, maintaining total static frame tension against lateral backpack sway."
    ),

    # --- BACKPRESSURE & LAT/BICEP DRAG (Home: 9) ---
    (
        "Banded Hammer-Grip Backpressure Row",
        5.2,
        "Resistance Bands",
        "Anchor band at chest height on a door. Grip with vertical hand and pull elbow straight backward along your ribs, locking elbow angle at 85 degrees to build backpressure strength."
    ),
    (
        "Doorway Isometric Backpressure Table Drag",
        4.8,
        "Bodyweight",
        "Stand facing a doorway. Hook fingers around the door jamb with elbow bent at 90 degrees. Lean body backward and engage lats to exert steady rearward pulling force into the frame."
    ),
    (
        "Backpack 90-Degree Static Bicep-Brachialis Lock",
        5.5,
        "Backpack-weighted",
        "Load backpack with moderate weight. Grip top handle with hammer orientation, bend elbow to exactly 90 degrees, and hold statically for 20 seconds without allowing the elbow to open."
    ),
    (
        "Banded High-Angle Backpressure Drag",
        5.3,
        "Resistance Bands",
        "Anchor band high on a door. Grip with cupped wrist and neutral forearm. Drag backward and downward using latissimus dorsi activation, mimicking a counter-offensive toproll pull."
    ),
    (
        "Towel-Resisted Under-Table Inverted Drag",
        5.0,
        "Bodyweight",
        "Lie beneath a sturdy table. Grip the table edge with one hand in hammer position, feet planted on floor, and pull chest partially toward table edge, holding for 10 seconds of backpressure load."
    ),
    (
        "Seated Table-Edge Banded Lat Drag",
        5.4,
        "Resistance Bands",
        "Sit at table with elbow on a pad. Anchor band across table. Pull forearm and elbow backward toward your hip while maintaining a locked 90-degree elbow joint angle."
    ),
    (
        "Backpack Pronated Backpressure Lift",
        5.1,
        "Backpack-weighted",
        "Strap backpack around the thumb and across palm. Keep forearm pronated and pull vertically upward from floor using lat and brachioradialis tension to simulate a posting backpressure lift."
    ),
    (
        "Resistance Band Neutral-Grip Iso-Pinch Backpressure",
        4.9,
        "Resistance Bands",
        "Pinch band ends between fingers and thumb. Pull backward against band tension with elbow tight against the body, developing combined finger clamp and rearward pulling power."
    ),
    (
        "Isometric Belt-Anchor Hammer Hold",
        4.6,
        "Backpack-weighted",
        "Loop a non-elastic strap around a loaded backpack on the floor. Stand upright, lock elbow at 90 degrees with thumb facing ceiling, and pull upward against floor weight for a 15-second static lock."
    ),
]

beg_gym_data = [
    # --- GYM: CABLE PRONATION & TOPROLL (8) ---
    (
        "Low Cable Strap Pronation Rotation",
        5.2,
        "Cable",
        "Attach a judo strap to a low cable pulley. Wrap strap over thumb and across back of hand. Rest elbow on a preacher bench or arm wrestling pad and rotate forearm into full pronation against stack weight."
    ),
    (
        "Cable Wrist Wrench Toproll Pull",
        5.5,
        "Cable",
        "Attach a thick rolling wrist wrench handle to a cable set at chest height. Grip wrench with fingers open, pull backward into backpressure while rolling the thumb inward to strip opponent fingers."
    ),
    (
        "Preacher Bench Dumbbell Pronation Lowering",
        5.0,
        "Dumbbells",
        "Rest forearm across a preacher bench holding an offset dumbbell (weighted primarily on one side). Lower into supination under strict control, then contract the pronator teres back to neutral."
    ),
    (
        "Standing Cable High-Pulley Pronation Drag",
        5.6,
        "Cable",
        "Set cable pulley high. Attach webbing strap over thumb metacarpal. Step back into combat stance and execute simultaneous backward elbow drag and inward pronation roll."
    ),
    (
        "Cable Rolling Handle Pronation Isometric Hold",
        5.3,
        "Cable",
        "Connect a 2-inch rolling handle to a mid-height cable. Plant elbow on table pad, rotate into full pronation, and hold against the weight stack for 12 seconds with static joint alignment."
    ),
    (
        "Machine Preacher Pronator Terus Isolation",
        4.9,
        "Machine",
        "Seat at a preacher curl machine. Use single-arm attachment and rotate forearm inward against machine cam resistance, focusing entirely on isolated pronation without body swing."
    ),
    (
        "Cable Eccentric Cone Handle Pronation Sweep",
        5.7,
        "Cable",
        "Attach a tapered cone handle to a mid-height cable. Grip wide base with thumb up and rotate wrist inward, using the cone leverage to overload the distal forearm pronator tendons."
    ),
    (
        "Dumbbell End-Loaded Radial Pronation Swing",
        4.8,
        "Dumbbells",
        "Hold a light dumbbell by its rubber head rather than center shaft. Rest forearm on bench and rotate from flat supine to pronated position, leveraging the asymmetric pendulum weight."
    ),

    # --- GYM: WRIST CUPPING & FLEXION (6) ---
    (
        "Barbell Seated Table Wrist Curl",
        5.4,
        "Barbell",
        "Sit on bench with forearms resting across thighs, palms facing ceiling. Hold an Olympic barbell with an underhand grip and curl wrists upward through full active range of motion."
    ),
    (
        "Cable Thick-Bar Standing Wrist Flexion",
        5.6,
        "Cable",
        "Attach a 2.5-inch thick fat bar to a low cable. Stand upright with arms extended downward and curl wrists inward toward thighs, building crushing palmar cupping strength."
    ),
    (
        "Preacher Bench Dumbbell Single-Arm Wrist Curl",
        5.2,
        "Dumbbells",
        "Anchor single forearm flat on a preacher bench incline pad. Hold dumbbell with palm facing up and curl wrist upward, isolating flexor digitorum profundus and flexor carpi radialis."
    ),
    (
        "Cable Wrist Wrench Level Cupping Curl",
        5.8,
        "Cable",
        "Connect wrist wrench cylinder to a cable set at table height. Keep elbow anchored on pad and curl wrist inward, combating the wrench's tendency to peel fingers open."
    ),
    (
        "EZ-Bar Reverse-Side Table Wrist Flexion",
        5.1,
        "EZ-Bar",
        "Rest forearms on flat bench holding an EZ-bar in the inner semi-supinated camber. Execute strict wrist curls to condition carpal joint flexors under comfortable wrist angle."
    ),
    (
        "Machine Wrist Curl Forearm Station",
        4.7,
        "Machine",
        "Position forearms into dedicated forearm machine pads. Grip lever handles and flex wrists through smooth guided track, keeping elbows completely stationary throughout."
    ),

    # --- GYM: RISING & RADIAL DEVIATION (4) ---
    (
        "Cable Low-Pulley Judo Strap Rising Pull",
        5.6,
        "Cable",
        "Loop a martial arts strap around your hand between thumb and index finger, connecting to a low cable. Plant elbow on table pad and lift wrist straight upward into full radial rise."
    ),
    (
        "Dumbbell Single-Arm Hammer Rising Elevation",
        5.1,
        "Dumbbells",
        "Hold dumbbell vertically with forearm resting on knee. Raise front bell upward by cocking the wrist toward the thumb, strengthening the radial collateral ligament complex."
    ),
    (
        "Cable Multi-Spinner High Hand Posting Rise",
        5.8,
        "Cable",
        "Attach multi-spinner rolling cylinder to a mid-pulley. Grip near top flange and pull upward and backward, reinforcing the essential posting vector against an opposing hand."
    ),
    (
        "Barbell Plate-Pinch Rising Static Lift",
        4.9,
        "Barbell",
        "Pinch a 5 kg Olympic plate vertically between thumb and fingers with arm at 90 degrees. Hold plate parallel to floor for 15 seconds to condition rising stabilizers."
    ),

    # --- GYM: SUPINATION & HOOK (3) ---
    (
        "Cable Low-Pulley Supinated Hook Curl",
        5.5,
        "Cable",
        "Attach D-handle to low pulley. Set elbow on preacher pad in deep hook orientation with palm supinated and wrist cupped. Curl cable upward toward opposite collarbone."
    ),
    (
        "Dumbbell Offset Supination Forearm Pivot",
        5.0,
        "Dumbbells",
        "Hold a dumbbell loaded on one collar only. Rest forearm on flat bench. Allow the heavy side to turn forearm into pronation, then contract supinator muscle to bring bell back to vertical."
    ),
    (
        "Cable Thick-Rope Supinated Drag",
        5.3,
        "Cable",
        "Connect heavy triceps rope to mid-pulley. Grip one end with palm facing ceiling and elbow tight to hip. Drag weight backward across floor while maintaining strict supination."
    ),

    # --- GYM: SIDE PRESSURE & BACKPRESSURE (5) ---
    (
        "Cable Table-Height Side Pressure Internal Drive",
        5.7,
        "Cable",
        "Set cable pulley level with arm wrestling table pad. Grip handle with elbow on pad and drive forearm laterally inward toward pin pad, engaging whole torso and shoulder frame."
    ),
    (
        "Light Cable 90-Degree Locked Lat Backpressure Row",
        5.8,
        "Cable",
        "Connect strap handle to chest-height cable. Lock elbow at exactly 90 degrees in neutral hammer grip and pull body backward using latissimus dorsi, holding position for 3 seconds."
    ),
    (
        "Preacher Bench Dumbbell Hammer Backpressure Hold",
        5.3,
        "Dumbbells",
        "Place upper arm on 45-degree preacher bench. Hold heavy dumbbell in hammer grip at a 90-degree elbow lock. Hold statically for 15 seconds against gravity's downward moment arm."
    ),
    (
        "Light Cable Static Arm Wrestling Frame Lock",
        5.6,
        "Cable",
        "Set pulley at shoulder height. Step into combat stance, lock elbow at 85 degrees against ribs, and hold cable under static isometric tension while shifting feet in small pivot steps."
    ),
    (
        "Machine Bicep Curl Static 90-Degree Combat Hold",
        5.2,
        "Machine",
        "On a seated bicep machine, pull handle to 90-degree elbow flexion point. Freeze motion and hold against the stack weight for 12 seconds to build joint integrity at the elbow flexor tendon."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home Count: {len(beg_home_data)} (Target: 62)")
    print(f"Beginner Gym Count: {len(beg_gym_data)} (Target: 26)")
    print(f"Total Beginner Count: {len(beg_home_data) + len(beg_gym_data)} (Target: 88)")
    assert len(beg_home_data) == 62
    assert len(beg_gym_data) == 26
    for item in beg_home_data + beg_gym_data:
        assert 1.0 <= item[1] <= 6.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Beginner exercise: {item[0]}"
    print("Beginner validation passed!")
