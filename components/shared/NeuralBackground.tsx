'use client';

import { useEffect, useRef, useCallback } from 'react';

const SERVICE_LABELS = [
  'Email Agents',
  'Document Creators',
  'AI Agents',
  'Salesforce Optimisation',
  'Full-Stack AI Development',
  'AI Education',
  'CRM Flows',
  'Spreadsheet Agents',
  'SWOT Automation',
];

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
  delay: number;
  trail: number;
}

interface Burst {
  x: number;
  y: number;
  label: string;
  life: number;       // 0 → 1, then dies
  maxLife: number;
  particles: BurstParticle[];
}

interface BurstParticle {
  angle: number;
  speed: number;
  radius: number;
  decay: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const streamsRef = useRef<DataStream[]>([]);
  const burstsRef = useRef<Burst[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const dimensionsRef = useRef({ w: 0, h: 0 });
  const lastBurstRef = useRef(0);
  const labelIndexRef = useRef(0);

  const spawnBurst = useCallback((x: number, y: number) => {
    const label = SERVICE_LABELS[labelIndexRef.current % SERVICE_LABELS.length];
    labelIndexRef.current++;

    const particles: BurstParticle[] = [];
    const count = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      particles.push({
        angle: (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4,
        speed: Math.random() * 2.5 + 1,
        radius: Math.random() * 2 + 1,
        decay: Math.random() * 0.3 + 0.85,
      });
    }

    burstsRef.current.push({
      x,
      y,
      label,
      life: 0,
      maxLife: 180, // ~3 seconds at 60fps
      particles,
    });
  }, []);

  const initNodes = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 22000), 70);
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }
    nodesRef.current = nodes;

    const streams: DataStream[] = [];
    for (let i = 0; i < count; i++) {
      const numStreams = Math.floor(Math.random() * 2) + 1;
      for (let s = 0; s < numStreams; s++) {
        const target = Math.floor(Math.random() * count);
        if (target !== i) {
          streams.push({
            fromNode: i,
            toNode: target,
            progress: 0,
            speed: Math.random() * 0.005 + 0.002,
            active: Math.random() > 0.5,
            delay: Math.random() * 200,
            trail: Math.random() * 0.18 + 0.08,
          });
        }
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let frameCount = 0;

    const animate = () => {
      const { w, h } = dimensionsRef.current;
      const nodes = nodesRef.current;
      const streams = streamsRef.current;
      const bursts = burstsRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);
      frameCount++;

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += node.pulseSpeed;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        const dx = node.x - mouse.x;
        const dy = node.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = ((150 - dist) / 150) * 0.15;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        node.vx *= 0.998;
        node.vy *= 0.998;
      }

      // Draw connections — slightly brighter
      const connectionDist = Math.min(w, h) * 0.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw data streams
      for (const stream of streams) {
        if (!stream.active && Math.random() < 0.003) {
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
          // Stream reached destination — chance to burst
          const now = frameCount;
          if (now - lastBurstRef.current > 90 && Math.random() < 0.45) {
            // Random position across viewport with padding
            const bx = 120 + Math.random() * (w - 240);
            const by = 60 + Math.random() * (h - 120);
            spawnBurst(bx, by);
            lastBurstRef.current = now;
          }

          stream.active = false;
          stream.progress = 0;
          continue;
        }

        // Trail
        const trailStart = Math.max(0, stream.progress - stream.trail);
        const trailEnd = Math.min(1, stream.progress);
        const steps = 10;
        for (let s = 0; s < steps; s++) {
          const t = trailStart + (trailEnd - trailStart) * (s / steps);
          if (t < 0 || t > 1) continue;

          const x = from.x + dx * t;
          const y = from.y + dy * t;
          const trailOpacity = (s / steps) * 0.7;
          const size = (s / steps) * 2.8 + 0.5;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${trailOpacity})`;
          ctx.fill();
        }

        // Lead dot
        if (stream.progress <= 1) {
          const headX = from.x + dx * stream.progress;
          const headY = from.y + dy * stream.progress;

          // Glow
          ctx.beginPath();
          ctx.arc(headX, headY, 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(59, 130, 246, 0.12)';
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(120, 180, 255, 0.9)';
          ctx.fill();
        }
      }

      // --- Bursts: particle explosion + floating label ---
      for (let b = bursts.length - 1; b >= 0; b--) {
        const burst = bursts[b];
        burst.life++;

        const t = burst.life / burst.maxLife; // 0 → 1
        const fadeIn = Math.min(t * 8, 1);    // quick fade in over first 12%
        const fadeOut = Math.max(1 - (t - 0.6) / 0.4, 0); // fade out last 40%
        const alpha = fadeIn * fadeOut;

        if (burst.life > burst.maxLife) {
          bursts.splice(b, 1);
          continue;
        }

        // Draw particles radiating outward
        for (const p of burst.particles) {
          const dist = p.speed * burst.life * 0.4;
          const px = burst.x + Math.cos(p.angle) * dist;
          const py = burst.y + Math.sin(p.angle) * dist;
          const pAlpha = alpha * Math.pow(p.decay, burst.life * 0.15);

          if (pAlpha < 0.01) continue;

          // Particle glow
          ctx.beginPath();
          ctx.arc(px, py, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${pAlpha * 0.08})`;
          ctx.fill();

          // Particle core
          ctx.beginPath();
          ctx.arc(px, py, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(120, 180, 255, ${pAlpha * 0.6})`;
          ctx.fill();
        }

        // Draw label — floats upward slightly
        const labelY = burst.y - 8 - t * 20;
        const labelAlpha = alpha * 0.7;

        if (labelAlpha > 0.01) {
          ctx.save();
          ctx.font = '600 26px system-ui, -apple-system, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Text glow
          ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
          ctx.shadowBlur = 12;
          ctx.fillStyle = `rgba(160, 200, 255, ${labelAlpha})`;
          ctx.fillText(burst.label, burst.x, labelY);

          // Crisp text on top
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(200, 220, 255, ${labelAlpha * 0.9})`;
          ctx.fillText(burst.label, burst.x, labelY);

          ctx.restore();
        }

        // Ring expanding outward
        const ringRadius = t * 50 + 5;
        const ringAlpha = alpha * 0.15;
        if (ringAlpha > 0.005) {
          ctx.beginPath();
          ctx.arc(burst.x, burst.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(59, 130, 246, ${ringAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw nodes — slightly brighter
      for (const node of nodes) {
        const pulseScale = 1 + Math.sin(node.pulse) * 0.3;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 3.5 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.04)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 190, 255, ${0.35 + Math.sin(node.pulse) * 0.2})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initNodes, spawnBurst]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
