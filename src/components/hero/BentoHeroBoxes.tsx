import { Suspense, lazy } from "react";
import type { MousePosition } from "../../hooks/useMousePosition";

import liveSync from "../../assets/images/hero/Live Sync.svg";
import efficiency from "../../assets/images/hero/Efficiency.svg";
import automation from "../../assets/images/hero/Automation.mp4";
import autoResolve from "../../assets/images/hero/Auto-Resolve.mp4";
import processGif from "../../assets/images/hero/Process.gif";
import syncGif from "../../assets/images/hero/Sync.gif";
import analyticsGif from "../../assets/images/hero/Analytics.gif";
import securityGif from "../../assets/images/hero/Security.gif";

import CoreEngineInfinity from "./CoreEngineInfinity";
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
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] ${className}`}
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
  fetchPriority,
  className = "",
}: {
  src?: string;
  videoSrc?: string;
  alt: string;
  label: string;
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
}) {
  return (
    <Tile className={`h-full ${className}`}>
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          fetchPriority={fetchPriority}
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-60 transition-all duration-700 ease-out hover:scale-105"
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={fetchPriority === "high" ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={fetchPriority}
          className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-60 transition-all duration-700 ease-out hover:scale-105"
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
      src={liveSync}
      alt="Live sync visualization"
      label="Omnichannel Sync"
      fetchPriority="high"
    />
  );
}

export function EfficiencyChartBox() {
  return (
    <MediaCard
      src={efficiency}
      alt="Efficiency chart"
      label="Operational Intelligence"
      fetchPriority="high"
    />
  );
}

export function CoreEngineBox({
  mouse: _mouse,
  active: _active,
  reducedMotion: _reducedMotion,
}: {
  mouse: MousePosition;
  active: React.RefObject<boolean>;
  reducedMotion: boolean;
}) {
  return (
    <Tile className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">AI Orchestration Engine</span>
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(177,62,217,0.5)]" aria-hidden="true" />
      </div>
      <div className="relative flex-1 overflow-hidden rounded-xl backdrop-blur-sm bg-zinc-950/20">
        <CoreEngineInfinity />
      </div>
      <p className="text-[11px] leading-relaxed text-foreground-muted">
        Coordinates work across every department in real time.
      </p>
    </Tile>
  );
}

export function AutomationNodesBox() {
  return (
    <MediaCard
      videoSrc={automation}
      alt="Automation workflow"
      label="Automation"
      fetchPriority="high"
    />
  );
}

export function AlertResolvedBox() {
  return (
    <MediaCard
      videoSrc={autoResolve}
      alt="Auto-resolve alert animation"
      label="Anonmous Execution"
      fetchPriority="high"
    />
  );
}

export function WorkflowBox() {
  return (
    <Tile className="bg-[#000000] flex flex-col items-center justify-center p-6 h-full hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
      <img
        src={processGif}
        alt="Process workflow animation"
        loading="lazy"
        decoding="async"
        className="w-16 h-16 object-contain mx-auto"
      />
      <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
        Data Normalization
      </span>
    </Tile>
  );
}

export function SyncBox() {
  return (
    <Tile className="bg-[#000000] flex flex-col items-center justify-center p-6 h-full hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
      <img
        src={syncGif}
        alt="Sync animation"
        loading="lazy"
        decoding="async"
        className="w-16 h-16 object-contain mx-auto"
      />
      <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
        Api Orchestration
      </span>
    </Tile>
  );
}

export function AnalyticsBox() {
  return (
    <Tile className="bg-[#000000] flex flex-col items-center justify-center p-6 h-full hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
      <img
        src={analyticsGif}
        alt="Analytics dashboard animation"
        loading="lazy"
        decoding="async"
        className="w-16 h-16 object-contain mx-auto"
      />
      <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
        Decision Intelligence
      </span>
    </Tile>
  );
}

export function SecurityBox() {
  return (
    <Tile className="bg-[#000000] flex flex-col items-center justify-center p-6 h-full hover:border-purple-500/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-all duration-300">
      <img
        src={securityGif}
        alt="Security animation"
        loading="lazy"
        decoding="async"
        className="w-16 h-16 object-contain mx-auto"
      />
      <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-foreground-muted">
        Governance & Trust
      </span>
    </Tile>
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
    <Tile className="relative flex flex-col items-center justify-between pb-12 h-full p-0">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-20 w-12 animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
          </div>
        }
      >
        <CompactRobotCanvas mouse={mouse} active={active} reducedMotion={reducedMotion} />
      </Suspense>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/40 rounded-full blur-md pointer-events-none mix-blend-multiply animate-[shadowSync_4s_easeInOut_infinite]" />
    </Tile>
  );
}
