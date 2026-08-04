import type { MonthYear } from "@/data/data";
import {
  DATE_RANGE_SEPARATOR,
  formatDuration,
  formatMonthYear,
  toIsoMonth,
} from "@/lib/format";
import { cn } from "@/lib/utils";

interface DateRangeProps {
  start: MonthYear;
  /** `null` renders as "Present". */
  end: MonthYear | null;
  /** Appends e.g. "· 1 yr 4 mos". */
  showDuration?: boolean;
  className?: string;
}

/**
 * Renders a role/study period with real `<time datetime>` semantics on both
 * endpoints, so the dates are machine-readable for crawlers rather than just
 * formatted text.
 */
export function DateRange({ start, end, showDuration = false, className }: DateRangeProps) {
  return (
    <span className={cn("label-mono inline-flex flex-wrap items-center gap-1", className)}>
      <time dateTime={toIsoMonth(start)}>{formatMonthYear(start)}</time>
      <span aria-hidden>{DATE_RANGE_SEPARATOR}</span>
      {end ? (
        <time dateTime={toIsoMonth(end)}>{formatMonthYear(end)}</time>
      ) : (
        <span>Present</span>
      )}
      {showDuration && (
        <span className="text-muted-foreground/70">
          <span aria-hidden> · </span>
          {formatDuration(start, end)}
        </span>
      )}
    </span>
  );
}
