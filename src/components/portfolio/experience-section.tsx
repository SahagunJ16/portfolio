import { Section } from "@/components/layout/section";
import { ExperienceTable } from "@/components/portfolio/experience-table";
import { DATA } from "@/data/data";

/**
 * Home page summary: the current role at each organization, as a table. The
 * full history — every role, every highlight — lives on `/experiences`.
 */
export function ExperienceSection() {
  const roleCount = DATA.experiences.reduce(
    (total, experience) => total + experience.roles.length,
    0
  );

  return (
    <Section
      id="experience"
      label="Experience"
      description="Roles, systems shipped and the impact they had."
      viewAllCount={roleCount}
    >
      <ExperienceTable experiences={DATA.experiences} />
    </Section>
  );
}
