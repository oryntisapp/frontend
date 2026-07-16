import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Building2, Calendar, CheckCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { Turnstile } from "@marsidev/react-turnstile";
import SectionHeading from "../ui/SectionHeading";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import { fadeUp, fadeUpStagger } from "../../lib/motionVariants";

const MAP_EMBED =
  "https://maps.google.com/maps?q=525+Market+Street+San+Francisco+CA+94102&output=embed";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const [state, handleSubmit] = useForm("xojgqezg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [token, setToken] = useState<string | null>(null);
  const [turnstileError, setTurnstileError] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Record<string, string> = {};

    if (!name.trim()) next.name = "Name is required";
    if (!email.trim()) next.email = "Email is required";
    else if (!validateEmail(email)) next.email = "Enter a valid email address";
    if (!company.trim()) next.company = "Company is required";
    if (!message.trim()) next.message = "Message is required";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    if (!token) {
      setTurnstileError(true);
      return;
    }
    setTurnstileError(false);

    handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  };

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading eyebrow="Contact" headline="Talk to the team running Oryntis" align="center" className="mx-auto" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUpStagger}
        className="mt-14 grid gap-6 lg:grid-cols-2 items-stretch"
      >
        {/* Left — contact form */}
        <motion.div variants={fadeUp}>
          <GlassCard interactive={false} className="p-6 sm:p-8">
            {state.succeeded ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle className="h-12 w-12 text-success" />
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">Message sent</h3>
                <p className="mt-2 text-sm text-foreground-muted">
                  Thanks for reaching out. We'll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-foreground-muted">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mt-1.5 w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                      errors.name ? "border-danger" : "border-border"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
                  <ValidationError field="name" prefix="Name" errors={state.errors} className="mt-1 text-xs text-danger" />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-foreground-muted">
                    Work Email <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1.5 w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                      errors.email ? "border-danger" : "border-border"
                    }`}
                    placeholder="you@company.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
                  <ValidationError field="email" prefix="Email" errors={state.errors} className="mt-1 text-xs text-danger" />
                </div>

                <div>
                  <label htmlFor="contact-company" className="block text-xs font-medium text-foreground-muted">
                    Company <span className="text-danger">*</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`mt-1.5 w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                      errors.company ? "border-danger" : "border-border"
                    }`}
                    placeholder="Your company"
                  />
                  {errors.company && <p className="mt-1 text-xs text-danger">{errors.company}</p>}
                  <ValidationError field="company" prefix="Company" errors={state.errors} className="mt-1 text-xs text-danger" />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-foreground-muted">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`mt-1.5 w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-foreground-subtle focus:border-accent focus:ring-1 focus:ring-accent/30 ${
                      errors.message ? "border-danger" : "border-border"
                    }`}
                    placeholder="Tell us about your operations needs..."
                  />
                  {errors.message && <p className="mt-1 text-xs text-danger">{errors.message}</p>}
                  <ValidationError field="message" prefix="Message" errors={state.errors} className="mt-1 text-xs text-danger" />
                </div>

                <ValidationError errors={state.errors} className="text-xs text-danger" />

                <input type="hidden" name="cf-turnstile-response" value={token ?? ""} />

                <div className="flex justify-center">
                  <Turnstile
                    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                    onSuccess={(t) => { setToken(t); setTurnstileError(false); }}
                    onExpire={() => setToken(null)}
                    onError={() => { setToken(null); setTurnstileError(true); }}
                  />
                </div>
                {turnstileError && <p className="text-center text-xs text-danger">Please complete the verification</p>}

                <Button type="submit" variant="primary" className="w-full" disabled={state.submitting}>
                  {state.submitting ? "Sending..." : "Send message"}
                </Button>
              </form>
            )}
          </GlassCard>
        </motion.div>

        {/* Right — company details + map */}
        <motion.div variants={fadeUp} className="flex flex-col gap-6 h-full">
          <GlassCard interactive={false} className="p-6 sm:p-8">
            <h3 className="mb-5 text-sm font-semibold tracking-tight text-foreground">Company details</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <span className="text-sm text-foreground-muted">Oryntis App Technologies Inc.</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <span className="text-sm text-foreground-muted">525 Market Street, San Francisco, CA 94102, USA</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <a href="tel:+14155552117" className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                  +1 (415) 555-2117
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <a href="mailto:contact@oryntisapp.com" className="text-sm text-foreground-muted transition-colors hover:text-foreground">
                  contact@oryntisapp.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
                <span className="text-sm text-foreground-muted">Founded January 17, 2024</span>
              </div>
            </div>
          </GlassCard>

          <div className="flex flex-col flex-1 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Oryntis headquarters at 525 Market Street, San Francisco"
              src={MAP_EMBED}
              loading="lazy"
              className="flex-1 w-full min-h-[280px]"
              style={{ filter: "grayscale(0.4) invert(0.92) contrast(0.9)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
