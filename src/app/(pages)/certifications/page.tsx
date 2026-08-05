import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { TagList } from "@/components/tag-list";
import { DATA } from "@/data/data";
import { formatIndex, formatMonthYear, toIsoMonth } from "@/lib/format";
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
 * here and shows the same records as a flat, uncategorized list.
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

                <ul className="flex flex-col gap-6">
                  {category.certifications.map((certification) => (
                    <li key={certification.credentialId} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <a
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-heading text-lg text-pretty text-foreground underline-offset-4 hover:underline"
                        >
                          {certification.name}
                        </a>

                        <span className="label-mono shrink-0 text-muted-foreground">
                          <time dateTime={toIsoMonth(certification.issueDate)}>
                            {formatMonthYear(certification.issueDate)}
                          </time>
                          {certification.expirationDate && (
                            <>
                              {" – "}
                              <time dateTime={toIsoMonth(certification.expirationDate)}>
                                {formatMonthYear(certification.expirationDate)}
                              </time>
                            </>
                          )}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {certification.issuer} · Credential ID {certification.credentialId}
                      </p>

                      <TagList
                        items={certification.skills.map((skill) => ({ name: skill }))}
                        label={`Skills for ${certification.name}`}
                        className="gap-2.5"
                      />
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
