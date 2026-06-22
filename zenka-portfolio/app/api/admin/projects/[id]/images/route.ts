import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const projectId = Number(id);

  const project = await prisma.project.findUnique({ where: { id: projectId } });
  if (!project)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const existingImages = await prisma.projectImage.findMany({
    where: { projectId },
  });
  const nextIndex = existingImages.length + 1;
  const publicId = `portfolio/projects/${project.slug}-${nextIndex}`;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(base64, {
    public_id: publicId,
    overwrite: true,
  });

  const image = await prisma.projectImage.create({
    data: {
      projectId,
      cloudinaryId: result.public_id,
      url: result.secure_url,
      order: nextIndex,
    },
  });

  return NextResponse.json(image);
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
