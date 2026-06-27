import { NV } from '@/constants/testIds';

const ERAS = [
  { kicker: 'Era 01', title: 'Software', sub: 'transformed business.' },
  { kicker: 'Era 02', title: 'Cloud', sub: 'transformed infrastructure.' },
  { kicker: 'Era 03', title: 'Artificial Intelligence', sub: 'will transform organizations.' },
];

export default function FutureManifesto() {
  return (
    <section
      id="vision"
      data-testid={NV.futureSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-32 lg:py-48 bg-[var(--nv-bg)] overflow-hidden"
    >
      {/* faint horizon line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[var(--nv-border-strong)] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 mb-20">
          <div className="col-span-12 lg:col-span-3 nv-reveal">
            <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
              §08 — The Future of Enterprise Intelligence
            </span>
          </div>
          <div className="col-span-12 lg:col-span-9 nv-reveal">
            <h2 className="nv-display text-white text-[34px] sm:text-[48px] lg:text-[60px] leading-[1.08] max-w-5xl">
              The future enterprise will not simply{' '}
              <span className="text-[var(--nv-text-secondary)]">use</span> AI.
              <br />
              It will{' '}
              <span className="text-[var(--nv-text-secondary)]">operate on</span>{' '}
              AI.
            </h2>
          </div>
        </div>

        {/* Eras */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--nv-border-subtle)]">
          {ERAS.map((e, i) => (
            <div
              key={e.title}
              className={`p-8 lg:p-10 border-r border-b border-[var(--nv-border-subtle)] nv-reveal ${
                i === 2 ? 'bg-[var(--nv-surface-1)]' : ''
              }`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                {e.kicker}
              </span>
              <h3
                className={`mt-8 nv-display text-2xl sm:text-3xl ${
                  i === 2 ? 'text-white' : 'text-[var(--nv-text-secondary)]'
                }`}
              >
                {e.title}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
                {e.sub}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-16 nv-reveal max-w-3xl text-[15px] sm:text-[16px] leading-relaxed text-[var(--nv-text-secondary)]">
          Neo Vertex is building the intelligence layer that powers that
          transformation — operable, auditable and trustworthy at the scale of
          the organisations that actually run the economy.
        </p>
      </div>
    </section>
  );
}
