import { getContent } from "@/lib/content";

export default async function Approach() {
  const content = await getContent();

  const pillars = [
    {
      step: "01",
      title: content["approach.1.title"],
      description: content["approach.1.description"],
      tags: content["approach.1.tags"].split(",").map((t) => t.trim()),
    },
    {
      step: "02",
      title: content["approach.2.title"],
      description: content["approach.2.description"],
      tags: content["approach.2.tags"].split(",").map((t) => t.trim()),
    },
    {
      step: "03",
      title: content["approach.3.title"],
      description: content["approach.3.description"],
      tags: content["approach.3.tags"].split(",").map((t) => t.trim()),
    },
  ];

  return (
    <section
      id="approach"
      className="py-32 bg-[#0c0c0e] border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-xl mb-16">
          <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-5">
            {content["approach.eyebrow"]}
          </p>
          <h2
            className="text-4xl lg:text-5xl text-white leading-tight"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            {content["approach.headline"]}
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
