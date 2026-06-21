import { handlers } from "@/auth";
export const { GET, POST } = handlers;
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { bio } = await req.json();

  const about = await prisma.about.upsert({
    where: { id: 1 },
    update: { bio },
    create: { id: 1, bio },
  });

  return NextResponse.json(about);
}
