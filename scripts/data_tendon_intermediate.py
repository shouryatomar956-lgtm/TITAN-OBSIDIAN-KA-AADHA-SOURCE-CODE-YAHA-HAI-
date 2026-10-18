#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 8: BONES AND TENDONS STRENGTH - INTERMEDIATE TIER (Total: 152 Exercises)
# 106 Home (70%) + 46 Gym (30%)
# Validated Orthopedic Physical Therapy, Tendon Creep Adaptation, & Zero 1.5 Rep Protocol
# Scores strictly bounded between 6.1 and 8.0
# ==============================================================================

int_home_data = [
    # --- PATELLAR & QUAD TENDON HSR / ISOMETRICS (Home: 24) ---
    (
        "Single-Leg Slant Board Squat Eccentric Lowering",
        7.3,
        "Bodyweight",
        "Stand on one leg atop a 25-degree decline board with heel elevated and torso vertical. Slowly lower into a deep 70-degree single-leg squat over a strict 5-second eccentric count, maximizing localized strain on the patellar tendon before lightly stepping down with the free foot to reset."
    ),
    (
        "Heavy Backpack Spanish Squat Isometric Hold",
        7.6,
        "Backpack-weighted",
        "Wear a 10 kg backpack while looped into a heavy resistance band behind the knees anchored to a door. Sit back into a 70-degree knee bend with vertical shins, holding against the forward elastic shear for 45 continuous seconds to induce significant tendon creep and pain relief."
    ),
    (
        "Reverse Nordic Curl Eccentric Knee Extensor Lower",
        7.5,
        "Bodyweight",
        "Kneel tall on a cushioned mat with hips locked in full extension and toes pointed backward. Keeping a straight line from knees to shoulders, lean your entire body backward over a slow 4-second count to load the rectus femoris and quadriceps tendon under lengthening."
    ),
    (
        "Elevated Single-Leg Poliquin Step-Down",
        7.1,
        "Bodyweight",
        "Stand on a 4-inch block with working heel elevated on a wedge. Drive the knee forward 3 inches over the toes while lowering the opposite heel to the floor over 4 seconds, training patellar tendon tensile capacity at acute knee flexion angles."
    ),
    (
        "Backpack-Weighted 90-Degree Wall Sit Hold",
        7.4,
        "Backpack-weighted",
        "Wear an 8 kg backpack on your chest. Lower down a wall until thighs are completely parallel to the floor at a 90-degree angle. Maintain an unyielding isometric hold for 45 seconds, forcing quadriceps tendon collagen fiber recruitment."
    ),
    (
        "Assisted Sissy Squat Knee Extensor Drive",
        7.2,
        "Bodyweight",
        "Hold a sturdy doorframe for support. Elevate onto the balls of your feet and push your knees forward while leaning your torso backward in a straight line, lowering through 60 degrees over 4 seconds before pushing through the patellar tendon to rise."
    ),
    (
        "Backpack-Weighted Split Squat Isometric Bottom Hold",
        7.3,
        "Backpack-weighted",
        "Step into a lunge stance wearing a 10 kg backpack. Lower the rear knee until it hovers 1 inch above the floor. Hold this static bottom position for 30 seconds per leg, subjecting the front patellar tendon and patellofemoral joint to steady, controlled load."
    ),
    (
        "Single-Leg Wall Sit 60-Degree Isometric Hold",
        7.5,
        "Bodyweight",
        "Slide down a wall to a 60-degree knee flexion angle. Extend one leg straight out in front and support your full torso weight on the single working leg, holding for 25 seconds per side to stimulate unilateral tendon remodeling."
    ),
    (
        "Banded Terminal Knee Extension Heavy Lock",
        6.8,
        "Resistance Bands",
        "Anchor a heavy band at knee height. Loop behind knee crease. Step back to create high tension. Vigorously contract the quadriceps to pull the joint into absolute terminal extension, holding the lockout for 3 seconds across 15 deliberate repetitions."
    ),
    (
        "Backpack-Weighted Peterson Step-Up Pause",
        7.0,
        "Backpack-weighted",
        "Wear an 8 kg backpack. Stand on a 6-inch step with heel elevated and ball of foot on the surface. Lower the opposite heel to touch the ground, then push through the ball of the working foot to elevate onto toes, holding the top position for 2 seconds."
    ),
    (
        "Quadruped Resisted Knee Extension Lockout",
        6.7,
        "Resistance Bands",
        "On all fours with a resistance band looped around one ankle and anchored in front. Extend the knee fully against the elastic resistance, holding peak contraction for 3 seconds to condition the distal quadriceps tendon."
    ),
    (
        "Chair-Supported Single-Leg Decline Squat",
        7.2,
        "Bodyweight",
        "Stand with one foot on a 25-degree decline wedge holding a chair back for light balance. Perform single-leg squats through a 60-degree range over a 4-second lowering phase, directing mechanical tension exclusively into the patellar tendon."
    ),
    (
        "Heavy Backpack Step-Down With 3-Second Floor Tap",
        7.4,
        "Backpack-weighted",
        "Wear a 10 kg backpack standing on an 8-inch step. Slowly lower the opposite heel to lightly tap the floor, pause with the heel hovering for 3 seconds under continuous quadriceps tendon load, then press back up."
    ),
    (
        "Door-Anchored Heavy Band Spanish Squat Pulses",
        7.3,
        "Resistance Bands",
        "In a band-anchored Spanish squat position, pulse between 60 degrees and 80 degrees of knee flexion over 40 seconds, maintaining continuous tendon creep conditions without lockout relief."
    ),
    (
        "Supine Long-Lever Quadriceps Isometric Lock",
        6.9,
        "Resistance Bands",
        "Lie supine with a heavy band pulling the knee into flexion. Lock the leg completely straight against the band's pull, holding the terminal extension for 25 continuous seconds."
    ),
    (
        "Backpack-Weighted Cossack Squat Isometric Hold Left",
        7.4,
        "Backpack-weighted",
        "Wear a 6 kg backpack. Descend into a deep Cossack squat to the left, keeping the left heel flat. Hold the static bottom position for 20 seconds, loading the patellar tendon and adductor tendon complex under deep flexion."
    ),
    (
        "Backpack-Weighted Cossack Squat Isometric Hold Right",
        7.4,
        "Backpack-weighted",
        "Descend into a deep Cossack squat to the right with the backpack. Hold the bottom position for 20 seconds, transferring mechanical compressive strain across the knee joint capsule and collateral ligaments."
    ),
    (
        "Prone Active Quadriceps Tendon Stretch and Squeeze",
        6.5,
        "Bodyweight",
        "Lie prone. Bend one knee to 90 degrees and loop a towel around the ankle. Pull heel toward glutes until moderate tension is felt, then actively kick the foot backward into the towel with 50% effort for 15 seconds."
    ),
    (
        "Backpack-Weighted Step-Up Slow Eccentric Descent",
        7.3,
        "Backpack-weighted",
        "Step atop a 12-inch bench wearing a 10 kg backpack. Step down with the trailing leg over a strict 5-second descent, forcing the leading leg's patellar tendon to absorb the eccentric deceleration load."
    ),
    (
        "Assisted Sissy Squat Isometric Bottom Pause",
        7.5,
        "Bodyweight",
        "Descend into a sissy squat holding a doorframe until knees are flexed 80 degrees. Hold the bottom stretch-tension position statically for 20 seconds to stimulate collagen synthesis at the bone-tendon junction."
    ),
    (
        "Heavy Backpack Quarter-Squat Pause Cycle",
        7.1,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Perform squats with a 4-second descent, a 3-second isometric pause at 60 degrees of knee flexion, and an explosive 1-second ascent across 10 repetitions."
    ),
    (
        "Standing Band-Resisted Poliquin Knee Drive",
        6.9,
        "Resistance Bands",
        "Anchor band at ankle height behind you. Wrap loop across upper shin. Drive knee forward into acute flexion against the backward elastic pull, developing functional patellar tendon tolerance."
    ),
    (
        "Single-Leg Chair-Assisted Box Squat Pause",
        7.2,
        "Bodyweight",
        "Lower onto a chair on one leg over 4 seconds. Tap the seat lightly without resting, hold for 2 seconds, and drive back up through the heel, isolating the unilateral extensor mechanism."
    ),
    (
        "Doorframe Supported Reverse Lunge Knee-Hover Hold",
        7.0,
        "Bodyweight",
        "Step back into a reverse lunge holding a doorframe. Hover the rear knee 1 inch off the mat and hold for 30 seconds, maintaining steady isometric strain across both patellar and quadriceps tendons."
    ),

    # --- ACHILLES TENDON & PLANTAR APONEUROSIS HSR (Home: 22) ---
    (
        "Single-Leg Alfredson Deficit Heel Drop Off Stair",
        7.6,
        "Bodyweight",
        "Stand on the ball of one foot on the edge of a stair step holding the handrail. Rise up on both feet, remove the non-working foot, and lower the working heel below the step level over a strict 5-second count, performing 15 repetitions with a straight knee."
    ),
    (
        "Bent-Knee Single-Leg Alfredson Heel Drop Off Stair",
        7.5,
        "Bodyweight",
        "Perform the Alfredson eccentric protocol on a stair edge with the working knee bent at 30 degrees throughout the movement. The flexed knee silences the gastrocnemius, isolating the soleus tendon and deeper Achilles fibers."
    ),
    (
        "Heavy Backpack Single-Leg Isometric Calf Hold",
        7.8,
        "Backpack-weighted",
        "Wear a 12 kg backpack. Stand on one foot on flat ground beside a wall for fingertip balance. Rise to mid-plantarflexion height and hold statically for 35 seconds, applying high-load creep stimulation to the Achilles tendon."
    ),
    (
        "Stair-Deficit Isometric Calf Hold With Backpack",
        7.7,
        "Backpack-weighted",
        "Wear a 10 kg backpack standing on a step edge. Lower heels 1 inch below the step into a deficit and hold the static stretch-load for 40 seconds to remodel the myotendinous junction."
    ),
    (
        "Bent-Knee Seated Backpack Soleus Raise",
        7.2,
        "Backpack-weighted",
        "Sit on a chair with knees bent at 90 degrees. Rest a 12 kg backpack across lower thighs. Elevate heels as high as possible, pause for 3 seconds at peak contraction, and lower over 4 seconds across 12 repetitions."
    ),
    (
        "Slant Board Single-Leg Isometric Calf Press",
        7.4,
        "Bodyweight",
        "Stand on a 25-degree slant board on one leg with knee straight. Press the ball of the foot firmly downward against the incline, holding an immovable contraction for 30 seconds."
    ),
    (
        "Towel-Elevated Great Toe Single-Leg Heel Raise",
        7.1,
        "Bodyweight",
        "Place a 1-inch towel roll beneath your big toe to pre-stretch the plantar fascia via the windlass mechanism. Perform slow single-leg calf raises with a 3-second top pause and 3-second descent."
    ),
    (
        "Heavy Backpack Double-Leg Calf Raise Tempo",
        7.3,
        "Backpack-weighted",
        "Wear a 14 kg backpack. Execute double-leg calf raises with a 3-second concentric rise, a 3-second pause at the absolute apex of plantarflexion, and a 4-second eccentric descent."
    ),
    (
        "Single-Leg Pogo Hop Stiff-Ankle Stabilization",
        7.0,
        "Bodyweight",
        "Perform 15 small, rhythmic single-leg hops in place, keeping the knee nearly straight and ankle stiff to train reactive tendon elasticity and collagen energy storage-release."
    ),
    (
        "Wall-Facing Angled Achilles Isometric Stance",
        6.9,
        "Bodyweight",
        "Stand 3 feet from a wall in a staggered stance, hands on the wall. Keep the rear leg straight and drive the rear heel into the floor with 70% effort for 30 seconds of sustained tensile strain."
    ),
    (
        "Seated Soleus Heavy Backpack Isometric Press",
        7.3,
        "Backpack-weighted",
        "Sit with a 14 kg backpack resting on your knees. Elevate onto toes to mid-height and hold the static position for 40 seconds, maintaining continuous metabolic load in the soleus muscle-tendon unit."
    ),
    (
        "Single-Leg Deficit Calf Raise With 2-Second Top Pause",
        7.5,
        "Bodyweight",
        "On a step edge, perform single-leg calf raises through full range of motion: 2 seconds up, 2 seconds squeeze at peak plantarflexion, and 4 seconds lowering into deep dorsiflexion."
    ),
    (
        "Heavy Band Seated Plantarflexion Burnout",
        6.8,
        "Resistance Bands",
        "Loop a heavy resistance band around the ball of your foot. Push into full plantarflexion against heavy elastic tension, holding the peak squeeze for 2 seconds across 15 deliberate reps."
    ),
    (
        "Bent-Knee Single-Leg Wall Sit Calf Raise",
        7.4,
        "Bodyweight",
        "In a 60-degree wall sit, elevate one foot off the ground. Perform slow calf raises on the single stance leg, combining isometric quadriceps loading with dynamic soleus tendon strain."
    ),
    (
        "Stair-Edge Toe-Grip Isometric Plantar Clamp",
        7.1,
        "Bodyweight",
        "Wrap your toes around the lip of a wooden step. Press your toes firmly downward into the wood while maintaining a neutral heel height, holding for 25 seconds per foot."
    ),
    (
        "Backpack-Weighted Slant Board Calf Eccentric",
        7.6,
        "Backpack-weighted",
        "Wear an 8 kg backpack on a 25-degree slant board. Rise up on both feet, transfer weight to one leg, and lower over a 5-second descent to the base of the board."
    ),
    (
        "Single-Leg Stiff-Ankle Bounding in Place",
        7.2,
        "Bodyweight",
        "Bounce rhythmically on one foot with minimal knee flexion, focusing on rapid ground contact times to challenge the stretch-shortening cycle of the Achilles tendon."
    ),
    (
        "Heavy Backpack Staggered Stance Calf Iso-Hold",
        7.3,
        "Backpack-weighted",
        "Wear a 12 kg backpack in a split stance. Elevate both heels 1 inch off the floor and hold the static mid-range position for 35 seconds to load both Achilles tendons simultaneously."
    ),
    (
        "Resistance Band Plantar Fascia Windlass Pull",
        6.7,
        "Resistance Bands",
        "Sit on floor. Loop band under the toes and pull backward to extend toes, then actively curl toes downward against the band resistance, conditioning plantar intrinsic tendons."
    ),
    (
        "Double-Leg Deficit Calf Raise With 5-Second Eccentric",
        7.2,
        "Bodyweight",
        "Stand on a stair edge. Rise onto toes over 2 seconds, then lower heels 2 inches below step level over a slow 5-second count across 12 strict repetitions."
    ),
    (
        "Isometric Bent-Knee Calf Hold Off Step Edge",
        7.4,
        "Bodyweight",
        "Stand on a step edge with knees bent 30 degrees. Lower heels slightly and hold this static deficit position for 35 seconds to overload the deep soleus tendon complex."
    ),
    (
        "Single-Leg Floor Calf Raise With 3-Second Pause",
        7.0,
        "Bodyweight",
        "Perform single-leg calf raises on flat ground holding a wall for balance, pausing at the apex for 3 seconds on every repetition to eliminate elastic recoil and isolate contractile tendon strain."
    ),

    # --- HAMSTRING, GLUTEAL & HIP TENDONS (Home: 20) ---
    (
        "Single-Leg Floor Slider Eccentric Hamstring Curl",
        7.7,
        "Bodyweight",
        "Lie supine with one heel on a smooth slider. Elevate hips into a bridge, lift the opposite leg, and slowly slide the working heel forward over a punishing 5-second eccentric count until the leg is extended."
    ),
    (
        "Heavy Backpack Single-Leg Romanian Deadlift",
        7.6,
        "Backpack-weighted",
        "Hold a 10 kg backpack in one hand while standing on the opposite leg. Hinge at the hip over 4 seconds, extending the free leg backward with a flat spine, feeling high tensile strain in the proximal hamstring tendon."
    ),
    (
        "Assisted Nordic Hamstring Curl Eccentric Lower",
        7.8,
        "Bodyweight",
        "Anchor your heels beneath a heavy sofa or with a partner. Start kneeling tall with hips locked in extension. Lower your torso forward toward the floor over a controlled 4-second descent, catching yourself with hands."
    ),
    (
        "Single-Leg Glute Bridge Isometric Apex Hold",
        7.3,
        "Bodyweight",
        "Lie supine with one knee bent and foot flat. Drive through the heel to elevate hips into full extension, holding the single-leg bridge at peak height for 30 seconds to load the gluteal tendon insertion."
    ),
    (
        "Heavy Backpack Double-Leg Romanian Deadlift Tempo",
        7.4,
        "Backpack-weighted",
        "Hold a 14 kg backpack with both hands. Hinge hips backward over 4 seconds until hamstrings reach full active stretch, pause for 2 seconds at the bottom, and return over 2 seconds across 10 repetitions."
    ),
    (
        "Long-Lever Single-Leg Hamstring Bridge Hold",
        7.5,
        "Bodyweight",
        "Lie on your back with working knee bent to a 120-degree open angle. Lift opposite leg and elevate hips 3 inches off the floor, holding for 25 seconds to maximize mechanical torque on the distal hamstring tendon."
    ),
    (
        "Side-Lying Heavy Band Clamshell Isometric Hold",
        7.0,
        "Resistance Bands",
        "Loop a heavy resistance band around your knees. Lie on your side and open the top knee against the band to a 30-degree angle, holding peak abduction for 15 seconds across 6 repetitions."
    ),
    (
        "Heavy Backpack Hip Thrust Off Sofa",
        7.5,
        "Backpack-weighted",
        "Rest your upper back across the edge of a sofa with a 12 kg backpack across your hips. Drive through your heels to full hip extension, pausing at the top for 3 seconds per rep to load the gluteus maximus tendon."
    ),
    (
        "Standing Banded Good Morning With 3-Second Pause",
        7.1,
        "Resistance Bands",
        "Stand on a looped band with the top draped across your upper traps. Hinge forward at the hips with a flat back, pause for 3 seconds at full stretch, and return against the elastic tension."
    ),
    (
        "Prone Single-Leg Active Hamstring Lock",
        6.8,
        "Bodyweight",
        "Lie prone with one knee bent to 90 degrees. Lift the thigh 2 inches off the mat while keeping the pelvis flat, holding the static isometric contraction for 15 seconds to load the proximal tendon."
    ),
    (
        "Chair-Supported Single-Leg Hamstring Dig Bridge",
        7.4,
        "Bodyweight",
        "Place one heel atop a chair seat at a 90-degree knee bend. Elevate hips off the floor into a bridge and hold for 25 seconds, feeling intense contraction at the ischial tuberosity tendon attachment."
    ),
    (
        "Standing Single-Leg Hip Abduction Isometric Wall Press",
        7.2,
        "Bodyweight",
        "Stand sideways next to a wall. Lift the inside knee and press the side of the knee forcefully into the wall with 70% effort for 25 seconds, stimulating the stance leg's gluteus medius tendon."
    ),
    (
        "Heavy Backpack Good Morning Slow Tempo",
        7.3,
        "Backpack-weighted",
        "Wear a 10 kg backpack across your chest. Hinge forward at the hips with soft knees and a neutral spine over a 4-second count, pausing for 2 seconds at 90 degrees of hip flexion before returning."
    ),
    (
        "Supine Double-Leg Slider Hamstring Curl Hold",
        7.2,
        "Bodyweight",
        "Lie supine with heels on sliders. Bridge hips upward and curl heels in halfway (60-degree knee bend). Hold this static half-curl position for 25 seconds under continuous hamstring tension."
    ),
    (
        "Standing Band-Resisted Kickback With 3-Second Hold",
        6.9,
        "Resistance Bands",
        "Anchor band to a table leg and loop around ankle. Kick leg straight back into full hip extension, holding the contraction for 3 seconds to condition the gluteal tendon fibers."
    ),
    (
        "Backpack-Weighted Cossack Hinge Hold Left",
        7.4,
        "Backpack-weighted",
        "In a wide stance with a 10 kg backpack, shift hips back and down to the left, keeping the right leg straight with toes up. Hold for 20 seconds to load the left hamstring and right adductor tendons."
    ),
    (
        "Backpack-Weighted Cossack Hinge Hold Right",
        7.4,
        "Backpack-weighted",
        "Shift hips back and down to the right with the backpack, feeling deep stretch-load in the right hamstring tendon and left adductor tendon, holding for 20 seconds."
    ),
    (
        "Prone Double-Leg Hamstring Isometric Squeeze",
        6.7,
        "Resistance Bands",
        "Lie face down with a looped mini-band around your ankles. Pull both heels outward and upward against the band, holding the static contraction for 20 seconds."
    ),
    (
        "Single-Leg Step-Back Hinge With Backpack",
        7.3,
        "Backpack-weighted",
        "Hold an 8 kg backpack. Step one foot back 12 inches onto toes. Hinge forward over the front leg, loading the front hamstring tendon under eccentric deceleration."
    ),
    (
        "Wall-Supported Arabesque Isometric Tendon Hold",
        7.1,
        "Bodyweight",
        "Stand on one leg with hands on a wall. Extend the free leg straight behind you at hip level and hold for 25 seconds, demanding continuous stabilizing tendon strain from the stance hip."
    ),

    # --- UPPER LIMB TENDONS (BICEPS, TRICEPS, ROTATOR CUFF) (Home: 20) ---
    (
        "Heavy Backpack Slow Eccentric Biceps Lowering",
        7.4,
        "Backpack-weighted",
        "Load a backpack with 8 kg. Curl it to your chest with both hands, release one hand, and lower the backpack with the working arm over a deliberate 6-second eccentric descent to remodel distal biceps tendon collagen."
    ),
    (
        "Doorway Dip Frame Triceps Tendon Isometric Hold",
        7.5,
        "Bodyweight",
        "Place your hands on two sturdy chair seats or a narrow countertop corner. Lower your body into a 90-degree elbow bend dip position and hold statically for 25 seconds to load the triceps tendon insertion."
    ),
    (
        "Side-Lying Heavy Backpack Rotator Cuff Rotation",
        7.3,
        "Backpack-weighted",
        "Lie on your side with a towel under upper arm. Hold a 3-4 kg backpack by its strap. Rotate forearm upward toward ceiling over 3 seconds and lower under 4-second control across 10 repetitions."
    ),
    (
        "Doorframe Inverted Bodyweight Biceps Row Pause",
        7.2,
        "Bodyweight",
        "Grip an interior doorframe with both hands at chest level, feet placed near the base. Lean back until arms are straight, then pull chest toward the frame, holding peak contraction for 4 seconds per rep."
    ),
    (
        "Prone Floor Y-Raise Weighted Isometric Hold",
        7.1,
        "Backpack-weighted",
        "Lie prone holding two 1 kg water bottles in a Y-formation. Elevate arms 2 inches off the floor and hold for 15 seconds, loading the lower trapezius and supraspinatus tendon insertions."
    ),
    (
        "Prone Floor T-Raise Weighted Isometric Hold",
        7.1,
        "Backpack-weighted",
        "Lie prone holding light weights in a T-shape. Squeeze shoulder blades together, elevate arms 2 inches, and hold for 15 seconds to condition the middle trapezius and posterior cuff."
    ),
    (
        "Prone Floor W-Raise Weighted Rotational Hold",
        7.2,
        "Backpack-weighted",
        "Lie prone with elbows bent in a W-shape holding light weights. Lift elbows and hands together, externally rotating the shoulders, and hold for 15 seconds to load the infraspinatus tendon."
    ),
    (
        "Thick Towel Heavy Wring Rotational Endurance",
        6.9,
        "None",
        "Grip a heavy, double-folded wet bath towel with maximum grip force. Wring the towel forcefully in opposite directions, sustaining maximal rotational strain on forearm tendon sheaths for 20 seconds."
    ),
    (
        "Table-Supported Heavy Wrist Flexor Eccentric",
        7.3,
        "Backpack-weighted",
        "Rest forearm on a table holding a 6 kg backpack in an underhand grip. Use both hands to curl up, then lower with one hand over a strict 5-second descent to remodel the common flexor tendon."
    ),
    (
        "Table-Supported Heavy Wrist Extensor Eccentric",
        7.3,
        "Backpack-weighted",
        "Rest forearm flat with palm down holding a 4 kg backpack. Assist the wrist into full extension, then slowly lower through flexion over 5 seconds to treat lateral epicondyle tendinopathy."
    ),
    (
        "Overhead Heavy Backpack Triceps Extension Hold",
        7.4,
        "Backpack-weighted",
        "Hold an 8 kg backpack overhead with elbows bent at 90 degrees. Maintain an unyielding isometric hold for 25 seconds, developing tensile strength in the distal triceps tendon."
    ),
    (
        "Doorframe Lateral Arm Shove Isometric",
        7.0,
        "Bodyweight",
        "Stand beside a doorframe with arm straight at your side. Press the back of your wrist outward into the doorframe with 70% effort for 20 seconds to load the lateral deltoid and supraspinatus."
    ),
    (
        "Heavy Band Face Pull With External Rotation Hold",
        7.3,
        "Resistance Bands",
        "Anchor heavy band at eye level. Pull band toward nose while flaring elbows and rotating forearms vertically, holding the retracted posture for 3 seconds across 12 repetitions."
    ),
    (
        "Chair-Supported Push-Up Isometric Mid-Range Pause",
        7.2,
        "Bodyweight",
        "Lower into a push-up with hands on a chair until elbows are bent at 90 degrees. Hold the mid-range position for 25 seconds, loading the triceps tendon and pectoralis insertion simultaneously."
    ),
    (
        "Backpack Hammer Curl With 3-Second Apex Squeeze",
        7.1,
        "Backpack-weighted",
        "Hold a 10 kg backpack by its top handle in a neutral hammer grip. Curl upward, pause for 3 seconds at 90-degree elbow flexion, and lower over 4 seconds to condition the brachioradialis tendon."
    ),
    (
        "Wall-Facing Overhead Serratus Slide With Band",
        7.0,
        "Resistance Bands",
        "With a mini-band around your wrists, place forearms on a wall. Push forearms outward against band while sliding upward overhead, holding top position for 5 seconds per rep."
    ),
    (
        "Single-Arm Table Edge Reverse Wrist Curl",
        6.8,
        "Backpack-weighted",
        "Rest forearm on table holding a 3 kg bag palm down. Perform 12 slow reverse wrist curls with a 3-second lowering tempo to stimulate extensor carpi radialis brevis tendon remodeling."
    ),
    (
        "Double-Arm Overhead Backpack Lockout Walk",
        7.5,
        "Backpack-weighted",
        "Press a 6 kg backpack overhead with fully locked elbows. Walk slowly across the room for 45 seconds, demanding continuous stabilizing isometric stiffness from the rotator cuff tendons."
    ),
    (
        "Heavy Band Biceps Curl Apex Isometric Pause",
        7.1,
        "Resistance Bands",
        "Stand on a heavy band. Curl handles up to a 90-degree elbow angle and hold against the strong elastic tension for 20 seconds before slowly lowering over 4 seconds."
    ),
    (
        "Doorway Chest Fly Isometric Squeeze Hold",
        7.2,
        "Bodyweight",
        "Stand in a doorway with arms extended horizontally at shoulder height. Press palms and forearms forward into the frame with 60% effort for 20 seconds to condition the pectoralis major tendon."
    ),

    # --- BONE MINERAL DENSITY (BMD) & AXIAL STIMULATION (Home: 20) ---
    (
        "Heavy Backpack Stiff-Legged Farmer Walk",
        7.7,
        "Backpack-weighted",
        "Load two backpacks with 12 kg each. Hold one in each hand with straight arms and walk in a deliberate path with tall posture for 60 seconds, delivering vertical axial compressive loading through the spine, hips, and radius."
    ),
    (
        "Heavy Backpack Single-Arm Suitcase Carry Left",
        7.6,
        "Backpack-weighted",
        "Carry a 14 kg backpack in your left hand with completely vertical torso alignment for 45 seconds. The unilateral load forces the contralateral hip abductors and lumbar vertebrae to absorb asymmetric compressive stress."
    ),
    (
        "Heavy Backpack Single-Arm Suitcase Carry Right",
        7.6,
        "Backpack-weighted",
        "Carry the 14 kg backpack in your right hand for 45 seconds, maintaining level shoulders and pelvis to stimulate osteoblast activity in the right femoral neck and cortical bone."
    ),
    (
        "Stair Depth Drop With Stiff-Foot Landing",
        7.5,
        "Bodyweight",
        "Step off a 6-inch step or platform, landing flat-footed on both feet with a stiff, athletic deceleration. Perform 15 controlled drops to generate a 3-to-4-times bodyweight ground reaction force wave through the lower extremities."
    ),
    (
        "Heavy Backpack Overhead Waiter Walk Left",
        7.7,
        "Backpack-weighted",
        "Press an 8 kg backpack overhead with your left arm locked straight. Walk forward slowly for 30 seconds, directing axial compressive forces downward through the left arm, spine, and pelvis."
    ),
    (
        "Heavy Backpack Overhead Waiter Walk Right",
        7.7,
        "Backpack-weighted",
        "Press the 8 kg backpack overhead with your right arm locked. Walk for 30 seconds with tall posture, reinforcing bone mineral density across the right shoulder girdle and axial skeleton."
    ),
    (
        "Double-Foot Stiff Pogo Hops on Hard Surface",
        7.4,
        "Bodyweight",
        "Perform 25 rapid, consecutive vertical hops on a firm, thin mat, bouncing off the forefeet with minimal knee bend to transmit sharp impact forces through the tibia and calcaneus."
    ),
    (
        "Heavy Backpack Quarter-Squat Axial Compressive Hold",
        7.8,
        "Backpack-weighted",
        "Wear an 18 kg backpack. Stand in a tall quarter-squat with knees bent 30 degrees and spine locked in neutral. Maintain this position for 45 seconds to deliver sustained gravitational axial compression to the lumbar spine."
    ),
    (
        "Forward Lunge Deceleration Stomp Alternate",
        7.3,
        "Bodyweight",
        "Step forward into a lunge with a deliberate, firm foot strike against the floor, instantly freezing in the lunge for 3 seconds before pushing back, performing 10 stomps per leg."
    ),
    (
        "Heavy Backpack Front-Rack March in Place",
        7.6,
        "Backpack-weighted",
        "Hug a 14 kg backpack tightly against your chest in a front-rack carry. March in place with high knees for 60 seconds, transferring alternating axial loads through the pelvis and femoral neck."
    ),
    (
        "Lateral Stiff-Legged Hop and Stick Drill",
        7.2,
        "Bodyweight",
        "Hop 18 inches laterally to the left, land flat-footed with a stiff knee-ankle alignment, and hold the balance for 3 seconds before hopping back to the right, training frontal-plane bone loading."
    ),
    (
        "Wall-Facing Compressive Palm Shove Drill",
        7.0,
        "Bodyweight",
        "Stand 3 feet from a wall. Fall forward and catch yourself with open palms, absorbing the impact with slightly flexed elbows and pushing forcefully into the wall for 5 seconds across 12 reps."
    ),
    (
        "Backpack-Weighted Step-Down Impact Stomp",
        7.5,
        "Backpack-weighted",
        "Wear an 8 kg backpack. Step down from a 4-inch step, stomping the lead foot flat onto the floor with authority to generate an osteogenic shock wave through the leg bones."
    ),
    (
        "Single-Leg Stiff Hop in Place Left",
        7.3,
        "Bodyweight",
        "Perform 12 consecutive single-leg hops in place on the left foot, keeping the ankle stiff and ground contact short to stimulate localized trabecular bone density in the left tibia."
    ),
    (
        "Single-Leg Stiff Hop in Place Right",
        7.3,
        "Bodyweight",
        "Perform 12 single-leg hops on the right foot, training impact tolerance and calcaneal bone mineralization."
    ),
    (
        "Heavy Backpack Bilateral Clean and Catch Hold",
        7.6,
        "Backpack-weighted",
        "Lift a 14 kg backpack from the floor to chest height, catching it in a quarter-squat and freezing the landing for 3 seconds to absorb vertical deceleration forces through the skeleton."
    ),
    (
        "Tandem Stance High-Tension Shifting Drill",
        6.8,
        "Backpack-weighted",
        "Wear a 10 kg backpack. Stand in heel-to-toe tandem stance. Shift weight rapidly between front and rear heels, holding each end for 5 seconds to load the pelvic girdle multi-axially."
    ),
    (
        "Heavy Backpack Bear Hug Static Stance Hold",
        7.5,
        "Backpack-weighted",
        "Clasp your arms around a 16 kg backpack in a bear hug against your ribcage. Stand upright with locked core for 45 seconds to stimulate anterior vertebral bone density."
    ),
    (
        "Two-Hand Overhead Weight Hold and Pivot",
        7.3,
        "Backpack-weighted",
        "Hold an 8 kg backpack overhead with arms locked. Take small 90-degree pivot steps around in a circle for 40 seconds, challenging rotational and vertical axial bone stability."
    ),
    (
        "Four-Corner Stiff Agility Hop Matrix",
        7.2,
        "Bodyweight",
        "Hop forward, right, backward, and left in a 1-foot square pattern with stiff ankles, completing 5 continuous cycles to deliver multi-directional osteogenic strain."
    ),
]

int_gym_data = [
    # --- GYM: HEAVY SLOW RESISTANCE & AXIAL LOADING (Gym: 46) ---
    (
        "Barbell Back Squat Heavy Slow Resistance 3-0-3 Tempo",
        7.9,
        "Barbell",
        "Load an Olympic barbell with 70% 1RM. Descend into a squat over a strict 3-second eccentric tempo, pause for 1 second at 90 degrees, and drive upward over a deliberate 3-second concentric phase to remodel patellar and quadriceps tendon collagen."
    ),
    (
        "Leg Press Machine 90-Degree Isometric Hold",
        7.8,
        "Machine",
        "Load the leg press with moderate-to-heavy weight. Lower the sled until knees reach a 90-degree angle and lock into an unyielding isometric hold for 35 seconds, inducing deep patellar tendon creep without dynamic joint friction."
    ),
    (
        "Hack Squat Machine Slow Eccentric Lowering",
        7.7,
        "Machine",
        "Position shoulders under the pads of a 45-degree hack squat. Lower the sled over a controlled 5-second tempo to full depth, pause for 1 second, and drive up over 2 seconds across 8 repetitions."
    ),
    (
        "Barbell Romanian Deadlift 4-Second Eccentric",
        7.8,
        "Barbell",
        "Hold an Olympic barbell with an overhand grip at mid-thigh. Hinge backward at the hips over a strict 4-second descent until plates reach mid-shin, feeling intense tensile strain in the proximal hamstring tendon before driving through glutes to lock out."
    ),
    (
        "Standing Calf Raise Machine Heavy Slow Resistance",
        7.7,
        "Machine",
        "Set standing calf machine to heavy weight. Rise onto toes over 3 seconds, hold the peak contraction for 3 seconds to maximally stress the Achilles tendon, and lower into a deep deficit over 3 seconds."
    ),
    (
        "Seated Calf Raise Machine Heavy Slow Resistance",
        7.6,
        "Machine",
        "Load plates onto a seated calf machine. Rise onto toes over 3 seconds, pause at the apex for 3 seconds, and lower below platform level over 4 seconds, targeting the soleus tendon and deeper Achilles fibers."
    ),
    (
        "Trap Bar Farmer Walk Heavy Loaded Carry",
        8.0,
        "Barbell",
        "Step inside a trap bar loaded with bodyweight equivalent. Lift to full upright lockout with packed shoulders and walk forward with deliberate, short steps for 45 seconds, delivering massive vertical axial compressive loading through the spine and hips."
    ),
    (
        "Heavy Dumbbell Suitcase Carry Left",
        7.7,
        "Dumbbells",
        "Pick up a heavy dumbbell in your left hand. Walk in a straight line for 40 seconds with completely vertical posture, forcing the contralateral hip abductor tendons and spine to resist lateral shear."
    ),
    (
        "Heavy Dumbbell Suitcase Carry Right",
        7.7,
        "Dumbbells",
        "Pick up the heavy dumbbell in your right hand. Walk for 40 seconds, maintaining level shoulders and pelvis to stimulate unilateral bone mineral density in the right femoral neck."
    ),
    (
        "Barbell Rack Pull Below Knee With 3-Second Hold",
        8.0,
        "Barbell",
        "Set barbell on safety pins just below the patella. Grip with double overhand or straps. Pull the bar to full standing lockout, roll shoulders back, and hold the static lockout for 15 seconds to apply intense axial loading to the skeleton."
    ),
    (
        "Smith Machine Spanish Squat Isometric Lock",
        7.8,
        "Machine",
        "Position a heavy strap behind your knees anchored to the Smith machine uprights. With the bar across upper traps, sit back into a 70-degree squat with vertical shins and hold statically for 40 seconds."
    ),
    (
        "Leg Extension Machine Heavy Slow Resistance",
        7.6,
        "Machine",
        "Select 70% 1RM on the leg extension machine. Extend legs over 3 seconds, pause for 2 seconds at peak contraction, and lower through a strict 4-second eccentric descent to remodel the patellar tendon."
    ),
    (
        "Seated Leg Curl Machine Heavy Slow Resistance",
        7.6,
        "Machine",
        "Curl pad downward over 3 seconds until heels reach glutes, pause for 2 seconds, and resist the weight stack through a 4-second eccentric release, targeting the distal hamstring tendons."
    ),
    (
        "Incline Dumbbell Preacher Curl Slow Eccentric",
        7.5,
        "Dumbbells",
        "Rest upper arm on a 45-degree preacher bench holding a dumbbell. Curl to top over 2 seconds, then lower through an agonizing 5-second eccentric tempo until the arm is fully extended, conditioning the distal biceps tendon."
    ),
    (
        "EZ-Bar Overhead Triceps Extension 4-Second Tempo",
        7.5,
        "EZ-Bar",
        "Sit on a low-back bench holding an EZ-bar overhead. Lower the bar behind your head over a strict 4-second eccentric count to deeply stretch the triceps tendon, then extend overhead over 2 seconds."
    ),
    (
        "Cable Straight-Arm Lat Pulldown Isometric Apex Pause",
        7.3,
        "Cable",
        "Attach a straight bar to a high pulley. Pull bar downward to thighs with straight arms, squeeze lats, and hold the static lockout for 3 seconds per rep across 10 deliberate repetitions."
    ),
    (
        "Cable External Rotation Heavy Slow Resistance",
        7.2,
        "Cable",
        "Set pulley at elbow height with a single handle. Rotate forearm outward away from abdomen over 3 seconds, hold for 2 seconds, and return over 3 seconds to treat infraspinatus tendinopathy."
    ),
    (
        "Cable Internal Rotation Heavy Slow Resistance",
        7.2,
        "Cable",
        "Rotate forearm inward across abdomen against cable stack over 3 seconds, hold peak contraction for 2 seconds, and return over 3 seconds, building subscapularis tendon tensile strength."
    ),
    (
        "Barbell Good Morning With 3-Second Isometric Bottom Pause",
        7.7,
        "Barbell",
        "Hold a barbell across upper traps. Hinge hips backward until torso is nearly parallel to floor, hold the static bottom stretch for 3 seconds, and return to standing, loading the proximal hamstring tendon."
    ),
    (
        "Dumbbell Goblet Squat 4-Second Eccentric Slant Board",
        7.6,
        "Dumbbells",
        "Hold a heavy dumbbell against chest while standing on a 25-degree decline board. Lower into a squat over 4 seconds, pause for 1 second, and drive up over 2 seconds across 10 repetitions."
    ),
    (
        "Barbell Overhead Lockout Stance Hold",
        7.8,
        "Barbell",
        "Press a barbell overhead to full arm lockout. Stand tall with core braced and glutes squeezed, holding the static bar overhead for 25 seconds to transmit vertical compressive stress through the vertebral bodies."
    ),
    (
        "Cable Standing Woodchopper Diagonal Isometric Stop",
        7.4,
        "Cable",
        "Pull cable diagonally across body from high to low. Freeze at mid-thigh level and hold against the rotational torque for 4 seconds per repetition across 8 reps per side."
    ),
    (
        "Flat Bench Barbell Wrist Flexor Curl Heavy Tempo",
        7.2,
        "Barbell",
        "Rest forearms along flat bench with wrists hanging past edge holding a loaded barbell. Curl wrists upward over 2 seconds, pause for 2 seconds, and lower through full extension over 3 seconds."
    ),
    (
        "Flat Bench Barbell Reverse Wrist Curl Heavy Tempo",
        7.2,
        "Barbell",
        "Rest forearms on bench with palms down holding barbell. Extend wrists upward over 2 seconds, hold for 2 seconds, and lower over 3 seconds, remodeling the common extensor tendon."
    ),
    (
        "Standing Dumbbell Hammer Curl With 3-Second Pause",
        7.4,
        "Dumbbells",
        "Curl heavy dumbbells in neutral grip to 90 degrees. Hold the mid-range contraction for 3 seconds per rep to direct maximum mechanical strain into the brachioradialis tendon."
    ),
    (
        "Cable Seated Face Pull With High External Rotation",
        7.4,
        "Cable",
        "Pull rope from high pulley toward forehead while pulling hands apart and rotating wrists backward, holding the peak contracted posture for 3 seconds across 10 repetitions."
    ),
    (
        "Dumbbell Front-Rack Loaded Carry",
        7.8,
        "Dumbbells",
        "Clean two heavy dumbbells to shoulder height, resting heads on front deltoids. Walk forward with packed spine for 45 seconds, delivering heavy axial loading to the thoracic and lumbar spine."
    ),
    (
        "Barbell Zercher Carry Across Floor",
        7.9,
        "Barbell",
        "Cradle a loaded barbell in the crooks of your elbows against your chest. Walk with deliberate steps for 35 seconds, subjecting the bicep tendons, spine, and pelvis to massive anterior compressive load."
    ),
    (
        "Leg Press Machine Single-Leg Eccentric Lowering",
        7.8,
        "Machine",
        "Press sled with both legs, remove one foot, and slowly lower the platform with the working leg over a strict 5-second count to 90 degrees before replacing both feet to press."
    ),
    (
        "Smith Machine Standing Calf Raise Deficit Hold",
        7.7,
        "Machine",
        "Place balls of feet on a raised calf block under a Smith machine bar. Lower heels below block into deep deficit and hold the static stretch-tension position for 30 seconds."
    ),
    (
        "Cable Low-Pulley Step-Down Simulation",
        7.5,
        "Cable",
        "Attach cable belt around waist facing away from low pulley. Lower into a single-leg step-down, fighting the backward cable shear to overload the patellar tendon."
    ),
    (
        "Dumbbell Step-Up With 4-Second Eccentric Descent",
        7.6,
        "Dumbbells",
        "Step onto a 16-inch box holding dumbbells. Step down with the trailing leg over a strict 4-second descent, forcing the stance leg's knee extensor tendon to absorb deceleration forces."
    ),
    (
        "Barbell Stiff-Leg Deadlift Off 2-Inch Deficit",
        7.9,
        "Barbell",
        "Stand on a 2-inch platform holding a barbell. Hinge at hips with straight knees until plates reach toes, pausing for 2 seconds at full hamstring tendon elongation."
    ),
    (
        "Incline Bench Dumbbell Y-Raise Slow Tempo",
        7.3,
        "Dumbbells",
        "Lie prone on a 30-degree incline bench holding light dumbbells. Raise arms into a Y-formation, pause for 2 seconds at the top, and lower over 4 seconds to condition supraspinatus tendons."
    ),
    (
        "Cable Standing Pallof Press With Overhead Raise",
        7.5,
        "Cable",
        "Press cable handle out from chest, raise hands overhead while resisting rotational torque, pause for 2 seconds, and lower to chest across 8 repetitions per side."
    ),
    (
        "Barbell Push Press Lockout Isometric Hold",
        7.8,
        "Barbell",
        "Dip and drive a barbell overhead to full lockout. Hold the bar stationary overhead with shrugged traps and locked elbows for 15 seconds to apply direct axial osteogenic stress."
    ),
    (
        "Dumbbell Single-Leg Romanian Deadlift 4-Second Tempo",
        7.7,
        "Dumbbells",
        "Perform single-leg RDLs holding dumbbells, lowering over a 4-second count to load the stance leg's proximal hamstring and gluteal tendons."
    ),
    (
        "Machine Preacher Curl Apex Squeeze Hold",
        7.4,
        "Machine",
        "Curl machine lever to peak contraction, squeeze biceps against stack resistance, and hold the static peak for 4 seconds per rep across 8 repetitions."
    ),
    (
        "Standing Cable Triceps Overhead Extension With Rope",
        7.3,
        "Cable",
        "Face away from high pulley holding rope overhead. Extend arms forward and upward, holding lockout for 2 seconds to condition the distal triceps tendon."
    ),
    (
        "Dumbbell Lateral Raise With 3-Second Lowering",
        7.2,
        "Dumbbells",
        "Raise dumbbells out to shoulder height, pause for 1 second, and lower over a strict 3-second eccentric tempo to build tensile tolerance in the supraspinatus tendon."
    ),
    (
        "Barbell Bench Press 3-Second Pause at Chest",
        7.7,
        "Barbell",
        "Lower barbell to mid-sternum over 3 seconds. Rest bar lightly on chest for a full 3-second dead-stop pause before pressing up, loading the pectoralis major tendon isometrically."
    ),
    (
        "Cable Hip Adduction Heavy Slow Resistance",
        7.4,
        "Cable",
        "Attach ankle cuff to low cable. Pull working leg across body against resistance over 3 seconds, pause for 2 seconds, and return over 3 seconds to treat adductor tendinopathy."
    ),
    (
        "Seated Row Machine With Single-Arm Retraction Hold",
        7.5,
        "Machine",
        "Perform single-arm row on a machine, pulling handle to ribcage and holding the scapular retraction for 4 seconds to stimulate periscapular tendon attachments."
    ),
    (
        "Barbell Pin Squat at Parallel From Dead Stop",
        7.9,
        "Barbell",
        "Set rack safety pins at parallel squat height. Lower bar onto pins, allow weight to settle for 2 seconds to dissipate stretch-shortening elasticity, and drive explosively off the pins."
    ),
    (
        "Standing Dumbbell Overhead Farmer Walk",
        7.8,
        "Dumbbells",
        "Press two dumbbells overhead to locked extension. Walk slowly across the gym floor for 35 seconds, subjecting the axial skeleton to sustained vertical compression."
    ),
    (
        "Cable Standing Diagonal Woodchopper Low-to-High",
        7.5,
        "Cable",
        "Lift cable diagonally from knee height up past opposite shoulder, holding the top rotational extension for 2 seconds across 10 repetitions per side."
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
