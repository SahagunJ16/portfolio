"use client";

import * as React from "react";

/**
 * Distance below the viewport top that counts as "you are reading here".
 * Sits just under the 64px sticky header.
 */
const ACTIVE_LINE = 120;

/**
 * Scroll-spy. Returns the id of the section currently under the reading line,
 * or `null` while the hero is still in view.
 *
 * Picks the *last* section whose top has passed the line rather than the first
 * one that happens to intersect a band — with several sections visible at once
 * an intersection-order approach reports the one you have already scrolled
 * past. Reads are throttled to one per animation frame.
 */
export function useActiveSection(sectionIds: readonly string[]): string | null {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    let frame = 0;

    function measure() {
      frame = 0;

      // The final section can never reach the reading line, because the page
      // stops scrolling first. Treat "scrolled to the end" as it being active.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      let current: string | null = null;
      for (const element of elements) {
        if (element.getBoundingClientRect().top > ACTIVE_LINE) break;
        current = element.id;
      }

      setActiveId(current);
    }

    function schedule() {
      if (frame === 0) frame = requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionIds]);

  return activeId;
}
