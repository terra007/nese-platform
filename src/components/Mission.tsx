import { getContent } from "@/lib/content";

export default async function Mission() {
  const content = await getContent();

  const stats = [
    {
      value: content["mission.stat_1_value"],
      label: content["mission.stat_1_label"],
    },
    {
      value: content["mission.stat_2_value"],
      label: content["mission.stat_2_label"],
    },
    {
      value: content["mission.stat_3_value"],
      label: content["mission.stat_3_label"],
    },
    {
      value: content["mission.stat_4_value"],
      label: content["mission.stat_4_label"],
    },
  ];

  return (
    <section
      id="about"
      className="py-32 bg-zinc-950 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Text */}
          <div>
            <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-6">
              {content["mission.eyebrow"]}
            </p>
            <h2
              className="text-4xl lg:text-5xl text-white leading-tight mb-8"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              {content["mission.headline_1"]}
              <br />
              {content["mission.headline_2"]}
            </h2>
            <div className="space-y-5 text-zinc-400 text-base leading-relaxed">
              <p>{content["mission.paragraph_1"]}</p>
              <p>{content["mission.paragraph_2"]}</p>
              <p>{content["mission.paragraph_3"]}</p>
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
                    style={{
                      color: "var(--color-accent, #c9a84c)",
                      fontFamily: "var(--font-dm-serif), Georgia, serif",
                    }}
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
