import type { Skill } from "@/types/portfolio";
import { Marquee } from "@/components/ui";
import { Icon } from "@iconify/react";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  return (
    <div className="mt-10 scroll-mt-14" id="skills">
      <h2 className="text-xl font-medium before:content-['>'] before:mr-1">Skills</h2>
      <Marquee duration="10s">
        <div className="flex gap-8 mt-4">
          {[...skills, ...skills].map((skill, index) => (
            <div key={index} className="flex flex-col items-center gap-2 w-[80px] p-2">
              <Icon icon={skill.icon} height={50} width={50} />
              <span className="text-xs">{skill.name}</span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
