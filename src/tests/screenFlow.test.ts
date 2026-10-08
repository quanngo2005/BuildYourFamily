import { describe, it, expect } from "vitest";
import { gameReducer, INITIAL_STATE } from "../game/reducer";

describe("Screen Flow Mapping & Transitions (SCREEN_FLOW.md)", () => {
  it("SCR-01 Landing -> SCR-02 Intro -> SCR-03 Scenario S01", () => {
    // 1. Initial State is Landing
    expect(INITIAL_STATE.phase).toBe("landing");

    // 2. START action: Landing -> Intro
    const introState = gameReducer(INITIAL_STATE, { type: "START" });
    expect(introState.phase).toBe("intro");

    // 3. BEGIN action: Intro -> Scenario S01 (choosing)
    const choosingState = gameReducer(introState, { type: "BEGIN" });
    expect(choosingState.phase).toBe("choosing");
    expect(choosingState.currentScenario).toBe("S01");
  });

  it("Full canonical loop: S01 through S07 to SCR-06 Final Profile", () => {
    let state = gameReducer(INITIAL_STATE, { type: "START" });
    state = gameReducer(state, { type: "BEGIN" });

    const scenarios = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"] as const;

    for (const sid of scenarios) {
      expect(state.phase).toBe("choosing");
      expect(state.currentScenario).toBe(sid);

      // SELECT_CHOICE -> Feedback (SCR-04)
      state = gameReducer(state, {
        type: "SELECT_CHOICE",
        payload: { scenarioId: sid, choiceId: "B" },
      });
      expect(state.phase).toBe("feedback");
      expect(state.history[sid]).toBe("B");

      // CONTINUE from Feedback -> Next Scenario (or Final Profile if S07)
      state = gameReducer(state, { type: "CONTINUE" });
    }

    // After S07 CONTINUE -> SCR-06 Final Profile
    expect(state.phase).toBe("final");
    expect(state.completed).toHaveLength(7);
  });

  it("RESUME action from Landing restores to correct active phase", () => {
    // If user has progress in S03 (choosing)
    const savedState = {
      ...INITIAL_STATE,
      phase: "landing" as const,
      currentScenario: "S03" as const,
      completed: ["S01", "S02"] as any,
      history: { S01: "B", S02: "A" } as any,
    };

    const resumedState = gameReducer(savedState, { type: "RESUME" });
    expect(resumedState.phase).toBe("choosing");
    expect(resumedState.currentScenario).toBe("S03");
  });

  it("RESET action wipes progress and restores INITIAL_STATE", () => {
    let state = gameReducer(INITIAL_STATE, { type: "START" });
    state = gameReducer(state, { type: "BEGIN" });
    state = gameReducer(state, {
      type: "SELECT_CHOICE",
      payload: { scenarioId: "S01", choiceId: "A" },
    });

    const resetState = gameReducer(state, { type: "RESET" });
    expect(resetState).toEqual(INITIAL_STATE);
  });
});
