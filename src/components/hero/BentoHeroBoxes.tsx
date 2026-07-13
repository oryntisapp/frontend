import { Suspense, lazy } from "react";
import { Workflow, RefreshCw, BarChart3, Lock } from "lucide-react";
import type { MousePosition } from "../../hooks/useMousePosition";

const CoreEngineVisual = lazy(() => import("../hero3d/CoreEngineVisual"));
const CompactRobotCanvas = lazy(() => import("../hero3d/CompactRobotCanvas"));

function Tile({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] ${className}`}
    >
      {children}
    </div>
  );
}

function MediaCard({
  src,
  videoSrc,
  alt,
  label,
}: {
  src?: string;
  videoSrc?: string;
  alt: string;
  label: string;
}) {
  return (
    <Tile className="h-full">
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen transition-transform duration-700 ease-out hover:scale-105"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen transition-transform duration-700 ease-out hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 rounded-lg border border-white/5 bg-zinc-950/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-purple-400 backdrop-blur-md">
        {label}
      </span>
    </Tile>
  );
}

export function SyncActivityBox() {
  return (
    <MediaCard
      videoSrc="https://cdn.pixabay.com/video/2025/11/11/315284_large.mp4"
      alt="Neon abstract background"
      label="Live Sync"
    />
  );
}

export function EfficiencyChartBox() {
  return (
    <MediaCard
      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format&fit=crop"
      alt="Data analytics dashboard"
      label="Efficiency"
    />
  );
}

export function CoreEngineBox({
  mouse,
  active,
  reducedMotion,
}: {
  mouse: MousePosition;
  active: React.RefObject<boolean>;
  reducedMotion: boolean;
}) {
  return (
    <Tile className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Core Engine</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(177,62,217,0.5)]" aria-hidden="true" />
      </div>
      <div className="relative flex-1">
        <Suspense fallback={<div className="h-full w-full animate-pulse rounded-xl bg-white/[0.02]" />}>
          <CoreEngineVisual mouse={mouse} active={active} reducedMotion={reducedMotion} />
        </Suspense>
      </div>
      <p className="text-[11px] leading-relaxed text-foreground-muted">
        Coordinates work across every department in real time.
      </p>
    </Tile>
  );
}

function IconTile({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Tile className="flex h-full flex-1 flex-col items-center justify-center gap-2">
      <div className="text-purple-400">{icon}</div>
      <span className="font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
        {label}
      </span>
    </Tile>
  );
}

export function AutomationNodesBox() {
  return (
    <MediaCard
      videoSrc="https://cdn.pixabay.com/video/2024/09/21/232461_large.mp4"
      alt="AI generated woman brain business"
      label="Automation"
    />
  );
}

export function AlertResolvedBox() {
  return (
    <MediaCard
      videoSrc="https://cdn.pixabay.com/video/2023/07/21/172529-847499878_large.mp4"
      alt="AI generated hands typing laptop"
      label="Auto-Resolve"
    />
  );
}

export function WorkflowBox() {
  return (
    <IconTile
      icon={<Workflow className="h-5 w-5" strokeWidth={1.5} />}
      label="Process"
    />
  );
}

export function SyncBox() {
  return (
    <IconTile
      icon={<RefreshCw className="h-5 w-5" strokeWidth={1.5} />}
      label="Sync"
    />
  );
}

export function AnalyticsBox() {
  return (
    <IconTile
      icon={<BarChart3 className="h-5 w-5" strokeWidth={1.5} />}
      label="Analytics"
    />
  );
}

export function SecurityBox() {
  return (
    <IconTile
      icon={<Lock className="h-5 w-5" strokeWidth={1.5} />}
      label="Security"
    />
  );
}

export function DashboardPreviewBox({
  mouse,
  active,
  reducedMotion,
}: {
  mouse: MousePosition;
  active: React.RefObject<boolean>;
  reducedMotion: boolean;
}) {
  return (
    <Tile className="relative h-full p-0">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-20 w-12 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
          </div>
        }
      >
        <CompactRobotCanvas mouse={mouse} active={active} reducedMotion={reducedMotion} />
      </Suspense>
    </Tile>
  );
}
