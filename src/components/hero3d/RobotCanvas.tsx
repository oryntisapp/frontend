import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";
import RobotModel from "./RobotModel";
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
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
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

export default function RobotCanvas({ mouse, heroInView, reducedMotion, onFallback, useFallback }: RobotCanvasProps) {
  const webglSupported = isWebGLAvailable();

  // Path B: WebGL blocked/unavailable, or the GLB threw during load (caught below).
  if (!webglSupported || useFallback) {
    return <HeroPortrait mouse={mouse} />;
  }

  return (
    <CanvasErrorBoundary onError={onFallback} fallback={<HeroPortrait mouse={mouse} />}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.1, 3.4], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2.5, 4, 3]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.6} color="#B13ED9" />
        <pointLight position={[0, 1.2, 1.5]} intensity={0.7} color="#E16CF1" distance={6} decay={2} />

        <Suspense fallback={<SceneFallback />}>
          <group position={[0, -1, 0]}>
            <RobotModel mouse={mouse} heroInView={heroInView} reducedMotion={reducedMotion} />
            <GroundShadow />
          </group>
        </Suspense>

        <fogExp2 attach="fog" args={["#050308", 0.06]} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}

export { THREE };
