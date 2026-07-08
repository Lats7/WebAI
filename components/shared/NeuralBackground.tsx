'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulse: number;
  pulseSpeed: number;
}

interface DataStream {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  active: boolean;
  trail: number;
}

/**
 * Calm constellation backdrop — slow-drifting nodes, hairline connections,
 * and occasional data pulses. Fades back as the user scrolls past the hero
 * so content sections stay clean.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const streamsRef = useRef<DataStream[]>([]);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  const initNodes = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 34000), 44);
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.4 + 0.6,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.006,
      });
    }
    nodesRef.current = nodes;

    const streams: DataStream[] = [];
    for (let i = 0; i < count; i++) {
      const target = Math.floor(Math.random() * count);
      if (target !== i) {
        streams.push({
          fromNode: i,
          toNode: target,
          progress: 0,
          speed: Math.random() * 0.004 + 0.002,
          active: Math.random() > 0.7,
          trail: Math.random() * 0.15 + 0.08,
        });
      }
    }
    streamsRef.current = streams;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dimensionsRef.current = { w, h };

      if (nodesRef.current.length === 0) {
        initNodes(w, h);
      }
    };

    // Recede once past the hero — keeps content sections clean
    const handleScroll = () => {
      const vh = window.innerHeight || 1;
      const t = Math.min(window.scrollY / vh, 1);
      canvas.style.opacity = String(1 - t * 0.75);
    };

    handleResize();
    handleScroll();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = () => {
      const { w, h } = dimensionsRef.current;
      const nodes = nodesRef.current;
      const streams = streamsRef.current;

      ctx.clearRect(0, 0, w, h);

      // Update nodes — slow linear drift, no mouse physics
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));
      }

      // Hairline connections
      const connectionDist = Math.min(w, h) * 0.18;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.07;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Data pulses travelling along connections
      for (const stream of streams) {
        if (!stream.active && Math.random() < 0.0015) {
          stream.active = true;
          stream.progress = 0;
        }

        if (!stream.active) continue;

        const from = nodes[stream.fromNode];
        const to = nodes[stream.toNode];
        if (!from || !to) continue;

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > connectionDist * 1.5) {
          stream.active = false;
          continue;
        }

        stream.progress += stream.speed;

        if (stream.progress > 1 + stream.trail) {
          stream.active = false;
          stream.progress = 0;
          continue;
        }

        // Trail
        const trailStart = Math.max(0, stream.progress - stream.trail);
        const trailEnd = Math.min(1, stream.progress);
        const steps = 8;
        for (let s = 0; s < steps; s++) {
          const t = trailStart + (trailEnd - trailStart) * (s / steps);
          if (t < 0 || t > 1) continue;

          const x = from.x + dx * t;
          const y = from.y + dy * t;
          const trailOpacity = (s / steps) * 0.4;
          const size = (s / steps) * 1.8 + 0.4;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${trailOpacity})`;
          ctx.fill();
        }

        // Lead dot
        if (stream.progress <= 1) {
          const headX = from.x + dx * stream.progress;
          const headY = from.y + dy * stream.progress;

          ctx.beginPath();
          ctx.arc(headX, headY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(headX, headY, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(120, 180, 255, 0.7)';
          ctx.fill();
        }
      }

      // Nodes
      for (const node of nodes) {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.25;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.025)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 190, 255, ${0.22 + Math.sin(node.pulse) * 0.12})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
