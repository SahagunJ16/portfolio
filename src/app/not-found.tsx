import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start gap-6 py-28 sm:py-40">
      <span className="label-mono">Error 404</span>
      <h1 className="font-heading text-4xl tracking-tight text-balance sm:text-5xl">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="max-w-md text-sm text-pretty text-muted-foreground">
        The link may be out of date, or the address slightly off. Everything lives on a
        single page — head back to the start.
      </p>
      <Button nativeButton={false} render={<Link href="/" />}>
        <ArrowLeftIcon aria-hidden />
        <span>Back to the portfolio</span>
      </Button>
    </Container>
  );
}
