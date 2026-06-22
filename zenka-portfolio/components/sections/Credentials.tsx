import { Education, Certification } from "@/app/generated/prisma/client";
import { ExternalLink } from "lucide-react";

interface CredentialsProps {
  education: Education[];
  certifications: Certification[];
}

export default function Credentials({
  education,
  certifications,
}: CredentialsProps) {
  return (
    <section id="credentials" className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        Credentials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Education
          </h3>
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] p-4 flex flex-col gap-1"
              >
                <p className="text-sm font-semibold text-white">
                  {edu.institution}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {edu.program}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {edu.startYear} – {edu.endYear ?? "Present"}
                </p>
                {edu.gpa && (
                  <p className="text-xs text-[var(--accent)]">GPA {edu.gpa}</p>
                )}
                {edu.transcriptVisible && edu.transcriptUrl && (
                  <a
                    href={edu.transcriptUrl}
                    target="_blank"
                    className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors mt-1"
                  >
                    View Transcript →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xs uppercase tracking-widest text-[var(--text-muted)]">
            Certifications
          </h3>
          <div className="flex flex-col gap-2">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <p className="text-sm text-white truncate">{cert.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {cert.issuer}
                    {cert.issueDate &&
                      ` · ${new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                  </p>
                </div>
                {cert.credentialVisible && cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#241e52] text-xs text-[var(--text-muted)] hover:border-[#8b7ff5] hover:text-[#8b7ff5] transition-all flex-shrink-0"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Verify
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
