import React from "react";

// Scenery drawn behind the house: sky, sun, hills, ground, tree, chimney.
export const HouseBackdrop: React.FC = () => (
  <g className="nha-house-backdrop" aria-hidden="true">
    <defs>
      <linearGradient id="nha-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F3E9D6" />
        <stop offset="100%" stopColor="#FAF6EE" />
      </linearGradient>
      <linearGradient id="nha-earth" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#9C8B76" />
        <stop offset="100%" stopColor="#6E6152" />
      </linearGradient>
      <radialGradient id="nha-sun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0%" stopColor="var(--color-house-light)" stopOpacity="0.9" />
        <stop offset="60%" stopColor="var(--color-house-light)" stopOpacity="0.35" />
        <stop offset="100%" stopColor="var(--color-house-light)" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="nha-depth" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#000" stopOpacity="0.07" />
        <stop offset="45%" stopColor="#fff" stopOpacity="0.05" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.1" />
      </linearGradient>
    </defs>

    {/* Sky */}
    <rect x="0" y="0" width="800" height="500" rx="12" fill="url(#nha-sky)" />
    <circle className="nha-sun" cx="690" cy="75" r="60" fill="url(#nha-sun)" />
    <circle cx="690" cy="75" r="18" fill="var(--color-house-light)" opacity="0.85" />

    {/* Clouds */}
    <g className="nha-cloud" fill="#fff" opacity="0.8">
      <ellipse cx="110" cy="80" rx="34" ry="10" />
      <ellipse cx="132" cy="72" rx="20" ry="10" />
    </g>
    <g className="nha-cloud nha-cloud-slow" fill="#fff" opacity="0.65">
      <ellipse cx="560" cy="40" rx="28" ry="8" />
      <ellipse cx="578" cy="34" rx="15" ry="8" />
    </g>

    {/* Distant hills */}
    <path d="M 0 500 Q 120 410 260 470 T 520 455 T 800 440 L 800 500 Z" fill="var(--color-house-greenery)" opacity="0.22" />

    {/* Chimney (behind the roof) */}
    <rect x="520" y="78" width="26" height="60" fill="var(--color-house-foundation)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />
    <rect x="515" y="72" width="36" height="8" fill="var(--color-house-woodDark)" stroke="var(--color-house-stroke)" vectorEffect="non-scaling-stroke" />

    {/* Tree on the left */}
    <rect x="86" y="420" width="10" height="80" fill="var(--color-house-woodDark)" />
    <circle cx="91" cy="405" r="30" fill="var(--color-house-greenery)" opacity="0.9" />
    <circle cx="74" cy="425" r="18" fill="var(--color-house-greenery)" opacity="0.75" />
    <circle cx="110" cy="422" r="20" fill="var(--color-house-greenery)" opacity="0.8" />

    {/* Bush on the right */}
    <circle cx="690" cy="490" r="16" fill="var(--color-house-greenery)" opacity="0.85" />
    <circle cx="712" cy="494" r="11" fill="var(--color-house-greenery)" opacity="0.7" />

    {/* Ground cross-section */}
    <rect x="0" y="500" width="800" height="100" rx="8" fill="url(#nha-earth)" opacity="0.55" />
    <rect x="0" y="497" width="800" height="6" fill="var(--color-house-greenery)" opacity="0.7" />

    {/* Ground shadow under the house */}
    <ellipse cx="400" cy="503" rx="290" ry="9" fill="#000" opacity="0.12" />
  </g>
);

// Subtle side shading laid over the rooms so the house reads with depth
export const HouseDepthOverlay: React.FC = () => (
  <rect
    className="nha-house-depth"
    x="160"
    y="160"
    width="480"
    height="340"
    fill="url(#nha-depth)"
    pointerEvents="none"
    aria-hidden="true"
  />
);
