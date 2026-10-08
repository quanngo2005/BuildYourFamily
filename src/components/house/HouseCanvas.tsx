import React from "react";
import type { Dimension } from "../../game/types";
import type { TierLevel, DerivedMark } from "../../house/deriveHouseState";
import { generateHouseDescription } from "../../house/houseA11y";
import { HOUSE_VIEWBOX } from "../../house/geometry";
import { FoundationZone } from "../../house/zones/FoundationZone";
import { KitchenZone } from "../../house/zones/KitchenZone";
import { StudyZone } from "../../house/zones/StudyZone";
import { DoorZone } from "../../house/zones/DoorZone";
import { InteriorZone } from "../../house/zones/InteriorZone";
import { StructureZone } from "../../house/zones/StructureZone";
import { ChoiceMark } from "../../house/marks/ChoiceMark";
import "./HouseCanvas.css";

export interface HouseCanvasProps {
  levels?: Record<Dimension, TierLevel>;
  marks?: DerivedMark[];
  emphasizedMark?: string; // scenarioId to emphasize (at Feedback)
  revealState?: "static" | "revealing";
  className?: string;
}

const DEFAULT_LEVELS: Record<Dimension, TierLevel> = {
  economy: "MID",
  education: "MID",
  equality: "MID",
  emotion: "MID",
};

export const HouseCanvas: React.FC<HouseCanvasProps> = ({
  levels = DEFAULT_LEVELS,
  marks = [],
  emphasizedMark,
  revealState = "static",
  className = "",
}) => {
  const a11yDescription = generateHouseDescription({ levels, marks });

  return (
    <div className={`nha-house-canvas-wrapper ${className}`}>
      <svg
        viewBox={HOUSE_VIEWBOX.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`nha-house-svg state-${revealState}`}
        role="img"
        aria-labelledby="house-title house-desc"
      >
        <title id="house-title">Mặt cắt kiến trúc ngôi nhà gia đình</title>
        <desc id="house-desc">{a11yDescription}</desc>

        {/* 1. Structure / Outer framing & roof */}
        <StructureZone level={levels.equality} />

        {/* 2. Foundation (Economy) */}
        <FoundationZone level={levels.economy} />

        {/* 3. Rooms: Study (Education), Kitchen (Economy), Interior (Emotion) */}
        <StudyZone level={levels.education} />
        <KitchenZone level={levels.economy} />
        <InteriorZone level={levels.emotion} />

        {/* 4. Main Entry Door (Equality) */}
        <DoorZone level={levels.equality} />

        {/* 5. Choice Marks according to assigned slot */}
        <g className="nha-house-marks-layer">
          {marks.map((mark) => (
            <ChoiceMark
              key={`${mark.scenarioId}-${mark.zone}-${mark.slot}`}
              zone={mark.zone}
              kind={mark.kind}
              slot={mark.slot}
              isEmphasized={mark.scenarioId === emphasizedMark}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
