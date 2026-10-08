import { describe, it, expect } from "vitest";
import { DELTAS } from "./deltas";
import type { ScenarioId, ChoiceId, Dim } from "../game/types";

describe("DELTAS Gameplay Balance Verification", () => {
  const ORIGINAL_UNITS: Record<ScenarioId, Record<ChoiceId, number>> = {
    S01: { A: -2, B: 3, C: 2 },
    S02: { A: -3, B: 3, C: 2 },
    S03: { A: -2, B: 3, C: -1 },
    S04: { A: -3, B: 3, C: 0 },
    S05: { A: -3, B: 3, C: -1 },
    S06: { A: -3, B: 3, C: -2 },
    S07: { A: -5, B: 5, C: -2 },
  };

  const DIMS: Dim[] = ["economy", "education", "equality", "emotion"];

  it("must satisfy sum(deltas) === original_units * 8 for all 21 choices", () => {
    for (const [sid, choices] of Object.entries(ORIGINAL_UNITS) as [ScenarioId, Record<ChoiceId, number>][]) {
      for (const [cid, units] of Object.entries(choices) as [ChoiceId, number][]) {
        const delta = DELTAS[sid][cid];
        const sum = DIMS.reduce((acc, dim) => acc + (delta[dim] || 0), 0);
        expect(sum).toBe(units * 8);
      }
    }
  });

  it("must have all 7 scenarios and choices A, B, C defined", () => {
    const scenarioIds: ScenarioId[] = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];
    for (const sid of scenarioIds) {
      expect(DELTAS[sid]).toBeDefined();
      expect(DELTAS[sid].A).toBeDefined();
      expect(DELTAS[sid].B).toBeDefined();
      expect(DELTAS[sid].C).toBeDefined();
    }
  });
});
