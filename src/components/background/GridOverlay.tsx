export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] bg-grid bg-grid-overlay opacity-[0.02]"
      style={{
        maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 75%)",
      }}
    />
  );
}
