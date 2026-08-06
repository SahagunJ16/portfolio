import { Section } from "@/components/layout/section";
import { DATA } from "@/data";

export function OverviewSection() {
  const [lead, ...rest] = DATA.overview.description;

  return (
    <Section id="overview" label="Overview" description="Who I am and what I build.">
      <div className="flex max-w-2xl flex-col gap-5">
        <p className="text-lg leading-relaxed text-pretty text-foreground sm:text-xl">
          {lead}
        </p>
        {rest.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-pretty text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </Section>
  );
}
