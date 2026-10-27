import Image from "next/image";
import Link from "next/link";
import { existsSync } from "fs";
import path from "path";
import { LINKEDIN_URL } from "@/lib/links";

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


const currentPosition = {
  role: "Research Fellow",
  org: "Central European University",
  location: "Vienna",
  period: "Jul 2026 – Present",
  summary:
    "Designed the Hybrid Pressure & Resilience Index to assess state institutional capacity under hybrid threats, applied to Armenia across five dimensions: legal-institutional capacity, cyber and public-private partnerships, information safeguards, energy and economic resilience, and coordination and transparency.",
};

const experience = [
  {
    role: "External Policy Researcher",
    org: "IDM Institute for the Danube Region and Central Europe",
    location: "Vienna",
    period: "Oct 2025 – May 2026",
    summary:
      "Co-authored “Accelerating EU Accession” and developed a Participation Readiness Framework for candidate-state participation in EU Council structures.",
  },
  {
    role: "Data Engineer",
    org: "Dunapack Packaging",
    location: "Vienna",
    period: "Apr 2025 – Mar 2026",
    summary:
      "Built analytical models and executive dashboards (Databricks, Power BI) and supported the Microsoft Purview data-governance programme.",
  },
  {
    role: "Representatives' Assistant",
    org: "Armenian Delegation to the OSCE & United Nations",
    location: "Vienna",
    period: "Jun – Jul 2025",
    summary:
      "Reported on OSCE Security Committee, Human Dimension and UN counter-terrorism sessions; drafted briefings on regional security and human rights.",
  },
  {
    role: "Researcher",
    org: "Shattuck Center for Human Rights",
    location: "",
    period: "Jun – Jul 2025",
    summary:
      "Supported the international conference “Contested Solidarities” and the publication project “Healing Ukraine”.",
  },
  {
    role: "Researcher / Analyst",
    org: "Augustin",
    location: "Vienna",
    period: "Feb – Jun 2025",
    summary:
      "Qualitative research on migration and human rights law in Austria; authored a policy report on deportation practices.",
  },
  {
    role: "Business Researcher",
    org: "Simon-Kucher",
    location: "Warsaw",
    period: "Oct 2023 – Aug 2024",
    summary:
      "Cross-industry market research and data analysis; prepared 500+ industry and market reports.",
  },
  {
    role: "Geopolitical Analyst",
    org: "Spykman Center",
    location: "Paris",
    period: "Jun 2023 – Jan 2026",
    summary:
      "OSINT-based analysis of Russia-related regional dynamics, strategic signalling and narrative trends.",
  },
  {
    role: "Legal Researcher",
    org: "Global Animal Law (GAL)",
    location: "Zürich",
    period: "Feb 2022 – Oct 2023",
    summary:
      "Comparative analysis of animal welfare legislation across 40+ countries.",
  },
];

const education = [
  {
    degree: "MA, International Public Affairs",
    school: "Central European University, Vienna",
    period: "2024 – 2026",
  },
  {
    degree: "International Security",
    school: "European Academy of Diplomacy, Warsaw",
    period: "2023 – 2024",
  },
  {
    degree: "BA, International Relations",
    school: "Collegium Civitas, Warsaw",
    period: "2020 – 2023",
  },
];

const methods = [
  {
    group: "Qualitative",
    items: [
      "Semi-structured interviews",
      "Document & archival analysis",
      "Comparative case analysis",
      "Stakeholder mapping",
    ],
  },
  {
    group: "Analytical",
    items: [
      "OSINT & geopolitical analysis",
      "Incident & risk analysis",
      "Policy analysis",
      "Policy briefs & reports",
    ],
  },
  {
    group: "Data",
    items: ["Data modelling", "Power BI", "R", "Python", "Dashboards"],
  },
];

const languages = ["Russian", "English", "Polish", "German"];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-4">
    {children}
  </p>
);

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
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-zinc-400 hover:text-white transition-colors"
                  aria-label="Milana Bagdasarian on LinkedIn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                  </svg>
                  LinkedIn
                </a>

                {/* Education */}
                <div className="mt-10">
                  <Eyebrow>Education</Eyebrow>
                  <div className="space-y-4">
                    {education.map((e) => (
                      <div key={e.degree}>
                        <p className="text-zinc-300 text-sm">{e.degree}</p>
                        <p className="text-zinc-600 text-xs mt-0.5">{e.school}</p>
                        <p className="text-zinc-700 text-[11px] font-mono mt-0.5">{e.period}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div className="mt-10">
                  <Eyebrow>Languages</Eyebrow>
                  <p className="text-zinc-400 text-sm">{languages.join(" · ")}</p>
                </div>
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
                  complex regional power shifts into actionable assessments. She
                  combines qualitative field methods with data engineering and
                  quantitative modelling.
                </p>
                <p>
                  Drawing on advanced training at{" "}
                  <span className="text-zinc-300">
                    Central European University
                  </span>{" "}
                  and{" "}
                  <span className="text-zinc-300">
                    European Academy of Diplomacy
                  </span>
                  , and hands-on experience at institutions including the{" "}
                  <span className="text-zinc-300">
                    Armenian Delegation to the OSCE & UN Vienna
                  </span>{" "}
                  and the{" "}
                  <span className="text-zinc-300">
                    IDM Institute for the Danube Region
                  </span>{" "}
                  as well as in private-sector research at{" "}
                  <span className="text-zinc-300">Simon-Kucher</span>
                  , she has developed a deep analytical framework for
                  understanding how state and non-state actors deploy coercive
                  tools — from disinformation and cyber operations to economic
                  leverage and institutional manipulation.
                </p>
                <p>
                  Her published research on Armenia&apos;s geopolitical realignment
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

            {/* Current position */}
            <div>
              <Eyebrow>Current Position</Eyebrow>
              <div className="border border-white/[0.06] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-white text-base">{currentPosition.role}</p>
                  <span className="text-[11px] font-mono" style={{ color: "var(--color-accent)" }}>
                    {currentPosition.period}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs mt-1">
                  {currentPosition.org} · {currentPosition.location}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mt-3">
                  {currentPosition.summary}
                </p>
              </div>
            </div>

            {/* Experience */}
            <div>
              <Eyebrow>Experience</Eyebrow>
              <div>
                {experience.map((c) => (
                  <div
                    key={c.org + c.role}
                    className="flex items-start gap-4 py-4 border-b border-white/[0.04] last:border-0"
                  >
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "var(--color-accent)" }} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                        <p className="text-zinc-300 text-sm">{c.role}</p>
                        <span className="text-zinc-700 text-[11px] font-mono shrink-0">
                          {c.period}
                        </span>
                      </div>
                      <p className="text-zinc-600 text-xs mt-0.5">
                        {c.location ? `${c.org} · ${c.location}` : c.org}
                      </p>
                      <p className="text-zinc-500 text-xs leading-relaxed mt-2">
                        {c.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Methods & skills */}
            <div>
              <Eyebrow>Methods &amp; Skills</Eyebrow>
              <div className="grid sm:grid-cols-3 gap-6">
                {methods.map((m) => (
                  <div key={m.group}>
                    <p className="text-zinc-300 text-sm mb-3">{m.group}</p>
                    <ul className="space-y-1.5">
                      {m.items.map((i) => (
                        <li key={i} className="text-zinc-500 text-xs">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div>
              <Eyebrow>Selected Publications</Eyebrow>
              <div className="space-y-3">
                {publications.map((pub) => (
                  <Link
                    key={pub.title}
                    href={pub.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 py-3 border-b border-white/[0.04] last:border-0 accent-hover-border transition-colors"
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
