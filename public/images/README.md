# Images

Site image assets. Served from the site root, so `public/images/foo.png` is
reachable at `/images/foo.png`.

## Current files

| File | Size | Used by |
|---|---|---|
| `avatar.png` | 1600×1600 square | Hero avatar, `Person` structured data |

The hero renders this through `next/image` at 144px (288px for 2× displays), so
the full-resolution original is never shipped to visitors — the browser
receives a small resized variant. You do **not** need to downscale it yourself.

## Changing the avatar

The filename is not guessed at runtime. It is defined once as `AVATAR_PATH` in
[`src/lib/seo.ts`](../../src/lib/seo.ts). Replace the file and update that
constant if the name or extension changes.

- Keep it **square** — the avatar is a circle and anything else is centre-cropped.
- If the file is missing, the avatar falls back to the initials `JS` and the
  build still succeeds.
- Rendered grayscale by default, fading to full color on hover/focus — same
  CSS-filter trick as the organization logos (see
  [`experiences/logos/README.md`](experiences/logos/README.md)). No second
  file needed.

## Other slots

- `public/resume.pdf` — linked from the hero **Resume** button and the ⌘K
  palette. Defined as `RESUME_PATH` in `src/lib/seo.ts`.

## Note

The Open Graph share card is generated from text only and does not use this
image, so social previews work with or without it.
