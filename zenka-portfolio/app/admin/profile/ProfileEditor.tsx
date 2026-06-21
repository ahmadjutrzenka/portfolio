"use client";

import { Profile } from "@/app/generated/prisma/client";
import { useState } from "react";

export default function ProfileEditor({
  profile,
}: {
  profile: Profile | null;
}) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    title: profile?.title || "",
    tagline: profile?.tagline || "",
    email: profile?.email || "",
    linkedinUrl: profile?.linkedinUrl || "",
    githubUrl: profile?.githubUrl || "",
    openToWork: profile?.openToWork ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setMessage(res.ok ? "Saved successfully!" : "Failed to save.");
    setSaving(false);
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
      <div className="flex flex-col gap-4">
        {[
          { label: "Name", name: "name" },
          { label: "Title", name: "title" },
          { label: "Tagline", name: "tagline" },
          { label: "Email", name: "email" },
          { label: "LinkedIn URL", name: "linkedinUrl" },
          { label: "GitHub URL", name: "githubUrl" },
        ].map(({ label, name }) => (
          <div key={name} className="flex flex-col gap-1.5">
            <label className="text-sm text-[var(--text-muted)]">{label}</label>
            <input
              type="text"
              name={name}
              value={form[name as keyof typeof form] as string}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
            />
          </div>
        ))}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="openToWork"
            id="openToWork"
            checked={form.openToWork}
            onChange={handleChange}
            className="accent-[#8b7ff5]"
          />
          <label
            htmlFor="openToWork"
            className="text-sm text-[var(--text-muted)]"
          >
            Open to Work
          </label>
        </div>
      </div>
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
