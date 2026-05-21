import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "New East Strategic Edge | Geopolitical Intelligence",
  description:
    "NESE delivers rigorous geopolitical risk analysis, security consulting, and hybrid threat intelligence to governments, corporations, and institutions operating in Eastern Europe and beyond.",
  keywords: [
    "geopolitical risk", "security consulting", "political risk",
    "hybrid threats", "Eastern Europe", "tools of coercion", "risk advisory",
  ],
  openGraph: {
    title: "New East Strategic Edge",
    description: "Strategic Intelligence for a Complex World.",
    type: "website",
  },
};

const HEX_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
const safe = (val: string, fallback: string) =>
  HEX_RE.test(val) ? val : fallback;

const DEFAULTS = {
  "global.accent_color": "#c9a84c",
  "global.accent_hover": "#d4b96a",
  "global.button_text":  "#09090b",
  "global.text_primary": "#fafafa",
  "global.text_body":    "#a1a1aa",
  "global.bg":           "#09090b",
} as const;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();

  const accent      = safe(content["global.accent_color"] ?? "", DEFAULTS["global.accent_color"]);
  const accentHover = safe(content["global.accent_hover"] ?? "", DEFAULTS["global.accent_hover"]);
  const buttonText  = safe(content["global.button_text"]  ?? "", DEFAULTS["global.button_text"]);
  const textPrimary = safe(content["global.text_primary"] ?? "", DEFAULTS["global.text_primary"]);
  const textBody    = safe(content["global.text_body"]    ?? "", DEFAULTS["global.text_body"]);
  const bg          = safe(content["global.bg"]           ?? "", DEFAULTS["global.bg"]);

  // Only inject the tag when at least one value differs from defaults — keeps the
  // HTML clean for sites that haven't touched the theme page.
  const hasCustom = [
    [accent,      DEFAULTS["global.accent_color"]],
    [accentHover, DEFAULTS["global.accent_hover"]],
    [buttonText,  DEFAULTS["global.button_text"]],
    [textPrimary, DEFAULTS["global.text_primary"]],
    [textBody,    DEFAULTS["global.text_body"]],
    [bg,          DEFAULTS["global.bg"]],
  ].some(([v, d]) => v !== d);

  const cssVars = `
    --color-accent:       ${accent};
    --color-accent-hover: ${accentHover};
    --color-button-text:  ${buttonText};
    --color-text-primary: ${textPrimary};
    --color-text-body:    ${textBody};
    --color-bg:           ${bg};
  `.trim();

  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full`}>
      <head>
        {hasCustom && <style>{`:root { ${cssVars} }`}</style>}
      </head>
      <body className="min-h-full antialiased">
        {children}
      </body>
    </html>
  );
}
