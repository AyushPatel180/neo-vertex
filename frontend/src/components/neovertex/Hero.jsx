import { useEffect, useRef, useState } from 'react';
import { NV } from '@/constants/testIds';
import HeroMesh from './HeroMesh';

/* Count-up animation hook for numeric stats */
function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const [v, setV] = useState(0);
  const rafRef = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(target * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return decimals ? v.toFixed(decimals) : Math.round(v);
}

function Stat({ value, label, suffix = '', prefix = '' }) {
  const n = useCountUp(value);
  return (
    <div className="flex flex-col gap-2">
      <span className="nv-display text-2xl sm:text-3xl text-white tabular-nums">
        {prefix}
        {n}
        {suffix}
      </span>
      <span className="nv-mono text-[10px] uppercase tracking-[0.18em] text-[var(--nv-text-muted)]">
        {label}
      </span>
    </div>
  );
}

/* Static (non-numeric) stat */
function StaticStat({ value, label }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="nv-display text-2xl sm:text-3xl text-white">{value}</span>
      <span className="nv-mono text-[10px] uppercase tracking-[0.18em] text-[var(--nv-text-muted)]">
        {label}
      </span>
    </div>
  );
}

export default function Hero({ onOpenBriefing, visible }) {
  const meshRef = useRef(null);
  const contentRef = useRef(null);

  // Subtle parallax — mesh drifts slower than scroll, content drifts a touch faster.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (meshRef.current) {
          meshRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        }
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${y * -0.04}px, 0)`;
          contentRef.current.style.opacity = String(Math.max(0, 1 - y / 700));
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      id="top"
      data-testid={NV.hero}
      className="relative min-h-screen w-full overflow-hidden border-b border-[var(--nv-border-subtle)]"
    >
      {/* Animated mesh (parallax) */}
      <div ref={meshRef} className="absolute inset-0 will-change-transform">
        <HeroMesh testId={NV.heroCanvas} />
      </div>

      {/* Subtle grid lines overlay */}
      <div className="nv-grid-lines absolute inset-0 opacity-[0.45] pointer-events-none" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[#05050A]" />

      {/* Side markers */}
      <div className="hidden lg:flex absolute left-6 top-0 bottom-0 flex-col justify-between py-32 pointer-events-none">
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] rotate-90 origin-left translate-y-6">
          NV / 001 — INFRASTRUCTURE
        </span>
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] rotate-90 origin-left translate-y-6">
          BUILD No. 24.12
        </span>
      </div>
      <div className="hidden lg:flex absolute right-6 top-0 bottom-0 flex-col justify-between py-32 pointer-events-none">
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] -rotate-90 origin-right -translate-y-6">
          ENTERPRISE INTELLIGENCE LAYER
        </span>
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] -rotate-90 origin-right -translate-y-6">
          ESTD · MMXXIV
        </span>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-24 lg:pt-36 lg:pb-28 will-change-transform"
      >
        <div className="max-w-4xl lg:max-w-6xl">
          <div className={`flex items-center gap-3 mb-6 lg:mb-8 nv-emerge delay-[100ms] ${visible ? 'is-emerged' : ''}`}>
            <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
            <span className="nv-eyebrow">Neo Vertex Ventures · Deep-Tech</span>
          </div>

          <h1
            data-testid={NV.heroHeadline}
            aria-label="We build the intelligence infrastructure for the AI Enterprise."
            className="nv-display-heavy text-white text-[32px] min-h-0 min-[375px]:text-[38px] min-[425px]:text-[44px] sm:text-[64px] lg:text-[84px] leading-[1.1]"
          >
            <span className={`block nv-emerge delay-[200ms] ${visible ? 'is-emerged' : ''}`}>
              We build the
            </span>
            <span className={`block text-[var(--nv-text-secondary)] nv-emerge delay-[350ms] ${visible ? 'is-emerged' : ''}`}>
              intelligence infrastructure
            </span>
            <span className={`block nv-emerge delay-[500ms] ${visible ? 'is-emerged' : ''}`}>
              for the AI Enterprise.
            </span>
          </h1>

          <p
            data-testid={NV.heroSubcopy}
            className={`mt-6 lg:mt-8 max-w-[600px] text-[15px] sm:text-[16px] leading-relaxed text-[var(--nv-text-secondary)] nv-emerge delay-[650ms] ${visible ? 'is-emerged' : ''}`}
          >
            From private foundation models and enterprise memory systems to
            autonomous agents, multilingual AI, voice intelligence, and
            next-generation AI research — Neo Vertex engineers the secure,
            production-grade platforms that let organizations operate on AI at
            enterprise scale, while keeping complete ownership of their
            knowledge.
          </p>

          <div className={`mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4 nv-emerge delay-[800ms] ${visible ? 'is-emerged' : ''}`}>
            <button
              type="button"
              data-testid={NV.heroCtaPrimary}
              onClick={onOpenBriefing}
              className="nv-btn-primary"
            >
              Request a Briefing
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href="#platform"
              data-testid={NV.heroCtaSecondary}
              className="nv-btn-ghost"
            >
              See the platform
            </a>
          </div>

          {/* Stat row */}
          <div className={`mt-12 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 max-w-3xl nv-emerge delay-[950ms] ${visible ? 'is-emerged' : ''}`}>
            <Stat value={7} label="Stack modules" />
            <Stat value={22} label="Indian languages" suffix="+" />
            <StaticStat value="SOC 2" label="Type II posture" />
            <StaticStat value="24×7" label="Operating discipline" />
          </div>
        </div>
      </div>

      {/* Bottom hairline coordinates */}
      <div className="absolute bottom-5 inset-x-0 flex items-center justify-between mx-auto max-w-7xl px-6 lg:px-10 pointer-events-none">
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
          47.0224° N
        </span>
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] hidden sm:inline">
          NEO·VERTEX·VENTURES·LLP
        </span>
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
          8.6745° E
        </span>
      </div>
    </section>
  );
}
