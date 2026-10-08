import { useState } from "react";
import { useGame } from "../../game/GameContext";
import { selectProfileCategory, selectStrongestAndWeakest } from "../../game/selectors";
import { AppShell, PrimaryAction, ConfirmDialog } from "../../components/common";
import { HouseCanvas } from "../../components/house/HouseCanvas";
import { deriveHouseState } from "../../house/deriveHouseState";
import type { Dimension } from "../../game/types";
import "./FinalScreen.css";

const DIMENSION_LABEL_VI: Record<Dimension, string> = {
  economy: "Kinh tế",
  education: "Chăm sóc & Giáo dục",
  equality: "Bình đẳng",
  emotion: "Tình cảm",
};

export function FinalScreen() {
  const { state, dispatch } = useGame();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const category = selectProfileCategory(state.scores);
  const { strongest, weakest } = selectStrongestAndWeakest(state.scores);
  const houseData = deriveHouseState(state.scores, state.history);

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setIsConfirmOpen(false);
  };

  return (
    <AppShell>
      <header className="nha-final-header">
        <h2 className="nha-final-title">Hồ sơ Gia đình</h2>
        <p className="nha-final-category">{category}</p>
      </header>

      <HouseCanvas levels={houseData.levels} marks={houseData.marks} />

      <section className="nha-flavor-text">
        <p>
          {category === "Tiến bộ" && "Ngôi nhà tiến bộ, vững chãi và tràn ngập sự gắn kết."}
          {category === "Chuyển mình" && "Ngôi nhà đang chuyển mình"}
          {category === "Vết nứt" && "Ngôi nhà còn nhiều vết nứt cần gia cố"}
        </p>
      </section>

      <section className="nha-final-scores">
        <h3 className="nha-scores-heading">Điểm nền tảng</h3>
        <ul className="nha-family-score-list">
          {(["economy", "education", "equality", "emotion"] as Dimension[]).map((dim) => (
            <li key={dim} className="nha-family-score-item">
              <span className="nha-family-score-name">{DIMENSION_LABEL_VI[dim]}</span>
              <span className="nha-family-score-value">{state.scores[dim]}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="nha-final-highlights">
        <div className="nha-highlight-row">
          <span className="nha-highlight-label">Điểm mạnh nhất</span>
          <span className="nha-highlight-value">{DIMENSION_LABEL_VI[strongest]}</span>
        </div>
        <div className="nha-highlight-row">
          <span className="nha-highlight-label">Cần lưu tâm nhất</span>
          <span className="nha-highlight-value">{DIMENSION_LABEL_VI[weakest]}</span>
        </div>
      </section>

      <footer className="nha-disclaimer">
        <p>Family Score chỉ là cơ chế trò chơi, không phải thước đo thực tế.</p>
      </footer>

      <div className="nha-final-actions">
        <PrimaryAction label="Chơi lại từ đầu" onClick={() => setIsConfirmOpen(true)} />
      </div>

      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onConfirm={handleReset}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </AppShell>
  );
}
