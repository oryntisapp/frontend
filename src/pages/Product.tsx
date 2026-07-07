import { motion } from "framer-motion";
import { Hexagon, ArrowRight } from "lucide-react";
import ConnectionsWidget from "../components/dashboard/ConnectionsWidget";
import AIProcessWidget from "../components/dashboard/AIProcessWidget";
import InfraHealthWidget from "../components/dashboard/InfraHealthWidget";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { fadeUp } from "../lib/motionVariants";

export default function Product() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-8">
      {/* Hero area glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, #B13ED9 0%, #6013A1 40%, transparent 70%)" }}
      />

      {/* Muted widget preview — teases the real product */}
      <div className="pointer-events-none relative select-none opacity-40" aria-hidden="true">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2"><ConnectionsWidget /></div>
          <div className="md:col-span-2"><AIProcessWidget /></div>
          <div className="md:col-span-4"><InfraHealthWidget /></div>
        </div>
        {/* Overlay to fully block interaction */}
        <div className="absolute inset-0" />
      </div>

      {/* Centered maintenance panel */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="relative -mt-8 flex justify-center"
      >
        <div className="w-full max-w-lg rounded-2xl border border-border bg-background-elevated/90 p-10 shadow-card backdrop-blur-2xl sm:p-12">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-6 border-warning/30 bg-warning/10 text-warning">
              Under Maintenance
            </Badge>

            <Hexagon className="mx-auto h-8 w-8 text-accent" fill="currentColor" fillOpacity={0.15} />

            <h1 className="text-gradient-white mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              The Platform Experience Is Getting an Upgrade
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
              We're refining the Oryntis platform view to give you a clearer picture of your
              operations. The full experience will be back shortly.
            </p>

            <div className="mt-8">
              <Button variant="primary" to="/#pricing" icon={<ArrowRight className="h-4 w-4" />}>
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
