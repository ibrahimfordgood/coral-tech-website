# Coral Tech Design Guide

## Purpose

The site has one job: convince a Freetown school or business owner, in under a minute and on a phone, that we build good websites, and get them to message us on WhatsApp or book a visit. Every design decision serves that, and the site itself must prove what we sell: fast, clean and reliable on a cheap Android phone over 3G.

## Principles

1. **Phone first.** Design at 360px wide, then scale up. Tap targets are at least 44px. The WhatsApp button is always within thumb reach.
2. **Proof over promises.** Show real work, real Freetown photos and real prices. Never show made-up clients.
3. **Light on data.** No background video, no animation libraries, no autoplay. Use coded visuals (like the hero phone mockup) instead of extra images where possible.
4. **Plain words.** Short sentences, no jargon, no hype, no exclamation marks.

## Colour

Tokens live in `app/globals.css`. Always use semantic classes, never raw hex values in components (the hero phone mockup is the one exception, because it depicts a client's site).

| Token | Use |
| --- | --- |
| `background` / `foreground` | Warm paper surface, deep ink text |
| `primary` | Ink. Dark sections (hero, "Why now", footer) and default buttons |
| `secondary` | Soft sand for alternating sections |
| `accent` | Coral. Fills, large text, and text on ink |
| `accent-strong` | Darker coral for small text and icons on light surfaces (AA contrast) |
| `whatsapp` | WhatsApp buttons only (white text passes AA) |
| `muted-foreground` | Supporting copy |

## Type

Satoshi (self-hosted in `app/fonts`, loaded with `next/font/local`) is the only typeface. Weights 400, 500 and 700.

- Page titles: `text-4xl md:text-5xl font-bold tracking-tight`
- Section titles: `text-3xl md:text-4xl font-bold tracking-tight` (use `SectionHeading`)
- Eyebrows: the `eyebrow` utility
- Body: `text-lg leading-relaxed`, `text-muted-foreground` for supporting copy

## Layout

- Use the `container-page` utility for horizontal padding (16px gutter on phones).
- Sections use `py-16 md:py-20` (inner pages) or `py-20 md:py-28` (home).
- Rounded corners: `rounded-2xl` for cards and images, `rounded-3xl` for hero-scale media, `rounded-full` for buttons.

## Components

- **Buttons:** `Button` from `components/ui/button.tsx`. Use `size="lg"` (48px) for primary actions. Variants are `whatsapp`, `default` (ink), `outline`, `accent`, `inverse` and `outline-inverse`.
- **WhatsApp:** always use `WhatsAppLink`. It pre-fills the page name and tracks the click.
- **Calls to action:** every public page ends with `CtaStrip` (from the site layout).
- **FAQ:** `Faq` uses native `<details>`, so it works without JavaScript.
- **Reveal animation:** add `data-reveal` to a block. Content stays visible without JavaScript and with reduced motion.

## Photography

Photos are free Unsplash images of Freetown and West African people, listed in `public/images/CREDITS.md`. Replace them with our own photos of clients and the team as soon as we have them. Every image needs meaningful alt text and goes through `next/image`.
