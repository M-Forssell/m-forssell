# M Forssell

A [Next.js](https://nextjs.org/) website powered by [Storyblok](https://www.storyblok.com) as a headless CMS, deployed on [Netlify](https://www.netlify.com).

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **CMS:** Storyblok
- **Styling:** SCSS Modules with design tokens (fluid typography, CSS custom properties)
- **Icons:** FontAwesome (tree-shakable individual imports)
- **Testing:** Vitest + React Testing Library
- **Linting:** ESLint, Stylelint, Prettier
- **Deployment:** Netlify

## Get Started

### Prerequisites

- Node.js 22+ (or Bun)
- A Storyblok account and space

### 1. Install dependencies

```sh
npm install
# or
bun install
```

### 2. Set up VS Code

Copy the recommended workspace settings:

```sh
cp .vscode/settings.example.json .vscode/settings.json
```

VS Code will also prompt you to install the recommended extensions (Prettier, ESLint, Stylelint, EditorConfig).

### 3. Set up environment variables

```sh
cp .env.example .env.local
```

Add your Storyblok `preview` access token to `.env.local`. You can find it in **Settings > Access Tokens** in your Storyblok space.

> [!IMPORTANT]
> Learn more about Storyblok [access tokens](https://www.storyblok.com/docs/concepts/access-tokens).

### 4. Run the development server

```sh
npm run dev
```

For Visual Editor support, run with HTTPS:

```sh
npx next dev --experimental-https
```

## Project Structure

```
src/
  app/            # Next.js App Router pages and layout
  bloks/          # Storyblok blok components (CMS-mapped)
  components/     # Reusable UI components (prefixed with mf)
  foundation/     # Design tokens (colors, typography, breakpoints)
  lib/            # Storyblok client setup and utilities
  types/          # TypeScript types and enums
```

**Bloks** are 1:1 mapped to Storyblok content types and receive a `blok` prop. **Components** are CMS-agnostic and reusable.

## Available Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Production build               |
| `npm run lint`          | Run ESLint                     |
| `npm run lint:styles`   | Run Stylelint on CSS/SCSS      |
| `npm run test`          | Run tests                      |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

## Git Hooks

[Husky](https://typicode.github.io/husky/) runs automated checks:

- **Pre-commit:** Prettier auto-formats staged files, then runs ESLint and Stylelint via lint-staged.
- **Pre-push:** Runs type checking (`tsc`), linting, tests, and build. Push is blocked on failure.

## Visual Editor

To connect the Storyblok Visual Editor for live preview:

1. In Storyblok, go to **Settings > Visual Editor**
2. Set the default environment to `https://localhost:3000/`
3. Open a story and click **Config**
4. Set the **Real path** to `/`

> [!IMPORTANT]
> The Visual Editor requires HTTPS. Run `npx next dev --experimental-https` locally.

## Styling Guidelines

- Use relative values like `rem` or `%` instead of `px` for sizing (enforced by Stylelint)
- Use the design tokens in `src/foundation/` for colors, typography, and breakpoints
- Component styles use SCSS Modules (co-located `.module.scss` files)

## Resources

- [Storyblok documentation](https://www.storyblok.com/docs)
- [Next.js + Storyblok tutorials](https://www.storyblok.com/tutorials?technologies=next)
- [Next.js documentation](https://nextjs.org/docs)
- [@storyblok/react package reference](https://storyblok.com/docs/packages/storyblok-react)
