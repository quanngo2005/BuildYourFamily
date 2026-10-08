import { describe, it, expect } from "vitest";
import { SCENARIOS } from "./scenarios";
import type { Zone, Kind } from "../game/types";

const VALID_ZONES: Zone[] = ["foundation", "kitchen", "study", "structure", "door", "interior"];
const VALID_KINDS: Kind[] = ["crack", "reinforce", "build", "light", "dim", "open"];

describe("Content Lint - Scenario House Effects and Slot Rules", () => {
  it("Every scenario (S01-S07) has exactly 3 choices (A, B, C) with valid houseEffect", () => {
    const scenarioIds = Object.keys(SCENARIOS);
    expect(scenarioIds.length).toBe(7);

    for (const sid of scenarioIds) {
      const scenario = SCENARIOS[sid];
      expect(scenario.id).toBe(sid);
      const choiceKeys = Object.keys(scenario.choices);
      expect(choiceKeys.sort()).toEqual(["A", "B", "C"]);

      for (const [key, choice] of Object.entries(scenario.choices)) {
        expect(choice.houseEffect, `Missing houseEffect in ${sid}.${key}`).toBeDefined();
        expect(VALID_ZONES).toContain(choice.houseEffect.zone);
        expect(VALID_KINDS).toContain(choice.houseEffect.kind);
      }
    }
  });

  it("No playthrough path can accumulate more than 3 marks in any single zone (N=3 slots constraint)", () => {
    // Generate all combinations of choices across S01-S07
    const scenariosList = Object.values(SCENARIOS);

    function evaluatePath(index: number, counts: Record<Zone, number>) {
      if (index === scenariosList.length) {
        for (const [zone, count] of Object.entries(counts)) {
          expect(count, `Zone ${zone} exceeded max slot limit of 3`).toBeLessThanOrEqual(3);
        }
        return;
      }

      const scenario = scenariosList[index];
      for (const choice of Object.values(scenario.choices)) {
        const zone = choice.houseEffect.zone;
        counts[zone] = (counts[zone] || 0) + 1;
        evaluatePath(index + 1, counts);
        counts[zone] = counts[zone] - 1;
      }
    }

    const initialCounts: Record<Zone, number> = {
      foundation: 0,
      kitchen: 0,
      study: 0,
      structure: 0,
      door: 0,
      interior: 0,
    };

    evaluatePath(0, initialCounts);
  });
});
