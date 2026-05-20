import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} h-full`}>
      <body className="min-h-full bg-zinc-950 text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
