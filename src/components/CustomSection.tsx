import Link from "next/link";
import type { PageSection } from "@/lib/sections";

export default function CustomSection({ section }: { section: PageSection }) {
  const { eyebrow, heading, body, cta_text, cta_url } = section.content;

  if (!heading) return null;

  const paragraphs = (body ?? "")
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="py-32 bg-zinc-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-6">
              {eyebrow}
            </p>
          )}

          <h2
            className="text-4xl lg:text-5xl text-white leading-tight mb-8"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            {heading}
          </h2>

          {paragraphs.length > 0 && (
            <div className="space-y-5 text-zinc-400 text-base leading-relaxed mb-10">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {cta_text && cta_url && (
            <Link
              href={cta_url}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c9a84c] text-zinc-950 font-medium text-sm tracking-wide hover:bg-[#d4b96a] transition-colors duration-200"
            >
              {cta_text}
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
