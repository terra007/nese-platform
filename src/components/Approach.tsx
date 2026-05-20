const pillars = [
  {
    step: "01",
    title: "Collection",
    description:
      "We draw on open-source intelligence, academic literature, elite network reporting, and proprietary data feeds to build a comprehensive picture of the operating environment across our focus regions.",
    tags: ["OSINT", "HUMINT", "Quantitative Data"],
  },
  {
    step: "02",
    title: "Analysis",
    description:
      "Our analysts apply structured analytical techniques — scenario planning, Red Teaming, and probabilistic forecasting — to stress-test assumptions and surface non-obvious risks before they become crises.",
    tags: ["Scenario Planning", "Red Team", "Forecasting"],
  },
  {
    step: "03",
    title: "Delivery",
    description:
      "Intelligence products are calibrated to the client's decision cycle — from real-time alerts and weekly monitoring briefs to bespoke in-depth assessments and executive workshops.",
    tags: ["Real-Time Alerts", "Written Reports", "Executive Briefings"],
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-32 bg-[#0c0c0e] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl mb-16">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-5">
            Methodology
          </p>
          <h2
            className="text-4xl lg:text-5xl text-white leading-tight"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            Our Analytical Framework
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {pillars.map((pillar) => (
            <div
              key={pillar.step}
              className="group bg-[#0c0c0e] hover:bg-zinc-900 transition-colors duration-300 p-8 lg:p-10"
            >
              <div className="text-[#c9a84c] text-xs font-mono tracking-widest mb-6">
                {pillar.step}
              </div>
              <div className="w-8 h-px bg-[#c9a84c]/35 mb-6 group-hover:w-16 transition-all duration-500" />
              <h3 className="text-white text-xl font-medium mb-4 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-7">
                {pillar.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-[0.15em] uppercase text-zinc-600 border border-zinc-800 px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
