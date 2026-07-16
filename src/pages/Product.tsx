import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, Layers3, Sparkles, Workflow, ShieldCheck, MessageSquareQuote } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import GlassCard from "../components/ui/GlassCard";
import SectionHeading from "../components/ui/SectionHeading";
import { fadeUp } from "../lib/motionVariants";

const dailyMoments = [
  {
    title: "See what matters first",
    text: "A live command center highlights delays, exceptions, and opportunities without forcing teams to dig through dashboards.",
    icon: BarChart3,
  },
  {
    title: "Turn context into action",
    text: "Oryntis OS turns fragmented updates into crisp priorities so teams can follow through quickly and confidently.",
    icon: Sparkles,
  },
  {
    title: "Keep every handoff aligned",
    text: "Operations, finance, sales, and HR stay connected around the same plan instead of working from conflicting updates.",
    icon: Workflow,
  },
] as const;

const operatingModes = [
  {
    title: "Unified operations layer",
    text: "Bring planning, workflow, and decision support into one place for leaders and frontline teams.",
  },
  {
    title: "Reliable execution",
    text: "Automate repetitive follow-up while keeping people in control of the moments that matter most.",
  },
  {
    title: "Clear guidance",
    text: "Surface practical recommendations that explain what to do next, why it matters, and who needs to act.",
  },
] as const;

export default function Product() {
  return (
    <div className="relative overflow-hidden px-6 pb-24 pt-24 sm:pt-28 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[720px] w-[920px] -translate-x-1/2 rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, #B13ED9 0%, #6013A1 38%, transparent 72%)" }}
      />

      <main className="relative mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-background-elevated/70 px-6 py-14 shadow-[0_0_80px_rgba(177,62,217,0.12)] backdrop-blur-2xl sm:px-8 lg:px-10 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_36%)]" />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
          >
            <div>
              <Badge className="border-accent/30 bg-accent/10 text-accent">Oryntis OS</Badge>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                A calmer way to run every moving part of the business.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground-muted">
                Oryntis OS brings strategy, operations, and execution into one experience so teams can move faster without losing control.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button variant="primary" href="https://app.oryntisapp.com" icon={<ArrowRight className="h-4 w-4" />} target="_blank" rel="noopener noreferrer">
                  Open the live product
                </Button>
                <Button variant="ghost" to="/" icon={<ArrowRight className="h-4 w-4" />}>
                  Back to the home page
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-3 text-sm text-foreground-muted">
                <span className="rounded-full border border-border bg-white/[0.03] px-3 py-2">Real-time visibility</span>
                <span className="rounded-full border border-border bg-white/[0.03] px-3 py-2">AI-guided recommendations</span>
                <span className="rounded-full border border-border bg-white/[0.03] px-3 py-2">Built for complex operations</span>
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-foreground-muted/90">
                Powered by modern AI infrastructure and accelerated data tooling, including NVIDIA RAPIDS, Morpheus, NeMo, and Triton to support fast, reliable execution at scale.
              </p>
            </div>

            <GlassCard className="border-white/10 bg-white/[0.03] p-6 sm:p-8" interactive={false}>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
                  <Layers3 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">What teams experience</p>
                  <p className="text-sm text-foreground-muted">From daily execution to board-level visibility.</p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {operatingModes.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-border/70 bg-background/70 p-4">
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-7 text-foreground-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </section>

        <section className="mt-24">
          <SectionHeading
            eyebrow="Why operators choose it"
            headline="A product designed to reduce noise and clarify momentum"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {dailyMoments.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                >
                  <GlassCard className="h-full border-white/10 bg-white/[0.03] p-6" interactive={false}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.text}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="mt-24 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="border-white/10 bg-white/[0.03] p-6 sm:p-8" interactive={false}>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Built for modern teams</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Better decisions start with better context.
            </h2>
            <p className="mt-4 text-base leading-8 text-foreground-muted">
              Oryntis OS aligns finance, operations, and customer-facing teams around one shared view of work so leaders can prioritize what matters instead of chasing updates.
            </p>
            <p className="mt-4 text-sm leading-7 text-foreground-muted/90">
              The experience is supported by a thoughtful AI stack that helps connect data, workflows, and recommendations in a way that feels practical rather than technical.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Shared visibility across systems and teams",
                "Actionable follow-through for every workflow",
                "A calmer operating rhythm in fast-moving companies",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-sm leading-7 text-foreground-muted">{item}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="border-white/10 bg-gradient-to-br from-accent/10 via-white/[0.03] to-transparent p-6 sm:p-8" interactive={false}>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Operational intelligence, made useful</p>
                <p className="text-sm text-foreground-muted">The product turns signals into guidance without overwhelming your team.</p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-semibold text-white">Faster triage</p>
                <p className="mt-2 text-sm leading-7 text-foreground-muted">Spot the friction points that slow execution and resolve them earlier.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-semibold text-white">Better handoffs</p>
                <p className="mt-2 text-sm leading-7 text-foreground-muted">Keep context moving from one team to the next without losing momentum.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-semibold text-white">Clear recommendations</p>
                <p className="mt-2 text-sm leading-7 text-foreground-muted">Get practical next steps written in the language of your business process.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/70 p-4">
                <p className="text-sm font-semibold text-white">Trusted execution</p>
                <p className="mt-2 text-sm leading-7 text-foreground-muted">Use automation where it helps while preserving visibility and human control.</p>
              </div>
            </div>
          </GlassCard>
        </section>

        <section className="mt-24">
          <SectionHeading
            eyebrow="Under the surface"
            headline="The platform combines real-time data, workflow intelligence, and AI guidance"
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                title: "Connected data",
                copy: "Unifies information from ERP, CRM, and HR systems so the platform sees the full picture.",
              },
              {
                title: "Workflow graphing",
                copy: "Maps dependencies and recurring patterns to reveal where work slows down and why.",
              },
              {
                title: "Live monitoring",
                copy: "Tracks operations in motion and highlights emerging issues before they become costly delays.",
              },
              {
                title: "AI recommendations",
                copy: "Translates operational insight into clear guidance teams can understand and act on quickly.",
              },
            ].map((item) => (
              <GlassCard key={item.title} className="border-white/10 bg-white/[0.03] p-6" interactive={false}>
                <p className="text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.copy}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[32px] border border-white/10 bg-background-elevated/70 px-6 py-14 shadow-[0_0_80px_rgba(177,62,217,0.08)] backdrop-blur-2xl sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">See it in action</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Make your operation feel more intentional, every single day.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-foreground-muted">
                Oryntis OS helps ambitious teams deliver better outcomes without piling on more meetings, more spreadsheets, or more fragmented tools.
              </p>
            </div>
            <GlassCard className="border-white/10 bg-white/[0.03] p-6" interactive={false}>
              <div className="flex items-start gap-3">
                <div className="rounded-2xl border border-accent/30 bg-accent/10 p-3 text-accent">
                  <MessageSquareQuote className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">“The best operating systems don’t just show data — they create clarity.”</p>
                  <p className="mt-2 text-sm text-foreground-muted">— Oryntis OS product philosophy</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" href="https://app.oryntisapp.com" icon={<ArrowRight className="h-4 w-4" />} target="_blank" rel="noopener noreferrer">
                  Launch the platform
                </Button>
                <Button variant="ghost" to="/" icon={<ArrowRight className="h-4 w-4" />}>
                  Learn more about Oryntis
                </Button>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>
    </div>
  );
}
