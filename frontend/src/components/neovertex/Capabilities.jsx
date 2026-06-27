import { NV } from '@/constants/testIds';

/**
 * Capabilities — 4 architectural blocks, each paired with an original
 * precision-linework SVG diagram. No card grid, no stock visuals.
 */

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- Diagrams ---
function DiagramOrchestrator() {
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto" aria-hidden="true">
      <defs>
        <linearGradient id="ng1" x1="0" x2="1">
          <stop offset="0" stopColor="#0EA5E9" stopOpacity="0.0" />
          <stop offset="0.5" stopColor="#6B8AF5" stopOpacity="0.6" />
          <stop offset="1" stopColor="#0EA5E9" stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <rect x="20" y="20" width="320" height="180" />
        <line x1="20" y1="70" x2="340" y2="70" />
        <line x1="20" y1="150" x2="340" y2="150" />
      </g>
      {/* nodes */}
      {[60, 130, 200, 270].map((x) => (
        <g key={x}>
          <circle cx={x} cy="45" r="3" fill="#E2E4EB" />
          <circle cx={x} cy="110" r="3" fill="#9BA1B0" />
          <circle cx={x} cy="180" r="3" fill="#6B8AF5" className="nv-node-pulse" />
        </g>
      ))}
      {/* connections */}
      <g stroke="#3a4156" strokeWidth="1">
        <line x1="60" y1="45" x2="60" y2="180" />
        <line x1="130" y1="45" x2="200" y2="110" />
        <line x1="200" y1="45" x2="270" y2="110" />
        <line x1="130" y1="110" x2="270" y2="180" />
        <line x1="60" y1="110" x2="200" y2="180" />
      </g>
      {/* moving accent */}
      <line x1="20" y1="110" x2="340" y2="110" stroke="url(#ng1)" strokeWidth="1.5">
        <animate attributeName="x1" values="20;200;20" dur="6s" repeatCount="indefinite" />
        <animate attributeName="x2" values="200;340;200" dur="6s" repeatCount="indefinite" />
      </line>
      <text x="24" y="36" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">POLICY</text>
      <text x="24" y="102" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">ROUTING</text>
      <text x="24" y="172" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">EXECUTE</text>
    </svg>
  );
}

function DiagramMemory() {
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        {/* concentric */}
        <circle cx="180" cy="110" r="90" />
        <circle cx="180" cy="110" r="60" />
        <circle cx="180" cy="110" r="30" />
      </g>
      <g stroke="#3a4156" strokeWidth="1">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 12;
          const x1 = 180 + Math.cos(a) * 30;
          const y1 = 110 + Math.sin(a) * 30;
          const x2 = 180 + Math.cos(a) * 90;
          const y2 = 110 + Math.sin(a) * 90;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const x = 180 + Math.cos(a) * 90;
        const y = 110 + Math.sin(a) * 90;
        return <circle key={i} cx={x} cy={y} r="2.2" fill="#E2E4EB" />;
      })}
      <circle cx="180" cy="110" r="4" fill="#0EA5E9" className="nv-node-pulse" />
      <text x="20" y="30" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">EPISODIC · SEMANTIC · VECTOR</text>
    </svg>
  );
}

function DiagramGovernance() {
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <rect x="20" y="30" width="320" height="160" />
      </g>
      {/* lattice */}
      <g stroke="#262a37" strokeWidth="1">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 40} y1="30" x2={20 + i * 40} y2="190" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="20" y1={30 + i * 40} x2="340" y2={30 + i * 40} />
        ))}
      </g>
      {/* highlighted shield path */}
      <path
        d="M180 50 L220 70 V120 C220 145 200 160 180 170 C160 160 140 145 140 120 V70 Z"
        fill="none"
        stroke="#6B8AF5"
        strokeWidth="1.4"
        className="nv-stroke-draw"
      />
      <circle cx="180" cy="110" r="3" fill="#0EA5E9" className="nv-node-pulse" />
      <text x="24" y="22" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">IDENTITY · AUDIT · RESIDENCY</text>
    </svg>
  );
}

function DiagramObservability() {
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto" aria-hidden="true">
      <g stroke="#2D313F" strokeWidth="1" fill="none">
        <rect x="20" y="20" width="320" height="180" />
        <line x1="20" y1="160" x2="340" y2="160" />
      </g>
      {/* baseline ticks */}
      <g stroke="#262a37">
        {Array.from({ length: 32 }).map((_, i) => (
          <line key={i} x1={20 + i * 10} y1="160" x2={20 + i * 10} y2="166" />
        ))}
      </g>
      {/* lines */}
      <polyline
        points="20,140 60,120 100,130 140,90 180,100 220,60 260,80 300,40 340,55"
        fill="none"
        stroke="#9BA1B0"
        strokeWidth="1.2"
      />
      <polyline
        points="20,150 60,148 100,140 140,130 180,128 220,110 260,118 300,95 340,100"
        fill="none"
        stroke="#6B8AF5"
        strokeWidth="1.4"
      />
      <polyline
        points="20,155 60,153 100,150 140,148 180,143 220,138 260,132 300,128 340,120"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="1"
      />
      <text x="24" y="36" fill="#6A7080" fontSize="9" fontFamily="IBM Plex Mono">EVENTS · LATENCY · COST</text>
    </svg>
  );
}

const ITEMS = [
  {
    slug: 'orchestrator',
    eyebrow: 'CAPABILITY · 01',
    title: 'Agentic orchestration, governed by contract.',
    body:
      'Compose multi-step intelligent workflows with policy, routing, retries and human review treated as first-class primitives — not bolt-ons.',
    bullets: ['Workflow contracts', 'Policy gates', 'Tool arbitration', 'Replay & rollback'],
    Diagram: DiagramOrchestrator,
  },
  {
    slug: 'memory',
    eyebrow: 'CAPABILITY · 02',
    title: 'Institutional memory that compounds.',
    body:
      'Episodic, semantic and vector memory unified behind one query surface so every interaction makes the next decision sharper, with full lineage.',
    bullets: ['Unified query', 'Lineage & TTL', 'Per-tenant isolation', 'Forgettable by design'],
    Diagram: DiagramMemory,
  },
  {
    slug: 'governance',
    eyebrow: 'CAPABILITY · 03',
    title: 'Governance, not as a checkbox.',
    body:
      'Identity, audit trails, redaction and data residency woven through every layer — auditable from a single pane, enforced at runtime.',
    bullets: ['Per-action audit', 'PII redaction', 'Residency control', 'SOC 2 · ISO 27001 ready'],
    Diagram: DiagramGovernance,
  },
  {
    slug: 'observability',
    eyebrow: 'CAPABILITY · 04',
    title: 'Observability for thinking systems.',
    body:
      'Latency, cost, drift, reliability and outcome quality — one signal model across models, tools and humans-in-the-loop.',
    bullets: ['Outcome metrics', 'Cost attribution', 'Drift detection', 'SLO-grade alerts'],
    Diagram: DiagramObservability,
  },
];

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      data-testid={NV.capabilitiesSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-20 nv-reveal">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§04 — Capabilities</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px]">
              Built like infrastructure.
              <br />
              <span className="text-[var(--nv-text-secondary)]">Used like a product.</span>
            </h2>
          </div>
          <p className="max-w-md text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            Four operating capabilities form the surface of the platform.
            Each one is deep enough to stand alone, designed to compound when
            run together.
          </p>
        </div>

        <div className="space-y-3">
          {ITEMS.map((it, i) => {
            const D = it.Diagram;
            const reverse = i % 2 === 1;
            return (
              <article
                key={it.slug}
                data-testid={NV.capabilityBlock(it.slug)}
                className="nv-hairline nv-reveal grid grid-cols-12 gap-0 bg-[var(--nv-surface-1)]"
              >
                <div
                  className={`col-span-12 lg:col-span-7 p-8 lg:p-12 ${
                    reverse ? 'lg:order-2 lg:border-l border-[var(--nv-border-subtle)]' : 'lg:border-r border-[var(--nv-border-subtle)]'
                  }`}
                >
                  <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                    {it.eyebrow}
                  </span>
                  <h3 className="mt-5 nv-display text-white text-2xl sm:text-3xl lg:text-[34px] leading-[1.1] max-w-xl">
                    {it.title}
                  </h3>
                  <p className="mt-6 text-[15px] leading-relaxed text-[var(--nv-text-secondary)] max-w-xl">
                    {it.body}
                  </p>
                  <ul className="mt-8 grid grid-cols-2 gap-y-3 gap-x-6 max-w-md">
                    {it.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-[13px] text-[var(--nv-text-secondary)]">
                        <span className="h-px w-4 bg-[var(--nv-border-strong)]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#vision"
                    className="mt-10 inline-flex items-center gap-2 nv-mono text-[11px] tracking-[0.2em] text-white border-b border-[var(--nv-border-strong)] hover:border-white pb-0.5 transition-colors"
                  >
                    ARCHITECTURE NOTE {ARROW}
                  </a>
                </div>
                <div className={`col-span-12 lg:col-span-5 p-8 lg:p-12 flex items-center bg-[var(--nv-surface-2)] ${reverse ? 'lg:order-1' : ''}`}>
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
