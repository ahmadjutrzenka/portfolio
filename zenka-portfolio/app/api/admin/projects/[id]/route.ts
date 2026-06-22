import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const data = await req.json();

    const project = await prisma.project.update({
      where: { id: Number(id) },
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

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id: Number(id) } });

    revalidatePath("/");
    revalidatePath("/admin/projects");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
