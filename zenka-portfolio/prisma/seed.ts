import { PrismaClient, ProjectStatus } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.skillGroup.deleteMany();
  await prisma.education.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.galleryItem.deleteMany();

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Ahmad Jutrzenka Ilyas",
      title: "Full Stack Developer",
      tagline: "Full stack underwater percussionist",
      openToWork: true,
      email: "zenkalium@gmail.com",
      linkedinUrl: "https://www.linkedin.com/in/jutrzenka/",
      githubUrl: "https://github.com/ahmadjutrzenka",
    },
  });

  await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      bio: "A full-stack web developer with an unconventional path — Biology graduate from Universitas Indonesia, with a published research background in marine ecology, who made a deliberate pivot into software engineering after completing Hacktiv8's intensive bootcamp. Experienced in building and shipping full-stack web applications across React, Node.js, Next.js, and real-time systems. Beyond coding, a practising orchestral percussionist and longtime music performer — bringing the same discipline for rehearsal, collaboration, and performance to engineering work. I'm willing to relocate to wherever the opportunity takes me.",
    },
  });

  await prisma.project.createMany({
    data: [
      {
        slug: "wordivate",
        title: "Wordivate",
        description:
          "A real-time multiplayer word quiz where Gemini generates questions from any topic, synced live via Socket.IO with a D3 word cloud.",
        techStack: [
          "React",
          "React Router",
          "Socket.IO",
          "D3",
          "d3-cloud",
          "Node.js",
          "Express",
          "Gemini AI",
          "Firebase Hosting",
        ],
        featured: false,
        repoUrl: "https://github.com/Wordivate",
        repoVisible: true,
        demoVisible: false,
        order: 3,
        startDate: new Date("2026-04-28"),
        status: ProjectStatus.Completed,
      },
      {
        slug: "questivate",
        title: "Questivate",
        description:
          "A full-stack media collection tracker for anime, manga, and games with AI-powered discovery via Google Gemini.",
        techStack: [
          "React",
          "Redux Toolkit",
          "React Router",
          "Node.js",
          "Express",
          "Sequelize",
          "PostgreSQL",
          "JWT",
          "Cloudinary",
          "Google OAuth",
          "Gemini AI",
          "Jest",
          "AWS EC2",
          "Vercel",
          "Supabase",
        ],
        featured: true,
        repoUrl: "https://github.com/ahmadjutrzenka/questivate",
        repoVisible: true,
        demoUrl: "https://questiv8.vercel.app",
        demoVisible: true,
        order: 1,
        startDate: new Date("2026-04-21"),
        status: ProjectStatus.Maintained,
      },
      {
        slug: "pundak",
        title: "Pundak",
        description:
          "A full-stack imitation of PALA Nusantara e-commerce storefront, built with Next.js App Router, featuring product browsing, search, and wishlist functionality.",
        techStack: [
          "Next.js",
          "TypeScript",
          "React",
          "MongoDB",
          "JWT",
          "bcrypt",
          "Zod",
          "Tailwind CSS",
          "Vercel",
        ],
        featured: true,
        repoUrl: "https://github.com/ahmadjutrzenka/pundak",
        repoVisible: true,
        demoUrl: "https://pundak.vercel.app",
        demoVisible: true,
        order: 4,
        startDate: new Date("2026-05-11"),
        status: ProjectStatus.Archived,
      },
      {
        slug: "insightiq",
        title: "InsightIQ",
        description:
          "An AI-powered platform for TikTok creators to analyze their niche, get product recommendations from TikTok Shop, and receive daily updates via Telegram bot.",
        techStack: [
          "Next.js",
          "TypeScript",
          "MongoDB",
          "NextAuth",
          "Gemini AI",
          "Telegram Bot",
          "node-cron",
          "Apify",
          "Recharts",
          "Shadcn UI",
          "Tailwind CSS",
        ],
        featured: true,
        repoUrl: "https://github.com/hck94-insightiq/insightiq",
        repoVisible: true,
        demoUrl: "https://insightiq-94.vercel.app",
        demoVisible: true,
        order: 2,
        startDate: new Date("2026-05-15"),
        status: ProjectStatus.Maintained,
      },
    ],
  });

  await prisma.skillGroup.create({
    data: {
      name: "Languages",
      order: 1,
      skills: {
        createMany: {
          data: [
            { name: "JavaScript", order: 1 },
            { name: "TypeScript", order: 2 },
          ],
        },
      },
    },
  });

  await prisma.skillGroup.create({
    data: {
      name: "Frontend Development",
      order: 2,
      skills: {
        createMany: {
          data: [
            { name: "React JS", order: 1 },
            { name: "React Native", order: 2 },
            { name: "Redux Toolkit", order: 3 },
            { name: "Next.js", order: 4 },
            { name: "HTML & CSS", order: 5 },
            { name: "Tailwind CSS", order: 6 },
            { name: "DaisyUI", order: 7 },
            { name: "Bootstrap", order: 8 },
            { name: "Apollo Client", order: 9 },
          ],
        },
      },
    },
  });

  await prisma.skillGroup.create({
    data: {
      name: "Backend Development",
      order: 3,
      skills: {
        createMany: {
          data: [
            { name: "Node JS", order: 1 },
            { name: "Express", order: 2 },
            { name: "Sequelize", order: 3 },
            { name: "PostgreSQL", order: 4 },
            { name: "GraphQL", order: 5 },
            { name: "Apollo Server", order: 6 },
            { name: "MongoDB", order: 7 },
            { name: "Redis", order: 8 },
            { name: "Rest API", order: 9 },
            { name: "JWT", order: 10 },
            { name: "Gemini AI", order: 11 },
            { name: "Zod", order: 12 },
          ],
        },
      },
    },
  });

  await prisma.skillGroup.create({
    data: {
      name: "Tools",
      order: 4,
      skills: {
        createMany: {
          data: [
            { name: "Cloudinary", order: 1 },
            { name: "Vercel", order: 2 },
            { name: "Supabase", order: 3 },
            { name: "Google OAuth", order: 4 },
            { name: "Socket.IO", order: 5 },
            { name: "Git", order: 6 },
            { name: "GitHub", order: 7 },
            { name: "Postman", order: 8 },
            { name: "Jest", order: 9 },
            { name: "AWS EC2", order: 10 },
            { name: "Firebase", order: 11 },
            { name: "Expo Go", order: 12 },
            { name: "Vite", order: 13 },
          ],
        },
      },
    },
  });

  await prisma.education.createMany({
    data: [
      {
        institution: "Universitas Indonesia",
        program: "Bachelor of Science in Biology",
        startYear: 2020,
        endYear: 2024,
        gpa: "3.15",
        transcriptUrl: null,
        transcriptVisible: false,
        order: 2,
      },
      {
        institution: "Hacktiv8",
        program: "Fullstack JavaScript Immersive",
        startYear: 2026,
        endYear: 2026,
        gpa: "84%",
        transcriptUrl: null,
        transcriptVisible: false,
        order: 1,
      },
    ],
  });

  await prisma.certification.createMany({
    data: [
      {
        name: "JavaScript (Basic)",
        issuer: "HackerRank",
        issueDate: new Date("2026-05-20"),
        credentialId: "11cc5ab7bb69",
        credentialUrl: "https://www.hackerrank.com/certificates/11cc5ab7bb69",
        credentialVisible: true,
        order: 1,
      },
      {
        name: "Problem Solving (Basic)",
        issuer: "HackerRank",
        issueDate: new Date("2026-05-20"),
        credentialId: "ee6b83c67ca2",
        credentialUrl: "https://www.hackerrank.com/certificates/ee6b83c67ca2",
        credentialVisible: true,
        order: 2,
      },
      {
        name: "CSS (Basic)",
        issuer: "HackerRank",
        issueDate: new Date("2026-05-20"),
        credentialId: "f7bd7ab244d6",
        credentialUrl: "https://www.hackerrank.com/certificates/f7bd7ab244d6",
        credentialVisible: true,
        order: 3,
      },
      {
        name: "React (Basic)",
        issuer: "HackerRank",
        issueDate: new Date("2026-05-20"),
        credentialId: "3c3fd4c91148",
        credentialUrl: "https://www.hackerrank.com/certificates/3c3fd4c91148",
        credentialVisible: true,
        order: 4,
      },
      {
        name: "Software Engineer Intern (Basic)",
        issuer: "HackerRank",
        issueDate: new Date("2026-05-20"),
        credentialId: "b1b2ab4bf599",
        credentialUrl: "https://www.hackerrank.com/certificates/b1b2ab4bf599",
        credentialVisible: true,
        order: 5,
      },
      {
        name: "IELTS Academic 7.0",
        issuer: "IELTS Official",
        issueDate: new Date("2024-09-07"),
        expirationDate: new Date("2026-09-06"),
        credentialId: "24ID507646ILYA017A",
        credentialUrl:
          "https://www.linkedin.com/in/jutrzenka/overlay/Certifications/1525705281/treasury/?profileId=ACoAACeTPE0Bc8cC_nIfGkjHCjwQqmv6kY_bE6c",
        credentialVisible: true,
        order: 6,
      },
      {
        name: "JLPT N5",
        issuer: "Japan Foundation Jakarta",
        issueDate: new Date("2022-12-01"),
        credentialId: "N5A307840A",
        credentialVisible: true,
        order: 7,
      },
    ],
  });
}

main();
