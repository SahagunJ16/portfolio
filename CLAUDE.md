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
| `/` | Hero + seven sections. Experience, Stack, Certifications and Honors & Awards are **summaries only** |
| `/experiences` | Every role, expandable |
| `/stack` | Every category, every skill |
| `/certifications` | Every certification, grouped by category |
| `/awards` | Every award, with the citation the home summary omits |

The detail pages live in the `(pages)/` route group, which doesn't affect their
URLs.

## Rules that matter here

### Content lives in one place

All copy is in `src/data/`, **one file per top-level key** — `profile.ts`,
`contact.ts`, `socials.ts`, `overview.ts`, `experiences.ts`, `educations.ts`,
`stack.ts`, `certifications.ts`, `awards.ts` — so the directory listing is the
shape of `PortfolioData`. Never hardcode names, dates, job titles or skills into
components. If something needs to change on the page, change the data.

- `src/data/types.ts` holds every type. **Fragment files import from `./types`
  only** — never from `./index` or `@/data`, which is the one shape that could
  create a cycle.
- `src/data/index.ts` composes the fragments into `DATA satisfies
  PortfolioData`. Consumers import `DATA` (and types) from `@/data`; the barrel
  exports no fragment by name. Deep-import a fragment only to stay clear of the
  icon-bearing modules across a client boundary, and say so in a comment.
- Every fragment ends in `satisfies <Type>`, **never** a `: Type` annotation —
  an annotation silently widens the literal and drops excess-property checking.
  `as const satisfies` doesn't compile here (`readonly string[]` vs
  `string[]`).

**`experiences` is nested**: an entry is an *organization* with a `roles`
array. Everything that varies per role — title, location, employment, dates,
summary, highlights — lives on the role. An organization's overall date span
is **not** stored; `getExperienceSpan()` derives it, so it can't drift.

**`stack[].skills` are objects**, `{ name, featured?, icon? }`. The `featured`
flag is the only thing that decides what the home page summary shows; `/stack`
shows everything. `icon` is a `react-icons` component, set only where a real
brand/tech icon exists — not every skill has one.

**`certifications` is grouped like `stack`** — `CertificationCategory[]`, each
holding a `certifications` array. Unlike `stack`, there's no `featured` flag:
the home summary shows every certification (flat, uncategorized); only
`/certifications` groups them by category. `skills` on a certification are
plain strings (the issuer's own competency tags), not a reference into
`stack` — the two lists overlap in places but aren't the same vocabulary.

**`awards` is flat** — a plain `Award[]`, newest first, with no category layer
and no `featured` flag. What separates the two views is depth, not filtering:
the home summary shows date, title and issuer only, and `/awards` adds the
`description`. An award is not a `Certification` — there's nothing to verify,
so no credential ID, expiry or URL. `title` is the React key (there's no
`credentialId` here), so keep titles distinct.

### Section registry

`src/lib/navigation.ts` exports `SECTIONS`. It drives section numbering, the
sidebar nav, the scroll-spy hook, the ⌘K palette **and the sitemap**. A section
with a `detailHref` gets a "View All" link — rendered by `Section` itself in
the header row, not by the section component — and a sitemap entry
automatically.

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
> into a client component will fail to serialize. `SocialLinks` is shown only
> in the hero (a Server Component, so this is a non-issue there); the ⌘K
> palette, which is `"use client"`, gets plain `{ label, url }` pairs instead
> of the component itself.

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
nav list is declared once. The root layout offsets main with `lg:pl-56`
because the rail is out of flow.

`src/components/layout/section.tsx` owns the numbered section header (mono
label, hairline rule, and the "View All" link for sections with a
`detailHref`) that every home section uses. It is deliberately a single
column: the section numbers moved to the sidebar, so a second sticky left
rail here would just compete with it.

`Container` is the one shared measure for main and the detail pages. There is
no site footer — the hero's contact CTA and the ⌘K palette cover it.

### Reuse before creating

Before writing a new component, check `src/components/` — `TagList`,
`MetaList`, `DateRange`, `SocialLinks`, `CopyButton`, `ViewAllLink`,
`PageHeader`, `ExperienceTable`, `ExperienceTimeline` and
`OrganizationLogoLink` already exist. The home page's Experience summary is
`ExperienceTable`; `ExperienceTimeline` (organization rail + per-role
accordion) is used only by `/experiences` — they're separate components, not
one shared with a prop switch. `OrganizationLogoLink` (an `Avatar` with an
initials fallback, optionally linked to the org's site) backs both.
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
