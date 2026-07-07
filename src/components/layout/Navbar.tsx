import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Hexagon } from "lucide-react";
import Button from "../ui/Button";
import MobileMenu from "./MobileMenu";
import { primaryCTA, primaryCTARoute } from "../../lib/tokens";

export interface NavLink {
  label: string;
  href: string;
  route?: boolean;
}

// "Docs" removed: the DocsTeaser section it pointed to has been replaced by
// PlatformShowcase (see Home.tsx) — a dangling nav link to a removed section
// would otherwise be a dead-end click, which the functional requirements
// explicitly rule out.
const LINKS: NavLink[] = [
  { label: "Platform", href: "/#pillars" },
  { label: "Dashboard", href: "/dashboard", route: true },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Product", href: "/product", route: true },
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
            <Hexagon className="h-5 w-5 text-accent" strokeWidth={2} fill="currentColor" fillOpacity={0.15} />
            <span className="font-mono text-sm font-semibold tracking-tight">Oryntis</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) =>
              link.route ? (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="group relative text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100" />
                  </Link>
                </li>
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-200 ease-out group-hover:scale-x-100" />
                  </a>
                </li>
              )
            )}
          </ul>

          <div className="hidden md:block">
            <Button variant="primary" to={primaryCTARoute} className="!px-4 !py-2 !text-xs">
              {primaryCTA}
            </Button>
          </div>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-lg border border-border bg-surface p-2 text-foreground md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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