import { getContent } from "@/lib/content";

const serviceIcons = [
  <svg key="1" className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="2" className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="3" className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
  <svg key="4" className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>,
];

export default async function Services() {
  const content = await getContent();

  const services = [
    {
      id: "01",
      title: content["services.1.title"],
      description: content["services.1.description"],
      icon: serviceIcons[0],
    },
    {
      id: "02",
      title: content["services.2.title"],
      description: content["services.2.description"],
      icon: serviceIcons[1],
    },
    {
      id: "03",
      title: content["services.3.title"],
      description: content["services.3.description"],
      icon: serviceIcons[2],
    },
    {
      id: "04",
      title: content["services.4.title"],
      description: content["services.4.description"],
      icon: serviceIcons[3],
    },
  ];

  return (
    <section id="services" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-5">
              {content["services.eyebrow"]}
            </p>
            <h2
              className="text-4xl lg:text-5xl text-white leading-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              {content["services.headline"]}
            </h2>
          </div>
          <p className="max-w-xs text-zinc-500 text-sm leading-relaxed">
            {content["services.subtext"]}
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 lg:p-10 bg-zinc-950 hover:bg-[#0e0e10] transition-colors duration-300"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-[#c9a84c] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="flex items-start gap-5">
                <span className="text-zinc-700 text-xs font-mono mt-0.5 flex-shrink-0 tabular-nums">
                  {service.id}
                </span>
                <div>
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-white text-base font-medium mb-3 group-hover:text-[#c9a84c] transition-colors duration-200 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
