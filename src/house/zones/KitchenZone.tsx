import React from "react";
import type { TierLevel } from "../deriveHouseState";
import { Tier, ink } from "./Tier";

interface ZoneProps {
  level: TierLevel;
}

// Counter run with stove, oven, sink and upper cabinets (MID & HIGH)
const KitchenCounter: React.FC = () => (
  <g>
    {/* Range hood */}
    <rect x="558" y="345" width="14" height="25" fill="var(--color-house-foundation)" {...ink} />
    <polygon points="545,370 585,370 595,390 535,390" fill="var(--color-house-foundation)" {...ink} />
    {/* Upper cabinets */}
    <rect x="470" y="345" width="60" height="40" fill="var(--color-house-wood)" {...ink} />
    <line x1="500" y1="345" x2="500" y2="385" {...ink} />
    <circle cx="496" cy="375" r="1.5" fill="var(--color-house-stroke)" />
    <circle cx="504" cy="375" r="1.5" fill="var(--color-house-stroke)" />
    {/* Lower cabinets */}
    <rect x="470" y="440" width="150" height="60" fill="var(--color-house-wood)" {...ink} />
    <rect x="476" y="448" width="28" height="44" fill="none" {...ink} />
    <rect x="508" y="448" width="28" height="44" fill="none" {...ink} />
    <circle cx="500" cy="470" r="1.5" fill="var(--color-house-stroke)" />
    <circle cx="512" cy="470" r="1.5" fill="var(--color-house-stroke)" />
    {/* Oven with window */}
    <rect x="540" y="448" width="50" height="44" fill="var(--color-house-woodDark)" {...ink} />
    <line x1="546" y1="455" x2="584" y2="455" {...ink} strokeWidth="2" />
    <rect x="547" y="462" width="36" height="20" rx="2" fill="#3a3530" {...ink} />
    <circle cx="598" cy="455" r="2.5" fill="var(--color-house-wall)" {...ink} />
    <circle cx="610" cy="455" r="2.5" fill="var(--color-house-wall)" {...ink} />
    {/* Countertop */}
    <rect x="465" y="434" width="160" height="7" fill="var(--color-house-woodDark)" {...ink} />
    {/* Sink + faucet */}
    <rect x="482" y="433" width="36" height="4" fill="var(--color-house-wall)" {...ink} />
    <path d="M 500 434 L 500 418 Q 500 412 507 412 L 512 412 L 512 417" fill="none" {...ink} strokeWidth="2" />
    {/* Burners */}
    <ellipse cx="555" cy="433" rx="9" ry="1.8" fill="#3a3530" />
    <ellipse cx="580" cy="433" rx="9" ry="1.8" fill="#3a3530" />
    {/* Pot on the stove */}
    <rect x="545" y="414" width="22" height="18" rx="2" fill="var(--color-house-foundation)" {...ink} />
    <line x1="543" y1="414" x2="569" y2="414" {...ink} strokeWidth="2" />
    <line x1="540" y1="420" x2="545" y2="420" {...ink} />
    <line x1="567" y1="420" x2="572" y2="420" {...ink} />
    <circle cx="556" cy="411" r="2" fill="var(--color-house-stroke)" />
  </g>
);

const Steam: React.FC<{ x: number; y: number; count: number }> = ({ x, y, count }) => (
  <g className="nha-steam" fill="none" stroke="#B9B2A6" strokeWidth="2" strokeLinecap="round">
    {Array.from({ length: count }, (_, i) => (
      <path
        key={i}
        style={{ animationDelay: `${i * 0.6}s` }}
        d={`M ${x + i * 7} ${y} q -5 -7 0 -14 q 5 -7 0 -14`}
      />
    ))}
  </g>
);

export const KitchenZone: React.FC<ZoneProps> = ({ level }) => {
  return (
    <g className="kitchen-zone" aria-hidden="true">
      {/* Background wall with tiled backsplash */}
      <rect x="380" y="320" width="260" height="180" fill="var(--color-house-wall)" vectorEffect="non-scaling-stroke" />
      <line x1="380" y1="500" x2="640" y2="500" {...ink} />

      {/* LOW: a bare corner — tiny cabinet, a single-burner stove, a water jar */}
      <Tier show={level === "LOW"}>
        <line x1="520" y1="385" x2="600" y2="385" {...ink} />
        <path d="M 540 385 l 3 -10 h 8 l 3 10" fill="var(--color-house-wall)" {...ink} />
        <rect x="520" y="455" width="80" height="45" fill="var(--color-house-woodLight)" opacity="0.7" {...ink} />
        <line x1="560" y1="455" x2="560" y2="500" {...ink} />
        <rect x="532" y="440" width="40" height="15" fill="var(--color-house-foundation)" {...ink} />
        <ellipse cx="552" cy="440" rx="9" ry="1.8" fill="#3a3530" />
        <rect x="543" y="424" width="18" height="15" rx="2" fill="var(--color-house-foundation)" {...ink} />
        <line x1="541" y1="424" x2="563" y2="424" {...ink} strokeWidth="2" />
        {/* Clay water jar */}
        <path d="M 412 500 q -14 -22 2 -38 h 16 q 16 16 2 38 z" fill="var(--color-house-wood)" opacity="0.8" {...ink} />
        <rect x="414" y="456" width="16" height="6" fill="var(--color-house-woodDark)" {...ink} />
      </Tier>

      {/* MID: a working kitchen — counter, stove, oven, sink, cabinets */}
      <Tier show={level === "MID"}>
        <KitchenCounter />
        <Steam x={552} y={406} count={1} />
      </Tier>

      {/* HIGH: a busy family kitchen — fridge, steaming pot, utensils, fruit */}
      <Tier show={level === "HIGH"}>
        <KitchenCounter />
        <rect x="600" y="345" width="30" height="40" fill="var(--color-house-wood)" {...ink} />
        <Steam x={549} y={406} count={3} />
        {/* Fridge */}
        <rect x="392" y="380" width="50" height="120" rx="4" fill="#F4F1EA" {...ink} />
        <line x1="392" y1="420" x2="442" y2="420" {...ink} />
        <line x1="435" y1="395" x2="435" y2="410" {...ink} strokeWidth="2" />
        <line x1="435" y1="430" x2="435" y2="455" {...ink} strokeWidth="2" />
        <circle cx="405" cy="440" r="3" fill="var(--color-house-crack)" />
        <rect x="412" y="445" width="8" height="6" fill="var(--color-house-light)" />
        {/* Plant on the fridge */}
        <rect x="408" y="368" width="14" height="12" fill="var(--color-house-woodLight)" {...ink} />
        <circle cx="415" cy="362" r="8" fill="var(--color-house-greenery)" {...ink} />
        {/* Hanging utensils */}
        <line x1="470" y1="395" x2="530" y2="395" {...ink} strokeWidth="2" />
        <path d="M 480 395 v 14 m -4 0 a 4 4 0 0 0 8 0 z" fill="var(--color-house-foundation)" {...ink} />
        <path d="M 495 395 v 18" {...ink} strokeWidth="2" />
        <path d="M 491 413 h 8" {...ink} strokeWidth="2" />
        <path d="M 510 395 v 10 m -5 0 h 10 l -2 8 h -6 z" fill="var(--color-house-foundation)" {...ink} />
        {/* Fruit bowl on counter */}
        <path d="M 595 433 q 12 8 24 0 z" fill="var(--color-house-woodLight)" {...ink} />
        <circle cx="602" cy="429" r="4" fill="var(--color-house-crack)" />
        <circle cx="611" cy="428" r="4" fill="var(--color-house-light)" />
      </Tier>
    </g>
  );
};
