import { NV } from '@/constants/testIds';

const AGENTS = [
  { slug: 'executive', name: 'Executive Agents', detail: 'Board-grade briefings, strategy synthesis, cross-functional coordination.' },
  { slug: 'ceo-intelligence', name: 'CEO Intelligence', detail: 'Continuous situational awareness across the enterprise.' },
  { slug: 'finance', name: 'Finance Agents', detail: 'Close, FP&A, reconciliation, controls and reporting.' },
  { slug: 'marketing', name: 'Marketing Agents', detail: 'Campaign reasoning, content systems, performance synthesis.' },
  { slug: 'sales', name: 'Sales Agents', detail: 'Pipeline intelligence, account research, deal acceleration.' },
  { slug: 'legal', name: 'Legal Assistants', detail: 'Contracts, clause libraries, redlining, compliance review.' },
  { slug: 'hr', name: 'HR Agents', detail: 'Hiring, onboarding, policy and people operations.' },
  { slug: 'engineering', name: 'Engineering Agents', detail: 'Spec, code-review, systems context, on-call assistance.' },
  { slug: 'operations', name: 'Operations Agents', detail: 'Supply, scheduling, exceptions and continuous improvement.' },
  { slug: 'research', name: 'Research Agents', detail: 'Markets, technologies, regulation, scientific literature.' },
];

function Tick() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.5 5.5L4 8L8.5 2.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AgentsGrid() {
  return (
    <section
      id="agents"
      data-testid={NV.agentsSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-surface-1)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§04 — Autonomous Enterprise Agents</span>
            </div>
            <h2 className="nv-display text-white text-[28px] min-[375px]:text-[34px] min-[425px]:text-[40px] sm:text-[52px] leading-[1.05]">
              Purpose-built AI workers,
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                sharing one institutional brain.
              </span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            Each agent operates independently while sharing organizational
            context through a common enterprise memory layer.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-l border-[var(--nv-border-subtle)]">
          {AGENTS.map((a, i) => (
            <div
              key={a.slug}
              data-testid={NV.agentCard(a.slug)}
              className="relative p-6 border-r border-b border-[var(--nv-border-subtle)] hover:bg-[var(--nv-surface-2)] transition-colors duration-500 nv-reveal min-h-[200px] group"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                  AGT·{String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[var(--nv-text-muted)] group-hover:text-[var(--nv-accent-azure)] transition-colors">
                  <Tick />
                </span>
              </div>
              <h3 className="mt-8 nv-display text-white text-[15px] leading-tight">
                {a.name}
              </h3>
              <p className="mt-3 text-[12px] leading-relaxed text-[var(--nv-text-secondary)]">
                {a.detail}
              </p>
              <span className="absolute bottom-2 left-2 h-1.5 w-1.5 border-l border-b border-[var(--nv-border-strong)]" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 border-r border-t border-[var(--nv-border-strong)]" />
            </div>
          ))}
        </div>

        <p className="mt-10 nv-reveal text-[13px] text-[var(--nv-text-muted)] nv-mono tracking-[0.18em] uppercase">
          Composable · Governed · Shares one memory layer
        </p>
      </div>
    </section>
  );
}
