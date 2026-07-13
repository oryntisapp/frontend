import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles two responsibilities:
 *  1. Scroll to top on pathname changes (standard SPA behaviour).
 *  2. When navigating to a URL with a hash (e.g. /#pricing from /blog),
 *     scroll to top first, then after the destination page renders,
 *     smooth-scroll to the target section.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // Always scroll to top when the pathname changes
    if (pathname !== prevPathname.current) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      prevPathname.current = pathname;
    }

    // If there's a hash, scroll to the target section after the DOM renders.
    // Uses requestAnimationFrame to wait for the current paint cycle to finish,
    // ensuring the destination page's sections are in the DOM.
    if (hash) {
      const sectionId = hash.slice(1);

      const scrollToSection = () => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      // Try immediately (works when already on Home page)
      if (!scrollToSection()) {
        // Not found yet — the destination page likely hasn't rendered.
        // Wait for the next animation frame, then retry once more.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            scrollToSection();
          });
        });
      }
    }
  }, [pathname, hash]);

  return null;
}
