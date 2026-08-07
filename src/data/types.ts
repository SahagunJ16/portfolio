import type { IconType } from "react-icons";

export interface Profile {
  first_name: string;
  last_name: string;
  birth_date: string;
}

export interface Contact {
  address: string;
  email: string;
  mobile: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: IconType;
}

export interface Overview {
  headlines: string[];
  description: string[];
}

export interface MonthYear {
  month: number;
  year: number;
}

export type WorkLocationType = "On-site" | "Remote" | "Hybrid";
export type EmploymentType = "Full-time" | "Internship";

/**
 * One post held at an organization. Everything that can change between roles
 * at the same employer lives here — including `location`, since a role can go
 * remote without the employer moving.
 */
export interface ExperienceRole {
  title: string;
  location: {
    address: string;
    type: WorkLocationType;
  };
  employment: EmploymentType;
  start: MonthYear;
  end: MonthYear | null;
  summary: string;
  highlights: string[];
}

/**
 * One organization and every role held there.
 *
 * The overall date span is deliberately *not* stored — it is derived from the
 * roles by `getExperienceSpan()`, so it cannot drift out of sync with them.
 */
export interface Experience {
  organization: string;
  /** Organization website, e.g. "https://example.com". Renders as plain text when absent. */
  website?: string;
  /** Filename under public/images/experiences/logos/, e.g. "example.png". Shown as an Avatar with an initials fallback when absent. */
  logo?: string;
  /** Newest first. */
  roles: ExperienceRole[];
}

export interface Education {
  school: string;
  address: string;
  degree: string;
  field: string;
  start: MonthYear;
  end: MonthYear;
  grade: string | null;
  description: string;
}

export interface Skill {
  name: string;
  /** Surfaced in the home page stack summary. Everything shows on /stack. */
  featured?: boolean;
  /** Monotone tech/brand icon, when a real one exists in react-icons. Renders via currentColor — no extra styling needed to stay on-theme. */
  icon?: IconType;
}

export interface StackCategory {
  category: string;
  skills: Skill[];
}

export interface Certification {
  name: string;
  issuer: string;
  /** Monotone brand icon for the issuer, when a real one exists in react-icons. Falls back to a generic badge icon. */
  issuerIcon?: IconType;
  issueDate: MonthYear;
  /** `null` means the credential does not expire. */
  expirationDate: MonthYear | null;
  credentialId: string;
  credentialUrl: string;
  /** Competencies the issuer associates with this credential. */
  skills: string[];
}

export interface CertificationCategory {
  category: string;
  certifications: Certification[];
}

/**
 * A recognition received — academic honors, competition placements. Distinct
 * from a `Certification`: there is nothing to verify, so no credential ID,
 * expiry or verification URL.
 */
export interface Award {
  title: string;
  issuer: string;
  issueDate: MonthYear;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  contact: Contact;
  socials: SocialLink[];
  overview: Overview;
  experiences: Experience[];
  educations: Education[];
  stack: StackCategory[];
  certifications: CertificationCategory[];
  awards: Award[];
}
