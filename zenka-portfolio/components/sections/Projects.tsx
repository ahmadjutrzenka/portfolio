import { Project, ProjectImage } from "@/app/generated/prisma/client";
import { CardSpotlight } from "../ui/card-spotlight";
import ProjectCarousel from "./ProjectCarousel";

type ProjectWithImages = Project & {
  images: ProjectImage[];
};

interface ProjectsProps {
  projects: ProjectWithImages[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({ project }: { project: ProjectWithImages }) {
  return (
    <CardSpotlight
      color="#1e1944"
      className="rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] p-4 flex flex-col gap-2"
    >
      <ProjectCarousel images={project.images} />
      <div className="relative z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-badge)] text-[var(--text-muted)]">
            {project.status}
          </span>
        </div>
        <p className="text-[var(--text-muted)] text-sm">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-badge)] text-[var(--accent)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3 mt-auto pt-2">
          {project.repoVisible && project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              GitHub
            </a>
          )}
          {project.demoVisible && project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </CardSpotlight>
  );
}
