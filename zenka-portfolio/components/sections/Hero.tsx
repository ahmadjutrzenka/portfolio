"use client";

import { CanvasText } from "../ui/canvas-text";
import { Profile } from "@/app/generated/prisma/client";

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section id="home" className="py-12">
      <div className="flex flex-col gap-4">
        {/* Avatar + Name row */}
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-[#8b7ff5] flex items-center justify-center text-white text-2xl font-bold">
              AJ
            </div>
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-[var(--bg-main)]" />
          </div>

          {/* Name + Title */}
          <div className="flex flex-col gap-1">
            <CanvasText
              text={profile?.name || "Ahmad Jutrzenka Ilyas"}
              className="text-4xl font-bold"
              backgroundClassName="bg-blue-600 dark:bg-blue-700"
              colors={[
                "rgba(139, 127, 245, 0.9)",
                "rgba(157, 150, 255, 0.8)",
                "rgba(100, 90, 220, 0.7)",
                "rgba(180, 170, 255, 0.6)",
                "rgba(139, 127, 245, 0.5)",
                "rgba(80, 70, 180, 0.4)",
              ]}
              lineGap={4}
              animationDuration={20}
            />
            <p className="text-[#8b7ff5]">{profile?.title}</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-sm text-[var(--text-muted)]">{profile?.tagline}</p>

        {/* Open to Work */}
        {profile?.openToWork && (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full w-fit bg-[var(--bg-badge)]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-[var(--text-main)]">
              Open to Work
            </span>
          </div>
        )}

        {/* Social links */}
        <div className="flex gap-3">
          <a
            href={profile?.linkedinUrl || "https://linkedin.com/in/jutrzenka"}
            target="_blank"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[var(--text-muted)] hover:text-[#8b7ff5] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={profile?.githubUrl || "https://github.com/ahmadjutrzenka"}
            target="_blank"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm text-[var(--text-muted)] hover:text-[#8b7ff5] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://drive.google.com/file/d/1PFi9zK858sZpdMHumjrs13Mb3Tpyn_M2/view?usp=sharing"
            target="_blank"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8b7ff5] text-sm text-white hover:opacity-90 transition-opacity"
          >
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
