import { useEffect, useRef } from "react";
import { useMotionValue, type MotionValue } from "framer-motion";

export interface MousePosition {
  /** raw viewport pixel coordinates */
  x: MotionValue<number>;
  y: MotionValue<number>;
  /** normalized -1..1, y flipped so up is positive (matches WebGL convention) */
  nx: React.MutableRefObject<number>;
  ny: React.MutableRefObject<number>;
  inside: React.MutableRefObject<boolean>;
}

/**
 * Shared pointer tracker. Position is exposed via Framer Motion values (for CSS custom
 * property driven effects like the card spotlight) and via plain refs (for the R3F gaze
 * loop, which reads every frame inside useFrame and must never trigger a React re-render).
 */
export function useMousePosition(): MousePosition {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const nx = useRef(0);
  const ny = useRef(0);
  const inside = useRef(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (raf.current !== null) return;
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
        nx.current = (e.clientX / window.innerWidth) * 2 - 1;
        ny.current = -((e.clientY / window.innerHeight) * 2 - 1);
        inside.current = true;
        raf.current = null;
      });
    };
    const handleLeave = () => {
      inside.current = false;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [x, y]);

  return { x, y, nx, ny, inside };
}
