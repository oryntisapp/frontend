import { motion } from "framer-motion";
import { fadeUp } from "../../lib/motionVariants";

interface SectionHeadingProps {
  eyebrow: string;
  headline: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({ eyebrow, headline, align = "left", className = "" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}
    >
      <span className={`mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent ${centered ? "justify-center" : ""}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(94,106,210,0.6)]" />
        {eyebrow}
      </span>
      <h2 className="text-gradient-white text-3xl font-semibold tracking-tight sm:text-4xl">{headline}</h2>
    </motion.div>
  );
}
