"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ThemeColors } from "./useThemeColors";

const NODE_COUNT = 42;
const GRID = { cols: 7, rows: 3, depth: 2 }; // 7 * 3 * 2 = 42
const K = 5; // number of clusters / modules

// Timeline (seconds). raw inputs -> structured data -> validated system -> trusted outcome -> idle.
const T = {
  fadeIn: 0.8,
  toClusters: [1.4, 2.8] as const, // raw inputs settle into modules (structured data)
  connections: [2.6, 3.6] as const, // module connections fade in (validated system begins)
  toSystem: [2.8, 4.2] as const, // modules consolidate into the final structure
  boxIn: [3.6, 4.2] as const, // the structure's bounding edge appears, dashed (still validating)
  trust: [4.2, 5.0] as const, // edge resolves dashed to solid (trusted outcome)
};

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
// progress of a phase [a,b] at time t
const phase = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));

interface Keyframes {
  scattered: THREE.Vector3[];
  cluster: THREE.Vector3[];
  system: THREE.Vector3[];
  colorIndex: number[]; // 0 = primary, 1 = periwinkle
  hubs: THREE.Vector3[]; // one stable point per module, in final system space
}

function buildKeyframes(): Keyframes {
  const scattered: THREE.Vector3[] = [];
  const cluster: THREE.Vector3[] = [];
  const system: THREE.Vector3[] = [];
  const colorIndex: number[] = [];

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
    // scattered: raw inputs, drifting in from a wide, flattened shell
    const a = rnd() * Math.PI * 2;
    const r = 4.5 + rnd() * 2.5;
    scattered.push(
      new THREE.Vector3(Math.cos(a) * r, (rnd() - 0.5) * 5.5, Math.sin(a) * r * 0.5 - 1),
    );

    // cluster: structured data, grouped into small modules
    const c = clusterCenters[i % K];
    cluster.push(
      new THREE.Vector3(
        c.x + (rnd() - 0.5) * 1.0,
        c.y + (rnd() - 0.5) * 1.0,
        c.z + (rnd() - 0.5) * 0.8,
      ),
    );

    // system: the resolved, validated structure
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

  // One stable hub per module: the centroid of that module's nodes in their
  // final system position. Connections are drawn between these fixed points,
  // not between the moving nodes, so the connecting lines never drift.
  const hubs = Array.from({ length: K }, (_, k) => {
    const centroid = new THREE.Vector3();
    let count = 0;
    for (let i = k; i < NODE_COUNT; i += K) {
      centroid.add(system[i]);
      count++;
    }
    return centroid.divideScalar(count);
  });

  return { scattered, cluster, system, colorIndex, hubs };
}

function beatFor(t: number): number {
  if (t < T.toClusters[0]) return 0; // raw inputs
  if (t < T.toSystem[0]) return 1; // structured data
  if (t < T.trust[0]) return 2; // validated system
  return 3; // trusted outcome
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
  const boxLineRef = useRef<THREE.LineSegments>(null);
  const boxMatRef = useRef<THREE.LineDashedMaterial>(null);
  const connMatRef = useRef<THREE.LineBasicMaterial>(null);
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

  // Line distances are required for LineDashedMaterial to render dashes.
  useEffect(() => {
    boxLineRef.current?.computeLineDistances();
  }, [edges]);

  // The module-connection graph: a ring linking each hub to the next.
  const connectionsGeom = useMemo(() => {
    const positions: number[] = [];
    for (let k = 0; k < kf.hubs.length; k++) {
      const a = kf.hubs[k];
      const b = kf.hubs[(k + 1) % kf.hubs.length];
      positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, [kf.hubs]);

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

    // Module connections fade in as validation begins, then hold steady.
    if (connMatRef.current) {
      connMatRef.current.opacity = 0.5 * easeInOut(phase(t, T.connections[0], T.connections[1]));
    }

    // The structure's bounding edge appears dashed, then resolves solid: the
    // "trusted outcome" beat, replacing a checkmark with a blueprint-style
    // draft-to-final transition.
    if (boxMatRef.current) {
      const boxFade = phase(t, T.boxIn[0], T.boxIn[1]);
      const trustP = easeInOut(phase(t, T.trust[0], T.trust[1]));
      boxMatRef.current.opacity = 0.45 * boxFade + 0.35 * trustP;
      boxMatRef.current.gapSize = 0.09 * (1 - trustP);
      boxMatRef.current.needsUpdate = true;
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
    renderAt(T.trust[1] + 0.5, 0.35, 0, 0);
    onBeat?.(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, colors]);

  useFrame((state) => {
    if (!animate) return;
    if (startRef.current === null) startRef.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - startRef.current;

    const idleStart = T.trust[1];
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
        <primitive object={connectionsGeom} attach="geometry" />
        <lineBasicMaterial ref={connMatRef} color={colors.periwinkle} transparent opacity={0} toneMapped={false} />
      </lineSegments>

      <lineSegments ref={boxLineRef}>
        <primitive object={edges} attach="geometry" />
        <lineDashedMaterial
          ref={boxMatRef}
          color={colors.primary}
          dashSize={0.12}
          gapSize={0.09}
          transparent
          opacity={0}
          toneMapped={false}
        />
      </lineSegments>
    </group>
  );
}
