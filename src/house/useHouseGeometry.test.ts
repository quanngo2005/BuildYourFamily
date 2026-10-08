import { describe, it, expect } from "vitest";
import { calculateAnchorPixelPosition } from "./useHouseGeometry";

describe("useHouseGeometry - Anchor Coordinate Conversion", () => {
  it("converts viewBox coordinates to pixels accurately when width is constraining", () => {
    // Container 400x400 (aspect ratio 1:1, SVG is 800x600 = 4:3)
    // scale = min(400/800, 400/600) = min(0.5, 0.6667) = 0.5
    // scaledW = 400, scaledH = 300
    // offsetX = 0, offsetY = (400 - 300)/2 = 50
    // Anchor at (160, 240) -> px = 0 + 160*0.5 = 80, py = 50 + 240*0.5 = 170
    const pos = calculateAnchorPixelPosition(
      { x: 160, y: 240 },
      { width: 400, height: 400 }
    );

    expect(pos.x).toBe(80);
    expect(pos.y).toBe(170);
  });

  it("converts viewBox coordinates accurately at 1:1 scale (800x600)", () => {
    const pos = calculateAnchorPixelPosition(
      { x: 640, y: 120 },
      { width: 800, height: 600 }
    );

    expect(pos.x).toBe(640);
    expect(pos.y).toBe(120);
  });
});
