import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { TagList } from "@/components/tag-list";
import { DATA } from "@/data/data";
import { formatIndex } from "@/lib/format";
import { buildBreadcrumbGraph } from "@/lib/json-ld";
import { getSectionIndex } from "@/lib/navigation";
import { getAllSkills } from "@/lib/portfolio";
import { absoluteUrl } from "@/lib/seo";

const TITLE = "Stack";
const DESCRIPTION = `Every language, framework, service and tool I work with — ${getAllSkills().length} in ${DATA.stack.length} categories.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/stack") },
  openGraph: {
    type: "website",
    url: absoluteUrl("/stack"),
    title: TITLE,
    description: DESCRIPTION,
  },
};

/**
 * The complete toolkit. The home page shows only the skills flagged
 * `featured` in the data.
 */
export default function StackPage() {
  return (
    <>
      <PageHeader index={getSectionIndex("stack")} title={TITLE} description={DESCRIPTION} />

      {/* Divider is full-bleed, matching how <Section> separates the home page. */}
      <div className="border-t border-border">
        <Container className="py-12 sm:py-16">
          <ul className="flex flex-col">
            {DATA.stack.map((category, index) => (
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
                <TagList
                  items={category.skills}
                  label={category.category}
                  className="gap-2.5"
                />
              </li>
            ))}
          </ul>
        </Container>
      </div>

      <JsonLd
        data={buildBreadcrumbGraph([{ name: TITLE, path: "/stack" }])}
        id="breadcrumb-schema"
      />
    </>
  );
}
