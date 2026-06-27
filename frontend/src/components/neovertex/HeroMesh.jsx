import { useEffect, useRef } from 'react';

/**
 * HeroMesh — Animated intelligence mesh.
 * Nodes drift slowly on a dark canvas. Connections form between nearby nodes
 * with low opacity. Occasional "data packets" traverse a connection in azure.
 * Designed to feel calm, premium, technically credible. No neon, no chaos.
 */
export default function HeroMesh({ testId }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let nodes = [];
    let packets = [];

    const NODE_COUNT_BASE = 64;
    const LINK_DIST = 150;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedNodes();
    };

    const seedNodes = () => {
      const count = Math.max(
        28,
        Math.min(NODE_COUNT_BASE, Math.floor((width * height) / 22000))
      );
      nodes = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.2 + 0.6,
        phase: Math.random() * Math.PI * 2,
      }));
      packets = [];
    };

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const a = Math.floor(Math.random() * nodes.length);
      let b = Math.floor(Math.random() * nodes.length);
      if (b === a) b = (b + 1) % nodes.length;
      packets.push({ a, b, t: 0, speed: 0.004 + Math.random() * 0.005 });
      if (packets.length > 6) packets.shift();
    };

    let lastPacketAt = 0;
    const tick = (now) => {
      ctx.clearRect(0, 0, width, height);

      // gentle background gradient haze
      const grad = ctx.createRadialGradient(
        width * 0.7, height * 0.35, 0,
        width * 0.7, height * 0.35, Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(28, 50, 110, 0.18)');
      grad.addColorStop(0.6, 'rgba(10, 14, 30, 0.08)');
      grad.addColorStop(1, 'rgba(5, 5, 10, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // update nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK_DIST) {
            const alpha = (1 - d / LINK_DIST) * 0.22;
            ctx.strokeStyle = `rgba(155, 175, 210, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // mouse subtle attraction halo
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 160);
        halo.addColorStop(0, 'rgba(107, 138, 245, 0.10)');
        halo.addColorStop(1, 'rgba(107, 138, 245, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(mx, my, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // nodes
      for (const n of nodes) {
        const pulse = 0.55 + Math.sin(now * 0.0009 + n.phase) * 0.2;
        ctx.fillStyle = `rgba(226, 228, 235, ${0.32 * pulse + 0.2})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // packets
      if (now - lastPacketAt > 1100) {
        spawnPacket();
        lastPacketAt = now;
      }
      ctx.lineCap = 'round';
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;
        if (p.t >= 1) {
          packets.splice(i, 1);
          continue;
        }
        const a = nodes[p.a];
        const b = nodes[p.b];
        if (!a || !b) {
          packets.splice(i, 1);
          continue;
        }
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        // trail
        const trailX = a.x + (b.x - a.x) * Math.max(0, p.t - 0.12);
        const trailY = a.y + (b.y - a.y) * Math.max(0, p.t - 0.12);
        const tg = ctx.createLinearGradient(trailX, trailY, px, py);
        tg.addColorStop(0, 'rgba(14, 165, 233, 0)');
        tg.addColorStop(1, 'rgba(14, 165, 233, 0.85)');
        ctx.strokeStyle = tg;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(trailX, trailY);
        ctx.lineTo(px, py);
        ctx.stroke();
        // head
        ctx.fillStyle = 'rgba(14, 165, 233, 0.95)';
        ctx.beginPath();
        ctx.arc(px, py, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    resize();
    rafRef.current = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-testid={testId}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
