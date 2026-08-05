import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ViewAllLinkProps {
  href: string;
  /** How many items the destination holds, shown as a muted tally. */
  count?: number;
  /**
   * Accessible name, e.g. "All experiences" — the visible text is always the
   * literal "View All", so this is what keeps two instances on the same page
   * distinguishable to assistive tech (and matches the ⌘K palette's label).
   */
  "aria-label": string;
  children: React.ReactNode;
}

/**
 * The link from a section header through to its full detail route. Rendered
 * by `Section` itself for any section with a detail route, so Experience and
 * Stack stay identical — including the `nativeButton={false}` that Base UI
 * needs when a Button renders an anchor.
 */
export function ViewAllLink({ href, count, children, ...rest }: ViewAllLinkProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      nativeButton={false}
      render={<Link href={href} />}
      className="label-mono group shrink-0 gap-1.5"
      {...rest}
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className="text-muted-foreground/70">({count})</span>
      )}
      <ArrowRightIcon
        aria-hidden
        className="size-3 transition-transform group-hover:translate-x-0.5"
      />
    </Button>
  );
}
