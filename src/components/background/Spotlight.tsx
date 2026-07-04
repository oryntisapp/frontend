import { motion, useMotionTemplate } from "framer-motion";
import type { MousePosition } from "../../hooks/useMousePosition";

/**
 * Large, very faint radial gradient that follows the cursor across the whole page —
 * a subtle "presence" layer, distinct from the tighter per-card spotlight in GlassCard.
 */
export default function Spotlight({ mouse }: { mouse: MousePosition }) {
  const background = useMotionTemplate`radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(94,106,210,0.06), transparent 70%)`;
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{ background }}
    />
  );
}
