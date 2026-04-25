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

  // Title — char stagger per line
  const titleLines = document.querySelectorAll('.hero__title-line');
  titleLines.forEach((line, i) => {
    const chars = splitChars(line);
    tl.from(
      chars,
      {
        y: '110%',
        opacity: 0,
        duration: 0.75,
        stagger: 0.028,
        ease: 'power3.out',
      },
      i === 0 ? '-=0.3' : '-=0.55'
    );
  });

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

  // Set initial states in JS (not CSS) so they're never permanently invisible
  gsap.set('[data-gsap="reveal"]',       { opacity: 0, y: 40 });
  gsap.set('[data-gsap="reveal-left"]',  { opacity: 0, x: -40 });
  gsap.set('[data-gsap="reveal-scale"]', { opacity: 0, scale: 0.92 });

  // Stagger children initial state
  document.querySelectorAll('[data-gsap="stagger"]').forEach((parent) => {
    gsap.set(parent.children, { opacity: 0, y: 24 });
  });

  // Tags initial state
  document.querySelectorAll('[data-gsap="tags"] .tag').forEach((tag) => {
    gsap.set(tag, { opacity: 0, scale: 0.85, y: 8 });
  });

  const triggerDefaults = {
    start: 'top 90%',
    once: true,
    invalidateOnRefresh: true,
  };

  // Generic fade-up
  gsap.utils.toArray('[data-gsap="reveal"]').forEach((el) => {
    gsap.to(el, {
      y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, ...triggerDefaults },
    });
  });

  // Slide from left
  gsap.utils.toArray('[data-gsap="reveal-left"]').forEach((el) => {
    gsap.to(el, {
      x: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: el, ...triggerDefaults },
    });
  });

  // Scale reveals
  gsap.utils.toArray('[data-gsap="reveal-scale"]').forEach((el) => {
    gsap.to(el, {
      scale: 1, opacity: 1, duration: 0.75, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: el, ...triggerDefaults },
    });
  });

  // Stagger children
  gsap.utils.toArray('[data-gsap="stagger"]').forEach((parent) => {
    gsap.to(parent.children, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: parent, ...triggerDefaults },
    });
  });

  // Tag stagger (scale in)
  gsap.utils.toArray('[data-gsap="tags"]').forEach((parent) => {
    gsap.to(parent.querySelectorAll('.tag'), {
      scale: 1, y: 0, opacity: 1, duration: 0.55, stagger: 0.045, ease: 'back.out(1.6)',
      scrollTrigger: { trigger: parent, ...triggerDefaults },
    });
  });

  // Section headings — clip-path reveal
  gsap.utils.toArray('.section-heading').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)', opacity: 0, duration: 0.9, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, ...triggerDefaults },
    });
  });

  // Sidebar labels
  gsap.utils.toArray('.sidebar__section-label').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0 100% 0 0)', opacity: 0, duration: 0.7, ease: 'power3.inOut',
      scrollTrigger: { trigger: el, ...triggerDefaults },
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
