import { Suspense, useCallback, useEffect, useRef, useState } from "react";
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
  const lastBounds = useRef<THREE.Vector3 | null>(null);

  useEffect(() => {
    if (bounds) lastBounds.current = bounds;
    const targetBounds = bounds || lastBounds.current;
    if (!targetBounds) return;

    if (size.width === 0 || size.height === 0) return;

    const persp = camera as THREE.PerspectiveCamera;
    const margin = 1.35;
    const aspect = size.width / size.height;

    if (!Number.isFinite(aspect) || aspect <= 0) return;

    const vFovRad = (persp.fov * Math.PI) / 180;
    const halfHeight = (targetBounds.y / 2) * margin;
    const distV = halfHeight / Math.tan(vFovRad / 2);

    const hFovRad = 2 * Math.atan(Math.tan(vFovRad / 2) * aspect);
    const halfWidth = (Math.max(targetBounds.x, targetBounds.z) / 2) * margin;
    const distH = halfWidth / Math.tan(hFovRad / 2);

    const distance = Math.max(distV, distH);
    if (!Number.isFinite(distance) || distance <= 0) return;

    const targetY = targetBounds.y / 2;

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
  const [errorKey, setErrorKey] = useState(0);
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (retryTimer.current) clearTimeout(retryTimer.current); }, []);

  const handleError = useCallback(() => {
    retryTimer.current = setTimeout(() => setErrorKey((k) => k + 1), 2000);
  }, []);

  const fallback = (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden min-h-[220px] lg:min-h-[260px]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-purple-500/10 animate-pulse blur-xl" />
      </div>
    </div>
  );

  return (
    <CanvasErrorBoundary key={errorKey} onError={handleError} fallback={fallback}>
      <div className="relative w-full h-full min-h-[220px] lg:min-h-[260px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-24 h-24 rounded-full bg-purple-500/10 animate-pulse blur-xl" />
        </div>

        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, TARGET_HEIGHT / 2, 5], fov: 32 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: true, failIfMajorPerformanceCaveat: false }}
          resize={{ debounce: 100 }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          <Scene mouse={mouse} active={active} reducedMotion={reducedMotion} />
        </Canvas>
      </div>
    </CanvasErrorBoundary>
  );
}
