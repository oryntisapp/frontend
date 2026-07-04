import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";
import { useGazeController } from "./useGazeController";

const MODEL_URL = new URL("../../assets/models/robot.glb", import.meta.url).href;
useGLTF.preload(MODEL_URL);

// World-space height (in Canvas units) the robot should occupy once normalized, tuned
// against the camera setup in RobotCanvas.tsx so the full figure — feet to head — sits
// inside the frustum with a small margin on both ends. Change this and the camera's
// position/fov together if you ever need a different framing.
const TARGET_HEIGHT = 2.05;

interface RobotModelProps {
  mouse: MousePosition;
  heroInView: React.RefObject<boolean>;
  reducedMotion: boolean;
}

export default function RobotModel({ mouse, heroInView, reducedMotion }: RobotModelProps) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const emissiveMats = useRef<THREE.MeshStandardMaterial[]>([]);

  // Normalize scale from the model's raw authored units to a known world height, THEN
  // compute the centering offset using that same scale factor.
  //
  // Bug fixed here: position and scale compose independently — a vertex's final world
  // position is `position + scale * localPoint`, not `scale * (position + localPoint)`.
  // The previous version computed the centering offset from the *unscaled* bounding box
  // and applied it directly as `scene.position`, then applied a separate `scale={1.9}`
  // on the JSX `<primitive>`. That left the offset uncorrected for scale: the true world
  // offset needed is `-boxMin * scale`, not `-boxMin`. For a model roughly human-height
  // with scale ~1.9, that mismatch was large enough to push the head to ~y=2.8 — well
  // outside the camera's visible range — which is exactly why only the lower body/torso
  // was ever visible in the rendered frame.
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const rawHeight = size.y || 1;
    const scale = TARGET_HEIGHT / rawHeight;

    scene.scale.setScalar(scale);
    // Offset computed IN SCALED units so the feet land exactly at y=0 and the model is
    // horizontally centered, regardless of where the raw asset's own origin/pivot was.
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
  }, [scene]);

  useGazeController({
    target: group as React.RefObject<THREE.Object3D>,
    mouse,
    active: heroInView,
    reducedMotion,
  });

  // subtle idle emissive "breathing" pulse — the asset carries its own baked emissive bake,
  // so this reads as the surface gently coming alive rather than a static texture.
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