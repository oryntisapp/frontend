import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { primaryCTA, primaryCTARoute } from "../../lib/tokens";
import logoFull from "../../assets/images/logos/logo-full.svg";
import faviconIcon from "../../assets/images/favicon/favicon.svg";

export interface NavLink {
  label: string;
  href: string;
  route?: boolean;
}

const LINKS: NavLink[] = [
  { label: "Home", href: "/", route: true },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
              if (link.route) {
                return (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group relative text-[13px] font-medium tracking-wide text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100" />
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative text-[13px] font-medium tracking-wide text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100" />
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