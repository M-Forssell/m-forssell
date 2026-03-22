# Architecture

## Overview

Next.js 15 (App Router) website integrated with **Storyblok** as a headless CMS. Content is managed in Storyblok and rendered via React server components. Deployed to Netlify.

**Tech stack:** TypeScript, React 19, SCSS Modules, Vitest, Bun

## Directory Structure

```
src/
├── app/            # Next.js App Router — layouts, pages, global styles
├── bloks/          # Storyblok content blocks (CMS-mapped components)
├── components/     # Reusable UI components (prefixed with mf)
├── foundation/     # Design tokens — colors, typography, breakpoints (SCSS)
├── hooks/          # Custom React hooks
├── lib/            # Utilities and service initialization
├── types/          # TypeScript type definitions
└── assets/         # Static assets (logos, SVGs)
```

## Bloks vs Components

This is the most important distinction in the codebase:

- **Bloks** (`src/bloks/`) map 1:1 to Storyblok content types. They receive a `blok` prop with CMS data and use `storyblokEditable()` for live preview editing. Named in PascalCase: `Feature.tsx`, `Grid.tsx`.

- **Components** (`src/components/`) are reusable UI pieces with no CMS knowledge. They receive standard React props. Named with `mf` prefix: `mfCard.tsx`, `mfHeader.tsx`.

A blok typically wraps one or more components:
```
Storyblok CMS → Feature blok → Card component + RichText component
```

## Data Flow

1. **Page request** → `src/app/[[...slug]]/page.tsx` catches all routes
2. **Storyblok API** fetches the story for that slug via `getStoryblokApi()`
3. **StoryblokServerComponent** recursively renders the blok tree
4. **Global content** (header/footer) is fetched independently by their async server components

Version switching (draft vs published) is centralized in `src/lib/storyblok.ts` via `getStoryblokVersion()`.

## Styling

- **SCSS Modules** for component-scoped styles (`*.module.scss`)
- **classnames/bind** for conditional class composition
- **Foundation** (`src/foundation/`) provides design tokens as SCSS variables and mixins
- **CSS custom properties** power the light/dark theme system

### Theme System

1. An inline `<script>` in `layout.tsx` reads `localStorage` and sets `data-theme` before React hydrates (prevents flash)
2. `useTheme` hook manages theme state client-side
3. CSS variables in `foundation/color.scss` respond to `[data-theme]`

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| UI Components | `mf` prefix + camelCase | `mfCard.tsx` |
| Bloks | PascalCase, no prefix | `Feature.tsx` |
| Folders | No prefix | `card/`, `feature/` |
| Props types | `{Name}Props`, no prefix | `CardProps`, `HTagProps` |
| SCSS Modules | `{component}.module.scss` | `mfCard.module.scss` |
| Type constants | `as const` object | `CardVariant`, `IconName` |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `STORYBLOK_DELIVERY_API_TOKEN` | Yes | Preview access token from Storyblok Settings > Access Tokens |
| `STORYBLOK_VERSION` | No | Set to `published` in production (defaults to `draft`) |
| `STORYBLOK_REGION` | No | Defaults to `eu` |
| `STORYBLOK_API_BASE_URL` | No | Custom API endpoint (Blueprints only) |

## Adding a New Icon

1. Import the FontAwesome icon in `src/lib/iconMap.ts`
2. Add the name to `IconName` in `src/types/componentTypes.ts`
3. Add the mapping entry in `iconMap`

## Running Locally

```sh
bun install
cp .env.example .env  # Add your Storyblok token
bun run dev
```

For Storyblok Visual Editor: `npx next dev --experimental-https`
