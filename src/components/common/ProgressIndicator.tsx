import React from "react";
import "./ProgressIndicator.css";

interface ProgressIndicatorProps {
  current: number; // 1 to 7
  total?: number;  // 7
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total = 7,
}) => {
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav className="nha-progress-nav" aria-label="Tiến trình tình huống">
      <ol className="nha-progress-steps">
        {steps.map((step) => {
          const isCompleted = step < current;
          const isCurrent = step === current;
          const label = `S0${step}`;

          return (
            <li
              key={step}
              className={`nha-progress-step ${isCurrent ? "is-current" : isCompleted ? "is-completed" : "is-upcoming"}`}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className="nha-progress-label">{label}</span>
              <span className="nha-progress-marker" aria-hidden="true" />
            </li>
          );
        })}
      </ol>
      <div className="nha-progress-hairline" aria-hidden="true" />
    </nav>
  );
};
