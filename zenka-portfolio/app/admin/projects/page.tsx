import prisma from "@/lib/prisma";
import ProjectsEditor from "./ProjectsEditor";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
  return <ProjectsEditor projects={projects} />;
}
