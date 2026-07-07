import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Rocket, Landmark, Users2, GitBranch, Gauge } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

/**
 * TEMPORARY IMAGES — using Lorem Picsum (https://picsum.photos), a free, no-key,
 * hotlink-friendly placeholder photo service. `source.unsplash.com` (the old go-to for
 * this) was fully deprecated and no longer resolves, so don't reach for that instead.
 * Picsum can't be searched by keyword/theme — the `seed` string just guarantees you get
 * the *same* photo back every time rather than a random one on each reload — so these
 * are believable generic corporate/tech photography, not literally "a skyscraper" etc.
 * Swap the `image` field on each entry below for real photography whenever it's ready;
 * nothing else in this component needs to change.
 */
const AUDIENCE = [
  {
    icon: Building2,
    title: "Enterprise organizations",
    desc: "Unify operations across every department without adding headcount.",
    image: "https://picsum.photos/seed/oryntis-enterprise/1000/1400",
  },
  {
    icon: Rocket,
    title: "SaaS companies scaling fast",
    desc: "Automate the operational overhead that comes with rapid growth.",
    image: "https://picsum.photos/seed/oryntis-saas/1000/1400",
  },
  {
    icon: Landmark,
    title: "Finance & HR departments",
    desc: "Run recurring processes without the manual busywork.",
    image: "https://picsum.photos/seed/oryntis-finance/1000/1400",
  },
  {
    icon: Users2,
    title: "Operations managers",
    desc: "See execution across teams in one command view, in real time.",
    image: "https://picsum.photos/seed/oryntis-ops/1000/1400",
  },
  {
    icon: GitBranch,
    title: "Digital transformation teams",
    desc: "Replace fragmented tools with one coordinated operations layer.",
    image: "https://picsum.photos/seed/oryntis-transform/1000/1400",
  },
  {
    icon: Gauge,
    title: "Process optimization teams",
    desc: "Find and fix bottlenecks before they cost the business.",
    image: "https://picsum.photos/seed/oryntis-process/1000/1400",
  },
];

function Panel({ item, active, onActivate }: { item: (typeof AUDIENCE)[number]; active: boolean; onActivate: () => void }) {
  return (
    <motion.div
      onClick={onActivate}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      tabIndex={0}
      role="button"
      aria-expanded={active}
      aria-label={item.title}
      animate={{ flexGrow: active ? 8 : 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      style={{ flexBasis: 0, flexShrink: 1 }}
      className="group relative h-full min-w-[64px] cursor-pointer overflow-hidden rounded-xl border border-border focus-visible:outline-accent"
    >
      {/* image — slow continuous pan/zoom while active, standing in for a video loop
          until real footage/photography exists */}
      <motion.img
        src={item.image}
        alt={item.title}
        draggable={false}
        animate={active ? { scale: [1, 1.09] } : { scale: 1 }}
        transition={active ? { duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } : { duration: 0.6 }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* legibility scrim + brand duotone wash, consistent with the rest of the site */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/35 to-background-base/10" />
      <div
        className="absolute inset-0 opacity-50 mix-blend-color"
        style={{ background: "linear-gradient(180deg, #B13ED9 0%, #18044B 100%)" }}
      />

      {/* collapsed state — vertical label, only visible on the panels that AREN'T active */}
      <motion.div
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center p-4"
      >
        <span
          className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-foreground/80"
          style={{ writingMode: "vertical-rl" }}
        >
          {item.title}
        </span>
      </motion.div>

      {/* expanded state — full detail, only visible on the active panel */}
      <motion.div
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.35, delay: active ? 0.2 : 0 }}
        className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8"
      >
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white/10 backdrop-blur-xl">
          <item.icon className="h-4 w-4 text-white" strokeWidth={1.75} />
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{item.title}</h3>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/75">{item.desc}</p>
      </motion.div>
    </motion.div>
  );
}

export default function WhoItsFor() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <SectionHeading
        eyebrow="Who It's For"
        headline="Built for the people who run the business"
        align="center"
        className="mx-auto"
      />

      {/* Desktop/tablet — horizontal expanding accordion. Hover or click a panel to expand
          it; siblings shrink and shift to make room, then settle back when you move on. */}
      <div className="mt-14 hidden h-[520px] gap-2 overflow-hidden rounded-2xl md:flex lg:h-[600px]">
        {AUDIENCE.map((item, i) => (
          <Panel key={item.title} item={item} active={active === i} onActivate={() => setActive(i)} />
        ))}
      </div>

      {/* Mobile — a horizontal expanding accordion doesn't translate to a narrow screen
          (there's no room for "narrow siblings"), so fall back to simple full-width
          stacked cards instead of forcing the desktop interaction into a bad fit. */}
      <div className="mt-14 flex flex-col gap-3 md:hidden">
        {AUDIENCE.map((item) => (
          <div key={item.title} className="relative h-48 overflow-hidden rounded-xl border border-border">
            <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background-base via-background-base/40 to-transparent" />
            <div className="relative flex h-full flex-col justify-end p-5">
              <item.icon className="mb-2 h-5 w-5 text-accent" strokeWidth={1.75} />
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-white/75">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}