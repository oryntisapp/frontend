import { motion } from "framer-motion";
import { Hexagon, ExternalLink } from "lucide-react";
import Badge from "../components/ui/Badge";
import { fadeUp } from "../lib/motionVariants";

export default function Product() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
      {/* Hero area glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #B13ED9 0%, #6013A1 40%, transparent 70%)" }}
      />

      {/* Spinning geometric matrix background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <Hexagon
          className="h-48 w-48 animate-[spin_20s_linear_infinite] text-purple-500/10 sm:h-64 sm:w-64"
          strokeWidth={0.5}
        />
        <Hexagon
          className="absolute h-36 w-36 animate-[spin_30s_linear_infinite_reverse] text-purple-500/10 sm:h-48 sm:w-48"
          strokeWidth={0.5}
        />
      </div>

      {/* Centered maintenance showcase */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
      >
        <Badge className="border-warning/30 bg-warning/10 text-warning">
          Under Maintenance
        </Badge>

        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Core Modules Under Optimization
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          We are currently calibrating our core operations engine infrastructure to deliver enhanced
          system intelligence. Live control systems remain fully operational via the enterprise
          console.
        </p>

        <div className="mt-10">
          <a
            href="http://app.oryntisapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-medium tracking-wide text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.7)]"
          >
            GO TO DASHBOARD
            <ExternalLink className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
