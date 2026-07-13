import { motion } from "framer-motion";
import { Building2, Calendar, ShieldCheck, Cpu } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const FACTS = [
  { icon: Calendar, label: "Founded January 2024" },
  { icon: Building2, label: "San Francisco, CA" },
  { icon: ShieldCheck, label: "Enterprise-grade security" },
  { icon: Cpu, label: "SaaS + API-first architecture" },
];

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading eyebrow="About Oryntis" headline="Operations intelligence, built to unify the business" align="center" className="mx-auto" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUpStagger}
        className="mt-14 grid items-center gap-12 lg:grid-cols-2"
      >
        {/* Left — narrative */}
        <motion.div variants={fadeUp}>
          <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
            Oryntis was founded to solve a problem every growing organization hits: finance,
            HR, sales, and operations each running on their own tools with no shared layer
            connecting them. The result is duplicated work, fragmented data, and decisions
            made on stale information.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            We built an intelligent operations platform that sits across every department, unifying systems, automating workflows, and giving your team one real time view of what's actually happening.
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-foreground-subtle">
            <span className="font-mono tracking-wide">Charlotte Evans</span>
            <span className="h-3 w-px bg-border" />
            <span className="font-mono tracking-wide">Founder</span>
          </div>
        </motion.div>

        {/* Right — credentials panel */}
        <motion.div variants={fadeUp}>
          <GlassCard interactive={false} className="p-6 sm:p-8">
            <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">Company snapshot</h3>
            <div className="space-y-4">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white/[0.03]">
                    <f.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                  </div>
                  <span className="text-sm text-foreground-muted">{f.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-5">
              <p className="text-xs leading-relaxed text-foreground-subtle">
                Oryntis App Technologies Inc. — 525 Market Street, San Francisco, CA 94102, USA
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </section>
  );
}
