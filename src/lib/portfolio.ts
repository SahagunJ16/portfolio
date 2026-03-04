import { cache } from "react";
import { get } from "@vercel/blob";
import type { Profile, Seo, Experience, Skill, Social } from "@/types/portfolio";

/** Raw shape of JSON stored in Vercel Blob (fields may be missing) */
interface RawPortfolioData {
  seo?: { title?: string; description?: string; keywords?: string };
  profile?: Profile;
  socials?: Social[];
  skills?: Skill[];
  experiences?: Experience[];
}

/** Result of getPortfolioData() with derived SEO */
export interface PortfolioData {
  profile: Profile;
  seo: Seo;
  socials: Social[];
  skills: Skill[];
  experiences: Experience[];
}

function buildSeo(raw: RawPortfolioData, profile: Profile): Seo {
  const name = `${profile.name.first} ${profile.name.last}`;
  const defaultTitle = `${name} | ${profile.role}`;
  const defaultDescription = `${name}'s portfolio`;
  const keywordsFromData = raw.seo?.keywords?.trim() ?? "";
  const keywordsWithName = [keywordsFromData, name].filter(Boolean).join(", ");

  return {
    title: raw.seo?.title?.trim() ?? defaultTitle,
    description: raw.seo?.description?.trim() ?? defaultDescription,
    keywords: keywordsWithName || defaultTitle,
  };
}

/**
 * Fetches portfolio data from Vercel Blob (private store).
 * Cached per request via React cache() so multiple callers only trigger one fetch.
 *
 * Requires env:
 * - BLOB_READ_WRITE_TOKEN (Vercel sets this when Blob store is linked)
 * - PORTFOLIO_DATA_URL – full URL of the blob (e.g. https://xxx.private.blob.vercel-storage.com/data.json)
 */
export const getPortfolioData = cache(async (): Promise<PortfolioData> => {
  const url = process.env.PORTFOLIO_DATA_URL;
  if (!url) {
    throw new Error(
      "Missing PORTFOLIO_DATA_URL. Set it to your Vercel Blob JSON URL (e.g. https://xxx.private.blob.vercel-storage.com/data.json)"
    );
  }

  const result = await get(url, { access: "private" });
  if (!result || result.statusCode !== 200 || !result.stream) {
    throw new Error("Failed to fetch portfolio data from Blob");
  }

  const text = await new Response(result.stream).text();
  const raw = JSON.parse(text) as RawPortfolioData;

  if (!raw.profile) {
    throw new Error("Portfolio data is missing required field: profile");
  }

  const seo = buildSeo(raw, raw.profile);

  return {
    profile: raw.profile,
    seo,
    socials: Array.isArray(raw.socials) ? raw.socials : [],
    skills: Array.isArray(raw.skills) ? raw.skills : [],
    experiences: Array.isArray(raw.experiences) ? raw.experiences : [],
  };
});
