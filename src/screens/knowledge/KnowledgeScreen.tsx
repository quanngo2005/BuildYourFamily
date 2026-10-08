import { useGame } from "../../game/GameContext";
import { SCENARIOS } from "../../content/scenarios";
import { KNOWLEDGE_ITEMS } from "../../content/knowledge";
import { SCENARIO_ORDER } from "../../game/reducer";
import { AppShell, ProgressIndicator, PrimaryAction } from "../../components/common";
import "./KnowledgeScreen.css";

export function KnowledgeScreen() {
  const { state, dispatch, setUiScreen } = useGame();
  
  const scenario = SCENARIOS[state.currentScenario];
  const choiceId = state.history[state.currentScenario];
  const choice = choiceId ? scenario?.choices[choiceId] : undefined;
  
  const currentIndex = SCENARIO_ORDER.indexOf(state.currentScenario) + 1;
  const total = SCENARIO_ORDER.length;

  if (!scenario || !choice) return null;

  const knowledgeItems = (choice.relatedKnowledgeIds || []).map(id => KNOWLEDGE_ITEMS[id]).filter(Boolean);

  const handleContinue = () => {
    dispatch({ type: "CONTINUE" });
    setUiScreen("feedback"); // reset for next time
  };

  const isFinal = state.currentScenario === "S07";

  return (
    <AppShell>
      <header className="nha-scenario-header">
        <h2 className="nha-scenario-title">Kiến thức</h2>
        <ProgressIndicator current={currentIndex} total={total} />
      </header>

      <section className="nha-knowledge-content">
        <p className="nha-knowledge-intro">
          Lựa chọn vừa rồi của bạn liên quan đến các khái niệm cốt lõi sau:
        </p>

        {knowledgeItems.map(item => (
          <article key={item.id} className="nha-knowledge-card">
            <h3 className="nha-knowledge-title">{item.title}</h3>
            <p className="nha-knowledge-text">{item.content}</p>
          </article>
        ))}
      </section>

      <div className="nha-knowledge-actions">
        <PrimaryAction 
          label={isFinal ? "Xem ngôi nhà" : "Tiếp tục"} 
          onClick={handleContinue} 
        />
      </div>
    </AppShell>
  );
}
