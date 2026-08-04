import { Section } from "@/components/layout/section";
import { ExperienceTimeline } from "@/components/portfolio/experience-timeline";
import { ViewAllLink } from "@/components/view-all-link";
import { DATA } from "@/data/data";
import { getSectionDetail } from "@/lib/navigation";

/**
 * Home page summary: the current role at each organization, no disclosures.
 * The full history — every role, every highlight — lives on `/experiences`.
 */
export function ExperienceSection() {
  const detail = getSectionDetail("experience");
  const roleCount = DATA.experiences.reduce(
    (total, experience) => total + experience.roles.length,
    0
  );

  return (
    <Section
      id="experience"
      label="Experience"
      description="Roles, systems shipped and the impact they had."
    >
      <div className="flex flex-col gap-10">
        <ExperienceTimeline experiences={DATA.experiences} expandable={false} />

        {detail && (
          <ViewAllLink href={detail.href} count={roleCount}>
            {detail.label}
          </ViewAllLink>
        )}
      </div>
    </Section>
  );
}
