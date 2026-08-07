"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, SearchIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ThemeToggle } from "@/components/theme-toggle";
import { openCommandPalette } from "@/components/command-palette";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { getNavRoutes } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const NAV_ROUTES = getNavRoutes();

interface SiteSidebarProps {
  /** Initials shown as the wordmark, e.g. "JS". */
  monogram: string;
  fullName: string;
  /** Primary headline, shown under the name in the rail. */
  headline: string;
}

/**
 * Site navigation, in two forms from one definition.
 *
 * From `lg` up it is a fixed left rail; below that a sticky top bar with a
 * drawer. Both are driven by the same `getNavRoutes()` list, so the nav exists
 * once.
 *
 * It lists *routes*, not home page sections: the active item is whichever page
 * you are on. The home sections keep their anchors for deep links and the ⌘K
 * palette, but they are deliberately not tracked here — there is no scroll-spy.
 */
export function SiteSidebar({ monogram, fullName, headline }: SiteSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Exact match: `startsWith` would light up "Overview" on every route.
  const isActive = (href: string) => pathname === href;

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 flex-col border-r border-border bg-background lg:flex">
        <div className="flex h-full flex-col gap-10 px-6 py-8">
          <Link
            href="/"
            className="flex flex-col gap-1.5 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="label-mono text-foreground" aria-hidden>
              {monogram}
            </span>
            <span className="font-heading text-lg leading-tight tracking-tight text-foreground">
              {fullName}
            </span>
            <span className="text-xs text-pretty text-muted-foreground">{headline}</span>
          </Link>

          <nav aria-label="Pages" className="flex-1">
            <ul className="flex flex-col border-l border-border">
              {NAV_ROUTES.map((route) => (
                <li key={route.href} className="flex">
                  <Link
                    href={route.href}
                    aria-current={isActive(route.href) ? "page" : undefined}
                    className={cn(
                      "-ml-px flex flex-1 border-l py-2 pl-4 text-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
                      isActive(route.href)
                        ? "border-foreground text-foreground"
                        : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={openCommandPalette}
              className="justify-start gap-2 text-muted-foreground"
            >
              <SearchIcon aria-hidden />
              <span>Search</span>
              <KbdGroup className="ml-auto">
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 lg:hidden">
        <Container className="flex h-14 items-center justify-between gap-3">
          <Link
            href="/"
            className="label-mono text-foreground transition-opacity hover:opacity-70 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span aria-hidden>{monogram}</span>
            <span className="sr-only">{fullName} — back to top</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={openCommandPalette}
              aria-label="Open command palette"
            >
              <SearchIcon aria-hidden />
            </Button>

            <ThemeToggle className="hidden sm:flex" />

            <Drawer open={mobileOpen} onOpenChange={setMobileOpen} swipeDirection="down">
              <DrawerTrigger
                render={
                  <Button variant="ghost" size="icon-sm" aria-label="Open navigation menu" />
                }
              >
                <MenuIcon aria-hidden />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Navigate</DrawerTitle>
                  <DrawerDescription>Jump to a page of the portfolio.</DrawerDescription>
                </DrawerHeader>

                <nav aria-label="Pages" className="p-4">
                  <ul className="flex flex-col">
                    {NAV_ROUTES.map((route) => (
                      <li key={route.href}>
                        <DrawerClose
                          nativeButton={false}
                          render={<Link href={route.href} />}
                          aria-current={isActive(route.href) ? "page" : undefined}
                          className={cn(
                            "flex w-full border-b border-border py-3 text-left font-heading text-base transition-colors hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
                            isActive(route.href) ? "text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {route.label}
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-6">
                    <span className="label-mono">Theme</span>
                    <ThemeToggle />
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        </Container>
      </header>
    </>
  );
}
