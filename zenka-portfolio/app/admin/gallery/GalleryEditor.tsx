"use client";

import { GalleryItem } from "@/app/generated/prisma/client";
import { useState, useRef } from "react";

export default function GalleryEditor({
  items: initial,
}: {
  items: GalleryItem[];
}) {
  const [items, setItems] = useState(initial);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const item = await res.json();
      setItems((prev) => [...prev, item]);
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
      setMessage("Uploaded!");
    } else {
      setMessage("Upload failed.");
    }
    setUploading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this photo?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-white">Gallery</h1>
      {message && <p className="text-sm text-green-400">{message}</p>}

      <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]">
        <h2 className="text-sm font-semibold text-white">Upload Photo</h2>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="text-sm text-[var(--text-muted)] file:mr-3 file:px-3 file:py-1 file:rounded-full file:border file:border-[#241e52] file:bg-[var(--bg-hover)] file:text-white file:text-xs"
        />
        <input
          type="text"
          placeholder="Caption (optional)"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-fit px-6 py-2 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative group rounded-xl overflow-hidden aspect-square"
          >
            <img
              src={item.url}
              alt={item.caption ?? ""}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
              {item.caption && (
                <p className="text-xs text-white text-center px-2">
                  {item.caption}
                </p>
              )}
              <button
                onClick={() => handleDelete(item.id)}
                className="px-3 py-1 rounded-full bg-red-500 text-white text-xs hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-[var(--text-muted)] col-span-3">
            No photos yet.
          </p>
        )}
      </div>
    </div>
  );
}
