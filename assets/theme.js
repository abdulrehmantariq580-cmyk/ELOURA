/**
 * ELOURA - High-End Luxury Streetwear Theme JavaScript (Represent Style)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initNavDrawer();
  initSearchDrawer();
});

/**
 * 1. Represent Clo Header Scroll Behavior:
 * - Inside Hero Section: 100% transparent, white icons & logo (NO black bar!).
 * - Below Hero Section: Blank / clean light background with black icons & logo.
 * - Scrolling back up into Hero: Instantly returns to transparent with white icons.
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const heroSection = document.querySelector('.hero-banner');

  const updateHeaderState = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate Hero threshold
    let heroThreshold = window.innerHeight - 60;
    if (heroSection) {
      heroThreshold = heroSection.offsetTop + heroSection.offsetHeight - 60;
    }

    if (scrollY >= heroThreshold) {
      // User has scrolled PAST the hero section into normal content
      header.classList.add('header--below-hero');
      header.classList.remove('header--on-hero');
    } else {
      // User is INSIDE the hero section -> Always transparent, NO black background!
      header.classList.remove('header--below-hero');
      header.classList.add('header--on-hero');
    }
  };

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  window.addEventListener('resize', updateHeaderState, { passive: true });
  updateHeaderState(); // Check immediately on load
}

/**
 * 2. Represent-Style Slide-over Navigation Drawer
 */
function initNavDrawer() {
  const drawer = document.getElementById('NavDrawer');
  const openButtons = document.querySelectorAll('.js-drawer-open');
  const closeButtons = document.querySelectorAll('.js-drawer-close');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');

    openButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));

    // Focus first link or input inside drawer
    const focusable = drawer.querySelector('.drawer-search-input, .drawer-nav__link');
    if (focusable) focusable.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');

    openButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  };

  openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  closeButtons.forEach(btn => btn.addEventListener('click', closeDrawer));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/**
 * 3. Slide-Down Quick Search Modal
 */
function initSearchDrawer() {
  const searchDrawer = document.getElementById('SearchDrawer');
  const openButtons = document.querySelectorAll('.js-search-open');
  const closeButtons = document.querySelectorAll('.js-search-close');
  const searchInput = document.getElementById('SearchInput');

  if (!searchDrawer) return;

  const openSearch = () => {
    searchDrawer.classList.add('is-open');
    searchDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');

    openButtons.forEach(btn => btn.setAttribute('aria-expanded', 'true'));

    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  };

  const closeSearch = () => {
    searchDrawer.classList.remove('is-open');
    searchDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');

    openButtons.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  };

  openButtons.forEach(btn => btn.addEventListener('click', openSearch));
  closeButtons.forEach(btn => btn.addEventListener('click', closeSearch));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchDrawer.classList.contains('is-open')) {
      closeSearch();
    }
  });
}
