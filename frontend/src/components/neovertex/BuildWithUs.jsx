import { NV } from '@/constants/testIds';

const ACTIONS = [
  ['Own', 'your intelligence.'],
  ['Scale', 'your enterprise.'],
  ['Engineer', 'the future.'],
];

export default function BuildWithUs({ onOpenBriefing }) {
  return (
    <section
      id="build"
      data-testid={NV.buildSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-surface-1)] overflow-hidden"
    >
      {/* diagonal accent line */}
      <div className="absolute inset-0 nv-grid-lines opacity-[0.4] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16 nv-reveal">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§09 — Build With Us</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="nv-display text-white text-[40px] sm:text-[56px] lg:text-[64px] leading-[1.05] max-w-4xl">
              Whether you’re a Fortune 500 modernising operations
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                or a fast-growing business preparing for the next decade —
              </span>{' '}
              we should be talking.
            </h2>
          </div>
        </div>

        {/* Action triplet */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--nv-border-subtle)] mb-16">
          {ACTIONS.map(([verb, rest], i) => (
            <div
              key={verb}
              className="p-10 border-r border-b border-[var(--nv-border-subtle)] nv-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                STEP · 0{i + 1}
              </span>
              <h3 className="mt-8 nv-display text-white text-3xl sm:text-4xl">
                {verb}{' '}
                <span className="text-[var(--nv-text-secondary)]">{rest}</span>
              </h3>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="nv-reveal grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[15px] leading-relaxed text-[var(--nv-text-secondary)] max-w-2xl">
              Neo Vertex helps you build secure, intelligent systems that
              compound organisational knowledge and accelerate decision-making.
              Briefings are private, structured and led by senior architects.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 flex lg:justify-end gap-3 flex-wrap">
            <button
              type="button"
              data-testid={NV.buildCta}
              onClick={onOpenBriefing}
              className="nv-btn-primary"
            >
              Request a Briefing
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#platform" className="nv-btn-ghost">
              Explore the stack
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
