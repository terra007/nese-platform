import Image from "next/image";
import Link from "next/link";
import { existsSync } from "fs";
import path from "path";

const publications = [
  {
    title:
      "From Moscow's Grip to Washington's Embrace: Armenia's Internal Transformation and its Turn to the West",
    venue: "Denkfabrik Academy",
    year: "2025",
    href: "https://denkfabrik.online/milana-bagdasarian-from-moscows-grip-to-washingtons-embrace-armenias-internal-transformation-and-its-turn-to-the-west/",
  },
  {
    title: "Accelerating EU Enlargement: A Participation Readiness Framework",
    venue: "IDM Institute for the Danube Region and Central Europe",
    year: "2026",
    href: "https://www.idm.at/idm-pps-4-2026-accelerating-eu-enlargement/",
  },
  {
    title:
      "Transforming Justice: Why Compassion and Reconciliation Are Better Than a Blindfold",
    venue: "Mediares — Journal on Conflict Transformation & Restorative Justice",
    year: "2023",
    href: "https://www.mediaresrivista.it/",
  },
];

const credentials = [
  {
    role: "External Policy Researcher",
    org: "IDM Institute for the Danube Region and Central Europe",
    period: "2025 – Present",
  },
  {
    role: "Policy Research — Hybrid Pressure & Resilience Index",
    org: "Central European University",
    period: "2025 – Present",
  },
  {
    role: "Representative Assistant",
    org: "Armenian Delegation to the OSCE & UN Vienna",
    period: "2025",
  },
  {
    role: "Geopolitical Analyst",
    org: "Spykman Center",
    period: "2023 – Present",
  },
];

export default function Founder() {
  const hasPhoto = existsSync(
    path.join(process.cwd(), "public", "milana-bagdasarian.jpg")
  );

  return (
    <section
      id="team"
      className="py-32 bg-zinc-950 border-t border-white/[0.06]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] tracking-[0.25em] uppercase mb-5" style={{ color: "var(--color-accent)" }}>
            Leadership
          </p>
          <h2
            className="text-4xl lg:text-5xl text-white leading-tight max-w-xl"
            style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
          >
            The Analyst Behind NESE
          </h2>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Photo column */}
          <div className="lg:col-span-4">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-2 border" style={{ borderColor: "color-mix(in srgb, var(--color-accent) 10%, transparent)" }} />
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                {hasPhoto ? (
                  <Image
                    src="/milana-bagdasarian.jpg"
                    alt="Milana Bagdasarian — Founder, New East Strategic Edge"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                    <span
                      className="text-6xl text-zinc-700"
                      style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
                    >
                      MB
                    </span>
                  </div>
                )}
                {/* Subtle overlay at bottom */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              </div>

              {/* Name card */}
              <div className="mt-5">
                <h3
                  className="text-white text-xl mb-1"
                  style={{
                    fontFamily: "var(--font-dm-serif), Georgia, serif",
                  }}
                >
                  Milana Bagdasarian
                </h3>
                <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-accent)" }}>
                  Founder &amp; Lead Analyst
                </p>
                <p className="text-zinc-600 text-xs tracking-wide">
                  Vienna, Austria
                </p>
              </div>
            </div>
          </div>

          {/* Bio + credentials column */}
          <div className="lg:col-span-8 space-y-10">
            {/* Bio */}
            <div>
              <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
                <p>
                  Milana Bagdasarian is a policy researcher and geopolitical
                  analyst specialising in hybrid threats, democratic resilience,
                  and security dynamics across Eastern Europe and the South
                  Caucasus. Her work sits at the intersection of intelligence
                  analysis, international law, and strategic policy — translating
                  complex regional power shifts into actionable assessments.
                </p>
                <p>
                  Drawing on advanced training at{" "}
                  <span className="text-zinc-300">
                    Central European University
                  </span>{" "}
                  and{" "}
                  <span className="text-zinc-300">Collegium Civitas, Warsaw</span>
                  , and hands-on experience at institutions including the{" "}
                  <span className="text-zinc-300">
                    Armenian Delegation to the OSCE & UN Vienna
                  </span>{" "}
                  and the{" "}
                  <span className="text-zinc-300">
                    IDM Institute for the Danube Region
                  </span>
                  , she has developed a deep analytical framework for
                  understanding how state and non-state actors deploy coercive
                  tools — from disinformation and cyber operations to economic
                  leverage and institutional manipulation.
                </p>
                <p>
                  Her published research on Armenia's geopolitical realignment
                  and EU enlargement preparedness has been recognised by leading
                  European policy institutes. She has spoken at the{" "}
                  <span className="text-zinc-300">Warsaw Security Forum</span>,
                  the{" "}
                  <span className="text-zinc-300">
                    OSCE Supplementary Human Dimension Meeting
                  </span>
                  , and{" "}
                  <span className="text-zinc-300">Denkfabrik Academy Vienna</span>{" "}
                  — consistently bridging academic rigour with policy relevance.
                </p>
              </div>
            </div>

            {/* Pull quote */}
            <div className="border-l-2 pl-6 py-1" style={{ borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)" }}>
              <blockquote
                className="text-zinc-300 text-lg leading-relaxed italic"
                style={{ fontFamily: "var(--font-dm-serif), Georgia, serif" }}
              >
                &ldquo;Europe&rsquo;s security landscape is shifting — and fast.
                Strategic clarity is no longer optional; it is the precondition
                for meaningful engagement.&rdquo;
              </blockquote>
              <cite className="mt-3 block text-zinc-600 text-[10px] tracking-[0.2em] uppercase not-italic">
                Warsaw Security Forum, 2025
              </cite>
            </div>

            {/* Current positions */}
            <div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-4">
                Current Positions
              </p>
              <div className="space-y-3">
                {credentials.map((c) => (
                  <div
                    key={c.role}
                    className="flex items-start gap-4 py-3 border-b border-white/[0.04] last:border-0"
                  >
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "var(--color-accent)" }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-300 text-sm">{c.role}</p>
                      <p className="text-zinc-600 text-xs mt-0.5">{c.org}</p>
                    </div>
                    <span className="text-zinc-700 text-[11px] font-mono shrink-0">
                      {c.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-4">
                Selected Publications
              </p>
              <div className="space-y-3">
                {publications.map((pub) => (
                  <Link
                    key={pub.title}
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 py-3 border-b border-white/[0.04] last:border-0 transition-colors"
                    style={{ ["--hover-border" as string]: "color-mix(in srgb, var(--color-accent) 20%, transparent)" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "color-mix(in srgb, var(--color-accent) 20%, transparent)")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "")}
                  >
                    <svg
                      className="w-3.5 h-3.5 mt-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                      style={{ color: "var(--color-accent)" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="text-zinc-300 text-sm group-hover:text-white transition-colors leading-snug">
                        {pub.title}
                      </p>
                      <p className="text-zinc-600 text-xs mt-1">
                        {pub.venue} · {pub.year}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
