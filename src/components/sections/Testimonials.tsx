import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import { crossfadeSlide } from "../../lib/motionVariants";

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
      className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:py-32 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <SectionHeading eyebrow="What Operations Leaders Say" headline="Don't just take our word for it" align="center" className="mx-auto" />

      <div className="relative mt-14 min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={crossfadeSlide}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-x-0"
          >
            <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              “{current.quote}”
            </p>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-medium text-foreground">{current.name}</p>
              <p className="text-xs text-foreground-muted">{current.role}</p>
            </div>
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
