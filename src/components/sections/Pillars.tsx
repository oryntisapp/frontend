import { motion } from "framer-motion";
import { Cpu, Workflow, Zap, Plug, LayoutDashboard, ArrowUpRight } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

interface Pillar {
  icon: typeof Cpu;
  index: string;
  name: string;
  desc: string;
  span: string;
  flagship?: boolean;
  bg: string;
  wash: string;
}

const PILLARS: Pillar[] = [
  {
    icon: Cpu,
    index: "01",
    name: "AI Operations Engine",
    desc: "Centralizes work across every department and coordinates cross-functional processes automatically.",
    span: "md:col-span-4 md:row-span-2",
    flagship: true,
    bg: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=800&fit=crop&q=80",
    wash: "linear-gradient(135deg, rgba(24,4,75,0.55) 0%, rgba(12,10,20,0.55) 45%, rgba(12,10,20,0.85) 100%)",
  },
  {
    icon: Workflow,
    index: "02",
    name: "Workflow Intelligence System",
    desc: "Finds the bottlenecks slowing your teams down and recommends the fix.",
    span: "md:col-span-2",
    bg: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&h=600&fit=crop&q=80",
    wash: "linear-gradient(160deg, rgba(101,114,133,0.35) 0%, rgba(12,10,20,0.6) 50%, rgba(12,10,20,0.9) 100%)",
  },
  {
    icon: Zap,
    index: "03",
    name: "Business Automation Layer",
    desc: "Finance, HR, sales, and support tasks that used to take hours now run themselves.",
    span: "md:col-span-2",
    bg: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&h=600&fit=crop&q=80",
    wash: "linear-gradient(160deg, rgba(177,62,217,0.35) 0%, rgba(12,10,20,0.6) 50%, rgba(12,10,20,0.9) 100%)",
  },
  {
    icon: Plug,
    index: "04",
    name: "Integration & Data Layer",
    desc: "Every enterprise app and API, synchronized into one source of truth.",
    span: "md:col-span-3",
    bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=600&fit=crop&q=80",
    wash: "linear-gradient(135deg, rgba(96,19,161,0.4) 0%, rgba(12,10,20,0.6) 50%, rgba(12,10,20,0.9) 100%)",
  },
  {
    icon: LayoutDashboard,
    index: "05",
    name: "Operations Command Dashboard",
    desc: "Real-time performance, workflow execution, and predictive alerts in one view.",
    span: "md:col-span-3",
    bg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&h=600&fit=crop&q=80",
    wash: "linear-gradient(135deg, rgba(225,108,241,0.3) 0%, rgba(12,10,20,0.6) 50%, rgba(12,10,20,0.9) 100%)",
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
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[minmax(230px,auto)]"
      >
        {PILLARS.map((s) => (
          <motion.div key={s.name} variants={fadeUp} className={s.span}>
            {/* no padding here — the photo must bleed edge-to-edge. Only the content
                layer below (which sits on top of it) carries padding. */}
            <GlassCard className="h-full">
              <img
                src={s.bg}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0" style={{ background: s.wash }} />
              <div className="absolute inset-0 bg-gradient-to-t from-background-base/95 via-background-base/40 to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-grid-overlay bg-grid opacity-[0.12] mix-blend-overlay" />

              {/* content layer — the only element with padding, pinned top/bottom via flex */}
              <div className="relative flex h-full flex-col justify-between p-7">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/30 backdrop-blur-sm transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/20">
                      <s.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] tracking-widest text-white/60">
                      {s.index} / 05
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 -translate-x-1 translate-y-1 text-white/60 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent-bright group-hover:opacity-100" />
                </div>

                <div>
                  <h3 className={`font-semibold tracking-tight text-white ${s.flagship ? "text-2xl sm:text-[1.75rem]" : "text-lg"}`}>
                    {s.name}
                  </h3>
                  <p className={`mt-2 text-white/70 ${s.flagship ? "max-w-sm text-base" : "text-sm leading-relaxed"}`}>
                    {s.desc}
                  </p>
                </div>
              </div>

              <span className="absolute inset-x-0 bottom-0 z-10 h-[3px] origin-left scale-x-0 bg-brand-gradient-h transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}