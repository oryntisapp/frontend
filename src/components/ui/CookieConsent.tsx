import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const STORAGE_KEY = "oryntis-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const respond = (choice: "accepted" | "rejected") => {
    window.localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-xl rounded-2xl border border-border bg-background-elevated/90 p-5 shadow-card backdrop-blur-xl sm:inset-x-auto sm:right-6"
        >
          <p className="text-sm text-foreground">
            We use cookies to run Oryntis and understand how the platform is used.
          </p>
          <p className="mt-1 text-xs text-foreground-muted">
            You can accept or decline non-essential cookies at any time.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => respond("rejected")}
              className="flex-1 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-border-hover hover:bg-surface cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              Decline
            </button>
            <button
              onClick={() => respond("accepted")}
              className="flex-1 rounded-lg bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-accent-bright cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
            >
              Accept
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
