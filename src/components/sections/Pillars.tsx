import { motion } from "framer-motion";
import { Cpu, Workflow, Zap, Plug, LayoutDashboard, ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const PILLARS = [
  {
    icon: Cpu,
    name: "AI Operations Engine",
    desc: "Centralizes work across every department and coordinates cross-functional processes automatically.",
    span: "md:col-span-4 md:row-span-2",
    flagship: true,
  },
  {
    icon: Workflow,
    name: "Workflow Intelligence System",
    desc: "Finds the bottlenecks slowing your teams down and recommends the fix.",
    span: "md:col-span-2",
  },
  {
    icon: Zap,
    name: "Business Automation Layer",
    desc: "Finance, HR, sales, and support tasks that used to take hours now run themselves.",
    span: "md:col-span-2",
  },
  {
    icon: Plug,
    name: "Integration & Data Layer",
    desc: "Every enterprise app and API, synchronized into one source of truth.",
    span: "md:col-span-3",
  },
  {
    icon: LayoutDashboard,
    name: "Operations Command Dashboard",
    desc: "Real-time performance, workflow execution, and predictive alerts in one view.",
    span: "md:col-span-3",
  },
];

export default function Pillars() {
  return (
    <section id="pillars" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading eyebrow="The Five Pillars" headline="Everything your operations need, unified" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUpStagger}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[180px]"
      >
        {PILLARS.map((s) => (
          <motion.div key={s.name} variants={fadeUp} className={s.span}>
            <GlassCard className={`h-full p-6 ${s.flagship ? "flex flex-col justify-between" : ""}`}>
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white/[0.03]">
                  <s.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                </div>
                <ArrowUpRight className="h-4 w-4 text-foreground-subtle opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className={s.flagship ? "" : "mt-6"}>
                <h3 className={`font-semibold tracking-tight ${s.flagship ? "text-2xl" : "text-lg"}`}>{s.name}</h3>
                <p className={`mt-2 text-foreground-muted ${s.flagship ? "max-w-sm text-base" : "text-sm"}`}>
                  {s.desc}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
