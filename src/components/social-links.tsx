import { DATA } from "@/data";
import { Button } from "@/components/ui/button";
import { toExternalUrl } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  className?: string;
}

/**
 * Social buttons rendered from `DATA.socials`, icon + platform name. Shown
 * only in the hero — kept in one place rather than repeated in the sidebar
 * and contact section.
 *
 * Server component by necessity: `DATA.socials[].icon` holds React component
 * references, which cannot be serialised across a client boundary.
 */
export function SocialLinks({ className }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {DATA.socials.map((social) => {
        const Icon = social.icon;
        const href = toExternalUrl(social.url);

        return (
          <li key={social.label}>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={href} target="_blank" rel="me noopener noreferrer" />}
            >
              <Icon aria-hidden />
              <span>{social.label}</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
