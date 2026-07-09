import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import { fadeUp } from "../lib/motionVariants";

const SECTIONS = [
  {
    title: "1. Introduction",
    body: "Oryntis App Technologies Inc. ('Oryntis,' 'we,' 'us,' 'our') operates the Oryntis AI Business Operations Platform. This Privacy Policy explains how we collect, use, store, and protect information when you visit our website or use our platform. By accessing or using Oryntis, you agree to the practices described in this policy.",
  },
  {
    title: "2. Information We Collect",
    body: "We collect account and contact information you provide directly — your name, work email address, and company name when you register for an account or contact our sales team. When you connect third-party systems (ERP, CRM, HRIS, finance tools) to the Oryntis platform, we process operational data from those systems on your behalf as a data processor; we do not claim ownership of that data. We also collect standard web analytics data and use cookies as described in Section 8 below.",
  },
  {
    title: "3. How We Use Information",
    body: "We use the information we collect to deliver the Core Operations Engine, Workflow Intelligence System, Business Automation Layer, and Operations Command Dashboard functionality you've subscribed to; to improve and optimize the platform; to bill you under our usage-based automation pricing model; to communicate with you about your account, billing, and platform updates; and to provide customer support.",
  },
  {
    title: "4. Data Sharing & Third Parties",
    body: "Oryntis does not sell your personal information or your operational data to advertisers. We share data only with sub-processors necessary to operate the platform — including cloud infrastructure providers and the third-party connectors (ERP, CRM, HR, finance systems) you explicitly authorize us to connect to. Those third-party services are governed by their own terms and privacy policies.",
  },
  {
    title: "5. Data Security",
    body: "We implement enterprise-grade security measures including encryption of data in transit (TLS) and at rest, access controls, and regular security reviews to protect your information. While we design our systems to meet high security standards, no method of transmission or storage is completely infallible, and we cannot guarantee absolute security.",
  },
  {
    title: "6. Data Retention",
    body: "We retain your personal information for as long as your account remains active and for a reasonable period afterward to satisfy legal obligations, resolve disputes, and enforce agreements. Operational data processed on your behalf is retained according to your account configuration and any data processing agreement in place.",
  },
  {
    title: "7. Your Rights",
    body: "Depending on your jurisdiction, you may have rights to access, correct, delete, or port your personal information. You can update your account information at any time through the platform. To exercise other rights or submit a data subject request, contact us at hello@oryntisapp.com. We will respond within the timeframe required by applicable law.",
  },
  {
    title: "8. Cookies",
    body: 'Our website uses cookies and similar tracking technologies for analytics and essential functionality. You can manage your cookie preferences through our cookie consent banner, which appears on your first visit. You may also configure your browser to block or delete cookies, though this may affect certain features of the site. Our cookie consent mechanism stores your preference under the key "oryntis-cookie-consent" in your browser\'s local storage.',
  },
  {
    title: "9. Children's Privacy",
    body: 'The Oryntis platform is a business-to-business service not directed at individuals under 18. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us so we can remove it.',
  },
  {
    title: "10. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Material changes will be communicated through the platform or by email to the address associated with your account. Your continued use of Oryntis after changes take effect constitutes acceptance of the updated policy.",
  },
  {
    title: "11. Contact Us",
    body: 'If you have questions about this Privacy Policy or our data practices, please contact us at hello@oryntisapp.com or by mail at Oryntis App Technologies Inc., 525 Market Street, San Francisco, CA 94102, USA. You can also reach us by phone at +1 (415) 555-2117.',
  },
];

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 lg:px-8">
      <SectionHeading eyebrow="Legal" headline="Privacy Policy" />

      <p className="mt-4 font-mono text-xs tracking-wide text-foreground-subtle">
        Last updated: July 1, 2026
      </p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={fadeUp}
        className="mt-10"
      >
        <GlassCard interactive={false} className="p-8 sm:p-10">
          <div className="prose prose-invert max-w-none space-y-8">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h3 className="text-base font-semibold tracking-tight text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
