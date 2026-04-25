/**
 * animations.js — All GSAP page animations
 *
 * Covers:
 *  - Hero intro sequence (nav, eyebrow, title chars, tagline, CTA)
 *  - ScrollTrigger reveals (experience, sidebar, projects, footer)
 *  - Lucide icon init
 */

/* ── Utility: split text into char spans ──────────────────────────── */
function splitChars(el) {
  const text = el.innerText;
  el.innerHTML = text
    .split('')
    .map((ch) =>
      ch === ' '
        ? '<span class="char" style="display:inline-block;width:0.3em">&nbsp;</span>'
        : `<span class="char" style="display:inline-block">${ch}</span>`
    )
    .join('');
  return el.querySelectorAll('.char');
}

/* ── Hero intro ───────────────────────────────────────────────────── */
function heroIntro() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap) return;

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

  // Nav slides down
  tl.to('[data-gsap="nav"]', {
    y: 0,
    opacity: 1,
    duration: 0.8,
  });

  // Eyebrow
  tl.to(
    '[data-gsap="hero-eyebrow"]',
    { y: 0, opacity: 1, duration: 0.7 },
    '-=0.4'
  );

  // Title — char stagger
  const titleEl = document.querySelector('.hero__title');
  if (titleEl) {
    const chars = splitChars(titleEl);
    tl.from(
      chars,
      {
        y: '110%',
        opacity: 0,
        duration: 0.75,
        stagger: 0.022,
        ease: 'power3.out',
      },
      '-=0.3'
    );
  }

  // Tagline
  tl.to(
    '[data-gsap="hero-tagline"]',
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    '-=0.4'
  );

  // CTA
  tl.to(
    '[data-gsap="hero-cta"]',
    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
    '-=0.45'
  );

  // FAB
  tl.from(
    '.fab-download',
    { y: 24, opacity: 0, duration: 0.6, ease: 'back.out(1.5)' },
    '-=0.3'
  );
}

/* ── ScrollTrigger reveals ────────────────────────────────────────── */
function scrollReveals() {
  const { gsap, ScrollTrigger } = window;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Generic fade-up
  gsap.utils.toArray('[data-gsap="reveal"]').forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Slide from left
  gsap.utils.toArray('[data-gsap="reveal-left"]').forEach((el) => {
    gsap.to(el, {
      x: 0,
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Scale reveals
  gsap.utils.toArray('[data-gsap="reveal-scale"]').forEach((el) => {
    gsap.to(el, {
      scale: 1,
      opacity: 1,
      duration: 0.75,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // Stagger children
  gsap.utils.toArray('[data-gsap="stagger"]').forEach((parent) => {
    gsap.to(parent.children, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent,
        start: 'top 88%',
        once: true,
      },
    });
  });

  // Tag stagger (scale in)
  gsap.utils.toArray('[data-gsap="tags"]').forEach((parent) => {
    gsap.to(parent.querySelectorAll('.tag'), {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.045,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: parent,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // Section headings — clip-path reveal
  gsap.utils.toArray('.section-heading').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 0.9,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        once: true,
      },
    });
  });

  // Sidebar section labels
  gsap.utils.toArray('.sidebar__section-label').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 0.7,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once: true,
      },
    });
  });
}

/* ── Init lucide icons ────────────────────────────────────────────── */
function initIcons() {
  if (window.lucide) window.lucide.createIcons();
}

/* ── Public init ──────────────────────────────────────────────────── */
export function initAnimations() {
  initIcons();
  heroIntro();
  scrollReveals();
}
