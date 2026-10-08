import { describe, it, expect } from "vitest";
import { getTier, selectHouse, selectProfileCategory, selectStrongestAndWeakest } from "./selectors";

describe("selectors", () => {
  it("getTier", () => {
    expect(getTier(29)).toBe("low");
    expect(getTier(30)).toBe("mid");
    expect(getTier(70)).toBe("mid");
    expect(getTier(71)).toBe("high");
  });

  it("selectHouse", () => {
    const scores = { economy: 25, education: 75, equality: 50, emotion: 50 };
    const house = selectHouse(scores);
    expect(house.economy).toBe("low");
    expect(house.education).toBe("high");
    expect(house.equality).toBe("mid");
    expect(house.overall).toBe("balanced");
  });

  it("selectProfileCategory", () => {
    expect(selectProfileCategory({ economy: 39, education: 40, equality: 40, emotion: 40 })).toBe("Vết nứt"); // 159/4 = 39.75
    expect(selectProfileCategory({ economy: 40, education: 40, equality: 40, emotion: 40 })).toBe("Chuyển mình"); // 160/4 = 40
    expect(selectProfileCategory({ economy: 65, education: 65, equality: 65, emotion: 65 })).toBe("Tiến bộ"); // 65
    expect(selectProfileCategory({ economy: 64, education: 65, equality: 65, emotion: 65 })).toBe("Chuyển mình"); // 64.75
  });

  it("selectStrongestAndWeakest tie-breaker order", () => {
    // If all are equal, economy is first so it is both strongest and weakest? 
    // Wait, the logic is: > strongest, < weakest.
    // So if all are equal, strongest stays first (economy), weakest stays first (economy).
    const scoresEq = { economy: 40, education: 40, equality: 40, emotion: 40 };
    expect(selectStrongestAndWeakest(scoresEq)).toEqual({ strongest: "economy", weakest: "economy" });

    // Tie between education and emotion for strongest -> education should win
    const scoresStrong = { economy: 40, education: 90, equality: 40, emotion: 90 };
    expect(selectStrongestAndWeakest(scoresStrong)).toEqual({ strongest: "education", weakest: "economy" });

    // Tie between equality and emotion for weakest -> equality should win
    const scoresWeak = { economy: 90, education: 90, equality: 20, emotion: 20 };
    expect(selectStrongestAndWeakest(scoresWeak)).toEqual({ strongest: "economy", weakest: "equality" });
  });
});
