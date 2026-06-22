import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = await req.json();

    const project = await prisma.project.create({
      data: {
        slug: data.slug,
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        featured: data.featured,
        repoUrl: data.repoUrl || null,
        repoVisible: data.repoVisible,
        demoUrl: data.demoUrl || null,
        demoVisible: data.demoVisible,
        startDate: data.startDate ? new Date(data.startDate) : new Date(),
        status: data.status,
        order: Number(data.order),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
