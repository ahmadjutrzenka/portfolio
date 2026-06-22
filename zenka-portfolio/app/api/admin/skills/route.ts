import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { groupId, name } = await req.json();

  const skill = await prisma.skill.create({
    data: { groupId: Number(groupId), name, order: 0 },
  });

  return NextResponse.json(skill);
}
