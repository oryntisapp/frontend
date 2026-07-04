import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import ConnectionsWidget from "../dashboard/ConnectionsWidget";
import AIProcessWidget from "../dashboard/AIProcessWidget";
import InfraHealthWidget from "../dashboard/InfraHealthWidget";

export default function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Operations Command Dashboard" headline="Everything running, visible in one place" />
        <Link
          to="/dashboard"
          className="group flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-bright"
        >
          See Full Dashboard
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-14 overflow-hidden rounded-3xl border border-border bg-background-elevated/70 p-4 shadow-card backdrop-blur-xl sm:p-6"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(177,62,217,0.16), transparent 70%)" }}
        />
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
          <ConnectionsWidget />
          <AIProcessWidget />
          <InfraHealthWidget />
        </div>
      </motion.div>
    </section>
  );
}
