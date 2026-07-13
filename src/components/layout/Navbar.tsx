import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { primaryCTA, primaryCTARoute } from "../../lib/tokens";
import logoFull from "../../assets/images/logos/logo-full.svg";
import faviconIcon from "../../assets/images/favicon/favicon.svg";

export interface NavLink {
  label: string;
  href: string;
  route?: boolean;
  sectionId?: string;
}

const LINKS: NavLink[] = [
  { label: "Home", href: "/", route: true },
  { label: "Testimonials", href: "/#testimonials", sectionId: "testimonials" },
  { label: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const observerRef = useRef<Map<string, IntersectionObserver>>(new Map());

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Intersection Observer for active section detection + scroll-based Home highlight
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    // Reset to Home when at the very top
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = LINKS.filter((l) => l.sectionId).map((l) => l.sectionId!);
    const observers = new Map<string, IntersectionObserver>();

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      }
    };

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const observer = new IntersectionObserver(handleIntersect, {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.set(id, observer);
    }

    observerRef.current = observers;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      for (const observer of observers.values()) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);

  const handleNavClick = useCallback(
    (link: NavLink, e: React.MouseEvent) => {
      if (!link.sectionId) return;

      e.preventDefault();

      // Already on Home — scroll directly (no navigation needed)
      if (location.pathname === "/") {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // On another page — navigate to /#sectionId; ScrollToTop handles the rest
      navigate(link.href);
    },
    [location.pathname, navigate]
  );

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: scrolled || location.pathname !== "/" ? "rgba(12,10,20,0.78)" : "rgba(12,10,20,0)",
          backdropFilter: scrolled || location.pathname !== "/" ? "blur(20px)" : "blur(0px)",
          borderBottomColor: scrolled || location.pathname !== "/" ? "rgba(150,167,185,0.12)" : "rgba(150,167,185,0)",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 border-b"
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-foreground" aria-label="Oryntis home">
            <img src={logoFull} alt="Oryntis" className="h-10 w-auto" />
          </Link>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((link) => {
              const isActive = link.sectionId
                ? activeSection === link.sectionId
                : link.label === "Home"
                  ? location.pathname === "/" && activeSection === ""
                  : location.pathname === link.href;

              if (link.route) {
                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className={`group relative text-[13px] font-medium tracking-wide transition-colors ${
                        isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 ease-out ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(link, e)}
                    className={`group relative text-[13px] font-medium tracking-wide transition-colors ${
                      isActive ? "text-foreground" : "text-foreground-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <Link
              to={primaryCTARoute}
              className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-950/40 backdrop-blur-md border border-white/10 px-4 py-2 transition-all duration-300 ease-in-out hover:border-purple-500/50 hover:bg-purple-500/[0.05] hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]"
            >
              <motion.img
                src={faviconIcon}
                alt=""
                className="w-9 h-9 shrink-0"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />
              <span className="font-medium text-sm tracking-wide text-white">{primaryCTA}</span>
            </Link>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-border bg-surface p-2 text-foreground md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={LINKS} />
    </>
  );
}
