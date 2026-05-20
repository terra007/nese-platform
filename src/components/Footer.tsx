import Link from "next/link";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-lg font-bold tracking-[0.2em] text-white">NESE</span>
              <span className="w-px h-4 bg-white/20" />
              <span className="text-[10px] tracking-[0.15em] text-zinc-600 uppercase">
                New East Strategic Edge
              </span>
            </div>
            <p className="text-zinc-700 text-xs max-w-xs leading-relaxed">
              Geopolitical intelligence and risk advisory for a complex world.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-7">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors tracking-[0.15em] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-700 text-xs">
            © {new Date().getFullYear()} New East Strategic Edge. All rights reserved.
          </p>
          <p className="text-zinc-800 text-xs">Vienna, Austria</p>
        </div>
      </div>
    </footer>
  );
}
