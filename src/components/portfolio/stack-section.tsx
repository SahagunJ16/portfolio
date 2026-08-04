import { Section } from "@/components/layout/section";
import { TagList } from "@/components/tag-list";
import { ViewAllLink } from "@/components/view-all-link";
import { getSectionDetail } from "@/lib/navigation";
import { getAllSkills, getFeaturedSkills } from "@/lib/portfolio";

/**
 * Home page summary: the technologies flagged `featured` in the data, as one
 * flat row. Every category and every skill lives on `/stack`.
 */
export function StackSection() {
  const detail = getSectionDetail("stack");
  const featured = getFeaturedSkills();
  const total = getAllSkills().length;

  return (
    <Section
      id="stack"
      label="Stack"
      description="What I reach for most. The full toolkit is a click away."
    >
      <div className="flex flex-col gap-8">
        <TagList
          items={featured.map((skill) => skill.name)}
          label="Core technologies"
          className="gap-2"
        />

        {detail && (
          <ViewAllLink href={detail.href} count={total}>
            {detail.label}
          </ViewAllLink>
        )}
      </div>
    </Section>
  );
}
