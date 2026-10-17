# Hously Design Guide

## 1. Product Character

Hously is a modern architecture studio presented as a calm, editorial portfolio. The experience should feel considered rather than decorative: generous space, restrained color, high-quality architectural imagery, and motion that reveals the work gradually.

**Brand promise:** spaces that elevate living through form, light, material, and intention.

**Experience principles**

1. **Quiet confidence** — Let composition and photography carry the story.
2. **Material honesty** — Use warm neutrals, charcoal, stone, and natural imagery rather than glossy effects.
3. **Editorial hierarchy** — Treat each section like a spread in an architecture journal.
4. **Purposeful motion** — Animation should explain progression or reveal content, never compete with it.
5. **Human livability** — Balance architectural precision with approachable copy and clear contact paths.

## 2. Visual Direction

The visual language is warm minimalism with an architectural, gallery-like tone. The default surface is a pale warm neutral. Dark charcoal provides contrast, while a muted orange/sand accent highlights selected words and interactive states.

Avoid gradients, neon colors, glassmorphism, excessive shadows, rounded cards, decorative patterns, and generic startup visuals. Favor flat surfaces, fine rules, strong photography, and asymmetrical editorial spacing.

## 3. Color System

The source of truth is the semantic token system in `app/globals.css`. Components should use semantic classes (`bg-background`, `text-foreground`, `border-border`, etc.) instead of hardcoded colors.

| Token | Role | Current direction |
| --- | --- | --- |
| `background` | Main page surface | Warm off-white |
| `foreground` | Primary text and dark surfaces | Charcoal brown-black |
| `card` | Elevated content surface | Slightly lighter warm neutral |
| `primary` | Dark header, overlays, and strong actions | Deep charcoal |
| `secondary` | Alternating section surface | Soft stone |
| `muted` | Quiet backgrounds and disabled states | Warm gray |
| `muted-foreground` | Supporting copy and metadata | Medium taupe-gray |
| `accent` | Highlighted words and focus emphasis | Muted sand/orange |
| `border` | Dividers and structural rules | Low-contrast warm gray |
| `destructive` | Errors only | Accessible red |

### Color usage rules

- Keep the palette to the semantic tokens above plus white for image overlays and primary buttons.
- Use accent sparingly: highlighted words, hover underlines, or a single editorial emphasis.
- Maintain strong contrast for body copy and navigation.
- Never use color as the only way to communicate state.
- In dark mode, preserve the hierarchy but avoid pure black/pure white where a softer neutral is more appropriate.

## 4. Typography

The primary typeface is **Satoshi**, loaded from the local font files and exposed through the `font-sans` theme token. Use **Geist Mono** only for technical metadata or future data-heavy UI.

### Type hierarchy

- **Hero display:** `text-7xl` to `text-8xl`, medium weight, tight tracking, approximately `0.9` line-height. Use short, expressive statements split across lines.
- **Section headline:** `text-4xl` to `text-8xl`, medium weight, tight tracking, approximately `1.15` line-height.
- **Card title:** `text-xl`, medium weight.
- **Body:** `text-base` to `text-lg`, relaxed line-height, muted foreground for supporting copy.
- **Eyebrow:** `text-sm`, uppercase, wide tracking around `0.3em`, muted or secondary color.
- **Metadata:** `text-sm`, muted foreground, concise and factual.
- **Buttons and navigation:** `text-sm`, medium or regular weight, wide enough tracking to feel deliberate without becoming decorative.

### Copy rules

Use plain, confident language. Keep headlines short and specific. Prefer verbs such as “design,” “shape,” “curate,” and “elevate.” Avoid jargon, hype, exclamation marks, and overly promotional claims.

## 5. Layout Foundations

Use a centered responsive container with generous horizontal padding:

- Mobile: `px-6`
- Desktop: `px-12`
- Keep content widths intentional; editorial text blocks generally max out between `max-w-3xl` and `max-w-4xl`.
- Prefer Flexbox for one-dimensional alignment and Grid for project/service collections.
- Use vertical rhythm built around large section padding, typically `py-32` on desktop.
- Use thin borders to separate ideas instead of cards and shadows.
- Keep important content inside the normal document flow. Use absolute positioning only for overlays, hero layers, and intentional decorative media.

## 6. Page Architecture

The homepage is a single scrolling narrative. Preserve this order unless a new content requirement makes the user journey clearer:

1. **Header** — Brand, anchor navigation, and contact CTA.
2. **Hero** — Architectural image composition, positioning statement, and scroll invitation.
3. **Philosophy** — The studio’s point of view and design principles.
4. **Projects** — Selected work presented as large image-led case study previews.
5. **Expertise** — Four practice areas with short explanations and line icons.
6. **FAQ** — Objection handling and process clarity.
7. **Call to action** — A focused invitation to begin a conversation.
8. **Footer** — Studio navigation, contact details, social links, legal links, and brand statement.

Every major section should have a stable anchor ID so header and footer links remain reliable.

## 7. Component Guidance

### Header

- Fixed position with a transparent state over the hero.
- On scroll, transition to a compact dark rounded panel with backdrop blur.
- Desktop navigation uses small text and subtle underline motion.
- “Get in touch” is the only high-emphasis navigation action.
- Mobile navigation becomes a full-width expanded menu with large, readable links.
- The menu button must have an accessible label and a visible focus state.

### Hero

- Treat the hero as an image composition: background architecture, readable title layer, and foreground material layer.
- Keep the title centered and concise.
- Use one accent-colored line to create a clear reading focal point.
- The scroll-driven transformation should feel like entering the studio’s work: translate, rotate, and scale are subtle enough to preserve legibility.
- Never make the hero interaction the only path to the rest of the page. Anchor navigation and normal scrolling must remain available.
- Respect `prefers-reduced-motion` by disabling scroll interception and decorative transforms.

### Philosophy

- Use a strong editorial headline paired with a narrower supporting paragraph.
- Favor generous whitespace and a small number of principles rather than dense feature lists.
- Highlight only a few meaningful words with `HighlightedText`.

### Projects

- Use a responsive two-column grid on desktop and one column on mobile.
- Images use a consistent `4/3` aspect ratio and `object-cover` cropping.
- Project metadata follows a stable pattern: title, category/location, year.
- Hover zoom is slow and restrained; keep the image readable.
- Reveal masks should be one-time, viewport-triggered, and never block keyboard users.
- If “View all projects” is not implemented, do not present it as a dead link in production; route it to a real archive or remove it.

### Expertise

- Use a two-column grid on desktop and stack on mobile.
- Each item uses a fine left rule, a thin-stroke Lucide icon, a title, and a concise paragraph.
- Reveal items in a small stagger, but keep content visible when motion is reduced or unavailable.
- Icons should support comprehension, not act as decoration alone.

### FAQ

- Use an accessible accordion with clear button labels and keyboard support.
- Keep answers short enough to scan, but specific enough to reduce uncertainty about process, scope, and collaboration.
- Only one visual treatment should signal expanded state: icon rotation, border change, or background change.

### Call to action

- Use a dark or strongly contrasted surface to create a decisive ending.
- Give the user one primary next step, such as “Start a conversation.”
- Include enough context to make the action feel personal rather than transactional.

### Footer

- Use a restrained multi-column grid that collapses cleanly on mobile.
- Keep brand statement, navigation, and contact information distinct.
- Legal and copyright content belongs in a quiet bottom bar separated by a thin rule.

## 8. Interaction and Motion

Motion should communicate hierarchy, reveal, or feedback.

- Default transition duration: `300ms` for controls and `500–700ms` for image movement.
- Use `ease-out` for entrances and `cubic-bezier(0.76, 0, 0.24, 1)` for architectural mask reveals.
- Use Intersection Observer for viewport reveals, as in the project and expertise sections.
- Do not animate layout-heavy properties when a transform or opacity will work.
- Always include a reduced-motion path with `@media (prefers-reduced-motion: reduce)`.
- Avoid scroll hijacking except for the hero’s intentional entrance sequence, and provide a no-motion fallback.
- Focus, hover, and active states must remain visible without animation.

## 9. Imagery

Photography is the dominant visual asset and should feel real, quiet, and material-focused.

Preferred subjects:

- Natural light across stone, concrete, wood, and glass.
- Wide spatial compositions with believable scale.
- Human-centered residential and hospitality environments.
- Restrained color grading with warm highlights and deep neutral shadows.

Image rules:

- Use meaningful alt text for informative imagery.
- Use empty alt text only when an image is purely decorative.
- Keep crops consistent within a collection.
- Prefer `next/image` for new content where layout dimensions are known.
- Avoid placeholder imagery in production.

## 10. Accessibility

- Use semantic landmarks: `header`, `nav`, `main`, `section`, and `footer`.
- Keep a logical heading order with one page-level `h1`.
- Ensure all links describe their destination and all buttons describe their action.
- Preserve visible keyboard focus using the ring token.
- Maintain WCAG AA contrast for body text, controls, and overlays.
- Make touch targets at least 44×44 CSS pixels.
- Ensure anchor navigation accounts for the fixed header with scroll margin.
- Do not rely on hover for essential information.
- Test the mobile menu, FAQ accordion, and hero behavior with keyboard and screen reader navigation.

## 11. Responsive Behavior

### Mobile

- Stack all grids into one column.
- Keep hero type large but prevent clipping with responsive line lengths.
- Replace desktop navigation with the expandable menu.
- Reduce decorative motion and preserve direct scrolling.
- Maintain comfortable `px-6` gutters and at least `gap-6` between interactive elements.

### Tablet

- Keep the editorial hierarchy, but reduce hero and section headline sizes.
- Use two-column project and expertise grids only when each column remains readable.

### Desktop

- Use `px-12` content gutters and wide section spacing.
- Let imagery become the dominant scale element.
- Keep copy blocks narrow enough to preserve reading comfort.
- Use whitespace to create pacing between sections rather than adding more UI.

## 12. Content and CMS Readiness

When project data becomes dynamic, preserve the current content contract:

```ts
type Project = {
  id: string
  title: string
  category: string
  location: string
  year: string
  image: string
  alt?: string
}
```

Keep visual components data-driven. Do not duplicate card markup for individual projects. Validate titles, locations, years, image URLs, and alt text before rendering.

## 13. Quality Checklist

Before shipping a new section or page:

- Does it reinforce the quiet architectural/editorial character?
- Does it use semantic design tokens rather than one-off colors?
- Does it work at mobile, tablet, and desktop widths?
- Is the content still understandable with motion disabled?
- Are all interactive elements keyboard accessible and clearly labeled?
- Are images optimized, correctly cropped, and given appropriate alt text?
- Are anchor links and CTAs connected to real destinations?
- Does the page maintain a single clear primary action?
- Are new components split into focused files rather than growing `page.tsx`?
- Has the changed behavior been checked in the browser at the target viewport?

## 14. Source of Truth

- Global design tokens: `app/globals.css`
- Page composition: `app/page.tsx`
- Metadata: `app/layout.tsx`
- Header behavior: `components/header.tsx`
- Hero behavior: `components/hero.tsx`
- Project presentation: `components/projects.tsx`
- Service presentation: `components/expertise.tsx`
- Shared utility classes: `lib/utils.ts`

When a future design decision conflicts with this guide, prefer the existing token system and accessibility requirements first, then update this guide so the documented system and implementation remain aligned.
