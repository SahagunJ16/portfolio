# CLAUDE.md

Project guidance for Claude Code. See [README.md](README.md) for full setup docs.

## What this is

A personal portfolio: one summary page plus two detail routes. Modern,
minimalist, **monotone** (zinc only — no hue). Everything renders from one
static data file. No CMS, no API, no DB.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · shadcn/ui
(`base-lyra` style on **Base UI** primitives, zinc base) · `next-themes` ·
`@vercel/analytics` · **pnpm**.

## Commands

```bash
pnpm dev         # port 3000
pnpm build
pnpm lint
pnpm typecheck   # tsc --noEmit
```

Verify with `pnpm typecheck && pnpm lint && pnpm build`. There is no test
framework — don't add one without asking.

## Routes

| Route | What it holds |
|---|---|
| `/` | Hero + five sections. Experience and Stack are **summaries only** |
| `/experiences` | Every role, expandable |
| `/stack` | Every category, every skill |

The two detail pages live in the `(pages)/` route group, which doesn't affect
their URLs.

## Rules that matter here

### Content lives in one place

All copy is in `src/data/data.tsx`. Never hardcode names, dates, job titles or
skills into components. If something needs to change on the page, change the
data.

**`experiences` is nested**: an entry is an *organization* with a `roles`
array. Everything that varies per role — title, location, employment, dates,
summary, highlights — lives on the role. An organization's overall date span
is **not** stored; `getExperienceSpan()` derives it, so it can't drift.

**`stack[].skills` are objects**, `{ name, featured? }`. The `featured` flag is
the only thing that decides what the home page summary shows; `/stack` shows
everything.

### Section registry

`src/lib/navigation.ts` exports `SECTIONS`. It drives section numbering, the
sidebar nav, the scroll-spy hook, the ⌘K palette **and the sitemap**. A section
with a `detailHref` gets a "view all" link and a sitemap entry automatically.

Adding or reordering a section means editing that array **and**
`src/app/page.tsx` — nothing else.

It is deliberately free of icons and component references so it stays
serializable across the server/client boundary. `detailHref: undefined` is
spelled out on sections without a detail page: with `as const`, an omitted key
wouldn't exist on those union members and every consumer would need an `in`
check.

### Server/client boundary

`page.tsx`, both detail pages and all six sections are Server Components. Keep
it that way. Only these are `"use client"`: `theme-toggle`, `command-palette`,
`copy-button`, `site-sidebar`, and shadcn primitives that require it.

> **`DATA.socials[].icon` holds React component references.** Passing `DATA`
> into a client component will fail to serialize. `SocialLinks` is therefore
> server-only and is passed *into* `SiteSidebar` as a rendered slot prop; the
> ⌘K palette gets plain `{ label, url }` pairs.

### Base UI, not Radix

shadcn components here wrap `@base-ui/react`. The API differs from Radix:

- `Button`, `DrawerClose` etc. rendering as an `<a>` or `<Link>` need
  **`nativeButton={false}`**, otherwise Base UI logs a console error.
- Composition uses a **`render` prop**, not `asChild`. The timeline relies on
  this: `<Accordion render={<ul />}>` with `<AccordionItem render={<li />}>`,
  because the default `<div>` root can't legally contain list items.
- `Accordion` uses `multiple`, not `openMultiple`; values are arrays.
- `CommandDialog` supplies only the dialog shell — you must nest `<Command>`
  inside it yourself.

### shadcn components are project-owned source

Edit `src/components/ui/*` in place when needed; two already carry
intentional local changes (`accordion.tsx` gained a `headingLevel` prop,
`command.tsx` moved its sr-only header inside the portal). **Do not re-run
`shadcn init`** — it would rewrite `components.json`. Add new components with
`pnpm dlx shadcn@latest add <name>`.

### Layout

`src/components/layout/site-sidebar.tsx` is the fixed nav rail from `lg` up and
a sticky top bar with a drawer below it — **one component for both**, so the
nav list is declared once. The root layout offsets main and footer with
`lg:pl-56` because the rail is out of flow.

`src/components/layout/section.tsx` owns the numbered section header (mono
label + hairline rule) that every home section uses. It is deliberately a
single column: the section numbers moved to the sidebar, so a second sticky
left rail here would just compete with it.

`Container` is the one shared measure for main, footer and the detail pages.

### Reuse before creating

Before writing a new component, check `src/components/` — `TagList`,
`MetaList`, `DateRange`, `SocialLinks`, `CopyButton`, `ViewAllLink`,
`PageHeader` and `ExperienceTimeline` already exist. The timeline serves both
the home summary (`expandable={false}`) and `/experiences`; don't fork it.
Formatting helpers live in `src/lib/format.ts`; never format a date inline.

### Privacy

`DATA.contact` contains a mobile number and postal code. **They are
intentionally not rendered.** Use `getPublicLocation()` for the address. Don't
surface either without being asked.

### SEO

`ProfilePage` JSON-LD names the home URL, so `<JsonLd>` lives in
`src/app/page.tsx`, **not** the root layout — otherwise every detail route
would claim to be the profile page. Detail routes emit a `BreadcrumbList`
instead.

### Styling

Use semantic tokens (`text-muted-foreground`, `border-border`, `bg-card`), not
raw colours. The `label-mono` utility in `globals.css` is the standard
uppercase mono micro-label. Keep it monotone — no accent hues.

Fonts: Geist (body), Geist Mono (labels, dates, numbers), Instrument Sans
(headings, via `font-heading`).

## Known data issue

The Nexperia internship and the Kinpo `Software Engineer` role carry identical
dates (Jun 2017 – Jun 2018). Flagged with the owner; render as-is until told
otherwise.
