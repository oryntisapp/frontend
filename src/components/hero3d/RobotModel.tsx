import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";
import { useGazeController } from "./useGazeController";

const MODEL_URL = new URL("../../assets/models/robot.glb", import.meta.url).href;
useGLTF.preload(MODEL_URL);

export const TARGET_HEIGHT = 1.7;

interface RobotModelProps {
  mouse: MousePosition;
  heroInView: React.RefObject<boolean>;
  reducedMotion: boolean;
  /** Reports the model's real normalized bounding box once, so the parent Canvas can
   *  compute a camera framing from the model's ACTUAL width/depth — instead of guessing
   *  a fixed camera position per breakpoint (which is what broke on resize before). */
  onBounds?: (size: THREE.Vector3) => void;
}

export default function RobotModel({ mouse, heroInView, reducedMotion, onBounds }: RobotModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const emissiveMats = useRef<THREE.MeshStandardMaterial[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    if (size.y <= 0.001) return;

    const center = box.getCenter(new THREE.Vector3());
    const scale = TARGET_HEIGHT / size.y;

    scene.scale.setScalar(scale);
    scene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);

    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && "emissiveIntensity" in mat) {
          emissiveMats.current.push(mat);
        }
      }
    });

    initialized.current = true;
    onBounds?.(new THREE.Vector3(size.x * scale, TARGET_HEIGHT, size.z * scale));
  }, [scene, onBounds]);

  useGazeController({
    target: group as React.RefObject<THREE.Object3D>,
    mouse,
    active: heroInView,
    reducedMotion,
  });

  useFrame((state) => {
    if (reducedMotion) return;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.08;
    for (const mat of emissiveMats.current) {
      mat.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}