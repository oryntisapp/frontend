import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";
import RobotModel, { TARGET_HEIGHT } from "./RobotModel";
import HeroPortrait from "./HeroPortrait";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

interface RobotCanvasProps {
  mouse: MousePosition;
  heroInView: React.RefObject<boolean>;
  reducedMotion: boolean;
  onFallback: () => void;
  useFallback: boolean;
}

function isWebGLAvailable() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl", { antialias: true }) ||
      canvas.getContext("experimental-webgl", { antialias: true });
    return !!gl;
  } catch {
    return false;
  }
}

function GroundShadow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
      <circleGeometry args={[1.1, 48]} />
      <meshBasicMaterial color="#000000" transparent opacity={0.35} />
    </mesh>
  );
}

function SceneFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.6, 1.2, 0.4]} />
      <meshBasicMaterial color="#1a1224" wireframe />
    </mesh>
  );
}

/**
 * Frames the whole figure — feet to head, every time — from the model's real bounding
 * box and the canvas' actual current pixel size. This runs on every resize (R3F's `size`
 * updates continuously via an internal ResizeObserver), which is what makes the model
 * genuinely responsive instead of jumping between two guessed camera configs at a single
 * 768px breakpoint. A small margin keeps the figure from touching the frame edges.
 */
function AutoFitCamera({ bounds }: { bounds: THREE.Vector3 | null }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!bounds) return;
    const persp = camera as THREE.PerspectiveCamera;
    const margin = 1.28;
    const aspect = size.width / size.height;

    const vFovRad = (persp.fov * Math.PI) / 180;
    const halfHeight = (bounds.y / 2) * margin;
    const distV = halfHeight / Math.tan(vFovRad / 2);

    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect);
    const halfWidth = (Math.max(bounds.x, bounds.z) / 2) * margin;
    const distH = halfWidth / Math.tan(hFovRad / 2);

    const distance = Math.max(distV, distH);
    const targetY = bounds.y / 2;

    persp.position.set(0, targetY, distance);
    persp.lookAt(0, targetY, 0);
    persp.updateProjectionMatrix();
  }, [bounds, camera, size]);

  return null;
}

export default function RobotCanvas({ mouse, heroInView, reducedMotion, onFallback, useFallback }: RobotCanvasProps) {
  const webglSupported = isWebGLAvailable();
  const [bounds, setBounds] = useState<THREE.Vector3 | null>(null);

  const handleBounds = useCallback((size: THREE.Vector3) => setBounds(size), []);

  if (!webglSupported || useFallback) {
    return <HeroPortrait mouse={mouse} />;
  }

  return (
    <CanvasErrorBoundary onError={onFallback} fallback={<HeroPortrait mouse={mouse} />}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, TARGET_HEIGHT / 2, 5], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2.5, 4, 3]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.6} color="#B13ED9" />
        <pointLight position={[0, 1.2, 1.5]} intensity={0.7} color="#E16CF1" distance={6} decay={2} />

        <AutoFitCamera bounds={bounds} />

        <Suspense fallback={<SceneFallback />}>
          <RobotModel mouse={mouse} heroInView={heroInView} reducedMotion={reducedMotion} onBounds={handleBounds} />
          <GroundShadow />
        </Suspense>

        <fogExp2 attach="fog" args={["#050308", 0.06]} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}

export { THREE };