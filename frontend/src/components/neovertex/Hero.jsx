import { NV } from '@/constants/testIds';
import HeroMesh from './HeroMesh';

export default function Hero({ onOpenBriefing }) {
  return (
    <section
      id="top"
      data-testid={NV.hero}
      className="relative min-h-screen w-full overflow-hidden border-b border-[var(--nv-border-subtle)]"
    >
      {/* Animated mesh */}
      <HeroMesh testId={NV.heroCanvas} />

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
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-40 pb-32 lg:pt-48 lg:pb-44">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-10">
            <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
            <span className="nv-eyebrow">Neo Vertex Ventures · Deep-Tech</span>
          </div>

          <h1
            data-testid={NV.heroHeadline}
            className="nv-display-heavy text-white text-[44px] sm:text-[64px] lg:text-[84px]"
          >
            We build the
            <br />
            <span className="text-[var(--nv-text-secondary)]">intelligence infrastructure</span>
            <br />
            for the AI Enterprise.
          </h1>

          <p
            data-testid={NV.heroSubcopy}
            className="mt-10 max-w-2xl text-[15px] sm:text-[16px] leading-relaxed text-[var(--nv-text-secondary)]"
          >
            From private foundation models and enterprise memory systems to
            autonomous agents, multilingual AI, voice intelligence, and
            next-generation AI research — Neo Vertex engineers the secure,
            production-grade platforms that let organizations operate on AI at
            enterprise scale, while keeping complete ownership of their
            knowledge.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4">
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
          <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-6 max-w-3xl">
            {[
              ['07', 'Stack modules'],
              ['10⁹', 'Events orchestrated / day'],
              ['SOC 2', 'Type II posture'],
              ['24×7', 'Operating discipline'],
            ].map(([k, v]) => (
              <div key={v} className="flex flex-col gap-2">
                <span className="nv-display text-2xl sm:text-3xl text-white">{k}</span>
                <span className="nv-mono text-[10px] uppercase tracking-[0.18em] text-[var(--nv-text-muted)]">
                  {v}
                </span>
              </div>
            ))}
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
