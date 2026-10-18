#!/usr/bin/env python3
import json
import os
import sys

from data_neck_beginner import beg_home_data, beg_gym_data
from data_neck_intermediate import int_home_data, int_gym_data
from data_neck_advanced import adv_home_data, adv_gym_data
from data_neck_elite import elite_home_data, elite_gym_data

exercises = []
used_names = set()

valid_equipment = {
    'Bodyweight', 'Backpack-weighted', 'Dumbbells', 'Resistance Bands',
    'Machine', 'Barbell', 'Cable', 'None', 'EZ-Bar'
}

def add_entries(dataset, difficulty, environment):
    for item in dataset:
        name = item[0].strip()
        score = round(float(item[1]), 1)
        equipment = item[2].strip()
        instructions = item[3].strip()

        norm = name.lower()
        if norm in used_names:
            print(f"ERROR: Duplicate name detected: '{name}'")
            sys.exit(1)
        used_names.add(norm)

        if equipment not in valid_equipment:
            print(f"ERROR: Invalid equipment '{equipment}' in exercise '{name}'")
            sys.exit(1)

        ex_id = f"neck_{len(exercises) + 1}"
        exercises.append({
            "id": ex_id,
            "name": name,
            "muscleGroup": "Neck Strength",
            "difficulty": difficulty,
            "scientificEffectivenessScore": score,
            "equipmentNeeded": equipment,
            "environment": environment,
            "instructions": instructions
        })

# 1. Beginner (31 Home + 13 Gym = 44)
add_entries(beg_home_data, "Beginner", "Home")
add_entries(beg_gym_data, "Beginner", "Gym")

# 2. Intermediate (53 Home + 23 Gym = 76)
add_entries(int_home_data, "Intermediate", "Home")
add_entries(int_gym_data, "Intermediate", "Gym")

# 3. Advanced (35 Home + 15 Gym = 50)
add_entries(adv_home_data, "Advanced", "Home")
add_entries(adv_gym_data, "Advanced", "Gym")

# 4. Elite (21 Home + 9 Gym = 30)
add_entries(elite_home_data, "Elite", "Home")
add_entries(elite_gym_data, "Elite", "Gym")

print(f"Total Neck exercises assembled: {len(exercises)}")
assert len(exercises) == 200, f"Expected 200 exercises, got {len(exercises)}"

# Count by difficulty
beg_count = sum(1 for e in exercises if e["difficulty"] == "Beginner")
int_count = sum(1 for e in exercises if e["difficulty"] == "Intermediate")
adv_count = sum(1 for e in exercises if e["difficulty"] == "Advanced")
elite_count = sum(1 for e in exercises if e["difficulty"] == "Elite")

print(f"Beginner: {beg_count} (Target: 44)")
print(f"Intermediate: {int_count} (Target: 76)")
print(f"Advanced: {adv_count} (Target: 50)")
print(f"Elite: {elite_count} (Target: 30)")

assert beg_count == 44, f"Beginner mismatch: {beg_count}"
assert int_count == 76, f"Intermediate mismatch: {int_count}"
assert adv_count == 50, f"Advanced mismatch: {adv_count}"
assert elite_count == 30, f"Elite mismatch: {elite_count}"

# Count by environment
home_count = sum(1 for e in exercises if e["environment"] == "Home")
gym_count = sum(1 for e in exercises if e["environment"] == "Gym")

print(f"Home: {home_count} (Target: 140 / 70.0%)")
print(f"Gym: {gym_count} (Target: 60 / 30.0%)")

assert home_count == 140, f"Home mismatch: {home_count}"
assert gym_count == 60, f"Gym mismatch: {gym_count}"

# Verify score boundaries
for e in exercises:
    s = e["scientificEffectivenessScore"]
    d = e["difficulty"]
    if d == "Beginner":
        assert 4.0 <= s <= 6.0, f"Beginner score out of bounds: {s} in {e['name']}"
    elif d == "Intermediate":
        assert 6.1 <= s <= 8.0, f"Intermediate score out of bounds: {s} in {e['name']}"
    elif d == "Advanced":
        assert 8.1 <= s <= 9.2, f"Advanced score out of bounds: {s} in {e['name']}"
    elif d == "Elite":
        assert 9.3 <= s <= 10.0, f"Elite score out of bounds: {s} in {e['name']}"

print("All scientific score boundaries strictly verified!")

# Verify 1.5 repetition protocol exclusively for Elite tier
for e in exercises:
    d = e["difficulty"]
    instr = e["instructions"]
    if d == "Elite":
        assert "1.5" in instr, f"1.5 repetition protocol missing in Elite exercise: {e['name']}"
    else:
        assert "1.5" not in instr, f"1.5 repetition protocol illegally present in non-elite exercise: {e['name']}"

print("1.5 Repetition Protocol verification passed! Present exclusively in all 30 Elite exercises.")

# Format TypeScript output
ts_code = "import { ExerciseEntity } from './types';\n\n"
ts_code += "export const NECK_EXERCISES: ExerciseEntity[] = "
ts_code += json.dumps(exercises, indent=2)
ts_code += ";\n"

output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/services/neck.ts"))
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully generated and wrote {len(exercises)} Neck exercises to {output_path}!")
