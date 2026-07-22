# Restaurant Menu Homepage — Design

## Goal

Replace the Vite starter homepage with a restaurant menu: every food from `src/food.ts` displayed as a card (image, name, price, description, tags), laid out in a responsive grid capped at three cards per row. Optimize for Lighthouse (performance, accessibility, best practices), and lay a structural foundation for future localization without adding an i18n library yet.

**Branch:** `feature/restaurant-menu-homepage` (no Jira ticket — this is a personal workshop project).

## Scope

- `App.tsx` is fully replaced. The Vite starter content (hero image, framework logos, counter button, docs/social link sections) is deleted, along with the assets and CSS that only existed to support it: `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `src/App.css`.
- `src/food.ts` (types + data) is unchanged.
- No cart, ordering, search, or filtering — display only, per the original request.
- No i18n library is added. See "Localization" below for what is and isn't done now.

## Component structure

```
src/
  App.tsx                    — <main><h1>{heading}</h1><MenuGrid foods={foods} /></main>
  food.ts                    — existing, unchanged
  locale.ts                  — DEFAULT_LOCALE + formatPrice()
  content/
    strings.ts               — UI copy dictionary + t() helper
  assets/
    food-images/*.jpg        — moved from public/images/ (source files for the image pipeline)
  food-images.ts              — per-image vite-imagetools imports, keyed by filename
  components/
    MenuGrid.tsx
    MenuGrid.test.tsx
    FoodCard.tsx
    FoodCard.test.tsx
index.css                    — Tailwind entry + @theme tokens + dark-mode overrides (see Styling)
```

`public/images/` is deleted once the images live in `src/assets/food-images/` — one copy of each file, not two.

### MenuGrid

Renders a `<ul>` with one `<li>` per food, each containing a `FoodCard`. The `<ul>` carries the responsive grid classes. Using a list is the correct semantic for a collection of items (helps screen reader users get an item count).

### FoodCard

Props: a single `Food`. Renders:
- `<img>` — responsive `srcSet` from the image pipeline, `alt={food.name}`, explicit `width`/`height`, `loading`/`fetchpriority` per position (see Images).
- Name as an `<h2>` (one level under the page's `<h1>`; `MenuGrid` introduces no heading of its own).
- Price via `formatPrice(food.price)` from `locale.ts`.
- Description text.
- Tags rendered as small chips/badges.

## Styling — Tailwind CSS v4

- New devDependencies: `tailwindcss`, `@tailwindcss/vite`, `prettier-plugin-tailwindcss`.
- `vite.config.ts` registers the `@tailwindcss/vite` plugin.
- `index.css` becomes the Tailwind entry point (`@import "tailwindcss";`) plus a `@theme` block that maps the app's existing custom properties into Tailwind theme tokens, so utilities like `bg-bg`, `text-text`, `border-border`, `text-accent`, `font-sans` exist and resolve to the current color values:
  - `--color-text`, `--color-text-h`, `--color-bg`, `--color-border`, `--color-accent`, `--color-accent-bg`, `--color-accent-border`
  - `--font-sans`, `--font-heading`, `--font-mono`
- The existing `@media (prefers-color-scheme: dark)` block keeps overriding those same custom properties at `:root`. Because Tailwind utilities read the CSS variables rather than hardcoding values, dark mode continues to work with no `dark:`-prefixed classes needed for the base palette — matching current behavior (there's no manual light/dark toggle today).
- `App.css` is deleted. All new component styling (`MenuGrid`, `FoodCard`) uses Tailwind utility classes directly in JSX; no new per-component CSS files are introduced.
- `.prettierrc.json` adds the `prettier-plugin-tailwindcss` plugin so class lists stay in Tailwind's canonical order automatically via the existing `npm run format`.

## Responsive grid

Tailwind's default breakpoints line up with the app's existing `1024px` convention, so no custom breakpoints are needed:

- `< 640px` (default): 1 column — `grid-cols-1`
- `≥ 640px` (`sm:`): 2 columns — `sm:grid-cols-2`
- `≥ 1024px` (`lg:`): 3 columns — `lg:grid-cols-3`

Capped at 3 columns at every width above 1024px, including ultra-wide viewports (the app's `#root` already constrains to a 1126px max width, so this is naturally bounded regardless).

## Images — Lighthouse performance

Source JPGs are 270KB–1.2MB at original photo resolution; displayed as small card thumbnails they'd dominate page weight and fail Lighthouse's "properly sized/encoded images" audits.

- Images move from `public/images/` (unprocessed, served as-is) into `src/assets/food-images/` so Vite's build pipeline handles them.
- `vite-imagetools` (new devDependency) generates resized WebP variants at build time via explicit per-image import directives (e.g. `?w=320;640&format=webp&as=srcset`) — one import per known filename, not a dynamic glob, so the mapping stays simple to read and debug.
- `src/food-images.ts` exports a `Record<string, { src: string; srcSet: string }>` keyed by the same filename strings already stored in `food.ts` (e.g. `"burger.jpg"`), so `FoodCard` just does `foodImages[food.image]`.
- `FoodCard`'s `<img>`:
  - `srcSet` + `sizes` from the generated variants, explicit `width`/`height` matching the image's aspect ratio (prevents CLS).
  - `decoding="async"` on every image.
  - `loading="lazy"` on every card except the first row (first 3 foods in `food.ts` order), which load eager since they're above the fold.
  - `fetchpriority="high"` on the very first image only (the most likely LCP candidate).
  - A CSS `aspect-ratio` + `object-fit: cover` wrapper so cards stay visually consistent regardless of each photo's native aspect ratio.

## Localization — structural readiness only

No i18n library is added in this pass. Two seams are put in place so a library can slot in later without a rewrite:

1. **`src/locale.ts`** — a single `DEFAULT_LOCALE` constant and a `formatPrice(price: number)` helper built on `Intl.NumberFormat(DEFAULT_LOCALE, { style: 'currency', currency: 'USD' })`. All price display goes through this one function instead of ad-hoc `.toFixed(2)` calls.
2. **`src/content/strings.ts`** — a small dictionary of UI copy (currently just the page heading) keyed by locale, with a `t(key)` lookup helper that reads from `DEFAULT_LOCALE`. Establishes where translated UI strings would live.

**What's explicitly not solved yet, and the documented next step:** `food.ts`'s `name`, `description`, and `tags` values are hardcoded English strings baked directly into the data array. Localizing food content later requires one of:
- Restructuring `food.ts` so `name`/`description`/`tags` are keyed lookups (e.g. `nameKey: "food.burger.name"`) resolved through a message catalog per locale, or
- Splitting the food data itself into per-locale files (`food.en.ts`, `food.es.ts`, ...) keyed by the same `id`.

Adopting a real i18n library (e.g. `react-i18next`) at that point would also replace the `t()` helper in `strings.ts` and the `formatPrice`/`DEFAULT_LOCALE` seam in `locale.ts` with the library's own APIs, which are drop-in replacements for those two functions' call sites.

## Testing

New devDependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`. New `package.json` scripts: `test` (`vitest run`), `test:watch` (`vitest`).

- `FoodCard.test.tsx` — renders a sample food and asserts the name, formatted price, description, tags, and image `alt` text are present.
- `MenuGrid.test.tsx` — renders with the real `foods` array and asserts all 21 items render (by list item count or by a spot-check of a few names).

## Out of scope

- Cart, ordering, checkout, search, filtering by tag.
- Actually implementing multi-locale content or wiring up `react-i18next` — only the structural seam described above.
- Image CDN/on-the-fly resizing service — build-time generation via `vite-imagetools` is sufficient for a static asset set that doesn't change often.
- Automated Lighthouse CI — verification is manual (Lighthouse run in Chrome DevTools) as part of implementation sign-off, not wired into a pipeline.
