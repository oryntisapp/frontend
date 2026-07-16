import { useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import step1 from "../../assets/images/how-it-works/step-1.svg";
import step2 from "../../assets/images/how-it-works/step-2.svg";
import step3 from "../../assets/images/how-it-works/step-3.svg";
import step4 from "../../assets/images/how-it-works/step-4.svg";
import step5 from "../../assets/images/how-it-works/step-5.svg";
import step6 from "../../assets/images/how-it-works/step-6.svg";

const PHASES = [
  {
    phase: "Phase 1",
    title: "Ingestion Layer",
    left: {
      img: step1,
      label: "Enterprise Systems",
      desc1: "ERP, CRM, HRIS system",
      desc2: "ingestion connectors",
    },
    right: {
      img: step2,
      label: "Data Infrastructure",
      desc1: "Normalization engine,",
      desc2: "schema mapping protocols",
    },
  },
  {
    phase: "Phase 2",
    title: "Processing Engine",
    left: {
      img: step3,
      label: "Core Operations Engine",
      desc1: "Accelerated computing",
      desc2: "infrastructure pipelines",
    },
    right: {
      img: step4,
      label: "Workflow Intelligence",
      desc1: "Predictive bottleneck",
      desc2: "analysis matrix modules",
    },
  },
  {
    phase: "Phase 3",
    title: "Orchestration & Visibility",
    left: {
      img: step5,
      label: "Automation Execution",
      desc1: "Asynchronous serverless",
      desc2: "background worker groups",
    },
    right: {
      img: step6,
      label: "Command Dashboard",
      desc1: "Real-time centralized",
      desc2: "observability console panels",
    },
  },
];

const phaseVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Architecture() {
  useEffect(() => {
    const canvas = document.getElementById('dna-helix-bg') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const numNodes = 45;
    const radius = 65;
    const speed = 0.012;
    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      rotationAngle += speed;

      const centerX = canvas.width / 2;
      const stepY = canvas.height / numNodes;

      for (let i = 0; i < numNodes; i++) {
        const y = i * stepY;
        const currentAngle = rotationAngle + (i * 0.22);

        const xStrand1 = centerX + Math.sin(currentAngle) * radius;
        const xStrand2 = centerX - Math.sin(currentAngle) * radius;

        const depthOpacity1 = (Math.cos(currentAngle) + 1) / 2 * 0.6 + 0.4;
        const depthOpacity2 = (-Math.cos(currentAngle) + 1) / 2 * 0.6 + 0.4;

        ctx.beginPath();
        ctx.moveTo(xStrand1, y);
        ctx.lineTo(xStrand2, y);
        ctx.strokeStyle = `rgba(177, 62, 217, ${Math.min(depthOpacity1, depthOpacity2) * 0.12})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(xStrand1, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 108, 241, ${depthOpacity1 * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#E16CF1';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(xStrand2, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 19, 161, ${depthOpacity2 * 0.8})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#6013A1';
        ctx.fill();

        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <canvas id="dna-helix-bg" className="absolute inset-0 pointer-events-none -z-20 w-full h-full opacity-25" />

      <SectionHeading
        eyebrow="How It Works"
        headline="One pipeline, from raw system data to executed work"
        align="center"
        className="mx-auto"
      />

      <div className="relative mt-20">
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-80 -translate-y-1/2 opacity-40 blur-[100px]"
          style={{ background: "radial-gradient(800px circle at 50% 50%, #6013A1, transparent 70%)" }}
        />

        {/* Desktop: Central trunk line SVG */}
        <svg
          viewBox="0 0 2 700"
          className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 md:block"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="trunkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#657285" />
              <stop offset="50%" stopColor="#B13ED9" />
              <stop offset="100%" stopColor="#E16CF1" />
            </linearGradient>
            <filter id="dotGlow" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <motion.path
            d="M 1 0 L 1 700"
            stroke="url(#trunkGrad)"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 2, ease: "easeInOut" },
              },
            }}
          />
          <motion.circle
            r="5"
            fill="#E16CF1"
            filter="url(#dotGlow)"
            initial={{ cy: 0, opacity: 0 }}
            whileInView={{ cy: 700, opacity: [0, 1, 1, 0] }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 2.2, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
            cx={1}
          />
        </svg>

        {/* Phase groups — each phase triggers independently on scroll */}
        <div className="relative space-y-20 md:space-y-28">
          {PHASES.map((phase, pi) => (
            <motion.div
              key={phase.phase}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.35 }}
              variants={phaseVariants}
              className="relative"
            >
              {/* Phase label — centered above each phase */}
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="whitespace-nowrap rounded-full border border-accent/25 bg-background px-4 py-1 font-mono text-[10px] uppercase tracking-widest text-accent shadow-[0_0_16px_-4px_rgba(177,62,217,0.2)]">
                  {phase.phase}: {phase.title}
                </span>
              </div>

              <div className="pt-10">
                {/* Desktop layout */}
                <div className="hidden items-start justify-center gap-6 md:flex">
                  {/* Left card */}
                  <motion.div variants={cardVariants} className="group relative w-[290px]">
                    <div className="absolute right-0 top-[26px] h-px w-16 bg-gradient-to-l from-accent/30 to-transparent transition-all duration-300 group-hover:from-accent/70" />
                    <div className="rounded-xl border border-border bg-background-elevated/60 p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_-6px_rgba(177,62,217,0.25)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background p-1 transition-transform duration-300 group-hover:scale-110">
                           <img src={phase.left.img} alt={phase.left.label} className="h-full w-full object-contain brightness-0 invert-[34%] sepia-[75%] saturate-[2588%] hue-rotate-[255deg] brightness-[98%] contrast-[96%] drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" loading="lazy" decoding="async" width={56} height={56} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">{phase.left.label}</p>
                          <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                            {phase.left.desc1}
                            <br />
                            {phase.left.desc2}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Center dot on trunk */}
                  <div className="relative pt-[18px]">
                    <div className="h-4 w-4 rounded-full border-2 border-accent bg-background shadow-[0_0_0_4px_rgba(177,62,217,0.15)]" />
                  </div>

                  {/* Right card */}
                  <motion.div variants={cardVariants} className="group relative w-[290px]">
                    <div className="absolute left-0 top-[26px] h-px w-16 bg-gradient-to-r from-accent/30 to-transparent transition-all duration-300 group-hover:from-accent/70" />
                    <div className="rounded-xl border border-border bg-background-elevated/60 p-5 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_24px_-6px_rgba(177,62,217,0.25)]">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background p-1 transition-transform duration-300 group-hover:scale-110">
                           <img src={phase.right.img} alt={phase.right.label} className="h-full w-full object-contain brightness-0 invert-[34%] sepia-[75%] saturate-[2588%] hue-rotate-[255deg] brightness-[98%] contrast-[96%] drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" loading="lazy" decoding="async" width={56} height={56} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">{phase.right.label}</p>
                          <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                            {phase.right.desc1}
                            <br />
                            {phase.right.desc2}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Mobile layout — left-aligned timeline */}
                <div className="space-y-6 md:hidden">
                  {[phase.left, phase.right].map((item, sideIdx) => (
                    <motion.div
                      key={item.label}
                      variants={cardVariants}
                      className="group relative flex items-start gap-4 pl-8"
                    >
                      <div className="absolute left-[7px] top-[18px] h-3 w-3 rounded-full border-2 border-accent bg-background" />
                      {sideIdx === 0 && (
                        <div className="absolute bottom-0 left-[11px] top-[30px] w-px bg-gradient-to-b from-accent/20 to-transparent" />
                      )}
                      <div className="flex-1 rounded-xl border border-border bg-background-elevated/60 p-4 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_-6px_rgba(177,62,217,0.2)]">
                        <div className="flex items-start gap-3">
                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background p-0.5 transition-transform duration-300 group-hover:scale-110">
                               <img src={item.img} alt={item.label} className="h-full w-full object-contain brightness-0 invert-[34%] sepia-[75%] saturate-[2588%] hue-rotate-[255deg] brightness-[98%] contrast-[96%] drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" loading="lazy" decoding="async" width={40} height={40} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground">{item.label}</p>
                            <p className="mt-0.5 text-xs leading-relaxed text-foreground-muted">
                              {item.desc1} {item.desc2}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-20 max-w-2xl text-center text-sm text-foreground-muted">
        How Oryntis unifies, automates, and optimizes enterprise operations through an intelligent
        operations engine powered by accelerated computing infrastructure.
      </p>
    </section>
  );
}
