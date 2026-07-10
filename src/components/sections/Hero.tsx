import { useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, useTransform, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import { useMousePosition } from "../../hooks/useMousePosition";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { primaryCTA, primaryCTARoute, secondaryCTA } from "../../lib/tokens";

const RobotCanvas = lazy(() => import("../hero3d/RobotCanvas"));

const CALLOUTS = [
  {
    label: "Core Operations Engine",
    description: "Coordinates work across every department.",
  },
  {
    label: "Workflow Intelligence",
    description: "Finds the bottlenecks before they cost you.",
  },
  {
    label: "Business Automation",
    description: "Routine tasks handled, not just tracked.",
  },
  {
    label: "Integration Layer",
    description: "Every system, one source of truth.",
  },
] as const;

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
  const [showArchitecture, setShowArchitecture] = useState(false);

  useEffect(() => {
    heroInView.current = isInView;
  }, [isInView]);

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
      <div ref={inViewRef} className="sticky top-0 flex h-screen w-full flex-col overflow-hidden pt-16 sm:pt-20">
        <motion.div
          className="pointer-events-none absolute right-[6%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 rounded-full blur-[110px] md:right-[12%]"
          style={{
            opacity: reducedMotion ? 0.55 : glowOpacity,
            background: "radial-gradient(circle, #E16CF1 0%, #B13ED9 40%, #6013A1 70%, transparent 85%)",
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[10%] h-[220px] w-[520px] rounded-full opacity-25 blur-[90px] md:right-[16%]"
          style={{ background: "radial-gradient(circle, #657285 0%, transparent 75%)" }}
        />

        <div className="relative z-20 mx-auto w-full max-w-7xl flex-none px-6 pt-6 sm:pt-8 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex rounded-full bg-gradient-to-r from-accent/20 to-white/5 p-[1px]"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-4 py-2 backdrop-blur-md">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(177,62,217,0.6)]" />
              <span className="font-mono text-[11px] leading-none uppercase tracking-widest text-accent">
                The Business Operations Platform
              </span>
            </span>
          </motion.div>
        </div>

        <div className="relative flex flex-1 flex-col lg:flex-row lg:items-center">
          <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-8 lg:flex-row lg:items-center lg:pb-0 lg:px-8">
            <motion.div
              style={reducedMotion ? undefined : { opacity: copyOpacity, y: copyY }}
              className="relative z-10 w-full max-w-xl max-h-[85vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
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
                  <GradientText>Your Entire Operations</GradientText>
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-md text-base leading-relaxed text-foreground-muted md:text-lg"
              >
                Oryntis unifies finance, HR, sales, and operations into one intelligent
                layer — automating the busywork and giving your team real-time visibility.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={preloaderDone ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                className="mt-12 flex flex-wrap items-center gap-4"
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
                className="mt-14 inline-flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-2 backdrop-blur-xl"
              >
                <Cpu className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs text-foreground-muted">Powered by accelerated computing infrastructure</span>
              </motion.div>
            </motion.div>

            <motion.div
              style={
                reducedMotion
                  ? undefined
                  : { scale: subjectScale, y: subjectY, x: subjectX, rotate: subjectRotate }
              }
              className="relative z-0 mt-8 w-full lg:absolute lg:inset-y-0 lg:right-[2%] lg:mt-0 lg:w-[56%]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={
                  !preloaderDone
                    ? {}
                    : {
                        opacity: 1,
                        scale: showArchitecture && !reducedMotion ? 0.74 : 1,
                        x: showArchitecture && !reducedMotion ? -40 : 0,
                      }
                }
                transition={{
                  opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  x: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                className="h-full w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto"
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

              <button
                onClick={() => setShowArchitecture((v) => !v)}
                className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2 rounded-full border border-border/50 bg-background-elevated/80 px-4 py-2 backdrop-blur-xl transition-all duration-300 ease-in-out hover:border-accent/35 hover:text-accent hover:shadow-[0_0_20px_-6px_rgba(177,62,217,0.35)]"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-300 ${showArchitecture ? "opacity-100" : "animate-pulse opacity-100"}`}
                />
                <span className="font-mono text-[11px] leading-none uppercase tracking-widest text-foreground-muted transition-colors duration-300 group-hover:text-accent">
                  {showArchitecture ? "Hide Architecture" : "Explore Architecture"}
                </span>
              </button>

              <AnimatePresence>
                {showArchitecture && (
                  <motion.div
                    key="rail"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                    }}
                    className="relative w-full lg:absolute lg:right-3 lg:top-1/2 lg:w-72 lg:-translate-y-1/2"
                  >
                    <div className="absolute left-[25px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-accent/30" />
                    <div className="space-y-5">
                      {CALLOUTS.map((c, i) => (
                        <motion.div
                          key={c.label}
                          variants={{
                            hidden: { opacity: 0, x: 32, scale: 0.95 },
                            visible: { opacity: 1, x: 0, scale: 1 },
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="relative flex items-start gap-4 pl-12"
                        >
                          <div className="absolute left-[19px] top-1.5 h-[13px] w-[13px] rounded-full border-2 border-accent bg-background shadow-[0_0_0_4px_rgba(177,62,217,0.15)]" />
                          <div className="flex-1 rounded-xl backdrop-blur-lg bg-zinc-950/40 border border-zinc-800/50 p-3.5">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{c.label}</p>
                            <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{c.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="relative z-10 mt-6 lg:hidden">
              <AnimatePresence>
                {showArchitecture && (
                  <motion.div
                    key="rail-mobile"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                    }}
                    className="relative"
                  >
                    <div className="absolute left-[25px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-accent/30" />
                    <div className="space-y-4">
                      {CALLOUTS.map((c) => (
                        <motion.div
                          key={c.label}
                          variants={{
                            hidden: { opacity: 0, x: 24, scale: 0.95 },
                            visible: { opacity: 1, x: 0, scale: 1 },
                          }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="relative flex items-start gap-4 pl-12"
                        >
                          <div className="absolute left-[19px] top-1.5 h-[13px] w-[13px] rounded-full border-2 border-accent bg-background shadow-[0_0_0_4px_rgba(177,62,217,0.15)]" />
                          <div className="flex-1 rounded-xl backdrop-blur-lg bg-zinc-950/40 border border-zinc-800/50 p-3.5">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{c.label}</p>
                            <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted">{c.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!showArchitecture && (
                <div className="flex flex-wrap justify-center gap-2">
                  {CALLOUTS.map((c) => (
                    <span
                      key={c.label}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle backdrop-blur-xl"
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
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