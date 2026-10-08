import "./ChoiceCard.css";

interface ChoiceCardProps {
  label: "A" | "B" | "C";
  text: string;
  state: "default" | "selected" | "disabled";
  onClick: () => void;
}

export function ChoiceCard({ label, text, state, onClick }: ChoiceCardProps) {
  const isInteractive = state === "default";
  
  return (
    <button 
      className={`nha-choice-card ${state !== "default" ? `nha-choice-${state}` : ""}`}
      onClick={isInteractive ? onClick : undefined}
      disabled={!isInteractive}
      aria-label={`Lựa chọn ${label}: ${text}`}
    >
      <div className="nha-choice-marker">
        <span>{label}</span>
      </div>
      <div className="nha-choice-text">
        {text}
      </div>
    </button>
  );
}
