import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onError: () => void;
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches GLTF-load and WebGL-context failures thrown inside the R3F tree (e.g. missing
 * robot.glb, corrupted asset) and swaps to Path B (static portrait) — Section 3.1's
 * "automatic fallback to Path B (with a console warning) if the GLB is missing or fails
 * to load."
 */
export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.warn("[Oryntis Hero] robot.glb failed to load — falling back to Path B portrait.", error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
