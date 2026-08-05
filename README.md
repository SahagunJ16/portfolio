# Portfolio — Joshua Sahagun

**Live: [joshuasahagun.com](https://joshuasahagun.com)**

A personal portfolio. Modern, minimalist and monotone, built on Next.js App
Router with shadcn/ui.

Everything is rendered from a single static data file. There is no CMS, no
database and no API — update [`src/data/data.tsx`](src/data/data.tsx) and the
whole site follows.

## Contents

- [Routes](#routes)
- [Stack](#stack)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Environment variables](#environment-variables)
- [Assets](#assets)
- [Editing content](#editing-content)
- [Project structure](#project-structure)
- [Design notes](#design-notes)
- [Adding shadcn components](#adding-shadcn-components)
- [Accessibility](#accessibility)
- [SEO](#seo)
- [Deployment](#deployment)

## Routes

| Route | What it holds |
|---|---|
| `/` | Hero and six sections. Experience, Stack and Certifications are summaries |
| `/experiences` | Every role, expandable, on a career timeline |
| `/stack` | Every category and skill |
| `/certifications` | Every certification, grouped by category |

The detail pages live in the `(pages)/` route group, which doesn't affect their
URLs.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 (CSS-first config in `src/app/globals.css`) |
| Components | shadcn/ui — `base-lyra` style on [Base UI](https://base-ui.com) primitives |
| Theming | `next-themes` (light / dark / system) |
| Icons | `lucide-react` (UI) + `react-icons` (social and stack skill brand marks) |
| Analytics | `@vercel/analytics` (only reports on Vercel deployments) |
| Package manager | **pnpm** |

## Getting started

```bash
pnpm install
cp .env.example .env.local     # then edit NEXT_PUBLIC_SITE_URL
pnpm dev
```

The dev server runs on **http://localhost:3000**. Next.js will pick the next
free port if 3000 is taken.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server on port 3000 |
| `pnpm build` | Production build (the whole site prerenders as static) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint (`next/core-web-vitals` + TypeScript rules) |
| `pnpm typecheck` | `tsc --noEmit` |

Run `pnpm typecheck && pnpm lint && pnpm build` before deploying.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production only | Absolute origin used for canonical URLs, `sitemap.xml`, `robots.txt` and Open Graph image URLs. No trailing slash. Falls back to `http://localhost:3000`. |

Set it in your hosting provider's environment settings. See
[`.env.example`](.env.example). Never commit a real `.env.local`.

## Assets

| Path | Status | Used by |
|---|---|---|
| `public/images/avatar.png` | ✅ present (1600×1600) | Hero avatar, `Person` structured data |
| `public/images/experiences/logos/*.png` | ✅ present (4 organizations) | Experience table + timeline avatars |
| `public/resume.pdf` | ✅ present | Hero **Resume** button, ⌘K palette |

The avatar is rendered through `next/image` at 144px (288px for 2× displays),
so the 1.4 MB original is never sent to visitors — the browser gets a small
resized variant. No manual downscaling needed. If the file is missing the
avatar falls back to the initials `JS`. It renders grayscale by default,
fading to full color on hover/focus — the same treatment organization logos
get (see below).

Organization logos render inside a circular `Avatar`, falling back to the
organization's initial letter when an entry has no `logo` set. `website` and
`logo` are independent and both optional. See
[`public/images/experiences/logos/README.md`](public/images/experiences/logos/README.md).

`AVATAR_PATH` and `RESUME_PATH` are defined once in
[`src/lib/seo.ts`](src/lib/seo.ts) — change them there, not at the call
sites. See [`public/images/README.md`](public/images/README.md) for details.

## Editing content

All copy lives in [`src/data/data.tsx`](src/data/data.tsx), typed against the
`PortfolioData` interface in the same file. TypeScript will tell you if a
required field is missing.

**`experiences` is nested one level.** An entry is an *organization* holding a
`roles` array — the shape a career actually has:

```ts
{
  organization: "Collins Aerospace",
  roles: [
    { title: "Business System Analyst III", start: …, end: …, summary: …, highlights: […] },
    { title: "Business System Analyst II",  … },
  ],
}
```

- **Adding a role** — push onto that organization's `roles`, newest first.
  Everything that varies between roles (title, location, employment, dates,
  summary, highlights) belongs on the role.
- **Adding an employer** — push a new entry onto `experiences`, newest first.
- **Date spans** — an organization has no `start`/`end` of its own. They're
  derived from its roles by `getExperienceSpan()`, so the header dates can
  never disagree with the roles beneath them.
- **Dates** — `{ month: 1-12, year: YYYY }`. An `end` of `null` means "current"
  and renders as *Present*, and fills that role's timeline bullet. Durations
  and the "N+ years" figure in the hero are computed at render time, so they
  never go stale.
- **Skills** — `stack[].skills` are objects:
  `{ name: "React", featured: true, icon: SiReact }`. The `featured` flag is
  the *only* thing controlling what the home page summary shows; `/stack`
  always shows everything. `icon` is an optional `react-icons` component, set
  only where a real brand/tech mark exists — not every skill has one.
- **Certifications** — `certifications` is grouped like `stack`:
  `{ category: string, certifications: Certification[] }`. There's no
  `featured` flag — the home summary lists every certification (flat, newest
  data order); only `/certifications` groups them by category. A
  certification's `skills` are plain strings (the issuer's own tags), not a
  reference into `stack`.
- **Adding or reordering sections** — edit `SECTIONS` in
  [`src/lib/navigation.ts`](src/lib/navigation.ts). That single array drives the
  section numbering, the sidebar nav, the scroll-spy, the ⌘K palette and the
  sitemap. A section with a `detailHref` automatically gets a "view all" link
  and its own sitemap entry. Then add the matching `<Section>` to
  `src/app/page.tsx`.

### Contact privacy

`DATA.contact` holds a mobile number and a postal code. **Neither is rendered.**
The UI shows only the email address and `getPublicLocation()` (city, region,
country). If you want the phone number public, surface it explicitly in
`src/components/portfolio/contact-section.tsx`.

## Project structure

```
src/
  app/
    layout.tsx            root layout, metadata, providers, sidebar/footer
    page.tsx              the home page + Person/ProfilePage JSON-LD
    globals.css           Tailwind v4 theme tokens
    not-found.tsx         styled 404
    opengraph-image.tsx   generated 1200×630 card (cascades to child routes)
    twitter-image.tsx     re-exports the OG card
    sitemap.ts robots.ts manifest.ts
    icon.svg icon.png apple-icon.png favicon.ico
                          file-based metadata icons, picked up automatically
    (pages)/
      experiences/        full career timeline
      stack/              full toolkit
      certifications/     full credential list, grouped by category
  components/
    layout/               Container, Section, PageHeader, SiteSidebar, SiteFooter
    portfolio/            Hero, ExperienceTable (home), ExperienceTimeline
                          (/experiences), OrganizationLogoLink + one component
                          per section
    ui/                   shadcn components (project-owned source)
    *.tsx                 shared atoms — TagList, MetaList, DateRange, ViewAllLink, …
  data/data.tsx           ← all content
  hooks/                  useActiveSection, useCopyToClipboard, useIsHydrated
  lib/                    format, portfolio, navigation, seo, json-ld, utils
```

### Server/client boundary

`page.tsx`, both detail pages and all six sections are **Server Components**.
Only the interactive leaves are `"use client"`: `theme-toggle`,
`command-palette`, `copy-button`, `site-sidebar` and the shadcn primitives that
need it.

> `DATA.socials[].icon` holds React **component references**, so `DATA` must not
> be passed wholesale into a client component. `SocialLinks` (shown only in
> the hero, a Server Component) is unaffected; the ⌘K palette, which is
> `"use client"`, receives plain `{ label, url }` pairs instead of the
> component itself.

## Design notes

- **Navigation** — a fixed left rail from `lg` up (monogram, numbered sections
  with an active indicator, ⌘K, theme); a sticky top bar with a drawer below
  that. Both come from one component,
  `src/components/layout/site-sidebar.tsx`, so the nav list is declared once.
- **Socials** — shown once, in the hero, rather than repeated in the sidebar,
  footer and contact section. `src/components/social-links.tsx`.
- **Layout** — one measure (`max-w-4xl`) shared by main, footer and the detail
  pages, offset by the rail with `lg:pl-56`. Each section is headed by a
  numbered mono label and a hairline rule, defined once in
  `src/components/layout/section.tsx`.
- **Type** — Geist (body), Geist Mono (numbers, labels, dates), Instrument Sans
  (headings), all self-hosted via `next/font`.
- **Colour** — zinc only. Emphasis comes from contrast, weight and rule
  placement, never hue. Light mode uses an off-white `--background` with pure
  white cards so hairline borders read as layered.
- **shadcn components are project-owned source.** Edit them in place; don't
  re-run `shadcn init`, which would rewrite `components.json`.

## Adding shadcn components

```bash
pnpm dlx shadcn@latest add <component>
```

`components.json` is already configured (`base-lyra` style, zinc base, Base UI
primitives), so new components arrive matching the existing ones.

## Accessibility

- One `<h1>` per route. On `/`: sections are `<h2>`; the Experience summary is
  a table, so it carries no heading levels of its own. On `/experiences`:
  organizations are `<h2>`, roles are `<h3>`.
- Skip-to-content link is the first focusable element.
- Every date is a real `<time datetime>`.
- Smooth scrolling is disabled under `prefers-reduced-motion`.

## SEO

Site-wide metadata, Open Graph and Twitter cards are defined in
`src/app/layout.tsx`; each detail route adds its own title, description and
canonical. All JSON-LD is generated from `DATA` at render time by
`src/lib/json-ld.ts`, so structured data cannot drift from the visible page.

`Person` + `ProfilePage` is emitted **only on `/`** — `ProfilePage` names the
home URL, so putting it in the root layout would have every detail route claim
to be the profile page. `/experiences` and `/stack` emit a `BreadcrumbList`
instead.

The sitemap derives its routes from `SECTIONS`, so a new detail page is listed
automatically.

After deploying, verify:

- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`
- The JSON-LD blocks with the [Rich Results Test](https://search.google.com/test/rich-results)
- The share card with a social debugger

## Deployment

The site prerenders entirely to static output and deploys anywhere that runs
Next.js. On Vercel: import the repo, set `NEXT_PUBLIC_SITE_URL`, deploy.

Web Analytics is wired up via `@vercel/analytics` in the root layout. It is
inert outside Vercel, so local dev and self-hosted builds are unaffected;
enable Web Analytics in the Vercel project settings to start collecting.
