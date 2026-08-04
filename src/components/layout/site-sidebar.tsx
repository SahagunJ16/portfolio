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
import { useActiveSection } from "@/hooks/use-active-section";
import { formatIndex } from "@/lib/format";
import { SECTIONS } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const SECTION_IDS = SECTIONS.map((section) => section.id);

interface SiteSidebarProps {
  /** Initials shown as the wordmark, e.g. "JS". */
  monogram: string;
  fullName: string;
  /** Primary headline, shown under the name in the rail. */
  headline: string;
  /**
   * Rendered `SocialLinks`. Passed in as a slot rather than imported, because
   * it reads `DATA.socials[].icon` — React component references, which cannot
   * cross this client boundary.
   */
  socialLinks: React.ReactNode;
}

/**
 * Site navigation, in two forms from one definition.
 *
 * From `lg` up it is a fixed left rail; below that a sticky top bar with a
 * drawer. Both are driven by the same `SECTIONS` registry, so the nav list
 * exists once.
 */
export function SiteSidebar({ monogram, fullName, headline, socialLinks }: SiteSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Hooks run unconditionally; the hook itself returns null when the section
  // elements aren't mounted, which is exactly the case on the detail routes.
  const scrolledSectionId = useActiveSection(SECTION_IDS);

  // On a detail route the corresponding section is active outright. On the
  // home page it follows the scroll position.
  const routeSectionId =
    SECTIONS.find((section) => section.detailHref === pathname)?.id ?? null;
  const activeId = routeSectionId ?? scrolledSectionId;

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

          <nav aria-label="Sections" className="flex-1">
            <ul className="flex flex-col border-l border-border">
              {SECTIONS.map((section, index) => {
                const isActive = activeId === section.id;

                return (
                  <li key={section.id} className="flex">
                    <a
                      href={`/#${section.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "-ml-px flex flex-1 items-baseline gap-3 border-l py-2 pl-4 text-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
                        isActive
                          ? "border-foreground text-foreground"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      )}
                    >
                      <span className="label-mono" aria-hidden>
                        {formatIndex(index + 1)}
                      </span>
                      <span>{section.label}</span>
                    </a>
                  </li>
                );
              })}
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

            <div className="flex items-center justify-between gap-2">
              {socialLinks}
              <ThemeToggle />
            </div>
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
                  <DrawerDescription>Jump to a section of the portfolio.</DrawerDescription>
                </DrawerHeader>

                <nav aria-label="Sections" className="p-4">
                  <ul className="flex flex-col">
                    {SECTIONS.map((section, index) => (
                      <li key={section.id}>
                        <DrawerClose
                          nativeButton={false}
                          render={<a href={`/#${section.id}`} />}
                          className={cn(
                            "flex w-full items-baseline gap-4 border-b border-border py-3 text-left transition-colors hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none",
                            activeId === section.id && "text-foreground"
                          )}
                        >
                          <span className="label-mono" aria-hidden>
                            {formatIndex(index + 1)}
                          </span>
                          <span className="font-heading text-base">{section.label}</span>
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
