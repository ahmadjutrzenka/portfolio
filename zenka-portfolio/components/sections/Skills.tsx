import { SkillGroup, Skill } from "@/app/generated/prisma/client";

type SkillGroupWithSkills = SkillGroup & {
  skills: Skill[];
};

interface SkillsProps {
  skillGroups: SkillGroupWithSkills[];
}

export default function Skills({ skillGroups }: SkillsProps) {
  return (
    <section id="skills" className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        Skills
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {skillGroups.map((group) => (
          <SkillGroupCard key={group.id} skillGroup={group} />
        ))}
      </div>
    </section>
  );
}

function SkillGroupCard({ skillGroup }: { skillGroup: SkillGroupWithSkills }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
        {skillGroup.name}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {skillGroup.skills.map((skill) => (
          <span
            key={skill.id}
            className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-badge)] text-[var(--text-main)]"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
