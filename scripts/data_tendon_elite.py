#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 8: BONES AND TENDONS STRENGTH - ELITE TIER (Total: 60 Exercises)
# 42 Home (70%) + 18 Gym (30%)
# Validated Structural Loading Research, Hyper-Advanced Levers,
# Severe Mechanical Disadvantage, and Mandatory 1.5 Repetition Protocol / Static-Active Locks
# Scores strictly bounded between 9.3 and 10.0
# ==============================================================================

elite_home_data = [
    # --- ELITE HOME: HYPER-LEVER PATELLAR & QUAD TENDON (11) ---
    (
        "Heavy Backpack Sissy Squat 1.5 Repetition Protocol",
        9.8,
        "Backpack-weighted",
        "Wear a 15 kg backpack. Rise onto the balls of your feet without hand assistance. Execute the strict 1.5 repetition protocol: descend through 80 degrees of knee flexion over a 4-second tempo, drive upward halfway, descend back to 80 degrees under continuous quadriceps tendon tension, then drive to full extension, completing one repetition."
    ),
    (
        "Unassisted Reverse Nordic Curl 1.5 Protocol Lever",
        9.9,
        "Bodyweight",
        "Kneel tall with hips locked in extension. Execute the strict 1.5 repetition protocol: lean backward over 4 seconds until torso is 3 inches from floor, pull forward 50% through the quadriceps tendon, lower back into the extreme 3-inch hover, then pull all the way to vertical."
    ),
    (
        "Heavy Backpack Single-Leg Decline Squat 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Wear a 16 kg backpack on a 25-degree decline board on one leg. Execute the strict 1.5 repetition protocol: lower into deep 80-degree single-leg squat over 4 seconds, drive upward halfway, sink back to 80 degrees under massive patellar tendon strain, then press to full lockout."
    ),
    (
        "Single-Leg Spanish Squat Heavy Band 1.5 Cycle",
        9.8,
        "Resistance Bands",
        "Anchor heavy dual bands behind knee. Balance on one leg with vertical shin. Execute the strict 1.5 repetition protocol: lower to 80 degrees of knee bend, drive upward halfway against band shear, lower back to 80 degrees, then return to full lockout."
    ),
    (
        "Heavy Backpack Poliquin Deficit Step-Down 1.5 Protocol",
        9.6,
        "Backpack-weighted",
        "Wear an 18 kg backpack on an 8-inch block with heel on wedge. Execute the strict 1.5 repetition protocol: lower opposite heel to touch floor over 4 seconds, push up halfway, lower back to floor tap, then press to top."
    ),
    (
        "Single-Leg 90-Degree Wall Sit 1.5 Pulse Cycle",
        9.7,
        "Bodyweight",
        "Slide down to 90 degrees on a wall on one leg. Execute the strict 1.5 repetition protocol: hold full 90-degree depth, rise 3 inches upward along the wall, sink back into parallel 90-degree depth, then hold statically for 10 seconds of unyielding patellar tendon creep."
    ),
    (
        "Heavy Backpack Bulgarian Split Squat 1.5 Protocol Overload",
        9.8,
        "Backpack-weighted",
        "Elevate rear foot on a chair wearing a 20 kg backpack. Execute the strict 1.5 repetition protocol: lower front thigh to parallel over 4 seconds, drive upward halfway, descend back to parallel under heavy tension, then drive to standing."
    ),
    (
        "Backpack-Weighted Cossack Squat 1.5 Bottom Pulse Left",
        9.6,
        "Backpack-weighted",
        "Wear a 16 kg backpack. Execute the strict 1.5 repetition protocol: descend into full deep Cossack squat to the left, rise halfway up, sink back to bottom stretch under heavy joint strain, then drive to standing."
    ),
    (
        "Backpack-Weighted Cossack Squat 1.5 Bottom Pulse Right",
        9.6,
        "Backpack-weighted",
        "Wear the 16 kg backpack in a deep right Cossack squat. Execute the strict 1.5 repetition protocol: descend to full depth, rise halfway, sink back into deep tensile stretch, then return to top."
    ),
    (
        "Single-Leg Slant Board Dragon Squat 1.5 Protocol",
        9.9,
        "Bodyweight",
        "On a 25-degree decline wedge, thread trailing leg behind in a dragon squat. Execute the strict 1.5 repetition protocol: lower hips to 3 inches off floor over 5 seconds, drive up halfway, sink back to bottom hover, then drive to standing."
    ),
    (
        "Heavy Backpack Single-Leg Box Squat 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Wear an 18 kg backpack. Execute the strict 1.5 repetition protocol: lower onto a low stool on one leg, tap seat lightly, drive up halfway, descend back to light seat tap, then drive to full single-leg standing lockout."
    ),

    # --- ELITE HOME: HYPER-LEVER ACHILLES & PLANTAR APONEUROSIS (11) ---
    (
        "Heavy Backpack Single-Leg Deficit Heel Drop 1.5 Protocol",
        9.9,
        "Backpack-weighted",
        "Wear a 24 kg backpack standing on one leg on a stair edge. Execute the strict 1.5 repetition protocol: lower heel into deep 2-inch deficit over 5 seconds, rise halfway to neutral, lower back into extreme deficit under immense Achilles strain, then push to full plantarflexion apex."
    ),
    (
        "Heavy Backpack Bent-Knee Soleus Deficit Drop 1.5 Protocol",
        9.8,
        "Backpack-weighted",
        "Wear a 24 kg backpack on a stair edge with working knee locked at 30 degrees. Execute the strict 1.5 repetition protocol: lower heel deep into deficit over 5 seconds, rise halfway, lower back to maximum deficit, then elevate onto toes."
    ),
    (
        "Slant Board Single-Leg Calf Raise 1.5 Protocol Overload",
        9.7,
        "Backpack-weighted",
        "Wear an 18 kg backpack on a 25-degree decline board on one leg. Execute the strict 1.5 repetition protocol: rise onto toes to full height, lower halfway, push back to peak plantarflexion squeeze, then lower through complete 5-second eccentric deficit."
    ),
    (
        "Bent-Knee Seated Heavy Backpack Soleus 1.5 Protocol",
        9.6,
        "Backpack-weighted",
        "Sit with a 26 kg backpack on lower thighs. Execute the strict 1.5 repetition protocol: elevate heels to full height over 3 seconds, lower halfway, drive back into peak soleus squeeze, then lower to floor over 4 seconds."
    ),
    (
        "Towel-Elevated Great Toe Single-Leg Calf 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Place a 2-inch towel roll beneath your big toe wearing a 16 kg backpack. Execute the strict 1.5 repetition protocol: rise to peak plantarflexion, lower halfway under windlass pre-stretch, pulse back to apex, then lower through full deficit."
    ),
    (
        "Single-Leg Stair Deficit Static-Active 1.5 Pulse Cycle",
        9.8,
        "Backpack-weighted",
        "Wear a 20 kg backpack on a stair edge. Execute the strict 1.5 repetition protocol: lower into maximum deficit, pulse upward 1 inch, sink back into full deficit, then hold statically for 15 seconds of deep tendon creep."
    ),
    (
        "Heavy Backpack Double-Leg Calf Raise 1.5 Deficit Cycle",
        9.6,
        "Backpack-weighted",
        "Wear a 28 kg backpack on a stair edge. Execute the strict 1.5 repetition protocol: rise to peak height over 2 seconds, lower halfway, drive back to maximum apex, then lower into deep deficit over 5 seconds."
    ),
    (
        "Heavy Band Single-Leg Plantarflexion 1.5 Protocol",
        9.5,
        "Resistance Bands",
        "Loop doubled heavy bands under foot. Execute the strict 1.5 repetition protocol: drive into full plantarflexion, yield halfway against elastic pull, push back into peak contraction, then lower through 4-second eccentric reset."
    ),
    (
        "Single-Leg Wall Sit Deficit Calf Raise 1.5 Protocol",
        9.8,
        "Bodyweight",
        "Hold a 90-degree single-leg wall sit with ball of foot on a block. Execute the strict 1.5 repetition protocol: rise onto toes, lower halfway, pulse back to apex, then lower heel below block level."
    ),
    (
        "Stair Deficit Bent-Knee Soleus 1.5 Extreme Pulse",
        9.7,
        "Backpack-weighted",
        "Wear a 20 kg backpack on a step with knees bent 30 degrees. Execute the strict 1.5 repetition protocol: sink to maximum deficit, rise 1 inch, sink back into deep stretch, then hold for 15 seconds."
    ),
    (
        "Heavy Backpack Staggered Stance Deficit 1.5 Pulse",
        9.6,
        "Backpack-weighted",
        "Wear a 22 kg backpack on a stair edge in split stance. Execute the strict 1.5 repetition protocol: lower both heels into deficit, rise halfway, sink back to maximum stretch, then elevate onto toes."
    ),

    # --- ELITE HOME: HYPER-LEVER HAMSTRING & GLUTEAL TENDONS (10) ---
    (
        "Unassisted Nordic Hamstring Curl 1.5 Protocol",
        10.0,
        "Bodyweight",
        "Kneel tall with anchored heels and hips in full extension. Execute the strict 1.5 repetition protocol: lower torso forward over 4 seconds until 3 inches from floor, pull upward halfway through hamstrings, descend back to the 3-inch hover, then pull all the way back to vertical."
    ),
    (
        "Heavy Backpack Single-Leg Romanian Deadlift 1.5 Protocol",
        9.8,
        "Backpack-weighted",
        "Hold a 22 kg backpack balancing on one leg. Execute the strict 1.5 repetition protocol: hinge forward at hip over 4 seconds until torso is parallel, rise halfway up, hinge back down into deep hamstring stretch, then drive to full standing lockout."
    ),
    (
        "Long-Lever Single-Leg Hamstring Bridge 1.5 Protocol",
        9.9,
        "Bodyweight",
        "Lie supine with stance knee at 130-degree open angle. Execute the strict 1.5 repetition protocol: drive through heel to elevate hips 4 inches, lower 2 inches, pulse back into peak hip extension, then hold static for 10 seconds before lowering."
    ),
    (
        "Heavy Backpack Single-Leg Hip Thrust 1.5 Protocol Off Sofa",
        9.7,
        "Backpack-weighted",
        "Rest upper back on sofa with an 18 kg backpack on hips. Execute the strict 1.5 repetition protocol: drive stance heel to full hip extension, lower halfway, pulse back to peak gluteal contraction, then lower to floor."
    ),
    (
        "Heavy Backpack Double-Leg Romanian Deadlift 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Hold a 26 kg backpack. Execute the strict 1.5 repetition protocol: hinge hips back over 4 seconds to mid-shin, rise halfway to knees, hinge back down into full stretch, then drive to standing."
    ),
    (
        "Floor Slider Single-Leg Hamstring Curl 1.5 Protocol",
        9.9,
        "Bodyweight",
        "In a single-leg bridge, execute the strict 1.5 repetition protocol: slide working heel forward until nearly straight, pull back halfway, slide forward again under continuous eccentric load, then curl all the way in."
    ),
    (
        "Heavy Band Good Morning 1.5 Protocol Overload",
        9.6,
        "Resistance Bands",
        "Stand on dual heavy bands with loop across traps. Execute the strict 1.5 repetition protocol: hinge to horizontal, rise halfway against heavy band tension, hinge back to horizontal, then drive to upright lockout."
    ),
    (
        "Nordic Hamstring Curl 1.5 Extreme Mid-Range Cycle",
        10.0,
        "Bodyweight",
        "Kneel with anchored heels. Execute the strict 1.5 repetition protocol: lower to 45 degrees, rise 15 degrees, lower back to 45 degrees, then hold statically for 10 seconds of unyielding hamstring tendon tension."
    ),
    (
        "Single-Leg Elevated Hamstring Bridge 1.5 Pulse Cycle",
        9.8,
        "Bodyweight",
        "Place heel on 16-inch chair. Execute the strict 1.5 repetition protocol: elevate hips to full extension, lower 2 inches, pulse back into peak height, then hold for 10 seconds before lowering."
    ),
    (
        "Heavy Backpack Cossack Hinge 1.5 Bottom Pulse",
        9.7,
        "Backpack-weighted",
        "In a wide stance with a 18 kg backpack, execute the strict 1.5 repetition protocol: descend into deep lateral hinge, rise halfway, sink back into deep tensile stretch, then drive to center."
    ),

    # --- ELITE HOME: HYPER-LEVER UPPER TENDONS & AXIAL BMD (10) ---
    (
        "Heavy Backpack Single-Arm Biceps Lowering 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Curl a 15 kg backpack to chest. Remove assisting hand. Execute the strict 1.5 repetition protocol: lower working arm over 4 seconds to 90 degrees, curl upward halfway, lower back to 90 degrees, then control the full descent to straight arm."
    ),
    (
        "Dip Station Bodyweight 1.5 Repetition Protocol Lock",
        9.8,
        "Bodyweight",
        "Support yourself on parallel dip bars. Execute the strict 1.5 repetition protocol: lower to 90 degrees elbow flexion over 3 seconds, press upward halfway, sink back to 90 degrees under heavy triceps tendon load, then press to full lockout."
    ),
    (
        "Overhead Heavy Backpack Triceps Extension 1.5 Protocol",
        9.6,
        "Backpack-weighted",
        "Hold a 15 kg backpack overhead with elbows bent at 90 degrees. Execute the strict 1.5 repetition protocol: lower deep behind head, press upward halfway, lower back to deep stretch, then extend overhead to lockout."
    ),
    (
        "Heavy Backpack Side-Lying External Rotation 1.5 Protocol",
        9.6,
        "Backpack-weighted",
        "Lie on side holding a 6 kg backpack. Execute the strict 1.5 repetition protocol: rotate forearm upward to ceiling, lower halfway, pulse back to peak external rotation, then lower over 4 seconds."
    ),
    (
        "Table-Supported Heavy Wrist Extensor 1.5 Protocol",
        9.5,
        "Backpack-weighted",
        "Rest forearm flat with palm down holding a 10 kg backpack. Execute the strict 1.5 repetition protocol: extend wrist to peak, lower halfway, pulse back to full extension, then lower through complete 5-second eccentric descent."
    ),
    (
        "Heavy Backpack Farmer Walk 1.5 Deceleration Carry 45 kg",
        9.9,
        "Backpack-weighted",
        "Carry two backpacks loaded to 45 kg total. Execute the strict 1.5 repetition protocol: walk 20 steps, execute a controlled quarter-squat dip, rise halfway, dip back into the hold, then continue walking for 45 seconds to deliver massive axial compressive strain to the skeleton."
    ),
    (
        "18-Inch Box Depth Drop 1.5 Stiff Athletic Deceleration",
        9.8,
        "Bodyweight",
        "Step off an 18-inch sturdy platform. Execute the strict 1.5 repetition protocol: land flat-footed with stiff ankles and knees absorbing 5x bodyweight impact, pulse upward 2 inches, freeze back into the landing stick for 3 seconds across 10 repetitions."
    ),
    (
        "Heavy Backpack Single-Arm Suitcase Carry 1.5 Left 24 kg",
        9.7,
        "Backpack-weighted",
        "Carry a 24 kg backpack in left hand. Execute the strict 1.5 repetition protocol: walk 15 steps with vertical posture, pause for a 2-inch side-hinge pulse under heavy asymmetric load, and continue walking for 45 seconds."
    ),
    (
        "Heavy Backpack Single-Arm Suitcase Carry 1.5 Right 24 kg",
        9.7,
        "Backpack-weighted",
        "Carry the 24 kg backpack in right hand. Execute the strict 1.5 repetition protocol: walk 15 steps with level shoulders, execute a brief asymmetric dip and pulse, and continue for 45 seconds to stimulate right femoral neck mineralization."
    ),
    (
        "Heavy Backpack Quarter-Squat Axial Lock 1.5 35 kg",
        9.9,
        "Backpack-weighted",
        "Wear a 35 kg backpack in a 30-degree quarter-squat. Execute the strict 1.5 repetition protocol: hold static squat, pulse upward 1 inch, sink back into deep quarter-squat alignment, and hold statically for 45 seconds."
    ),
]

elite_gym_data = [
    # --- ELITE GYM: HEAVY RACK PULLS, PIN PRESSES & CHAIN RESISTANCE (18) ---
    (
        "Ultra-Heavy Pin Holds 1.5",
        10.0,
        "Barbell",
        "Set safety pins in a power rack at mid-thigh height. Load an Olympic barbell with 120% 1RM. Execute the strict 1.5 repetition protocol: pull the bar 2 inches off the pins into full upright lockout, lower 1 inch under immense axial compression, re-lock to top, then hold statically for 10 seconds before lowering to pins."
    ),
    (
        "Hyper-Advanced Long-Lever Tendon Loading Hold 1.5",
        10.0,
        "Barbell",
        "Set safety pins at knee height. Grip barbell loaded with near-maximal weight in a Romanian deadlift position. Execute the strict 1.5 repetition protocol: hinge to pin level, rise 2 inches, sink back into deep tendon stretch, and hold an unyielding static-active hold for 20 seconds under massive tension."
    ),
    (
        "Barbell Rack Pull Above Knee 1.5 Repetition Protocol",
        9.9,
        "Barbell",
        "Load barbell with 85% 1RM on rack pins above knee. Execute the strict 1.5 repetition protocol: pull to full standing lockout, lower halfway to pins over 3 seconds, drive back to full lockout, then lower under a punishing 4-second eccentric descent."
    ),
    (
        "Heavy Barbell Isometric Pin Press at Eye Level 1.5",
        9.8,
        "Barbell",
        "Set pins at eye level. Press bar upward into immovable pins. Execute the strict 1.5 repetition protocol: drive into pins with 100% maximal effort for 6 seconds, reduce effort to 50%, surge back to 100% maximal voluntary torque for 6 seconds, then disengage."
    ),
    (
        "Trap Bar Heavy Farmer Walk 1.5 Deceleration Carry",
        10.0,
        "Barbell",
        "Load trap bar with 150% bodyweight. Execute the strict 1.5 repetition protocol: walk forward for 30 seconds, execute a controlled quarter-squat dip and pulse, rise back up, and walk for another 15 seconds to maximize skeletal osteogenic load."
    ),
    (
        "Leg Press Machine Heavy Slow Resistance 1.5 Protocol",
        9.9,
        "Machine",
        "Load leg press with 85% 1RM. Execute the strict 1.5 repetition protocol: lower sled over 4 seconds to 90 degrees, press upward halfway, lower back to 90 degrees under massive patellar tendon load, then press to top."
    ),
    (
        "Barbell Heavy Romanian Deadlift 1.5 Protocol Overload",
        9.9,
        "Barbell",
        "Load barbell with 80% 1RM. Execute the strict 1.5 repetition protocol: hinge hips back over 4 seconds to mid-shin, rise halfway to knees, hinge back down into deep hamstring stretch, then drive through glutes to lock out."
    ),
    (
        "Standing Calf Raise Machine Heavy 1.5 Protocol Deficit",
        9.8,
        "Machine",
        "Load standing calf machine near maximum stack. Execute the strict 1.5 repetition protocol: rise to peak height, lower halfway into deficit, pulse back to apex squeeze, then lower into deep 2-inch deficit over 5 seconds."
    ),
    (
        "Seated Calf Raise Machine Heavy 1.5 Protocol Overload",
        9.7,
        "Machine",
        "Load seated calf machine with heavy plates. Execute the strict 1.5 repetition protocol: rise to full plantarflexion, lower halfway, pulse back to peak soleus contraction, then lower through complete 5-second eccentric deficit."
    ),
    (
        "Barbell Pin Squat at 90 Degrees 1.5 Protocol From Dead Stop",
        9.9,
        "Barbell",
        "Set rack pins at parallel. Execute the strict 1.5 repetition protocol: drive bar off pins to full standing lockout, lower halfway over 3 seconds, drive back to top, then lower onto pins to rest for 2 seconds."
    ),
    (
        "Barbell Zercher Carry 1.5 Protocol Stance Lock",
        9.9,
        "Barbell",
        "Cradle heavy barbell in the crooks of elbows. Execute the strict 1.5 repetition protocol: walk 30 feet, stop and hold a static quarter-squat dip and pulse for 10 seconds under continuous axial and anterior compression, then walk back to rack."
    ),
    (
        "Incline Dumbbell Preacher Curl 1.5 Protocol Eccentric",
        9.8,
        "Dumbbells",
        "Rest arm on preacher bench with heavy dumbbell. Execute the strict 1.5 repetition protocol: curl to top, lower halfway to 90 degrees, curl back to apex, then lower through a punishing 6-second eccentric descent to straight arm."
    ),
    (
        "EZ-Bar Overhead Triceps Extension 1.5 Protocol",
        9.7,
        "EZ-Bar",
        "Hold heavy EZ-bar overhead. Execute the strict 1.5 repetition protocol: lower bar deep behind head, press upward halfway, lower back to deep stretch, then extend overhead to full lockout."
    ),
    (
        "Heavy Barbell Shrug With 1.5 Protocol Peak Pulse",
        9.8,
        "Barbell",
        "Hold heavy barbell at mid-thigh. Execute the strict 1.5 repetition protocol: shrug shoulders upward to ears, lower halfway, pulse back into peak trapezius contraction, then lower over 4 seconds."
    ),
    (
        "Barbell Overhead Lockout 1.5 Static-Active Walk",
        9.9,
        "Barbell",
        "Press near-bodyweight barbell overhead. Execute the strict 1.5 repetition protocol: walk with locked elbows for 25 seconds, pause and execute a 2-second quarter-squat dip and pulse, return to tall stance, and hold for 10 seconds to maximize spinal bone density."
    ),
    (
        "Leg Extension Machine Heavy Slow Resistance 1.5 Protocol",
        9.8,
        "Machine",
        "Select 85% 1RM on leg extension. Execute the strict 1.5 repetition protocol: extend legs to full lockout over 3 seconds, lower halfway to 45 degrees, pulse back to peak extension, then lower through 4-second eccentric descent."
    ),
    (
        "Seated Leg Curl Machine Heavy Slow Resistance 1.5 Protocol",
        9.8,
        "Machine",
        "Execute the strict 1.5 repetition protocol on seated leg curl: curl pad to glutes over 2 seconds, release halfway, curl back into peak contraction, then lower through complete 4-second eccentric tempo."
    ),
    (
        "Barbell Front Squat 1.5 Protocol Parallel Pause",
        10.0,
        "Barbell",
        "Clean grip barbell front squat with 80% 1RM. Execute the strict 1.5 repetition protocol: descend to parallel over 4 seconds, drive upward halfway, sink back to parallel under massive patellar tendon load, then drive to full standing lockout."
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
