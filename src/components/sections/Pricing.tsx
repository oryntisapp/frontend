import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";

interface Tier {
  name: string;
  positioning: string;
  price: string;
  priceNote?: string;
  cta: string;
  features: string[];
  highlighted?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    positioning: "Prove value with a single team",
    price: "$X,XXX/mo",
    priceNote: "illustrative — confirm with client",
    cta: "Contact Sales",
    features: [
      "Core Operations Dashboard",
      "Up to 3 connected systems",
      "Fixed monthly automation-task allowance",
      "Standard support",
      "1 user seat pack",
    ],
  },
  {
    name: "Growth",
    positioning: "Scale automation across the operations function",
    price: "$X,XXX/mo",
    priceNote: "illustrative — confirm with client",
    cta: "Contact Sales",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Workflow Intelligence System",
      "Larger automation allowance + metered overage",
      "Up to 10 connected systems",
      "Priority support",
      "Expanded seats",
    ],
  },
  {
    name: "Enterprise",
    positioning: "Organization-wide operations automation",
    price: "$X,XXX/mo",
    priceNote: "illustrative — confirm with client",
    cta: "Contact Sales",
    features: [
      "Everything in Growth",
      "Full Business Automation Layer",
      "Full Integration & Data Layer",
      "Unlimited connected systems",
      "API access",
      "Dedicated onboarding, SLA-backed support",
    ],
  },
  {
    name: "Enterprise+",
    positioning: "Bespoke, multi-department deployments",
    price: "Custom Pricing",
    cta: "Contact Sales",
    features: [
      "Everything in Enterprise",
      "Custom / private cloud deployment",
      "Dedicated account manager",
      "Implementation & workflow optimization consulting",
      "Custom automation-model tuning",
      "Negotiated SLAs",
    ],
  },
];

const COMPARE_ROWS = [
  { label: "Connected systems", values: ["Up to 3", "Up to 10", "Unlimited", "Unlimited"] },
  { label: "Automation-task allowance", values: ["Fixed monthly", "Larger + overage", "Custom", "Custom"] },
  { label: "Workflow Intelligence System", values: ["—", "✓", "✓", "✓"] },
  { label: "Business Automation Layer", values: ["—", "Partial", "Full", "Full"] },
  { label: "API access", values: ["—", "—", "✓", "✓"] },
  { label: "Dedicated account manager", values: ["—", "—", "—", "✓"] },
];

export default function Pricing() {
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading
        eyebrow="Pricing"
        headline="Plans that scale with how much you automate"
        align="center"
        className="mx-auto"
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-4">
        {TIERS.map((tier) => (
          <GlassCard
            key={tier.name}
            interactive={!tier.highlighted}
            className={`relative flex h-full flex-col p-6 ${
              tier.highlighted ? "border-2 !border-accent shadow-cardHover" : ""
            }`}
          >
            {tier.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gradient px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-ctaGlow">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
            <p className="mt-1.5 text-xs text-foreground-muted">{tier.positioning}</p>
            <div className="mt-6">
              <p className="text-3xl font-semibold tracking-tight text-foreground">{tier.price}</p>
              {tier.priceNote && <p className="mt-1 text-[10px] text-foreground-subtle">{tier.priceNote}</p>}
            </div>
            <ul className="mt-6 flex-1 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-foreground-muted">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={tier.highlighted ? "primary" : "ghost"}
              className="mt-8 w-full"
              onClick={() => document.getElementById("docs")?.scrollIntoView({ behavior: "smooth" })}
            >
              {tier.cta}
            </Button>
          </GlassCard>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-xs text-foreground-muted">
        Each plan includes a monthly automation-task allowance; additional usage is billed
        per task beyond that limit.
      </p>

      <div className="mx-auto mt-10 max-w-4xl">
        <button
          onClick={() => setCompareOpen((v) => !v)}
          className="mx-auto flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
        >
          Compare all features
          <ChevronDown className={`h-4 w-4 transition-transform ${compareOpen ? "rotate-180" : ""}`} />
        </button>
        <AnimatePresence>
          {compareOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[560px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-border bg-white/[0.02]">
                      <th className="px-4 py-3 font-medium text-foreground-subtle">Feature</th>
                      {TIERS.map((t) => (
                        <th key={t.name} className="px-4 py-3 font-medium text-foreground">{t.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARE_ROWS.map((row) => (
                      <tr key={row.label} className="border-b border-border last:border-0">
                        <td className="px-4 py-3 text-foreground-muted">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={i} className="px-4 py-3 text-foreground-muted">{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center text-xs text-foreground-subtle">
        All plans include enterprise-grade security and dedicated implementation support.
      </p>
    </section>
  );
}
