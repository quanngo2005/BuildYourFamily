import { describe, it, expect } from "vitest";
import { levelOf, deriveHouseState } from "./deriveHouseState";
import type { Scores } from "../game/types";

describe("House State Derivation", () => {
  it("levelOf correctly partitions scores according to T1 (39, 40, 64, 65)", () => {
    expect(levelOf(0)).toBe("LOW");
    expect(levelOf(39)).toBe("LOW");
    expect(levelOf(39.9)).toBe("LOW");
    expect(levelOf(40)).toBe("MID");
    expect(levelOf(50)).toBe("MID");
    expect(levelOf(64)).toBe("MID");
    expect(levelOf(64.9)).toBe("MID");
    expect(levelOf(65)).toBe("HIGH");
    expect(levelOf(100)).toBe("HIGH");
  });

  it("deriveHouseState returns correct levels and marks with sequential slot indexing", () => {
    const scores: Scores = {
      economy: 35,
      education: 45,
      equality: 70,
      emotion: 64,
    };

    const history = {
      S01: "A" as const, // structure, crack -> slot 0
      S02: "B" as const, // foundation, build -> slot 0
      S04: "A" as const, // structure, dim -> slot 1
      S07: "A" as const, // structure, crack -> slot 2
    };

    const result = deriveHouseState(scores, history);

    expect(result.levels).toEqual({
      economy: "LOW",
      education: "MID",
      equality: "HIGH",
      emotion: "MID",
    });

    expect(result.marks).toHaveLength(4);
    expect(result.marks[0]).toEqual({ scenarioId: "S01", zone: "structure", kind: "crack", slot: 0 });
    expect(result.marks[1]).toEqual({ scenarioId: "S02", zone: "foundation", kind: "build", slot: 0 });
    expect(result.marks[2]).toEqual({ scenarioId: "S04", zone: "structure", kind: "dim", slot: 1 });
    expect(result.marks[3]).toEqual({ scenarioId: "S07", zone: "structure", kind: "crack", slot: 2 });
  });
});
