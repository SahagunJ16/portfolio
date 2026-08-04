import { DATA } from "@/data/data";
import { Button } from "@/components/ui/button";
import { toExternalUrl } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  /** `icon` shows icon-only buttons; `labelled` shows icon + platform name. */
  variant?: "icon" | "labelled";
  className?: string;
}

/**
 * Social buttons rendered from `DATA.socials`.
 *
 * Server component by necessity: `DATA.socials[].icon` holds React component
 * references, which cannot be serialised across a client boundary. Anything
 * client-side (the command palette) receives plain label/url pairs instead.
 */
export function SocialLinks({ variant = "icon", className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {DATA.socials.map((social) => {
        const Icon = social.icon;
        const href = toExternalUrl(social.url);

        return (
          <li key={social.label}>
            <Button
              variant={variant === "icon" ? "ghost" : "outline"}
              size={variant === "icon" ? "icon-sm" : "sm"}
              // Base UI needs to know this renders an <a>, not a <button>.
              nativeButton={false}
              render={<a href={href} target="_blank" rel="me noopener noreferrer" />}
              className={variant === "icon" ? "text-muted-foreground hover:text-foreground" : undefined}
              aria-label={variant === "icon" ? `${social.label} profile` : undefined}
            >
              <Icon aria-hidden />
              {variant === "labelled" && <span>{social.label}</span>}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
