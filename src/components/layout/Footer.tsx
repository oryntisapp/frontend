import { Mail, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { primaryCTA } from "../../lib/tokens";
import logoFull from "../../assets/images/logos/logo-full.svg";

const COLUMNS = [
  { title: "Company", links: [{ label: "About", href: "/#about" }, { label: "Contact Sales", href: "/#contact" }] },
  {
    title: "Product",
    links: [
      { label: "Core Operations Engine", href: "/#pillars" },
      { label: "Workflow Intelligence", href: "/#pillars" },
      { label: "Business Automation", href: "/#pillars" },
      { label: "Integration & Data Layer", href: "/#pillars" },
      { label: "Operations Command Dashboard", href: "/#dashboard-preview" },
    ],
  },
  { title: "Resources", links: [{ label: "Pricing", href: "/#pricing" }, { label: "Blog", href: "/blog", route: true }] },
  { title: "Contact", links: [{ label: "hello@oryntisapp.com", href: "mailto:hello@oryntisapp.com" }, { label: "525 Market St, San Francisco, CA", href: "/#contact" }, { label: "+1 (415) 555-2117", href: "tel:+14155552117" }] },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background-void">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center lg:px-8">
        <h2 className="text-gradient-white mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Ready to run your operations on one platform?
        </h2>
        <div className="mt-8 flex justify-center">
          <Button variant="large">{primaryCTA}</Button>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 border-t border-border px-6 py-16 sm:grid-cols-4 lg:px-8">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  {"route" in l && l.route ? (
                    <Link to={l.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 text-xs text-foreground-muted sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <img src={logoFull} alt="Oryntis" className="h-9 w-auto" />
          <span>© {new Date().getFullYear()} Oryntis. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms &amp; Conditions</Link>
          <div className="flex items-center gap-3">
            <a href="mailto:hello@oryntisapp.com" aria-label="Email us" className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <span className="font-mono tracking-wide text-foreground-subtle">Operations, unified.</span>
      </div>
    </footer>
  );
}
