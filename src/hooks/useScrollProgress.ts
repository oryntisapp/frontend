import { useRef } from "react";
import { useScroll, useSpring, type MotionValue } from "framer-motion";

interface Options {
  offset?: ["start start" | "start end" | "end start" | "end end" | string, string];
  stiffness?: number;
  damping?: number;
}

/**
 * Binds useScroll to a ref'd container and returns both the raw and spring-smoothed
 * progress values, per the "never use raw scroll-linked values" runtime rule (Section 3.4).
 */
export function useScrollProgress<T extends HTMLElement>(options: Options = {}) {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: (options.offset ?? ["start start", "end start"]) as any,
  });
  const smooth: MotionValue<number> = useSpring(scrollYProgress, {
    stiffness: options.stiffness ?? 100,
    damping: options.damping ?? 30,
    mass: 0.5,
  });

  return { ref, progress: scrollYProgress, smoothProgress: smooth };
}
