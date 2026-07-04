import { motion } from "framer-motion";
import { Workflow, BrainCircuit, Gauge, GitBranch, Database, Sparkles } from "lucide-react";
import GlassCard from "../ui/GlassCard";
import { drawLine } from "../../lib/motionVariants";

const STAGES = [
  { icon: Workflow, label: "Workflow Orchestration" },
  { icon: BrainCircuit, label: "AI Operations Intelligence" },
  { icon: Gauge, label: "Process Optimization" },
  { icon: GitBranch, label: "Cross-Department Automation" },
  { icon: Database, label: "Data Synchronization" },
  { icon: Sparkles, label: "Decision Intelligence Pipeline" },
];

export default function AIProcessWidget() {
  return (
    <GlassCard className="col-span-1 h-full p-5 md:col-span-2">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">AI Process Visualizer</h3>
        <span className="rounded-full border border-border bg-white/[0.03] px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-foreground-subtle">
          Powered by NVIDIA SDK.
        </span>
      </div>

      <div className="relative">
        <svg viewBox="0 0 600 40" className="absolute left-0 top-[19px] hidden w-full sm:block" preserveAspectRatio="none">
          <motion.path
            d="M 40 20 L 560 20"
            stroke="#B13ED9"
            strokeOpacity={0.35}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            fill="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={drawLine}
          />
        </svg>
        <div className="relative grid grid-cols-3 gap-4 sm:grid-cols-6">
          {STAGES.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center gap-2 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-elevated">
                <s.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
              </div>
              <p className="max-w-[76px] text-[10px] leading-tight text-foreground-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
