import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Experience } from "@/data/data";
import { toExternalUrl } from "@/lib/format";
import { cn } from "@/lib/utils";

interface OrganizationLogoLinkProps {
  experience: Pick<Experience, "organization" | "website" | "logo">;
  /** The already-styled organization name node. Omit for a bare avatar (the timeline's bullet use). */
  children?: React.ReactNode;
  size?: "default" | "sm" | "lg";
}

/**
 * An organization's avatar, optionally linked to its website. Used both
 * inline next to the name (table, `children` set) and alone as the outer
 * timeline's bullet (`children` omitted) — the fallback letter means it
 * always has something to render, which the timeline's rail depends on.
 */
export function OrganizationLogoLink({
  experience,
  children,
  size = "default",
}: OrganizationLogoLinkProps) {
  const { organization, website, logo } = experience;

  const avatar = (
    <Avatar size={size}>
      {logo && (
        // Plain <img>, not next/image: Base UI's Avatar tracks the image's
        // native load event itself, and next/image's own hydration layer
        // races it when the image is already browser-cached (e.g. arriving
        // here right after the home table already loaded the same file) —
        // the fallback letter gets stuck showing despite the image being
        // fully loaded. These are small (256×256) source files already, so
        // there's little to gain from next/image here anyway.
        <AvatarImage
          src={`/images/experiences/logos/${logo}`}
          alt=""
          className="grayscale transition-[filter] duration-200 group-hover:grayscale-0"
        />
      )}
      <AvatarFallback>{organization.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );

  if (!website) {
    return children ? (
      <div className="inline-flex items-center gap-2">
        {avatar}
        {children}
      </div>
    ) : (
      avatar
    );
  }

  return (
    <a
      href={toExternalUrl(website)}
      target="_blank"
      rel="noopener noreferrer"
      // No `children` means the avatar is the only content — give the link
      // its own accessible name, since the decorative `alt=""` image and the
      // fallback (hidden once the image loads) leave it with none otherwise.
      aria-label={children ? undefined : organization}
      className={cn("group inline-flex items-center", children && "gap-2")}
    >
      {avatar}
      {children}
    </a>
  );
}
