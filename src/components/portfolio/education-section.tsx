import { DateRange } from "@/components/date-range";
import { Section } from "@/components/layout/section";
import { MetaList, type MetaItem } from "@/components/meta-list";
import { DATA } from "@/data/data";

export function EducationSection() {
  return (
    <Section id="education" label="Education" description="Degree and coursework.">
      <div className="flex flex-col gap-12">
        {DATA.educations.map((education) => {
          const meta: MetaItem[] = [
            { label: "Degree", value: `${education.degree} in ${education.field}` },
            { label: "Location", value: education.address },
            {
              label: "Period",
              value: <DateRange start={education.start} end={education.end} />,
            },
          ];

          if (education.grade) {
            meta.push({ label: "Grade", value: education.grade });
          }

          return (
            <article key={education.school} className="flex flex-col gap-5">
              <h3 className="font-heading text-xl tracking-tight text-pretty text-foreground">
                {education.school}
              </h3>

              <MetaList items={meta} />

              <p className="max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground">
                {education.description}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
