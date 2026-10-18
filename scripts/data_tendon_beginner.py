#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 8: BONES AND TENDONS STRENGTH - BEGINNER TIER (Total: 88 Exercises)
# 62 Home (70%) + 26 Gym (30%)
# Validated Orthopedic Physical Therapy, Collagen Cross-Linking, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 4.0 and 6.0
# ==============================================================================

beg_home_data = [
    # --- PATELLAR & QUAD TENDON (Home: 12) ---
    (
        "Supported Wall Sit Isometric Quad Hold",
        5.2,
        "Bodyweight",
        "Lean your back flat against a smooth wall with feet positioned 18 inches forward. Slide down until knees reach a comfortable 60-degree bend, ensuring shins remain vertical. Maintain continuous quadriceps tension for 30 seconds to stimulate patellar tendon stress relaxation and collagen alignment without excessive patellofemoral compressive stress."
    ),
    (
        "Doorframe Spanish Squat Band Isometric",
        5.6,
        "Resistance Bands",
        "Anchor a thick loop band behind a sturdy door at knee height. Step inside the loop with the band wrapped snugly behind both upper shins just below the joint line. Step back until heavy tension is reached, sit back into a 45-degree squat with completely vertical shins, and hold for 35 seconds to induce patellar tendon stress shielding."
    ),
    (
        "Slant Board Bodyweight Squat Eccentric Lowering",
        5.4,
        "Bodyweight",
        "Stand on a 25-degree wedge slant board with heels elevated and torso upright. Lower into a squat over a slow, deliberate 4-second tempo to direct mechanical strain into the patellar tendon fibers. Push smoothly back up over 2 seconds, performing 10 controlled repetitions."
    ),
    (
        "Chair-Assisted Single-Leg Step-Down",
        5.1,
        "Bodyweight",
        "Stand on the edge of a sturdy bottom stair or low platform holding a chair back for light fingertip balance. Slowly lower the opposite heel toward the floor over 4 seconds by bending the stance knee 30 degrees, then return to full extension, conditioning the tendon-bone junction."
    ),
    (
        "Seated Quad Squeeze With Towel Roll",
        4.5,
        "Bodyweight",
        "Sit on the floor with legs extended forward and a rolled bath towel placed directly under your knee joint. Actively push the back of your knee downward into the towel by contracting the vastus medialis and rectus femoris, holding peak tension for 8 seconds per repetition."
    ),
    (
        "Wall-Supported Quarter Squat Isometric Pause",
        4.8,
        "Bodyweight",
        "Stand with your back against a wall. Lower into a shallow 30-degree knee bend, placing your hands on your thighs for partial support. Hold the static position for 40 seconds, allowing viscoelastic creep to occur in the infrapatellar tendon under low joint shear."
    ),
    (
        "Chair-Supported Poliquin Step-Down",
        5.3,
        "Bodyweight",
        "Place a 2-inch book or wedge under your heel atop a low step. Keeping your torso vertical, drive the knee forward over the toes to touch the opposite heel to the ground over a controlled 3-second descent, building entry-level patellar tendon tensile tolerance."
    ),
    (
        "Resistance Band Terminal Knee Extension",
        4.9,
        "Resistance Bands",
        "Loop a light resistance band around a door anchor and behind the crease of your knee. Step back to create tension with the knee slightly bent. Smoothly contract the quadriceps to pull the leg into full extension, pausing for 2 seconds at lockout across 12 repetitions."
    ),
    (
        "Supine Straight Leg Raise Isometric Lock",
        4.6,
        "Bodyweight",
        "Lie flat on your back with one knee bent and the active leg straight. Lock the knee in complete extension by flexing the quadriceps, elevate the heel 8 inches off the mat, and hold statically for 20 seconds to load the proximal quadriceps tendon safely."
    ),
    (
        "Prone Active Quadriceps Co-Contraction Hold",
        4.7,
        "Bodyweight",
        "Lie face down on a mat with legs straight. Gently contract the gluteals and press the front of the knee into the floor while attempting to lift the lower leg 1 inch, engaging the quadriceps tendon isometrically for 10 seconds."
    ),
    (
        "Standing Wall-Supported Reverse Step-Down",
        5.0,
        "Bodyweight",
        "Stand on a single low step with hands touching adjacent walls for balance. Reach one leg backward to tap the floor while the working knee flexes 30 degrees over a 3-second tempo, developing controlled knee extensor tendon resilience."
    ),
    (
        "Light Backpack Supported Wall Squat Hold",
        5.5,
        "Backpack-weighted",
        "Wear a light 4 kg backpack strapped securely to your chest. Slide down a wall to a 60-degree knee flexion angle and maintain steady isometric pressure through the midfoot for 30 seconds, applying gentle axial loading to the patellar tendon."
    ),

    # --- ACHILLES TENDON & PLANTAR FASCIA (Home: 12) ---
    (
        "Standing Double-Leg Wall Heel Raise Pause",
        5.0,
        "Bodyweight",
        "Stand facing a wall with hands flat against it at shoulder height for support. Rise smoothly onto the balls of both feet over 2 seconds, pause at the apex of plantarflexion for 3 seconds to maximally load the Achilles tendon, and lower down over a 3-second eccentric phase."
    ),
    (
        "Alfredson Eccentric Double-Up Single-Down Heel Drop",
        5.5,
        "Bodyweight",
        "Stand with the balls of both feet on the edge of a stair step holding the handrail. Rise up using both calves, transfer your full weight onto one foot, and slowly lower the heel below the step level over a strict 4-second descent to stimulate Achilles collagen remodeling."
    ),
    (
        "Bent-Knee Soleus Wall Sit Heel Raise",
        5.3,
        "Bodyweight",
        "Set up in a 60-degree wall sit with your back supported. While maintaining the seated position, elevate both heels off the floor into plantarflexion, holding the top position for 5 seconds to selectively direct mechanical load through the soleus tendon and deeper Achilles fibers."
    ),
    (
        "Towel-Under-Toes Plantar Fascia Isometric Hold",
        4.7,
        "Bodyweight",
        "Place a rolled washcloth directly beneath the toes of your foot to dorsiflex the metatarsophalangeal joints (engaging the windlass mechanism). Stand tall and press your toes firmly downward into the towel for 15 seconds, loading the plantar aponeurosis."
    ),
    (
        "Standing Isometric Calf Press Against Wall",
        4.8,
        "Bodyweight",
        "Stand 2 feet from a wall in a staggered split stance. Keep the rear heel flat on the floor with the knee fully straight. Drive the ball of the rear foot into the ground as if trying to push the wall away, holding the isometric Achilles strain for 25 seconds."
    ),
    (
        "Seated Bent-Knee Double Calf Raise With Backpack",
        5.2,
        "Backpack-weighted",
        "Sit on a sturdy chair with knees bent at 90 degrees. Rest a 5 kg backpack across your lower thighs just above the knees. Slowly elevate your heels through full plantarflexion range, pausing for 2 seconds at peak contraction before lowering over 3 seconds."
    ),
    (
        "Straight-Leg Slant Board Achilles Stretch Hold",
        4.6,
        "Bodyweight",
        "Stand upright on a gentle 20-degree slant board with knees locked and heels fully grounded. Maintain tall posture for 45 seconds to apply gentle viscoelastic tensile stress to the Achilles tendon and gastrocnemius aponeurosis."
    ),
    (
        "Single-Leg Flat-Ground Isometric Calf Hold",
        5.1,
        "Bodyweight",
        "Stand on flat ground beside a wall for fingertip balance. Lift one foot off the floor and rise halfway up on the ball of the stance foot (neutral ankle angle). Hold this static mid-range position for 25 seconds to induce Achilles tendon stress relaxation."
    ),
    (
        "Stair-Edge Supported Static Calf Deficit Hold",
        5.4,
        "Bodyweight",
        "Stand on the edge of a stair step with heels hanging 1 inch below the step level. Hold the handrail firmly and maintain this static deficit stretch-load for 30 seconds to condition the myotendinous junction."
    ),
    (
        "Resistance Band Seated Ankle Plantarflexion",
        4.8,
        "Resistance Bands",
        "Sit on the floor with legs straight. Loop a light resistance band around the ball of your foot while holding both ends with your hands. Press the foot forward into plantarflexion against the elastic resistance over 2 seconds and return over 3 seconds."
    ),
    (
        "Seated Soleus Isometric Knee Press",
        4.5,
        "Bodyweight",
        "Sit with feet flat on the floor. Place your hands on your knees and press downward with 30% effort while attempting to elevate your heels, creating an immovable isometric load on the deep Achilles tendon complex for 15 seconds."
    ),
    (
        "Light Backpack Flat Ground Calf Raise Cycle",
        5.3,
        "Backpack-weighted",
        "Wear a 5 kg backpack. Stand with feet hip-width apart and execute 12 slow double-leg calf raises with a 3-second concentric rise, 2-second apex pause, and 3-second descent to build baseline tendon stiffness."
    ),

    # --- HAMSTRING & GLUTEAL TENDONS (Home: 10) ---
    (
        "Supine Double-Leg Glute Bridge Isometric Hold",
        4.9,
        "Bodyweight",
        "Lie on your back with knees bent at 90 degrees and feet flat. Drive through your heels to elevate your hips until thighs and torso align. Hold the bridge statically for 30 seconds, maintaining continuous tension across the proximal hamstring and gluteal tendon insertions."
    ),
    (
        "Floor Slider Slow Eccentric Hamstring Curl",
        5.4,
        "Bodyweight",
        "Lie supine with heels resting on two paper plates or a towel on a smooth floor. Elevate your hips into a shallow bridge, then slowly slide your heels forward over 5 seconds until legs are nearly straight, lowering your hips to reset."
    ),
    (
        "Standing Double-Leg Romanian Deadlift With Light Backpack",
        5.2,
        "Backpack-weighted",
        "Hold a 5 kg weighted backpack by its top handle. With soft knees and a neutral spine, hinge backward at the hips over 4 seconds until you feel a deep stretch in the hamstrings, then contract glutes to return over 2 seconds across 10 repetitions."
    ),
    (
        "Chair-Supported Isometric Single-Leg Hamstring Dig",
        5.1,
        "Bodyweight",
        "Lie on your back with one heel resting on a chair seat at a 90-degree knee angle. Dig the heel downward into the chair with 40% effort without lifting your hips off the floor, holding for 20 seconds to load the distal hamstring tendon."
    ),
    (
        "Side-Lying Clamshell Isometric Squeeze",
        4.4,
        "Bodyweight",
        "Lie on your side with hips and knees flexed at 45 degrees. Keeping your feet together, open the top knee 30 degrees and hold the static abduction contraction for 10 seconds, stimulating the gluteus medius tendon insertion at the greater trochanter."
    ),
    (
        "Prone Isometric Hamstring Knee Flexion Lock",
        4.7,
        "Bodyweight",
        "Lie face down with knees bent to 45 degrees. Cross one ankle over the other and push the lower heel upward while resisting with the top foot, creating 15 seconds of mutual isometric hamstring loading."
    ),
    (
        "Standing Wall-Supported Single-Leg Hinge Hold",
        5.0,
        "Bodyweight",
        "Stand on one leg with hands on a wall for support. Hinge your torso forward 30 degrees while extending the free leg backward, holding the stance leg hamstrings under static tensile load for 20 seconds."
    ),
    (
        "Resistance Band Seated Hamstring Curl",
        4.8,
        "Resistance Bands",
        "Sit on a chair with a light band anchored to a sturdy post in front and looped around your ankle. Pull your heel backward under the chair against elastic tension, pausing for 2 seconds at peak flexion."
    ),
    (
        "Supine Long-Lever Glute Bridge Isometric",
        5.3,
        "Bodyweight",
        "Lie supine with knees bent to an open 120-degree angle. Elevate hips 3 inches off the floor and hold for 25 seconds, shifting the mechanical moment arm to increase loading on the distal hamstring tendons."
    ),
    (
        "Standing Banded Lateral Hip Abduction Hold",
        4.6,
        "Resistance Bands",
        "Stand tall holding a wall for balance with a mini-band around your ankles. Abduct one leg outward 20 degrees and hold statically for 15 seconds, loading the abductor tendon complex."
    ),

    # --- UPPER LIMB TENDONS (BICEPS, TRICEPS, ROTATOR CUFF) (Home: 14) ---
    (
        "Doorframe Isometric Biceps Curl Press",
        4.8,
        "Bodyweight",
        "Stand facing an interior doorframe. Bend your elbows to 90 degrees with palms facing upward and press your wrists firmly upward into the underside of the doorframe header, holding a 20-second static contraction to stimulate the distal biceps tendon."
    ),
    (
        "Doorframe Isometric Triceps Extension Press",
        4.8,
        "Bodyweight",
        "Stand facing a wall or doorframe. Place the ulnar borders of your clenched fists against the surface with elbows at 90 degrees. Press downward and forward through your forearms for 20 seconds to load the distal triceps tendon insertion at the olecranon."
    ),
    (
        "Doorway External Rotation Isometric Hold",
        4.6,
        "Bodyweight",
        "Stand inside a doorway with your elbow bent at 90 degrees and tucked tightly against your ribs. Place the back of your wrist against the door jamb and press outward into external rotation for 15 seconds, conditioning the infraspinatus and teres minor tendons."
    ),
    (
        "Doorway Internal Rotation Isometric Hold",
        4.6,
        "Bodyweight",
        "Position your palm against the interior door jamb with elbow at 90 degrees and pinned to your side. Press your palm inward into internal rotation for 15 seconds, stimulating the subscapularis tendon."
    ),
    (
        "Table-Supported Wrist Flexor Isometric Hold",
        4.4,
        "Bodyweight",
        "Rest your forearm flat along a tabletop with your palm facing upward. Place your opposite hand across the palm and press downward while resisting with the lower wrist, holding an unyielding isometric cup for 15 seconds to load the common flexor tendon."
    ),
    (
        "Table-Supported Wrist Extensor Isometric Hold",
        4.4,
        "Bodyweight",
        "Rest your forearm flat on a table with palm facing downward. Place your opposite hand across the knuckles and attempt to extend the wrist upward against manual resistance for 15 seconds, conditioning the common extensor tendon at the lateral epicondyle."
    ),
    (
        "Light Backpack Slow Eccentric Biceps Lowering",
        5.1,
        "Backpack-weighted",
        "Hold a 3 kg backpack by its top handle. Curl it upward with both hands, remove one hand, and lower the backpack with the working arm over a deliberate 5-second eccentric tempo, building distal biceps tendon resilience."
    ),
    (
        "Overhead Light Backpack Triceps Extension Hold",
        5.2,
        "Backpack-weighted",
        "Hold a light backpack overhead with elbows bent at 90 degrees. Maintain an unyielding isometric hold overhead for 20 seconds, ensuring proper tendon loading without joint hyperextension."
    ),
    (
        "Side-Lying Light Weight External Rotation",
        4.9,
        "Backpack-weighted",
        "Lie on your side with a rolled towel under your upper arm. Hold a 1 kg water bottle, rotate your forearm upward toward the ceiling over 3 seconds, and lower over 4 seconds, targeting the rotator cuff tendons."
    ),
    (
        "Prone Floor Y-Raise Isometric Hold",
        4.7,
        "Bodyweight",
        "Lie prone on a mat with arms extended at 45 degrees in a Y-formation, thumbs pointing toward the ceiling. Elevate your arms 2 inches off the floor and hold for 12 seconds, loading the lower trapezius and supraspinatus tendons."
    ),
    (
        "Prone Floor T-Raise Isometric Hold",
        4.7,
        "Bodyweight",
        "Lie face down with arms extended perpendicular to your body in a T-shape. Squeeze shoulder blades together, lift arms 2 inches, and hold for 12 seconds to condition the middle trapezius and posterior rotator cuff."
    ),
    (
        "Wall-Facing Slide-Up Isometric Scapular Press",
        4.5,
        "Bodyweight",
        "Stand facing a wall with forearms resting vertically against it. Slide forearms upward into a shallow V, then press forearms firmly into the wall for 10 seconds to activate the serratus anterior tendon attachments."
    ),
    (
        "Resistance Band Neutral-Grip Pull-Apart Hold",
        5.0,
        "Resistance Bands",
        "Hold a light resistance band at shoulder width with palms facing each other. Pull the band apart until it touches your sternum, holding the peak isometric contraction for 5 seconds across 8 repetitions."
    ),
    (
        "Towel-Wring Forearm Rotator Dynamic Twist",
        4.3,
        "None",
        "Grip a thick bath towel with both hands placed 4 inches apart. Twist the towel in opposite directions with maximum grip effort for 10 seconds, then reverse directions to condition forearm tendon sheaths."
    ),

    # --- BONE MINERAL DENSITY (BMD) & AXIAL LOADING (Home: 14) ---
    (
        "Supported Low-Impact Rhythmic Heel Drops",
        4.8,
        "Bodyweight",
        "Stand barefoot on a firm floor holding a sturdy table or kitchen counter for balance. Rise onto the balls of both feet 1 inch, then drop onto your heels with a crisp, audible impact. Perform 20 rhythmic drops to generate vertical osteogenic strain waves through the calcaneus, tibia, and femoral neck."
    ),
    (
        "Heavy Backpack Double-Arm Suitcase Carry",
        5.5,
        "Backpack-weighted",
        "Load two household backpacks with 5 kg of books each. Hold one in each hand with straight arms and walk in a deliberate, controlled path for 60 seconds. The bilateral downward pull applies continuous axial compressive loading through the spine, hips, and radius."
    ),
    (
        "Stair Stomp Low-Velocity Ground Impact Drill",
        5.1,
        "Bodyweight",
        "Step down from a 4-inch bottom stair, landing flat-footed with a firm, deliberate stomp while holding the handrail. Alternate landing legs for 15 impacts per side, delivering the mechanical shock threshold necessary to stimulate osteoblast activity in the femoral neck."
    ),
    (
        "Wall-Facing Standing Bone-Loading Palm Shove",
        4.6,
        "Bodyweight",
        "Stand 2 feet from a wall with feet shoulder-width apart. Fall gently forward and catch your bodyweight on your open palms with elbows slightly bent, holding the static compressive load for 10 seconds across 10 repetitions."
    ),
    (
        "Chair-Assisted Semi-Squat Axial Spine Load",
        5.2,
        "Backpack-weighted",
        "Wear a 6 kg backpack strapped firmly across both shoulders. Lower into a quarter-squat holding a chair back for safety. Maintain the upright torso angle for 30 seconds to transmit axial compressive stress through the lumbar vertebral bodies."
    ),
    (
        "Single-Leg Supported Stomp and Balance",
        4.9,
        "Bodyweight",
        "Stand tall beside a counter. Lift one knee to hip height and stomp the foot flat to the floor with moderate force, immediately stabilizing into single-leg balance for 5 seconds before repeating."
    ),
    (
        "Backpack-Loaded Farmer Walk In Place",
        5.4,
        "Backpack-weighted",
        "Hold a 6 kg backpack by its top handle in one hand. March in place with high knees for 40 seconds, keeping your shoulders level to resist lateral flexion and transmit asymmetrical osteogenic loading to the pelvis."
    ),
    (
        "Supported Double-Foot Pogo Hops on Carpet",
        5.3,
        "Bodyweight",
        "Hold a countertop with fingertips. Perform small, rapid, continuous hops bouncing off the balls of both feet with stiff ankles, clearing the floor by only 1 inch for 20 quick cycles to stimulate bone mineralization."
    ),
    (
        "Quarter-Squat Axial Stance Hold With Backpack",
        5.4,
        "Backpack-weighted",
        "Wear a 6 kg backpack on your back. Stand with feet hip-width apart in a tall quarter-squat. Lock your spine in neutral and hold the static posture for 35 seconds to simulate sustained gravity loading."
    ),
    (
        "Two-Hand Overhead Backpack Press and Hold",
        5.0,
        "Backpack-weighted",
        "Press a 4 kg backpack overhead with arms fully extended and elbows locked. Hold the weight stationary overhead for 20 seconds, directing axial compressive forces downward through the cervical and thoracic vertebrae."
    ),
    (
        "Tandem Stance Bone Density Shift Drill",
        4.5,
        "Bodyweight",
        "Stand with one foot directly in front of the other heel-to-toe beside a wall. Shift 70% of your weight forcefully onto the front heel, hold for 10 seconds, then shift back to the rear heel, training multi-directional trabecular bone loading."
    ),
    (
        "Wall-Supported Forward Lunge Impact Hold",
        5.1,
        "Bodyweight",
        "Step forward into a shallow lunge, allowing the front foot to make a firm, decisive floor contact. Stabilize with hands against an adjacent wall and hold the position for 15 seconds per side."
    ),
    (
        "Backpack-Weighted Side-Step Lateral Bone Load",
        5.3,
        "Backpack-weighted",
        "Wear a 5 kg backpack. Take 10 wide, deliberate lateral steps to the left followed by 10 steps to the right, driving firmly through the outside edge of the foot to load the femoral neck in the frontal plane."
    ),
    (
        "Prone Hand-and-Knee Floor Compressive Press",
        4.7,
        "Bodyweight",
        "On all fours with a flat spine, simultaneously drive your palms and knees downward into the floor with 40% effort for 15 seconds, transmitting four-point compressive strain through the long bones."
    ),
]

beg_gym_data = [
    # --- GYM: HEAVY SLOW RESISTANCE (HSR) & BONE DENSITY (Gym: 26) ---
    (
        "Leg Press Machine 4-Second Eccentric Squat",
        5.8,
        "Machine",
        "Sit in a commercial 45-degree leg press with feet shoulder-width apart on the sled. Lower the platform over a strict 4-second eccentric count until knees reach 90 degrees, pause for 1 second, and press smoothly up over 3 seconds to condition the patellar tendon under controlled HSR tempo."
    ),
    (
        "Leg Extension Machine Isometric 60-Degree Hold",
        5.6,
        "Machine",
        "Select a light weight on the leg extension machine. Extend legs to a 60-degree angle (sub-maximal knee angle) and hold the pad stationary for 30 continuous seconds, allowing tendon stress relaxation without high patellofemoral pressure."
    ),
    (
        "Seated Calf Raise Machine Slow Eccentric Lowering",
        5.5,
        "Machine",
        "Position knees under the pads of a seated calf machine with balls of feet on the platform. Elevate onto toes over 2 seconds, pause for 2 seconds, and lower heels below the footplate over a strict 4-second descent to load the soleus tendon."
    ),
    (
        "Standing Calf Raise Machine Double-Leg Pause",
        5.7,
        "Machine",
        "Position shoulders under the padded levers of a standing calf machine. Rise onto the balls of both feet, hold the peak contraction for 3 seconds, and lower to neutral over 3 seconds across 10 controlled repetitions."
    ),
    (
        "Smith Machine Quarter-Squat Isometric Hold",
        5.9,
        "Machine",
        "Set the bar of a Smith machine across your upper trapezius with a light plate load. Lower into a 30-degree quarter-squat and lock into an unyielding isometric hold for 30 seconds to apply vertical axial compressive loading to the spine and femoral neck."
    ),
    (
        "Cable Low-Pulley Straight-Leg Kickback Hold",
        5.1,
        "Cable",
        "Attach an ankle cuff to a low cable pulley with a light weight. Extend the leg straight backward 20 degrees and hold the static hip extension for 12 seconds, stimulating the proximal hamstring tendon insertion."
    ),
    (
        "Cable Mid-Pulley External Rotation Hold",
        5.0,
        "Cable",
        "Stand perpendicular to a mid-pulley with a single D-handle. Keep elbow pinned to ribs at 90 degrees, rotate forearm outward 30 degrees, and hold the static external rotation for 10 seconds to load the infraspinatus tendon."
    ),
    (
        "Cable Mid-Pulley Internal Rotation Hold",
        5.0,
        "Cable",
        "With elbow at 90 degrees and towel under arm, rotate forearm inward across your abdomen against light cable resistance, holding peak contraction for 10 seconds to condition the subscapularis tendon."
    ),
    (
        "Dumbbell Supported Neutral-Grip Farmer Walk",
        5.8,
        "Dumbbells",
        "Pick up two moderate dumbbells from a rack. Stand tall with retracted scapulae and walk in a deliberate straight path for 45 seconds, transmitting vertical compressive force through the upper extremities and spine."
    ),
    (
        "Flat Bench Dumbbell Wrist Flexor Curl",
        4.9,
        "Dumbbells",
        "Rest forearms flat along a bench with palms up and wrists hanging over the edge holding light dumbbells. Curl wrists upward over 2 seconds, pause for 1 second, and lower through full extension over 3 seconds."
    ),
    (
        "Flat Bench Dumbbell Wrist Extensor Curl",
        4.9,
        "Dumbbells",
        "Rest forearms flat on bench with palms facing down holding light dumbbells. Extend wrists upward over 2 seconds and lower over 3 seconds, loading the common extensor tendon at the elbow."
    ),
    (
        "Incline Bench Prone Dumbbell Row Isometric Stop",
        5.4,
        "Dumbbells",
        "Lie face down on a 45-degree incline bench holding light dumbbells. Row the weights upward until elbows pass torso and hold the peak retraction for 4 seconds per repetition to condition periscapular tendons."
    ),
    (
        "Cable Preacher Curl Slow Eccentric Lowering",
        5.3,
        "Cable",
        "Rest upper arms on a preacher curl bench facing a low cable with a straight bar. Curl to peak contraction over 2 seconds, then resist the weight stack through a 5-second eccentric descent to remodel distal biceps tendon collagen."
    ),
    (
        "Cable Triceps Rope Pushdown Apex Hold",
        5.2,
        "Cable",
        "Attach a rope to a high pulley. Push downward until elbows are fully extended, flare the rope ends apart, and hold the static lockout for 3 seconds per rep to apply direct tensile strain to the triceps tendon."
    ),
    (
        "Barbell Rack-Supported Quarter Shrug Hold",
        5.7,
        "Barbell",
        "Set an Olympic barbell on rack pins at mid-thigh height. Grip with an overhand shoulder-width grip, elevate bar 2 inches off pins, and shrug shoulders upward, holding the static contraction for 15 seconds."
    ),
    (
        "Machine Seated Leg Curl 4-Second Eccentric",
        5.6,
        "Machine",
        "Sit in a seated leg curl machine with pad resting against lower calves. Curl heels backward over 2 seconds, then slowly resist the return through a strict 4-second eccentric phase to remodel the distal hamstring tendons."
    ),
    (
        "Dumbbell Goblet Squat Isometric Pause at 60 Degrees",
        5.5,
        "Dumbbells",
        "Hold a light dumbbell vertically against your sternum. Lower into a 60-degree squat and hold the static position for 20 seconds, loading the patellar tendon and femoral neck simultaneously."
    ),
    (
        "Cable Low-Anchor Pallof Press Isometric Hold",
        5.3,
        "Cable",
        "Stand perpendicular to a mid-pulley holding the handle against your chest. Press hands forward until arms are straight and hold against the rotational torque for 15 seconds to load the core and spinal ligaments."
    ),
    (
        "Barbell Supported Static Romanian Deadlift Hold",
        5.8,
        "Barbell",
        "Hold a light barbell with an overhand grip. Hinge hips backward until bar reaches knee level and hold the static stretch position for 20 seconds, placing the proximal hamstring tendon under continuous tensile load."
    ),
    (
        "Machine Chest Press Isometric Lock at Mid-Range",
        5.2,
        "Machine",
        "Sit at a chest press machine with a light load. Press handles halfway out to a 90-degree elbow bend and hold stationary for 20 seconds to load the pectoralis major tendon insertion safely."
    ),
    (
        "Cable High-Pulley Face Pull With External Rotation Hold",
        5.4,
        "Cable",
        "Attach rope to high pulley. Pull rope toward bridge of nose while externally rotating hands backward, holding the retracted position for 3 seconds across 10 repetitions."
    ),
    (
        "Standing Trap Bar Supported Deadlift Lockout Hold",
        5.9,
        "Barbell",
        "Stand inside a trap bar with light bumper plates. Lift to full upright lockout with tall posture and hold the bar stationary for 20 seconds, generating full-body axial skeleton compressive stimulation."
    ),
    (
        "Incline Treadmill Slow Controlled Backward Walk",
        5.1,
        "Machine",
        "Set treadmill to 2.0 mph on a 6% incline. Walk backward with slow, deliberate steps, pressing through the balls of the feet to extend the knees and condition the patellar tendon over 3 minutes."
    ),
    (
        "Dumbbell Suitcase Deadlift Pause at Shin Height",
        5.5,
        "Dumbbells",
        "Stand tall with a dumbbell in one hand. Hinge down until the dumbbell reaches mid-shin level and hold for 3 seconds before standing up, alternating sides to deliver asymmetric spinal and hip bone loading."
    ),
    (
        "Machine Seated Row Isometric Retraction Hold",
        5.3,
        "Machine",
        "Sit at a seated cable row station. Pull handle into your abdomen, squeeze shoulder blades together, and hold the static isometric contraction for 5 seconds across 8 deliberate repetitions."
    ),
    (
        "Barbell Front Rack Static Stance Hold",
        5.7,
        "Barbell",
        "Unrack a light barbell across the front deltoids in a clean grip. Stand tall with locked core and hips for 20 seconds to transmit direct vertical compressive load through the clavicles, spine, and lower extremities."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home Count: {len(beg_home_data)} (Target: 62)")
    print(f"Beginner Gym Count: {len(beg_gym_data)} (Target: 26)")
    print(f"Total Beginner Count: {len(beg_home_data) + len(beg_gym_data)} (Target: 88)")
    assert len(beg_home_data) == 62
    assert len(beg_gym_data) == 26
    for item in beg_home_data + beg_gym_data:
        assert 4.0 <= item[1] <= 6.0, f"Score out of range: {item[1]} in {item[0]}"
        assert "1.5" not in item[3], f"1.5 repetition protocol illegally present in Beginner exercise: {item[0]}"
    print("Beginner validation passed!")
