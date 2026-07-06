# Yuri Bajracharya — Interior Design Portfolio

A three-page editorial portfolio for an interior architect based in Kathmandu,
built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS v4**.
Warm paper-textured aesthetic with hand-lettered headings, watercolor
decorations, and a load-time "wiggle" animation.

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **TypeScript**
- **Tailwind CSS v4** — design tokens declared in [`app/globals.css`](app/globals.css) via `@theme`
- **next/font/google** — Cormorant Garamond, Mulish, Space Mono, Overpass Mono
- **next/image** — all assets served from [`public/uploads`](public/uploads)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all routes prerender statically)
npm run start    # serve the production build
npm run lint
```

## Routes

| Route              | Rendering | Source                                                        |
| ------------------ | --------- | ------------------------------------------------------------- |
| `/`                | Static    | [`app/page.tsx`](app/page.tsx)                                |
| `/about`           | Static    | [`app/about/page.tsx`](app/about/page.tsx)                    |
| `/projects/[slug]` | SSG       | [`app/projects/[slug]/page.tsx`](app/projects/[slug]/page.tsx) |

Currently one published case study, `sunrise-inclusive-school`. Unknown slugs
return the framework 404 (`notFound()`).

## Project structure

```
app/                     # routes + root layout + global styles
components/
  layout/                # PageShell, SiteHeader (client), SiteFooter, Brand
  ui/                    # Deco, Button, Eyebrow, NavLink, Placeholder
  sections/              # ProjectCard
data/                    # site config + page content (single source of truth)
lib/
  assets.ts              # image manifest (paths + intrinsic dimensions)
  fonts.ts               # next/font setup
public/uploads/          # image assets
```

### Design system

Colors, fonts, and the shared page gutter live as tokens in
[`app/globals.css`](app/globals.css) (`@theme`) and are consumed through Tailwind
utilities (`text-ink`, `text-accent`, `bg-paper`, `font-serif`, …). Bespoke
fluid sizing uses `clamp()` inline to stay faithful to the mockups. Reusable
interactive patterns (nav underline, pill buttons, project-card hover, sticky
header, photo placeholders) are component classes in the same file.

Decorative elements respect `prefers-reduced-motion`.

## Extending the site

- **Add a project:** append to `projects` in [`data/projects.ts`](data/projects.ts).
  Give it a unique `slug` and add a matching `CaseStudy` entry to render its page.
- **Real photography:** the case study and project cards use patterned
  `Placeholder` / `.pimg` boxes. Swap them for `next/image` (add the asset to
  [`lib/assets.ts`](lib/assets.ts)) and keep the surrounding captions.
- **Contact / brand info:** edit [`data/site.ts`](data/site.ts).
