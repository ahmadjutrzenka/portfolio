import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; imageId: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { imageId } = await params;

  const image = await prisma.projectImage.findUnique({
    where: { id: Number(imageId) },
  });
  if (!image) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await cloudinary.uploader.destroy(image.cloudinaryId);
  await prisma.projectImage.delete({ where: { id: Number(imageId) } });

  return NextResponse.json({ success: true });
}
