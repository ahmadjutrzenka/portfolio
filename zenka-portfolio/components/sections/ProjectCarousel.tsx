"use client";

import { ProjectImage } from "@/app/generated/prisma/client";
import { useEffect, useState } from "react";

export default function ProjectCarousel({
  images,
}: {
  images: ProjectImage[];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      {images.map((image, index) => (
        <img
          key={image.id}
          src={image.url}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
