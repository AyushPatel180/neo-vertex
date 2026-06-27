import { NV } from '@/constants/testIds';

export default function Manifesto({ onOpenBriefing }) {
  return (
    <section
      id="vision"
      data-testid={NV.manifestoSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-32 lg:py-48 bg-[var(--nv-bg)] overflow-hidden"
    >
      {/* faint horizon line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--nv-border-strong)] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-2 nv-reveal">
            <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
              §06 — Vision
            </span>
          </div>
          <div className="col-span-12 lg:col-span-10 nv-reveal">
            <p className="nv-display text-white text-[34px] sm:text-[48px] lg:text-[64px] leading-[1.08] max-w-5xl">
              The next decade of enterprise software will not be written —
              it will be{' '}
              <span className="text-[var(--nv-text-secondary)]">orchestrated.</span>
              {' '}
              Neo Vertex is the layer that makes that future operable,
              auditable, and{' '}
              <span className="text-[var(--nv-text-secondary)]">trustworthy at scale.</span>
            </p>

            <div className="mt-16 grid grid-cols-12 gap-6 nv-reveal">
              <div className="col-span-12 md:col-span-7">
                <p className="text-[15px] leading-relaxed text-[var(--nv-text-secondary)] max-w-2xl">
                  We work with a small number of institutions each year to
                  architect, deploy and operate enterprise intelligence
                  infrastructure. If you are stewarding the next decade of
                  your organisation, we should be talking.
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 flex md:justify-end">
                <button
                  type="button"
                  data-testid={`${NV.heroCtaPrimary}-vision`}
                  onClick={onOpenBriefing}
                  className="nv-btn-primary"
                >
                  Request a Briefing
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
