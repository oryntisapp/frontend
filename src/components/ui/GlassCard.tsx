import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  interactive?: boolean;
}

export default function GlassCard({ children, className = "", interactive = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    if (raf.current !== null) return;
    const target = ref.current;
    const clientX = e.clientX;
    const clientY = e.clientY;
    raf.current = requestAnimationFrame(() => {
      const rect = target.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      const y = ((clientY - rect.top) / rect.height) * 100;
      target.style.setProperty("--x", `${x}%`);
      target.style.setProperty("--y", `${y}%`);
      raf.current = null;
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      whileHover={interactive ? { y: -6, transition: { duration: 0.2, ease: "easeOut" } } : undefined}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-border-hover hover:shadow-cardHover ${className}`}
    >
      {interactive && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgba(177,62,217,0.18), transparent 70%)",
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}