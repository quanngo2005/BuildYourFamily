import { describe, it, expect } from "vitest";
import { generateHouseDescription } from "./houseA11y";

describe("houseA11y - Vietnamese Screen Reader Alternative", () => {
  it("generates detailed accessible description in Vietnamese", () => {
    const text = generateHouseDescription({
      levels: {
        economy: "LOW",
        education: "MID",
        equality: "HIGH",
        emotion: "MID",
      },
      marks: [
        { scenarioId: "S01", zone: "structure", kind: "crack", slot: 0 },
      ],
    });

    expect(text).toContain("Ngôi nhà");
    expect(text).toContain("Kinh tế");
    expect(text).toContain("Giáo dục");
    expect(text).toContain("Bình đẳng");
    expect(text).toContain("Tình cảm");
  });
});
