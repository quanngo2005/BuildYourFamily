import React from "react";
import type { TierLevel } from "../deriveHouseState";

interface ZoneProps {
  level: TierLevel;
}

export const StructureZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="structure-zone" aria-hidden="true">
      {/* Ground plane baseline */}
      <line x1="80" y1="500" x2="720" y2="500" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />

      {/* Main floor dividing slab (between Floor 1 and Floor 2) */}
      <rect x="150" y="315" width="500" height="10" fill="var(--color-house-woodDark)" vectorEffect="non-scaling-stroke" />
      <line x1="150" y1="315" x2="650" y2="315" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      <line x1="150" y1="325" x2="650" y2="325" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />

      {/* Central dividing party wall (separating Left and Right spaces) */}
      <line x1="380" y1="160" x2="380" y2="500" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />

      {/* Exterior Main Posts */}
      <line x1="160" y1="160" x2="160" y2="500" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />
      <line x1="640" y1="160" x2="640" y2="500" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />

      {/* LOW: Asymmetrical skewed roof, structural fracture on corner */}
      <g style={{ opacity: level === "LOW" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Roof with tilted peak at X=360 instead of 400 */}
        <polygon points="120,160 360,95 660,160 640,170 140,170" fill="var(--color-house-woodDark)" opacity="0.8" vectorEffect="non-scaling-stroke" />
        <path d="M 120 160 L 360 95 L 660 160" fill="none" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />
        {/* Structural crack lines on exterior wall */}
        <path d="M 160 210 L 175 235 L 160 260" stroke="var(--color-house-crack)" strokeWidth="var(--house-stroke-width)" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M 640 400 L 625 425 L 640 450" stroke="var(--color-house-crack)" strokeWidth="var(--house-stroke-width)" fill="none" vectorEffect="non-scaling-stroke" />
      </g>

      {/* MID: Symmetrical, balanced pitched roof with clean gables */}
      <g style={{ opacity: level === "MID" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        <polygon points="130,160 400,80 670,160 650,170 150,170" fill="var(--color-house-woodDark)" vectorEffect="non-scaling-stroke" />
        <path d="M 130 160 L 400 80 L 670 160" fill="none" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />
        {/* Gable attic truss tie */}
        <line x1="220" y1="130" x2="580" y2="130" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="400" y1="80" x2="400" y2="160" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* HIGH: Harmonious, reinforced architectural roof with double eaves and solid ties */}
      <g style={{ opacity: level === "HIGH" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Primary Upper Roof */}
        <polygon points="120,160 400,70 680,160 660,172 140,172" fill="var(--color-house-woodDark)" vectorEffect="non-scaling-stroke" />
        <path d="M 120 160 L 400 70 L 680 160" fill="none" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />
        {/* Eave overhang cap */}
        <polygon points="115,165 400,65 685,165 680,160 400,70 120,160" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        {/* Symmetrical King-post Truss */}
        <line x1="200" y1="130" x2="600" y2="130" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />
        <line x1="400" y1="70" x2="400" y2="160" stroke="var(--color-house-stroke)" strokeWidth="var(--house-stroke-width)" vectorEffect="non-scaling-stroke" />
        <line x1="300" y1="130" x2="400" y2="95" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="500" y1="130" x2="400" y2="95" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
};
