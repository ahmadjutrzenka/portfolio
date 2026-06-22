import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const data = await req.json();

  const cert = await prisma.certification.update({
    where: { id: Number(id) },
    data: {
      name: data.name,
      issuer: data.issuer,
      issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
      expirationDate: data.expirationDate
        ? new Date(data.expirationDate)
        : null,
      credentialId: data.credentialId || null,
      credentialUrl: data.credentialUrl || null,
      credentialVisible: data.credentialVisible,
      order: Number(data.order),
    },
  });

  return NextResponse.json(cert);
}
