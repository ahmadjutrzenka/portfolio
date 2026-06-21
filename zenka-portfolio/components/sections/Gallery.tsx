import { GalleryItem } from "@/app/generated/prisma/client";

interface GalleryProps {
  items: GalleryItem[];
}

export default function Gallery({ items }: GalleryProps) {
  if (items.length === 0) {
    return (
      <section id="gallery" className="py-8 flex flex-col gap-6">
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

  const [first, ...rest] = items;

  return (
    <section id="gallery" className="py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        Beyond the Code
      </h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
          <img
            src={first.url}
            alt={first.caption ?? "Gallery photo"}
            className="w-full h-full object-cover"
          />
          {first.caption && (
            <p className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-black/50 text-xs text-white">
              {first.caption}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {rest.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl overflow-hidden aspect-square"
            >
              <img
                src={item.url}
                alt={item.caption ?? "Gallery photo"}
                className="w-full h-full object-cover"
              />
              {item.caption && (
                <p className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-black/50 text-xs text-white truncate">
                  {item.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
