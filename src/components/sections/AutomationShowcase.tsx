import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Workflow, Clock, GitMerge, TrendingUp, Radio } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import StatCounter from "../ui/StatCounter";

const STATS = [
  { icon: Workflow, target: 12400, suffix: "+", label: "Workflows automated across finance, HR & sales" },
  { icon: Clock, target: 38, suffix: "hrs", label: "Average hours saved per team, per month" },
  { icon: GitMerge, target: 340, suffix: "+", label: "Operational bottlenecks resolved automatically" },
  { icon: TrendingUp, target: 91, suffix: "%", label: "Average operational efficiency score" },
];

const CATEGORY_STYLES: Record<string, string> = {
  Finance: "bg-accent",
  HR: "text-[#96A7B9] bg-[#96A7B9]",
  Sales: "bg-success",
  Ops: "bg-warning",
};

const EVENT_POOL = [
  { category: "Finance", text: "Invoice #4021 auto-approved and routed to payment" },
  { category: "HR", text: "Onboarding workflow completed for new hire" },
  { category: "Sales", text: "Inbound lead auto-routed to the right rep" },
  { category: "Ops", text: "Bottleneck detected and resolved in fulfillment queue" },
  { category: "Finance", text: "Expense report auto-reconciled against receipts" },
  { category: "HR", text: "Time-off request auto-approved per policy" },
  { category: "Sales", text: "Deal stage updated automatically from CRM sync" },
  { category: "Ops", text: "Weekly performance report generated and sent" },
  { category: "Finance", text: "Duplicate vendor record merged automatically" },
  { category: "Sales", text: "Contract renewal reminder sent to account owner" },
];

const WINDOW_SIZE = 5;
const TICK_MS = 2800;

function useLiveFeed() {
  const [items, setItems] = useState(() => EVENT_POOL.slice(0, WINDOW_SIZE).map((e, i) => ({ ...e, id: i })));
  const nextIndex = useRef(WINDOW_SIZE);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = { ...EVENT_POOL[nextIndex.current % EVENT_POOL.length], id: nextIndex.current };
        nextIndex.current += 1;
        return [next, ...prev].slice(0, WINDOW_SIZE);
      });
    }, TICK_MS);
    return () => clearInterval(interval);
  }, []);

  return items;
}

export default function AutomationShowcase() {
  const feed = useLiveFeed();

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading
        eyebrow="Automation in Motion"
        headline="What running on Oryntis actually looks like"
        align="center"
        className="mx-auto"
      />

      <div className="relative mt-14 overflow-hidden rounded-2xl border border-border bg-background-elevated shadow-card">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(1000px circle at 20% 0%, rgba(177,62,219,0.12), transparent 60%)" }}
        />

        <div className="relative flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground-muted">
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-2 w-2 items-center justify-center rounded-full bg-success"
            />
            Live automation feed
            <Radio className="h-3 w-3" />
          </div>
        </div>

        <div className="relative grid gap-0 lg:grid-cols-[1.4fr_1fr]">
          <div className="min-h-[360px] border-b border-border p-5 lg:border-b-0 lg:border-r">
            <ul className="flex flex-col gap-1">
              <AnimatePresence initial={false}>
                {feed.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 hover:bg-white/[0.03]"
                  >
                    <span className={`h-1.5 w-1.5 flex-none rounded-full ${CATEGORY_STYLES[item.category]}`} />
                    <span className="w-14 flex-none font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                      {item.category}
                    </span>
                    <span className="text-sm text-foreground-muted">{item.text}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          <div className="flex flex-col divide-y divide-border">
            {STATS.map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 px-5 py-5"
              >
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-border bg-white/[0.03]">
                  <s.icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-gradient-white text-2xl font-semibold tracking-tight">
                    <StatCounter target={s.target} suffix={s.suffix} />
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-foreground-muted">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}