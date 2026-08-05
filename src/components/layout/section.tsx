import { Container } from "@/components/layout/container";
import { ViewAllLink } from "@/components/view-all-link";
import { formatIndex } from "@/lib/format";
import { getSectionDetail, getSectionIndex, type SectionId } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: SectionId;
  /** Heading text, e.g. "Experience". */
  label: string;
  /** Optional one-line standfirst under the heading. */
  description?: string;
  /** Tally shown next to "View All", e.g. total roles or total skills. Ignored when the section has no detail route. */
  viewAllCount?: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * The editorial index shell every section on the page uses.
 *
 * A single column headed by a numbered mono label, a hairline rule, and — for
 * sections with a detail route — a right-aligned "View All" link. The section
 * number used to live in a sticky left rail; that moved to the fixed site
 * sidebar, so keeping a second rail here would just be two competing left
 * margins.
 */
export function Section({
  id,
  label,
  description,
  viewAllCount,
  children,
  className,
}: SectionProps) {
  const headingId = `${id}-heading`;
  const index = getSectionIndex(id);
  const detail = getSectionDetail(id);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      // Anchor offset comes from `scroll-padding-top` on <html>; don't add
      // scroll-margin here too or the two stack and overshoot.
      className={cn("border-t border-border", className)}
    >
      <Container className="py-14 sm:py-20">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="label-mono" aria-hidden>
            {formatIndex(index)}
          </span>
          <h2
            id={headingId}
            className="font-mono text-xs tracking-[0.18em] text-foreground uppercase"
          >
            {label}
          </h2>
          <span aria-hidden className="h-px min-w-8 flex-1 bg-border" />

          {detail && (
            <ViewAllLink href={detail.href} count={viewAllCount} aria-label={detail.label}>
              View All
            </ViewAllLink>
          )}
        </div>

        {description && (
          <p className="mt-3 max-w-xl text-sm text-pretty text-muted-foreground">
            {description}
          </p>
        )}

        <div className="mt-8 min-w-0 sm:mt-10">{children}</div>
      </Container>
    </section>
  );
}
