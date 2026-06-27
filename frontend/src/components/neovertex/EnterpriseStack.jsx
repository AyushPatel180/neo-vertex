import { NV } from '@/constants/testIds';

/* ===== Diagrams (small premium SVG vignettes) ===== */

function DFoundation() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
            <rect key={`${r}-${c}`} x={20 + c * 36} y={20 + r * 36} width="28" height="28" />
          ))
        )}
      </g>
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((c) => {
          const on = (r + c) % 3 === 0;
          return (
            <circle
              key={`${r}-${c}-d`}
              cx={20 + c * 36 + 14}
              cy={20 + r * 36 + 14}
              r="2"
              fill={on ? '#6B8AF5' : '#3a4156'}
              className={on ? 'nv-node-pulse' : ''}
            />
          );
        })
      )}
      <text x="20" y="174" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">GPU CLUSTER · 4×8 · PRIVATE</text>
    </svg>
  );
}

function DIntelligence() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <path d="M40 60 L160 30 L280 60 L280 130 L160 160 L40 130 Z" />
        <line x1="40" y1="60" x2="280" y2="130" />
        <line x1="280" y1="60" x2="40" y2="130" />
        <line x1="160" y1="30" x2="160" y2="160" />
      </g>
      <g>
        {[
          [40, 60], [160, 30], [280, 60], [280, 130], [160, 160], [40, 130], [160, 95],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={i === 6 ? '#0EA5E9' : '#E2E4EB'} className={i === 6 ? 'nv-node-pulse' : ''} />
        ))}
      </g>
      <text x="20" y="174" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">KNOWLEDGE GRAPH · SEMANTIC INDEX</text>
    </svg>
  );
}

function DOS() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <rect x="20" y="22" width="280" height="22" />
        <rect x="20" y="50" width="280" height="22" />
        <rect x="20" y="78" width="280" height="22" />
        <rect x="20" y="106" width="280" height="22" />
        <rect x="20" y="134" width="280" height="22" />
      </g>
      <g fontFamily="IBM Plex Mono" fontSize="9" fill="#9BA1B0">
        <text x="30" y="37">PROCESS / agent.exec</text>
        <text x="30" y="65">MEMORY  / shared.context</text>
        <text x="30" y="93">SCHED   / planner.tick</text>
        <text x="30" y="121">IPC     / bus.dispatch</text>
        <text x="30" y="149">STATE   / persist.commit</text>
      </g>
      <circle cx="290" cy="33" r="2.4" fill="#0EA5E9" className="nv-node-pulse" />
      <circle cx="290" cy="61" r="2.4" fill="#6B8AF5" className="nv-node-pulse" />
      <circle cx="290" cy="89" r="2.4" fill="#6B8AF5" className="nv-node-pulse" />
    </svg>
  );
}

function DAgents() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#3a4156" strokeWidth="1">
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 6 - Math.PI / 2;
          const x2 = 160 + Math.cos(a) * 60;
          const y2 = 90 + Math.sin(a) * 50;
          return <line key={i} x1="160" y1="90" x2={x2} y2={y2} />;
        })}
      </g>
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 6 - Math.PI / 2;
        const x = 160 + Math.cos(a) * 60;
        const y = 90 + Math.sin(a) * 50;
        return <circle key={i} cx={x} cy={y} r="4" fill="#E2E4EB" />;
      })}
      <circle cx="160" cy="90" r="6" fill="none" stroke="#6B8AF5" strokeWidth="1.4" />
      <circle cx="160" cy="90" r="2.5" fill="#0EA5E9" className="nv-node-pulse" />
      <text x="20" y="174" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">SHARED CONTEXT · INTER-AGENT BUS</text>
    </svg>
  );
}

function DResearch() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <line x1="40" y1="90" x2="280" y2="90" />
        {[40, 100, 160, 220, 280].map((x) => (
          <line key={x} x1={x} y1="50" x2={x} y2="130" />
        ))}
      </g>
      {[40, 100, 160, 220, 280].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="50" r="2.6" fill="#9BA1B0" />
          <circle cx={x} cy="90" r="3.2" fill="#6B8AF5" />
          <circle cx={x} cy="130" r="2.6" fill="#9BA1B0" />
          {i < 4 && (
            <line x1={x} y1="90" x2={x + 60} y2="90" stroke="#0EA5E9" strokeOpacity="0.5" strokeWidth="1.4" />
          )}
        </g>
      ))}
      <text x="20" y="174" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">MULTI-MODEL ROUTING · KNOWLEDGE PIPELINE</text>
    </svg>
  );
}

function DVoice() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#6B8AF5" strokeWidth="1.2" fill="none">
        {Array.from({ length: 48 }).map((_, i) => {
          const x = 20 + i * 6;
          const h = 8 + Math.abs(Math.sin(i * 0.45)) * 60;
          return <line key={i} x1={x} y1={90 - h / 2} x2={x} y2={90 + h / 2} />;
        })}
      </g>
      <text x="20" y="174" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">REAL-TIME · MULTILINGUAL · LOW LATENCY</text>
    </svg>
  );
}

function DMultilingual() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <circle cx="160" cy="90" r="60" />
        <ellipse cx="160" cy="90" rx="60" ry="22" />
        <ellipse cx="160" cy="90" rx="22" ry="60" />
        <line x1="100" y1="90" x2="220" y2="90" />
      </g>
      <g fontFamily="IBM Plex Mono" fontSize="9" fill="#9BA1B0">
        <text x="42" y="40">EN</text>
        <text x="260" y="40">HI</text>
        <text x="42" y="150">TA</text>
        <text x="260" y="150">BN</text>
        <text x="148" y="22">MR</text>
        <text x="148" y="166">TE</text>
      </g>
      <circle cx="160" cy="90" r="3" fill="#0EA5E9" className="nv-node-pulse" />
    </svg>
  );
}

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
                  className={`col-span-12 lg:col-span-5 p-8 lg:p-12 flex items-center bg-[var(--nv-surface-2)] ${
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
