import { useEffect, useState } from "react";

const testimonials = [
  { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", score: "99%" },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", score: "97%" },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", score: "98%" },
  { img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", score: "96%" },
];

export default function TestimonialCluster() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-row items-center justify-end gap-4 w-auto self-end mt-4">
      <div className="flex flex-row items-center gap-3">
        {testimonials.map((t, i) => {
          const isActive = i === activeIdx;
          return (
            <div
              key={i}
              className={`w-14 h-14 rounded-full relative group border border-purple-500/20 bg-zinc-900 transition-all duration-700 ease-in-out ${
                isActive ? "scale-110 z-10" : "scale-100"
              }`}
            >
              <img
                src={t.img}
                alt={`Testimonial ${i + 1}`}
                className="w-full h-full rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-mono font-bold text-white">{t.score}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
