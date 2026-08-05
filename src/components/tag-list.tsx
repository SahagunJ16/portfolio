import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/data/data";
import { cn } from "@/lib/utils";

interface TagListProps {
  items: readonly Skill[];
  variant?: React.ComponentProps<typeof Badge>["variant"];
  className?: string;
  /** Accessible name for the list, e.g. "Languages". */
  label?: string;
}

/**
 * A wrapping row of badges. Rendered as a real `<ul>` so screen readers
 * announce the item count instead of reading a run-on string.
 */
export function TagList({ items, variant = "outline", className, label }: TagListProps) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <li key={item.name}>
          <Badge variant={variant} className="font-mono font-normal tracking-tight">
            {item.icon && <item.icon aria-hidden data-icon="inline-start" />}
            {item.name}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
