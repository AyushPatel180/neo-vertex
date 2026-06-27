import { NV } from '@/constants/testIds';
import {
  DFoundation,
  DIntelligence,
  DOS,
  DAgents,
  DResearch,
  DVoice,
  DMultilingual,
} from './diagrams';

/* ===== Stack data ===== */
const MODULES = [
  {
    slug: 'foundation-models',
    index: '01',
    name: 'Enterprise Foundation Models',
    body:
      'Deploy domain-specific foundation models trained entirely on enterprise knowledge — running on private GPU clusters, never on third-party endpoints.',
    primitives: ['Private LLMs', 'Fine-tuning pipelines', 'Enterprise embeddings', 'Secure inference', 'On-prem GPU clusters'],
    Diagram: DFoundation,
  },
  {
    slug: 'intelligence-platform',
    index: '02',
    name: 'Enterprise Intelligence Platform',
    body:
      'Convert fragmented organizational knowledge into searchable enterprise intelligence — unified data lakes, semantic search, document intelligence and long-term organizational memory.',
    primitives: ['Unified Data Lakes', 'Semantic Search', 'Document Intelligence', 'Knowledge Graphs', 'RAG', 'Context Engines'],
    Diagram: DIntelligence,
  },
  {
    slug: 'ai-os',
    index: '03',
    name: 'AI Operating System',
    body:
      'Agents require more than language models — they require operating systems. Shared memory, planning, scheduling, and inter-agent communication as first-class primitives.',
    primitives: ['Shared Memory', 'Context Management', 'Agent Orchestration', 'Planning Engines', 'Execution Frameworks', 'Persistent State'],
    Diagram: DOS,
  },
  {
    slug: 'autonomous-agents',
    index: '04',
    name: 'Autonomous Enterprise Agents',
    body:
      'Purpose-built AI workers capable of executing specialized enterprise functions, operating independently while sharing context through a common enterprise memory layer.',
    primitives: ['Executive', 'Finance', 'Marketing', 'Sales', 'Legal', 'HR', 'Engineering', 'Operations', 'Research'],
    Diagram: DAgents,
  },
  {
    slug: 'research-platform',
    index: '05',
    name: 'Enterprise Research Platform',
    body:
      'Continuously research markets, competitors, technologies, regulations and scientific literature — without exposing proprietary information. Multiple model routing, secure ingestion, internal indexing.',
    primitives: ['Multi-model routing', 'External acquisition', 'Secure ingestion', 'Internal indexing', 'Continuous enrichment'],
    Diagram: DResearch,
  },
  {
    slug: 'voice-intelligence',
    index: '06',
    name: 'Voice Intelligence',
    body:
      'Production-grade multilingual voice AI designed for enterprise deployment — natural conversations, context retention, low latency and deep enterprise integrations.',
    primitives: ['Real-time voice', 'Context retention', 'Low latency', 'Enterprise integrations', 'Regional language'],
    Diagram: DVoice,
  },
  {
    slug: 'multilingual-ai',
    index: '07',
    name: 'Multilingual AI',
    body:
      'India requires AI built for India. We engineer multilingual language technologies that understand regional languages, translation, enterprise terminology and domain-specific communication.',
    primitives: ['Regional languages', 'Translation', 'Enterprise terminology', 'Domain adaptation', 'Code-mixed text'],
    Diagram: DMultilingual,
  },
];

export default function EnterpriseStack() {
  return (
    <section
      id="platform"
      data-testid={NV.stackSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-6 items-end mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§03 — The Enterprise AI Stack</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.05]">
              Seven modules.
              <br />
              <span className="text-[var(--nv-text-secondary)]">One coherent system.</span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            Every component — from infrastructure to intelligence — is designed
            to work together. Operable standalone. Compounding when run as one.
          </p>
        </div>

        {/* Modules */}
        <div className="space-y-3">
          {MODULES.map((m, i) => {
            const D = m.Diagram;
            const reverse = i % 2 === 1;
            return (
              <article
                key={m.slug}
                id={m.slug}
                data-testid={NV.stackModule(m.slug)}
                className="nv-hairline nv-reveal grid grid-cols-12 gap-0 bg-[var(--nv-surface-1)] group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div
                  className={`col-span-12 lg:col-span-7 p-8 lg:p-12 ${
                    reverse
                      ? 'lg:order-2 lg:border-l border-[var(--nv-border-subtle)]'
                      : 'lg:border-r border-[var(--nv-border-subtle)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                      MODULE · {m.index}
                    </span>
                    <span className="h-px w-10 bg-[var(--nv-border-strong)] group-hover:w-16 transition-all duration-500" />
                  </div>
                  <h3 className="mt-6 nv-display text-white text-2xl sm:text-3xl lg:text-[34px] leading-[1.1] max-w-xl">
                    {m.name}
                  </h3>
                  <p className="mt-6 text-[15px] leading-relaxed text-[var(--nv-text-secondary)] max-w-xl">
                    {m.body}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 max-w-2xl">
                    {m.primitives.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2.5 text-[13px] text-[var(--nv-text-secondary)]"
                      >
                        <span className="h-px w-3 bg-[var(--nv-border-strong)]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`col-span-12 lg:col-span-5 p-6 lg:p-10 flex items-center bg-[var(--nv-surface-2)] ${
                    reverse ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="w-full">
                    <D />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
