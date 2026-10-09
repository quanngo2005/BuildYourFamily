import React from "react";
import type { TierLevel } from "../deriveHouseState";
import { Tier, ink } from "./Tier";

interface ZoneProps {
  level: TierLevel;
}

// Side-view sofa: back, seat, arms, legs
const Sofa: React.FC<{ x: number; w: number; fill: string; sag?: boolean }> = ({ x, w, fill, sag }) => (
  <g>
    <rect x={x + 6} y={262} width={w - 12} height={26} rx={7} fill={fill} {...ink} />
    {sag ? (
      <path d={`M ${x} 286 q ${w / 2} 10 ${w} 0 v 14 h ${-w} z`} fill={fill} {...ink} />
    ) : (
      <rect x={x} y={284} width={w} height={16} rx={4} fill={fill} {...ink} />
    )}
    <rect x={x - 6} y={274} width={14} height={28} rx={5} fill={fill} {...ink} />
    <rect x={x + w - 8} y={274} width={14} height={28} rx={5} fill={fill} {...ink} />
    <line x1={x + 4} y1={302} x2={x + 4} y2={315} {...ink} strokeWidth="2" />
    <line x1={x + w - 4} y1={302} x2={x + w - 4} y2={315} {...ink} strokeWidth="2" />
  </g>
);

const TvStand: React.FC<{ screen: string; on?: boolean }> = ({ screen, on }) => (
  <g>
    <rect x="560" y="290" width="68" height="25" fill="var(--color-house-woodDark)" {...ink} />
    <line x1="594" y1="290" x2="594" y2="315" {...ink} />
    <rect x="575" y="282" width="38" height="8" fill="var(--color-house-stroke)" />
    <rect x="565" y="244" width="58" height="38" rx="2" fill="var(--color-house-stroke)" />
    <rect className={on ? "nha-tv-on" : undefined} x="568" y="247" width="52" height="32" fill={screen} />
  </g>
);

export const InteriorZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="interior-zone" aria-hidden="true">
      <rect x="380" y="160" width="260" height="160" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />
      <line x1="380" y1="320" x2="640" y2="320" {...ink} />

      {/* LOW: cold, sparse room — saggy old sofa, switched-off TV, cobweb */}
      <Tier show={level === "LOW"}>
        <rect x="565" y="185" width="50" height="45" fill="var(--color-house-foundation)" opacity="0.35" {...ink} />
        <rect x="565" y="185" width="50" height="45" fill="none" {...ink} />
        <path d="M 572 190 l 10 14 l -4 8 l 12 14" fill="none" stroke="var(--color-house-crack)" vectorEffect="non-scaling-stroke" />
        <Sofa x={425} w={90} fill="var(--color-house-foundation)" sag />
        {/* Small boxy old TV on a crate */}
        <rect x="570" y="292" width="45" height="23" fill="var(--color-house-woodLight)" opacity="0.7" {...ink} />
        <rect x="575" y="262" width="36" height="30" rx="3" fill="var(--color-house-foundation)" {...ink} />
        <rect x="579" y="266" width="24" height="22" rx="2" fill="#2f2c29" />
        <path d="M 588 262 l -8 -12 m 8 12 l 8 -12" fill="none" {...ink} />
        {/* Cobweb in the corner */}
        <path d="M 380 160 q 12 6 22 0 M 380 160 q 6 12 0 22 M 380 160 l 18 18 M 386 166 q 6 2 8 -6 M 386 166 q 2 6 -6 8" fill="none" stroke="var(--color-house-stroke)" opacity="0.5" vectorEffect="non-scaling-stroke" />
      </Tier>

      {/* MID: a cosy living room — sofa, TV, framed picture, rug */}
      <Tier show={level === "MID"}>
        <polygon points="565,185 615,185 630,315 545,315" fill="var(--color-house-light)" opacity="0.18" />
        <rect x="565" y="185" width="50" height="45" fill="var(--color-house-light)" opacity="0.35" {...ink} />
        <line x1="590" y1="185" x2="590" y2="230" {...ink} />
        <rect x="562" y="230" width="56" height="4" fill="var(--color-house-wood)" {...ink} />
        {/* Picture frame above the sofa */}
        <rect x="450" y="205" width="44" height="32" fill="#F4F1EA" {...ink} />
        <path d="M 453 233 l 12 -14 l 8 8 l 6 -6 l 12 12 z" fill="var(--color-house-greenery)" opacity="0.8" />
        <Sofa x={415} w={115} fill="var(--color-house-woodLight)" />
        <TvStand screen="#3a3f45" />
        <ellipse cx="480" cy="316" rx="80" ry="3" fill="var(--color-house-crack)" opacity="0.35" />
      </Tier>

      {/* HIGH: warm family living room — cushions, TV on, lamp lit, plant, photos */}
      <Tier show={level === "HIGH"}>
        <polygon points="565,185 615,185 635,315 540,315" fill="var(--color-house-light)" opacity="0.3" />
        <rect x="565" y="185" width="50" height="45" fill="var(--color-house-light)" opacity="0.55" {...ink} />
        <line x1="590" y1="185" x2="590" y2="230" {...ink} />
        <line x1="565" y1="207" x2="615" y2="207" {...ink} />
        <rect x="562" y="230" width="56" height="4" fill="var(--color-house-wood)" {...ink} />
        {/* Pendant lamp */}
        <line x1="505" y1="160" x2="505" y2="182" {...ink} />
        <polygon points="493,192 517,192 511,182 499,182" fill="var(--color-house-wood)" {...ink} />
        <circle className="nha-lamp-glow" cx="505" cy="196" r="14" fill="var(--color-house-light)" opacity="0.5" />
        {/* Family photo frames */}
        <rect x="430" y="205" width="30" height="36" fill="#F4F1EA" {...ink} />
        <circle cx="440" cy="219" r="4" fill="var(--color-house-wood)" />
        <circle cx="451" cy="221" r="3" fill="var(--color-house-crack)" />
        <path d="M 434 237 q 6 -10 12 0 q 5 -8 10 0" fill="var(--color-house-greenery)" />
        <rect x="470" y="212" width="40" height="28" fill="#F4F1EA" {...ink} />
        <path d="M 474 236 q 8 -12 16 0 q 6 -9 14 0" fill="var(--color-house-wood)" />
        <Sofa x={410} w={120} fill="var(--color-house-greenery)" />
        {/* Cushions */}
        <rect x="420" y="268" width="22" height="18" rx="5" fill="var(--color-house-light)" {...ink} />
        <rect x="498" y="268" width="22" height="18" rx="5" fill="var(--color-house-crack)" opacity="0.85" {...ink} />
        {/* Floor lamp */}
        <line x1="392" y1="232" x2="392" y2="315" {...ink} strokeWidth="2" />
        <line x1="384" y1="315" x2="400" y2="315" {...ink} strokeWidth="2" />
        <polygon points="383,232 401,232 397,216 387,216" fill="var(--color-house-light)" {...ink} />
        <circle className="nha-lamp-glow" cx="392" cy="236" r="12" fill="var(--color-house-light)" opacity="0.45" />
        <TvStand screen="#9CC3D5" on />
        {/* Plant */}
        <rect x="538" y="298" width="16" height="17" fill="var(--color-house-woodLight)" {...ink} />
        <path d="M 546 298 q -14 -10 -8 -24 q 6 10 8 24 q 2 -16 10 -24 q 4 14 -10 24" fill="var(--color-house-greenery)" {...ink} />
        <ellipse cx="478" cy="316" rx="88" ry="3.5" fill="var(--color-house-crack)" opacity="0.5" />
      </Tier>
    </g>
  );
};
