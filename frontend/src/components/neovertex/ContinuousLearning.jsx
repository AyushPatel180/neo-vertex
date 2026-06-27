import { NV } from '@/constants/testIds';

const FACETS = [
  { id: 'document', label: 'Every document.', body: 'Contracts, filings, decks, tickets — every artefact becomes an asset.' },
  { id: 'conversation', label: 'Every conversation.', body: 'Meetings, calls, threads — institutional memory captured by default.' },
  { id: 'process', label: 'Every process.', body: 'Workflows reasoned about and improved by the system that runs them.' },
  { id: 'decision', label: 'Every decision.', body: 'Auditable, attributed, and informed by the entire history of the firm.' },
  { id: 'employee', label: 'Every employee.', body: 'Augmented with the institution’s reasoning, not a stand-alone copilot.' },
  { id: 'interaction', label: 'Every customer interaction.', body: 'Context-rich, multilingual, and consistent across every channel.' },
];

export default function ContinuousLearning() {
  return (
    <section
      data-testid={NV.continuousSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section eyebrow */}
        <div className="flex items-center gap-3 mb-12 nv-reveal">
          <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
          <span className="nv-eyebrow">§01 — Thesis</span>
        </div>

        {/* Headline — full-width, tighter */}
        <div className="grid grid-cols-12 gap-6 nv-reveal">
          <h2 className="col-span-12 lg:col-span-10 nv-display text-white text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.04] tracking-[-0.035em]">
            The next generation of enterprises{' '}
            <span className="text-[var(--nv-text-secondary)]">
              will not be defined by software.
            </span>
            <br />
            They will be defined by{' '}
            <span className="relative inline-block">
              intelligence
              <span className="absolute left-0 right-0 -bottom-1 h-px bg-gradient-to-r from-[var(--nv-accent-azure)] via-[var(--nv-accent-steel)] to-transparent" />
            </span>
            <span className="text-white">.</span>
          </h2>
        </div>

        {/* Three quote lines */}
        <div className="mt-16 grid grid-cols-12 gap-6 items-end nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-[var(--nv-text-secondary)] max-w-2xl">
              Everything an organisation does — every document, every
              conversation, every decision — becomes part of a continuously
              learning system. Neo Vertex is building the complete AI
              infrastructure that makes that future operable.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex lg:justify-end">
            <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
              The Surface Area · 06
            </span>
          </div>
        </div>

        {/* Facets — 3-column grid, hairline frame */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-[var(--nv-border-subtle)]">
          {FACETS.map((f, i) => (
            <div
              key={f.id}
              className="relative p-8 lg:p-10 border-r border-b border-[var(--nv-border-subtle)] group hover:bg-[var(--nv-surface-1)] transition-colors duration-500 nv-reveal min-h-[200px]"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                  0{i + 1}
                </span>
                <span className="h-px w-10 bg-[var(--nv-border-strong)] group-hover:w-16 transition-all duration-500" />
              </div>
              <h3 className="nv-display text-white text-xl sm:text-2xl leading-[1.15]">
                {f.label}
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-[var(--nv-text-secondary)]">
                {f.body}
              </p>
              <span className="absolute top-2 left-2 h-2 w-2 border-l border-t border-[var(--nv-border-strong)]" />
              <span className="absolute bottom-2 right-2 h-2 w-2 border-r border-b border-[var(--nv-border-strong)]" />
            </div>
          ))}
        </div>

        {/* Tag line */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 nv-reveal">
          <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
            Continuously learning · structurally remembered · auditable by design
          </span>
          <a
            href="#privacy-scale"
            className="nv-mono text-[11px] tracking-[0.18em] uppercase text-[var(--nv-text-secondary)] hover:text-white border-b border-[var(--nv-border-strong)] hover:border-white pb-0.5 transition-colors"
          >
            How we build for it →
          </a>
        </div>
      </div>
    </section>
  );
}
