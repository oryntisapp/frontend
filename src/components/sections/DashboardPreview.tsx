import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, LockOpen, X } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ConnectionsWidget from "../dashboard/ConnectionsWidget";
import AIProcessWidget from "../dashboard/AIProcessWidget";
import InfraHealthWidget from "../dashboard/InfraHealthWidget";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import dashboardCharacter from "../../assets/images/sections/Dashboard_Character.svg";

const CHARGE_MS = 220; // button "charge-up" beat before the transition actually starts
const SWEEP_MS = 650; // duration of the gradient energy-sweep across the panel

const DASHBOARD_WIDGETS = [
  { Widget: ConnectionsWidget, span: "md:col-span-2" },
  { Widget: AIProcessWidget, span: "md:col-span-2" },
  { Widget: InfraHealthWidget, span: "md:col-span-4" },
];

export default function DashboardPreview() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [charging, setCharging] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const reducedMotion = useReducedMotion();

  const accessBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const chargeTimeout = useRef<ReturnType<typeof setTimeout>>();
  const sweepTimeout = useRef<ReturnType<typeof setTimeout>>();

  const openDashboard = useCallback(() => {
    if (charging) return; // ignore repeat clicks mid-charge
    if (reducedMotion) {
      setIsUnlocked(true);
      setHasOpenedOnce(true);
      return;
    }
    setCharging(true);
    chargeTimeout.current = setTimeout(() => {
      setCharging(false);
      setIsUnlocked(true);
      setHasOpenedOnce(true);
      setSweeping(true);
      sweepTimeout.current = setTimeout(() => setSweeping(false), SWEEP_MS);
    }, CHARGE_MS);
  }, [charging, reducedMotion]);

  const closeDashboard = useCallback(() => setIsUnlocked(false), []);

  useEffect(
    () => () => {
      clearTimeout(chargeTimeout.current);
      clearTimeout(sweepTimeout.current);
    },
    []
  );

  // Focus management + Escape-to-close — a real accessibility expectation for any
  // expand/collapse panel, not optional polish. Moves focus to whichever control just
  // became the relevant one, in both directions.
  useEffect(() => {
    if (isUnlocked) {
      closeBtnRef.current?.focus();
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeDashboard();
      };
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
    if (hasOpenedOnce) {
      accessBtnRef.current?.focus();
    }
  }, [isUnlocked, hasOpenedOnce, closeDashboard]);

  return (
    <section id="dashboard-preview" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Operations Command Dashboard"
          headline="Everything running, visible in one place"
          align="center"
          className="mx-auto"
        />
        {isUnlocked && (
          <Link
            to="/product"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            See Full Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      <div className="relative mt-14 grid overflow-hidden rounded-3xl border border-border bg-background-elevated/70 shadow-card backdrop-blur-xl">
        {/*
          Gradient energy-sweep — the on-brand replacement for the originally-requested
          "fire effect." Literal flame imagery doesn't fit this product's cool violet/
          magenta AI aesthetic, so this builds the actual intent (a dramatic "system
          energizing" beat) using the site's own gradient-highlight/gradient-vivid tokens
          instead. Purely decorative: pointer-events-none, and unmounted once its one pass
          finishes rather than lingering on top of the live dashboard content.
        */}
        <AnimatePresence>
          {sweeping && !reducedMotion && (
            <motion.div
              key="sweep"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              exit={{ opacity: 0 }}
              transition={{ duration: SWEEP_MS / 1000, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/2 skew-x-[-18deg]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(225,108,241,0.28), rgba(177,62,217,0.4), rgba(225,108,241,0.28), transparent)",
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="gateway"
              initial={reducedMotion ? undefined : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }}
              transition={{ duration: reducedMotion ? 0.2 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative col-start-1 row-start-1"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(177,62,217,0.16), transparent 70%)",
                }}
              />

              <div className="relative flex flex-col md:flex-row">
                <div className="flex items-center justify-center p-8 md:w-1/2 md:p-12">
                  <motion.div
                    animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-64 sm:w-72"
                  >
                    <img src={dashboardCharacter} alt="" className="w-full" />
                  </motion.div>
                </div>

                <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">System Gateway</p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                    System Live Control Console
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
                    Authenticate initialization to visualize cross-department automations in real-time.
                  </p>

                  {/* Charge-up micro-moment: lock icon swaps, border/glow intensifies, and
                      the button briefly disables itself — this tiny beat is what makes the
                      reveal feel *triggered* rather than an instant swap. */}
                  <motion.button
                    ref={accessBtnRef}
                    onClick={openDashboard}
                    disabled={charging}
                    aria-expanded={isUnlocked}
                    animate={charging ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                    transition={{ duration: CHARGE_MS / 1000, ease: "easeInOut" }}
                    whileHover={charging ? undefined : { scale: 1.02 }}
                    whileTap={charging ? undefined : { scale: 0.98 }}
                    style={
                      charging
                        ? { boxShadow: "0 0 35px rgba(147,51,234,0.75)", borderColor: "rgba(216,180,254,0.7)" }
                        : undefined
                    }
                    className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-purple-500/30 bg-purple-950/40 px-6 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(147,51,234,0.6)] disabled:cursor-wait"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {charging ? (
                        <motion.span key="unlocked" initial={{ rotate: -20, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} className="flex">
                          <LockOpen className="h-4 w-4" />
                        </motion.span>
                      ) : (
                        <motion.span key="locked" className="flex">
                          <Lock className="h-4 w-4" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {charging ? "INITIALIZING..." : "ACCESS COMMAND DASHBOARD"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.96, filter: reducedMotion ? undefined : "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: reducedMotion ? 0.2 : 0.55, ease: [0.16, 1, 0.3, 1], delay: reducedMotion ? 0 : 0.15 }}
              className="relative col-start-1 row-start-1 z-10 p-4 sm:p-6"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(177,62,217,0.16), transparent 70%)",
                }}
              />

              {/* Close control — new requirement. Reverses the reveal (dashboard fades/
                  scales out, gateway view fades back in via the AnimatePresence branch
                  switch above), returns focus to the access button, and responds to
                  Escape from anywhere while the dashboard is open (see the effect above). */}
              <button
                ref={closeBtnRef}
                onClick={closeDashboard}
                aria-label="Close command dashboard"
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background-elevated/80 text-foreground-muted backdrop-blur-md transition-colors hover:border-border-hover hover:text-foreground hover:shadow-[0_0_16px_rgba(177,62,217,0.4)]"
              >
                <X className="h-4 w-4" />
              </button>

              {/*
                Widgets currently look presentational (no visible data-fetching), so
                keeping the mount/unmount-on-toggle pattern here is fine — reopening just
                replays this stagger-in, nothing expensive re-runs. If real API calls ever
                get added inside these widgets, switch this section to stay permanently
                mounted after `hasOpenedOnce` and toggle only opacity/pointer-events on
                subsequent opens, so a re-open doesn't re-trigger a fetch/loading state.
              */}
              <motion.div
                initial={reducedMotion ? undefined : "hidden"}
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07, delayChildren: reducedMotion ? 0 : 0.25 } } }}
                className="relative grid grid-cols-1 gap-4 md:grid-cols-4"
              >
                {DASHBOARD_WIDGETS.map(({ Widget, span }, i) => (
                  <motion.div
                    key={i}
                    className={`col-span-1 ${span}`}
                    variants={{
                      hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    }}
                  >
                    <Widget />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>  
  );
}