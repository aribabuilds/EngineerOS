"use client";

import { useEffect, useRef } from "react";

/**
 * Continuous forest scene filling the hero as a full-bleed background: dawn
 * light through a bottle-green canopy, drifting leaves, dust motes, soft
 * depth of field. Faithful port of ariba-hero-final.html's canvas logic into
 * a React-managed canvas. Decorative (aria-hidden, pointer-events: none);
 * pointer parallax is read from the hero section, which keeps its events.
 *
 * Atmospheric-perspective rule: depth fades foliage toward a hazy neutral
 * gray, never toward ink. Nothing is darkened for depth.
 *
 * prefers-reduced-motion: builds and paints a single composed static frame,
 * no animation loop at all.
 */
export default function ForestScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GREEN = "#3E6155";
    const BASE = "#E6E7E8";
    const INK = "#26302E";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hex = (h: string): [number, number, number] => {
      const s = h.replace("#", "");
      return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
    };
    const mix = (a: string, b: string, t: number) => {
      const A = hex(a);
      const B = hex(b);
      return `rgb(${Math.round(A[0] + (B[0] - A[0]) * t)},${Math.round(A[1] + (B[1] - A[1]) * t)},${Math.round(
        A[2] + (B[2] - A[2]) * t,
      )})`;
    };
    const rgba = (h: string, a: number) => {
      const A = hex(h);
      return `rgba(${A[0]},${A[1]},${A[2]},${a})`;
    };
    const HAZE = BASE;
    const mutedGreen = (depth: number) => mix(GREEN, HAZE, depth);
    const mulberry32 = (a: number) => () => {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    let W = 0;
    let H = 0;
    let dpr = 1;
    let offFar: HTMLCanvasElement | null = null;
    let offNear: HTMLCanvasElement | null = null;
    let leaves: {
      x: number;
      y: number;
      size: number;
      vy: number;
      swA: number;
      swF: number;
      swp: number;
      rot: number;
      rs: number;
      col: string;
    }[] = [];
    let motes: { x: number; y: number; r: number; ph: number; sp: number; drift: number }[] = [];
    let LIGHT = { x: 0, y: 0 };

    function foliageMass(
      c: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spread: number,
      count: number,
      color: string,
      seed: number,
    ) {
      const r = mulberry32(seed);
      c.fillStyle = color;
      for (let i = 0; i < count; i++) {
        const a = r() * Math.PI * 2;
        const d = Math.pow(r(), 0.6) * spread;
        const x = cx + Math.cos(a) * d;
        const y = cy + Math.sin(a) * d * 0.7;
        const rad = spread * (0.16 + r() * 0.22);
        c.beginPath();
        c.arc(x, y, rad, 0, Math.PI * 2);
        c.fill();
      }
    }

    function buildStatic() {
      LIGHT = { x: W * 0.8, y: -H * 0.06 };

      offFar = document.createElement("canvas");
      offFar.width = W * dpr;
      offFar.height = H * dpr;
      const ofx = offFar.getContext("2d");
      if (!ofx) return;
      ofx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const g = ofx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, mix(BASE, GREEN, 0.06));
      g.addColorStop(0.55, BASE);
      g.addColorStop(1, mix(GREEN, BASE, 0.42));
      ofx.fillStyle = g;
      ofx.fillRect(0, 0, W, H);
      const glow = ofx.createRadialGradient(LIGHT.x, LIGHT.y, 0, LIGHT.x, LIGHT.y, Math.max(W, H) * 0.9);
      glow.addColorStop(0, "rgba(248,247,240,0.55)");
      glow.addColorStop(0.4, rgba(BASE, 0.14));
      glow.addColorStop(1, "rgba(230,231,232,0)");
      ofx.fillStyle = glow;
      ofx.fillRect(0, 0, W, H);

      ofx.save();
      ofx.filter = "blur(9px)";
      foliageMass(ofx, W * 0.34, -H * 0.02, H * 0.42, 26, mutedGreen(0.62), 3);
      foliageMass(ofx, W * 0.9, H * 0.05, H * 0.4, 24, mutedGreen(0.58), 7);
      ofx.restore();

      ofx.save();
      ofx.filter = "blur(5px)";
      foliageMass(ofx, W * 0.3, H * 0.02, H * 0.34, 22, mutedGreen(0.4), 11);
      foliageMass(ofx, W * 0.97, H * 0.1, H * 0.36, 22, mutedGreen(0.36), 13);
      foliageMass(ofx, W * 0.62, -H * 0.1, H * 0.3, 18, mutedGreen(0.42), 17);
      ofx.restore();

      offNear = document.createElement("canvas");
      offNear.width = W * dpr;
      offNear.height = H * dpr;
      const onx = offNear.getContext("2d");
      if (!onx) return;
      onx.setTransform(dpr, 0, 0, dpr, 0, 0);
      onx.save();
      onx.filter = "blur(16px)";
      foliageMass(onx, W * 0.28, H * 1.02, H * 0.5, 20, rgba(GREEN, 0.88), 21);
      foliageMass(onx, W * 1.0, H * 1.04, H * 0.52, 20, rgba(mix(GREEN, INK, 0.16), 0.85), 23);
      foliageMass(onx, W * 0.3, H * -0.04, H * 0.3, 12, rgba(mix(GREEN, HAZE, 0.1), 0.72), 27);
      onx.restore();
      const r = mulberry32(99);
      onx.save();
      onx.filter = "blur(4px)";
      for (let i = 0; i < 8; i++) {
        const x = W * 0.35 + r() * W * 0.65;
        const y = H * 0.55 + r() * H * 0.5;
        const rad = W * (0.012 + r() * 0.02);
        onx.fillStyle = rgba(BASE, 0.1 + r() * 0.08);
        onx.beginPath();
        onx.arc(x, y, rad, 0, Math.PI * 2);
        onx.fill();
      }
      onx.restore();
      const vg = onx.createRadialGradient(W * 0.62, H * 0.5, H * 0.2, W * 0.62, H * 0.5, Math.max(W, H) * 0.75);
      vg.addColorStop(0, "rgba(38,48,46,0)");
      vg.addColorStop(1, "rgba(38,48,46,0.18)");
      onx.fillStyle = vg;
      onx.fillRect(0, 0, W, H);
    }

    function drawRays(t: number) {
      const rays = [
        { ang: 2.18, len: H * 1.5, w: W * 0.1, a: 0.1, ph: 0.0 },
        { ang: 2.02, len: H * 1.4, w: W * 0.06, a: 0.13, ph: 1.7 },
        { ang: 2.32, len: H * 1.5, w: W * 0.14, a: 0.07, ph: 3.1 },
        { ang: 2.1, len: H * 1.3, w: W * 0.04, a: 0.12, ph: 4.5 },
      ];
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const r of rays) {
        const breathe = 0.6 + 0.4 * Math.sin(t * 0.25 + r.ph);
        const sway = Math.sin(t * 0.12 + r.ph) * 0.03;
        ctx!.save();
        ctx!.translate(LIGHT.x, LIGHT.y);
        ctx!.rotate(r.ang + sway);
        const g = ctx!.createLinearGradient(0, 0, r.len, 0);
        g.addColorStop(0, rgba(BASE, r.a * breathe));
        g.addColorStop(0.35, rgba(BASE, r.a * breathe * 0.6));
        g.addColorStop(1, rgba(BASE, 0));
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.moveTo(0, -r.w * 0.15);
        ctx!.lineTo(r.len, -r.w);
        ctx!.lineTo(r.len, r.w);
        ctx!.lineTo(0, r.w * 0.15);
        ctx!.closePath();
        ctx!.fill();
        ctx!.restore();
      }
      ctx!.restore();
    }

    function initParticles() {
      const r = mulberry32(5);
      motes = [];
      for (let i = 0; i < 46; i++)
        motes.push({
          x: W * 0.25 + r() * W * 0.75,
          y: r() * H,
          r: W * (0.0012 + r() * 0.0022),
          ph: r() * Math.PI * 2,
          sp: 0.2 + r() * 0.5,
          drift: r() * Math.PI * 2,
        });
      leaves = [];
      const cols = [mutedGreen(0.05), mutedGreen(0.22), mutedGreen(0.12), mutedGreen(0.32)];
      for (let i = 0; i < 8; i++) {
        leaves.push({
          x: W * 0.25 + r() * W * 0.75,
          y: r() * H,
          size: W * (0.01 + r() * 0.012),
          vy: H * (0.01 + r() * 0.014),
          swA: W * (0.02 + r() * 0.04),
          swF: 0.5 + r() * 0.8,
          swp: r() * Math.PI * 2,
          rot: r() * Math.PI * 2,
          rs: (r() - 0.5) * 1.2,
          col: cols[i % cols.length],
        });
      }
    }
    function drawMotes(t: number) {
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const m of motes) {
        const x = m.x + Math.cos(t * 0.2 + m.drift) * W * 0.01;
        const y = (m.y - t * m.sp * 10) % (H + 20);
        const yy = y < 0 ? y + H + 20 : y;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * m.sp + m.ph));
        ctx!.fillStyle = rgba(BASE, 0.5 * tw);
        ctx!.beginPath();
        ctx!.arc(x, yy, m.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }
    function leafShape(c: CanvasRenderingContext2D, s: number, col: string) {
      c.fillStyle = col;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(s * 0.7, -s * 0.1, 0, s);
      c.quadraticCurveTo(-s * 0.7, -s * 0.1, 0, -s);
      c.fill();
      c.strokeStyle = rgba(INK, 0.16);
      c.lineWidth = Math.max(0.5, s * 0.06);
      c.beginPath();
      c.moveTo(0, -s);
      c.lineTo(0, s);
      c.stroke();
    }
    function drawLeaves(t: number) {
      for (const l of leaves) {
        let y = (l.y + t * l.vy) % (H + l.size * 3);
        if (y > H + l.size * 2) y -= H + l.size * 3;
        const x = l.x + Math.sin(t * l.swF + l.swp) * l.swA;
        const rot = l.rot + t * l.rs;
        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(rot);
        ctx!.globalAlpha = 0.9;
        leafShape(ctx!, l.size, l.col);
        ctx!.globalAlpha = 1;
        ctx!.restore();
      }
    }

    let driftX = 0;
    let driftY = 0;
    let tgtPX = 0;
    let tgtPY = 0;
    let curPX = 0;
    let curPY = 0;
    const DRIFT = 10;
    function frame(t: number) {
      driftX = Math.sin(t * 0.05) * DRIFT;
      driftY = Math.sin(t * 0.04 + 1.1) * DRIFT * 0.5;
      curPX += (tgtPX - curPX) * 0.05;
      curPY += (tgtPY - curPY) * 0.05;
      const px = curPX;
      const py = curPY;
      ctx!.clearRect(0, 0, W, H);
      if (offFar) ctx!.drawImage(offFar, (driftX + px) * 0.3, (driftY + py) * 0.3, W, H);
      drawRays(t);
      drawMotes(t);
      drawLeaves(t);
      if (offNear) ctx!.drawImage(offNear, (driftX + px) * 0.9, (driftY + py) * 0.9, W, H);
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStatic();
      initParticles();
      if (reduce) {
        driftX = 0;
        driftY = 0;
        frame(8.0);
      }
    }

    const hero = canvas.closest<HTMLElement>(".hero-forest");
    const onPointerMove = (e: PointerEvent) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      tgtPX = ((e.clientX - r.left) / r.width - 0.5) * 2 * 10;
      tgtPY = ((e.clientY - r.top) / r.height - 0.5) * 2 * 8;
    };
    const onPointerLeave = () => {
      tgtPX = 0;
      tgtPY = 0;
    };
    if (!reduce && hero) {
      hero.addEventListener("pointermove", onPointerMove);
      hero.addEventListener("pointerleave", onPointerLeave);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    let rafId = 0;
    if (!reduce) {
      const t0 = performance.now();
      const loop = (now: number) => {
        frame((now - t0) / 1000);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      if (hero) {
        hero.removeEventListener("pointermove", onPointerMove);
        hero.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 block h-full w-full" />;
}
