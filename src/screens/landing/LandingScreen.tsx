import { useState } from "react";
import { useGame } from "../../game/GameContext";
import { AppShell, PrimaryAction, ConfirmDialog } from "../../components/common";
import { HouseCanvas } from "../../components/house/HouseCanvas";
import "./LandingScreen.css";

export function LandingScreen() {
  const { state, dispatch } = useGame();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Check if there is resumable progress
  const hasResumableProgress =
    state.completed.length > 0 ||
    Object.keys(state.history).length > 0 ||
    (state.currentScenario !== "S01" && state.phase !== "landing");

  const handleStart = () => {
    dispatch({ type: "START" });
  };

  const handleResume = () => {
    dispatch({ type: "RESUME" });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
    setIsConfirmOpen(false);
  };

  return (
    <AppShell>
      <div className="nha-landing-page">
        {/* Editorial Top Eyebrow */}
        <header className="nha-landing-header" role="banner">
          <p className="nha-landing-eyebrow">Trải nghiệm tương tác học thuật</p>
          <h1 className="nha-landing-title">NHÀ</h1>
          <p className="nha-landing-tagline">
            “Một gia đình được xây bằng những lựa chọn.”
          </p>
          <div className="nha-landing-divider" aria-hidden="true" />
        </header>

        {/* Visual Anchor: HouseCanvas at base state */}
        <section className="nha-landing-visual-section" aria-label="Mặt cắt kiến trúc ban đầu">
          <div className="nha-landing-canvas-container">
            <HouseCanvas
              levels={{
                economy: "MID",
                education: "MID",
                equality: "MID",
                emotion: "MID",
              }}
              marks={[]}
            />
          </div>
          <p className="nha-landing-caption">
            Bản vẽ mặt cắt cấu trúc gia đình — Khởi điểm cân bằng trước 7 tình huống quyết định
          </p>
        </section>

        {/* Concept Statement & 4 Pillars Architecture */}
        <section className="nha-landing-concept" aria-labelledby="landing-concept-title">
          <h2 id="landing-concept-title" className="sr-only">Ý niệm xây dựng gia đình</h2>
          <p className="nha-landing-metaphor">
            Ngôi nhà gia đình không tự nhiên kiên cố. Mỗi quyết định đời sống bạn đưa ra là một viên gạch đắp nền, 
            một vì kèo cân bằng kết cấu, hay một vạt nắng ấm sưởi ấm gian phòng.
          </p>

          <div className="nha-landing-pillars" role="list" aria-label="Bốn trụ cột gia đình">
            <div className="nha-pillar-item" role="listitem">
              <span className="nha-pillar-zone">Nền móng & Bếp</span>
              <strong className="nha-pillar-name">Kinh tế</strong>
              <span className="nha-pillar-desc">Cơ sở vật chất & bình đẳng sinh kế</span>
            </div>
            <div className="nha-pillar-item" role="listitem">
              <span className="nha-pillar-zone">Phòng học</span>
              <strong className="nha-pillar-name">Giáo dục</strong>
              <span className="nha-pillar-desc">Hình thành nhân cách & trao truyền tri thức</span>
            </div>
            <div className="nha-pillar-item" role="listitem">
              <span className="nha-pillar-zone">Khung nhà & Cửa chính</span>
              <strong className="nha-pillar-name">Bình đẳng</strong>
              <span className="nha-pillar-desc">Cân bằng quyền hạn & tự do pháp lý</span>
            </div>
            <div className="nha-pillar-item" role="listitem">
              <span className="nha-pillar-zone">Ánh sáng nội thất</span>
              <strong className="nha-pillar-name">Tình cảm</strong>
              <span className="nha-pillar-desc">Gắn kết tâm lý & trách nhiệm yêu thương</span>
            </div>
          </div>
        </section>

        {/* Primary Action / Resume Flow */}
        <div className="nha-landing-actions-wrapper">
          {hasResumableProgress ? (
            <div className="nha-resume-group">
              <div className="nha-resume-status" role="status">
                <span>Tiến trình lưu: </span>
                <strong>{state.currentScenario}</strong>
                <span> · {state.completed.length}/7 tình huống hoàn thành</span>
              </div>
              <PrimaryAction label="Tiếp tục hành trình" onClick={handleResume} />
              <button 
                type="button"
                className="nha-reset-button"
                onClick={() => setIsConfirmOpen(true)}
              >
                Chơi lại từ đầu
              </button>
            </div>
          ) : (
            <div className="nha-start-group">
              <PrimaryAction label="Bắt đầu" onClick={handleStart} />
              <p className="nha-action-note">7 tình huống · Quyết định commit một lần · Nhìn nhận hậu quả</p>
            </div>
          )}
        </div>

        {/* Academic Source Footer */}
        <footer className="nha-landing-footer" role="contentinfo">
          <div className="nha-footer-line" aria-hidden="true" />
          <p className="nha-footer-curriculum">
            Chủ nghĩa xã hội khoa học — Chương 7: Vấn đề gia đình trong thời kỳ quá độ lên chủ nghĩa xã hội
          </p>
          <div className="nha-footer-links">
            <span>Dựa trên chuẩn học thuật CK_FAM_01 → CK_FAM_18</span>
            <span aria-hidden="true">·</span>
            <a href="#sandbox" className="nha-sandbox-link" title="Mở trang kiểm thử mô phỏng kiến trúc">
              Bản vẽ mô phỏng (Sandbox)
            </a>
          </div>
        </footer>
      </div>

      {/* SCR-07: Reset Confirmation Dialog */}
      <ConfirmDialog 
        isOpen={isConfirmOpen}
        onConfirm={handleReset}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </AppShell>
  );
}
