import { useEffect, useState } from 'react';

const LOGO_URL =
  'https://customer-assets.emergentagent.com/job_69ebd958-79a8-454e-87b8-a9e6c65955ff/artifacts/bi1mw8pr_logo.png';

export default function IntroLoader({ onComplete, onZoomStart }) {
  const [stage, setStage] = useState('logo'); // 'logo' | 'zoom' | 'done'

  useEffect(() => {
    // Step 2: Begin zoom-out/fade sequence
    const zoomTimer = setTimeout(() => {
      setStage('zoom');
      if (onZoomStart) onZoomStart();
    }, 2000);

    // Step 3: Complete and unmount
    const doneTimer = setTimeout(() => {
      setStage('done');
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(zoomTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05050A] transition-all duration-[1000ms] cubic-bezier(0.16, 1, 0.3, 1) ${
        stage === 'zoom'
          ? 'opacity-0 scale-[1.08] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Background cybernetic grid lines */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0C0D13]/40 to-transparent pointer-events-none" />
      <div className="nv-grid-lines absolute inset-0 opacity-[0.22] pointer-events-none" />

      {/* Intro Container */}
      <div className="relative flex flex-col items-center select-none">
        {/* Animated Scanning Ring */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Outer rotating/pulsing ring */}
          <div className="absolute inset-0 border border-[var(--nv-border-strong)] rounded-full opacity-40 animate-[spin_8s_linear_infinite]" />
          <div className="absolute -inset-1 border border-dashed border-[var(--nv-accent-azure)]/30 rounded-full animate-[spin_12s_linear_infinite]" />

          {/* Logo with digital scanning line */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-[#0C0D13] border border-[var(--nv-border-strong)] flex items-center justify-center p-3 shadow-[0_0_50px_rgba(14,165,233,0.15)] animate-[nv-logo-enter_1s_cubic-bezier(0.25,1,0.5,1)_forwards]">
            <img
              src={LOGO_URL}
              alt="Neo Vertex Logo"
              className="w-full h-full object-contain rounded-full"
              draggable="false"
            />
            {/* Horizontal digital scan laser line */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--nv-accent-azure)] to-transparent shadow-[0_0_10px_var(--nv-accent-azure)] animate-[nv-scan-laser_2s_ease-in-out_infinite]" />
          </div>
        </div>

        {/* Text Animation */}
        <div className="mt-8 text-center">
          <h1 className="nv-display text-white text-[20px] sm:text-[24px] uppercase font-bold tracking-[0.45em] ml-[0.45em] opacity-0 animate-[nv-text-fade-in_1s_1.1s_cubic-bezier(0.25,1,0.5,1)_forwards]">
            Neo Vertex
          </h1>
          <p className="mt-2.5 nv-mono text-[9px] sm:text-[10px] uppercase text-[var(--nv-text-muted)] tracking-[0.3em] ml-[0.3em] opacity-0 animate-[nv-text-fade-in_1.2s_1.3s_cubic-bezier(0.25,1,0.5,1)_forwards]">
            Intelligence Infrastructure
          </p>
        </div>
      </div>

      {/* Cybernetic code indicators in the corners */}
      <div className="absolute bottom-6 left-6 nv-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[var(--nv-text-muted)] opacity-40">
        SYS.READY // INIT.OK
      </div>
      <div className="absolute bottom-6 right-6 nv-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[var(--nv-text-muted)] opacity-40">
        ESTD.2024 // SECURE.CONN
      </div>
    </div>
  );
}
