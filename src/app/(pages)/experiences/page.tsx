import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { DATA } from "@/data";
import { buildBreadcrumbGraph } from "@/lib/json-ld";
import { getYearsOfExperience } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Experience";
const DESCRIPTION = `Every role across ${DATA.experiences.length} organizations and ${getYearsOfExperience()}+ years — the systems built, and what they changed.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/experiences") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/experiences"),
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * The full career history. Every role is expandable; the home page shows only
 * the current role at each organization.
 */
export default function ExperiencesPage() {
  return (
    <>
      <PageHeader title={TITLE} description={DESCRIPTION} />

      {/* Divider is full-bleed, matching how <Section> separates the home page. */}
      <div className="border-t border-border">
        <Container className="py-12 sm:py-16">
          <ExperienceTimeline experiences={DATA.experiences} />
        </Container>
      </div>

      <JsonLd
        data={buildBreadcrumbGraph([{ name: TITLE, path: "/experiences" }])}
        id="breadcrumb-schema"
      />
    </>
  );
}
