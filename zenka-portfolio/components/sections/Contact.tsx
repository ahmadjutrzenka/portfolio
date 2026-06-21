import { CardSpotlight } from "../ui/card-spotlight";

export default function Contact({ email }: { email: string | null }) {
  return (
    <section id="contact" className="py-8 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-white border-l-4 border-[var(--accent)] pl-3">
        Contact
      </h2>
      <div className="rounded-xl border border-[#241e52] bg-[rgba(255,255,255,0.04)] p-6">
        <div className="relative z-10 flex flex-col gap-4 items-center text-center">
          <p className="text-sm text-[var(--text-muted)]">
            If you have any questions, want to collaborate, or just want to say
            hi — feel free to reach out.
          </p>
          {email && (
            <a
              href={`mailto:${email}`}
              className="px-6 py-2 rounded-full bg-[#8b7ff5] text-white text-sm hover:opacity-80 transition-opacity"
            >
              Email Me
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
