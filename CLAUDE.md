# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WA/VE Website - A creative studio/artist collective website built as a static Next.js site. Currently uses hardcoded data; WordPress headless CMS integration is planned but not yet implemented.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Technology Stack

- **Framework:** Next.js 15 (App Router) + TypeScript + React 19
- **Styling:** Tailwind CSS 3 with custom utilities in `globals.css`
- **Layout:** Masonry gallery via `masonry-layout` + `imagesloaded` packages
- **CMS:** WordPress headless (planned, not yet implemented)

## Architecture

### Layout & Context Providers

The root layout (`src/app/layout.tsx`) wraps all pages with:
- `MenuProvider` — tracks side menu open/close state
- `SoundProvider` — manages site-wide audio state
- `Header` — navigation + side menu (233px wide on desktop when open)
- `PageWrapper` — applies page-level transitions/transforms when menu opens
- `Footer`

The side menu is a key architectural element: when open on desktop, the main content area shrinks by 233px. CSS in `globals.css` handles this via `body.menu-open` selectors and width transitions.

### Fonts

Three Google Fonts loaded via `next/font`:
- `--font-dm-sans` — primary Latin text
- `--font-dm-mono` — hashtags, code, monospace
- `--font-noto-sans-jp` — Japanese text

Use Tailwind classes: `font-sans`, `font-mono`, `font-jp`, `font-en`.

### Custom 6-Column Grid

The site uses `.grid-6` with `.col-1` through `.col-6` utilities (defined in `@layer utilities` in `globals.css`). Responsive variants work via Tailwind (e.g., `md:col-3 col-6` = full width mobile, half desktop). The `md` breakpoint is `800px` (not the default 768px).

## Layout & Styling Rules

### SVG Borders

Horizontal SVG separators are **inlined as React components** (`BorderLine`, `Line` in `src/components/`), NOT loaded via `<img>` or Next.js `<Image>`.

Rationale:
- Next.js `<Image>` cannot serve SVG unless `dangerouslyAllowSVG: true` is set in `next.config` (it isn't, and we don't want to loosen it site-wide).
- A native `<img src="*.svg">` triggers the `no-img-element` ESLint warning and adds an HTTP fetch.
- The source SVGs use `preserveAspectRatio="none"` so they stretch to fill the box; inlining keeps full control and zero fetch.

The SVGs are tiny (a few `<path>`s), so inline DOM cost is negligible. Each component renders `block w-full h-[10px]`, stretching to the parent width. Add new separators as inline-SVG components following this pattern (do not reintroduce `<img>`/`<Image>` for SVG borders).

### Global Horizontal Padding

Always responsive: `px-[15px] md:px-[45px]`. Never use `px-[45px]` without the `md:` breakpoint.

## Design Colors

Tailwind config values (use `wave-*` prefix):
- Blue: `#536CDB` (`wave-blue`)
- Purple: `#8B7BE8` (`wave-purple`)
- Lime: `#C2DE6D` (`wave-lime`)
- Lavender: `#B8C4FF` (`wave-lavender`)

Note: CSS custom properties in `globals.css` use slightly different values for `--wave-lime` (`#C8FF00`). The Tailwind config is authoritative for component styling.

## Reference Materials

- `DESIGN.md` — Project specifications (Japanese)
- `SVG_REQUIREMENTS.md` — Required SVG/image assets
- `WAVE_WEBSITE_10.pdf` — Desktop design reference
- `WAVE_WEBSITE_10_MOBILE.pdf` — Mobile design reference

## Content Schema

### WORKS (制作実績)
Portfolio items with: thumbnail, client/company, title, hashtags, production date, caption, WAVE's role, participating artists, URL, client's role, gallery images, YouTube embeds, credits.

### Releases
HAL ca artist releases with: release date, track list, streaming links, images, title, album/single type, caption.

## Remaining Tasks

1. WordPress headless CMS setup and REST API integration
2. Image and SVG asset placement (see `SVG_REQUIREMENTS.md`)
3. Contact form submission backend
