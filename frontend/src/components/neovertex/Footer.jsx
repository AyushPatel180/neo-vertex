import { NV } from '@/constants/testIds';

const LOGO_URL =
  'https://customer-assets.emergentagent.com/job_69ebd958-79a8-454e-87b8-a9e6c65955ff/artifacts/bi1mw8pr_logo.png';

const COLS = [
  {
    heading: 'Stack',
    links: [
      { slug: 'foundation-models', label: 'Foundation Models', href: '#foundation-models' },
      { slug: 'intelligence-platform', label: 'Intelligence Platform', href: '#intelligence-platform' },
      { slug: 'ai-os', label: 'AI Operating System', href: '#ai-os' },
      { slug: 'autonomous-agents', label: 'Autonomous Agents', href: '#autonomous-agents' },
      { slug: 'research-platform', label: 'Research Platform', href: '#research-platform' },
      { slug: 'voice-intelligence', label: 'Voice Intelligence', href: '#voice-intelligence' },
      { slug: 'multilingual-ai', label: 'Multilingual AI', href: '#multilingual-ai' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { slug: 'why', label: 'Why Neo Vertex', href: '#why' },
      { slug: 'research', label: 'Research', href: '#research' },
      { slug: 'industries', label: 'Industries', href: '#industries' },
      { slug: 'vision', label: 'Vision', href: '#vision' },
      { slug: 'careers', label: 'Careers', href: '#build' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { slug: 'security', label: 'Security', href: '#platform' },
      { slug: 'compliance', label: 'Compliance', href: '#platform' },
      { slug: 'residency', label: 'Data Residency', href: '#platform' },
      { slug: 'responsible-ai', label: 'Responsible AI', href: '#vision' },
    ],
  },
];

export default function Footer({ onOpenBriefing }) {
  return (
    <footer data-testid={NV.footer} className="relative bg-[var(--nv-bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-12 gap-10">
          {/* Brand */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Neo Vertex" className="h-9 w-9 rounded-full" />
              <div className="flex items-baseline gap-2">
                <span className="nv-display text-white text-[16px]">Neo Vertex</span>
                <span className="nv-mono text-[10px] uppercase tracking-[0.22em] text-[var(--nv-text-muted)]">
                  Ventures LLP
                </span>
              </div>
            </div>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[var(--nv-text-secondary)]">
              We build the intelligence infrastructure for the AI Enterprise.
              From private foundation models to autonomous agents and
              long-horizon research — engineered for organisations that intend
              to own, not rent, their AI future.
            </p>
            <button
              type="button"
              data-testid={NV.footerCtaBriefing}
              onClick={onOpenBriefing}
              className="mt-8 nv-btn-ghost"
            >
              Request a Briefing
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Columns */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {COLS.map((c) => (
              <div key={c.heading}>
                <span className="nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
                  {c.heading}
                </span>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.slug}>
                      <a
                        href={l.href}
                        data-testid={NV.footerLink(l.slug)}
                        className="text-[13px] text-[var(--nv-text-secondary)] hover:text-white transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* hairline */}
        <div className="mt-16 pt-8 border-t border-[var(--nv-border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
            <span>© {new Date().getFullYear()} Neo Vertex Ventures LLP</span>
            <span className="text-[var(--nv-border-strong)] hidden min-[375px]:inline">/</span>
            <span>All Rights Reserved</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 nv-mono text-[10px] tracking-[0.22em] uppercase text-[var(--nv-text-muted)]">
            <a
              href="#vision"
              data-testid={NV.footerLink('privacy')}
              className="hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#vision"
              data-testid={NV.footerLink('terms')}
              className="hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#vision"
              data-testid={NV.footerLink('responsible-disclosure')}
              className="hover:text-white transition-colors"
            >
              Responsible Disclosure
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
