"use client";

import { Education, Certification } from "@/app/generated/prisma/client";
import { useState } from "react";

interface Props {
  education: Education[];
  certifications: Certification[];
}

export default function CredentialsEditor({
  education: initEdu,
  certifications: initCerts,
}: Props) {
  const [education, setEducation] = useState(initEdu);
  const [certifications, setCertifications] = useState(initCerts);
  const [message, setMessage] = useState("");

  // Education
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [eduForm, setEduForm] = useState({
    institution: "",
    program: "",
    startYear: "",
    endYear: "",
    gpa: "",
    transcriptUrl: "",
    transcriptVisible: false,
    order: 0,
  });

  // Certification
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [certForm, setCertForm] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expirationDate: "",
    credentialId: "",
    credentialUrl: "",
    credentialVisible: true,
    order: 0,
  });

  function openEditEdu(edu: Education) {
    setEditingEdu(edu);
    setEduForm({
      institution: edu.institution,
      program: edu.program,
      startYear: String(edu.startYear),
      endYear: edu.endYear ? String(edu.endYear) : "",
      gpa: edu.gpa || "",
      transcriptUrl: edu.transcriptUrl || "",
      transcriptVisible: edu.transcriptVisible,
      order: edu.order,
    });
  }

  function openEditCert(cert: Certification) {
    setEditingCert(cert);
    setCertForm({
      name: cert.name,
      issuer: cert.issuer,
      issueDate: cert.issueDate
        ? new Date(cert.issueDate).toISOString().split("T")[0]
        : "",
      expirationDate: cert.expirationDate
        ? new Date(cert.expirationDate).toISOString().split("T")[0]
        : "",
      credentialId: cert.credentialId || "",
      credentialUrl: cert.credentialUrl || "",
      credentialVisible: cert.credentialVisible,
      order: cert.order,
    });
  }

  async function saveEdu() {
    const res = await fetch(`/api/admin/education/${editingEdu!.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...eduForm,
        startYear: Number(eduForm.startYear),
        endYear: eduForm.endYear ? Number(eduForm.endYear) : null,
        order: Number(eduForm.order),
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setEducation((prev) =>
        prev.map((e) => (e.id === updated.id ? updated : e)),
      );
      setEditingEdu(null);
      setMessage("Saved!");
    }
  }

  async function saveCert() {
    const res = await fetch(`/api/admin/certifications/${editingCert!.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...certForm,
        issueDate: certForm.issueDate ? new Date(certForm.issueDate) : null,
        expirationDate: certForm.expirationDate
          ? new Date(certForm.expirationDate)
          : null,
        order: Number(certForm.order),
      }),
    });
    if (res.ok) {
      const updated = await res.json();
      setCertifications((prev) =>
        prev.map((c) => (c.id === updated.id ? updated : c)),
      );
      setEditingCert(null);
      setMessage("Saved!");
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <h1 className="text-2xl font-bold text-white">Credentials</h1>
      {message && <p className="text-sm text-green-400">{message}</p>}

      {/* Education */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Education
        </h2>
        {education.map((edu) => (
          <div
            key={edu.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]"
          >
            <div>
              <p className="text-sm text-white font-medium">
                {edu.institution}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {edu.program} · {edu.startYear}–{edu.endYear ?? "Present"}
              </p>
            </div>
            <button
              onClick={() => openEditEdu(edu)}
              className="text-xs text-[var(--text-muted)] hover:text-[#8b7ff5] px-3 py-1 rounded-lg border border-[#241e52]"
            >
              Edit
            </button>
          </div>
        ))}
        {editingEdu && (
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]">
            {[
              { label: "Institution", key: "institution" },
              { label: "Program", key: "program" },
              { label: "Start Year", key: "startYear" },
              { label: "End Year", key: "endYear" },
              { label: "GPA", key: "gpa" },
              { label: "Transcript URL", key: "transcriptUrl" },
            ].map(({ label, key }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs text-[var(--text-muted)]">
                  {label}
                </label>
                <input
                  type="text"
                  value={eduForm[key as keyof typeof eduForm] as string}
                  onChange={(e) =>
                    setEduForm((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
                />
              </div>
            ))}
            <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={eduForm.transcriptVisible}
                onChange={(e) =>
                  setEduForm((p) => ({
                    ...p,
                    transcriptVisible: e.target.checked,
                  }))
                }
                className="accent-[#8b7ff5]"
              />
              Show Transcript Link
            </label>
            <div className="flex gap-3">
              <button
                onClick={saveEdu}
                className="px-6 py-2 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={() => setEditingEdu(null)}
                className="px-6 py-2 rounded-full border border-[#241e52] text-[var(--text-muted)] text-sm hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Certifications */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Certifications
        </h2>
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]"
          >
            <div>
              <p className="text-sm text-white font-medium">{cert.name}</p>
              <p className="text-xs text-[var(--text-muted)]">{cert.issuer}</p>
            </div>
            <button
              onClick={() => openEditCert(cert)}
              className="text-xs text-[var(--text-muted)] hover:text-[#8b7ff5] px-3 py-1 rounded-lg border border-[#241e52]"
            >
              Edit
            </button>
          </div>
        ))}
        {editingCert && (
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)]">
            {[
              { label: "Name", key: "name" },
              { label: "Issuer", key: "issuer" },
              { label: "Issue Date", key: "issueDate" },
              { label: "Expiration Date", key: "expirationDate" },
              { label: "Credential ID", key: "credentialId" },
              { label: "Credential URL", key: "credentialUrl" },
            ].map(({ label, key }) => (
              <div key={key} className="flex flex-col gap-1">
                <label className="text-xs text-[var(--text-muted)]">
                  {label}
                </label>
                <input
                  type={key.includes("Date") ? "date" : "text"}
                  value={certForm[key as keyof typeof certForm] as string}
                  onChange={(e) =>
                    setCertForm((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="px-3 py-2 rounded-lg border border-[#241e52] bg-[var(--bg-hover)] text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#8b7ff5]"
                />
              </div>
            ))}
            <label className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={certForm.credentialVisible}
                onChange={(e) =>
                  setCertForm((p) => ({
                    ...p,
                    credentialVisible: e.target.checked,
                  }))
                }
                className="accent-[#8b7ff5]"
              />
              Show Credential Link
            </label>
            <div className="flex gap-3">
              <button
                onClick={saveCert}
                className="px-6 py-2 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-90"
              >
                Save
              </button>
              <button
                onClick={() => setEditingCert(null)}
                className="px-6 py-2 rounded-full border border-[#241e52] text-[var(--text-muted)] text-sm hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
