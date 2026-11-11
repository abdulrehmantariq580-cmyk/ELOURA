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
   ELOURA LIGHTNING-FAST CART DRAWER CONTROLLER
   - Instant In-Place Updates: Zero page reloads for Add, Increment, Decrement, and Delete
   - Robust Event Delegation: Close button & backdrop always work reliably
   - Optimistic UI Feedback: Instant visual response on all interactions
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

  // 1. Delegated Click Listener for Opening & Closing (Reliable on mobile & desktop)
  document.addEventListener('click', function(e) {
    const openTrigger = e.target.closest('.js-cart-drawer-trigger');
    if (openTrigger) {
      e.preventDefault();
      e.stopPropagation();
      openCartDrawer();
      return;
    }

    const closeTrigger = e.target.closest('.js-cart-drawer-close');
    if (closeTrigger) {
      e.preventDefault();
      e.stopPropagation();
      closeCartDrawer();
      return;
    }
  });

  // ESC key to close cart drawer
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeCartDrawer();
    }
  });

  // 2. Refresh Cart Drawer Content without Page Reload (Shopify Section Rendering API)
  function refreshCartDrawer(openAfterRefresh) {
    return fetch('/?sections=cart-drawer-section')
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (data && data['cart-drawer-section']) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data['cart-drawer-section'], 'text/html');
          const newDrawer = doc.getElementById('CartDrawer');
          if (newDrawer) {
            const currentPanel = drawer.querySelector('.cart-drawer__panel');
            const newPanel = newDrawer.querySelector('.cart-drawer__panel');
            if (currentPanel && newPanel) {
              currentPanel.innerHTML = newPanel.innerHTML;
            }

            // Update all cart count bubbles across the website instantly
            const newCountEl = newDrawer.querySelector('#CartDrawerCount');
            if (newCountEl) {
              const countText = newCountEl.textContent.replace(/[()]/g, '').trim();
              document.querySelectorAll('.cart-bubble, .header-cart-count').forEach(function(el) {
                el.textContent = countText;
              });
            }

            if (openAfterRefresh) {
              openCartDrawer();
            }
          }
        }
      })
      .catch(function(err) {
        console.error('Failed to refresh cart drawer:', err);
      });
  }

  // 3. Lightning Fast Quantity Change & Item Removal (Optimistic UI)
  drawer.addEventListener('click', function(e) {
    const qtyBtn = e.target.closest('.js-qty-btn');
    const removeBtn = e.target.closest('.js-cart-remove');

    if (qtyBtn) {
      e.preventDefault();
      const line = qtyBtn.getAttribute('data-line');
      const action = qtyBtn.getAttribute('data-action');
      const qtyValEl = qtyBtn.parentElement.querySelector('.cart-drawer__qty-val');
      let currentQty = parseInt(qtyValEl ? qtyValEl.textContent : '1', 10);
      let newQty = action === 'plus' ? currentQty + 1 : currentQty - 1;

      // Instant optimistic UI update
      if (qtyValEl && newQty > 0) {
        qtyValEl.textContent = newQty;
      }
      updateCartLine(line, newQty);
    }

    if (removeBtn) {
      e.preventDefault();
      const line = removeBtn.getAttribute('data-line');
      const itemRow = removeBtn.closest('.cart-drawer__item');
      if (itemRow) {
        itemRow.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        itemRow.style.opacity = '0.3';
        itemRow.style.transform = 'scale(0.97)';
      }
      updateCartLine(line, 0);
    }
  });

  function updateCartLine(line, quantity) {
    drawer.querySelectorAll('.js-qty-btn, .js-cart-remove').forEach(function(btn) {
      btn.style.pointerEvents = 'none';
    });

    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ line: parseInt(line, 10), quantity: quantity })
    })
    .then(function(res) { return res.json(); })
    .then(function() {
      return refreshCartDrawer(false);
    })
    .catch(function(err) {
      console.error('Error updating cart line:', err);
      refreshCartDrawer(false);
    });
  }

  // 4. Lightning Quick-Add Button on Product Cards (NO PAGE RELOAD)
  document.addEventListener('click', function(e) {
    const quickAddBtn = e.target.closest('.js-quick-add-btn');
    if (!quickAddBtn) return;

    e.preventDefault();
    const variantId = quickAddBtn.getAttribute('data-variant-id');
    if (!variantId) return;

    quickAddBtn.disabled = true;
    quickAddBtn.classList.add('is-loading');

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: parseInt(variantId, 10),
        quantity: 1
      })
    })
    .then(function(res) {
      if (!res.ok) throw new Error('Add to cart failed');
      return res.json();
    })
    .then(function() {
      // In-place refresh cart drawer and slide open immediately (Zero reload delay!)
      return refreshCartDrawer(true);
    })
    .catch(function(err) {
      console.error('Quick add failed:', err);
    })
    .finally(function() {
      quickAddBtn.disabled = false;
      quickAddBtn.classList.remove('is-loading');
    });
  });

  // 5. Lightning Add-To-Cart on Product Detail Page (PDP) (NO PAGE RELOAD)
  const pdpForm = document.getElementById('ProductForm');
  if (pdpForm) {
    pdpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const atcBtn = document.getElementById('AddToCartBtn');
      const originalText = atcBtn ? atcBtn.innerHTML : 'ADD TO BAG';
      if (atcBtn) {
        atcBtn.disabled = true;
        atcBtn.textContent = 'ADDING...';
      }

      const formData = new FormData(pdpForm);
      fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      })
      .then(function(res) {
        if (!res.ok) throw new Error('PDP add failed');
        return res.json();
      })
      .then(function() {
        // Instantly refresh cart drawer in-place and slide open smoothly
        return refreshCartDrawer(true);
      })
      .catch(function(err) {
        console.error('PDP add to cart error:', err);
        pdpForm.submit();
      })
      .finally(function() {
        if (atcBtn) {
          atcBtn.disabled = false;
          atcBtn.innerHTML = originalText;
        }
      });
    });
  }

  // Auto-open if query parameter exists
  if (window.location.search.includes('cart_open=1')) {
    openCartDrawer();
  }
});
