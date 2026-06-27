import { NV } from '@/constants/testIds';

const MARKS = [
  'Financial Services',
  'Public Sector',
  'Industrial Systems',
  'Energy & Grid',
  'Pharma & Life Sciences',
  'Telecom',
  'Defense Adjacent',
  'Logistics',
  'Sovereign Cloud',
];

export default function TrustStrip() {
  // duplicated for seamless marquee
  const list = [...MARKS, ...MARKS];

  return (
    <section
      data-testid={NV.trustStrip}
      className="relative border-b border-[var(--nv-border-subtle)] py-10 bg-[var(--nv-bg)]"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-6 flex items-center justify-between">
        <span className="nv-eyebrow">Trusted across regulated industries</span>
        <span className="nv-mono text-[10px] tracking-[0.22em] text-[var(--nv-text-muted)] hidden sm:inline">
          §02 — POSTURE
        </span>
      </div>
      <div className="overflow-hidden mask-image-fade">
        <div className="nv-marquee flex gap-14 whitespace-nowrap will-change-transform">
          {list.map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="nv-mono text-[12px] tracking-[0.18em] uppercase text-[var(--nv-text-muted)] hover:text-[var(--nv-text-secondary)] transition-colors"
            >
              {m}
              <span className="ml-14 text-[var(--nv-border-strong)]">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
