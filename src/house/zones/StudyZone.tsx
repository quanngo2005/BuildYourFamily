import React from "react";
import type { TierLevel } from "../deriveHouseState";
import { Tier, ink } from "./Tier";

interface ZoneProps {
  level: TierLevel;
}

const BOOK_COLORS = [
  "var(--color-house-crack)",
  "var(--color-house-greenery)",
  "var(--color-house-light)",
  "#3B6EA5",
  "var(--color-house-wood)",
];

// A row of upright book spines starting at x, sitting on shelf y
const Books: React.FC<{ x: number; y: number; n: number; offset?: number }> = ({ x, y, n, offset = 0 }) => (
  <g>
    {Array.from({ length: n }, (_, i) => {
      const h = 14 + ((i + offset) % 3) * 3;
      return (
        <rect
          key={i}
          x={x + i * 6}
          y={y - h}
          width={5}
          height={h}
          fill={BOOK_COLORS[(i + offset) % BOOK_COLORS.length]}
          {...ink}
          strokeWidth="0.6"
        />
      );
    })}
  </g>
);

const DeskLamp: React.FC<{ x: number; lit?: boolean }> = ({ x, lit }) => (
  <g>
    {lit && <polygon className="nha-lamp-glow" points={`${x + 6},244 ${x + 16},244 ${x + 26},268 ${x - 8},268`} fill="var(--color-house-light)" opacity="0.4" />}
    <rect x={x - 6} y={264} width={14} height={4} fill="var(--color-house-stroke)" />
    <path d={`M ${x} 264 L ${x - 4} 248 L ${x + 8} 238`} fill="none" {...ink} strokeWidth="2" />
    <polygon points={`${x + 2},236 ${x + 16},232 ${x + 20},244 ${x + 8},246`} fill={lit ? "var(--color-house-light)" : "var(--color-house-foundation)"} {...ink} />
  </g>
);

const Chair: React.FC<{ x: number }> = ({ x }) => (
  <g>
    <line x1={x} y1={290} x2={x + 26} y2={290} {...ink} strokeWidth="3" />
    <line x1={x + 24} y1={262} x2={x + 24} y2={315} {...ink} strokeWidth="2" />
    <line x1={x + 2} y1={290} x2={x + 2} y2={315} {...ink} strokeWidth="2" />
  </g>
);

export const StudyZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="study-zone" aria-hidden="true">
      <rect x="160" y="160" width="220" height="160" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />
      <line x1="160" y1="320" x2="380" y2="320" {...ink} />

      {/* LOW: cramped corner — slit window, bare table, one book and a candle, books stacked on the floor */}
      <Tier show={level === "LOW"}>
        <rect x="200" y="190" width="28" height="40" fill="var(--color-house-woodDark)" opacity="0.4" {...ink} />
        <line x1="270" y1="280" x2="340" y2="280" {...ink} strokeWidth="3" />
        <line x1="278" y1="280" x2="278" y2="315" {...ink} />
        <line x1="332" y1="280" x2="332" y2="315" {...ink} />
        <rect x="290" y="274" width="20" height="6" fill="var(--color-house-foundation)" {...ink} />
        <rect x="320" y="268" width="5" height="12" fill="#F4F1EA" {...ink} />
        <path d="M 322.5 268 q -3 -5 0 -8 q 3 3 0 8" fill="var(--color-house-light)" />
        <rect x="350" y="304" width="20" height="5" fill="var(--color-house-foundation)" {...ink} />
        <rect x="352" y="309" width="18" height="6" fill="var(--color-house-wood)" {...ink} />
        <rect x="292" y="296" width="18" height="19" fill="var(--color-house-woodLight)" {...ink} />
      </Tier>

      {/* MID: a study corner — window, wall shelf of books, desk, lamp, open book, chair */}
      <Tier show={level === "MID"}>
        <rect x="185" y="185" width="50" height="55" fill="var(--color-house-light)" opacity="0.3" {...ink} />
        <line x1="210" y1="185" x2="210" y2="240" {...ink} />
        <line x1="260" y1="215" x2="340" y2="215" {...ink} strokeWidth="2.5" />
        <Books x={264} y={215} n={8} />
        <rect x="255" y="268" width="95" height="8" fill="var(--color-house-wood)" {...ink} />
        <line x1="262" y1="276" x2="262" y2="315" {...ink} strokeWidth="2" />
        <line x1="343" y1="276" x2="343" y2="315" {...ink} strokeWidth="2" />
        {/* Open book */}
        <path d="M 282 268 q 10 -6 20 0 q 10 -6 20 0" fill="#F4F1EA" {...ink} />
        <DeskLamp x={334} />
        <Chair x={225} />
      </Tier>

      {/* HIGH: a real library-study — full bookcase, globe, computer, lamp lit, diploma */}
      <Tier show={level === "HIGH"}>
        {/* Bookcase */}
        <rect x="170" y="172" width="52" height="143" fill="var(--color-house-woodDark)" {...ink} />
        {[205, 240, 275, 310].map((y, i) => (
          <g key={y}>
            <line x1="170" y1={y} x2="222" y2={y} {...ink} />
            <Books x={174} y={y} n={7} offset={i} />
          </g>
        ))}
        {/* Window with daylight */}
        <polygon points="245,182 305,182 330,315 230,315" fill="var(--color-house-light)" opacity="0.2" />
        <rect x="245" y="182" width="60" height="50" fill="var(--color-house-light)" opacity="0.4" {...ink} />
        <line x1="275" y1="182" x2="275" y2="232" {...ink} />
        <line x1="245" y1="207" x2="305" y2="207" {...ink} />
        {/* Diploma */}
        <rect x="325" y="188" width="36" height="26" fill="#F4F1EA" {...ink} />
        <line x1="331" y1="197" x2="355" y2="197" {...ink} />
        <line x1="331" y1="203" x2="349" y2="203" {...ink} />
        <circle cx="353" cy="208" r="3" fill="var(--color-house-crack)" />
        {/* Desk */}
        <rect x="240" y="268" width="125" height="9" fill="var(--color-house-wood)" {...ink} />
        <rect x="335" y="277" width="28" height="38" fill="var(--color-house-wood)" {...ink} />
        <line x1="335" y1="290" x2="363" y2="290" {...ink} />
        <line x1="246" y1="277" x2="246" y2="315" {...ink} strokeWidth="2" />
        {/* Computer */}
        <rect x="290" y="236" width="40" height="26" rx="2" fill="var(--color-house-stroke)" />
        <rect className="nha-tv-on" x="293" y="239" width="34" height="20" fill="#9CC3D5" />
        <line x1="310" y1="262" x2="310" y2="268" {...ink} strokeWidth="3" />
        {/* Globe */}
        <circle cx="262" cy="254" r="9" fill="#9CC3D5" {...ink} />
        <path d="M 256 250 q 5 2 4 7 q 5 -1 8 2" fill="none" stroke="var(--color-house-greenery)" strokeWidth="2" />
        <path d="M 262 263 v 5 m -6 0 h 12" {...ink} strokeWidth="2" />
        <DeskLamp x={350} lit />
        <Chair x={262} />
      </Tier>
    </g>
  );
};
