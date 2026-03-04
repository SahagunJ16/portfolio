# Osweng's Personal Portfolio

A minimal, personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, and DaisyUI. Content is loaded from a single JSON file stored in [Vercel Blob](https://vercel.com/docs/storage/vercel-blob), so the data can be updated without redeploying.

## Features

- **Fast & lightweight** – Next.js 16, React 19
- **Responsive** – Mobile-first layout
- **SEO-friendly** – Metadata and semantic HTML
- **Dark/Light mode** – Theme toggle with system preference support
- **Data-driven** – Profile (including avatar), about, skills, and experience from one JSON in Vercel Blob
- **Easy to update** – Change copy via Blob; no code changes needed

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [DaisyUI](https://daisyui.com/)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) for content
- [Iconify](https://iconify.design/) for icons

## Getting started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### 1. Install

```bash
npm install
```

### 2. Environment variables

Copy the example env file and set the Blob URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

- **`PORTFOLIO_DATA_URL`** (required) – Full URL of the portfolio JSON in Vercel Blob (e.g. `https://xxxxx.private.blob.vercel-storage.com/data.json`).
- **`BLOB_READ_WRITE_TOKEN`** (optional for local) – Vercel sets this when the Blob store is linked. For local dev, add it if using a private Blob.

See [.env.example](.env.example) for comments.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Data shape

The app expects a JSON file in Vercel Blob with this structure (see [src/types/portfolio.ts](src/types/portfolio.ts) for full types):

- **seo** (optional) – `title`, `description`, `keywords`. If omitted, title/description are derived from profile; keywords get the profile name appended.
- **profile** – `name`, `role`, `role_summary`, `about` (string or string[]), `email`, optional `avatar` (URL of profile image, e.g. from Vercel Blob).
- **socials** – `{ name, url }[]`
- **skills** – `{ name, icon }[]` (icon: Iconify icon name, e.g. `mdi:language-typescript`)
- **experiences** – companies and positions with `descriptions`, `start`, `end`

Only `profile` is required; other sections can be empty arrays or omitted. Upload a profile image to the same Blob store and set `profile.avatar` to that blob URL.

## Project structure

```
src/
├── app/                    # App Router routes
│   ├── layout.tsx          # Root layout, metadata, Navbar/Footer
│   ├── page.tsx            # Home (profile, about, skills, experience)
│   └── globals.css         # Tailwind + DaisyUI + custom styles
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── sections/           # Profile, About, Skills, Experiences
│   └── ui/                 # ExpandableText, Marquee
├── lib/
│   └── portfolio.ts        # getPortfolioData() – fetches & caches Blob JSON
└── types/
    └── portfolio.ts        # TypeScript interfaces for portfolio data
```

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Deploy

Deploy on [Vercel](https://vercel.com):

1. Push the repo to GitHub.
2. Import the project in Vercel and link the repo.
3. Create a Vercel Blob store, upload `data.json`, and add the blob URL as `PORTFOLIO_DATA_URL` in Vercel project settings (Environment Variables). Link the store so `BLOB_READ_WRITE_TOKEN` is set automatically.
4. Deploy.
