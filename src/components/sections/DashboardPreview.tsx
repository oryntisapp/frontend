import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import ConnectionsWidget from "../dashboard/ConnectionsWidget";
import AIProcessWidget from "../dashboard/AIProcessWidget";
import InfraHealthWidget from "../dashboard/InfraHealthWidget";
import dashboardCharacter from "../../assets/images/sections/Dashboard_Character.svg";

export default function DashboardPreview() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section id="dashboard-preview" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading
          eyebrow="Operations Command Dashboard"
          headline="Everything running, visible in one place"
        />
        {isUnlocked && (
          <button
            onClick={() => document.getElementById("dashboard-preview")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
          >
            See Full Dashboard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        )}
      </div>

      <div className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-background-elevated/70 shadow-card backdrop-blur-xl">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.div
              key="gateway"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
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
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-64 sm:w-72"
                  >
                    <img
                      src={dashboardCharacter}
                      alt=""
                      className="w-full"
                    />
                  </motion.div>
                </div>

                <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                  <p className="font-mono text-xs uppercase tracking-widest text-accent">
                    System Gateway
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground sm:text-3xl">
                    System Live Control Console
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground-muted">
                    Authenticate initialization to visualize cross-department automations in
                    real-time.
                  </p>
                  <motion.button
                    onClick={() => setIsUnlocked(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8 inline-flex items-center gap-2.5 rounded-xl bg-purple-950/40 backdrop-blur-md border border-purple-500/30 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:shadow-[0_0_35px_rgba(147,51,234,0.6)] hover:border-purple-500/50"
                  >
                    <Lock className="h-4 w-4" />
                    ACCESS COMMAND DASHBOARD
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
              className="relative p-4 sm:p-6"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(177,62,217,0.16), transparent 70%)",
                }}
              />
              <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
                <ConnectionsWidget />
                <AIProcessWidget />
                <InfraHealthWidget />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
