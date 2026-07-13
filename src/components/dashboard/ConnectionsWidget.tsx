import { Database, Landmark, Users, Wallet, Cloud, MessageCircle, ShoppingCart, Server } from "lucide-react";
import GlassCard from "../ui/GlassCard";

type Status = "connected" | "syncing" | "available";

const STATUS_STYLES: Record<Status, string> = {
  connected: "bg-success/15 text-success border-success/30",
  syncing: "bg-warning/15 text-warning border-warning/30",
  
  available: "bg-white/[0.04] text-foreground-subtle border-border",
};

const SYSTEMS: { icon: typeof Database; name: string; status: Status; synced: string }[] = [
  { icon: Landmark, name: "NetSuite ERP", status: "connected", synced: "2 min ago" },
  { icon: Users, name: "Workday HRIS", status: "connected", synced: "5 min ago" },
  { icon: Wallet, name: "QuickBooks", status: "syncing", synced: "syncing now" },
  { icon: ShoppingCart, name: "Salesforce CRM", status: "connected", synced: "1 min ago" },
  { icon: Cloud, name: "AWS Data Lake", status: "connected", synced: "just now" },
  { icon: MessageCircle, name: "Slack", status: "connected", synced: "3 min ago" },
  { icon: Server, name: "Internal Postgres", status: "connected", synced: "just now" },
  { icon: Database, name: "SAP S/4HANA", status: "available", synced: "not connected" },
];

export default function ConnectionsWidget() {
  return (
    <GlassCard className="col-span-1 h-full p-5 md:col-span-2">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Data Input &amp; Connections</h3>
        <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">7 active</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {SYSTEMS.map((s) => (
          <div key={s.name} className="rounded-xl border border-border bg-white/[0.02] p-3">
            <div className="flex items-center justify-between">
              <s.icon className="h-4 w-4 text-foreground-muted" strokeWidth={1.75} />
              <span className={`rounded-full border px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wide ${STATUS_STYLES[s.status]}`}>
                {s.status}
              </span>
            </div>
            <p className="mt-2 text-xs font-medium leading-tight text-foreground">{s.name}</p>
            <p className="mt-1 text-[10px] text-foreground-subtle">{s.synced}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
