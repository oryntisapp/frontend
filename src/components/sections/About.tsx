import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";
import aboutusSection from "../../assets/images/sections/aboutus_section.svg";

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading eyebrow="About Oryntis" headline="Operations intelligence, built to unify the business" align="center" className="mx-auto" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUpStagger}
        className="mt-14 grid items-center gap-12 lg:grid-cols-2"
      >
        {/* Left — narrative */}
        <motion.div variants={fadeUp}>
          {/* QA fix: paragraph 1 copy updated per request */}
          <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
            Oryntis was founded in early 2024 to solve a problem every growing organization
            hits: finance, HR, sales, and operations each running on their own tools with no
            shared layer connecting them. The result is duplicated work, fragmented data, and
            decisions made on stale information.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            We built an intelligent operations platform that sits across every department, unifying systems, automating workflows, and giving your team one real time view of what's actually happening.
          </p>
          {/* QA fix: the standalone "Charlotte Evans | Founder" row has been removed. */}
        </motion.div>

        {/* Right — image-backed core-vision card, replacing the old facts/snapshot panel */}
        <motion.div variants={fadeUp}>
          <div className="group relative min-h-[340px] w-full overflow-hidden rounded-2xl border border-border shadow-card">
            {/* Background image layer */}
            <img
              src={aboutusSection}
              alt="Oryntis operations intelligence core engine"
              loading="lazy"
              decoding="async"
              width={600}
              height={340}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Cinematic vignette — near-black base fade (not pure black, matching the
                project's no-pure-black rule) plus a brand-accurate purple color wash using
                the real gradient-deep token value rather than a generic Tailwind purple. */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background-base via-background-base/60 to-transparent" />
            <div
              className="pointer-events-none absolute inset-0 z-10 opacity-25 mix-blend-color"
              style={{ backgroundColor: "#6013A1" }}
            />

            {/* Foreground statement, anchored above the vignette */}
            <div className="relative z-20 flex h-full min-h-[340px] flex-col justify-end p-8">
              <span className="mb-2 block font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
                Our Core Engine
              </span>
              <h3 className="max-w-xs text-xl font-semibold leading-snug tracking-tight text-foreground">
                Connecting distributed enterprise workflows into a single, high-performance execution grid.
              </h3>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}