import { useRef } from "react";
import { useGame } from "../../game/GameContext";
import { SCENARIOS } from "../../content/scenarios";
import { DELTAS } from "../../content/deltas";
import { SCENARIO_ORDER } from "../../game/reducer";
import { AppShell, ProgressIndicator, PrimaryAction } from "../../components/common";
import { HouseCanvas, HouseLegend } from "../../components/house/HouseCanvas";
import { AnnotationOverlay, type AnnotationItem } from "../../components/shared/AnnotationOverlay";
import { deriveHouseState } from "../../house/deriveHouseState";
import { useHouseGeometry } from "../../house/useHouseGeometry";
import { useReveal } from "../../motion/useReveal";
import type { Dimension } from "../../game/types";
import "./FeedbackScreen.css";

export function FeedbackScreen() {
  const { state, setUiScreen } = useGame();
  const houseContainerRef = useRef<HTMLDivElement>(null);
  
  const scenario = SCENARIOS[state.currentScenario];
  const choiceId = state.history[state.currentScenario];
  const choice = choiceId ? scenario?.choices[choiceId] : undefined;
  
  const currentIndex = SCENARIO_ORDER.indexOf(state.currentScenario) + 1;
  const total = SCENARIO_ORDER.length;

  const houseData = deriveHouseState(state.scores, state.history);
  const { size, isLeaderMode } = useHouseGeometry(houseContainerRef);
  const { revealState } = useReveal(state.currentScenario);
  const isRevealing = revealState === "revealing";

  if (!scenario || !choice || !choiceId) return null;

  const delta = DELTAS[state.currentScenario][choiceId] || {};
  const annotations: AnnotationItem[] = (Object.keys(delta) as Dimension[])
    .filter((dim) => (delta[dim] || 0) !== 0)
    .map((dim) => ({
      dimension: dim,
      delta: delta[dim] || 0,
    }));

  return (
    <AppShell wide>
      <header className="nha-scenario-header">
        <h2 className="nha-scenario-title">Hậu quả</h2>
        <ProgressIndicator current={currentIndex} total={total} />
      </header>

      <div className="nha-scenario-split">
        <aside className="nha-scenario-house" aria-label="Ngôi nhà sau lựa chọn">
          {/* House Canvas with Annotation Overlay (legend kept outside the measured box) */}
          <div ref={houseContainerRef} className="nha-feedback-house-container">
            <HouseCanvas
              levels={houseData.levels}
              marks={houseData.marks}
              emphasizedMark={state.currentScenario}
              revealState={revealState}
              deltas={delta}
              showLegend={false}
            />
            <AnnotationOverlay
              annotations={annotations}
              containerSize={size}
              isLeaderMode={isLeaderMode}
              animate={isRevealing}
            />
          </div>
          <HouseLegend
            levels={houseData.levels}
            activeDims={isRevealing ? annotations.map((a) => a.dimension) : []}
          />
        </aside>

        <div className="nha-scenario-content">
          <section className="nha-consequence">
            <p className="nha-consequence-narrative">{choice.consequence}</p>
            <p className="nha-consequence-feedback">{choice.feedback}</p>
          </section>

          <div className="nha-feedback-actions">
            <PrimaryAction 
              label="Khám phá tri thức" 
              onClick={() => setUiScreen("knowledge")} 
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
