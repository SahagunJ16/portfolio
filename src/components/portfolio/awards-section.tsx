import { Section } from "@/components/layout/section";
import { DATA } from "@/data";
import { formatMonthYear, toIsoMonth } from "@/lib/format";

/**
 * Home page summary: every award as a hairline-separated row — date, title,
 * issuer. The descriptions are deliberately held back for `/awards`, which is
 * what keeps this a summary rather than a second copy of the detail page.
 */
export function AwardsSection() {
  return (
    <Section
      id="awards"
      label="Honors & Awards"
      description="Recognition from academic and industry programming competitions."
      viewAllCount={DATA.awards.length}
    >
      <ul className="flex flex-col">
        {DATA.awards.map((award) => (
          <li
            key={award.title}
            className="grid gap-1 border-b border-border py-5 first:pt-0 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-6"
          >
            <time
              dateTime={toIsoMonth(award.issueDate)}
              className="label-mono text-muted-foreground/60"
            >
              {formatMonthYear(award.issueDate)}
            </time>

            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-base tracking-tight text-pretty text-foreground">
                {award.title}
              </h3>
              <span className="label-mono text-muted-foreground">{award.issuer}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
