"use client";

import { About } from "@/app/generated/prisma/client";
import { useState } from "react";

export default function AboutEditor({ about }: { about: About | null }) {
  const [bio, setBio] = useState(about?.bio || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave() {
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/admin/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bio }),
    });

    if (res.ok) {
      setMessage("Saved successfully!");
    } else {
      setMessage("Failed to save.");
    }

    setSaving(false);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Edit About</h1>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={8}
        className="w-full px-4 py-3 rounded-xl border border-[#241e52] bg-[var(--bg-hover)] text-[var(--text-main)] text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#8b7ff5] resize-none"
      />
      {message && <p className="text-sm text-green-400">{message}</p>}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-fit px-6 py-2 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
