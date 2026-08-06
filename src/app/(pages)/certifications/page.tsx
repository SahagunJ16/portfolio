import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { CertificationCard } from "@/components/portfolio/certification-card";
import { DATA } from "@/data";
import { formatIndex } from "@/lib/format";
import { buildBreadcrumbGraph } from "@/lib/json-ld";
import { getSectionIndex } from "@/lib/navigation";
import { getAllCertifications } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Certifications";
const CATEGORY_COUNT = DATA.certifications.length;
const DESCRIPTION = `Credentials earned — ${getAllCertifications().length} across ${CATEGORY_COUNT} ${CATEGORY_COUNT === 1 ? "category" : "categories"}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/certifications") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/certifications"),
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Every certification, grouped by category. The home page summary links
 * here and shows the same cards as a flat, uncategorized list.
 */
export default function CertificationsPage() {
  return (
    <>
      <PageHeader index={getSectionIndex("certifications")} title={TITLE} description={DESCRIPTION} />

      {/* Divider is full-bleed, matching how <Section> separates the home page. */}
      <div className="border-t border-border">
        <Container className="py-12 sm:py-16">
          <ul className="flex flex-col">
            {DATA.certifications.map((category, index) => (
              <li
                key={category.category}
                className="grid gap-3 border-b border-border py-6 first:pt-0 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
              >
                <div className="flex items-baseline gap-2">
                  <span className="label-mono text-muted-foreground/60" aria-hidden>
                    {formatIndex(index + 1)}
                  </span>
                  <h2 className="label-mono text-foreground">{category.category}</h2>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                  {category.certifications.map((certification) => (
                    <li key={certification.credentialId}>
                      <CertificationCard certification={certification} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <JsonLd
        data={buildBreadcrumbGraph([{ name: TITLE, path: "/certifications" }])}
        id="breadcrumb-schema"
      />
    </>
  );
}
