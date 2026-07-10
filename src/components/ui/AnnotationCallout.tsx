import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { motion as tokens } from "../../lib/tokens";

export interface CalloutData {
  top: string; // percentage e.g. "38%"
  left: string;
  label: string;
  description: string;
  direction: "left" | "right" | "top" | "bottom";
  delay: number;
}

const LINE_LENGTH = 72;

export default function AnnotationCallout({
  data,
  active = true,
  fromOrigin,
}: {
  data: CalloutData;
  active?: boolean;
  fromOrigin?: { x: number; y: number };
}) {
  const { top, left, label, description, direction, delay } = data;
  const isHorizontal = direction === "left" || direction === "right";
  const sign = direction === "left" || direction === "top" ? -1 : 1;

  const lineStyle: CSSProperties = isHorizontal
    ? { width: LINE_LENGTH, height: 1, [direction === "left" ? "right" : "left"]: "100%" as any }
    : { height: LINE_LENGTH, width: 1, [direction === "top" ? "bottom" : "top"]: "100%" as any };

  const cardOffset = isHorizontal
    ? { [direction === "left" ? "right" : "left"]: LINE_LENGTH }
    : { [direction === "top" ? "bottom" : "top"]: LINE_LENGTH };

  const cardVariants = fromOrigin
    ? {
        hidden: { opacity: 0, x: fromOrigin.x, y: fromOrigin.y, scale: 0.6 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1 },
      }
    : {
        hidden: { opacity: 0, x: isHorizontal ? sign * -12 : 0, y: !isHorizontal ? sign * -12 : 0 },
        visible: { opacity: 1, x: 0, y: 0 },
      };

  return (
    <motion.div
      className="absolute z-20 hidden md:block"
      style={{ top, left }}
      initial="hidden"
      animate={active ? "visible" : "hidden"}
      transition={{ delay: active ? delay : 0 }}
    >
      <motion.span
        className="absolute h-3 w-3 rounded-full bg-accent"
        style={{ boxShadow: "0 0 0 4px rgba(177,62,217,0.18), 0 0 16px 2px rgba(177,62,217,0.5)" }}
        variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: active ? delay : 0 }}
      />
      <motion.span
        className="absolute origin-left bg-gradient-to-r from-border to-accent/60"
        style={{ ...lineStyle, top: isHorizontal ? 5 : undefined, left: !isHorizontal ? 5 : undefined }}
        variants={{
          hidden: { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0, opacity: 0 },
          visible: { scaleX: 1, scaleY: 1, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: tokens.easingPrimary, delay: active ? delay + 0.15 : 0 }}
      />
      <motion.div
        className="absolute w-52 rounded-xl border border-border bg-background-elevated/50 p-3 shadow-card backdrop-blur-md transition-colors hover:border-border-accent hover:bg-background-elevated/70"
        style={cardOffset}
        variants={cardVariants}
        transition={{ duration: 0.5, ease: tokens.easingPrimary, delay: active ? delay + 0.3 : 0 }}
        tabIndex={0}
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground-muted">{description}</p>
      </motion.div>
    </motion.div>
  );
}