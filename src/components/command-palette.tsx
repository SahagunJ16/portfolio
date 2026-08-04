"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRightIcon,
  FileTextIcon,
  HashIcon,
  LayersIcon,
  MailIcon,
  MonitorIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { toast } from "sonner";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { formatIndex } from "@/lib/format";
import { getDetailRoutes, SECTIONS } from "@/lib/navigation";

const DETAIL_ROUTES = getDetailRoutes();

export interface CommandPaletteLink {
  label: string;
  url: string;
}

interface CommandPaletteProps {
  email: string;
  resumeHref: string;
  /** Serializable social links — icon components cannot cross this boundary. */
  socials: readonly CommandPaletteLink[];
}

/** Broadcast so any trigger (header button, keyboard shortcut) can open the palette. */
const OPEN_EVENT = "portfolio:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function CommandPalette({ email, resumeHref, socials }: CommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const { copy } = useCopyToClipboard();

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    }

    function onOpenRequest() {
      setOpen(true);
    }

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onOpenRequest);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onOpenRequest);
    };
  }, []);

  /** Close first so focus returns to the trigger before the action runs. */
  function runCommand(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Command palette"
      description="Jump to a section, copy contact details or change the theme."
      className="sm:max-w-lg"
    >
      {/* CommandDialog supplies the dialog shell only; the cmdk root goes here. */}
      <Command>
        <CommandInput placeholder="Jump to a section, copy an email, switch theme…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Sections">
            {SECTIONS.map((section, index) => (
              <CommandItem
                key={section.id}
                value={`${section.label} ${section.hint}`}
                onSelect={() =>
                  runCommand(() => {
                    const target = document.getElementById(section.id);

                    // Off the home page (e.g. 404) the section isn't mounted,
                    // so navigate to it instead of silently doing nothing.
                    if (!target) {
                      window.location.href = `/#${section.id}`;
                      return;
                    }

                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    // Keep the URL shareable/deep-linkable.
                    history.replaceState(null, "", `#${section.id}`);
                  })
                }
              >
                <HashIcon aria-hidden />
                <span className="font-mono text-muted-foreground">
                  {formatIndex(index + 1)}
                </span>
                <span>{section.label}</span>
                {/* CommandShortcut, not a plain span: it also suppresses the
                    trailing check icon that would otherwise fight for ml-auto. */}
                <CommandShortcut className="truncate tracking-normal">
                  {section.hint}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Pages">
            {DETAIL_ROUTES.map((route) => (
              <CommandItem
                key={route.href}
                value={`${route.label} ${route.sectionLabel} page ${route.href}`}
                onSelect={() => runCommand(() => router.push(route.href))}
              >
                <LayersIcon aria-hidden />
                <span>{route.label}</span>
                <CommandShortcut className="truncate tracking-normal">
                  {route.href}
                </CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Contact">
            <CommandItem
              value={`Copy email ${email}`}
              onSelect={() =>
                runCommand(async () => {
                  const ok = await copy(email);
                  if (ok) toast.success("Email copied", { description: email });
                  else toast.error("Could not copy email address");
                })
              }
            >
              <MailIcon aria-hidden />
              <span>Copy email address</span>
              <CommandShortcut className="truncate tracking-normal">{email}</CommandShortcut>
            </CommandItem>

            <CommandItem
              value="Download resume CV"
              onSelect={() => runCommand(() => window.open(resumeHref, "_blank", "noopener"))}
            >
              <FileTextIcon aria-hidden />
              <span>Open resume</span>
            </CommandItem>

            {socials.map((social) => (
              <CommandItem
                key={social.label}
                value={`${social.label} ${social.url}`}
                onSelect={() => runCommand(() => window.open(social.url, "_blank", "noopener"))}
              >
                <ArrowUpRightIcon aria-hidden />
                <span>Open {social.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem value="Light theme" onSelect={() => runCommand(() => setTheme("light"))}>
              <SunIcon aria-hidden />
              <span>Light</span>
            </CommandItem>
            <CommandItem value="Dark theme" onSelect={() => runCommand(() => setTheme("dark"))}>
              <MoonIcon aria-hidden />
              <span>Dark</span>
            </CommandItem>
            <CommandItem
              value="System theme"
              onSelect={() => runCommand(() => setTheme("system"))}
            >
              <MonitorIcon aria-hidden />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
