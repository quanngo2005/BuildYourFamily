import type { Zone, Dimension } from "../game/types";

export interface Point {
  x: number;
  y: number;
}

export const HOUSE_VIEWBOX = {
  width: 800,
  height: 600,
  viewBox: "0 0 800 600",
} as const;

// Anchors for leader line annotations (on the left/right boundaries of the house)
export const ZONE_ANCHORS: Record<Zone, Point> = {
  foundation: { x: 160, y: 520 }, // Left edge
  study: { x: 160, y: 240 },      // Left edge
  door: { x: 160, y: 430 },       // Left edge
  structure: { x: 640, y: 120 },  // Right edge
  interior: { x: 640, y: 240 },   // Right edge
  kitchen: { x: 640, y: 410 },    // Right edge
};

// Anchors per Dimension for annotations
export const DIMENSION_ANCHORS: Record<Dimension, Point> = {
  economy: ZONE_ANCHORS.foundation,
  education: ZONE_ANCHORS.study,
  equality: ZONE_ANCHORS.structure,
  emotion: ZONE_ANCHORS.interior,
};

// Which side the annotation label should be placed on ("left" | "right")
export const DIMENSION_SIDE: Record<Dimension, "left" | "right"> = {
  economy: "left",
  education: "left",
  equality: "right",
  emotion: "right",
};

// 3 pre-defined non-overlapping slot coordinates for each zone
export const ZONE_SLOTS: Record<Zone, Point[]> = {
  foundation: [
    { x: 230, y: 520 },
    { x: 400, y: 520 },
    { x: 570, y: 520 },
  ],
  kitchen: [
    { x: 460, y: 420 },
    { x: 520, y: 420 },
    { x: 580, y: 420 },
  ],
  study: [
    { x: 220, y: 230 },
    { x: 280, y: 230 },
    { x: 330, y: 230 },
  ],
  door: [
    { x: 220, y: 440 },
    { x: 255, y: 440 },
    { x: 290, y: 440 },
  ],
  interior: [
    { x: 450, y: 230 },
    { x: 515, y: 230 },
    { x: 580, y: 230 },
  ],
  structure: [
    { x: 185, y: 190 },
    { x: 400, y: 110 },
    { x: 615, y: 190 },
  ],
};
