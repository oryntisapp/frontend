function gearPath(teeth: number, outerR: number, innerR: number): string {
  const step = (Math.PI * 2) / teeth;
  let d = "";
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const p = (angle: number, r: number) =>
      `${r * Math.cos(angle)},${r * Math.sin(angle)}`;
    d +=
      (i === 0 ? "M" : "L") +
      p(a - step * 0.15, outerR) +
      " L" +
      p(a + step * 0.15, outerR) +
      " L" +
      p(a + step * 0.35, innerR) +
      " L" +
      p(a + step * 0.65, innerR) +
      " ";
  }
  return d + "Z";
}

export default function CoreEngineInfinity() {
  return (
    <div className="w-full h-44 flex items-center justify-center overflow-hidden py-2">
      <style>{`
        .ce-spin-cw{animation:ce-scw 12s linear infinite}
        .ce-spin-ccw{animation:ce-sccw 12s linear infinite}
        .ce-pulse-ring{animation:ce-pr 3s ease-in-out infinite}
        .ce-float-slow{animation:ce-fl 6s ease-in-out infinite}
        .ce-wrench-wiggle{animation:ce-ww 2s ease-in-out infinite;transform-origin:385px 210px}
        .ce-chart-line{stroke-dasharray:160;stroke-dashoffset:160;animation:ce-cl 3s ease-in-out infinite alternate}
        @keyframes ce-scw{to{transform:rotate(360deg)}}
        @keyframes ce-sccw{to{transform:rotate(-360deg)}}
        @keyframes ce-pr{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:.6;transform:scale(1.04)}}
        @keyframes ce-fl{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes ce-ww{0%,100%{transform:rotate(0)}25%{transform:rotate(10deg)}75%{transform:rotate(-10deg)}}
        @keyframes ce-cl{to{stroke-dashoffset:0}}
      `}</style>

      <svg
        viewBox="0 0 700 500"
        className="w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        <defs>
          <filter id="ceGlow">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="ceGlowSm">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="ceChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E16CF1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#E16CF1" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Cycle Ring 1 (CW rotation) ── */}
        <g
          className="ce-spin-cw"
          style={{ transformOrigin: "250px 280px" }}
        >
          <circle
            cx="250"
            cy="280"
            r="200"
            fill="none"
            stroke="rgba(168,85,247,0.12)"
            strokeWidth="1.5"
            strokeDasharray="12 8"
          />
        </g>

        {/* ── Cycle Ring 2 (CCW rotation) ── */}
        <g
          className="ce-spin-ccw"
          style={{ transformOrigin: "250px 280px" }}
        >
          <circle
            cx="250"
            cy="280"
            r="165"
            fill="none"
            stroke="#6013A1"
            strokeWidth="1"
            strokeDasharray="8 12"
            opacity="0.5"
          />
        </g>

        {/* ── Pulse ring behind developer ── */}
        <circle
          className="ce-pulse-ring"
          cx="310"
          cy="250"
          r="95"
          fill="none"
          stroke="rgba(177,62,217,0.15)"
          strokeWidth="1"
          style={{ transformOrigin: "310px 250px" }}
        />

        {/* ── Gear 1: Large primary (left, CW) ── */}
        <g
          className="ce-spin-cw"
          style={{ transformOrigin: "170px 300px" }}
        >
          <path
            d={gearPath(14, 72, 54)}
            transform="translate(170,300)"
            fill="#E16CF1"
            opacity="0.15"
            stroke="#E16CF1"
            strokeWidth="1.2"
          />
          <circle
            cx="170"
            cy="300"
            r="22"
            fill="#09090b"
            stroke="#6013A1"
            strokeWidth="1.5"
          />
        </g>

        {/* ── Gear 2: Medium secondary (lower-center, CCW) ── */}
        <g
          className="ce-spin-ccw"
          style={{ transformOrigin: "260px 370px" }}
        >
          <path
            d={gearPath(10, 52, 38)}
            transform="translate(260,370)"
            fill="#6013A1"
            opacity="0.25"
            stroke="#6013A1"
            strokeWidth="1.2"
          />
          <circle
            cx="260"
            cy="370"
            r="15"
            fill="#09090b"
            stroke="#E16CF1"
            strokeWidth="1"
          />
        </g>

        {/* ── Gear 3: Small secondary (far-left, CCW) ── */}
        <g
          className="ce-spin-ccw"
          style={{ transformOrigin: "100px 390px" }}
        >
          <path
            d={gearPath(8, 38, 28)}
            transform="translate(100,390)"
            fill="#E16CF1"
            opacity="0.12"
            stroke="#E16CF1"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="390"
            r="11"
            fill="#09090b"
            stroke="#6013A1"
            strokeWidth="1"
          />
        </g>

        {/* ── Developer figure (center foreground) ── */}
        <g>
          {/* Head */}
          <circle cx="310" cy="148" r="22" fill="#D4A0FF" />
          <path d="M288,143 Q310,125 332,143" fill="#1a1a1c" />

          {/* Jacket / torso */}
          <path d="M282,178 h56 l5,108 h-66 Z" fill="#B13ED9" />
          <path
            d="M302,178 l8,15 l8-15"
            fill="none"
            stroke="#D4A0FF"
            strokeWidth="1.2"
          />

          {/* Left arm */}
          <path d="M282,178 l-12,68 h10 l8-52" fill="#B13ED9" />

          {/* Right arm + wrench */}
          <g className="ce-wrench-wiggle">
            <path d="M338,178 l12,62 h-10 l-8-48" fill="#B13ED9" />
            <path
              d="M355,232 l10,-18 l5,3 l-8,18 Z"
              fill="#E16CF1"
              stroke="#6013A1"
              strokeWidth="1"
            />
            <circle cx="365" cy="212" r="4" fill="#09090b" stroke="#E16CF1" strokeWidth="0.8" />
          </g>

          {/* Belt */}
          <rect x="280" y="283" width="60" height="6" rx="2" fill="#1a1a1c" />

          {/* Left pant leg */}
          <path d="M284,289 h26 l-3,96 h-20 Z" fill="#242427" />
          {/* Right pant leg */}
          <path d="M312,289 h26 l3,96 h-20 Z" fill="#242427" />

          {/* Shoes */}
          <rect x="278" y="383" width="32" height="10" rx="5" fill="#1a1a1c" />
          <rect x="316" y="383" width="32" height="10" rx="5" fill="#1a1a1c" />
        </g>

        {/* ── Browser Window 1 (top-right, floating) ── */}
        <g className="ce-float-slow">
          <rect
            x="460"
            y="65"
            width="195"
            height="130"
            rx="6"
            fill="rgba(24,24,27,0.7)"
            stroke="rgba(255,255,255,0.08)"
          />
          {/* Title bar */}
          <rect
            x="460"
            y="65"
            width="195"
            height="22"
            rx="6"
            fill="rgba(255,255,255,0.04)"
          />
          <circle cx="474" cy="76" r="3.5" fill="#E16CF1" opacity="0.6" />
          <circle cx="486" cy="76" r="3.5" fill="#6013A1" opacity="0.6" />
          <circle cx="498" cy="76" r="3.5" fill="rgba(255,255,255,0.1)" />
          {/* Content lines */}
          <rect x="476" y="100" width="80" height="5" rx="2" fill="#E16CF1" opacity="0.2" />
          <rect x="476" y="112" width="120" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="476" y="122" width="100" height="4" rx="2" fill="rgba(255,255,255,0.04)" />
          <rect x="476" y="132" width="140" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="476" y="148" width="60" height="18" rx="3" fill="rgba(177,62,217,0.2)" stroke="#B13ED9" strokeWidth="0.5" />
          <text x="486" y="161" fill="#B13ED9" fontSize="8" fontFamily="monospace">deploy</text>
        </g>

        {/* ── Browser Window 2 (mid-right, floating) ── */}
        <g
          className="ce-float-slow"
          style={{ animationDelay: "2s" }}
        >
          <rect
            x="480"
            y="230"
            width="185"
            height="110"
            rx="6"
            fill="rgba(24,24,27,0.7)"
            stroke="rgba(255,255,255,0.08)"
          />
          <rect
            x="480"
            y="230"
            width="185"
            height="22"
            rx="6"
            fill="rgba(255,255,255,0.04)"
          />
          <circle cx="494" cy="241" r="3.5" fill="#E16CF1" opacity="0.6" />
          <circle cx="506" cy="241" r="3.5" fill="#6013A1" opacity="0.6" />
          <circle cx="518" cy="241" r="3.5" fill="rgba(255,255,255,0.1)" />
          {/* Terminal lines */}
          <text x="496" y="268" fill="#E16CF1" fontSize="8" fontFamily="monospace" opacity="0.7">$ oryntis sync</text>
          <text x="496" y="280" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">status: operational</text>
          <text x="496" y="292" fill="#6013A1" fontSize="7" fontFamily="monospace" opacity="0.6">nodes: 4/4 active</text>
          <text x="496" y="304" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">latency: 12ms</text>
          <text x="496" y="320" fill="#E16CF1" fontSize="7" fontFamily="monospace" opacity="0.5">pipeline: healthy</text>
        </g>

        {/* ── Cloud 1 ── */}
        <g className="ce-float-slow" style={{ animationDelay: "1s" }}>
          <ellipse
            cx="545"
            cy="55"
            rx="35"
            ry="18"
            fill="rgba(168,85,247,0.08)"
            stroke="rgba(168,85,247,0.3)"
            strokeWidth="0.8"
          />
          <ellipse
            cx="530"
            cy="50"
            rx="20"
            ry="14"
            fill="rgba(168,85,247,0.06)"
          />
          <ellipse
            cx="560"
            cy="50"
            rx="18"
            ry="12"
            fill="rgba(168,85,247,0.06)"
          />
        </g>

        {/* ── Cloud 2 ── */}
        <g className="ce-float-slow" style={{ animationDelay: "3.5s" }}>
          <ellipse
            cx="620"
            cy="195"
            rx="28"
            ry="14"
            fill="rgba(168,85,247,0.06)"
            stroke="rgba(168,85,247,0.25)"
            strokeWidth="0.6"
          />
          <ellipse cx="608" cy="191" rx="16" ry="10" fill="rgba(168,85,247,0.04)" />
          <ellipse cx="632" cy="191" rx="14" ry="9" fill="rgba(168,85,247,0.04)" />
        </g>

        {/* ── Growth Chart (bottom-right) ── */}
        <g>
          {/* Chart backdrop */}
          <rect
            x="465"
            y="360"
            width="210"
            height="110"
            rx="6"
            fill="rgba(24,24,27,0.5)"
            stroke="rgba(255,255,255,0.06)"
          />

          {/* Axes */}
          <line
            x1="485"
            y1="380"
            x2="485"
            y2="452"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
          <line
            x1="485"
            y1="452"
            x2="660"
            y2="452"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />

          {/* Grid lines */}
          {[395, 410, 425, 440].map((y) => (
            <line
              key={y}
              x1="485"
              y1={y}
              x2="660"
              y2={y}
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="0.5"
            />
          ))}

          {/* Gradient fill under line */}
          <path
            d="M495,440 L525,420 L555,430 L585,398 L615,382 L650,370 L650,452 L495,452 Z"
            fill="url(#ceChartGrad)"
          />

          {/* Animated chart line */}
          <polyline
            className="ce-chart-line"
            points="495,440 525,420 555,430 585,398 615,382 650,370"
            fill="none"
            stroke="#E16CF1"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          <circle cx="525" cy="420" r="3" fill="#09090b" stroke="#E16CF1" strokeWidth="1.2" />
          <circle cx="555" cy="430" r="3" fill="#09090b" stroke="#E16CF1" strokeWidth="1.2" />
          <circle cx="585" cy="398" r="3" fill="#09090b" stroke="#E16CF1" strokeWidth="1.2" />
          <circle cx="615" cy="382" r="3" fill="#09090b" stroke="#E16CF1" strokeWidth="1.2" />
          <circle cx="650" cy="370" r="3.5" fill="#E16CF1" filter="url(#ceGlowSm)" />

          {/* Bar indicators */}
          <rect x="500" y="443" width="8" height="9" rx="1.5" fill="#6013A1" opacity="0.5" />
          <rect x="530" y="437" width="8" height="15" rx="1.5" fill="#6013A1" opacity="0.6" />
          <rect x="560" y="440" width="8" height="12" rx="1.5" fill="#6013A1" opacity="0.55" />
          <rect x="590" y="430" width="8" height="22" rx="1.5" fill="#E16CF1" opacity="0.4" />
          <rect x="620" y="424" width="8" height="28" rx="1.5" fill="#E16CF1" opacity="0.5" />
          <rect x="650" y="420" width="8" height="32" rx="1.5" fill="#E16CF1" opacity="0.6" />

          {/* Chart label */}
          <text
            x="485"
            y="375"
            fill="rgba(255,255,255,0.25)"
            fontSize="7"
            fontFamily="monospace"
          >
            GROWTH
          </text>
        </g>

        {/* ── Connection paths (developer → panels) ── */}
        <path
          d="M340,200 Q400,180 460,130"
          fill="none"
          stroke="rgba(177,62,217,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M345,260 Q410,260 480,285"
          fill="none"
          stroke="rgba(177,62,217,0.12)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M345,310 Q420,340 465,380"
          fill="none"
          stroke="rgba(177,62,217,0.08)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* ── Floating data particles ── */}
        {[
          { cx: 400, cy: 100, d: 0 },
          { cx: 420, cy: 220, d: 1.5 },
          { cx: 440, cy: 340, d: 3 },
          { cx: 380, cy: 430, d: 4.5 },
        ].map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="2"
            fill="#E16CF1"
            opacity="0.3"
            className="ce-pulse-ring"
            style={{
              animationDelay: `${p.d}s`,
              transformOrigin: `${p.cx}px ${p.cy}px`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
