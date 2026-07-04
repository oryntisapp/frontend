import { motion, useMotionTemplate } from "framer-motion";
import type { MousePosition } from "../../hooks/useMousePosition";
import portrait from "../../assets/images/hero-portrait.jpeg";

/**
 * Path B — static portrait fallback (Section 3.1). Used automatically when robot.glb is
 * missing/fails to load, or when WebGL is unavailable. The Tier A scroll parallax choreography
 * (scale/x/y/rotate) is applied by the parent Hero wrapper; this component only owns the
 * image itself plus a cursor-reactive light glow standing in for the literal head-turn.
 */
export default function HeroPortrait({ mouse }: { mouse: MousePosition }) {
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mouse.x}px ${mouse.y}px, rgba(225,108,241,0.16), transparent 65%)`;

  return (
    <div className="relative h-full w-full">
      <img
        src={portrait}
        alt="Person wearing a next-generation operations headset"
        className="h-full w-full object-contain object-center [mask-image:linear-gradient(to_bottom,black_78%,transparent_98%)]"
        draggable={false}
      />
      <motion.div className="pointer-events-none absolute inset-0 mix-blend-screen" style={{ background: glow }} />
    </div>
  );
}
