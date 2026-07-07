import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGLTF } from "@react-three/drei";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const MODEL_URL = new URL("../../assets/models/robot.glb", import.meta.url).href;
const HARD_CAP_MS = 2500;

function timeout(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();
    let raf: number;

    const fontsReady = (document.fonts ? document.fonts.ready : Promise.resolve()).catch((err) => {
      console.warn("[Preloader] font loading rejected, continuing anyway:", err);
    });

    const modelReady = Promise.resolve(useGLTF.preload(MODEL_URL)).catch((err) => {
      console.warn("[Preloader] robot.glb preload rejected, continuing with fallback:", err);
    });

    const assetsReady = Promise.allSettled([fontsReady, modelReady]).then(() => {});

    const tick = () => {
      const elapsed = performance.now() - start;
      const pct = Math.min(96, (elapsed / HARD_CAP_MS) * 100);
      if (!cancelled) setProgress(pct);
      if (elapsed < HARD_CAP_MS && !cancelled) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    Promise.race([assetsReady, timeout(HARD_CAP_MS)]).then(() => {
      if (!cancelled) setProgress(100);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(() => setExiting(true), reduced ? 0 : 200);
      const done = setTimeout(onDone, reduced ? 150 : 700);
      return () => {
        clearTimeout(t);
        clearTimeout(done);
      };
    }
  }, [progress, onDone, reduced]);

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={false}
        animate={exiting ? (reduced ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }) : {}}
        transition={{ duration: reduced ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050308]"
        style={{ pointerEvents: exiting ? "none" : "auto" }}
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: progress >= 100 ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="font-mono text-lg tracking-tight text-foreground">Oryntis</span>
          <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-accent" style={{ width: `${progress}%` }} transition={{ ease: "linear" }} />
          </div>
          <span className="font-mono text-xs tracking-widest text-foreground-subtle">
            {Math.floor(progress).toString().padStart(2, "0")}%
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
