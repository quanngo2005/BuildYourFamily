import type { ReactNode } from "react";
import "./AppShell.css";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="nha-app-shell">
      <main className="nha-app-container">
        {children}
      </main>
    </div>
  );
}
