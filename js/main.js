/**
 * main.js — Entry point
 * Imports and initialises all modules in the correct order.
 */

import { initTheme }      from './theme.js';
import { initCursor }     from './cursor.js';
import { initMarquee }    from './marquee.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCursor();
  initMarquee();
  initAnimations();
});
