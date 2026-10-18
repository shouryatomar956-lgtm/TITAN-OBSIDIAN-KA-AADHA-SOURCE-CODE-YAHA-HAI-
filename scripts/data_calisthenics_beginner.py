#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 12: CALISTHENICS - BEGINNER TIER (Total: 66 Exercises)
# 46 Home (70%) + 20 Gym (30%)
# Validated Foundational Relative Strength, Scapular Control, Kinetic Alignment
# Scientific Score Bounds: 4.0 to 6.0
# Equipment: Bodyweight, None, Resistance Bands
# ==============================================================================

beg_home_data = [
    # --- Horizontal Pulling & Doorway Incline Mechanics (Home) ---
    (
        "Doorway Frame Australian Incline Pull-Up",
        5.2,
        "Bodyweight",
        "Grip the sturdy vertical trim of a doorway at chest height with feet stepped forward at a 45-degree angle. Pull chest smoothly toward frame by retracting and depressing scapulae, lowering under a strict 3-second eccentric tempo."
    ),
    (
        "Low Table Under-Grip Incline Bodyweight Row",
        5.4,
        "Bodyweight",
        "Lie underneath a stable dining table, grasp outer edge with supinated grip, heels on floor, and body in rigid alignment. Pull sternum toward underside of table, keeping glutes squeezed and cervical spine neutral."
    ),
    (
        "Suspended Sheet Door-Anchor Incline Row",
        5.1,
        "Bodyweight",
        "Tie a knot in a sturdy bedsheet and anchor it over the top of a closed door. Lean back holding sheet ends, and row chest toward door with elbows tracking at 45 degrees to build horizontal pulling stamina."
    ),
    (
        "Doorway Bar Assisted Passive to Active Hang",
        4.8,
        "Bodyweight",
        "Hang from a doorway pull-up bar with toes lightly touching floor for assistance. Alternate between relaxing into a passive stretch and actively depressing scapulae down away from ears without bending elbows."
    ),
    (
        "Doorway Pull-Up Bar Flexed-Arm Isometric Hold (Toes Assisted)",
        5.5,
        "Bodyweight",
        "Step on a stool to bring chin over doorway bar. Hold top position with chest touching bar while lightly skimming toes on support, contracting lats and biceps for 10-15 seconds."
    ),
    (
        "Doorway Bar Slow Eccentric Chin-Up Negative (5 Seconds)",
        5.7,
        "Bodyweight",
        "Jump or step to chin-over-bar position with supinated underhand grip. Lower body over 5 slow controlled seconds until arms are fully extended, stepping back onto stool to reset."
    ),

    # --- Incline Pushing & Floor Bodyweight Pressing (Home) ---
    (
        "Kitchen Counter 45-Degree Incline Push-Up",
        4.7,
        "Bodyweight",
        "Place hands shoulder-width on edge of kitchen counter with feet stepped back. Lower sternum to edge with elbows tucked at 45 degrees, pressing away through full protraction to develop pressing motor patterns."
    ),
    (
        "Sofa Edge Hands-Elevated Incline Push-Up",
        5.0,
        "Bodyweight",
        "Support hands on firm sofa seat or coffee table in straight-arm plank. Descend until chest grazes cushion, maintaining tight glute and abdominal engagement to prevent lumbar sagging."
    ),
    (
        "Knee-Supported Floor Push-Up with Hollow Core",
        5.1,
        "Bodyweight",
        "Support weight on knees and hands with pelvis tucked in posterior pelvic tilt. Lower chest to floor and press up to straight arms, building anterior chest and serratus strength."
    ),
    (
        "Floor Push-Up Slow Eccentric Lowering Negative (3s)",
        5.3,
        "Bodyweight",
        "From full straight-leg plank, lower chest to floor across 3 strict seconds with rigid body tension, drop knees to push back up, and reset into full plank."
    ),
    (
        "Household Chair Edge Seated Triceps Dip",
        4.9,
        "Bodyweight",
        "Sit on edge of sturdy chair with hands gripping front edge beside hips and knees bent at 90 degrees. Lower hips vertically by bending elbows to 90 degrees, pressing through palms to lockout."
    ),
    (
        "Floor Straight-Arm Scapular Push-Up (Protraction Drill)",
        4.6,
        "Bodyweight",
        "From push-up plank, keep elbows locked completely straight. Retract shoulder blades together, then actively push floor away into maximum protraction to strengthen serratus anterior."
    ),
    (
        "Wall-Supported Incline Pike Shoulder Press",
        5.3,
        "Bodyweight",
        "Place hands shoulder-width on wall, step feet back, and hinge at hips into an inverted-V. Lower forehead toward wall between hands, pressing back through palms to condition overhead vertical pushing."
    ),

    # --- Core Compression, Gymnastics Shapes & Static Holds (Home) ---
    (
        "Floor Bent-Knee Hollow Body Tucked Hold",
        5.2,
        "Bodyweight",
        "Lie on back, press lumbar spine flat against mat, tuck knees to chest, and lift head and shoulder blades off floor with arms reaching forward. Hold for 20-30 seconds of pure anterior core compression."
    ),
    (
        "Single-Leg Extended Hollow Body Rocker Hold",
        5.4,
        "Bodyweight",
        "In hollow position, keep one knee tucked to chest while extending opposite leg straight forward 6 inches off mat. Hold for 15 seconds per side, ensuring lower back never loses contact with floor."
    ),
    (
        "Prone Floor Gymnastics Arch Body Super-Hold",
        4.8,
        "Bodyweight",
        "Lie face down with arms extended overhead. Squeeze glutes and mid-back to lift chest, thighs, and arms 3 inches off mat, holding reverse hollow shape for 20 seconds."
    ),
    (
        "Floor Dead Bug Alternating Contralateral Reach",
        4.5,
        "Bodyweight",
        "Lie on back with knees bent 90 degrees and arms vertical. Slowly extend right arm overhead and left leg forward while maintaining glued lumbar contact to floor, alternating smoothly."
    ),
    (
        "Floor Straight-Arm Plank with Maximum Hollow Protraction",
        5.0,
        "Bodyweight",
        "Hold top push-up position with toes tucked and hands under shoulders. Actively dome upper back toward ceiling, tuck tailbone, and brace abs as if bracing for a punch."
    ),
    (
        "Floor Elbow Forearm Plank with Posterior Pelvic Tilt",
        4.9,
        "Bodyweight",
        "Rest on forearms and toes with elbows under shoulders. Pull elbows isometrically toward toes to generate intense intra-abdominal pressure while maintaining neutral neck."
    ),
    (
        "Household Floor Glute Bridge Two-Leg Hold",
        4.3,
        "Bodyweight",
        "Lie on back with knees bent and feet flat. Drive heels into floor to elevate hips until thighs align with torso, holding peak gluteal contraction for 30 seconds."
    ),

    # --- Floor Parallette & Support Progressions (Home) ---
    (
        "Parallel Floor Parallettes Straight-Arm Support Hold (Feet Down)",
        5.3,
        "Bodyweight",
        "Grip floor parallettes or sturdy push-up handles. Press downward with locked elbows and depressed shoulders while feet rest lightly on floor, building straight-arm support tolerance."
    ),
    (
        "Floor Parallettes Tucked Knees Support Lift (Toe Tap)",
        5.6,
        "Bodyweight",
        "Sit between parallettes with straight arms locked out. Press shoulders down to lift hips off floor, tucking knees slightly with toes barely touching mat."
    ),
    (
        "Floor Seated L-Sit Progression (Heels on Mat)",
        5.4,
        "Bodyweight",
        "Sit on floor with legs straight out. Place hands flat beside hips, depress shoulders to lift hips off floor while heels remain lightly on mat, contracting triceps and hip flexors."
    ),
    (
        "Doorway Standing Isometric Chest Expander Pull",
        4.4,
        "None",
        "Stand in doorway, place backs of hands against inner doorframe at shoulder height, and press outward into frame for 10-second isometric posterior chain activations."
    ),
    (
        "Wall-Supported Downward Dog to Plank Calisthenic Flow",
        4.7,
        "Bodyweight",
        "Transition smoothly between downward dog with hands on wall or floor and high plank, practicing scapular depression in overhead reach and protraction in plank."
    ),

    # --- Lower Body Calisthenic Squat & Hinge Mechanics (Home) ---
    (
        "Doorframe Supported Full-Depth Assisted Pistol Squat",
        5.6,
        "Bodyweight",
        "Grip doorframe lightly with both hands at waist level. Extend right leg forward and descend into full single-leg squat on left leg, using hands only for balance assistance."
    ),
    (
        "Doorframe Supported Full-Depth Assisted Pistol Squat (Right Lead)",
        5.6,
        "Bodyweight",
        "Grip doorframe, extend left leg forward, and descend on right leg until hamstring touches calf. Drive through right heel to stand, building unilateral leg strength."
    ),
    (
        "Bodyweight Box Squat to Chair with Controlled Pause",
        4.8,
        "Bodyweight",
        "Stand with feet shoulder-width in front of chair. Hinge hips back, sit lightly on chair without losing spinal tension, pause 1 second, and drive up through midfoot."
    ),
    (
        "Standing Alternating Bodyweight Step-Back Lunge",
        4.9,
        "Bodyweight",
        "Step backward smoothly into a 90/90 split lunge until rear knee hovers 1 inch off floor. Drive through front heel to return, alternating legs with tall posture."
    ),
    (
        "Bodyweight Curtsy Lunge with Scapular Retraction",
        5.0,
        "Bodyweight",
        "Step left leg diagonally behind right into a curtsy lunge while keeping chest proud and shoulder blades squeezed, training frontal-plane stability and glute medius."
    ),
    (
        "Standing Single-Leg Romanian Deadlift (Wall Assisted)",
        5.1,
        "Bodyweight",
        "Lightly touch fingertip to wall for balance. Hinge forward on standing leg while extending opposite leg straight back in line with torso, feeling hamstring tension."
    ),
    (
        "Floor Copenhagen Side Plank (Knee Supported on Couch)",
        5.5,
        "Bodyweight",
        "Place inside of top knee on sofa edge and bottom knee on floor in side plank. Elevate hips to align body in straight line, conditioning adductor and lateral core."
    ),
    (
        "Standing Wall-Facing Calf Raise with 2-Second Top Pause",
        4.4,
        "Bodyweight",
        "Place hands lightly against wall, elevate onto balls of both feet, squeeze gastrocnemius at apex for 2 seconds, and lower under 3-second eccentric tempo."
    ),
    (
        "Floor Tibialis Anterior Dorsiflexion Wall Lean",
        4.6,
        "Bodyweight",
        "Lean back against wall with heels 1 foot out. Flex toes and forefeet upward toward shins, conditioning tibialis anterior for lower-limb impact absorption."
    ),
    (
        "Prone Floor Reverse Hyperextension on Bed Edge",
        5.2,
        "Bodyweight",
        "Lie face down with hips on edge of firm bed and hands gripping mattress. Squeeze glutes to lift straight legs to horizontal, holding peak contraction for 2 seconds."
    ),

    # --- Calisthenic Gymnastic Mobility & Positional Control (Home) ---
    (
        "Seated Straddle Pancake Fold Active Reach",
        4.7,
        "Bodyweight",
        "Sit on floor with legs in wide 'V' straddle. Hinge at hips with flat back, reaching hands forward across floor to develop adductor and hamstring mobility for future straddle skills."
    ),
    (
        "Floor Pike Compression Leg Lifts (Hands beside Knees)",
        5.3,
        "Bodyweight",
        "Sit with legs straight together. Place hands beside knees, lean forward slightly, and lift heels 2 inches off mat in small rhythmic pulses using hip flexors."
    ),
    (
        "Seated Straddle Leg Lifts (Hands between Thighs)",
        5.4,
        "Bodyweight",
        "In wide straddle, place fingertips on floor between thighs. Lift both legs simultaneously 2 inches off floor without leaning back, developing active compression strength."
    ),
    (
        "Floor Crab Bridge Shoulder Extension Stretch",
        4.5,
        "Bodyweight",
        "Sit with hands behind hips, fingers pointing backward. Lift hips until thighs and torso align, opening anterior deltoids and chest in active shoulder extension."
    ),
    (
        "Quadruped Bear Plank Hold with Neutral Spine",
        4.9,
        "Bodyweight",
        "In tabletop on hands and toes, lift knees 2 inches off mat. Hold stationary with flat back, bracing core and pushing floor away through straight arms for 30 seconds."
    ),
    (
        "Floor Cat-Cow Scapular Articulation Flow",
        4.1,
        "None",
        "On hands and knees, smoothly alternate between maximum spinal flexion with protracted shoulders (cat) and extension with retracted shoulders (cow) to mobilize spine."
    ),
    (
        "Resistance Band Assisted Australian Incline Row",
        4.8,
        "Resistance Bands",
        "Anchor band around doorway pull-up bar, grasp handles, lean back at 45 degrees, and row chest toward bar with band assisting bodyweight resistance."
    ),
    (
        "Resistance Band Underfoot Overhead Lat Stretch",
        4.3,
        "Resistance Bands",
        "Step on band, loop opposite end over elbow, and elevate elbow toward ceiling, opening latissimus dorsi and triceps for overhead shoulder flexion."
    ),
    (
        "Wall Handstand Walk-Up (Partial 45-Degree Incline Hold)",
        5.5,
        "Bodyweight",
        "From push-up plank, walk feet 3 paces up wall into shallow incline handstand. Hold for 15 seconds, pushing shoulders into active elevation."
    ),
    (
        "Doorway Bar Knee-Tuck Hanging Hold (Toes Glancing)",
        5.3,
        "Bodyweight",
        "Hang from doorway bar with arms straight. Tuck knees to 90 degrees while keeping toes lightly touching floor, training hanging grip and lower abdominal engagement."
    ),
    (
        "Floor Side-Plank on Forearm with Hip Tap Flow",
        5.1,
        "Bodyweight",
        "In forearm side plank, dip bottom hip gently to graze mat and elevate back to straight line, repeating for 10 controlled reps per side."
    ),
]

beg_gym_data = [
    # --- Institutional Wall Bars, Calisthenics Rigs & Gym Stations (Gym) ---
    (
        "Calisthenics Rig Low-Bar Australian Pull-Up (Waist Height)",
        5.4,
        "Bodyweight",
        "Set barbell or rig bar at waist height. Hang underneath with straight body and heels on floor. Pull chest to touch bar with pinched shoulder blades, lowering slowly."
    ),
    (
        "Gymnastics Wall Bars (Stall Bars) Active Scapular Hang",
        5.1,
        "Bodyweight",
        "Hang from top rung of stall bars with back flat against wooden rungs. Alternate between passive dead hang and active scapular depression, keeping spine in contact with bars."
    ),
    (
        "Stall Bars Tucked Knee Raise to 90 Degrees",
        5.5,
        "Bodyweight",
        "Hang from top rung of wall bars with spine pressed flat. Smoothly flex hips and knees to bring thighs parallel to floor, pausing 1 second before lowering under control."
    ),
    (
        "Parallel Bars Straight-Arm Support Hold (Gym Station)",
        5.6,
        "Bodyweight",
        "Jump onto parallel bars with arms locked straight. Push shoulders down forcefully (depression), keep eyes forward, and hold rigid upright posture for 15-20 seconds."
    ),
    (
        "Parallel Bars Tucked Knee Hold in Support",
        5.8,
        "Bodyweight",
        "Hold straight-arm support on parallel bars, tuck both knees up toward chest, and hold isometrically for 10-15 seconds without letting shoulders shrug."
    ),
    (
        "Parallel Bars Negative Dip Lowering (5 Seconds)",
        5.7,
        "Bodyweight",
        "Step to top of parallel bars with arms straight. Lower body slowly over 5 seconds until shoulders reach 90 degrees, step onto foot pegs, and reset at top."
    ),
    (
        "Gymnastics Rings Low-Height Incline Bodyweight Row",
        5.5,
        "Bodyweight",
        "Set gymnastics rings at chest height. Lean back at 45 degrees holding rings with neutral grip. Row rings to chest, rotating wrists naturally to supinated grip at top."
    ),
    (
        "Gymnastics Rings Incline Push-Up (Chest Height)",
        5.4,
        "Bodyweight",
        "Grip rings set at hip height, lean forward into 45-degree angle. Lower chest between rings, pressing up while turning rings out slightly (RTO) to challenge stability."
    ),
    (
        "Calisthenics Rig High-Bar Dead Hang for Grip Endurance",
        4.8,
        "Bodyweight",
        "Grip institutional pull-up bar with overhand grip and hang passively for 30-45 seconds, stretching latissimus dorsi and conditioning fingertip flexor tendons."
    ),
    (
        "Rig Bar Assisted Chin-Up with Foot on High Box",
        5.3,
        "Bodyweight",
        "Place one foot on an elevated box under bar. Pull chin over bar with supinated grip, using supporting leg only as needed to assist through sticking point."
    ),
    (
        "Institutional Stall Bars Incline Plank Support",
        4.9,
        "Bodyweight",
        "Place hands on stall bar rung at waist level with feet on floor. Hold hollow plank shape with straight arms, practicing rib-to-pelvis compression."
    ),
    (
        "Low Parallettes Straight-Arm Push-Up to Pike Transition",
        5.2,
        "Bodyweight",
        "Grip gym parallettes on floor. Perform a clean push-up, press to top, push hips into a pike, and return to plank in smooth continuous flow."
    ),
    (
        "Calisthenics Rig Box-Assisted Dip Progression",
        5.5,
        "Bodyweight",
        "Place toes on box behind parallel bars. Descend into 90-degree dip depth, pressing through palms with minimal leg assistance to build tricep and chest strength."
    ),
    (
        "Stall Bars Hanging Single-Leg Knee Raise",
        5.2,
        "Bodyweight",
        "Hang from stall bars and raise one knee to chest while opposite leg hangs straight, alternating sides to isolate individual hip flexors and lower core."
    ),
    (
        "Gymnastics Low Rings Plank Hold (Feet on Floor)",
        5.6,
        "Bodyweight",
        "Place hands in rings 6 inches off floor in straight-arm plank. Stabilize against ring wobble for 20 seconds, training deep glenohumeral stabilizers."
    ),
    (
        "Parallel Bars Scapular Dip Shrugs (Straight Arms)",
        5.3,
        "Bodyweight",
        "In straight-arm support on parallel bars without bending elbows, allow shoulders to elevate toward ears, then press forcefully downward to lift body."
    ),
    (
        "Stall Bars Standing Calf Raise Deficit on Bottom Rung",
        4.7,
        "Bodyweight",
        "Stand with balls of feet on bottom rung of stall bars, heels dropping into deficit. Elevate onto toes to full height, holding peak contraction for 2 seconds."
    ),
    (
        "Calisthenics Rig Neutral-Grip Incline Australian Row",
        5.3,
        "Bodyweight",
        "Grip parallel neutral bars at waist height on rig. Row sternum to handles with flat spine, building mid-back thickness and scapular retraction control."
    ),
    (
        "Stall Bars Hanging Straddle Knee Tuck",
        5.4,
        "Bodyweight",
        "Hang from stall bars, spread legs slightly in a straddle, and lift knees outward toward armpits, building lateral abdominal and hip flexor strength."
    ),
    (
        "Calisthenics Rig High-Bar Scapular Pull-Up Waves",
        5.6,
        "Bodyweight",
        "Hang from straight bar with overhand grip. Pull shoulder blades down and back to lift chest 3 inches without bending elbows, cycling 8 clean reps."
    ),
]

if __name__ == "__main__":
    print(f"Beginner Home: {len(beg_home_data)}")
    print(f"Beginner Gym: {len(beg_gym_data)}")
    print(f"Beginner Total: {len(beg_home_data) + len(beg_gym_data)}")
    for name, score, eq, inst in beg_home_data + beg_gym_data:
        assert 4.0 <= score <= 6.0, f"Score {score} out of bounds for {name}"
        assert "1.5" not in inst and "1.5" not in name, f"1.5 protocol found in {name}"
    print("All beginner scores within 4.0 - 6.0 range and no 1.5 protocol!")
