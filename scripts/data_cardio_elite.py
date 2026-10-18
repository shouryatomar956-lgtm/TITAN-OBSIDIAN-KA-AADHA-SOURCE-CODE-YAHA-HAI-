#!/usr/bin/env python3

# ==============================================================================
# DOMAIN 9: CARDIO - ELITE TIER (Total: 45 Exercises)
# 31 Home (70%) + 14 Gym (30%)
# Validated Peak Human Performance, Hyper-Advanced Levers, Severe Mechanical Disadvantage
# Strict 1.5 Repetition Protocol & Hyper-Advanced Static-Active Holds Exclusively
# Scientific Score Bounds: 9.3 to 10.0
# Equipment: Backpack-weighted, Bodyweight, Resistance Bands, Machine, Barbell, Dumbbells
# ==============================================================================

elite_home_data = [
    # --- Hyper-Advanced Calisthenic & Backpack-Weighted 1.5 Cardio Protocols (Home) ---
    (
        "Weighted Backpack Chest-to-Floor Burpee 1.5 Repetition Protocol",
        9.7,
        "Backpack-weighted",
        "Strapped with a 45 lb heavy backpack, drop chest to floor, explode upward into full extension, immediately re-descend halfway into a parallel squat hold, pop up again with a 50% half-range pulse under continuous time-under-tension (1.5 repetition protocol), and launch 6 inches vertically before repeating."
    ),
    (
        "Weighted Backpack Rucking Sprints 1.5 Pacing Intervals",
        9.6,
        "Backpack-weighted",
        "With a 50 lb backpack strapped tight, sprint forward 30 yards at maximal sprint cadence, decelerate into a deep forward lunge, perform a mandatory 1.5 repetition half-range pulse contraction under continuous tension, and explosively accelerate into the next sprint burst."
    ),
    (
        "Weighted Backpack Jump Squat 1.5 Continuous Dynamic Protocol",
        9.8,
        "Backpack-weighted",
        "Wear a 40 lb backpack. Descend to full bottom squat, explode to standing, immediately drop to parallel for a strict half-rep bounce pulse (1.5 repetition protocol) maintaining continuous quad tension, and launch explosively into the air."
    ),
    (
        "Hyper-Advanced High-Intensity Static-Active Cardio Endurance Hold (45 lb Pack)",
        9.9,
        "Backpack-weighted",
        "Wear a 45 lb weighted backpack. Sprint 20 high-knee strides at maximum turnover, drop immediately into an isometric parallel wall-sit hold under continuous axial loading for 15 seconds without resting, and repeat with strict 1.5 repetition protocol pulse cycles for 5 continuous minutes."
    ),
    (
        "Weighted Backpack Plyometric Split Lunge 1.5 Repetition Circuit",
        9.6,
        "Backpack-weighted",
        "Wear a 35 lb backpack. Drop into full split lunge, drive to top, lower halfway for a mandatory 1.5 half-range pulse under continuous muscular tension, and explode into an air-switch lunge to mirror on opposite leg."
    ),
    (
        "Weighted Backpack Mountain Climber Piston 1.5 Pause Protocol",
        9.5,
        "Backpack-weighted",
        "Under 40 lb backpack load in push-up plank, drive right knee to chest, return halfway, pulse back to chest for a strict 1.5 repetition contraction under continuous core load, switch to left leg, and sustain maximum-cadence intervals."
    ),
    (
        "Double-Under Jump Rope to Weighted Backpack Burpee 1.5 Blitz",
        9.7,
        "Backpack-weighted",
        "Perform 30 unbroken double-unders, drop rope, immediately execute 5 weighted burpees with a 35 lb backpack utilizing the strict 1.5 repetition protocol (full chest-to-floor pop plus 50% squat jump pulse), cycling for 5 grueling rounds."
    ),
    (
        "Weighted Backpack Bear Crawl Shuttle 1.5 Isometric Lock Flow",
        9.4,
        "Backpack-weighted",
        "Bear crawl 10 yards with 45 lb backpack, drop knees to 1 inch above floor into a hyper-advanced static-active isometric hover hold for 10 seconds under continuous tension, perform 2 burpees with 1.5 pulse reps, and crawl back."
    ),
    (
        "Weighted Backpack Incline Stair Sprint 1.5 Step Protocol",
        9.8,
        "Backpack-weighted",
        "Sprint up household stairs with a 45 lb backpack taking two steps at a time. At top landing, drop into a single-leg squat, execute a strict 1.5 repetition pulse, and walk down under active recovery before immediately re-sprinting."
    ),
    (
        "Single-Leg Plyometric Burpee 1.5 Pulse Repetition Challenge",
        9.6,
        "Bodyweight",
        "Balancing on one leg throughout, drop to floor for single-leg burpee, hop to feet, sink into single-leg pistol squat, perform a mandatory 1.5 half-range contraction pulse, and launch into a vertical hop before switching legs."
    ),
    (
        "Doorframe Pull-Up to Chest-to-Floor Burpee 1.5 Fusion",
        9.8,
        "Bodyweight",
        "Execute a full chest-to-floor burpee, jump to doorframe bar, perform a strict chest-to-bar pull-up followed by a mandatory half-rep lower and pulse up (1.5 repetition protocol) under continuous lat tension, drop, and repeat."
    ),
    (
        "Weighted Backpack Sprawl to Broad Jump 1.5 Cycle",
        9.5,
        "Backpack-weighted",
        "Wear a 35 lb backpack. Plunge into a combat sprawl, pop up, launch into a 6-foot broad jump, absorb into deep squat, execute a 1.5 repetition pulse at parallel, and backpedal rapidly to repeat."
    ),
    (
        "Weighted Backpack Tuck Jump 1.5 High-Intensity Intervals",
        9.7,
        "Backpack-weighted",
        "Strap 30 lb backpack. Drop into squat, explode into maximal vertical tuck jump, land softly, immediately drop halfway for a 1.5 repetition pulse under high tension, and launch again in unbroken Tabata sequences."
    ),
    (
        "Hyper-Advanced Isometric L-Sit to Burpee 1.5 Metabolic Shuttles",
        9.9,
        "Bodyweight",
        "Hold a strict floor L-sit for 10 seconds under continuous abdominal tension, flip immediately into push-up plank, perform 3 chest-to-floor burpees utilizing the 1.5 repetition protocol (full jump plus 50% squat pulse), and return to L-sit."
    ),
    (
        "Weighted Backpack Lateral Skater Bound 1.5 Stick Intervals",
        9.4,
        "Backpack-weighted",
        "Leap laterally 6 feet across room under a 30 lb backpack load. Land on outside foot, descend into single-leg squat, complete a strict 1.5 half-range pulse against centrifugal inertia, and bound explosively across to other side."
    ),
    (
        "Weighted Backpack 50 lb Rucking Stair Ascents 1.5 Hold Protocol",
        9.8,
        "Backpack-weighted",
        "Ascend stairs two steps at a time carrying 50 lb pack. Every 4 steps, pause in a single-leg split stance isometric hold for 5 seconds, perform a 1.5 pulse lunge, and resume explosive stair climbing."
    ),
    (
        "Explosive Handstand Push-Up to Burpee 1.5 Repetition Flow",
        9.9,
        "Bodyweight",
        "Kick up against wall for an explosive handstand push-up, kick down, perform a chest-to-floor burpee, pop to feet, execute a 1.5 repetition squat pulse, and kick immediately back into handstand."
    ),
    (
        "Weighted Backpack Alligator Crawl 1.5 Push-Up Shuttle",
        9.6,
        "Backpack-weighted",
        "Wear a 35 lb backpack. Crawl forward 10 feet with chest skimming the mat, perform an explosive push-up followed by a 1.5 repetition half-range lockout pulse, and continue low-profile crawling unbroken."
    ),
    (
        "Weighted Backpack 40 lb Sprawl to Jump Squat 1.5 Combo",
        9.7,
        "Backpack-weighted",
        "Under 40 lb backpack resistance, sprawl flat to mat, snap hips to feet, sink into squat, execute a 1.5 repetition half-range pulse under continuous quad tension, and explode into a vertical leap."
    ),
    (
        "Double Banded Resistance Sprint in Place 1.5 Knee-Drive Blitz",
        9.4,
        "Resistance Bands",
        "Loop two heavy resistance bands around hips anchored behind. Sprint in place at maximum frequency; on every 5th stride, hold an elevated knee-drive isometric contraction, pulse down and up (1.5 protocol), and resume sprint."
    ),
    (
        "Weighted Backpack 45 lb Front-Rack Thruster 1.5 Ladders",
        9.8,
        "Backpack-weighted",
        "Hold 45 lb pack at chest in front-rack. Squat deep, stand, descend halfway for a strict 1.5 repetition pulse, and launch aggressively into an overhead thruster, maintaining unbroken time-under-tension."
    ),
    (
        "Hyper-Advanced Static-Active Plank-to-Burpee 1.5 Burnout",
        9.5,
        "Bodyweight",
        "Hold an extended hollow-body planche lean for 15 seconds, pop feet to hands, execute 2 full burpees with mandatory 1.5 repetition half-range pulses, and return to planche lean for 4 unbroken cycles."
    ),
    (
        "Weighted Backpack 35 lb Broad Jump to 1.5 Squat Rebound",
        9.6,
        "Backpack-weighted",
        "Bound forward 7 feet with a 35 lb backpack, land softly absorbing into deep squat, execute a 1.5 repetition pulse under high kinetic braking force, backpedal 4 steps, and jump again."
    ),
    (
        "Triple-Under Jump Rope to Burpee 1.5 Extreme Sprint Intervals",
        10.0,
        "Bodyweight",
        "Execute 10 unbroken triple-under jump rope turns at maximum velocity, drop rope, perform 3 chest-to-floor burpees utilizing the 1.5 repetition protocol, and repeat for 3 relentless rounds."
    ),
    (
        "Weighted Backpack 40 lb Stair Double-Hop 1.5 Pulse Escalation",
        9.7,
        "Backpack-weighted",
        "Hop up stairs with both feet together under 40 lb pack load. On landing on each step, perform a 1.5 repetition half-squat bounce pulse before launching to next step."
    ),
    (
        "Single-Leg Plyometric Box Jump to Burpee 1.5 Flow",
        9.8,
        "Bodyweight",
        "Jump onto a 24-inch sturdy household platform on one leg, jump down, perform a single-leg burpee with a 1.5 repetition pulse at bottom, and repeat on opposite leg."
    ),
    (
        "Weighted Backpack 45 lb Bear Hug Squat Jump 1.5 Protocol",
        9.7,
        "Backpack-weighted",
        "Bear hug a 45 lb heavy backpack against chest. Squat deep, explode upward, land, immediately drop into parallel half-squat for a mandatory 1.5 repetition pulse, and repeat continuously."
    ),
    (
        "Banded Sprint to Sprawl 1.5 Hyper-Advanced Combat Cycle",
        9.5,
        "Resistance Bands",
        "Sprint against dual anchored heavy bands for 10 seconds, drop forward into a high-resistance sprawl, pop to feet, perform a 1.5 repetition squat pulse, and resume sprint."
    ),
    (
        "Weighted Backpack 50 lb Rucking Lunges 1.5 Deep Pulse Sequence",
        9.8,
        "Backpack-weighted",
        "Wear 50 lb backpack. Lunge forward until rear knee hovers 1 inch, perform a strict 1.5 repetition half-range pulse under extreme axial compression, step through, and alternate legs unbroken."
    ),
    (
        "Prone Hand-Release Burpee to 360 Jump 1.5 Protocol",
        9.6,
        "Bodyweight",
        "Drop into hand-release burpee, push up, pop to feet, descend halfway for a 1.5 repetition pulse, and explode vertically while spinning a full 360-degree rotation in the air."
    ),
    (
        "Weighted Backpack 40 lb Lateral Bound to Burpee 1.5 Fusion",
        9.7,
        "Backpack-weighted",
        "Bound laterally across room with 40 lb pack, absorb landing, drop into a chest-to-floor burpee, pop to feet, execute a 1.5 repetition squat pulse, and leap laterally back."
    ),
]

elite_gym_data = [
    # --- Commercial Ergometers, Sleds & Elite Weight-Loaded Protocols (Gym) ---
    (
        "Assault AirBike 30-Second Maximal Sprint with 1.5 Thruster Brick",
        9.9,
        "Machine",
        "Sprint 30 seconds at absolute maximum cadence on Assault Bike (>85 RPM, >750W), dismount immediately, perform 5 barbell thrusters (115 lbs) utilizing the strict 1.5 repetition protocol (full front squat, 50% pulse, overhead thrust), and rest 60 seconds."
    ),
    (
        "Rowing Ergometer 500m Sub-1:30 Sprint to Barbell Burpee 1.5 Fusion",
        10.0,
        "Machine",
        "Pull 500 meters at sub-1:30/500m pace on rower at 34-36 SPM, immediately complete 5 barbell-facing burpees with a 1.5 repetition pulse on the jump landing, testing extreme aerobic and anaerobic limits."
    ),
    (
        "Concept2 SkiErg 300m Sprint to Heavy Sled Push 1.5 Lockout Blitz",
        9.8,
        "Machine",
        "Sprint 300m on SkiErg at sub-1:38 split pace, run to loaded turf sled (150% bodyweight), drive sled 25 meters, drop into a 15-second static-active squat hold, and complete 3 sled push pulses (1.5 protocol)."
    ),
    (
        "Curved Manual Treadmill 30-Second All-Out Sprint with 1.5 Box Jump Protocol",
        9.9,
        "Machine",
        "Sprint all-out on curved treadmill at >18 mph pace for 30 seconds, transition immediately to a 30-inch plyo box, perform 5 box jumps with a mandatory 1.5 repetition depth-squat pulse on each landing."
    ),
    (
        "Gym Turf Sled Extreme Heavy Sprint (150% Bodyweight) 1.5 Drive Shuttles",
        9.7,
        "Machine",
        "Push sled loaded with 150% bodyweight for 20 meters, immediately drop into an isometric low push hold against uprights for 10 seconds under continuous static-active tension, and perform 5 explosive 1.5 pulse strides."
    ),
    (
        "Barbell Thruster 135 lb (61 kg) Continuous 1.5 Repetition Protocol Cycling",
        9.8,
        "Barbell",
        "Clean 135 lbs to front rack. Descend to full bottom squat, drive to parallel for a strict 1.5 repetition half-rep pulse under continuous quad tension, thrust aggressively overhead, and cycle 10 unbroken reps."
    ),
    (
        "Assault Bike 100-Calorie Time Trial with Interspersed 1.5 Burpees",
        9.9,
        "Machine",
        "Race to complete 100 calories on Assault Bike as fast as possible. Every 25 calories, dismount and execute 3 chest-to-floor burpees with 1.5 repetition squat pulses before remounting instantly."
    ),
    (
        "Rowing Ergometer 2000m Sub-6:45 Pace with 1.5 Power-Drive Strokes",
        9.9,
        "Machine",
        "Maintain sub-1:41/500m split pace across 2000m on Concept2 rower. Every 500m, execute 10 consecutive 1.5 repetition double-drive power strokes under maximum leg drive to shatter lactate limits."
    ),
    (
        "SkiErg to Assault Bike 30-Calorie Maximal Aerobic Brick 1.5 Protocol",
        9.8,
        "Machine",
        "Sprint 30 calories on SkiErg, run to Assault Bike and sprint 30 calories, dismount for a 15-second static-active isometric squat hold, execute 3 jump squats with 1.5 pulse reps, and repeat."
    ),
    (
        "Commercial Stair Climber 50 lb Weighted Vest 1.5 Skip-Step Sprint",
        9.7,
        "Machine",
        "Wear a 50 lb weighted vest on stair climber at maximum speed (Level 16). Skip every other step with explosive knee drive; every 30 seconds perform a 1.5 repetition single-leg pulse step under axial compression."
    ),
    (
        "Dumbbell Man-Maker 40 lb Pairs Continuous 1.5 Protocol Cycling",
        9.8,
        "Dumbbells",
        "Using 40 lb dumbbells, drop into burpee push-up, row left, row right, hop feet forward into squat, perform a 1.5 repetition squat pulse, and clean-thruster overhead in continuous unbroken cycles."
    ),
    (
        "Gym Turf Sled Backward Drag to Forward Push 1.5 Quad Burnout",
        9.7,
        "Machine",
        "Drag heavy sled backward 25 meters with low knee flexion, turn immediately and push forward 25 meters, dropping into a 1.5 repetition half-squat pulse at each 10-meter marker."
    ),
    (
        "Barbell Power Clean to Overhead Push Jerk 1.5 Cardio Flow (135 lbs)",
        9.8,
        "Barbell",
        "Power clean 135 lbs, drop into a half-squat dip, drive bar up to eye level, pulse back down into dip (1.5 repetition protocol), and explode bar locked out overhead for 8 unbroken reps."
    ),
    (
        "Hyper-Advanced Multi-Ergometer Triathlon Sprint (Rower / Ski / Bike) 1.5 Blitz",
        10.0,
        "Machine",
        "Perform 250m row sprint (<42s), 250m SkiErg sprint (<45s), and 15-calorie Assault Bike sprint (<25s) back-to-back, concluding with 5 chest-to-floor burpees utilizing the 1.5 repetition protocol."
    ),
]

if __name__ == "__main__":
    print(f"Elite Home: {len(elite_home_data)}")
    print(f"Elite Gym: {len(elite_gym_data)}")
    print(f"Elite Total: {len(elite_home_data) + len(elite_gym_data)}")
    for name, score, eq, inst in elite_home_data + elite_gym_data:
        assert 9.3 <= score <= 10.0, f"Score {score} out of bounds for {name}"
        assert "1.5" in inst or "1.5" in name, f"Missing 1.5 protocol in {name}"
    print("All elite scores within 9.3 - 10.0 range and 1.5 protocol verified!")
