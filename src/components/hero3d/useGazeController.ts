import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { MousePosition } from "../../hooks/useMousePosition";

interface GazeOptions {
  /** target group to rotate */
  target: React.RefObject<THREE.Object3D>;
  mouse: MousePosition;
  /** is the hero currently in view / should the gaze loop run */
  active: React.RefObject<boolean>;
  reducedMotion: boolean;
  /** clamp ranges in radians */
  maxYaw?: number;
  maxPitch?: number;
  /** damping — fraction of remaining distance closed per frame at 60fps */
  damping?: number;
}

const DEG = Math.PI / 180;

/**
 * Adapted "gaze" system for an unrigged single-mesh GLB (see build notes: this asset has
 * no head bone, so the whole model orients toward the cursor instead of just a head node).
 * The illusion still reads as "attention" because of the damped slerp + clamp + idle
 * wake-up + return-to-neutral behavior specified in Section 7.3 of the build spec — those
 * are what actually sell the effect, not which node is rotating.
 */
export function useGazeController({
  target,
  mouse,
  active,
  reducedMotion,
  maxYaw = 32 * DEG,
  maxPitch = 12 * DEG,
  damping = 0.055,
}: GazeOptions) {
  const currentQuat = useRef(new THREE.Quaternion());
  const targetQuat = useRef(new THREE.Quaternion());
  const wakeStart = useRef<number | null>(null);
  const hasWoken = useRef(false);
  const tmpEuler = useRef(new THREE.Euler());

  useFrame((state) => {
    const obj = target.current;
    if (!obj || reducedMotion) return;

    // one-time "wake up" gesture right after mount / hero reveal
    if (!hasWoken.current) {
      if (wakeStart.current === null) wakeStart.current = state.clock.elapsedTime;
      const t = state.clock.elapsedTime - wakeStart.current;
      const wakeDuration = 1.1;
      if (t < wakeDuration) {
        const p = t / wakeDuration;
        const dip = Math.sin(p * Math.PI) * -8 * DEG; // look down then up
        tmpEuler.current.set(dip, 0, 0);
        obj.quaternion.setFromEuler(tmpEuler.current);
        return;
      }
      hasWoken.current = true;
    }

    if (!active.current) return; // hero scrolled out of view — freeze/pause

    let yaw = 0;
    let pitch = 0;

    if (mouse.inside.current) {
      yaw = THREE.MathUtils.clamp(mouse.nx.current, -1, 1) * maxYaw;
      pitch = -THREE.MathUtils.clamp(mouse.ny.current, -1, 1) * maxPitch;
    }
    // if pointer left the window, yaw/pitch fall back to 0 → neutral resting rotation

    tmpEuler.current.set(pitch, yaw, 0);
    targetQuat.current.setFromEuler(tmpEuler.current);

    currentQuat.current.copy(obj.quaternion);
    currentQuat.current.slerp(targetQuat.current, damping);
    obj.quaternion.copy(currentQuat.current);
  });
}
