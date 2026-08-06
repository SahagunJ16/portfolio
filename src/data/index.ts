import { certifications } from "./certifications";
import { contact } from "./contact";
import { educations } from "./educations";
import { experiences } from "./experiences";
import { overview } from "./overview";
import { profile } from "./profile";
import { socials } from "./socials";
import { stack } from "./stack";
import type { PortfolioData } from "./types";

export type * from "./types";

/**
 * Every piece of content on the site, one file per key.
 *
 * Import `DATA` from `@/data`. Deep-import a fragment only to stay clear of the
 * icon-bearing modules (`socials`, `stack`, `certifications`) across a client
 * boundary — and say so in a comment when you do.
 */
export const DATA = {
  profile,
  contact,
  socials,
  overview,
  experiences,
  educations,
  stack,
  certifications,
} satisfies PortfolioData;
