import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import img1 from "../../assets/images/testimonials/priya-nasser.svg";
import img2 from "../../assets/images/testimonials/daniel-osei.svg";
import img3 from "../../assets/images/testimonials/anika-fernando.svg";
import img4 from "../../assets/images/testimonials/marcus-reyes.svg";

const testimonials = [
  { img: img1, score: "99%" },
  { img: img2, score: "97%" },
  { img: img3, score: "98%" },
  { img: img4, score: "96%" },
];

export default function TestimonialCluster() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  function handleNavigate(idx: number) {
    window.dispatchEvent(new CustomEvent("testimonial-navigate", { detail: { index: idx } }));
    const el = document.getElementById("testimonials");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-row items-center gap-4 w-auto self-end mt-4">
      {testimonials.map((t, i) => {
        const isActive = i === activeIdx;
        return (
          <motion.div
            key={i}
            className="w-14 h-14 rounded-full relative border border-purple-500/20 bg-zinc-900 cursor-pointer"
            animate={{ scale: isActive ? 1.15 : 1, zIndex: isActive ? 30 : 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => handleNavigate(i)}
          >
            <img
              src={t.img}
              alt={`Testimonial ${i + 1}`}
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Absolute Progress Ring Overlay */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
              <circle
                cx="50%"
                cy="50%"
                r="46%"
                fill="none"
                stroke="#E16CF1"
                strokeWidth="2.5"
                strokeDasharray="100"
                className="transition-all duration-[3500ms] ease-linear"
                style={{ strokeDashoffset: isActive ? "0" : "100" }}
              />
            </svg>

            {/* Centered Rating Value Fading Layer */}
            <div className={`absolute inset-0 bg-zinc-950/70 rounded-full flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}>
              <span className="text-xs font-mono font-bold text-white tracking-tighter">{t.score}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
