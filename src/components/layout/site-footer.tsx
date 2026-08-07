import { CopyButton } from "@/components/copy-button";
import { Container } from "@/components/layout/container";
import { MetaList, type MetaItem } from "@/components/meta-list";
import { SocialLinks } from "@/components/social-links";
import { DATA } from "@/data";
import { getFullName, getPublicLocation } from "@/lib/portfolio";

/**
 * Site-wide footer, and the only place contact details are laid out — it
 * replaced the Contact *section*, so this content lives on every route rather
 * than only the home page. The hero's "Get in touch" button and the ⌘K palette
 * are shortcuts to the same address.
 *
 * `DATA.contact` also holds a mobile number and a postal code; both are
 * intentionally not rendered, to keep a scrapeable phone number and a precise
 * address off a public page.
 *
 * Server Component by necessity: `SocialLinks` reads `DATA.socials[].icon`,
 * which holds React component references that cannot cross a client boundary.
 */
export function SiteFooter() {
  const meta: MetaItem[] = [
    {
      label: "Email",
      value: (
        <span className="flex items-center gap-1">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="break-all underline-offset-4 hover:underline"
          >
            {DATA.contact.email}
          </a>
          <CopyButton value={DATA.contact.email} label="Email address" />
        </span>
      ),
    },
    { label: "Based in", value: getPublicLocation() },
  ];

  return (
    // id="contact" keeps /#contact resolving now that the section is gone.
    <footer id="contact" className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:py-16">
        <MetaList items={meta} />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <SocialLinks />
          {/* Baked at build time — every route is statically prerendered. */}
          <p className="label-mono">
            © {new Date().getFullYear()} {getFullName()}
          </p>
        </div>
      </Container>
    </footer>
  );
}
