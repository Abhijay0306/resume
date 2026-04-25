/**
 * cursor.js — GSAP-powered custom cursor
 * Uses gsap.quickTo() for buttery-smooth following
 */

export function initCursor() {
  // Skip on touch devices
  if (window.matchMedia('(max-width: 768px)').matches) return;
  if (!window.gsap) return;

  const dot  = document.querySelector('.cursor__dot');
  const ring = document.querySelector('.cursor__ring');

  if (!dot || !ring) return;

  // quickTo gives us optimised, decoupled x/y setters
  const dotX  = gsap.quickTo(dot,  'x', { duration: 0.1, ease: 'power3' });
  const dotY  = gsap.quickTo(dot,  'y', { duration: 0.1, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3' });

  // Show cursor on first move (hidden by default to avoid flash)
  let shown = false;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    dotX(x);
    dotY(y);
    ringX(x);
    ringY(y);

    if (!shown) {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      shown = true;
    }
  });

  // Scale up ring on hover-able elements
  document.querySelectorAll('a, button, .tag, .project-card, .exp-card, .fab-download').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(ring, { scale: 2, opacity: 0.6, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0.4, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(ring, { scale: 1, opacity: 0.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
  });
  document.addEventListener('mouseenter', () => {
    gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
  });
}
