import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, title, tagline, email, linkedinUrl, githubUrl, openToWork } =
    await req.json();

  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: { name, title, tagline, email, linkedinUrl, githubUrl, openToWork },
    create: {
      id: 1,
      name,
      title,
      tagline,
      email,
      linkedinUrl,
      githubUrl,
      openToWork,
    },
  });

  return NextResponse.json(profile);
}
