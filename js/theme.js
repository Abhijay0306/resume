/**
 * theme.js — Dark / Light mode toggle
 * Reads from localStorage, falls back to system preference
 */

export function initTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('icon-sun');
  const moonIcon = document.getElementById('icon-moon');

  function applyTheme(isDark) {
    if (isDark) {
      html.classList.add('dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      html.classList.remove('dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  }

  // Initial state
  const prefersDark =
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  applyTheme(prefersDark);

  // System preference listener
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (!('theme' in localStorage)) applyTheme(e.matches);
    });

  // Manual toggle
  btn?.addEventListener('click', () => {
    const isDark = html.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    applyTheme(isDark);
  });
}
