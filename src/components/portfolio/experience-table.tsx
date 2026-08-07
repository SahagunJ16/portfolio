import { DateRange } from "@/components/date-range";
import { OrganizationLogoLink } from "@/components/portfolio/organization-logo-link";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Experience } from "@/data";
import { getExperienceSummaries } from "@/lib/portfolio";

interface ExperienceTableProps {
  experiences: readonly Experience[];
}

/**
 * Home page summary: one row per organization, latest role only. The full
 * history — every role, every highlight — lives on `/experiences`.
 *
 * Two renders from the same `rows`, like `SiteSidebar`'s rail/drawer split: a
 * table from `sm` up, and a stacked card per organization below it, where a
 * three-column row would get too cramped to read.
 */
export function ExperienceTable({ experiences }: ExperienceTableProps) {
  const rows = getExperienceSummaries(experiences);

  return (
    <>
      <div className="hidden sm:block">
        <Table>
          <TableBody>
            {rows.map(({ experience, latestRole, span }) => (
              <TableRow key={experience.organization}>
                <TableCell className="py-3 pl-0 align-top">
                  <OrganizationLogoLink experience={experience} size="sm">
                    <span className="font-medium text-foreground">
                      {experience.organization}
                    </span>
                  </OrganizationLogoLink>
                </TableCell>
                <TableCell className="py-3 whitespace-normal text-foreground">
                  {latestRole.title}
                </TableCell>
                <TableCell className="py-3 pr-0 text-end">
                  {/*
                    flex-nowrap: DateRange's own layout is `flex flex-wrap`,
                    which stacks "Apr 2025 / – / Present" onto separate lines
                    once the column narrows — independent of this cell's
                    whitespace-nowrap, which only affects text, not flex
                    children. Forcing nowrap here keeps the row intact so the
                    table's overflow-x-auto wrapper scrolls horizontally
                    instead.
                  */}
                  <DateRange
                    start={span.start}
                    end={span.end}
                    className="flex-nowrap"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ul className="flex flex-col sm:hidden">
        {rows.map(({ experience, latestRole, span }) => (
          <li
            key={experience.organization}
            className="flex flex-col gap-1 border-b border-border py-3 first:pt-0 last:border-b-0"
          >
            <div className="flex items-baseline justify-between gap-3">
              <OrganizationLogoLink experience={experience}>
                <span className="font-medium text-foreground">
                  {experience.organization}
                </span>
              </OrganizationLogoLink>
              <DateRange
                start={span.start}
                end={span.end}
                className="shrink-0 flex-nowrap text-muted-foreground"
              />
            </div>
            <span className="text-foreground">{latestRole.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
