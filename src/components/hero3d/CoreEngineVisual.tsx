import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";

interface CoreEngineVisualProps {
  mouse: MousePosition;
  active: React.RefObject<boolean>;
  reducedMotion: boolean;
}

function Core({ mouse, active, reducedMotion }: CoreEngineVisualProps) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const current = useRef(new THREE.Quaternion());
  const target = useRef(new THREE.Quaternion());
  const euler = useRef(new THREE.Euler());

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += reducedMotion ? 0 : 0.0022;
    if (!reducedMotion && active.current) {
      const yaw = mouse.inside.current ? THREE.MathUtils.clamp(mouse.nx.current, -1, 1) * 0.35 : 0;
      const pitch = mouse.inside.current ? THREE.MathUtils.clamp(mouse.ny.current, -1, 1) * 0.18 : 0;
      euler.current.set(pitch, group.current.rotation.y + yaw * 0.3, 0);
      target.current.setFromEuler(euler.current);
      current.current.copy(group.current.quaternion);
      current.current.slerp(target.current, 0.06);
      group.current.quaternion.copy(current.current);
    }
    if (inner.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.08;
      inner.current.scale.setScalar(reducedMotion ? 1 : pulse);
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color="#B13ED9" wireframe transparent opacity={0.5} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial color="#E16CF1" emissive="#B13ED9" emissiveIntensity={1.4} roughness={0.2} />
      </mesh>
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 1.4, Math.sin(angle * 1.7) * 0.5, Math.sin(angle) * 1.4]}>
            <sphereGeometry args={[0.045, 8, 8]} />
            <meshBasicMaterial color="#D68BFB" />
          </mesh>
        );
      })}
    </group>
  );
}

export default function CoreEngineVisual({ mouse, active, reducedMotion }: CoreEngineVisualProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={1.2} color="#E16CF1" />
      <pointLight position={[-2, -1, -1]} intensity={0.4} color="#6013A1" />
      <Suspense fallback={null}>
        <Core mouse={mouse} active={active} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}
