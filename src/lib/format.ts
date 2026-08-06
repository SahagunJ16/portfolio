import type { MonthYear } from "@/data";

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** En dash, used consistently for every date range in the UI. */
export const DATE_RANGE_SEPARATOR = "–";

/** `{ month: 4, year: 2025 }` -> `"Apr 2025"`. */
export function formatMonthYear(date: MonthYear): string {
  return `${MONTH_LABELS[date.month - 1]} ${date.year}`;
}

/**
 * Machine-readable value for `<time dateTime>`.
 * `{ month: 4, year: 2025 }` -> `"2025-04"`.
 */
export function toIsoMonth(date: MonthYear): string {
  return `${date.year}-${String(date.month).padStart(2, "0")}`;
}

/** A `null` end date means the role is current. */
export function formatDateRange(start: MonthYear, end: MonthYear | null): string {
  const endLabel = end ? formatMonthYear(end) : "Present";
  return `${formatMonthYear(start)} ${DATE_RANGE_SEPARATOR} ${endLabel}`;
}

/** Total months between two points, inclusive of the start month. */
export function monthsBetween(start: MonthYear, end: MonthYear): number {
  return (end.year - start.year) * 12 + (end.month - start.month) + 1;
}

function currentMonthYear(): MonthYear {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

/**
 * `"1 yr 4 mos"`. Open-ended ranges are measured against the current month,
 * so this is computed at render time rather than baked into the data.
 */
export function formatDuration(start: MonthYear, end: MonthYear | null): string {
  const total = Math.max(monthsBetween(start, end ?? currentMonthYear()), 1);
  const years = Math.floor(total / 12);
  const months = total % 12;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} mo${months === 1 ? "" : "s"}`);

  return parts.join(" ");
}

/** `DATA.socials` stores bare hosts, so add the scheme at render time. */
export function toExternalUrl(url: string): string {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

/** Strips the scheme for display, keeping links readable in a monotone layout. */
export function toDisplayUrl(url: string): string {
  return url.replace(/^https?:\/\//i, "").replace(/\/$/, "");
}

/** `1` -> `"01"`, for the mono section index labels. */
export function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}
