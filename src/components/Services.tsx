const services = [
  {
    id: "01",
    title: "Political Risk Assessments",
    description:
      "Comprehensive evaluation of political stability, regulatory environments, and governance risks across Eastern European and Central Asian markets. We assess electoral volatility, leadership transitions, and institutional capacity to help clients quantify exposure and build resilience.",
    icon: (
      <svg className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Security Consulting",
    description:
      "Operational security advisory for organisations in complex environments. Our consulting spans executive protection, facility hardening, crisis response planning, and personnel risk management — tailored for the unique challenges of post-Soviet and Balkan operational theatres.",
    icon: (
      <svg className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Hybrid Threat Analysis",
    description:
      "Systematic mapping of non-conventional warfare vectors including disinformation campaigns, cyber intrusions, energy coercion, and proxy force activities. We identify the fingerprints of state-sponsored hybrid operations and deliver early-warning indicators for clients in exposed sectors.",
    icon: (
      <svg className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Tools of Coercion",
    description:
      "In-depth analysis of the coercive instruments deployed by state and non-state actors — from economic sanctions and energy leverage to lawfare, targeted operations, and information manipulation. We document, categorise, and model these tools to enable proactive counterstrategy.",
    icon: (
      <svg className="w-5 h-5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-5">
              Core Services
            </p>
            <h2
              className="text-4xl lg:text-5xl text-white leading-tight"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Intelligence-Driven Advisory
            </h2>
          </div>
          <p className="max-w-xs text-zinc-500 text-sm leading-relaxed">
            Analytical frameworks combining rigorous research with practitioner
            expertise to deliver decision-ready intelligence.
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
