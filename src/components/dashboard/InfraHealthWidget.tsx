import GlassCard from "../ui/GlassCard";

type Tone = "success" | "warning" | "danger";

const METRICS: { label: string; value: string; tone: Tone }[] = [
  { label: "Active Workflows", value: "1,284", tone: "success" },
  { label: "Automation Success Rate", value: "98.4%", tone: "success" },
  { label: "System Latency", value: "142ms", tone: "success" },
  { label: "API Utilization", value: "76%", tone: "warning" },
  { label: "Operational Efficiency Score", value: "91 / 100", tone: "success" },
  { label: "Task Completion Rate", value: "94.1%", tone: "success" },
  { label: "Finance Dept. Performance", value: "Nominal", tone: "success" },
  { label: "Support Queue Health", value: "Attention", tone: "danger" },
];

const TONE_DOT: Record<Tone, string> = {
  success: "bg-success shadow-[0_0_8px_2px_rgba(61,214,140,0.5)]",
  warning: "bg-warning shadow-[0_0_8px_2px_rgba(240,187,47,0.5)]",
  danger: "bg-danger shadow-[0_0_8px_2px_rgba(225,79,79,0.5)]",
};

export default function InfraHealthWidget() {
  return (
    <GlassCard className="col-span-1 h-full p-5 md:col-span-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Infrastructure Health</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {METRICS.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-white/[0.02] p-4">
            <div className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${TONE_DOT[m.tone]}`} />
              <p className="text-[10px] uppercase tracking-wide text-foreground-subtle">{m.label}</p>
            </div>
            <p className="mt-2 text-xl font-semibold tracking-tight text-foreground">{m.value}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
