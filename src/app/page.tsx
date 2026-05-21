import Navigation from "@/components/Navigation";
import type { NavItem } from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Mission from "@/components/Mission";
import Approach from "@/components/Approach";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import CustomSection from "@/components/CustomSection";
import Footer from "@/components/Footer";
import { getPageSections } from "@/lib/sections";
import type { PageSection } from "@/lib/sections";

type BuiltinKey = "hero" | "services" | "mission" | "approach" | "founder" | "contact";

const BUILTIN: Record<BuiltinKey, React.ComponentType> = {
  hero:     Hero,
  services: Services,
  mission:  Mission,
  approach: Approach,
  founder:  Founder,
  contact:  Contact,
};

// Maps built-in section slug → nav label + href
const BUILTIN_NAV: Partial<Record<BuiltinKey, NavItem>> = {
  services: { label: "Services", href: "#services" },
  mission:  { label: "About",    href: "#about"    },
  approach: { label: "Approach", href: "#approach" },
  founder:  { label: "Team",     href: "#team"     },
  contact:  { label: "Contact",  href: "#contact"  },
  // hero intentionally omitted — no nav link for the hero
};

function renderSection(section: PageSection) {
  if (section.type === "builtin") {
    const Component = BUILTIN[section.slug as BuiltinKey];
    return Component ? <Component key={section.id} /> : null;
  }
  return <CustomSection key={section.id} section={section} />;
}

export default async function Home() {
  const sections = await getPageSections();
  const visible  = sections.filter((s) => s.visible);

  // Build nav items in the same order as visible sections
  const navItems: NavItem[] = visible
    .flatMap((s) => {
      if (s.type === "builtin") {
        const item = BUILTIN_NAV[s.slug as BuiltinKey];
        return item ? [item] : [];
      }
      // Custom sections get their own nav link using their slug as the anchor
      return [{ label: s.title, href: `#${s.slug}` }];
    });

  return (
    <>
      <Navigation navItems={navItems} />
      <main>{visible.map(renderSection)}</main>
      <Footer />
    </>
  );
}
