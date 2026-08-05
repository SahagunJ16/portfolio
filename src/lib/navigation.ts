/**
 * Single source of truth for the page's sections.
 *
 * Consumed by the page composition, the site sidebar, the scroll-spy hook, the
 * command palette and the sitemap. Deliberately free of icons or component
 * references so it stays serializable across the server/client boundary —
 * unlike `DATA`, whose `socials[].icon` holds React component references.
 */
export interface SectionDefinition {
  /** DOM id and anchor target on the home page. */
  id: string;
  /** Displayed heading, e.g. "Overview". */
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
    id: "contact",
    label: "Contact",
    hint: "How to reach me",
    detailHref: undefined,
    detailLabel: undefined,
  },
] as const satisfies readonly SectionDefinition[];

export type SectionId = (typeof SECTIONS)[number]["id"];

/** 1-based position, rendered as the "01 —" index label. */
export function getSectionIndex(id: SectionId): number {
  return SECTIONS.findIndex((section) => section.id === id) + 1;
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
