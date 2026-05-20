export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-zinc-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <p className="text-[#c9a84c] text-[11px] tracking-[0.25em] uppercase mb-6">
              Get in Touch
            </p>
            <h2
              className="text-4xl lg:text-5xl text-white leading-tight mb-6"
              style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
            >
              Request an Analysis
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-10 max-w-sm">
              Whether you need a bespoke political risk assessment, ongoing
              monitoring, or a rapid-response brief, our team is available
              to discuss your requirements in complete confidence.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-zinc-400 text-sm">contact@nese-advisory.org</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-9 h-9 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-zinc-400 text-sm">Vienna, Austria</span>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-zinc-900 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    className="w-full bg-zinc-900 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                    placeholder="Your organisation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-zinc-900 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[10px] text-zinc-600 uppercase tracking-[0.18em] mb-2">
                  Enquiry
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-zinc-900 border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-[#c9a84c]/40 transition-colors resize-none"
                  placeholder="Describe your requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#c9a84c] text-zinc-950 font-medium text-sm tracking-wide hover:bg-[#d4b96a] transition-colors duration-200"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
