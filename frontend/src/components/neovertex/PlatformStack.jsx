import { NV } from '@/constants/testIds';

const LAYERS = [
  {
    slug: 'orchestration',
    index: '05',
    name: 'Orchestration Plane',
    purpose: 'Composition, policy, and lifecycle for every intelligent workflow.',
    primitives: ['Workflows', 'Policies', 'Routing', 'Observability'],
  },
  {
    slug: 'reasoning',
    index: '04',
    name: 'Reasoning Core',
    purpose: 'Model-agnostic reasoning with structured tool-use and arbitration.',
    primitives: ['Planners', 'Tools', 'Evaluators', 'Arbitration'],
  },
  {
    slug: 'memory',
    index: '03',
    name: 'Memory Mesh',
    purpose: 'Durable, queryable institutional memory across time and teams.',
    primitives: ['Episodic', 'Semantic', 'Vector', 'Lineage'],
  },
  {
    slug: 'data',
    index: '02',
    name: 'Data Substrate',
    purpose: 'Connected, contracted access to your systems of record.',
    primitives: ['Connectors', 'Contracts', 'CDC', 'Catalog'],
  },
  {
    slug: 'governance',
    index: '01',
    name: 'Governance Plane',
    purpose: 'Identity, audit, redaction and policy across every layer above.',
    primitives: ['Identity', 'Audit', 'Redaction', 'Residency'],
  },
];

export default function PlatformStack() {
  return (
    <section
      id="platform"
      data-testid={NV.platformSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-6 items-start mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§03 — Architecture</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px] lg:text-[60px]">
              The Vertex
              <br />
              Platform.
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--nv-text-secondary)] max-w-2xl">
              A five-layer architecture engineered the way modern infrastructure
              should be — composable, observable, governed by default. Every
              layer is independently operable, jointly coherent, and built to
              outlast the model of the month.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 nv-mono text-[10px] uppercase tracking-[0.18em] text-[var(--nv-text-muted)]">
              <span className="border border-[var(--nv-border-subtle)] px-3 py-1.5">Composable</span>
              <span className="border border-[var(--nv-border-subtle)] px-3 py-1.5">Observable</span>
              <span className="border border-[var(--nv-border-subtle)] px-3 py-1.5">Governed</span>
              <span className="border border-[var(--nv-border-subtle)] px-3 py-1.5">Sovereign-ready</span>
            </div>
          </div>
        </div>

        {/* Stacked layers */}
        <div className="relative">
          <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[var(--nv-border-strong)] to-transparent hidden md:block" />
          <ol className="space-y-3">
            {LAYERS.map((l, i) => (
              <li
                key={l.slug}
                data-testid={NV.platformLayer(l.slug)}
                className="nv-layer nv-reveal group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="grid grid-cols-12 gap-6 px-6 lg:px-10 py-7 lg:py-9 items-center">
                  <div className="col-span-12 md:col-span-2 flex md:block items-baseline gap-3">
                    <span className="nv-mono text-[11px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                      LAYER {l.index}
                    </span>
                    <span className="md:hidden nv-mono text-[10px] text-[var(--nv-text-muted)]">
                      /
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <h3 className="nv-display text-white text-xl sm:text-2xl">
                      {l.name}
                    </h3>
                  </div>
                  <div className="col-span-12 md:col-span-4">
                    <p className="text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
                      {l.purpose}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-2">
                    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 nv-mono text-[10px] uppercase tracking-[0.18em] text-[var(--nv-text-muted)]">
                      {l.primitives.map((p) => (
                        <li key={p} className="group-hover:text-[var(--nv-text-secondary)] transition-colors">{p}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                {/* hairline accent */}
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--nv-border-subtle)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </li>
            ))}
          </ol>
        </div>

        {/* footer note */}
        <div className="mt-14 nv-reveal flex items-center justify-between flex-wrap gap-4">
          <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
            Each layer is operable as an independent product, or composed as one platform.
          </span>
          <a
            href="#capabilities"
            className="nv-mono text-[11px] tracking-[0.18em] text-[var(--nv-text-secondary)] hover:text-white border-b border-[var(--nv-border-strong)] hover:border-white pb-0.5 transition-colors"
          >
            See capabilities →
          </a>
        </div>
      </div>
    </section>
  );
}
