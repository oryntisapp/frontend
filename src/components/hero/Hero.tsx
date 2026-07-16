import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { primaryCTA, primaryCTARoute } from "../../lib/tokens";
import {
  SyncActivityBox,
  EfficiencyChartBox,
  CoreEngineBox,
  AutomationNodesBox,
  AlertResolvedBox,
  WorkflowBox,
  SyncBox,
  AnalyticsBox,
  SecurityBox,
  DashboardPreviewBox,
} from "./BentoHeroBoxes";
import TestimonialCluster from "./TestimonialCluster";


export default function Hero({ preloaderDone }: { preloaderDone: boolean }) {
  const mouse = useMousePosition();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { amount: 0.15 });
  const heroActive = useRef(true);

  useEffect(() => {
    heroActive.current = isInView;
  }, [isInView]);

  const [cookiesResolved, setCookiesResolved] = useState<"accepted" | "declined" | null>(null);

  return (
    <div ref={heroRef} className="relative overflow-hidden pt-16 sm:pt-20">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[55%] h-[480px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 0.4 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: "radial-gradient(circle, #9B3DF0 0%, transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:grid lg:h-[280px] lg:grid-cols-5 lg:grid-rows-2 lg:gap-4"
        >
          {/* Col 1 — stacked symmetrical pair */}
          <div className="flex flex-col gap-4 lg:col-[1] lg:row-[1/span_2]">
            <div className="min-h-0 flex-1"><SyncActivityBox /></div>
            <div className="min-h-0 flex-1"><EfficiencyChartBox /></div>
          </div>

          {/* Col 2 — tall Core Engine (spans 2 rows) */}
          <div className="lg:col-[2] lg:row-[1/span_2]">
            <CoreEngineBox mouse={mouse} active={heroActive} reducedMotion={reducedMotion} />
          </div>

          {/* Col 3 — stacked pair: icon tiles (top) + video (bottom) */}
          <div className="flex flex-col gap-4 lg:col-[3] lg:row-[1/span_2]">
            <div className="flex min-h-0 flex-1 gap-2">
              <WorkflowBox />
              <SyncBox />
            </div>
            <div className="min-h-0 flex-1"><AlertResolvedBox /></div>
          </div>

          {/* Col 4 — stacked pair: video (top) + icon tiles (bottom) */}
          <div className="flex flex-col gap-4 lg:col-[4] lg:row-[1/span_2]">
            <div className="min-h-0 flex-1"><AutomationNodesBox /></div>
            <div className="flex min-h-0 flex-1 gap-2">
              <AnalyticsBox />
              <SecurityBox />
            </div>
          </div>

          {/* Col 5 — tall Robot (spans 2 rows) */}
          <div className="lg:col-[5] lg:row-[1/span_2]">
            <DashboardPreviewBox mouse={mouse} active={heroActive} reducedMotion={reducedMotion} />
          </div>
        </motion.div>

        {/* Mobile: 2-col stacked grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4 auto-rows-auto lg:hidden"
        >
          <div className="col-span-1 row-span-1 min-h-[140px]"><SyncActivityBox /></div>
          <div className="col-span-1 row-span-1 min-h-[140px]"><EfficiencyChartBox /></div>
          <div className="col-span-2 row-span-1">
            <CoreEngineBox mouse={mouse} active={heroActive} reducedMotion={reducedMotion} />
          </div>
          <div className="col-span-1 row-span-1"><WorkflowBox /></div>
          <div className="col-span-1 row-span-1"><SyncBox /></div>
          <div className="col-span-1 row-span-1"><AlertResolvedBox /></div>
          <div className="col-span-1 row-span-1"><AutomationNodesBox /></div>
          <div className="col-span-1 row-span-1"><AnalyticsBox /></div>
          <div className="col-span-1 row-span-1"><SecurityBox /></div>
          <div className="col-span-2 row-span-1">
            <DashboardPreviewBox mouse={mouse} active={heroActive} reducedMotion={reducedMotion} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#7C3AED] rounded-2xl relative overflow-hidden shadow-[0_8px_32px_rgba(147,51,234,0.35)]"
        >
          <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(236,108,235,0.7) 0%, rgba(147,51,234,0.3) 50%, rgba(236,108,235,0.7) 100%)" }}>
            <div className="h-full w-full rounded-2xl bg-transparent" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-pink-400/[0.06] pointer-events-none" />
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden opacity-25">
            <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0,60 Q300,20 600,60 T1200,60"
                fill="none"
                stroke="url(#purpleWaveGrad)"
                strokeWidth="2"
                className="animate-[pulse_4s_easeInOut_infinite]"
              />
              <path
                d="M0,40 Q300,80 600,40 T1200,40"
                fill="none"
                stroke="url(#purpleWaveGrad)"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                className="animate-[pulse_6s_easeInOut_infinite_delay-1000]"
              />
              <defs>
                <linearGradient id="purpleWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                  <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="flex items-center justify-between p-6 px-8 relative z-10">
            <p className="text-white font-sans text-sm md:text-base font-normal tracking-wide leading-relaxed relative z-10">
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">Oryntis</span> unifies finance, HR, sales, and operations into one
              intelligent layer - <span className="text-zinc-100 font-semibold">automating</span> the busywork and giving your team <span className="text-purple-100 font-medium">real-time visibility</span>.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-start justify-between gap-8">
          <div>
            <h1 className="text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient-white block"
              >
                One Platform to Run
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.37, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <GradientText>Your Entire Operations</GradientText>
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button variant="primary" to={primaryCTARoute} icon={<ArrowRight className="h-4 w-4" />}>
                {primaryCTA}
              </Button>
              <Button
                variant="ghost"
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })}
              >
                See the Dashboard
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-5"
          >
            {cookiesResolved === null ? (
              <div className="max-w-[270px] rounded-2xl border border-border bg-[#17171c] p-4">
                <p className="mb-3.5 text-xs leading-relaxed text-foreground-muted">
                  We use cookies to run Oryntis and understand how the platform is used. You can accept
                  or decline non-essential cookies at any time.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCookiesResolved("declined")}
                    className="flex-1 rounded-full border border-border py-2 text-xs font-semibold text-foreground-muted transition-colors hover:text-foreground"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => setCookiesResolved("accepted")}
                    className="flex-1 rounded-full bg-gradient-to-r from-[#b34ff5] to-[#7c2ce0] py-2 text-xs font-semibold text-white"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-foreground-subtle">
                Cookie preferences {cookiesResolved}.{" "}
                <button onClick={() => setCookiesResolved(null)} className="underline hover:text-foreground-muted">
                  Change
                </button>
              </p>
            )}

            <TestimonialCluster />

          </motion.div>
        </div>

      </div>
    </div>
  );
}
