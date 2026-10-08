import { useState } from "react";
import { useGame } from "../../game/GameContext";
import { SCENARIOS } from "../../content/scenarios";
import { SCENARIO_ORDER } from "../../game/reducer";
import { AppShell, ProgressIndicator, ChoiceCard } from "../../components/common";
import { HouseCanvas } from "../../components/house/HouseCanvas";
import { deriveHouseState } from "../../house/deriveHouseState";
import { setPendingReveal } from "../../motion/revealStore";
import type { ChoiceId } from "../../game/types";
import "./ChoosingScreen.css";

export function ChoosingScreen() {
  const { state, dispatch } = useGame();
  const [isLocked, setIsLocked] = useState(false);
  
  const scenario = SCENARIOS[state.currentScenario];
  const currentIndex = SCENARIO_ORDER.indexOf(state.currentScenario) + 1;
  const total = SCENARIO_ORDER.length;

  const houseData = deriveHouseState(state.scores, state.history);

  const handleSelectChoice = (choiceId: ChoiceId) => {
    if (isLocked) return;
    setIsLocked(true);

    // Record pending reveal with current levels for crossfade
    setPendingReveal(state.currentScenario, houseData.levels);

    dispatch({
      type: "SELECT_CHOICE",
      payload: { scenarioId: state.currentScenario, choiceId }
    });
  };

  if (!scenario) return null;

  return (
    <AppShell>
      <header className="nha-scenario-header">
        <h2 className="nha-scenario-title">{scenario.title}</h2>
        <ProgressIndicator current={currentIndex} total={total} />
      </header>

      <HouseCanvas levels={houseData.levels} marks={houseData.marks} />

      <section className="nha-scenario-context">
        <p>{scenario.context}</p>
      </section>

      <section className="nha-decision-section">
        <h3 id="decision-prompt" className="nha-decision-prompt">{scenario.question}</h3>
        <div className="nha-choice-list" role="group" aria-labelledby="decision-prompt">
          {(["A", "B", "C"] as ChoiceId[]).map((c) => (
            <ChoiceCard
              key={c}
              label={c}
              text={scenario.choices[c].text}
              state={isLocked ? "disabled" : "default"}
              onClick={() => handleSelectChoice(c)}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
