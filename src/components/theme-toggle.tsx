"use client";

import { useTheme } from "next-themes";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsHydrated } from "@/hooks/use-is-hydrated";
import { cn } from "@/lib/utils";

const THEMES = [
  { value: "light", label: "Light", Icon: SunIcon },
  { value: "system", label: "System", Icon: MonitorIcon },
  { value: "dark", label: "Dark", Icon: MoonIcon },
] as const;

/**
 * Segmented light / system / dark control.
 *
 * `theme` is unknown during SSR, so the group renders unselected until the
 * client has hydrated, which avoids a hydration mismatch. The buttons stay
 * present and sized either way, so nothing shifts when the real value arrives.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const hydrated = useIsHydrated();

  return (
    <ToggleGroup
      spacing={0}
      value={hydrated && theme ? [theme] : []}
      onValueChange={(value) => {
        // Base UI hands back the full group value; ignore de-selection so one
        // option always stays active.
        if (value.length > 0) setTheme(String(value[0]));
      }}
      className={cn("border border-border", className)}
      aria-label="Colour theme"
    >
      {THEMES.map(({ value, label, Icon }) => (
        <ToggleGroupItem
          key={value}
          value={value}
          size="sm"
          className="w-7 px-0"
          aria-label={`${label} theme`}
          title={`${label} theme`}
        >
          <Icon aria-hidden />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
