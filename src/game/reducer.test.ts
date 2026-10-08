import { describe, it, expect } from "vitest";
import { gameReducer, INITIAL_STATE } from "./reducer";

describe("gameReducer", () => {
  it("should handle START and BEGIN", () => {
    let state = gameReducer(INITIAL_STATE, { type: "START" });
    expect(state.phase).toBe("intro");
    
    state = gameReducer(state, { type: "BEGIN" });
    expect(state.phase).toBe("choosing");
    expect(state.currentScenario).toBe("S01");
  });

  it("should apply DELTAS correctly and clamp to 0-100", () => {
    let state = gameReducer(INITIAL_STATE, { type: "START" });
    state = gameReducer(state, { type: "BEGIN" }); // phase: choosing, S01
    
    // Choose B for S01
    // S01.B delta = { economy: 6, education: 0, equality: 10, emotion: 8 }
    // start score: 40/40/40/40
    state = gameReducer(state, { type: "SELECT_CHOICE", payload: { scenarioId: "S01", choiceId: "B" } });
    
    expect(state.phase).toBe("feedback");
    expect(state.scores.economy).toBe(46);
    expect(state.scores.education).toBe(40);
    expect(state.scores.equality).toBe(50);
    expect(state.scores.emotion).toBe(48);
    expect(state.history["S01"]).toBe("B");
    
    // Double click should be ignored since phase is feedback
    state = gameReducer(state, { type: "SELECT_CHOICE", payload: { scenarioId: "S01", choiceId: "C" } });
    expect(state.history["S01"]).toBe("B");
  });

  it("should progress to the next scenario on CONTINUE", () => {
    let state = gameReducer(INITIAL_STATE, { type: "START" });
    state = gameReducer(state, { type: "BEGIN" });
    state = gameReducer(state, { type: "SELECT_CHOICE", payload: { scenarioId: "S01", choiceId: "B" } });
    
    state = gameReducer(state, { type: "CONTINUE" });
    
    expect(state.phase).toBe("choosing");
    expect(state.currentScenario).toBe("S02");
    expect(state.completed).toContain("S01");
  });
});
