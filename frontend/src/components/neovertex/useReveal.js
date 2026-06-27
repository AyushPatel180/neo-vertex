import { useEffect } from 'react';

/**
 * useReveal — attaches IntersectionObserver to all elements with .nv-reveal
 * inside the document, adding `is-visible` when they enter the viewport.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.nv-reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
