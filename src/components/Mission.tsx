const stats = [
  { value: "15+", label: "Countries Covered" },
  { value: "200+", label: "Reports Published" },
  { value: "50+", label: "Partner Institutions" },
  { value: "10+", label: "Years of Expertise" },
];

export default function Mission() {
  return (
    <section id="about" className="py-32 bg-zinc-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-6">
              About NESE
            </p>
            <h2
              className="text-4xl lg:text-5xl text-white leading-tight mb-8"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Bridging Expertise<br />and Action
            </h2>
            <div className="space-y-5 text-zinc-400 text-base leading-relaxed">
              <p>
                New East Strategic Edge was founded to close the gap between rigorous
                academic analysis and the real-world decisions faced by governments,
                investors, and security practitioners operating in Eastern Europe&apos;s
                most contested environments.
              </p>
              <p>
                Our team combines deep regional expertise with methodological
                rigour — drawing on backgrounds in political science, intelligence
                studies, international law, and operational security to deliver
                intelligence that is analytically sound and operationally relevant.
              </p>
              <p>
                We focus on the zone stretching from the Baltic to the Black Sea,
                the South Caucasus, and Central Asia — regions that sit at the
                intersection of great-power competition and are frequently
                underserved by mainstream risk providers.
              </p>
            </div>
          </div>

          {/* Right: Stats + Blockquote */}
          <div className="space-y-8 lg:pt-14">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-zinc-950 p-7 text-center">
                  <div
                    className="text-4xl mb-2"
                    style={{ color: "#c9a84c", fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div className="border-l-2 border-[#c9a84c]/40 pl-6 py-1">
              <blockquote
                className="text-zinc-300 text-lg leading-relaxed mb-3 italic"
                style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
              >
                &ldquo;The greatest risk is not uncertainty itself — it is the failure
                to understand it.&rdquo;
              </blockquote>
              <cite className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase not-italic">
                NESE Founding Principle
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
