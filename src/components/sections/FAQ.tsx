import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const FAQS = [
  { q: "How long does implementation take?", a: "Most teams are running their first automated workflows within 2–4 weeks, depending on how many systems you're connecting." },
  { q: "Do we need to replace our existing tools?", a: "No — Oryntis connects to your existing ERP, CRM, HR, and finance tools rather than replacing them." },
  { q: "What happens if we go over our automation allowance?", a: "Additional usage beyond your plan's included allowance is billed per task, not cut off — your workflows keep running." },
  { q: "Is our data secure?", a: "Yes — enterprise-grade security and access controls are built in from day one, not added later." },
  { q: "Can we start on a smaller plan and upgrade later?", a: "Yes, you can move between Starter, Growth, and Enterprise at any time as your operations scale." },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.scrollHeight);
  }, [a]);

  return (
    <motion.div variants={fadeUp} className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-6 text-left"
      >
        <span className="text-base font-medium text-foreground sm:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-border bg-surface text-accent"
        >
          <Plus className="h-4 w-4" />
        </motion.span>
      </button>
      <motion.div
        animate={{ height: open ? height : 0 }}
        initial={false}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div ref={ref} className="pb-6 pr-12 text-sm leading-relaxed text-foreground-muted">
          {a}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading eyebrow="FAQ" headline="Questions, answered" align="center" className="mx-auto" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUpStagger}
        className="mt-14"
      >
        {FAQS.map((f) => (
          <FAQItem key={f.q} q={f.q} a={f.a} />
        ))}
      </motion.div>
    </section>
  );
}
