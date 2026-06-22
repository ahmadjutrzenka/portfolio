"use client";

import { SkillGroup, Skill } from "@/app/generated/prisma/client";
import { useState } from "react";

type SkillGroupWithSkills = SkillGroup & { skills: Skill[] };

export default function SkillsEditor({
  skillGroups: initial,
}: {
  skillGroups: SkillGroupWithSkills[];
}) {
  const [groups, setGroups] = useState(initial);
  const [newSkill, setNewSkill] = useState<{ [groupId: number]: string }>({});
  const [message, setMessage] = useState("");

  async function handleDeleteSkill(groupId: number, skillId: number) {
    const res = await fetch(`/api/admin/skills/${skillId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId
            ? { ...g, skills: g.skills.filter((s) => s.id !== skillId) }
            : g,
        ),
      );
    }
  }

  async function handleAddSkill(groupId: number) {
    const name = newSkill[groupId]?.trim();
    if (!name) return;

    const res = await fetch("/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId, name }),
    });

    if (res.ok) {
      const skill = await res.json();
      setGroups((prev) =>
        prev.map((g) =>
          g.id === groupId ? { ...g, skills: [...g.skills, skill] } : g,
        ),
      );
      setNewSkill((prev) => ({ ...prev, [groupId]: "" }));
      setMessage("Skill added!");
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-white">Skills</h1>
      {message && <p className="text-sm text-green-400">{message}</p>}
      <div className="grid grid-cols-2 gap-4">
        {groups.map((group) => (
          <div
            key={group.id}
            className="flex flex-col gap-3 p-4 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]"
          >
            <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-[var(--bg-badge)] text-[var(--text-main)]"
                >
                  {skill.name}
                  <button
                    onClick={() => handleDeleteSkill(group.id, skill.id)}
                    className="text-red-400 hover:text-red-300 ml-1 leading-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2 mt-1">
              <input
                type="text"
                placeholder="New skill..."
                value={newSkill[group.id] || ""}
                onChange={(e) =>
                  setNewSkill((prev) => ({
                    ...prev,
                    [group.id]: e.target.value,
                  }))
                }
                onKeyDown={(e) => e.key === "Enter" && handleAddSkill(group.id)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-xs focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
              />
              <button
                onClick={() => handleAddSkill(group.id)}
                className="px-3 py-1.5 rounded-lg bg-[#8b7ff5] text-white text-xs hover:opacity-90 transition-opacity"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
