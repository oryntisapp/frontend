import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Large blurred ambient blobs built from the brand gradient (Section 1). Mounted once,
 * fixed, behind all content. Pure CSS animation since this runs for the page's entire
 * lifetime — cheapest possible implementation for a background layer.
 */
export default function AmbientBlobs() {
  const reduced = useReducedMotion();
  const anim = reduced ? "" : "animate-float";
  const animSlow = reduced ? "" : "animate-float-slow";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, #0C0A14 0%, #050308 55%, #030303 100%)",
        }}
      />
      <div
        className={`absolute -top-[12%] left-1/2 h-[900px] w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-[130px] ${anim}`}
        style={{ background: "radial-gradient(circle, #B13ED9 0%, #6013A1 55%, transparent 75%)" }}
      />
      <div
        className={`absolute top-[35%] -left-[10%] h-[700px] w-[700px] rounded-full opacity-20 blur-[120px] ${animSlow}`}
        style={{ background: "radial-gradient(circle, #657285 0%, transparent 70%)" }}
      />
      <div
        className={`absolute top-[65%] -right-[8%] h-[800px] w-[800px] rounded-full opacity-20 blur-[140px] ${anim}`}
        style={{ background: "radial-gradient(circle, #E16CF1 0%, transparent 70%)" }}
      />
      <div
        id="final-cta-blob"
        className={`absolute bottom-0 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 translate-y-1/3 rounded-full opacity-0 blur-[130px] transition-opacity duration-[1200ms] ${animSlow}`}
        style={{ background: "radial-gradient(circle, #B13ED9 0%, #18044B 70%, transparent 85%)" }}
      />
    </div>
  );
}
