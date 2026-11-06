/**
 * ELOURA - Blank Starter Theme JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('is-active');
    });
  }

  // Variant selector change handler
  const variantSelectors = document.querySelectorAll('.product-variant-selector');
  variantSelectors.forEach(select => {
    select.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const price = selectedOption.dataset.price;
      const priceElement = document.querySelector('.product-single__price');
      if (priceElement && price) {
        priceElement.textContent = price;
      }
    });
  });
});
