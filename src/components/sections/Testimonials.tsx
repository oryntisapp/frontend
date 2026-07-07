import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { crossfadeSlide } from "../../lib/motionVariants";

const PORTRAIT_URL = new URL("../../assets/images/hero-portrait.jpeg", import.meta.url).href;

const TESTIMONIALS = [
  {
    quote:
      "Oryntis gave our operations team one place to see everything instead of six logins and a spreadsheet.",
    name: "Priya Nasser",
    role: "VP of Operations, Finlace",
  },
  {
    quote:
      "We automated the finance and HR busywork first — that alone freed up almost a full week per month.",
    name: "Daniel Osei",
    role: "Head of Automation, Northbeam Ops",
  },
  {
    quote:
      "The workflow intelligence layer found bottlenecks our own team hadn't noticed yet.",
    name: "Anika Fernando",
    role: "CFO, Verdant Group",
  },
  {
    quote:
      "Rolling this out across departments took weeks, not quarters, because everything already spoke the same language.",
    name: "Marcus Reyes",
    role: "Digital Transformation Lead, Argon Industrial",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative z-10 mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SectionHeading eyebrow="What Operations Leaders Say" headline="Don't just take our word for it" align="center" className="mx-auto" />

      <div className="relative mt-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={crossfadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <TiltCard maxTilt={6} className="flex flex-col overflow-hidden sm:flex-row">
              <div className="relative aspect-[3/4] w-full shrink-0 sm:w-[40%]">
                <img
                  src={PORTRAIT_URL}
                  alt={current.name}
                  className="h-full w-full object-cover object-[50%_20%]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-base/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-background-base/40" />
              </div>
              <div className="flex flex-1 flex-col justify-center p-8 sm:p-10">
                <div className="flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                  &ldquo;{current.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground">{current.name}</p>
                  <p className="text-xs text-foreground-muted">{current.role}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-accent" : "w-1.5 bg-border"}`}
          />
        ))}
      </div>
    </section>
  );
}
