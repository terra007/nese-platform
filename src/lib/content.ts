import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const CONTENT_DEFAULTS: Record<string, string> = {
  // Hero
  "hero.badge": "Geopolitical Intelligence & Risk Advisory",
  "hero.headline_1": "Strategic Intelligence",
  "hero.headline_2": "for a Complex World.",
  "hero.subheadline":
    "New East Strategic Edge delivers rigorous geopolitical risk analysis, security consulting, and threat intelligence to those navigating Eastern Europe's most volatile fault lines.",
  "hero.cta1_text": "Explore Our Services",
  "hero.cta2_text": "Request an Analysis",

  // Services
  "services.eyebrow": "Core Services",
  "services.headline": "Intelligence-Driven Advisory",
  "services.subtext":
    "Analytical frameworks combining rigorous research with practitioner expertise to deliver decision-ready intelligence.",
  "services.1.title": "Political Risk Assessments",
  "services.1.description":
    "Comprehensive evaluation of political stability, regulatory environments, and governance risks across Eastern European and Central Asian markets. We assess electoral volatility, leadership transitions, and institutional capacity to help clients quantify exposure and build resilience.",
  "services.2.title": "Security Consulting",
  "services.2.description":
    "Operational security advisory for organisations in complex environments. Our consulting spans executive protection, facility hardening, crisis response planning, and personnel risk management — tailored for the unique challenges of post-Soviet and Balkan operational theatres.",
  "services.3.title": "Hybrid Threat Analysis",
  "services.3.description":
    "Systematic mapping of non-conventional warfare vectors including disinformation campaigns, cyber intrusions, energy coercion, and proxy force activities. We identify the fingerprints of state-sponsored hybrid operations and deliver early-warning indicators for clients in exposed sectors.",
  "services.4.title": "Tools of Coercion",
  "services.4.description":
    "In-depth analysis of the coercive instruments deployed by state and non-state actors — from economic sanctions and energy leverage to lawfare, targeted operations, and information manipulation. We document, categorise, and model these tools to enable proactive counterstrategy.",

  // Mission
  "mission.eyebrow": "About NESE",
  "mission.headline_1": "Bridging Expertise",
  "mission.headline_2": "and Action",
  "mission.paragraph_1":
    "New East Strategic Edge was founded to close the gap between rigorous academic analysis and the real-world decisions faced by governments, investors, and security practitioners operating in Eastern Europe's most contested environments.",
  "mission.paragraph_2":
    "Our team combines deep regional expertise with methodological rigour — drawing on backgrounds in political science, intelligence studies, international law, and operational security to deliver intelligence that is analytically sound and operationally relevant.",
  "mission.paragraph_3":
    "We focus on the zone stretching from the Baltic to the Black Sea, the South Caucasus, and Central Asia — regions that sit at the intersection of great-power competition and are frequently underserved by mainstream risk providers.",
  "mission.stat_1_value": "15+",
  "mission.stat_1_label": "Countries Covered",
  "mission.stat_2_value": "200+",
  "mission.stat_2_label": "Reports Published",
  "mission.stat_3_value": "50+",
  "mission.stat_3_label": "Partner Institutions",
  "mission.stat_4_value": "10+",
  "mission.stat_4_label": "Years of Expertise",
  "mission.quote":
    "The greatest risk is not uncertainty itself — it is the failure to understand it.",
  "mission.quote_attribution": "NESE Founding Principle",

  // Approach
  "approach.eyebrow": "Methodology",
  "approach.headline": "Our Analytical Framework",
  "approach.1.title": "Collection",
  "approach.1.description":
    "We draw on open-source intelligence, academic literature, elite network reporting, and proprietary data feeds to build a comprehensive picture of the operating environment across our focus regions.",
  "approach.1.tags": "OSINT,HUMINT,Quantitative Data",
  "approach.2.title": "Analysis",
  "approach.2.description":
    "Our analysts apply structured analytical techniques — scenario planning, Red Teaming, and probabilistic forecasting — to stress-test assumptions and surface non-obvious risks before they become crises.",
  "approach.2.tags": "Scenario Planning,Red Team,Forecasting",
  "approach.3.title": "Delivery",
  "approach.3.description":
    "Intelligence products are calibrated to the client's decision cycle — from real-time alerts and weekly monitoring briefs to bespoke in-depth assessments and executive workshops.",
  "approach.3.tags": "Real-Time Alerts,Written Reports,Executive Briefings",

  // Contact
  "contact.eyebrow": "Get in Touch",
  "contact.headline": "Request an Analysis",
  "contact.subtext":
    "Whether you need a bespoke political risk assessment, ongoing monitoring, or a rapid-response brief, our team is available to discuss your requirements in complete confidence.",
  "contact.email": "contact@nese-advisory.org",
  "contact.location": "Vienna, Austria",

  // Global / Theme
  "global.accent_color":  "#c9a84c",
  "global.accent_hover":  "#d4b96a",
  "global.button_text":   "#09090b",
  "global.outline_btn":   "#d4d4d8",
  "global.text_primary":  "#fafafa",
  "global.text_body":     "#a1a1aa",
  "global.bg":            "#09090b",
};

export type FieldType = "text" | "textarea" | "color";

export interface ContentField {
  key: string;
  label: string;
  type: FieldType;
}

export interface ContentSection {
  section: string;
  label: string;
  fields: ContentField[];
}

export const CONTENT_SCHEMA: ContentSection[] = [
  {
    section: "hero",
    label: "Hero Section",
    fields: [
      { key: "hero.badge", label: "Badge Text", type: "text" },
      { key: "hero.headline_1", label: "Headline Line 1", type: "text" },
      {
        key: "hero.headline_2",
        label: "Headline Line 2 (accent color)",
        type: "text",
      },
      { key: "hero.subheadline", label: "Subheadline", type: "textarea" },
      { key: "hero.cta1_text", label: "Primary Button Text", type: "text" },
      { key: "hero.cta2_text", label: "Secondary Button Text", type: "text" },
    ],
  },
  {
    section: "services",
    label: "Services Section",
    fields: [
      { key: "services.eyebrow", label: "Eyebrow Text", type: "text" },
      { key: "services.headline", label: "Headline", type: "text" },
      { key: "services.subtext", label: "Subtext", type: "textarea" },
      { key: "services.1.title", label: "Service 1 Title", type: "text" },
      {
        key: "services.1.description",
        label: "Service 1 Description",
        type: "textarea",
      },
      { key: "services.2.title", label: "Service 2 Title", type: "text" },
      {
        key: "services.2.description",
        label: "Service 2 Description",
        type: "textarea",
      },
      { key: "services.3.title", label: "Service 3 Title", type: "text" },
      {
        key: "services.3.description",
        label: "Service 3 Description",
        type: "textarea",
      },
      { key: "services.4.title", label: "Service 4 Title", type: "text" },
      {
        key: "services.4.description",
        label: "Service 4 Description",
        type: "textarea",
      },
    ],
  },
  {
    section: "mission",
    label: "Mission / About Section",
    fields: [
      { key: "mission.eyebrow", label: "Eyebrow Text", type: "text" },
      { key: "mission.headline_1", label: "Headline Line 1", type: "text" },
      { key: "mission.headline_2", label: "Headline Line 2", type: "text" },
      { key: "mission.paragraph_1", label: "Paragraph 1", type: "textarea" },
      { key: "mission.paragraph_2", label: "Paragraph 2", type: "textarea" },
      { key: "mission.paragraph_3", label: "Paragraph 3", type: "textarea" },
      { key: "mission.stat_1_value", label: "Stat 1 Value", type: "text" },
      { key: "mission.stat_1_label", label: "Stat 1 Label", type: "text" },
      { key: "mission.stat_2_value", label: "Stat 2 Value", type: "text" },
      { key: "mission.stat_2_label", label: "Stat 2 Label", type: "text" },
      { key: "mission.stat_3_value", label: "Stat 3 Value", type: "text" },
      { key: "mission.stat_3_label", label: "Stat 3 Label", type: "text" },
      { key: "mission.stat_4_value", label: "Stat 4 Value", type: "text" },
      { key: "mission.stat_4_label", label: "Stat 4 Label", type: "text" },
      { key: "mission.quote", label: "Pull Quote", type: "textarea" },
      {
        key: "mission.quote_attribution",
        label: "Quote Attribution",
        type: "text",
      },
    ],
  },
  {
    section: "approach",
    label: "Approach / Methodology Section",
    fields: [
      { key: "approach.eyebrow", label: "Eyebrow Text", type: "text" },
      { key: "approach.headline", label: "Headline", type: "text" },
      { key: "approach.1.title", label: "Pillar 1 Title", type: "text" },
      {
        key: "approach.1.description",
        label: "Pillar 1 Description",
        type: "textarea",
      },
      {
        key: "approach.1.tags",
        label: "Pillar 1 Tags (comma-separated)",
        type: "text",
      },
      { key: "approach.2.title", label: "Pillar 2 Title", type: "text" },
      {
        key: "approach.2.description",
        label: "Pillar 2 Description",
        type: "textarea",
      },
      {
        key: "approach.2.tags",
        label: "Pillar 2 Tags (comma-separated)",
        type: "text",
      },
      { key: "approach.3.title", label: "Pillar 3 Title", type: "text" },
      {
        key: "approach.3.description",
        label: "Pillar 3 Description",
        type: "textarea",
      },
      {
        key: "approach.3.tags",
        label: "Pillar 3 Tags (comma-separated)",
        type: "text",
      },
    ],
  },
  {
    section: "contact",
    label: "Contact Section",
    fields: [
      { key: "contact.eyebrow", label: "Eyebrow Text", type: "text" },
      { key: "contact.headline", label: "Headline", type: "text" },
      { key: "contact.subtext", label: "Subtext", type: "textarea" },
      { key: "contact.email", label: "Contact Email", type: "text" },
      { key: "contact.location", label: "Location", type: "text" },
    ],
  },
];

export const getContent = cache(async (): Promise<Record<string, string>> => {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("key, value");

    const dbContent = (data ?? []).reduce(
      (acc, row) => {
        if (row.value !== null) acc[row.key] = row.value;
        return acc;
      },
      {} as Record<string, string>
    );

    return { ...CONTENT_DEFAULTS, ...dbContent };
  } catch {
    return { ...CONTENT_DEFAULTS };
  }
});
