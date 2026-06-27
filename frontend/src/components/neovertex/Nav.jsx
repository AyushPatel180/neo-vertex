import { useEffect, useState } from 'react';
import { NV } from '@/constants/testIds';
import { Menu, X } from 'lucide-react';

const LOGO_URL =
  'https://customer-assets.emergentagent.com/job_69ebd958-79a8-454e-87b8-a9e6c65955ff/artifacts/bi1mw8pr_logo.png';

export default function Nav({ onOpenBriefing }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: NV.navLinkPlatform, label: 'Platform', href: '#platform' },
    { id: NV.navLinkCapabilities, label: 'Capabilities', href: '#capabilities' },
    { id: NV.navLinkVision, label: 'Vision', href: '#vision' },
  ];

  return (
    <header
      data-testid={NV.navContainer}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#05050A]/85 backdrop-blur-xl border-b border-[var(--nv-border-subtle)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="h-16 flex items-center justify-between">
          <a
            href="#top"
            data-testid={NV.navLogo}
            className="flex items-center gap-3 group"
          >
            <img
              src={LOGO_URL}
              alt="Neo Vertex Ventures"
              className="h-8 w-8 rounded-full"
              draggable="false"
            />
            <div className="flex items-baseline gap-2">
              <span className="nv-display text-[15px] tracking-tight text-[var(--nv-text-primary)]">
                Neo Vertex
              </span>
              <span className="nv-mono text-[10px] uppercase tracking-[0.22em] text-[var(--nv-text-muted)] hidden sm:inline">
                Ventures
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={l.id}
                className="text-[13px] text-[var(--nv-text-secondary)] hover:text-white transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              data-testid={NV.navCtaBriefing}
              onClick={onOpenBriefing}
              className="nv-btn-ghost"
            >
              Request a Briefing
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <button
            type="button"
            data-testid={NV.navMobileToggle}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-[var(--nv-text-primary)] p-2"
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--nv-border-subtle)] bg-[#05050A]/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`${l.id}-mobile`}
                onClick={() => setOpen(false)}
                className="text-sm text-[var(--nv-text-secondary)] hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              data-testid={`${NV.navCtaBriefing}-mobile`}
              onClick={() => {
                setOpen(false);
                onOpenBriefing();
              }}
              className="nv-btn-ghost justify-center"
            >
              Request a Briefing
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
