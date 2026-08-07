/**
 * Single source of truth for the home page's sections.
 *
 * Consumed by the page composition, the command palette, the sitemap and — via
 * `getNavRoutes()` — the site sidebar. Deliberately free of icons or component
 * references so it stays serializable across the server/client boundary —
 * unlike `DATA`, whose `socials[].icon` holds React component references.
 *
 * Sections are not numbered. That was removed deliberately; don't reintroduce
 * `01 —` style index labels here or in the components that read this.
 */
export interface SectionDefinition {
  /** DOM id and anchor target on the home page. */
  id: string;
  label: string;
  /** Short description used by the command palette. */
  hint: string;
  /**
   * Route of the dedicated full page, when the home section is only a summary.
   * Drives the section's "view all" link, the palette entries and the sitemap.
   */
  detailHref?: string;
  /**
   * Accessible name for the section header's "View All" link, and the label
   * shown in the ⌘K palette's "Pages" group. The link's *visible* text is
   * always the literal "View All" — this exists because that text is
   * intentionally generic, and two "View All" palette rows would otherwise
   * be indistinguishable.
   */
  detailLabel?: string;
}

// `detailHref` is spelled out as `undefined` where there is no detail page:
// with `as const` an omitted key wouldn't exist on those union members, and
// every consumer would need an `in` check to read it.
export const SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    hint: "Who I am and what I build",
    detailHref: undefined,
    detailLabel: undefined,
  },
  {
    id: "experience",
    label: "Experience",
    hint: "Roles, projects and impact",
    detailHref: "/experiences",
    detailLabel: "All experiences",
  },
  {
    id: "stack",
    label: "Stack",
    hint: "Languages, frameworks and tools",
    detailHref: "/stack",
    detailLabel: "All tools",
  },
  {
    id: "education",
    label: "Education",
    hint: "Degree and coursework",
    detailHref: undefined,
    detailLabel: undefined,
  },
  {
    id: "certifications",
    label: "Certifications",
    hint: "Credentials and certifications",
    detailHref: "/certifications",
    detailLabel: "All certifications",
  },
  {
    id: "awards",
    label: "Honors & Awards",
    hint: "Recognition and competition placements",
    detailHref: "/awards",
    detailLabel: "All awards",
  },
] as const satisfies readonly SectionDefinition[];

export type SectionId = (typeof SECTIONS)[number]["id"];

export interface NavRoute {
  href: string;
  label: string;
}

/**
 * The site sidebar's nav list: the home page, then every section that has a
 * route of its own. Derived from the registry, so a new detail page joins the
 * nav without a second list to keep in step.
 *
 * Uses `label` ("Experience"), not the `detailLabel` ("All experiences") that
 * `getDetailRoutes()` returns — these read as destinations, not as links out
 * of a summary.
 */
export function getNavRoutes(): NavRoute[] {
  return [
    { href: "/", label: "Overview" },
    ...SECTIONS.flatMap((section) =>
      section.detailHref ? [{ href: section.detailHref, label: section.label }] : []
    ),
  ];
}

export interface DetailRoute {
  href: string;
  /** Link wording, e.g. "All experiences". */
  label: string;
  /** The section it expands on, e.g. "Experience". */
  sectionLabel: string;
}

/** The section's dedicated page, if it has one. */
export function getSectionDetail(id: SectionId): DetailRoute | undefined {
  const section = SECTIONS.find((candidate) => candidate.id === id);

  return section?.detailHref && section.detailLabel
    ? { href: section.detailHref, label: section.detailLabel, sectionLabel: section.label }
    : undefined;
}

/** Every standalone route derived from the registry — used by the sitemap. */
export function getDetailRoutes(): DetailRoute[] {
  return SECTIONS.flatMap((section) =>
    section.detailHref && section.detailLabel
      ? [
          {
            href: section.detailHref,
            label: section.detailLabel,
            sectionLabel: section.label,
          },
        ]
      : []
  );
}
