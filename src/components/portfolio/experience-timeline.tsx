import { DateRange } from "@/components/date-range";
import { OrganizationLogoLink } from "@/components/portfolio/organization-logo-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Experience, ExperienceRole } from "@/data/data";
import { getExperienceSpan } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

/**
 * Distance from the top of a row to the centre of its bullet. Declared once on
 * the list and read by both the bullet's offset and the connecting rule, so the
 * two can't drift apart. Tuned to the centre of the title's first line.
 */
const TIMELINE_LIST = "[--bullet-top:1.0625rem] flex flex-col";

/**
 * A row on the rule.
 *
 * The hairline is drawn per row as the segment joining *this* bullet to the
 * next one: it starts at the bullet and runs one row height, which lands
 * exactly on the following bullet. The last row draws nothing, so the line
 * terminates on the final bullet — and a lone role (every row on the home
 * summary) is last as well as first, so it correctly gets no line at all.
 */
const TIMELINE_ROW =
  "relative list-none pl-6 not-last:before:absolute not-last:before:top-(--bullet-top) not-last:before:left-0 not-last:before:h-full not-last:before:w-px not-last:before:bg-border";

interface ExperienceTimelineProps {
  experiences: readonly Experience[];
}

/**
 * Career timeline: an outer rail of organizations (bullet = avatar), each
 * with its roles strung along their own inner rule with a small bullet each.
 * The current role's bullet is filled.
 *
 * Composed from the shadcn `Accordion` and `Badge` rather than a bespoke
 * disclosure — shadcn/ui ships no timeline component, so the structure here is
 * custom but nothing interactive is reinvented.
 */
export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <ul aria-label="Career timeline" className="flex flex-col">
      {experiences.map((experience, index) => {
        const span = getExperienceSpan(experience);
        const isLast = index === experiences.length - 1;

        return (
          <li key={experience.organization} className="flex gap-4 sm:gap-5">
            <div className="flex flex-col items-center">
              <OrganizationLogoLink experience={experience} size="lg" />
              {!isLast && <span aria-hidden className="my-2 w-px flex-1 bg-border" />}
            </div>

            <div className="min-w-0 flex-1 pb-12 sm:pb-14">
              <header className="flex flex-col gap-1.5">
                <h2 className="font-heading text-xl tracking-tight text-pretty text-foreground">
                  {experience.organization}
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <DateRange start={span.start} end={span.end} />
                  <span aria-hidden className="text-border">
                    /
                  </span>
                  <span className="label-mono">{experience.roles[0].location.address}</span>
                </div>
              </header>

              {/* render={<ul />}: the Base UI root is a <div> by default, which
                  can't legally contain the <li> rows. */}
              <Accordion
                multiple
                render={<ul />}
                aria-label={`Roles at ${experience.organization}`}
                className={cn(TIMELINE_LIST, "mt-4")}
              >
                {experience.roles.map((role) => (
                  <AccordionItem
                    key={roleKey(role)}
                    value={roleKey(role)}
                    render={<li />}
                    className={cn(TIMELINE_ROW, "border-b-0")}
                  >
                    <Bullet isCurrent={role.end === null} />

                    <AccordionTrigger
                      headingLevel="h3"
                      className="gap-4 py-2.5 hover:no-underline"
                    >
                      <span className="flex min-w-0 flex-1 flex-col items-start gap-2 pr-2">
                        <span className="font-heading text-base leading-snug text-pretty text-foreground">
                          {role.title}
                        </span>
                        <RoleMeta role={role} showDuration />
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="pb-6">
                      <RoleDetail role={role} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Stable within an organization: a role's title plus when it started. */
function roleKey(role: ExperienceRole): string {
  return `${role.title}-${role.start.year}-${role.start.month}`;
}

function Bullet({ isCurrent }: { isCurrent: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-(--bullet-top) left-0 size-2 -translate-x-1/2 rounded-full border",
        isCurrent ? "border-foreground bg-foreground" : "border-border bg-background"
      )}
    />
  );
}

function RoleMeta({
  role,
  showDuration = false,
}: {
  role: ExperienceRole;
  showDuration?: boolean;
}) {
  return (
    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <DateRange start={role.start} end={role.end} showDuration={showDuration} />
      <Badge variant="outline" className="font-mono font-normal">
        {role.employment}
      </Badge>
      <Badge variant="ghost" className="font-mono font-normal text-muted-foreground">
        {role.location.type}
      </Badge>
    </span>
  );
}

function RoleDetail({ role }: { role: ExperienceRole }) {
  return (
    <div className="flex flex-col gap-4 pr-2 sm:pr-8">
      <p className="text-sm leading-relaxed text-pretty text-foreground">{role.summary}</p>

      <ul className="flex flex-col gap-2.5">
        {role.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex gap-3 text-sm leading-relaxed text-pretty text-muted-foreground"
          >
            <span aria-hidden className="mt-2 size-1 shrink-0 bg-border" />
            <span className="min-w-0">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
