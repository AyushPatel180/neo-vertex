import { NV } from '@/constants/testIds';

const PILLARS = [
  {
    slug: 'architecture',
    index: '01',
    title: 'Systems thinking, end to end.',
    body:
      'We engineer the substrate, not the surface. Every primitive is designed to compose, version and outlive the next model release.',
  },
  {
    slug: 'discipline',
    index: '02',
    title: 'Enterprise discipline.',
    body:
      'Audit trails, residency, identity and reversibility are defaults — not premium add-ons. Built for the procurement desk as much as the demo.',
  },
  {
    slug: 'compounding',
    index: '03',
    title: 'A platform that compounds.',
    body:
      'Memory, evaluation and observability turn every interaction into a structural advantage. The longer you run it, the sharper it gets.',
  },
];

export default function WhyNeoVertex() {
  return (
    <section
      data-testid={NV.whySection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-surface-1)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§05 — Why Neo Vertex</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px]">
              We are not selling AI.
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                We are building the layer beneath it.
              </span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            Three convictions guide every decision we make — from how we
            architect a primitive to how we engage with the institutions that
            deploy us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--nv-border-subtle)]">
          {PILLARS.map((p, i) => (
            <div
              key={p.slug}
              data-testid={NV.whyPillar(p.slug)}
              className="relative p-10 lg:p-12 border-r border-b border-[var(--nv-border-subtle)] group transition-colors duration-500 hover:bg-[var(--nv-surface-2)] nv-reveal"
              style={{ transitionDelay: `${i * 70}ms` }}
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
              {/* corner ticks */}
              <span className="absolute top-2 left-2 h-2 w-2 border-l border-t border-[var(--nv-border-strong)]" />
              <span className="absolute bottom-2 right-2 h-2 w-2 border-r border-b border-[var(--nv-border-strong)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
