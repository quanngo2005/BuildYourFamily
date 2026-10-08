import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadAndValidateState } from "./validation";
import { INITIAL_STATE } from "./reducer";
import type { GameState } from "./types";

describe("loadAndValidateState", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should return INITIAL_STATE if localStorage is empty", () => {
    expect(loadAndValidateState()).toEqual(INITIAL_STATE);
  });

  it("should return INITIAL_STATE for invalid json", () => {
    localStorage.setItem("nha:v1", "{ invalid json");
    expect(loadAndValidateState()).toEqual(INITIAL_STATE);
  });

  it("should return INITIAL_STATE if version is not 1", () => {
    localStorage.setItem("nha:v1", JSON.stringify({ version: 2 }));
    expect(loadAndValidateState()).toEqual(INITIAL_STATE);
  });

  it("should return INITIAL_STATE if completed is not a contiguous prefix of SCENARIO_ORDER", () => {
    const state = {
      ...INITIAL_STATE,
      phase: "choosing",
      currentScenario: "S03",
      completed: ["S01", "S04"], // Invalid order
      history: { S01: "A", S04: "B" }
    };
    localStorage.setItem("nha:v1", JSON.stringify(state));
    expect(loadAndValidateState()).toEqual(INITIAL_STATE);
  });

  it("should return valid state if all invariants pass", () => {
    const validState: GameState = {
      version: 1,
      phase: "choosing",
      currentScenario: "S02",
      scores: { economy: 40, education: 40, equality: 32, emotion: 32 }, // Adjusted for S01.A
      history: { S01: "A" },
      completed: ["S01"],
      unlocked: []
    };
    
    // Add uiScreen since we mock persistence of both
    const persisted = { game: validState, uiScreen: "feedback" };
    localStorage.setItem("nha:v1", JSON.stringify(persisted));
    
    const loaded = loadAndValidateState();
    
    // Note: loadAndValidateState only returns game state.
    expect(loaded.phase).toBe("choosing");
    expect(loaded.currentScenario).toBe("S02");
    expect(loaded.scores).toEqual({ economy: 40, education: 40, equality: 32, emotion: 32 });
    expect(loaded.completed).toEqual(["S01"]);
    expect(loaded.history).toEqual({ S01: "A" });
  });

  it("should recompute scores from history and fallback if mismatch", () => {
    const tamperedState: GameState = {
      version: 1,
      phase: "choosing",
      currentScenario: "S02",
      // Tampered scores (not matching S01.A)
      scores: { economy: 100, education: 100, equality: 100, emotion: 100 }, 
      history: { S01: "A" },
      completed: ["S01"],
      unlocked: []
    };
    
    const persisted = { game: tamperedState, uiScreen: "feedback" };
    localStorage.setItem("nha:v1", JSON.stringify(persisted));
    
    // The loadAndValidateState should detect score mismatch with fold and return INITIAL_STATE
    expect(loadAndValidateState()).toEqual(INITIAL_STATE);
    expect(localStorage.getItem("nha:v1")).toBeNull();
  });

  it("should validate and restore state at final phase", () => {
    // All B path
    const validFinalState: GameState = {
      version: 1,
      phase: "final",
      currentScenario: "S07",
      scores: { economy: 78, education: 72, equality: 96, emotion: 98 },
      history: { S01: "B", S02: "B", S03: "B", S04: "B", S05: "B", S06: "B", S07: "B" },
      completed: ["S01", "S02", "S03", "S04", "S05", "S06", "S07"],
      unlocked: ["relationships", "living_spaces", "three_foundations", "main_door", "final_profile"]
    };

    localStorage.setItem("nha:v1", JSON.stringify({ game: validFinalState, uiScreen: "feedback" }));
    const loaded = loadAndValidateState();
    expect(loaded.phase).toBe("final");
    expect(loaded.currentScenario).toBe("S07");
    expect(loaded.completed.length).toBe(7);
    expect(loaded.scores).toEqual({ economy: 78, education: 72, equality: 96, emotion: 98 });
  });
});
