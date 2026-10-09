import type { ReactNode } from "react";
import "./AppShell.css";

interface AppShellProps {
  children: ReactNode;
  wide?: boolean; // wider container for side-by-side layouts
}

export function AppShell({ children, wide = false }: AppShellProps) {
  return (
    <div className="nha-app-shell">
      <main className={`nha-app-container ${wide ? "is-wide" : ""}`}>
        {children}
      </main>
    </div>
  );
}
