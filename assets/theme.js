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

  let ticking = false;
  const updateHeaderState = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate Hero threshold
    let heroThreshold = window.innerHeight - 60;
    if (heroSection) {
      heroThreshold = heroSection.offsetTop + heroSection.offsetHeight - 60;
    }

    if (scrollY >= heroThreshold) {
      if (!header.classList.contains('header--below-hero')) {
        header.classList.add('header--below-hero');
        header.classList.remove('header--on-hero');
      }
    } else {
      if (!header.classList.contains('header--on-hero')) {
        header.classList.remove('header--below-hero');
        header.classList.add('header--on-hero');
      }
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeaderState);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateHeaderState();
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

/**
 * 4. Desktop Drag-to-Scroll & Touch Enhancement for Sliding Product Tracks
 */
document.addEventListener('DOMContentLoaded', () => {
  const sliders = document.querySelectorAll('.js-product-slider');
  sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    });
  });
});

/* ==========================================================================
   ELOURA CART DRAWER JAVASCRIPT CONTROLLER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', function() {
  const drawer = document.getElementById('CartDrawer');
  if (!drawer) return;

  function openCartDrawer() {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Header bag triggers
  document.querySelectorAll('.js-cart-drawer-trigger').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      openCartDrawer();
    });
  });

  // Close triggers
  document.querySelectorAll('.js-cart-drawer-close').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      closeCartDrawer();
    });
  });

  // Quantity updates inside drawer via AJAX
  drawer.addEventListener('click', function(e) {
    const qtyBtn = e.target.closest('.js-qty-btn');
    const removeBtn = e.target.closest('.js-cart-remove');

    if (qtyBtn) {
      const line = qtyBtn.getAttribute('data-line');
      const action = qtyBtn.getAttribute('data-action');
      const qtyValEl = qtyBtn.parentElement.querySelector('.cart-drawer__qty-val');
      let currentQty = parseInt(qtyValEl ? qtyValEl.textContent : '1', 10);
      let newQty = action === 'plus' ? currentQty + 1 : currentQty - 1;
      updateCartLine(line, newQty);
    }

    if (removeBtn) {
      const line = removeBtn.getAttribute('data-line');
      updateCartLine(line, 0);
    }
  });

  function updateCartLine(line, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ line: parseInt(line, 10), quantity: quantity })
    })
    .then(res => res.json())
    .then(cart => {
      // Reload drawer markup or reload page for clean Shopify currency sync
      window.location.reload();
    })
    .catch(err => {
      console.error('Error updating cart line:', err);
    });
  }

  // Intercept Ajax "Add to Cart" on PDP and open Drawer smoothly
  const pdpForm = document.getElementById('ProductForm');
  if (pdpForm) {
    pdpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const atcBtn = document.getElementById('AddToCartBtn');
      if (atcBtn) {
        atcBtn.disabled = true;
        atcBtn.textContent = 'ADDING...';
      }

      const formData = new FormData(pdpForm);
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(() => {
        // Open drawer on successful add
        window.location.href = window.location.pathname + '?cart_open=1';
      })
      .catch(err => {
        console.error('Add to cart error:', err);
        pdpForm.submit(); // fallback to standard submit
      });
    });
  }

  // Auto-open if redirected with ?cart_open=1
  if (window.location.search.includes('cart_open=1')) {
    openCartDrawer();
  }
});
