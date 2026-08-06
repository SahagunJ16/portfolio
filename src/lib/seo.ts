import { DATA } from "@/data";
import {
  getAllSkills,
  getFullName,
  getPrimaryHeadline,
  getPublicLocation,
} from "@/lib/portfolio";

/**
 * Absolute origin for canonical URLs, sitemap entries and OG image URLs.
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment; see `.env.example`.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = `${getFullName()} — ${getPrimaryHeadline()}`;

export const SITE_TITLE = getFullName();

export const SITE_DESCRIPTION = DATA.overview.description[0];

export const SITE_LOCALE = "en_US";

/** Resume slot — drop the PDF at `public/resume.pdf` to activate it. */
export const RESUME_PATH = "/resume.pdf";

/** Avatar source — square image; the UI falls back to initials if missing. */
export const AVATAR_PATH = "/images/avatar.png";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Search keywords derived from the portfolio data rather than a hand-kept
 * list, so they track the real content.
 */
export const SITE_KEYWORDS = [
  getFullName(),
  ...DATA.overview.headlines,
  "Software Engineer",
  "Full-Stack Developer",
  "Portfolio",
  getPublicLocation(),
  ...getAllSkills(),
];
