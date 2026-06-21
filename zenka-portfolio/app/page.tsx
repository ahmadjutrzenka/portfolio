import prisma from "@/lib/prisma";
import Hero from "@/components/sections/Hero";

export default async function Home() {
  const profile = await prisma.profile.findUnique({
    where: { id: 1 },
  });

  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
    </main>
  );
}
