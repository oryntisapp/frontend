import { motion } from "framer-motion";
import { Building2, Plug, BrainCircuit, Workflow, Bot, LayoutDashboard } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { drawLine } from "../../lib/motionVariants";

const NODES = [
  { icon: Building2, label: "Enterprise Systems" },
  { icon: Plug, label: "Integration & Data Layer" },
  { icon: BrainCircuit, label: "AI Operations Engine" },
  { icon: Workflow, label: "Workflow Intelligence" },
  { icon: Bot, label: "Automation Execution" },
  { icon: LayoutDashboard, label: "Command Dashboard" },
];

const TRAVEL_S = 4;
const PULSE_S = 0.5;

export default function Architecture() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading
        eyebrow="How It Works"
        headline="One pipeline, from raw system data to executed work"
        align="center"
        className="mx-auto"
      />

      <div className="relative mt-16">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 opacity-50 blur-[80px]"
          style={{ background: "radial-gradient(600px circle at 50% 50%, #6013A1, transparent 70%)" }}
        />

        <svg
          viewBox="0 0 1200 120"
          className="absolute left-0 top-[38px] hidden w-full md:block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pipeGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#657285" />
              <stop offset="45%" stopColor="#B13ED9" />
              <stop offset="100%" stopColor="#E16CF1" />
            </linearGradient>
            <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <motion.path
            d="M 100 60 L 1100 60"
            stroke="url(#pipeGradient)"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={drawLine}
          />

          <motion.circle
            r="10"
            fill="#E16CF1"
            filter="url(#dotGlow)"
            opacity={0.55}
            animate={{ cx: [100, 1100] }}
            transition={{ duration: TRAVEL_S, repeat: Infinity, ease: "linear" }}
            cy={60}
          />
          <motion.circle
            r="4"
            fill="#ffffff"
            animate={{ cx: [100, 1100] }}
            transition={{ duration: TRAVEL_S, repeat: Infinity, ease: "linear" }}
            cy={60}
          />
        </svg>

        <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-3 md:grid-cols-6 md:gap-y-0">
          {NODES.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 1px rgba(150,167,185,0.12), 0 2px 20px rgba(0,0,0,0.4)",
                    "0 0 0 1px rgba(177,62,217,0.5), 0 0 24px 4px rgba(177,62,217,0.35)",
                    "0 0 0 1px rgba(150,167,185,0.12), 0 2px 20px rgba(0,0,0,0.4)",
                  ],
                }}
                transition={{
                  duration: PULSE_S * 2,
                  repeat: Infinity,
                  repeatDelay: TRAVEL_S - PULSE_S * 2,
                  delay: (i / (NODES.length - 1)) * TRAVEL_S - PULSE_S,
                  ease: "easeInOut",
                }}
                className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background-elevated transition-colors duration-300 hover:border-border-accent"
              >
                <n.icon className="h-6 w-6 text-accent" strokeWidth={1.6} />
              </motion.div>
              <p className="max-w-[110px] text-xs font-medium text-foreground-muted">{n.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center text-sm text-foreground-muted">
        How Oryntis unifies, automates, and optimizes enterprise operations through an
        AI-driven operations engine powered by accelerated computing infrastructure.
      </p>
    </section>
  );
}