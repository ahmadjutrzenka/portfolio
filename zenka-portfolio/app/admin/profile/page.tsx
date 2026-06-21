import prisma from "@/lib/prisma";
import ProfileEditor from "./ProfileEditor";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  return <ProfileEditor profile={profile} />;
}
