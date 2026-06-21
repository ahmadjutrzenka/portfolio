import prisma from "@/lib/prisma";
import AboutEditor from "./AboutEditor";

export default async function AdminAboutPage() {
  const about = await prisma.about.findUnique({ where: { id: 1 } });

  return <AboutEditor about={about} />;
}
