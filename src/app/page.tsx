import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { AwardsSection } from "@/components/portfolio/awards-section";
import { CertificationsSection } from "@/components/portfolio/certifications-section";
import { EducationSection } from "@/components/portfolio/education-section";
import { ExperienceSection } from "@/components/portfolio/experience-section";
import { Hero } from "@/components/portfolio/hero";
import { OverviewSection } from "@/components/portfolio/overview-section";
import { StackSection } from "@/components/portfolio/stack-section";
import { buildJsonLdGraph } from "@/lib/json-ld";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

/**
 * The portfolio. A Server Component — every interactive piece (theme toggle,
 * command palette, copy buttons, sidebar nav) is an isolated client leaf, so
 * this page ships as static HTML.
 *
 * The `Person` + `ProfilePage` graph lives here rather than in the root
 * layout: `ProfilePage` names the home URL, so emitting it site-wide would
 * have `/experiences` and `/stack` each claiming to be the profile page.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <OverviewSection />
      <ExperienceSection />
      <StackSection />
      <EducationSection />
      <CertificationsSection />
      <AwardsSection />

      <JsonLd data={buildJsonLdGraph()} id="profile-schema" />
    </>
  );
}
