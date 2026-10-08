import React from "react";
import type { TierLevel } from "../deriveHouseState";

interface ZoneProps {
  level: TierLevel;
}

export const StudyZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="study-zone" aria-hidden="true">
      {/* Background wall */}
      <rect x="160" y="160" width="220" height="160" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />

      {/* Floor line */}
      <line x1="160" y1="320" x2="380" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />

      {/* LOW: Constrained, small window, dark room */}
      <g style={{ opacity: level === "LOW" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Tiny slit window */}
        <rect x="200" y="190" width="30" height="40" fill="var(--color-house-woodDark)" opacity="0.4" vectorEffect="non-scaling-stroke" />
        <rect x="200" y="190" width="30" height="40" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Bare table */}
        <line x1="280" y1="280" x2="340" y2="280" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="290" y1="280" x2="290" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="330" y1="280" x2="330" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* MID: Functional study room, open window, desk with lamp and book */}
      <g style={{ opacity: level === "MID" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Medium window */}
        <rect x="190" y="185" width="55" height="60" fill="var(--color-house-light)" opacity="0.3" vectorEffect="non-scaling-stroke" />
        <rect x="190" y="185" width="55" height="60" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="217" y1="185" x2="217" y2="245" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Desk and chair */}
        <rect x="270" y="270" width="80" height="10" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <line x1="270" y1="270" x2="350" y2="270" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="280" y1="280" x2="280" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="340" y1="280" x2="340" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Book on desk */}
        <rect x="300" y="260" width="20" height="10" fill="var(--color-house-foundation)" vectorEffect="non-scaling-stroke" />
      </g>

      {/* HIGH: Bright, spacious study with tall bookshelf, warm lamp beam */}
      <g style={{ opacity: level === "HIGH" ? 1 : 0, transition: "opacity var(--transition-meaningful) var(--easing)" }}>
        {/* Tall Bookshelf on left */}
        <rect x="175" y="175" width="45" height="145" fill="var(--color-house-woodDark)" vectorEffect="non-scaling-stroke" />
        <line x1="175" y1="210" x2="220" y2="210" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="175" y1="245" x2="220" y2="245" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="175" y1="280" x2="220" y2="280" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Books rows */}
        <rect x="180" y="185" width="10" height="25" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />
        <rect x="192" y="188" width="12" height="22" fill="var(--color-house-foundation)" vectorEffect="non-scaling-stroke" />
        <rect x="182" y="220" width="14" height="25" fill="var(--color-house-greenery)" vectorEffect="non-scaling-stroke" />
        {/* Broad study window with daylight wash */}
        <polygon points="245,180 320,180 340,320 225,320" fill="var(--color-house-light)" opacity="0.25" vectorEffect="non-scaling-stroke" />
        <rect x="245" y="180" width="75" height="65" fill="none" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="282" y1="180" x2="282" y2="245" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="245" y1="212" x2="320" y2="212" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        {/* Large study desk */}
        <rect x="250" y="270" width="105" height="12" fill="var(--color-house-wood)" vectorEffect="non-scaling-stroke" />
        <line x1="250" y1="270" x2="355" y2="270" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="260" y1="282" x2="260" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
        <line x1="345" y1="282" x2="345" y2="320" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
      </g>
    </g>
  );
};
