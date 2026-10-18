#!/usr/bin/env python3
import json
import os
import sys

from data_beginner import beg_home_data, beg_gym_data
from data_intermediate import int_home_data, int_gym_data
from data_advanced import adv_home_data, adv_gym_data
from data_elite import elite_home_data, elite_gym_data

exercises = []
used_names = set()

def add_entries(dataset, difficulty, environment):
    for item in dataset:
        name = item[0].strip()
        score = round(float(item[1]), 1)
        equipment = item[2].strip()
        instructions = item[3].strip()
        
        norm = name.lower()
        if norm in used_names:
            print(f"ERROR: Duplicate name found: '{name}'")
            sys.exit(1)
        used_names.add(norm)
        
        # Verify no 1.5 rep protocol
        if "1.5" in name and "rep" in name.lower():
            print(f"ERROR: 1.5 rep protocol found in name: '{name}'")
            sys.exit(1)
        if "1.5 rep" in instructions.lower():
            print(f"ERROR: 1.5 rep protocol found in instructions: '{name}'")
            sys.exit(1)
            
        ex_id = f"back_{len(exercises) + 1}"
        exercises.append({
            "id": ex_id,
            "name": name,
            "muscleGroup": "Back",
            "difficulty": difficulty,
            "scientificEffectivenessScore": score,
            "equipmentNeeded": equipment,
            "environment": environment,
            "instructions": instructions
        })

# 1. Beginner
add_entries(beg_home_data, "Beginner", "Home")
add_entries(beg_gym_data, "Beginner", "Gym")

# 2. Intermediate
add_entries(int_home_data, "Intermediate", "Home")
add_entries(int_gym_data, "Intermediate", "Gym")

# 3. Advanced
add_entries(adv_home_data, "Advanced", "Home")
add_entries(adv_gym_data, "Advanced", "Gym")

# 4. Elite
add_entries(elite_home_data, "Elite", "Home")
add_entries(elite_gym_data, "Elite", "Gym")

print(f"Total exercises assembled: {len(exercises)}")
assert len(exercises) == 600, f"Expected 600 exercises, got {len(exercises)}"

# Count by difficulty
beg_count = sum(1 for e in exercises if e["difficulty"] == "Beginner")
int_count = sum(1 for e in exercises if e["difficulty"] == "Intermediate")
adv_count = sum(1 for e in exercises if e["difficulty"] == "Advanced")
elite_count = sum(1 for e in exercises if e["difficulty"] == "Elite")

print(f"Beginner: {beg_count} (Target: 132)")
print(f"Intermediate: {int_count} (Target: 228)")
print(f"Advanced: {adv_count} (Target: 150)")
print(f"Elite: {elite_count} (Target: 90)")

assert beg_count == 132, f"Beginner mismatch: {beg_count}"
assert int_count == 228, f"Intermediate mismatch: {int_count}"
assert adv_count == 150, f"Advanced mismatch: {adv_count}"
assert elite_count == 90, f"Elite mismatch: {elite_count}"

# Count by environment
home_count = sum(1 for e in exercises if e["environment"] == "Home")
gym_count = sum(1 for e in exercises if e["environment"] == "Gym")

print(f"Home: {home_count} (Target: 420 / 70%)")
print(f"Gym: {gym_count} (Target: 180 / 30%)")

assert home_count == 420, f"Home mismatch: {home_count}"
assert gym_count == 180, f"Gym mismatch: {gym_count}"

# Verify score bounds
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

# Format TypeScript output
ts_code = "import { ExerciseEntity } from './types';\n\n"
ts_code += "export const BACK_EXERCISES: ExerciseEntity[] = "
ts_code += json.dumps(exercises, indent=2)
ts_code += ";\n"

output_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../src/services/back.ts"))
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully generated and wrote {len(exercises)} Back exercises to {output_path}!")
