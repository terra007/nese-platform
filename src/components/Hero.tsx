import Link from "next/link";
import { getContent } from "@/lib/content";

const A  = "var(--color-accent, #c9a84c)";
const OB = "var(--color-outline-btn, #d4d4d8)";

export default async function Hero() {
  const content = await getContent();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ backgroundColor: "var(--color-bg, #09090b)" }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 90% 60% at 50% -5%, color-mix(in srgb, ${A} 9%, transparent) 0%, transparent 65%)`,
        }}
      />

      {/* Decorative radar rings */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          {[180, 120, 60].map((r) => (
            <circle key={r} cx="380" cy="20" r={r} stroke="currentColor" strokeWidth="0.8"
              style={{ color: A }} />
          ))}
          {[0, 40, 80, 120, 160].map((angle) => (
            <line key={angle} x1="380" y1="20"
              x2={380 + 200 * Math.cos((angle * Math.PI) / 180)}
              y2={20 + 200 * Math.sin((angle * Math.PI) / 180)}
              stroke="currentColor" strokeWidth="0.6"
              style={{ color: A }} />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-10 border"
            style={{
              borderColor: `color-mix(in srgb, ${A} 25%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${A} 4%, transparent)`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: A }}
            />
            <span
              className="text-[11px] tracking-[0.22em] uppercase font-medium"
              style={{ color: A }}
            >
              {content["hero.badge"]}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8"
            style={{
              fontFamily: "var(--font-dm-serif), Georgia, serif",
              color: "var(--color-text-primary, #fafafa)",
            }}
          >
            {content["hero.headline_1"]}
            <br />
            <span style={{ color: A }}>{content["hero.headline_2"]}</span>
          </h1>

          {/* Subheadline */}
          <p
            className="max-w-xl text-lg sm:text-xl leading-relaxed mb-12"
            style={{ color: "var(--color-text-body, #a1a1aa)" }}
          >
            {content["hero.subheadline"]}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="#services"
              className="btn-filled inline-flex items-center gap-2.5 px-8 py-3.5 font-medium text-sm tracking-wide transition-colors duration-200"
            >
              {content["hero.cta1_text"]}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border text-sm tracking-wide transition-all duration-200"
              style={{
                borderColor: `color-mix(in srgb, ${OB} 30%, transparent)`,
                color: OB,
              }}
            >
              {content["hero.cta2_text"]}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40"
        style={{ background: `linear-gradient(to top, var(--color-bg, #09090b), transparent)` }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] text-zinc-500 tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
