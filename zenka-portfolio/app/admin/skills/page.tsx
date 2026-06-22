import prisma from "@/lib/prisma";
import SkillsEditor from "./SkillsEditor";

export default async function AdminSkillsPage() {
  const skillGroups = await prisma.skillGroup.findMany({
    orderBy: { order: "asc" },
    include: { skills: { orderBy: { order: "asc" } } },
  });
  return <SkillsEditor skillGroups={skillGroups} />;
}
