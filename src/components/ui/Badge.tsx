import type { ReactNode } from "react";

export default function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground-subtle backdrop-blur-xl ${className}`}
    >
      {children}
    </span>
  );
}
