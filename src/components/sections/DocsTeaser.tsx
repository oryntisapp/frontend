import { Code2, Webhook, Boxes } from "lucide-react";
import Badge from "../ui/Badge";

const ITEMS = [
  { icon: Code2, label: "Operations API" },
  { icon: Webhook, label: "Workflow SDKs" },
  { icon: Boxes, label: "Enterprise integration tools" },
];

export default function DocsTeaser() {
  return (
    <section id="docs" className="relative z-10 mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="rounded-2xl border border-border bg-background-elevated/60 px-8 py-12 text-center shadow-card backdrop-blur-xl">
        <Badge className="mx-auto w-fit">Developer API — Coming Soon</Badge>
        <h3 className="text-gradient-white mx-auto mt-5 max-w-lg text-2xl font-semibold tracking-tight sm:text-3xl">
          Build directly on the Oryntis operations layer
        </h3>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ITEMS.map((i) => (
            <span
              key={i.label}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-xs text-foreground-muted"
            >
              <i.icon className="h-3.5 w-3.5 text-accent" />
              {i.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
