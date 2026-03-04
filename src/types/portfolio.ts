export interface ProfileName {
  first: string;
  last: string;
}

export interface Profile {
  name: ProfileName;
  role: string;
  role_summary: string;
  about: string[];
  email: string;
  /** Optional. URL of profile image (e.g. Vercel Blob). If omitted, no avatar is shown. */
  avatar?: string;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string;
}

export interface Social {
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Position {
  title: string;
  descriptions: string[];
  start: string;
  end: string;
}

export interface Experience {
  company: string;
  company_url: string;
  location: string;
  positions: Position[];
}

export interface PortfolioData {
  seo: { keywords: string };
  profile: Profile;
  socials: Social[];
  skills: Skill[];
  experiences: Experience[];
}
