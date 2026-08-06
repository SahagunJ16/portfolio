import { CopyButton } from "@/components/copy-button";
import { Section } from "@/components/layout/section";
import { MetaList, type MetaItem } from "@/components/meta-list";
import { DATA } from "@/data";
import { getPublicLocation } from "@/lib/portfolio";

/**
 * Email and city/region only.
 *
 * `DATA.contact` also holds a mobile number and a postal code; both are
 * intentionally not rendered, to keep a scrapeable phone number and a precise
 * address off a public page.
 */
export function ContactSection() {
  const closingLine = DATA.overview.description.at(-1);

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
    <Section id="contact" label="Contact" description="How to reach me.">
      <div className="flex flex-col gap-8">
        {closingLine && (
          <p className="max-w-2xl text-lg leading-relaxed text-pretty text-foreground sm:text-xl">
            {closingLine}
          </p>
        )}
        <MetaList items={meta} />
      </div>
    </Section>
  );
}
