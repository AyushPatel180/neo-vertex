import { NV } from '@/constants/testIds';

const FACETS = [
  'Every document.',
  'Every conversation.',
  'Every process.',
  'Every decision.',
  'Every employee.',
  'Every customer interaction.',
];

export default function ContinuousLearning() {
  return (
    <section
      data-testid={NV.continuousSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 nv-reveal">
          <div className="col-span-12 lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§01 — Thesis</span>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <h2 className="nv-display text-white text-[34px] sm:text-[44px] lg:text-[56px] max-w-4xl leading-[1.08]">
              The next generation of enterprises will not be defined by
              software.{' '}
              <span className="text-[var(--nv-text-secondary)]">
                They will be defined by intelligence.
              </span>
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3 lg:col-start-4 nv-reveal">
            <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
              The Surface Area
            </span>
          </div>
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <ul className="space-y-3">
              {FACETS.map((f, i) => (
                <li
                  key={f}
                  className="nv-reveal flex items-center gap-4 border-b border-[var(--nv-border-subtle)] py-4"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span className="nv-mono text-[11px] tracking-[0.22em] text-[var(--nv-text-muted)] w-8">
                    0{i + 1}
                  </span>
                  <span className="nv-display text-white text-xl sm:text-2xl">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[15px] sm:text-[16px] leading-relaxed text-[var(--nv-text-secondary)] max-w-2xl nv-reveal">
              Everything becomes part of a continuously learning enterprise.
              Neo Vertex Ventures is building the complete AI infrastructure
              required to make that future possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
