import prisma from "@/lib/prisma";
import GalleryEditor from "./GalleryEditor";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { order: "asc" },
  });
  return <GalleryEditor items={items} />;
}
