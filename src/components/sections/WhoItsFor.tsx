import { motion } from "framer-motion";
import { Building2, Rocket, Landmark, Users2, GitBranch, Gauge } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const AUDIENCE = [
  { icon: Building2, title: "Enterprise organizations", desc: "Unify operations across every department without adding headcount." },
  { icon: Rocket, title: "SaaS companies scaling fast", desc: "Automate the operational overhead that comes with rapid growth." },
  { icon: Landmark, title: "Finance & HR departments", desc: "Run recurring processes without the manual busywork." },
  { icon: Users2, title: "Operations managers", desc: "See execution across teams in one command view, in real time." },
  { icon: GitBranch, title: "Digital transformation teams", desc: "Replace fragmented tools with one coordinated operations layer." },
  { icon: Gauge, title: "Process optimization teams", desc: "Find and fix bottlenecks before they cost the business." },
];

export default function WhoItsFor() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading
        eyebrow="Who It's For"
        headline="Built for the people who run the business"
        align="center"
        className="mx-auto"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUpStagger}
        className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {AUDIENCE.map((r) => (
          <motion.div key={r.title} variants={fadeUp}>
            <GlassCard className="h-full p-6">
              <r.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 text-sm font-semibold tracking-tight">{r.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{r.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
