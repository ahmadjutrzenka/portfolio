"use client";

import {
  Project,
  ProjectImage,
  ProjectStatus,
} from "@/app/generated/prisma/client";
import { useState, useRef } from "react";

type ProjectWithImages = Project & { images: ProjectImage[] };

const emptyForm = {
  slug: "",
  title: "",
  description: "",
  techStack: "",
  featured: false,
  repoUrl: "",
  repoVisible: true,
  demoUrl: "",
  demoVisible: true,
  status: "Completed" as ProjectStatus,
  order: 0,
  startDate: "",
};

export default function ProjectsEditor({
  projects: initial,
}: {
  projects: ProjectWithImages[];
}) {
  const [projects, setProjects] = useState(initial);
  const [editing, setEditing] = useState<ProjectWithImages | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function openEdit(project: ProjectWithImages) {
    setEditing(project);
    setAdding(false);
    setForm({
      slug: project.slug,
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(", "),
      featured: project.featured,
      repoUrl: project.repoUrl || "",
      repoVisible: project.repoVisible,
      demoUrl: project.demoUrl || "",
      demoVisible: project.demoVisible,
      status: project.status,
      order: project.order,
      startDate: project.startDate
        ? new Date(project.startDate).toISOString().split("T")[0]
        : "",
    });
  }

  function openAdd() {
    setEditing(null);
    setAdding(true);
    setForm(emptyForm);
  }

  async function handleSave() {
    const data = {
      ...form,
      techStack: form.techStack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const res = editing
      ? await fetch(`/api/admin/projects/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
      : await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

    if (res.ok) {
      const updated = await res.json();
      if (editing) {
        setProjects((prev) =>
          prev.map((p) =>
            p.id === updated.id ? { ...updated, images: editing.images } : p,
          ),
        );
        setEditing({ ...updated, images: editing.images });
      } else {
        const newProject = { ...updated, images: [] };
        setProjects((prev) => [...prev, newProject]);
        setEditing(newProject);
        setAdding(false);
      }
      setMessage("Saved!");
    } else {
      setMessage("Failed to save.");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (editing?.id === id) setEditing(null);
    }
  }

  async function handleUploadImage() {
    if (!editing || !fileRef.current?.files?.[0]) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", fileRef.current.files[0]);

    const res = await fetch(`/api/admin/projects/${editing.id}/images`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const image = await res.json();
      const updatedProject = { ...editing, images: [...editing.images, image] };
      setEditing(updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.id === editing.id ? updatedProject : p)),
      );
      if (fileRef.current) fileRef.current.value = "";
      setMessage("Image uploaded!");
    } else {
      setMessage("Upload failed.");
    }
    setUploading(false);
  }

  async function handleDeleteImage(imageId: number) {
    if (!editing) return;
    const res = await fetch(
      `/api/admin/projects/${editing.id}/images/${imageId}`,
      {
        method: "DELETE",
      },
    );
    if (res.ok) {
      const updatedProject = {
        ...editing,
        images: editing.images.filter((i) => i.id !== imageId),
      };
      setEditing(updatedProject);
      setProjects((prev) =>
        prev.map((p) => (p.id === editing.id ? updatedProject : p)),
      );
    }
  }

  const showForm = editing || adding;

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button
          onClick={openAdd}
          className="px-4 py-1.5 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-90 transition-opacity"
        >
          + Add Project
        </button>
      </div>

      {message && <p className="text-sm text-green-400">{message}</p>}

      {/* Project list */}
      <div className="flex flex-col gap-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-sm text-white font-medium">{project.title}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {project.status} · order {project.order} ·{" "}
                {project.images.length} image(s)
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(project)}
                className="text-xs text-[var(--text-muted)] hover:text-[#8b7ff5] transition-colors px-3 py-1 rounded-lg border border-[#241e52]"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="text-xs text-red-400 hover:text-red-300 transition-colors px-3 py-1 rounded-lg border border-[#241e52]"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      {showForm && (
        <div className="flex flex-col gap-4 p-6 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]">
          <h2 className="text-lg font-semibold text-white">
            {editing ? `Edit: ${editing.title}` : "Add Project"}
          </h2>

          {[
            { label: "Slug", name: "slug" },
            { label: "Title", name: "title" },
            { label: "Repo URL", name: "repoUrl" },
            { label: "Demo URL", name: "demoUrl" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-xs text-[var(--text-muted)]">
                {label}
              </label>
              <input
                type="text"
                name={name}
                value={form[name as keyof typeof form] as string}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
              />
            </div>
          ))}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--text-muted)]">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5] resize-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--text-muted)]">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              name="techStack"
              value={form.techStack}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="text-xs text-[var(--text-muted)]">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
              >
                {["InDevelopment", "Completed", "Maintained", "Archived"].map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div className="flex flex-col gap-1.5 w-24">
              <label className="text-xs text-[var(--text-muted)]">Order</label>
              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-[var(--text-muted)]">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5] w-48"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { label: "Featured", name: "featured" },
              { label: "Show Repo", name: "repoVisible" },
              { label: "Show Demo", name: "demoVisible" },
            ].map(({ label, name }) => (
              <label
                key={name}
                className="flex items-center gap-2 text-sm text-[var(--text-muted)] cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name as keyof typeof form] as boolean}
                  onChange={handleChange}
                  className="accent-[#8b7ff5]"
                />
                {label}
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-6 py-2 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-90 transition-opacity"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditing(null);
                setAdding(false);
              }}
              className="px-6 py-2 rounded-full border border-[#241e52] text-[var(--text-muted)] text-sm hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>

          {editing && (
            <div className="flex flex-col gap-3 pt-4 border-t border-[#241e52]">
              <h3 className="text-sm font-semibold text-white">Screenshots</h3>
              <div className="flex gap-2 flex-wrap">
                {editing.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group w-24 h-24 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 text-xs"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-center">
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="text-xs text-[var(--text-muted)] file:mr-3 file:px-3 file:py-1 file:rounded-full file:border file:border-[#241e52] file:bg-[var(--bg-hover)] file:text-white file:text-xs"
                />
                <button
                  onClick={handleUploadImage}
                  disabled={uploading}
                  className="px-4 py-1.5 rounded-full bg-[var(--bg-badge)] text-white text-xs hover:opacity-90 disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
