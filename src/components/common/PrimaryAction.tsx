import React from "react";
import "./PrimaryAction.css";

interface PrimaryActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function PrimaryAction({ label, className = "", ...props }: PrimaryActionProps) {
  return (
    <button className={`nha-primary-action ${className}`} {...props}>
      {label}
    </button>
  );
}
