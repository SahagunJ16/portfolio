import { Section } from "@/components/layout/section";
import { TagList } from "@/components/tag-list";
import { getAllSkills, getFeaturedSkills } from "@/lib/portfolio";

/**
 * Home page summary: the technologies flagged `featured` in the data, as one
 * flat row. Every category and every skill lives on `/stack`.
 */
export function StackSection() {
  const featured = getFeaturedSkills();
  const total = getAllSkills().length;

  return (
    <Section
      id="stack"
      label="Stack"
      description="What I reach for most. The full toolkit is a click away."
      viewAllCount={total}
    >
      <TagList items={featured} label="Core technologies" className="gap-2" />
    </Section>
  );
}
