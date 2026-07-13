import { Mail, Linkedin, Facebook, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import logoFull from "../../assets/images/logos/logo-full.svg";
import PinterestIcon from "../ui/PinterestIcon";

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
  { title: "Resources", links: [{ label: "Pricing", href: "/#pricing" }, { label: "Blog", href: "/blog" }] },
  { title: "Contact", links: [{ label: "hello@oryntisapp.com", href: "mailto:hello@oryntisapp.com" }, { label: "525 Market St, San Francisco, CA", href: "/#contact" }, { label: "+1 (415) 555-2117", href: "tel:+14155552117" }] },
];

const SOCIALS = [
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "YouTube", href: "#", icon: Youtube },
  { label: "Pinterest", href: "#", icon: PinterestIcon },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "X", href: "#", icon: XIcon },
];

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background-void">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 border-t border-border px-6 py-16 sm:grid-cols-4 lg:px-8">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="font-mono text-xs uppercase tracking-widest text-foreground-subtle">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-border px-6 py-8 text-xs text-foreground-muted sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <img src={logoFull} alt="Oryntis" className="h-9 w-auto" />
          <span>&copy; {new Date().getFullYear()} Oryntis. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms &amp; Conditions</Link>
          <div className="flex items-center gap-3">
            <a href="mailto:hello@oryntisapp.com" aria-label="Email us" className="hover:text-foreground"><Mail className="h-4 w-4" /></a>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="hover:text-foreground"><s.icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <span className="font-mono tracking-wide text-foreground-subtle">Operations, unified.</span>
      </div>
    </footer>
  );
}
