"use client";

import { useState, useEffect, useCallback } from "react";
import { GalleryItem } from "@/app/generated/prisma/client";

interface GalleryProps {
  items: GalleryItem[];
}

const INTERVAL = 4000;

export default function Gallery({ items }: GalleryProps) {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, items.length]);

  if (items.length === 0) {
    return (
      <section id="gallery" className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
          Beyond the Code
        </h2>
        <div className="rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] p-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Photos coming soon.
          </p>
        </div>
      </section>
    );
  }

  const featured = items[active];

  return (
    <section id="gallery" className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        Beyond the Code
      </h2>

      {/* Desktop: featured kiri + thumbnails kanan */}
      {/* Mobile: featured atas + thumbnails horizontal scroll bawah */}
      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-[1fr_160px] sm:gap-3">
        {/* Featured photo */}
        <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
          <img
            key={featured.id}
            src={featured.url}
            alt={featured.caption ?? "Gallery photo"}
            className="w-full h-full object-cover"
          />
          {featured.caption && (
            <p className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/70 to-transparent text-xs text-white">
              {featured.caption}
            </p>
          )}
        </div>

        {/* Thumbnails — vertikal di desktop, horizontal scroll di mobile */}
        <div className="flex flex-row gap-2 overflow-x-auto pb-1 sm:flex-col sm:overflow-y-auto sm:overflow-x-hidden sm:max-h-[calc(4/3*100%)] sm:pb-0 sm:pr-1 scrollbar-none">
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              className={`relative rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200
                w-24 aspect-video sm:w-auto sm:aspect-video
                ${i === active ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
            >
              <img
                src={item.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
