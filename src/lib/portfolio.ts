import {
  DATA,
  type Certification,
  type Experience,
  type ExperienceRole,
  type MonthYear,
  type Skill,
} from "@/data/data";
import { monthsBetween } from "@/lib/format";

/** Overall dates an organization was worked at, derived from its roles. */
export interface ExperienceSpan {
  start: MonthYear;
  /** `null` when any role there is still current. */
  end: MonthYear | null;
}

/** A role paired with the organization it was held at. */
export interface RoleWithOrganization {
  organization: string;
  role: ExperienceRole;
}

function isEarlier(a: MonthYear, b: MonthYear): boolean {
  return a.year !== b.year ? a.year < b.year : a.month < b.month;
}

function isLater(a: MonthYear, b: MonthYear): boolean {
  return a.year !== b.year ? a.year > b.year : a.month > b.month;
}

/**
 * Earliest start and latest end across an organization's roles.
 *
 * Computed rather than stored on the data, so the header dates of a timeline
 * block can never disagree with the roles listed underneath it.
 */
export function getExperienceSpan(experience: Experience): ExperienceSpan {
  return experience.roles.reduce<ExperienceSpan>(
    (span, role) => ({
      start: isEarlier(role.start, span.start) ? role.start : span.start,
      // A single open-ended role keeps the whole organization open-ended.
      end:
        span.end === null || role.end === null
          ? null
          : isLater(role.end, span.end)
            ? role.end
            : span.end,
    }),
    { start: experience.roles[0].start, end: experience.roles[0].end }
  );
}

/**
 * The newest role at an organization — what the home page summary shows.
 * Chosen by start date rather than by array position, so reordering the data
 * can't quietly change which role is presented as current.
 */
export function getLatestRole(experience: Experience): ExperienceRole {
  return experience.roles.reduce((latest, role) =>
    isLater(role.start, latest.start) ? role : latest
  );
}

export interface ExperienceSummary {
  experience: Experience;
  latestRole: ExperienceRole;
  span: ExperienceSpan;
}

/**
 * One row per organization — the home page summary table: latest role's
 * title, but the full tenure's date span.
 */
export function getExperienceSummaries(
  experiences: readonly Experience[]
): ExperienceSummary[] {
  return experiences.map((experience) => ({
    experience,
    latestRole: getLatestRole(experience),
    span: getExperienceSpan(experience),
  }));
}

/** Every role across every organization, flattened, newest organization first. */
export function getAllRoles(): RoleWithOrganization[] {
  return DATA.experiences.flatMap((experience) =>
    experience.roles.map((role) => ({ organization: experience.organization, role }))
  );
}

/** The role currently held, if any. */
export function getCurrentRole(): RoleWithOrganization | undefined {
  return getAllRoles().find((entry) => entry.role.end === null);
}

export function getFullName(): string {
  return `${DATA.profile.first_name} ${DATA.profile.last_name}`;
}

export function getInitials(): string {
  return `${DATA.profile.first_name[0]}${DATA.profile.last_name[0]}`.toUpperCase();
}

/** The primary headline, used as the job title in metadata and structured data. */
export function getPrimaryHeadline(): string {
  return DATA.overview.headlines[0];
}

/** City and region only — the postal code is deliberately not surfaced. */
export function getPublicLocation(): string {
  return DATA.contact.address.replace(/\s+\d{4,}$/, "");
}

/**
 * Whole years of professional experience, measured from the earliest role.
 * Computed rather than hardcoded so it never goes stale.
 */
export function getYearsOfExperience(): number {
  const roles = getAllRoles();

  const earliest = roles.reduce<MonthYear>(
    (earliestSoFar, entry) =>
      isEarlier(entry.role.start, earliestSoFar) ? entry.role.start : earliestSoFar,
    roles[0].role.start
  );

  const now = new Date();
  const months = monthsBetween(earliest, {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  return Math.max(Math.floor(months / 12), 1);
}

/** The skills flagged `featured`, for the home page stack summary. */
export function getFeaturedSkills(): Skill[] {
  return DATA.stack.flatMap((category) =>
    category.skills.filter((skill) => skill.featured)
  );
}

/** Every skill name across all categories, de-duplicated. */
export function getAllSkills(): string[] {
  return [
    ...new Set(DATA.stack.flatMap((category) => category.skills.map((skill) => skill.name))),
  ];
}

/** The organizations worked at, most recent first. */
export function getOrganizations(): string[] {
  return DATA.experiences.map((experience) => experience.organization);
}

/** Every certification across all categories, in data order. */
export function getAllCertifications(): Certification[] {
  return DATA.certifications.flatMap((category) => category.certifications);
}
