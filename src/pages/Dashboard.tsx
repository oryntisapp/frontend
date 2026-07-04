import { motion } from "framer-motion";
import { Hexagon, Bell, Settings } from "lucide-react";
import ConnectionsWidget from "../components/dashboard/ConnectionsWidget";
import AIProcessWidget from "../components/dashboard/AIProcessWidget";
import InfraHealthWidget from "../components/dashboard/InfraHealthWidget";

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-background-elevated/70 px-6 py-5 shadow-card backdrop-blur-xl sm:flex-row sm:items-center"
      >
        <div className="flex items-center gap-3">
          <Hexagon className="h-6 w-6 text-accent" fill="currentColor" fillOpacity={0.15} />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">Oryntis</p>
            <h1 className="text-lg font-semibold tracking-tight">Operations Command Center</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button aria-label="Notifications" className="rounded-lg border border-border bg-white/[0.03] p-2 text-foreground-muted transition-colors hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          <button aria-label="Settings" className="rounded-lg border border-border bg-white/[0.03] p-2 text-foreground-muted transition-colors hover:text-foreground">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-2">
          <ConnectionsWidget />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-2">
          <AIProcessWidget />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} className="md:col-span-4">
          <InfraHealthWidget />
        </motion.div>
      </motion.div>
    </div>
  );
}
