import { describe, it, expect, beforeEach } from "vitest";
import {
  setPendingReveal,
  consumePendingReveal,
  hasPendingReveal,
  resetRevealStore,
} from "./revealStore";

describe("revealStore - Idempotent One-Shot Reveal", () => {
  beforeEach(() => {
    resetRevealStore();
  });

  it("stores pending reveal with scenarioId and previousLevels", () => {
    expect(hasPendingReveal("S01")).toBe(false);

    setPendingReveal("S01", {
      economy: "MID",
      education: "MID",
      equality: "MID",
      emotion: "MID",
    });

    expect(hasPendingReveal("S01")).toBe(true);
  });

  it("consumes pending reveal exactly once (idempotent, no replay)", () => {
    setPendingReveal("S01", {
      economy: "MID",
      education: "MID",
      equality: "MID",
      emotion: "MID",
    });

    const firstConsume = consumePendingReveal("S01");
    expect(firstConsume).not.toBeNull();
    expect(firstConsume?.scenarioId).toBe("S01");

    // Second consume immediately returns null (StrictMode re-render protection)
    const secondConsume = consumePendingReveal("S01");
    expect(secondConsume).toBeNull();

    // Setting pending for the same scenarioId again will not trigger because it is in played
    setPendingReveal("S01", {
      economy: "MID",
      education: "MID",
      equality: "MID",
      emotion: "MID",
    });
    expect(consumePendingReveal("S01")).toBeNull();
  });
});
