import fs from 'fs';

let globalSearch = fs.readFileSync('src/components/GlobalSearch.tsx', 'utf8');
globalSearch = globalSearch.replace(
  "import { useState, useEffect, useRef, useCallback } from 'react';",
  "import React, { useState, useEffect, useRef, useCallback } from 'react';"
);
fs.writeFileSync('src/components/GlobalSearch.tsx', globalSearch);

let exerciseState = fs.readFileSync('src/hooks/useExerciseState.ts', 'utf8');
exerciseState = exerciseState.replace(
  "ex.equipment",
  "ex.equipmentNeeded"
);
fs.writeFileSync('src/hooks/useExerciseState.ts', exerciseState);
