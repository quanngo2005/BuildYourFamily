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
import { ZoneImpactLayer, impactClassFor, type ImpactDeltas } from "../../house/effects/ZoneImpactLayer";
import { HouseBackdrop, HouseDepthOverlay } from "../../house/HouseBackdrop";
import {
  HouseRoleLabels,
  ROLE_TAGS,
  DIMENSION_COLOR,
  DIMENSION_ICON,
  DIMENSION_LABEL_VI,
  TIER_LABEL_VI,
} from "../../house/HouseRoleLabels";
import "./HouseCanvas.css";

const LEGEND_ORDER: Dimension[] = ["economy", "education", "equality", "emotion"];

export interface HouseCanvasProps {
  levels?: Record<Dimension, TierLevel>;
  marks?: DerivedMark[];
  emphasizedMark?: string; // scenarioId to emphasize (at Feedback)
  revealState?: "static" | "revealing";
  deltas?: ImpactDeltas; // score changes animated on the house while revealing
  showLabels?: boolean; // role tags on each part of the house
  showLegend?: boolean; // legend explaining what each part represents
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
  deltas,
  showLabels = false,
  showLegend = true,
  className = "",
}) => {
  const a11yDescription = generateHouseDescription({ levels, marks });
  const isRevealing = revealState === "revealing";
  const activeDims = isRevealing && deltas
    ? LEGEND_ORDER.filter((d) => (deltas[d] ?? 0) !== 0)
    : [];
  const fx = (dim: Dimension) => (isRevealing ? impactClassFor(deltas, dim) : undefined);

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

        {/* 0. Sky, ground, scenery */}
        <HouseBackdrop />

        {/* 1. Structure / Outer framing & roof */}
        <g className={fx("equality")}>
          <StructureZone level={levels.equality} />
        </g>

        {/* 2. Foundation (Economy) */}
        <g className={fx("economy")}>
          <FoundationZone level={levels.economy} />
        </g>

        {/* 3. Rooms: Study (Education), Kitchen (Economy), Interior (Emotion) */}
        <g className={fx("education")}>
          <StudyZone level={levels.education} />
        </g>
        <g className={fx("economy")}>
          <KitchenZone level={levels.economy} />
        </g>
        <g className={fx("emotion")}>
          <InteriorZone level={levels.emotion} />
        </g>

        {/* 4. Main Entry Door (Equality) */}
        <g className={fx("equality")}>
          <DoorZone level={levels.equality} />
        </g>

        {/* Soft lighting / depth over the house body */}
        <HouseDepthOverlay />

        {/* Role tags: what each part of the house stands for */}
        {showLabels && <HouseRoleLabels levels={levels} activeDims={activeDims} />}

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

        {/* 6. Damage / upgrade effects and floating score deltas */}
        {isRevealing && deltas && <ZoneImpactLayer deltas={deltas} />}
      </svg>

      {showLegend && (
        <ul className="nha-house-legend" aria-label="Ý nghĩa các phần của ngôi nhà">
          {LEGEND_ORDER.map((dim) => {
            const parts = ROLE_TAGS.filter((t) => t.dim === dim).map((t) => t.name).join(" & ");
            return (
              <li
                key={dim}
                className={`nha-house-legend-item level-${levels[dim].toLowerCase()} ${activeDims.includes(dim) ? "is-active" : ""}`}
                style={{ "--tag-color": DIMENSION_COLOR[dim] } as React.CSSProperties}
              >
                <span className="nha-legend-icon" aria-hidden="true">{DIMENSION_ICON[dim]}</span>
                <span className="nha-legend-text">
                  <strong>{DIMENSION_LABEL_VI[dim]}</strong>
                  <small>{parts}</small>
                </span>
                <span className="nha-legend-level">{TIER_LABEL_VI[levels[dim]]}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
