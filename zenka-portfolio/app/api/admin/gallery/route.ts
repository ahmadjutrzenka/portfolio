import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const caption = formData.get("caption") as string;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await new Promise<{ public_id: string; secure_url: string }>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "portfolio/gallery",
            transformation: [{ width: 1920, crop: "limit", quality: "auto" }],
          },
          (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    },
  );

  const optimizedUrl = result.secure_url.replace("/upload/", "/upload/f_auto/");

  const item = await prisma.galleryItem.create({
    data: {
      cloudinaryId: result.public_id,
      url: optimizedUrl,
      caption: caption || null,
      order: 0,
    },
  });

  return NextResponse.json(item);
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
