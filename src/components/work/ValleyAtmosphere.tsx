"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient canvas for a work card: a pure bottle-green atmosphere gradient,
 * drifting gray leaves, soft god-rays, twinkling bokeh. Shares its math and
 * technique with the Hero's ForestScene (same PRNG, color-mix helpers,
 * rays/leaves/motes routines, reduced-motion static-frame fallback) but
 * draws no foliage masses or trunk shapes at all — no illustrated landform.
 * Light and color only. Self-sizes to its parent element (round 9: now a
 * card-sized box, not the full viewport), so particle counts are tuned low
 * to read as ambient rather than cluttered at that smaller scale.
 * Decorative (aria-hidden, pointer-events: none).
 */
export default function ValleyAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SKY = "#B3DBED";
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
    const LIGHT_GREEN = mix(GREEN, BASE, 0.4);
    const DEEP_GREEN = mix(GREEN, INK, 0.5);
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
    let LIGHT = { x: 0, y: 0 };
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
    }[] = [];
    let motes: { x: number; y: number; r: number; ph: number; sp: number; drift: number }[] = [];

    function drawRays(t: number) {
      const rays = [
        { ang: 2.18, len: H * 1.5, w: W * 0.1, a: 0.09, ph: 0.0 },
        { ang: 2.02, len: H * 1.4, w: W * 0.06, a: 0.12, ph: 1.7 },
        { ang: 2.32, len: H * 1.5, w: W * 0.14, a: 0.06, ph: 3.1 },
        { ang: 2.1, len: H * 1.3, w: W * 0.04, a: 0.11, ph: 4.5 },
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
        g.addColorStop(0.35, rgba(SKY, r.a * breathe * 0.6));
        g.addColorStop(1, rgba(SKY, 0));
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

    function drawMotes(t: number) {
      ctx!.save();
      ctx!.globalCompositeOperation = "lighter";
      for (const m of motes) {
        const x = m.x + Math.cos(t * 0.2 + m.drift) * W * 0.01;
        const y = (m.y - t * m.sp * 10) % (H + 20);
        const yy = y < 0 ? y + H + 20 : y;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(t * m.sp + m.ph));
        ctx!.fillStyle = rgba(BASE, 0.55 * tw);
        ctx!.beginPath();
        ctx!.arc(x, yy, m.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.restore();
    }

    function leafShape(c: CanvasRenderingContext2D, s: number) {
      // Leaves are gray, never green or brown, per the brief.
      c.fillStyle = BASE;
      c.beginPath();
      c.moveTo(0, -s);
      c.quadraticCurveTo(s * 0.7, -s * 0.1, 0, s);
      c.quadraticCurveTo(-s * 0.7, -s * 0.1, 0, -s);
      c.fill();
      c.strokeStyle = rgba(INK, 0.14);
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
        ctx!.globalAlpha = 0.85;
        leafShape(ctx!, l.size);
        ctx!.globalAlpha = 1;
        ctx!.restore();
      }
    }

    function drawAtmosphere() {
      LIGHT = { x: W * 0.7, y: -H * 0.05 };
      const g = ctx!.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, LIGHT_GREEN);
      g.addColorStop(0.55, GREEN);
      g.addColorStop(1, DEEP_GREEN);
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, W, H);

      const glow = ctx!.createRadialGradient(LIGHT.x, LIGHT.y, 0, LIGHT.x, LIGHT.y, Math.max(W, H) * 0.9);
      glow.addColorStop(0, "rgba(248,247,240,0.35)");
      glow.addColorStop(0.4, rgba(SKY, 0.1));
      glow.addColorStop(1, "rgba(230,231,232,0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, W, H);
    }

    function initParticles() {
      const r = mulberry32(41);
      motes = [];
      for (let i = 0; i < 14; i++)
        motes.push({
          x: r() * W,
          y: r() * H,
          r: W * (0.0018 + r() * 0.003),
          ph: r() * Math.PI * 2,
          sp: 0.2 + r() * 0.5,
          drift: r() * Math.PI * 2,
        });
      leaves = [];
      for (let i = 0; i < 4; i++) {
        leaves.push({
          x: r() * W,
          y: r() * H,
          size: W * (0.008 + r() * 0.01),
          vy: H * (0.008 + r() * 0.012),
          swA: W * (0.02 + r() * 0.04),
          swF: 0.5 + r() * 0.8,
          swp: r() * Math.PI * 2,
          rot: r() * Math.PI * 2,
          rs: (r() - 0.5) * 1.2,
        });
      }
    }

    function frame(t: number) {
      ctx!.clearRect(0, 0, W, H);
      drawAtmosphere();
      drawRays(t);
      drawMotes(t);
      drawLeaves(t);
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      W = Math.max(1, rect.width);
      H = Math.max(1, rect.height);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
      frame(reduce ? 8.0 : 0);
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
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 block h-full w-full" />;
}
