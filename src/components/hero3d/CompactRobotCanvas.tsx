import { Suspense, useCallback, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";
import RobotModel, { TARGET_HEIGHT } from "./RobotModel";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

interface CompactRobotCanvasProps {
  mouse: MousePosition;
  active: React.RefObject<boolean>;
  reducedMotion: boolean;
}

function SceneFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.4, 0.8, 0.3]} />
      <meshBasicMaterial color="#1a1224" wireframe />
    </mesh>
  );
}

function AutoFitCamera({ bounds }: { bounds: THREE.Vector3 | null }) {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!bounds) return;
    const persp = camera as THREE.PerspectiveCamera;
    const margin = 1.35;
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

function Scene({ mouse, active, reducedMotion }: CompactRobotCanvasProps) {
  const [bounds, setBounds] = useState<THREE.Vector3 | null>(null);
  const handleBounds = useCallback((size: THREE.Vector3) => setBounds(size), []);

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2.5, 4, 3]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-3, 1.5, -2]} intensity={0.6} color="#B13ED9" />
      <pointLight position={[0, 1.2, 1.5]} intensity={0.7} color="#E16CF1" distance={6} decay={2} />

      <AutoFitCamera bounds={bounds} />

      <Suspense fallback={<SceneFallback />}>
        <RobotModel mouse={mouse} heroInView={active} reducedMotion={reducedMotion} onBounds={handleBounds} />
      </Suspense>

      <fogExp2 attach="fog" args={["#050308", 0.06]} />
    </>
  );
}

export default function CompactRobotCanvas({ mouse, active, reducedMotion }: CompactRobotCanvasProps) {
  const fallback = (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-16 w-10 rounded-lg border border-white/10 bg-white/[0.02]" />
    </div>
  );

  return (
    <CanvasErrorBoundary onError={() => {}} fallback={fallback}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, TARGET_HEIGHT / 2, 5], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
      >
        <Scene mouse={mouse} active={active} reducedMotion={reducedMotion} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
