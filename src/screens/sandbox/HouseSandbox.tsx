import { useState } from "react";
import type { ImpactDeltas } from "../../house/effects/ZoneImpactLayer";
import { HouseCanvas } from "../../components/house/HouseCanvas";
import type { Dimension, Zone, Kind } from "../../game/types";
import type { TierLevel, DerivedMark } from "../../house/deriveHouseState";
import "./HouseSandbox.css";

const DIMENSIONS: Dimension[] = ["economy", "education", "equality", "emotion"];
const TIERS: TierLevel[] = ["LOW", "MID", "HIGH"];

export function HouseSandbox() {
  const [levels, setLevels] = useState<Record<Dimension, TierLevel>>({
    economy: "MID",
    education: "MID",
    equality: "MID",
    emotion: "MID",
  });

  const [marks, setMarks] = useState<DerivedMark[]>([]);
  const [viewportWidth, setViewportWidth] = useState<"360px" | "768px" | "100%">("100%");
  const [fx, setFx] = useState<{ deltas: ImpactDeltas; key: number } | null>(null);

  const playFx = (deltas: ImpactDeltas) => {
    const key = Date.now();
    setFx({ deltas, key });
    window.setTimeout(() => setFx((cur) => (cur?.key === key ? null : cur)), 1900);
  };
  const [emphasizedMark, setEmphasizedMark] = useState<string | undefined>(undefined);

  const handleTierChange = (dim: Dimension, tier: TierLevel) => {
    setLevels((prev) => ({ ...prev, [dim]: tier }));
  };

  const setAllTiers = (tier: TierLevel) => {
    setLevels({
      economy: tier,
      education: tier,
      equality: tier,
      emotion: tier,
    });
  };

  const addMark = (zone: Zone, kind: Kind) => {
    // Determine slot
    const countInZone = marks.filter((m) => m.zone === zone).length;
    if (countInZone >= 3) {
      alert(`Zone ${zone} already has maximum 3 marks!`);
      return;
    }
    const newMark: DerivedMark = {
      scenarioId: `M${marks.length + 1}`,
      zone,
      kind,
      slot: countInZone,
    };
    setMarks((prev) => [...prev, newMark]);
    setEmphasizedMark(newMark.scenarioId);
  };

  const clearMarks = () => {
    setMarks([]);
    setEmphasizedMark(undefined);
  };

  return (
    <div className="sandbox-container">
      <header className="sandbox-header">
        <h1>House Sandbox — Gate G1</h1>
        <p>Kiểm tra thẩm mỹ mặt cắt kiến trúc, các mức LOW/MID/HIGH, dấu ấn slot và tỉ lệ viewport.</p>

        <div className="sandbox-presets">
          <span>Presets: </span>
          <button onClick={() => setAllTiers("LOW")} className="btn-preset">Tất cả LOW</button>
          <button onClick={() => setAllTiers("MID")} className="btn-preset">Tất cả MID</button>
          <button onClick={() => setAllTiers("HIGH")} className="btn-preset">Tất cả HIGH</button>
          <span> | Hiệu ứng: </span>
          <button onClick={() => playFx({ economy: 16, education: 8, equality: 6, emotion: 4 })} className="btn-preset">Tăng điểm</button>
          <button onClick={() => playFx({ economy: -16, education: -6, equality: -8, emotion: -4 })} className="btn-preset">Giảm điểm</button>
          <button onClick={() => playFx({ economy: -8, education: 22, equality: 0, emotion: -2 })} className="btn-preset">Hỗn hợp</button>
          <span> | Viewport: </span>
          <button onClick={() => setViewportWidth("360px")} className={`btn-preset ${viewportWidth === "360px" ? "active" : ""}`}>360px</button>
          <button onClick={() => setViewportWidth("768px")} className={`btn-preset ${viewportWidth === "768px" ? "active" : ""}`}>768px</button>
          <button onClick={() => setViewportWidth("100%")} className={`btn-preset ${viewportWidth === "100%" ? "active" : ""}`}>Full</button>
        </div>
      </header>

      <main className="sandbox-main">
        <div className="sandbox-canvas-viewport-frame" style={{ maxWidth: viewportWidth }}>
          <HouseCanvas
            key={fx?.key ?? "static"}
            revealState={fx ? "revealing" : "static"}
            deltas={fx?.deltas}
            levels={levels}
            marks={marks}
            emphasizedMark={emphasizedMark}
          />
        </div>

        <aside className="sandbox-controls">
          <h2>Điều khiển Tiers</h2>
          {DIMENSIONS.map((dim) => (
            <div key={dim} className="control-group">
              <h3>{dim.toUpperCase()}</h3>
              <div className="button-group">
                {TIERS.map((tier) => (
                  <button
                    key={tier}
                    className={`tier-button ${levels[dim] === tier ? "active" : ""}`}
                    onClick={() => handleTierChange(dim, tier)}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="control-group">
            <h2>Thêm Marks (Test Slots)</h2>
            <div className="button-group mark-actions">
              <button onClick={() => addMark("structure", "crack")}>+ Crack (Structure)</button>
              <button onClick={() => addMark("foundation", "reinforce")}>+ Reinforce (Foundation)</button>
              <button onClick={() => addMark("interior", "light")}>+ Light (Interior)</button>
              <button onClick={() => addMark("study", "build")}>+ Build (Study)</button>
              <button onClick={() => addMark("door", "open")}>+ Open (Door)</button>
              <button onClick={() => addMark("kitchen", "dim")}>+ Dim (Kitchen)</button>
              <button onClick={clearMarks} className="btn-clear">Xóa Marks</button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
