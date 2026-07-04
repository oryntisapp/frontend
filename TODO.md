# TODO

- [x] Rebranded entire site copy/palette to Oryntis (AI Business Operations Platform) per spec.
- [x] Fixed black-screen risk: WebGL-unavailable and GLB-load-failure now both fall back
      to the Path B static portrait hero (see src/components/hero3d/CanvasErrorBoundary.tsx),
      instead of rendering an empty div.
- [x] Compressed the hero portrait asset (2048x2048 / 1.6MB -> 1100x1100 / ~120KB).
- [ ] Confirm real node names on robot.glb with the client if the gaze system needs a head-only pivot.
- [ ] Confirm final numeric pricing to replace the "$X,XXX/mo — illustrative" placeholders.
- [ ] Confirm primary CTA wording ("Request a Platform Demo" vs "Talk to Sales") with client.
- [ ] Swap Google Fonts CDN @import for self-hosted woff2 files if strict self-hosting is required for launch.
