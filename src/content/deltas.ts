import type { ScenarioId, ChoiceId, Dim } from "../game/types";

// Values are already normalized by K=8. 
// Scoring layer must NOT multiply these values again.
export const DELTAS: Record<ScenarioId, Record<ChoiceId, Record<Dim, number>>> = {
  S01: { 
         A:{economy:0,education:0,equality:-8,emotion:-8},
         B:{economy:6,education:0,equality:10,emotion:8},
         C:{economy:8,education:0,equality:8,emotion:0} 
       },
  S02: { 
         A:{economy:-16,education:0,equality:-8,emotion:0},
         B:{economy:16,education:0,equality:6,emotion:2},
         C:{economy:8,education:0,equality:4,emotion:4} 
       },
  S03: { 
         A:{economy:0,education:-12,equality:0,emotion:-4},
         B:{economy:0,education:22,equality:0,emotion:2},
         C:{economy:0,education:-6,equality:0,emotion:-2} 
       },
  S04: { 
         A:{economy:0,education:0,equality:-10,emotion:-14},
         B:{economy:0,education:0,equality:10,emotion:14},
         C:{economy:0,education:0,equality:0,emotion:0} 
       },
  S05: { 
         A:{economy:0,education:0,equality:-12,emotion:-12},
         B:{economy:0,education:0,equality:12,emotion:12},
         C:{economy:0,education:0,equality:-4,emotion:-4} 
       },
  S06: { 
         A:{economy:-8,education:0,equality:-6,emotion:-10},
         B:{economy:8,education:0,equality:6,emotion:10},
         C:{economy:-4,education:0,equality:-8,emotion:-4} 
       },
  S07: { 
         A:{economy:-8,education:-10,equality:-14,emotion:-8},
         B:{economy:8,education:10,equality:12,emotion:10},
         C:{economy:8,education:0,equality:-12,emotion:-12} 
       }
};
