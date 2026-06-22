import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const item = await prisma.galleryItem.findUnique({
    where: { id: Number(id) },
  });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await cloudinary.uploader.destroy(item.cloudinaryId);
  await prisma.galleryItem.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}
