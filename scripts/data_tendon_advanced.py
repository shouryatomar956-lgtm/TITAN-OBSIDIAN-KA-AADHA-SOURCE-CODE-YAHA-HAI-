#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 8: BONES AND TENDONS STRENGTH - ADVANCED TIER (Total: 100 Exercises)
# 70 Home (70%) + 30 Gym (30%)
# Validated Structural Loading Research, Severe Joint Conditioning, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 8.1 and 9.2
# ==============================================================================

adv_home_data = [
    # --- PATELLAR & QUAD TENDON SEVERE LEVERS (Home: 16) ---
    (
        "Heavy Backpack Unassisted Sissy Squat Eccentric",
        8.8,
        "Backpack-weighted",
        "Wear a 10 kg backpack. Stand on the balls of your feet without hand assistance. Push knees forward while leaning torso backward in a rigid line, lowering through 80 degrees of knee flexion over a brutal 5-second descent before driving up through the patellar tendon."
    ),
    (
        "Unassisted Reverse Nordic Curl Full-Range Lower",
        8.9,
        "Bodyweight",
        "Kneel tall on a mat with toes flat. Keeping hips locked in extension, slowly lean backward over a strict 6-second tempo until shoulders hover 3 inches above the floor, then contract quadriceps and patellar tendon to pull torso back to vertical."
    ),
    (
        "Heavy Backpack Single-Leg Decline Squat 5-Second Tempo",
        8.7,
        "Backpack-weighted",
        "Wear a 12 kg backpack standing on one leg on a 25-degree decline wedge. Lower into a deep 80-degree single-leg squat over a strict 5-second count, pausing for 2 seconds at the bottom under immense patellar tendon load before rising."
    ),
    (
        "Single-Leg Spanish Squat Heavy Band Isometric",
        9.0,
        "Resistance Bands",
        "Anchor heavy dual bands behind knee. Balance on one leg with vertical shin, lower to 70 degrees of knee flexion, and maintain an unyielding unilateral isometric hold for 40 seconds to induce deep collagen stress relaxation."
    ),
    (
        "Heavy Backpack Poliquin Deficit Step-Down",
        8.6,
        "Backpack-weighted",
        "Wear a 14 kg backpack standing on an 8-inch deficit with working heel elevated on a wedge. Lower the opposite heel to touch the floor over 5 seconds with forward knee travel, building extreme tensile strength in the patellar tendon."
    ),
    (
        "Single-Leg 90-Degree Wall Sit Isometric Overload",
        8.9,
        "Bodyweight",
        "Descend down a wall until thighs are parallel to the floor at 90 degrees. Extend one leg straight out in front and hold full bodyweight on the single stance knee for 35 continuous seconds of unilateral extensor tendon strain."
    ),
    (
        "Heavy Backpack Bulgarian Split Squat 5-Second Eccentric",
        8.8,
        "Backpack-weighted",
        "Elevate rear foot on a chair wearing a 15 kg backpack. Lower until front thigh is parallel to floor over a slow 5-second count, pause for 2 seconds at the bottom under heavy tendon stretch, and drive up smoothly."
    ),
    (
        "Dual-Band Resisted Terminal Knee Extension Lockout",
        8.4,
        "Resistance Bands",
        "Step inside doubled heavy resistance bands anchored to a doorpost. Pull knee from 45 degrees of flexion into hyper-stabilized terminal lockout, holding against the elastic shear for 5 seconds across 12 repetitions."
    ),
    (
        "Backpack-Weighted Cossack Squat Isometric Bottom Lock Left",
        8.6,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Descend to full depth in a Cossack squat to the left with heel flat. Hold the extreme deep-flexion stretch statically for 30 seconds, loading the patellar tendon and lateral knee ligaments."
    ),
    (
        "Backpack-Weighted Cossack Squat Isometric Bottom Lock Right",
        8.6,
        "Backpack-weighted",
        "Descend into full-depth Cossack squat to the right with the 12 kg backpack. Hold for 30 seconds to stimulate collagen cross-linking under combined tensile and compressive load."
    ),
    (
        "Single-Leg Slant Board Isometric Quarter-Squat Hold",
        8.7,
        "Bodyweight",
        "Balance on one leg on a 25-degree decline wedge at 45 degrees of knee flexion. Hold statically for 45 seconds without hand support, forcing the patellar tendon to bear continuous sustained bodyweight creep."
    ),
    (
        "Heavy Backpack Deep Squat Isometric Stop",
        8.8,
        "Backpack-weighted",
        "Wear a 16 kg backpack. Descend to parallel, pause for 5 seconds at the absolute dead-stop bottom position under high connective tissue tension, then drive upward explosively across 8 repetitions."
    ),
    (
        "Assisted Dragon Squat Patellar Deceleration Lower",
        8.9,
        "Bodyweight",
        "Thread one leg behind the other in a dragon squat stance. Lower your hips toward the floor over a controlled 5-second descent holding a doorframe for light balance, absorbing multi-planar rotational tendon load."
    ),
    (
        "Heavy Banded Spanish Squat 60-Second Stress Hold",
        9.1,
        "Resistance Bands",
        "In a heavy double-band Spanish squat setup with vertical shins, sit at 80 degrees and hold statically for a full 60 seconds, achieving maximal viscoelastic stress relaxation in the patellar tendon matrix."
    ),
    (
        "Heavy Backpack Single-Leg Box Squat Dead-Stop",
        8.7,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Lower onto a low stool on one leg over 5 seconds. Sit down completely for 2 seconds to eliminate elastic bounce, then stand up purely through single-leg knee extensor drive."
    ),
    (
        "Reverse Nordic Curl Isometric Mid-Range Hold",
        9.0,
        "Bodyweight",
        "Kneel tall with hips extended. Lean torso backward 45 degrees into the air and hold this punishing mid-range isometric lever for 25 continuous seconds without arching the lower back."
    ),

    # --- ACHILLES TENDON & PLANTAR APONEUROSIS OVERLOAD (Home: 15) ---
    (
        "Heavy Backpack Single-Leg Deficit Heel Drop 6-Second Tempo",
        9.1,
        "Backpack-weighted",
        "Wear an 18 kg backpack. Stand on the ball of one foot on a stair edge holding the rail for balance. Rise up, remove the non-working foot, and lower the working heel deep into the deficit over a slow, agonizing 6-second count."
    ),
    (
        "Heavy Backpack Bent-Knee Single-Leg Deficit Drop",
        9.0,
        "Backpack-weighted",
        "Wear an 18 kg backpack on a stair edge with working knee locked at a 30-degree bend. Lower the heel deep into dorsiflexion over 6 seconds, isolating the soleus tendon and distal Achilles insertion."
    ),
    (
        "Single-Leg Stair Deficit Isometric Calf Hold With Backpack",
        9.2,
        "Backpack-weighted",
        "Wear a 16 kg backpack. Stand on one leg on a stair edge with heel resting 2 inches below step level in a deep stretch. Hold this static stretch-load for 45 continuous seconds to stimulate Achilles collagen synthesis."
    ),
    (
        "Slant Board Single-Leg Calf Raise With Heavy Backpack",
        8.9,
        "Backpack-weighted",
        "Wear a 14 kg backpack standing on one leg on a 25-degree decline wedge. Perform full-range calf raises: 3 seconds up, 3 seconds apex squeeze, and 5 seconds eccentric lowering across 10 repetitions."
    ),
    (
        "Bent-Knee Seated Heavy Backpack Soleus Overload",
        8.6,
        "Backpack-weighted",
        "Sit on a chair with knees at 90 degrees. Balance a 20 kg weighted backpack across lower thighs. Elevate heels onto toes, pause for 4 seconds at peak contraction, and lower over 5 seconds across 12 reps."
    ),
    (
        "Towel-Elevated Great Toe Single-Leg Calf Raise Overload",
        8.7,
        "Backpack-weighted",
        "Place a 2-inch towel roll beneath your big toe wearing a 12 kg backpack. Perform slow single-leg calf raises with a 3-second apex pause and 5-second descent to overload the plantar fascia windlass mechanism."
    ),
    (
        "Single-Leg Continuous Stiff Pogo Bounding on Hard Floor",
        8.8,
        "Bodyweight",
        "Perform 20 continuous, reactive single-leg hops on a firm floor, maintaining a rigid ankle and minimal knee bend to challenge the Achilles tendon's elastic recoil and high-velocity tensile stiffness."
    ),
    (
        "Heavy Backpack Double-Leg Calf Raise 6-Second Eccentric",
        8.6,
        "Backpack-weighted",
        "Wear a 22 kg backpack. Stand on a stair edge and execute calf raises: rise in 2 seconds, pause 3 seconds at apex, and lower into deep deficit over a strict 6-second count across 10 repetitions."
    ),
    (
        "Heavy Band Single-Leg Plantarflexion Peak Squeeze",
        8.4,
        "Resistance Bands",
        "Anchor heavy dual bands under foot. Drive the ball of the foot into full plantarflexion against the immense elastic tension, holding the peak contracted position for 4 seconds per repetition."
    ),
    (
        "Stair Deficit Bent-Knee Soleus Isometric Hold",
        8.9,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Stand on a stair edge with both knees bent 30 degrees, heels lowered 2 inches below step level. Hold statically for 45 seconds to force soleus aponeurosis stress relaxation."
    ),
    (
        "Single-Leg Wall Sit Calf Raise Overload",
        8.7,
        "Bodyweight",
        "Hold a 90-degree single-leg wall sit. While maintaining the seated position on one leg, slowly elevate the heel of the stance foot into plantarflexion, holding for 3 seconds per rep across 8 reps."
    ),
    (
        "Backpack-Weighted Staggered Stance Deficit Calf Hold",
        8.8,
        "Backpack-weighted",
        "Wear a 16 kg backpack on a step edge in a split stance. Lower both heels into deep deficit and hold for 45 seconds, delivering bilateral tensile strain to both Achilles tendons."
    ),
    (
        "Single-Leg Forward Hop and Stiff Stick Deceleration",
        8.8,
        "Bodyweight",
        "Hop forward 3 feet on one leg, land flat-footed with a stiff ankle, and instantly freeze in place for 3 seconds to force the Achilles tendon and plantar fascia to absorb the dynamic landing shock."
    ),
    (
        "Backpack-Weighted Slant Board Deficit Lower",
        8.9,
        "Backpack-weighted",
        "Wear a 14 kg backpack. Stand on a 25-degree decline board. Rise onto toes, remove one foot, and lower the working heel below the board level over a slow 6-second eccentric phase."
    ),
    (
        "Heavy Backpack Single-Leg Isometric Calf Press",
        8.7,
        "Backpack-weighted",
        "Wear a 15 kg backpack standing flat on one foot. Rise to mid-height and hold an unyielding static position for 40 seconds to induce tendon creep under heavy compressive load."
    ),

    # --- HAMSTRING, GLUTEAL & HIP TENDONS (Home: 13) ---
    (
        "Unassisted Nordic Hamstring Curl 5-Second Eccentric",
        9.2,
        "Bodyweight",
        "Anchor heels firmly beneath a heavy structure. Kneel tall with hips locked in full extension. Slowly lower your torso forward toward the floor over a strict 5-second eccentric tempo before catching with hands."
    ),
    (
        "Heavy Backpack Single-Leg Romanian Deadlift 5-Second Tempo",
        8.9,
        "Backpack-weighted",
        "Hold a 16 kg backpack in one hand while balancing on the opposite leg. Hinge forward at the hips over a strict 5-second descent with a flat spine, holding the bottom stretch position for 2 seconds."
    ),
    (
        "Single-Leg Elevated Hamstring Bridge Isometric Apex Hold",
        8.8,
        "Bodyweight",
        "Place one heel atop a 16-inch chair with knee at a 90-degree angle. Elevate hips into full extension and hold the single-leg bridge at peak height for 35 seconds, maximizing tension at the ischial tuberosity."
    ),
    (
        "Heavy Backpack Single-Leg Hip Thrust Off Sofa",
        8.8,
        "Backpack-weighted",
        "Rest upper back on sofa with a 14 kg backpack on hips. Lift one leg and drive the stance heel into the floor to full extension, pausing for 3 seconds at the top across 10 repetitions per leg."
    ),
    (
        "Long-Lever Single-Leg Hamstring Bridge 35-Second Hold",
        8.9,
        "Bodyweight",
        "Lie supine with stance knee at an open 130-degree angle. Elevate hips 3 inches off the floor and hold for 35 seconds, placing the distal biceps femoris and semitendinosus tendons under long-lever torque."
    ),
    (
        "Heavy Backpack Double-Leg Romanian Deadlift 5-Second Eccentric",
        8.7,
        "Backpack-weighted",
        "Hold a 20 kg backpack with both hands. Hinge backward at the hips over 5 seconds until plates hover above feet, hold the bottom stretch for 3 seconds, and return over 2 seconds."
    ),
    (
        "Floor Slider Single-Leg Hamstring Curl Eccentric Overload",
        8.8,
        "Bodyweight",
        "In a single-leg bridge, slowly slide the working heel forward on a towel over a 6-second count until the leg is fully extended, resisting hip drop throughout."
    ),
    (
        "Heavy Band Standing Good Morning With 4-Second Pause",
        8.5,
        "Resistance Bands",
        "Stand on dual heavy bands with loop across traps. Hinge forward into a deep horizontal back angle, hold the stretch-tension position for 4 seconds, and drive through glutes to lock out."
    ),
    (
        "Backpack-Weighted Side-Lying Hip Abduction Hold",
        8.4,
        "Backpack-weighted",
        "Lie on side with a 10 kg backpack draped across outer thigh. Abduct leg 30 degrees and hold statically for 25 seconds to load the gluteus medius tendon insertion under heavy resistance."
    ),
    (
        "Single-Leg Step-Back Hinge With 14 kg Backpack",
        8.6,
        "Backpack-weighted",
        "Hold a 14 kg backpack. Step one leg back into a kickstand stance. Hinge over the front leg over a 5-second tempo, feeling deep elongation in the proximal hamstring tendon."
    ),
    (
        "Nordic Hamstring Curl Isometric Hold at 45 Degrees",
        9.1,
        "Bodyweight",
        "Kneel with anchored heels. Lower torso forward to a 45-degree angle from the floor and freeze in an unyielding isometric hold for 15 seconds before catching yourself."
    ),
    (
        "Heavy Backpack Cossack Hinge 30-Second Pause Left",
        8.7,
        "Backpack-weighted",
        "Descend into a deep lateral hinge to the left with a 14 kg backpack. Hold for 30 seconds, loading the proximal hamstring tendon and adductor tendon complex under mechanical disadvantage."
    ),
    (
        "Heavy Backpack Cossack Hinge 30-Second Pause Right",
        8.7,
        "Backpack-weighted",
        "Descend into deep lateral hinge to the right with the 14 kg backpack. Hold statically for 30 seconds to stimulate collagen cross-linking under combined tensile and compressive load."
    ),

    # --- UPPER LIMB TENDONS (BICEPS, TRICEPS, ROTATOR CUFF) (Home: 13) ---
    (
        "Heavy Backpack Single-Arm Biceps Lowering 6-Second Eccentric",
        8.7,
        "Backpack-weighted",
        "Curl a 12 kg backpack to chest with both hands. Remove one hand and lower the load with the working arm over a brutal 6-second eccentric count to remodel the distal biceps tendon."
    ),
    (
        "Dip Station Bodyweight Isometric Hold at 90 Degrees",
        8.9,
        "Bodyweight",
        "Support yourself on parallel dip bars or two sturdy counters. Lower until elbows are at a strict 90-degree angle and hold the static suspension for 30 seconds to overload the triceps tendon."
    ),
    (
        "Heavy Backpack Side-Lying External Rotation 5-Second Tempo",
        8.6,
        "Backpack-weighted",
        "Lie on side with towel under arm. Hold a 5 kg backpack by strap. Rotate upward over 2 seconds and lower over a strict 5-second count across 10 reps to remodel the infraspinatus tendon."
    ),
    (
        "Doorframe Inverted Row Single-Arm Isometric Hold",
        8.8,
        "Bodyweight",
        "Grip doorframe with one hand, lean back at 45 degrees, and pull chest to frame. Hold the single-arm contraction for 20 seconds, demanding high tensile stiffness from the biceps tendon."
    ),
    (
        "Prone Floor Y-T-W Weighted Matrix 30-Second Circuit",
        8.5,
        "Backpack-weighted",
        "Lie prone holding 2 kg weights. Perform 10 seconds of Y-hold, transition immediately to 10 seconds of T-hold, and finish with 10 seconds of W-rotational hold without resting."
    ),
    (
        "Table-Supported Heavy Wrist Extensor 6-Second Eccentric",
        8.6,
        "Backpack-weighted",
        "Rest forearm flat with palm down holding an 8 kg backpack. Assist into extension with other hand, then lower through flexion over 6 seconds to treat chronic lateral epicondylalgia."
    ),
    (
        "Table-Supported Heavy Wrist Flexor 6-Second Eccentric",
        8.6,
        "Backpack-weighted",
        "Rest forearm flat with palm up holding a 10 kg backpack. Curl with both hands, release assisting hand, and lower over 6 seconds to condition the common flexor tendon."
    ),
    (
        "Overhead Heavy Backpack Triceps Extension 5-Second Tempo",
        8.7,
        "Backpack-weighted",
        "Hold a 12 kg backpack overhead with elbows bent at 90 degrees. Lower deep behind head over 5 seconds and press overhead over 2 seconds, conditioning the distal triceps tendon."
    ),
    (
        "Push-Up Position Single-Arm Isometric Floor Press",
        8.8,
        "Bodyweight",
        "Set up in a push-up plank. Lift one hand off the floor and hold full upper-body weight on the single arm with elbow slightly unlocked for 20 seconds per side."
    ),
    (
        "Heavy Band Pull-Apart Dual-Band 5-Second Squeeze",
        8.4,
        "Resistance Bands",
        "Grip doubled heavy bands. Pull apart until band touches chest, holding the scapular retraction and rotator cuff contraction for 5 seconds per rep across 8 repetitions."
    ),
    (
        "Backpack Hammer Curl Heavy Isometric Mid-Range Lock",
        8.6,
        "Backpack-weighted",
        "Hold a 14 kg backpack in hammer grip. Curl to a 90-degree elbow bend and hold statically for 25 seconds to apply sustained tensile creep to the brachioradialis tendon."
    ),
    (
        "Doorway Dip Frame Static Compression Press",
        8.7,
        "Bodyweight",
        "Press hands downward into two kitchen counters with elbows locked, elevating feet off the floor. Hold the full compressive lockout for 30 seconds."
    ),
    (
        "Thick Towel Double-Twist Forearm Wring Overload",
        8.5,
        "None",
        "Grip a heavy folded wet towel. Twist in opposite directions with maximum grip effort for 25 continuous seconds, subjecting carpal and forearm tendons to extreme torsional strain."
    ),

    # --- BONE MINERAL DENSITY (BMD) & AXIAL STIMULATION (Home: 13) ---
    (
        "Heavy Backpack Farmer Walk 60-Second Compressive Carry",
        9.1,
        "Backpack-weighted",
        "Carry two backpacks loaded with 18 kg each (36 kg total) with straight arms. Walk with packed posture for 60 seconds, delivering vertical axial compressive loading through the spine, hips, and radius."
    ),
    (
        "Heavy Backpack Single-Arm Suitcase Carry 18 kg Left",
        9.0,
        "Backpack-weighted",
        "Carry an 18 kg backpack in left hand for 45 seconds with vertical spine alignment, forcing the contralateral hip and lumbar vertebrae to absorb asymmetric compressive stress."
    ),
    (
        "Heavy Backpack Single-Arm Suitcase Carry 18 kg Right",
        9.0,
        "Backpack-weighted",
        "Carry the 18 kg backpack in right hand for 45 seconds, stimulating osteoblast activity in the right femoral neck and cortical bone."
    ),
    (
        "12-Inch Box Depth Drop With Stiff Athletic Landing",
        8.9,
        "Bodyweight",
        "Step off a 12-inch sturdy box or stair, landing flat-footed on both feet with a stiff, athletic deceleration. Perform 12 drops to generate a 4-to-5-times bodyweight ground reaction force wave."
    ),
    (
        "Heavy Backpack Overhead Waiter Walk 12 kg Left",
        8.9,
        "Backpack-weighted",
        "Press a 12 kg backpack overhead with left arm locked straight. Walk forward slowly for 35 seconds, directing axial compressive forces downward through the left arm, spine, and pelvis."
    ),
    (
        "Heavy Backpack Overhead Waiter Walk 12 kg Right",
        8.9,
        "Backpack-weighted",
        "Press the 12 kg backpack overhead with right arm locked. Walk for 35 seconds with tall posture, reinforcing bone mineral density across the right shoulder girdle and axial skeleton."
    ),
    (
        "Single-Leg Stiff Drop From 6-Inch Step Left",
        8.8,
        "Bodyweight",
        "Step off a 6-inch step, landing exclusively on the left foot with a stiff deceleration, absorbing the landing shock to stimulate localized trabecular bone density."
    ),
    (
        "Single-Leg Stiff Drop From 6-Inch Step Right",
        8.8,
        "Bodyweight",
        "Step off the step landing on the right foot with stiff ankle-knee alignment, training impact tolerance and calcaneal bone mineralization."
    ),
    (
        "Heavy Backpack Front-Rack Loaded Carry 20 kg",
        9.0,
        "Backpack-weighted",
        "Hug a 20 kg backpack tightly against chest. Walk with high-tension deliberate steps for 50 seconds, transmitting continuous compressive force through the thoracic vertebrae and femoral heads."
    ),
    (
        "Double-Foot Stiff Hurdle Hops on Hard Surface",
        8.7,
        "Bodyweight",
        "Hop over small 6-inch household obstacles with minimal knee bend and stiff ankles, completing 15 consecutive reactive impacts to deliver high-rate osteogenic strain."
    ),
    (
        "Heavy Backpack Quarter-Squat Axial Compressive Hold 25 kg",
        9.2,
        "Backpack-weighted",
        "Wear a 25 kg backpack. Stand in a tall quarter-squat with knees bent 30 degrees and spine locked in neutral. Maintain this position for 45 seconds to deliver sustained gravitational axial compression."
    ),
    (
        "Lateral Stiff Bound and Stick Drill 3-Second Hold",
        8.7,
        "Bodyweight",
        "Bound 3 feet laterally onto one foot, stick the landing with a stiff ankle, and freeze for 3 seconds before bounding back, delivering high-impact frontal plane loading to the femoral neck."
    ),
    (
        "Two-Hand Overhead Heavy Backpack Static Stance Lock 14 kg",
        8.8,
        "Backpack-weighted",
        "Press a 14 kg backpack overhead with elbows locked. Stand tall with squeezed glutes and tight core for 35 seconds, applying continuous axial osteogenic stress to the spine."
    ),
]

adv_gym_data = [
    # --- GYM: HEAVY RACK PULLS, PIN PRESSES & LOADED CARRIES (Gym: 30) ---
    (
        "Barbell Heavy Rack Pull Above Knee With 5-Second Eccentric",
        9.1,
        "Barbell",
        "Set barbell on safety pins just above the kneecap. Load with 80% 1RM. Pull to full standing lockout, hold for 3 seconds, and lower back onto the pins over a strict, controlled 5-second eccentric tempo, delivering massive axial compressive load to the spine and femoral neck."
    ),
    (
        "Heavy Barbell Isometric Pin Press at Eye Level",
        9.0,
        "Barbell",
        "Set safety pins in a power rack at eye level. Position an empty or loaded bar against the underside of the pins. Drive upward into the immovable pins with 90% maximal voluntary effort for 15 seconds to condition upper extremity tendons."
    ),
    (
        "Trap Bar Heavy Farmer Walk 100% Bodyweight Load",
        9.2,
        "Barbell",
        "Load a trap bar with your full bodyweight. Stand tall with packed scapulae and walk in a deliberate straight path for 45 seconds, delivering vertical compressive loading through the spine, hips, and radius."
    ),
    (
        "Barbell Pin Squat at 90 Degrees 5-Second Pause",
        9.0,
        "Barbell",
        "Set pins at 90-degree knee flexion height. Lower barbell onto pins over 4 seconds, rest on pins for a full 5-second dead-stop to dissipate elastic energy, and drive explosively off the pins."
    ),
    (
        "Leg Press Machine Heavy Slow Resistance 4-2-4 Tempo",
        8.9,
        "Machine",
        "Load leg press with 75% 1RM. Lower sled over 4 seconds, hold the 90-degree angle for 2 seconds, and press upward over 4 seconds across 8 repetitions, remodeling patellar tendon collagen."
    ),
    (
        "Barbell Heavy Romanian Deadlift 5-Second Eccentric",
        9.1,
        "Barbell",
        "Load barbell with 75% 1RM. Hinge backward at the hips over a strict 5-second count until plates reach mid-shin, pause for 2 seconds under immense tensile stretch, and drive through glutes to lock out."
    ),
    (
        "Standing Calf Raise Machine Heavy Deficit Hold",
        8.9,
        "Machine",
        "Load standing calf machine heavily. Lower heels 2 inches below the footplate into a deep deficit and hold the static stretch-tension position for 35 seconds to remodel the Achilles tendon."
    ),
    (
        "Seated Calf Raise Machine Heavy Slow Resistance 5-Second Tempo",
        8.8,
        "Machine",
        "Load seated calf machine. Rise onto toes over 2 seconds, pause for 3 seconds at peak contraction, and lower through full deficit over 5 seconds across 10 repetitions to load the soleus tendon."
    ),
    (
        "Heavy Dumbbell Farmer Walk Turnaround",
        8.9,
        "Dumbbells",
        "Pick up two 40 kg dumbbells. Walk 30 feet, make a controlled 180-degree turn, and walk back, subjecting the ankles, knees, and hips to multi-planar rotational bone loading."
    ),
    (
        "Barbell Zercher Squat With 3-Second Bottom Pause",
        9.0,
        "Barbell",
        "Cradle loaded barbell in the crooks of your elbows. Descend into a squat over 4 seconds, pause for 3 seconds at parallel, and rise, applying massive axial and anterior compressive load to the spine."
    ),
    (
        "Cable Heavy Slow Resistance Knee Extension 4-Second Tempo",
        8.6,
        "Machine",
        "Select heavy stack on leg extension machine. Extend legs over 3 seconds, hold peak contraction for 2 seconds, and lower through a strict 4-second eccentric descent across 8 repetitions."
    ),
    (
        "Cable Heavy Slow Resistance Leg Curl 4-Second Tempo",
        8.6,
        "Machine",
        "Curl heels to glutes over 2 seconds, pause for 2 seconds, and resist the stack through a strict 4-second eccentric release, targeting the distal hamstring tendons."
    ),
    (
        "Incline Dumbbell Preacher Curl 6-Second Eccentric Lowering",
        8.8,
        "Dumbbells",
        "Rest arm on preacher bench holding a heavy dumbbell. Curl to top with both hands, release non-working hand, and lower over an agonizing 6-second count to remodel distal biceps collagen."
    ),
    (
        "Heavy Barbell Shrug With 5-Second Isometric Peak Hold",
        8.9,
        "Barbell",
        "Hold a heavy loaded barbell at mid-thigh. Shrug shoulders upward toward ears and hold the peak contraction for 5 seconds per rep across 8 repetitions, loading cervical and upper thoracic bone."
    ),
    (
        "Barbell Overhead Lockout Walk 45 Seconds",
        9.0,
        "Barbell",
        "Press a barbell overhead to locked extension. Walk slowly across the floor for 45 seconds with packed core, transmitting vertical compressive force through the entire vertebral column."
    ),
    (
        "Heavy Dumbbell Suitcase Deadlift Dead-Stop",
        8.8,
        "Dumbbells",
        "Place a 35 kg dumbbell on the floor beside your foot. Hinge down, grip handle, and stand to full lockout, pausing for 2 seconds at the top before lowering to a dead-stop."
    ),
    (
        "Smith Machine Spanish Squat 50-Second Overload Hold",
        9.1,
        "Machine",
        "In a heavy Smith machine Spanish squat setup with vertical shins, sit at 80 degrees and hold statically for 50 seconds to force patellar tendon stress relaxation."
    ),
    (
        "Heavy Barbell Good Morning 4-Second Eccentric Tempo",
        8.9,
        "Barbell",
        "Hold loaded barbell on traps. Hinge forward at the hips over 4 seconds until torso is parallel to floor, pause for 2 seconds, and return, placing the proximal hamstring tendon under high tensile load."
    ),
    (
        "Dumbbell Single-Leg Romanian Deadlift 5-Second Tempo",
        8.7,
        "Dumbbells",
        "Hold heavy dumbbells performing single-leg RDLs, lowering over a 5-second count to load the stance leg's proximal hamstring and gluteal tendons."
    ),
    (
        "Cable Standing Face Pull With 4-Second External Rotation Squeeze",
        8.5,
        "Cable",
        "Pull heavy cable rope to forehead while flaring elbows and rotating forearms backward, holding the peak contracted posture for 4 seconds across 8 deliberate repetitions."
    ),
    (
        "Barbell Bench Press 4-Second Eccentric With 2-Second Chest Pause",
        8.8,
        "Barbell",
        "Lower heavy barbell to chest over 4 seconds, pause on chest for 2 seconds, and press upward over 2 seconds, conditioning the pectoralis major tendon."
    ),
    (
        "Machine Preacher Curl Apex Squeeze 5-Second Hold",
        8.6,
        "Machine",
        "Curl heavy machine lever to peak contraction, squeeze biceps against stack, and hold the static peak for 5 seconds per rep across 6 repetitions."
    ),
    (
        "Standing Cable Triceps Overhead Extension Heavy Slow Resistance",
        8.7,
        "Cable",
        "Extend heavy rope forward and upward from high pulley over 3 seconds, pause for 2 seconds, and return over 4 seconds, conditioning the distal triceps tendon."
    ),
    (
        "Barbell Front Squat 3-Second Bottom Pause at Parallel",
        9.0,
        "Barbell",
        "Perform front squats with clean grip. Lower over 4 seconds, pause at parallel for 3 seconds to dissipate elastic recoil, and drive up, loading patellar tendons and spine."
    ),
    (
        "Heavy Dumbbell Goblet Squat 5-Second Eccentric on Slant Board",
        8.8,
        "Dumbbells",
        "Hold a 30 kg dumbbell against chest on a 25-degree decline board. Lower over 5 seconds, pause for 2 seconds, and rise, directing mechanical tension into the patellar tendon."
    ),
    (
        "Trap Bar Deadlift Dead-Stop Off 2-Inch Deficit",
        9.1,
        "Barbell",
        "Stand on a 2-inch platform inside a trap bar. Pull to full lockout from a dead stop, pausing for 2 seconds at the top across 8 heavy repetitions."
    ),
    (
        "Cable Hip Adduction Heavy Slow Resistance 4-Second Tempo",
        8.5,
        "Cable",
        "Attach ankle cuff to low cable. Pull leg across body over 3 seconds, pause for 2 seconds, and return over 4 seconds to treat adductor tendinopathy."
    ),
    (
        "Barbell Stiff-Leg Deadlift Off 3-Inch Deficit 4-Second Tempo",
        9.0,
        "Barbell",
        "Stand on a 3-inch block holding a barbell. Hinge at hips with straight knees until plates reach toes, pausing for 2 seconds at full hamstring tendon elongation."
    ),
    (
        "Standing Dumbbell Overhead Farmer Walk 30 Seconds",
        8.9,
        "Dumbbells",
        "Press two heavy dumbbells overhead to locked extension. Walk slowly for 30 seconds with packed core, subjecting the axial skeleton to sustained vertical compression."
    ),
    (
        "Cable Standing Diagonal Woodchopper Low-to-High Heavy",
        8.6,
        "Cable",
        "Lift heavy cable diagonally from knee height up past opposite shoulder, holding the top rotational extension for 3 seconds across 8 repetitions per side."
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
