import { About } from "@/app/generated/prisma/client";

interface AboutProps {
  about: About | null;
}

export default function AboutSection({ about }: AboutProps) {
  return (
    <section id="about" className="py-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        About
      </h2>
      <div className="rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] p-6">
        <p className="text-[var(--text-muted)] leading-relaxed">{about?.bio}</p>
      </div>
    </section>
  );
}
