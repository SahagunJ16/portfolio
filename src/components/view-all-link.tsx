import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ViewAllLinkProps {
  href: string;
  /** How many items the destination holds, shown as a muted tally. */
  count?: number;
  children: React.ReactNode;
}

/**
 * The link from a home page summary through to its full detail route. Shared
 * by the Experience and Stack sections so the two stay identical — including
 * the `nativeButton={false}` that Base UI needs when a Button renders an
 * anchor.
 */
export function ViewAllLink({ href, count, children }: ViewAllLinkProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={<Link href={href} />}
      className="group self-start"
    >
      <span>{children}</span>
      {count !== undefined && (
        <span className="font-mono text-muted-foreground">({count})</span>
      )}
      <ArrowRightIcon
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Button>
  );
}
