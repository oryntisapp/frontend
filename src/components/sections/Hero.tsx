import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, useTransform, useInView } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import AnnotationCallout, { type CalloutData } from "../ui/AnnotationCallout";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { primaryCTA, primaryCTARoute, secondaryCTA } from "../../lib/tokens";

const RobotCanvas = lazy(() => import("../hero3d/RobotCanvas"));

const CALLOUTS: CalloutData[] = [
  {
    top: "20%",
    left: "52%",
    label: "Core Operations Engine",
    description: "Coordinates work across every department.",
    direction: "right",
    delay: 0.2,
  },
  {
    // Bug fixed here: this callout's card extended in the "right" direction from a dot
    // already sitting at 80% across a container flush against the viewport's right edge
    // (`md:right-0`) — the label card (208px wide, 72px offset) had nowhere to go but
    // straight into `overflow-hidden` on the hero's outer container, clipping it in half.
    // Flipping the direction so the card extends back toward the center of the hero
    // fixes this regardless of viewport width.
    top: "40%",
    left: "70%",
    label: "Workflow Intelligence",
    description: "Finds the bottlenecks before they cost you.",
    direction: "left",
    delay: 0.4,
  },
  {
    top: "64%",
    left: "56%",
    label: "Business Automation",
    description: "Routine tasks handled, not just tracked.",
    direction: "left",
    delay: 0.6,
  },
  {
    // Same fix as above — was left:82% + direction "right", guaranteed to clip.
    top: "82%",
    left: "72%",
    label: "Integration Layer",
    description: "Every system, one source of truth.",
    direction: "left",
    delay: 0.8,
  },
];

export default function Hero({ preloaderDone }: { preloaderDone: boolean }) {
  const { ref, smoothProgress } = useScrollProgress<HTMLDivElement>({
    offset: ["start start", "end start"],
  });
  const mouse = useMousePosition();
  const reducedMotion = useReducedMotion();
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { amount: 0.15 });
  const heroInView = useRef(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    heroInView.current = isInView;
  }, [isInView]);

  // Hero subject layer choreography — Tier A scroll-scrub camera dolly (Section 3.1/3.2),
  // applied identically whether Path A (R3F robot) or Path B (static portrait) is active.
  const subjectScale = useTransform(smoothProgress, [0, 1], [1, 1.12]);
  const subjectY = useTransform(smoothProgress, [0, 1], [0, -40]);
  const subjectX = useTransform(smoothProgress, [0, 0.5, 1], [0, 24, 0]);
  const subjectRotate = useTransform(smoothProgress, [0, 1], [0, reducedMotion ? 0 : 2]);
  const glowOpacity = useTransform(smoothProgress, [0, 1], [0.4, 0.75]);

  const copyOpacity = useTransform(smoothProgress, [0, 0.35, 1], [1, 1, 0]);
  const copyY = useTransform(smoothProgress, [0, 0.35], [0, -16]);
  const scrollCueOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={ref} className="relative" style={{ height: reducedMotion ? "100vh" : "200vh" }}>
      {/*
        Bug fixed here: the hero content used to rely purely on `items-center` vertical
        centering inside a full h-screen box, with the copy column getting `pt-16 md:pt-0`
        — padding that was explicitly REMOVED on desktop, exactly where the fixed 64px
        navbar overlap was actually happening. Centering math doesn't guarantee clearance
        under a fixed header on shorter viewports. Fix: reserve the navbar's real height
        as top padding on this outer box itself, so the *entire* content area below it is
        already guaranteed clear — no more fragile per-breakpoint nudging needed on the
        copy column.
      */}
      <div ref={inViewRef} className="sticky top-0 h-screen w-full overflow-hidden pt-16 sm:pt-20">
        {/* reflection-motif gradient orb behind the hero subject */}
        <motion.div
          className="pointer-events-none absolute right-[6%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full blur-[110px] md:right-[12%]"
          style={{
            opacity: reducedMotion ? 0.55 : glowOpacity,
            background: "radial-gradient(circle, #E16CF1 0%, #B13ED9 40%, #6013A1 70%, transparent 85%)",
          }}
        />
        {/* cool inverted echo beneath the subject's base */}
        <div
          className="pointer-events-none absolute bottom-0 right-[10%] h-[220px] w-[520px] rounded-full opacity-25 blur-[90px] md:right-[16%]"
          style={{ background: "radial-gradient(circle, #657285 0%, transparent 75%)" }}
        />

        <div className="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
          {/* copy column */}
          <motion.div
            style={reducedMotion ? undefined : { opacity: copyOpacity, y: copyY }}
            className="relative z-10 max-w-xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(177,62,217,0.6)]" />
              The Business Operations Platform
            </motion.span>

            <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-gradient-white block"
              >
                One Platform to Run
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                <GradientText>Your Entire Business Operations</GradientText>
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-md text-lg text-foreground-muted"
            >
              Oryntis unifies your finance, HR, sales, and operations systems into a single intelligent layer, automating the busywork and giving your team real time visibility into what's actually happening.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button variant="primary" to={primaryCTARoute} icon={<ArrowRight className="h-4 w-4" />}>
                {primaryCTA}
              </Button>
              <Button
                variant="ghost"
                icon={<ArrowRight className="h-4 w-4" />}
                onClick={() => document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })}
              >
                {secondaryCTA}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 backdrop-blur-xl"
            >
              <Cpu className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs text-foreground-muted">Powered by accelerated computing infrastructure</span>
            </motion.div>
          </motion.div>

          {/* hero subject layer — Path A (robot.glb) or Path B (portrait), same choreography */}
          <motion.div
            style={
              reducedMotion
                ? undefined
                : { scale: subjectScale, y: subjectY, x: subjectX, rotate: subjectRotate }
            }
            className="absolute inset-y-0 right-[-6%] z-0 w-full md:right-[2%] md:w-[56%]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={preloaderDone ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full"
            >
              <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-white/[0.02]" />}>
                <RobotCanvas
                  mouse={mouse}
                  heroInView={heroInView}
                  reducedMotion={reducedMotion}
                  useFallback={useFallback}
                  onFallback={() => setUseFallback(true)}
                />
              </Suspense>
            </motion.div>

            {CALLOUTS.map((c) => (
              <AnnotationCallout key={c.label} data={c} active={preloaderDone} />
            ))}
          </motion.div>
        </div>

        {/* mobile fallback: stacked pill list instead of absolutely-positioned callouts */}
        <div className="relative z-10 flex flex-wrap justify-center gap-2 px-6 pb-8 md:hidden">
          {CALLOUTS.map((c) => (
            <span
              key={c.label}
              className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle backdrop-blur-xl"
            >
              {c.label}
            </span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={preloaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={reducedMotion ? undefined : { opacity: scrollCueOpacity }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">Scroll</span>
          <div className="relative h-10 w-px overflow-hidden bg-border">
            <motion.span
              className="absolute left-0 top-0 h-2 w-px bg-accent"
              animate={reducedMotion ? {} : { y: [0, 32, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}