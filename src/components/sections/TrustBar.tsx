const LOGOS = ["Finlace", "Northbeam Ops", "Verdant Group", "Halcyon SaaS", "Kestrel Health", "Amaranth Retail", "Solace Logistics", "Meridian Capital", "Argon Industrial", "Vantpoint HR"];

export default function TrustBar() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="relative z-10 border-y border-border bg-background-elevated/60 py-8 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:px-8">
        <p className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-foreground-subtle">
          Trusted by operations teams
        </p>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
            {doubled.map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap font-mono text-lg font-semibold text-foreground-muted opacity-50 transition-opacity hover:opacity-100"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
