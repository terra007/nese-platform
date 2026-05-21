import { getContent } from "@/lib/content";
import ContactForm from "./ContactForm";

const A = "var(--color-accent, #c9a84c)";

export default async function Contact() {
  const content = await getContent();

  return (
    <section id="contact" className="py-32 bg-zinc-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase mb-6" style={{ color: A }}>
              {content["contact.eyebrow"]}
            </p>
            <h2
              className="text-4xl lg:text-5xl leading-tight mb-6"
              style={{
                fontFamily: "var(--font-dm-serif), Georgia, serif",
                color: "var(--color-text-primary, #fafafa)",
              }}
            >
              {content["contact.headline"]}
            </h2>
            <p className="leading-relaxed mb-10 max-w-sm" style={{ color: "var(--color-text-body, #a1a1aa)" }}>
              {content["contact.subtext"]}
            </p>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" style={{ color: A }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-zinc-400 text-sm">{content["contact.email"]}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5" style={{ color: A }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-zinc-400 text-sm">{content["contact.location"]}</span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
