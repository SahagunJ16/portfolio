import { DATA } from "@/data";
import { toIsoMonth, toExternalUrl } from "@/lib/format";
import {
  getAllRoles,
  getAllSkills,
  getCurrentRole,
  getFullName,
  getPrimaryHeadline,
  getPublicLocation,
} from "@/lib/portfolio";
import { absoluteUrl, AVATAR_PATH, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

const PERSON_ID = absoluteUrl("/#person");

/**
 * Splits `"City, Region, Country 1234"` into schema.org PostalAddress parts.
 * Any trailing postal code is dropped — it is never published.
 */
function toPostalAddress(address: string) {
  const parts = address.split(",").map((part) => part.trim());
  const country = parts.at(-1)?.replace(/\s+\d{4,}$/, "");

  return {
    "@type": "PostalAddress",
    addressLocality: parts.at(0),
    addressRegion: parts.length > 2 ? parts.at(-2) : undefined,
    addressCountry: country,
  };
}

function toOrganization(name: string, address: string) {
  return {
    "@type": "Organization",
    name,
    address: toPostalAddress(address),
  };
}

/**
 * `Person` schema describing the portfolio owner. Emitted once and referenced
 * by `@id` from the `ProfilePage` node so search engines resolve them as one
 * entity rather than two.
 */
export function buildPersonSchema() {
  const current = getCurrentRole();

  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: getFullName(),
    givenName: DATA.profile.first_name,
    familyName: DATA.profile.last_name,
    jobTitle: getPrimaryHeadline(),
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    image: absoluteUrl(AVATAR_PATH),
    email: `mailto:${DATA.contact.email}`,
    address: toPostalAddress(getPublicLocation()),
    sameAs: DATA.socials.map((social) => toExternalUrl(social.url)),
    knowsAbout: getAllSkills(),
    worksFor: current
      ? toOrganization(current.organization, current.role.location.address)
      : undefined,
    hasOccupation: getAllRoles().map(({ organization, role }) => ({
      "@type": "Occupation",
      name: role.title,
      occupationLocation: toPostalAddress(role.location.address),
      description: role.summary,
      hiringOrganization: toOrganization(organization, role.location.address),
    })),
    alumniOf: DATA.educations.map((education) => ({
      "@type": "EducationalOrganization",
      name: education.school,
      address: toPostalAddress(education.address),
    })),
  };
}

/**
 * `ProfilePage` wrapper. Google uses this to understand that the page *is*
 * a profile for the person described above.
 *
 * Emitted only on `/` — it hardcodes the home URL, so putting it in the root
 * layout would have every detail route claiming to be the profile page.
 */
export function buildProfilePageSchema() {
  const [firstEducation] = DATA.educations;

  return {
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profile"),
    url: absoluteUrl("/"),
    name: getFullName(),
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    dateCreated: firstEducation ? toIsoMonth(firstEducation.end) : undefined,
    mainEntity: { "@id": PERSON_ID },
  };
}

/** Combined home page graph, ready to be serialised into one ld+json script. */
export function buildJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildPersonSchema(), buildProfilePageSchema()],
  };
}

/**
 * `BreadcrumbList` for a detail route. The home page is always the first crumb,
 * so callers pass only the trail beneath it.
 */
export function buildBreadcrumbGraph(trail: readonly { name: string; path: string }[]) {
  const crumbs = [{ name: SITE_TITLE, path: "/" }, ...trail];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
