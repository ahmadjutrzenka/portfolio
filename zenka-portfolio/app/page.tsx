import prisma from "@/lib/prisma";
import Hero from "@/components/sections/Hero";
import AboutSection from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";

export default async function Home() {
  const [profile, about, projects, skillGroups, education, certifications] =
    await Promise.all([
      prisma.profile.findUnique({ where: { id: 1 } }),
      prisma.about.findUnique({ where: { id: 1 } }),
      prisma.project.findMany({
        orderBy: { order: "asc" },
        include: { images: { orderBy: { order: "asc" } } },
      }),
      prisma.skillGroup.findMany({
        orderBy: { order: "asc" },
        include: { skills: { orderBy: { order: "asc" } } },
      }),
      prisma.education.findMany({ orderBy: { order: "asc" } }),
      prisma.certification.findMany({ orderBy: { order: "asc" } }),
    ]);

  return (
    <main className="w-full max-w-[820px] px-12 pt-20 pb-32 flex flex-col ">
      <Hero profile={profile} />
      <AboutSection about={about} />
      <Projects projects={projects} />
      <Skills skillGroups={skillGroups} />
      <Credentials education={education} certifications={certifications} />
      <Contact email={profile?.email ?? null} />
    </main>
  );
}
