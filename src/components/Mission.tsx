import { getContent } from "@/lib/content";

const A = "var(--color-accent, #c9a84c)";

export default async function Mission() {
  const content = await getContent();

  return (
    <section id="about" className="py-32 bg-zinc-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left */}
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase mb-6" style={{ color: A }}>
              {content["mission.eyebrow"]}
            </p>
            <h2
              className="text-4xl lg:text-5xl leading-tight mb-8"
              style={{
                fontFamily: "var(--font-dm-serif), Georgia, serif",
                color: "var(--color-text-primary, #fafafa)",
              }}
            >
              {content["mission.headline_1"]}
              <br />
              {content["mission.headline_2"]}
            </h2>
            <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--color-text-body, #a1a1aa)" }}>
              <p>{content["mission.paragraph_1"]}</p>
              <p>{content["mission.paragraph_2"]}</p>
              <p>{content["mission.paragraph_3"]}</p>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8 lg:pt-14">
            {/* Pull quote */}
            <div
              className="pl-6 py-1 border-l-2"
              style={{ borderColor: `color-mix(in srgb, ${A} 40%, transparent)` }}
            >
              <blockquote
                className="text-zinc-300 text-lg leading-relaxed mb-3 italic"
                style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
              >
                &ldquo;{content["mission.quote"]}&rdquo;
              </blockquote>
              <cite className="text-zinc-600 text-[10px] tracking-[0.2em] uppercase not-italic">
                {content["mission.quote_attribution"]}
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
