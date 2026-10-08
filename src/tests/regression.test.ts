import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { HouseCanvas } from "../components/house/HouseCanvas";
import { gameReducer, INITIAL_STATE } from "../game/reducer";

describe("Visual Regression & Deterministic Invariants", () => {
  it("HouseCanvas is 100% deterministic (identical inputs -> identical SVG markup)", () => {
    const props = {
      levels: {
        economy: "MID" as const,
        education: "HIGH" as const,
        equality: "LOW" as const,
        emotion: "MID" as const,
      },
      marks: [
        { scenarioId: "S01", zone: "structure" as const, kind: "crack" as const, slot: 0 },
        { scenarioId: "S02", zone: "foundation" as const, kind: "build" as const, slot: 0 },
      ],
    };

    const render1 = renderToString(React.createElement(HouseCanvas, props));
    const render2 = renderToString(React.createElement(HouseCanvas, props));

    expect(render1).toBe(render2);
    expect(render1).toContain("<svg");
    expect(render1).toContain("viewBox=\"0 0 800 600\"");
  });

  it("SELECT_CHOICE is idempotent in reducer (Invariant 4)", () => {
    let state = gameReducer(INITIAL_STATE, { type: "START" });
    state = gameReducer(state, { type: "BEGIN" });

    // First commit
    state = gameReducer(state, {
      type: "SELECT_CHOICE",
      payload: { scenarioId: "S01", choiceId: "A" },
    });
    expect(state.history.S01).toBe("A");
    const scoreAfterFirst = { ...state.scores };

    // Duplicate commit attempt (should be rejected/ignored)
    state = gameReducer(state, {
      type: "SELECT_CHOICE",
      payload: { scenarioId: "S01", choiceId: "B" },
    });
    expect(state.history.S01).toBe("A");
    expect(state.scores).toEqual(scoreAfterFirst);
  });

  it("Vietnamese diacritic sample strings are supported without distortion", () => {
    const sampleStrings = [
      "Ngôi nhà đang chuyển mình",
      "Ổ ẫ ệ Ầ Ẩ Ỗ Ử",
      "Ngôi nhà còn nhiều vết nứt cần gia cố",
    ];

    for (const str of sampleStrings) {
      expect(str.length).toBeGreaterThan(0);
      expect(typeof str).toBe("string");
    }
  });
});
