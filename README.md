# OryntisApp — Cinematic Scroll-Driven Landing Page

Full React + Vite + TypeScript + Tailwind + Framer Motion + React Three Fiber build,
implementing the master build prompt (dark Linear-style design system, pinned hero
scroll-scrub, GLB robot with cursor-tracking gaze, annotation callouts, and the full
section stack).

## Status

All sections from the build checklist are implemented:

- Preloader, Navbar, MobileMenu, Footer, PageShell
- Background system: AmbientBlobs, NoiseOverlay, GridOverlay, Spotlight
- UI kit: Button, GlassCard, Badge, SectionHeading, AnnotationCallout, MagneticButton,
  GradientText, StatCounter
- Hero3D: RobotCanvas, RobotModel, useGazeController (cursor-tracking gaze on the
  supplied `robot.glb`, damped/clamped, with idle wake-up + return-to-neutral)
- Sections: Hero, TrustBar, Services, Process, CaseStudies, WhyUs, TechStack,
  Testimonials, StatsBanner, FinalCTA
- Home page composes the full section stack; route stubs exist for
  `/services`, `/portfolio`, `/about`, `/blog`, `/contact`

**Note on the GLB:** the supplied `robot.glb` is a single unrigged mesh (no head
bone), so `useGazeController` orients the *entire model* toward the cursor rather
than just a head node — the damped slerp + clamp + idle/wake behavior from the spec
is what sells the "attention" illusion regardless, so this is a drop-in-compatible
adaptation, not a shortcut. If you later get a rigged GLB with a named head bone,
swap the `target` ref in `RobotModel.tsx` from the whole `group` to that bone.

## Setup

This environment has no network access, so dependencies were **not** installed and
the app was **not** build-verified here — do that on your machine:

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

Requires Node 18+.

## Project structure

```
src/
  assets/models/robot.glb
  lib/            tokens.ts, motionVariants.ts
  hooks/          useScrollProgress, useMousePosition, useReducedMotion
  components/
    layout/       Navbar, MobileMenu, Footer, PageShell
    ui/           Button, GlassCard, Badge, SectionHeading, AnnotationCallout,
                   MagneticButton, GradientText, StatCounter
    hero3d/       RobotCanvas, RobotModel, useGazeController
    background/   AmbientBlobs, NoiseOverlay, GridOverlay, Spotlight
    sections/     Preloader, Hero, TrustBar, Services, Process, CaseStudies,
                   WhyUs, TechStack, Testimonials, StatsBanner, FinalCTA
  pages/          Home, RouteStub
```

## Known follow-ups (not blockers, see Section 15b of the build prompt)

- Route stubs (`/services`, `/portfolio`, etc.) are placeholders — flesh out with
  real content when ready, reusing the same components/tokens.
- No `og-image.png` asset exists yet — `index.html` references `/og-image.png`;
  add a designed 1200×630 social card to `public/` before launch.
- Trust-bar and tech-stack logos are using placeholder/icon treatments — swap in
  real client and technology logos when available.
- If bundle size on the `three`/`@react-three` chunk is large, double check the
  manualChunks split in `vite.config.ts` after a real `npm run build`.
