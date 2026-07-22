# Admin "Add Menu Item" Page — Design

**Date:** 2026-07-22
**Status:** Approved

## Goal

Add an admin page that lets a user add new menu items to the restaurant menu at
runtime. New items appear immediately on the menu page. This is an in-memory,
session-only feature: added items live in React state and reset to the built-in
21 items on page reload. No backend, database, or build-time changes.

## Constraints & Context

- Static React + TanStack Router + Tailwind + Zod app. No server or API.
- Menu data is a hardcoded `foods` array in `src/food.ts`.
- Images are normally bundled at build time via `vite-imagetools` and looked up
  by filename key in `foodImages` (`src/food-images.ts`). Runtime-added items
  cannot use this pipeline.
- UI strings go through the `t()` i18n helper (`src/content/strings.ts`).
- Tailwind uses custom design tokens: `text-text-h`, `text-text`, `bg-bg`,
  `border-border`, `accent`, `accent-bg`.
- Tests use Vitest + Testing Library.

## Architecture — shared in-memory store via React Context

The menu (`/`) and the admin page (`/admin`) are separate routes that both need
the same runtime list. A `FoodStoreProvider` is added in `src/routes/__root.tsx`
(wrapping the existing `<Outlet />`) holding:

- `addedFoods: Array<Food>` — items added this session.
- `addFood(input): Food` — appends a new item with a fresh id and returns it.

The menu page renders the built-in `foods` concatenated with `addedFoods`. The
admin page calls `addFood()`.

New-item id = `max(id over foods ∪ addedFoods) + 1`, computed in the store so ids
never collide with built-ins.

_Alternative considered:_ a module-level external store with
`useSyncExternalStore`. Rejected — Context is the idiomatic fit and simpler for
this scope.

## Image handling

`Food` gains an optional field:

```ts
export type Food = {
 id: number
 name: string
 image: string // bundled filename key (built-in items)
 imageSrc?: string // ready-to-use URL for runtime-added items
 price: number
 description: string
 tags: Array<FoodTag>
}
```

`FoodCard` resolves the image in priority order:

1. `food.imageSrc` (uploaded item) → `{ src: imageSrc, srcSet: '' }`
2. else `foodImages[food.image]` (bundled item)
3. else a neutral placeholder box (no image available)

The `srcSet` attribute is omitted when empty. This change also fixes a latent
crash: today `foodImages[food.image]` returning `undefined` throws on
`image.src`. Built-in items render exactly as before.

## The admin route — `src/routes/admin.tsx`

TanStack file-based route at `/admin`. A form with:

- **Name** — text, required.
- **Price** — number, required, must be > 0.
- **Description** — textarea, required.
- **Tags** — multi-select using the same pill/`aria-pressed` pattern as
  `MenuToolbar`, sourced from `foodTags`. Optional.
- **Image** — file input (`accept="image/*"`), optional. On selection the file
  becomes an in-browser object URL (`URL.createObjectURL`) for preview and
  storage. If omitted, the item shows the `FoodCard` placeholder.

Behavior:

- Submit validates via a Zod schema. Invalid fields render an inline error
  message; the item is not added.
- On success: call `addFood()` with the form values (image → `imageSrc`), then
  navigate to `/` so the new item is visible on the menu.
- A "← Back to menu" link returns to `/`.

## Navigation

- No changes to the menu page's own header — admin stays off the menu.
- A subtle "Admin" link is added to a new global footer rendered in
  `__root.tsx` (below `<Outlet />`), low-emphasis styling. This footer is shared
  by all routes.

## Strings & i18n

New UI strings are added to the `MessageKey` union and `messages.en` in
`src/content/strings.ts` and rendered via `t()` (form labels, submit button,
back link, footer admin link, validation messages as needed).

## Testing (Vitest + Testing Library, TDD)

- **Store:** `addFood` appends an item with a fresh, non-colliding id; the menu
  list reflects the added item.
- **Admin form:** empty name / price / description block submission with visible
  errors; a valid submit calls `addFood` and navigates to `/`.
- **FoodCard:** renders `imageSrc` when set; renders the placeholder for an
  unknown/missing image key (regression guard for the latent crash).

## Out of scope (YAGNI)

- Editing or deleting existing items.
- Persistence beyond the session (localStorage, files, or a backend).
- Authentication / access control on the admin route.
- Running uploaded images through the build-time `vite-imagetools` pipeline
  (no responsive `srcSet` for uploaded images).
