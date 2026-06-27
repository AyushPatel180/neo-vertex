import { NV } from '@/constants/testIds';

const RESEARCH_AREAS = [
  'Enterprise Memory Systems',
  'AI Operating Systems',
  'Context Engineering',
  'Agent Collaboration',
  'Efficient Inference',
  'Model Compression',
  'Token Optimization',
  'World Models',
  'Artificial Neural Architectures',
  'Bio-inspired Intelligence',
  'Scalable AI Infrastructure',
];

const OBJECTIVES = [
  ['↓', 'Reduce computational cost'],
  ['↑', 'Increase reasoning capability'],
  ['∞', 'Improve long-term intelligence'],
  ['→', 'Advance enterprise AI beyond today’s limitations'],
];

export default function Research() {
  return (
    <section
      id="research"
      data-testid={NV.researchSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-start mb-16 nv-reveal">
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§05 — Research</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px] leading-[1.05]">
              Engineering solves today’s problems.
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                Research creates tomorrow’s industries.
              </span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-6 lg:col-start-7 text-[15px] leading-relaxed text-[var(--nv-text-secondary)] mt-4 lg:mt-3">
            Neo Vertex invests deeply in long-horizon AI research across
            multiple domains. The objective is simple — and ambitious.
          </p>
        </div>

        {/* Research areas grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 border-t border-l border-[var(--nv-border-subtle)] mb-16">
          {RESEARCH_AREAS.map((a, i) => (
            <div
              key={a}
              className="p-6 border-r border-b border-[var(--nv-border-subtle)] hover:bg-[var(--nv-surface-1)] transition-colors duration-500 nv-reveal group"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                  R·{String(i + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-6 bg-[var(--nv-border-strong)] group-hover:w-10 transition-all duration-500" />
              </div>
              <h3 className="nv-display text-white text-[15px] leading-tight">
                {a}
              </h3>
            </div>
          ))}
        </div>

        {/* Objectives row */}
        <div className="border border-[var(--nv-border-subtle)] grid grid-cols-2 lg:grid-cols-4 nv-reveal">
          {OBJECTIVES.map(([sym, obj], i) => (
            <div
              key={obj}
              className={`p-8 ${i < OBJECTIVES.length - 1 ? 'border-r border-[var(--nv-border-subtle)]' : ''} ${i < 2 ? 'border-b lg:border-b-0 border-[var(--nv-border-subtle)]' : ''}`}
            >
              <span className="nv-display text-[var(--nv-accent-azure)] text-3xl">{sym}</span>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--nv-text-secondary)]">
                {obj}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
