import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Container } from "@/components/layout/container";

interface PageHeaderProps {
  title: string;
  description: string;
}

/**
 * Opening block for the detail routes. Carries the breadcrumb back to the home
 * page, the page's only `<h1>` and a standfirst — shared so `/experiences` and
 * `/stack` cannot drift apart.
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Breadcrumb">
        <Link
          href="/"
          className="label-mono inline-flex items-center gap-2 transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowLeftIcon className="size-3" aria-hidden />
          <span>Back to portfolio</span>
        </Link>
      </nav>

      <div aria-hidden className="mt-8 h-px bg-border" />

      <h1 className="mt-4 font-heading text-4xl leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl">
        {title}
      </h1>

      <p className="mt-4 max-w-xl text-base text-pretty text-muted-foreground">
        {description}
      </p>
    </Container>
  );
}
