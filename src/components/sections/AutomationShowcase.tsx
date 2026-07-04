import { motion } from "framer-motion";
import { Workflow, Clock, GitMerge, TrendingUp } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import StatCounter from "../ui/StatCounter";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const OUTCOMES = [
  { icon: Workflow, target: 12400, suffix: "+", label: "Workflows automated across finance, HR & sales" },
  { icon: Clock, target: 38, suffix: "hrs", label: "Average hours saved per team, per month" },
  { icon: GitMerge, target: 340, suffix: "+", label: "Operational bottlenecks resolved automatically" },
  { icon: TrendingUp, target: 91, suffix: "%", label: "Average operational efficiency score" },
];

export default function AutomationShowcase() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading
        eyebrow="Automation in Motion"
        headline="What running on Oryntis actually looks like"
        align="center"
        className="mx-auto"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUpStagger}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {OUTCOMES.map((o) => (
          <motion.div key={o.label} variants={fadeUp}>
            <GlassCard className="h-full p-6 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03]">
                <o.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              </div>
              <p className="text-gradient-white mt-5 text-3xl font-semibold tracking-tight">
                <StatCounter target={o.target} suffix={o.suffix} />
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground-muted">{o.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
