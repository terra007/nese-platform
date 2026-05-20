import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-zinc-950">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Gold radial glow from top */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -5%, rgba(201,168,76,0.09) 0%, transparent 65%)",
        }}
      />

      {/* Decorative radar rings — top right */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
          {[180, 120, 60].map((r) => (
            <circle key={r} cx="380" cy="20" r={r} stroke="#c9a84c" strokeWidth="0.8" />
          ))}
          {[0, 40, 80, 120, 160].map((angle) => (
            <line
              key={angle}
              x1="380" y1="20"
              x2={380 + 200 * Math.cos((angle * Math.PI) / 180)}
              y2={20 + 200 * Math.sin((angle * Math.PI) / 180)}
              stroke="#c9a84c"
              strokeWidth="0.6"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-10 border border-[#c9a84c]/25 bg-[#c9a84c]/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="text-[#c9a84c] text-[11px] tracking-[0.22em] uppercase font-medium">
              Geopolitical Intelligence & Risk Advisory
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-5xl sm:text-6xl lg:text-[5.5rem] text-white leading-[1.05] tracking-tight mb-8"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            Strategic Intelligence
            <br />
            <span style={{ color: "#c9a84c" }}>for a Complex World.</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-xl text-lg sm:text-xl text-zinc-400 leading-relaxed mb-12">
            New East Strategic Edge delivers rigorous geopolitical risk analysis,
            security consulting, and threat intelligence to those navigating
            Eastern Europe&apos;s most volatile fault lines.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="#services"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#c9a84c] text-zinc-950 font-medium text-sm tracking-wide hover:bg-[#d4b96a] transition-colors duration-200"
            >
              Explore Our Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/15 text-zinc-300 text-sm tracking-wide hover:border-white/30 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Request an Analysis
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] text-zinc-500 tracking-[0.25em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-500 to-transparent" />
      </div>
    </section>
  );
}
