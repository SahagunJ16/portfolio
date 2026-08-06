import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/data";
import { cn } from "@/lib/utils";

interface TagListProps {
  items: readonly Skill[];
  variant?: React.ComponentProps<typeof Badge>["variant"];
  className?: string;
  /** Accessible name for the list, e.g. "Languages". */
  label?: string;
  /** When set and > 0, appends a trailing "+N more" badge for items not in `items`. */
  moreCount?: number;
}

/**
 * A wrapping row of badges. Rendered as a real `<ul>` so screen readers
 * announce the item count instead of reading a run-on string.
 */
export function TagList({ items, variant = "outline", className, label, moreCount }: TagListProps) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item.name}>
          <Badge
            variant={variant}
            className="h-6 gap-1.5 font-mono font-normal tracking-tight"
          >
            {item.icon && <item.icon aria-hidden data-icon="inline-start" />}
            {item.name}
          </Badge>
        </li>
      ))}
      {moreCount !== undefined && moreCount > 0 && (
        <li>
          <Badge variant="outline" className="h-6 font-mono font-normal text-muted-foreground">
            +{moreCount} more
          </Badge>
        </li>
      )}
    </ul>
  );
}
