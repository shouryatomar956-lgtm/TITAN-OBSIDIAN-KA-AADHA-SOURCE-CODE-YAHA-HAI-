#!/usr/bin/env python3
import json
import os
import sys

# Add scripts directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from data_calisthenics_beginner import beg_home_data, beg_gym_data
from data_calisthenics_intermediate import int_home_data, int_gym_data
from data_calisthenics_advanced import adv_home_data, adv_gym_data
from data_calisthenics_elite import elite_home_data, elite_gym_data

all_entries = []
seen_names = set()

def has_15_protocol(name, instructions):
    text = (name + " " + instructions).lower()
    return "1.5" in text and ("protocol" in text or "repetition" in text or "pulse" in text or "rep" in text)

def add_entries(dataset, tier, env):
    for name, score, eq, instructions in dataset:
        if name in seen_names:
            raise ValueError(f"DUPLICATE EXERCISE NAME DETECTED: {name} in {tier} {env}")
        seen_names.add(name)

        # Validate scientific score boundaries
        if tier == "Beginner":
            if not (4.0 <= score <= 6.0):
                raise ValueError(f"Beginner score {score} out of bounds (4.0-6.0) for {name}")
            if has_15_protocol(name, instructions):
                raise ValueError(f"1.5 protocol should NOT be in Beginner tier: {name}")
        elif tier == "Intermediate":
            if not (6.1 <= score <= 8.0):
                raise ValueError(f"Intermediate score {score} out of bounds (6.1-8.0) for {name}")
            if has_15_protocol(name, instructions):
                raise ValueError(f"1.5 protocol should NOT be in Intermediate tier: {name}")
        elif tier == "Advanced":
            if not (8.1 <= score <= 9.2):
                raise ValueError(f"Advanced score {score} out of bounds (8.1-9.2) for {name}")
            if has_15_protocol(name, instructions):
                raise ValueError(f"1.5 protocol should NOT be in Advanced tier: {name}")
        elif tier == "Elite":
            if not (9.3 <= score <= 10.0):
                raise ValueError(f"Elite score {score} out of bounds (9.3-10.0) for {name}")
            if not has_15_protocol(name, instructions):
                raise ValueError(f"Elite exercise MUST contain 1.5 protocol: {name}")

        all_entries.append({
            "name": name,
            "muscleGroup": "Calisthenics",
            "difficulty": tier,
            "scientificEffectivenessScore": round(float(score), 1),
            "equipmentNeeded": eq,
            "environment": env,
            "instructions": instructions
        })

# Process tiers
add_entries(beg_home_data, "Beginner", "Home")
add_entries(beg_gym_data, "Beginner", "Gym")

add_entries(int_home_data, "Intermediate", "Home")
add_entries(int_gym_data, "Intermediate", "Gym")

add_entries(adv_home_data, "Advanced", "Home")
add_entries(adv_gym_data, "Advanced", "Gym")

add_entries(elite_home_data, "Elite", "Home")
add_entries(elite_gym_data, "Elite", "Gym")

# Assign IDs
for idx, entry in enumerate(all_entries, 1):
    entry["id"] = f"calisthenics_{idx}"

# Validations
total_count = len(all_entries)
beginner_count = sum(1 for e in all_entries if e["difficulty"] == "Beginner")
intermediate_count = sum(1 for e in all_entries if e["difficulty"] == "Intermediate")
advanced_count = sum(1 for e in all_entries if e["difficulty"] == "Advanced")
elite_count = sum(1 for e in all_entries if e["difficulty"] == "Elite")

home_count = sum(1 for e in all_entries if e["environment"] == "Home")
gym_count = sum(1 for e in all_entries if e["environment"] == "Gym")

print(f"Total Calisthenics exercises assembled: {total_count}")
print(f"Beginner: {beginner_count} (Target: 66)")
print(f"Intermediate: {intermediate_count} (Target: 114)")
print(f"Advanced: {advanced_count} (Target: 75)")
print(f"Elite: {elite_count} (Target: 45)")
print(f"Home: {home_count} (Target: 210 / {home_count / total_count * 100:.1f}%)")
print(f"Gym: {gym_count} (Target: 90 / {gym_count / total_count * 100:.1f}%)")

assert total_count == 300, f"Expected 300, got {total_count}"
assert beginner_count == 66, f"Expected 66 Beginner, got {beginner_count}"
assert intermediate_count == 114, f"Expected 114 Intermediate, got {intermediate_count}"
assert advanced_count == 75, f"Expected 75 Advanced, got {advanced_count}"
assert elite_count == 45, f"Expected 45 Elite, got {elite_count}"
assert home_count == 210, f"Expected 210 Home, got {home_count}"
assert gym_count == 90, f"Expected 90 Gym, got {gym_count}"
assert len(seen_names) == 300, f"Expected 300 unique names, got {len(seen_names)}"

print("All scientific score boundaries strictly verified!")
print("1.5 Repetition Protocol verification passed! Present exclusively in all 45 Elite exercises.")

# Format TypeScript output
ts_code = """import { ExerciseEntity } from './types';

export const CALISTHENICS_EXERCISES: ExerciseEntity[] = """

ts_code += json.dumps(all_entries, indent=2) + ";\n"

output_path = "/app/applet/src/services/calisthenics.ts"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(ts_code)

print(f"Successfully generated and wrote {total_count} Calisthenics exercises to {output_path}!")
