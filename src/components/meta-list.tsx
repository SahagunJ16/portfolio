import { cn } from "@/lib/utils";

export interface MetaItem {
  label: string;
  value: React.ReactNode;
}

interface MetaListProps {
  items: readonly MetaItem[];
  className?: string;
}

/**
 * Label/value pairs as a semantic description list. Stacks on small screens
 * and switches to a two-column grid once there is room for the mono labels
 * to sit beside their values.
 */
export function MetaList({ items, className }: MetaListProps) {
  return (
    <dl className={cn("grid gap-x-6 gap-y-3 sm:grid-cols-[8rem_1fr]", className)}>
      {items.map((item) => (
        <div key={item.label} className="contents">
          <dt className="label-mono pt-0.5">{item.label}</dt>
          <dd className="min-w-0 text-sm break-words text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
