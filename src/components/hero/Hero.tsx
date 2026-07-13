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

const CLIENT_LOGOS = ["inSlace", "Northbeam Ops", "Verdant Group", "Halcyon SaaS", "Kestrel Health"];

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
          className="grid grid-cols-2 gap-3 sm:gap-3.5 lg:hidden"
          style={{ gridTemplateRows: "repeat(5, 140px)" }}
        >
          <div className="col-span-1 row-span-1"><SyncActivityBox /></div>
          <div className="col-span-1 row-span-1"><EfficiencyChartBox /></div>
          <div className="col-span-2 row-span-1 h-[200px]">
            <CoreEngineBox mouse={mouse} active={heroActive} reducedMotion={reducedMotion} />
          </div>
          <div className="col-span-1 row-span-1"><WorkflowBox /></div>
          <div className="col-span-1 row-span-1"><SyncBox /></div>
          <div className="col-span-1 row-span-1"><AlertResolvedBox /></div>
          <div className="col-span-1 row-span-1"><AutomationNodesBox /></div>
          <div className="col-span-1 row-span-1"><AnalyticsBox /></div>
          <div className="col-span-1 row-span-1"><SecurityBox /></div>
          <div className="col-span-2 row-span-1 h-[200px]">
            <DashboardPreviewBox mouse={mouse} active={heroActive} reducedMotion={reducedMotion} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 rounded-[22px] bg-gradient-to-br from-[#b34ff5] via-[#8a35e8] to-[#7c2ce0] px-6 py-5 sm:px-8"
        >
          <p className="max-w-md text-sm leading-relaxed text-white/95 sm:text-[15px]">
            Oryntis unifies finance, HR, sales, and operations into one intelligent
            layer — automating the busywork and giving your team real-time visibility.
          </p>
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

            <div className="flex" aria-label={`Trusted by ${CLIENT_LOGOS.length}+ operations teams`}>
              {CLIENT_LOGOS.slice(0, 4).map((name, i) => (
                <div
                  key={name}
                  title={name}
                  style={{ marginLeft: i === 0 ? 0 : -10 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-[#d9d9dd]/90 text-[10px] font-semibold text-[#111]"
                >
                  {name.slice(0, 2).toUpperCase()}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={preloaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-border pt-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
            Trusted by operations teams
          </span>
          {CLIENT_LOGOS.map((name) => (
            <span key={name} className="font-mono text-[11px] tracking-wide text-foreground-subtle/70">
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
