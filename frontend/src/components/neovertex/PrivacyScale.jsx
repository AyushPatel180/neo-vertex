import { NV } from '@/constants/testIds';

const PROBLEMS = [
  'Knowledge leaves the organization.',
  'Context is lost between tools and teams.',
  'Costs grow exponentially with every API.',
  'Models cannot learn from institutional intelligence.',
];

const NV_APPROACH = [
  'Private foundation models',
  'Enterprise knowledge systems',
  'AI operating systems',
  'Agent orchestration',
  'Shared memory',
  'Context management',
  'Model routing',
  'Research platforms',
  'Voice intelligence',
];

export default function PrivacyScale() {
  return (
    <section
      id="privacy-scale"
      data-testid={NV.privacyScaleSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-surface-1)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§02 — Enterprise AI</span>
            </div>
            <h2 className="nv-display text-white text-[40px] sm:text-[52px] leading-[1.05]">
              Built for Privacy.
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                Designed for Scale.
              </span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            Most organizations today use AI through disconnected APIs, isolated
            copilots and fragmented workflows. We approach enterprise AI
            differently.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-0 border border-[var(--nv-border-subtle)]">
          {/* Left — problems */}
          <div className="col-span-12 md:col-span-6 p-8 lg:p-12 border-b md:border-b-0 md:border-r border-[var(--nv-border-subtle)] nv-reveal">
            <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
              The Status Quo
            </span>
            <h3 className="mt-4 nv-display text-white text-2xl sm:text-3xl">
              Disconnected AI breaks the enterprise.
            </h3>
            <ul className="mt-8 space-y-4">
              {PROBLEMS.map((p, i) => (
                <li
                  key={p}
                  className="flex items-start gap-4 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]"
                >
                  <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] mt-1.5 w-6 shrink-0">
                    0{i + 1}
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Neo Vertex approach */}
          <div className="col-span-12 md:col-span-6 p-8 lg:p-12 bg-[var(--nv-surface-2)] nv-reveal">
            <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-accent-azure)]">
              The Neo Vertex Approach
            </span>
            <h3 className="mt-4 nv-display text-white text-2xl sm:text-3xl">
              Complete AI ecosystems, working as one.
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-6">
              {NV_APPROACH.map((m) => (
                <div
                  key={m}
                  className="flex items-center gap-3 text-[13px] text-[var(--nv-text-secondary)]"
                >
                  <span className="h-1.5 w-1.5 bg-[var(--nv-accent-azure)] rounded-full" />
                  {m}
                </div>
              ))}
            </div>
            <p className="mt-10 pt-6 border-t border-[var(--nv-border-subtle)] text-[13px] leading-relaxed text-[var(--nv-text-secondary)]">
              All running securely inside your organization.{' '}
              <span className="text-white">Your data remains yours.</span>{' '}
              Your intelligence compounds over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
