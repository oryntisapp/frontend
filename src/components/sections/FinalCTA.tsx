import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { primaryCTA, primaryCTARoute } from "../../lib/tokens";

// Each link now goes to what it actually says — previously all three ("Talk to Sales",
// "View Pricing", "Read the Docs") pointed at the same "#pricing" anchor regardless of
// label, and "Read the Docs" pointed at a section that's being removed in this update.
const MICRO_LINKS: ({ label: string; to: string } | { label: string; href: string })[] = [
  { label: "Talk to Sales", to: "/product" },
  { label: "View Pricing", href: "#pricing" },
  { label: "See the Dashboard", href: "#dashboard-preview" },
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    const blob = document.getElementById("final-cta-blob");
    if (blob) blob.style.opacity = inView ? "0.55" : "0";
  }, [inView]);

  return (
    <section ref={ref} className="relative z-10 mx-auto max-w-5xl px-6 py-24 text-center sm:py-32 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background-elevated px-8 py-16 shadow-card sm:py-24">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(177,62,217,0.25), transparent 70%)",
          }}
        />
        <div className="relative">
          <h2 className="text-gradient-white mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            Run your whole business from one operational layer
          </h2>
          <p className="mx-auto mt-4 max-w-md text-foreground-muted">
            See how Oryntis unifies finance, HR, sales, and operations — book a platform demo.
          </p>

          <div className="mt-9 flex justify-center">
            <motion.div
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block rounded-lg"
            >
              <Button variant="large" to={primaryCTARoute}>{primaryCTA}</Button>
            </motion.div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {MICRO_LINKS.map((l) =>
              "to" in l ? (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-xs text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-xs text-foreground-muted underline-offset-4 hover:text-foreground hover:underline"
                >
                  {l.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}