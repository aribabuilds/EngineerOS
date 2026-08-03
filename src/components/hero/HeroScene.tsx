"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThemeColors } from "./useThemeColors";

const NODE_COUNT = 42;
const GRID = { cols: 7, rows: 3, depth: 2 }; // 7 * 3 * 2 = 42

// Timeline (seconds). variables → functions → a system → adopted → idle.
const T = {
  fadeIn: 0.8,
  toClusters: [1.4, 2.8] as const,
  toSystem: [2.8, 4.2] as const,
  boxIn: [3.8, 4.4] as const,
  check: [4.4, 5.2] as const,
};

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
// progress of a phase [a,b] at time t
const phase = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
// back-ease for the checkmark pop
const easeBack = (x: number) => {
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2);
};

interface Keyframes {
  scattered: THREE.Vector3[];
  cluster: THREE.Vector3[];
  system: THREE.Vector3[];
  colorIndex: number[]; // 0 = primary, 1 = periwinkle
}

function buildKeyframes(): Keyframes {
  const scattered: THREE.Vector3[] = [];
  const cluster: THREE.Vector3[] = [];
  const system: THREE.Vector3[] = [];
  const colorIndex: number[] = [];

  const K = 5;
  const clusterCenters = Array.from({ length: K }, (_, k) => {
    const x = (k - (K - 1) / 2) * 2.15;
    const y = ((k % 2) - 0.5) * 0.8;
    const z = ((k % 3) - 1) * 0.5;
    return new THREE.Vector3(x, y, z);
  });

  // Deterministic pseudo-random so SSR/hydration and reloads are stable.
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const sx = 0.72;
  const sy = 0.72;
  const sz = 0.72;

  for (let i = 0; i < NODE_COUNT; i++) {
    // scattered - drift in from a wide, flattened shell
    const a = rnd() * Math.PI * 2;
    const r = 4.5 + rnd() * 2.5;
    scattered.push(
      new THREE.Vector3(Math.cos(a) * r, (rnd() - 0.5) * 5.5, Math.sin(a) * r * 0.5 - 1),
    );

    // cluster - tight mini-cluster around a centre
    const c = clusterCenters[i % K];
    cluster.push(
      new THREE.Vector3(
        c.x + (rnd() - 0.5) * 1.0,
        c.y + (rnd() - 0.5) * 1.0,
        c.z + (rnd() - 0.5) * 0.8,
      ),
    );

    // system - neat 3D block
    const col = i % GRID.cols;
    const rem = Math.floor(i / GRID.cols);
    const row = rem % GRID.rows;
    const dep = Math.floor(rem / GRID.rows);
    system.push(
      new THREE.Vector3(
        (col - (GRID.cols - 1) / 2) * sx,
        (row - (GRID.rows - 1) / 2) * sy,
        (dep - (GRID.depth - 1) / 2) * sz,
      ),
    );

    colorIndex.push(i % 3 === 0 ? 1 : 0);
  }

  return { scattered, cluster, system, colorIndex };
}

function beatFor(t: number): number {
  if (t < T.toClusters[0]) return 0; // variables
  if (t < T.toSystem[0]) return 1; // functions
  if (t < T.check[0]) return 2; // a system
  return 3; // adopted
}

export interface HeroSceneProps {
  colors: ThemeColors;
  animate: boolean;
  pointerParallax: boolean;
  onBeat?: (beat: number) => void;
}

export default function HeroScene({ colors, animate, pointerParallax, onBeat }: HeroSceneProps) {
  const kf = useMemo(buildKeyframes, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const rootRef = useRef<THREE.Group>(null);
  const checkRef = useRef<THREE.Group>(null);
  const boxMatRef = useRef<THREE.LineBasicMaterial>(null);
  const startRef = useRef<number | null>(null);
  const lastBeat = useRef<number>(-1);

  const primary = useMemo(() => new THREE.Color(colors.primary), [colors.primary]);
  const periwinkle = useMemo(() => new THREE.Color(colors.periwinkle), [colors.periwinkle]);

  // System bounding box (edges) sized to enclose the block with padding.
  const edges = useMemo(() => {
    const w = GRID.cols * 0.72 + 0.7;
    const h = GRID.rows * 0.72 + 0.7;
    const d = GRID.depth * 0.72 + 0.7;
    return new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d));
  }, []);

  // Apply per-instance colours once (and whenever the theme colours change).
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    for (let i = 0; i < NODE_COUNT; i++) {
      mesh.setColorAt(i, kf.colorIndex[i] === 1 ? periwinkle : primary);
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [kf.colorIndex, primary, periwinkle]);

  // Render a given moment of the timeline into the scene.
  const renderAt = (t: number, idleAngle: number, px: number, py: number) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const fade = phase(t, 0, T.fadeIn);
    const pC = easeInOut(phase(t, T.toClusters[0], T.toClusters[1]));
    const pS = easeInOut(phase(t, T.toSystem[0], T.toSystem[1]));

    const tmp = new THREE.Vector3();
    for (let i = 0; i < NODE_COUNT; i++) {
      tmp.copy(kf.scattered[i]).lerp(kf.cluster[i], pC).lerp(kf.system[i], pS);
      dummy.position.copy(tmp);
      const s = 0.9 + 0.25 * Math.sin(i * 1.7); // gentle size variety
      const grow = clamp01(fade * 1.2);
      dummy.scale.setScalar(s * grow);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // System box fades in.
    if (boxMatRef.current) {
      boxMatRef.current.opacity = 0.0 + 0.4 * phase(t, T.boxIn[0], T.boxIn[1]);
    }

    // Checkmark pops in during the "adopted" beat.
    if (checkRef.current) {
      const p = phase(t, T.check[0], T.check[1]);
      const s = p <= 0 ? 0 : easeBack(p);
      checkRef.current.scale.setScalar(s);
      checkRef.current.visible = p > 0;
    }

    // Idle rotation + subtle pointer parallax on the whole assembly.
    if (rootRef.current) {
      rootRef.current.rotation.y = idleAngle + px * 0.25;
      rootRef.current.rotation.x = py * 0.15;
    }
  };

  // Static path: compose the final frame once (reduced-motion / low-power).
  useEffect(() => {
    if (animate) return;
    renderAt(T.check[1] + 0.5, 0.35, 0, 0);
    onBeat?.(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, colors]);

  useFrame((state) => {
    if (!animate) return;
    if (startRef.current === null) startRef.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - startRef.current;

    const idleStart = T.check[1];
    const idleAngle = t > idleStart ? (t - idleStart) * 0.12 : 0;
    const px = pointerParallax ? state.pointer.x : 0;
    const py = pointerParallax ? state.pointer.y : 0;

    renderAt(t, idleAngle, px, py);

    const beat = beatFor(t);
    if (beat !== lastBeat.current) {
      lastBeat.current = beat;
      onBeat?.(beat);
    }
  });

  // Two elongated boxes forming a check mark.
  const strokes = useMemo(() => {
    const make = (from: [number, number], to: [number, number], thickness: number) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];
      const len = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const cx = (from[0] + to[0]) / 2;
      const cy = (from[1] + to[1]) / 2;
      return { len, angle, cx, cy, thickness };
    };
    return [
      make([-0.55, 0.02], [-0.12, -0.4], 0.15),
      make([-0.12, -0.4], [0.72, 0.55], 0.15),
    ];
  }, []);

  return (
    <group ref={rootRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, NODE_COUNT]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[0.12, 0]} />
        <meshBasicMaterial toneMapped={false} transparent />
      </instancedMesh>

      <lineSegments>
        <primitive object={edges} attach="geometry" />
        <lineBasicMaterial
          ref={boxMatRef}
          color={colors.primary}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </lineSegments>

      <group ref={checkRef} position={[0, 0, 1.3]} visible={false}>
        {strokes.map((s, i) => (
          <mesh key={i} position={[s.cx, s.cy, 0]} rotation={[0, 0, s.angle]}>
            <boxGeometry args={[s.len, s.thickness, s.thickness]} />
            <meshBasicMaterial color={colors.primary} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
