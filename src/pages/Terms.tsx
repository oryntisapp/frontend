import { motion } from "framer-motion";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import { fadeUp } from "../lib/motionVariants";

const SECTIONS = [
  {
    title: "1. Agreement to Terms",
    body: "By accessing or using the Oryntis AI Business Operations Platform (the 'Platform'), you agree to be bound by these Terms and Conditions ('Terms'). If you are entering into these Terms on behalf of an organization, you represent that you have the authority to bind that organization. If you do not agree to these Terms, do not use the Platform.",
  },
  {
    title: "2. Description of Service",
    body: 'The Oryntis Platform provides an AI-powered operations layer consisting of the Core Operations Engine, Workflow Intelligence System, Business Automation Layer, Integration & Data Layer, and Operations Command Dashboard — collectively referred to as the "Service." The Service is designed to connect to your existing ERP, CRM, HR, and finance systems and automate cross-functional workflows. Detailed descriptions of each component are available on our website.',
  },
  {
    title: "3. Accounts",
    body: "You are responsible for providing accurate registration information and for maintaining the confidentiality of your account credentials. You are responsible for all activity that occurs under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.",
  },
  {
    title: "4. Subscription, Billing & Usage-Based Pricing",
    body: 'The Service is offered under tiered subscription plans with a monthly automation-task allowance, as described on our Pricing page (available at /#pricing). Usage beyond your plan\'s included allowance is billed on a metered per-task basis. Enterprise licensing and API access pricing are available on request. All fees are non-refundable except as expressly stated in these Terms. We may change our pricing with notice to you; price changes will take effect at the start of your next billing period.',
  },
  {
    title: "5. Acceptable Use",
    body: "You agree not to reverse engineer, decompile, or disassemble the Platform; to use the Service to process unlawful data or in violation of any applicable laws; to attempt to circumvent usage metering or automation-task allowances; to upload malicious code or interfere with the operation of the Platform; or to use the Service in any way that could harm Oryntis's reputation or the experience of other customers.",
  },
  {
    title: "6. Intellectual Property",
    body: 'Oryntis retains all rights, title, and interest in and to the Platform, including its software, algorithms, AI models, documentation, and brand assets. Nothing in these Terms grants you any ownership rights in the Platform. You retain all rights to your operational data and business information that you process through the Service. You grant Oryntis a license to process that data solely for the purpose of providing the Service to you.',
  },
  {
    title: "7. Third-Party Integrations",
    body: 'The Platform connects to third-party systems you authorize (including ERP, CRM, HRIS, and finance applications). Those systems are governed by their own terms of service and privacy policies. Oryntis is not responsible for the availability, security, or performance of third-party systems, nor for any data loss or corruption that occurs within those systems. You are responsible for maintaining appropriate authorizations to connect your third-party accounts to the Service.',
  },
  {
    title: "8. Termination",
    body: "Either party may terminate these Terms with written notice as specified in your subscription agreement. Upon termination, your access to the Platform will be deactivated. We will provide a reasonable window for you to export your operational data before deletion, subject to our data retention policy. Sections of these Terms that by their nature should survive termination (including Intellectual Property, Disclaimers, and Limitation of Liability) will remain in effect.",
  },
  {
    title: "9. Disclaimers & Limitation of Liability",
    body: 'THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED. Oryntis provides operational intelligence, automation recommendations, and workflow insights — all final business decisions remain your responsibility. We do not guarantee that the Service will be uninterrupted, error-free, or that AI-driven recommendations will always be accurate. TO THE MAXIMUM EXTENT PERMITTED BY LAW, ORYNTIS\'S TOTAL LIABILITY FOR ANY CLAIMS ARISING FROM THESE TERMS OR YOUR USE OF THE PLATFORM IS LIMITED TO THE AMOUNT YOU PAID US IN THE TWELVE MONTHS PRECEDING THE CLAIM. Oryntis is not liable for any indirect, incidental, or consequential damages.',
  },
  {
    title: "10. Governing Law",
    body: "These Terms are governed by the laws of the State of California, without regard to its conflict of laws principles. Any disputes arising from these Terms shall be resolved in the state or federal courts located in San Francisco, California.",
  },
  {
    title: "11. Changes to Terms",
    body: "We may modify these Terms at any time. Material changes will be communicated through the Platform or by email. Your continued use of the Service after changes take effect constitutes acceptance of the modified Terms. If you do not agree to the changes, you may terminate your account before they take effect.",
  },
  {
    title: "12. Contact",
    body: 'For questions about these Terms, please contact us at hello@oryntisapp.com or by mail at Oryntis App Technologies Inc., 525 Market Street, San Francisco, CA 94102, USA. You can also reach us by phone at +1 (415) 555-2117.',
  },
];

export default function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-28 lg:px-8">
      <SectionHeading eyebrow="Legal" headline="Terms &amp; Conditions" />

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
