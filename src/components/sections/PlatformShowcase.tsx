import { motion } from "framer-motion";
import { ShieldCheck, Zap, GitBranch } from "lucide-react";
import portrait from "../../assets/images/hero-portrait.jpeg";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const POINTS = [
  {
    icon: Zap,
    title: "Built for real operational speed",
    body: "Not a dashboard you check once a week — a live layer that's already working while you read this.",
  },
  {
    icon: GitBranch,
    title: "Fits into what you already run",
    body: "Oryntis sits alongside your existing ERP, CRM, and finance tools instead of asking you to replace them.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise-grade from day one",
    body: "Built with the access controls and reliability an operations-critical system needs.",
  },
];

export default function PlatformShowcase() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative order-2 lg:order-1"
        >
          <div
            className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 rounded-full opacity-40 blur-[100px]"
            style={{ background: "radial-gradient(circle, #6013A1 0%, transparent 70%)" }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-card">
            <img
              src={portrait}
              alt="Person wearing a next-generation operations headset, representing the Oryntis AI operations layer"
              className="aspect-[4/5] w-full object-cover object-top"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background-base/70 via-transparent to-transparent" />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpStagger}
          className="order-1 lg:order-2"
        >
          <motion.p variants={fadeUp} className="font-mono text-xs uppercase tracking-widest text-accent">
            Why Oryntis
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-gradient-white mt-4 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Operations intelligence that actually runs your business, not just reports on it
          </motion.h2>

          <div className="mt-10 space-y-7">
            {POINTS.map((p) => (
              <motion.div key={p.title} variants={fadeUp} className="flex gap-4">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-border bg-surface">
                  <p.icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
