import { NV } from '@/constants/testIds';

const PILLARS = [
  { slug: 'enterprise-first', index: '01', title: 'Enterprise-first architecture.', body: 'Engineered for the procurement desk as much as the demo — governance, residency and audit are defaults.' },
  { slug: 'privacy-first', index: '02', title: 'Privacy-first deployment.', body: 'Everything operates inside your perimeter. No third-party API leakage. No model-vendor lock-in.' },
  { slug: 'research-driven', index: '03', title: 'Research-driven engineering.', body: 'Long-horizon research compounds into every product release. We ship what we research.' },
  { slug: 'production-grade', index: '04', title: 'Production-grade infrastructure.', body: 'SLO-grade observability, replay, rollback and per-action audit across every layer.' },
  { slug: 'scalable', index: '05', title: 'Scalable AI systems.', body: 'From pilot to enterprise-wide rollout on the same substrate — without a re-platforming exercise.' },
  { slug: 'long-term', index: '06', title: 'Long-term intelligence.', body: 'Built for organizations that intend to own — not rent — their AI future.' },
];

export default function WhyNeoVertex() {
  return (
    <section
      id="why"
      data-testid={NV.whySection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§07 — Why Neo Vertex</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px] leading-[1.05]">
              We are not selling AI.
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                We are building the layer beneath it.
              </span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            Six convictions guide every decision we make — from how we
            architect a primitive to how we engage the institutions that
            deploy us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--nv-border-subtle)]">
          {PILLARS.map((p, i) => (
            <div
              key={p.slug}
              data-testid={NV.whyPillar(p.slug)}
              className="relative p-10 lg:p-12 border-r border-b border-[var(--nv-border-subtle)] group transition-colors duration-500 hover:bg-[var(--nv-surface-1)] nv-reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-12">
                <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                  CONVICTION {p.index}
                </span>
                <div className="h-px w-10 bg-[var(--nv-border-strong)] group-hover:w-16 transition-all duration-500" />
              </div>
              <h3 className="nv-display text-white text-xl sm:text-2xl leading-[1.2]">
                {p.title}
              </h3>
              <p className="mt-6 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
                {p.body}
              </p>
              <span className="absolute top-2 left-2 h-2 w-2 border-l border-t border-[var(--nv-border-strong)]" />
              <span className="absolute bottom-2 right-2 h-2 w-2 border-r border-b border-[var(--nv-border-strong)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
