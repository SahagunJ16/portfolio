"use client";

import { useTheme } from "next-themes";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { cn } from "@/lib/utils";

/**
 * Animated light / dark control.
 *
 * `resolvedTheme` preserves the system preference on first load. The button is
 * disabled until hydration so it cannot choose the wrong opposite theme while
 * that effective value is still unknown.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useIsHydrated();
  const theme = hydrated && resolvedTheme === "dark" ? "dark" : "light";
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      disabled={!hydrated}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      className={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), className)}
    />
  );
}
