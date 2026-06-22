import prisma from "@/lib/prisma";
import CredentialsEditor from "./CredentialsEditor";

export default async function AdminCredentialsPage() {
  const [education, certifications] = await Promise.all([
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
  ]);
  return (
    <CredentialsEditor education={education} certifications={certifications} />
  );
}
