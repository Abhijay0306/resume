/**
 * marquee.js — GSAP-powered infinite marquee
 * Duplicates the track and drives it with gsap ticker for
 * perfect 60fps, no CSS animation jank.
 */

export function initMarquee() {
  const track = document.querySelector('.marquee-track');
  if (!track || !window.gsap) return;

  // Clone the track content for seamless loop
  const clone = track.cloneNode(true);
  track.parentElement.appendChild(clone);

  const speed = 0.6; // px per frame
  let xPos = 0;
  const trackWidth = track.scrollWidth;

  gsap.ticker.add(() => {
    xPos -= speed;
    // Reset when we've scrolled one full width
    if (Math.abs(xPos) >= trackWidth) {
      xPos = 0;
    }
    gsap.set([track, clone], { x: xPos });
    // Position clone immediately after original
    gsap.set(clone, { x: xPos + trackWidth });
  });
}
