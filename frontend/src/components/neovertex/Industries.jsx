import { NV } from '@/constants/testIds';

const PRIMARY = [
  'Fortune 500 Enterprises',
  'Financial Services',
  'Healthcare',
  'Pharmaceuticals',
  'Manufacturing',
  'Energy',
  'Telecommunications',
  'Media',
  'Retail',
];
const SECONDARY = [
  'Government',
  'Defense',
  'Technology',
  'Global Capability Centers',
  'High-growth MSMEs',
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function Industries() {
  return (
    <section
      id="industries"
      data-testid={NV.industriesSection}
      className="relative border-b border-[var(--nv-border-subtle)] py-28 lg:py-40 bg-[var(--nv-surface-1)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-6 items-end mb-20 nv-reveal">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[var(--nv-border-strong)]" />
              <span className="nv-eyebrow">§06 — Industries</span>
            </div>
            <h2 className="nv-display text-white text-[28px] min-[375px]:text-[34px] min-[425px]:text-[40px] sm:text-[52px] leading-[1.05]">
              Built for the organizations
              <br />
              <span className="text-[var(--nv-text-secondary)]">
                that operate the real economy.
              </span>
            </h2>
          </div>
          <p className="col-span-12 lg:col-span-4 lg:col-start-9 text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
            From Fortune 500s modernising operations to high-growth MSMEs
            preparing for the next decade — the architecture stays the same.
          </p>
        </div>

        {/* Primary industries — large rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-[var(--nv-border-subtle)]">
          {PRIMARY.map((p, i) => {
            const slug = slugify(p);
            return (
              <div
                key={p}
                data-testid={NV.industryItem(slug)}
                className="relative p-8 border-r border-b border-[var(--nv-border-subtle)] group hover:bg-[var(--nv-surface-2)] transition-colors duration-500 nv-reveal min-h-[140px] flex items-end"
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                <span className="absolute top-5 left-5 nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)]">
                  IND·{String(i + 1).padStart(2, '0')}
                </span>
                <span className="absolute top-5 right-5 h-px w-8 bg-[var(--nv-border-strong)] group-hover:w-14 transition-all duration-500" />
                <h3 className="nv-display text-white text-xl sm:text-2xl leading-tight">
                  {p}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Secondary — tag row */}
        <div className="mt-10 flex flex-wrap gap-2 nv-reveal">
          {SECONDARY.map((s) => {
            const slug = slugify(s);
            return (
              <span
                key={s}
                data-testid={NV.industryItem(slug)}
                className="nv-mono text-[11px] tracking-[0.18em] uppercase text-[var(--nv-text-secondary)] border border-[var(--nv-border-subtle)] px-3.5 py-2 hover:border-[var(--nv-border-strong)] hover:text-white transition-colors"
              >
                {s}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
