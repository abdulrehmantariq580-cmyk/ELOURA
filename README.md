# ELOURA - Blank Starter Shopify Theme

A clean, modern, barebones Shopify Online Store 2.0 theme built from scratch.

## Theme Architecture
- **Online Store 2.0 (OS 2.0)** JSON templates and section groups.
- **Lightweight & Modular**: Clean CSS variables (`assets/theme.css`) and vanilla JS (`assets/theme.js`).
- **Core Sections Ready to Design**:
  - `header`: Logo, navigation menu, search, cart count, mobile menu toggle.
  - `hero`: Clean hero banner with custom background and CTA.
  - `main-product`: Product images, variant selector, quantity, add to cart form.
  - `main-collection`: Collection banner, responsive product grid, pagination.
  - `main-cart`: Line items, quantity updates, subtotal, checkout button.
  - `main-page`, `main-blog`, `main-article`, `main-404`, `main-search`, `main-list-collections`.
  - `footer`: Brand info, navigation links, copyright.

## Directory Structure
```
ELOURA/
├── assets/          # CSS and JavaScript
├── blocks/          # Theme blocks
├── config/          # Theme settings schema and defaults
├── layout/          # theme.liquid and password.liquid
├── locales/         # Language translations (en.default.json)
├── sections/        # Section groups and liquid sections
├── snippets/        # Reusable snippets (product-card, pagination, icons)
└── templates/       # OS 2.0 JSON templates
```
