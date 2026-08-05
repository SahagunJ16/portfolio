import { DateRange } from "@/components/date-range";
import { OrganizationLogoLink } from "@/components/portfolio/organization-logo-link";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Experience } from "@/data/data";
import { getExperienceSummaries } from "@/lib/portfolio";

interface ExperienceTableProps {
  experiences: readonly Experience[];
}

/**
 * Home page summary: one row per organization, latest role only. The full
 * history — every role, every highlight — lives on `/experiences`.
 */
export function ExperienceTable({ experiences }: ExperienceTableProps) {
  const rows = getExperienceSummaries(experiences);

  return (
    <Table>
      <TableBody>
        {rows.map(({ experience, latestRole, span }) => (
          <TableRow key={experience.organization}>
            <TableCell className="py-3 pl-0 align-top">
              <OrganizationLogoLink experience={experience}>
                <span className="font-medium text-foreground">
                  {experience.organization}
                </span>
              </OrganizationLogoLink>
            </TableCell>
            <TableCell className="py-3 whitespace-normal text-foreground">
              {latestRole.title}
            </TableCell>
            <TableCell className="py-3 pr-0">
              {/*
                flex-nowrap: DateRange's own layout is `flex flex-wrap`, which
                stacks "Apr 2025 / – / Present" onto separate lines once the
                column narrows — independent of this cell's whitespace-nowrap,
                which only affects text, not flex children. Forcing nowrap
                here keeps the row intact so the table's overflow-x-auto
                wrapper scrolls horizontally instead.
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
  );
}
