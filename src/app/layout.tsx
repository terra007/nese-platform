import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    "geopolitical risk",
    "security consulting",
    "political risk",
    "hybrid threats",
    "Eastern Europe",
    "tools of coercion",
    "risk advisory",
  ],
  openGraph: {
    title: "New East Strategic Edge",
    description: "Strategic Intelligence for a Complex World.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  // Validate hex colors before injecting into a <style> tag.
  // Reject anything that isn't a strict 6- or 8-digit hex to prevent CSS injection.
  const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/;
  const rawAccent = content["global.accent_color"] ?? "";
  const rawHover = content["global.accent_hover"] ?? "";
  const accentColor = HEX_COLOR_RE.test(rawAccent) ? rawAccent : "#c9a84c";
  const accentHover = HEX_COLOR_RE.test(rawHover) ? rawHover : "#d4b96a";
  const isCustomColor = accentColor !== "#c9a84c" || accentHover !== "#d4b96a";

  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full`}>
      <head>
        {isCustomColor && (
          <style>{`:root { --color-accent: ${accentColor}; --color-accent-hover: ${accentHover}; }`}</style>
        )}
      </head>
      <body className="min-h-full bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
