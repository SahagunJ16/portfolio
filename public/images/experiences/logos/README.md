# Organization logos

Served from the site root, so `public/images/experiences/logos/foo.png` is
reachable at `/images/experiences/logos/foo.png`. A separate directory from
`public/images/` because these are per-organization marks, not site imagery.

## Current files

| File | Organization | Used by |
|---|---|---|
| `mc-security.png` | MC Security Co., Ltd. | Experience table, timeline |
| `collins-aerospace.png` | Collins Aerospace | Experience table, timeline |
| `kinpo-electronics.png` | Kinpo Electronics (Philippines), Inc. | Experience table, timeline |
| `nexperia.png` | Nexperia | Experience table, timeline |

## Adding a logo

The filename is not guessed at runtime. Drop the file here, then set it on
the matching organization's `logo` field in
[`src/data/experiences.ts`](../../../src/data/experiences.ts), e.g.:

```ts
{
  organization: "Example Inc.",
  website: "https://example.com",
  logo: "example-inc.png",
  roles: [...],
}
```

- **Naming**: kebab-case slug of the organization name, e.g. `example-inc.png`.
- **Format**: SVG preferred; PNG with a transparent background otherwise.
- **Aspect ratio**: keep it roughly square — logos render inside a circular
  `Avatar` with `object-cover`, so anything else gets centre-cropped.
- **Color**: keep the file in its real brand colors. The site desaturates it
  by default (monotone, matching the rest of the theme) and reveals the real
  color on hover/focus of the organization link — this is done with a CSS
  filter, so there's no need to prepare a separate monotone version.

`website` and `logo` are independent and both optional — the avatar always
renders, falling back to the organization's initial letter when no `logo` is
set. `website` set wraps the avatar in a link out to the organization's site.
