import type { Metadata } from "next";
import { TrophyIcon } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { DATA } from "@/data";
import { formatMonthYear, toIsoMonth } from "@/lib/format";
import { buildBreadcrumbGraph } from "@/lib/json-ld";
import { getSectionIndex } from "@/lib/navigation";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Honors & Awards";
const COUNT = DATA.awards.length;
const DESCRIPTION = `Recognition for academic and competitive programming work — ${COUNT} ${COUNT === 1 ? "award" : "awards"}.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/awards") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/awards"),
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * Every award, with the citation the home page summary leaves out. The card is
 * inline rather than extracted: unlike `CertificationCard`, which home and
 * `/certifications` share, the home summary here is a different shape, so this
 * has exactly one call site.
 */
export default function AwardsPage() {
  return (
    <>
      <PageHeader index={getSectionIndex("awards")} title={TITLE} description={DESCRIPTION} />

      {/* Divider is full-bleed, matching how <Section> separates the home page. */}
      <div className="border-t border-border">
        <Container className="py-12 sm:py-16">
          <ul className="grid gap-4 sm:grid-cols-2">
            {DATA.awards.map((award) => (
              <li key={award.title}>
                <article className="flex h-full flex-col gap-4 border border-border bg-card p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="label-mono text-muted-foreground/60">{award.issuer}</span>
                      {/* h2, not h3: nothing sits between this and PageHeader's h1. */}
                      <h2 className="font-heading text-lg tracking-tight text-pretty text-foreground">
                        {award.title}
                      </h2>
                    </div>
                    <TrophyIcon aria-hidden className="size-5 shrink-0 text-muted-foreground" />
                  </div>

                  <time
                    dateTime={toIsoMonth(award.issueDate)}
                    className="label-mono text-muted-foreground"
                  >
                    {formatMonthYear(award.issueDate)}
                  </time>

                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {award.description}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <JsonLd
        data={buildBreadcrumbGraph([{ name: TITLE, path: "/awards" }])}
        id="breadcrumb-schema"
      />
    </>
  );
}
